// src/app/projects/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getAllProjectSlugs } from "@/utils/projects";

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const project = getProject(params.slug);

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

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors group">
                  <span>View Live Project</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
                <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 px-6 py-3 font-medium transition-colors">
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  <span>View Code</span>
                </button>
              </div>
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

      {/* Content Sections - Sample Placeholder Content */}
      <main className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          {/* Overview Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Overview</h2>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                This project represents a significant step forward in automating
                complex business processes through intelligent document
                processing and machine learning. The challenge was to create a
                system that could understand and extract data from various
                document formats while maintaining high accuracy and
                reliability.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Working closely with the {project.client} team, we identified
                key pain points in their existing workflow and designed a
                solution that not only addressed immediate needs but also scaled
                for future growth.
              </p>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              The Challenge
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Manual Processing
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Hours spent on repetitive data entry tasks that could be
                    automated
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Error-Prone
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Human errors in data extraction leading to downstream issues
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Scalability
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Unable to handle increasing document volumes efficiently
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The existing process required manual review and data entry for
              hundreds of documents daily, creating bottlenecks and introducing
              opportunities for human error. The team needed a solution that
              could maintain accuracy while dramatically increasing processing
              speed.
            </p>
          </section>

          {/* Solution Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              The Solution
            </h2>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-8">
                We developed an intelligent document processing system using
                cutting-edge AI technologies. The solution combines computer
                vision, natural language processing, and machine learning to
                automatically extract, validate, and process document data.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Automated Extraction
                  </h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered data extraction with 99.8% accuracy across
                    multiple document formats
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Real-time Processing
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Process documents in seconds rather than hours, with instant
                    validation
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Smart Validation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Built-in validation rules and anomaly detection for data
                    quality assurance
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive reporting and analytics for process
                    optimization
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Results & Impact
            </h2>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">
                  99%
                </div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">
                  92%
                </div>
                <div className="text-sm text-gray-600">Faster Processing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">
                  0.2%
                </div>
                <div className="text-sm text-gray-600">Error Rate</div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              The implementation resulted in dramatic improvements across all
              key metrics. Processing time was reduced from hours to minutes,
              while maintaining exceptional accuracy. The solution now handles
              thousands of documents monthly with minimal human intervention,
              allowing the team to focus on higher-value activities.
            </p>
          </section>

          {/* Technical Implementation */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Technical Implementation
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">
                    Architecture
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Microservices architecture on Google Cloud
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Containerized deployment with Docker
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Event-driven processing pipeline
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">
                    AI/ML Stack
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Google Document AI for OCR
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      Custom NLP models for data extraction
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      TensorFlow for model training and inference
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Next Project Navigation */}
      <section className="border-t border-gray-200 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <Link
              href="/projects"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
              <span>All Projects</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Start a Project</span>
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
