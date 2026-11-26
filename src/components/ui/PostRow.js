import Link from "next/link";
import { formatDate, LANGS } from "@/lib/site";
import { localize, t } from "@/lib/i18n";
import { Tag } from "./primitives";

// `lang` is the page's language (labels); `post.lang` is the post's own language.
export function readLabel(post, lang) {
  const { table } = t(lang);
  const code = LANGS[post.lang]?.label || post.lang.toUpperCase();
  return `${code} · ${post.published ? `${post.readMinutes} ${table.min}` : table.draft}`;
}

// A post opens in its own language: an untranslated English post listed on the
// Indonesian site links to /en/writing/<slug>.
export const postHref = (post) => localize(post.lang, `/writing/${post.slug}`);

export function PostTableHeader({ lang }) {
  const labels = t(lang).table;
  const cell = "t-mono-label text-faint";
  return (
    <div aria-hidden="true" className="hidden gap-lg border-b border-hairline-strong py-sm lg:flex">
      <span className={`${cell} w-[140px] shrink-0`}>{labels.date}</span>
      <span className={`${cell} w-[110px] shrink-0`}>{labels.topic}</span>
      <span className={`${cell} w-[96px] shrink-0`}>{labels.type}</span>
      <span className={`${cell} flex-1`}>{labels.title}</span>
      <span className={`${cell} w-[140px] shrink-0 text-right`}>{labels.langRead}</span>
    </div>
  );
}

// post-row: DATE · TOPIC · TYPE · TITLE · LANG · READ. The whole row is one link.
export function PostRow({ post, lang, showExcerpt = false }) {
  const date = formatDate(post.date);
  const type = t(lang).types[post.type] || post.type;
  const foreign = post.lang !== lang;

  return (
    <li className="border-b border-hairline">
      <Link
        href={postHref(post)}
        hrefLang={foreign ? post.lang : undefined}
        className="group flex flex-col gap-xs py-md transition-colors hover:bg-surface-sunken lg:flex-row lg:gap-lg lg:py-5"
      >
        {/* Mobile meta line */}
        <span className="flex items-center gap-sm lg:hidden">
          <span className="t-mono-meta text-muted">{date}</span>
          {post.topic ? <Tag topic={post.topic} lang={lang} /> : null}
          <span className="t-mono-label text-muted">{type}</span>
        </span>

        <span className="t-mono-meta hidden w-[140px] shrink-0 text-muted lg:block">{date}</span>
        <span className="hidden w-[110px] shrink-0 lg:block">{post.topic ? <Tag topic={post.topic} lang={lang} /> : null}</span>
        <span className="t-mono-label hidden w-[96px] shrink-0 text-muted lg:block">{type}</span>

        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span lang={foreign ? post.lang : undefined} className="t-title-md text-ink group-hover:text-accent">
            {post.title}
          </span>
          {showExcerpt && post.excerpt ? (
            <span lang={foreign ? post.lang : undefined} className="t-body-sm text-muted">
              {post.excerpt}
            </span>
          ) : null}
        </span>

        <span className="t-mono-meta shrink-0 text-muted lg:w-[140px] lg:text-right">{readLabel(post, lang)}</span>
      </Link>
    </li>
  );
}
