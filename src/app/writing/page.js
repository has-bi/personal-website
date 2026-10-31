import { Suspense } from "react";
import { getAllPosts } from "@/utils/content";
import { SectionLabel } from "@/components/ui/primitives";
import { alternates } from "@/lib/site";
import WritingIndex, { WritingList } from "./WritingIndex";

export const metadata = {
  title: "Writing",
  description: "Tutorials and notes on AI and automation.",
  alternates: alternates("/writing"),
};

export default async function WritingPage() {
  // Client components get plain data only; the compiled MDX stays on the server.
  const posts = (await getAllPosts()).map(({ content, headings, ...post }) => post);

  return (
    <>
      <section className="band pb-xl pt-xxxl lg:pb-xxl lg:pt-section">
        <div className="flex flex-col gap-lg lg:flex-row lg:gap-xl">
          <div className="flex flex-1 flex-col gap-lg">
            <SectionLabel>§ 01 · Writing</SectionLabel>
            <h1 className="t-display-xl text-ink">/writing</h1>
            <p className="t-display-md text-muted">Tutorials and notes on AI and automation.</p>
          </div>
          <div className="flex flex-col gap-md lg:w-[360px] lg:shrink-0 lg:justify-end lg:border-l lg:border-hairline lg:pl-xl">
            <SectionLabel>Two kinds of posts</SectionLabel>
            <dl className="flex flex-col gap-sm">
              <div className="flex gap-md">
                <dt className="t-mono-label w-[88px] shrink-0 text-ink">Tutorial</dt>
                <dd className="t-body-sm text-body">Step by step. Ends with something that works.</dd>
              </div>
              <div className="flex gap-md">
                <dt className="t-mono-label w-[88px] shrink-0 text-ink">Note</dt>
                <dd className="t-body-sm text-body">One idea, explained in plain language.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Suspense fallback={<WritingList posts={posts} />}>
        <WritingIndex posts={posts} />
      </Suspense>
    </>
  );
}
