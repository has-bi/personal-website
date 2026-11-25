"use client";

import { useState } from "react";

// Copies the whole post as Markdown, with a short brief on top, so a reader can paste it
// into an AI chat and talk about what the post says.
export default function CopyContext({ context }) {
  const [state, setState] = useState("idle");

  return (
    <button
      type="button"
      title="Copies this post as Markdown, ready to paste into ChatGPT, Claude or any AI chat"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(context);
          setState("copied");
        } catch {
          setState("failed");
        }
        setTimeout(() => setState("idle"), 2000);
      }}
      className="t-mono-meta flex min-h-11 shrink-0 items-center gap-xs uppercase text-accent hover:text-accent-active"
    >
      <span aria-live="polite">
        {state === "copied" ? "Copied. Paste it into your AI" : state === "failed" ? "Copy failed" : "Copy context for AI"}
      </span>
    </button>
  );
}
