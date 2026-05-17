# ZAN（左安）产品需求文档 (PRD)

> **版本：** v1.1 | **日期：** 2026-05-17 | **状态：** Draft
> **品牌：** 中文名"左安"，英文缩写"ZAN"，英文全称"Zuo An Nexus"
> **本文档是 AI 辅助开发的施工图（harness），所有技术决策已锁定，执行时不得偏离。

---

## 目录

1. [产品定位与价值主张](#1-产品定位与价值主张)
2. [目标用户](#2-目标用户)
3. [信息架构与页面清单](#3-信息架构与页面清单)
4. [用户流程](#4-用户流程)
5. [页面规格](#5-页面规格)
6. [视觉设计指南](#6-视觉设计指南)
7. [技术架构](#7-技术架构)
8. [数据库设计](#8-数据库设计)
9. [API 设计](#9-api-设计)
10. [项目文件夹结构](#10-项目文件夹结构)
11. [开发阶段规划](#11-开发阶段规划)
12. [约束与原则](#12-约束与原则)

---

## 1. 产品定位与价值主张

### 一句话定位

ZAN 是一个面向 AI 转型时代的**高端人才网络与咨询平台**，为企业关键阶段连接"懂行业 + 会用 AI"的高阶独立人才。

### 核心价值链

```
企业端："我们有 AI 转型的战略意图，但缺能落地的人"
         ↓
ZAN 翻译需求，输出精准 JD
         ↓
人才端：行业老兵（懂业务、打过仗）→ ZAN 提供 AI upskilling → 达到可派出水平
         ↓
匹配交付：企业获得"懂行业 + 会用 AI"的临时 CXO
         ↓
课程/Program：既是人才训战工具，也是独立收入来源
```

### 商业模式

- **现阶段：** 内容驱动的人才网络，C端先行
  - 公域内容（网站 + 公众号）→ 吸引高端人才线索
  - 转入私域（微信社群）→ 筛选培养
  - 企业端通过教授人脉 + 网站获客 → 撮合匹配
- **收入来源：** 项目撮合佣金 + 课程/工作坊产品
- **长期愿景：** 构建高质量双边网络，成为 AI 时代的人才基础设施

### 核心差异化

| 维度 | 传统猎头 | 传统咨询 | ZAN |
|------|----------|----------|------|
| 人才标准 | 职位匹配 | 方法论驱动 | 行业纵深 + AI 赋能 |
| 交付形态 | 永久雇佣 | 项目报告 | 临时高管/顾问落地执行 |
| AI 角色 | 无 | 无 | 筛选标签 + 训战工具 |
| 社群运营 | 无 | 无 | 持续培养、激活、匹配 |

### AI 定位（重要）

AI 不是要求人才必须具备的硬性条件，而是：

1. **筛选维度：** 优先考虑有 AI 相关经验的候选人，但不作为硬性门槛
2. **训战工具：** 通过课程和 Program 为人才提供 AI 能力升级
3. **服务标签：** 所有服务围绕 AI+ 展开（AI+战略 / AI+产品 / AI+组织与经营）

**人才筛选的真实标准：** 行业内纵深经验 + 多元业务知识 + 实打实的战功（能做事），然后通过 ZAN 的课程体系补齐 AI 能力。

---

## 2. 目标用户

### 企业端

| 属性 | 描述 |
|------|------|
| 规模 | 大中型企业（民企、国企、上市公司） |
| 行业 | 不限，展示时覆盖尽可能广 |
| 决策人 | CEO / 董事长 / 战略负责人（非 CTO） |
| 客单价 | 高（具体不公开，由顾问洽谈） |
| 核心诉求 | "我们需要懂 AI 的高管来落地转型" |

### 人才端

| 属性 | 描述 |
|------|------|
| 画像 | 行业老兵，VP+ 级别，有实战经验和战功 |
| 来源 | 内容吸引、搜索、校友网络、口碑传播 |
| 核心诉求 | 高质量项目机会 + 职业发展 + AI 能力升级 |
| 转化路径 | 网站/公众号 → 填表 → 微信社群 → 项目匹配 |

---

## 3. 信息架构与页面清单

### 导航结构

```
Header:
  认识ZAN ▾        服务 ▾             项目机会         洞察          课程项目
                                      (合并案例+JD)   (内容中心)     (AI训战)

  [企业合作]  [人才入驻]   ← 双CTA，始终可见
```

### 完整页面清单（13页）

| # | 路由 | 页面名称 | 入口 | 受众 |
|---|------|----------|------|------|
| 1 | `/` | 首页 | 直接访问 | 双受众 |
| 2 | `/about` | 关于我们 | Header 认识ZAN | 双受众 |
| 3 | `/why-zoan` | 为什么选择ZAN | Header 认识ZAN | 双受众 |
| 4 | `/services` | 服务总览 | Header 服务 | 企业端 |
| 5 | `/services/process` | 合作流程 | Header 服务 | 企业端 |
| 6 | `/projects` | 项目机会 ★ | Header 项目机会 | 双受众 |
| 7 | `/insights` | 洞察文章列表 | Header 洞察 | 双受众 |
| 8 | `/insights/:slug` | 文章详情 | 文章列表卡片 | 双受众 |
| 9 | `/programs` | 课程项目 | Header 课程项目 | 人才端 |
| 10 | `/enterprise/contact` | 企业需求提交 | Header CTA + 首页CTA | 企业端 |
| 11 | `/talent/apply` | 人才入驻申请 | Header CTA + 项目卡片CTA | 人才端 |
| 12 | `/privacy` | 隐私政策 | Footer | 双受众 |
| 13 | `/terms` | 服务条款 | Footer | 双受众 |

### Footer 结构

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ 认识ZAN     │ 我们的服务    │ 发现机会     │ 联系我们     │
│ · 关于我们   │ · 服务总览   │ · 项目机会   │ · 企业合作   │
│ · 为什么选择 │ · 合作流程   │ · 洞察       │ · 人才入驻   │
│              │              │ · 课程项目   │ · 邮箱       │
│              │              │              │ · 公众号二维码│
├──────────────┴──────────────┴──────────────┴──────────────┤
│ © 2026 ZAN  隐私政策  服务条款                            │
└───────────────────────────────────────────────────────────┘
```

---

## 4. 用户流程

### 4.1 企业端用户流程

```
访问首页（搜索/推荐/人脉）
  → 阅读首页品牌叙事（是谁、做什么、怎么做）
  → 浏览服务页（了解 AI+ 三方向）
  → 或直接查看项目案例（建立信任）
  → 点击 Header "企业合作" CTA
  → 填写企业需求表单（6字段 + 隐私勾选）
  → 提交，显示"我们会在1个工作日内联系您"
  → 顾问收到通知 → 电话/微信跟进
  → 咨询诊断 → 理解需求 → 翻译JD → 人才匹配 → 交付
```

### 4.2 人才端用户流程（入口A：内容驱动）

```
阅读公众号文章/网站洞察内容
  → 被内容质量吸引
  → 文末/页面引导关注公众号
  → 公众号菜单"加入人才网络"
  → 或点击 Header "人才入驻" CTA
  → 填写人才申请表单（6字段 + 隐私勾选）
  → 提交，显示"感谢关注，我们会尽快与您联系"
  → 运营收到通知 → 邀请进微信社群
  → 社群持续运营（周报、分享会、内推机会）
```

### 4.3 人才端用户流程（入口B：机会驱动）

```
访问 /projects 页面（搜索/公众号链接/分享）
  → 浏览脱敏项目机会列表
  → 使用行业/职能/状态筛选器
  → 点击某个感兴趣的项目
  → 展开查看完整叙事内容（公司情况、项目描述、人才画像）
  → 点击"我对这个机会感兴趣"
  → 跳转人才申请表单（或已填写过则直接提交兴趣）
  → 顾问跟进 → 评估匹配度 → 安排沟通
```

### 4.4 表单提交流程（技术层面）

```
用户填写表单
  → 前端验证（必填字段、格式校验）
  → POST /api/enterprise-lead 或 /api/talent-lead
  → Vercel Serverless Function 处理
  → 写入 Supabase 数据库
  → 返回成功响应
  → 前端显示成功提示
  → （后续可扩展：邮件通知顾问/运营）
```

---

## 5. 页面规格

### 5.1 首页 `/`

**目的：** 完整的品牌叙事，让用户在30秒内理解ZAN是谁、做什么、怎么做。

| Section | 内容 | 组件 |
|---------|------|------|
| Hero | 一句话定位 + 副标题 + 双CTA按钮 | HeroSection |
| 我们是谁 | ZAN 的定位描述（2-3句话） | TextSection |
| 为什么是我们 | 3个差异化卡片（教授背景、AI+、精选网络） | FeatureCards |
| 我们怎么做 | 5步流程可视化（表单→诊断→翻译JD→匹配→交付） | ProcessFlow |
| 标杆项目 | 精选2-3个脱敏项目卡片 | ProjectCard[] |
| 行动号召 | 双CTA（企业合作 + 人才入驻） | CTASection |

### 5.2 关于我们 `/about`

**目的：** 建立深度信任，展示团队实力。

| Section | 内容 |
|---------|------|
| Hero | "认识 ZAN" |
| 愿景 | 公司使命和愿景 |
| 故事 | 创始背景、为什么做这件事 |
| 团队 | 牵头人/教授介绍、核心顾问 |
| 数据 | 网络规模、服务数据（早期可用文字描述代替数字） |

### 5.3 为什么选择ZAN `/why-zoan`

**目的：** 与传统猎头和传统咨询做差异化对比。

| Section | 内容 |
|---------|------|
| Hero | "为什么选择 ZAN" |
| 对比 | ZAN vs 传统猎头 vs 传统咨询的三方对比表 |
| 方法论 | 人才筛选标准、匹配流程、质量保障 |
| 人才画像 | 我们寻找什么样的人（行业纵深 + 实战经验 + AI潜力） |

### 5.4 服务总览 `/services`

**目的：** 展示三大服务方向，一页三分段。

| Section | 内容 |
|---------|------|
| Hero | "我们的服务" |
| AI+战略 | 描述 + 典型场景 + 能力标签 |
| AI+产品落地 | 描述 + 典型场景 + 能力标签 |
| AI+组织与经营 | 描述 + 组织维度（架构/人才/治理/文化）+ 经营维度（策略/营收/成本/商业模式） |
| CTA | "开启合作" → /enterprise/contact |

**注意：** 三个方向不分独立子页面，在一个页面内用 section 或 tab 展示。

### 5.5 合作流程 `/services/process`

**目的：** 让企业理解从表单到交付的完整旅程。

| Step | 描述 |
|------|------|
| 1. 提交需求 | 企业填写表单 |
| 2. 咨询诊断 | 资深顾问一对一沟通 |
| 3. 翻译JD | 将企业需求转化为精准人才画像 |
| 4. 人才匹配 | 从网络中筛选最合适的候选人 |
| 5. 落地交付 | 人才到岗，持续跟进 |

### 5.6 项目机会 `/projects` ★ 核心页面

**目的：** 合并展示脱敏案例（已完成）和开放机会（进行中），同时服务企业和人才两端。

**筛选器：**
- 行业标签（多选或单选）
- 职能标签（多选或单选）
- 状态：进行中 / 已完成

**项目卡片格式（叙事式）：**

```
┌────────────────────────────────────────────────┐
│ [行业标签]  [职能标签]        进行中 ●          │
│                                                │
│ 某头部制造企业在数字化转型中遇到增长瓶颈，      │
│ 现计划启动 AI 驱动的供应链优化项目，             │
│ 希望寻找一位具备制造业深耕经验 + AI落地能力     │
│ 的临时 CDO。                                    │
│                                                │
│ [我对这个机会感兴趣 →]                          │
└────────────────────────────────────────────────┘
```

- **进行中项目的 CTA：** "我对这个机会感兴趣" → /talent/apply 或直接提交兴趣
- **已完成项目的 CTA：** 无CTA，纯展示（作为能力背书）
- **点击卡片可展开详情：** 完整叙事、背景、要求、预期成果

**数据来源：** 从 Supabase `projects` 表读取，运营通过数据库或后续管理后台维护。

### 5.7 洞察文章列表 `/insights`

**目的：** 内容中心，吸引人才、展示专业度。

| Section | 内容 |
|---------|------|
| Hero | "洞察与思考" |
| 筛选 | 主题标签（AI趋势、行业分析、转型方法论、人才洞察） |
| 文章网格 | 卡片式列表，每张含标题、摘要、主题标签、日期 |

### 5.8 文章详情 `/insights/:slug`

**目的：** 深度内容阅读页。

| Section | 内容 |
|---------|------|
| 面包屑 | 首页 > 洞察 > 文章标题 |
| 标题 + 元信息 | 标题、日期、主题标签 |
| 正文 | Markdown 渲染的内容 |
| 侧栏/底部 | 公众号关注引导、相关文章推荐 |
| CTA | "加入人才网络" 或 "企业合作" |

### 5.9 课程项目 `/programs`

**目的：** 展示 AI upskilling 课程和训战项目。

| Section | 内容 |
|---------|------|
| Hero | "AI 时代的人才训战" |
| 课程理念 | 为什么 ZAN 做课程（人才能力升级、不只是招募） |
| 课程列表 | 卡片式，每张含标题、简介、形式、时长 |
| CTA | "了解更多" / "加入人才网络" |

### 5.10 企业需求提交 `/enterprise/contact`

**目的：** 企业端核心转化页。

**表单字段：**

| 字段 | 类型 | 必填 | placeholder |
|------|------|------|-------------|
| 姓名 | text | 是 | 您的姓名 |
| 公司 | text | 是 | 公司名称 |
| 职位 | text | 是 | 您的职位 |
| 联系方式 | text | 是 | 手机号或邮箱 |
| 您希望解决的挑战 | textarea | 否 | 简要描述您的需求 |
| 隐私政策 | checkbox | 是 | 我已阅读并同意《隐私政策》 |

**提交成功：** 显示"感谢您的信任，我们的资深顾问会在1个工作日内与您联系。"

### 5.11 人才入驻申请 `/talent/apply`

**目的：** 人才端核心转化页。

**表单字段：**

| 字段 | 类型 | 必填 | placeholder |
|------|------|------|-------------|
| 姓名 | text | 是 | 您的姓名 |
| 当前/最近职位 | text | 是 | 如：某制造业集团 VP |
| 所在行业 | text | 是 | 如：制造业、金融、消费 |
| 核心能力 | text | 否 | 如：战略规划、组织变革、AI产品 |
| 联系方式 | text | 是 | 手机号/邮箱/微信号 |
| 隐私政策 | checkbox | 是 | 我已阅读并同意《隐私政策》 |

**提交成功：** 显示"感谢您的关注，我们会尽快与您联系。"

### 5.12 隐私政策 `/privacy`

标准隐私政策页面，需包含：
- 收集哪些个人信息
- 如何使用和存储
- 第三方分享（无，或仅内部使用）
- 用户权利
- 联系方式

### 5.13 服务条款 `/terms`

标准服务条款页面，需包含：
- 服务范围
- 用户责任
- 免责声明
- 知识产权
- 争议解决

---

## 6. 视觉设计指南

### 6.1 色彩系统

```
主色（Primary）：
  - Deep Sea Blue:  #1B2B4B   — 导航栏、标题、主要背景
  - Deep Blue Light: #253A5E  — hover 状态、次要背景

辅色（Secondary）：
  - Warm Gray:       #F5F3EF  — 页面背景、内容区块背景
  - Cool Gray:       #E8E6E1  — 分割线、边框
  - Text Gray:       #6B7280  — 次要文字

强调色（Accent）：
  - Soft Purple:     #8B7EC8  — CTA按钮、链接、标签、交互元素
  - Purple Hover:    #7A6DB5  — CTA hover 状态
  - Purple Light:    rgba(139,126,200,0.1)  — 标签背景、卡片高亮

文字色：
  - Primary Text:    #1A1A2E  — 主标题、正文
  - Secondary Text:  #4A4A5A  — 次要内容
  - Inverse Text:    #FFFFFF  — 深色背景上的文字

状态色：
  - Success:         #10B981
  - Warning:         #F59E0B
  - Error:           #EF4444

项目状态：
  - Ongoing:         #8B7EC8  (柔紫)
  - Completed:       #6B7280  (灰色)
```

### 6.2 字体

```
中文：阿里巴巴普惠体 3.0（Alibaba PuHuiTi 3.0）
  - 通过 CDN 加载，仅加载 400 / 500 / 700 三个字重
  - fallback: PingFang SC, Microsoft YaHei, sans-serif

英文：Inter
  - 从 Google Fonts 或 self-host 加载
  - fallback: system-ui, sans-serif

标题：中文 700 / 英文 600
正文：400
辅助：300
```

### 6.3 间距系统

```
基于 8px 网格：
  xs:  4px
  sm:  8px
  md:  16px
  lg:  24px
  xl:  32px
  2xl: 48px
  3xl: 64px
  4xl: 96px

容器最大宽度：1200px
内容区最大宽度：800px（长文阅读）
```

### 6.4 响应式断点

```
sm:  640px   — 大手机横屏
md:  768px   — 平板竖屏
lg:  980px   — 平板横屏 / 小笔记本
xl:  1200px  — 桌面
2xl: 1440px  — 大桌面
```

### 6.5 组件风格原则

- **按钮：** 圆角 6px，内含充足内边距。主按钮（深蓝底 + 白字），次按钮（柔紫边框 + 柔紫字）
- **卡片：** 圆角 8px，轻微阴影，hover 时上浮 2px + 阴影加深
- **标签：** 圆角 999px（胶囊形），小字号，淡色背景 + 深色文字
- **表单：** 圆角 6px，清晰的 focus 状态（柔紫色边框），充足的字段间距
- **动画：** 克制。scroll reveal（淡入上浮）、hover 微交互。不使用弹跳、旋转等花哨效果

### 6.6 整体调性

- **专业：** 大量留白、清晰的层级、克制的配色
- **有质感：** 不使用纯黑纯白，用深海蓝和暖灰代替
- **AI极客色彩：** 通过柔紫强调色体现，不是大面积使用，而是作为点缀出现在交互元素上
- **不是：** 科技公司的渐变风、创业公司的扁平风、传统公司的沉闷风

---

## 7. 技术架构

### 7.1 技术栈

```
前端：
  框架：   React 18+
  构建：   Vite 5+
  语言：   TypeScript
  样式：   TailwindCSS v4
  组件库： shadcn/ui
  路由：   React Router v6+
  数据：   TanStack Query（服务端状态管理）
  表单：   React Hook Form + Zod 验证

后端：
  平台：   Vercel Serverless Functions
  数据库： Supabase (PostgreSQL)
  认证：   第一阶段不需要，后续用 Supabase Auth

部署：
  平台：   Vercel
  域名：   待定（需绑定自定义域名）
  CDN：    Vercel Edge Network（自带）
```

### 7.2 架构图

```
用户浏览器
  │
  ├── React SPA (Vite 构建)
  │     ├── 页面路由 (React Router)
  │     ├── 组件 (shadcn/ui + 自定义)
  │     ├── 数据获取 (TanStack Query)
  │     └── 表单处理 (React Hook Form + Zod)
  │
  ├── Vercel Edge Network (CDN + 静态资源)
  │
  └── Vercel Serverless Functions (/api/*)
        ├── POST /api/enterprise-lead
        ├── POST /api/talent-lead
        ├── GET  /api/projects
        ├── GET  /api/articles
        └── GET  /api/programs
              │
              └── Supabase (PostgreSQL)
                    ├── enterprise_leads
                    ├── talent_leads
                    ├── projects
                    ├── articles
                    └── programs
```

### 7.3 关键技术决策

1. **CSR (Client-Side Rendering)：** 这是营销网站，SEO 很重要。但考虑到 React SPA 的 SEO 劣势，使用 Vercel 的 SSR 或 prerender 功能确保搜索引擎可索引。
2. **shadcn/ui：** 不是 npm 包，而是通过 CLI 复制组件源码到项目中，完全可控。
3. **Tailwind CSS v4：** 使用 CSS-first 配置（不用 tailwind.config.js），直接在 CSS 中定义设计令牌。
4. **数据获取：** 静态内容（文章、项目）使用 TanStack Query 缓存 + staleTime 避免重复请求。表单提交使用 mutation。
5. **无用户系统：** 第一阶段不做登录、注册、用户中心。表单提交即可。

---

## 8. 数据库设计

### 8.1 表结构（Supabase / PostgreSQL）

```sql
-- 企业线索
CREATE TABLE enterprise_leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  company     TEXT NOT NULL,
  title       TEXT NOT NULL,
  contact     TEXT NOT NULL,
  challenge   TEXT,
  consent     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 人才线索
CREATE TABLE talent_leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  position    TEXT NOT NULL,
  industry    TEXT NOT NULL,
  skills      TEXT[],          -- 能力标签数组
  contact     TEXT NOT NULL,
  consent     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 项目/JD（对应 /projects 页面）
CREATE TABLE projects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,           -- 简短标题
  industry    TEXT NOT NULL,           -- 行业标签
  function    TEXT NOT NULL,           -- 职能标签
  status      TEXT NOT NULL DEFAULT 'ongoing',  -- 'ongoing' | 'completed'
  narrative   TEXT NOT NULL,           -- 脱敏叙事内容
  requirements TEXT,                   -- 人才要求描述
  outcomes    TEXT,                    -- 预期成果（已完成项目）
  sort_order  INT DEFAULT 0,
  published   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 洞察文章（对应 /insights 页面）
CREATE TABLE articles (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,    -- URL 友好的标识符
  excerpt     TEXT,                    -- 摘要
  content     TEXT NOT NULL,           -- Markdown 格式正文
  topic       TEXT NOT NULL,           -- 主题标签
  cover_image TEXT,                    -- 封面图 URL
  published   BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 课程项目（对应 /programs 页面）
CREATE TABLE programs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  format      TEXT,                    -- 形式（线上/线下/工作坊）
  duration    TEXT,                    -- 时长
  cover_image TEXT,
  published   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

### 8.2 Row Level Security (RLS)

```sql
-- 公开内容：所有人可读
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are publicly readable"
  ON projects FOR SELECT
  USING (published = true);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles are publicly readable"
  ON articles FOR SELECT
  USING (published = true);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Programs are publicly readable"
  ON programs FOR SELECT
  USING (published = true);

-- 表单提交：仅允许插入，不允许读取
ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit enterprise leads"
  ON enterprise_leads FOR INSERT
  WITH CHECK (true);

ALTER TABLE talent_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit talent leads"
  ON talent_leads FOR INSERT
  WITH CHECK (true);
```

---

## 9. API 设计

### 9.1 端点清单

#### 企业线索提交

```
POST /api/enterprise-lead

Request Body:
{
  "name": "string (required)",
  "company": "string (required)",
  "title": "string (required)",
  "contact": "string (required)",
  "challenge": "string (optional)",
  "consent": true
}

Response 200:
{ "success": true }

Response 400:
{ "error": "Validation failed", "details": [...] }

Response 429:
{ "error": "Too many requests" }

Response 500:
{ "error": "Internal server error" }
```

#### 人才线索提交

```
POST /api/talent-lead

Request Body:
{
  "name": "string (required)",
  "position": "string (required)",
  "industry": "string (required)",
  "skills": "string (optional, comma-separated)",
  "contact": "string (required)",
  "consent": true
}

Response: 同上
```

#### 获取项目列表

```
GET /api/projects?status=ongoing&industry=manufacturing&function=strategy

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "title": "某头部制造企业 AI 供应链优化",
      "industry": "制造业",
      "function": "AI+战略",
      "status": "ongoing",
      "narrative": "...",
      "requirements": "...",
      "outcomes": null,
      "created_at": "2026-05-01T..."
    }
  ]
}
```

#### 获取文章列表

```
GET /api/articles?topic=ai-trends

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "title": "...",
      "slug": "...",
      "excerpt": "...",
      "topic": "AI趋势",
      "cover_image": "...",
      "published_at": "2026-05-01T..."
    }
  ]
}
```

#### 获取文章详情

```
GET /api/articles/:slug

Response 200:
{
  "data": {
    "id": "uuid",
    "title": "...",
    "slug": "...",
    "excerpt": "...",
    "content": "... (markdown)",
    "topic": "...",
    "cover_image": "...",
    "published_at": "..."
  }
}
```

#### 获取课程列表

```
GET /api/programs

Response 200:
{
  "data": [
    {
      "id": "uuid",
      "title": "...",
      "description": "...",
      "format": "线上工作坊",
      "duration": "6周",
      "cover_image": "..."
    }
  ]
}
```

### 9.2 安全要求

- **速率限制：** 表单提交端点限制为每个 IP 每小时 5 次
- **输入验证：** 服务端使用 Zod schema 严格验证所有输入
- **CORS：** 仅允许来自ZAN域名的请求
- **HTTPS：** 强制（Vercel 默认）
- **不暴露内部 ID：** API 返回中不暴露 Supabase 内部信息

---

## 10. 项目文件夹结构

```
zoan/
├── public/
│   ├── images/                    # 静态图片资源
│   │   ├── logo.svg
│   │   ├── og-image.png           # 社交分享图
│   │   └── qrcode-wechat.png      # 公众号二维码
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 组件（通过 CLI 生成）
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── select.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx         # 全局顶部导航（含双CTA）
│   │   │   ├── Footer.tsx         # 全局底部
│   │   │   ├── MobileMenu.tsx     # 移动端汉堡菜单
│   │   │   └── Container.tsx      # 内容容器（max-width）
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx    # 首页 Hero
│   │   │   ├── FeatureCards.tsx   # 差异化卡片组
│   │   │   ├── ProcessFlow.tsx    # 流程可视化
│   │   │   ├── ProjectCard.tsx    # 项目/JD 卡片
│   │   │   ├── ArticleCard.tsx    # 文章卡片
│   │   │   ├── ProgramCard.tsx    # 课程卡片
│   │   │   └── CTASection.tsx     # 通用 CTA 区块
│   │   └── shared/
│   │       ├── RevealOnScroll.tsx # Scroll reveal 动画
│   │       ├── FilterBar.tsx      # 筛选器组件
│   │       └── SectionHeading.tsx # 统一的 section 标题
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── WhyZoan.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Projects.tsx
│   │   ├── Insights.tsx
│   │   ├── InsightDetail.tsx
│   │   ├── Programs.tsx
│   │   ├── EnterpriseContact.tsx
│   │   ├── TalentApply.tsx
│   │   ├── Privacy.tsx
│   │   └── Terms.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts            # Supabase 客户端初始化
│   │   ├── api.ts                 # API 调用封装
│   │   └── utils.ts               # 通用工具函数（cn 等）
│   │
│   ├── types/
│   │   └── index.ts               # TypeScript 类型定义
│   │
│   ├── hooks/
│   │   ├── useProjects.ts         # 项目数据 hook
│   │   ├── useArticles.ts         # 文章数据 hook
│   │   └── usePrograms.ts         # 课程数据 hook
│   │
│   ├── styles/
│   │   └── globals.css            # Tailwind 全局样式 + 设计令牌
│   │
│   ├── App.tsx                    # 路由配置
│   └── main.tsx                   # 入口文件
│
├── api/                           # Vercel Serverless Functions
│   ├── enterprise-lead.ts
│   ├── talent-lead.ts
│   ├── projects.ts
│   ├── articles.ts
│   └── programs.ts
│
├── supabase/
│   ├── config.toml
│   └── migrations/
│       └── 001_initial_schema.sql
│
├── index.html                     # Vite 入口 HTML
├── package.json
├── vite.config.ts
├── tailwind.config.ts             # 如用 v4 则可能不需要
├── tsconfig.json
├── components.json                # shadcn/ui 配置
├── vercel.json                    # Vercel 部署配置
├── .env.local                     # 环境变量（本地）
├── .env.example                   # 环境变量模板
├── .gitignore
├── CLAUDE.md                      # AI 行为指南
└── PRD.md                         # 本文件
```

---

## 11. 开发阶段规划

### Phase 0：项目初始化（1-2天）

- [ ] 创建 Vite + React + TypeScript 项目
- [ ] 配置 Tailwind CSS v4 + 设计令牌（色彩、字体、间距）
- [ ] 初始化 shadcn/ui
- [ ] 配置 React Router
- [ ] 配置 Supabase 客户端
- [ ] 搭建 Header + Footer + Container 布局组件
- [ ] 部署到 Vercel，验证 CI/CD 流程

### Phase 1：核心页面 + 表单（1周）

- [ ] 首页（所有 section）
- [ ] 企业需求表单（/enterprise/contact）
- [ ] 人才申请表单（/talent/apply）
- [ ] Supabase 数据库建表 + RLS
- [ ] Serverless Functions（表单提交）
- [ ] 隐私政策 + 服务条款页
- [ ] **验证：表单数据成功写入数据库**

### Phase 2：内容页面（1周）

- [x] 服务总览页（三分段）
- [x] 合作流程页
- [x] 关于我们 + 为什么选择ZAN
- [x] 课程项目页
- [x] **验证：所有静态页面完成，导航完整**

### Phase 3：动态内容页面（1周）

- [x] 项目机会页（/projects）—— 带筛选、从数据库读取
- [x] 洞察文章列表页 + 详情页
- [x] ~~Serverless Functions（内容读取 API）~~ — 公开内容直接通过 Supabase 客户端 SDK 读取（见 ARCHITECTURE.md §1 读写分离）
- [x] **验证：数据从 Supabase 正确加载到页面**

### Phase 4：打磨上线（3-5天）

- [ ] 响应式适配（移动端优化）
- [ ] 动画和交互打磨（scroll reveal、hover 效果）
- [ ] SEO 优化（meta 标签、OG 标签、sitemap）
- [ ] 性能优化（图片压缩、字体加载优化、缓存策略）
- [ ] 内容填充（真实案例、真实文章）
- [ ] 法律合规检查（隐私政策内容完善）
- [ ] 自定义域名绑定
- [ ] **验证：生产环境完整走查**

### 总估时：约 3-4 周

---

## 12. 约束与原则

### 产品原则

1. **C端先行：** 网站首先服务于吸引高端人才，其次才是企业端
2. **内容为王：** /projects 和 /insights 是两个最有价值的内容页面
3. **轻表单重跟进：** 表单够用就行，核心靠顾问人工跟进
4. **脱敏叙事：** 项目展示用故事而不是列表，兼顾品牌感和信息量

### 技术原则

1. **不提前做用户系统：** 第一阶段无登录、无注册、无个人中心
2. **不提前做管理后台：** 内容通过 Supabase Dashboard 直接操作数据库
3. **不引入不必要的依赖：** 每新增一个 npm 包需要有明确理由
4. **shadcn/ui 优先：** 所有 UI 组件优先使用 shadcn，不自己造轮子
5. **Serverless 优先：** 不搭建任何需要持久运行的服务器
6. **TypeScript 严格模式：** 所有代码必须通过 TypeScript 严格检查

### 安全原则

1. 所有表单提交必须经过服务端验证（不信任前端）
2. 所有用户输入必须 sanitized（防 XSS）
3. 数据库启用 RLS，公开数据只读，表单只写
4. API 端点必须有速率限制
5. 敏感信息（Supabase key 等）通过环境变量管理，不提交到代码仓库
6. 表单必须有隐私政策勾选（PIPL 合规）

### 内容原则

1. 所有文案使用商业语言而非技术语言（受众是 CEO 不是 CTO）
2. AI 在文案中的定位是"赋能"而非"替代"
3. 中英双语品牌名同时出现时：中文在前，英文（ZAN）在后
4. 联系邮箱上线前必须确认（当前 contact@zuoanmen.com 为占位符）

---

## 变更记录

| 日期 | 变更内容 | 原因 |
|------|---------|------|
| 2026-05-17 | Phase 2 内容页面完成：填充 /services、/services/process、/about、/why-zoan、/programs 五个页面内容 | 按 PRD 第 11 节阶段规划推进，所有页面文案、布局符合第 5 节页面规格 |
| 2026-05-17 | Phase 3 动态内容页面完成：/projects（筛选+卡片+兴趣CTA）、/insights 列表、/insights/:slug 详情；新增 react-markdown 依赖用于文章渲染；新增 002_seed_sample_content.sql 注入示例数据；公开内容读取按 ARCHITECTURE.md 既定路径走 Supabase 客户端 SDK,未新建只读 API 端点 | 按 PRD 第 11 节阶段规划推进；公开数据走客户端直读符合架构既定的读写分离原则,无需为只读场景增加 Serverless 层 |

---

> **本 PRD 是活文档，随产品迭代同步更新。**
> **所有技术决策变更需在此文档中记录。**
