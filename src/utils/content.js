import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkSmartypants from "remark-smartypants";
import { createMdxComponents, slugify } from "@/components/mdx/MDXComponents";

// Content lives in /content as MDX (see DESIGN.md, "Content Model").
// Drafts never reach the live site; set SHOW_DRAFTS=1 to preview them locally.
const CONTENT_DIR = path.join(process.cwd(), "content");
const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1";
const WORDS_PER_MINUTE = 200;
const DEFAULT_LANG = "en";

const bodyOf = (source) => source.replace(/^---[\s\S]*?---/, "");

// Typographic quotes for text that skips the MDX pipeline (front matter, TOC).
function smartQuotes(text = "") {
  return String(text)
    .replace(/(\w)'(\w)/g, "$1\u2019$2")
    .replace(/(^|[\s(\[])'/g, "$1\u2018")
    .replace(/'/g, "\u2019")
    .replace(/(^|[\s(\[])"/g, "$1\u201c")
    .replace(/"/g, "\u201d");
}

// "## Heading" lines outside code fences, numbered in order. They feed the TOC,
// the lesson brief and the numbered <h2> labels. When the author numbers any
// heading themselves ("## 1. Can you simplify it?"), automatic numbers are off
// for that file so a heading never shows two numbers.
function extractHeadings(source) {
  const headings = [];
  let inFence = false;
  for (const line of bodyOf(source).split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const raw = match[1].replace(/[*_`]/g, "").trim();
      headings.push({ text: smartQuotes(raw), id: slugify(raw), number: String(headings.length + 1).padStart(2, "0") });
    }
  }
  if (headings.some((heading) => /^\d+[.)]\s/.test(heading.text))) {
    for (const heading of headings) heading.number = "";
  }
  return headings;
}

async function compileFile(file, source) {
  const headings = extractHeadings(source);
  const { content, frontmatter } = await compileMDX({
    source,
    components: createMdxComponents({ headings }),
    options: {
      parseFrontmatter: true,
      // Straight quotes become typographic ones; the display font draws " as a closing quote.
      mdxOptions: { remarkPlugins: [remarkSmartypants] },
    },
  });
  return { file, source, content, frontmatter, headings };
}

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
    files.map(async (file) => compileFile(file, await fs.readFile(path.join(dir, file), "utf8")))
  );
}

function readMinutesOf(frontmatter, source) {
  if (frontmatter.readTime) return Number(frontmatter.readTime);
  const words = bodyOf(source).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function toPost({ file, source, content, frontmatter: fm, headings }) {
  // <slug>.<lang>.mdx, e.g. rag-mental-models.id.mdx
  const [, slug, lang = DEFAULT_LANG] = /^(.+?)(?:\.([a-z]{2}))?\.mdx$/.exec(file);
  return {
    id: `${slug}.${lang}`,
    slug,
    lang,
    title: smartQuotes(fm.title) || "Untitled Post",
    excerpt: smartQuotes(fm.excerpt),
    date: fm.date || "",
    tags: fm.tags || [],
    coverImage: fm.cover || "",
    author: fm.author || "Hasbi Hassadiqin",
    readMinutes: readMinutesOf(fm, source),
    level: fm.level || "",
    prerequisites: fm.prerequisites || [],
    featured: Boolean(fm.featured),
    published: !fm.draft,
    type: fm.type || "note",
    topic: fm.topic || "",
    headings,
    content,
  };
}

function toProject({ file, content, frontmatter: fm, headings }) {
  const slug = file.replace(/\.mdx$/, "");
  return {
    id: slug,
    slug,
    title: smartQuotes(fm.title) || "Untitled Project",
    desc: smartQuotes(fm.description),
    outcome: smartQuotes(fm.outcome),
    coverImage: fm.cover || "",
    gallery: fm.gallery || [],
    date: fm.year ? String(fm.year) : "",
    client: fm.client || "",
    category: fm.category || "",
    role: fm.role || "",
    team: fm.team || "",
    technologies: fm.stack || [],
    topic: fm.topic || "",
    liveUrl: fm.liveUrl || "",
    sourceUrl: fm.sourceUrl || "",
    featured: Boolean(fm.featured),
    published: !fm.draft,
    headings,
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
    .sort((a, b) => b.date.localeCompare(a.date) || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title))
);

// Every language, newest first. The /writing filters work on this list.
export async function getAllPosts() {
  return loadPosts();
}

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

// content/about.<lang>.mdx holds the owner's own intro paragraph. Missing or draft: nothing renders.
export const getAboutIntro = cache(async (lang = DEFAULT_LANG) => {
  let source;
  try {
    source = await fs.readFile(path.join(CONTENT_DIR, `about.${lang}.mdx`), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  const { content, frontmatter } = await compileFile(`about.${lang}.mdx`, source);
  if (frontmatter.draft && !SHOW_DRAFTS) return null;
  return bodyOf(source).trim() ? content : null;
});
