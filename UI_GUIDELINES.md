---
version: "2.0"
name: "ZAN"
description: "ZAN (Zuo An Nexus) design system — high-end consulting tone with AI-era accent. Deep navy structural base, emerald-green sole interactive accent, warm-gray content surfaces, generous whitespace, restrained motion."

colors:
  bg: "#0d1d35"
  bg-dark: "#0a1628"
  bg-light: "#f5f7fa"
  bg-white: "#FFFFFF"
  accent: "#10b981"
  accent-hover: "#059669"
  accent-light: "#34d399"
  accent-muted: "rgba(16,185,129,0.15)"
  teal: "#14b8a6"
  teal-hover: "#0d9488"
  text: "#1a2332"
  text-muted: "#5a6779"
  text-light: "#FFFFFF"
  text-muted-light: "rgba(255,255,255,0.65)"
  border: "rgba(100,149,237,0.2)"
  border-light: "#e2e6ed"
  error: "#EF4444"
  success: "#10B981"
  warning: "#F59E0B"

typography:
  family-primary: "\"Alibaba PuHuiTi 2.0\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
  weights: [400, 500, 600, 700]
  body-line-height: "1.7–1.8"
  heading-letter-spacing: "-0.02em ~ -0.01em"
  eyebrow-letter-spacing: "0.2em (tracking-widest)"

spacing:
  container-max: 1200px
  page-padding-mobile: 16-24px
  page-padding-desktop: 24-32px
  section-padding-mobile: 70-90px
  section-padding-desktop: 120-150px

rounded:
  base: 0.25rem  # 4px — 全站基础半径
  pill: 999px    # 仅用于圆形容器（头像、状态点）

breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
---

# UI Guidelines

## Overview

ZAN 是一个面向 B2B 高端人才与咨询撮合的平台，受众是企业 CEO 与高阶顾问。视觉语言需要传达 **深度机构信任感** + **AI 时代的现代感**，避开三种常见陷阱：通用 SaaS 渐变、奢侈品金黑、初创彩色扁平风。

### 视觉关键词

- 深海蓝（主结构色）
- 翡翠绿（唯一交互色）
- 暖灰白（呼吸感）
- 大留白（克制）
- 滚动渐入（GSAP-driven 微动效）
- 液态玻璃顶栏（轻装饰）
- 数字爬升（信任表达）

### 设计风格

- 页面背景在深海蓝（`#0d1d35`）与暖灰（`#f5f7fa`）之间交替形成节奏
- 深色区段使用更深的 `#0a1628`（SERVICES 网格、Footer）
- 白色仅作为内容卡片表面，不做大面积背景
- 翡翠绿是唯一交互色，承担所有 CTA / 链接 / 焦点 / 高亮
- Hero 照片做轻度去饱和（`filter: saturate(~0.8)`）+ 渐变蒙层 + radial 高光
- 不使用任何渐变作为品牌表达（Hero overlay 除外）

### 不属于本设计系统的风格

- IBM Carbon 方块大色块
- 通用 SaaS 紫蓝渐变 hero
- 玻璃拟态 / bokeh / 大幅模糊背景
- 大圆角药丸按钮
- 金黑奢华尊享俱乐部
- 卡通插画 AI 产品风
- 装饰性传统文化纹样（水墨、印章等）

---

## Colors

### Color Tokens（固定值 — 定义在 `src/index.css`）

```css
:root {
  /* Brand accent — emerald family */
  --color-accent:        #10b981;
  --color-accent-hover:  #059669;
  --color-accent-light:  #34d399;
  --color-accent-muted:  rgba(16,185,129,0.15);

  /* Secondary accent — teal */
  --color-teal:          #14b8a6;
  --color-teal-hover:    #0d9488;
  --color-teal-muted:    rgba(20,184,166,0.15);
  --color-emerald:       #34d399;
  --color-emerald-hover: #22c55e;
  --color-emerald-muted: rgba(52,211,153,0.15);

  /* Backgrounds */
  --color-bg:            #0d1d35;
  --color-bg-dark:       #0a1628;
  --color-bg-light:      #f5f7fa;
  --color-bg-white:      #FFFFFF;

  /* Text */
  --color-text:          #1a2332;
  --color-text-light:    #FFFFFF;
  --color-text-muted:    #5a6779;
  --color-text-muted-light: rgba(255,255,255,0.65);

  /* Borders */
  --color-border:        rgba(100,149,237,0.2);
  --color-border-light:  #e2e6ed;

  /* Status */
  --color-error:         #EF4444;
  --color-success:       #10B981;
  --color-warning:       #F59E0B;

  /* shadcn HSL tokens — for form components */
  --background: 216 45% 10%;
  --foreground: 0 0% 100%;
  --primary: 219 79% 66%;
  --primary-foreground: 0 0% 100%;
  --secondary: 216 35% 16%;
  --secondary-foreground: 0 0% 100%;
  --accent: 160 84% 39%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 216 30% 18%;
  --input: 216 30% 18%;
  --ring: 219 79% 66%;
  --radius: 0.25rem;

  /* Fonts */
  --font-main:    "Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-display: "Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

### Color Rules

1. **Emerald is the only interactive accent.** 所有 CTA / 链接 / focus ring / 徽章 / hover 下划线必须使用 `--color-accent`。深色背景上的小字上标可使用 `--color-accent-light`。
2. **Deep navy is structural, not interactive.** Header / Hero / CTA section / Footer 用 `--color-bg`；SERVICES 网格和 Footer 用更深的 `--color-bg-dark`。这些颜色不用于按钮或链接。
3. **Two-tone page rhythm.** 内容区段在 `--color-bg-light`（暖灰）与 `--color-bg-dark`（深底）之间交替，避免连续多段同色。
4. **Pure black / pure white only for nested elements.** 纯白仅用于卡片表面、表单输入背景。纯黑禁止作为背景色。
5. **No gradients for brand expression.** 仅允许 Hero 照片之上的暗化渐变 overlay。
6. **Status colors reserved for system states only.** Error / success / warning 仅用于表单反馈，不作装饰。

### Color Distribution by Page Area

```
┌──────────────────────────────────────────┐
│ Header — 透明 → 白底毛玻璃（滚动渐变）  │
├──────────────────────────────────────────┤
│ Hero — bg + 照片 + 渐变 overlay         │  ← Deep navy with overlays
├──────────────────────────────────────────┤
│ Section A — bg-light, dark text          │  ← Warm gray
├──────────────────────────────────────────┤
│ Section B — bg-dark, light text          │  ← Deepest navy
├──────────────────────────────────────────┤
│ CTA — bg, emerald buttons                │
├──────────────────────────────────────────┤
│ Footer — bg-dark, 5-col grid             │
└──────────────────────────────────────────┘
```

---

## Typography

### Font Stack（固定选型）

```
Family: "Alibaba PuHuiTi 2.0"
Fallback: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif
Weights: 400 / 500 / 600 / 700 (按需加载，启用 font-display: swap)
```

display 与 main 共用同一字族（不引入第二个字族）。**不使用 serif、不使用全大写中文**。英文上标允许大写 + tracking-widest。

### Type Scale

使用 Tailwind responsive utilities + 偶尔 `clamp()` 处理大标题。**字号梯度固定，行高与字重模式固定**：

| 用途 | 字号区间 | 字重 | 行高 |
|------|----------|------|------|
| Hero 主标题（首页） | `clamp(40px, 6vw, 72px)` 或 `text-5xl md:text-6xl lg:text-7xl` | 700 | 1.1 |
| 页面 Hero 标题 | `text-3xl md:text-4xl lg:text-5xl` | 700 | 1.2 |
| Section H2 | `text-2xl md:text-3xl` | 600 | 1.3 |
| 卡片 H3 | `text-base / text-lg` | 500-600 | 1.4 |
| Hero 副标 | `text-base md:text-lg` | 400 | 1.7-1.8 |
| 正文 body | 14-16px | 400 | 1.7-1.8 |
| 上标 eyebrow | 12-13px + `tracking-[0.2em]` | 500 | 1 |
| 数字大字（CountUp） | `text-4xl md:text-5xl` | 700 | 1 |

### Typography Rules

1. **单一字族贯穿全站**：不引入第二个 display 字体
2. **标题用 600-700 字重**：letter-spacing 微负（-0.02em ~ -0.01em）
3. **正文行高 1.7-1.8**：中文长文阅读舒适度，不压缩
4. **英文上标用大写 + tracking-widest**：仅英文小字，中文不用全大写
5. **CountUp 数字保留后缀**：`"48h"` `"500+"` `"95%"` `"80%"` 中的非数字字符在动画结束时保留显示
6. **字体加载性能**：`font-display: swap`；按需加载 400 / 500 / 600 / 700 四个字重

---

## Layout

### Grid System

- **内容容器**：`max-w-[1200px] mx-auto px-6 lg:px-8`
- **阅读宽度**：长文（文章详情）阅读区建议 `max-w-[720px]`
- **基础间距单位**：8px 网格
- **Section 主纵向间距**：移动 ~70-90px / 桌面 ~120-150px（Tailwind 推荐用 `py-20 md:py-28` 或 `py-28 md:py-36`，根据视觉节奏选择）
- **Sub-section 间距**：标题与内容之间约 48-64px（`mb-12 md:mb-16`）

### Responsive Breakpoints（Tailwind v3 默认）

| Breakpoint | Width | 典型布局 |
|-----------|------:|---------|
| Mobile | < 640px | 单列堆叠 |
| sm | 640-767 | 2 列 |
| md | 768-1023 | 2-3 列 |
| lg | ≥ 1024 | 3-4 列 |

### Page Skeleton

```
<div className="min-h-screen" style={{ backgroundColor: '#0d1d35' }}>
  <Navigation />        ← Sticky 液态玻璃
  <main>
    <section>Hero — bg + 照片 + 渐变</section>
    <section>交替 bg-light / bg-dark ...</section>
    <section>Dual CTA — bg</section>
  </main>
  <Footer />            ← bg-dark
</div>
```

### Card Grid Layout

| 组件 | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Service 卡片 | 3 列 | 2 列 | 1 列 |
| Article 卡片 | 3 列 | 2 列 | 1 列 |
| Industry 标签 | 4 列 | 2 列 | 2 列 |
| Process 步骤 | 横向流 | 2x2 网格 | 单列堆叠 |

---

## Elevation & Depth

| 层级 | 背景 | 边框 | 阴影 |
|-------|-----------|--------|--------|
| 页面背景 | `--color-bg` | — | — |
| 浅色 section | `--color-bg-light` | — | — |
| 深色 section | `--color-bg-dark` | — | — |
| 卡片（亮底） | `--color-bg-white` | 1px `--color-border-light` | 默认无 |
| 卡片（深底） | 透明 | 1px `rgba(16,185,129,0.15)` | 无 |
| 图片容器 | — | — | `shadow-lg`（轻阴影，可选） |
| Header（滚动后） | `rgba(255,255,255,~0.96)` | 1px `rgba(226,230,237,~1)` | `0 1px 3px rgba(0,0,0,~0.04)` |

### 深度规则

1. **卡片默认无阴影**，仅通过 1px 细边定义。hover 时图像内部 scale + brightness 提示，不加外阴影
2. **Header 滚动时浮现毛玻璃**：`backdrop-filter: blur(~12px)` + 半透明白底；过渡阈值在 hero 区域内完成
3. **禁止**：glassmorphism、bokeh、heavy drop shadow、glow 效果

---

## Shapes（圆角策略）

整体几何**偏方正**，仅在必要处用基础半径软化。**没有大圆角，没有药丸按钮**（除了头像、状态点等明确圆形元素）。

| Token | Value | Usage |
|-------|------:|-------|
| `rounded-none` | 0 | 按钮、表单输入、卡片等大部分元素 |
| `rounded` / `rounded-sm` | 2-4px | 卡片、图片容器（如需软化） |
| `rounded-full` | 999px | 头像、图标圆形容器、状态点 |

### 形状规则

1. **按钮无圆角或基础半径**：方块感是高端机构调性的一部分
2. **卡片用基础半径或方角**：不超过 4px
3. **图标可放在圆形容器内**：`rounded-full` + `bg-accent-muted`
4. **禁止使用 rounded-lg 以上的圆角**（rounded-xl、rounded-2xl 等）

---

## Components

### Button

**Primary（实色块）：**
- 背景：`--color-accent`
- 文字：白色
- 高度区间：~40-48px
- 内边距：横向 `px-6 ~ px-10`（按上下文）
- 圆角：方角或基础半径
- Hover：opacity 略降（~0.85-0.95）+ scale 略放大（~1.02）
- 过渡时长：150-200ms

**Outline（深底）：**
- 背景：透明
- 文字：白色
- 边框：`1px solid rgba(255,255,255,0.3)`
- Hover：背景渐变到 `rgba(16,185,129,0.1)`

**Outline（浅底，accent 色）：**
- 背景：透明
- 文字：`--color-accent-light`
- 边框：`1px solid rgba(16,185,129,0.4)`
- Hover：背景变为 `--color-accent`、文字变白

**实现：** 营销页面的 CTA 用裸 `<Link>` + Tailwind class + inline style 实现，不用 shadcn `<Button>`。shadcn `<Button>` 保留给表单提交按钮。

### Card

**亮底卡片：**
```jsx
<div className="p-8 bg-white" style={{ border: '1px solid #e2e6ed' }}>
  ...
</div>
```

**深底卡片（在 `--color-bg-dark` 之上）：**
```jsx
<div className="p-8" style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
  <div className="text-xs tracking-widest mb-4" style={{ color: '#34d399' }}>01</div>
  <h3 className="text-base font-medium mb-3 text-white">...</h3>
  <p className="text-sm leading-relaxed" style={{ color: 'rgba(160,190,245,0.6)' }}>...</p>
</div>
```

营销页面卡片**不使用** shadcn `<Card>`，直接用 div + Tailwind + inline style 实现，与视觉调性匹配。

### Eyebrow（上标小字）

```jsx
<span className="text-xs tracking-[0.2em] font-medium" style={{ color: '#10b981' }}>
  WHY ZAN
</span>
```

- 12-13px 字号
- 大写英文 + tracking-widest
- 颜色：浅底用 `--color-accent`，深底用 `--color-accent-light`
- 位置：标题上方，作为 section 引导符

### Input / Form Field

通过 globals.css 中的 `.form-input` 类应用：

```css
.form-input {
  background-color: #FFFFFF;
  border: 1px solid #e2e6ed;
  color: #1a2332;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.form-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
}
.form-input::placeholder {
  color: #a0aec0;
}
```

- 高度：~44-48px
- 内边距：`px-4 py-3`
- 焦点：边框变 emerald + 3px ring

**Textarea**：min-height 100-140px，顶部对齐文字。

### Navigation（液态玻璃 Header）

**布局：**
- Fixed top，`z-50`，高度约 64px
- 内容容器宽度对齐 `max-w-[1200px]`
- 左侧 Logo：`ZAN · 左安`（ZAN 用 emerald + tracking-widest，"·" 用淡蓝，"左安" 跟随当前文字色）
- 中部 4 个导航链接
- 右侧 1 个 emerald CTA "招贤纳士"

**滚动行为：**
- 首页（`/`）：进入时透明，滚动数十像素内过渡到白底毛玻璃
- 其他页：始终白底毛玻璃
- 过渡时长 ~300ms

**移动端：**
- 汉堡按钮（3 横线 / X 切换）
- 点击展开白色面板（不全屏覆盖）

### Footer

5 列网格（移动端折叠为 2 列）：

| 列 | 标题 | 内容 |
|---|------|------|
| 1 | 关于 | 关于左安 + 占位项 |
| 2 | 服务 | 按需人才 / 临时高管 / 项目制专家 → `/services` |
| 3 | 资源 | 行业案例 / 资源智库 → `/resources` |
| 4 | 联系 | 招贤纳士 / 人才入席 / 商务邮箱 |
| 5 | 关注我们 | 公众号二维码占位 |

底部版权条：`© <year> 左安 ZAN. 保留所有权利。` + 隐私政策 / 服务条款 / 信息安全 链接。

### Section Heading 标准模式

```
┌──────────────────────────────────────┐
│   eyebrow keyword（大写英文 + 绿）   │
│   主标题（H2，display 字体，加粗）    │
│   可选副标描述（次要色，body 字号）   │
└──────────────────────────────────────┘
```

### CountUp

接收 `end: string`（如 `"48h"`、`"500+"`、`"95%"`、`"80%"`），从 0 爬升到目标数字，保留后缀字符。爬升时长约 1-2 秒。

### FormAlert

表单提交结果浮层。接收 `{ message: string, type: 'success' | 'error' }` + 可选 `onClose` 回调。出现位置建议右下角或表单顶部，过渡时长 200-300ms。

### AnimatedSection（页内通用 wrapper）

在每个 page 文件顶部**内联定义**（不抽到 components/）。职责：监听元素进入视口，触发一次 GSAP 入场动画。

实现要点：
- 用 `useRef` 抓住元素
- `useEffect` 内挂 GSAP `ScrollTrigger`
- 入场动画：opacity 0→1 + y 偏移 ~30px → 0
- 时长 500-800ms，缓动 power-out / ease-out 系列
- 触发点：元素进入视口 ~80-90% 时
- cleanup：unmount 时杀掉自己创建的 ScrollTrigger（避免内存泄漏）

```tsx
function AnimatedSection({ children, className = '', style = {} }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anim = gsap.fromTo(el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
    );
    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); });
    };
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
```

上述数值是推荐默认（duration 0.7s / start 'top 88%' 等），可在 500-800ms / 80-90% 区间内根据视觉节奏微调。

---

## Animation

### 允许的动效库

| 库 | 允许 | 用途 |
|---------|---------|-----|
| GSAP + ScrollTrigger | ✅ | 所有滚动触发动画、CountUp |
| CSS @keyframes | ✅ | Hero 进场、shimmer 等装饰动效 |
| Tailwind transition utilities | ✅ | Hover 微交互 |
| framer-motion | ❌ | GSAP 已覆盖需求 |
| Lottie | ❌ | 不引入 |

### 动效原则

1. **统一用 GSAP 处理滚动触发**：不直接用 IntersectionObserver
2. **每个 ScrollTrigger 必须可清理**：组件 unmount 时 kill 掉，避免泄漏
3. **进场动画约束**：opacity 淡入 + 垂直位移 ~30px；时长 500-800ms；缓动 power-out / ease-out 系列；触发点元素进入视口 80-90% 时
4. **Hero 分级延迟**：主标 → 装饰线 → 副标 → CTA，每级间隔 200-300ms
5. **Hover 限制**：仅允许 scale（≤1.05）+ opacity / brightness 调整；禁止旋转、弹跳、3D 翻转
6. **过渡时长上限**：单次微交互不超过 ~500ms
7. **可访问性**：`prefers-reduced-motion: reduce` 时禁用所有 transition / animation（globals.css 已处理）

### Hero 进场（CSS keyframes）

定义在 globals.css 的 `@keyframes heroFadeUp` / `heroScaleX`，分级延迟应用到主标 / 装饰线 / 副标 / CTA。具体延迟序列在 500-1000ms 范围内分布，确保观感是"从上到下逐次出现"。

### Hover 模式速查

| 元素 | 效果 |
|---------|--------|
| 卡片内图片 | parent hover 时图片 scale ~1.02 + brightness 略提升 |
| Primary 按钮 | opacity 略降 + scale 略放大 |
| Outline 按钮 | 背景变浅色 emerald 或反转为实色 |
| Nav 链接 | 下划线从 0 宽度生长到全宽 |
| 筛选 pill（Resources） | 选中态背景 / 文字 / 边框切换为 accent |

---

## Iconography

- **库**：`@phosphor-icons/react`
- **风格**：推荐 `weight="duotone"`，特殊场景可用 `weight="regular"`
- **尺寸**：默认 20-24px
- **颜色**：通过 `color` prop 或父级 CSS `color` 继承；常用 `--color-accent` / `--color-text-muted` / 白色
- **场景示例**：
  - 价值卡片：`ShieldCheck`、`Headset`、`LockKey`
  - 行业网格：`Globe`、`CurrencyDollar`、`Gear`、`ShoppingCart`、`Heart`、`Buildings`、`Lightning`、`FilmStrip`
  - 顾问素养：`UsersThree`、`Lightning`、`CheckCircle`、`ChartLineUp`、`Books`、`Handshake`
  - 服务流程：`ClipboardText`、`UserFocus`、`Users`、`Handshake`

**不引入 lucide-react** 或其他图标库。

---

## Image Guidelines

### 摄影风格

- 真实专业摄影，避免握手/会议室刻意摆拍的 stock 风格
- 轻度去饱和：`filter: saturate(~0.8 ~ 0.85)`
- Hero 照片透明度 ~45-50%，叠加深蓝渐变 overlay
- 自托管所有图片，禁用外部 CDN URL

### 技术规则

- 格式：JPG 或 WebP（未来可升级 WebP fallback JPG）
- 路径：`/images/<name>.<ext>` 对应 `public/images/<name>.<ext>`
- 允许一级子目录（如 `public/images/candidates/`）
- 单张图片大小：尽量压缩到 500KB 以内（Hero 大图允许放宽）
- Lazy loading：折叠以下图片用 `loading="lazy"`；Hero 用 `fetchpriority="high"`

---

## Form Design

### 布局

- 单列布局（移动端 + 桌面均单列）
- 字段顺序：`label → input/textarea/select → 错误提示（红色小字）`
- 提交按钮：移动端 full-width，桌面端 `px-10` 块按钮
- 当前不收集 PIPL consent 字段（如未来合规审查要求，需引入 checkbox + Zod literal + DB consent 字段）

### 验证

- 客户端用 React Hook Form + Zod resolver
- 服务端用同一份 Zod schema 再验证
- 验证时机：blur 时校验，不在 keystroke 触发
- 成功：替换表单为 FormAlert 成功态
- 失败：FormAlert 错误浮层提示

### 表单字段规格

**`/join`（顾问申请）：**

| 字段 | 类型 | 必填 |
|-------|------|----------|
| name | text | ✅ |
| email | email | ✅ |
| phone | tel | ❌ |
| role | text（核心领域） | ❌ |
| bio | textarea（个人简介） | ✅ |

**`/find-talent`（企业表单）：**

| 字段 | 类型 | 必填 |
|-------|------|----------|
| name | text | ✅ |
| company | text | ❌ |
| email | email | ✅ |
| phone | tel | ❌ |
| role | text（岗位类型） | ❌ |
| stage | select（企业阶段） | ❌ |
| challenge | textarea（核心挑战） | ✅ |
| timeline | text（期望时间） | ❌ |

---

## Do's and Don'ts

### Do

- 用 emerald (`--color-accent`) 承载所有交互元素
- 用深海蓝作为结构骨架（Header / Hero / CTA / Footer）
- 用浅灰 / 深底交替形成内容节奏
- 用 `max-w-[1200px] mx-auto px-6 lg:px-8` 包裹内容
- 用 GSAP `AnimatedSection` 做 section 进场，每页内联定义
- 用 Phosphor `weight="duotone"` 图标
- 用裸 `<Link>` + Tailwind + inline style 实现营销页 CTA
- 保留 inline style 与 className 混用的写法（设计令牌的硬色值在内联中清晰可见）

### Don't

- 不引入 lucide 或其他图标库
- 不引入 framer-motion
- 不使用 4px 以上圆角（除头像/状态点）
- 不使用纯黑 / 纯白作为背景
- 不引入第二种交互色
- 不在营销页面使用 shadcn `<Card>` / `<Badge>`（用手写 div）
- 不把 `AnimatedSection` 抽到 components/（每页内联保持页面自洽）
- 不使用 serif / 全大写中文
- 不使用旋转 / 弹跳 / 3D flip / glassmorphism / bokeh
- 不使用超过 500ms 的微交互

---

## Implementation Notes

### Tailwind v3 Config

`tailwind.config.js` 通过 `hsl(var(--xxx))` 引用 CSS 变量，启用 `tailwindcss-animate` plugin。完整配置见仓库根目录。

### globals.css 内容

- `@tailwind base / components / utilities`
- `:root` 中的所有 CSS 变量定义
- `.form-input` 类
- `.rich-text-content` 文章富文本样式
- `@keyframes heroFadeUp / heroScaleX / shimmer`
- `prefers-reduced-motion` 全局禁用动画的 media query

---

## 变更记录

| 日期 | 变更 | 原因 |
|------|------|------|
| 2026-05-18 | v2.0 基线确立 | MVP 完成，作为后续迭代基准 |

---

> **本文档随设计令牌或组件契约的变更同步更新。每次品牌色 / 字体 / 组件选型 / 动效契约调整，必须在此文档先行更新，然后才允许代码实现。**
