import Image from "next/image";
import Link from "next/link";
import { getAboutIntro, getPosts, getProjects } from "@/utils/content";
import { ButtonGhost, ButtonPrimary, EmptyState, SectionHead, SectionLabel } from "@/components/ui/primitives";
import { PostRow, PostTableHeader } from "@/components/ui/PostRow";
import { ProjectGrid } from "@/components/ui/ProjectCard";
import { LEARNING_PATH, TEACHING_ROLE } from "@/app/about/data";
import { alternates } from "@/lib/site";

export const metadata = { alternates: alternates("/") };

// /start router rows. A row is hidden while its destination has no published post.
const ROUTES = [
  {
    you: "New to AI and LLMs",
    start: "Mental models before code",
    href: "/writing?topic=ai",
    has: (posts) => posts.some((post) => post.topic === "ai"),
  },
  {
    you: "Want to automate a real workflow",
    start: "Step-by-step automation tutorials",
    href: "/writing?topic=automation",
    has: (posts) => posts.some((post) => post.topic === "automation"),
  },
  {
    you: "Lebih nyaman baca Bahasa Indonesia",
    start: "Semua tulisan versi Indonesia",
    href: "/writing?lang=id",
    lang: "id",
    has: (_, idPosts) => idPosts.length > 0,
  },
];

function HeroGridLines() {
  return (
    <div aria-hidden="true" className="band pointer-events-none absolute inset-0 hidden lg:block">
      <div className="grid h-full grid-cols-6 border-r border-grid-line">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="border-l border-grid-line" />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="band relative border-b border-hairline py-xxxl lg:py-section">
      <HeroGridLines />
      <div className="relative flex flex-col gap-lg lg:flex-row lg:gap-xl">
        <div className="flex flex-1 flex-col gap-lg">
          <SectionLabel>§ 00 · Index</SectionLabel>
          <h1 className="t-display-xl">
            <span className="block text-ink">Notes on AI</span>
            <span className="block text-accent">& automation.</span>
          </h1>
        </div>
        <div className="flex flex-col gap-lg lg:w-[360px] lg:shrink-0 lg:justify-end">
          <SectionLabel>Abstract</SectionLabel>
          <p className="t-body-md text-body">
            Step-by-step tutorials and plain-language notes on LLMs, RAG and workflow automation. By Hasbi
            Hassadiqin, AI &amp; data instructor at RevoU.
          </p>
          <ButtonPrimary href="/writing">Start reading</ButtonPrimary>
        </div>
      </div>
    </section>
  );
}

function StartHere({ routes }) {
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead label="§ 00.1 · Start here" heading="/start" />
      <div className="border border-hairline bg-surface">
        <div aria-hidden="true" className="hidden gap-lg border-b border-hairline-strong px-lg py-sm lg:flex">
          <span className="t-mono-label flex-1 text-faint">01 · You are</span>
          <span className="t-mono-label flex-1 text-faint">02 · Start with</span>
          <span className="t-mono-label w-[280px] text-faint">03 · Leads to</span>
        </div>
        <ul>
          {routes.map((route) => (
            <li key={route.href} className="border-b border-hairline last:border-b-0">
              <Link
                href={route.href}
                hrefLang={route.lang}
                className="flex flex-col gap-xxs p-md transition-colors hover:bg-surface-sunken lg:flex-row lg:gap-lg lg:p-lg"
              >
                <span lang={route.lang} className="t-body-md flex-1 text-ink">
                  {route.you}
                </span>
                <span lang={route.lang} className="t-body-sm flex-1 text-body lg:text-[17px] lg:leading-[1.6]">
                  {route.start}
                </span>
                <span className="t-mono-meta text-accent lg:w-[280px]">{route.href}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LatestWriting({ posts }) {
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead
        label="§ 01 · Writing"
        heading="/writing"
        more={
          <ButtonGhost href="/writing" bare>
            All entries
          </ButtonGhost>
        }
      />
      <div>
        <PostTableHeader />
        <ul className="border-t border-hairline lg:border-t-0">
          {posts.slice(0, 3).map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </ul>
      </div>
      <ButtonGhost href="/writing" className="justify-center lg:hidden">
        All entries
      </ButtonGhost>
    </section>
  );
}

function LatestProjects({ projects }) {
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead
        label="§ 02 · Projects"
        heading="/projects"
        more={
          projects.length ? (
            <ButtonGhost href="/projects" bare>
              All projects
            </ButtonGhost>
          ) : null
        }
      />
      {projects.length ? (
        <ProjectGrid projects={projects.slice(0, 3)} />
      ) : (
        <EmptyState title="No projects yet" action={{ href: "/writing", label: "Read the tutorials" }}>
          No projects are published yet.
        </EmptyState>
      )}
    </section>
  );
}

function AboutSplit({ intro }) {
  const rows = [
    { when: "Freelance", what: TEACHING_ROLE.title, where: TEACHING_ROLE.org },
    ...LEARNING_PATH.map((item) => ({ when: item.period, what: item.title, where: item.place })),
  ];

  return (
    <section className="band border-b border-hairline py-xxxl lg:py-section">
      <div className="flex flex-col gap-lg lg:flex-row lg:gap-xxl">
        <div className="relative aspect-4/5 w-full overflow-hidden border border-hairline bg-surface-sunken lg:w-[360px] lg:shrink-0">
          <Image
            src="/images/me.webp"
            alt="Hasbi Hassadiqin"
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-lg lg:gap-xl">
          <SectionLabel>§ 03 · About</SectionLabel>
          {intro ? <div className="t-intro text-ink [&_p]:m-0">{intro}</div> : null}
          <ul className="border-t border-hairline">
            {rows.map((row) => (
              <li
                key={`${row.when}-${row.what}`}
                className="flex flex-col gap-xxs border-b border-hairline py-sm lg:flex-row lg:items-center lg:gap-lg"
              >
                <span className="t-mono-meta uppercase text-muted lg:w-[120px] lg:shrink-0">
                  {row.when}
                  <span className="lg:hidden"> · {row.where}</span>
                </span>
                <span className="t-body-md flex-1 text-ink">{row.what}</span>
                <span className="t-mono-meta hidden uppercase text-muted lg:block">{row.where}</span>
              </li>
            ))}
          </ul>
          <ButtonGhost href="/about" bare className="-ml-lg self-start">
            Full story
          </ButtonGhost>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [posts, idPosts, projects, intro] = await Promise.all([
    getPosts({ lang: "en" }),
    getPosts({ lang: "id" }),
    getProjects(),
    getAboutIntro(),
  ]);
  const routes = ROUTES.filter((route) => route.has(posts, idPosts));

  return (
    <>
      <Hero />
      {routes.length ? <StartHere routes={routes} /> : null}
      {/* The /writing band stays hidden until at least two posts are published. */}
      {posts.length >= 2 ? <LatestWriting posts={posts} /> : null}
      <LatestProjects projects={projects} />
      <AboutSplit intro={intro} />
    </>
  );
}
