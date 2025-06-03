// src/app/projects/page.js
import { getProjects, getAllCategories } from "@/utils/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects - Hasbi Hassadiqin",
  description:
    "A showcase of my work in AI, automation, and web development. Explore projects that demonstrate innovation and technical expertise.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <section className="pt-40 pb-5 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Column - Label */}
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  projects
                </span>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-light mb-6 leading-tight text-gray-900">
                Projects that solve real problems
                <br />
                <span className="text-gray-500">
                  with intelligent solutions
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-8">
                From AI-powered automation to full-stack applications, each
                project represents a unique challenge solved through thoughtful
                engineering and design. Explore the intersection of technology
                and impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="relative">
        <div className="w-full h-px bg-gray-200"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="text-center py-24">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No projects yet
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Check back soon for new projects and case studies.
        </p>
      </div>
    </div>
  );
}
