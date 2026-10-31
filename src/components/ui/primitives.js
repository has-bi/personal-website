import Link from "next/link";
import { TOPICS } from "@/lib/site";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export function SectionLabel({ children, className }) {
  return <p className={cx("t-mono-label text-faint", className)}>{children}</p>;
}

// Topic tag: AI and automation carry their hue, web is the neutral archive.
const TAG_STYLES = {
  ai: "bg-tint-ai text-domain-ai",
  automation: "bg-tint-automation text-domain-automation",
};

export function Tag({ topic, children, className }) {
  const style = TAG_STYLES[topic] || "bg-surface-sunken text-muted";
  return (
    <span className={cx("t-tag inline-flex shrink-0 px-xs py-xxs", style, className)}>
      {children || TOPICS[topic]?.label || topic}
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

// button-primary: accent arrow square + ink label block. One per viewport.
export function ButtonPrimary({ href, children }) {
  return (
    <ActionLink href={href} className="group inline-flex h-12 shrink-0 items-stretch">
      <span aria-hidden="true" className="t-button flex w-12 items-center justify-center bg-accent text-on-primary">
        →
      </span>
      <span className="t-button flex items-center bg-primary px-lg text-on-primary transition-[padding] duration-150 group-hover:pl-7 group-active:bg-primary-active">
        {children}
      </span>
    </ActionLink>
  );
}

// button-ghost: hairline-strong outline. `bare` drops the outline for "more" links beside headings.
export function ButtonGhost({ href, children, bare = false, className }) {
  return (
    <ActionLink
      href={href}
      className={cx(
        "t-button inline-flex h-12 shrink-0 items-center bg-canvas px-lg text-ink transition-colors hover:bg-surface active:bg-surface-sunken",
        !bare && "border border-hairline-strong",
        className
      )}
    >
      {children}
    </ActionLink>
  );
}

// Section head: section label over a slash-heading, optional "more" link on the right (desktop).
export function SectionHead({ label, heading, as: Heading = "h2", more }) {
  return (
    <div className="flex items-end justify-between gap-lg">
      <div className="flex flex-col gap-lg">
        <SectionLabel>{label}</SectionLabel>
        <Heading className="t-display-lg text-ink">{heading}</Heading>
      </div>
      {more ? <div className="hidden lg:block">{more}</div> : null}
    </div>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="flex flex-col items-start gap-md border border-hairline bg-surface p-xl">
      <p className="t-mono-label text-muted">{title}</p>
      <p className="t-body-md text-body">{children}</p>
      {action ? <ButtonGhost href={action.href}>{action.label}</ButtonGhost> : null}
    </div>
  );
}

// Meta strip: equal cells divided by hairlines. 2-column grid on mobile.
export function MetaStrip({ items }) {
  return (
    <dl className="grid w-full grid-cols-2 border-l border-t border-hairline bg-surface lg:flex lg:border-l-0 lg:border-t-0 lg:border [&>div:last-child:nth-child(odd)]:col-span-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-0 flex-col gap-xs border-b border-r border-hairline px-md py-sm lg:flex-1 lg:border-b-0 lg:px-lg lg:py-md lg:last:border-r-0"
        >
          <dt className="t-mono-label text-faint">{item.label}</dt>
          <dd className="t-mono-meta uppercase text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// Numbered section heading used inside articles and project write-ups.
export function NumberedHeading({ number, id, children }) {
  return (
    <div className="flex flex-col gap-xs pt-lg first:pt-0">
      {number ? <span className="t-mono-label text-faint">{number}</span> : null}
      <h2 id={id} className="t-title-lg text-ink">
        {children}
      </h2>
    </div>
  );
}

export function Breadcrumb({ parent, slug, aside }) {
  return (
    <div className="band flex min-h-11 items-center justify-between gap-sm border-b border-hairline lg:min-h-12">
      <nav aria-label="Breadcrumb" className="t-mono-nav flex min-w-0 items-center gap-sm">
        <Link href={parent} className="flex min-h-11 shrink-0 items-center text-ink hover:text-accent">
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
