import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui/primitives";
import { SERIES, seriesPath } from "@/lib/series";
import { localize, t } from "@/lib/i18n";

// One card per series. With posts in this language's list the whole card is a link and
// shows the count; without, it is a muted, non-interactive "Coming soon" card (hidden
// empty things are preferred, but the three series are the site's structure, so they stay).
function SeriesCard({ series, count, lang }) {
  const labels = t(lang).series;
  const live = count > 0;
  const body = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-surface-sunken">
        <Image
          src={series.image}
          alt={labels.alt[series.imageAlt]}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className={live ? "object-cover" : "object-cover opacity-60"}
        />
      </div>
      <div className="flex flex-1 flex-col gap-xs">
        <h3 className={`t-title-lg ${live ? "text-ink" : "text-muted"}`}>{series.title}</h3>
        <p className="t-body-sm text-muted">{labels.items[series.key]}</p>
      </div>
      {live ? (
        <p className="t-meta text-accent">{labels.count(count)}</p>
      ) : (
        <p className="t-tag inline-flex min-h-8 w-fit items-center rounded-pill bg-surface-sunken px-sm text-muted">
          {labels.comingSoon}
        </p>
      )}
    </>
  );
  const shape = "flex h-full flex-col gap-md rounded-card bg-surface p-sm";
  return live ? (
    <Link
      href={localize(lang, seriesPath(series))}
      className={`${shape} transition-colors hover:bg-surface-sunken`}
    >
      {body}
    </Link>
  ) : (
    <div aria-disabled="true" className={shape}>
      {body}
    </div>
  );
}

// `counts` maps series key to its post count in the reader's language list.
export default function SeriesCards({ counts, lang }) {
  return (
    <section className="band flex flex-col gap-lg py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead heading={t(lang).series.heading} />
      <ul className="grid gap-md lg:grid-cols-3 lg:gap-lg">
        {SERIES.map((series) => (
          <li key={series.key}>
            <SeriesCard series={series} count={counts[series.key] || 0} lang={lang} />
          </li>
        ))}
      </ul>
    </section>
  );
}
