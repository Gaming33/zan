# Zuoan Project Progress

> Purpose: root-level handoff for future coding agents. This file is an execution brief, not a narrative document.

## Current Stage

- Project: Zuoan / 左安门 website MVP.
- Current phase: design documentation and page-structure planning.
- Next phase: finalize each page markdown, then implement pages from finalized docs.
- Workflow rule: each core page may be developed in a fresh chat. New agent must read this file first.

## Source Of Truth

- Design system: `docs/DESIGN.md`
- Page docs:
  - `docs/01-home.md`
  - `docs/02-services.md`
  - `docs/03-resources.md`
  - `docs/04-join-zoan.md`
  - `docs/05-find-talent.md`

## Project Background

Zuoan is an MVP website for a high-end independent talent and fractional executive service.

The business intent:
- Help enterprise users identify key-stage business problems.
- Match companies with fractional executives, AI strategy advisors, project leads, or expert teams.
- Build a talent-side entry point for senior independent professionals.
- Use website + content + forms as the first market-facing loop.

The website is not a full platform yet.

The MVP goal:
- Create a credible website shell.
- Make enterprise demand submission usable.
- Make talent application usable.
- Establish service categories.
- Provide resource/case placeholders for content growth.

## Agreed Navigation

Primary nav:
- 首页
- 我们做什么
- 资源
- 加入左安
- 寻找人才

Persistent CTA:
- 提交需求
- 申请入席

## Design Decision

Use `docs/DESIGN.md` as mandatory visual contract.

Design direction:
- IBM Carbon-style enterprise blue-white system.
- White canvas.
- IBM Blue primary actions.
- Charcoal text.
- Thin borders.
- Square geometry.
- Minimal or no shadow.
- Dense but readable enterprise information layout.

Do not add:
- Oriental decorative motifs.
- Warm cultural color system.
- Red/gold luxury palette.
- Ink wash, seals, palace-wall imagery.
- Purple-blue generic AI SaaS gradients.
- Rounded pill-heavy UI.
- Heavy shadows or glassmorphism.

Current priority:
- Complete working shell first.
- Keep visual system stable and reproducible.
- Brand warmth can be revised after MVP.

## Content Strategy

Use 4WHY as an internal content check:
- WHY THIS: why the problem matters.
- WHY NOW: why now is the window.
- WHY US: why Zuoan should do it.
- WHY TRUST US: why users can believe Zuoan can do it.

Do not make 4WHY the visible page navigation.

Public pages should follow user decision flow:
- See problem.
- Understand service.
- Trust capability.
- Submit demand or apply.

## Current Files Status

`docs/DESIGN.md`
- Status: rewritten.
- Uses Zuoan project name.
- Based on IBM/Carbon.
- Follows Google Labs DESIGN.md-style schema:
  - YAML tokens.
  - Official core sections.
  - AI generation and implementation notes.

`docs/01-home.md`
- Status: skeleton only.
- Needs page content, module copy, exact CTA targets, visual notes.

`docs/02-services.md`
- Status: skeleton only.
- Needs service definitions, boundaries, process, conversion paths.

`docs/03-resources.md`
- Status: skeleton only.
- Needs content categories, first resource placeholders, case format.

`docs/04-join-zoan.md`
- Status: skeleton only.
- Needs talent value proposition, criteria, form fields, CTA copy.

`docs/05-find-talent.md`
- Status: skeleton only.
- Needs enterprise demand flow, light/deep form design, diagnostic language.

## Global Development Constraints

- Do not implement visual styles that conflict with `docs/DESIGN.md`.
- Do not invent platform maturity claims.
- Do not add login, dashboards, matching engine, payment, or backend workflow unless explicitly requested.
- Do not place unverified claims like "500+ companies served" unless wording is approved.
- If using team experience as proof, attribute it as team experience unless Zuoan institutional history is confirmed.
- Forms must exist as first-class conversion modules.
- Navigation and footer are shared across pages.
- Header and footer should be built once and reused.
- Page docs should be finalized before page implementation.

## Implementation Object Model

Shared layout:
- Header
- Footer
- Section
- CTA block
- Card grid
- Data metric row
- Case preview card
- Resource card
- Form block
- FAQ block

Page routes to create later:
- `/` -> home
- `/services` -> 我们做什么
- `/resources` -> 资源
- `/join` -> 加入左安
- `/find-talent` -> 寻找人才

Form targets:
- Enterprise quick demand form.
- Enterprise deep diagnostic form.
- Talent application form.

Initial form behavior:
- Frontend-only acceptable for prototype.
- Capture fields clearly.
- Show success state after submit.
- Do not require real backend unless requested.

## Phase Plan

### Phase 1: Page Markdown Finalization

Goal:
- Finalize the five page docs in `docs/`.
- Each doc should contain page goal, audience, module order, wireframe, CTA targets, form fields, content placeholders, and implementation notes.

Exit criteria:
- Each page doc is specific enough for a coding agent to implement without re-discussing strategy.

### Phase 2: Shared Layout Implementation

Goal:
- Implement IBM/Carbon-style shell.
- Shared header and footer.
- Shared components.
- Design tokens from `docs/DESIGN.md`.

Exit criteria:
- Header, footer, typography, colors, cards, buttons, and forms follow design system.

### Phase 3: Page Implementation

Goal:
- Implement one page per fresh chat if needed.
- Use the finalized page markdown as the task contract.

Exit criteria:
- Page renders.
- CTA links work.
- Forms display and show success state.
- Mobile layout is readable.

### Phase 4: Verification

Goal:
- Run lint/build.
- Open local page.
- Verify layout and no overflow.
- Verify forms and navigation.

Exit criteria:
- Build passes.
- Desktop and mobile checks pass.
- No obvious design-system violations.

## Prompt Template For Future Page Work

Use this structure for every new session.

```markdown
你现在是这个项目的资深前端工程协作者。请按工程化方式完成任务，不要只追求页面看起来能跑。

## Context

项目：Zuoan / 左安门网站 MVP。
阶段：[填写：页面 markdown 定稿 / 页面实现 / 验证修复]
必须先阅读：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `[当前页面 md 路径]`

视觉规范：
- 严格遵循 `docs/DESIGN.md`
- IBM/Carbon 蓝白企业级风格
- 方正组件、细线、无重阴影、无渐变、无文化装饰

## Goal

完成：[填写具体页面或文档任务]

成功标准：
- 页面结构或代码严格对应当前页面 md。
- 共享 Header/Footer 不重复发明。
- CTA 和表单路径清楚。
- 移动端可读。

## Constraints

- 不改无关文件。
- 不新增无关页面。
- 不引入新依赖，除非先说明理由。
- 不编造未确认的企业服务数字或案例。
- 不加入东方装饰、黑金风、AI SaaS 渐变。
- 不做后台、登录、支付、自动匹配系统。

## Interface & Data

输入：
- 当前页面 md。
- `docs/DESIGN.md` design tokens。

输出：
- 更新后的页面 md，或实现后的页面代码。
- 表单字段和 CTA 明确。

状态：
- 表单可先做 frontend-only success state。
- 真实提交后端不在当前范围，除非另行确认。

## Process

1. 先阅读指定文件。
2. 简述本次修改范围。
3. 给出最小实现/写作计划。
4. 修改对应文件。
5. 验证格式、链接、页面路径或构建结果。
6. 总结变更和剩余风险。

## Review

完成条件：
- 当前任务文件完成。
- 未偏离 `docs/DESIGN.md`。
- 未引入无关功能。
- 保留后续页面开发可复用性。

拒绝条件：
- 跳过源文件直接自由发挥。
- 把页面做成营销花活而非结构化企业门户。
- 视觉与 IBM/Carbon 规范冲突。
```

## Page-Specific Prompts

### 1. Home Page Prompt

```markdown
## Context

读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `docs/01-home.md`

当前任务：定稿或实现首页。

首页职责：
- 网站总入口。
- 合并“关于左安”和“为什么选择左安”的首版功能。
- 引导企业提交需求。
- 引导人才申请入席。

## Goal

完成首页结构和内容落地。

首页必须包含：
- 首屏定位。
- 双 CTA：提交需求 / 申请入席。
- 企业痛点。
- 左安如何解决。
- 三类服务预览。
- 为什么选择左安。
- 经验数字或匿名案例占位。
- 资源预览。
- 底部 CTA。

## Constraints

- 不单独做厚 About 页面。
- 不使用未经确认的平台成熟数据。
- 信任表述先用“核心团队经验”或已确认数字。
- 所有视觉遵循 IBM/Carbon。

## Interface & Data

CTA:
- 提交需求 -> `/find-talent`
- 申请入席 -> `/join`
- 查看服务 -> `/services`
- 查看资源 -> `/resources`

## Process

1. 先完善 `docs/01-home.md`。
2. 确认模块顺序和跳转。
3. 如进入实现，使用共享 Header/Footer 和组件。
4. 验证桌面和移动端。

## Review

首页通过标准：
- 5 秒内能理解 Zuoan 是什么。
- 企业和人才都能找到下一步。
- CTA 不隐藏。
- 页面不虚夸平台能力。
```

### 2. Services Page Prompt

```markdown
## Context

读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `docs/02-services.md`

当前任务：定稿或实现“我们做什么”页面。

## Goal

讲清楚 Zuoan 第一版能承接的服务。

页面必须包含：
- 服务总述。
- 按需人才。
- 临时高管。
- 项目制专家团队。
- AI 增长与战略转型。
- 典型场景。
- 合作流程。
- 服务边界。
- 提交需求 CTA。

## Constraints

- 不做无限服务目录。
- 不承诺未确认的 24 小时进场、7x24 服务、全链路合规兜底。
- 服务说明要像企业服务说明，不像宣传口号。

## Interface & Data

服务卡片统一结构：
- 适合什么问题。
- Zuoan 如何介入。
- 企业得到什么。
- 暂不承诺什么。

## Process

1. 先完善 `docs/02-services.md`。
2. 确认三类服务是否保留或改名。
3. 实现时用 card grid + process steps + boundary section。

## Review

通过标准：
- 企业主能判断自己是否适合提交需求。
- 服务边界清楚。
- CTA 指向 `/find-talent`。
```

### 3. Resources Page Prompt

```markdown
## Context

读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `docs/03-resources.md`

当前任务：定稿或实现资源页。

## Goal

建立内容和案例沉淀入口。

页面必须包含：
- 商业资源中心。
- 案例研究。
- 公众号文章入口。
- 闭门会入口。
- 课程 / Program 占位。
- 匿名案例卡片。

## Constraints

- 首版可以是占位内容，但不能空白。
- 不放未授权 logo。
- 不写具体客户名，除非确认可公开。
- 案例先用匿名结构。

## Interface & Data

案例卡片结构：
- 企业类型。
- 当前问题。
- 为什么内部解决不了。
- 需要什么样的人。
- Zuoan 如何介入。
- 可能变化。

## Process

1. 先完善 `docs/03-resources.md`。
2. 确认资源分类和首批占位。
3. 实现时用 resource cards + case preview grid。

## Review

通过标准：
- 资源页能支撑信任。
- 有内容增长空间。
- 不影响 MVP 开发速度。
```

### 4. Join Zuoan Page Prompt

```markdown
## Context

读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `docs/04-join-zoan.md`

当前任务：定稿或实现“加入左安”页面。

## Goal

建立高阶人才申请入口。

页面必须包含：
- 人才端首屏。
- Zuoan 寻找什么样的人。
- 第一批职能清单。
- 入席价值。
- 筛选标准。
- 人才申请表。
- 闭门会 / 内容共创入口。

## Constraints

- 不使用“门徒”作为正式页面称呼。
- 页面像专业邀请入口，不像员工招聘页。
- 不承诺稳定项目收入。
- 不做人才登录。

## Interface & Data

申请表字段：
- 姓名。
- 当前身份。
- 核心职能。
- 代表经历。
- 擅长解决的问题。
- 可投入时间。
- 联系方式。

## Process

1. 先完善 `docs/04-join-zoan.md`。
2. 确认页面命名：加入左安 / 贤才入席。
3. 实现时表单必须可见、可提交、可展示成功状态。

## Review

通过标准：
- 高阶人才知道自己是否适合。
- 申请入口清楚。
- 语气尊重、克制、专业。
```

### 5. Find Talent Page Prompt

```markdown
## Context

读取：
- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `docs/05-find-talent.md`

当前任务：定稿或实现“寻找人才”页面。

## Goal

建立企业端需求提交入口。

页面必须包含：
- 企业端首屏。
- 适合找 Zuoan 的场景。
- 常见需求。
- Zuoan 如何判断企业需要什么人。
- 企业快速需求表。
- 企业深度诊断表。
- 预约诊断 CTA。

## Constraints

- 页面不是猎头招聘表。
- 必须强调先诊断问题，再判断需要什么人。
- 不要求用户一次填完过长表单。
- 不承诺真实后端提交，除非另行确认。

## Interface & Data

快速需求表字段：
- 姓名。
- 公司。
- 职位。
- 联系方式。
- 当前最想解决的问题。
- 期望合作方式。

深度诊断表字段：
- 行业。
- 公司阶段 / 规模。
- 问题描述。
- 已尝试方法。
- 时间要求。
- 预算情况。
- 需要的人才类型。

## Process

1. 先完善 `docs/05-find-talent.md`。
2. 确认轻表单和深表单的展示方式。
3. 实现时表单可先前端成功提示。
4. CTA 从首页和服务页统一指向此页。

## Review

通过标准：
- 企业主能提交需求。
- 表单不吓人。
- 页面能解释 Zuoan 不是普通猎头。
```

## Immediate TODO

1. Finalize `docs/01-home.md`.
2. Finalize `docs/02-services.md`.
3. Finalize `docs/03-resources.md`.
4. Finalize `docs/04-join-zoan.md`.
5. Finalize `docs/05-find-talent.md`.
6. After all page docs are approved, start shared layout implementation.
7. Then implement pages one by one.

## Session Startup Instruction

For a new chat, paste:

```text
请读取根目录 `PROJECT_PROGRESS.md`、`docs/DESIGN.md`，以及本次要处理的页面 md。严格按文件里的阶段、约束和页面提示词执行。不要自由发挥视觉风格，不要跳过页面 md。
```
