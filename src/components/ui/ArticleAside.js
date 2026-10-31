"use client";

import { useEffect, useState } from "react";

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
    <ol className="t-mono-meta flex flex-col">
      {headings.map((heading) => {
        const current = heading.id === active;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={current ? "location" : undefined}
              className={`flex min-h-9 items-center gap-sm py-xxs pl-sm ${
                current ? "border-l-2 border-accent" : "border-l border-hairline hover:border-hairline-strong"
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

// Desktop: sticky "On this page" column. Hidden below lg (see MobileToc).
export function DesktopToc({ headings, children }) {
  const active = useActiveHeading(headings.map((heading) => heading.id));
  return (
    <div className="sticky top-[88px] flex flex-col gap-lg">
      {headings.length ? (
        <>
          <p className="t-mono-label text-faint">On this page</p>
          <TocList headings={headings} active={active} />
          <div className="h-px bg-hairline" />
        </>
      ) : null}
      {children}
    </div>
  );
}

// Mobile: the TOC collapses into an "ON THIS PAGE · 06 ↓" bar.
export function MobileToc({ headings }) {
  if (!headings.length) return null;
  return (
    <details className="group border-y border-hairline lg:hidden">
      <summary className="band t-mono-label flex min-h-12 cursor-pointer list-none items-center justify-between text-ink [&::-webkit-details-marker]:hidden">
        <span>
          On this page · {String(headings.length).padStart(2, "0")}
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

export function ShareLinks({ url, title }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const link = "flex min-h-11 items-center uppercase text-ink hover:text-accent";

  return (
    <div className="flex flex-col gap-xs">
      <p className="t-mono-label text-faint">Share</p>
      <div className="t-mono-meta flex flex-wrap items-center gap-x-xs uppercase">
        <button
          type="button"
          className={link}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            } catch {
              setCopied(false);
            }
          }}
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
        </button>
        <span aria-hidden="true" className="text-faint">·</span>
        <a
          className={link}
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X ↗
        </a>
        <span aria-hidden="true" className="text-faint">·</span>
        <a
          className={link}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
