import CodeCopyButton from "@/components/CodeCopyButton";

function textOf(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return node?.props?.children ? textOf(node.props.children) : "";
}

function CodeBlock({ children }) {
  const codeProps = children?.props ?? {};
  const code = textOf(codeProps.children).replace(/\n$/, "");
  const language = /language-(\w+)/.exec(codeProps.className || "")?.[1];

  return (
    <div className="my-8 overflow-hidden border border-gray-200">
      {language && (
        <div className="border-b border-gray-700 bg-gray-900 px-6 py-3 font-mono text-xs uppercase tracking-wider text-gray-400">
          {language}
        </div>
      )}
      <div className="relative bg-gray-900">
        <pre className="overflow-x-auto p-6">
          <code className="font-mono text-sm leading-relaxed text-gray-100">{code}</code>
        </pre>
        <CodeCopyButton code={code} />
      </div>
    </div>
  );
}

function Figure({ src, alt = "" }) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX images come from mixed hosts and sizes */}
      <img src={src} alt={alt} loading="lazy" className="w-full border border-gray-200" />
    </figure>
  );
}

export function YouTube({ id, title = "Video" }) {
  return (
    <div className="my-10 aspect-video overflow-hidden border border-gray-200 bg-gray-100">
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

export function Callout({ kind = "Note", children }) {
  return (
    <aside className="my-8 border border-gray-200 bg-gray-50 px-6 py-4">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-500">{kind}</p>
      <div className="text-lg leading-relaxed text-gray-800">{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  h1: ({ children }) => (
    <h2 className="mt-16 mb-8 text-4xl font-bold leading-tight tracking-tight text-gray-900">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-14 mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-12 mb-4 text-2xl font-medium leading-tight tracking-tight text-gray-900">{children}</h3>
  ),
  p: ({ children }) => <p className="my-5 text-lg leading-relaxed tracking-wide text-gray-800">{children}</p>,
  ul: ({ children }) => <ul className="my-5 ml-6 list-disc space-y-3 text-lg text-gray-800">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 ml-6 list-decimal space-y-3 text-lg text-gray-800">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-700"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-8 border border-gray-200 bg-gray-50 px-6 py-4 text-xl italic text-gray-700">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-gray-200" />,
  pre: CodeBlock,
  code: ({ children }) => (
    <code className="bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-900">{children}</code>
  ),
  img: Figure,
  YouTube,
  Callout,
};
