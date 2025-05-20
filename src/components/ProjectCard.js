import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg transition-all duration-300 hover:drop-shadow-2xl drop-shadow-md">
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-col md:flex-row h-full"
      >
        {/* Left side - Image */}
        <div className="md:w-5/12 relative h-64 md:h-auto rounded-lg">
          <Image
            src={project.coverImage || "https://via.placeholder.com/600x400"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        {/* Right side - Content */}
        <div className="md:w-7/12 p-6 md:p-8 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {project.title}
          </h2>

          <p className="text-gray-600 mb-6">{project.desc}</p>

          {/* Author/Date section */}
          <div className="mt-auto flex items-center">
            <div className="ml-3">
              <p className="font-medium text-gray-900">{project.client}</p>
              <p className="text-sm text-gray-500">{project.date}</p>
            </div>

            {/* Arrow icon (optional) */}
            <div className="ml-auto">
              <svg
                className="w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
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
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
