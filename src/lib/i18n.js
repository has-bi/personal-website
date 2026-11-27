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
  htmlLang: "en",
  ogLocale: "en_US",
  skip: "Skip to content",
  site: {
    title: "Hasbi Hassadiqin | Notes on AI & Automation",
    description:
      "Notes on AI and automation by Hasbi Hassadiqin: designing and building solutions, from finding the real problem to choosing the right fix.",
    person: "Designs and builds solutions, and writes notes on AI and automation.",
    tagline: "Notes on AI and automation",
  },
  nav: {
    index: "Index",
    writing: "Writing",
    projects: "Projects",
    about: "About",
    primary: "Primary",
    menu: "Menu",
    close: "Close",
    switchTo: "Bahasa Indonesia: ",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  footer: { elsewhere: "Elsewhere", top: "Back to top ↑" },
  topics: { ai: "AI", automation: "Automation", web: "Web" },
  types: { tutorial: "Tutorial", note: "Note" },
  home: {
    // Two tones: [muted, ink]. The site's title, the same in both languages (owner, 2026-11-27).
    hero: ["Human meets", "Hack"],
    heroNote: "Free to read, no sign-up",
    heroAlt: "A person and a figure with an old computer monitor for a head sit side by side on green hills, looking at distant hills still drawn in binary code.",
    abstract: "Abstract",
    abstractText: (role, org) =>
      // Draft from the owner's brief ("a collection of how to use AI across domains"); owner to approve.
      `A collection of ways to put AI to work across different domains, from everyday work to business and automation, explained in plain language. By Hasbi Hassadiqin, ${role} at ${org}.`,
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
    allProjects: "All projects",
    fullStory: "Full story",
  },
  writing: {
    title: "Writing",
    description:
      "Notes and tutorials on AI and automation by Hasbi Hassadiqin: find the real problem first, then choose between an SOP, automation or AI.",
    dek: "Tutorials and notes on AI and automation.",
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
    seeProjects: "See the projects",
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
    stuck: "Stuck, or found a mistake? Email",
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
    video: "Video",
  },
  about: {
    portraitAlt: "Pixel-art portrait of Hasbi Hassadiqin",
    title: "About",
    description: "About Hasbi Hassadiqin, Solutions Architect at Cekat.AI, who writes notes on AI and automation.",
    work: "Work",
    workTitle: "What I do",
    teaching: "Teaching",
    teachingTitle: "What I teach",
    path: "Learning path",
    pathTitle: "How I learned it",
    tools: "Tools",
    toolsTitle: "What I work with",
    certificate: (title, place) => `${title} certificate, ${place}`,
  },
  projects: {
    title: "Projects",
    description:
      "Personal projects by Hasbi Hassadiqin in AI, automation and the web. Client work is under NDA and is not listed here.",
    dek: "Things built to learn from, and to teach from.",
    aboutList: "About this list",
    aboutListText: "Personal and bootcamp projects only. Client and employer work is under NDA and is not listed here.",
    count: (n) => (n === 1 ? "project" : "projects"),
    emptyTopic: (topic) => `No ${topic} projects yet`,
    emptyTopicText: "Nothing is published under this topic yet.",
    seeAll: "See all projects",
    none: "No projects yet",
    noneText: "No projects are published yet.",
    readWriting: "Read the writing",
    links: "Links",
    live: "Live app ↗",
    source: "Source code ↗",
    year: "Year",
    role: "Role",
    team: "Team",
    link: "Link",
    more: "More projects",
    back: "Back",
    next: "Next project",
    open: "Open project",
    notFound: "Project not found",
    cover: (title) => `${title}, cover`,
  },
  notFound: {
    label: "Not found",
    text: "Nothing lives at this address. The writing and the projects are one click away.",
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
      `The article below is from ${name}'s site (${url}). Use it as the source for our conversation: answer from what it says, say so when something is not covered, and quote it accurately.`,
    author: "Author",
    published: "Published",
    type: "Type",
    topic: "Topic",
    source: "Source",
  },
  og: {
    index: "Hasbi Hassadiqin: notes on AI and automation",
    writing: "Writing by Hasbi Hassadiqin: tutorials and notes on AI and automation",
    about: "About Hasbi Hassadiqin",
    projects: "Projects by Hasbi Hassadiqin",
  },
};

const id = {
  htmlLang: "id",
  ogLocale: "id_ID",
  skip: "Langsung ke konten",
  site: {
    title: "Hasbi Hassadiqin | Catatan AI & Otomasi",
    description:
      "Catatan tentang AI dan otomasi oleh Hasbi Hassadiqin: merancang dan membangun solusi, dari menemukan masalah yang sebenarnya sampai memilih cara yang tepat.",
    person: "Merancang dan membangun solusi, dan menulis catatan tentang AI dan otomasi.",
    tagline: "Catatan AI dan otomasi",
  },
  nav: {
    index: "Indeks",
    writing: "Tulisan",
    projects: "Proyek",
    about: "Tentang",
    primary: "Utama",
    menu: "Menu",
    close: "Tutup",
    switchTo: "English: ",
    toLight: "Ganti ke mode terang",
    toDark: "Ganti ke mode gelap",
  },
  footer: { elsewhere: "Di tempat lain", top: "Kembali ke atas ↑" },
  topics: { ai: "AI", automation: "Otomasi", web: "Web" },
  types: { tutorial: "Tutorial", note: "Catatan" },
  home: {
    // Two tones: [muted, ink]. The site's title, the same in both languages (owner, 2026-11-27).
    hero: ["Human meets", "Hack"],
    heroNote: "Gratis dibaca, tanpa daftar",
    heroAlt: "Seseorang dan sosok berkepala monitor komputer lama duduk berdampingan di bukit hijau, memandang bukit di kejauhan yang masih tergambar dalam kode biner.",
    abstract: "Abstrak",
    abstractText: (role, org) =>
      // Draft from the owner's brief ("kumpulan cara memanfaatkan AI di berbagai bidang"); owner to approve.
      `Kumpulan cara memanfaatkan AI di berbagai bidang, dari pekerjaan sehari-hari sampai bisnis dan otomasi, dijelaskan dengan bahasa sederhana. Oleh Hasbi Hassadiqin, ${role} di ${org}.`,
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
    allProjects: "Semua proyek",
    fullStory: "Cerita lengkap",
  },
  writing: {
    title: "Tulisan",
    description:
      "Tutorial dan catatan tentang AI dan otomasi oleh Hasbi Hassadiqin: temukan dulu masalah yang sebenarnya, baru pilih antara SOP, otomasi, atau AI.",
    dek: "Tutorial dan catatan tentang AI dan otomasi.",
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
    seeProjects: "Lihat proyek",
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
    stuck: "Mentok, atau menemukan kesalahan? Email ke",
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
    video: "Video",
  },
  about: {
    portraitAlt: "Potret pixel art Hasbi Hassadiqin",
    title: "Tentang",
    description: "Tentang Hasbi Hassadiqin, Solutions Architect di Cekat.AI, yang menulis catatan tentang AI dan otomasi.",
    work: "Pekerjaan",
    workTitle: "Yang saya kerjakan",
    teaching: "Mengajar",
    teachingTitle: "Yang saya ajarkan",
    path: "Jalur belajar",
    pathTitle: "Cara saya mempelajarinya",
    tools: "Alat kerja",
    toolsTitle: "Yang saya pakai",
    certificate: (title, place) => `Sertifikat ${title}, ${place}`,
  },
  projects: {
    title: "Proyek",
    description:
      "Proyek pribadi Hasbi Hassadiqin di bidang AI, otomasi, dan web. Pekerjaan untuk klien terikat NDA dan tidak dicantumkan di sini.",
    dek: "Hal-hal yang dibangun untuk belajar, dan untuk mengajar.",
    aboutList: "Tentang daftar ini",
    aboutListText:
      "Hanya proyek pribadi dan bootcamp. Pekerjaan untuk klien dan perusahaan terikat NDA dan tidak dicantumkan di sini.",
    count: () => "proyek",
    emptyTopic: (topic) => `Belum ada proyek ${topic}`,
    emptyTopicText: "Belum ada proyek untuk topik ini.",
    seeAll: "Lihat semua proyek",
    none: "Belum ada proyek",
    noneText: "Belum ada proyek yang terbit.",
    readWriting: "Baca tulisan",
    links: "Tautan",
    live: "Aplikasi ↗",
    source: "Kode sumber ↗",
    year: "Tahun",
    role: "Peran",
    team: "Tim",
    link: "Tautan",
    more: "Proyek lainnya",
    back: "Kembali",
    next: "Proyek berikutnya",
    open: "Buka proyek",
    notFound: "Proyek tidak ditemukan",
    cover: (title) => `${title}, sampul`,
  },
  notFound: {
    label: "Tidak ditemukan",
    text: "Tidak ada apa-apa di alamat ini. Tulisan dan proyek cuma sejauh satu klik.",
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
    index: "Hasbi Hassadiqin: catatan AI dan otomasi",
    writing: "Tulisan Hasbi Hassadiqin: tutorial dan catatan tentang AI dan otomasi",
    about: "Tentang Hasbi Hassadiqin",
    projects: "Proyek Hasbi Hassadiqin",
  },
};

const DICTIONARIES = { en, id };

export const t = (lang) => DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LOCALE];
