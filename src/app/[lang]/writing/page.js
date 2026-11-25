import { Suspense } from "react";
import { getWritingFor } from "@/utils/content";
import { SectionLabel } from "@/components/ui/primitives";
import { alternates } from "@/lib/site";
import { t } from "@/lib/i18n";
import WritingIndex, { WritingList } from "./WritingIndex";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { writing } = t(lang);
  return { title: writing.title, description: writing.description, alternates: alternates("/writing", lang) };
}

export default async function WritingPage({ params }) {
  const { lang } = await params;
  const dict = t(lang);
  const labels = dict.writing;
  // Client components get plain data only; the compiled MDX stays on the server.
  const posts = (await getWritingFor(lang)).map(({ content, headings, body, ...post }) => post);

  return (
    <>
      <section className="band pb-xl pt-xxxl lg:pb-xxl lg:pt-section">
        <div className="flex flex-col gap-lg lg:flex-row lg:gap-xl">
          <div className="flex flex-1 flex-col gap-lg">
            <SectionLabel>§ 01 · {labels.title}</SectionLabel>
            <h1 className="t-display-xl text-ink">/writing</h1>
            <p className="t-display-md text-muted">{labels.dek}</p>
          </div>
          <div className="flex flex-col gap-md lg:w-[360px] lg:shrink-0 lg:justify-end">
            <SectionLabel>{labels.kinds}</SectionLabel>
            <dl className="flex flex-col gap-sm">
              <div className="flex gap-md">
                <dt className="t-mono-label w-[88px] shrink-0 text-ink">{dict.types.tutorial}</dt>
                <dd className="t-body-sm text-body">{labels.tutorial}</dd>
              </div>
              <div className="flex gap-md">
                <dt className="t-mono-label w-[88px] shrink-0 text-ink">{dict.types.note}</dt>
                <dd className="t-body-sm text-body">{labels.note}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Suspense fallback={<WritingList posts={posts} lang={lang} />}>
        <WritingIndex posts={posts} lang={lang} />
      </Suspense>
    </>
  );
}
