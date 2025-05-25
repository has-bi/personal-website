// utils/blog.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "src/content/blog");

// Ensure directories exist
if (!fs.existsSync(BLOG_PATH)) {
  fs.mkdirSync(BLOG_PATH, { recursive: true });
}

export function getBlogPosts() {
  try {
    if (!fs.existsSync(BLOG_PATH)) {
      console.log("Blog path does not exist:", BLOG_PATH);
      return [];
    }

    const files = fs
      .readdirSync(BLOG_PATH)
      .filter((file) => file.endsWith(".mdx"));
    console.log("Found blog files:", files);

    const posts = files.map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(BLOG_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      // Parse frontmatter
      const { data: frontmatter } = matter(fileContent);

      return {
        slug,
        frontmatter: {
          title: "",
          date: "",
          excerpt: "",
          tags: [],
          coverImage: "",
          author: "Hasbi Hassadiqin",
          ...frontmatter,
        },
      };
    });

    // Sort by date (newest first)
    return posts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getBlogPost(slug) {
  try {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    console.log("Looking for blog post at:", filePath);

    if (!fs.existsSync(filePath)) {
      console.log("Blog post file does not exist:", filePath);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    console.log("Raw file content length:", fileContent.length);

    // Parse frontmatter and content separately
    const { data: frontmatter, content } = matter(fileContent);

    console.log("Parsed frontmatter:", frontmatter);
    console.log("Content without frontmatter length:", content.length);
    console.log("First 200 chars of content:", content.substring(0, 200));

    return {
      slug,
      frontmatter: {
        title: "",
        date: "",
        excerpt: "",
        tags: [],
        coverImage: "",
        author: "Hasbi Hassadiqin",
        readTime: calculateReadTime(content),
        ...frontmatter,
      },
      content: content.trim(), // Remove any leading/trailing whitespace
    };
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

// Helper function to calculate read time
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}
