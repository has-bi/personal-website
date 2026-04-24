import { getBlogPostsFromNotion, getProjectsFromNotion } from "@/utils/notion";

const BASE_URL = "https://www.hasbi.pro";

export default async function sitemap() {
  const [posts, projects] = await Promise.all([
    getBlogPostsFromNotion().catch(() => []),
    getProjectsFromNotion().catch(() => []),
  ]);

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const blogRoutes = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const projectRoutes = projects
    .filter((project) => project.slug)
    .map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: project.date ? new Date(project.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
