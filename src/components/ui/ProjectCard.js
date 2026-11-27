import Image from "next/image";
import Link from "next/link";
import { localize } from "@/lib/i18n";
import { Tag } from "./primitives";

// project-card: rounded card, 3 thumbnails (1 on mobile), title, outcome, tag + stack.
export default function ProjectCard({ project, lang }) {
  const thumbs = (project.gallery.length ? project.gallery : [project.coverImage]).filter(Boolean).slice(0, 3);

  return (
    <Link
      href={localize(lang, `/projects/${project.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-surface transition-colors hover:bg-surface-sunken"
    >
      <span className="flex flex-1 flex-col gap-md p-lg">
        {thumbs.length ? (
          <span className="flex h-[180px] gap-xxs lg:h-[90px]">
            {thumbs.map((src, i) => (
              <span
                key={src}
                className={`relative flex-1 overflow-hidden rounded-media bg-surface-sunken ${i > 0 ? "hidden lg:block" : ""}`}
              >
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 200px, 100vw" className="object-cover object-top" />
              </span>
            ))}
          </span>
        ) : null}
        <span className="t-title-md text-ink group-hover:text-accent">{project.title}</span>
        {project.outcome ? <span className="t-body-sm text-muted">{project.outcome}</span> : null}
        <span className="mt-auto flex flex-wrap items-center gap-sm">
          {project.topic ? <Tag topic={project.topic} lang={lang} /> : null}
          <span className="t-meta text-muted">{[project.date, ...project.technologies].filter(Boolean).join(" · ")}</span>
        </span>
      </span>
    </Link>
  );
}

export function ProjectGrid({ projects, lang }) {
  const cols = projects.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <ul className={`grid grid-cols-1 gap-md lg:gap-xl ${cols}`}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} lang={lang} />
        </li>
      ))}
    </ul>
  );
}
