# ZAN Architecture

> **定位：** 本文档定义系统的模块边界和数据流向。AI 开发时所有结构性决策必须以此为边界，不得自行扩展模块或引入新的分层。
> **原则：** 刚刚好的架构。满足当前 13 个页面的需求，不提前设计用户系统、管理后台或实时通信。
> **演进：** 本文档随项目发展逐步更新，每次架构变更需在此记录。

---

## 1. 系统总览

```
┌────────────────────────────────────────────────────────┐
│                     Browser                             │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Pages    │  │ Sections │  │  Layout   │  │  UI    │ │
│  │ (13个)   │→ │ (可复用) │→ │ Header    │→ │ shadcn │ │
│  │          │  │          │  │ Footer    │  │        │ │
│  └────┬─────┘  └──────────┘  └──────────┘  └────────┘ │
│       │                                                │
│       │ 调用                                            │
│       ▼                                                │
│  ┌──────────┐  ┌──────────┐                            │
│  │  Hooks   │  │  Types   │                            │
│  │ 数据获取  │  │ 类型定义  │                            │
│  └────┬─────┘  └──────────┘                            │
│       │                                                │
└───────┼────────────────────────────────────────────────┘
        │
        │ HTTP (fetch)
        │
   ┌────┴─────────────────────────┐
   │                              │
   ▼                              ▼
┌──────────────┐          ┌──────────────┐
│  Supabase    │          │  Vercel      │
│  Client SDK  │          │  Serverless  │
│  (直接读取)  │          │  Functions   │
│              │          │  (写入)      │
└──────┬───────┘          └──────┬───────┘
       │                         │
       ▼                         ▼
┌────────────────────────────────────────┐
│          Supabase (PostgreSQL)          │
│                                        │
│  enterprise_leads │ talent_leads       │
│  projects         │ articles           │
│  programs                              │
└────────────────────────────────────────┘
```

### 数据流方向（单向，严格区分读写）

```
读取（公开内容）：
  Page → Hook → Supabase Client SDK → PostgreSQL (RLS: published = true)

写入（表单提交）：
  Page → React Hook Form → POST /api/* → Serverless Function → Supabase Service Role → PostgreSQL
```

**为什么读写分离：** 公开内容通过 Supabase 客户端直接读取（减少一层 API 调用，降低延迟），表单提交走 Serverless Function（服务端验证 + 绕过 RLS 写入 + 速率限制）。

---

## 2. 目录结构

```
zoan/
│
├── public/
│   └── images/                    # 静态图片（logo、二维码、OG图等）
│
├── src/
│   │
│   ├── components/                # ── UI 组件层 ──
│   │   ├── ui/                    # shadcn/ui 组件（仅通过 CLI 生成）
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── checkbox.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                # 页面外壳组件（全局）
│   │   │   ├── Header.tsx         #   顶部导航 + 双CTA
│   │   │   ├── Footer.tsx         #   底部四列布局
│   │   │   ├── MobileMenu.tsx     #   移动端侧边菜单
│   │   │   └── Container.tsx      #   max-width 容器
│   │   │
│   │   ├── sections/              # 页面区块组件（可在多页复用）
│   │   │   ├── HeroSection.tsx    #   Hero 区（标题+副标题+CTA）
│   │   │   ├── FeatureCards.tsx   #   特性/差异化卡片组
│   │   │   ├── ProcessFlow.tsx    #   流程步骤可视化
│   │   │   ├── ProjectCard.tsx    #   单个项目/JD卡片
│   │   │   ├── ArticleCard.tsx    #   单篇文章卡片
│   │   │   ├── ProgramCard.tsx    #   单个课程卡片
│   │   │   └── CTASection.tsx     #   通用底部行动号召
│   │   │
│   │   └── shared/                # 跨页面共享的小组件
│   │       ├── RevealOnScroll.tsx #   滚动渐入动画
│   │       ├── FilterBar.tsx      #   筛选器（行业/职能/状态）
│   │       ├── SectionHeading.tsx #   统一的区块标题
│   │       └── FormSuccess.tsx    #   表单提交成功提示
│   │
│   ├── pages/                     # ── 页面层（13个，每页一个文件）──
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── WhyZoan.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Projects.tsx           # ★ 核心页面，带筛选
│   │   ├── Insights.tsx
│   │   ├── InsightDetail.tsx      #   /insights/:slug
│   │   ├── Programs.tsx
│   │   ├── EnterpriseContact.tsx  #   企业表单
│   │   ├── TalentApply.tsx        #   人才表单
│   │   ├── Privacy.tsx
│   │   └── Terms.tsx
│   │
│   ├── lib/                       # ── 基础设施层 ──
│   │   ├── supabase.ts            #   Supabase 客户端（读取用）
│   │   ├── api.ts                 #   API 调用封装（写入用）
│   │   └── utils.ts               #   cn() 等通用工具
│   │
│   ├── types/                     # ── 类型层 ──
│   │   └── index.ts               #   所有业务类型集中定义
│   │
│   ├── hooks/                     # ── 数据获取层 ──
│   │   ├── useProjects.ts         #   GET projects
│   │   ├── useArticles.ts         #   GET articles (+ single by slug)
│   │   └── usePrograms.ts         #   GET programs
│   │
│   ├── styles/
│   │   └── globals.css            # Tailwind 令牌 + 全局样式
│   │
│   ├── App.tsx                    # 路由配置
│   └── main.tsx                   # 入口
│
├── api/                           # ── Serverless Functions ──
│   ├── enterprise-lead.ts         #   POST 企业线索
│   ├── talent-lead.ts             #   POST 人才线索
│   ├── projects.ts                #   GET 项目列表（备用，主用客户端直读）
│   ├── articles.ts                #   GET 文章列表（备用）
│   └── programs.ts                #   GET 课程列表（备用）
│
├── supabase/
│   ├── config.toml
│   └── migrations/
│       └── 001_initial_schema.sql #   初始建表
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── .env.example
```

### 模块边界规则

| 规则 | 说明 |
|------|------|
| **pages 只组合不实现** | 页面组件只负责组合 sections + 调用 hooks，不包含业务逻辑 |
| **sections 不知道数据来源** | section 组件通过 props 接收数据，不直接调用 hooks |
| **hooks 不知道 UI** | hooks 只负责数据获取和缓存，不引用任何组件 |
| **ui/ 不手动修改** | shadcn 组件仅通过 CLI 管理，定制通过 className 覆盖 |
| **lib/ 无 UI 依赖** | 工具库不引用 React 或组件 |

### 依赖方向（单向，禁止反向依赖）

```
pages → sections → ui
  │
  ├──→ hooks → lib/supabase
  │
  └──→ types（被所有层引用，不依赖任何层）
```

---

## 3. 核心模块划分

### 3.1 页面模块（pages/）

每个页面组件遵循统一结构：

```tsx
// pages/Projects.tsx — 示例
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/sections/HeroSection';
import { FilterBar } from '@/components/shared/FilterBar';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { CTASection } from '@/components/sections/CTASection';
import { useProjects } from '@/hooks/useProjects';
import { useState } from 'react';

export function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [filters, setFilters] = useState({ industry: '', function: '', status: '' });

  return (
    <>
      <HeroSection title="项目机会" subtitle="..." />
      <Container>
        <FilterBar filters={filters} onChange={setFilters} />
        {/* 卡片列表 */}
      </Container>
      <CTASection type="talent" />
    </>
  );
}
```

**规则：**
- 页面是唯一调用 hooks 的地方
- 页面负责组织 section 的顺序和传递数据
- 页面间不互相引用

### 3.2 区块模块（sections/）

每个 section 组件是独立的视觉区块，可在不同页面复用：

| 组件 | 接收 Props | 复用场景 |
|------|-----------|---------|
| `HeroSection` | title, subtitle, cta? | 几乎每个页面 |
| `FeatureCards` | cards: {icon, title, desc}[] | 首页、WhyZoan |
| `ProcessFlow` | steps: {title, desc}[] | 首页、Process |
| `ProjectCard` | project: Project | Projects、首页 |
| `ArticleCard` | article: ArticleSummary | Insights |
| `ProgramCard` | program: Program | Programs |
| `CTASection` | type: 'enterprise' \| 'talent' | 多个页面底部 |

### 3.3 数据获取模块（hooks/）

每个 hook 对应一个数据实体，封装 TanStack Query 的配置：

```typescript
// hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

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
      if (filters?.function) query = query.eq('function', filters.function);

      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

### 3.4 API 模块（api/）

每个 Serverless Function 对应一个端点，职责单一：

```typescript
// api/enterprise-lead.ts — 示例结构
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { enterpriseLeadSchema } from '../src/types/schemas';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  // 1. 验证
  const result = enterpriseLeadSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: 'Validation failed' });

  // 2. 写入
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await supabase.from('enterprise_leads').insert(result.data);

  // 3. 响应
  if (error) return res.status(500).json({ error: 'Internal error' });
  return res.status(200).json({ success: true });
}
```

---

## 4. 数据模型

### 4.1 实体关系

```
┌─────────────────────┐
│  enterprise_leads    │    写入专用，无关联
│  (企业线索)          │
└─────────────────────┘

┌─────────────────────┐
│  talent_leads       │    写入专用，无关联
│  (人才线索)         │
└─────────────────────┘

┌─────────────────────┐
│  projects           │    独立，无外键关联
│  (项目/JD)          │
└─────────────────────┘

┌─────────────────────┐
│  articles           │    独立，无外键关联
│  (洞察文章)         │
└─────────────────────┘

┌─────────────────────┐
│  programs           │    独立，无外键关联
│  (课程项目)         │
└─────────────────────┘
```

**设计原则：第一阶段所有表独立，无外键关联。** 这是内容型网站的典型特征——每张表存储一类内容，页面按需读取，表之间没有关系。未来如果需要关联（比如"文章引用了某个项目"），通过应用层逻辑（slug/ID 引用）而非数据库外键实现。

### 4.2 TypeScript 类型定义

```typescript
// types/index.ts

// ── 项目 ──
export interface Project {
  id: string;
  title: string;
  industry: string;
  function: string;
  status: 'ongoing' | 'completed';
  narrative: string;
  requirements: string | null;
  outcomes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectFilters {
  industry?: string;
  function?: string;
  status?: 'ongoing' | 'completed';
}

// ── 文章 ──
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  topic: string;
  cover_image: string | null;
  published_at: string | null;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  topic: string;
  cover_image: string | null;
  published_at: string | null;
}

// ── 课程 ──
export interface Program {
  id: string;
  title: string;
  description: string;
  format: string | null;
  duration: string | null;
  cover_image: string | null;
}

// ── 表单输入 ──
export interface EnterpriseLeadInput {
  name: string;
  company: string;
  title: string;
  contact: string;
  challenge?: string;
  consent: boolean;
}

export interface TalentLeadInput {
  name: string;
  position: string;
  industry: string;
  skills?: string;
  contact: string;
  consent: boolean;
}
```

### 4.3 Zod 验证 Schema

```typescript
// types/schemas.ts — 前后端共用的验证规则
import { z } from 'zod';

export const enterpriseLeadSchema = z.object({
  name: z.string().min(1, '请输入姓名').max(50),
  company: z.string().min(1, '请输入公司名称').max(100),
  title: z.string().min(1, '请输入职位').max(50),
  contact: z.string().min(1, '请输入联系方式').max(100),
  challenge: z.string().max(1000).optional(),
  consent: z.literal(true, { message: '请同意隐私政策' }),
});

export const talentLeadSchema = z.object({
  name: z.string().min(1, '请输入姓名').max(50),
  position: z.string().min(1, '请输入职位').max(100),
  industry: z.string().min(1, '请输入所在行业').max(50),
  skills: z.string().max(200).optional(),
  contact: z.string().min(1, '请输入联系方式').max(100),
  consent: z.literal(true, { message: '请同意隐私政策' }),
});
```

### 4.4 数据库建表 SQL

```sql
-- supabase/migrations/001_initial_schema.sql

-- 企业线索
CREATE TABLE enterprise_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  company    TEXT NOT NULL,
  title      TEXT NOT NULL,
  contact    TEXT NOT NULL,
  challenge  TEXT,
  consent    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 人才线索
CREATE TABLE talent_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  position   TEXT NOT NULL,
  industry   TEXT NOT NULL,
  skills     TEXT,
  contact    TEXT NOT NULL,
  consent    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 项目/JD
CREATE TABLE projects (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  industry     TEXT NOT NULL,
  function     TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed')),
  narrative    TEXT NOT NULL,
  requirements TEXT,
  outcomes     TEXT,
  sort_order   INT DEFAULT 0,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- 洞察文章
CREATE TABLE articles (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  topic        TEXT NOT NULL,
  cover_image  TEXT,
  published    BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- 课程项目
CREATE TABLE programs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  format       TEXT,
  duration     TEXT,
  cover_image  TEXT,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ── Row Level Security ──

-- 公开内容：可读，不可写
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published projects readable" ON projects
  FOR SELECT USING (published = true);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles readable" ON articles
  FOR SELECT USING (published = true);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published programs readable" ON programs
  FOR SELECT USING (published = true);

-- 表单线索：仅可插入，不可读取
ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insert enterprise leads" ON enterprise_leads
  FOR INSERT WITH CHECK (true);

ALTER TABLE talent_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insert talent leads" ON talent_leads
  FOR INSERT WITH CHECK (true);
```

---

## 5. 代码规范

### 5.1 组件编写模式

```tsx
// ── 标准 section 组件模板 ──

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onInteract?: (id: string) => void;
}

export function ProjectCard({ project, onInteract }: ProjectCardProps) {
  const statusLabel = project.status === 'ongoing' ? '进行中' : '已完成';

  return (
    <Card className="group p-6 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="secondary">{project.industry}</Badge>
        <Badge variant="secondary">{project.function}</Badge>
        <Badge variant={project.status === 'ongoing' ? 'default' : 'outline'}>
          {statusLabel}
        </Badge>
      </div>
      <p className="text-text-primary leading-relaxed">{project.narrative}</p>
      {project.status === 'ongoing' && onInteract && (
        <button
          onClick={() => onInteract(project.id)}
          className="mt-4 text-accent hover:text-accent-hover transition-colors"
        >
          我对这个机会感兴趣 →
        </button>
      )}
    </Card>
  );
}
```

### 5.2 Hook 编写模式

```typescript
// ── 标准 hook 模板 ──

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { EntityType } from '@/types';

export function useEntities(filter?: FilterType) {
  return useQuery({
    queryKey: ['entities', filter],
    queryFn: async () => {
      let query = supabase.from('entities').select('*').eq('published', true);

      if (filter?.field) query = query.eq('field', filter.field);

      const { data, error } = await query;
      if (error) throw error;
      return data as EntityType[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

### 5.3 Serverless Function 编写模式

```typescript
// ── 标准 API 端点模板 ──

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// 验证 schema（从共享类型导入）
import { entitySchema } from '../src/types/schemas';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 方法检查
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 输入验证
  const result = entitySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
  }

  // 数据写入
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from('table_name').insert(result.data);

  if (error) {
    console.error('DB error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ success: true });
}
```

### 5.4 页面组件编写模式

```tsx
// ── 标准页面模板 ──

import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';

export function PageName() {
  return (
    <>
      <HeroSection
        title="页面标题"
        subtitle="页面副标题描述"
      />
      <Container>
        {/* 页面主要内容 */}
      </Container>
      <CTASection type="enterprise" />
    </>
  );
}
```

---

## 6. 扩展预留（当前不实现，但架构不阻碍）

以下功能在当前阶段不实现，但架构设计不应阻碍未来添加：

| 未来需求 | 当前架构如何预留 | 触发条件 |
|----------|----------------|---------|
| **用户登录** | Supabase 已内置 Auth，添加 `profiles` 表即可 | 需要人才自助更新档案时 |
| **管理后台** | 独立的前端应用，通过同一 Supabase 实例访问数据 | 运营团队需要自助发布内容时 |
| **文章评论** | 添加 `comments` 表关联 `articles.id` | 社区互动需求明确时 |
| **人才档案** | 添加 `talent_profiles` 表 + Supabase Auth | 需要人才登录管理信息时 |
| **项目匹配** | 应用层逻辑，在 `talent_profiles` 和 `projects` 之间做标签匹配 | 人才池达到一定规模时 |

**关键约束：** 以上功能只在触发条件满足时才启动设计，不提前写任何代码或接口。

---

## 7. 架构变更记录

| 日期 | 变更 | 原因 |
|------|------|------|
| 2026-05-16 | 初始架构定义 | 项目从静态 HTML 迁移到 React 全栈架构 |
| 2026-05-17 | 明确公开内容读取不经过 Serverless API:`projects` / `articles` / `programs` 由前端 hook 通过 Supabase 客户端 SDK 直读,RLS 限制 `published=true`。API.md 与 PRD §9 同步删除原"备用"只读端点 | Phase 3 落地时确认:加 Serverless 一层对只读场景无收益(冷启动、多一跳网络);RLS + anon key 已是 Supabase 标准模式。读写分离规范从默认升级为强制约定 |

---

> **本文件是活文档。每次架构级变更必须在此更新变更记录。**
> **架构变更的判断标准：新增/删除模块、修改数据流方向、新增数据表、引入新依赖。**
