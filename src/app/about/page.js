import Image from "next/image";
import { getAboutIntro } from "@/utils/content";
import { SectionLabel, Tag } from "@/components/ui/primitives";
import { alternates } from "@/lib/site";
import { CURRENT_ROLE, LEARNING_PATH, SOLUTION_STEPS, TEACHING_ROLE, TEACHING_TOPICS, TOOLS } from "./data";

export const metadata = {
  title: "About",
  description: "About Hasbi Hassadiqin, Solutions Engineer, who writes notes on AI and automation.",
  alternates: alternates("/about"),
};

function Band({ children, className = "" }) {
  return <section className={`band border-b border-hairline py-xxxl lg:py-section ${className}`}>{children}</section>;
}

function BandHead({ label, title }) {
  return (
    <div className="flex flex-col gap-md">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="t-title-lg text-ink lg:text-[28px]">{title}</h2>
    </div>
  );
}

// A role card beside a numbered list: used for the current role and for teaching.
function RoleBlock({ label, role, items }) {
  return (
    <div className="flex flex-col gap-lg lg:flex-row lg:gap-xxl">
      <div className="flex flex-col gap-xs border border-hairline bg-surface p-lg lg:w-[400px] lg:shrink-0">
        <p className="t-mono-label text-muted">{label}</p>
        <p className="t-title-md text-ink">{role.title}</p>
        <p className="t-body-sm text-body">{role.detail}</p>
      </div>
      <ol className="flex-1 border-t border-hairline">
        {items.map((item, index) => (
          <li key={item.title} className="flex min-h-11 items-center gap-md border-b border-hairline py-sm">
            <span className="t-mono-meta text-faint">{String(index + 1).padStart(2, "0")}</span>
            <span className="t-body-md flex-1 text-ink">{item.title}</span>
            {item.topic ? <Tag topic={item.topic} /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function AboutPage() {
  const intro = await getAboutIntro();

  return (
    <>
      <Band>
        <div className="flex flex-col gap-lg lg:flex-row lg:gap-xxl">
          <div className="flex flex-1 flex-col gap-lg">
            <SectionLabel>§ 03 · About</SectionLabel>
            <h1 className="t-display-xl text-ink">/about</h1>
            {intro ? <div className="t-intro text-muted [&_p]:m-0">{intro}</div> : null}
          </div>
          <div className="relative aspect-4/5 w-full overflow-hidden border border-hairline bg-surface-sunken lg:w-[360px] lg:shrink-0">
            <Image
              src="/images/me.webp"
              alt="Hasbi Hassadiqin"
              fill
              priority
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Band>

      <Band>
        <div className="flex flex-col gap-lg lg:gap-xxl">
          <BandHead label="§ 03.1 · Work" title="What I do" />
          <RoleBlock label={CURRENT_ROLE.kind} role={CURRENT_ROLE} items={SOLUTION_STEPS} />
        </div>
      </Band>

      <Band>
        <div className="flex flex-col gap-lg lg:gap-xxl">
          <BandHead label="§ 03.2 · Teaching" title="What I teach" />
          <RoleBlock label={`${TEACHING_ROLE.org} · ${TEACHING_ROLE.kind}`} role={TEACHING_ROLE} items={TEACHING_TOPICS} />
        </div>
      </Band>

      <Band>
        <div className="flex flex-col gap-lg lg:gap-xxl">
          <BandHead label="§ 03.3 · Learning path" title="How I learned it" />
          <ol className="border-t border-hairline">
            {LEARNING_PATH.map((item) => (
              <li key={item.title} className="flex flex-col gap-sm border-b border-hairline py-md lg:flex-row lg:items-center lg:gap-lg">
                <span className="t-mono-meta hidden text-muted lg:block lg:w-[120px] lg:shrink-0">{item.period}</span>
                <span className="flex flex-1 flex-col gap-xxs">
                  <span className="t-body-md text-ink">{item.title}</span>
                  <span className="t-mono-meta uppercase text-muted">
                    <span className="lg:hidden">{item.period} · </span>
                    {item.place}
                  </span>
                </span>
                {item.certificate ? (
                  <a
                    href={item.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-24 w-[140px] shrink-0 overflow-hidden border border-hairline bg-surface-sunken"
                  >
                    <Image
                      src={item.certificate}
                      alt={`${item.title} certificate, ${item.place}`}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band>
        <div className="flex flex-col gap-lg lg:gap-xxl">
          <BandHead label="§ 03.4 · Tools" title="What I work with" />
          <div className="grid grid-cols-1 border-t border-hairline lg:grid-cols-3">
            {TOOLS.map((group, index) => (
              <div
                key={group.label}
                className={`flex flex-col gap-xs border-b border-hairline py-md lg:border-b-0 lg:px-lg ${
                  index === 0 ? "lg:pl-0" : ""
                } ${index < TOOLS.length - 1 ? "lg:border-r" : ""}`}
              >
                <p className="t-mono-label flex items-center gap-xs text-faint">
                  <span aria-hidden="true" className={group.dot}>
                    ●
                  </span>
                  {group.label}
                </p>
                <ul className="t-mono-meta flex flex-col gap-xs text-ink">
                  {group.items.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}
