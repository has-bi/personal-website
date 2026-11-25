"use client";

import { usePathname } from "next/navigation";
import { ButtonGhost, ButtonPrimary, SectionLabel } from "@/components/ui/primitives";
import { localize, splitLocale, t } from "@/lib/i18n";

// not-found gets no params, so the language comes from the address itself.
export default function NotFoundBody() {
  const { lang } = splitLocale(usePathname() || "/");
  const labels = t(lang).notFound;
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:py-section">
      <SectionLabel>§ 404 · {labels.label}</SectionLabel>
      <h1 className="t-display-xl text-ink">/404</h1>
      <p className="t-display-md max-w-[760px] text-muted">{labels.text}</p>
      <div className="flex flex-wrap gap-md">
        <ButtonPrimary href={localize(lang, "/writing")}>{labels.writing}</ButtonPrimary>
        <ButtonGhost href={localize(lang, "/")}>{labels.index}</ButtonGhost>
      </div>
    </section>
  );
}
