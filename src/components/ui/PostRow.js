import Link from "next/link";
import { formatDate, LANGS, TYPES } from "@/lib/site";
import { Tag } from "./primitives";

export function readLabel(post) {
  const lang = LANGS[post.lang]?.label || post.lang.toUpperCase();
  return `${lang} · ${post.published ? `${post.readMinutes} MIN` : "DRAFT"}`;
}

export function PostTableHeader() {
  const cell = "t-mono-label text-faint";
  return (
    <div aria-hidden="true" className="hidden gap-lg border-b border-hairline-strong py-sm lg:flex">
      <span className={`${cell} w-[140px] shrink-0`}>Date</span>
      <span className={`${cell} w-[110px] shrink-0`}>Topic</span>
      <span className={`${cell} w-[96px] shrink-0`}>Type</span>
      <span className={`${cell} flex-1`}>Title</span>
      <span className={`${cell} w-[140px] shrink-0 text-right`}>Lang · Read</span>
    </div>
  );
}

// post-row: DATE · TOPIC · TYPE · TITLE · LANG · READ. The whole row is one link.
export function PostRow({ post, showExcerpt = false }) {
  const date = formatDate(post.date);
  const type = TYPES[post.type]?.label || post.type;

  return (
    <li className="border-b border-hairline">
      <Link
        href={`/writing/${post.slug}`}
        className="group flex flex-col gap-xs py-md transition-colors hover:bg-surface-sunken lg:flex-row lg:gap-lg lg:py-5"
      >
        {/* Mobile meta line */}
        <span className="flex items-center gap-sm lg:hidden">
          <span className="t-mono-meta text-muted">{date}</span>
          {post.topic ? <Tag topic={post.topic} /> : null}
          <span className="t-mono-label text-muted">{type}</span>
        </span>

        <span className="t-mono-meta hidden w-[140px] shrink-0 text-muted lg:block">{date}</span>
        <span className="hidden w-[110px] shrink-0 lg:block">{post.topic ? <Tag topic={post.topic} /> : null}</span>
        <span className="t-mono-label hidden w-[96px] shrink-0 text-muted lg:block">{type}</span>

        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="t-title-md text-ink group-hover:text-accent">{post.title}</span>
          {showExcerpt && post.excerpt ? <span className="t-body-sm text-muted">{post.excerpt}</span> : null}
        </span>

        <span className="t-mono-meta shrink-0 text-muted lg:w-[140px] lg:text-right">{readLabel(post)}</span>
      </Link>
    </li>
  );
}
