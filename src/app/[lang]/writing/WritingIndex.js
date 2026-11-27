"use client";

import { FilterGroup, useFilters } from "@/components/ui/Filters";
import { PostRow, PostTableHeader } from "@/components/ui/PostRow";
import { EmptyState } from "@/components/ui/primitives";
import { LANGS } from "@/lib/site";
import { localize, t } from "@/lib/i18n";

const FILTER_KEYS = ["type", "topic", "lang"];
const options = (labels) => Object.entries(labels).map(([value, label]) => ({ value, label }));

// `lang` is the page's language. `filters.lang` filters posts by their own language.
export function WritingList({ posts, lang, filters = { type: "all", topic: "all", lang: "all" } }) {
  const dict = t(lang);
  const labels = dict.writing;
  const pathname = localize(lang, "/writing");
  // The language filter only appears once posts exist in more than one language.
  const multilingual = new Set(posts.map((post) => post.lang)).size > 1;
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
            <FilterGroup pathname={pathname} current={filters} name="type" label={labels.type} options={options(dict.types)} allLabel={labels.all} />
            <FilterGroup pathname={pathname} current={filters} name="topic" label={labels.topic} options={options(dict.topics)} allLabel={labels.all} />
            {multilingual ? (
              <FilterGroup
                pathname={pathname}
                current={filters}
                name="lang"
                label={labels.language}
                options={Object.entries(LANGS).map(([value, item]) => ({ value, label: item.label }))}
                allLabel={labels.all}
              />
            ) : null}
          </div>
          <p className="t-meta hidden shrink-0 text-muted lg:block" aria-live="polite">
            {shown.length} {labels.count(shown.length)} · {labels.newest}
          </p>
        </div>
      </div>

      <div className="band flex flex-col gap-xs pb-xxxl pt-xl lg:pb-section lg:pt-xxl">
        {shown.length === 0 ? (
          <EmptyState
            title={labels.emptyTitle(filters, dict)}
            action={
              filtered
                ? { href: pathname, label: labels.seeAll }
                : { href: localize(lang, "/projects"), label: labels.seeProjects }
            }
          >
            {filtered ? labels.emptyFiltered : labels.emptyAll}
          </EmptyState>
        ) : (
          <>
            <PostTableHeader lang={lang} />
            {years.map((group) => (
              <section key={group.year} aria-label={group.year}>
                {years.length > 1 ? (
                  <div className="flex items-baseline justify-between py-sm">
                    <h2 className="t-title-lg text-ink">{group.year}</h2>
                    <p className="t-label text-muted">
                      {group.posts.length} {labels.count(group.posts.length)}
                    </p>
                  </div>
                ) : null}
                <ul className="border-t border-hairline lg:border-t-0">
                  {group.posts.map((post) => (
                    <PostRow key={post.id} post={post} lang={lang} showExcerpt />
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

export default function WritingIndex({ posts, lang }) {
  const filters = useFilters(FILTER_KEYS);
  return <WritingList posts={posts} lang={lang} filters={filters} />;
}
