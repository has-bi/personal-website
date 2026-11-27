"use client";

import { useParams } from "next/navigation";
import { SectionLabel } from "@/components/ui/primitives";
import { t } from "@/lib/i18n";

export default function Error({ reset }) {
  const labels = t(useParams()?.lang).error;
  return (
    <section className="band flex flex-col items-start gap-lg border-b border-hairline py-xxxl lg:py-section">
      <SectionLabel>500</SectionLabel>
      <h1 className="t-display-lg font-light text-ink">{labels.title}</h1>
      <p className="t-body-md text-body">{labels.text}</p>
      <button
        type="button"
        onClick={reset}
        className="t-button inline-flex h-12 items-center rounded-pill border border-hairline bg-canvas px-xl text-ink hover:bg-surface"
      >
        {labels.retry}
      </button>
    </section>
  );
}
