# Database

> **定位：** 本文档定义 ZAN 的数据库层。所有建表、权限、数据操作必须遵守本文档，不得自行新增表或修改字段。
> **技术选型：** Supabase (PostgreSQL) + Row Level Security。详见 git-instruction.md，禁止使用其他数据库。

---

## 1. 架构概览

```
┌─────────────────────────────────────────────────────┐
│                    Supabase                          │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐           │
│  │enterprise_leads │  │talent_leads     │  写入专用 │
│  │(/find-talent)   │  │(/join)          │  (表单)  │
│  └─────────────────┘  └─────────────────┘           │
│                                                     │
│  ┌─────────────────────────────────────┐            │
│  │ articles                             │  读取专用 │
│  │ (/resources, /resources/:id)         │  (页面)  │
│  └─────────────────────────────────────┘            │
│                                                     │
│  RLS：                                              │
│   articles → published=true 公开可读                │
│   leads   → 仅 INSERT，不可 SELECT                  │
└─────────────────────────────────────────────────────┘
```

### 读写分离原则

| 操作 | 路径 | 使用密钥 | 说明 |
|------|------|---------|------|
| 读公开内容 | 前端 → Supabase SDK | `ANON_KEY` | 受 RLS 限制，只能读 published=true |
| 写表单数据 | 前端 → Serverless → Supabase | `SERVICE_ROLE_KEY` | 绕过 RLS，服务端验证后写入 |
| 管理内容 | Supabase Dashboard | 管理员登录 | 网页后台直接编辑 |

---

## 2. 数据表定义

### 2.1 articles（资源智库文章）

**用途：** 存储 `/resources` 与 `/resources/:id` 展示的文章。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | INT (SERIAL) | PK, auto | 主键 |
| `title` | TEXT | NOT NULL | 文章标题 |
| `category` | TEXT | NOT NULL | 分类：如 `AI + 组织`、`AI + 增长`、`AI + 产品`、`组织` |
| `type` | TEXT | NOT NULL | 类型：如 `案例研究`、`方法论`、`人才研究`、`实践指南` |
| `date` | TEXT | NOT NULL | 显示日期（如 `2025.03`，非真实时间字段） |
| `summary` | TEXT | NOT NULL | 摘要（卡片列表展示） |
| `hero_image` | TEXT | NOT NULL | 封面图相对路径，如 `/images/tech-talent.jpg` |
| `content` | TEXT | NOT NULL | Markdown 正文 |
| `sort_order` | INT | DEFAULT 0 | 排序权重，越大越靠前 |
| `published` | BOOLEAN | DEFAULT true | 是否发布 |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | 创建时间 |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | 更新时间 |

**RLS 策略：**
- SELECT：仅 `published = true` 的行可公开读取
- INSERT / UPDATE / DELETE：仅通过 Supabase Dashboard（管理员）

**索引：**
- `(published, sort_order DESC)` — 列表查询
- `(type) WHERE published = true` — 筛选 tab

**操作场景：**
- 读取：前端 `useArticles` hook → SELECT WHERE published=true ORDER BY sort_order DESC
- 单篇：`useArticle(id)` → SELECT WHERE id=? AND published=true
- 筛选：按 `type` 过滤（前端筛选 tab）
- 新增/编辑：运营在 Supabase Dashboard 操作，content 字段填 Markdown 文本
- 下线：将 `published` 置为 `false`

**Markdown 内容规约：**
- 用 `##`、`###` 表示二级、三级标题
- 用 `**bold**` `*italic*` `> quote` `- list` 等基础语法
- 图片通过 URL 引用（前端用 react-markdown 渲染），不内嵌 base64
- 不允许内嵌脚本或 HTML 标签（react-markdown 默认禁用）

### 2.2 enterprise_leads（企业线索）

**用途：** 存储 `/find-talent` 表单提交的企业需求。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `name` | TEXT | NOT NULL | 联系人姓名 |
| `company` | TEXT | nullable | 公司名称 |
| `email` | TEXT | NOT NULL | 联系邮箱 |
| `phone` | TEXT | nullable | 联系电话 |
| `role` | TEXT | nullable | 岗位类型（如 "CTO"、"产品总监"） |
| `stage` | TEXT | nullable | 企业阶段（如 "成长期"、"成熟期"） |
| `challenge` | TEXT | NOT NULL | 核心挑战描述 |
| `timeline` | TEXT | nullable | 期望时间（如 "1 个月内"） |
| `status` | TEXT | DEFAULT 'new' | 跟进状态：new / contacted / matched / closed |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | 创建时间 |

**RLS：** 仅 INSERT（通过 SERVICE_ROLE_KEY 绕过）；不允许 SELECT / UPDATE / DELETE（仅 Dashboard）。

**操作场景：**
- 写入：用户提交 `/find-talent` 表单 → Serverless → INSERT
- 跟进：运营登录 Dashboard 查看，更新 `status`

### 2.3 talent_leads（人才线索）

**用途：** 存储 `/join` 表单提交的顾问申请。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | UUID | PK, auto | 主键 |
| `name` | TEXT | NOT NULL | 姓名 |
| `email` | TEXT | NOT NULL | 联系邮箱 |
| `phone` | TEXT | nullable | 联系电话 |
| `role` | TEXT | nullable | 核心领域（如 "AI+产品"、"组织变革"） |
| `bio` | TEXT | NOT NULL | 个人简介（含背景、能力、案例） |
| `status` | TEXT | DEFAULT 'new' | 跟进状态：new / reviewing / accepted / rejected |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | 创建时间 |

**RLS：** 同 `enterprise_leads`。

**操作场景：**
- 写入：用户提交 `/join` 表单 → Serverless → INSERT
- 审核：运营登录 Dashboard 评审，更新 `status`

---

## 3. 数据库 SQL 基线

完整的建表 SQL 在 `supabase/migrations/` 目录下按序号管理。新部署按 001 → 002 → 003 顺序执行。

### 3.1 articles 建表参考

```sql
CREATE TABLE articles (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  category     TEXT NOT NULL,
  type         TEXT NOT NULL,
  date         TEXT NOT NULL,
  summary      TEXT NOT NULL,
  hero_image   TEXT NOT NULL,
  content      TEXT NOT NULL,
  sort_order   INT DEFAULT 0,
  published    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are publicly readable"
  ON articles FOR SELECT
  USING (published = true);

CREATE INDEX articles_published_sort_idx ON articles (published, sort_order DESC);
CREATE INDEX articles_type_idx ON articles (type) WHERE published = true;
```

### 3.2 enterprise_leads 建表参考

```sql
CREATE TABLE enterprise_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  company    TEXT,
  email      TEXT NOT NULL,
  phone      TEXT,
  role       TEXT,
  stage      TEXT,
  challenge  TEXT NOT NULL,
  timeline   TEXT,
  status     TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on enterprise_leads"
  ON enterprise_leads FOR INSERT
  WITH CHECK (true);
```

### 3.3 talent_leads 建表参考

```sql
CREATE TABLE talent_leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  role       TEXT,
  bio        TEXT NOT NULL,
  status     TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE talent_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on talent_leads"
  ON talent_leads FOR INSERT
  WITH CHECK (true);
```

---

## 4. Supabase 初始化步骤

### 4.1 创建项目

1. 登录 [supabase.com](https://supabase.com)
2. 创建新项目，区域选 East Asia
3. 设置数据库密码并保存
4. 等待项目创建完成

### 4.2 获取密钥

进入 Settings → API：

| 变量 | 在哪找 | 存到哪里 |
|------|--------|---------|
| `VITE_SUPABASE_URL` | Project URL | `.env.local` |
| `VITE_SUPABASE_ANON_KEY` | anon public key | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role secret key | `.env.local`（仅 Serverless 使用） |

### 4.3 执行迁移

**方式 A（Supabase Dashboard）：**
1. 进入 SQL Editor
2. 按文件名序号顺序粘贴并执行所有 `supabase/migrations/*.sql`

**方式 B（Supabase CLI，推荐）：**
```bash
npm install -g supabase
supabase init
supabase link --project-ref <your-project-id>
supabase db push
```

### 4.4 验证

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

应返回：`articles, enterprise_leads, talent_leads`。

---

## 5. 数据操作指南

### 5.1 新增文章（运营操作）

在 Supabase Dashboard → Table Editor → articles → Insert Row：

```
title:      "AI 时代的产品组织升级方法论"
category:   "AI + 产品"
type:       "方法论"
date:       "2026.05"
summary:    "本文系统梳理 AI 时代产品组织的核心能力升级路径..."
hero_image: "/images/feature-business.jpg"
content:    "## 一、问题的本质\n\n大量企业在...\n\n## 二、三个阶段\n\n..."
sort_order: 100
published:  true
```

**Markdown 编辑建议：** 在本地用 Markdown 编辑器写完，粘贴到 content 字段。

### 5.2 下线文章

将对应行 `published` 改为 `false`。前端立即不再显示。

### 5.3 跟进企业线索

Dashboard → enterprise_leads → 编辑 `status`：
- `new` → `contacted` → `matched` → `closed`

### 5.4 跟进顾问申请

Dashboard → talent_leads → 编辑 `status`：
- `new` → `reviewing` → `accepted` / `rejected`

---

## 6. 环境变量

```bash
# .env.example（提交到 git）
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# .env.local（不提交）
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**规则：**
- `VITE_` 前缀 = 打包到前端代码，仅放 ANON_KEY
- 无 `VITE_` 前缀 = 仅 Serverless Function 可用，放 SERVICE_ROLE_KEY
- `.env.local` 必须在 `.gitignore` 中
- **绝对不要**将 SERVICE_ROLE_KEY 提交到 git

---

## 7. Supabase 客户端代码

### 前端（读取）

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### 后端（写入，在 Serverless 中按需创建）

```typescript
// api/<endpoint>.ts 内部
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
├── 001_<描述>.sql
├── 002_<描述>.sql
└── 003_<描述>.sql
```

### 什么时候需要新迁移

| 场景 | 需要 |
|------|------|
| 新增表 | ✅ |
| 新增 / 删除字段 | ✅ |
| 修改字段类型 | ✅ |
| 新增 RLS 策略 | ✅ |
| 新增索引 | ✅ |
| 批量更新数据（结构性） | ✅ |
| 新增 / 修改单条记录 | ❌（Dashboard 操作） |

### 迁移模板

```sql
-- supabase/migrations/0XX_<描述>.sql
-- 变更说明：简要描述这次迁移做了什么

ALTER TABLE <table> ADD COLUMN <field> <type>;
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
| **articles.content 必须是 Markdown** | 不允许 JSON / HTML |
| **当前不收集 PIPL consent 字段** | 如未来合规审查要求，需同步更新 schemas / DB / API.md / 表单 UI |

---

## 10. 变更记录

| 日期 | 变更 | 说明 |
|------|------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本文档随数据库结构变更同步更新。每次新增 / 删除 / 修改表或字段必须在此记录，并新增对应的 SQL 迁移文件。**
