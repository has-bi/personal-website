// src/app/page.js - Final Notion version
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/ProjectsSection";
import WorkSection from "@/components/WorkSection";
import BlogSection from "@/components/BlogSection";
import { PrimaryCTA } from "@/components/CTA";
import { getFeaturedProjects } from "@/utils/notion";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects(4);

  return (
    <div className="px-20">
      <Hero />
      <About />
      <WorkSection />
      <ProjectsSection projects={featuredProjects} />
      <BlogSection />
      <PrimaryCTA />
    </div>
  );
}
