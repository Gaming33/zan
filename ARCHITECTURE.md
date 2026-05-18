# ZAN Architecture

> **定位：** 本文档定义系统的模块边界和数据流向。AI 开发时所有结构性决策必须以此为边界，不得自行扩展模块或引入新的分层。
> **原则：** 刚刚好的架构。满足当前 9 个页面 + 2 个写入端点的需求，不提前设计用户系统、管理后台或实时通信。

---

## 1. 系统总览

```
┌────────────────────────────────────────────────────────┐
│                     Browser                             │
│                                                        │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Pages (9 个 default export)                       │ │
│  │  Home · Services · Resources · ResourceDetail      │ │
│  │  Join · FindTalent · Privacy · Terms · NotFound    │ │
│  └─────────────────────┬─────────────────────────────┘ │
│                        │                                │
│        ┌───────────────┼────────────────┐               │
│        │               │                │               │
│        ▼               ▼                ▼               │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐        │
│  │ Layout   │  │ Components    │  │ Animation  │        │
│  │ Navigation│  │ CountUp       │  │ GSAP +     │        │
│  │ Footer   │  │ FormAlert     │  │ ScrollTrig │        │
│  │          │  │ Skeleton      │  │ (内联)     │        │
│  │          │  │ ParticleNet   │  │            │        │
│  └──────────┘  └──────────────┘  └────────────┘        │
│        │               │                                │
│        └──────┬────────┘                                │
│               │                                         │
│               ▼                                         │
│        ┌──────────┐  ┌──────────┐                       │
│        │  Hooks   │  │  Types   │                       │
│        │ 数据获取  │  │ 类型定义 │                       │
│        └────┬─────┘  └──────────┘                       │
│             │                                           │
└─────────────┼───────────────────────────────────────────┘
              │
              │ HTTP (fetch)
              │
       ┌──────┴──────────────────┐
       │                         │
       ▼                         ▼
  ┌──────────────┐        ┌──────────────┐
  │  Supabase    │        │  Vercel      │
  │  Client SDK  │        │  Serverless  │
  │  (直接读取)  │        │  Functions   │
  │              │        │  (写入)      │
  └──────┬───────┘        └──────┬───────┘
         │                       │
         ▼                       ▼
  ┌──────────────────────────────────────┐
  │       Supabase (PostgreSQL)           │
  │                                       │
  │  articles                             │
  │  enterprise_leads                     │
  │  talent_leads                         │
  └──────────────────────────────────────┘
```

### 数据流方向（严格读写分离）

```
读取（公开内容）：
  Page → useArticles hook → Supabase Client SDK (ANON_KEY)
    → PostgreSQL (RLS: published = true)

写入（表单提交）：
  Page → React Hook Form → fetch('/api/...')
    → Serverless Function
      → Zod validation → Rate limit → Supabase (SERVICE_ROLE_KEY)
    → PostgreSQL
```

**为什么读写分离：**
- 公开内容直读减少一跳延迟，且 RLS 已足够保护
- 表单写入走 Serverless 是为了 (a) 服务端再验证 (b) 速率限制 (c) 用 SERVICE_ROLE_KEY 绕过 RLS

---

## 2. 目录结构

```
zoan/
│
├── public/
│   ├── images/                  # 静态图片，允许一级子目录
│   ├── videos/                  # 视频资源
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── components/              # ── UI 组件层（扁平）──
│   │   │
│   │   ├── ui/                  # shadcn (仅表单组件)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── label.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── Navigation.tsx       # 顶部液态玻璃导航（全局）
│   │   ├── Footer.tsx           # 底部 5 列网格（全局）
│   │   ├── CountUp.tsx          # 数字爬升动画（GSAP）
│   │   ├── FormAlert.tsx        # 表单成功/失败提示浮层
│   │   ├── Skeleton.tsx         # 加载占位
│   │   └── ParticleNetwork.tsx  # 可选粒子背景
│   │
│   ├── pages/                   # ── 页面层（9 个 default export）──
│   │   ├── Home.tsx             # /
│   │   ├── Services.tsx         # /services
│   │   ├── Resources.tsx        # /resources
│   │   ├── ResourceDetail.tsx   # /resources/:id
│   │   ├── Join.tsx             # /join
│   │   ├── FindTalent.tsx       # /find-talent
│   │   ├── Privacy.tsx          # /privacy
│   │   ├── Terms.tsx            # /terms
│   │   └── NotFound.tsx         # *
│   │
│   ├── lib/                     # ── 基础设施层 ──
│   │   ├── supabase.ts          # Supabase 客户端（前端 ANON_KEY）
│   │   ├── api.ts               # fetch 封装（提交表单用）
│   │   └── utils.ts             # cn() 等工具
│   │
│   ├── types/                   # ── 类型层 ──
│   │   ├── index.ts             # 业务类型
│   │   └── schemas.ts           # Zod schemas（前后端共享）
│   │
│   ├── hooks/                   # ── 数据获取层 ──
│   │   └── useArticles.ts       # 文章列表 + 单篇详情
│   │
│   ├── data/                    # ── 种子数据（开发用）──
│   │   └── articles.ts          # 一次性写入数据库的原数据
│   │
│   ├── App.tsx                  # 路由配置
│   ├── main.tsx                 # 入口
│   └── index.css                # Tailwind + 设计令牌 + 全局样式
│
├── api/                         # ── Vercel Serverless Functions ──
│   ├── enterprise-lead.ts       # POST /api/enterprise-lead
│   └── talent-lead.ts           # POST /api/talent-lead
│
├── supabase/
│   ├── config.toml
│   └── migrations/
│       ├── 001_*.sql
│       ├── 002_*.sql
│       └── 003_*.sql
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── tailwind.config.js           # v3 配置
├── postcss.config.js
├── components.json              # shadcn 配置
├── vercel.json
├── .env.example
│
└── [harness 文档]
    ├── PRD.md
    ├── git-instruction.md
    ├── UI_GUIDELINES.md
    ├── ARCHITECTURE.md          ← 本文件
    ├── FOLDER_STRUCTURE.md
    ├── DATABASE.md
    ├── API.md
    ├── README.md
    └── CLAUDE.md
```

### 模块边界规则

| 规则 | 说明 |
|------|------|
| **pages 用 default export** | 每个路由对应一个文件，default 导出 |
| **pages 直接调用 hooks** | 不通过中间层 |
| **AnimatedSection 内联在 page** | 每个 page 在文件顶部定义自己的 wrapper，不抽离到全局组件目录 |
| **components/ 扁平** | 全局复用组件平铺，不创建 layout/、sections/、shared/ 子目录 |
| **ui/ 不手动改** | shadcn 组件仅通过 CLI 管理，定制通过 className 覆盖 |
| **lib/ 无 UI 依赖** | 工具库不引用 React 或组件 |

### 依赖方向（单向）

```
pages → components → ui
  │
  ├──→ hooks → lib/supabase
  │
  └──→ types（被所有层引用，不依赖任何层）
```

---

## 3. 核心模块详解

### 3.1 页面模块（pages/）

每个页面遵循统一模式：

```tsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck } from '@phosphor-icons/react';
import CountUp from '@/components/CountUp';

gsap.registerPlugin(ScrollTrigger);

// AnimatedSection 内联在每个 page 文件顶部
function AnimatedSection({ children, className = '', style = {} }:
  { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
    );
    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); });
    };
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

export default function Home() {
  return (
    <main>
      <section style={{ backgroundColor: '#0d1d35' }}>
        {/* Hero 内容 */}
      </section>
      <AnimatedSection>
        {/* WHY ZAN 内容 */}
      </AnimatedSection>
      {/* ... */}
    </main>
  );
}
```

**规则：**
- default export
- AnimatedSection 内联定义在文件顶部
- inline style 与 className 混用（颜色硬值就近呈现）
- 表单页面调用 hooks 与 lib/api

### 3.2 全局组件（components/）

#### Navigation.tsx
- 液态玻璃 sticky header
- 滚动行为：首页透明 → 白底毛玻璃（过渡阈值在 hero 区域内），其他页始终白底毛玻璃
- 内容：左侧 Logo（ZAN · 左安） + 中部 4 个导航链接 + 右侧 emerald CTA "招贤纳士"
- 移动端：汉堡菜单 + 展开面板

#### Footer.tsx
- 5 列网格（移动端折叠为 2 列）
- 关于 / 服务 / 资源 / 联系 / 关注我们
- 底部版权条 + 隐私政策 / 服务条款 / 信息安全

#### CountUp.tsx
- 接收 `end: string`（含后缀如 h / + / %）
- 用 GSAP 在 ~1-2 秒内从 0 爬升到目标数值
- 保留后缀字符

#### FormAlert.tsx
- 浮层式 toast
- 接收 `{ message: string, type: 'success' | 'error' }` + 可选 `onClose`
- 用于表单提交反馈

#### Skeleton.tsx
- 含 `ArticleGridSkeleton` 等具名导出
- 灰色矩形 + shimmer 动画（keyframe 已在 globals.css）

#### ParticleNetwork.tsx
- 可选粒子背景，仅在需要装饰的页面引用

### 3.3 数据获取（hooks/）

```typescript
// hooks/useArticles.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Article } from '@/types';

export function useArticles(filters?: { type?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('sort_order', { ascending: false });

      if (filters?.type) query = query.eq('type', filters.type);

      const page = filters?.page ?? 1;
      const pageSize = filters?.pageSize ?? 9;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;
      return { items: data as Article[], total: count ?? 0, page, pageSize };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useArticle(id: number | string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();
      if (error) throw error;
      return data as Article;
    },
    enabled: id !== undefined && id !== null && id !== '',
  });
}
```

### 3.4 API 模块（api/）

```typescript
// api/talent-lead.ts — 示例
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { talentLeadSchema } from '../src/types/schemas';

const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]
    || req.socket.remoteAddress
    || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  const result = talentLeadSchema.safeParse(req.body);
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

  const { error } = await supabase.from('talent_leads').insert(result.data);

  if (error) {
    console.error('DB insert error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ success: true, message: '感谢您的关注，我们会尽快与您联系。' });
}
```

### 3.5 表单逻辑模板（pages 内）

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

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TalentLeadInput>({
    resolver: zodResolver(talentLeadSchema),
  });

  const mutation = useMutation({
    mutationFn: submitTalentLead,
    onSuccess: (data) => { setAlertMsg({ message: data.message, type: 'success' }); reset(); },
    onError: () => setAlertMsg({ message: '提交失败，请稍后重试', type: 'error' }),
  });

  const onSubmit = (values: TalentLeadInput) => mutation.mutate(values);

  return (
    <main>
      {/* Hero / 顾问画像 等 sections */}
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

## 4. 数据模型

### 4.1 实体关系（3 张独立表）

```
┌─────────────────────┐
│  articles            │   公开内容（资源智库）
└─────────────────────┘

┌─────────────────────┐
│  enterprise_leads    │   /find-talent 写入
└─────────────────────┘

┌─────────────────────┐
│  talent_leads       │   /join 写入
└─────────────────────┘
```

**设计原则：所有表独立，无外键关联。** 内容型网站典型特征，每张表存储一类数据，页面按需读取。未来如需关联通过应用层 ID 引用，不引入数据库外键。

### 4.2 TypeScript 类型（types/index.ts）

```typescript
export interface Article {
  id: number;
  title: string;
  category: string;        // "AI + 组织" / "AI + 增长" / "AI + 产品" / "组织"
  type: string;            // "案例研究" / "方法论" / "人才研究" / "实践指南"
  date: string;            // 显示日期，如 "2025.03"
  summary: string;
  hero_image: string;      // /images/... 路径
  content: string;         // Markdown 正文
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EnterpriseLeadInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  role?: string;       // 岗位类型
  stage?: string;      // 企业阶段
  challenge: string;
  timeline?: string;
}

export interface TalentLeadInput {
  name: string;
  email: string;
  phone?: string;
  role?: string;       // 核心领域
  bio: string;         // 个人简介
}
```

### 4.3 Zod schemas

详见 API.md §3。前后端共享同一份 schema。

---

## 5. 代码规范

详见 git-instruction.md §6。

### 关键模式

**inline style 与 className 混用** — 设计令牌中的硬色值就近呈现，便于阅读：
```tsx
<span className="text-xs tracking-[0.2em] font-medium mb-4 block" style={{ color: '#10b981' }}>
  ZUO AN NEXUS
</span>
```

**AnimatedSection 每页内联** — 不抽到全局：
```tsx
function AnimatedSection({ children, className = '', style = {} }) { ... }
```

**Phosphor 图标，duotone weight：**
```tsx
import { ShieldCheck } from '@phosphor-icons/react';
<ShieldCheck size={22} weight="duotone" color="#10b981" />
```

---

## 6. 扩展预留（当前不实现，但架构不阻碍）

| 未来需求 | 预留方式 | 触发条件 |
|----------|---------|---------|
| 用户登录 | Supabase Auth 已内置，添加 `profiles` 表即可 | 需要人才自助更新档案时 |
| 管理后台 | 独立前端应用，通过同一 Supabase 实例访问数据 | 内容量达到运营负担阈值时 |
| 文章评论 | 添加 `comments` 表关联 `articles.id` | 社区互动需求明确时 |
| 邮件订阅 | 添加 `subscribers` 表 + 提交端点 | 内容驱动转化策略明确时 |
| 人才档案 | 添加 `talent_profiles` 表 + Supabase Auth | 顾问需要登录管理信息时 |
| 项目匹配 | 应用层标签匹配 | 人才池达到一定规模时 |

**关键约束：** 触发条件满足前不写任何代码或接口。

---

## 7. 架构变更记录

| 日期 | 变更 | 原因 |
|------|------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本文件是活文档。每次架构级变更必须在此更新变更记录。**
> **架构变更的判断标准：新增/删除模块、修改数据流方向、新增数据表、引入新依赖。**
