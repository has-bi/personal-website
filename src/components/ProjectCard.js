import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-100 hover:border-indigo-400 transition-all duration-300 hover:shadow-sm overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <Image
            src={project.coverImage || "https://via.placeholder.com/600x400"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
            {project.desc}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {project.client}
              </span>
              <time className="text-xs text-gray-500 mt-0.5">
                {project.date}
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
