"use client";

import React, { useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    slug: "po-tracker-document-ai",
    title: "Purchase Order Data Entry Automations using Document AI",
    desc: "Transformed manual document processing into an intelligent system that automatically extracts data from seven different distributor formats. This cloud-based solution reduced processing costs by 99%, increased speed by 92%, and maintains a remarkable 0.2% error rate.",
    coverImage: "/images/projects/po-cover.png",
    date: "2024",
    client: "Youvit",
  },
  {
    slug: "whatsapp-affiliate-automation",
    title: "Streamlining Affiliate Communications with WhatsApp Automation",
    desc: "Built an intelligent WhatsApp-based system that automates and personalizes affiliate communications at scale. This Next.js platform enables templated messaging, scheduled broadcasts, and centralized contact management through an intuitive web interface.",
    coverImage: "/images/projects/affiliate-cover.png",
    date: "2025",
    client: "Youvit",
  },
  {
    slug: "theramind-mental-wellness",
    title: "Emotion-Centered Digital Companion for Mental Wellness",
    desc: "Designed and built a comprehensive mental wellness application that helps users track their emotional states, engage in AI-powered therapeutic conversations, and discover relevant mental health content.",
    coverImage: "/images/projects/theramind-cover.png",
    date: "2025",
    client: "Devscale",
  },
  {
    slug: "nutritalk-ai-customer-service",
    title: "AI-Powered Customer Service on Indonesia's Most Popular Platform",
    desc: "Created an intelligent WhatsApp-based nutrition assistant that gives Youvit customers 24/7 access to personalized vitamin information. By implementing Retrieval-Augmented Generation (RAG), we achieved a 98% increase in user adoption.",
    coverImage: "/images/projects/nutritalk-cover.png",
    date: "2024",
    client: "Youvit",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
              <span className="text-gray-500">innovation and impact</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              A curated collection of projects that demonstrate my approach to
              solving complex problems through technology and design.
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
            className="inline-flex items-center gap-3 text-gray-900 hover:text-indigo-600 transition-colors duration-300 group"
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
    </section>
  );
}
