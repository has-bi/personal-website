// src/app/projects/[slug]/page.js - Final Complete Version
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectFromNotion } from "@/utils/notion";
import NotionRenderer from "@/components/NotionRenderer";
import { SafeProjectImage } from "@/components/SafeImage";

// Enable SSR for live updates
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const project = await getProjectFromNotion(slug);

    if (!project) {
      return {
        title: "Project Not Found - Hasbi Hassadiqin",
        description: "The requested project could not be found.",
      };
    }

    return {
      title: `${project.title || "Project"} - Hasbi Hassadiqin`,
      description: project.desc || "A project by Hasbi Hassadiqin",
      openGraph: {
        title: project.title || "Project",
        description: project.desc || "A project by Hasbi Hassadiqin",
        images: project.coverImage ? [project.coverImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating project metadata:", error);
    return {
      title: "Project - Hasbi Hassadiqin",
      description: "A project by Hasbi Hassadiqin",
    };
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  let project;
  try {
    project = await getProjectFromNotion(slug);
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Navigation */}
          <nav className="mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              All Projects
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Column - Project Meta */}
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Case Study
                </span>
              </div>

              {/* Project Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Client
                  </h3>
                  <p className="text-gray-900 font-medium text-lg">
                    {project.client || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Year
                  </h3>
                  <p className="text-gray-900 font-medium text-lg">
                    {project.date || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Category
                  </h3>
                  <p className="text-gray-900 font-medium text-lg">
                    {project.category || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies && project.technologies.length > 0 ? (
                      project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.13 8.13 0 01-2.939-.515L5 20l.735-3.061A8.001 8.001 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                        />
                      </svg>
                      <span>Discuss similar project</span>
                    </Link>
                    <Link
                      href="/projects"
                      className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <span>View all projects</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Title & Description */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mb-8 leading-tight">
                {project.title || "Untitled Project"}
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl">
                {project.desc || "No description available"}
              </p>

              {/* Project Stats/Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    {project.category || "General"}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Project Type
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    {project.technologies ? project.technologies.length : 0}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Technologies Used
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    {project.date || "TBD"}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Completion Year
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {project.coverImage && (
        <section className="px-6 mb-16">
          <div className="container mx-auto max-w-6xl">
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl bg-gray-100">
              <SafeProjectImage
                src={project.coverImage}
                alt={project.title || "Project cover"}
                fill={true}
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium opacity-90">
                  {project.title || "Project"} • {project.client || "Client"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content - Use Notion Renderer */}
      <main className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <NotionRenderer
            blocks={project.content}
            title={project.title}
            showTitle={false}
          />
        </div>
      </main>

      {/* Project Navigation */}
      <section className="border-t border-gray-200 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Info Summary */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Project Summary
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Client:</span>{" "}
                  {project.client || "Not specified"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  {project.category || "Not specified"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Year:</span>{" "}
                  {project.date || "Not specified"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Technologies:
                  </span>{" "}
                  {project.technologies && project.technologies.length > 0
                    ? project.technologies.join(", ")
                    : "Not specified"}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Explore More
              </h3>
              <div className="space-y-4">
                <Link
                  href="/projects"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-indigo-600">
                      All Projects
                    </p>
                    <p className="text-sm text-gray-500">
                      View my complete project portfolio
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-indigo-600">
                      Start Your Project
                    </p>
                    <p className="text-sm text-gray-500">
                      Let's discuss your next digital solution
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
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
