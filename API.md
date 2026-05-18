# API

> **定位：** 本文档定义 ZAN 所有后端 API 端点。AI 开发时不得新增端点或修改已有端点的行为，除非 PRD 明确要求变更。
> **技术选型：** Vercel Serverless Functions + TypeScript + Zod 验证。详见 git-instruction.md。

---

## 1. 架构概览

```
前端（React）
  │
  ├── 读取公开内容 ──────────→ Supabase SDK（直连，不走 API）
  │
  └── 提交表单 ─────────────→ Vercel Serverless Functions → Supabase
                                │
                                ├── 验证 HTTP 方法
                                ├── 速率检查
                                ├── 输入验证（Zod）
                                └── 写入数据库
```

### 端点清单

| 方法 | 路径 | 用途 | 使用场景 |
|------|------|------|---------|
| POST | `/api/enterprise-lead` | 企业线索提交 | `/find-talent` 表单 |
| POST | `/api/talent-lead` | 顾问申请提交 | `/join` 表单 |

**只读数据通路：** 公开内容（`articles`）不走 Serverless 端点，由前端 hook 通过 `@supabase/supabase-js` 直接读取，RLS 已限制 `published = true`。详见 ARCHITECTURE.md §1。如未来需要服务端逻辑（聚合、搜索、缓存控制）再补对应端点。

---

## 2. 文件结构

```
api/
├── enterprise-lead.ts      → POST /api/enterprise-lead
└── talent-lead.ts          → POST /api/talent-lead
```

Vercel 路由规则：`api/foo.ts` → 处理 `/api/foo` 请求。

---

## 3. 共享验证 Schema

所有端点使用同一个 Zod schema 文件，前后端共用。

```typescript
// src/types/schemas.ts

import { z } from 'zod';

// ── 企业线索（/find-talent） ──
export const enterpriseLeadSchema = z.object({
  name: z
    .string()
    .min(1, '请输入您的姓名')
    .max(50, '姓名不超过50个字符'),
  company: z
    .string()
    .max(100, '公司名称不超过100个字符')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .min(1, '请输入邮箱')
    .email('请输入有效的邮箱地址')
    .max(100),
  phone: z
    .string()
    .max(30, '电话不超过30个字符')
    .optional()
    .or(z.literal('')),
  role: z
    .string()
    .max(50, '岗位不超过50个字符')
    .optional()
    .or(z.literal('')),
  stage: z
    .string()
    .max(50)
    .optional()
    .or(z.literal('')),
  challenge: z
    .string()
    .min(1, '请描述您的核心挑战')
    .max(2000, '描述不超过2000个字符'),
  timeline: z
    .string()
    .max(50)
    .optional()
    .or(z.literal('')),
});

// ── 顾问申请（/join） ──
export const talentLeadSchema = z.object({
  name: z
    .string()
    .min(1, '请输入您的姓名')
    .max(50, '姓名不超过50个字符'),
  email: z
    .string()
    .min(1, '请输入邮箱')
    .email('请输入有效的邮箱地址')
    .max(100),
  phone: z
    .string()
    .max(30)
    .optional()
    .or(z.literal('')),
  role: z
    .string()
    .max(100, '核心领域不超过100个字符')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .min(1, '请填写个人简介')
    .max(3000, '简介不超过3000个字符'),
});

// ── 导出 TS 类型 ──
export type EnterpriseLeadInput = z.infer<typeof enterpriseLeadSchema>;
export type TalentLeadInput = z.infer<typeof talentLeadSchema>;
```

**设计要点：**
- 可选字段同时接受 `undefined` 和空字符串 `''`（HTML form 提交习惯）
- email 字段强制 `.email()` 校验
- 必填：`name`、`email`、`challenge`（企业）/ `bio`（顾问）
- 所有字符串字段都有 `max` 上限，防止超长输入

---

## 4. 端点详细规格

### 4.1 POST /api/enterprise-lead

**用途：** 接收 `/find-talent` 企业表单提交。

**请求：**

```http
POST /api/enterprise-lead
Content-Type: application/json

{
  "name": "张三",
  "company": "某某制造集团",
  "email": "zhangsan@example.com",
  "phone": "13800138000",
  "role": "CDO",
  "stage": "成长期",
  "challenge": "需要懂AI的临时高管来推动供应链数字化",
  "timeline": "1个月内"
}
```

**成功响应：**

```http
200 OK
{
  "success": true,
  "message": "感谢您的信任，我们会在 24 小时内与您联系。"
}
```

**验证失败：**

```http
400 Bad Request
{
  "error": "Validation failed",
  "details": {
    "name": ["请输入您的姓名"],
    "email": ["请输入有效的邮箱地址"]
  }
}
```

**速率超限：**

```http
429 Too Many Requests
{ "error": "Too many submissions. Please try again later." }
```

**服务器错误：**

```http
500 Internal Server Error
{ "error": "Internal server error" }
```

**完整实现：**

```typescript
// api/enterprise-lead.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { enterpriseLeadSchema } from '../src/types/schemas';

// 简易内存限流（Serverless 实例生命周期内有效）
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000; // 1 小时
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter(t => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) {
    submissions.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]
    || req.socket.remoteAddress
    || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  const result = enterpriseLeadSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from('enterprise_leads').insert({
    name: result.data.name,
    company: result.data.company || null,
    email: result.data.email,
    phone: result.data.phone || null,
    role: result.data.role || null,
    stage: result.data.stage || null,
    challenge: result.data.challenge,
    timeline: result.data.timeline || null,
  });

  if (error) {
    console.error('DB insert error (enterprise):', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({
    success: true,
    message: '感谢您的信任，我们会在 24 小时内与您联系。',
  });
}
```

### 4.2 POST /api/talent-lead

**用途：** 接收 `/join` 顾问申请表单。

**请求：**

```http
POST /api/talent-lead
Content-Type: application/json

{
  "name": "李四",
  "email": "lisi@example.com",
  "phone": "13800138001",
  "role": "AI+组织、组织变革",
  "bio": "15 年人力资源高管经验，深度参与过 3 家上市公司的组织变革……"
}
```

**成功响应：**

```http
200 OK
{
  "success": true,
  "message": "感谢您的关注，我们会尽快与您联系。"
}
```

**实现：** 与 `enterprise-lead.ts` 结构一致，仅替换：
- import `talentLeadSchema`
- `.from('talent_leads')`
- 插入字段：name, email, phone, role, bio
- 成功消息文本

---

## 5. 前端调用方式

### 5.1 fetch 封装

```typescript
// src/lib/api.ts
import type { EnterpriseLeadInput, TalentLeadInput } from '@/types/schemas';

interface ApiSuccess {
  success: true;
  message: string;
}

interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}

async function postJson<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    const error = json as ApiError;
    throw new Error(error.error || '提交失败');
  }

  return json as T;
}

export function submitEnterpriseLead(data: EnterpriseLeadInput) {
  return postJson<ApiSuccess>('/api/enterprise-lead', data);
}

export function submitTalentLead(data: TalentLeadInput) {
  return postJson<ApiSuccess>('/api/talent-lead', data);
}
```

### 5.2 页面中使用

```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { talentLeadSchema, type TalentLeadInput } from '@/types/schemas';
import { submitTalentLead } from '@/lib/api';
import FormAlert from '@/components/FormAlert';

export default function Join() {
  const [alertMsg, setAlertMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TalentLeadInput>({
    resolver: zodResolver(talentLeadSchema),
  });

  const mutation = useMutation({
    mutationFn: submitTalentLead,
    onSuccess: (data) => {
      setAlertMsg({ message: data.message, type: 'success' });
      reset();
    },
    onError: () => {
      setAlertMsg({ message: '提交失败，请稍后重试', type: 'error' });
    },
  });

  const onSubmit = (values: TalentLeadInput) => mutation.mutate(values);

  return (
    <main>
      {/* Hero / 顾问画像等 sections */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="您的姓名" className="form-input ..." />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        {/* 其他字段同理 */}
        <button type="submit" disabled={isSubmitting} className="...">
          {isSubmitting ? '提交中...' : '提交申请'}
        </button>
      </form>
      {alertMsg && <FormAlert message={alertMsg.message} type={alertMsg.type} onClose={() => setAlertMsg(null)} />}
    </main>
  );
}
```

---

## 6. 安全要求

### 6.1 四层防线

```
请求进入
  │
  ├─ 第 1 层：HTTP 方法检查
  │   POST 端点只接受 POST，否则 405
  │
  ├─ 第 2 层：速率限制
  │   每个 IP 每小时上限 5 次，否则 429
  │
  ├─ 第 3 层：输入验证（Zod）
  │   数据格式不对 → 400 + 具体错误字段
  │
  └─ 第 4 层：数据库 RLS
      即使前三层被绕过，RLS 限制写入范围
```

### 6.2 安全规则

| 规则 | 说明 |
|------|------|
| **方法白名单** | POST 端点拒绝 GET / PUT / DELETE |
| **不信任前端** | 后端独立 Zod 验证 |
| **不暴露内部信息** | 500 错误只返回 "Internal server error" |
| **CORS** | 默认同源，Vercel 自动处理 |
| **HTTPS 强制** | Vercel 默认 |
| **字段长度限制** | 所有字段有 max 上限 |
| **日志不含敏感数据** | console.error 只记录错误类型，不记录用户提交的内容 |

### 6.3 速率限制说明

- 简易内存限流（Map + 时间戳）
- Serverless 冷启动重置，不完美但够用
- 未来如需更严格的限流，可升级为 Vercel KV 或 Upstash Redis

### 6.4 隐私合规

当前不收集 PIPL consent 勾选字段。如未来合规审查要求引入：
1. 前端在表单底部加 checkbox 控件
2. `schemas.ts` 添加 `consent: z.literal(true)`
3. 数据库表 `ALTER` 增加 `consent BOOLEAN` 字段
4. 同步更新本文档 §3 和 §4

---

## 7. 错误处理规范

### 响应格式统一

```typescript
// 成功
{ "success": true, "message": "..." }

// 失败
{ "error": "简短英文描述" }
{ "error": "Validation failed", "details": { "field": ["错误信息"] } }
```

### HTTP 状态码

| 状态码 | 含义 | 使用场景 |
|--------|------|---------|
| 200 | 成功 | 所有成功响应 |
| 400 | 请求无效 | Zod 验证失败 |
| 404 | 未找到 | API 端点不存在（前端 NotFound 由路由处理） |
| 405 | 方法不允许 | 用 GET 访问 POST 端点 |
| 429 | 请求过多 | 超出速率限制 |
| 500 | 服务器错误 | 数据库写入失败等意外错误 |

**禁止使用：** 401（无用户系统）、403（无权限体系）、301 / 302（前端路由处理）。

---

## 8. Vercel 配置

```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "no-store" }]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

**说明：**
- API 响应不缓存（`no-store`）— 表单提交结果不应被 CDN 缓存
- 静态资源长期缓存（带 hash 文件名保证更新）
- SPA fallback rewrite 确保深链直接访问可用

---

## 9. 禁止事项

| 禁止 | 原因 |
|------|------|
| 在 API 中返回用户提交的原始数据 | 隐私保护，写入表不接受读取 |
| 在 API 中执行复杂业务逻辑 | Serverless 保持简单，复杂逻辑放应用层 |
| 使用 WebSocket / SSE | 当前无实时需求 |
| 使用 session / cookie 认证 | 第一阶段无用户系统 |
| 拼接 SQL 字符串 | 用 Supabase query builder 防止 SQL 注入 |
| 日志中记录用户提交内容 | 隐私保护 |
| 在 API 中调用第三方服务 | 第一阶段只写库 |
| 创建 API 子目录嵌套 | `api/` 只一层，不要建 `api/v1/` 等 |
| 引入 tRPC / GraphQL / 服务器框架 | 仅 REST + Serverless |

---

## 10. 变更记录

| 日期 | 变更 | 说明 |
|------|------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本文档随 API 行为变更同步维护。任何端点新增 / 删除 / schema 调整必须先在此文档更新，再做实现。**
