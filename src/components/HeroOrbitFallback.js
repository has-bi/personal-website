import Link from "next/link";

export default function HeroOrbitFallback({ sections = [] }) {
  const featuredSection = sections[0];

  return (
    <section className="editorial-hero editorial-hero-stage">
      <div className="min-h-[calc(100svh-7rem)] grid gap-8 content-center py-10">
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="editorial-orbit-copy">
            Applied AI engineer building practical systems, products, and
            interfaces with a minimal approach.
          </p>
        </div>

        {featuredSection ? (
          <div className="max-w-xl mx-auto px-4">
            <div className="editorial-orbit-caption static transform-none w-auto pointer-events-auto">
              <p className="editorial-orbit-caption-label">
                {featuredSection.label}
              </p>
              <h2>{featuredSection.title}</h2>
              <p>{featuredSection.preview}</p>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-4xl mx-auto w-full">
          {sections.map((section) => (
            <Link
              key={`${section.label}-${section.href}`}
              href={section.href}
              className="rounded-[1.5rem] border border-black/8 bg-white/80 p-5 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-black/45 mb-3">
                {section.label}
              </span>
              <span className="block text-lg leading-tight">{section.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
