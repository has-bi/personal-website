// src/utils/notion.js
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
  switch (property?.type) {
    case "title":
      return getPlainText(property.title);
    case "rich_text":
      return getPlainText(property.rich_text);
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

    return response.results.map((page) => ({
      id: page.id,
      slug: getPropertyValue(page.properties.Slug),
      title: getPropertyValue(page.properties.Title),
      excerpt: getPropertyValue(page.properties.Excerpt),
      date: getPropertyValue(page.properties.Date),
      tags: getPropertyValue(page.properties.Tags),
      coverImage: getPropertyValue(page.properties["Cover Image"]),
      author: getPropertyValue(page.properties.Author) || "Hasbi Hassadiqin",
      readTime: getPropertyValue(page.properties["Read Time"]) || "5 min read",
      featured: getPropertyValue(page.properties.Featured),
      published: getPropertyValue(page.properties.Published),
    }));
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

    // Get page content
    const content = await getPageContent(page.id);

    return {
      id: page.id,
      slug: getPropertyValue(page.properties.Slug),
      title: getPropertyValue(page.properties.Title),
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

    return response.results.map((page) => ({
      id: page.id,
      slug: getPropertyValue(page.properties.Slug),
      title: getPropertyValue(page.properties.Title),
      desc: getPropertyValue(page.properties.Description),
      coverImage: getPropertyValue(page.properties["Cover Image"]),
      date: getPropertyValue(page.properties.Date),
      client: getPropertyValue(page.properties.Client),
      category: getPropertyValue(page.properties.Category),
      technologies: getPropertyValue(page.properties.Technologies),
      featured: getPropertyValue(page.properties.Featured),
      published: getPropertyValue(page.properties.Published),
    }));
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

    // Get page content
    const content = await getPageContent(page.id);

    return {
      id: page.id,
      slug: getPropertyValue(page.properties.Slug),
      title: getPropertyValue(page.properties.Title),
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
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    return blocks.results.map((block) => ({
      id: block.id,
      type: block.type,
      [block.type]: block[block.type],
    }));
  } catch (error) {
    console.error("Error fetching page content:", error);
    return [];
  }
}
