// About page facts, shared with the about split on Home. Teaching and learning only:
// client and employer work is under NDA and is not listed anywhere on the site.

export const TEACHING_ROLE = {
  org: "RevoU",
  kind: "Freelance",
  title: "AI & Data Analytics Instructor",
  detail: "Teaching Gen AI, prompt engineering, RAG chatbot development, Document AI, and analytics workflows.",
};

export const TEACHING_TOPICS = [
  { title: "Gen AI and prompt engineering", topic: "ai" },
  { title: "RAG chatbot development", topic: "ai" },
  { title: "Document AI", topic: "ai" },
  { title: "Analytics workflows" },
];

export const LEARNING_PATH = [
  {
    period: "2025",
    title: "Full Stack Developer Bootcamp",
    place: "Devscale Indonesia",
    certificate: "/images/about/devscale-certificate.jpg",
  },
  {
    period: "2023",
    title: "Full Stack Data Analytics",
    place: "RevoU",
    certificate: "/images/about/revou-certificate.jpg",
  },
  {
    period: "2018–23",
    title: "S.T., Computer Engineering",
    place: "Universitas Brawijaya",
  },
];

export const TOOLS = [
  {
    label: "AI",
    dot: "text-domain-ai",
    items: ["LLMs", "RAG", "LangChain", "Claude Code", "Document AI", "Computer vision", "Vector databases"],
  },
  { label: "Automation", dot: "text-domain-automation", items: ["n8n", "Python", "Google Cloud Platform"] },
  { label: "Web & data", dot: "text-muted", items: ["Next.js", "Flask", "PostgreSQL"] },
];
