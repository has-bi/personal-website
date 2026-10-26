---
version: alpha.2
name: Hasbi-personal-site
description: A builder's spec sheet on a white page. Near-violet ink, one purple accent carried over from the old site and the logo, hairline rules and zero radius, where a monospace label system does most of the talking and a large Space Grotesk headline carries the hierarchy. Brand voltage comes from four domain colours (AI purple, data green, build amber, teach rose) used only on tags, stat numbers and card header strips. Everything is light; the only dark surface is a code block. Structure borrowed from itsua.com, storytelling from jithinrp.com, grid restraint from boostlab.

colors:
  primary: "#201936"
  primary-active: "#140f24"
  accent: "#6840c8"
  accent-active: "#5333a0"
  ink: "#201936"
  body: "#403954"
  muted: "#5f5a72"
  faint: "#6c667e"
  canvas: "#ffffff"
  surface: "#f8f6ff"
  surface-sunken: "#e6e3f3"
  hairline: "#ddd8ed"
  hairline-strong: "#201936"
  grid-line: "#efecf9"
  surface-dark-elevated: "#2d2642"
  on-primary: "#ffffff"
  on-dark: "#f3f0ff"
  on-dark-muted: "#a39eb3"
  domain-ai: "#6840c8"
  domain-data: "#047857"
  domain-build: "#b45309"
  domain-teach: "#be185d"
  tint-ai: "#e7e0fa"
  tint-data: "#e6f7f1"
  tint-build: "#fff2e5"
  tint-teach: "#fde8f1"
  focus-ring: "#6840c8"

typography:
  display-xl:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 120px
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: -4.8px
  display-lg:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -2.16px
  display-md:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.96px
  accent-serif:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: 52px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.5px
  stat:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -2.16px
  title-lg:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.48px
  title-md:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.4px
  body-lg:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-md:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  quote:
    fontFamily: "Space Grotesk, Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.22px
  mono-label:
    fontFamily: "JetBrains Mono, Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.72px
  mono-nav:
    fontFamily: "JetBrains Mono, Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.52px
  mono-meta:
    fontFamily: "JetBrains Mono, Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.26px
  button:
    fontFamily: "JetBrains Mono, Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.78px
  tag:
    fontFamily: "JetBrains Mono, Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.66px
  code:
    fontFamily: "JetBrains Mono, Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0

rounded:
  none: 0px
  brand: 40px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: 96px

sizing:
  tap-target: 44px
  focus-width: 2px
  focus-offset: 2px

components:
  brand-mark:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.accent}"
    rounded: "{rounded.brand}"
    size: 31px x 22px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-nav}"
    height: 56px
  nav-item:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.faint}"
    typography: "{typography.mono-nav}"
    padding: 0 16px
  nav-item-active:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-nav}"
    padding: 0 16px
  nav-location:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-label}"
    padding: 0 16px
  nav-menu-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-nav}"
    rounded: "{rounded.none}"
    padding: 0 12px
    height: "{sizing.tap-target}"
  section-label:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.faint}"
    typography: "{typography.mono-label}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px 32px
  hero-accent-line:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.accent}"
    typography: "{typography.display-xl}"
  hero-abstract:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    width: 360px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 24px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
  button-primary-arrow:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    size: 48px
  button-ghost:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 24px
    height: 48px
  button-ghost-active:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
  text-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.accent}"
    typography: "{typography.body-md}"
  text-link-active:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.accent-active}"
    typography: "{typography.body-md}"
  focus-ring:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.focus-ring}"
    width: "{sizing.focus-width}"
    offset: "{sizing.focus-offset}"
  tag-ai:
    backgroundColor: "{colors.tint-ai}"
    textColor: "{colors.domain-ai}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 4px 8px
  tag-data:
    backgroundColor: "{colors.tint-data}"
    textColor: "{colors.domain-data}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 4px 8px
  tag-build:
    backgroundColor: "{colors.tint-build}"
    textColor: "{colors.domain-build}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 4px 8px
  tag-teach:
    backgroundColor: "{colors.tint-teach}"
    textColor: "{colors.domain-teach}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 4px 8px
  stat-strip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    padding: 32px 0
  stat-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.stat}"
    padding: 24px
  router-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: 24px
  router-row-active:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: 24px
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.none}"
    padding: 16px
  project-card-header-ai:
    backgroundColor: "{colors.tint-ai}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    padding: 8px 16px
  project-card-header-data:
    backgroundColor: "{colors.tint-data}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    padding: 8px 16px
  project-card-header-build:
    backgroundColor: "{colors.tint-build}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    padding: 8px 16px
  project-card-header-teach:
    backgroundColor: "{colors.tint-teach}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    padding: 8px 16px
  project-meta:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-meta}"
  case-study-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: 96px 32px 48px
  case-study-body:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-lg}"
    width: 680px
  code-block:
    backgroundColor: "{colors.surface-dark-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    padding: 24px
  post-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    padding: 20px 0
  quote-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.quote}"
    rounded: "{rounded.none}"
    padding: 32px
  empty-state:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 32px
  avatar:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "{rounded.full}"
    size: 40px
  stack-list:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-meta}"
  about-photo:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "{rounded.none}"
  cta-band:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 96px 32px
  contact-spec-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-meta}"
    padding: 12px 0
    minHeight: "{sizing.tap-target}"
  footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-label}"
    padding: 32px
  divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.hairline-strong}"
    height: 1px
  hero-grid-line:
    backgroundColor: "{colors.grid-line}"
    width: 1px
---

## Overview

This site reads like a **specification document for a person**. The page is `{colors.canvas}` (white), type is `{colors.ink}` (a near-black violet), with 1px `{colors.hairline}` rules and zero border radius anywhere except the brand mark, dots and avatars. Every section opens with a monospace label (`§ 02 · SELECTED BUILDS`) and a slash-heading (`/work`), the nav is numbered like a table of contents (`[ 01 ] WORK`), and contact details sit in a key-value table. The metaphor is deliberate: the owner is a Solutions Architect who writes specs for a living, and the site should feel like one of his docs: precise, scannable, a little dry.

Two type voices split the work. **Space Grotesk** carries hierarchy at large sizes (a 120px hero, 72px slash-headings) with tight negative tracking. **JetBrains Mono** carries everything small: nav, labels, tags, meta, buttons. A third voice, **Instrument Serif** italic, appears at most twice per page as a moment of warmth. (The font pairing is under review, see Known Gaps.)

Colour comes from the owner's existing identity: the purple `{colors.accent}` (`#6840C8`) from the previous site, now also the colour of the logo. Brand voltage does not come from big colour fields. It comes from **four domain colours** (`{colors.domain-ai}`, `{colors.domain-data}`, `{colors.domain-build}`, `{colors.domain-teach}`) that tag every piece of work and colour the stat numbers. They appear small and often, never large. There is no dark band: the whole page stays light, and the only dark surface is `{component.code-block}`.

The proof on this site is **things built, not things claimed**. Side builds (Raspberry Pi devices, IoT, automations, AI tools) are the case studies, each written as a short story: a real problem, the wrong obvious fix, the small thing that worked, and what changed.

**Key Characteristics:**
- Canvas is white `{colors.canvas}`; cards, stat strip and the closing band sit on `{colors.surface}` (a very light lavender, the old site's `--bg-soft`) so they separate from the page without shadows.
- `{rounded.none}` everywhere. Corners are a signal of "engineered", and the system has no medium radius. Exceptions: `{component.brand-mark}` (the logo's own rounded squares), status-free dots, and avatars.
- Primary CTA is `{component.button-primary}`: ink block, white mono label, preceded by a square `{component.button-primary-arrow}` in `{colors.accent}` holding a `→`. One per viewport. This square is the only decorative arrow in the system.
- Hero headline is two lines; the second line switches to `{colors.accent}` (`{component.hero-accent-line}`).
- Domain colours appear on `{component.tag-ai}` / `-data` / `-build` / `-teach`, on stat numbers, and on project-card header strips. Nowhere else.
- Section rhythm: hero → stat strip → `/start` → `/work` → `/writing` → `/about` → `/stack` → light closing band (CTA + contact + footer).
- `{spacing.section}` (96px) between every major band, and a hairline at every band edge.

## Content Rules (from antislop audit 001)

These rules apply to every page and every piece of copy, written by the owner or by an agent.

- **No em dash** (`—`) in any visible text. Use a comma, period, colon or parentheses. Inside mono strings, the separator is ` · `. Year ranges use an en dash: `2023–25`, `2025–NOW`.
- **Only real numbers.** Every stat comes from a source the owner can point to (a case study, the CV). If a number is missing, drop the cell; never pad.
- **No testimonials until one is real and permitted.** No placeholder quote cards on a live page.
- **No unverifiable status claims.** No `(running)`, `live`, `in production` or "building in public" unless it is true today and linked to evidence. Default project meta is the year only.
- **The owner's voice is written by the owner.** An agent may draft structure, but personal statements (about paragraph, hero headline, footer line) ship only in the owner's words. Until then, mark them `[YOUR WORDS]`.
- **Placeholders are visible.** `[YOUR WORDS]`, `[REAL DATA]`, labeled image boxes. Never disguised as final.
- **Every link has a destination that exists.** No nav item, router row or button may point to an empty page or filter.

## Content Source

Content lives in the repository, not in Notion.

- Posts: `content/posts/<slug>.mdx`. Projects / case studies: `content/projects/<slug>.mdx`.
- Front matter holds the metadata the UI needs: `title`, `date`, `domain` (`ai` | `data` | `build` | `teach`), `readTime`, `excerpt`, `stack`, `cover`.
- Authoring flow: the owner uploads a piece of writing; the agent converts it to MDX and maps it onto the components in this file (`CodeBlock`, `Figure`, `Quote`, `Callout`, headings, lists), without rewriting the owner's voice.
- Stack: Next.js 15 (App Router) + Tailwind + MDX, deployed on Vercel.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}`, #201936): Primary button background. The brand action is ink, not purple.
- **Primary Active** (`{colors.primary-active}`, #140f24): Press state on primary buttons.
- **Accent** (`{colors.accent}`, #6840C8): The single interaction colour and the logo colour: the arrow square on primary CTAs, inline links, the hero's second line, the focus ring, the brand mark. Appears at most three times per viewport (the logo does not count).
- **Accent Active** (`{colors.accent-active}`, #5333A0): Press state for links.

### Surface
- **Canvas** (`{colors.canvas}`, #FFFFFF): The page floor.
- **Surface** (`{colors.surface}`, #F8F6FF): Project cards, stat strip, router table, quote cards, empty states, closing band.
- **Surface Sunken** (`{colors.surface-sunken}`, #E6E3F3): Active/pressed rows, ghost-button press, image placeholders.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}`, #2D2642): Code blocks only. The one dark surface on the site.
- **Hairline** (`{colors.hairline}`, #DDD8ED): Every 1px rule: card borders, table dividers, nav bottom edge, stat-cell separators.
- **Hairline Strong** (`{colors.hairline-strong}`, #201936): Card border on hover/focus and the ghost button outline. Replaces shadow as the "lift" signal.
- **Grid Line** (`{colors.grid-line}`, #EFECF9): Decorative vertical lines behind the hero. Never used elsewhere. (Under review, see Known Gaps.)

### Text
- **Ink** (`{colors.ink}`, #201936): Headlines, card titles, active nav, stat numbers in neutral cells. 16.75:1 on white.
- **Body** (`{colors.body}`, #403954): Running text in case studies and the hero abstract. 10.87:1.
- **Muted** (`{colors.muted}`, #5F5A72): Project meta, captions, secondary copy, placeholder labels. 6.58:1 on white, 5.22:1 on surface-sunken. Replaces the old site's 56% ink, which failed AA at 3.8:1.
- **Faint** (`{colors.faint}`, #6C667E): Section labels and inactive nav. Only uppercase mono at 12px or larger, and never on `{colors.surface-sunken}` (4.34:1, fails).
- **On Primary** (`{colors.on-primary}`, #FFFFFF), **On Dark** (`{colors.on-dark}`, #F3F0FF), **On Dark Muted** (`{colors.on-dark-muted}`, #A39EB3): Text on the primary button and inside code blocks.

### Domain Colours
They identify *what kind of work* something is, and they are only ever used small. Every pair passes 4.5:1.
- **AI** (`{colors.domain-ai}`, #6840C8) on `{colors.tint-ai}` (#E7E0FA): agents, LLM tools, computer vision. 5.21:1.
- **Data** (`{colors.domain-data}`, #047857) on `{colors.tint-data}` (#E6F7F1): analytics, pipelines, reporting automation. 4.95:1.
- **Build** (`{colors.domain-build}`, #B45309) on `{colors.tint-build}` (#FFF2E5): hardware, Raspberry Pi, IoT, physical objects. 4.56:1.
- **Teach** (`{colors.domain-teach}`, #BE185D) on `{colors.tint-teach}` (#FDE8F1): tutorials, mentoring, writing. 5.17:1. Rose, not magenta, so it does not compete with the purple accent.

AI shares its hex with `{colors.accent}` on purpose: AI is the primary domain, and the system stays at five hues total (accent/AI, data, build, teach, ink).

### Semantic
- **Focus Ring** (`{colors.focus-ring}`, #6840C8): 2px outline, 2px offset, on every focusable element.

### Dark Mode
Not shipped. The site is light only, by the owner's choice. If a toggle is added later, both modes must be fully verified (antislop R-34). Reference remap for that day: `canvas → #0e0b18`, `surface → #1a1528`, `surface-sunken → #241e36`, `hairline → #2f2843`, `ink → #f3f0ff`, `body → #cfcade`, `muted → #a39eb3`, `faint → #8c879c`, `accent → #9a7cf0`.

## Typography

### Font Family
- **Space Grotesk** (Google Fonts, free, variable 300–700): all display, titles and body. The grotesk with mono DNA; it pairs naturally with a monospace system.
- **JetBrains Mono** (free, OFL): nav, labels, tags, meta, buttons, code. Substitute: Geist Mono.
- **Instrument Serif** italic (Google Fonts, free): accent titles only.

All three are self-hosted, subset to Latin, `font-display: swap`. Paid fonts seen in the references (Berkeley Mono, Aeonik, BTG Pactual Sans) are intentionally not used.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 120px | 500 | 0.95 | −4.8px (−0.04em) | Hero headline only. Fluid: `clamp(52px, 9vw, 120px)` |
| `{typography.display-lg}` | 72px | 500 | 1.0 | −2.16px (−0.03em) | Slash-headings (`/work`), case-study title, CTA band. Fluid: `clamp(40px, 6vw, 72px)` |
| `{typography.display-md}` | 48px | 400 | 1.1 | −0.96px | Light-weight statements inside sections |
| `{typography.accent-serif}` | 52px | 400 italic | 1.05 | −0.5px | Max two per page |
| `{typography.stat}` | 72px | 500 | 1.0 | −2.16px | Stat numbers, `font-variant-numeric: tabular-nums` |
| `{typography.title-lg}` | 24px | 500 | 1.3 | −0.48px | Case-study section headings |
| `{typography.title-md}` | 20px | 500 | 1.35 | −0.4px | Project card titles, post titles |
| `{typography.body-lg}` | 19px | 400 | 1.55 | 0 | Case-study body |
| `{typography.body-md}` | 17px | 400 | 1.6 | 0 | Default running text, hero abstract |
| `{typography.body-sm}` | 15px | 400 | 1.5 | 0 | Card descriptions, quote attributions |
| `{typography.quote}` | 22px | 400 | 1.45 | −0.22px | Quotes inside articles |
| `{typography.mono-label}` | 12px | 500 | 1.4 | 0.72px (0.06em) | UPPERCASE section labels, stat labels, footer |
| `{typography.mono-nav}` | 13px | 500 | 1.0 | 0.52px | UPPERCASE nav items |
| `{typography.mono-meta}` | 13px | 400 | 1.5 | 0.26px | Stack lists, dates, project meta, contact rows |
| `{typography.button}` | 13px | 500 | 1.0 | 0.78px | UPPERCASE button labels |
| `{typography.tag}` | 11px | 500 | 1.2 | 0.66px | UPPERCASE domain tags |
| `{typography.code}` | 14px | 400 | 1.6 | 0 | Code blocks |

### Principles
- **Size and tracking make hierarchy, not weight.** The system tops out at 500.
- **Big type tracks tight, small type tracks loose.** Display goes to −0.04em; mono labels go to +0.06em and uppercase.
- **Mono is the voice for data**: dates, stacks, numbers, statuses, keys. Grotesk is for anything that is a sentence.
- Body measure is capped at 62ch (`{component.case-study-body}` width 680px).
- Separators inside mono strings use ` · ` (middle dot). Never an em dash.
- Arrows are text glyphs, never icon fonts, and only where they carry direction: `→` in the primary CTA square, `↗` on external links, `←` on a back link, `↓` on a download. No arrow on ghost links, rows or cards.

## Layout

### Spacing System
- **Base unit:** 4px; layout snaps to 8px.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.xxxl}` 64 · `{spacing.section}` 96.
- **Section padding:** `{spacing.section}` desktop, `{spacing.xxxl}` mobile.
- **Section label → heading gap:** `{spacing.lg}`. **Heading → content gap:** `{spacing.xxl}`.
- **Card internal padding:** `{spacing.md}`; quote cards and empty states `{spacing.xl}`.
- **Grid gutter:** `{spacing.xl}` desktop, `{spacing.md}` mobile. Mobile side gutter is `{spacing.md}` (16px).

### Grid & Container
- 12-column grid, max content width 1280px, centred.
- **Hero:** headline spans columns 1–8; `{component.hero-abstract}` spans 10–12, separated by a 1px vertical `{colors.hairline}` rule.
- **Stat strip:** full width, equal cells divided by 1px vertical hairlines.
- **Project grid:** 3-up desktop, 2-up tablet, 1-up mobile. Cards are equal height on purpose: this is a spec sheet, and uniformity is the point.
- **Case study:** single centred column at `{component.case-study-body}` width, with a sticky meta column on the left at desktop.

### Page Composition (Home)
```
[logo] HASBI HASSADIQIN  [ 00 ] INDEX  [ 01 ] WORK  [ 02 ] WRITING  [ 03 ] ABOUT  [ 04 ] CONTACT     JAKARTA · UTC+7

§ 00 · PROFILE               hero-band (headline + accent line | abstract + button-primary)
                             stat-strip (real numbers only)
§ 01 · START HERE  /start    router table: YOU ARE · START WITH · LEADS TO (3 rows)
§ 02 · SELECTED BUILDS /work project-card grid → case-study pages
§ 03 · WRITING  /writing     post-rows (band hidden until ≥ 2 posts are published)
§ 04 · PROFILE  /about       about-photo + owner's paragraph + career line (no quote cards yet)
§ 05 · RUNTIME  /stack       stack-lists
§ 06 · CONTACT               cta-band (light) + contact-spec-rows + footer
```

### Routes that must exist when Home ships
Every destination on Home must be a real page: `/about`, `/work`, `/work/order-to-erp`, `/writing`, the CV PDF, `mailto:` and the external profiles. A row or link whose page does not exist yet is removed, not left dead.

### Case-Study Composition
Every `/work/<slug>` page follows the same seven headings (adapted from jithinrp.com's Parcel Sorter story):
1. **Meta** (`{component.project-meta}`): domain · stack · year · time spent (status only if verifiable)
2. **The problem**: one concrete scene: who, when, what hurt
3. **Why the obvious fix wasn't it**
4. **What I built**: the smallest thing that worked, with one real photo or diagram
5. **How it works**: architecture, `{component.code-block}` allowed
6. **What changed**: a number, or an honest before/after
7. **What I'd do next**

400–800 words. Real photos of hardware beat mockups.

### Whitespace Philosophy
Whitespace is structured, not airy: it is bounded by hairlines. Every band has a top rule, every cell has a side rule. The hero gets the most air (`{spacing.section}` above and below), and density increases as the visitor scrolls into evidence.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No border, no shadow | Canvas sections, nav, section labels |
| Hairline | 1px `{colors.hairline}` | Cards, table rows, stat cells, nav bottom edge |
| Lifted | 1px `{colors.hairline-strong}` border | Card hover/focus, ghost button outline |
| Surface step | `{colors.surface}` on `{colors.canvas}` | Cards, stat strip and closing band read as separate through tone alone |

There are **no box-shadows** in the system. Depth comes from tone steps and border weight.

### Decorative Depth
- **Hero grid lines:** vertical 1px lines in `{colors.grid-line}` at every other column, hero only. (Under review, see Known Gaps.)
- **Line-art illustrations** (optional, boostlab pattern): isometric single-weight strokes in a domain colour, used as section art instead of stock imagery. Never filled.
- **Real photography** of hardware builds is the main depth source on case-study pages.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Everything: buttons, cards, tags, inputs, images, code blocks, focus rings |
| `{rounded.brand}` | 40px (in the 512px logo grid) | The brand mark's six squares only |
| `{rounded.full}` | 9999px | Avatars only |

### Photography Geometry
- Project card thumbnails: 3 images in a row, 4:3 each, square corners, separated by 4px.
- Case-study hero image: 16:9, full content width.
- About photo: 4:5 portrait.
- Avatars: 40px circles.
- Images get a 1px `{colors.hairline}` border so white-background screenshots don't dissolve into the card.

## Components

### Brand

**`brand-mark`**: the logo, six rounded squares in `{colors.accent}`. Sits at the left of the nav before the name. The PNGs in `public/images/` (`#6A55F2`) must be re-exported in `#6840C8`, ideally as SVG.

### Navigation

**`top-nav`**: 56px sticky bar on `{colors.canvas}` with a 1px bottom hairline. Brand mark + name at left, numbered items in `{typography.mono-nav}`, `{component.nav-location}` at right. Each item is separated by a 1px vertical hairline (itsua pattern).

**`nav-item`** / **`nav-item-active`**: `[ 01 ] WORK` format. Inactive in `{colors.faint}`, active in `{colors.ink}`. Active state follows the current page (and scroll position on Home).

**`nav-location`**: `JAKARTA · UTC+7` in `{typography.mono-label}`, `{colors.muted}`. A fact, not a status: no dot, no pulse. If an "open to roles" message is ever needed, it replaces this text only while true.

**`nav-menu-button`** (mobile): `[ MENU ]` in a 44px-tall box with a 1px `{colors.hairline-strong}` border, opening a full-screen numbered list.

### Section Furniture

**`section-label`**: `§ 0N · TITLE`, `{typography.mono-label}`, `{colors.faint}`, uppercase. Always `{spacing.lg}` above the slash-heading.

**Slash-heading**: `/work`, `/start`, `/stack` in `{typography.display-lg}`. A "more" link (`SHOW ALL`, `{component.button-ghost}` styling without border, no arrow) aligns right on the same baseline.

### Hero

**`hero-band`**: `{colors.canvas}` with grid lines, headline in `{typography.display-xl}`. The second line uses `{component.hero-accent-line}` (`{colors.accent}`).

**`hero-abstract`**: right column: an `ABSTRACT` `{component.section-label}`, 2–3 sentences in `{typography.body-md}` (role, what gets built, Jakarta · UTC+7), then one `{component.button-primary}` labelled `SEE THE BUILDS`.

### Buttons

**`button-primary`**: `{colors.primary}` block, `{colors.on-primary}` label in `{typography.button}`, `{rounded.none}`, 48px tall. Preceded by **`button-primary-arrow`**: a 48px `{colors.accent}` square holding `→`. On hover the label shifts 4px right; on press it becomes `{component.button-primary-active}`. Used for the hero CTA and the closing CTA.

**`button-ghost`**: `{colors.canvas}` with 1px `{colors.hairline-strong}` outline, `{colors.ink}` label, no arrow. Press: `{component.button-ghost-active}`.

**`text-link`**: `{colors.accent}`, underline drawn on hover (1px, animates left → right). Press: `{component.text-link-active}`. External links end with `↗`.

### States

**`focus-ring`**: every interactive element (buttons, nav items, router rows, cards, post rows, links) gets a `:focus-visible` outline: `{sizing.focus-width}` solid `{colors.focus-ring}`, `{sizing.focus-offset}` offset, square corners. `outline: none` is never used without it.

**Tap targets**: every control is at least `{sizing.tap-target}` (44px) tall on touch screens, using padding or a larger hit box when the visual is smaller (menu button, contact rows, back-to-top).

**`empty-state`**: `{colors.surface}` box, 1px hairline, `{spacing.xl}` padding. A mono-label title in `{colors.muted}` (`NO POSTS YET`), one plain sentence of fact, and one real next action as `{component.button-ghost}` (`SEE THE BUILDS`, `DOWNLOAD THE CV ↓`). No illustration, no promise of future content.
- `/writing` with fewer than 2 published posts: the band is not rendered on Home; `/writing` itself shows the empty state.
- `/work` with no published case studies: the empty state replaces the grid on Home and on `/work`.
- Content is static MDX, so loading and error states are not needed; any future client-side fetch must add them.

### Data Display

**`stat-strip`** / **`stat-cell`**: each cell: label (`{typography.mono-label}`) on top, number (`{typography.stat}`) in the centre, caption (`{typography.mono-label}`, `{colors.muted}`) below. Number colour rotates through the domain colours, with the last cell in `{colors.ink}`. Suffixes (`%`, `s`, `M`) render at 50% size. Only real numbers; drop a cell before padding one.

**`stack-list`**: column header in `{typography.mono-label}`, items in `{typography.mono-meta}` each ending with `●` in the domain colour of that column.

### Router (`/start`)

**`router-row`**: three columns: **YOU ARE** · **START WITH** · **LEADS TO**, headers in `{typography.mono-label}` numbered `01 · 02 · 03`. The whole row is one link; no arrow column. Active/hover: `{component.router-row-active}`. Rows:

| You are | Start with | Leads to |
|---|---|---|
| Hiring for AI, data or solutions work | The 3-minute overview + CV | `/about` |
| Learning AI, data or automation | The beginner tutorial series | `/writing` |
| Sitting on a workflow worth automating | A real automation build | `/work/order-to-erp` |

A fourth row ("Just curious → side builds") returns only when at least one BUILD case study exists.

### Cards & Containers

**`project-card`**: `{colors.surface}`, 1px hairline, `{rounded.none}`. Top: a header strip (`{component.project-card-header-ai}` / `-data` / `-build` / `-teach`) with `§ 00N` and the year. Then 3 thumbnails, title in `{typography.title-md}`, one-line outcome in `{typography.body-sm}`, domain tag, and stack line in `{component.project-meta}` (`PYTHON · RASPBERRY PI · FASTAPI`). Hover: border becomes `{colors.hairline-strong}`. No shadow, no scale.

**`tag-ai` / `tag-data` / `tag-build` / `tag-teach`**: `{typography.tag}`, uppercase, tint background with domain-colour text, 4px × 8px padding.

**`quote-card`**: quote in `{typography.quote}`, then `{component.avatar}` + name (`{typography.body-sm}`, 500) + role and relationship in `{typography.mono-label}`. Used inside articles for quotes that are part of the story. On Home, only once a real testimonial exists and the person has given permission.

**`post-row`**: `DATE · TAG · TITLE · READ TIME` on one line, hairline between rows, title in `{typography.title-md}`. No arrow.

### Case Study

**`case-study-header`**: title in `{typography.display-lg}`, one-line outcome below in `{typography.display-md}` `{colors.muted}`, then `{component.project-meta}` as a key-value block.

**`case-study-body`**: `{typography.body-lg}` in `{colors.body}`, 680px measure, section headings in `{typography.title-lg}`.

**`code-block`**: `{colors.surface-dark-elevated}`, `{typography.code}`, `{rounded.none}`, filename label on top in `{typography.mono-label}`.

### Closing

**`cta-band`**: full-bleed `{colors.surface}` with a top hairline. Headline in `{typography.display-lg}` `{colors.ink}` ("Have something worth building?"), with `{component.button-primary}` (`START A CONVERSATION`).

**`contact-spec-row`**: key-value rows in `{typography.mono-meta}`, min height 44px: `EMAIL · LINKEDIN · GITHUB · TIMEZONE WIB / UTC+7 · RESPONSE < 24H · CV ↓ PDF`. Keys in `{colors.muted}`, values in `{colors.ink}`.

**`footer`**: same surface. `© YEAR NAME` left, an optional one-line personal note centre (owner's own words only), `BACK TO TOP ↑` right in a 44px hit area, all in `{typography.mono-label}`.

## Motion

Motion is light, boostlab-level. Every rule below is disabled under `prefers-reduced-motion: reduce`.

| Pattern | Spec |
|---|---|
| Reveal on scroll | Opacity 0 → 1, translateY 12px → 0, 400ms, `cubic-bezier(.2,.7,.2,1)`, stagger 60ms, once only |
| Stat count-up | 0 → value over 800ms on first view |
| Link underline | Width 0 → 100%, 200ms |
| Button arrow nudge | Label translateX 4px, 150ms |
| Card lift | Border colour change only, 150ms |
| Smooth scroll | Lenis, optional |
| Signature moment | **One** allowed: terminal-style typing on the hero headline, *or* a small live widget (e.g. now-playing from the LED display build). Loads after content, never blocks it |

Not allowed: intro loaders, WebGL backgrounds, sound, scroll-hijacking, "best viewed on desktop" gates, pulsing status dots.

## Do's and Don'ts

### Do
- Keep `{component.button-primary}` ink with the `{colors.accent}` arrow square. One per viewport.
- Open every section with `{component.section-label}` + slash-heading.
- Put anything that is data (dates, stacks, numbers) in mono; put anything that is a sentence in Space Grotesk.
- Use domain colours small and often: tags, stat numbers, header strips.
- Write every case study with the seven-heading story structure.
- Lead with an outcome sentence, not a job title.
- Use real photos of real hardware.
- Keep `{spacing.section}` between bands and a hairline at every band edge.
- Give every interactive element a visible focus ring and a 44px touch target.

### Don't
- Don't use an em dash anywhere in visible text.
- Don't round corners. `{rounded.none}` is the system; the brand mark and avatars are the only exceptions.
- Don't add box-shadows. Use `{colors.hairline-strong}` or a tone step.
- Don't bold past 500.
- Don't fill large areas with colour. No dark bands; the page stays light.
- Don't introduce a sixth hue, or a second purple.
- Don't put arrows on ghost links, rows or cards.
- Don't add decorative stripes, edge markers or status dots that mark no real state.
- Don't show client names or client screenshots. Describe the role, not the clients.
- Don't invent or pad stats, statuses or testimonials.
- Don't use `{colors.faint}` for sentences, below 12px, or on `{colors.surface-sunken}`.
- Don't link to a page or filter that has no content.
- Don't copy the reference sites' heavy pieces: itsua's density, jithinrp's WebGL intro, boostlab's 220px outline words.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Nav collapses to the `[ MENU ]` button opening a full-screen numbered list; hero stacks (headline, then abstract); stat strip becomes 2-col grid; router rows stack as cards; project grid 1-up; case-study meta moves above the title |
| Tablet | 768–1024px | Nav stays horizontal with labels shortened to `[ 01 ]`; project grid 2-up; stat strip 3 + 2 |
| Desktop | 1024–1440px | Full layout as specified |
| Wide | > 1440px | Content caps at 1280px; outer margin grows, type does not |

### Touch Targets
- Buttons are 48px tall. Router rows, nav items, the menu button, contact rows and back-to-top are 44px or more.
- Tags are not interactive on Home; on `/work` filter chips they grow to 32px visual height inside a 44px hit area.

### Collapsing Strategy
- Reduce columns, never scale cards down.
- Display type is fluid via `clamp()`; the hero must fit in 3 lines at 375px.
- Mono labels never go below 11px.

### Image Behavior
- Project-card thumbnails drop from 3 to 1 on mobile (first image only).
- Case-study images go full-bleed on mobile.

## Accessibility & Performance

- Body text ≥ 4.5:1 contrast on its surface; every token pair in this file is listed with its ratio.
- 2px `{colors.focus-ring}` outline with 2px offset on every focusable element (`:focus-visible`).
- Full keyboard navigation; skip-to-content link.
- Alt text on every build photo describing what the hardware does.
- LCP < 2.0s on mobile 4G; home page JS < 50KB; fonts self-hosted and subset.
- OG images generated per page in this style (title in Space Grotesk, meta in mono, on `{colors.canvas}`).

## Quality Filter (antislop)

This file is the **direction**. The antislop plugin (`antislop@anti-slop`, enabled in `.claude/settings.json`) is the **filter** applied on top of it. Audits and fix reports live in `anti-slop/`. When this file asks for a pattern antislop names as slop, the agent asks the owner to keep or drop it and records the answer here.

Logged decisions:
- 2026-10-26, audit 001: em dash in section labels → **dropped** (now ` · `).
- 2026-10-26, audit 001: "BUILDING IN PUBLIC" status pill → **dropped** (now `JAKARTA · UTC+7`).
- 2026-10-26, audit 001: left-edge domain markers → **dropped**.
- 2026-10-26, audit 001: dark closing band → **dropped** (owner: keep the page light).
- 2026-10-26, audit 001: logo and accent unified to `#6840C8`.

## Iteration Guide

1. Work on ONE component at a time and reference its YAML key (`{component.project-card}`, `{component.stat-cell}`).
2. New component? Decide first whether it is **furniture** (labels, nav, tables: mono, faint/muted) or **content** (cards, case studies: grotesk, ink/body). Mixing the two voices inside one element breaks the system.
3. Variants (`-active`, domain variants like `-ai`) live as separate entries in `components:`, never as nested objects.
4. Use `{token.refs}` in prose; write a hex at most once next to its reference.
5. When in doubt about emphasis: bigger before bolder, mono label before colour, hairline before shadow.
6. Run `npx @google/design.md lint DESIGN.md` after edits.

## Known Gaps

**Owner decisions pending (antislop audit 001):**
- **#12 Hero grid lines.** A background grid is a named pattern; on white the lines are also almost invisible (1.23:1). Keep (with the reason logged) or drop.
- **#13 Fonts.** Space Grotesk and JetBrains Mono are both on the "AI default" roster, and uppercase mono labels are used heavily. Keep with the spec-sheet reason, or return to the old site's Manrope + Newsreader. Either way, consider limiting uppercase mono to labels.

**Open audit items (not yet approved):**
- #18 Interactive containers (cards, router rows) separate from white by a 1.39:1 hairline; non-text contrast for clickable boundaries should reach 3:1.
- #19 Stat strip directly under the hero follows the "hero + stats" template; consider moving the proof next to the related cards.
- #20, #21 No Design Read or dials yet. Proposal: "Reading this as: personal portfolio for hiring managers and learners, spec-sheet language, ENERGY 2 / RHYTHM 2 / MOTION 1." With RHYTHM 2, at least one section should break the label + slash-heading pattern.
- #22 Hero headline "Practical AI, built to ship." is a placeholder and fails the swap test.
- #24 `/stack` "TEACHING" column repeats `/start` and the career line.
- #26 The accent-serif "Selected builds" and the stat suffix sizing need a one-line reason or removal.

**Content not yet decided:** final hero headline, the about paragraph (`[YOUR WORDS]`), which 4–6 builds go in `/work` (side builds vs day-job work, and whether photos exist), the about photo, testimonial permissions.

**Other:**
- **Signature moment** (terminal hero vs. live widget vs. none) is undecided.
- The logo PNGs still use `#6A55F2`; re-export in `#6840C8`.
- Form components (contact form, newsletter) are out of scope; contact is email-only for now.
- Line-art illustration style is described but no assets exist yet.
- Fluid type values (`clamp()`) are documented in prose because the token format holds fixed sizes only.
- Link and focus-ring components declare `{colors.canvas}` as background for contrast linting; in practice they inherit whatever surface they sit on (accent passes AA on canvas, surface and surface-sunken).
