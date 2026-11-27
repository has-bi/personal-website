import Link from "next/link";
import { t } from "@/lib/i18n";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export function SectionLabel({ children, className }) {
  return <p className={cx("t-label text-faint", className)}>{children}</p>;
}

// Topic tag: AI and automation carry their hue, web is the neutral archive.
const TAG_STYLES = {
  ai: "bg-tint-ai text-domain-ai",
  automation: "bg-tint-automation text-domain-automation",
};

export function Tag({ topic, lang, children, className }) {
  const style = TAG_STYLES[topic] || "bg-surface-sunken text-muted";
  return (
    <span className={cx("t-tag inline-flex shrink-0 rounded-pill px-sm py-xxs", style, className)}>
      {children || t(lang).topics[topic] || topic}
    </span>
  );
}

function ActionLink({ href, className, children, ...props }) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

// button-primary: a solid pill, one per viewport. It inverts with the theme: a light pill
// with dark text on the dark default (the reference's "Launch now"), an ink pill on light.
export function ButtonPrimary({ href, children, className }) {
  return (
    <ActionLink
      href={href}
      className={cx(
        "t-button inline-flex h-12 shrink-0 items-center rounded-pill bg-primary px-xl text-on-primary transition-colors hover:bg-primary-active",
        className
      )}
    >
      {children}
    </ActionLink>
  );
}

// button-ghost: a hairline pill. `bare` drops the outline for "more" links beside headings.
export function ButtonGhost({ href, children, bare = false, className }) {
  return (
    <ActionLink
      href={href}
      className={cx(
        "t-button inline-flex h-12 shrink-0 items-center rounded-pill bg-canvas px-xl text-ink transition-colors hover:bg-surface active:bg-surface-sunken",
        !bare && "border border-hairline",
        className
      )}
    >
      {children}
    </ActionLink>
  );
}

// Section head: a light heading with an optional small label above it, and an optional
// "more" link on the right (desktop).
export function SectionHead({ label, heading, as: Heading = "h2", more }) {
  return (
    <div className="flex items-end justify-between gap-lg">
      <div className="flex flex-col gap-sm">
        {label ? <SectionLabel>{label}</SectionLabel> : null}
        <Heading className="t-display-lg font-light text-ink">{heading}</Heading>
      </div>
      {more ? <div className="hidden lg:block">{more}</div> : null}
    </div>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="flex flex-col items-start gap-md rounded-card bg-surface p-xl">
      <p className="t-label text-muted">{title}</p>
      <p className="t-body-md text-body">{children}</p>
      {action ? <ButtonGhost href={action.href}>{action.label}</ButtonGhost> : null}
    </div>
  );
}

// Meta strip: equal cells divided by hairlines. 2-column grid on mobile.
export function MetaStrip({ items }) {
  return (
    <dl className="grid w-full grid-cols-2 overflow-hidden rounded-card bg-surface lg:flex [&>div:last-child:nth-child(odd)]:col-span-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-0 flex-col gap-xs px-md py-sm lg:flex-1 lg:px-lg lg:py-md"
        >
          <dt className="t-label text-faint">{item.label}</dt>
          <dd className="t-meta text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// Thin meta line for articles: values only, separated by slashes (dates already use dots),
// between two hairlines.
// Labels stay available to screen readers.
export function MetaLine({ items, action }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-lg border-y border-hairline">
      <dl className="t-meta flex flex-wrap items-center gap-x-sm gap-y-xs py-sm text-muted">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center gap-sm">
            {index > 0 ? (
              <span aria-hidden="true" className="text-faint">
                /
              </span>
            ) : null}
            <dt className="sr-only">{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {action}
    </div>
  );
}

// Numbered section heading used inside articles and project write-ups.
export function NumberedHeading({ number, id, children }) {
  return (
    <div className="flex flex-col gap-xs pt-lg first:pt-0">
      {number ? <span className="t-label text-faint">{number}</span> : null}
      <h2 id={id} className="t-title-lg text-ink">
        {children}
      </h2>
    </div>
  );
}

// `parent` is the path shown ("/projects"); `href` is where it links in this language.
export function Breadcrumb({ parent, href = parent, slug, aside }) {
  return (
    <div className="band flex min-h-11 items-center justify-between gap-sm border-b border-hairline lg:min-h-12">
      <nav aria-label="Breadcrumb" className="t-nav flex min-w-0 items-center gap-sm">
        <Link href={href} className="flex min-h-11 shrink-0 items-center text-ink hover:text-accent">
          ← {parent}
        </Link>
        <span aria-hidden="true" className="text-faint">
          /
        </span>
        <span aria-current="page" className="truncate text-faint">
          {slug}
        </span>
      </nav>
      {aside}
    </div>
  );
}

export { cx };
