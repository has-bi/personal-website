import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getPost, getPostLanguages, getPosts } from "@/utils/content";
import { alternates, formatDate, LANGS, SITE_NAME, SITE_URL } from "@/lib/site";
import { localize, t } from "@/lib/i18n";
import {
  ButtonGhost,
  ButtonPrimary,
  MetaLine,
  SectionLabel,
  Tag,
} from "@/components/ui/primitives";
import { DesktopToc, MobileToc } from "@/components/ui/ArticleAside";
import CopyContext from "@/components/ui/CopyContext";
import { buildAiContext } from "@/lib/ai-context";

export const dynamicParams = false;

// Every slug is listed for every language: returning an empty list for a language with
// no published posts yet makes Next 15.5 drop the other language's paths too. A slug
// missing in this language redirects to the language it exists in (the same redirect
// next.config.mjs does for old English URLs). It must not call notFound(): with the root
// layout under [lang], a 404 thrown inside a page renders Next's bare error shell.
export async function generateStaticParams() {
  const languages = await getPostLanguages();
  return Object.keys(languages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const [post, languages] = await Promise.all([getPost(slug, lang), getPostLanguages()]);
  if (!post) return { title: t(lang).article.notFound };

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: alternates(`/writing/${post.slug}`, lang, languages[post.slug] || [lang]),
    openGraph: {
      type: "article",
      locale: t(lang).ogLocale,
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.date || undefined,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

// lesson-brief: opens every tutorial. "What you'll learn" comes from the post's own headings.
function LessonBrief({ post, labels }) {
  const rowText = "t-body-md flex-1 text-ink";
  return (
    <div className="wide overflow-hidden rounded-card bg-surface">
      <div className="flex flex-col gap-sm px-lg py-md">
        <p className="t-label text-muted">{labels.learn}</p>
        <ol className="flex flex-col gap-sm">
          {post.headings.map((heading, index) => (
            <li key={heading.id} className="flex gap-md">
              <span className="t-meta pt-[2px] text-faint">{heading.number || String(index + 1).padStart(2, "0")}</span>
              <span className={rowText}>{heading.text}</span>
            </li>
          ))}
        </ol>
      </div>
      {post.prerequisites.length ? (
        <div className="flex flex-col gap-sm border-t border-hairline px-lg py-md">
          <p className="t-label text-muted">{labels.before}</p>
          <ol className="flex flex-col gap-sm">
            {post.prerequisites.map((item, index) => (
              <li key={item} className="flex gap-md">
                <span className="t-meta pt-[2px] text-faint">{String(index + 1).padStart(2, "0")}</span>
                <span className={rowText}>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

// next-lesson: the next post in the same topic and language, by date.
function nextLesson(posts, post) {
  return posts
    .filter((other) => other.topic === post.topic && other.slug !== post.slug && new Date(other.date) > new Date(post.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
}

export default async function ArticlePage({ params }) {
  const { slug, lang } = await params;
  const [post, posts, languages] = await Promise.all([getPost(slug, lang), getPosts({ lang }), getPostLanguages()]);
  if (!post) {
    const other = languages[slug]?.[0];
    if (other) redirect(localize(other, `/writing/${slug}`));
    notFound();
  }

  const dict = t(lang);
  const labels = dict.article;
  const next = nextLesson(posts, post);
  const type = dict.types[post.type] || post.type;
  const url = `${SITE_URL}${localize(lang, `/writing/${post.slug}`)}`;
  const meta = [
    { label: labels.published, value: formatDate(post.date) },
    { label: labels.readTime, value: labels.minutes(post.readMinutes) },
    post.topic && { label: labels.topic, value: <Tag topic={post.topic} lang={lang} /> },
    { label: labels.type, value: type },
    post.level && { label: labels.level, value: post.level },
    { label: labels.language, value: LANGS[post.lang]?.label || post.lang },
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: post.lang,
    url,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
  };

  return (
    <article lang={post.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="band flex flex-col gap-lg pb-xl pt-xxl lg:gap-xl lg:pb-xxl lg:pt-section">
        <SectionLabel>
          {dict.writing.title} · {type}
        </SectionLabel>
        <div className="flex max-w-[1040px] flex-col gap-lg">
          <h1 className="t-article-title text-ink">{post.title}</h1>
          {post.excerpt ? <p className="t-dek text-muted">{post.excerpt}</p> : null}
        </div>
        <MetaLine items={meta} action={<CopyContext context={buildAiContext(post)} labels={dict.copy} />} />
      </header>

      {post.coverImage ? (
        <div className="lg:band">
          <div className="relative aspect-video w-full overflow-hidden rounded-media bg-surface-sunken">
            <Image src={post.coverImage} alt={post.coverAlt || post.title} fill priority sizes="(min-width: 1024px) 1280px, 100vw" className="object-cover" />
          </div>
        </div>
      ) : null}

      <MobileToc headings={post.headings} lang={lang} />

      <div className="band flex gap-[60px] pb-xxl pt-xl lg:py-section">
        <div className="hidden w-[240px] shrink-0 lg:block">
          <DesktopToc headings={post.headings} lang={lang} />
        </div>

        <div className="article-flow flex min-w-0 flex-1 flex-col gap-lg">
          {post.type === "tutorial" && post.headings.length ? <LessonBrief post={post} labels={labels} /> : null}
          {post.content}
        </div>
      </div>

      <nav aria-label={labels.more} className="band flex flex-col-reverse gap-md border-t border-hairline pb-xxxl pt-xl lg:flex-row lg:gap-xl lg:pb-section lg:pt-xxl">
        <div className="flex flex-1 flex-col items-start gap-md">
          <p className="t-label text-faint">{labels.back}</p>
          <ButtonGhost href={localize(lang, "/writing")}>{labels.allWriting}</ButtonGhost>
        </div>
        {next ? (
          <div className="flex flex-1 flex-col items-start gap-md rounded-card bg-surface p-lg">
            <p className="t-label text-muted">
              {labels.next} · {dict.topics[next.topic] || next.topic} · {dict.types[next.type] || next.type}
            </p>
            <p className="t-title-lg text-ink">{next.title}</p>
            <ButtonPrimary href={localize(lang, `/writing/${next.slug}`)}>
              {labels.nextButton(dict.types[next.type] || next.type)}
            </ButtonPrimary>
          </div>
        ) : null}
      </nav>
    </article>
  );
}
