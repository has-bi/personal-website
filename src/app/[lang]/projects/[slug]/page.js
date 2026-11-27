import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/utils/content";
import { alternates, SITE_URL } from "@/lib/site";
import { localize, t } from "@/lib/i18n";
import { Breadcrumb, ButtonGhost, MetaStrip, SectionLabel, Tag } from "@/components/ui/primitives";
import { DesktopToc, MobileToc } from "@/components/ui/ArticleAside";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const project = await getProject(slug);
  if (!project) return { title: t(lang).projects.notFound };

  return {
    title: project.title,
    description: project.desc || undefined,
    alternates: alternates(`/projects/${project.slug}`, lang),
    openGraph: {
      title: project.title,
      description: project.desc || undefined,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

const hostOf = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ProjectLinks({ project, labels }) {
  if (!project.liveUrl && !project.sourceUrl) return null;
  const link = "t-meta flex min-h-11 items-center text-accent hover:text-accent-active";
  return (
    <div className="flex flex-col gap-xs">
      <p className="t-label text-faint">{labels.links}</p>
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={link}>
          {labels.live}
        </a>
      ) : null}
      {project.sourceUrl ? (
        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
          {labels.source}
        </a>
      ) : null}
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug, lang } = await params;
  const dict = t(lang);
  const labels = dict.projects;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const topic = dict.topics[project.topic] || project.topic;

  const meta = [
    project.topic && { label: dict.article.topic, value: <Tag topic={project.topic} lang={lang} /> },
    project.date && { label: labels.year, value: project.date },
    project.role && { label: labels.role, value: project.role },
    project.team && { label: labels.team, value: project.team },
    project.liveUrl && {
      label: labels.link,
      value: (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-active">
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
    url: `${SITE_URL}${localize(lang, `/projects/${project.slug}`)}`,
    dateCreated: project.date,
    creator: { "@type": "Person", name: "Hasbi Hassadiqin", url: SITE_URL },
    keywords: project.technologies.join(", "),
  };

  return (
    <article lang={project.lang !== lang ? project.lang : undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Breadcrumb
        parent="/projects"
        href={localize(lang, "/projects")}
        slug={project.slug}
        aside={
          project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="t-nav hidden min-h-11 shrink-0 items-center text-accent hover:text-accent-active sm:flex"
            >
              {hostOf(project.liveUrl)} ↗
            </a>
          ) : null
        }
      />

      <header className="band flex flex-col gap-lg pb-xl pt-xxl lg:gap-xl lg:pb-xxl lg:pt-section">
        <SectionLabel>
          {labels.title}{topic ? ` · ${topic}` : ""}
        </SectionLabel>
        <div className="flex max-w-[1040px] flex-col gap-lg">
          <h1 className="t-article-title font-light text-ink">{project.title}</h1>
          {project.desc ? <p className="t-dek text-muted">{project.desc}</p> : null}
        </div>
        <MetaStrip items={meta} />
      </header>

      {project.coverImage ? (
        <div className="lg:band">
          <div className="relative aspect-video w-full overflow-hidden bg-surface-sunken lg:rounded-media">
            <Image
              src={project.coverImage}
              alt={labels.cover(project.title)}
              fill
              priority
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <MobileToc headings={project.headings} lang={lang} />

      <div className="band flex gap-[60px] pb-xxl pt-xl lg:py-section">
        <div className="hidden w-[240px] shrink-0 lg:block">
          <DesktopToc headings={project.headings} lang={lang}>
            <ProjectLinks project={project} labels={labels} />
          </DesktopToc>
        </div>
        <div className="article-flow flex min-w-0 flex-1 flex-col gap-lg">
          {project.content}
          <div className="lg:hidden">
            <ProjectLinks project={project} labels={labels} />
          </div>
        </div>
      </div>

      <nav aria-label={labels.more} className="band flex flex-col-reverse gap-md border-t border-hairline pb-xxxl pt-xl lg:flex-row lg:gap-xl lg:pb-section lg:pt-xxl">
        <div className="flex flex-1 flex-col items-start gap-md">
          <p className="t-label text-faint">{labels.back}</p>
          <ButtonGhost href={localize(lang, "/projects")}>{dict.home.allProjects}</ButtonGhost>
        </div>
        {next ? (
          <div className="flex flex-1 flex-col items-start gap-md rounded-card bg-surface p-lg">
            <p className="t-label text-muted">{labels.next} · {dict.topics[next.topic] || next.topic}</p>
            <p className="t-title-lg text-ink">{next.title}</p>
            <ButtonGhost href={localize(lang, `/projects/${next.slug}`)}>{labels.open}</ButtonGhost>
          </div>
        ) : null}
      </nav>
    </article>
  );
}
