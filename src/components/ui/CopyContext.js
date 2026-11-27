"use client";

import { useState } from "react";

// Copies the whole post as Markdown, with a short brief on top, so a reader can paste it
// into an AI chat and talk about what the post says.
export default function CopyContext({ context, labels }) {
  const [state, setState] = useState("idle");

  return (
    <button
      type="button"
      title={labels.title}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(context);
          setState("copied");
        } catch {
          setState("failed");
        }
        setTimeout(() => setState("idle"), 2000);
      }}
      className="t-meta flex min-h-11 shrink-0 items-center gap-xs rounded-pill px-md text-accent hover:text-accent-active"
    >
      <span aria-live="polite">
        {state === "copied" ? labels.copied : state === "failed" ? labels.failed : labels.context}
      </span>
    </button>
  );
}
