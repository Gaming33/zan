# ZAN（左安）产品需求文档 (PRD)

> **版本：** v2.0 | **状态：** Active
> **品牌：** 中文名"左安"，英文缩写"ZAN"，英文全称"Zuo An Nexus"
> **本文档是 AI 辅助开发的施工图（harness），所有产品决策在此锁定。代码生成不得偏离。**

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

ZAN 左安是一个高阶能力按需对接平台：在企业增长、AI 转型、组织升级的关键节点，精准注入经过严格筛选的咨询顾问、领域专家与高管人才。

### 核心价值链

```
企业端："关键阶段缺人，传统猎头/咨询都不够快、不够准"
         ↓
ZAN 通过严选顾问网络，短时内推荐人选
         ↓
人才端：经过验证的咨询顾问/领域专家/高管 → 按需对接 → 项目制协作
         ↓
匹配交付：企业获得"按需人才 / 临时高管 / 项目制专家"三种灵活配置
         ↓
内容驱动：资源智库持续输出洞察，沉淀方法论
```

### 三大服务方向

| 服务 | 描述 | 典型场景 |
|------|------|---------|
| **按需人才** (On-Demand Talent) | 按项目周期灵活配置顾问，按效付费 | 业务增长、产品重构、增长瓶颈诊断 |
| **临时高管** (Interim Executive) | 关键管理岗位空缺或变革期的临时补位 | CEO/CTO/CPO 空窗、并购整合、危机管理 |
| **项目制专家** (Project-Based Expert) | 跨职能专家组队，全流程项目陪伴 | AI 转型落地、产品体系重构、增长模型搭建 |

### 核心差异化

| 维度 | 传统猎头 | 传统咨询 | ZAN |
|------|----------|----------|------|
| 人才标准 | 职位匹配 | 方法论驱动 | 严选 + 行业纵深 + AI 视野 |
| 响应速度 | 4-8 周 | 2-4 周 | 48 小时量级 |
| 交付形态 | 永久雇佣 | 项目报告 | 按需对接、按效付费 |
| 信息安全 | 标准合同 | 标准合同 | 对标行业最高标准 |

### 数据背书（首页展示）

- **48h** 平均响应（从需求到首轮推荐）
- **500+** 认证顾问（覆盖 AI / 产品 / 增长 / 组织）
- **95%** 交付达标率（经企业验收）
- **80%** 成本优化（相比传统咨询）

---

## 2. 目标用户

### 企业端

| 属性 | 描述 |
|------|------|
| 规模 | 中大型企业（民企、国企、上市公司、成长期独角兽） |
| 行业 | 不限 — 内容覆盖：金融、医疗、零售、消费、制造、文娱、能源、科技 |
| 决策人 | CEO / 业务一号位 / 战略负责人 |
| 核心诉求 | "关键阶段需要外部高阶能力快速到位" |

### 人才端

| 属性 | 描述 |
|------|------|
| 画像 | 一线咨询公司背景的顾问 / 产业资深专家 / 现任或前高管 |
| 核心能力 | 项目制协作、快速融入、项目交付、专业输出、知识共创、价值共创 |
| 来源 | 内容吸引（资源智库 + 公众号）、教授校友网络、口碑传播 |
| 转化路径 | 网站 → `/join` 表单 → 顾问审核 → 入席顾问网络 |

---

## 3. 信息架构与页面清单

### 导航结构

```
Header (液态玻璃效果，深色页透明，滚动后白底):
  关于左安      核心能力      资源智库      人才入席      [招贤纳士 CTA]
  (-> /)       (-> /services) (-> /resources) (-> /join)  (-> /find-talent)
```

### 完整页面清单（9 页 + 404）

| # | 路由 | 页面名称 | 入口 | 受众 |
|---|------|----------|------|------|
| 1 | `/` | 首页 (Home) | 直接访问 | 双受众 |
| 2 | `/services` | 核心能力 | Header 核心能力 | 企业端 |
| 3 | `/resources` | 资源智库 | Header 资源智库 | 双受众 |
| 4 | `/resources/:id` | 文章详情 | 资源列表卡片 | 双受众 |
| 5 | `/join` | 人才入席（顾问申请） | Header 人才入席 | 人才端 |
| 6 | `/find-talent` | 招贤纳士（企业表单） | Header CTA + 首页 CTA | 企业端 |
| 7 | `/privacy` | 隐私政策 | Footer | 双受众 |
| 8 | `/terms` | 服务条款 | Footer | 双受众 |
| 9 | `*` | NotFound (404) | 错误路径 fallback | — |

### Footer 结构（5 列网格 + 底部版权条）

```
┌────────┬────────┬────────┬─────────────┬──────────────┐
│ 关于   │ 服务   │ 资源   │ 联系        │ 关注我们     │
│ 关于左安│按需人才│ 行业案例│ 招贤纳士    │ 公众号二维码 │
│(占位3项)│临时高管│ 资源智库│ 人才入席    │              │
│        │项目制 │        │ contact@... │              │
└────────┴────────┴────────┴─────────────┴──────────────┘
─────────────────────────────────────────────────────────
© 2025 左安 ZAN     隐私政策  服务条款  信息安全
```

---

## 4. 用户流程

### 4.1 企业端流程

```
访问首页 → 阅读 Hero "高阶能力·按需获取"
  → 浏览 WHY ZAN (严选/全程/规范) → SERVICES (3 种模式) → 数据背书
  → 点击 "招贤纳士" CTA
  → 填写企业表单（8 字段）
  → 提交，显示成功提示
  → 顾问收到通知 → 24 小时内首轮推荐
```

### 4.2 人才端流程

```
阅读资源智库文章 / 公众号引导
  → 点击 "人才入席" CTA
  → 填写顾问申请表单（5 字段）
  → 提交，显示成功提示
  → 运营审核 → 邀请入席顾问网络
  → 后续按项目匹配
```

### 4.3 表单提交流程（技术层面）

```
用户填写表单 (React Hook Form + Zod 客户端验证)
  → POST /api/enterprise-lead 或 /api/talent-lead
  → Vercel Serverless Function (Zod 服务端再验证 + 速率限制)
  → 写入 Supabase
  → 200 返回
  → 前端显示 FormAlert 成功提示
```

---

## 5. 页面规格

### 5.1 首页 `/` — `src/pages/Home.tsx`

**目的：** 30 秒内传达 ZAN 的定位、价值、信任度，把双受众分流到 /find-talent 或 /join。

| Section | 背景 | 内容 |
|---------|------|------|
| HERO | 主深蓝 + 半透明 Hero 图 + 渐变叠加 + radial 高光 | 上标 "ZUO AN NEXUS" / 主标 "高阶能力·按需获取" / 描述 / 双 CTA（招贤纳士 + 人才入席） |
| WHY ZAN | 浅灰底 左文右图 | 上标 WHY ZAN / 副标"为企业重塑核心竞争优势" / 三项 icon 列表（严选人才/全程服务/规范保障） |
| SERVICES | 深底 | 上标 SERVICES / 标题"灵活获取所需的高阶能力" / 3 列卡片（01 按需人才 / 02 临时高管 / 03 项目制专家） + "查看全部服务" 链接 |
| 数据背书 | 浅灰底 | 上标 TRUSTED BY NUMBERS / 4 列大字 + CountUp 动画（48h / 500+ / 95% / 80%） |
| DUAL CTA | 主深蓝 | 上标 GET STARTED / 双按钮 |

### 5.2 核心能力 `/services` — `src/pages/Services.tsx`

| Section | 内容 |
|---------|------|
| Hero | 标题"核心能力" + 描述 |
| Intro | 一段定位文案（不是猎头、不是传统咨询） |
| Industries | 行业覆盖网格（金融/医疗/零售/消费/制造/文娱/能源/科技） |
| Services 详情 | 3 个服务（按需人才 / 临时高管 / 项目制专家），每个含副标题、英文名、描述、4 个能力点、配图 |
| CTA | 双按钮 |

### 5.3 资源智库 `/resources` — `src/pages/Resources.tsx`

| Section | 内容 |
|---------|------|
| Hero | "资源智库" + 描述 |
| 筛选 Tabs | 全部 / 案例研究 / 方法论 / 人才研究 / 实践指南 |
| 文章网格 | 3 列卡片，每张：封面图 + 类型徽章 + 日期 + 标题 + 摘要 |
| 分页 | 每页 9 篇，简单分页器 |

**当前版本不实现邮件订阅模块**（如未来产品决策需要再补，需更新本规格 + 加 subscribers 表）。

### 5.4 文章详情 `/resources/:id` — `src/pages/ResourceDetail.tsx`

| Section | 内容 |
|---------|------|
| Breadcrumb | 首页 > 资源智库 > 文章标题 |
| Hero | 封面大图 + 类型 / 日期 / 标题 / 摘要 |
| 正文 | Markdown 渲染（react-markdown）|
| 底部 CTA | 联系我们 / 阅读更多 |

### 5.5 人才入席 `/join` — `src/pages/Join.tsx`

| Section | 内容 |
|---------|------|
| Hero | "人才入席" 标题 + 描述 |
| 顾问画像 | 6 项核心能力网格（项目制协作、快速融入、项目交付、专业输出、知识共创、价值共创），每项含图标 + 标题 + 描述 |
| 申请表单 | 5 字段：name, email, phone, role(核心领域), bio |
| 成功提示 | FormAlert 浮层 |

### 5.6 招贤纳士 `/find-talent` — `src/pages/FindTalent.tsx`

| Section | 内容 |
|---------|------|
| Hero | "招贤纳士" 标题 + 描述 |
| 流程 | 4 步流程（需求诊断 → 顾问匹配 → 项目启动 → 持续陪伴），每步含图标 |
| 企业表单 | 8 字段：name, company, email, phone, role(岗位), stage(企业阶段), challenge, timeline |
| 成功提示 | FormAlert 浮层 |

### 5.7 隐私政策 `/privacy` — `src/pages/Privacy.tsx`

极简版法律页面。标题 + 章节列表：
- 收集的个人信息（姓名/邮箱/电话/公司）
- 使用方式（仅用于联系跟进，不对外分享）
- 用户权利（查询、删除）
- 联系方式

### 5.8 服务条款 `/terms` — `src/pages/Terms.tsx`

极简版法律页面。标题 + 章节列表：
- 服务范围
- 用户责任
- 知识产权
- 免责声明
- 联系方式

### 5.9 NotFound `*` — `src/pages/NotFound.tsx`

居中 404 大字 + "返回首页" 链接，深蓝底。

---

## 6. 视觉设计指南

> **完整规范见 UI_GUIDELINES.md。** 本节仅摘核心令牌，与该文档不一致时以 UI_GUIDELINES.md 为准。

### 6.1 色彩（固定值）

```
主色：
  --color-accent:        #10b981   主绿（CTA、链接、徽章、强调）
  --color-accent-hover:  #059669   绿 hover
  --color-accent-light:  #34d399   亮绿（深底文字、上标）
  --color-teal:          #14b8a6   青绿（次强调）

背景：
  --color-bg:            #0d1d35   主深蓝（Hero、CTA 区、Header overlay）
  --color-bg-dark:       #0a1628   深底（SERVICES 区、Footer）
  --color-bg-light:      #f5f7fa   浅灰（内容区段间隔）
  --color-bg-white:      #FFFFFF   卡片/输入框背景

文字：
  --color-text:          #1a2332   主文字
  --color-text-muted:    #5a6779   次要文字
  --color-text-light:    #FFFFFF   深底上的白
  rgba(255,255,255,0.65)            深底上的次要白

边框：
  --color-border:        rgba(100,149,237,0.2)   深底上的细边
  --color-border-light:  #e2e6ed                  浅底上的细边
```

### 6.2 字体（固定选型）

```
家族：Alibaba PuHuiTi 2.0
fallback：PingFang SC, Microsoft YaHei, sans-serif
字重：400 / 500 / 600 / 700（按需加载）

正文 line-height：1.7-1.8
标题 letter-spacing：-0.02em ~ -0.01em
英文上标 letter-spacing：0.2em（tracking-widest）
```

### 6.3 间距与圆角

```
内容容器最大宽度：1200px
页面左右内边距：移动 16-24px / 桌面 24-32px
Section 主纵向间距：移动 ~70-90px / 桌面 ~120-150px

圆角：
  --radius: 0.25rem (4px)  — 方角微圆，不用大圆角
  按钮：方角（基础半径或无）
  卡片：方角或基础半径
  徽章/头像：rounded-full
```

### 6.4 动效原则

- **库选型**：GSAP + ScrollTrigger 统一处理滚动触发动画
- **进场动效**：opacity 0→1 + 垂直位移 ~30px；时长 500-800ms；缓动用 power-out / ease-out 系列；触发点在元素进入视口 ~80-90% 时
- **Hero 进场**：CSS keyframes 分级延迟，主标 → 装饰线 → 副标 → CTA，每级间隔 200-300ms
- **CountUp**：数据区数字爬升 ~1-2 秒
- **Hover**：图片轻微放大（~1.02-1.05）+ 亮度提升；链接下划线生长
- **Navigation 滚动**：透明渐变为白底毛玻璃，过渡阈值约滚动数十像素内完成
- **可访问性**：尊重 `prefers-reduced-motion`，禁用全部动画

---

## 7. 技术架构

> **完整规范见 ARCHITECTURE.md。**

```
前端：React 19 + Vite + TypeScript strict + Tailwind v3 + shadcn/ui + GSAP
路由：react-router v7
表单：React Hook Form + Zod（前后端共享 schema）
数据：TanStack Query + Supabase JS SDK 客户端直读
图标：@phosphor-icons/react（推荐 weight="duotone"）
内容渲染：react-markdown

后端：Vercel Serverless Functions（仅写入端点）
数据库：Supabase (PostgreSQL + RLS)
部署：Vercel
```

**关键架构决策：**
1. **读写分离**：公开内容前端直读 Supabase（RLS 保护）；表单提交走 Serverless（服务端验证 + 限流 + Service Role 写入）
2. **无 Admin**：内容通过 Supabase Dashboard 管理；当内容量达到运营负担阈值时再考虑加管理后台
3. **无登录系统**：第一阶段无用户、无 Auth；如需人才档案自助维护再引入 Supabase Auth

---

## 8. 数据库设计

> **完整规范见 DATABASE.md。**

### 表清单（3 张）

| 表 | 用途 |
|----|------|
| `articles` | 资源智库文章（标题、分类、类型、日期、摘要、封面、Markdown 正文、排序） |
| `enterprise_leads` | /find-talent 提交的企业需求 |
| `talent_leads` | /join 提交的顾问申请 |

### RLS

- `articles`：published=true 公开可读
- `enterprise_leads` / `talent_leads`：仅允许 INSERT，不允许 SELECT

---

## 9. API 设计

> **完整规范见 API.md。**

### 端点（2 个写入）

| 方法 | 路径 | 用途 |
|------|------|------|
| POST | `/api/enterprise-lead` | /find-talent 表单（8 字段） |
| POST | `/api/talent-lead` | /join 表单（5 字段） |

**只读数据：** 文章列表/详情由前端 hook 通过 Supabase 客户端 SDK 直读，RLS 限制 published=true。

---

## 10. 项目文件夹结构

> **完整规范见 FOLDER_STRUCTURE.md。**

```
src/
├── components/
│   ├── ui/              shadcn (Button、Input、Textarea、Select、Label、Separator)
│   ├── Navigation.tsx   全局顶部导航
│   ├── Footer.tsx       全局 5 列 Footer
│   ├── CountUp.tsx      数字爬升动画
│   ├── FormAlert.tsx    表单提交结果浮层
│   ├── Skeleton.tsx     加载占位
│   └── ParticleNetwork.tsx  可选粒子背景
├── pages/               9 个页面（default export）
├── lib/                 supabase.ts, api.ts, utils.ts
├── hooks/               useArticles.ts
├── types/               index.ts, schemas.ts
├── data/                articles.ts（种子数据，开发期引用）
└── index.css            Tailwind + 设计令牌

api/                     enterprise-lead.ts, talent-lead.ts
public/
├── images/              允许一级子目录
└── videos/              hero-bg.mp4 等
supabase/migrations/     001 ~ 003 SQL 文件
```

---

## 11. 开发阶段规划

### Phase A：harness 文档锁定（当前完成项）

- [x] PRD.md
- [x] UI_GUIDELINES.md
- [x] git-instruction.md
- [x] ARCHITECTURE.md
- [x] FOLDER_STRUCTURE.md
- [x] DATABASE.md + 003 迁移 SQL
- [x] API.md

### Phase B：基础设施

- [ ] public/images/ + public/videos/ 资源就位
- [ ] 依赖对齐：Tailwind v3 + tailwindcss-animate + react-router v7 + gsap + @phosphor-icons/react + react-helmet-async 等
- [ ] `src/index.css` 设计令牌定义 + `tailwind.config.js` v3 配置 + `postcss.config.js`
- [ ] `components.json` shadcn 配置

### Phase C：全局壳

- [ ] `src/components/Navigation.tsx`、`Footer.tsx`
- [ ] `src/components/CountUp.tsx`、`FormAlert.tsx`、`Skeleton.tsx`、按需 `ParticleNetwork.tsx`
- [ ] `src/App.tsx` 路由配置 9 个路由

### Phase D：逐页实现

按以下顺序，每页完成后跑 `npm run dev` 自测：

1. Home
2. Services
3. Resources
4. ResourceDetail（Markdown 渲染）
5. Join（RHF + Zod + fetch）
6. FindTalent（RHF + Zod + fetch）
7. Privacy
8. Terms
9. NotFound

### Phase E：数据接通 + 上线

- [ ] Supabase 执行 003_consolidate_schema.sql
- [ ] 转换种子数据为 SQL INSERT 写入 articles 表
- [ ] 浏览器全流程走查（含表单真实写入 Supabase）
- [ ] Vercel 部署

---

## 12. 约束与原则

### 产品原则

1. **C 端先行**：网站优先服务于吸引高端人才，企业端转化次之
2. **内容驱动**：`/resources` 是核心引流页，需持续填充高质量内容
3. **轻表单重跟进**：表单字段够用即可，核心靠顾问人工跟进
4. **数据背书需真实**：48h / 500+ / 95% / 80% 是承诺，运营保证真实达成

### 技术原则

1. **不提前做用户系统**：第一阶段无登录、无注册、无个人中心
2. **不提前做管理后台**：内容通过 Supabase Dashboard 维护
3. **shadcn 仅用于表单组件**：营销页采用手写 div + Tailwind，保持极简风格
4. **Serverless 优先**：不搭建任何需持久运行的服务器
5. **TypeScript 严格模式**：所有代码必须通过 strict 检查

### 安全原则

1. 表单提交服务端再验证（不信任前端 Zod）
2. 启用 RLS：公开数据只读 published=true，表单仅 INSERT
3. API 端点限流：每 IP 每小时上限 5 次表单提交
4. 环境变量：SERVICE_ROLE_KEY 仅 Serverless 用，不前端暴露
5. 当前不收集 PIPL consent 字段；如未来合规审查要求引入，需同步更新 schemas / DB / API.md / 表单 UI

### 内容原则

1. 文案用商业语言，不用技术术语（受众是 CEO 不是 CTO）
2. AI 定位是"赋能"不是"替代"
3. 联系邮箱：上线前需运营确认正式邮箱

---

## 变更记录

| 日期 | 变更内容 | 原因 |
|------|---------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本 PRD 是活文档，随产品迭代同步更新。所有产品决策变更需在此文档中记录。**
