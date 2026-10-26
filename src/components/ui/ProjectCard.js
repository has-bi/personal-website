import Image from "next/image";
import Link from "next/link";
import { pad3 } from "@/lib/site";
import { Tag } from "./primitives";

const HEADER_STRIP = {
  ai: "bg-tint-ai",
  automation: "bg-tint-automation",
};

// project-card: tinted header strip, 3 thumbnails (1 on mobile), title, outcome, tag + stack.
export default function ProjectCard({ project, index }) {
  const thumbs = (project.gallery.length ? project.gallery : [project.coverImage]).filter(Boolean).slice(0, 3);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-hairline bg-surface transition-colors hover:border-hairline-strong"
    >
      <span
        className={`t-mono-label flex justify-between px-md py-xs text-ink ${HEADER_STRIP[project.topic] || "bg-surface-sunken"}`}
      >
        <span>§ {pad3(index + 1)}</span>
        <span>{project.date}</span>
      </span>
      <span className="flex flex-1 flex-col gap-md p-md">
        {thumbs.length ? (
          <span className="flex h-[180px] gap-xxs lg:h-[90px]">
            {thumbs.map((src, i) => (
              <span
                key={src}
                className={`relative flex-1 overflow-hidden border border-hairline bg-surface-sunken ${i > 0 ? "hidden lg:block" : ""}`}
              >
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 200px, 100vw" className="object-cover object-top" />
              </span>
            ))}
          </span>
        ) : null}
        <span className="t-title-md text-ink group-hover:text-accent">{project.title}</span>
        {project.outcome ? <span className="t-body-sm text-muted">{project.outcome}</span> : null}
        <span className="mt-auto flex items-center gap-sm">
          {project.topic ? <Tag topic={project.topic} /> : null}
          <span className="t-mono-meta uppercase text-muted">{project.technologies.join(" · ")}</span>
        </span>
      </span>
    </Link>
  );
}

export function ProjectGrid({ projects }) {
  const cols = projects.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <ul className={`grid grid-cols-1 gap-md lg:gap-xl ${cols}`}>
      {projects.map((project, index) => (
        <li key={project.slug}>
          <ProjectCard project={project} index={index} />
        </li>
      ))}
    </ul>
  );
}
