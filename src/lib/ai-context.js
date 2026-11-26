import { formatDate, SITE_NAME, SITE_URL } from "@/lib/site";
import { localize, t } from "@/lib/i18n";

// Turns a post's MDX into plain Markdown a reader can paste into an AI chat: site
// components become Markdown, and relative links and images become absolute URLs.
function toMarkdown(body, callouts) {
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
      out.push(`> **${callouts[open[1]] || open[1]}**`);
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

// The brief and labels follow the post's own language.
export function buildAiContext(post) {
  const dict = t(post.lang);
  const labels = dict.ai;
  const url = `${SITE_URL}${localize(post.lang, `/writing/${post.slug}`)}`;
  const facts = [
    `${labels.author}: ${post.author}`,
    `${labels.published}: ${formatDate(post.date).replace(/ · /g, "-")}`,
    `${labels.type}: ${dict.types[post.type] || post.type}`,
    post.topic ? `${labels.topic}: ${dict.topics[post.topic] || post.topic}` : null,
    `${labels.source}: ${url}`,
  ].filter(Boolean);

  return [
    labels.brief(SITE_NAME, SITE_URL),
    "",
    `# ${post.title}`,
    "",
    ...facts,
    post.excerpt ? `\n> ${post.excerpt}` : null,
    "",
    "---",
    "",
    toMarkdown(post.body, dict.mdx.callouts),
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
