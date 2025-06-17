// src/app/page.js - Homepage with SSR
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/ProjectsSection";
import WorkSection from "@/components/WorkSection";
import BlogSection from "@/components/BlogSection";
import { PrimaryCTA } from "@/components/CTA";
import { getFeaturedProjects, getFeaturedBlogPosts } from "@/utils/notion";

// Enable SSR for live updates
export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredProjects = [];
  let featuredBlogPosts = [];

  try {
    // Fetch live data from Notion
    [featuredProjects, featuredBlogPosts] = await Promise.all([
      getFeaturedProjects(4),
      getFeaturedBlogPosts(3),
    ]);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Continue with empty arrays if fetch fails
  }

  return (
    <div className="px-20">
      <Hero />
      <About />
      <WorkSection />
      <ProjectsSection projects={featuredProjects} />
      <BlogSection posts={featuredBlogPosts} />
      <PrimaryCTA />
    </div>
  );
}
