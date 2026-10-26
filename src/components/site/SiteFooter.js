import { ELSEWHERE } from "@/lib/site";
import { SectionLabel } from "@/components/ui/primitives";

// footer-band: where else to find the owner, as a key-value table.
export default function SiteFooter() {
  return (
    <footer className="band border-t border-hairline bg-surface pb-xl pt-xxxl">
      <div className="flex flex-col gap-xxl lg:px-md">
        <SectionLabel>§ 04 · Elsewhere</SectionLabel>
        <dl className="border-t border-hairline">
          {ELSEWHERE.map((row) => (
            <div key={row.label} className="flex min-h-11 items-center justify-between border-b border-hairline lg:justify-start">
              <dt className="t-mono-meta uppercase text-muted lg:w-[240px] lg:shrink-0">{row.label}</dt>
              <dd>
                <a
                  href={row.href}
                  className="t-mono-meta flex min-h-11 items-center text-ink hover:text-accent"
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center justify-between">
          <p className="t-mono-label text-muted">© {new Date().getFullYear()} Hasbi Hassadiqin</p>
          <a href="#top" className="t-mono-label flex min-h-11 items-center text-ink hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
