"use client";

import { FilterGroup, useFilters } from "@/components/ui/Filters";
import { PostRow, PostTableHeader } from "@/components/ui/PostRow";
import { EmptyState } from "@/components/ui/primitives";
import { LANGS, pad2, TOPICS, TYPES } from "@/lib/site";

const FILTER_KEYS = ["type", "topic", "lang"];
const options = (map) => Object.entries(map).map(([value, item]) => ({ value, label: item.label }));

function emptyTitle({ type, topic, lang }) {
  const words = [
    lang !== "all" ? (lang === "id" ? "Indonesian" : "English") : "",
    topic !== "all" ? TOPICS[topic]?.label : "",
    type !== "all" ? `${TYPES[type]?.label.toLowerCase()}s` : "posts",
  ].filter(Boolean);
  return `No ${words.join(" ")} yet`;
}

export function WritingList({ posts, filters = { type: "all", topic: "all", lang: "all" } }) {
  const shown = posts.filter(
    (post) =>
      (filters.type === "all" || post.type === filters.type) &&
      (filters.topic === "all" || post.topic === filters.topic) &&
      (filters.lang === "all" || post.lang === filters.lang)
  );
  const filtered = FILTER_KEYS.some((key) => filters[key] !== "all");

  const years = [];
  for (const post of shown) {
    const year = String(new Date(post.date).getUTCFullYear());
    const group = years.find((item) => item.year === year);
    if (group) group.posts.push(post);
    else years.push({ year, posts: [post] });
  }

  return (
    <>
      <div className="band border-b border-t border-hairline py-sm">
        <div className="flex flex-col gap-0 lg:flex-row lg:items-center lg:justify-between lg:gap-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-xl">
            <FilterGroup pathname="/writing" current={filters} name="type" label="Type" options={options(TYPES)} />
            <FilterGroup pathname="/writing" current={filters} name="topic" label="Topic" options={options(TOPICS)} />
            <FilterGroup pathname="/writing" current={filters} name="lang" label="Language" options={options(LANGS)} />
          </div>
          <p className="t-mono-meta hidden shrink-0 uppercase text-muted lg:block" aria-live="polite">
            {pad2(shown.length)} {shown.length === 1 ? "entry" : "entries"} · Newest first
          </p>
        </div>
      </div>

      <div className="band flex flex-col gap-xs pb-xxxl pt-xl lg:pb-section lg:pt-xxl">
        {shown.length === 0 ? (
          <EmptyState
            title={emptyTitle(filters)}
            action={filtered ? { href: "/writing", label: "See all writing" } : { href: "/projects", label: "See the projects" }}
          >
            {filtered ? "Nothing is published under this filter yet." : "Nothing is published here yet."}
          </EmptyState>
        ) : (
          <>
            <PostTableHeader />
            {years.map((group) => (
              <section key={group.year} aria-label={group.year}>
                {years.length > 1 ? (
                  <div className="flex items-baseline justify-between py-sm">
                    <h2 className="t-title-lg text-ink">{group.year}</h2>
                    <p className="t-mono-label text-muted">
                      {group.posts.length} {group.posts.length === 1 ? "entry" : "entries"}
                    </p>
                  </div>
                ) : null}
                <ul className="border-t border-hairline lg:border-t-0">
                  {group.posts.map((post) => (
                    <PostRow key={post.id} post={post} showExcerpt />
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default function WritingIndex({ posts }) {
  const filters = useFilters(FILTER_KEYS);
  return <WritingList posts={posts} filters={filters} />;
}
