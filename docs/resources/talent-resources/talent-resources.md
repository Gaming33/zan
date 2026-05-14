# 人才资源

> 状态：已定稿，供 coding agent 实现人才资源页高保真原型使用。
> 当前任务范围：只实现 `resources` 下的人才资源子页，不改其他页面 md，不创建 CMS、登录、真实文章系统或真实申请表单后端。

## 1. Coding Agent 角色

你是这个项目的资深前端工程协作者，负责把 `docs/resources/talent-resources/talent-resources.md` 转化为人才资源页高保真原型。

你的目标不是自由发挥一个新内容中心，而是严格根据本文件、`docs/DESIGN.md` 和 `PROJECT_PROGRESS.md` 实现左安门官网的人才资源页。

实现前必须读取：

- `PROJECT_PROGRESS.md`
- `docs/DESIGN.md`
- `docs/resources/talent-resources/talent-resources.md`
- `docs/resources/index.md`

如果当前环境有以下 skill，可以调用，但不能覆盖 `docs/DESIGN.md`：

- `frontend-design`：用于提升页面视觉质量、信息层级和高保真还原。
- `impeccable`：用于审视和打磨前端界面设计感、视觉层级、卡片节奏、排版细节和交互质量。它是设计质量参考，不是阻塞性流程。
- `web-design-guidelines`：用于检查可用性、响应式和企业级页面结构。
- `webapp-testing` 或 browser 工具：用于本地预览、截图和交互验证。

必须遵守：

- `docs/DESIGN.md` 是视觉系统唯一来源。
- 本页参考 BTG Talent Resources 的内容编排：标题说明、精选资源、连续 blog card 流、穿插申请加入卡片。
- 不照搬 BTG 的品牌、英文文案、图片资产、分类命名或资源标题。
- 不把页面做成人才工作台、招聘页、课程页、复杂资源中心首页或企业服务页。
- 不增加未经确认的功能模块，例如 More Blog Cards、推荐算法、真实搜索、真实筛选后端、社交分享系统。
- 不使用东方装饰、黑金风、渐变 SaaS 风、玻璃拟态、圆角 pill-heavy UI。
- 页面重点是 desktop web 的视觉效果、卡片编排和内容浏览节奏。

## 1.1 参考文件使用方式

Coding agent 不只是“读取文件”，而是要按下面的方式使用文件：

| 文件 / 资源 | 使用方式 |
|---|---|
| `docs/DESIGN.md` | 视觉系统唯一来源。颜色、字体、间距、按钮、卡片、导航、footer 都必须服从它。 |
| `PROJECT_PROGRESS.md` | 理解项目阶段、业务边界、导航命名、不要编造数字和不要做后台系统等全局约束。 |
| `PARALLEL_PAGE_WORKFLOW.md` | 理解 harness、工作区边界、并行开发规则和本页开发范围。 |
| `docs/resources/index.md` | 理解资源栏目层级、当前子页路径和 `/resources`、`/resources/case-studies` 的关系。 |
| `docs/resources/talent-resources/talent-resources.md` | 本页内容、模块顺序、CTA、交互和高保真布局的页面级来源。 |
| `https://resources.businesstalentgroup.com/talent-resources` | 只作为内容编排参考。学习其简洁标题、精选资源、blog card 流和穿插 CTA，不复制品牌、英文文案、图片或分类。 |
| `fronted/resources/talent-resources/` | 人才资源页主体实现位置。页面级 HTML、CSS、JS、本页专属图片占位和本页专属交互都放这里。 |
| `fronted/shared/` | 只可作为已有全站壳层的视觉参考或引用对象。本页开发不得修改 shared 文件。 |

使用 skill 时的方向：

- 用 `frontend-design` 和 `impeccable` 判断页面是否像真实企业官网中的内容页，而不是普通博客模板。
- 用它们检查 desktop 视觉节奏、图片比例、卡片网格、CTA 卡穿插位置、hover/focus 状态。
- 不要照搬 skill 内部风格规则覆盖 IBM/Carbon 方向。
- 不要因为 skill 的完整流程要求而中断当前 harness 开发。

## 1.2 技术与 Harness 约束

人才资源页技术框架选用 HTML + CSS，交互使用 JavaScript。

实现要求：

- 页面文件夹：`fronted/resources/talent-resources/`
- 只允许在 `fronted/resources/talent-resources/` 工作区内实现本页。
- 路由建议：`/resources/talent-resources`
- Header、Footer 如需出现，只能在 `fronted/resources/talent-resources/` 内做本页静态还原或引用既有样式，不要修改 shared 文件。
- 本页所有 HTML、CSS、JS、图片占位和专属交互都必须放在 `fronted/resources/talent-resources/`。
- 不允许更改 `fronted/resources/talent-resources/` 工作区之外的任何文件。
- 不允许修改 `fronted/shared/`，即使发现 Header/Footer 可以抽象，也不要在本次任务中处理。
- 不改 `fronted/home/`、`fronted/services/`、`fronted/resources/case-studies/`、`fronted/join/`、`fronted/find-talent/`。
- 不改其他页面 md。
- 不接入真实 CMS、文章数据库、登录、申请表单后端或搜索后端。
- JavaScript 只用于轻量交互：
  - Header 导航跳转。
  - CTA 跳转。
  - 卡片 hover/focus 状态。
  - 主题 chip 的前端视觉切换或静态过滤演示。
  - 移动端导航展开/收起。

开发需遵循项目已有 harness 规范：

- 先读 `PROJECT_PROGRESS.md`、`docs/DESIGN.md`、当前页面 md。
- 只开发当前页面。
- 验证本地页面能打开、跳转能触发、desktop 布局没有明显溢出或错位。
- 不保留临时截图、测试资产或无关文件。

## 2. 页面定位

人才资源页是左安门资源栏目下的人才侧内容页。

用户进入页面后 5 秒内应该理解：

- 这里是给高阶人才看的资源内容，不是企业服务页。
- 左安门关注的是项目制协作、入席准备、真实企业问题和人才长期进化。
- 用户可以先浏览内容，再通过页面中的申请加入卡进入 `/join`。

本页核心表达：

> 给高阶人才的项目制协作资源、入席准备与案例观察。

本页不应该表达成：

- 企业服务销售页
- 普通招聘页
- 自由职业教程站
- 复杂知识库工作台
- 带后台能力的真实内容管理系统

更准确的表达是：

> 左安门为有真实业务经验、专业判断力和项目交付能力的人才，提供进入项目制协作前后的内容参考，并邀请合适的人才加入左安门网络。

## 3. 用户路径

### 高阶人才主路径

高阶人才是本页主要用户。

路径：

1. 进入 `/resources/talent-resources`。
2. 看到简洁标题和人才侧说明。
3. 浏览精选文章和 blog card 流。
4. 在内容流中看到 `加入左安门的人才进化` 申请卡。
5. 点击进入 `/join`。

### 内容读者路径

内容读者可能暂时不申请，只想了解左安门如何理解人才和项目制协作。

路径：

1. 浏览精选资源。
2. 继续阅读普通 blog card。
3. 点击某个资源卡进入静态文章占位或保留卡片阅读动作。
4. 通过 Header 或资源入口回到 `/resources`。

### 案例兴趣路径

部分人才会先想看真实企业场景。

路径：

1. 从 Hero 次级 CTA 点击 `浏览案例研究`。
2. 跳转到 `/resources/case-studies`。
3. 通过案例理解左安门如何组织人才进入真实企业问题。

## 4. 页面信息架构

页面采用 BTG-like talent resources 内容编排：首屏简洁，主体是连续 blog card 流，唯一特殊内容是穿插的申请加入卡片。

高保真优先级：

1. Hero 必须简洁清楚：标题、说明、两个 CTA，不做复杂营销叙事。
2. Featured Blog Card 必须成为首个视觉重点：横向大卡、图片和正文分栏。
3. Blog Card Grid 必须像真实内容页：统一图片比例、统一卡片高度、清楚标题和摘要。
4. Apply Card 必须自然嵌入卡片流：形态接近普通卡，但视觉上能识别为申请入口。
5. Footer 和 Header 必须像完整网站壳层，而不是临时占位。

容易干扰高保真的点，开发时要主动避免：

- 不要添加 More Blog Cards、Recommended Reading、复杂资源中心、人才旅程图或工作台模块。
- 不要把页面做成大段说明文档。页面主体应该由 blog cards 承担。
- 不要在卡片元信息里出现 `3 months ago` 这类相对时间。卡片只保留类型和主题标签。
- 不要每张卡片放社交分享按钮。
- 不要把申请卡做成大横幅。它应该是 blog card 流中的一张特殊卡。
- 不要让 BTG 参考覆盖左安门视觉系统。BTG 参考的是卡片编排和内容节奏，不是颜色、字体或文案。

模块顺序：

1. Global Header
2. Talent Resources Hero
3. Featured Blog Card
4. Topic Filter Row
5. Blog Card Grid With Apply Card
6. Footer

## 5. 高保真布局说明

### 5.1 Global Header Component

归属：

- Header 是全站通用界面壳层，但本次不得修改 `fronted/shared/`。
- 本页如果需要 Header 静态还原，只能在 `fronted/resources/talent-resources/` 内完成。
- 如果项目已有 shared Header，可以参考其视觉和结构，但不要编辑 shared 文件。

导航：

- 首页 -> `/`
- 我们做什么 -> `/services`
- 资源 -> `/resources/case-studies` 或 `/resources`
- 加入左安 -> `/join`
- 寻找人才 -> `/find-talent`

右侧 CTA：

- `申请入席`：Secondary Button，跳转 `/join`
- `提交需求`：Primary Button，跳转 `/find-talent`

设计：

- 使用 `docs/DESIGN.md` 的 IBM/Carbon 风格。
- 白底、细底边框、方形按钮。
- 不使用大圆角、阴影或渐变。
- Desktop 使用横向导航。

### 5.2 Talent Resources Hero Component

目标：让人才用户一眼知道这是人才侧资源内容页，并能进入申请或案例浏览。

内容：

- Eyebrow：`资源 / 人才资源`
- H1：`给高阶人才的项目制协作资源`
- 正文：`围绕入席准备、项目交付、专家表达和内容共创，整理适合高阶人才阅读的实践资源。`

CTA：

- Primary：`申请加入人才网络` -> `/join`
- Secondary：`浏览案例研究` -> `/resources/case-studies`

布局：

- Desktop 使用宽版文本区，保持留白。
- 不做复杂图文分栏，不做大插画。
- Hero 下方直接进入精选资源卡。

视觉：

- 白底或极浅蓝底。
- H1 使用清晰的企业级大标题。
- CTA 与首页按钮体系一致。

### 5.3 Featured Blog Card Component

目标：模拟 BTG 首篇资源的视觉权重，用一个大卡展示最重要的人才资源。

内容建议：

- 类型标签：`文章 · 入席准备`
- 标题：`人才入席前的准备：从经验到可交付角色`
- 摘要：`帮助高阶人才把过往经验、项目判断和行业语境，整理成企业能够理解和判断的协作能力。`
- CTA：`Read Post`

布局：

- Desktop 使用横向大卡。
- 左侧为图片或高质量抽象图像面板，占卡片宽度约 38%-42%。
- 右侧为类型标签、标题、摘要和阅读动作。
- 图片比例稳定，不能因为内容多少导致卡片跳动。

设计：

- 细边框、白底、方正结构。
- hover 时边框或标题颜色轻微变化。
- 不显示 `Blog · 3 months ago` 或类似时间信息。

### 5.4 Topic Filter Row Component

目标：提供轻量浏览线索，但不做复杂内容系统。

选项：

- `全部`
- `入席准备`
- `项目交付`
- `专家表达`
- `内容共创`

交互：

- 可以做静态 chip，也可以做前端视觉筛选演示。
- 不接入后端。
- Desktop 上横向排列，位于 Featured Blog Card 和 Blog Card Grid 之间。

设计：

- 使用 IBM/Carbon 风格的轻量按钮或 segmented control。
- 不使用圆角 pill-heavy 风格。

### 5.5 Blog Card Grid With Apply Card Component

目标：成为页面主体。卡片编排参考 BTG：连续、清晰、稳定的 blog card 流。

Grid 规则：

- Desktop 推荐 3 列网格。
- 每张普通卡片结构一致：
  - 图片
  - 类型标签
  - 标题
  - 摘要
  - `Read Post`
- 卡片高度尽量统一。
- 图片比例统一，建议 16:9 或接近 BTG 的横图比例。

普通 blog card 内容占位：

1. `如何整理一份项目制人才资料`
   - 类型标签：`文章 · 入席准备`
   - 摘要：`从角色经历、项目片段和可交付成果三个维度，整理一份更容易被企业判断的人才资料。`

2. `进入陌生组织的前两周`
   - 类型标签：`文章 · 项目交付`
   - 摘要：`阶段性人才如何快速理解组织语境、建立信任，并把判断转化成可执行的工作节奏。`

3. `如何把行业经验讲成企业能判断的能力`
   - 类型标签：`文章 · 专家表达`
   - 摘要：`把经验从职位描述转化为问题识别、路径判断和关键场景中的行动能力。`

4. `阶段性角色如何建立信任`
   - 类型标签：`文章 · 项目交付`
   - 摘要：`在有限周期内建立合作信任，关键不在于包装履历，而在于进入问题现场后的判断质量。`

5. `AI 转型项目中常见的人才缺口`
   - 类型标签：`文章 · 行业观察`
   - 摘要：`从业务理解、数据协作、流程改造和组织推动几个角度，观察企业项目中的真实人才缺口。`

6. `从案例复盘到内容共创`
   - 类型标签：`文章 · 内容共创`
   - 摘要：`左安门欢迎有真实项目经验的人才，一起沉淀行业观察、案例复盘和方法论内容。`

7. `什么样的专家适合项目制协作`
   - 类型标签：`文章 · 入席准备`
   - 摘要：`项目制协作需要的不只是资历，还包括问题判断、组织沟通和阶段性交付的稳定性。`

8. `长期人才关系如何形成`
   - 类型标签：`文章 · 人才网络`
   - 摘要：`左安门更看重长期可信的合作关系，而不是一次性的简历投递和短期撮合。`

Apply Card：

- 标题：`加入左安门的人才进化`
- 正文：`如果你有真实业务经验、专业判断力和项目交付能力，可以提交资料，进入左安门人才网络的初步了解。`
- CTA：`申请加入` -> `/join`

Apply Card 位置：

- 放在普通 blog card 流中间。
- 推荐位置：第二行中间，即第 5 张卡附近。
- 不单独做大横幅，不破坏 BTG-like 卡片流。

Apply Card 视觉：

- 形态接近普通 blog card。
- 可以使用浅蓝底、深蓝标题和更明确的 CTA。
- 不使用夸张渐变、插画或营销大字报。

### 5.6 Footer Component

归属：

- Footer 是全站通用界面壳层，但本次不得修改 `fronted/shared/`。
- 本页如果需要 Footer 静态还原，只能在 `fronted/resources/talent-resources/` 内完成。

设计：

- 延续 `docs/DESIGN.md`。
- 包含基础导航、资源入口和人才入口。
- 不为本页新增复杂 footer 内容。

## 6. 点击跳转

本页跳转必须清楚、可验证：

| 位置 | 文案 | 路径 |
|---|---|---|
| Hero Primary CTA | `申请加入人才网络` | `/join` |
| Hero Secondary CTA | `浏览案例研究` | `/resources/case-studies` |
| Apply Card CTA | `申请加入` | `/join` |
| Header 资源 | `资源` | `/resources/case-studies` 或 `/resources` |
| Header 加入左安 | `加入左安` | `/join` |
| Header 寻找人才 | `寻找人才` | `/find-talent` |

普通 blog card 的 `Read Post`：

- 首版可以使用 `#` 或静态占位链接。
- 如果项目已有文章页路径规范，可跳转到 `/resources/article-pages`。
- 不创建真实文章系统。

## 7. 视觉与组件要求

整体视觉：

- IBM/Carbon 蓝白企业风格。
- 白底、浅蓝分区、细线边框、清晰排版。
- 页面应该像真实企业内容页，不像临时 markdown 页面。

卡片要求：

- Blog cards 是页面主体。
- 普通 blog card 必须统一规格。
- 图片区域必须有稳定比例。
- 标题长度不同不能导致卡片视觉明显错位。
- 卡片 hover/focus 应有轻微状态变化。
- 不使用厚重阴影。
- 圆角不超过 `docs/DESIGN.md` 既有规范。

图片要求：

- 不使用 BTG 图片资产。
- 可以使用高质量抽象 business/resource image placeholder。
- 图片应偏企业、知识、项目协作、专业人士语境。
- 没有真实图片时，也要做成有设计感的 image panel，不要空白灰框。

Desktop 优先：

- 重点验证 desktop web 的视觉效果。
- Desktop 主体宽度、网格间距、卡片比例必须稳定。
- Mobile 只需保证不破版，不作为本页讨论和实现的视觉重点。

## 8. 文案语气

语气：

- 克制、专业、清晰。
- 面向高阶人才，而不是面向求职者。
- 避免鸡血、招聘口号和自由职业教程语气。

可以使用的语境：

- `项目制协作`
- `入席准备`
- `真实企业问题`
- `专业判断力`
- `项目交付能力`
- `内容共创`
- `人才网络`
- `长期可信的合作关系`

避免使用：

- `自由职业变现`
- `接单`
- `躺赚`
- `高薪机会`
- `人才池`
- `海量岗位`
- `马上入职`

## 9. 线框图

Desktop 结构：

```text
/resources/talent-resources

┌────────────────────────────────────────────────────────────────────┐
│ Global Header                                                       │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ 资源 / 人才资源                                                     │
│ 给高阶人才的项目制协作资源                                          │
│ 围绕入席准备、项目交付、专家表达和内容共创，整理适合高阶人才阅读... │
│ [申请加入人才网络]  [浏览案例研究]                                  │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ Featured Blog Card                                                 │
│ ┌──────────────────────────┬─────────────────────────────────────┐ │
│ │ image panel              │ 文章 · 入席准备                    │ │
│ │                          │ 人才入席前的准备：从经验到可交付角色 │ │
│ │                          │ 摘要两到三行                        │ │
│ │                          │ Read Post →                         │ │
│ └──────────────────────────┴─────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ [全部] [入席准备] [项目交付] [专家表达] [内容共创]                  │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│ Blog Card          │ │ Blog Card          │ │ Blog Card          │
│ image              │ │ image              │ │ image              │
│ 文章 · 入席准备    │ │ 文章 · 项目交付    │ │ 文章 · 专家表达    │
│ title              │ │ title              │ │ title              │
│ desc               │ │ desc               │ │ desc               │
│ Read Post →        │ │ Read Post →        │ │ Read Post →        │
└────────────────────┘ └────────────────────┘ └────────────────────┘

┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│ Blog Card          │ │ Apply Card         │ │ Blog Card          │
│ image              │ │ 加入左安门的人才进化 │ │ image              │
│ 文章 · 项目交付    │ │ 说明文字            │ │ 文章 · 行业观察    │
│ title              │ │ [申请加入] → /join  │ │ title              │
│ desc               │ │                    │ │ desc               │
│ Read Post →        │ │                    │ │ Read Post →        │
└────────────────────┘ └────────────────────┘ └────────────────────┘

┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│ Blog Card          │ │ Blog Card          │ │ Blog Card          │
│ image              │ │ image              │ │ image              │
│ 文章 · 内容共创    │ │ 文章 · 入席准备    │ │ 文章 · 人才网络    │
│ title              │ │ title              │ │ title              │
│ desc               │ │ desc               │ │ desc               │
│ Read Post →        │ │ Read Post →        │ │ Read Post →        │
└────────────────────┘ └────────────────────┘ └────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ Global Footer                                                       │
└────────────────────────────────────────────────────────────────────┘
```

## 10. 完成标准

页面完成后必须满足：

- 页面一眼能看出是人才侧资源页，不是企业服务页。
- 页面编排接近 BTG Talent Resources：简洁标题、精选资源、连续 blog card 流、穿插申请加入卡。
- 不出现 `Blog · 3 months ago` 或其他相对时间元信息。
- 申请加入卡标题为 `加入左安门的人才进化`。
- 普通 blog card 和申请卡在同一个卡片流中，申请卡不变成独立大模块。
- 不新增 More Blog Cards、Recommended Reading、复杂搜索、真实 CMS 或社交分享功能。
- `/join`、`/resources/case-studies`、`/resources` 或资源导航路径明确。
- 视觉符合 `docs/DESIGN.md` 的 IBM/Carbon 蓝白企业风格。
- Desktop web 视觉稳定，卡片网格、图片比例、间距和 hover/focus 状态清楚。
- 不修改本文件之外的任何 docs 或前端文件。
