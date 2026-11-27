// Site-wide constants shared by the nav, footer and metadata.
import { DEFAULT_LOCALE, LOCALES, localize } from "@/lib/i18n";

export const SITE_URL = "https://www.hasbi.pro";
export const SITE_NAME = "Hasbi Hassadiqin";
export const EMAIL = "hasbi.at.work@gmail.com";

// Page alternates: the canonical URL in this language plus hreflang links to the
// languages the page exists in. `path` is language-neutral ("/writing").
export function alternates(path, lang, langs = LOCALES) {
  const languages = Object.fromEntries(langs.map((code) => [code, localize(code, path)]));
  if (langs.includes(DEFAULT_LOCALE)) languages["x-default"] = localize(DEFAULT_LOCALE, path);
  return { canonical: localize(lang, path), languages };
}

// Labels come from t(lang).nav[key]; hrefs are language-neutral, see localize().
export const NAV_ITEMS = [
  { key: "index", href: "/" },
  { key: "writing", href: "/writing" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
];

// Which sections are visible, in order: while no project is published, Projects drops
// out of the nav. (The numbers it returns were shown as § labels before redesign v2;
// callers now only test whether a key is present.)
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
