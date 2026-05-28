---
name: Orbit UI
description: Headless React 디자인 시스템. 어떤 프로덕트에도 조용히 녹아드는 중립 시각 언어.
colors:
  primary: "#2563EB"
  primary-hover: "#1D4ED8"
  primary-tint: "#DBEAFE"
  secondary: "#64748B"
  surface: "#F3F5F7"
  surface-elevated: "#FFFFFF"
  ink: "#181A1C"
  ink-muted: "#484A4C"
  ink-subtle: "#787A7C"
  ink-faint: "#B1B3B5"
  border: "#E4E6E8"
  divider: "#EEF0F2"
  surface-dark: "#151719"
  surface-elevated-dark: "#1C1E20"
  ink-dark: "#FFFFFF"
  ink-muted-dark: "#C8CACC"
  border-dark: "#2A2E33"
  positive: "#00B96B"
  negative: "#FF403E"
  warning: "#FF8400"
  benefit: "#5F57FF"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "0.05px"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: "33px"
    letterSpacing: "0px"
  title:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: "18px"
    letterSpacing: "0px"
  body:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "21px"
    letterSpacing: "0px"
  label:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "14px"
    letterSpacing: "0px"
  caption:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "12px"
    letterSpacing: "0px"
  mono:
    fontFamily: "JetBrains Mono, SF Mono, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "1.5"
    letterSpacing: "-0.01em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  xxl: "20px"
  pill: "9999px"
spacing:
  "50": "4px"
  "75": "6px"
  "100": "8px"
  "150": "12px"
  "200": "16px"
  "250": "20px"
  "300": "24px"
  "400": "32px"
  "500": "40px"
  "600": "48px"
  "800": "64px"
  "1200": "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "38px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.divider}"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.md}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "38px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "38px"
  chip-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "4px 12px"
    height: "26px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface-elevated}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "4px 12px"
    height: "26px"
  input:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  input-focus:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  badge-default:
    backgroundColor: "{colors.ink}"
    textColor: "#FFFFFF"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "5px 6px"
---

# Design System: Orbit UI

## 1. Overview

**Creative North Star: "The Quiet Foundation"**

Orbit UI is the layer that disappears into the host product. It does not announce itself. A consumer drops in `@heejun-com/theme-eclipse`, ships their feature, and the system carries the weight of correctness, accessibility, and visual coherence without ever asking for attention. The aesthetic posture is consumer-led: this is a neutral palette and a calm typographic voice that *amplifies* whatever brand sits on top.

Every choice is made against a 56-component catalog rendered side by side. Color is restrained because a primary that screams will fight every consumer brand we sit under. Motion is sub-second because users are in a task. Elevation is whisper-soft because real depth would compete with the consumer's content. Korean and English type both must look intentional in the same paragraph, so we choose a Pretendard-first stack and never optical-tune to one script over the other.

What this system explicitly rejects, from PRODUCT.md: *과도한 그라데이션, 네온 색상, glassmorphism, 과한 애니메이션, 과한 민트·네온*. Also rejected by category: the SaaS landing-page cliché (gradient hero, stat row, identical card grids), Tailwind-default indigo `#6366F1` as a primary brand color, and dark mode "because tools look cool dark."

**Key Characteristics:**
- **Restrained color**: tinted ash neutrals plus one calm cobalt accent, used on ≤10% of any screen.
- **Headless 3-tier tokens**: reference → semantic → component. Consumers override at any tier without touching CSS.
- **Light by default, dark verified**: every component ships with both modes, focus rings retuned per mode.
- **Pretendard-first typography**: Korean and Latin glyphs balanced; weight contrast carries hierarchy, not size alone.
- **Quiet motion**: state changes only; 200ms standard, 320ms emphasized. No bounce, no choreography.
- **Substance over decoration**: cards only when truly the best affordance, dividers via 1px hairlines, no shadows at rest.

## 2. Colors

The palette is tinted ash neutrals carrying a single cobalt accent. Three role layers (light surface, dark surface, status) coexist; each is fully self-sufficient for its mode. The system *never* picks an accent at random from the reference scale: only Cobalt is the brand voice.

### Primary

- **Cobalt** (`#2563EB`, OKLCH ~58% 0.20 258): primary action color. Used for the primary button fill, focus ring, links, the toggle "on" state, and the in-bounds selection. Lifted in dark mode to **Cobalt Lifted** (`#60A5FA`) to maintain WCAG AA contrast on `surface-dark`.
- **Cobalt Deep** (`#1D4ED8`): hover for primary actions and pressed link state.
- **Cobalt Tint** (`#DBEAFE`): subtle tint behind primary content, focus highlights, selected-row backgrounds.

### Secondary

- **Slate** (`#64748B`): the second voice for cool-neutral text on primary surfaces, used in `systemMainSecondary`. Rare; reach for it only when a paragraph genuinely needs a cooler-than-ink-muted tone (e.g. inline help that should recede further than body copy).

### Neutral

- **Ash Cream** (`#F3F5F7`): the page background. Light, slightly cool, never pure white.
- **Paper White** (`#FFFFFF`): elevated surface, cards, modals, popovers. The contrast against Ash Cream is what creates depth, not shadows.
- **Ash Ink** (`#181A1C`): the primary ink. Charcoal warmed almost imperceptibly toward the brand hue.
- **Ash Ink Muted** (`#484A4C`, computed from 78% Ash Ink on Ash Cream): secondary body, supporting copy.
- **Ash Ink Subtle** (`#787A7C`, 56%): tertiary, captions.
- **Ash Ink Faint** (`#B1B3B5`, 33%): quaternary, disabled states, placeholders.
- **Hairline** (`#E4E6E8`, 11% Ink): the only border weight at rest. 1px, full color.
- **Divider** (`#EEF0F2`, 6% Ink): even quieter, for in-section separation.

Dark mode mirrors the same role names:

- **Carbon** (`#151719`): page background.
- **Carbon Elevated** (`#1C1E20`): surfaces, cards, modals.
- **Snow** (`#FFFFFF`): primary ink. Sharp on Carbon.
- **Snow Muted** (`#C8CACC`, 78%) → **Snow Subtle** (`#9C9FA1`, 56%) → **Snow Faint** (`#76787B`, 33%).
- **Hairline Dark** (`#2A2E33`): 1px border at rest.

### Status

- **Positive Green** (`#00B96B`): success, on-state, "회수됨", confirmed payments.
- **Negative Coral** (`#FF403E`): destructive, errors, validation failure.
- **Warning Amber** (`#FF8400`): non-blocking caution, pending review.
- **Benefit Purple** (`#5F57FF`): special-status tags (benefits, rewards, premium tier). Used only where the semantic token `benefit` is wired up; never as a free decorative color.

### Named Rules

**The One Voice Rule.** The Cobalt accent appears on ≤10% of any rendered screen. Use it for the single primary action, the focus ring, the current-selection indicator, and links. Never for icon decoration, never as a card background, never as a heading underline.

**The Tinted Neutral Rule.** Every neutral is tinted toward the brand axis (cool, slight blue cast). Pure greys are forbidden; pure `#000` and `#fff` exist only as the elevated paper color (`#FFFFFF` is the canonical `surfaceElevated` value) and the dark-mode ink (`#FFFFFF` on `#151719`). Reach for Ash Cream (`#F3F5F7`) or Carbon (`#151719`) as the page surface, never `#fff` or `#000`.

**The Status-Is-Not-Decoration Rule.** Coral, Amber, Green, Purple appear only where the semantic role applies: an error message, a validation banner, a confirmed badge, a benefit tag. They are forbidden as accent decoration in headings, dividers, or illustrative graphics.

## 3. Typography

**Display Font:** Pretendard Variable (with Pretendard, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR" fallback).
**Body Font:** Same family. One stack carries the whole product.
**Mono Font:** JetBrains Mono (with SF Mono, Menlo, Consolas fallback).

**Character:** Pretendard's variable-weight axis lets a single family carry display, body, and label without optical mismatch between Korean and Latin glyphs. Hierarchy is built from weight contrast (400 / 500 / 700) and a 1.2–1.4 scale ratio, never from a flat scale or from changing the family. Tracking is near zero at body sizes; display sizes use a very slight negative tracking to feel intentional.

The component-level text style tokens (`packages/theme-eclipse/src/styles/text-style-token.ts`) ship with `system-ui, sans-serif` as the face value so consumers can drop any font in. Storybook and the recommended deployment use Pretendard; document this stack to consumers as the canonical visual.

### Hierarchy

The system ships text styles at four base sizes (xSmall / small / medium / large). The values below are the **medium** baseline (the default `EclipseProvider` setting); other base sizes scale proportionally.

- **Display** (700, 36px / 48px line, +0.05px tracking): hero numbers, top-level landing wordmarks. Rare in product surfaces.
- **Headline** (700, 26px / 33px line): page titles. Use once per route.
- **Subheading** (700, 20px / 24px line): section dividers inside long forms or settings panels.
- **Title** (700, 18px / 18px line): card headers, dialog titles. Tight line-height because titles do not wrap.
- **Body Large** (400, 16px / 24px line): primary reading text on dense surfaces.
- **Body Medium** (400, 14px / 21px line): the default body. Most paragraphs. Wrap at 65–75ch.
- **Label** (400, 14px / 14px line): form labels, button text. The Emphasized variant (700) is the typical button face.
- **Caption** (400, 12px / 12px line): timestamps, footnote-density metadata.
- **Detail** (400, 10px / 13px line): the floor. Reserved for status codes, version strings.

### Named Rules

**The One Family Rule.** The product never pairs two display families. Hierarchy is carried by weight (400 → 500 → 700) and scale ratio. Display fonts and editorial pairings are forbidden inside product surfaces.

**The Korean-Latin Parity Rule.** Pretendard is the chosen face because it tunes Korean and Latin glyphs to the same x-height and weight curve. Do not stack a Korean-only fallback before a Latin font; Pretendard handles both.

**The 65ch Rule.** Body paragraphs wrap at 65–75 characters. Tables and dense UI may exceed this; *reading* surfaces (descriptions, articles, help text) must not.

## 4. Elevation

Orbit UI is flat at rest. Depth is conveyed first by **tonal layering** (Ash Cream below, Paper White elevated) and second by **1px hairline borders**. Shadows appear only as a response to lifting (modal, dropdown, popover, drag-state). No element has a shadow in its default state.

Four shadow steps exist for moments when lift is genuinely required:

### Shadow Vocabulary

- **Level 1** (`box-shadow: 0px 1px 2px rgba(0,0,0,0.05), 0px 1px 3px rgba(0,0,0,0.02)`): the smallest possible bump. Reserved for hover-floated buttons inside dense data tables, where flat states blur into the row.
- **Level 2** (`box-shadow: 0px 2px 4px rgba(0,0,0,0.05), 0px 4px 6px rgba(0,0,0,0.02)`): dropdown menus, popovers, hover cards.
- **Level 3** (`box-shadow: 0px 4px 6px rgba(0,0,0,0.05), 0px 8px 12px rgba(0,0,0,0.04)`): drawers, side sheets, command palette.
- **Level 4** (`box-shadow: 0px 10px 24px rgba(0,0,0,0.06), 0px 4px 8px rgba(0,0,0,0.03)`): full modals, alert dialogs, the maximum lift.

Dark mode shadows multiply the ambient layer (`rgba(0,0,0,0.4)` and up) because tonal layering on dark surfaces does less visual work; depth must come from a heavier ambient layer.

### Named Rules

**The Flat-By-Default Rule.** No element ships with a shadow at rest. Borders, color contrast, and surface tone do all default depth work. A button in its default state has zero `box-shadow`. Cards have zero `box-shadow` unless they are draggable, hovered, or being floated above content.

**The No-Glow Rule.** Decorative glows (color-tinted shadows, neon underglows, accent halos) are forbidden. Shadows are ambient gray only.

## 5. Components

Every interactive component ships with seven states: default, hover, focus-visible, active, disabled, loading, error. The token surface for each component lives at `packages/theme-eclipse/src/styles/component-token.ts` and is overridable via a `theme` prop. The character below is the resting voice.

### Buttons

Three core variants. The shape is uniform: 8px radius (`rounded.md`), 38px height at medium size, 12px horizontal padding, Label Medium Emphasized text style (15px / weight 700). All three carry Leading / Center / Trailing slots for compound composition.

- **Solid (Primary).** Cobalt fill, white ink. Hover deepens to Cobalt Deep. Focus paints a 2px Cobalt ring offset by 2px from the button border (`focus-ring-color` token). Disabled drops to Divider fill with Ink Faint ink. The most decisive surface in the system; one per screen.
- **Solid (Black).** Ash Ink fill, Paper White ink. The neutral primary. Use when the action is *significant* but does not deserve brand-blue attention (Save, Confirm in flows where the user is mid-task).
- **Outline.** Transparent fill, Ash Ink ink, 1px Hairline border. Used as the secondary action paired with a Solid primary.
- **Ghost.** Transparent fill, Ash Ink ink, no border. Used as the tertiary action: Cancel, dismissive choices.

Sizes: Small (26px height, 13px text), Medium (38px / 15px), Large (50px / 17px). Match the size of the densest interactive element on the same row.

### Chips

Pill-shaped (12px radius), 26px height, 12px horizontal padding. Two states drive the variant:

- **Default.** Ash Cream fill, Ash Ink ink, Hairline border. The cool-neutral pill that does not steal attention from primary actions.
- **Selected.** Ash Ink fill, Paper White ink, no border. Inversion conveys "active filter".

Filter pills (group selection) and Action pills (one-tap navigation) share the same vocabulary; the difference is behavior, not appearance.

### Inputs

Rectangular, 8px radius, 44px height at default, 14px horizontal padding. Body Medium (14px / 21px) text.

- **Default.** Paper White fill, Hairline border, Ash Ink ink, Ink Subtle placeholder.
- **Focus.** Cobalt 2px ring offset 2px (matches button focus). Border shifts to Cobalt at full alpha.
- **Error.** Coral border, Coral helper text below the field.
- **Disabled.** Divider fill, Ink Faint ink, no border.

`FloatingTextField` is the labeled variant: label floats from inside the field to above on focus or filled state. `PasswordField` adds a trailing eye toggle. `SearchBar` adds a leading search icon and an optional command (`⌘K`) hint chip.

### Cards / Containers

- **Corner Style:** 12px radius (`rounded.lg`).
- **Background:** Paper White on Ash Cream pages. The surface tone difference IS the elevation. Never apply Level 1 shadow at rest.
- **Border:** 1px Hairline.
- **Internal Padding:** 16px default, 24px for top-tier content cards.
- **Nesting:** never nest a card inside a card. Replace inner cards with subsection headers, dividers, or background-tinted regions.

### Navigation

- **Top Bar (`AppBar`):** Paper White surface in light mode, Carbon Elevated in dark. 1px Hairline bottom border. 56px height typical, 64px when the brand wordmark is present. Title in Title style, current-route indicator in Cobalt 2px underline.
- **Side Nav:** Ash Cream surface (one tone darker than page when the page is Paper White; one tone lighter when the page is Ash Cream). Active item: Cobalt Tint background, Ash Ink text, no underline.
- **Tabs:** Underline-only style. Active tab: Cobalt 2px underline, Ash Ink ink. Inactive: Ash Ink Subtle ink, no underline. Never use background fill to indicate active state on tabs.
- **Breadcrumbs:** Ash Ink Subtle for ancestors, Ash Ink for the current page. Separator is a 14px `/` glyph in Ash Ink Faint.

### Feedback (Toast, Alert, Modal)

- **Toast:** Paper White surface, Hairline border, Level 2 shadow. Status icon (Positive Green / Coral / Amber) Leading slot. Auto-dismiss 4s.
- **Alert (in-flow):** Status-tinted background (Coral Tint / Amber Tint / Cobalt Tint), Ash Ink ink, 8px radius, no shadow. Never use Level 1+ shadow on an inline alert.
- **Modal:** Centered, 16px radius (`rounded.xl`), Paper White surface, Level 4 shadow, 50% black overlay behind (`overlayPrimary`). Use *sparingly*: most modal-shaped problems have an inline progressive solution.

### Signature: Compound Slot Pattern

Every button, list tile, and chip exposes `Leading`, `Center`, `Trailing` sub-components. Polymorphic `as` prop swaps the rendered element without changing visuals. `theme` prop accepts a partial token object for surgical overrides without writing CSS. This is the visual signature of the system: composition is the API, not configuration arrays.

## 6. Do's and Don'ts

### Do:

- **Do** reach for Cobalt (`#2563EB`) as the single brand accent. Use it on the primary action, focus ring, links, current-selection indicator. Stay ≤10% of any screen.
- **Do** convey depth through tonal layering (Ash Cream below, Paper White above) plus 1px Hairline borders. Save shadows for genuine lifts (modal, dropdown, drag).
- **Do** use the Pretendard-first stack and let weight contrast (400 / 500 / 700) carry hierarchy. Korean and Latin must look balanced in the same paragraph.
- **Do** ship every interactive component with the seven states (default, hover, focus-visible, active, disabled, loading, error). Half-states are unacceptable.
- **Do** use 200ms standard easing (`cubic-bezier(0.2, 0, 0, 1)`) for state transitions, 320ms emphasized (`cubic-bezier(0.3, 0, 0, 1)`) for emphasized motions. Respect `prefers-reduced-motion`.
- **Do** wrap reading body at 65–75ch. Tables and dense UI may run wider.
- **Do** ship Light and Dark mode together; verify both before review.
- **Do** use the 8px-grid spacing scale (`50`, `100`, `150`, `200`, `300`, `400`...). Spacing values not on the scale are a code smell.

### Don't:

- **Don't** use Tailwind-default indigo (`#6366F1`) or its purple-leaning siblings as a primary brand accent. Cobalt (`#2563EB`) is the system blue.
- **Don't** use **gradient text** (`background-clip: text` with a linear-gradient background). Decorative, never meaningful. Use a single solid color; emphasize with weight or size.
- **Don't** ship a **hero-metric template** (big number + small label, stat row, gradient accent). It is the SaaS cliché called out by name; replace with a spec table or editorial section.
- **Don't** ship **identical card grids** stacked endlessly (3-up cards with icon + heading + text, repeated for every section). Vary layout per section.
- **Don't** apply **side-stripe borders** (`border-left` greater than 1px as a colored accent on cards, list items, callouts). Use a full border or a background tint.
- **Don't** use **glassmorphism** (decorative `backdrop-filter: blur` glass surfaces) as a default. Rare and purposeful, or nothing. PRODUCT.md explicitly forbids it.
- **Don't** use **excessive gradients, neon, or mint/neon color** (PRODUCT.md anti-references verbatim: *과도한 그라데이션, 네온 색상, glassmorphism, 과한 민트·네온*).
- **Don't** use **modals as the first thought** for any task. Exhaust inline, progressive disclosure, drawer, and popover alternatives before reaching for a modal.
- **Don't** use **decorative motion** that does not convey state change, feedback, loading, or reveal. No orchestrated page-load sequences. Users are in a task.
- **Don't** use **em dashes** (`—`) or double hyphens (`--`) in user-facing copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** use `#000` or `#fff` as a page surface. The page surface is Ash Cream (`#F3F5F7`) in light, Carbon (`#151719`) in dark. Paper White (`#FFFFFF`) appears only as `surfaceElevated`.
- **Don't** introduce a second display family. The system uses one font stack carrying all hierarchy.
- **Don't** add color-tinted shadows, neon underglows, or accent halos. Shadows are ambient gray only.
- **Don't** invent fake terminals (red/yellow/green window-dot mockups) or stock decorative icons (`{ }`, `</>`, geometric glyphs in colored squares) to dress up documentation. Show real components.
- **Don't** describe the system as "high-performance" or "elegant"; let the components carry that claim. PRODUCT.md frames the voice as *Clean, Modern, Versatile*, not marketing maximalism.
