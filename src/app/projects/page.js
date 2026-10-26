import { Suspense } from "react";
import { getProjects } from "@/utils/content";
import { SectionLabel } from "@/components/ui/primitives";
import ProjectsIndex, { ProjectsList } from "./ProjectsIndex";

export const metadata = {
  title: "Projects",
  description: "Personal projects in AI, automation, and web development.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = (await getProjects()).map(({ content, headings, ...project }) => project);

  return (
    <>
      <section className="band pb-xl pt-xxxl lg:pb-xxl lg:pt-section">
        <div className="flex flex-col gap-lg lg:flex-row lg:gap-xl">
          <div className="flex flex-1 flex-col gap-lg">
            <SectionLabel>§ 02 · Projects</SectionLabel>
            <h1 className="t-display-xl text-ink">/projects</h1>
            <p className="t-display-md text-muted">Things built to learn from, and to teach from.</p>
          </div>
          <div className="flex flex-col gap-md lg:w-[360px] lg:shrink-0 lg:justify-end lg:border-l lg:border-hairline lg:pl-xl">
            <SectionLabel>About this list</SectionLabel>
            <p className="t-body-sm text-body">
              Personal and bootcamp projects only. Client and employer work is under NDA and is not listed here.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<ProjectsList projects={projects} />}>
        <ProjectsIndex projects={projects} />
      </Suspense>
    </>
  );
}
