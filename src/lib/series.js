// The three series ("tracks"). Keys and slugs are fixed; a post joins one with the front
// matter `series: <key>`. Titles are brand names, the same in both languages. Descriptions
// and image alt text live in src/lib/i18n.js (`series.items[key]`, `series.alt[imageAlt]`).
// scripts/check-content.mjs reads the keys below, so keep one `key: "..."` per entry.
export const SERIES = [
  {
    key: "normal",
    slug: "ai-for-normal-human",
    title: "AI for Normal Human",
    image: "/images/series/normal.webp",
    imageAlt: "normal",
  },
  {
    key: "creative",
    slug: "ai-for-creative-human",
    title: "AI for Creative Human",
    image: "/images/series/creative.webp",
    imageAlt: "creative",
  },
  {
    key: "worker",
    slug: "ai-for-worker-human",
    title: "AI for Worker Human",
    image: "/images/series/worker.webp",
    imageAlt: "worker",
  },
];

export const SERIES_KEYS = SERIES.map((series) => series.key);
export const getSeries = (key) => SERIES.find((series) => series.key === key) || null;
export const getSeriesBySlug = (slug) => SERIES.find((series) => series.slug === slug) || null;
export const seriesPath = (series) => `/series/${series.slug}`;
