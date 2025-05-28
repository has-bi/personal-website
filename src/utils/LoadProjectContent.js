// src/utils/loadProjectContent.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

/**
 * Load MDX content for a specific project (server-side only)
 * @param {string} slug - The project slug
 * @returns {string} MDX content or empty string
 */
export async function loadProjectContent(slug) {
  try {
    // Ensure we have the projects directory
    if (!fs.existsSync(PROJECTS_DIR)) {
      return "";
    }

    // Try both .md and .mdx extensions
    const possibleFiles = [`${slug}.md`, `${slug}.mdx`];
    let file = null;

    for (const possibleFile of possibleFiles) {
      const filePath = path.join(PROJECTS_DIR, possibleFile);
      if (fs.existsSync(filePath)) {
        file = possibleFile;
        break;
      }
    }

    if (!file) {
      return "";
    }

    const filePath = path.join(PROJECTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);

    return content;
  } catch (error) {
    console.error(`Error loading MDX content for project "${slug}":`, error);
    return "";
  }
}
