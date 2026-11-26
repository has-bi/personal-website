import Image from "next/image";
import Link from "next/link";
import { getAboutIntro, getPosts, getProjects, getWritingFor } from "@/utils/content";
import { ButtonGhost, ButtonPrimary, SectionHead, SectionLabel } from "@/components/ui/primitives";
import { PostRow, PostTableHeader } from "@/components/ui/PostRow";
import { ProjectGrid } from "@/components/ui/ProjectCard";
import { aboutData } from "@/app/[lang]/about/data";
import { alternates, sectionNumbers } from "@/lib/site";
import { localize, otherLocale, t } from "@/lib/i18n";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { alternates: alternates("/", lang) };
}

// /start router rows. A row is hidden while its destination has no published post. The
// last row leads to the other language and is written in that language.
function routesFor(lang, posts, otherPosts) {
  const { routes } = t(lang).home;
  const other = otherLocale(lang);
  return [
    { ...routes.ai, href: localize(lang, "/writing?topic=ai"), show: posts.some((post) => post.topic === "ai") },
    {
      ...routes.automation,
      href: localize(lang, "/writing?topic=automation"),
      show: posts.some((post) => post.topic === "automation"),
    },
    { ...routes.other, href: localize(other, "/writing"), lang: other, show: otherPosts.length > 0 },
  ].filter((route) => route.show);
}

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

function Hero({ lang, role }) {
  const labels = t(lang).home;
  return (
    <section className="band relative border-b border-hairline py-xxxl lg:py-section">
      <HeroGridLines />
      <div className="relative flex flex-col gap-lg lg:flex-row lg:gap-xl">
        <div className="flex flex-1 flex-col gap-lg">
          <SectionLabel>§ 00 · {t(lang).nav.index}</SectionLabel>
          <h1 className="t-display-xl">
            <span className="block text-ink">{labels.hero[0]}</span>
            <span className="block text-accent">{labels.hero[1]}</span>
          </h1>
        </div>
        <div className="flex flex-col gap-lg lg:w-[360px] lg:shrink-0 lg:justify-end">
          <SectionLabel>{labels.abstract}</SectionLabel>
          <p className="t-body-md text-body">{labels.abstractText(role.title, role.org)}</p>
          <ButtonPrimary href={localize(lang, "/writing")}>{labels.startReading}</ButtonPrimary>
        </div>
      </div>
    </section>
  );
}

function StartHere({ routes, lang }) {
  const labels = t(lang).home;
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead label={`§ 00.1 · ${labels.startHere}`} heading="/start" />
      <div className="border border-hairline bg-surface">
        <div aria-hidden="true" className="hidden gap-lg border-b border-hairline-strong px-lg py-sm lg:flex">
          <span className="t-mono-label flex-1 text-faint">01 · {labels.youAre}</span>
          <span className="t-mono-label flex-1 text-faint">02 · {labels.startWith}</span>
          <span className="t-mono-label w-[280px] text-faint">03 · {labels.leadsTo}</span>
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

function LatestWriting({ posts, lang }) {
  const labels = t(lang).home;
  const href = localize(lang, "/writing");
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead
        label={`§ 01 · ${t(lang).nav.writing}`}
        heading="/writing"
        more={
          <ButtonGhost href={href} bare>
            {labels.allEntries}
          </ButtonGhost>
        }
      />
      <div>
        <PostTableHeader lang={lang} />
        <ul className="border-t border-hairline lg:border-t-0">
          {posts.slice(0, 3).map((post) => (
            <PostRow key={post.id} post={post} lang={lang} />
          ))}
        </ul>
      </div>
      <ButtonGhost href={href} className="justify-center lg:hidden">
        {labels.allEntries}
      </ButtonGhost>
    </section>
  );
}

function LatestProjects({ projects, lang }) {
  const href = localize(lang, "/projects");
  return (
    <section className="band flex flex-col gap-lg border-b border-hairline py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead
        label={`§ 02 · ${t(lang).nav.projects}`}
        heading="/projects"
        more={
          <ButtonGhost href={href} bare>
            {t(lang).home.allProjects}
          </ButtonGhost>
        }
      />
      <ProjectGrid projects={projects.slice(0, 3)} lang={lang} />
    </section>
  );
}

function AboutSplit({ intro, introLang, number, lang, about }) {
  const { CURRENT_ROLE, TEACHING_ROLE, LEARNING_PATH } = about;
  const rows = [
    { when: CURRENT_ROLE.kind, what: CURRENT_ROLE.title, where: CURRENT_ROLE.org },
    { when: TEACHING_ROLE.kind, what: TEACHING_ROLE.title, where: TEACHING_ROLE.org },
    ...LEARNING_PATH.map((item) => ({ when: item.period, what: item.title, where: item.place })),
  ];

  return (
    <section className="band border-b border-hairline py-xxxl lg:py-section">
      <div className="flex flex-col gap-lg lg:flex-row lg:gap-xxl">
        <div className="relative aspect-4/5 w-full overflow-hidden border border-hairline bg-surface-sunken lg:w-[360px] lg:shrink-0">
          <Image
            src="/images/me-pixelated.webp"
            alt={t(lang).about.portraitAlt}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover [image-rendering:pixelated]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-lg lg:gap-xl">
          <SectionLabel>§ {number} · {t(lang).nav.about}</SectionLabel>
          {intro ? (
            <div lang={introLang !== lang ? introLang : undefined} className="intro-flow t-intro text-ink">
              {intro}
            </div>
          ) : null}
          <ul className="border-t border-hairline">
            {rows.map((row) => (
              <li
                key={`${row.when}-${row.what}`}
                className="flex flex-col gap-xxs border-b border-hairline py-sm lg:flex-row lg:items-center lg:gap-lg"
              >
                <span className="t-mono-meta uppercase text-muted lg:w-[120px] lg:shrink-0">
                  {row.when}
                  {row.where ? <span className="lg:hidden"> · {row.where}</span> : null}
                </span>
                <span className="t-body-md flex-1 text-ink">{row.what}</span>
                <span className="t-mono-meta hidden uppercase text-muted lg:block">{row.where}</span>
              </li>
            ))}
          </ul>
          <ButtonGhost href={localize(lang, "/about")} bare className="-ml-lg self-start">
            {t(lang).home.fullStory}
          </ButtonGhost>
        </div>
      </div>
    </section>
  );
}

export default async function Home({ params }) {
  const { lang } = await params;
  const [posts, otherPosts, projects, ownIntro] = await Promise.all([
    getWritingFor(lang),
    getPosts({ lang: otherLocale(lang) }),
    getProjects(),
    getAboutIntro(lang),
  ]);
  // The Indonesian intro may still be a draft: show the English one until it is published.
  const fallback = !ownIntro && lang !== "en" ? await getAboutIntro("en") : null;
  const routes = routesFor(lang, posts, otherPosts);
  const sections = sectionNumbers({ hasProjects: projects.length > 0 });
  const about = aboutData(lang);

  return (
    <>
      <Hero lang={lang} role={about.CURRENT_ROLE} />
      {routes.length ? <StartHere routes={routes} lang={lang} /> : null}
      {/* The /writing band stays hidden until at least two posts are published. */}
      {posts.length >= 2 ? <LatestWriting posts={posts} lang={lang} /> : null}
      {/* The /projects band stays hidden while no project is published. */}
      {projects.length ? <LatestProjects projects={projects} lang={lang} /> : null}
      <AboutSplit
        intro={ownIntro || fallback}
        introLang={ownIntro ? lang : "en"}
        number={sections.about}
        lang={lang}
        about={about}
      />
    </>
  );
}
