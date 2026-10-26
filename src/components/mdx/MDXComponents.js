import { Children } from "react";
import CodeCopyButton from "@/components/CodeCopyButton";
import { NumberedHeading } from "@/components/ui/primitives";

function textOf(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return node?.props?.children ? textOf(node.props.children) : "";
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

// code-block: the only dark surface in the system.
function CodeBlock({ children }) {
  const codeProps = children?.props ?? {};
  const code = textOf(codeProps.children).replace(/\n$/, "");
  const language = /language-(\w+)/.exec(codeProps.className || "")?.[1];

  return (
    <div className="bg-surface-dark-elevated">
      <div className="t-mono-label flex min-h-11 items-center justify-between border-b border-on-dark-muted/40 px-md text-on-dark-muted lg:px-lg">
        <span>{language || "Code"}</span>
        <CodeCopyButton code={code} />
      </div>
      <pre className="overflow-x-auto p-md lg:p-lg">
        <code className="t-code text-on-dark">{code}</code>
      </pre>
    </div>
  );
}

// Images are the author's own screenshots and diagrams; a markdown title becomes the caption.
function Figure({ src, alt = "", title }) {
  return (
    <figure className="-mx-md flex flex-col gap-xs lg:mx-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX images come from mixed hosts and sizes */}
      <img src={src} alt={alt} loading="lazy" className="w-full border-y border-hairline bg-surface-sunken lg:border" />
      {title ? <figcaption className="t-mono-meta px-md uppercase text-muted lg:px-0">{title}</figcaption> : null}
    </figure>
  );
}

export function YouTube({ id, title = "Video" }) {
  return (
    <div className="-mx-md aspect-video border-y border-hairline bg-surface-sunken lg:mx-0 lg:border">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        className="h-full w-full"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

// callout: NOTE, TIP, RULES, WARNING, CHECK YOUR WORK. Full hairline box, no coloured stripe.
export function Callout({ kind = "Note", children }) {
  return (
    <aside className="flex flex-col gap-xs border border-hairline bg-surface px-lg py-md">
      <p className="t-mono-label text-muted">{kind}</p>
      <div className="t-body-md flex flex-col gap-xs text-ink [&_p]:m-0 [&_p]:text-[17px] [&_p]:text-ink">{children}</div>
    </aside>
  );
}

// Project write-up blocks (DESIGN.md, Project Page).
export function Features({ children }) {
  const items = Children.toArray(children).filter((child) => child?.props?.name);
  return (
    <ol className="border-t border-hairline">
      {items.map((child, index) => (
        <li key={child.props.name} className="flex flex-col gap-xs border-b border-hairline py-sm lg:flex-row lg:gap-lg">
          <span className="flex gap-sm lg:w-[220px] lg:shrink-0">
            <span className="t-mono-meta text-faint">{String(index + 1).padStart(2, "0")}</span>
            <span className="t-body-md text-ink">{child.props.name}</span>
          </span>
          <span className="t-body-sm flex-1 text-body">{child.props.children}</span>
        </li>
      ))}
    </ol>
  );
}

export function Feature() {
  return null;
}

export function Spec({ children }) {
  const rows = Children.toArray(children).filter((child) => child?.props?.label);
  return (
    <dl className="border border-hairline bg-surface">
      {rows.map((child) => (
        <div
          key={child.props.label}
          className="flex flex-col gap-xxs border-b border-hairline px-md py-sm last:border-b-0 lg:flex-row lg:gap-lg"
        >
          <dt className="t-mono-label text-muted lg:w-[120px] lg:shrink-0">{child.props.label}</dt>
          <dd className="t-mono-meta flex-1 text-ink">{child.props.children}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SpecRow() {
  return null;
}

export function Problems({ children }) {
  const items = Children.toArray(children).filter((child) => child?.props?.problem);
  return (
    <ul className="border-t border-hairline">
      {items.map((child) => (
        <li key={child.props.problem} className="flex flex-col gap-xs border-b border-hairline py-md">
          <p className="flex flex-col gap-xxs lg:flex-row lg:gap-md">
            <span className="t-mono-label text-faint lg:w-[120px] lg:shrink-0">Problem</span>
            <span className="t-body-md flex-1 text-ink">{child.props.problem}</span>
          </p>
          <p className="flex flex-col gap-xxs lg:flex-row lg:gap-md">
            <span className="t-mono-label text-accent lg:w-[120px] lg:shrink-0">What worked</span>
            <span className="t-body-md flex-1 text-body">{child.props.children}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Problem() {
  return null;
}

export function Learned({ label, children }) {
  return (
    <div className="flex flex-col gap-xxs">
      <p className="t-mono-label text-muted">{label}</p>
      <div className="t-body-lg text-body [&_p]:m-0">{children}</div>
    </div>
  );
}

export function Screenshots({ children }) {
  return <div className="grid grid-cols-2 gap-xxs lg:grid-cols-3">{children}</div>;
}

export function Shot({ src, alt = "" }) {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className="block border border-hairline bg-surface-sunken">
      {/* eslint-disable-next-line @next/next/no-img-element -- screenshots keep their own aspect ratio */}
      <img src={src} alt={alt} loading="lazy" className="aspect-4/3 w-full object-cover object-top" />
    </a>
  );
}

// One component map per file, so <h2> can show its number from the file's own headings.
export function createMdxComponents({ headings = [] } = {}) {
  const numberOf = (text) => headings.find((heading) => heading.id === slugify(text));

  return {
    h1: ({ children }) => <h2 className="t-title-lg pt-lg text-ink">{children}</h2>,
    h2: ({ children }) => {
      const heading = numberOf(textOf(children));
      return (
        <NumberedHeading number={heading?.number} id={heading?.id || slugify(textOf(children))}>
          {children}
        </NumberedHeading>
      );
    },
    h3: ({ children }) => <h3 className="t-title-md pt-xs text-ink">{children}</h3>,
    h4: ({ children }) => <h4 className="t-mono-label pt-xs text-muted">{children}</h4>,
    p: ({ children }) => <p className="t-body-lg text-body">{children}</p>,
    ul: ({ children }) => <ul className="t-body-lg flex list-disc flex-col gap-xs pl-lg text-body marker:text-faint">{children}</ul>,
    ol: ({ children }) => <ol className="t-body-lg flex list-decimal flex-col gap-xs pl-lg text-body marker:t-mono-meta marker:text-faint">{children}</ol>,
    li: ({ children }) => <li className="pl-xxs">{children}</li>,
    strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
    a: ({ href = "", children }) => {
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-accent underline decoration-1 underline-offset-2 hover:decoration-2"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="t-quote flex flex-col gap-lg border border-hairline bg-surface p-xl text-ink [&_p]:t-quote [&_p]:text-ink">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-hairline" />,
    pre: CodeBlock,
    code: ({ children }) => <code className="bg-surface-sunken px-1 py-px font-mono text-[0.88em] text-ink">{children}</code>,
    img: Figure,
    YouTube,
    Callout,
    Features,
    Feature,
    Spec,
    SpecRow,
    Problems,
    Problem,
    Learned,
    Screenshots,
    Shot,
  };
}
