import { ButtonGhost, ButtonPrimary, SectionLabel } from "@/components/ui/primitives";
import { localize, t } from "@/lib/i18n";

// The 404 body. global-not-found.js passes `lang` from the x-locale header.
export default function NotFoundBody({ lang }) {
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
