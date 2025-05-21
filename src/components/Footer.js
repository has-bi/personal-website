import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* PERSONAL */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-medium mb-4">Hasbi Hassadiqin</h2>
            <p className="text-gray-400 text-sm mb-6">
              Help you build and redefine fundamental concepts through digital
              interfaces
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex space-x-4">
              <Link
                href="mailto:hassadiqin.31@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/in/yourprofile"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </Link>
              <Link
                href="https://github.com/yourusername"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/yourusername"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* WEBSITE */}
          <div>
            <h3 className="text-sm font-meidum uppercase tracking-wider mb-4 text-gray-400">
              The Website
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/uses"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Uses
              </Link>
              <Link
                href="/testimonials"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="/skills"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Skills
              </Link>
              <Link
                href="/timeline"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Timelines
              </Link>
            </nav>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              Subscribe to my blog newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Don't miss out 😉 Get an email whenever I post, no spam.
            </p>

            {/* Newsletter Form */}
            <form className="mb-2">
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-900 text-white px-4 py-2 flex-grow rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md flex items-center transition-colors"
                >
                  Subscribe Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="pt-8 border-t border-gray-800 text-gray-400 text-sm">
          <p>
            Copyright © {currentYear} Hasbi Hassadiqin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
