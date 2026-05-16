# ZOAN（左安门）

面向 AI 转型时代的高端人才网络与咨询平台。为企业关键阶段连接"懂行业 + 会用 AI"的高阶独立人才。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 18 + Vite 5 |
| 语言 | TypeScript (strict) |
| 样式 | TailwindCSS v4 |
| 组件库 | shadcn/ui |
| 路由 | React Router v6 |
| 数据获取 | TanStack Query |
| 表单 | React Hook Form + Zod |
| 后端 | Vercel Serverless Functions |
| 数据库 | Supabase (PostgreSQL + RLS) |
| 部署 | Vercel |

## 快速开始

### 1. 克隆项目

```bash
git clone <repo-url>
cd zoan
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

1. 登录 [supabase.com](https://supabase.com)，创建新项目（区域选 East Asia）
2. 进入 Settings → API，获取以下值
3. 在项目根目录创建 `.env.local`：

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

4. 进入 Supabase Dashboard → SQL Editor，执行 `supabase/migrations/001_initial_schema.sql` 建表

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

## 可用命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npx shadcn@latest add <component>` | 添加 shadcn 组件 |

## 项目文档

开发前必须阅读以下文档，按顺序：

| 顺序 | 文档 | 内容 | 阅读时间 |
|-----:|------|------|---------|
| 1 | [PRD.md](PRD.md) | 产品定位、13 页清单、用户流程、页面规格 | 15 min |
| 2 | [git-instruction.md](git-instruction.md) | 技术栈约束、依赖黑白名单、可用 Skill、提交检查 | 10 min |
| 3 | [UI_GUIDELINES.md](UI_GUIDELINES.md) | 色彩令牌、字体、组件规格、动画规则 | 10 min |
| 4 | [ARCHITECTURE.md](ARCHITECTURE.md) | 模块边界、数据流、类型定义、代码模板 | 10 min |
| 5 | [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) | 完整目录树、文件放置规则、禁止目录 | 5 min |
| 6 | [DATABASE.md](DATABASE.md) | 5 张表定义、RLS 策略、迁移管理、操作指南 | 10 min |
| 7 | [API.md](API.md) | 6 个端点规格、Zod schema、安全防线、前端调用方式 | 10 min |

**核心原则：** PRD 定义"做什么"，git-instruction + 其余五份定义"怎么做"。不得偏离。

## 环境变量

| 变量 | 用途 | 在哪使用 |
|------|------|---------|
| `VITE_SUPABASE_URL` | Supabase 项目地址 | 前端 + 后端 |
| `VITE_SUPABASE_ANON_KEY` | 公开只读密钥 | 前端（受 RLS 保护） |
| `SUPABASE_SERVICE_ROLE_KEY` | 管理员密钥 | 仅 Serverless Function（不暴露到前端） |

参考 `.env.example` 获取完整列表。
