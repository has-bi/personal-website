import fs from "node:fs";
import path from "node:path";

// Indonesian is the default language at the root; English posts live at /en/writing/<slug>.
// Old English URLs (/writing/<slug>) redirect to /en/... until an Indonesian version of
// that post is published, then the root URL serves the Indonesian post. Temporary (307)
// redirects, because each one disappears when its translation goes live.
function englishOnlyPostRedirects() {
  const dir = path.join(process.cwd(), "content", "writing");
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }
  const showDrafts = process.env.SHOW_DRAFTS === "1";
  const published = (file) => showDrafts || !/^draft:\s*true\s*$/m.test(fs.readFileSync(path.join(dir, file), "utf8").split(/^---\s*$/m)[1] || "");
  const slugsIn = (lang) =>
    new Set(files.filter((file) => file.endsWith(`.${lang}.mdx`) && published(file)).map((file) => file.slice(0, -`.${lang}.mdx`.length)));

  const indonesian = slugsIn("id");
  return [...slugsIn("en")]
    .filter((slug) => !indonesian.has(slug))
    .map((slug) => ({ source: `/writing/${slug}`, destination: `/en/writing/${slug}`, permanent: false }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `npm run verify` builds into its own dir so a running `next dev` cannot overwrite the build it serves.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // The root layout sits under [lang], so there is no app/layout.js to render a 404 for
  // URLs that match no route. src/app/global-not-found.js renders that page instead.
  experimental: { globalNotFound: true },

  // The blog became /writing; /about, /projects and /contact were removed; they go to the language home.
  async redirects() {
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
      ...["/about", "/projects", "/projects/:slug", "/contact"].flatMap((source) => [
        { source, destination: "/", permanent: true },
        { source: `/en${source}`, destination: "/en", permanent: true },
      ]),
      ...englishOnlyPostRedirects(),
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
