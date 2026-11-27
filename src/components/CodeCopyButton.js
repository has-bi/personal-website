"use client";

import { useState } from "react";

export default function CodeCopyButton({ code, labels }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      className="t-label flex min-h-11 items-center rounded-pill px-md text-on-dark hover:text-on-dark-muted"
    >
      <span aria-live="polite">{copied ? labels.copiedShort : labels.copy}</span>
    </button>
  );
}
