# Folder Structure

> **定位：** 本文件是文件系统层级的硬性蓝图。AI 开发时创建的任何文件 / 目录必须在此文档定义的范围内，不得自行新建目录层级。
> **与 ARCHITECTURE.md 的关系：** ARCHITECTURE 定义模块边界和数据流向，本文档定义这些模块在磁盘上的物理位置。

---

## 1. 完整目录树

以下是项目允许的全部目录和文件。**不在列表中的目录 = 禁止创建。**

```
zoan/                                    ← 项目根目录
│
├── public/                              # 静态资源（构建时原样复制）
│   ├── images/                          # 图片资源（允许一级子目录）
│   │   ├── *.jpg / *.png / *.webp       # 平铺图片
│   │   └── <分类子目录>/                 # 仅允许一级子目录
│   ├── videos/                          # 视频资源
│   │   └── *.mp4
│   ├── favicon.svg
│   └── icons.svg
│
├── src/                                 # 源代码根目录
│   │
│   ├── components/                      # ── UI 组件（扁平）──
│   │   │
│   │   ├── ui/                          # shadcn/ui（仅 CLI 生成）
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── label.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── Navigation.tsx               # 顶部液态玻璃导航
│   │   ├── Footer.tsx                   # 底部 5 列网格
│   │   ├── CountUp.tsx                  # 数字爬升动画
│   │   ├── FormAlert.tsx                # 表单提交结果浮层
│   │   ├── Skeleton.tsx                 # 加载占位
│   │   └── ParticleNetwork.tsx          # 可选粒子背景
│   │
│   ├── pages/                           # ── 页面组件（每路由一个 default export）──
│   │   ├── Home.tsx                     #   /
│   │   ├── Services.tsx                 #   /services
│   │   ├── Resources.tsx                #   /resources
│   │   ├── ResourceDetail.tsx           #   /resources/:id
│   │   ├── Join.tsx                     #   /join
│   │   ├── FindTalent.tsx               #   /find-talent
│   │   ├── Privacy.tsx                  #   /privacy
│   │   ├── Terms.tsx                    #   /terms
│   │   └── NotFound.tsx                 #   *
│   │
│   ├── lib/                             # 基础设施（非 UI）
│   │   ├── supabase.ts                  #   Supabase 客户端初始化
│   │   ├── api.ts                       #   fetch 封装（写入用）
│   │   └── utils.ts                     #   cn() 等工具
│   │
│   ├── types/                           # TypeScript 类型
│   │   ├── index.ts                     #   业务类型
│   │   └── schemas.ts                   #   Zod schemas（前后端共享）
│   │
│   ├── hooks/                           # 自定义数据 hooks
│   │   └── useArticles.ts               #   文章列表 + 单篇详情
│   │
│   ├── data/                            # 种子数据（开发用，不进运行时）
│   │   └── articles.ts                  #   原始数据，转 SQL 后可删
│   │
│   ├── App.tsx                          # 路由配置
│   ├── main.tsx                         # 入口
│   └── index.css                        # Tailwind + 设计令牌 + 全局样式
│
├── api/                                 # Vercel Serverless Functions
│   ├── enterprise-lead.ts               #   POST /api/enterprise-lead
│   └── talent-lead.ts                   #   POST /api/talent-lead
│
├── supabase/                            # Supabase 配置和迁移
│   ├── config.toml                      #   Supabase CLI 配置
│   └── migrations/                      #   SQL 迁移脚本
│       ├── 001_*.sql
│       ├── 002_*.sql
│       └── 003_*.sql
│
├── index.html                           # Vite 入口
├── package.json
├── vite.config.ts
├── tsconfig.json                        # TypeScript 根配置
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js                   # Tailwind v3 配置
├── postcss.config.js
├── components.json                      # shadcn 配置
├── vercel.json
├── .env.example
├── .env.local                           # （不提交）
├── .gitignore
│
├── README.md                            # 项目说明
├── CLAUDE.md                            # AI 行为指南
├── PRD.md                               # 产品需求
├── git-instruction.md                   # 技术约束
├── UI_GUIDELINES.md                     # UI 规范
├── ARCHITECTURE.md                      # 系统架构
├── FOLDER_STRUCTURE.md                  # 本文件
├── DATABASE.md                          # 数据库
└── API.md                               # API 规格
```

---

## 2. 目录职责定义

每个目录有且仅有一个职责。文件放错位置 = 代码审查不通过。

### `src/components/ui/`

- **职责：** shadcn/ui 基础组件
- **来源：** 仅通过 `npx shadcn@latest add <name>` 生成
- **当前组件：** button, input, textarea, select, label, separator
- **禁止：** 手动创建文件、在此目录放置业务逻辑、修改组件默认导出
- **定制方式：** 通过 `className` prop 在使用处覆盖样式

### `src/components/`（扁平，无子目录）

- **职责：** 所有自定义组件平铺存放
- **当前文件：** Navigation, Footer, CountUp, FormAlert, Skeleton, ParticleNetwork
- **新增条件：** 仅当该组件被多个页面引用、或承担全局职责时
- **禁止：** 把页面专属的 section 抽到 components/，应内联在 page 文件中
- **禁止子目录：** 不创建 layout/、sections/、shared/ 等子目录

### `src/pages/`

- **职责：** 页面级组件，每个路由对应一个文件
- **规则：** 一个文件 = 一个页面 = 一个路由，使用 default export
- **风格：** 单文件可较长（含 inline AnimatedSection、inline style、长 JSX）
- **禁止：** 在此放置子组件文件、工具函数、数据获取逻辑
- **新增条件：** 仅当 PRD 新增路由时

### `src/lib/`

- **职责：** 基础设施代码（Supabase 客户端、fetch 封装、工具函数）
- **文件数：** 固定 3 个（supabase.ts, api.ts, utils.ts）
- **禁止：** 放置 React 组件、hooks、类型定义

### `src/types/`

- **职责：** TypeScript 类型定义和 Zod 验证 schema
- **文件数：** 固定 2 个（index.ts, schemas.ts）
- **禁止：** 在此放置任何运行时代码（函数、组件、副作用）

### `src/hooks/`

- **职责：** 自定义数据 hooks，每个对应一个数据实体
- **命名规则：** `use` + 实体名（如 `useArticles`）
- **新增条件：** 仅当新增数据表时
- **禁止：** 放置非数据获取的 hooks

### `src/data/`

- **职责：** 种子数据 / 静态查找表 / 临时硬编码数据
- **使用规则：** 仅开发期引用，不进入运行时；转 SQL 后可删除该文件
- **禁止：** 在生产路径中 import 此目录的内容

### `src/styles/` ❌（不创建）

- 全局样式集中在 `src/index.css`，不创建独立 styles/ 目录

### `api/`

- **职责：** Vercel Serverless Functions
- **命名规则：** kebab-case（如 `enterprise-lead.ts`）
- **新增条件：** 仅当 PRD 新增表单提交端点时
- **禁止：** 创建子目录、放置非 API 函数的代码

### `supabase/migrations/`

- **职责：** 数据库迁移 SQL 脚本
- **命名规则：** 序号前缀 + 描述（如 `001_initial_schema.sql`）
- **禁止：** 手动修改已执行的迁移文件（只能新增）

### `public/images/`

- **职责：** 静态图片资源
- **子目录：** 允许一级子目录（如 `candidates/`），禁止二级以上嵌套
- **大小限制：** 单张尽量压缩到 500KB 内；Hero 大图可酌情放宽
- **禁止：** 放置非图片文件

### `public/videos/`

- **职责：** 视频资源
- **大小限制：** 单个 ≤ 10MB（建议压缩后引入）

---

## 3. 禁止创建的目录和文件

### 禁止的目录

| 禁止 | 原因 |
|------|------|
| `src/components/layout/` | 全局壳组件直接在 components/ 下 |
| `src/components/sections/` | 页面 section 内联在 page 文件 |
| `src/components/shared/` | components/ 已扁平，复用组件直接放此层 |
| `src/components/pages/` | 重复嵌套，pages/ 已是页面层 |
| `src/components/common/` | 与扁平 components/ 重叠 |
| `src/components/custom/` | 命名模糊，职责不清 |
| `src/services/` | 与 lib/ + api/ 职责重叠 |
| `src/store/` | 无全局状态管理（不使用 Redux/Zustand） |
| `src/context/` | 第一阶段不需要 React Context |
| `src/utils/` | 与 lib/utils.ts 职责重叠 |
| `src/config/` | 配置在 vite.config / tsconfig |
| `src/constants/` | 常量放在使用的模块或 types/index.ts |
| `src/assets/` | 静态资源放 public/ |
| `src/routes/` | 路由定义在 App.tsx |
| `src/middleware/` | 无服务端中间件 |
| `src/helpers/` | 与 lib/ 职责重叠 |
| `src/styles/` | 全局样式集中在 src/index.css |
| `src/providers/` | 第一阶段无 Provider 层封装 |
| `src/shaders/` | 不使用 WebGL/Shader |
| `__tests__/` | 测试文件暂不单独建目录 |
| `docs/` | 文档放项目根目录的 MD 文件 |
| `scripts/` | 构建脚本放 package.json scripts |
| `db/` / `contracts/` | 不使用 Drizzle / tRPC |
| `public/images/<二级子目录>` | 仅允许一级 |

### 禁止的文件类型

| 禁止 | 原因 |
|------|------|
| `*.js` / `*.jsx`（src 内） | 全部 TypeScript（根目录 tailwind.config.js 等配置文件除外） |
| `*.module.css` | 不使用 CSS Modules |
| `*.styled.ts` | 不使用 styled-components |
| `*.test.ts` / `*.spec.ts` | 第一阶段不写测试文件 |
| `*.stories.tsx` | 不使用 Storybook |
| `*.css`（除 `src/index.css`） | 仅允许一个全局样式文件 |
| `.env`（无后缀） | 必须使用 `.env.local` 或 `.env.example` |

---

## 4. 新增文件的决策树

```
新文件是什么？
│
├── 基础 UI 组件（Button、Input 等）
│   → src/components/ui/（通过 shadcn CLI）
│
├── 页面级组件（有自己的路由）
│   → src/pages/（一个路由一个文件，default export）
│
├── 全局复用组件（Navigation、Footer、CountUp 等）
│   → src/components/（直接平铺，不要建子目录）
│
├── 页面专属 section
│   → 内联在 src/pages/<对应页面>.tsx 内，不创建独立文件
│
├── 数据获取 hook
│   → src/hooks/
│
├── 类型定义
│   → src/types/index.ts（追加到现有文件）
│
├── Zod 验证 schema
│   → src/types/schemas.ts（追加到现有文件）
│
├── 基础设施（Supabase、API、工具函数）
│   → src/lib/
│
├── 种子数据 / 静态查找表
│   → src/data/
│
├── Serverless API 端点
│   → api/
│
├── 数据库迁移
│   → supabase/migrations/
│
├── 图片资源
│   → public/images/ 或 public/images/<分类>/
│
├── 视频资源
│   → public/videos/
│
└── 以上都不匹配？
    → 不要创建新文件。重新评估是否可以用现有结构解决。
```

### 新增文件的规则

1. **先检查是否可以追加到现有文件。** types/index.ts、lib/utils.ts 等文件设计为可增长，优先追加而非新建。
2. **新建文件需要符合命名规范**（PascalCase 组件、camelCase hooks、kebab-case API）。
3. **新建顶级子目录需要 PRD 变更。** src/ 下现有子目录是固定的，不允许自行新增。

---

## 5. 文件移动规则

| 场景 | 规则 |
|------|------|
| section 变成页面专属 | 从 components/ 移入对应 pages/ 文件内联 |
| 组件被多页使用 | 从 page 内联抽出，放 components/ |
| 新增数据实体 | 对应添加 hooks/use<Entity>.ts |
| 新增 API 端点 | 对应添加 api/<entity>.ts |
| shadcn 组件不再需要 | 通过 `npx shadcn@latest remove <name>` 删除，不手动删除 |

---

## 6. 文件数量上限

为防止文件膨胀，设定以下软上限：

| 目录 | 当前文件数 | 上限 | 超出时的处理 |
|------|----------:|-----:|-------------|
| `pages/` | 9 | 15 | 超出需更新 PRD |
| `components/`（不含 ui/） | 6 | 12 | 评估是否能合并或内联 |
| `ui/` | 6 | — | 由 shadcn CLI 管理，无上限 |
| `hooks/` | 1 | 6 | 每对应一个数据表 |
| `lib/` | 3 | 5 | 超出需评估是否引入不必要的抽象 |
| `types/` | 2 | 3 | 几乎不增 |
| `api/` | 2 | 8 | 每对应一个 API 端点 |
| `data/` | 1 | 3 | 种子数据，转 SQL 后可删 |
| `public/images/`（平铺） | — | 50 | 超出考虑分到子目录 |
| `public/images/<subdir>` | — | 30 | — |

---

## 7. 变更记录

| 日期 | 变更 | 原因 |
|------|------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本文档随项目结构变更同步更新。每次新增 / 删除目录或文件需在此记录。**
