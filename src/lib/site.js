// Site-wide constants shared by the nav, footer and metadata.
import { DEFAULT_LOCALE, LOCALES, localize } from "@/lib/i18n";

export const SITE_URL = "https://www.hasbi.pro";
export const SITE_NAME = "Human meets Hack";
// Used only for the footer credit.
export const OWNER_NAME = "Hasbi Hassadiqin";

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
