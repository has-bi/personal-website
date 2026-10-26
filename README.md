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
  writing/<slug>.<lang>.mdx    # posts, e.g. understanding-usestate-react.en.mdx
  projects/<slug>.mdx          # personal projects only (client and employer work is under NDA)
```

Post front matter:

```yaml
title: "Understanding useState in React"
date: "2025-06-15"
type: tutorial          # tutorial | note
topic: ai               # ai | automation | web
lang: en                # en | id (must match the file name)
readTime: 4             # optional; estimated from word count if missing
excerpt: "One or two sentences."
tags: [React, Hooks]
cover: "/images/writing/<slug>/cover.png"   # optional
draft: true             # drafts never reach the live site
```

Project front matter: `title`, `year`, `topic`, `client`, `category`, `stack`, `description`, `cover`, `liveUrl`, `featured`, `draft`.

- Drafts are hidden in every build. Preview them locally with `SHOW_DRAFTS=1 npm run dev`.
- Images go in `public/images/...` and are referenced with an absolute path. Use your own screenshots and diagrams.
- MDX components available in content: `<YouTube id="..." title="..." />` and `<Callout kind="Tip">...</Callout>`.
- Publishing = commit the file and push; Vercel rebuilds the site.
