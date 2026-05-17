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
                                ├── 验证输入（Zod）
                                ├── 速率检查
                                └── 写入数据库
```

### 端点清单

| 方法 | 路径 | 用途 | 使用场景 |
|------|------|------|---------|
| POST | `/api/enterprise-lead` | 企业线索提交 | 企业合作表单 |
| POST | `/api/talent-lead` | 人才线索提交 | 人才入驻表单 |

**只读数据通路:** 公开内容(`projects` / `articles` / `programs`)不走 Serverless 端点,由前端 hook 通过 `@supabase/supabase-js` 直接读取,RLS 已限制 `published = true`。详见 ARCHITECTURE.md §1。如未来需要服务端逻辑(搜索、聚合、缓存控制)再补,前端只需替换 hook 实现,组件无感。

---

## 2. 文件结构

```
api/
├── enterprise-lead.ts      → POST /api/enterprise-lead
└── talent-lead.ts          → POST /api/talent-lead
```

Vercel 的路由规则：
- `api/foo.ts` → 处理 `/api/foo` 的请求
- `api/foo/[id].ts` → 处理 `/api/foo/任意值`，通过 `req.query.id` 获取参数

---

## 3. 共享验证 Schema

所有端点使用同一个 Zod schema 文件，前后端共用。

```typescript
// src/types/schemas.ts

import { z } from 'zod';

// ── 企业线索 ──
export const enterpriseLeadSchema = z.object({
  name: z
    .string()
    .min(1, '请输入姓名')
    .max(50, '姓名不超过50个字符'),
  company: z
    .string()
    .min(1, '请输入公司名称')
    .max(100, '公司名称不超过100个字符'),
  title: z
    .string()
    .min(1, '请输入职位')
    .max(50, '职位不超过50个字符'),
  contact: z
    .string()
    .min(1, '请输入联系方式')
    .max(100),
  challenge: z
    .string()
    .max(1000, '描述不超过1000个字符')
    .optional(),
  consent: z
    .literal(true, { message: '请阅读并同意隐私政策' }),
});

// ── 人才线索 ──
export const talentLeadSchema = z.object({
  name: z
    .string()
    .min(1, '请输入姓名')
    .max(50, '姓名不超过50个字符'),
  position: z
    .string()
    .min(1, '请输入职位')
    .max(100, '职位不超过100个字符'),
  industry: z
    .string()
    .min(1, '请输入所在行业')
    .max(50, '行业不超过50个字符'),
  skills: z
    .string()
    .max(200, '能力描述不超过200个字符')
    .optional(),
  contact: z
    .string()
    .min(1, '请输入联系方式')
    .max(100),
  consent: z
    .literal(true, { message: '请阅读并同意隐私政策' }),
});

// ── 导出 TypeScript 类型（用于前端表单）──
export type EnterpriseLeadInput = z.infer<typeof enterpriseLeadSchema>;
export type TalentLeadInput = z.infer<typeof talentLeadSchema>;
```

**设计要点：**
- `consent` 使用 `z.literal(true)` — 值必须是 `true`，不接受 `false` 或未勾选
- 所有字符串有 `max` 限制 — 防止超长输入
- `challenge` 和 `skills` 是 `optional` — 非必填
- 导出的类型可以让前端 React Hook Form 直接使用

---

## 4. 端点详细规格

### 4.1 POST /api/enterprise-lead

**用途：** 接收企业需求表单提交。

**请求：**
```
POST /api/enterprise-lead
Content-Type: application/json

{
  "name": "张三",
  "company": "某某制造集团",
  "title": "战略总监",
  "contact": "13800138000",
  "challenge": "需要一个懂AI的临时CDO",
  "consent": true
}
```

**成功响应：**
```
200 OK
{ "success": true }
```

**验证失败：**
```
400 Bad Request
{
  "error": "Validation failed",
  "details": {
    "name": ["请输入姓名"],
    "consent": ["请阅读并同意隐私政策"]
  }
}
```

**速率超限：**
```
429 Too Many Requests
{ "error": "Too many submissions. Please try again later." }
```

**服务器错误：**
```
500 Internal Server Error
{ "error": "Internal server error" }
```

**完整实现：**
```typescript
// api/enterprise-lead.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { enterpriseLeadSchema } from '../src/types/schemas';

// 简易内存限流（Serverless 生命周期内有效）
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000; // 1小时
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || [])
    .filter(t => now - t < WINDOW_MS);
  submissions.set(ip, timestamps);
  return timestamps.length >= MAX_REQUESTS;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 仅接受 POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 速率限制
  const ip = req.headers['x-forwarded-for'] as string
    || req.socket.remoteAddress
    || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  // 输入验证
  const result = enterpriseLeadSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
  }

  // 写入数据库
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('enterprise_leads')
    .insert(result.data);

  if (error) {
    console.error('DB insert error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ success: true });
}
```

### 4.2 POST /api/talent-lead

**用途：** 接收人才入驻申请表单提交。

与 enterprise-lead 结构完全一致，仅替换：
- Schema: `talentLeadSchema`
- 表名: `talent_leads`

```typescript
// api/talent-lead.ts
// 结构同 enterprise-lead.ts，仅以下不同：
// 1. import { talentLeadSchema } from '../src/types/schemas';
// 2. .from('talent_leads')
// 其余代码完全相同。
```

### 4.3 公开内容读取(不通过 API)

公开内容(`projects` / `articles` / `programs`)由前端 hook 通过 Supabase 客户端 SDK 直接读取,不经 Serverless 端点。这部分逻辑见对应的 hook 文件:

| 内容 | Hook | 参考实现 |
|------|------|----------|
| 项目列表(支持 status/industry/function 过滤) | `src/hooks/useProjects.ts` | `supabase.from('projects').select(...).eq('published', true)` |
| 文章列表(支持 topic 过滤,不返回 content) | `src/hooks/useArticles.ts` 中的 `useArticles` | `supabase.from('articles').select('id,title,slug,excerpt,topic,cover_image,published_at')...` |
| 文章详情(返回完整 content) | `src/hooks/useArticles.ts` 中的 `useArticle(slug)` | `.eq('slug', slug).single()` |
| 课程列表 | `src/hooks/usePrograms.ts` | `supabase.from('programs').select('*')` |

**为什么不放 API:** 公开数据 + RLS 等价于一层只读 REST,加 Serverless 反而带来冷启动与多一跳网络。后续若需服务端逻辑(搜索、聚合、SSR、CDN headers),再补 `api/projects.ts` 等端点,前端只需替换 hook 实现,组件不感知。

---

## 5. 前端调用方式

### 5.1 表单提交（写入）

```typescript
// src/lib/api.ts
const API_BASE = '/api';

export async function submitEnterpriseLead(data: EnterpriseLeadInput) {
  const res = await fetch(`${API_BASE}/enterprise-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '提交失败');
  }

  return res.json();
}

export async function submitTalentLead(data: TalentLeadInput) {
  const res = await fetch(`${API_BASE}/talent-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '提交失败');
  }

  return res.json();
}
```

### 5.2 公开内容读取（直接 Supabase SDK）

```typescript
// src/hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Project, ProjectFilters } from '@/types';

export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (filters?.status) query = query.eq('status', filters.status);
      if (filters?.industry) query = query.eq('industry', filters.industry);
      if (filters?.function) query = query.eq('function', filters['function']);

      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

### 5.3 在页面中使用

```tsx
// pages/EnterpriseContact.tsx（表单提交示例）
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enterpriseLeadSchema, type EnterpriseLeadInput } from '@/types/schemas';
import { submitEnterpriseLead } from '@/lib/api';

export function EnterpriseContact() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<EnterpriseLeadInput>({
    resolver: zodResolver(enterpriseLeadSchema),
  });

  const onSubmit = async (data: EnterpriseLeadInput) => {
    await submitEnterpriseLead(data);
  };

  if (isSubmitSuccessful) {
    return <FormSuccess message="感谢您的信任，我们会在1个工作日内与您联系。" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 表单字段 */}
    </form>
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
  │   每个 IP 每小时最多 5 次，否则 429
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
| **方法白名单** | POST 端点拒绝 GET/PUT/DELETE；GET 端点拒绝 POST |
| **不信任前端** | 后端必须独立验证，即使前端已验证过 |
| **不暴露内部信息** | 500 错误只返回 "Internal server error"，不返回 SQL 错误或堆栈 |
| **CORS 限制** | 默认同源，Vercel 自动处理 |
| **HTTPS 强制** | Vercel 默认启用 |
| **输入长度限制** | 所有字段有 max 限制，防止超长输入攻击 |
| **日志不含敏感数据** | console.error 只记录错误类型，不记录用户提交的内容 |

### 6.3 速率限制说明

当前使用简易内存限流（Map + 时间戳）。注意事项：
- Serverless Function 冷启动时 Map 会重置，限流不完美但够用
- 热启动时同一实例内的限流有效
- 如果将来需要更严格的限流，可升级为 Vercel KV 或 Upstash Redis 方案

---

## 7. 错误处理规范

### 响应格式统一

```typescript
// 成功
{ "success": true }
{ "data": [...] }

// 失败
{ "error": "简短英文描述" }
{ "error": "Validation failed", "details": { "field": ["错误信息"] } }
```

### HTTP 状态码使用

| 状态码 | 含义 | 使用场景 |
|--------|------|---------|
| 200 | 成功 | 所有成功的响应 |
| 400 | 请求无效 | 输入验证失败 |
| 404 | 未找到 | 文章 slug 不存在 |
| 405 | 方法不允许 | 用 GET 访问 POST 端点 |
| 429 | 请求过多 | 超出速率限制 |
| 500 | 服务器错误 | 数据库写入失败等意外错误 |

**禁止使用的状态码：** 401（无用户系统）、403（无权限体系）、301/302（重定向由前端路由处理）。

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
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**说明：**
- API 响应不缓存（`no-store`）— 表单提交结果不应被 CDN 缓存
- 静态资源长期缓存（带 hash 的文件名保证更新）

---

## 9. 禁止事项

| 禁止 | 原因 |
|------|------|
| 在 API 中返回用户提交的数据 | 隐私保护，写入表不接受读取 |
| 在 API 中执行复杂业务逻辑 | Serverless 应保持简单，复杂逻辑放应用层 |
| 使用 WebSocket 或 SSE | 当前无实时需求 |
| 使用 session 或 cookie 认证 | 第一阶段无用户系统 |
| 直接拼接 SQL 字符串 | 使用 Supabase query builder 防止 SQL 注入 |
| 在日志中记录用户提交的内容 | 隐私保护 |
| 在 API 中调用第三方服务 | 第一阶段只需写数据库 |
| 创建 API 子目录嵌套 | api/ 只有一层，不要建 api/v1/ 等 |

---

## 10. 变更记录

| 日期 | 变更 | 说明 |
|------|------|------|
| 2026-05-16 | 初始 API 设计 | 6 个端点 + Zod schema + 速率限制 |
| 2026-05-17 | 删除 GET /api/projects、/api/articles、/api/articles/[slug]、/api/programs 四个"备用"只读端点 | 与 ARCHITECTURE.md §1 读写分离设计对齐:公开内容由 hook 通过 Supabase SDK 直读,RLS 已保证安全。删除后 API 层只剩两个写入端点,职责更清晰。未来如需服务端逻辑再增设。 |
