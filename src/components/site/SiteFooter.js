import { OWNER_NAME, SITE_NAME } from "@/lib/site";
import { t } from "@/lib/i18n";

// footer-band: the credit line, the copyright and the way back to the top. The owner's name
// appears only here.
export default function SiteFooter({ lang }) {
  const labels = t(lang).footer;
  return (
    <footer className="band border-t border-hairline bg-surface pb-xl pt-xxl">
      <div className="flex flex-col gap-md">
        <p className="t-meta text-muted">
          {labels.credit} {OWNER_NAME}
        </p>
        <div className="flex items-center justify-between">
          <p className="t-label text-muted">© {new Date().getFullYear()} {SITE_NAME}</p>
          <a href="#top" className="t-label flex min-h-11 items-center text-ink hover:text-accent">
            {labels.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
