import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/utils/content";
import { SITE_URL, TOPICS } from "@/lib/site";
import { Breadcrumb, ButtonGhost, MetaStrip, SectionLabel, Tag } from "@/components/ui/primitives";
import { DesktopToc, MobileToc } from "@/components/ui/ArticleAside";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.desc || undefined,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.desc || undefined,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

const hostOf = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ProjectLinks({ project }) {
  if (!project.liveUrl && !project.sourceUrl) return null;
  const link = "t-mono-meta flex min-h-11 items-center uppercase text-accent hover:text-accent-active";
  return (
    <div className="flex flex-col gap-xs">
      <p className="t-mono-label text-faint">Links</p>
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={link}>
          Live app ↗
        </a>
      ) : null}
      {project.sourceUrl ? (
        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
          Source code ↗
        </a>
      ) : null}
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const topic = TOPICS[project.topic]?.label || project.topic;

  const meta = [
    project.topic && { label: "Topic", value: <Tag topic={project.topic} /> },
    project.date && { label: "Year", value: project.date },
    project.role && { label: "Role", value: project.role },
    project.team && { label: "Team", value: project.team },
    project.liveUrl && {
      label: "Link",
      value: (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent normal-case hover:text-accent-active">
          {hostOf(project.liveUrl)} ↗
        </a>
      ),
    },
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.desc,
    url: `${SITE_URL}/projects/${project.slug}`,
    dateCreated: project.date,
    creator: { "@type": "Person", name: "Hasbi Hassadiqin", url: SITE_URL },
    keywords: project.technologies.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Breadcrumb
        parent="/projects"
        slug={project.slug}
        aside={
          project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono-nav hidden min-h-11 shrink-0 items-center text-accent hover:text-accent-active sm:flex"
            >
              {hostOf(project.liveUrl)} ↗
            </a>
          ) : null
        }
      />

      <header className="band flex flex-col gap-lg pb-xl pt-xxl lg:gap-xl lg:pb-xxl lg:pt-section">
        <SectionLabel>
          § 02 · Projects{topic ? ` / ${topic}` : ""}
        </SectionLabel>
        <div className="flex max-w-[1040px] flex-col gap-lg">
          <h1 className="t-article-title text-ink">{project.title}</h1>
          {project.desc ? <p className="t-dek text-muted">{project.desc}</p> : null}
        </div>
        <MetaStrip items={meta} />
      </header>

      {project.coverImage ? (
        <div className="lg:band">
          <div className="relative aspect-video w-full overflow-hidden border-y border-hairline bg-surface-sunken lg:border">
            <Image
              src={project.coverImage}
              alt={`${project.title}, cover`}
              fill
              priority
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <MobileToc headings={project.headings} />

      <div className="band flex gap-[60px] pb-xxl pt-xl lg:py-section">
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <DesktopToc headings={project.headings}>
            <ProjectLinks project={project} />
          </DesktopToc>
        </aside>
        <div className="flex w-full max-w-prose min-w-0 flex-col gap-lg">
          {project.content}
          <div className="lg:hidden">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>

      <nav aria-label="More projects" className="band flex flex-col-reverse gap-md border-t border-hairline pb-xxxl pt-xl lg:flex-row lg:gap-xl lg:pb-section lg:pt-xxl">
        <div className="flex flex-1 flex-col items-start gap-md">
          <p className="t-mono-label text-faint">Back</p>
          <ButtonGhost href="/projects">All projects</ButtonGhost>
        </div>
        {next ? (
          <div className="flex flex-1 flex-col items-start gap-md border border-hairline bg-surface p-lg">
            <p className="t-mono-label text-muted">Next project · {TOPICS[next.topic]?.label || next.topic}</p>
            <p className="t-title-lg text-ink">{next.title}</p>
            <ButtonGhost href={`/projects/${next.slug}`}>Open project</ButtonGhost>
          </div>
        ) : null}
      </nav>
    </article>
  );
}
