"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

// Highlights the heading currently in view.
function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -60% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function TocList({ headings, active }) {
  return (
    <ol className="t-meta flex flex-col">
      {headings.map((heading) => {
        const current = heading.id === active;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={current ? "location" : undefined}
              className={`flex min-h-9 items-center gap-sm py-xxs pl-sm ${
                current ? "border-l-2 border-accent" : "border-l border-hairline hover:border-faint"
              }`}
            >
              {heading.number ? <span className={current ? "text-accent" : "text-faint"}>{heading.number}</span> : null}
              <span className={current ? "text-ink" : "text-muted"}>{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

// Desktop: a quiet rail of numbered ticks so the body keeps the reader's attention.
// The current section gets the long ink tick; a heading's title appears in a label
// beside its tick on hover or keyboard focus.
export function DesktopToc({ headings, lang, label = t(lang).article.onThisPage, children }) {
  const active = useActiveHeading(headings.map((heading) => heading.id));
  return (
    <div className="sticky top-[88px] flex flex-col gap-lg">
      {headings.length ? (
        <nav aria-label={label}>
          <ol className="flex flex-col">
            {headings.map((heading, index) => {
              const current = heading.id === active;
              const number = heading.number || String(index + 1).padStart(2, "0");
              return (
                <li key={heading.id} className="relative">
                  <a
                    href={`#${heading.id}`}
                    aria-current={current ? "location" : undefined}
                    className="group flex h-9 items-center gap-sm"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-150 ${
                        current ? "w-8 bg-ink" : "w-5 bg-faint group-hover:w-8 group-hover:bg-ink group-focus-visible:w-8"
                      }`}
                    />
                    <span className={`t-meta ${current ? "text-ink" : "text-faint group-hover:text-ink"}`}>{number}</span>
                    <span className="sr-only">{heading.text}</span>
                    <span
                      aria-hidden="true"
                      className="t-body-sm pointer-events-none absolute left-[76px] top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-md py-xs text-on-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      {heading.text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
      {children}
    </div>
  );
}

// Mobile: the TOC collapses into an "On this page · 06" bar.
export function MobileToc({ headings, lang, label = t(lang).article.onThisPage }) {
  if (!headings.length) return null;
  return (
    <details aria-label={label} className="group border-y border-hairline lg:hidden">
      <summary className="band t-label flex min-h-12 cursor-pointer list-none items-center justify-between text-ink [&::-webkit-details-marker]:hidden">
        <span>
          {label} · {String(headings.length).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="transition-transform group-open:rotate-180">
          ↓
        </span>
      </summary>
      <div className="band pb-md">
        <TocList headings={headings} />
      </div>
    </details>
  );
}
