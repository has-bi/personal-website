import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/utils/content";
import { EMAIL, formatDate, LANGS, SITE_URL, TOPICS, TYPES } from "@/lib/site";
import {
  Breadcrumb,
  ButtonGhost,
  ButtonPrimary,
  MetaStrip,
  SectionLabel,
  Tag,
} from "@/components/ui/primitives";
import { DesktopToc, MobileToc, ShareLinks } from "@/components/ui/ArticleAside";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
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
function LessonBrief({ post }) {
  const rowText = "t-body-md flex-1 text-ink";
  return (
    <div className="border border-hairline bg-surface">
      <div className="flex flex-col gap-sm px-lg py-md">
        <p className="t-mono-label text-muted">What you'll learn</p>
        <ol className="flex flex-col gap-sm">
          {post.headings.map((heading) => (
            <li key={heading.id} className="flex gap-md">
              <span className="t-mono-meta pt-[2px] text-faint">{heading.number}</span>
              <span className={rowText}>{heading.text}</span>
            </li>
          ))}
        </ol>
      </div>
      {post.prerequisites.length ? (
        <div className="flex flex-col gap-sm border-t border-hairline px-lg py-md">
          <p className="t-mono-label text-muted">Before you start</p>
          <ol className="flex flex-col gap-sm">
            {post.prerequisites.map((item, index) => (
              <li key={item} className="flex gap-md">
                <span className="t-mono-meta pt-[2px] text-faint">{String(index + 1).padStart(2, "0")}</span>
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
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const next = nextLesson(posts, post);
  const type = TYPES[post.type]?.label || post.type;
  const url = `${SITE_URL}/writing/${post.slug}`;
  const meta = [
    { label: "Published", value: formatDate(post.date) },
    { label: "Read time", value: `${post.readMinutes} min` },
    post.topic && { label: "Topic", value: <Tag topic={post.topic} /> },
    { label: "Type", value: type },
    post.level && { label: "Level", value: post.level },
    { label: "Language", value: LANGS[post.lang]?.label || post.lang },
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: post.lang,
    url,
    author: { "@type": "Person", name: post.author, url: SITE_URL },
    keywords: post.tags.join(", "),
  };

  return (
    <article lang={post.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Breadcrumb
        parent="/writing"
        slug={post.slug}
        aside={
          <p className="t-tag shrink-0 text-muted lg:t-mono-label">
            Available in · {LANGS[post.lang]?.label || post.lang}
          </p>
        }
      />

      <header className="band flex flex-col gap-lg pb-xl pt-xxl lg:gap-xl lg:pb-xxl lg:pt-section">
        <SectionLabel>
          § 01 · Writing / {type}
        </SectionLabel>
        <div className="flex max-w-[1040px] flex-col gap-lg">
          <h1 className="t-article-title text-ink">{post.title}</h1>
          {post.excerpt ? <p className="t-dek text-muted">{post.excerpt}</p> : null}
        </div>
        <MetaStrip items={meta} />
      </header>

      {post.coverImage ? (
        <div className="lg:band">
          <div className="relative aspect-video w-full overflow-hidden border-y border-hairline bg-surface-sunken lg:border">
            <Image src={post.coverImage} alt="" fill priority sizes="(min-width: 1024px) 1280px, 100vw" className="object-cover" />
          </div>
        </div>
      ) : null}

      <MobileToc headings={post.headings} />

      <div className="band flex gap-[60px] pb-xxl pt-xl lg:py-section">
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <DesktopToc headings={post.headings}>
            <ShareLinks url={url} title={post.title} />
          </DesktopToc>
        </aside>

        <div className="flex w-full max-w-prose min-w-0 flex-col gap-lg">
          {post.type === "tutorial" && post.headings.length ? <LessonBrief post={post} /> : null}
          {post.content}
          <p className="t-body-md text-body">
            Stuck, or found a mistake? Email{" "}
            <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-2 hover:decoration-2">
              {EMAIL}
            </a>
          </p>
          {post.tags.length ? (
            <div className="flex flex-wrap items-center gap-xs border-t border-hairline pt-lg">
              <span className="t-mono-label text-faint">Tagged</span>
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}
          <div className="lg:hidden">
            <ShareLinks url={url} title={post.title} />
          </div>
        </div>
      </div>

      <nav aria-label="More writing" className="band flex flex-col-reverse gap-md border-t border-hairline pb-xxxl pt-xl lg:flex-row lg:gap-xl lg:pb-section lg:pt-xxl">
        <div className="flex flex-1 flex-col items-start gap-md">
          <p className="t-mono-label text-faint">Back</p>
          <ButtonGhost href="/writing">All writing</ButtonGhost>
        </div>
        {next ? (
          <div className="flex flex-1 flex-col items-start gap-md border border-hairline bg-surface p-lg">
            <p className="t-mono-label text-muted">
              Next · {TOPICS[next.topic]?.label || next.topic} · {TYPES[next.type]?.label || next.type}
            </p>
            <p className="t-title-lg text-ink">{next.title}</p>
            <ButtonPrimary href={`/writing/${next.slug}`}>Next {TYPES[next.type]?.label || "post"}</ButtonPrimary>
          </div>
        ) : null}
      </nav>
    </article>
  );
}
