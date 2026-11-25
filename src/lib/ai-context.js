import { formatDate, SITE_NAME, SITE_URL, TOPICS, TYPES } from "@/lib/site";

// Turns a post's MDX into plain Markdown a reader can paste into an AI chat: site
// components become Markdown, and relative links and images become absolute URLs.
function toMarkdown(body) {
  const absolute = (path) => (path.startsWith("/") ? `${SITE_URL}${path}` : path);
  const out = [];
  let inFence = false;
  let inCallout = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) {
      out.push(inCallout ? `> ${line}` : line);
      continue;
    }
    const open = /^\s*<Callout\s+kind="([^"]*)"\s*>\s*(.*)$/.exec(line);
    if (open) {
      inCallout = true;
      out.push(`> **${open[1]}**`);
      if (open[2]) out.push(`> ${open[2].replace(/<\/Callout>\s*$/, "")}`);
      if (/<\/Callout>\s*$/.test(open[2])) inCallout = false;
      continue;
    }
    if (/^\s*<\/Callout>\s*$/.test(line)) {
      inCallout = false;
      continue;
    }
    const text = line
      .replace(/<YouTube\s+id="([^"]+)"(?:\s+title="([^"]*)")?\s*\/>/g, (_, id, title) => `[Video: ${title || "YouTube"}](https://www.youtube.com/watch?v=${id})`)
      .replace(/(!?\[[^\]]*\])\((\/[^)\s]+)/g, (_, label, path) => `${label}(${absolute(path)}`);
    out.push(inCallout ? `> ${text}`.trimEnd() : text);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildAiContext(post) {
  const url = `${SITE_URL}/writing/${post.slug}`;
  const facts = [
    `Author: ${post.author}`,
    `Published: ${formatDate(post.date).replace(/ · /g, "-")}`,
    `Type: ${TYPES[post.type]?.label || post.type}`,
    post.topic ? `Topic: ${TOPICS[post.topic]?.label || post.topic}` : null,
    `Source: ${url}`,
  ].filter(Boolean);

  return [
    `The article below is from ${SITE_NAME}'s site (${SITE_URL}). Use it as the source for our conversation: answer from what it says, say so when something is not covered, and quote it accurately.`,
    "",
    `# ${post.title}`,
    "",
    ...facts,
    post.excerpt ? `\n> ${post.excerpt}` : null,
    "",
    "---",
    "",
    toMarkdown(post.body),
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
