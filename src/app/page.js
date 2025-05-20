// src/app/page.js
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="px-20">
      <Hero />
      <About />
      <ProjectsSection />
    </div>
  );
}
