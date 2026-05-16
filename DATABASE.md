# Database

> **定位：** 本文档定义 ZAN 的数据库层。所有建表、权限、数据操作必须遵守本文档，不得自行新增表或修改字段。
> **技术选型：** Supabase (PostgreSQL) + Row Level Security。详见 git-instruction.md 禁止使用其他数据库。

---

## 1. 架构概览

```
┌─────────────────────────────────────────────────────┐
│                    Supabase                          │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐                   │
│  │enterprise_   │  │talent_leads │   写入专用         │
│  │leads         │  │             │   (表单提交)       │
│  └─────────────┘  └─────────────┘                   │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │projects     │  │articles     │  │programs     │  │
│  │             │  │             │  │             │  │  读取专用
│  │ /projects   │  │ /insights   │  │ /programs   │  │  (页面展示)
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                     │
│  RLS: 读取表仅公开 published=true 的行               │
│       写入表仅允许 INSERT，不允许 SELECT             │
└─────────────────────────────────────────────────────┘
```

### 读写分离原则

| 操作 | 路径 | 使用密钥 | 说明 |
|------|------|---------|------|
| 读取公开内容 | 前端 → Supabase SDK | `ANON_KEY` | 受 RLS 限制，只能读 published=true |
| 写入表单数据 | 前端 → Serverless → Supabase | `SERVICE_ROLE_KEY` | 绕过 RLS，服务端验证后才写入 |
| 管理内容 | Supabase Dashboard | 管理员登录 | 网页后台直接编辑 |

---

## 2. 数据表定义

### 2.1 enterprise_leads（企业线索）

**用途：** 存储通过 `/enterprise/contact` 表单提交的企业需求。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `name` | TEXT | NOT NULL | 联系人姓名 |
| `company` | TEXT | NOT NULL | 公司名称 |
| `title` | TEXT | NOT NULL | 联系人职位 |
| `contact` | TEXT | NOT NULL | 手机号或邮箱 |
| `challenge` | TEXT | nullable | 企业想解决的挑战 |
| `consent` | BOOLEAN | NOT NULL, default false | 是否同意隐私政策 |
| `created_at` | TIMESTAMPTZ | default now() | 创建时间 |

**RLS 策略：**
- INSERT：允许任何人插入（通过 Serverless Function 的 SERVICE_ROLE_KEY）
- SELECT / UPDATE / DELETE：不允许（只能通过 Supabase Dashboard 管理）

**操作场景：**
- 写入：用户提交企业表单 → Serverless Function → INSERT
- 查看：运营登录 Supabase Dashboard 查看
- 跟进：运营标记哪些已联系（可在后续版本加 `status` 字段）

### 2.2 talent_leads（人才线索）

**用途：** 存储通过 `/talent/apply` 表单提交的人才申请。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `name` | TEXT | NOT NULL | 姓名 |
| `position` | TEXT | NOT NULL | 当前/最近职位 |
| `industry` | TEXT | NOT NULL | 所在行业 |
| `skills` | TEXT | nullable | 核心能力（文本形式） |
| `contact` | TEXT | NOT NULL | 联系方式 |
| `consent` | BOOLEAN | NOT NULL, default false | 是否同意隐私政策 |
| `created_at` | TIMESTAMPTZ | default now() | 创建时间 |

**RLS 策略：** 同 enterprise_leads。

**操作场景：**
- 写入：用户提交人才表单 → Serverless Function → INSERT
- 查看：运营登录 Supabase Dashboard 查看
- 转化：运营根据 `contact` 邀请进微信社群

### 2.3 projects（项目机会）

**用途：** 存储网站上 `/projects` 页面展示的脱敏案例和 JD。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `title` | TEXT | NOT NULL | 简短标题，如"某头部制造企业 AI 供应链优化" |
| `industry` | TEXT | NOT NULL | 行业标签，如"制造业" |
| `function` | TEXT | NOT NULL | 职能标签，如"AI+战略" |
| `status` | TEXT | NOT NULL, default 'ongoing', CHECK IN ('ongoing','completed') | 项目状态 |
| `narrative` | TEXT | NOT NULL | 脱敏叙事内容（核心字段） |
| `requirements` | TEXT | nullable | 人才要求描述 |
| `outcomes` | TEXT | nullable | 预期/实际成果（已完成项目用） |
| `sort_order` | INT | default 0 | 排序权重，越小越靠前 |
| `published` | BOOLEAN | default true | 是否发布（false = 草稿） |
| `created_at` | TIMESTAMPTZ | default now() | 创建时间 |
| `updated_at` | TIMESTAMPTZ | default now() | 更新时间 |

**RLS 策略：**
- SELECT：仅 `published = true` 的行可公开读取
- INSERT / UPDATE / DELETE：仅通过 Supabase Dashboard（管理员）

**操作场景：**
- 读取：前端 /projects 页面 → Supabase SDK → SELECT WHERE published=true
- 新增：运营在 Supabase Dashboard 中 INSERT 新行
- 发布/下线：切换 `published` 字段
- 排序：修改 `sort_order` 值
- 状态变更：项目完成后将 `status` 从 ongoing 改为 completed

### 2.4 articles（洞察文章）

**用途：** 存储网站上 `/insights` 页面展示的文章。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `title` | TEXT | NOT NULL | 文章标题 |
| `slug` | TEXT | NOT NULL, UNIQUE | URL 标识符，如 "ai-strategy-trend-2026" |
| `excerpt` | TEXT | nullable | 摘要（用于列表页卡片） |
| `content` | TEXT | NOT NULL | 正文（Markdown 格式） |
| `topic` | TEXT | NOT NULL | 主题标签，如"AI趋势"、"行业分析" |
| `cover_image` | TEXT | nullable | 封面图 URL |
| `published` | BOOLEAN | default false | 是否发布（默认草稿） |
| `published_at` | TIMESTAMPTZ | nullable | 发布时间（手动设置） |
| `created_at` | TIMESTAMPTZ | default now() | 创建时间 |
| `updated_at` | TIMESTAMPTZ | default now() | 更新时间 |

**RLS 策略：**
- SELECT：仅 `published = true` 的行可公开读取
- INSERT / UPDATE / DELETE：仅通过 Supabase Dashboard

**`slug` 字段说明：**
- 用途：URL 友好的文章标识，如 `/insights/ai-strategy-trend-2026`
- 规则：全小写、用连字符分隔、不含特殊字符、必须唯一
- 示例：`"ai-strategy-trend-2026"`, `"manufacturing-ai-transformation"`, `"talent-upskilling-framework"`

**`content` 字段说明：**
- 存储 Markdown 格式文本
- 前端使用 Markdown 渲染库（如 react-markdown）渲染为 HTML
- 图片通过 URL 引用，不内嵌 base64

### 2.5 programs（课程项目）

**用途：** 存储网站上 `/programs` 页面展示的课程。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `title` | TEXT | NOT NULL | 课程标题 |
| `description` | TEXT | NOT NULL | 课程描述 |
| `format` | TEXT | nullable | 形式，如"线上工作坊"、"线下集训" |
| `duration` | TEXT | nullable | 时长，如"6周"、"2天" |
| `cover_image` | TEXT | nullable | 封面图 URL |
| `published` | BOOLEAN | default true | 是否发布 |
| `created_at` | TIMESTAMPTZ | default now() | 创建时间 |
| `updated_at` | TIMESTAMPTZ | default now() | 更新时间 |

**RLS 策略：** 同 projects。

---

## 3. 完整建表 SQL

```sql
-- supabase/migrations/001_initial_schema.sql
-- ZAN 初始数据库结构

-- ============================================
-- 表 1: enterprise_leads（企业线索）
-- ============================================
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

ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on enterprise_leads"
  ON enterprise_leads FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 表 2: talent_leads（人才线索）
-- ============================================
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

ALTER TABLE talent_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on talent_leads"
  ON talent_leads FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 表 3: projects（项目机会）
-- ============================================
CREATE TABLE projects (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  industry     TEXT NOT NULL,
  function     TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'ongoing'
               CHECK (status IN ('ongoing', 'completed')),
  narrative    TEXT NOT NULL,
  requirements TEXT,
  outcomes     TEXT,
  sort_order   INT DEFAULT 0,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published projects are publicly readable"
  ON projects FOR SELECT
  USING (published = true);

-- ============================================
-- 表 4: articles（洞察文章）
-- ============================================
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

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are publicly readable"
  ON articles FOR SELECT
  USING (published = true);

-- ============================================
-- 表 5: programs（课程项目）
-- ============================================
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

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published programs are publicly readable"
  ON programs FOR SELECT
  USING (published = true);
```

---

## 4. Supabase 初始化步骤

### 4.1 创建项目

1. 登录 [supabase.com](https://supabase.com)
2. 点击 "New Project"
3. 填写项目名称：`zoan-production`（生产）/ `zoan-dev`（开发）
4. 设置数据库密码（保存到密码管理器）
5. 选择区域：East Asia (Tokyo 或 Seoul)
6. 等待项目创建完成（约 2 分钟）

### 4.2 获取密钥

项目创建后，进入 Settings → API：

| 变量 | 在哪找 | 存到哪里 |
|------|--------|---------|
| `VITE_SUPABASE_URL` | Project URL | `.env.local` |
| `VITE_SUPABASE_ANON_KEY` | anon public key | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role secret key | `.env.local`（仅后端用） |

### 4.3 执行迁移

方式 A（Supabase Dashboard）：
1. 进入 SQL Editor
2. 粘贴 `001_initial_schema.sql` 的全部内容
3. 点击 Run

方式 B（Supabase CLI，推荐）：
```bash
npm install -g supabase
supabase init
supabase link --project-ref <your-project-id>
supabase db push
```

### 4.4 验证

在 SQL Editor 中运行：
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

应返回 5 张表：articles, enterprise_leads, programs, projects, talent_leads。

---

## 5. 数据操作指南

### 5.1 新增项目（运营操作）

在 Supabase Dashboard → Table Editor → projects → Insert Row：

```
title:       "某头部消费品牌 AI 驱动的用户运营升级"
industry:    "消费品"
function:    "AI+产品"
status:      "ongoing"
narrative:   "某国内头部消费品牌在用户增长见顶的背景下，计划通过 AI 技术重构用户运营体系......"
requirements: "10年以上消费品行业经验，主导过用户运营体系搭建，熟悉 AI 在 CRM 场景的应用"
outcomes:    null（进行中的项目不填）
sort_order:  10
published:   true（立即发布）或 false（存为草稿）
```

### 5.2 标记项目为已完成

更新对应行的：
- `status` → `'completed'`
- `outcomes` → 填写项目成果描述

### 5.3 发布文章

1. INSERT 新行，`published` 设为 `false`
2. 撰写内容，填写 `content`（Markdown 格式）
3. 检查无误后，将 `published` 改为 `true`，设置 `published_at`
4. 前端自动显示

### 5.4 下线内容

将对应行的 `published` 改为 `false`。前端立即不再显示。

---

## 6. 环境变量

```bash
# .env.example（提交到 git 的模板）
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# .env.local（不提交，每人本地配置）
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

**规则：**
- `VITE_` 前缀 = 打包到前端代码中，可以被用户看到。只放 ANON_KEY。
- 无 `VITE_` 前缀 = 仅 Serverless Function 可用，不暴露到前端。放 SERVICE_ROLE_KEY。
- `.env.local` 必须在 `.gitignore` 中。
- **绝对不要**将 SERVICE_ROLE_KEY 提交到 git。

---

## 7. Supabase 客户端代码

### 前端客户端（读取用）

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### 后端客户端（写入用）

在 Serverless Function 中按需创建，不单独建文件：

```typescript
// api/ 内部使用
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

**为什么不复用前端的 supabase.ts？** 因为 Serverless Function 运行在 Node.js 环境，没有 `import.meta.env`（那是浏览器端的 Vite 特有变量），必须用 `process.env`。

---

## 8. 迁移管理

### 命名规则

```
supabase/migrations/
├── 001_initial_schema.sql        ← 初始建表（已定义）
├── 002_<描述>.sql                 ← 未来变更
└── 003_<描述>.sql                 ← 未来变更
```

### 什么时候需要新迁移

| 场景 | 需要 | 示例 |
|------|------|------|
| 新增表 | 是 | 新增 `comments` 表 |
| 新增字段 | 是 | 给 `enterprise_leads` 加 `status` 字段 |
| 修改字段类型 | 是 | `skills TEXT` → `skills TEXT[]` |
| 新增 RLS 策略 | 是 | 给新表加 RLS |
| 修改已有数据 | 是 | 批量更新 status 值 |
| 新增索引 | 是 | 给 `slug` 加索引 |
| 删除字段 | 是 | 写 DROP COLUMN |
| 新增记录（INSERT 数据） | 否 | 用 Supabase Dashboard 操作 |
| 修改记录（UPDATE 数据） | 否 | 用 Supabase Dashboard 操作 |

### 迁移模板

```sql
-- supabase/migrations/002_<描述>.sql
-- 变更说明：简要描述这次迁移做了什么

-- 在此写 SQL
ALTER TABLE enterprise_leads ADD COLUMN status TEXT DEFAULT 'new';
```

---

## 9. 约束与禁止

| 规则 | 说明 |
|------|------|
| **不新增表** | 除非 PRD 变更，不允许创建新表 |
| **不使用外键** | 第一阶段所有表独立，无关联关系 |
| **不使用触发器** | 表级别的自动化逻辑暂不需要 |
| **不使用存储过程** | 业务逻辑在应用层（Serverless Function）处理 |
| **不直接修改已执行的迁移** | 只能新增迁移文件 |
| **不在代码中硬编码连接字符串** | 必须通过环境变量 |
| **不在前端暴露 SERVICE_ROLE_KEY** | 仅 Serverless Function 可用 |

---

## 10. 变更记录

| 日期 | 变更 | 说明 |
|------|------|------|
| 2026-05-16 | 初始数据库设计 | 5 张表 + RLS 策略 |
