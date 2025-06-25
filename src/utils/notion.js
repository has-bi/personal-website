// src/utils/notion.js - Final version
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Database IDs
const BLOG_DATABASE_ID = process.env.NOTION_DATABASE_ID_BLOG;
const PROJECTS_DATABASE_ID = process.env.NOTION_DATABASE_ID_PROJECTS;

// Helper to convert Notion rich text to plain text
export function getPlainText(richText) {
  return richText?.map((text) => text.plain_text).join("") || "";
}

// Helper to get property value based on type
export function getPropertyValue(property) {
  if (!property) {
    console.log("Property is null or undefined");
    return "";
  }

  // console.log("Processing property:", property.type, property);

  switch (property.type) {
    case "title":
      const titleValue =
        property.title?.map((text) => text.plain_text).join("") || "";
      // console.log("Title value extracted:", titleValue);
      return titleValue;
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
      console.log("Unknown property type:", property.type, property);
      return "";
  }
}

// Get blog posts from Notion
export async function getBlogPostsFromNotion() {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
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

    return response.results.map((page) => {
      // Try Content Title first, then fallback to Title, then fallback text
      const contentTitle = getPropertyValue(page.properties["Content Title"]);
      const defaultTitle = getPropertyValue(page.properties.Title);
      const finalTitle = contentTitle || defaultTitle || "Untitled Post";

      console.log("Content Title:", contentTitle);
      console.log("Default Title:", defaultTitle);
      console.log("Final Title:", finalTitle);

      return {
        id: page.id,
        slug: getPropertyValue(page.properties.Slug),
        title: finalTitle,
        excerpt: getPropertyValue(page.properties.Excerpt),
        date: getPropertyValue(page.properties.Date),
        tags: getPropertyValue(page.properties.Tags),
        coverImage: getPropertyValue(page.properties["Cover Image"]),
        author: getPropertyValue(page.properties.Author) || "Hasbi Hassadiqin",
        readTime:
          getPropertyValue(page.properties["Read Time"]) || "5 min read",
        featured: getPropertyValue(page.properties.Featured),
        published: getPropertyValue(page.properties.Published),
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts from Notion:", error);
    return [];
  }
}

// Get single blog post from Notion
export async function getBlogPostFromNotion(slug) {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
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
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    const content = await getPageContent(page.id);

    // Try Content Title first, then fallback to Title
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
      content,
    };
  } catch (error) {
    console.error("Error fetching blog post from Notion:", error);
    return null;
  }
}

// Get projects from Notion
export async function getProjectsFromNotion() {
  try {
    const response = await notion.databases.query({
      database_id: PROJECTS_DATABASE_ID,
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

    return response.results.map((page) => {
      // Try Content Title first, then fallback to Title
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
    });
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    return [];
  }
}

// Get single project from Notion
export async function getProjectFromNotion(slug) {
  try {
    const response = await notion.databases.query({
      database_id: PROJECTS_DATABASE_ID,
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
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    const content = await getPageContent(page.id);

    // Try Content Title first, then fallback to Title
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
      content,
    };
  } catch (error) {
    console.error("Error fetching project from Notion:", error);
    return null;
  }
}

// Get page content blocks
export async function getPageContent(pageId) {
  try {
    let allBlocks = [];
    let hasMore = true;
    let nextCursor = undefined;

    while (hasMore) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: nextCursor,
        page_size: 100, // Max allowed by Notion API
      });

      const blocks = response.results.map((block) => ({
        id: block.id,
        type: block.type,
        [block.type]: block[block.type],
      }));

      allBlocks = [...allBlocks, ...blocks];

      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    }

    console.log(`✅ Fetched ${allBlocks.length} blocks for page ${pageId}`);
    return allBlocks;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return [];
  }
}

// Helper functions for homepage
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
