// src/app/blog/layout.js
import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              <svg
                className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </nav>

          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-medium text-xs">H</span>
              </div>
              <span className="font-medium text-gray-700">
                Hasbi Hassadiqin
              </span>
              <span className="mx-2">•</span>
              <time>January 15, 2025</time>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Building Interactive Code Examples with MDX
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Learn how to create engaging technical blog posts with interactive
            code examples using MDX and Next.js
          </p>

          <div className="flex flex-wrap gap-2">
            {["Next.js", "MDX", "React", "JavaScript"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-gray max-w-none">{children}</div>
        </div>
      </article>

      {/* Author Section */}
      <section className="border-t border-gray-100 bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Hasbi Hassadiqin
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Applied AI Engineer passionate about creating intelligent
                  solutions that simplify complex problems. Based in Jakarta,
                  Indonesia.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="/about"
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                  >
                    Learn more →
                  </Link>
                  <Link
                    href="/contact"
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                  >
                    Get in touch →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
