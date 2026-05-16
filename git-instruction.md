# ZAN Technical Instructions

> **目的：** 本文件是 AI 辅助开发的硬性技术约束。所有代码生成必须遵守本文档的规定，不得偏离。
> **与 PRD.md 的关系：** PRD 定义"做什么"，本文件定义"怎么做"。两者共同构成 AI 开发的 harness。

---

## 1. 技术栈总览

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  React 18 + Vite 5 + TypeScript (strict)        │
│  TailwindCSS v4 + shadcn/ui                     │
│  React Router v6 · TanStack Query · RHF + Zod   │
├─────────────────────────────────────────────────┤
│                   Backend                        │
│  Vercel Serverless Functions (Node.js)           │
├─────────────────────────────────────────────────┤
│                   Database                       │
│  Supabase (PostgreSQL + RLS + REST API)          │
├─────────────────────────────────────────────────┤
│                   Deployment                     │
│  Vercel + Custom Domain + Edge CDN              │
└─────────────────────────────────────────────────┘
```

---

## 2. 前端技术规范

### 2.1 框架：React（强制）

| 规则 | 说明 |
|------|------|
| **使用 React** | 仅 React，禁止 Vue、Svelte、Angular 或任何其他框架 |
| **禁止混用** | 不允许在同一项目中引入任何非 React 的响应式框架 |
| **函数组件** | 所有组件使用函数组件 + Hooks，禁止 class 组件 |
| **组件命名** | PascalCase（如 `ProjectCard.tsx`），每个文件一个组件 |

```tsx
// ✅ 正确
export function ProjectCard({ title, status }: ProjectCardProps) { ... }

// ❌ 禁止
export default class ProjectCard extends React.Component { ... }
```

### 2.2 构建工具：Vite（强制）

| 规则 | 说明 |
|------|------|
| **使用 Vite** | 仅 Vite，禁止 Webpack、Create React App、Next.js |
| **不使用 Next.js** | 这是 SPA + Serverless 架构，不是 SSR 框架。SEO 通过 Vercel prerender 解决 |

**相关 Skill：** `/next-best-practices` — 仅参考其中的 React 通用最佳实践，不使用 Next.js 特有 API（`use server`、Server Components、`next/` 导入等）。

### 2.3 语言：TypeScript strict 模式（强制）

| 规则 | 说明 |
|------|------|
| **所有文件使用 .ts / .tsx** | 禁止 .js / .jsx 文件 |
| **strict: true** | tsconfig.json 必须启用 strict 模式 |
| **禁止 any** | 不允许 `any` 类型，用 `unknown` + 类型守卫替代 |
| **显式类型** | 函数参数和返回值必须声明类型 |
| **接口优先** | 使用 `interface` 定义对象类型，`type` 用于联合/交叉类型 |

```tsx
// ✅ 正确
interface ProjectCardProps {
  title: string;
  status: 'ongoing' | 'completed';
  industry: string;
}

// ❌ 禁止
const ProjectCard = (props: any) => { ... }
```

### 2.4 样式：TailwindCSS v4（强制）

| 规则 | 说明 |
|------|------|
| **仅使用 Tailwind** | 禁止内联 style、禁止独立 CSS 文件（除 globals.css 外）、禁止 CSS Modules、禁止 styled-components |
| **设计令牌在 CSS 中定义** | Tailwind v4 使用 CSS-first 配置，颜色/间距/字体等令牌在 `globals.css` 中通过 `@theme` 定义 |
| **不使用 tailwind.config.js** | Tailwind v4 不需要 JS 配置文件 |

**相关 Skill：** `/tailwind-design-system` — 构建设计系统和组件时按需调用。

#### 色彩令牌（强制使用，不得硬编码颜色值）

```css
/* globals.css 中的 @theme 定义 */
@theme {
  --color-primary: #1B2B4B;
  --color-primary-light: #253A5E;
  --color-secondary: #F5F3EF;
  --color-border: #E8E6E1;
  --color-text-secondary: #6B7280;
  --color-accent: #8B7EC8;
  --color-accent-hover: #7A6DB5;
  --color-accent-light: oklch(0.65 0.12 280 / 0.1);
  --color-text-primary: #1A1A2E;
  --color-text-muted: #4A4A5A;
  --color-surface: #FFFFFF;
  --color-surface-dark: #0A0F1C;
}
```

**使用方式：** `bg-primary`、`text-accent`、`border-border` 等 Tailwind 类名。禁止在代码中出现 `#1B2B4B` 等硬编码颜色。

### 2.5 组件库：shadcn/ui（强制）

| 规则 | 说明 |
|------|------|
| **使用 shadcn/ui** | 所有基础 UI 组件（Button、Input、Card、Badge 等）使用 shadcn/ui |
| **不造轮子** | 需要新组件时先检查 shadcn/ui 是否有对应组件 |
| **通过 CLI 添加** | 使用 `npx shadcn@latest add <component>` 添加组件，不手动复制 |
| **可定制** | shadcn 组件源码在项目中，可以根据设计需求调整 |

**相关 Skill：** `/shadcn` — 添加、搜索、定制 shadcn 组件时调用。

#### shadcn 组件使用清单

以下组件预计会用到，按需添加：

| 组件 | 用途 |
|------|------|
| Button | 所有按钮（CTA、提交、导航） |
| Input / Textarea | 表单输入 |
| Checkbox | 隐私政策勾选 |
| Card | 项目卡片、文章卡片、课程卡片 |
| Badge | 行业标签、职能标签、状态标签 |
| Select | 筛选器下拉 |
| Dialog | 移动端菜单、确认弹窗 |
| Sheet | 移动端侧边导航 |
| Separator | 内容分割 |
| Skeleton | 加载占位 |

### 2.6 路由：React Router v6+

| 规则 | 说明 |
|------|------|
| **使用 React Router** | 禁止使用其他路由方案（TanStack Router、Wouter 等） |
| **懒加载** | 非首屏页面使用 `React.lazy` + `Suspense` 按需加载 |
| **路由定义集中** | 所有路由在 `App.tsx` 中集中定义 |

```tsx
// App.tsx 路由结构
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/why-zoan', element: <WhyZoan /> },
  { path: '/services', element: <Services /> },
  { path: '/services/process', element: <Process /> },
  { path: '/projects', element: <Projects /> },
  { path: '/insights', element: <Insights /> },
  { path: '/insights/:slug', element: <InsightDetail /> },
  { path: '/programs', element: <Programs /> },
  { path: '/enterprise/contact', element: <EnterpriseContact /> },
  { path: '/talent/apply', element: <TalentApply /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
];
```

### 2.7 数据获取：TanStack Query

| 规则 | 说明 |
|------|------|
| **使用 TanStack Query** | 所有服务端数据获取通过 TanStack Query，禁止裸 `useEffect` + `fetch` |
| **自定义 hooks** | 每个数据实体对应一个 hook（`useProjects`、`useArticles`） |
| **缓存策略** | 静态内容 staleTime 5 分钟，表单提交使用 mutation |

### 2.8 表单：React Hook Form + Zod

| 规则 | 说明 |
|------|------|
| **使用 React Hook Form** | 所有表单使用 RHF 管理，禁止受控组件手动管理 state |
| **Zod 验证** | 表单验证 schema 使用 Zod 定义，前后端共享同一 schema |
| **前后端一致** | 前端表单验证和后端 API 验证使用同一个 Zod schema |

**相关 Skill：** `/vercel-react-best-practices` — React 性能优化参考。

---

## 3. 后端技术规范

### 3.1 架构：Vercel Serverless Functions

| 规则 | 说明 |
|------|------|
| **Serverless Only** | 不搭建 Express/Koa/NestJS 服务器，仅使用 Vercel Serverless Functions |
| **函数位置** | API 函数放在项目根目录的 `api/` 文件夹，每个文件对应一个端点 |
| **TypeScript** | API 函数也使用 TypeScript |
| **无状态** | 每个函数调用独立，不依赖内存中的全局状态 |

```
api/
├── enterprise-lead.ts    → POST /api/enterprise-lead
├── talent-lead.ts        → POST /api/talent-lead
├── projects.ts           → GET  /api/projects
├── articles.ts           → GET  /api/articles
└── programs.ts           → GET  /api/programs
```

### 3.2 API 规范

| 规则 | 说明 |
|------|------|
| **RESTful** | GET 读取资源，POST 创建资源 |
| **JSON 响应** | 所有响应使用 JSON 格式 |
| **统一错误格式** | `{ "error": "message", "details": [...] }` |
| **速率限制** | 表单提交端点每个 IP 每小时 5 次 |
| **输入验证**** | 服务端使用 Zod 严格验证，不信任前端传入的任何数据 |
| **不暴露内部信息** | 错误响应不暴露堆栈跟踪、SQL 错误、内部 ID |

### 3.3 禁止的后端技术

| 禁止使用 | 原因 |
|----------|------|
| Express / Koa / NestJS | 不需要持久服务器，Serverless 够用 |
| tRPC | 过度工程化，REST 对这个项目足够 |
| GraphQL | 同上，页面少、查询简单，GraphQL 增加复杂度 |
| WebSocket | 当前无实时功能需求 |
| 任何需要持久运行的服务 | 与 Serverless 架构冲突 |

---

## 4. 数据库技术规范

### 4.1 Supabase (PostgreSQL)

| 规则 | 说明 |
|------|------|
| **使用 Supabase** | 禁止自建数据库、禁止 MongoDB、禁止 Firebase Realtime DB |
| **客户端库** | 使用 `@supabase/supabase-js`，禁止直接写 SQL 查询字符串（用 Supabase 的 query builder） |
| **RLS 强制** | 所有表必须启用 Row Level Security |
| **Schema 版本管理** | SQL 迁移脚本放在 `supabase/migrations/` 目录 |

**相关 Skill：** `/supabase-postgres-best-practices` — 数据库设计和查询优化时调用。

### 4.2 数据访问层

| 规则 | 说明 |
|------|------|
| **客户端直接读** | 公开内容（projects/articles/programs）通过 Supabase 客户端 + RLS 策略直接读取，不需要经过 Serverless Function |
| **写入走 API** | 表单提交通过 Serverless Function → Supabase 服务端客户端写入（绕过 RLS） |
| **Supabase 客户端初始化** | 在 `src/lib/supabase.ts` 中统一初始化，使用环境变量 |

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### 4.3 环境变量

```
# .env.local（不提交到 git）
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Serverless Functions 中使用（非 VITE_ 前缀）
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

| 规则 | 说明 |
|------|------|
| **VITE_ 前缀** | 前端可访问的变量使用 `VITE_` 前缀 |
| **Service Role Key** | 仅在 Serverless Function 中使用，不暴露到前端 |
| **.env.example** | 提供模板文件，列出所有需要的环境变量名（不含值） |

---

## 5. 项目结构规范

### 5.1 目录结构（强制遵守）

```
zoan/
├── public/images/              # 静态资源
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 组件（CLI 生成，不手写）
│   │   ├── layout/             # 布局组件：Header, Footer, Container
│   │   ├── sections/           # 页面 section 组件
│   │   └── shared/             # 跨页面复用的业务组件
│   ├── pages/                  # 页面组件（每个路由一个文件）
│   ├── lib/                    # 工具库：supabase client, api, utils
│   ├── types/                  # TypeScript 类型定义
│   ├── hooks/                  # 自定义 hooks
│   └── styles/globals.css      # 全局样式 + Tailwind 令牌
├── api/                        # Vercel Serverless Functions
├── supabase/migrations/        # 数据库迁移脚本
└── [配置文件]
```

### 5.2 文件命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面 | PascalCase | `Projects.tsx`, `InsightDetail.tsx` |
| 组件 | PascalCase | `ProjectCard.tsx`, `FilterBar.tsx` |
| Hooks | camelCase + use 前缀 | `useProjects.ts`, `useArticles.ts` |
| 工具 | camelCase | `supabase.ts`, `api.ts`, `utils.ts` |
| 类型 | camelCase | `index.ts`（统一导出） |
| API | kebab-case | `enterprise-lead.ts`, `talent-lead.ts` |
| 样式 | 仅一个 | `globals.css` |

### 5.3 导入规范

```typescript
// ✅ 使用 @ 路径别名
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types';

// ❌ 禁止相对路径跨级引用
import { Button } from '../../../components/ui/button';
```

在 `tsconfig.json` 和 `vite.config.ts` 中配置 `@` → `src/` 的路径别名。

---

## 6. 编码规范

### 6.1 React 组件规范

```tsx
// 组件结构顺序
// 1. 类型定义
interface Props {
  title: string;
  status: 'ongoing' | 'completed';
}

// 2. 组件函数
export function ProjectCard({ title, status }: Props) {
  // 2a. hooks
  const [isOpen, setIsOpen] = useState(false);

  // 2b. 派生状态
  const statusLabel = status === 'ongoing' ? '进行中' : '已完成';

  // 2c. 事件处理
  const handleClick = () => setIsOpen(prev => !prev);

  // 2d. 渲染
  return (
    <Card className="...">
      <Badge>{statusLabel}</Badge>
      <h3>{title}</h3>
    </Card>
  );
}
```

### 6.2 通用规则

| 规则 | 说明 |
|------|------|
| **禁止 console.log** | 提交前移除所有 console.log |
| **禁止 eslint-disable** | 解决 lint 问题，不要压制 |
| **禁止 TODO 注释** | 要么做要么不做，不留 TODO |
| **单文件不超过 300 行** | 超过则拆分组件 |
| **组件 prop 不超过 7 个** | 超过则组合为对象 prop |
| **不写注释解释"是什么"** | 代码本身应自解释 |
| **可写注释解释"为什么"** | 当逻辑不直观时注释原因 |

### 6.3 不引入的依赖（黑名单）

| 依赖 | 原因 | 替代 |
|------|------|------|
| axios | 项目简单，fetch 够用 | 原生 fetch + TanStack Query |
| lodash | 按需用原生方法 | `Array.filter`, `Object.entries` 等 |
| moment.js | 体积大 | `Intl.DateTimeFormat` 或 `date-fns`（如需） |
| Redux / Zustand | 无全局复杂状态 | React Context + TanStack Query |
| framer-motion | 动画需求简单 | CSS transition + IntersectionObserver |
| react-helmet | meta 标签管理 | React Router + document.title（简单场景） |

**原则：** 每新增一个 npm 包必须在 commit message 中说明理由。优先用浏览器原生 API 和已有依赖的能力。

---

## 7. 部署与环境规范

### 7.1 Vercel 配置

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
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 7.2 环境分离

| 环境 | 用途 | 数据库 |
|------|------|--------|
| 本地开发 | `npm run dev` | Supabase 本地实例 或 开发环境 |
| Preview | Vercel Preview Deploy | Supabase 开发环境 |
| Production | Vercel Production | Supabase 生产环境 |

---

## 8. 可调用的 Skills

以下已安装的 Skills 在对应场景中按需调用，不得使用未列出的 Skill 替代：

| Skill | 触发场景 | 注意事项 |
|-------|----------|----------|
| `/shadcn` | 添加/搜索/定制 shadcn 组件 | 必须使用 shadcn，不要自建基础组件 |
| `/tailwind-design-system` | 定义设计令牌、构建样式系统 | 颜色令牌必须使用 PRD 规定的值 |
| `/supabase-postgres-best-practices` | 设计表结构、优化查询、配置 RLS | 所有表必须启用 RLS |
| `/vercel-react-best-practices` | React 性能优化、组件模式 | 仅参考 React 通用实践，不使用 Next.js API |
| `/frontend-design` | 构建新的页面或复杂 UI 组件 | 必须遵守本文档的色彩和组件规范 |
| `/interaction-design` | 添加交互动效、微交互 | 仅使用 CSS transition，不引入 framer-motion |
| `/web-design-guidelines` | UI 审查、无障碍检查 | 确保专业咨询调性 |
| `/webapp-testing` | Playwright 端到端测试 | 表单提交流程必须测试 |
| `/systematic-debugging` | 遇到 bug 时系统性排查 | 不要猜测，按流程诊断 |
| `/simplify` | 审查代码是否过度工程化 | 遵循"最小代码"原则 |

---

## 9. 检查清单（每次提交前）

- [ ] 没有引入本文档黑名单中的依赖
- [ ] 所有新文件是 `.ts` 或 `.tsx`，无 `.js`/`.jsx`
- [ ] 没有使用 `any` 类型
- [ ] 颜色使用 Tailwind 令牌类名，无硬编码色值
- [ ] UI 组件优先使用 shadcn/ui
- [ ] 表单使用 React Hook Form + Zod 验证
- [ ] 数据获取使用 TanStack Query，无裸 useEffect + fetch
- [ ] API 端点有 Zod 服务端验证
- [ ] 没有 console.log
- [ ] 文件不超过 300 行

---

> **本文档与 PRD.md 同步维护。任何技术栈变更必须同时更新两份文档。**
