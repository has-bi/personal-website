"use client";

import { useEffect, useState } from "react";
import { DEFAULT_THEME, THEME_KEY } from "@/lib/theme";

// theme-toggle: a round pill beside the language pill. Dark is the default; the choice is
// remembered in this browser (src/lib/theme.js applies it before the first paint).
export default function ThemeToggle({ labels, className = "" }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || DEFAULT_THEME);
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          // Private mode or blocked storage: the switch still applies to this page.
        }
        setTheme(next);
      }}
      aria-label={next === "light" ? labels.toLight : labels.toDark}
      title={next === "light" ? labels.toLight : labels.toDark}
      className={`t-nav flex size-11 items-center justify-center rounded-pill bg-surface text-muted transition-colors hover:bg-surface-sunken hover:text-ink lg:size-9 ${className}`}
    >
      <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}
