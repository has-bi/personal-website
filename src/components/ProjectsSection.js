"use client";

import React, { useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import useCardStackEffect from "../hooks/useCardStackEffect";
import "../components/CardStack.css";
import { motion, stagger, useInView } from "framer-motion";

const projects = [
  {
    slug: "po-tracker-document-ai",
    title:
      "Intelligent Document Processing System for Automating Purchase Order Data Entry Workflows",
    desc: "Transformed manual document processing into an intelligent system that automatically extracts data from seven different (more) distributor formats. This cloud-based solution reduced processing costs by 99%, increased speed by 92%, and maintains a remarkable 0.2% error rate. Now the team tracks orders effortlessly while focusing on what humans do best—building relationships, not entering data.",
    coverImage: "/images/projects/po-cover.png",
    date: "Jul 20, 2024",
    client: "Youvit",
  },
  {
    slug: "whatsapp-affiliate-automation",
    title:
      "WhatsApp-Based Communication Platform for Managing and Automating Affiliate Partnerships",
    desc: "Built an intelligent WhatsApp-based system that automates and personalizes affiliate communications at scale. This Next.js platform enables templated messaging, scheduled broadcasts, and centralized contact management through an intuitive web interface. The system integrates seamlessly with Google Sheets, allowing the team to maintain affiliate relationships efficiently while focusing on strategy rather than manual message sending.",
    coverImage: "/images/projects/po-cover.png",
    date: "May 14, 2025",
    client: "Youvit",
  },
  {
    slug: "theramind-mental-wellness",
    title:
      "Mobile-First Digital Mental Wellness Application with Emotion-Centered Architecture Design",
    desc: "Designed and built a comprehensive mental wellness application that helps users track their emotional states, engage in AI-powered therapeutic conversations, and discover relevant mental health content. This mobile-first platform uses an emotion-centric architecture where feelings serve as the connecting thread between journaling, mood tracking, and personalized recommendations—creating a cohesive experience that supports users on their mental health journey.",
    coverImage: "/images/projects/po-cover.png",
    date: "Mar 8, 2025",
    client: "Devscale ",
  },
  {
    slug: "nutritalk-ai-customer-service",
    title:
      "AI-Powered WhatsApp Nutritional Guidance System with Retrieval-Augmented Knowledge Base",
    desc: "Created an intelligent WhatsApp-based nutrition assistant that gives Youvit customers 24/7 access to personalized vitamin information. By moving from a traditional web interface to WhatsApp and implementing Retrieval-Augmented Generation (RAG), we achieved a 98% increase in user adoption while reducing response times from 4 hours to just 6 minutes. The system resolves 91% of customer inquiries automatically, freeing Youvit's nutritionist from repetitive questions and expanding their marketing database by 42%.",
    coverImage: "/images/projects/po-cover.png",
    date: "Nov 18, 2024",
    client: "Youvit",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stifness: 80,
        damping: 17,
      },
    },
  };

  return (
    <section className="py-16 relative" id="projects-section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-1/4">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <h2 className="uppercase text-sm font-medium tracking-wider">
                Project
              </h2>
            </div>
          </div>
        </div>

        <motion.div
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={cardVariants}
              className="card-item"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-end mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mt-4 hover:underline"
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
      </div>
    </section>
  );
}
