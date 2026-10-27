---
version: alpha.3
name: Hasbi-personal-site
description: A teacher's lab notebook on a white page. Bilingual (EN / ID) tutorials and notes on AI and automation, plus personal projects. Near-violet ink, one purple accent carried over from the old site and the logo, hairline rules and zero radius, where a monospace label system does most of the talking and a large Space Grotesk headline carries the hierarchy. Two topic colours (AI purple, automation green) appear only on tags and card header strips. Everything is light; the only dark surface is a code block. Structure borrowed from itsua.com, storytelling from jithinrp.com, grid restraint from boostlab.

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
  domain-automation: "#047857"
  tint-ai: "#e7e0fa"
  tint-automation: "#e6f7f1"
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
  language-toggle:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.faint}"
    textColorActive: "{colors.ink}"
    typography: "{typography.mono-nav}"
    padding: 0 16px
    minHeight: "{sizing.tap-target}"
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
  tag-automation:
    backgroundColor: "{colors.tint-automation}"
    textColor: "{colors.domain-automation}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 4px 8px
  tag-web:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.muted}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 4px 8px
  type-label:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-label}"
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
  project-card-header-automation:
    backgroundColor: "{colors.tint-automation}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    padding: 8px 16px
  project-card-header-web:
    backgroundColor: "{colors.surface-sunken}"
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
  filter-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 0 12px
    height: 32px
    hitArea: "{sizing.tap-target}"
  filter-chip-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: 0 12px
    height: 32px
  year-group:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    padding: 12px 0
  lesson-brief:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 24px
  callout:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 24px
  next-lesson:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.none}"
    padding: 24px
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
  footer-band:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.none}"
    padding: 64px 96px 32px
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

This site reads like a **teacher's lab notebook**: numbered sections, plain labels, nothing hidden. It exists to teach AI and automation through bilingual (English / Bahasa Indonesia) tutorials and notes, plus a few personal projects. It is not a portfolio of client work: that work is under NDA and never appears here. The page is `{colors.canvas}` (white), type is `{colors.ink}` (a near-black violet), with 1px `{colors.hairline}` rules and zero border radius anywhere except the brand mark and avatars. Every section opens with a monospace label (`§ 01 · WRITING`) and a slash-heading (`/writing`), the nav is numbered like a table of contents (`[ 01 ] WRITING`), and the footer lists where else to find the owner in a key-value table. The metaphor is deliberate: a course syllabus is precise and scannable, and so is this site.

**Design Read:** a bilingual teaching site for beginner-to-intermediate learners of AI and automation, in a lab-notebook / spec-sheet language. **Dials: ENERGY 2 / RHYTHM 2 / MOTION 1.** RHYTHM 2 means the label + slash-heading pattern repeats, with at least one deliberate break (on Home, `/about` is a split layout without a slash-heading).

Two type voices split the work. **Space Grotesk** carries hierarchy at large sizes (a 120px hero, 72px slash-headings) with tight negative tracking. **JetBrains Mono** carries everything small: nav, labels, tags, meta, buttons. A third voice, **Instrument Serif** italic, appears at most twice per page as a moment of warmth. (The font pairing is under review, see Known Gaps.)

Colour comes from the owner's existing identity: the purple `{colors.accent}` (`#6840C8`) from the previous site, now also the colour of the logo. Brand voltage does not come from big colour fields. It comes from **two topic colours** (`{colors.domain-ai}`, `{colors.domain-automation}`) that tag every post and project. They appear small and often, never large. Anything outside the two teaching topics (older React posts, web projects) gets the neutral `{component.tag-web}`: no hue. There is no dark band: the whole page stays light, and the only dark surface is `{component.code-block}`.

The proof on this site is **lessons that work, not claims**. A tutorial earns its place when a beginner can follow it to a working result. Personal projects are written as short stories: a real problem, the wrong obvious fix, the small thing that worked, and what changed.

**Key Characteristics:**
- Canvas is white `{colors.canvas}`; cards, the router table and the footer band sit on `{colors.surface}` (a very light lavender, the old site's `--bg-soft`) so they separate from the page without shadows.
- `{rounded.none}` everywhere. Corners are a signal of "engineered", and the system has no medium radius. Exceptions: `{component.brand-mark}` (the logo's own rounded squares), status-free dots, and avatars.
- Primary CTA is `{component.button-primary}`: ink block, white mono label, preceded by a square `{component.button-primary-arrow}` in `{colors.accent}` holding a `→`. One per viewport. This square is the only decorative arrow in the system.
- Hero headline is two lines; the second line switches to `{colors.accent}` (`{component.hero-accent-line}`).
- Topic colours appear on `{component.tag-ai}` / `{component.tag-automation}` and on project-card header strips. Nowhere else.
- Section rhythm on Home: hero → `/start` → `/writing` → `/projects` → about (split) → footer band ("Elsewhere").
- `{spacing.section}` (96px) between every major band, and a hairline at every band edge.

## Content Rules (from antislop audit 001)

These rules apply to every page and every piece of copy, written by the owner or by an agent.

- **No em dash** (`—`) in any visible text. Use a comma, period, colon or parentheses. Inside mono strings, the separator is ` · `. Year ranges use an en dash: `2023–25`, `2025–NOW`.
- **Only real numbers.** Every number comes from a source the owner can point to. If a number is missing, drop the cell; never pad.
- **No testimonials until one is real and permitted.** No placeholder quote cards on a live page.
- **No unverifiable status claims.** No `(running)`, `live`, `in production` or "building in public" unless it is true today and linked to evidence. Default project meta is the year only.
- **The owner's voice is written by the owner.** An agent may draft structure, but personal statements (about paragraph, hero headline, footer line) ship only in the owner's words. Until then, mark them `[YOUR WORDS]`.
- **Placeholders are visible.** `[YOUR WORDS]`, `[REAL DATA]`, labeled image boxes. Never disguised as final.
- **Every link has a destination that exists.** No nav item, router row or button may point to an empty page or filter. A router row ships only when its destination has at least one published post.
- **No client or employer work.** Day-job projects, their screenshots and their numbers are under NDA. They do not appear anywhere: not as projects, not as stats, not as anonymised case studies.
- **Descriptive beats personal in the hero.** The hero says what the site is ("Notes on AI & automation."); personal statements live in `/about` and are written by the owner.

## Content Model

Content lives in the repository, not in Notion. The site is **read-only by design**: no newsletter, no sales CTA. Contact is the footer band.

- **Writing** (`content/writing/<slug>.<lang>.mdx`): one section, two types.
  - `TUTORIAL`: step-by-step, ends with a working result.
  - `NOTE`: a mental model, opinion or explainer.
- **Topics:** `ai` (LLMs, RAG, agents, prompting) and `automation` (n8n, workflow automation, APIs). Older off-topic posts keep `web` and the neutral tag.
- **Languages:** each post exists in `en`, `id`, or both. Files share a slug: `rag-mental-models.en.mdx` and `rag-mental-models.id.mdx`. The list shows `EN`, `ID` or `EN · ID`. Indonesian pages live under `/id/...`.
- **Projects** (`content/projects/<slug>.mdx`): personal projects only.
- Front matter: `title`, `date`, `type` (`tutorial` | `note`), `topic` (`ai` | `automation` | `web`), `lang`, `readTime`, `excerpt`, `cover`, `draft`, `tags`. Tutorials add `level` (`beginner` | `intermediate`), `learn` (3 to 5 lines, taken from the post's own headings), `prerequisites` and `check` (one task that proves it works), all written or approved by the owner. Projects add `stack` and `year`.
- Authoring flow: the owner uploads a piece of writing; the agent converts it to MDX and maps it onto the components in this file (`CodeBlock`, `Figure`, `Quote`, `Callout`, headings, lists), without rewriting the owner's voice. A translation is a separate file, never machine-filled without the owner's review.
- RSS: `/feed.xml` (and `/id/feed.xml`), generated from the MDX at build time.
- Stack: Next.js 15 (App Router) + Tailwind + MDX, deployed on Vercel.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}`, #201936): Primary button background. The brand action is ink, not purple.
- **Primary Active** (`{colors.primary-active}`, #140f24): Press state on primary buttons.
- **Accent** (`{colors.accent}`, #6840C8): The single interaction colour and the logo colour: the arrow square on primary CTAs, inline links, the hero's second line, the focus ring, the brand mark. Appears at most three times per viewport (the logo does not count).
- **Accent Active** (`{colors.accent-active}`, #5333A0): Press state for links.

### Surface
- **Canvas** (`{colors.canvas}`, #FFFFFF): The page floor.
- **Surface** (`{colors.surface}`, #F8F6FF): Project cards, router table, quote cards, empty states, footer band.
- **Surface Sunken** (`{colors.surface-sunken}`, #E6E3F3): Active/pressed rows, ghost-button press, image placeholders.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}`, #2D2642): Code blocks only. The one dark surface on the site.
- **Hairline** (`{colors.hairline}`, #DDD8ED): Every 1px rule: card borders, table dividers, nav bottom edge, stat-cell separators.
- **Hairline Strong** (`{colors.hairline-strong}`, #201936): Card border on hover/focus and the ghost button outline. Replaces shadow as the "lift" signal.
- **Grid Line** (`{colors.grid-line}`, #EFECF9): Decorative vertical lines behind the hero. Never used elsewhere. (Under review, see Known Gaps.)

### Text
- **Ink** (`{colors.ink}`, #201936): Headlines, card titles, active nav. 16.75:1 on white.
- **Body** (`{colors.body}`, #403954): Running text in articles and the hero abstract. 10.87:1.
- **Muted** (`{colors.muted}`, #5F5A72): Project meta, captions, secondary copy, placeholder labels. 6.58:1 on white, 5.22:1 on surface-sunken. Replaces the old site's 56% ink, which failed AA at 3.8:1.
- **Faint** (`{colors.faint}`, #6C667E): Section labels and inactive nav. Only uppercase mono at 12px or larger, and never on `{colors.surface-sunken}` (4.34:1, fails).
- **On Primary** (`{colors.on-primary}`, #FFFFFF), **On Dark** (`{colors.on-dark}`, #F3F0FF), **On Dark Muted** (`{colors.on-dark-muted}`, #A39EB3): Text on the primary button and inside code blocks.

### Topic Colours
They identify *what a post or project is about*, and they are only ever used small. Every pair passes 4.5:1.
- **AI** (`{colors.domain-ai}`, #6840C8) on `{colors.tint-ai}` (#E7E0FA): LLMs, RAG, agents, prompting. 5.21:1.
- **Automation** (`{colors.domain-automation}`, #047857) on `{colors.tint-automation}` (#E6F7F1): n8n, workflow automation, APIs. 4.95:1.
- **Web** (neutral, `{colors.muted}` on `{colors.surface-sunken}`): off-topic archive. 5.22:1. No hue on purpose, so it reads as secondary.

AI shares its hex with `{colors.accent}` on purpose: AI is the primary topic, and the system stays at three hues total (accent/AI, automation green, ink).

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
| `{typography.display-lg}` | 72px | 500 | 1.0 | −2.16px (−0.03em) | Slash-headings (`/writing`), article and project titles. Fluid: `clamp(40px, 6vw, 72px)` |
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
- **Project grid:** 2-up desktop and tablet (3-up once there are 3+ projects), 1-up mobile. Cards are equal height on purpose: this is a spec sheet, and uniformity is the point.
- **Case study:** single centred column at `{component.case-study-body}` width, with a sticky meta column on the left at desktop.

### Page Composition (Home)
```
[logo] HASBI HASSADIQIN  [ 00 ] INDEX  [ 01 ] WRITING  [ 02 ] PROJECTS  [ 03 ] ABOUT            EN / ID

§ 00 · INDEX                 hero-band ("Notes on AI / & automation." | abstract + START READING)
§ 00.1 · START HERE  /start  router table: YOU ARE · START WITH · LEADS TO (3 rows)
§ 01 · WRITING  /writing     latest post-rows (band hidden until ≥ 2 posts are published)
§ 02 · PROJECTS  /projects   project-card grid (personal projects only)
§ 03 · ABOUT                 split: about-photo | owner's paragraph + teaching & learning line
§ 04 · ELSEWHERE             footer-band: EMAIL · LINKEDIN · GITHUB · RSS, © + back to top
```
Section numbers match the nav numbers. There is no stat strip: the only numbers available came from NDA work. `{component.stat-strip}` stays in the system for real teaching numbers later (e.g. published tutorials, learners taught, with a source).

### Routes that must exist when Home ships
Every destination on Home must be a real page: `/writing`, `/writing?topic=ai`, `/writing?topic=automation`, `/projects`, `/about`, `/id`, `/feed.xml`, `mailto:` and the external profiles. A row or link whose page is empty is removed, not left dead.

### Project Write-up Composition
Every `/projects/<slug>` page follows the same seven headings (adapted from jithinrp.com's Parcel Sorter story):
1. **Meta** (`{component.project-meta}`): topic · stack · year · time spent (status only if verifiable)
2. **The problem**: one concrete scene: who, when, what hurt
3. **Why the obvious fix wasn't it**
4. **What I built**: the smallest thing that worked, with one real photo or diagram
5. **How it works**: architecture, `{component.code-block}` allowed
6. **What changed**: a number, or an honest before/after
7. **What I'd do next**

400–800 words. Real screenshots and photos beat mockups.

### Whitespace Philosophy
Whitespace is structured, not airy: it is bounded by hairlines. Every band has a top rule, every cell has a side rule. The hero gets the most air (`{spacing.section}` above and below), and density increases as the visitor scrolls into evidence.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No border, no shadow | Canvas sections, nav, section labels |
| Hairline | 1px `{colors.hairline}` | Cards, table rows, stat cells, nav bottom edge |
| Lifted | 1px `{colors.hairline-strong}` border | Card hover/focus, ghost button outline |
| Surface step | `{colors.surface}` on `{colors.canvas}` | Cards, router table and footer band read as separate through tone alone |

There are **no box-shadows** in the system. Depth comes from tone steps and border weight.

### Decorative Depth
- **Hero grid lines:** vertical 1px lines in `{colors.grid-line}` at every other column, hero only. (Under review, see Known Gaps.)
- **Line-art illustrations** (optional, Loop/boostlab pattern): isometric flat vector, thick uniform `{colors.ink}` outlines, white objects, flat solid `{colors.accent}` fills on key surfaces, hard-edged solid `{colors.ink}` shadows, thin wireframe guide lines. No gradients, no text inside the image. Used as section art instead of stock imagery.
- **Real screenshots and photos** of the owner's own builds are the main depth source on article and project pages.

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

**`top-nav`**: 56px sticky bar on `{colors.canvas}` with a 1px bottom hairline. Brand mark + name at left, numbered items in `{typography.mono-nav}` (`[ 00 ] INDEX`, `[ 01 ] WRITING`, `[ 02 ] PROJECTS`, `[ 03 ] ABOUT`), `{component.language-toggle}` at right. Each item is separated by a 1px vertical hairline (itsua pattern). No contact item: contact lives in the footer.

**`nav-item`** / **`nav-item-active`**: inactive in `{colors.faint}`, active in `{colors.ink}`. Active state follows the current page (and scroll position on Home).

**`language-toggle`**: `EN / ID`, current language in `{colors.ink}`, the other in `{colors.faint}`. Switching goes to the translation of the current page if it exists, otherwise to the index of the other language. Never a dead switch.

**`nav-menu-button`** (mobile): `[ MENU ]` in a 44px-tall box with a 1px `{colors.hairline-strong}` border, opening a full-screen numbered list. The language toggle stays visible next to it.

### Section Furniture

**`section-label`**: `§ 0N · TITLE`, `{typography.mono-label}`, `{colors.faint}`, uppercase. Always `{spacing.lg}` above the slash-heading.

**Slash-heading**: `/writing`, `/projects`, `/start` in `{typography.display-lg}`. A "more" link (`SHOW ALL`, `{component.button-ghost}` styling without border, no arrow) aligns right on the same baseline.

### Hero

**`hero-band`**: `{colors.canvas}` with grid lines, headline in `{typography.display-xl}`. The second line uses `{component.hero-accent-line}` (`{colors.accent}`).

**`hero-abstract`**: right column: an `ABSTRACT` `{component.section-label}`, 2–3 sentences in `{typography.body-md}` (what is taught, by whom). Mention both languages only once at least one Indonesian post is published, then one `{component.button-primary}` labelled `START READING`.

### Buttons

**`button-primary`**: `{colors.primary}` block, `{colors.on-primary}` label in `{typography.button}`, `{rounded.none}`, 48px tall. Preceded by **`button-primary-arrow`**: a 48px `{colors.accent}` square holding `→`. On hover the label shifts 4px right; on press it becomes `{component.button-primary-active}`. Used for the hero CTA (`START READING`) and at the end of a tutorial (next lesson).

**`button-ghost`**: `{colors.canvas}` with 1px `{colors.hairline-strong}` outline, `{colors.ink}` label, no arrow. Press: `{component.button-ghost-active}`.

**`text-link`**: `{colors.accent}`, underline drawn on hover (1px, animates left → right). Press: `{component.text-link-active}`. External links end with `↗`.

### States

**`focus-ring`**: every interactive element (buttons, nav items, router rows, cards, post rows, links) gets a `:focus-visible` outline: `{sizing.focus-width}` solid `{colors.focus-ring}`, `{sizing.focus-offset}` offset, square corners. `outline: none` is never used without it.

**Tap targets**: every control is at least `{sizing.tap-target}` (44px) tall on touch screens, using padding or a larger hit box when the visual is smaller (menu button, contact rows, back-to-top).

**`empty-state`**: `{colors.surface}` box, 1px hairline, `{spacing.xl}` padding. A mono-label title in `{colors.muted}` (`NO POSTS YET`), one plain sentence of fact, and one real next action as `{component.button-ghost}` (`SEE THE PROJECTS`, `READ THE TUTORIALS`). No illustration, no promise of future content.
- `/writing` with fewer than 2 published posts: the band is not rendered on Home; `/writing` itself shows the empty state.
- `/writing?topic=…` or `/id` with no posts: the empty state, and the matching router row is hidden on Home.
- `/projects` with nothing published: the empty state replaces the grid on Home and on `/projects`.
- Content is static MDX, so loading and error states are not needed; any future client-side fetch must add them.

### Data Display

**`stat-strip`** / **`stat-cell`** (reserved, not on Home today): each cell: label (`{typography.mono-label}`) on top, number (`{typography.stat}`) in the centre, caption (`{typography.mono-label}`, `{colors.muted}`) below. Suffixes render at 50% size. Only real numbers with a source; drop a cell before padding one. Never numbers from NDA work.

**`stack-list`** (reserved): column header in `{typography.mono-label}`, items in `{typography.mono-meta}`.

### Router (`/start`)

**`router-row`**: three columns: **YOU ARE** · **START WITH** · **LEADS TO**, headers in `{typography.mono-label}` numbered `01 · 02 · 03`. The whole row is one link; no arrow column. Active/hover: `{component.router-row-active}`. Rows:

| You are | Start with | Leads to |
|---|---|---|
| New to AI and LLMs | Mental models before code | `/writing?topic=ai` |
| Want to automate a real workflow | Step-by-step automation tutorials | `/writing?topic=automation` |
| Lebih nyaman baca Bahasa Indonesia | Semua tulisan versi Indonesia | `/id` |

The third row is written in Indonesian on purpose: it addresses Indonesian readers on the English page. On `/id`, it flips to "Prefer reading in English → `/`". A row is hidden while its destination has no published post.

### Cards & Containers

**`project-card`**: `{colors.surface}`, 1px hairline, `{rounded.none}`. Top: a header strip (`{component.project-card-header-ai}` / `-automation` / `-web`) with `§ 00N` and the year. Then 3 thumbnails, title in `{typography.title-md}`, one-line outcome in `{typography.body-sm}`, topic tag, and stack line in `{component.project-meta}` (`NEXT.JS · OPENAI · PRISMA`). Hover: border becomes `{colors.hairline-strong}`. No shadow, no scale.

**`tag-ai` / `tag-automation` / `tag-web`**: `{typography.tag}`, uppercase, 4px × 8px padding. AI and automation use their tint + topic colour; web is neutral.

**`type-label`**: `TUTORIAL` or `NOTE` in `{typography.mono-label}`, `{colors.muted}`, no box. Type is furniture, not a colour.

**`quote-card`**: quote in `{typography.quote}`, then `{component.avatar}` + name (`{typography.body-sm}`, 500) + role and relationship in `{typography.mono-label}`. Used inside articles for quotes that are part of the story. On Home, only once a real testimonial exists and the person has given permission.

**`post-row`**: `DATE · TOPIC · TYPE · TITLE · LANG · READ` on one line (`2025 · 06 · 15 · [WEB] · TUTORIAL · Understanding useState… · EN · 4 MIN`), hairline between rows, title in `{typography.title-md}`. No arrow. Drafts never appear on the live site.

### Writing Index (`/writing`)

```
§ 01 · WRITING   /writing (display-xl) + dek | TWO KINDS OF POSTS: TUTORIAL / NOTE + "Subscribe via RSS ↗"
filter bar       TYPE [ALL][TUTORIAL][NOTE] · TOPIC [ALL][AI][AUTOMATION][WEB] · LANGUAGE [ALL][EN][ID]   03 ENTRIES · NEWEST FIRST
list             column header → year-group "2025 · 3 ENTRIES" → post-rows (excerpt shown)
footer-band
```
- **`filter-chip`** / **`filter-chip-active`**: 32px visual box inside a 44px hit area. Neutral on purpose: topic colour lives on tags, not on controls. Filters are real query params (`?type=tutorial&topic=ai&lang=id`), combinable, and shareable.
- **`year-group`**: the year in `{typography.title-lg}` with an entry count in `{typography.mono-label}`; a strong rule under it. Groups appear only when there is more than one year.
- A filter with zero results shows `{component.empty-state}` ("NO AUTOMATION POSTS YET" + `SEE ALL WRITING`).
- Mobile: filters stack as three rows (TYPE / TOPIC / LANG), each scrollable sideways if it overflows; rows stack (meta line, title, language · read).

### Article (`/writing/<slug>`)

```
breadcrumb       ← /writing / slug                                         AVAILABLE IN · EN (· ID)
header           § 01 · WRITING / TUTORIAL → title (display-lg) → excerpt as dek (muted)
meta strip       PUBLISHED · READ TIME · TOPIC · TYPE · LEVEL · LANGUAGE
cover            16:9, the author's own screenshot or diagram
body             sticky TOC + share (240) | 680 column:
                   lesson-brief (tutorials only) → content → callouts → check your work → feedback line → tags
pager            BACK [ALL WRITING] | next-lesson (same topic, button-primary NEXT TUTORIAL)
footer-band
```
- **Dek** is the post's own `excerpt`, never agent-written.
- **`lesson-brief`** opens every TUTORIAL: `WHAT YOU'LL LEARN` (numbered, from the post's headings) and `BEFORE YOU START` (prerequisites). NOTEs skip it.
- **`callout`**: kinds `NOTE`, `TIP`, `RULES`, `WARNING`, `CHECK YOUR WORK`. A full hairline box with a mono label; no coloured left stripe, no icon.
- **Check your work**: every tutorial ends with one small task that proves the reader got it working.
- **Feedback line**: "Stuck, or found a mistake? Email …" with a real `mailto:`. This is the only contact prompt inside an article.
- **`next-lesson`**: the next post in the same topic and language. If none exists, the pager shows only `ALL WRITING`. Prev/next arrows are allowed here because they carry direction.
- **Language**: `AVAILABLE IN · EN · ID` links to the other version when it exists; with one language it is plain text. `<link rel="alternate" hreflang>` connects the pair.
- **Images**: the author's own screenshots and diagrams only. The current Notion posts hot-link third-party images (game screenshots, other blogs); those are replaced before migration.
- Mobile: meta moves above the title as a 2-column grid; the TOC collapses into an `ON THIS PAGE · 06 ↓` bar; cover and figures go full-bleed; the pager stacks (next-lesson card, then `ALL WRITING`).

### Projects Index (`/projects`)

```
§ 02 · PROJECTS  /projects (display-xl) + dek | ABOUT THIS LIST: "Personal and bootcamp projects only. Client and employer work is under NDA and is not listed here."
filter bar       TOPIC [ALL][AI][AUTOMATION][WEB]                                02 PROJECTS · NEWEST FIRST
grid             project-cards, 2-up (3-up from 3+ projects), 1-up mobile
footer-band
```
The NDA line is part of the page on purpose: it answers "where is your work?" before a visitor has to ask.

### Project Page (`/projects/<slug>`)

```
breadcrumb       ← /projects / slug                                               live link ↗ (if one exists)
header           § 02 · PROJECTS / TOPIC → title (display-lg) → the owner's description as dek
meta strip       TOPIC · YEAR · ROLE · TEAM · LINK
cover            16:9, the owner's own screenshot
body             sticky TOC + LINKS (live app, source code if public) | 680 column:
                   01 What it does · 02 What I built (numbered feature rows + screenshots)
                   03 How it works (architecture spec table: FRONTEND / BACKEND / AUTH / DEPLOY)
                   04 What was hard (PROBLEM / WHAT WORKED pairs) · 05 What I learned · 06 What I'd do next
                   callout NOTE for caveats (e.g. "the live app may be unavailable")
pager            BACK [ALL PROJECTS] | next project card (button-ghost OPEN PROJECT)
footer-band
```
- This replaces the earlier seven-heading case-study order; "What was hard" carries the "wrong obvious fix" idea as PROBLEM / WHAT WORKED pairs, which matches how the owner already writes project notes.
- `WHAT WORKED` labels use `{colors.accent}`; it is the one accent moment in the section.
- Only links that exist are shown. "Source code" appears only for a public repo.
- Mobile: meta becomes a 2-column grid above the title; the TOC collapses; feature rows and the architecture table stack key over value.

### About (`/about`)

```
header (split)   § 03 · ABOUT /about + owner paragraph [YOUR WORDS] | about-photo 4:5
§ 03.1 TEACHING  "What I teach": role card (REVOU · FREELANCE, AI & Data Analytics Instructor) | numbered topic rows with tags
§ 03.2 LEARNING  "How I learned it": year · programme · institution, certificate thumbnails where they exist
§ 03.3 TOOLS     "What I teach with": three columns AI / AUTOMATION / WEB & DATA, each with a topic dot
footer-band
```
- About deliberately uses `{typography.title-lg}` sub-headings instead of slash-headings (RHYTHM 2 break for a personal page).
- No employer history: the page is about teaching and learning. Day-job roles stay off the site (NDA and rebrand); the owner can link a CV later if needed.
- Certificate thumbnails come from `public/images/about/` (Devscale, RevoU).
- Topic rows are 44px minimum; they become links to `/writing?topic=…` only once posts exist for that topic.

**`case-study-header`**: title in `{typography.display-lg}`, one-line outcome below in `{typography.display-md}` `{colors.muted}`, then `{component.project-meta}` as a key-value block.

**`case-study-body`**: `{typography.body-lg}` in `{colors.body}`, 680px measure, section headings in `{typography.title-lg}`.

**`code-block`**: `{colors.surface-dark-elevated}`, `{typography.code}`, `{rounded.none}`, filename label on top in `{typography.mono-label}`.

### Footer ("Elsewhere")

**`footer-band`**: full-bleed `{colors.surface}` with a top hairline, opened by `§ 04 · ELSEWHERE`. No headline and no sales CTA: the site is for reading.

**`contact-spec-row`**: key-value rows in `{typography.mono-meta}`, min height 44px: `EMAIL · LINKEDIN ↗ · GITHUB ↗ · RSS /feed.xml ↗`. Keys in `{colors.muted}`, values in `{colors.ink}`.

**`footer`**: last row of the band. `© YEAR NAME` left, an optional one-line personal note centre (owner's own words only), `BACK TO TOP ↑` right in a 44px hit area, all in `{typography.mono-label}`.

## Motion

Motion is light, boostlab-level. Every rule below is disabled under `prefers-reduced-motion: reduce`.

| Pattern | Spec |
|---|---|
| Reveal on scroll | Opacity 0 → 1, translateY 12px → 0, 400ms, `cubic-bezier(.2,.7,.2,1)`, stagger 60ms, once only |
| Stat count-up | 0 → value over 800ms on first view (only if a stat strip returns) |
| Link underline | Width 0 → 100%, 200ms |
| Button arrow nudge | Label translateX 4px, 150ms |
| Card lift | Border colour change only, 150ms |
| Smooth scroll | Lenis, optional |
| Signature moment | **One** allowed, still undecided (see Known Gaps). Loads after content, never blocks it |

Not allowed: intro loaders, WebGL backgrounds, sound, scroll-hijacking, "best viewed on desktop" gates, pulsing status dots.

## Do's and Don'ts

### Do
- Keep `{component.button-primary}` ink with the `{colors.accent}` arrow square. One per viewport.
- Open every section with `{component.section-label}` + slash-heading.
- Put anything that is data (dates, stacks, numbers) in mono; put anything that is a sentence in Space Grotesk.
- Use topic colours small and often: tags and header strips.
- End every tutorial with a working result the reader can check.
- Write every project page with the seven-heading story structure.
- Show the language of every post (`EN`, `ID`, `EN · ID`).
- Use real screenshots and photos of your own builds.
- Keep `{spacing.section}` between bands and a hairline at every band edge.
- Give every interactive element a visible focus ring and a 44px touch target.

### Don't
- Don't use an em dash anywhere in visible text.
- Don't round corners. `{rounded.none}` is the system; the brand mark and avatars are the only exceptions.
- Don't add box-shadows. Use `{colors.hairline-strong}` or a tone step.
- Don't bold past 500.
- Don't fill large areas with colour. No dark bands; the page stays light.
- Don't introduce a fourth hue, or a second purple. A new topic gets a colour only if it becomes a main teaching topic; otherwise it uses the neutral tag.
- Don't put arrows on ghost links, rows or cards.
- Don't add decorative stripes, edge markers or status dots that mark no real state.
- Don't show client or employer work in any form (NDA): no names, screenshots, numbers or anonymised case studies.
- Don't add a newsletter box, pricing, or "hire me" CTA. The site is for reading.
- Don't invent or pad stats, statuses or testimonials.
- Don't use `{colors.faint}` for sentences, below 12px, or on `{colors.surface-sunken}`.
- Don't link to a page or filter that has no content.
- Don't copy the reference sites' heavy pieces: itsua's density, jithinrp's WebGL intro, boostlab's 220px outline words.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Nav collapses to `EN / ID` + the `[ MENU ]` button opening a full-screen numbered list; hero stacks (headline, then abstract); router rows stack as cards; post rows stack (meta line, title, language · read); project grid 1-up; article meta moves above the title |
| Tablet | 768–1024px | Nav stays horizontal with labels shortened to `[ 01 ]`; project grid 2-up |
| Desktop | 1024–1440px | Full layout as specified |
| Wide | > 1440px | Content caps at 1280px; outer margin grows, type does not |

### Touch Targets
- Buttons are 48px tall. Router rows, nav items, the menu button, contact rows and back-to-top are 44px or more.
- Tags are not interactive on Home; on `/writing` and `/projects` filter chips they grow to 32px visual height inside a 44px hit area.

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
- Alt text on every screenshot and photo describing what it shows.
- LCP < 2.0s on mobile 4G; home page JS < 50KB; fonts self-hosted and subset.
- OG images generated per page in this style (title in Space Grotesk, meta in mono, on `{colors.canvas}`).
- `<html lang>` matches the page language; EN and ID versions of a post link each other with `hreflang`.

## Quality Filter (antislop)

This file is the **direction**. The antislop plugin (`antislop@anti-slop`, enabled in `.claude/settings.json`) is the **filter** applied on top of it. Audits and fix reports live in `anti-slop/`. When this file asks for a pattern antislop names as slop, the agent asks the owner to keep or drop it and records the answer here.

Logged decisions:
- 2026-10-26, audit 001: em dash in section labels → **dropped** (now ` · `).
- 2026-10-26, audit 001: "BUILDING IN PUBLIC" status pill → **dropped** (now `JAKARTA · UTC+7`).
- 2026-10-26, audit 001: left-edge domain markers → **dropped**.
- 2026-10-26, audit 001: dark closing band → **dropped** (owner: keep the page light).
- 2026-10-26, audit 001: logo and accent unified to `#6840C8`.
- 2026-10-26, rebrand: the site moves from AI-engineer portfolio to teaching (tutorials, notes, personal projects). Day-job work is under NDA: the stat strip, the two day-job project cards and `/work/order-to-erp` are removed. `/work` becomes `/projects`.
- 2026-10-26, rebrand: bilingual EN / ID; one `/writing` section with `TUTORIAL` / `NOTE` types; read-only (no CTA beyond `START READING`); topics AI and automation. Domain colours data, build and teach removed; `web` is neutral.
- 2026-10-26: Design Read and dials set (ENERGY 2 / RHYTHM 2 / MOTION 1). Closes audit #20 and #21.
- 2026-10-26, writing pass: the "Featured" block is **dropped** (not in the spec; with one published post it would duplicate the list). Article dek uses the real excerpt instead of agent copy. Component defaults scrubbed of NDA content.
- 2026-10-27, first AI note: owner approves agent-drafted copy (body and excerpt) for "Where Should You Start Learning AI?", built from the owner's interview answers; owner re-reads after publish.
- 2026-10-27: line-art illustrations switch from "never filled" to the Loop reference style (solid accent fills, ink shadows); first set generated for the AI note.

## Iteration Guide

1. Work on ONE component at a time and reference its YAML key (`{component.project-card}`, `{component.stat-cell}`).
2. New component? Decide first whether it is **furniture** (labels, nav, tables: mono, faint/muted) or **content** (cards, articles: grotesk, ink/body). Mixing the two voices inside one element breaks the system.
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
- Resolved by the rebrand: #19 (stat strip removed), #20 and #21 (dials set), #22 (descriptive hero), #24 (`/stack` removed), #26 (accent-serif "Selected builds" and stat suffix removed with their sections).

**Content (the real bottleneck):**
- Published posts today: **1** (useState, a React tutorial, topic `web`). In the two teaching topics (AI, automation): **0 published**, 1 draft ("Understanding RAG Mental Models"). No Indonesian posts yet. Home's `/writing` band, the router rows and `/id` all stay hidden until their content exists, so the first launch needs at least 2 published posts, ideally one per topic.
- The two React posts are off-topic: keep them as a `web` archive, or unpublish. Owner decides.
- Personal projects: TheraMind (bootcamp team project) and a Next.js mini project. Thumbnails and screenshots needed.
- The about paragraph (`[YOUR WORDS]`) and the about photo.
- Indonesian UI strings for nav, labels and empty states.

**Other:**
- **Signature moment** (terminal hero vs. a small live widget vs. none) is undecided.
- Tutorial fields still to be written by the owner for existing posts: `level`, `prerequisites`, `check`. The `learn` lines in the Figma mockup are drafted from the useState post's own headings; confirm or rewrite.
- Project page content comes from the owner's Notion page for TheraMind. Two items still need the owner: "What I'd do next" and whether the source code is public. The Notion conclusion uses an em dash after "a bootcamp final project"; that sentence was left out of the mockup, and the owner decides how to rewrite it before migration (R-02).
- About: the owner paragraph, the photo, and whether to add a CV link.
- The Next.js mini project has no write-up yet; its card links to a page that must exist before launch, or the card waits.
- The logo PNGs still use `#6A55F2`; re-export in `#6840C8`.
- Form components (contact form, newsletter) are out of scope; contact is email-only for now.
- Fluid type values (`clamp()`) are documented in prose because the token format holds fixed sizes only.
- Link and focus-ring components declare `{colors.canvas}` as background for contrast linting; in practice they inherit whatever surface they sit on (accent passes AA on canvas, surface and surface-sunken).
