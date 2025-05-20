import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    slug: "green-plants-extinction",
    title:
      "Green plants are going to Extinct about 500 times faster than they should, Study finds",
    desc: "If you are the sort of person who just can not keep a plant alive, you are not alone according to a new study published June 10 in the journal Nature.",
    coverImage: "/images/projects/dummy1.jpg",
    date: "Jun 20, 2019",
    client: "Youvit",
  },
  // Add more projects as needed
];

export default function ProjectsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-1/4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <h2 className="uppercase text-sm font-medium tracking-wider">
                What I do
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-4 md:mt-0 inline-flex items-center text-black font-medium hover:underline"
        >
          View all projects
          <svg
            className="ml-2 w-4 h-4"
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
        </Link>
      </div>
    </section>
  );
}
