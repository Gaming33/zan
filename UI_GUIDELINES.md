---
version: "1.0"
name: "ZOAN"
description: "ZOAN design system — professional consulting tone with AI-era accent. Deep sea blue base, warm gray surfaces, soft purple accent for interactive elements. Refined, restrained, high-trust."

colors:
  primary: "#1B2B4B"
  primary-light: "#253A5E"
  secondary: "#F5F3EF"
  border: "#E8E6E1"
  text-primary: "#1A1A2E"
  text-secondary: "#6B7280"
  text-muted: "#4A4A5A"
  accent: "#8B7EC8"
  accent-hover: "#7A6DB5"
  accent-light: "#EDEBF5"
  surface: "#FFFFFF"
  surface-dark: "#0A0F1C"
  error: "#EF4444"
  success: "#10B981"
  warning: "#F59E0B"
  inverse-surface: "#1B2B4B"
  inverse-text: "#FFFFFF"
  project-ongoing: "#8B7EC8"
  project-completed: "#6B7280"

typography:
  headline-display:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "clamp(36px, 5vw, 56px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline-lg:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "clamp(28px, 3.5vw, 40px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline-md:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "clamp(22px, 2.5vw, 30px)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0em"
  headline-sm:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0em"
  body-lg:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0em"
  body-md:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.01em"
  body-sm:
    fontFamily: "\"Alibaba PuHuiTi 3.0\", \"Inter\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.01em"
  label-md:
    fontFamily: "\"Inter\", \"Alibaba PuHuiTi 3.0\", sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  caption:
    fontFamily: "\"Inter\", \"Alibaba PuHuiTi 3.0\", sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"

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
  section: 80px

rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 999px

breakpoints:
  sm: 640px
  md: 768px
  lg: 980px
  xl: 1200px
  2xl: 1440px
---

# UI Guidelines

## Overview

ZOAN uses a refined consulting design system with AI-era sensibility. The interface is built for a B2B talent and advisory platform targeting CEOs and senior executives. It must communicate **professional trust** while signaling **this is a new kind of consulting firm for the AI era**.

Visual keywords:
- professional consulting
- refined
- deep sea blue
- warm gray surfaces
- soft purple accent
- AI-era
- high-trust
- clear conversion
- restrained elegance

Design style:
- Warm gray canvas with white content surfaces.
- Deep sea blue as the structural foundation (headers, dark sections, titles).
- Soft purple as the sole interactive accent (CTAs, links, badges, hover states).
- Ample whitespace, breathing room between sections.
- Gentle rounded corners (not square, not pill-shaped).
- Light shadows on cards, subtle hover elevation.
- Typography-forward design: headlines carry the visual weight.

**Not the old IBM Carbon style.** ZOAN is warmer, more refined, and uses purple accents to differentiate from traditional consulting firms. It is not a generic tech SaaS, not a luxury brand, and not a cartoon AI product.

Target interfaces:
- Homepage
- About / Why ZOAN
- Services overview (AI+ three directions)
- Project opportunities (merged cases + JD listings)
- Insights (article listing + detail)
- Programs (courses)
- Enterprise contact form
- Talent application form

## Colors

### Color Tokens

| Token | Name | HEX | Usage |
|-------|------|-----:|-------|
| `primary` | Deep Sea Blue | #1B2B4B | Navigation bar, dark sections, primary backgrounds |
| `primary-light` | Blue Light | #253A5E | Hover on dark surfaces, secondary dark backgrounds |
| `secondary` | Warm Gray | #F5F3EF | Page background, section bands |
| `border` | Border Gray | #E8E6E1 | Dividers, card borders, input borders |
| `text-primary` | Primary Text | #1A1A2E | Headlines, body text, form labels |
| `text-secondary` | Secondary Text | #6B7280 | Supporting copy, metadata, helper text |
| `text-muted` | Muted Text | #4A4A5A | Tertiary content, timestamps |
| `accent` | Soft Purple | #8B7EC8 | **All** interactive elements: CTAs, links, badges, focus rings, selected states |
| `accent-hover` | Purple Hover | #7A6DB5 | Hover state for accent-colored elements |
| `accent-light` | Purple Light | #EDEBF5 | Badge backgrounds, subtle highlights, selected row backgrounds |
| `surface` | Surface White | #FFFFFF | Cards, inputs, modals |
| `surface-dark` | Dark Surface | #0A0F1C | Hero overlays, darkest backgrounds (use sparingly) |
| `error` | Error Red | #EF4444 | Form validation errors |
| `success` | Success Green | #10B981 | Success messages |
| `warning` | Warning Amber | #F59E0B | Warning messages |
| `inverse-surface` | Inverse Background | #1B2B4B | Footer, dark CTAs (same as primary) |
| `inverse-text` | Inverse Text | #FFFFFF | Text on dark backgrounds |
| `project-ongoing` | Ongoing Status | #8B7EC8 | "Ongoing" badge in project cards |
| `project-completed` | Completed Status | #6B7280 | "Completed" badge in project cards |

### Color Rules

1. **Deep sea blue (`primary`) is structural, not interactive.** It defines the framework (nav, footer, dark sections). It is NOT used for buttons or links.
2. **Soft purple (`accent`) is the ONLY interactive color.** All CTAs, links, focus states, and selected states use `accent`. Do not introduce a second interactive color.
3. **Warm gray (`secondary`) creates page rhythm.** Alternate between `secondary` (background) and `surface` (content blocks) to create visual sections.
4. **Never use pure black (#000) or pure white (#FFF) as background colors.** Use `primary` (#1B2B4B) instead of black, and `surface` (#FFFFFF) only for content surfaces on top of `secondary` backgrounds.
5. **Status colors are for system states only.** Error, success, warning must not be used decoratively.
6. **No gradients for brand expression.** Solid colors only. Subtle linear gradients are acceptable only for hero image overlays (dark-to-transparent).

### Color Distribution by Page Area

```
┌──────────────────────────────────────────┐
│ Header: primary background               │  ← Deep blue
│          inverse-text                    │  ← White text
├──────────────────────────────────────────┤
│ Hero:    primary background or           │  ← Deep blue or
│          secondary + primary overlay     │     warm gray + blue overlay
│          inverse-text                    │  ← White text
├──────────────────────────────────────────┤
│ Content: secondary background            │  ← Warm gray
│          surface cards                   │  ← White cards
│          text-primary                    │  ← Dark text
│          accent for interactive elements │  ← Purple buttons/links
├──────────────────────────────────────────┤
│ CTA:    primary background               │  ← Deep blue
│         inverse-text + accent buttons    │  ← White text + purple buttons
├──────────────────────────────────────────┤
│ Footer: primary background               │  ← Deep blue
│         inverse-text                     │  ← White text
└──────────────────────────────────────────┘
```

## Typography

### Font Stack

```
Chinese: "Alibaba PuHuiTi 3.0"  (CDN, weights: 400, 500, 700)
English: "Inter"                 (Google Fonts or self-host, weights: 400, 500, 600)
Fallback: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|-----:|-------:|------------:|-------|
| `headline-display` | clamp(36px, 5vw, 56px) | 700 | 1.15 | Homepage hero title only |
| `headline-lg` | clamp(28px, 3.5vw, 40px) | 700 | 1.2 | Page hero titles, major section headings |
| `headline-md` | clamp(22px, 2.5vw, 30px) | 600 | 1.3 | Section headings within pages |
| `headline-sm` | 20px | 600 | 1.4 | Card titles, subsection headings |
| `body-lg` | 18px | 400 | 1.7 | Lead paragraphs, hero subtitles |
| `body-md` | 16px | 400 | 1.7 | Main body text, form text, descriptions |
| `body-sm` | 14px | 400 | 1.6 | Secondary descriptions, metadata |
| `label-md` | 14px | 500 | 1.4 | Buttons, navigation items, badges |
| `caption` | 12px | 400 | 1.5 | Timestamps, helper text, legal text |

### Typography Rules

1. **Chinese and English use the same type scale.** Do not create separate scales for each language.
2. **Headlines use bold/semibold weight.** This is different from the old IBM Carbon light-weight approach. ZOAN headlines should feel authoritative and grounded.
3. **Body text line-height is 1.7.** Chinese text needs more line-height than English for readability. Do not compress below 1.6.
4. **Use `clamp()` for responsive font sizes** in display and large headings. Fixed pixel values for body text and below.
5. **Do not use serif fonts.** Not even for English headings. This is a modern consulting brand, not a law firm.
6. **Do not use all-caps for Chinese text.** English navigation items and labels may use title case or sentence case, never all-caps.
7. **Font loading:** Use `font-display: swap` for web fonts. Only load weights 400, 500, 600, 700.

## Layout

### Grid System

- **Max content width:** 1200px
- **Reading width:** 720px (for long-form article content)
- **Base spacing unit:** 8px grid
- **Desktop gutter:** 24px
- **Page margin:** 32px desktop, 16px mobile
- **Standard section padding:** 80px vertical (desktop), 48px (mobile)

### Responsive Breakpoints

| Breakpoint | Width | Columns | Layout |
|-----------|------:|---------|--------|
| Mobile | < 640px | 1 | Single column, stacked |
| Tablet | 640–979px | 2 | Two-column grids |
| Desktop | 980–1199px | 3 | Three-column grids |
| Wide | ≥ 1200px | 3-4 | Full layout, max-width container |

### Card Grid Layout

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Service cards | 3 columns | 2 columns | 1 column |
| Project cards | 2 columns | 1 column | 1 column |
| Article cards | 3 columns | 2 columns | 1 column |
| Program cards | 3 columns | 2 columns | 1 column |
| Process steps | Horizontal flow | 2x2 grid | Vertical stack |

### Page Structure

Every page follows this skeleton:

```
┌──────────────────────────────────────┐
│ Header (sticky, primary background)  │  ← Deep blue, white text
├──────────────────────────────────────┤
│ Hero Section                         │  ← Blue or gray background
├──────────────────────────────────────┤
│ Content Section A (secondary bg)     │  ← Warm gray background
│   ┌──────────────────────────────┐   │
│   │ Content cards (surface bg)   │   │  ← White cards
│   └──────────────────────────────┘   │
├──────────────────────────────────────┤
│ Content Section B (surface bg)       │  ← White background
├──────────────────────────────────────┤
│ CTA Section (primary bg)             │  ← Deep blue, purple buttons
├──────────────────────────────────────┤
│ Footer (primary bg)                  │  ← Deep blue
└──────────────────────────────────────┘
```

## Elevation & Depth

### Layer Model

| Layer | Background | Border | Shadow |
|-------|-----------|--------|--------|
| Page background | `secondary` | none | none |
| Section bands | `surface` | none | none |
| Cards (default) | `surface` | 1px `border` | none |
| Cards (hover) | `surface` | 1px `border` | `0 4px 12px rgba(27,43,75,0.08)` |
| Elevated panels | `surface` | none | `0 8px 24px rgba(27,43,75,0.12)` |
| Header | `primary` | none | `0 1px 3px rgba(0,0,0,0.1)` |
| Mobile menu overlay | `primary` | none | `4px 0 16px rgba(0,0,0,0.2)` |

### Depth Rules

1. **Default cards have no shadow, only a 1px border.** This keeps the page feeling flat and clean.
2. **Hover adds a subtle shadow + 2px upward translation.** This is the only "elevation" interaction.
3. **The header has a very light bottom shadow** when scrolled (sticky behavior).
4. **No glow effects, no glassmorphism, no heavy drop shadows, no blurred backgrounds.**

## Shapes

### Border Radius Scale

| Token | Value | Usage |
|-------|------:|-------|
| `rounded-sm` | 4px | Small inline elements |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-lg` | 8px | Cards, panels |
| `rounded-xl` | 12px | Modal dialogs, image containers |
| `rounded-full` | 999px | Badges, tags, avatars |

### Shape Rules

1. **Buttons: `rounded-md` (6px).** Not square, not pill. A subtle round that feels modern but professional.
2. **Cards: `rounded-lg` (8px).** Enough roundness to feel approachable without looking like a mobile app.
3. **Badges/Tags: `rounded-full` (999px).** Pill-shaped for industry tags, function tags, status badges.
4. **Inputs: `rounded-md` (6px).** Match button roundness.
5. **Modals: `rounded-xl` (12px).** Slightly more round to visually separate from page content.
6. **Do NOT use fully square elements.** The old IBM Carbon square geometry is gone. ZOAN uses gentle rounding throughout.

## Components

### Button

**Primary button (CTA):**
- Background: `accent` (#8B7EC8)
- Text: `inverse-text` (#FFFFFF)
- Height: 44px
- Padding: 0 24px
- Border radius: `rounded-md` (6px)
- Typography: `label-md`
- Transition: background-color 150ms ease

States:
- Hover: `accent-hover` (#7A6DB5)
- Active: `primary` (#1B2B4B)
- Disabled: `border` background, `text-secondary` text
- Focus: 2px `accent` outline, 2px offset

**Secondary button:**
- Background: transparent
- Text: `accent`
- Border: 1px solid `accent`
- Border radius: `rounded-md` (6px)
- Height: 44px

States:
- Hover: `accent-light` background, `accent-hover` text
- Active: `accent` background, `inverse-text` text

**Dark-background button (on primary/inverse-surface):**
- Background: `accent` (#8B7EC8)
- Text: `inverse-text` (#FFFFFF)
- Same as primary button, but used on dark blue backgrounds

### Card

**Default card:**
- Background: `surface` (#FFFFFF)
- Border: 1px solid `border` (#E8E6E1)
- Border radius: `rounded-lg` (8px)
- Padding: 24px
- Shadow: none
- Transition: transform 200ms ease, box-shadow 200ms ease

Hover state:
- Transform: translateY(-2px)
- Shadow: 0 4px 12px rgba(27,43,75,0.08)
- Border color: unchanged

**Card usage:**
- Project opportunity cards
- Article preview cards
- Program/course cards
- Feature/differentiation cards

### Badge

**Tag badge (industry/function):**
- Background: `accent-light` (#EDEBF5)
- Text: `accent` (#8B7EC8)
- Border radius: `rounded-full` (999px)
- Padding: 4px 12px
- Typography: `caption`

**Status badge (ongoing/completed):**
- Ongoing: `accent-light` background + `accent` text
- Completed: `secondary` background + `text-secondary` text
- Border radius: `rounded-full` (999px)
- Includes a small dot indicator (8px circle)

### Input

**Default:**
- Background: `surface`
- Text: `text-primary`
- Border: 1px solid `border`
- Border radius: `rounded-md` (6px)
- Height: 48px
- Padding: 0 16px
- Typography: `body-md`

**Focus:**
- Border: 2px solid `accent`
- Box-shadow: 0 0 0 3px rgba(139,126,200,0.15)

**Error:**
- Border: 2px solid `error`
- Helper text: `error` color, `caption` size

**Label:**
- Typography: `label-md`
- Color: `text-primary`
- Spacing: 8px below label, above input

**Textarea:**
- Same as input but min-height: 120px, vertical-align top

### Filter Bar

Used on `/projects` and `/insights` pages:

- Horizontal row of filter controls
- Each filter is a `rounded-full` button with `body-sm` text
- Unselected: `surface` background, `text-secondary` text, `border` border
- Selected: `accent-light` background, `accent` text, `accent` border
- Spacing between filters: 8px
- On mobile: horizontal scroll with fade mask on right edge

### Navigation

**Header (desktop):**
- Background: `primary` (#1B2B4B)
- Height: 64px
- Text: `inverse-text` (#FFFFFF)
- Logo on left, nav items center, dual CTAs right
- Nav items: `label-md`, hover underline with `accent` color
- Active nav item: `accent` underline (2px)
- Sticky on scroll with subtle shadow

**CTA buttons in header:**
- Enterprise CTA: `accent` background (solid purple), `inverse-text`
- Talent CTA: transparent background, `inverse-text`, 1px `inverse-text` border

**Mobile menu:**
- Hamburger icon (3 lines), `inverse-text` color
- Opens as a slide-in panel from right, `primary` background
- Full-screen overlay on content
- Nav items stacked vertically with 16px spacing

### Section Heading

Standard pattern for section titles across pages:

```
┌──────────────────────────────────────┐
│   ── short accent line (32px)        │  ← accent color
│   Section Title                      │  ← headline-md
│   Optional subtitle description      │  ← body-lg, text-secondary
└──────────────────────────────────────┘
```

## Animation

### Allowed Animations

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Scroll reveal | Enter viewport | 500ms | ease-out |
| Card hover lift | hover | 200ms | ease |
| Button color change | hover/focus | 150ms | ease |
| Mobile menu slide | toggle | 300ms | ease-in-out |
| Filter state change | click | 150ms | ease |
| Page transition (optional) | route change | 200ms | ease-in-out |

### Scroll Reveal Pattern

Elements fade in and slide up when entering the viewport:

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Animation Rules

1. **Use IntersectionObserver for scroll reveals.** Do not use scroll event listeners.
2. **Stagger reveals within a group.** Cards in a grid reveal with 100ms delay between each.
3. **Respect `prefers-reduced-motion`.** Disable all animations when the user has this preference set.
4. **No bounce, no rotation, no scale animation.** Only fade + vertical translate.
5. **No animation that takes longer than 500ms.** Keep things snappy.

## Iconography

- Use simple line icons (Lucide icon set, which comes with shadcn/ui).
- Stroke width: 1.5px–2px.
- Default size: 20px.
- Color: `text-primary`, `text-secondary`, or `accent`.
- Icons accompany text labels; they do not replace text for critical actions.
- Do not use filled/solid icon variants except for status indicators.

## Image Guidelines

### Photography

- Use authentic, professional photography only.
- Avoid stock-looking "business handshake" imagery.
- Prefer environmental portraits, workspace scenes, urban professional contexts.
- Desaturated or slightly cool-toned to match the color palette.
- Do not apply heavy filters or overlays to photos.

### Image Technical Rules

- Format: WebP with fallback to JPEG.
- Responsive: provide `srcset` for 1x and 2x.
- Aspect ratios: 16:9 for hero/banner, 4:3 for cards, 3:2 for article covers.
- Loading: `loading="lazy"` for below-fold images, `fetchpriority="high"` for hero images.
- Do not use Unsplash external URLs. Self-host all images.

## Form Design

### Layout

- Single-column on mobile.
- Single-column on desktop for forms with ≤ 6 fields (which is all current forms).
- Each field: label → input → (error message if invalid).
- Submit button: full-width on mobile, auto-width on desktop.
- Privacy checkbox: `caption` text with link to `/privacy`.

### Validation

- Real-time validation on blur (not on keystroke).
- Error messages appear below the field in `error` color.
- Submit button disabled until all required fields are valid and consent is checked.
- Success state: replace form with a success message card.

## Do's and Don'ts

### Do

- Do use deep sea blue as the structural color (nav, footer, dark sections).
- Do use soft purple exclusively for interactive elements.
- Do use warm gray and white surfaces to create page rhythm.
- Do use gentle rounded corners (6–8px) for all controls and cards.
- Do use Alibaba PuHuiTi 3.0 for Chinese text with bold/semibold headlines.
- Do use ample whitespace between sections (80px vertical padding).
- Do keep forms minimal and accessible.
- Do use scroll reveal animations with IntersectionObserver.
- Do respect `prefers-reduced-motion`.
- Do write copy in business language, not technical jargon.

### Don't

- Don't use the old IBM Carbon square geometry or IBM blue (#0f62fe).
- Don't use gradients for brand expression.
- Don't use glassmorphism, bokeh, blurred backgrounds, or glow effects.
- Don't use pill-shaped buttons or large rounded cards (border-radius > 12px).
- Don't use heavy drop shadows.
- Don't make the site look like a generic purple-blue AI SaaS landing page.
- Don't use pure black (#000000) or pure white (#FFFFFF) as background colors.
- Don't use serif fonts or all-caps labels.
- Don't use decorative cultural motifs, ink wash, or traditional patterns.
- Don't overstate platform maturity in visual or copy structure.
- Don't hide forms behind too many clicks.
- Don't use stock business imagery (handshakes, boardrooms, pointing at charts).
- Don't use animation that takes longer than 500ms.

## AI Generation Guidelines

### Visual Keywords

- professional consulting
- deep sea blue
- warm gray
- soft purple accent
- AI-era
- refined
- high-trust
- Alibaba PuHuiTi
- gentle rounded corners
- ample whitespace
- light card shadows
- typography-forward
- restrained elegance
- no gradient
- no ornament

### Positive Prompt

Create a professional B2B consulting website with an AI-era sensibility: deep sea blue (#1B2B4B) structural elements (header, footer, dark CTAs), warm gray (#F5F3EF) page backgrounds, white (#FFFFFF) content surfaces, soft purple (#8B7EC8) as the sole interactive accent for buttons and links. Use Alibaba PuHuiTi 3.0 for Chinese text and Inter for English, bold headlines, generous whitespace (80px section padding), gentle rounded corners (6–8px), thin 1px borders on cards, subtle shadows on hover, scroll reveal animations, clean forms, dual CTA navigation, and high-trust consulting composition.

### Negative Prompt

- IBM Carbon square geometry
- IBM blue (#0f62fe)
- generic SaaS gradient hero
- purple-blue AI product landing
- glassmorphism
- heavy shadows
- pill-shaped buttons
- decorative cultural motifs
- ink wash
- gold luxury palette
- black-gold executive club
- low contrast text
- cartoon illustration
- stock business photos
- bounce animation
- rotating elements
- all-caps labels
- serif fonts
- dense information blocks
- pure black backgrounds

## Implementation: Tailwind CSS v4 Tokens

```css
/* src/styles/globals.css */

@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #1B2B4B;
  --color-primary-light: #253A5E;
  --color-secondary: #F5F3EF;
  --color-border: #E8E6E1;
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #6B7280;
  --color-text-muted: #4A4A5A;
  --color-accent: #8B7EC8;
  --color-accent-hover: #7A6DB5;
  --color-accent-light: #EDEBF5;
  --color-surface: #FFFFFF;
  --color-surface-dark: #0A0F1C;
  --color-error: #EF4444;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-inverse-surface: #1B2B4B;
  --color-inverse-text: #FFFFFF;

  /* Spacing */
  --spacing-section: 80px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* Font */
  --font-sans: "Alibaba PuHuiTi 3.0", "Inter", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;

  /* Animations */
  --animate-reveal: reveal 500ms ease-out;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
