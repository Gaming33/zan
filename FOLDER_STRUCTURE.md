# Folder Structure

> **定位：** 本文件是文件系统层级的硬性蓝图。AI 开发时创建的任何文件/目录必须在此文档定义的范围内，不得自行新建目录层级。
> **与 ARCHITECTURE.md 的关系：** ARCHITECTURE 定义模块边界和数据流向，本文档定义这些模块在磁盘上的物理位置。

---

## 1. 完整目录树

以下是项目允许的全部目录和文件。**不在列表中的目录 = 禁止创建。**

```
zoan/                                    ← 项目根目录
│
├── public/                              # 静态资源（构建时原样复制）
│   └── images/                          # 图片资源
│       ├── logo.svg                     # ZOAN Logo
│       ├── og-image.png                 # 社交分享默认图
│       └── qrcode-wechat.png            # 公众号二维码
│
├── src/                                 # 源代码根目录
│   │
│   ├── components/                      # UI 组件
│   │   │
│   │   ├── ui/                          # shadcn/ui 组件（仅 CLI 生成）
│   │   │   ├── button.tsx               #   ← npx shadcn@latest add button
│   │   │   ├── card.tsx                 #   ← npx shadcn@latest add card
│   │   │   ├── badge.tsx                #   ← npx shadcn@latest add badge
│   │   │   ├── input.tsx                #   ← npx shadcn@latest add input
│   │   │   ├── textarea.tsx             #   ← npx shadcn@latest add textarea
│   │   │   ├── checkbox.tsx             #   ← npx shadcn@latest add checkbox
│   │   │   ├── select.tsx               #   ← npx shadcn@latest add select
│   │   │   ├── separator.tsx            #   ← npx shadcn@latest add separator
│   │   │   ├── skeleton.tsx             #   ← npx shadcn@latest add skeleton
│   │   │   └── ...                      #   按需通过 CLI 添加，不手写
│   │   │
│   │   ├── layout/                      # 页面外壳组件（全局）
│   │   │   ├── Header.tsx               #   顶部导航 + 双CTA
│   │   │   ├── Footer.tsx               #   底部四列布局
│   │   │   ├── MobileMenu.tsx           #   移动端侧边菜单
│   │   │   └── Container.tsx            #   max-width 内容容器
│   │   │
│   │   ├── sections/                    # 页面区块组件（可在多页复用）
│   │   │   ├── HeroSection.tsx          #   Hero 区块
│   │   │   ├── FeatureCards.tsx         #   特性/差异化卡片组
│   │   │   ├── ProcessFlow.tsx          #   流程步骤可视化
│   │   │   ├── ProjectCard.tsx          #   项目/JD 卡片
│   │   │   ├── ArticleCard.tsx          #   文章预览卡片
│   │   │   ├── ProgramCard.tsx          #   课程卡片
│   │   │   └── CTASection.tsx           #   通用底部行动号召
│   │   │
│   │   └── shared/                      # 跨页面共享的小组件
│   │       ├── RevealOnScroll.tsx       #   滚动渐入动画
│   │       ├── FilterBar.tsx            #   筛选器栏
│   │       ├── SectionHeading.tsx       #   统一区块标题
│   │       └── FormSuccess.tsx          #   表单提交成功提示
│   │
│   ├── pages/                           # 页面组件（每个路由一个）
│   │   ├── Home.tsx                     #   /
│   │   ├── About.tsx                    #   /about
│   │   ├── WhyZoan.tsx                  #   /why-zoan
│   │   ├── Services.tsx                 #   /services
│   │   ├── Process.tsx                  #   /services/process
│   │   ├── Projects.tsx                 #   /projects ★
│   │   ├── Insights.tsx                 #   /insights
│   │   ├── InsightDetail.tsx            #   /insights/:slug
│   │   ├── Programs.tsx                 #   /programs
│   │   ├── EnterpriseContact.tsx        #   /enterprise/contact
│   │   ├── TalentApply.tsx              #   /talent/apply
│   │   ├── Privacy.tsx                  #   /privacy
│   │   └── Terms.tsx                    #   /terms
│   │
│   ├── lib/                             # 基础设施（非 UI）
│   │   ├── supabase.ts                  #   Supabase 客户端初始化
│   │   ├── api.ts                       #   fetch 封装（写入用）
│   │   └── utils.ts                     #   cn() 等工具函数
│   │
│   ├── types/                           # TypeScript 类型
│   │   ├── index.ts                     #   业务类型（Project, Article, Program 等）
│   │   └── schemas.ts                   #   Zod 验证 schema（前后端共用）
│   │
│   ├── hooks/                           # 自定义数据 hooks
│   │   ├── useProjects.ts               #   项目数据
│   │   ├── useArticles.ts               #   文章数据
│   │   └── usePrograms.ts               #   课程数据
│   │
│   └── styles/                          # 样式（仅一个文件）
│       └── globals.css                  #   Tailwind 令牌 + 全局样式
│
├── api/                                 # Vercel Serverless Functions
│   ├── enterprise-lead.ts               #   POST 企业线索
│   ├── talent-lead.ts                   #   POST 人才线索
│   ├── projects.ts                      #   GET 项目（备用）
│   ├── articles.ts                      #   GET 文章（备用）
│   └── programs.ts                      #   GET 课程（备用）
│
├── supabase/                            # Supabase 配置和迁移
│   ├── config.toml                      #   Supabase CLI 配置
│   └── migrations/                      #   SQL 迁移脚本
│       └── 001_initial_schema.sql       #   初始建表
│
├── index.html                           # Vite 入口 HTML
├── package.json                         # 依赖和脚本
├── vite.config.ts                       # Vite 配置（含 @ 路径别名）
├── tsconfig.json                        # TypeScript 配置（strict: true）
├── components.json                      # shadcn/ui 配置
├── vercel.json                          # Vercel 部署配置
├── .env.example                         # 环境变量模板
├── .env.local                           # 本地环境变量（不提交）
├── .gitignore                           # Git 忽略规则
│
├── PRD.md                               # 产品需求文档
├── git-instruction.md                   # 技术栈约束
├── ARCHITECTURE.md                      # 系统架构
├── UI_GUIDELINES.md                     # UI 设计规范
└── FOLDER_STRUCTURE.md                  # 本文件
```

---

## 2. 目录职责定义

每个目录有且仅有一个职责。文件放错位置 = 代码审查不通过。

### `src/components/ui/`

- **职责：** shadcn/ui 基础组件
- **来源：** 仅通过 `npx shadcn@latest add <name>` 生成
- **禁止：** 手动创建文件、在此目录放置业务逻辑、修改组件默认导出
- **定制方式：** 通过 `className` prop 在使用处覆盖样式，不修改源文件

### `src/components/layout/`

- **职责：** 页面外壳组件（Header、Footer、Container）
- **文件数上限：** 4 个
- **允许新增：** 否（除非 PRD 变更导致页面结构改变）
- **禁止：** 在此放置非全局布局组件

### `src/components/sections/`

- **职责：** 可在多个页面复用的视觉区块组件
- **准入条件：** 至少被 2 个页面使用，或是一个完整的独立内容区块（如 HeroSection）
- **禁止：** 创建只被一个页面使用的 section（这种应直接写在 pages/ 中）

### `src/components/shared/`

- **职责：** 跨页面共享的小型功能性组件
- **准入条件：** 被多处引用且不属于 layout/ 或 sections/ 的组件
- **禁止：** 放置业务逻辑组件或大型区块组件

### `src/pages/`

- **职责：** 页面级组件，每个路由对应一个文件
- **规则：** 一个文件 = 一个页面 = 一个路由
- **禁止：** 在此放置子组件、工具函数、数据获取逻辑
- **新增条件：** 仅当 PRD 新增页面时

### `src/lib/`

- **职责：** 基础设施代码（Supabase 客户端、API 调用、工具函数）
- **文件数上限：** 3 个（supabase.ts、api.ts、utils.ts）
- **禁止：** 放置 React 组件、hooks、类型定义

### `src/types/`

- **职责：** TypeScript 类型定义和 Zod 验证 schema
- **文件数上限：** 2 个（index.ts、schemas.ts）
- **禁止：** 在此放置任何运行时代码（函数、组件、副作用）

### `src/hooks/`

- **职责：** 自定义 React hooks，每个对应一个数据实体
- **命名规则：** `use` + 实体名（如 `useProjects`）
- **新增条件：** 仅当新增数据实体时（对应 Supabase 新增表）
- **禁止：** 放置非数据获取的 hooks（如 `useMediaQuery`，这类放在 `shared/` 或 `lib/`）

### `src/styles/`

- **职责：** 全局样式（仅一个文件）
- **文件数上限：** 1 个（globals.css）
- **禁止：** 创建额外的 CSS 文件、CSS Modules、styled-components

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
- **禁止：** 放置超过 200KB 的图片（必须先压缩）、放置非图片文件
- **子目录：** 禁止创建子目录，所有图片平铺

---

## 3. 禁止创建的目录和文件

以下内容不得在项目中出现：

### 禁止的目录

| 禁止 | 原因 |
|------|------|
| `src/components/pages/` | 重复嵌套，pages/ 已是页面层 |
| `src/components/common/` | 与 shared/ 职责重叠 |
| `src/components/custom/` | 命名模糊，职责不清 |
| `src/styles/components/` | 不使用独立组件 CSS 文件 |
| `src/styles/pages/` | 同上 |
| `src/services/` | 与 lib/ + api/ 职责重叠 |
| `src/store/` | 无全局状态管理（不用 Redux/Zustand） |
| `src/context/` | 第一阶段不需要 React Context |
| `src/utils/` | 与 lib/utils.ts 职责重叠 |
| `src/config/` | 配置直接在 vite.config.ts 等文件中 |
| `src/constants/` | 常量放在使用它们的模块内或 types/index.ts |
| `src/assets/` | 静态资源放 public/ |
| `src/routes/` | 路由定义在 App.tsx 中 |
| `src/middleware/` | 无服务端中间件 |
| `src/helpers/` | 与 lib/ 职责重叠 |
| `__tests__/` | 测试文件暂不单独建目录 |
| `docs/` | 文档放项目根目录的 MD 文件 |
| `scripts/` | 构建脚本放 package.json scripts |

### 禁止的文件类型

| 禁止 | 原因 |
|------|------|
| `*.js` / `*.jsx` | 全部使用 TypeScript |
| `*.module.css` | 不使用 CSS Modules |
| `*.styled.ts` | 不使用 styled-components |
| `*.test.ts` / `*.spec.ts` | 第一阶段不写测试文件 |
| `*.stories.tsx` | 不使用 Storybook |
| `*.css`（除 globals.css） | 仅允许一个全局样式文件 |
| `.env`（无后缀） | 必须使用 `.env.local` 或 `.env.example` |

---

## 4. 新增文件的决策树

当需要创建新文件时，按以下规则判断放哪里：

```
新文件是什么？
│
├── 基础 UI 组件（Button、Card 等）
│   → src/components/ui/（通过 shadcn CLI 添加）
│
├── 页面级组件（有自己路由的）
│   → src/pages/（一个路由一个文件）
│
├── 可复用的视觉区块（被多个页面使用）
│   → src/components/sections/
│
├── 全局布局组件（Header、Footer 等）
│   → src/components/layout/
│
├── 小型共享组件（FilterBar、RevealOnScroll 等）
│   → src/components/shared/
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
├── Serverless API 端点
│   → api/
│
├── 数据库迁移
│   → supabase/migrations/
│
├── 图片资源
│   → public/images/
│
└── 以上都不匹配？
    → 不要创建新文件。重新评估是否可以用现有结构解决。
```

### 新增文件的规则

1. **先检查是否可以追加到现有文件。** types/index.ts、lib/utils.ts 等文件设计为可增长，优先追加而非新建。
2. **新建文件需要命名审批。** 文件名必须符合命名规范（PascalCase 组件、camelCase hooks、kebab-case API）。
3. **新建目录需要 PRD 变更。** 不允许在 src/ 下创建新的顶级子目录。现有的 7 个子目录（components、pages、lib、types、hooks、styles）是固定的。

---

## 5. 文件移动规则

项目演进过程中可能需要重构文件位置。以下规则防止混乱：

| 场景 | 规则 |
|------|------|
| Section 变成页面专属 | 从 sections/ 移入对应的 pages/ 文件中内联 |
| Shared 组件变成全局 | 从 shared/ 移入 layout/ |
| 新增数据实体 | 对应添加 hooks/use<Entity>.ts |
| 新增 API 端点 | 对应添加 api/<entity>.ts |
| shadcn 组件不再需要 | 通过 `npx shadcn@latest remove <name>` 删除，不手动删除 |

---

## 6. 文件数量上限

为防止文件膨胀，设定以下软上限：

| 目录 | 当前文件数 | 上限 | 超出时的处理 |
|------|----------:|-----:|-------------|
| `pages/` | 13 | 20 | 超出需更新 PRD |
| `sections/` | 7 | 12 | 评估是否有组件可以合并 |
| `layout/` | 4 | 5 | 非常 unlikely 需要新增 |
| `shared/` | 4 | 8 | 超出需评估是否拆分为 sections/ |
| `ui/` | ~10 | — | 由 shadcn CLI 管理，无上限 |
| `hooks/` | 3 | 6 | 每个对应一个数据表 |
| `lib/` | 3 | 5 | 超出需评估是否引入不必要的抽象 |
| `types/` | 2 | 3 | 几乎不需要新增 |
| `api/` | 5 | 8 | 每个对应一个 API 端点 |

---

> **本文档随项目结构变更同步更新。每次新增/删除目录或文件需在此记录。**
