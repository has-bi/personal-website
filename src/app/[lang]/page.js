import Image from "next/image";
import Link from "next/link";
import {
  getAboutIntro,
  getPosts,
  getProjects,
  getWritingFor,
} from "@/utils/content";
import {
  ButtonGhost,
  ButtonPrimary,
  SectionHead,
} from "@/components/ui/primitives";
import { PostRow, PostTableHeader } from "@/components/ui/PostRow";
import { ProjectGrid } from "@/components/ui/ProjectCard";
import { aboutData } from "@/app/[lang]/about/data";
import { alternates } from "@/lib/site";
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
    {
      ...routes.ai,
      href: localize(lang, "/writing?topic=ai"),
      show: posts.some((post) => post.topic === "ai"),
    },
    {
      ...routes.automation,
      href: localize(lang, "/writing?topic=automation"),
      show: posts.some((post) => post.topic === "automation"),
    },
    {
      ...routes.other,
      href: localize(other, "/writing"),
      lang: other,
      show: otherPosts.length > 0,
    },
  ].filter((route) => route.show);
}

// hero-band: fits one screen (viewport minus the sticky nav: 56px mobile, 64px from lg)
// and shows the whole photo. The photo is full width and pinned to the bottom of the
// hero, behind the text; when it is taller than the hero, only its transparent sky goes
// above the top edge (clipped), so the hills and both figures always show in full. On
// short screens the abstract and the call to action overlap the hills (owner's call:
// the photo fitting one screen comes first). The photo's bottom edge fades into the page.
const HERO_IMAGE = {
  src: "/images/hero-archive-v1.webp",
  width: 2688,
  height: 1520,
};

function Hero({ lang, role }) {
  const labels = t(lang).home;
  return (
    <section className="relative h-[calc(100svh-3.5rem)] min-h-[560px] overflow-hidden lg:h-[calc(100svh-4rem)] lg:min-h-[640px]">
      <Image
        src={HERO_IMAGE.src}
        width={HERO_IMAGE.width}
        height={HERO_IMAGE.height}
        alt={labels.heroAlt}
        priority
        sizes="100vw"
        className="absolute inset-x-0 bottom-0 block h-auto w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
      />

      <div className="band relative z-10 flex flex-col items-center gap-md pt-xl text-center lg:gap-lg lg:pt-xxl">
        <h1 className="t-hero">
          <span className="block text-faint">{labels.hero[0]}</span>
          <span className="block text-ink">{labels.hero[1]}</span>
        </h1>
        <p className="t-body-md max-w-[70ch] text-muted">
          {labels.abstractText(role.title, role.org)}
        </p>
        <div className="flex flex-col items-center gap-xs pt-xs">
          <ButtonPrimary href={localize(lang, "/writing")}>
            {labels.startReading}
          </ButtonPrimary>
          <p className="t-meta flex items-center gap-xs text-muted">
            <span aria-hidden="true">•</span>
            {labels.heroNote}
          </p>
        </div>
      </div>
    </section>
  );
}

function StartHere({ routes, lang }) {
  const labels = t(lang).home;
  return (
    <section className="band flex flex-col gap-lg py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead heading={labels.startHere} />
      <div className="overflow-hidden rounded-card bg-surface">
        <div
          aria-hidden="true"
          className="hidden gap-lg border-b border-hairline px-lg py-sm lg:flex"
        >
          <span className="t-label flex-1 text-faint">{labels.youAre}</span>
          <span className="t-label flex-1 text-faint">{labels.startWith}</span>
          <span className="t-label w-[280px] text-faint">{labels.leadsTo}</span>
        </div>
        <ul>
          {routes.map((route) => (
            <li
              key={route.href}
              className="border-b border-hairline last:border-b-0"
            >
              <Link
                href={route.href}
                hrefLang={route.lang}
                className="flex flex-col gap-xxs p-md transition-colors hover:bg-surface-sunken lg:flex-row lg:gap-lg lg:p-lg"
              >
                <span lang={route.lang} className="t-body-md flex-1 text-ink">
                  {route.you}
                </span>
                <span
                  lang={route.lang}
                  className="t-body-sm flex-1 text-body lg:text-[17px] lg:leading-[1.6]"
                >
                  {route.start}
                </span>
                <span className="t-meta text-accent lg:w-[280px]">
                  {route.href}
                </span>
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
    <section className="band flex flex-col gap-lg py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead
        heading={t(lang).nav.writing}
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
    <section className="band flex flex-col gap-lg py-xxxl lg:gap-xxl lg:py-section">
      <SectionHead
        heading={t(lang).nav.projects}
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

function AboutSplit({ intro, introLang, lang, about }) {
  const { CURRENT_ROLE, TEACHING_ROLE, LEARNING_PATH } = about;
  const rows = [
    {
      when: CURRENT_ROLE.kind,
      what: CURRENT_ROLE.title,
      where: CURRENT_ROLE.org,
    },
    {
      when: TEACHING_ROLE.kind,
      what: TEACHING_ROLE.title,
      where: TEACHING_ROLE.org,
    },
    ...LEARNING_PATH.map((item) => ({
      when: item.period,
      what: item.title,
      where: item.place,
    })),
  ];

  return (
    <section className="band py-xxxl lg:py-section">
      <div className="flex flex-col gap-lg lg:flex-row lg:gap-xxl">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-media bg-surface-sunken lg:w-[360px] lg:shrink-0">
          <Image
            src="/images/me-pixelated.webp"
            alt={t(lang).about.portraitAlt}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover [image-rendering:pixelated]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-lg lg:gap-xl">
          <h2 className="t-display-lg font-light text-ink">
            {t(lang).nav.about}
          </h2>
          {intro ? (
            <div
              lang={introLang !== lang ? introLang : undefined}
              className="intro-flow t-intro text-ink"
            >
              {intro}
            </div>
          ) : null}
          <ul className="border-t border-hairline">
            {rows.map((row) => (
              <li
                key={`${row.when}-${row.what}`}
                className="flex flex-col gap-xxs border-b border-hairline py-sm lg:flex-row lg:items-center lg:gap-lg"
              >
                <span className="t-meta text-muted lg:w-[120px] lg:shrink-0">
                  {row.when}
                  {row.where ? (
                    <span className="lg:hidden"> · {row.where}</span>
                  ) : null}
                </span>
                <span className="t-body-md flex-1 text-ink">{row.what}</span>
                <span className="t-meta hidden text-muted lg:block">
                  {row.where}
                </span>
              </li>
            ))}
          </ul>
          <ButtonGhost
            href={localize(lang, "/about")}
            bare
            className="-ml-lg self-start"
          >
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
  const fallback =
    !ownIntro && lang !== "en" ? await getAboutIntro("en") : null;
  const routes = routesFor(lang, posts, otherPosts);
  const about = aboutData(lang);

  return (
    <>
      <Hero lang={lang} role={about.CURRENT_ROLE} />
      {routes.length ? <StartHere routes={routes} lang={lang} /> : null}
      {/* The /writing band stays hidden until at least two posts are published. */}
      {posts.length >= 2 ? <LatestWriting posts={posts} lang={lang} /> : null}
      {/* The /projects band stays hidden while no project is published. */}
      {projects.length ? (
        <LatestProjects projects={projects} lang={lang} />
      ) : null}
      <AboutSplit
        intro={ownIntro || fallback}
        introLang={ownIntro ? lang : "en"}
        lang={lang}
        about={about}
      />
    </>
  );
}
