# hasbi.pro

Human meets Hack: a bilingual publication of guides on using AI across domains (by Hasbi Hassadiqin, credited in the footer only). Next.js 15 (App Router) + Tailwind + MDX, deployed on Vercel. Design direction lives in [`DESIGN.md`](DESIGN.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # content check + lint
npm run verify     # check + build + route smoke test
```

No environment variables are needed. Content is read from the repository at build time.

## Content

```
content/
  writing/<slug>.<lang>.mdx    # posts, e.g. do-you-even-need-ai.en.mdx
```

Routes: `/`, `/writing` (filters: `?type=tutorial&topic=ai&lang=id`), `/writing/<slug>`. Old `/blog/*` URLs redirect to `/writing`; `/about`, `/projects` and `/contact` redirect to the language home.

Languages: Indonesian is the default and lives at the root; English lives under `/en` (`/en/writing/<slug>`). A post exists in a language when `<slug>.<lang>.mdx` is published. Until the Indonesian version of a post is published, the Indonesian list shows the English post and `/writing/<slug>` redirects to `/en/writing/<slug>`. Interface text lives in `src/lib/i18n.js`; `src/middleware.js` maps the root onto the `[lang]` routes in `src/app/[lang]/`.

Post front matter:

```yaml
title: "Where Should You Start Learning AI?"
date: "2025-06-15"
type: tutorial          # tutorial | note
topic: ai               # ai | automation | web
series: normal          # optional; normal | creative | worker (see src/lib/series.js)
lang: en                # en | id (must match the file name)
readTime: 4             # optional; estimated from word count if missing
excerpt: "One or two sentences."
tags: [React, Hooks]
cover: "/images/writing/<slug>/cover.png"   # optional
coverAlt: "Short description of the cover"   # optional; cover alt text, falls back to the title
level: Beginner         # optional; shown in the meta strip
prerequisites: ["Basic JavaScript"]   # optional; "Before you start" in the lesson brief
draft: true             # drafts never reach the live site
```

Every `## Heading` is numbered and listed in "On this page". If you number headings yourself (`## 1. Can you simplify it?`), automatic numbers are switched off for that post. Tutorials open with a lesson brief built from those headings. Straight quotes are turned into typographic ones at build time.

- Drafts are hidden in every build. Preview them locally with `SHOW_DRAFTS=1 npm run dev`.
- Images go in `public/images/...` and are referenced with an absolute path. Use your own screenshots and diagrams.
- MDX components available in content: `<YouTube id="..." title="..." />` and `<Callout kind="Tip">...</Callout>` (kinds: Note, Tip, Rules, Warning, Check your work).
- Publishing = commit the file and push; Vercel rebuilds the site.
- Every article has a **Copy context for AI** button. It copies the post as Markdown, built by `src/lib/ai-context.js`; teach it any new MDX component you add so the copy stays readable.
