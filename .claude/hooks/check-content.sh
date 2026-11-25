#!/usr/bin/env bash
# PostToolUse hook (Edit|Write): when Claude edits an MDX file under content/, run the
# content check on that file. Errors go back to Claude (exit 2) so it fixes them in the
# same turn instead of the owner finding them at build time.
input=$(cat)
file=$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write(JSON.parse(s).tool_input?.file_path||"")}catch{}})')

case "$file" in
  "$CLAUDE_PROJECT_DIR"/content/*.mdx|"$CLAUDE_PROJECT_DIR"/content/*/*.mdx) ;;
  *) exit 0 ;;
esac

out=$(cd "$CLAUDE_PROJECT_DIR" && node scripts/check-content.mjs "$file" 2>&1)
if [ $? -ne 0 ]; then
  printf 'Content check failed for %s. Fix these before moving on:\n%s\n' "$file" "$out" >&2
  exit 2
fi
exit 0
