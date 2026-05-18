# ZAN Technical Instructions

> **目的：** 本文件是 AI 辅助开发的硬性技术约束。所有代码生成必须遵守本文档的规定，不得偏离。
> **与 PRD.md 的关系：** PRD 定义"做什么"，本文件定义"怎么做"。两者共同构成 AI 开发的 harness。

---

## 1. 技术栈总览

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  React 19 + Vite + TypeScript (strict)          │
│  TailwindCSS v3.4 + tailwindcss-animate          │
│  shadcn/ui (Button + 表单组件 + Separator)       │
│  react-router v7                                 │
│  TanStack Query · RHF + Zod                      │
│  GSAP + ScrollTrigger                            │
│  @phosphor-icons/react                           │
│  react-markdown                                  │
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

### 2.1 框架：React 19（强制）

| 规则 | 说明 |
|------|------|
| **使用 React 19** | 不使用其他框架 |
| **函数组件 + Hooks** | 禁止 class 组件 |
| **组件命名** | PascalCase 文件名，**页面使用 default export，普通组件使用 named export 或 default 均可** |

```tsx
// ✅ 页面 default export
export default function Home() { ... }

// ✅ 组件 named 或 default 均可
export function CountUp() { ... }
export default function FormAlert() { ... }

// ❌ 禁止 class
export default class Home extends React.Component { ... }
```

### 2.2 构建工具：Vite（强制）

| 规则 | 说明 |
|------|------|
| **使用 Vite** | 不使用 Webpack、CRA、Next.js |
| **不引入 SSR** | SPA + Serverless 架构，SEO 通过 Vercel prerender 处理 |

### 2.3 语言：TypeScript strict（强制）

| 规则 | 说明 |
|------|------|
| **.ts / .tsx 唯一** | src/ 内禁止 .js / .jsx |
| **strict: true** | tsconfig 启用 strict |
| **避免 any** | 优先 `unknown` + 类型守卫；联合类型确保完整覆盖 |
| **显式类型** | 函数参数和返回值声明类型 |
| **interface 优先** | 对象类型用 `interface`，联合 / 交叉类型用 `type` |

### 2.4 样式：TailwindCSS v3.4（强制）

| 规则 | 说明 |
|------|------|
| **使用 Tailwind v3.4 + tailwindcss-animate** | 不引入 v4 |
| **配置文件**：`tailwind.config.js` + `postcss.config.js` | v3 需要 JS 配置 |
| **设计令牌在 `src/index.css` 的 `:root`** | CSS 变量定义所有色彩、字体、半径；Tailwind config 用 `hsl(var(--xxx))` 引用 |
| **允许 inline style 与 className 混用** | 设计令牌中的硬色值通过 inline `style={{ backgroundColor: '#10b981' }}` 直接使用可接受，便于视觉令牌就近呈现 |
| **禁止独立 CSS 文件** | 除了 `index.css`，不允许其他 .css 文件 |
| **禁止 CSS Modules / styled-components** | 仅 Tailwind + inline style |

### 2.5 组件库：shadcn/ui（受限使用）

| 规则 | 说明 |
|------|------|
| **shadcn 用于表单与基础控件** | Button、Input、Textarea、Select、Label、Separator |
| **营销页不用 shadcn 装饰组件** | Hero / 卡片 / 徽章 等用手写 div + Tailwind 实现，保持视觉调性 |
| **通过 CLI 添加** | `npx shadcn@latest add <component>` |

**当前需要的 shadcn 组件**：
- `button` — 表单提交（CTA 用裸 Link）
- `input` — 表单输入
- `textarea` — 表单 textarea
- `select` — 下拉选择
- `label` — 表单标签
- `separator` — 分隔线（按需）

**不引入**：`card`、`badge`、`dialog`、`sheet`、`dropdown-menu` 等。

### 2.6 路由：react-router v7

| 规则 | 说明 |
|------|------|
| **使用 react-router v7** | 统一包，导入 `from 'react-router'` |
| **不使用 react-router-dom** | v7 已合并 |
| **路由集中** | 所有路由在 `src/App.tsx` |
| **不强制懒加载** | 当前页面数量适中，可统一 import |

### 2.7 数据获取：TanStack Query

| 规则 | 说明 |
|------|------|
| **使用 TanStack Query** | 唯一的服务端数据获取方式 |
| **自定义 hooks** | 每个数据实体对应一个 hook |
| **缓存策略** | 公开内容 `staleTime: 5 分钟` |
| **禁止裸 useEffect + fetch** | 必须经 TanStack Query 包装 |

### 2.8 表单：React Hook Form + Zod

| 规则 | 说明 |
|------|------|
| **使用 React Hook Form** | 不用受控组件手动管理 state |
| **Zod 验证** | schema 定义在 `src/types/schemas.ts`，前后端共享 |
| **前后端一致** | 前端 resolver 与后端 Serverless 用同一份 schema |
| **错误显示** | 字段下方红色小字，与 FormAlert 浮层配合 |

### 2.9 动效：GSAP + ScrollTrigger

| 规则 | 说明 |
|------|------|
| **使用 GSAP + ScrollTrigger** | 唯一的滚动触发动画方案 |
| **AnimatedSection 内联模式** | 每个 page 文件顶部定义自己的 wrapper，不抽到全局组件目录 |
| **必须 cleanup** | useEffect 返回 cleanup，kill 当前组件创建的 ScrollTrigger，避免泄漏 |
| **遵守动效区间** | 时长、缓动、触发点遵循 UI_GUIDELINES.md `Animation` 章节的区间 |
| **禁止其他动效库** | 不引入 framer-motion / lottie / react-spring |

### 2.10 图标：@phosphor-icons/react

| 规则 | 说明 |
|------|------|
| **使用 Phosphor** | `import { ShieldCheck, ... } from '@phosphor-icons/react'` |
| **推荐 weight="duotone"** | 与设计调性匹配 |
| **size 默认 20-24** | 内联图标取较小值，特性卡片取较大值 |
| **禁止 lucide-react** | 不引入 |

### 2.11 文章渲染：react-markdown

| 规则 | 说明 |
|------|------|
| **使用 react-markdown** | 文章 content 字段以 Markdown 文本存储 |
| **样式通过 `.rich-text-content` 类** | globals.css 中已定义富文本样式 |

---

## 3. 后端技术规范

### 3.1 架构：Vercel Serverless Functions

| 规则 | 说明 |
|------|------|
| **Serverless Only** | 不搭建任何需常驻运行的服务器 |
| **函数位置** | `api/` 文件夹，每个文件对应一个端点 |
| **TypeScript** | API 函数同样使用 TypeScript |
| **无状态** | 每次调用独立，不依赖内存中的全局状态（速率限制内存 map 在冷启动重置可接受） |

```
api/
├── enterprise-lead.ts    → POST /api/enterprise-lead
└── talent-lead.ts        → POST /api/talent-lead
```

### 3.2 API 规范

| 规则 | 说明 |
|------|------|
| **RESTful** | GET 读资源、POST 创建资源 |
| **JSON 响应** | 所有响应使用 JSON 格式 |
| **统一错误格式** | `{ "error": "...", "details": {...} }` |
| **速率限制** | 表单端点每 IP 每小时上限 5 次 |
| **输入验证** | 服务端 Zod 严格验证，不信任前端 |
| **不暴露内部信息** | 错误响应不返回堆栈 / SQL 错误 / 内部 ID |

详见 API.md。

### 3.3 禁止的后端技术

| 禁止 | 原因 |
|----------|------|
| Express / Koa / NestJS / Hono | Serverless 已满足需求，不需要常驻服务器 |
| tRPC | REST + Zod 足够覆盖当前接口，避免类型层耦合 |
| GraphQL | 接口简单，引入 GraphQL 增加复杂度 |
| Drizzle / Prisma 等 ORM | 使用 Supabase 客户端的 query builder |
| WebSocket / SSE | 当前无实时需求 |
| MySQL / 自建数据库 | 仅使用 Supabase Postgres |

---

## 4. 数据库技术规范

详见 DATABASE.md。

| 规则 | 说明 |
|------|------|
| **Supabase (PostgreSQL)** | 唯一数据库 |
| **客户端库** | `@supabase/supabase-js` |
| **RLS 强制** | 所有表启用 Row Level Security |
| **迁移在 supabase/migrations/** | 序号前缀，禁止修改已执行的迁移文件 |

---

## 5. 项目结构

详见 FOLDER_STRUCTURE.md。

简略目录：
```
src/
├── components/
│   ├── ui/                # shadcn (button, input, textarea, select, label, separator)
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CountUp.tsx
│   ├── FormAlert.tsx
│   ├── Skeleton.tsx
│   └── ParticleNetwork.tsx  (可选)
├── pages/                 # 9 个页面（default export）
├── lib/                   # supabase.ts, api.ts, utils.ts
├── hooks/                 # useArticles.ts
├── types/                 # index.ts, schemas.ts
├── data/                  # articles.ts (种子)
└── index.css              # 全局样式 + 设计令牌
api/                       # enterprise-lead.ts, talent-lead.ts
supabase/migrations/       # 001-003 SQL
public/images/             # 允许一级子目录
public/videos/             # 视频资源
```

---

## 6. 编码规范

### 6.1 React 组件结构

```tsx
// 1. 类型定义
interface Props { ... }

// 2. 组件（页面用 default export，普通组件可 named）
export default function PageName() {
  // 2a. hooks
  // 2b. 派生状态
  // 2c. 事件处理
  // 2d. 渲染
  return ( ... );
}
```

### 6.2 通用规则

| 规则 | 说明 |
|------|------|
| **禁止 console.log** | 提交前移除 |
| **禁止 eslint-disable** | 修复 lint 而不是压制 |
| **禁止 TODO 注释** | 代码里要么实现要么不写 |
| **不写注释解释 "是什么"** | 代码自解释 |
| **可写注释解释 "为什么"** | 当逻辑不直观时 |
| **单文件无强制行数上限** | 页面文件可较长，但若超过 ~500 行建议评估是否能拆分 section |

### 6.3 依赖白名单

**生产依赖**：
```json
{
  "@supabase/supabase-js": "^2.x",
  "@tanstack/react-query": "^5.x",
  "@hookform/resolvers": "^3.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "react-hook-form": "^7.x",
  "react-router": "^7.x",
  "react-markdown": "^10.x",
  "zod": "^3.x",
  "gsap": "^3.x",
  "@phosphor-icons/react": "^2.x",
  "sonner": "^2.x",
  "react-helmet-async": "^3.x",
  "class-variance-authority": "^0.7.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x",
  "@radix-ui/react-slot": "^1.x",
  "@radix-ui/react-label": "^2.x",
  "@radix-ui/react-select": "^2.x"
}
```

**开发依赖**：
```json
{
  "tailwindcss": "^3.4.x",
  "tailwindcss-animate": "^1.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x",
  "typescript": "~5.x",
  "vite": "^7.x or ^8.x",
  "@vitejs/plugin-react": "^4.x or ^6.x"
}
```

### 6.4 依赖黑名单

| 依赖 | 原因 |
|------|------|
| `lucide-react` | 使用 Phosphor 替代 |
| `tailwindcss@4` / `@tailwindcss/vite` | 使用 v3 |
| `react-router-dom` | 使用 react-router v7 统一包 |
| `axios` | 原生 fetch 足够 |
| `moment.js` | 体积大，使用 `Intl.DateTimeFormat` 或 `date-fns` |
| `redux` / `zustand` | 当前无全局复杂状态 |
| `framer-motion` | GSAP 覆盖动效需求 |
| `lottie-web` / `@lottiefiles/*` | 不引入 Lottie |
| `tRPC` / `@trpc/*` | 使用 REST + Zod |
| `drizzle-orm` / `drizzle-kit` / `prisma` | 使用 Supabase 客户端 |
| `mysql2` / `postgres` 直连库 | 仅通过 Supabase 客户端访问数据库 |
| `hono` / `@hono/*` / `express` 等 | 不搭建服务器 |
| `superjson` | 不需要 |

**原则**：每次新增 npm 包必须在 commit message 中说明用途，且必须出现在白名单中。

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

### 7.2 环境分离

| 环境 | 用途 | 数据库 |
|------|------|--------|
| 本地开发 | `npm run dev` | Supabase 开发实例 |
| Preview | Vercel Preview Deploy | Supabase 开发实例 |
| Production | Vercel Production | Supabase 生产实例 |

---

## 8. 可调用的 Skills

按需调用，仅在场景匹配时使用：

| Skill | 触发场景 | 注意事项 |
|-------|----------|----------|
| `/shadcn` | 添加 / 搜索 / 定制 shadcn 组件 | 仅用于表单组件，营销页不引入装饰组件 |
| `/tailwind-design-system` | 设计令牌、构建样式系统 | 使用 v3 配置；令牌按 UI_GUIDELINES.md |
| `/supabase-postgres-best-practices` | 表结构、查询、RLS | 所有表必须 RLS |
| `/vercel-react-best-practices` | React 性能优化 | 不引入 Next.js 特有 API |
| `/frontend-design` | 构建新页面 / 复杂 UI | 必须遵守 UI_GUIDELINES.md 色彩与组件规范 |
| `/interaction-design` | 微交互、加载状态 | 使用 GSAP 实现，不引入新依赖 |
| `/webapp-testing` | Playwright 端到端测试 | 表单提交流程必测 |
| `/systematic-debugging` | bug 排查 | 6 步法 |
| `/simplify` | 审查过度工程化 | 遵循"最小代码"原则，但允许 inline style |
| `/defuddle` | 用户给 URL 让你阅读 | 替代 WebFetch |

---

## 9. 检查清单（每次提交前）

- [ ] 没有引入黑名单依赖
- [ ] 所有新文件是 `.ts` 或 `.tsx`
- [ ] 颜色使用 CSS 变量或设计令牌定义的 hex（不出现非令牌色值）
- [ ] UI 组件按规范：表单用 shadcn，营销页用手写 div
- [ ] 表单使用 React Hook Form + Zod
- [ ] 数据获取使用 TanStack Query + Supabase 客户端
- [ ] API 端点有 Zod 服务端再验证
- [ ] 没有 console.log
- [ ] 滚动动效用 GSAP，cleanup 时 kill ScrollTrigger
- [ ] 图标用 Phosphor，weight 与场景匹配
- [ ] 动效时长 / 缓动 / 触发点在 UI_GUIDELINES.md 给定区间内

---

## 10. 变更记录

| 日期 | 变更 | 原因 |
|------|------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本文档随技术栈变更同步维护。任何依赖白/黑名单变更、构建工具升级、架构调整必须先在此文档更新，再做实现。**
