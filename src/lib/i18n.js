// Languages and UI strings. Indonesian is the default and lives at the root (/writing);
// English lives under /en (/en/writing). src/middleware.js maps the root onto [lang]=id.
// Post copy lives in content/; this file holds only the interface ("furniture") text.

export const LOCALES = ["id", "en"];
export const DEFAULT_LOCALE = "id";

export const isLocale = (value) => LOCALES.includes(value);
export const otherLocale = (lang) => (lang === "en" ? "id" : "en");

// localize("en", "/writing") -> "/en/writing"; localize("id", "/writing") -> "/writing".
export function localize(lang, path = "/") {
  if (lang === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// "/en/writing/x" -> { lang: "en", path: "/writing/x" }; "/writing/x" -> { lang: "id", ... }.
export function splitLocale(pathname = "/") {
  const match = /^\/(en)(\/.*)?$/.exec(pathname);
  return match ? { lang: match[1], path: match[2] || "/" } : { lang: DEFAULT_LOCALE, path: pathname };
}

const en = {
  ogLocale: "en_US",
  skip: "Skip to content",
  site: {
    title: "Human meets Hack",
    description:
      "A collection of guides on using AI across different domains, from everyday work to business and automation, in plain language.",
    tagline: "Guides on using AI across domains",
  },
  nav: {
    index: "Index",
    writing: "Writing",
    primary: "Primary",
    menu: "Menu",
    close: "Close",
    switchTo: "Bahasa Indonesia: ",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  footer: { credit: "This website is managed by", top: "Back to top ↑" },
  topics: { ai: "AI", automation: "Automation", web: "Web" },
  types: { tutorial: "Tutorial", note: "Note" },
  home: {
    // Two tones: [muted, ink]. The site's title, the same in both languages (owner, 2026-11-27).
    hero: ["Human meets", "Hack"],
    heroNote: "Free to read, no sign-up",
    heroAlt: "A person and a figure with an old computer monitor for a head sit side by side on green hills, looking at distant hills still drawn in binary code.",
    abstractText:
      "A collection of guides on putting AI to work across different domains, from everyday work to business and automation, in plain language.",
    startReading: "Start reading",
    startHere: "Start here",
    youAre: "You are",
    startWith: "Start with",
    leadsTo: "Leads to",
    routes: {
      ai: { you: "New to AI and LLMs", start: "Mental models before code" },
      automation: { you: "Want to automate a real workflow", start: "Step-by-step automation tutorials" },
      // The row that leads to the other language is written in that language.
      other: { you: "Lebih nyaman baca Bahasa Indonesia", start: "Semua tulisan versi Indonesia" },
    },
    allEntries: "All entries",
  },
  writing: {
    title: "Writing",
    description:
      "Guides and notes on using AI across domains: find the real problem first, then choose between an SOP, automation or AI.",
    dek: "Guides on using AI across domains.",
    kinds: "Two kinds of posts",
    tutorial: "Step by step. Ends with something that works.",
    note: "One idea, explained in plain language.",
    type: "Type",
    topic: "Topic",
    language: "Language",
    all: "All",
    count: (n) => (n === 1 ? "entry" : "entries"),
    newest: "Newest first",
    emptyTitle: ({ type, topic, lang }, t) => {
      const words = [
        lang !== "all" ? (lang === "id" ? "Indonesian" : "English") : "",
        topic !== "all" ? t.topics[topic] : "",
        type !== "all" ? `${t.types[type]?.toLowerCase()}s` : "posts",
      ].filter(Boolean);
      return `No ${words.join(" ")} yet`;
    },
    emptyFiltered: "Nothing is published under this filter yet.",
    emptyAll: "Nothing is published here yet.",
    seeAll: "See all writing",
  },
  table: { date: "Date", topic: "Topic", type: "Type", title: "Title", langRead: "Lang · Read", min: "min", draft: "Draft" },
  article: {
    published: "Published",
    readTime: "Read time",
    minutes: (n) => `${n} min`,
    topic: "Topic",
    type: "Type",
    level: "Level",
    language: "Language",
    learn: "What you'll learn",
    before: "Before you start",
    more: "More writing",
    back: "Back",
    allWriting: "All writing",
    next: "Next",
    nextButton: (type) => `Next ${type}`,
    notFound: "Post not found",
    onThisPage: "On this page",
  },
  copy: {
    context: "Copy context for AI",
    copied: "Copied. Paste it into your AI",
    failed: "Copy failed",
    title: "Copies this post as Markdown, ready to paste into ChatGPT, Claude or any AI chat",
    code: "Code",
    copy: "Copy",
    copiedShort: "Copied",
  },
  mdx: {
    callouts: { Note: "Note", Tip: "Tip", Rules: "Rules", Warning: "Warning", "Check your work": "Check your work" },
    problem: "Problem",
    worked: "What worked",
  },
  notFound: {
    label: "Not found",
    text: "Nothing lives at this address. The writing is one click away.",
    writing: "Go to writing",
    index: "Back to index",
  },
  error: {
    title: "Something went wrong.",
    text: "The page failed to load. Try again, or come back in a minute.",
    retry: "Try again",
  },
  ai: {
    brief: (name, url) =>
      `The article below is from the site ${name} (${url}). Use it as the source for our conversation: answer from what it says, say so when something is not covered, and quote it accurately.`,
    author: "Author",
    published: "Published",
    type: "Type",
    topic: "Topic",
    source: "Source",
  },
  og: {
    index: "Human meets Hack: guides on using AI across domains",
    writing: "Writing on Human meets Hack: guides on using AI across domains",
  },
};

const id = {
  ogLocale: "id_ID",
  skip: "Langsung ke konten",
  site: {
    title: "Human meets Hack",
    description:
      "Kumpulan panduan memanfaatkan AI di berbagai bidang, dari pekerjaan sehari-hari sampai bisnis dan otomasi, dengan bahasa sederhana.",
    tagline: "Panduan memanfaatkan AI di berbagai bidang",
  },
  nav: {
    index: "Indeks",
    writing: "Tulisan",
    primary: "Utama",
    menu: "Menu",
    close: "Tutup",
    switchTo: "English: ",
    toLight: "Ganti ke mode terang",
    toDark: "Ganti ke mode gelap",
  },
  footer: { credit: "Situs ini dikelola oleh", top: "Kembali ke atas ↑" },
  topics: { ai: "AI", automation: "Otomasi", web: "Web" },
  types: { tutorial: "Tutorial", note: "Catatan" },
  home: {
    // Two tones: [muted, ink]. The site's title, the same in both languages (owner, 2026-11-27).
    hero: ["Human meets", "Hack"],
    heroNote: "Gratis dibaca, tanpa daftar",
    heroAlt: "Seseorang dan sosok berkepala monitor komputer lama duduk berdampingan di bukit hijau, memandang bukit di kejauhan yang masih tergambar dalam kode biner.",
    abstractText:
      "Kumpulan panduan memanfaatkan AI di berbagai bidang, dari pekerjaan sehari-hari sampai bisnis dan otomasi, dengan bahasa sederhana.",
    startReading: "Mulai membaca",
    startHere: "Mulai dari sini",
    youAre: "Kamu",
    startWith: "Mulai dengan",
    leadsTo: "Menuju",
    routes: {
      ai: { you: "Baru mengenal AI dan LLM", start: "Model mental dulu, kode belakangan" },
      automation: { you: "Ingin mengotomasi alur kerja nyata", start: "Tutorial otomasi langkah demi langkah" },
      other: { you: "Prefer reading in English", start: "All writing in English" },
    },
    allEntries: "Semua tulisan",
  },
  writing: {
    title: "Tulisan",
    description:
      "Panduan dan catatan memanfaatkan AI di berbagai bidang: temukan dulu masalah yang sebenarnya, baru pilih antara SOP, otomasi, atau AI.",
    dek: "Panduan memanfaatkan AI di berbagai bidang.",
    kinds: "Dua jenis tulisan",
    tutorial: "Langkah demi langkah. Berakhir dengan sesuatu yang jalan.",
    note: "Satu ide, dijelaskan dengan bahasa sederhana.",
    type: "Jenis",
    topic: "Topik",
    language: "Bahasa",
    all: "Semua",
    count: () => "tulisan",
    newest: "Terbaru dulu",
    emptyTitle: ({ type, topic, lang }, t) => {
      const words = [
        type !== "all" ? t.types[type]?.toLowerCase() : "tulisan",
        topic !== "all" ? t.topics[topic] : "",
        lang !== "all" ? (lang === "id" ? "berbahasa Indonesia" : "berbahasa Inggris") : "",
      ].filter(Boolean);
      return `Belum ada ${words.join(" ")}`;
    },
    emptyFiltered: "Belum ada tulisan untuk filter ini.",
    emptyAll: "Belum ada yang terbit di sini.",
    seeAll: "Lihat semua tulisan",
  },
  table: { date: "Tanggal", topic: "Topik", type: "Jenis", title: "Judul", langRead: "Bahasa · Baca", min: "mnt", draft: "Draf" },
  article: {
    published: "Terbit",
    readTime: "Waktu baca",
    minutes: (n) => `${n} menit`,
    topic: "Topik",
    type: "Jenis",
    level: "Level",
    language: "Bahasa",
    learn: "Yang akan kamu pelajari",
    before: "Sebelum mulai",
    more: "Tulisan lainnya",
    back: "Kembali",
    allWriting: "Semua tulisan",
    next: "Berikutnya",
    nextButton: (type) => `${type} berikutnya`,
    notFound: "Tulisan tidak ditemukan",
    onThisPage: "Di halaman ini",
  },
  copy: {
    context: "Salin konteks untuk AI",
    copied: "Tersalin. Tempel ke AI kamu",
    failed: "Gagal menyalin",
    title: "Menyalin tulisan ini sebagai Markdown, siap ditempel ke ChatGPT, Claude, atau chat AI lainnya",
    code: "Kode",
    copy: "Salin",
    copiedShort: "Tersalin",
  },
  mdx: {
    callouts: { Note: "Catatan", Tip: "Tips", Rules: "Aturan", Warning: "Peringatan", "Check your work": "Cek hasilmu" },
    problem: "Masalah",
    worked: "Yang berhasil",
  },
  notFound: {
    label: "Tidak ditemukan",
    text: "Tidak ada apa-apa di alamat ini. Tulisan cuma sejauh satu klik.",
    writing: "Ke tulisan",
    index: "Kembali ke indeks",
  },
  error: {
    title: "Ada yang salah.",
    text: "Halaman gagal dimuat. Coba lagi, atau kembali sebentar lagi.",
    retry: "Coba lagi",
  },
  ai: {
    brief: (name, url) =>
      `Artikel di bawah ini berasal dari situs ${name} (${url}). Pakai sebagai sumber untuk percakapan kita: jawab berdasarkan isinya, bilang kalau sesuatu tidak dibahas, dan kutip dengan akurat.`,
    author: "Penulis",
    published: "Terbit",
    type: "Jenis",
    topic: "Topik",
    source: "Sumber",
  },
  og: {
    index: "Human meets Hack: panduan memanfaatkan AI di berbagai bidang",
    writing: "Tulisan di Human meets Hack: panduan memanfaatkan AI di berbagai bidang",
  },
};

const DICTIONARIES = { en, id };

export const t = (lang) => DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LOCALE];
