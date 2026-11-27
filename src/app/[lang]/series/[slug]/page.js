import Image from "next/image";
import { getSeriesPosts, getSeriesWithPosts } from "@/utils/content";
import { PostRow, PostTableHeader } from "@/components/ui/PostRow";
import { alternates } from "@/lib/site";
import { SERIES, getSeriesBySlug, seriesPath } from "@/lib/series";
import { LOCALES, t } from "@/lib/i18n";

export const dynamicParams = false;

// Only series with at least one post in any language get a page, in every language (the
// list falls back like /writing does). With no posts at all this returns [] and no series
// page is built; the cards on Home are then not links.
export async function generateStaticParams() {
  const live = new Set(await getSeriesWithPosts());
  return SERIES.filter((series) => live.has(series.key)).flatMap((series) =>
    LOCALES.map((lang) => ({ lang, slug: series.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};
  return {
    title: series.title,
    description: t(lang).series.items[series.key],
    alternates: alternates(seriesPath(series), lang),
  };
}

export default async function SeriesPage({ params }) {
  const { slug, lang } = await params;
  const series = getSeriesBySlug(slug);
  const labels = t(lang).series;
  const posts = await getSeriesPosts(lang, series.key);

  return (
    <>
      <section className="band flex flex-col gap-lg pb-xl pt-xxxl lg:flex-row lg:items-end lg:gap-xl lg:pb-xxl lg:pt-section">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-surface-sunken lg:w-[420px] lg:shrink-0">
          <Image
            src={series.image}
            alt={labels.alt[series.imageAlt]}
            fill
            priority
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-lg">
          <h1 className="t-display-lg font-light text-ink">{series.title}</h1>
          <p className="t-display-md text-muted">{labels.items[series.key]}</p>
        </div>
      </section>

      <section className="band pb-xxxl lg:pb-section">
        <PostTableHeader lang={lang} />
        <ul className="border-t border-hairline lg:border-t-0">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} lang={lang} />
          ))}
        </ul>
      </section>
    </>
  );
}
