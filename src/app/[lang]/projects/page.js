import { Suspense } from "react";
import { getProjects } from "@/utils/content";
import { SectionLabel } from "@/components/ui/primitives";
import { alternates } from "@/lib/site";
import { t } from "@/lib/i18n";
import ProjectsIndex, { ProjectsList } from "./ProjectsIndex";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const labels = t(lang).projects;
  return { title: labels.title, description: labels.description, alternates: alternates("/projects", lang) };
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  const labels = t(lang).projects;
  const projects = (await getProjects()).map(({ content, headings, ...project }) => project);

  return (
    <>
      <section className="band pb-xl pt-xxxl lg:pb-xxl lg:pt-section">
        <div className="flex flex-col gap-lg lg:flex-row lg:gap-xl">
          <div className="flex flex-1 flex-col gap-lg">
            <SectionLabel>§ 02 · {labels.title}</SectionLabel>
            <h1 className="t-display-xl text-ink">/projects</h1>
            <p className="t-display-md text-muted">{labels.dek}</p>
          </div>
          <div className="flex flex-col gap-md lg:w-[360px] lg:shrink-0 lg:justify-end">
            <SectionLabel>{labels.aboutList}</SectionLabel>
            <p className="t-body-sm text-body">
              {labels.aboutListText}
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<ProjectsList projects={projects} lang={lang} />}>
        <ProjectsIndex projects={projects} lang={lang} />
      </Suspense>
    </>
  );
}
