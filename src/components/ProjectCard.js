import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <div className="bg-white rounded-2xl transition-all duration-300 hover:shadow-lg outline-white hover:outline-indigo-400 overflow-hidden h-full flex flex-col">
        {/* Image at the top */}
        <div className="relative w-full pb-[65%] overflow-hidden">
          <Image
            src={project.coverImage || "https://via.placeholder.com/600x400"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl md:text-2xl font-normal mb-3 line-clamp-2">
            {project.title}
          </h2>

          <p className="text-gray-600 mb-6 line-clamp-3">{project.desc}</p>

          {/* Author/Date section */}
          <div className="mt-auto flex items-center">
            <div className="ml-0">
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
      </div>
    </Link>
  );
}
