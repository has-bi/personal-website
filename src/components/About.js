import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Column - Label */}
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                What I Do
              </span>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-900 max-w-4xl">
              An AI Engineer based in{" "}
              <span className="text-gray-500">Jakarta</span>, transforming
              complex problems into intelligent digital solutions.
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl">
              From AI-powered automation to full-stack applications, I build
              systems that eliminate repetitive tasks so people can focus on
              what truly matters.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-gray-900 hover:text-indigo-600 transition-colors duration-300 group"
            >
              <span className="font-medium">Learn more about me</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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

      {/* Decorative Divider */}
      <div className="relative mt-24">
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
    </section>
  );
}
