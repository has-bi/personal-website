"use client";

import { FilterGroup, useFilters } from "@/components/ui/Filters";
import { ProjectGrid } from "@/components/ui/ProjectCard";
import { EmptyState } from "@/components/ui/primitives";
import { localize, t } from "@/lib/i18n";

export function ProjectsList({ projects, lang, filters = { topic: "all" } }) {
  const dict = t(lang);
  const labels = dict.projects;
  const pathname = localize(lang, "/projects");
  const topicOptions = Object.entries(dict.topics).map(([value, label]) => ({ value, label }));
  const shown = projects.filter((project) => filters.topic === "all" || project.topic === filters.topic);

  return (
    <>
      <div className="band border-b border-t border-hairline py-sm">
        <div className="flex flex-col gap-xs lg:flex-row lg:items-center lg:justify-between">
          <FilterGroup pathname={pathname} current={filters} name="topic" label={dict.writing.topic} options={topicOptions} allLabel={dict.writing.all} />
          <p className="t-meta hidden text-muted lg:block" aria-live="polite">
            {shown.length} {labels.count(shown.length)} · {dict.writing.newest}
          </p>
        </div>
      </div>
      <div className="band pb-xxxl pt-xl lg:pb-section lg:pt-xxl">
        {shown.length ? (
          <ProjectGrid projects={shown} lang={lang} />
        ) : filters.topic !== "all" ? (
          <EmptyState
            title={labels.emptyTopic(dict.topics[filters.topic] || filters.topic)}
            action={{ href: pathname, label: labels.seeAll }}
          >
            {labels.emptyTopicText}
          </EmptyState>
        ) : (
          <EmptyState title={labels.none} action={{ href: localize(lang, "/writing"), label: labels.readWriting }}>
            {labels.noneText}
          </EmptyState>
        )}
      </div>
    </>
  );
}

export default function ProjectsIndex({ projects, lang }) {
  const filters = useFilters(["topic"]);
  return <ProjectsList projects={projects} lang={lang} filters={filters} />;
}
