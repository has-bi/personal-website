"use client";

import { SectionLabel } from "@/components/ui/primitives";

export default function Error({ reset }) {
  return (
    <section className="band flex flex-col items-start gap-lg border-b border-hairline py-xxxl lg:py-section">
      <SectionLabel>§ 500 · Error</SectionLabel>
      <h1 className="t-display-lg text-ink">Something went wrong.</h1>
      <p className="t-body-md text-body">The page failed to load. Try again, or come back in a minute.</p>
      <button
        type="button"
        onClick={reset}
        className="t-button inline-flex h-12 items-center border border-hairline-strong bg-canvas px-lg text-ink hover:bg-surface"
      >
        Try again
      </button>
    </section>
  );
}
