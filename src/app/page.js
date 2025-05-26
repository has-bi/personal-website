// src/app/page.js
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/ProjectsSection";
import WorkSection from "@/components/WorkSection";
import AIChatSection from "@/components/ChatSection";

export default function Home() {
  return (
    <div className="px-20">
      <Hero />
      <About />
      <WorkSection />
      <AIChatSection />
      <ProjectsSection />
    </div>
  );
}
