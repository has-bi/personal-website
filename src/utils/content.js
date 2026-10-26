import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";

// Content lives in /content as MDX (see DESIGN.md, "Content Model").
// Drafts never reach the live site; set SHOW_DRAFTS=1 to preview them locally.
const CONTENT_DIR = path.join(process.cwd(), "content");
const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1";
const WORDS_PER_MINUTE = 200;
const DEFAULT_LANG = "en";

async function compileSection(section) {
  const dir = path.join(CONTENT_DIR, section);
  let files;
  try {
    files = (await fs.readdir(dir)).filter((file) => file.endsWith(".mdx"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  return Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(dir, file), "utf8");
      const { content, frontmatter } = await compileMDX({
        source,
        components: mdxComponents,
        options: { parseFrontmatter: true },
      });
      return { file, source, content, frontmatter };
    })
  );
}

function readTimeOf(frontmatter, source) {
  if (frontmatter.readTime) return `${frontmatter.readTime} min read`;
  const body = source.replace(/^---[\s\S]*?---/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

function toPost({ file, source, content, frontmatter: fm }) {
  // <slug>.<lang>.mdx, e.g. rag-mental-models.id.mdx
  const [, slug, lang = DEFAULT_LANG] = /^(.+?)(?:\.([a-z]{2}))?\.mdx$/.exec(file);
  return {
    id: `${slug}.${lang}`,
    slug,
    lang,
    title: fm.title || "Untitled Post",
    excerpt: fm.excerpt || "",
    date: fm.date || "",
    tags: fm.tags || [],
    coverImage: fm.cover || "",
    author: fm.author || "Hasbi Hassadiqin",
    readTime: readTimeOf(fm, source),
    featured: Boolean(fm.featured),
    published: !fm.draft,
    type: fm.type || "note",
    topic: fm.topic || "",
    content,
  };
}

function toProject({ file, content, frontmatter: fm }) {
  const slug = file.replace(/\.mdx$/, "");
  return {
    id: slug,
    slug,
    title: fm.title || "Untitled Project",
    desc: fm.description || "",
    coverImage: fm.cover || "",
    date: fm.year ? String(fm.year) : "",
    client: fm.client || "",
    category: fm.category || "",
    technologies: fm.stack || [],
    topic: fm.topic || "",
    liveUrl: fm.liveUrl || "",
    featured: Boolean(fm.featured),
    published: !fm.draft,
    content,
  };
}

const visible = (entry) => entry.published || SHOW_DRAFTS;

const loadPosts = cache(async () =>
  (await compileSection("writing"))
    .map(toPost)
    .filter(visible)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
);

const loadProjects = cache(async () =>
  (await compileSection("projects"))
    .map(toProject)
    .filter(visible)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
);

export async function getPosts({ lang = DEFAULT_LANG } = {}) {
  return (await loadPosts()).filter((post) => post.lang === lang);
}

export async function getPost(slug, lang = DEFAULT_LANG) {
  return (await getPosts({ lang })).find((post) => post.slug === slug) || null;
}

export async function getProjects() {
  return loadProjects();
}

export async function getProject(slug) {
  return (await loadProjects()).find((project) => project.slug === slug) || null;
}
