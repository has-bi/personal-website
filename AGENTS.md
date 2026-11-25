# hasbi.pro: agent instructions

Personal site of Hasbi Hassadiqin (the **owner**): bilingual EN / ID tutorials and notes on AI and automation, plus personal projects. Next.js 15 App Router, React 19, Tailwind 4, MDX via `next-mdx-remote`. Plain JavaScript (no TypeScript). Deployed on Vercel from `main`.

Read before working:
- `README.md`: content model, front matter fields, MDX components.
- `DESIGN.md`: the design direction (tokens, components, voice) and the **Logged decisions** list under "Quality Filter (antislop)". The owner's decisions there override defaults, including antislop's.

## Commands

| Command | What it does | When |
|---|---|---|
| `npm run check:content [file...]` | Front matter, image paths, alt text, MDX components, em dashes | After touching `content/` (a hook runs it per file) |
| `npm run check` | `check:content` + `eslint` | After any change |
| `npm run verify` | `check` + `next build` + `smoke` (every sitemap route, OG images, redirects, 404) | Before calling work done or opening a PR |
| `SHOW_DRAFTS=1 npm run dev` | Dev server with drafts visible | Previewing a draft |

Do not say a change works until `npm run verify` passes. If it fails, report the failing output, do not summarize it away. There is no browser in this environment: visual checks are the owner's, so say what to look at.

## Map

- `content/writing/<slug>.<lang>.mdx`: posts. `content/projects/<slug>.mdx`: projects. `content/about.en.mdx`: owner's own intro.
- `src/utils/content.js`: loads and compiles all MDX (headings, numbering, drafts, read time).
- `src/components/mdx/MDXComponents.js`: every tag MDX may use. `createMdxComponents` is the registry.
- `src/lib/ai-context.js`: "Copy context for AI" (post to Markdown). **A new MDX component must be taught here too.**
- `src/lib/site.js`: site constants, `TOPICS` / `TYPES` / `LANGS`, nav, `sectionNumbers()` (nav and § labels follow the visible order).
- `src/app/`: routes (`/`, `/writing`, `/writing/[slug]`, `/projects`, `/projects/[slug]`, `/about`), OG images, sitemap, robots.
- `src/components/ui/`, `src/components/site/`: shared UI, nav, footer.
- `scripts/`: the checks above. `anti-slop/`: antislop audit reports.

## Rules

**Copy and content**
- Never write first-person copy in the owner's voice and present it as theirs (antislop R-38). Draft it, mark it as a draft, and say so; the owner approves. Opinions, experiences and claims about the owner come from the owner.
- No em dashes (—) in any copy, front matter or UI string. Use a colon, period or comma. En dashes in ranges are fine. The content check enforces this for MDX; apply it to JSX strings yourself.
- Client and employer work is under NDA. Describe the current role by what it covers, never by client. Factual role: Solutions Architect at Cekat.AI. "Solutions Engineer" is a goal, not a held title.
- New posts start as `draft: true`. Only the owner flips a post to published.
- Images live in `public/images/<section>/<slug>/` and are referenced with absolute paths and real alt text.

**Design and code**
- Follow `DESIGN.md`: tokens via the Tailwind classes in `src/app/globals.css`, zero radius (the TOC pill is the one exception), hairlines before shadows, mono for furniture (labels, nav, tables), grotesk for content. Do not add hex colours inline.
- When `DESIGN.md` asks for a pattern antislop flags, or you change a design decision, ask the owner, then append the answer to **Logged decisions** with the date. Do not decide silently.
- Hide empty things instead of showing empty states (see logged decisions: Projects nav, language toggle). Every link must lead to a page that exists at build time.
- Keep focus states, 44px tap targets on mobile, and 4.5:1 text contrast.
- Match the surrounding code: small functions, comments that explain *why*, no new dependencies without a reason stated to the owner.

**Workflow**
- Work on a branch, never commit straight to `main`. One topic per branch and PR, usually one commit. Commit and PR titles look like `Articles: remove the breadcrumb, add Copy context for AI`: plain sentence case, area first when useful, no `feat:` prefixes. PRs land as merge commits (`<title> (#N)`).
- `gh` is not installed. Push the branch and give the owner the compare URL (`https://github.com/has-bi/personal-website/compare/<branch>`) unless they ask otherwise.
- Never read or print `.env*`.

## Fix the harness, not just the output

When the owner corrects the same thing twice, or a mistake reaches a build, do not only fix it in the chat. Add the rule here, or make a script catch it (`scripts/check-content.mjs` is the place for content rules), and mention the change in your reply.
