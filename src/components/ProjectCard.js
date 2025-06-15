import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  // Fallback image for projects without cover images
  const defaultImage =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center";
  const imageUrl = project.coverImage || defaultImage;

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-100 hover:border-indigo-400 transition-all duration-300 hover:shadow-sm overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title || "Project"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Fallback when no image is available
            <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-indigo-300 mx-auto mb-2"
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
                <p className="text-sm text-indigo-400 font-medium">Project</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
            {project.title || "Untitled Project"}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
            {project.desc || "No description available"}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {project.client || "Client"}
              </span>
              <time className="text-xs text-gray-500 mt-0.5">
                {project.date || "TBD"}
              </time>
            </div>

            {/* Arrow Indicator */}
            <div className="flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-500"
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
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
