# hasbi.pro: agent instructions

**Human meets Hack**: a publication of guides on using AI across domains (tutorials and notes). It is not a personal site. Managed by Hasbi Hassadiqin (the **owner**), who appears only in the footer credit. **Indonesian first** (root URLs), English under `/en`. Next.js 15 App Router, React 19, Tailwind 4, MDX via `next-mdx-remote`. Plain JavaScript (no TypeScript). Deployed on Vercel from `main`.

Read before working:
- `README.md`: content model, front matter fields, MDX components.
- `DESIGN.md`: the design direction (tokens, components, voice) and the **Logged decisions** list under "Quality Filter (antislop)". The owner's decisions there override defaults, including antislop's.

## Commands

| Command | What it does | When |
|---|---|---|
| `npm run check:content [file...]` | Front matter, image paths, alt text, MDX components, em dashes | After touching `content/` (a hook runs it per file) |
| `npm run check` | `check:content` + `eslint` | After any change |
| `npm run verify` | `check` + `next build` + `smoke` (every sitemap route, OG images, redirects, 404) | Before calling work done or opening a PR. Builds into `.next-verify`, so it can run while `next dev` is up |
| `SHOW_DRAFTS=1 npm run dev` | Dev server with drafts visible | Previewing a draft |

Do not say a change works until `npm run verify` passes. If it fails, report the failing output, do not summarize it away. There is no browser in this environment: visual checks are the owner's, so say what to look at.

## Map

- `content/writing/<slug>.<lang>.mdx`: posts, authored by the publication. There is no `content/projects` or `content/about`.
- `src/utils/content.js`: loads and compiles all MDX (headings, numbering, drafts, read time).
- `src/components/mdx/MDXComponents.js`: every tag MDX may use. `createMdxComponents` is the registry.
- `src/lib/ai-context.js`: "Copy context for AI" (post to Markdown). **A new MDX component must be taught here too.**
- `src/lib/i18n.js`: languages, `localize(lang, path)`, and **every interface string** in both languages (`t(lang)`). New UI text goes here, in both languages, never inline in JSX.
- `src/middleware.js`: rewrites root paths to `[lang]=id`, redirects `/id/*` to the root. `next.config.mjs`: redirects English-only post URLs to `/en`.
- `src/lib/series.js`: the three series (`normal` / `creative` / `worker`: key, slug, image, alt key); posts join with front matter `series`. Route `src/app/[lang]/series/[slug]/` is built only for series with posts; Home cards (`src/components/site/SeriesCards.js`) show "Segera" and are not links otherwise.
- `src/lib/site.js`: site constants (`SITE_NAME` "Human meets Hack", `OWNER_NAME`; no email or personal links), `TOPICS` / `TYPES` / `LANGS` keys, nav, `alternates(path, lang, langs)` (canonical + hreflang).
- `src/app/[lang]/`: every page, built once per language (`/`, `/writing`, `/writing/[slug]`, OG images; `/about`, `/projects`, `/contact` redirect to the language home). `src/app/sitemap.js` and `robots.js` stay at the root.
- `src/components/ui/`, `src/components/site/`: shared UI, nav, footer (credit line only).
- `scripts/`: the checks above. `anti-slop/`: antislop audit reports.

## Rules

**Copy and content**
- Never write first-person copy in the owner's voice and present it as theirs (antislop R-38). Draft it, mark it as a draft, and say so; the owner approves. Opinions, experiences and claims about the owner come from the owner.
- No em dashes (—) in any copy, front matter or UI string. Use a colon, period or comma. En dashes in ranges are fine. The content check enforces this for MDX; apply it to JSX strings yourself.
- The site speaks as the publication, not as a person. The owner is named only in the footer credit. Never add personal data, an About page or a Projects section back (no email, LinkedIn, GitHub, role, employer or portrait). Client and employer work is under NDA and never appears.
- New posts start as `draft: true`. Only the owner flips a post to published.
- New posts are written in Indonesian first (`<slug>.id.mdx`). An English version is the same slug with `.en.mdx`. `<Callout kind>` values from the standard set stay in English in both (the label is translated by the component); custom kinds are written in the post's language.
- Images live in `public/images/<section>/<slug>/` and are referenced with absolute paths and real alt text.

**Design and code**
- Follow `DESIGN.md`, starting with **Direction v2** (it overrides older sections): tokens via the Tailwind classes in `src/app/globals.css`; one sans typeface (mono only in code); sentence-case furniture (`t-label`, `t-nav`, `t-meta`, `t-tag`, `t-button`); pills (`rounded-pill`) for interactive furniture, `rounded-card` for cards and panels, `rounded-media` for images; no shadows; no `§` / `[ 01 ]` numbering. Do not add hex colours inline.
- When `DESIGN.md` asks for a pattern antislop flags, or you change a design decision, ask the owner, then append the answer to **Logged decisions** with the date. Do not decide silently.
- Hide empty things instead of showing empty states (see logged decisions: language toggle). Every link must lead to a page that exists at build time.
- Keep focus states, 44px tap targets on mobile, and 4.5:1 text contrast.
- Match the surrounding code: small functions, comments that explain *why*, no new dependencies without a reason stated to the owner.
- The build must not need the network. Fonts are bundled in `src/lib/font-files/` and loaded with `next/font/local` (`src/lib/fonts.js`); never use `next/font/google` (a Google Fonts fetch failing mid-build broke a production deploy). OG images use the TTFs in `src/lib/og-fonts/`.

**Workflow**
- Work on a branch, never commit straight to `main`. One topic per branch and PR, usually one commit. Commit and PR titles look like `Articles: remove the breadcrumb, add Copy context for AI`: plain sentence case, area first when useful, no `feat:` prefixes. PRs land as merge commits (`<title> (#N)`).
- `gh` is installed and logged in as the owner. Push the branch and open the PR with `gh pr create`; merge only when the owner asks, with `gh pr merge <n> --merge`, after the checks pass.
- Vercel previews are behind Vercel Authentication, so `curl` gets a 302 to SSO. Check a preview through the Vercel connector (`web_fetch_vercel_url`) before merging changes to routing, middleware or redirects: they can behave differently on Vercel than under `next start`.
- Stage files by path (`git add <paths>`), never `git add -A` or `git add .`: the owner drops their own files (images, notes) into the working tree, and a 4.6 MB PNG once slipped into an unrelated commit that way. Check `git status --short` before every commit.
- Never read or print `.env*`.

## Fix the harness, not just the output

When the owner corrects the same thing twice, or a mistake reaches a build, do not only fix it in the chat. Add the rule here, or make a script catch it (`scripts/check-content.mjs` is the place for content rules), and mention the change in your reply.
