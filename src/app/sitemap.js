import { getAllPosts, getProjects } from "@/utils/content";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  const [posts, projects] = await Promise.all([getAllPosts(), getProjects()]);
  const latest = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const staticRoutes = [
    { url: SITE_URL, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/writing`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const postRoutes = posts
    .filter((post) => post.published && post.lang === "en")
    .map((post) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const projectRoutes = projects
    .filter((project) => project.published)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
