import { ButtonGhost, ButtonPrimary, SectionLabel } from "@/components/ui/primitives";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:py-section">
      <SectionLabel>§ 404 · Not found</SectionLabel>
      <h1 className="t-display-xl text-ink">/404</h1>
      <p className="t-display-md max-w-[760px] text-muted">Nothing lives at this address. The writing and the projects are one click away.</p>
      <div className="flex flex-wrap gap-md">
        <ButtonPrimary href="/writing">Go to writing</ButtonPrimary>
        <ButtonGhost href="/">Back to index</ButtonGhost>
      </div>
    </section>
  );
}
