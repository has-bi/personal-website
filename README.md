# hasbi.pro

Personal site of Hasbi Hassadiqin: bilingual tutorials and notes on AI and automation, plus personal projects. Next.js 15 (App Router) + Tailwind + MDX, deployed on Vercel. Design direction lives in [`DESIGN.md`](DESIGN.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

No environment variables are needed. Content is read from the repository at build time.

## Content

```
content/
  writing/<slug>.<lang>.mdx    # posts, e.g. do-you-even-need-ai.en.mdx
  projects/<slug>.mdx          # personal projects only (client and employer work is under NDA)
  about.en.mdx                 # your own intro paragraph for /about and Home (draft until you write it)
```

Routes: `/`, `/writing` (filters: `?type=tutorial&topic=ai&lang=id`), `/writing/<slug>`, `/projects` (`?topic=`), `/projects/<slug>`, `/about`, `/feed.xml`. Old `/blog/*` and `/contact` URLs redirect.

Post front matter:

```yaml
title: "Where Should You Start Learning AI?"
date: "2025-06-15"
type: tutorial          # tutorial | note
topic: ai               # ai | automation | web
lang: en                # en | id (must match the file name)
readTime: 4             # optional; estimated from word count if missing
excerpt: "One or two sentences."
tags: [React, Hooks]
cover: "/images/writing/<slug>/cover.png"   # optional
level: Beginner         # optional; shown in the meta strip
prerequisites: ["Basic JavaScript"]   # optional; "Before you start" in the lesson brief
draft: true             # drafts never reach the live site
```

Every `## Heading` is numbered and listed in "On this page". If you number headings yourself (`## 1. Can you simplify it?`), automatic numbers are switched off for that post. Tutorials open with a lesson brief built from those headings. Straight quotes are turned into typographic ones at build time.

Project front matter: `title`, `year`, `topic`, `stack`, `description` (the dek), `outcome` (one line on the card), `role`, `team`, `cover`, `gallery` (up to 3 card thumbnails), `liveUrl`, `sourceUrl`, `featured`, `draft`.

- Drafts are hidden in every build. Preview them locally with `SHOW_DRAFTS=1 npm run dev`.
- Images go in `public/images/...` and are referenced with an absolute path. Use your own screenshots and diagrams.
- MDX components available in content: `<YouTube id="..." title="..." />` and `<Callout kind="Tip">...</Callout>` (kinds: Note, Tip, Rules, Warning, Check your work).
- Project write-up blocks (one line each, string props only): `<Features><Feature name="...">...</Feature></Features>`, `<Spec><SpecRow label="...">...</SpecRow></Spec>`, `<Problems><Problem problem="...">what worked</Problem></Problems>`, `<Learned label="...">...</Learned>`, `<Screenshots><Shot src="..." alt="..." /></Screenshots>`. See `content/projects/mental-wellness-app-nextjs.mdx`.
- Publishing = commit the file and push; Vercel rebuilds the site.
