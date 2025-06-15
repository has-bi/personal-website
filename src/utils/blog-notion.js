// src/utils/blog-notion.js - New Notion-based blog utils
import { getBlogPostsFromNotion, getBlogPostFromNotion } from "./notion";

export async function getBlogPosts() {
  try {
    return await getBlogPostsFromNotion();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug) {
  try {
    const post = await getBlogPostFromNotion(slug);
    if (!post) return null;

    return {
      slug: post.slug,
      frontmatter: {
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        coverImage: post.coverImage,
        author: post.author,
        readTime: post.readTime,
        featured: post.featured,
      },
      content: post.content, // This will be Notion blocks
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getAllBlogSlugs() {
  try {
    const posts = await getBlogPostsFromNotion();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}
