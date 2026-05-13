# Zuoan Parallel Page Workflow

> Purpose: prompt library and work protocol for developing one Zuoan page per fresh agent session.
> Audience: coding agents and a non-technical project owner.

## 0. Read This First

Before every new page discussion or development session, tell the agent to read:

- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- the current page md:
  - `docs/01-home.md`
  - `docs/02-services.md`
  - `docs/03-resources.md`
  - `docs/04-join-zoan.md`
  - `docs/05-find-talent.md`

The design source of truth is always `docs/DESIGN.md`.

The page source of truth is the corresponding page md.

The development work folder is `fronted/`.

## 1. Folder Ownership

Use one folder per page.

```text
fronted/
  shared/
  home/
  services/
  resources/
  join/
  find-talent/
```

Ownership rules:

- `fronted/home/` owns the home page.
- `fronted/services/` owns the services page.
- `fronted/resources/` owns the resources page.
- `fronted/join/` owns the join Zuoan page.
- `fronted/find-talent/` owns the find talent page.
- `fronted/shared/` owns reusable layout and components only.

Agents must not edit other page folders during a single-page task.

Shared components can be created in `fronted/shared/`, but only when at least two pages need the same component.

## 2. Global Design Rules

Every page must follow:

- `docs/DESIGN.md`
- `PROJECT_PROGRESS.md`
- existing page md
- frontend-design skill if available
- web design guideline instructions if available in the active agent environment

If frontend-design or web design guideline skills are available, use them only to improve execution quality. Do not override `docs/DESIGN.md`.

Visual baseline:

- IBM/Carbon-style blue-white enterprise system.
- White canvas.
- IBM Blue primary CTA.
- Charcoal text.
- Square buttons and cards.
- Thin borders.
- Minimal or no shadow.
- Dense but readable enterprise layout.

Do not:

- invent unconfirmed company numbers, logos, or case names.
- add Oriental decoration, black-gold styling, or generic AI SaaS gradients.
- turn pages into flashy landing-page demos.
- create login, dashboard, matching engine, payment, or backend systems unless explicitly requested.
- write in unrelated folders.
- keep temporary screenshots, downloaded test assets, or unused files.

## 3. Git Workflow For A Beginner

### Option A: One Page At A Time

Use this if you are working with one agent at a time.

```powershell
git status
git switch -c page/home
```

After page work is done:

```powershell
git status
git add docs/01-home.md fronted/home fronted/shared
git commit -m "feat: implement home page"
```

Then return to main branch:

```powershell
git switch master
```

Repeat for the next page.

### Option B: Parallel Agents With Worktrees

Use this if multiple agents work at the same time.

From project root:

```powershell
git worktree add ../左安门-home -b page/home
git worktree add ../左安门-services -b page/services
git worktree add ../左安门-resources -b page/resources
git worktree add ../左安门-join -b page/join
git worktree add ../左安门-find-talent -b page/find-talent
```

Each new chat must work inside its own worktree.

Example:

```text
D:\Desk\Leo\Desktop\左安门-home
```

Only give the home page prompt to the home page agent.

Do not let multiple agents edit `fronted/shared/` at the same time. If shared components are needed, assign one agent as shared owner.

## 4. Discussion Prompt Template

Use this before coding. Goal: finalize the page md.

```markdown
请先不要写代码。我们现在只讨论并定稿一个页面说明文档。

## Context

项目：Zuoan / 左安门网站 MVP。

请先读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `[当前页面 md]`

当前页面：
- `[填写当前页面 md 路径]`

可用设计参考：
- 如果当前环境有 frontend-design skill，请使用它做视觉质量检查。
- 如果当前环境有 web design guideline，请使用它做页面结构和可用性检查。
- 这些参考不能覆盖 `docs/DESIGN.md`。

## Goal

目标是定稿当前页面 md，不做开发。

需要判断：
- 页面目标是否清楚。
- 用户路径是否清楚。
- 模块顺序是否合理。
- 每个模块要写什么内容。
- CTA 跳转是否正确。
- 表单字段是否合理。
- 是否符合 `docs/DESIGN.md`。
- 是否和其他页面边界重复。

## Constraints

- 不写代码。
- 不创建新页面。
- 不改其他页面 md。
- 不自由发挥视觉风格。
- 不编造未确认数字、客户 logo、案例名称。
- 不加入东方装饰、黑金风、渐变 SaaS 风。
- 不把页面做成 landing page 炫技稿，要做企业级信息门户。
- 如果页面职责不清，先指出问题并给取舍建议。

## Interface & Data

输入：
- 当前页面 md。
- `docs/DESIGN.md`。
- `PROJECT_PROGRESS.md`。

输出：
- 更新后的当前页面 md。
- 明确模块顺序。
- 明确 CTA。
- 明确表单字段。
- 明确待补内容。

## Process

1. 先总结你读到的页面职责。
2. 指出当前 md 中不清楚、重复、或不适合开发的地方。
3. 给出建议版页面结构。
4. 等我确认后，再写入当前 md。
5. 写入后列出改动和剩余待确认项。

## Review

完成标准：
- 当前页面 md 足够让后续 coding agent 直接实现。
- 页面结构、内容、CTA、表单都清楚。
- 未污染其他页面。
```

## 5. Development Prompt Template

Use this after the page md is finalized.

```markdown
你现在是这个项目的资深前端工程协作者。请按工程化方式完成当前页面开发。

## Context

项目：Zuoan / 左安门网站 MVP。

请先读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `[当前页面 md]`

当前页面：
- `[填写页面名称]`

当前工作目录：
- `[填写当前 worktree 或项目路径]`

开发范围：
- 只开发当前页面。
- 页面主文件夹：`fronted/[页面文件夹]`
- 如需共享组件，只放入 `fronted/shared/`。
- 不改其他页面文件夹。

可用设计参考：
- 如果当前环境有 frontend-design skill，请用它检查 UI 质量。
- 如果当前环境有 web design guideline，请用它检查布局、表单、CTA 和响应式可用性。
- 所有结果必须服从 `docs/DESIGN.md`。

## Goal

实现当前页面 MVP。

成功标准：
- 页面结构严格对应当前页面 md。
- 视觉严格遵循 `docs/DESIGN.md`。
- 顶部导航和底部栏可复用。
- CTA 跳转正确。
- 表单可展示、可填写、可触发前端成功状态。
- 移动端可读。
- 页面能本地打开或通过项目 dev server 预览。

## Constraints

- 不改无关文件。
- 不新增无关依赖。
- 不创建实验文件、临时截图、无关素材。
- 不复制一套重复 Header/Footer。
- 不改其他页面内容和布局。
- 不加入登录、后台、支付、自动匹配系统。
- 不编造未确认数字、客户 logo、案例名称。
- 不加入东方装饰、黑金风、渐变 SaaS 风。
- 不把页面做成 landing page 炫技稿，要做企业级信息门户。
- 开发后清理无关资产，只保留核心文件。

## Interface & Data

输入：
- 当前页面 md 的模块结构。
- `docs/DESIGN.md` design tokens。

输出：
- 当前页面实现文件。
- 必要共享组件。
- 必要样式。

表单：
- 可先 frontend-only。
- 提交后展示成功状态。
- 不要求真实后端，除非明确要求。

Routes：
- `/` -> `fronted/home/`
- `/services` -> `fronted/services/`
- `/resources` -> `fronted/resources/`
- `/join` -> `fronted/join/`
- `/find-talent` -> `fronted/find-talent/`

## Process

1. 先检查项目结构和技术栈。
2. 说明你将修改哪些文件。
3. 给出最小开发计划。
4. 实现当前页面。
5. 复用或创建共享 Header/Footer。
6. 清理无关资产。
7. 运行可用验证命令。
8. 如有 dev server，启动并检查桌面/移动端。
9. 最后总结变更、验证结果、剩余风险。

## Review

完成标准：
- 当前页面可访问。
- 视觉符合 `docs/DESIGN.md`。
- 页面没有明显布局溢出。
- CTA 和表单路径可用。
- 文件变更集中在当前页面目录和必要共享目录。
- 没有无关资产残留。
```

## 6. Page-Specific Prompts

### 6.1 Home Page

Discussion:

```markdown
当前页面 md：`docs/01-home.md`
讨论目标：定稿首页结构和内容。

首页职责：
- 网站总入口。
- 合并“关于左安”和“为什么选择左安”的首版功能。
- 引导企业提交需求。
- 引导人才申请入席。

必须讨论：
- 首屏定位。
- 双 CTA。
- 企业痛点。
- 左安如何解决。
- 三类服务预览。
- 为什么选择左安。
- 经验数字 / 匿名案例占位。
- 资源预览。
- 底部 CTA。
```

Development:

```markdown
当前页面 md：`docs/01-home.md`
页面文件夹：`fronted/home/`
路由建议：`/`

只实现首页。不要改 `fronted/services/`、`fronted/resources/`、`fronted/join/`、`fronted/find-talent/`。

必须包含：
- 首屏定位
- 双 CTA
- 企业痛点
- 左安如何解决
- 三类服务预览
- 为什么选择左安
- 经验数字 / 匿名案例占位
- 资源预览
- 底部 CTA

CTA：
- 提交需求 -> `/find-talent`
- 申请入席 -> `/join`
- 查看服务 -> `/services`
- 查看资源 -> `/resources`
```

### 6.2 Services Page

Discussion:

```markdown
当前页面 md：`docs/02-services.md`
讨论目标：定稿“我们做什么”页面。

必须讨论：
- 三类服务是否保留。
- 服务命名是否清楚。
- 每类服务适合什么问题。
- Zuoan 如何介入。
- 企业能得到什么。
- 暂不承诺什么。
- 合作流程。
- CTA 指向。
```

Development:

```markdown
当前页面 md：`docs/02-services.md`
页面文件夹：`fronted/services/`
路由建议：`/services`

只实现服务页。不要改其他页面文件夹。

必须包含：
- 服务总述
- 按需人才
- 临时高管
- 项目制专家团队
- AI 增长与战略转型
- 典型场景
- 合作流程
- 服务边界
- 提交需求 CTA

CTA：
- 提交需求 -> `/find-talent`
```

### 6.3 Resources Page

Discussion:

```markdown
当前页面 md：`docs/03-resources.md`
讨论目标：定稿资源页。

必须讨论：
- 商业资源中心首版放什么。
- 案例研究是否先用匿名案例。
- 公众号文章入口。
- 闭门会入口。
- 课程 / Program 占位。
- 资源卡片结构。
```

Development:

```markdown
当前页面 md：`docs/03-resources.md`
页面文件夹：`fronted/resources/`
路由建议：`/resources`

只实现资源页。不要改其他页面文件夹。

必须包含：
- 商业资源中心
- 案例研究
- 公众号文章入口
- 闭门会入口
- 课程 / Program 占位
- 匿名案例卡片

不要放未授权 logo。
不要写真实客户名，除非已确认可公开。
```

### 6.4 Join Zuoan Page

Discussion:

```markdown
当前页面 md：`docs/04-join-zoan.md`
讨论目标：定稿“加入左安”页面。

必须讨论：
- 页面命名：加入左安 / 贤才入席。
- 左安寻找什么样的人。
- 第一批职能清单。
- 入席价值。
- 筛选标准。
- 人才申请表字段。
- 闭门会 / 内容共创入口。
```

Development:

```markdown
当前页面 md：`docs/04-join-zoan.md`
页面文件夹：`fronted/join/`
路由建议：`/join`

只实现人才端页面。不要改其他页面文件夹。

必须包含：
- 人才端首屏
- 左安寻找什么样的人
- 第一批职能清单
- 入席价值
- 筛选标准
- 人才申请表
- 闭门会 / 内容共创入口

不要做人才登录。
不要使用“门徒”作为正式页面称呼。
表单提交后展示前端成功状态。
```

### 6.5 Find Talent Page

Discussion:

```markdown
当前页面 md：`docs/05-find-talent.md`
讨论目标：定稿“寻找人才”页面。

必须讨论：
- 页面命名：寻找人才 / 企业求贤。
- 企业快速需求表。
- 企业深度诊断表。
- 表单轻重分级。
- 适合找 Zuoan 的场景。
- 常见需求。
- 如何表达“先诊断问题，再判断需要什么人”。
```

Development:

```markdown
当前页面 md：`docs/05-find-talent.md`
页面文件夹：`fronted/find-talent/`
路由建议：`/find-talent`

只实现企业端页面。不要改其他页面文件夹。

必须包含：
- 企业端首屏
- 适合找左安的场景
- 常见需求
- 左安如何判断企业需要什么人
- 企业快速需求表
- 企业深度诊断表
- 预约诊断 CTA

这个页面不是猎头招聘表。
必须强调先诊断问题，再判断需要什么人。
表单提交后展示前端成功状态。
```

## 7. End-Of-Session Checklist

Every page agent must answer:

- Modified files:
- Did you only edit the assigned page folder and necessary shared files:
- Did you clean temporary files/assets:
- Verification command and result:
- Local preview URL, if any:
- Remaining risks:
- Suggested commit message:

## 8. Commit Messages

Markdown discussion commits:

```powershell
git add docs/01-home.md
git commit -m "docs: finalize home page brief"
```

Development commits:

```powershell
git add fronted/home fronted/shared
git commit -m "feat: implement home page"
```

Use matching messages:

- `docs: finalize services page brief`
- `docs: finalize resources page brief`
- `docs: finalize join page brief`
- `docs: finalize find talent page brief`
- `feat: implement services page`
- `feat: implement resources page`
- `feat: implement join page`
- `feat: implement find talent page`
