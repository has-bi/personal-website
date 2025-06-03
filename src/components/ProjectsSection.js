"use client";

import React, { useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";
import { getFeaturedProjects } from "@/utils/projects";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Get featured projects from utils
  const projects = getFeaturedProjects();

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-24" id="projects-section" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                Projects
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight text-gray-900">
              Selected work that showcases
              <br />
              <span className="text-gray-500">automation and intelligence</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              A curated collection of projects that demonstrate my approach to
              solving complex business problems through AI integration and smart
              automation.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{
                delay: index * 0.1,
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-gray-900 hover:text-gray-700 transition-colors duration-300 group"
          >
            <span className="font-medium">View all projects</span>
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
