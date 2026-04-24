import { cache } from "react";
import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const BLOG_DATABASE_ID = process.env.NOTION_DATABASE_ID_BLOG;
const PROJECTS_DATABASE_ID = process.env.NOTION_DATABASE_ID_PROJECTS;
const NOTION_REVALIDATE_SECONDS = 60 * 60 * 24;

export function getPlainText(richText) {
  return richText?.map((text) => text.plain_text).join("") || "";
}

export function getPropertyValue(property) {
  if (!property) return "";

  switch (property.type) {
    case "title":
      return property.title?.map((text) => text.plain_text).join("") || "";
    case "rich_text":
      return property.rich_text?.map((text) => text.plain_text).join("") || "";
    case "select":
      return property.select?.name || "";
    case "multi_select":
      return property.multi_select?.map((item) => item.name) || [];
    case "date":
      return property.date?.start || "";
    case "checkbox":
      return property.checkbox || false;
    case "number":
      return property.number || 0;
    case "url":
      return property.url || "";
    case "files":
      return (
        property.files?.[0]?.file?.url ||
        property.files?.[0]?.external?.url ||
        ""
      );
    default:
      return "";
  }
}

function mapBlogPage(page) {
  const contentTitle = getPropertyValue(page.properties["Content Title"]);
  const defaultTitle = getPropertyValue(page.properties.Title);
  const finalTitle = contentTitle || defaultTitle || "Untitled Post";

  return {
    id: page.id,
    slug: getPropertyValue(page.properties.Slug),
    title: finalTitle,
    excerpt: getPropertyValue(page.properties.Excerpt),
    date: getPropertyValue(page.properties.Date),
    tags: getPropertyValue(page.properties.Tags),
    coverImage: getPropertyValue(page.properties["Cover Image"]),
    author: getPropertyValue(page.properties.Author) || "Hasbi Hassadiqin",
    readTime: getPropertyValue(page.properties["Read Time"]) || "5 min read",
    featured: getPropertyValue(page.properties.Featured),
    published: getPropertyValue(page.properties.Published),
  };
}

function mapProjectPage(page) {
  const contentTitle = getPropertyValue(page.properties["Content Title"]);
  const defaultTitle = getPropertyValue(page.properties.Title);
  const finalTitle = contentTitle || defaultTitle || "Untitled Project";

  return {
    id: page.id,
    slug: getPropertyValue(page.properties.Slug),
    title: finalTitle,
    desc: getPropertyValue(page.properties.Description),
    coverImage: getPropertyValue(page.properties["Cover Image"]),
    date: getPropertyValue(page.properties.Date),
    client: getPropertyValue(page.properties.Client),
    category: getPropertyValue(page.properties.Category),
    technologies: getPropertyValue(page.properties.Technologies),
    featured: getPropertyValue(page.properties.Featured),
    published: getPropertyValue(page.properties.Published),
  };
}

async function queryAllDatabasePages({ databaseId, filter, sorts }) {
  if (!databaseId) return [];

  const results = [];
  let nextCursor;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
      sorts,
      start_cursor: nextCursor,
      page_size: 100,
    });

    results.push(...response.results);
    nextCursor = response.has_more ? response.next_cursor : undefined;
  } while (nextCursor);

  return results;
}

async function queryPageBySlug(databaseId, slug) {
  if (!databaseId || !slug) return null;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    page_size: 1,
  });

  return response.results[0] || null;
}

async function fetchPageContent(pageId) {
  if (!pageId) return [];

  try {
    const allBlocks = [];
    let nextCursor;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: nextCursor,
        page_size: 100,
      });

      const blocks = response.results.map((block) => ({
        id: block.id,
        type: block.type,
        [block.type]: block[block.type],
      }));

      allBlocks.push(...blocks);
      nextCursor = response.has_more ? response.next_cursor : undefined;
    } while (nextCursor);

    return allBlocks;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return [];
  }
}

const getCachedPageContent = unstable_cache(fetchPageContent, ["notion-page-content"], {
  revalidate: NOTION_REVALIDATE_SECONDS,
  tags: ["notion"],
});

export const getPageContent = cache((pageId) => getCachedPageContent(pageId));

async function fetchBlogPostsFromNotion() {
  try {
    const results = await queryAllDatabasePages({
      databaseId: BLOG_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return results.map(mapBlogPage);
  } catch (error) {
    console.error("Error fetching blog posts from Notion:", error);
    return [];
  }
}

async function fetchBlogPostSummaryFromNotion(slug) {
  try {
    const page = await queryPageBySlug(BLOG_DATABASE_ID, slug);
    return page ? mapBlogPage(page) : null;
  } catch (error) {
    console.error("Error fetching blog post summary from Notion:", error);
    return null;
  }
}

async function fetchBlogPostFromNotion(slug) {
  try {
    const page = await queryPageBySlug(BLOG_DATABASE_ID, slug);
    if (!page) return null;

    return {
      ...mapBlogPage(page),
      content: await getPageContent(page.id),
    };
  } catch (error) {
    console.error("Error fetching blog post from Notion:", error);
    return null;
  }
}

async function fetchProjectsFromNotion() {
  try {
    const results = await queryAllDatabasePages({
      databaseId: PROJECTS_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return results.map(mapProjectPage);
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    return [];
  }
}

async function fetchProjectSummaryFromNotion(slug) {
  try {
    const page = await queryPageBySlug(PROJECTS_DATABASE_ID, slug);
    return page ? mapProjectPage(page) : null;
  } catch (error) {
    console.error("Error fetching project summary from Notion:", error);
    return null;
  }
}

async function fetchProjectFromNotion(slug) {
  try {
    const page = await queryPageBySlug(PROJECTS_DATABASE_ID, slug);
    if (!page) return null;

    return {
      ...mapProjectPage(page),
      content: await getPageContent(page.id),
    };
  } catch (error) {
    console.error("Error fetching project from Notion:", error);
    return null;
  }
}

const getCachedBlogPosts = unstable_cache(fetchBlogPostsFromNotion, ["notion-blog-posts"], {
  revalidate: NOTION_REVALIDATE_SECONDS,
  tags: ["notion", "blog"],
});

const getCachedBlogPostSummary = unstable_cache(
  fetchBlogPostSummaryFromNotion,
  ["notion-blog-post-summary"],
  {
    revalidate: NOTION_REVALIDATE_SECONDS,
    tags: ["notion", "blog"],
  }
);

const getCachedBlogPost = unstable_cache(fetchBlogPostFromNotion, ["notion-blog-post"], {
  revalidate: NOTION_REVALIDATE_SECONDS,
  tags: ["notion", "blog"],
});

const getCachedProjects = unstable_cache(fetchProjectsFromNotion, ["notion-projects"], {
  revalidate: NOTION_REVALIDATE_SECONDS,
  tags: ["notion", "projects"],
});

const getCachedProjectSummary = unstable_cache(
  fetchProjectSummaryFromNotion,
  ["notion-project-summary"],
  {
    revalidate: NOTION_REVALIDATE_SECONDS,
    tags: ["notion", "projects"],
  }
);

const getCachedProject = unstable_cache(fetchProjectFromNotion, ["notion-project"], {
  revalidate: NOTION_REVALIDATE_SECONDS,
  tags: ["notion", "projects"],
});

export const getBlogPostsFromNotion = cache(() => getCachedBlogPosts());
export const getBlogPostSummaryFromNotion = cache((slug) =>
  getCachedBlogPostSummary(slug)
);
export const getBlogPostFromNotion = cache((slug) => getCachedBlogPost(slug));

export const getProjectsFromNotion = cache(() => getCachedProjects());
export const getProjectSummaryFromNotion = cache((slug) =>
  getCachedProjectSummary(slug)
);
export const getProjectFromNotion = cache((slug) => getCachedProject(slug));

export async function getFeaturedBlogPosts(limit = 3) {
  try {
    const posts = await getBlogPostsFromNotion();
    return posts.filter((post) => post.featured).slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }
}

export async function getFeaturedProjects(limit = 4) {
  try {
    const projects = await getProjectsFromNotion();
    return projects.filter((project) => project.featured).slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}
