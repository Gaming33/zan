---
version: alpha
name: "Zuoan"
description: "Enterprise marketing design system for the Zuoan website, based on IBM Carbon-style blue-white surfaces, square geometry, thin borders, and clear conversion paths."

colors:
  primary: "#0f62fe"
  secondary: "#0043ce"
  tertiary: "#002d9c"
  neutral: "#161616"
  surface: "#ffffff"
  surface-muted: "#f4f4f4"
  border: "#e0e0e0"
  text-primary: "#161616"
  text-secondary: "#525252"
  accent: "#0f62fe"
  error: "#da1e28"
  success: "#24a148"
  warning: "#f1c21b"
  inverse-surface: "#161616"
  inverse-text: "#ffffff"

typography:
  headline-display:
    fontFamily: "IBM Plex Sans"
    fontSize: 64px
    fontWeight: 300
    lineHeight: 1.16
    letterSpacing: -0.4px
  headline-lg:
    fontFamily: "IBM Plex Sans"
    fontSize: 42px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: 0px
  headline-md:
    fontFamily: "IBM Plex Sans"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0px
  headline-sm:
    fontFamily: "IBM Plex Sans"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0px
  body-lg:
    fontFamily: "IBM Plex Sans"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-md:
    fontFamily: "IBM Plex Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.16px
  label-md:
    fontFamily: "IBM Plex Sans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: 0.16px
  caption:
    fontFamily: "IBM Plex Sans"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0.32px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  gutter: 24px
  margin: 32px
  section: 96px

rounded:
  none: 0px
  sm: 0px
  md: 2px
  lg: 4px
  xl: 4px
  full: 0px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.inverse-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.inverse-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.inverse-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  button-primary-disabled:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 24px
  card-muted:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 24px
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  input-focus:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  tab-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  tab-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.inverse-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
---

# DESIGN.md

## Overview

Zuoan uses an IBM Carbon-style enterprise marketing system. The interface is built for a B2B talent and advisory portal: clear, structured, high-trust, and conversion-oriented.

Visual keywords:
- enterprise
- blue-white
- structured
- flat
- precise
- consulting
- high-trust
- data-readable
- form-first

Design style:
- White canvas with light-gray section bands.
- IBM Blue as the single interactive accent.
- Charcoal text, thin gray borders, square geometry.
- Dense but readable information blocks.
- No decorative gradients, no lifestyle illustration, no cultural ornament.

Target interfaces:
- Homepage
- Services page
- Resource page
- Talent application page
- Enterprise demand submission page

This system is based on IBM Carbon-style rules. Project-specific copy may reference Zuoan, talent, advisory services, enterprise demand, and independent experts, but visual execution must stay enterprise-grade and restrained.

## Colors

| Token | 中文名称 | HEX | 用途 |
|---|---|---:|---|
| primary | 主色 | #0f62fe | Primary CTA, links, focus states, selected states |
| secondary | 主色悬停 | #0043ce | Hover state for links and primary actions |
| tertiary | 主色按下 | #002d9c | Active state for primary actions |
| neutral | 中性深色 | #161616 | Dark footer, inverse blocks, highest contrast text base |
| surface | 表面色 | #ffffff | Page background, cards, inputs |
| surface-muted | 浅灰表面 | #f4f4f4 | Section bands, muted cards, disabled backgrounds |
| border | 边框色 | #e0e0e0 | Dividers, card borders, input borders |
| text-primary | 主文字 | #161616 | Titles, body text, form labels |
| text-secondary | 次文字 | #525252 | Supporting copy, metadata, helper text |
| accent | 强调色 | #0f62fe | Same as primary; do not introduce a second accent |
| error | 错误色 | #da1e28 | Form errors, destructive states |
| success | 成功色 | #24a148 | Success messages only |
| warning | 警示色 | #f1c21b | Warnings only |
| inverse-surface | 反相背景 | #161616 | Footer or full-width dark CTA |
| inverse-text | 反相文字 | #ffffff | Text on primary or dark backgrounds |

Color rules:
- Use `primary` for all main CTAs and links.
- Use `surface` and `surface-muted` to create page rhythm.
- Use `border` instead of shadow for separation.
- Use `error`, `success`, and `warning` only for system states.
- Do not add extra decorative colors.
- Do not use gradients for brand expression.

## Typography

| Token | 字体 | 字号 | 字重 | 行高 | 用途 |
|---|---|---:|---:|---:|---|
| headline-display | IBM Plex Sans | 64px | 300 | 1.16 | Homepage hero title |
| headline-lg | IBM Plex Sans | 42px | 300 | 1.2 | Page hero titles, major sections |
| headline-md | IBM Plex Sans | 32px | 400 | 1.25 | Section headings |
| headline-sm | IBM Plex Sans | 24px | 400 | 1.33 | Card titles, subsection headings |
| body-lg | IBM Plex Sans | 18px | 400 | 1.5 | Lead paragraphs |
| body-md | IBM Plex Sans | 16px | 400 | 1.5 | Main body text, form text |
| label-md | IBM Plex Sans | 14px | 400 | 1.29 | Buttons, labels, navigation |
| caption | IBM Plex Sans | 12px | 400 | 1.33 | Metadata, helper text |

Typography rules:
- Use IBM Plex Sans for English text.
- For Chinese text, use `IBM Plex Sans`, then system Chinese sans-serif fallback.
- Display headings use light weight, not bold marketing weight.
- Body text uses small positive tracking where specified.
- Do not use decorative serif fonts.
- Do not use all-caps labels unless required by data labels.

## Layout

Layout rules:
- Desktop grid: 16 columns.
- Tablet grid: 8 columns.
- Mobile grid: 4 columns.
- Max content width: 1584px.
- Base spacing unit: 4px.
- Default desktop gutter: 24px.
- Default page margin: 32px.
- Standard section padding: 96px vertical.
- Card grids: 4-up desktop, 2-up tablet, 1-up mobile.
- Forms should use 1-column mobile layout and 2-column desktop layout where fields are short.

Page structure:
- Sticky or static top navigation.
- Hero section.
- Structured content sections.
- Conversion CTA.
- Footer with contact and navigation.

Navigation:
- Main nav items: 首页, 我们做什么, 资源, 加入左安, 寻找人才.
- Primary CTA: 提交需求.
- Secondary CTA: 申请入席.

## Elevation & Depth

Depth rules:
- Prefer borders and surface changes over shadows.
- Default cards use 1px border with no shadow.
- Inputs use 1px border and strong focus outline or underline.
- Dark footer uses `inverse-surface` and `inverse-text`.
- Modals or overlays may use a light shadow only when required for layering.

Layer model:
- Page background: `surface`.
- Section bands: `surface-muted`.
- Cards and forms: `surface` with `border`.
- Footer / dark CTA: `inverse-surface`.

Do not use glow effects, glassmorphism, heavy shadows, or blurred gradient backgrounds.

## Shapes

Shape rules:
- Use square geometry.
- Default radius is `0px`.
- Maximum radius is `4px` for small UI affordances only.
- Buttons are rectangular.
- Cards are rectangular.
- Inputs are rectangular.
- Tabs are rectangular.
- Icon containers are square.

Do not use pills, large rounded cards, floating blobs, circular decorative badges, or organic shapes.

## Components

### Button

Primary button:
- Background: `primary`.
- Text: `inverse-text`.
- Height: 48px.
- Padding: 12px 16px.
- Shape: square.
- Typography: `label-md`.

Secondary button:
- Background: `surface`.
- Text: `primary`.
- Border: 1px solid `primary`.
- Height: 48px.
- Shape: square.

States:
- Hover uses `secondary`.
- Active uses `tertiary`.
- Disabled uses `surface-muted` and `text-secondary`.

### Card

Default card:
- Background: `surface`.
- Text: `text-primary`.
- Border: 1px solid `border`.
- Rounded: `none`.
- Padding: 24px.
- Shadow: none.

Muted card:
- Background: `surface-muted`.
- Border: 1px solid `border`.
- Shadow: none.

Use cards for service summaries, case previews, resource previews, and form sections.

### Input

Default:
- Background: `surface`.
- Text: `text-primary`.
- Border: 1px solid `border`.
- Height: 48px.
- Padding: 12px 16px.
- Rounded: `none`.

Focus:
- Border or underline uses `primary`.
- Keep background white.

Error:
- Error text and border use `error`.
- Helper text uses `caption`.

Disabled:
- Background uses `surface-muted`.
- Text uses `text-secondary`.

### Tabs

Default:
- Background: `surface`.
- Text: `text-secondary`.
- Shape: square.
- Height: 48px.

Selected:
- Background: `primary`.
- Text: `inverse-text`.

Use tabs only when content categories are mutually exclusive and useful for scanning.

### Icon

Icon rules:
- Use simple line icons.
- Stroke width: 1.5px to 2px.
- Size: 20px or 24px.
- Color: `text-primary`, `text-secondary`, or `primary`.
- Icons support labels; they do not replace critical text.

## Do's and Don'ts

### Do

- Do use IBM Blue as the only primary accent.
- Do use white and light-gray surfaces for page rhythm.
- Do use thin borders to separate cards, forms, and sections.
- Do keep all controls square or nearly square.
- Do use IBM Plex Sans with light display weights.
- Do keep pages dense enough for enterprise users to scan quickly.
- Do make forms easy to find and complete.
- Do write service pages as structured business information, not campaign copy.

### Don't

- Don't add warm cultural colors, decorative red, gold, ink wash, seals, or traditional motifs.
- Don't use gradients, glassmorphism, bokeh, or decorative blobs.
- Don't use large rounded cards or pill-heavy UI.
- Don't use heavy drop shadows.
- Don't make the site look like a generic purple-blue AI SaaS product.
- Don't overstate platform maturity in visual or copy structure.
- Don't hide conversion forms behind too many clicks.

## AI Generation Guidelines

### Visual Keywords

- IBM Carbon
- enterprise
- blue-white
- flat geometry
- thin borders
- square controls
- high-trust
- consulting portal
- B2B service
- structured content
- dense but readable
- form-first
- restrained
- no gradient
- no ornament

### Positive Prompt

Create an enterprise B2B website using an IBM Carbon-inspired design system: white canvas, light-gray section bands, IBM Blue primary CTAs, charcoal typography, IBM Plex Sans, square buttons, square cards, thin 1px borders, no shadows, no gradients, dense but readable content blocks, clear forms, structured navigation, and high-trust consulting portal composition.

### Negative Prompt

- generic SaaS gradient
- purple-blue AI hero
- decorative cultural motifs
- ink wash
- seals
- gold luxury palette
- black-gold executive club
- soft rounded pill UI
- glassmorphism
- bokeh blobs
- heavy shadows
- low contrast text
- inconsistent typography
- cartoon illustration

## Implementation Notes

Use these CSS variables as the implementation baseline.

```css
:root {
  --color-primary: #0f62fe;
  --color-secondary: #0043ce;
  --color-tertiary: #002d9c;
  --color-surface: #ffffff;
  --color-surface-muted: #f4f4f4;
  --color-border: #e0e0e0;
  --color-text-primary: #161616;
  --color-text-secondary: #525252;
  --color-error: #da1e28;
  --color-inverse-surface: #161616;
  --color-inverse-text: #ffffff;

  --font-headline: "IBM Plex Sans", "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-body: "IBM Plex Sans", "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-section: 96px;

  --rounded-none: 0px;
  --rounded-sm: 0px;
  --rounded-md: 2px;
  --rounded-lg: 4px;
}
```
