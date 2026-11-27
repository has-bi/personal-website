#!/usr/bin/env node
// Checks MDX content before it reaches a build: front matter, images, MDX components
// and the copy rules from DESIGN.md (antislop). Run it on everything or on given files:
//   node scripts/check-content.mjs
//   node scripts/check-content.mjs content/writing/my-post.en.mdx
// Exit 1 on any error. Warnings print but do not fail.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CONTENT = path.join(ROOT, "content");
const PUBLIC = path.join(ROOT, "public");

// Enums are read from src/lib/site.js so the check never drifts from the site.
const siteSource = fs.readFileSync(path.join(ROOT, "src/lib/site.js"), "utf8");
const keysOf = (name) => {
  const block = new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\n\\};`).exec(siteSource)?.[1] || "";
  return [...block.matchAll(/^\s+([a-z]+):/gm)].map((m) => m[1]);
};
const TOPICS = keysOf("TOPICS");
const TYPES = keysOf("TYPES");
const LANGS = keysOf("LANGS");

// Components registered in createMdxComponents (src/components/mdx/MDXComponents.js).
const mdxSource = fs.readFileSync(path.join(ROOT, "src/components/mdx/MDXComponents.js"), "utf8");
const registry = /export function createMdxComponents[\s\S]*?return \{([\s\S]*?)\n  \};/.exec(mdxSource)?.[1] || "";
const COMPONENTS = new Set([...registry.matchAll(/^\s{4}([A-Z]\w*)\s*[,:]/gm)].map((m) => m[1]));
// Components ai-context.js turns into Markdown. Others reach "Copy context for AI" as raw JSX.
const aiSource = fs.readFileSync(path.join(ROOT, "src/lib/ai-context.js"), "utf8");
const AI_AWARE = new Set([...COMPONENTS].filter((name) => aiSource.includes(`<${name}`)));

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

function checkImage(file, ref, field) {
  if (!ref) return;
  if (/^https?:\/\//.test(ref)) return;
  if (!ref.startsWith("/")) return err(file, `${field} "${ref}" must be an absolute path from public/ (start with /)`);
  if (!fs.existsSync(path.join(PUBLIC, ref))) err(file, `${field} "${ref}" does not exist in public/`);
}

function checkBody(file, body, isPost) {
  let inFence = false;
  const lines = body.split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) return;
    const where = `line ${i + 1}`;
    if (line.includes("—")) err(file, `${where}: em dash (antislop R-02). Use a colon, period or comma`);
    for (const [, src] of line.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) checkImage(file, src, `${where}: image`);
    for (const [, src] of line.matchAll(/\bsrc="([^"]+)"/g)) checkImage(file, src, `${where}: src`);
    for (const [, alt] of line.matchAll(/!\[([^\]]*)\]\(/g)) if (!alt.trim()) err(file, `${where}: image has empty alt text`);
    for (const [, name] of line.matchAll(/<([A-Z]\w*)/g)) {
      if (!COMPONENTS.has(name)) err(file, `${where}: <${name}> is not registered in createMdxComponents`);
      else if (isPost && !AI_AWARE.has(name) && !["Feature", "SpecRow", "Problem", "Shot"].includes(name))
        warn(file, `${where}: <${name}> is not handled by src/lib/ai-context.js; Copy context for AI will show raw JSX`);
    }
  });
  if (inFence) err(file, "unclosed code fence");
}

function parse(file, source) {
  const match = /^---\n([\s\S]*?)\n---/.exec(source);
  if (!match) {
    err(file, "missing front matter block");
    return null;
  }
  try {
    return { fm: yaml.load(match[1], { schema: yaml.JSON_SCHEMA }) || {}, body: source.slice(match[0].length) };
  } catch (e) {
    err(file, `front matter is not valid YAML: ${e.reason || e.message}`);
    return null;
  }
}

function checkPost(file, source) {
  const parsed = parse(file, source);
  if (!parsed) return;
  const { fm, body } = parsed;
  const name = path.basename(file);
  const nameMatch = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.([a-z]{2})\.mdx$/.exec(name);
  if (!nameMatch) err(file, "file name must be <kebab-slug>.<lang>.mdx");

  // A draft may still be missing its excerpt; publishing (draft: false) makes it an error.
  for (const key of ["title", "date", "type", "topic", "lang", "excerpt"]) {
    if (fm[key] !== undefined && fm[key] !== "") continue;
    if (key === "excerpt" && fm.draft === true) warn(file, `front matter "excerpt" is empty (required before publishing)`);
    else err(file, `front matter "${key}" is required`);
  }
  if (fm.date && !/^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/.test(String(fm.date))) err(file, `date "${fm.date}" must be "YYYY-MM-DD" (quoted)`);
  if (fm.type && !TYPES.includes(fm.type)) err(file, `type "${fm.type}" must be one of ${TYPES.join(" | ")}`);
  if (fm.topic && !TOPICS.includes(fm.topic)) err(file, `topic "${fm.topic}" must be one of ${TOPICS.join(" | ")}`);
  if (fm.lang && !LANGS.includes(fm.lang)) err(file, `lang "${fm.lang}" must be one of ${LANGS.join(" | ")}`);
  if (nameMatch && fm.lang && fm.lang !== nameMatch[2]) err(file, `lang "${fm.lang}" does not match the file name (.${nameMatch[2]}.mdx)`);
  if (fm.tags !== undefined && !Array.isArray(fm.tags)) err(file, "tags must be a list");
  if (fm.prerequisites !== undefined && !Array.isArray(fm.prerequisites)) err(file, "prerequisites must be a list");
  if (fm.draft !== undefined && typeof fm.draft !== "boolean") err(file, "draft must be true or false");
  for (const key of ["title", "excerpt", "coverAlt"]) {
    if (typeof fm[key] === "string" && fm[key].includes("—")) err(file, `${key}: em dash (antislop R-02)`);
  }
  checkImage(file, fm.cover, "cover");
  if (fm.cover && !fm.coverAlt) warn(file, "cover has no coverAlt; the title is used as alt text");
  checkBody(file, body, true);
}

function checkFile(abs) {
  const rel = path.relative(ROOT, abs);
  const source = fs.readFileSync(abs, "utf8");
  if (rel.startsWith(`content${path.sep}writing${path.sep}`)) checkPost(rel, source);
  else {
    const parsed = parse(rel, source);
    if (parsed) checkBody(rel, parsed.body, false);
  }
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));

const args = process.argv.slice(2).map((p) => path.resolve(p));
const targets = (args.length ? args : walk(CONTENT)).filter((p) => p.endsWith(".mdx") && p.startsWith(CONTENT + path.sep));

// Duplicate slugs per language only matter on a full run.
if (!args.length) {
  const seen = new Map();
  for (const abs of targets.filter((p) => p.includes(`${path.sep}writing${path.sep}`))) {
    const key = path.basename(abs);
    if (seen.has(key)) err(path.relative(ROOT, abs), `duplicate post file name ${key}`);
    seen.set(key, abs);
  }
}

targets.forEach(checkFile);

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
const summary = `check-content: ${targets.length} file(s), ${errors.length} error(s), ${warnings.length} warning(s)`;
if (errors.length) {
  console.error(summary);
  process.exit(1);
}
console.log(summary);
