import { getPostLanguages, getPosts, getProjects } from "@/utils/content";
import { SITE_URL } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALES, localize } from "@/lib/i18n";

// Every page in every language it exists in, each with hreflang alternates.
const entry = (path, langs, extra = {}) =>
  langs.map((lang) => ({
    url: `${SITE_URL}${localize(lang, path)}`,
    alternates: {
      languages: Object.fromEntries([
        ...langs.map((code) => [code, `${SITE_URL}${localize(code, path)}`]),
        ...(langs.includes(DEFAULT_LOCALE) ? [["x-default", `${SITE_URL}${localize(DEFAULT_LOCALE, path)}`]] : []),
      ]),
    },
    ...extra,
  }));

export default async function sitemap() {
  const [posts, languages, projects] = await Promise.all([
    Promise.all(LOCALES.map((lang) => getPosts({ lang }))).then((lists) => lists.flat()),
    getPostLanguages(),
    getProjects(),
  ]);
  const newest = posts.map((post) => post.date).sort().pop();
  const latest = newest ? new Date(newest) : new Date();

  const pages = [
    ...entry("/", LOCALES, { lastModified: latest, changeFrequency: "weekly", priority: 1 }),
    ...entry("/writing", LOCALES, { lastModified: latest, changeFrequency: "weekly", priority: 0.9 }),
    ...entry("/about", LOCALES, { changeFrequency: "monthly", priority: 0.7 }),
  ];

  // One entry per slug; its languages become the URLs and alternates.
  const postPages = Object.entries(languages).flatMap(([slug, langs]) => {
    const post = posts.find((item) => item.slug === slug);
    return entry(`/writing/${slug}`, langs, {
      lastModified: post?.date ? new Date(post.date) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // /projects is listed only once a project is published.
  const projectPages = projects.length
    ? [
        ...entry("/projects", LOCALES, { changeFrequency: "monthly", priority: 0.8 }),
        ...projects.flatMap((project) => entry(`/projects/${project.slug}`, LOCALES, { changeFrequency: "yearly", priority: 0.6 })),
      ]
    : [];

  return [...pages, ...postPages, ...projectPages];
}
