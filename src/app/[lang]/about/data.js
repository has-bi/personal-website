// About page facts, shared with the about split on Home. Client work is under NDA:
// the current role is described by what it covers, never by who it is for.
// Job titles, organisation names and tool names stay as they are in both languages.

const DATA = {
  en: {
    CURRENT_ROLE: {
      org: "Cekat.AI",
      kind: "Now",
      title: "Solutions Architect",
      detail: "Turning business problems into working systems. Client work stays under NDA, so it is not shown here.",
    },
    SOLUTION_STEPS: [
      { title: "Finding the real problem before the fix" },
      { title: "Choosing between an SOP, automation and AI" },
      { title: "Designing the solution end to end" },
      { title: "Building it, then measuring whether it worked" },
    ],
    TEACHING_ROLE: {
      org: "RevoU",
      kind: "Freelance",
      title: "AI & Data Analytics Instructor",
      detail: "Teaching Gen AI, prompt engineering, RAG chatbot development, Document AI, and analytics workflows.",
    },
    TEACHING_TOPICS: [
      { title: "Gen AI and prompt engineering", topic: "ai" },
      { title: "RAG chatbot development", topic: "ai" },
      { title: "Document AI", topic: "ai" },
      { title: "Analytics workflows" },
    ],
    LEARNING_PATH: [
      {
        period: "2025",
        title: "Full Stack Developer Bootcamp",
        place: "Devscale Indonesia",
        certificate: "/images/about/devscale-certificate.webp",
      },
      {
        period: "2023",
        title: "Full Stack Data Analytics",
        place: "RevoU",
        certificate: "/images/about/revou-certificate.webp",
      },
      {
        period: "2018–23",
        title: "S.T., Computer Engineering",
        place: "Universitas Brawijaya",
      },
    ],
    TOOLS: [
      {
        label: "AI",
        dot: "text-domain-ai",
        items: ["LLMs", "RAG", "LangChain", "Claude Code", "Document AI", "Computer vision", "Vector databases"],
      },
      { label: "Automation", dot: "text-domain-automation", items: ["n8n", "Python", "Google Cloud Platform"] },
      { label: "Web & data", dot: "text-muted", items: ["Next.js", "Flask", "PostgreSQL"] },
    ],
  },
};

DATA.id = {
  CURRENT_ROLE: {
    ...DATA.en.CURRENT_ROLE,
    kind: "Sekarang",
    detail:
      "Mengubah masalah bisnis menjadi sistem yang jalan. Pekerjaan untuk klien terikat NDA, jadi tidak ditampilkan di sini.",
  },
  SOLUTION_STEPS: [
    { title: "Menemukan masalah yang sebenarnya sebelum mencari solusi" },
    { title: "Memilih antara SOP, otomasi, dan AI" },
    { title: "Merancang solusinya dari awal sampai akhir" },
    { title: "Membangunnya, lalu mengukur apakah berhasil" },
  ],
  TEACHING_ROLE: {
    ...DATA.en.TEACHING_ROLE,
    kind: "Freelance",
    detail: "Mengajar Gen AI, prompt engineering, pengembangan chatbot RAG, Document AI, dan alur kerja analitik.",
  },
  TEACHING_TOPICS: [
    { title: "Gen AI dan prompt engineering", topic: "ai" },
    { title: "Pengembangan chatbot RAG", topic: "ai" },
    { title: "Document AI", topic: "ai" },
    { title: "Alur kerja analitik" },
  ],
  LEARNING_PATH: DATA.en.LEARNING_PATH.map((item) =>
    item.title === "S.T., Computer Engineering" ? { ...item, title: "S.T., Teknik Komputer" } : item
  ),
  TOOLS: [
    { ...DATA.en.TOOLS[0], items: ["LLM", "RAG", "LangChain", "Claude Code", "Document AI", "Computer vision", "Vector database"] },
    { ...DATA.en.TOOLS[1], label: "Otomasi" },
    { ...DATA.en.TOOLS[2], label: "Web & data" },
  ],
};

export const aboutData = (lang) => DATA[lang] || DATA.en;

// English defaults, kept for the Person schema in the root layout.
export const { CURRENT_ROLE, SOLUTION_STEPS, TEACHING_ROLE, TEACHING_TOPICS, LEARNING_PATH, TOOLS } = DATA.en;
