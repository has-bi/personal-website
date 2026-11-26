---
name: new-post
description: Scaffold a new draft post for hasbi.pro (content/writing/<slug>.<lang>.mdx) with valid front matter and its image folder. Use when the owner wants to start a new tutorial or note.
argument-hint: "<title> [tutorial|note] [ai|automation|web] [en|id]"
model: haiku
---

Create a new draft post from: $ARGUMENTS

1. Work out the title, `type` (tutorial | note), `topic` (ai | automation | web) and `lang` (en | id, default en). If the type or topic is not given and the title doesn't make it obvious, ask the owner. Do not guess.
2. Slug: kebab-case from the title, ASCII only, short. Check that `content/writing/<slug>.<lang>.mdx` does not exist yet.
3. Create the file:

```mdx
---
title: "<Title>"
date: "<today, YYYY-MM-DD>"
type: <type>
topic: <topic>
lang: <lang>
excerpt: ""
tags: []
draft: true
---
```

   Leave `excerpt` empty and the body empty, apart from the `## Heading` outline if the owner gave you one. Do not write body copy or an excerpt in the owner's voice unless they ask, and then mark it as a draft for them to approve.
4. Create `public/images/writing/<slug>/` (with a `.gitkeep`). Images there are named `01-cover.webp`, `02-<what>.webp` and so on. When a cover is added, set `cover` and `coverAlt` in the front matter.
5. Run `node scripts/check-content.mjs content/writing/<slug>.<lang>.mdx`. An empty-excerpt warning is expected for a draft.
6. Tell the owner the file path, that it is a draft, and how to preview it: `SHOW_DRAFTS=1 npm run dev`, then `http://localhost:3000/writing/<slug>`.
