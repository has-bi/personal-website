import HomeHero from "@/components/HomeHero";
import HomeMenu from "@/components/HomeMenu";
import { getFeaturedProjects } from "@/utils/projects";

const projectPlaceholders = [
  {
    label: "Coming Soon",
    href: "/projects",
    title: "Workflow Intelligence Dashboard",
    preview: "A project slot for upcoming work in analytics, operations, and AI-assisted decisions.",
    image: "linear-gradient(135deg, rgba(92, 74, 160, 0.72), rgba(235, 237, 244, 0.94))",
  },
  {
    label: "Prototype",
    href: "/projects",
    title: "Internal Knowledge Copilot",
    preview: "A placeholder highlight for retrieval, team knowledge, and practical AI support systems.",
    image: "linear-gradient(135deg, rgba(104, 64, 200, 0.68), rgba(242, 237, 246, 0.94))",
  },
  {
    label: "Exploration",
    href: "/projects",
    title: "Automation Control Center",
    preview: "A future case study slot for monitoring automations and reducing operational drag.",
    image: "linear-gradient(135deg, rgba(74, 86, 168, 0.66), rgba(232, 238, 240, 0.94))",
  },
];

export default function Home() {
  const projectHighlights = getFeaturedProjects().map((project) => ({
    label: project.category,
    href: `/projects/${project.slug}`,
    title: project.title,
    preview: project.desc,
    image: project.coverImage,
  }));
  const heroSections = [...projectHighlights, ...projectPlaceholders].slice(0, 7);

  return (
    <div className="editorial-page">
      <HomeMenu />

      <main className="editorial-main">
        <HomeHero sections={heroSections} />
      </main>
    </div>
  );
}
