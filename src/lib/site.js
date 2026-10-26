// Site-wide constants shared by the nav, footer, metadata and feed.
export const SITE_URL = "https://www.hasbi.pro";
export const SITE_NAME = "Hasbi Hassadiqin";
export const EMAIL = "hasbi.at.work@gmail.com";

export const NAV_ITEMS = [
  { href: "/", number: "00", label: "Index" },
  { href: "/writing", number: "01", label: "Writing" },
  { href: "/projects", number: "02", label: "Projects" },
  { href: "/about", number: "03", label: "About" },
];

export const ELSEWHERE = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "LinkedIn", value: "hasbi-hassadiqin ↗", href: "https://www.linkedin.com/in/hasbi-hassadiqin/", external: true },
  { label: "GitHub", value: "has-bi ↗", href: "https://github.com/has-bi", external: true },
  { label: "RSS", value: "/feed.xml ↗", href: "/feed.xml" },
];

export const TOPICS = {
  ai: { label: "AI" },
  automation: { label: "Automation" },
  web: { label: "Web" },
};

export const TYPES = {
  tutorial: { label: "Tutorial" },
  note: { label: "Note" },
};

export const LANGS = {
  en: { label: "EN", name: "English" },
  id: { label: "ID", name: "Bahasa Indonesia" },
};

// "2025-06-15T05:46:37Z" -> "2025 · 06 · 15"
export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()} · ${pad(date.getUTCMonth() + 1)} · ${pad(date.getUTCDate())}`;
}

export const pad2 = (n) => String(n).padStart(2, "0");
export const pad3 = (n) => String(n).padStart(3, "0");
