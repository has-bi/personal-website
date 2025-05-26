// src/app/blog/layout.js
import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Clean Content */}
      <main>{children}</main>

      {/* Simple Footer Navigation */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
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
              <span>All Articles</span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Projects</span>
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
      </footer>
    </div>
  );
}
