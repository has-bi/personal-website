@AGENTS.md

## Claude Code specifics

- A PostToolUse hook (`.claude/hooks/check-content.sh`) runs the content check on every MDX file you edit under `content/`. When it reports errors, fix them before doing anything else.
- Delegate to the project subagents in `.claude/agents/` instead of doing everything inline:
  - `verifier`: runs `npm run verify` and reports pass/fail with the exact failing output. Use it before saying work is done.
  - `design-reviewer`: reviews a UI diff against `DESIGN.md` and the logged decisions. Use it after changing anything in `src/`.
  - `writing-reviewer`: reviews a post against the copy rules and the owner's voice. Use it after drafting or editing a post.
  Reviewers are read-only and report findings.
- Delegate execution to agents rather than doing every step inline, and run independent pieces in parallel (one file or topic per agent, so they never edit the same file). Pick the model by task, not by default: `haiku` for search and mechanical edits, `sonnet` for translation, reviews and well-specified implementation, `opus` only for architecture decisions or hard debugging. You decide what to fix, and the owner decides anything in **Logged decisions**.
- Skills: `/new-post` scaffolds a draft post with valid front matter and its image folder.
- The `antislop` plugin is enabled. Its findings go through the owner as described in `DESIGN.md`.
