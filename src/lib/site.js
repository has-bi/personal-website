// Site-wide constants shared by the nav, footer and metadata.
export const SITE_URL = "https://www.hasbi.pro";
export const SITE_NAME = "Hasbi Hassadiqin";
export const EMAIL = "hasbi.at.work@gmail.com";

// Page alternates: the canonical URL for each page.
export function alternates(path) {
  return { canonical: path };
}

export const NAV_ITEMS = [
  { key: "index", href: "/", label: "Index" },
  { key: "writing", href: "/writing", label: "Writing" },
  { key: "projects", href: "/projects", label: "Projects" },
  { key: "about", href: "/about", label: "About" },
];

// Section numbers follow the visible order, so they stay consecutive: while no project
// is published, Projects drops out and About becomes 02. Nav items and § labels share them.
export function sectionNumbers({ hasProjects }) {
  const order = ["index", "writing", ...(hasProjects ? ["projects"] : []), "about", "elsewhere"];
  return Object.fromEntries(order.map((key, index) => [key, String(index).padStart(2, "0")]));
}

export const ELSEWHERE = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "LinkedIn", value: "hasbi-hassadiqin ↗", href: "https://www.linkedin.com/in/hasbi-hassadiqin/", external: true },
  { label: "GitHub", value: "has-bi ↗", href: "https://github.com/has-bi", external: true },
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
