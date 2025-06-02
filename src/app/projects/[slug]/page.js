// src/app/projects/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getAllProjectSlugs } from "@/utils/projects";
import { loadProjectContent } from "@/utils/LoadProjectContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../mdx-components";

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
  const components = useMDXComponents({});

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
          <nav className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
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
              Projects
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Client
                  </h3>
                  <p className="text-gray-900 font-medium">{project.client}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Year
                  </h3>
                  <p className="text-gray-900 font-medium">{project.date}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Category
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {project.category}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Title & Description */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                {project.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {project.coverImage && (
        <section className="px-6 mb-16">
          <div className="container mx-auto max-w-6xl">
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content - Use MDX if available, otherwise show simple message */}
      <main className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          {mdxContent ? (
            // Render MDX content
            <div
              className="prose prose-lg prose-gray max-w-none
              prose-headings:font-light prose-headings:text-gray-900
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-300 prose-a:underline-offset-4 hover:prose-a:decoration-gray-600 prose-a:transition-colors
              prose-strong:text-gray-900 prose-strong:font-medium
              prose-em:text-gray-700
              prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-mono
              prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:text-lg
              prose-ul:my-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
              prose-img:rounded-xl prose-img:my-8"
            >
              <MDXRemote source={mdxContent} components={components} />
            </div>
          ) : (
            // Simple message when no MDX content
            <div className="text-center py-24">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-light text-gray-900 mb-4">
                  Detailed case study coming soon
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We're preparing a comprehensive breakdown of this project.
                  Check back soon for the full story, technical details, and
                  results.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Next Project Navigation */}
      <section className="border-t border-gray-200 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-end items-center">
            <Link
              href="/projects"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>All Projects</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
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
