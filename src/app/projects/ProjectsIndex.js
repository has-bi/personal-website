"use client";

import { FilterGroup, useFilters } from "@/components/ui/Filters";
import { ProjectGrid } from "@/components/ui/ProjectCard";
import { EmptyState } from "@/components/ui/primitives";
import { pad2, TOPICS } from "@/lib/site";

const TOPIC_OPTIONS = Object.entries(TOPICS).map(([value, item]) => ({ value, label: item.label }));

export function ProjectsList({ projects, filters = { topic: "all" } }) {
  const shown = projects.filter((project) => filters.topic === "all" || project.topic === filters.topic);

  return (
    <>
      <div className="band border-b border-t border-hairline py-sm">
        <div className="flex flex-col gap-xs lg:flex-row lg:items-center lg:justify-between">
          <FilterGroup pathname="/projects" current={filters} name="topic" label="Topic" options={TOPIC_OPTIONS} />
          <p className="t-mono-meta hidden uppercase text-muted lg:block" aria-live="polite">
            {pad2(shown.length)} {shown.length === 1 ? "project" : "projects"} · Newest first
          </p>
        </div>
      </div>
      <div className="band pb-xxxl pt-xl lg:pb-section lg:pt-xxl">
        {shown.length ? (
          <ProjectGrid projects={shown} />
        ) : filters.topic !== "all" ? (
          <EmptyState
            title={`No ${TOPICS[filters.topic]?.label || filters.topic} projects yet`}
            action={{ href: "/projects", label: "See all projects" }}
          >
            Nothing is published under this topic yet.
          </EmptyState>
        ) : (
          <EmptyState title="No projects yet" action={{ href: "/writing", label: "Read the tutorials" }}>
            No projects are published yet.
          </EmptyState>
        )}
      </div>
    </>
  );
}

export default function ProjectsIndex({ projects }) {
  const filters = useFilters(["topic"]);
  return <ProjectsList projects={projects} filters={filters} />;
}
