// src/utils/projects.js

// Project data - this will be our single source of truth
const projectsData = [
  {
    slug: "po-tracker-document-ai",
    title: "Purchase Order Data Entry Automations using Document AI",
    desc: "Transformed manual document processing into an intelligent system that automatically extracts data from seven different distributor formats. This cloud-based solution reduced processing costs by 88%, increased speed by 92%, and maintains a remarkable 0.2% error rate.",
    coverImage: "/images/projects/po-cover.png",
    date: "2024",
    client: "Youvit",
    category: "AI & Automation",
    technologies: ["Document AI", "Google Cloud", "Python"],
    featured: true,
  },
  {
    slug: "whatsapp-affiliate-automation",
    title: "Streamlining Affiliate Communications with WhatsApp Automation",
    desc: "Built an intelligent WhatsApp-based system that automates and personalizes affiliate communications at scale. This Next.js platform enables templated messaging, scheduled broadcasts, and centralized contact management through an intuitive web interface.",
    coverImage: "/images/projects/affiliate-cover.png",
    date: "2025",
    client: "Youvit",
    category: "Automation",
    technologies: ["Next.js", "WhatsApp API", "Node.js", "React"],
    featured: true,
  },
  {
    slug: "theramind-mental-wellness",
    title: "Emotion-Centered Digital Companion for Mental Wellness",
    desc: "Designed and built a comprehensive mental wellness application that helps users track their emotional states, engage in AI-powered therapeutic conversations, and discover relevant mental health content.",
    coverImage: "/images/projects/theramind-cover.png",
    date: "2025",
    client: "Devscale",
    category: "Healthcare & AI",
    technologies: ["Next.Js", "Tailwind", "OpenAI", "Vercel"],
    featured: true,
  },
  {
    slug: "nutritalk-customer-service",
    title: "AI-Powered Customer Service on WhatsApp",
    desc: "Created an intelligent WhatsApp-based nutrition assistant that gives Youvit customers 24/7 access to personalized vitamin information. By implementing Retrieval-Augmented Generation (RAG), we achieved a 98% increase in user adoption.",
    coverImage: "/images/projects/nutritalk-cover.png",
    date: "2024",
    client: "Youvit",
    category: "AI & Customer Service",
    technologies: ["RAG", "WhatsApp API", "OpenAI", "Vector Database", "n8n"],
    featured: true,
  },
];

/**
 * Get all project slugs for static generation
 * @returns {string[]} Array of project slugs
 */
export function getAllProjectSlugs() {
  return projectsData.map((project) => project.slug);
}

/**
 * Get all projects
 * @returns {Array} Array of all projects
 */
export function getProjects() {
  return projectsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get featured projects (for homepage)
 * @returns {Array} Array of featured projects
 */
export function getFeaturedProjects() {
  return projectsData.filter((project) => project.featured);
}

/**
 * Get a single project by slug
 * @param {string} slug - The project slug
 * @returns {Object|null} Project data
 */
export function getProject(slug) {
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return null;

  // For now, return project data without MDX content
  // MDX content loading will be handled separately when needed
  return {
    ...project,
    content: "", // Placeholder - will be loaded by server components when needed
  };
}

/**
 * Get projects by category
 * @param {string} category - The category to filter by
 * @returns {Array} Array of projects in the specified category
 */
export function getProjectsByCategory(category) {
  return projectsData.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 * @returns {string[]} Array of unique categories
 */
export function getAllCategories() {
  const categories = new Set();
  projectsData.forEach((project) => {
    if (project.category) {
      categories.add(project.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Get projects by technology
 * @param {string} technology - The technology to filter by
 * @returns {Array} Array of projects using the specified technology
 */
export function getProjectsByTechnology(technology) {
  return projectsData.filter(
    (project) =>
      project.technologies &&
      project.technologies.some(
        (tech) => tech.toLowerCase() === technology.toLowerCase()
      )
  );
}

/**
 * Get all unique technologies
 * @returns {string[]} Array of unique technologies
 */
export function getAllTechnologies() {
  const technologies = new Set();
  projectsData.forEach((project) => {
    if (project.technologies) {
      project.technologies.forEach((tech) => technologies.add(tech));
    }
  });
  return Array.from(technologies).sort();
}
