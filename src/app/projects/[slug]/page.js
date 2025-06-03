import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getAllProjectSlugs } from "@/utils/projects";
import { loadProjectContent } from "@/utils/LoadProjectContent";
import MDXContent from "@/components/MDXContent";

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found - Hasbi Hassadiqin",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - Hasbi Hassadiqin`,
    description: project.desc,
    openGraph: {
      title: project.title,
      description: project.desc,
      images: project.coverImage ? [project.coverImage] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  // Load MDX content on the server
  const mdxContent = await loadProjectContent(slug);

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
                    {project.client}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Year
                  </h3>
                  <p className="text-gray-900 font-medium text-lg">
                    {project.date}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Category
                  </h3>
                  <p className="text-gray-900 font-medium text-lg">
                    {project.category}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
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
                {project.title}
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl">
                {project.desc}
              </p>

              {/* Project Stats/Highlights (if you want to add them) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    {project.category}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Project Type
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    {project.technologies.length}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    Technologies Used
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    {project.date}
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
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium opacity-90">
                  {project.title} • {project.client}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content - Use MDX if available, otherwise show coming soon message */}
      <main className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          {mdxContent ? (
            // Render MDX content using the client component
            <MDXContent source={mdxContent} />
          ) : (
            // Fallback content when no MDX file exists
            <div className="text-center py-24">
              <div className="max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-light text-gray-900 mb-4">
                  Detailed case study coming soon
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  We're preparing a comprehensive breakdown of this project.
                  Check back soon for the full story, technical details, and
                  results.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Discuss Similar Project</span>
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
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 px-6 py-3 font-medium transition-colors"
                  >
                    <span>View Other Projects</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
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
                  {project.client}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  {project.category}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Year:</span>{" "}
                  {project.date}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Technologies:
                  </span>{" "}
                  {project.technologies.join(", ")}
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
