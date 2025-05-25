// components/MDXComponents.js
import { ClientCodeEditor, ClientCodeTabs } from "./ClientMDXComponents";

// Callout Component
function Callout({ type = "info", children }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    error: "bg-red-50 border-red-200 text-red-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };

  const icons = {
    info: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`border-l-4 rounded-r-xl my-8 p-6 shadow-sm ${styles[type]}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1 space-y-2">{children}</div>
      </div>
    </div>
  );
}

// Code Editor wrapper
function CodeEditor(props) {
  return <ClientCodeEditor {...props} />;
}

// Code Tabs wrapper
function CodeTabs(props) {
  return <ClientCodeTabs {...props} />;
}

// Enhanced Image component
function MDXImage({ src, alt, caption, ...props }) {
  return (
    <figure className="my-12">
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img src={src} alt={alt} className="w-full h-auto" {...props} />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-4 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  // Headings with better typography
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6 pb-4 border-b border-gray-200 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold text-gray-900 mt-12 mb-6 relative">
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {children}
      </span>
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-semibold text-gray-900 mt-6 mb-2">
      {children}
    </h6>
  ),

  // Enhanced paragraphs
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-6 text-lg">{children}</p>
  ),

  // Styled lists
  ul: ({ children }) => <ul className="space-y-2 mb-6 ml-6">{children}</ul>,
  ol: ({ children }) => (
    <ol className="space-y-2 mb-6 ml-6 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-700 leading-relaxed flex items-start">
      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
      <span>{children}</span>
    </li>
  ),

  // Enhanced links
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-indigo-300 underline-offset-2 hover:decoration-indigo-500 transition-all duration-200"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // Code styling
  pre: ({ children }) => (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-xs font-mono">Code</span>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  ),

  code: ({ children, className }) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-gray-100 text-indigo-600 px-2 py-1 rounded-md text-sm font-mono border">
          {children}
        </code>
      );
    }

    // Block code (handled by pre)
    return <code className={className}>{children}</code>;
  },

  // Enhanced blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-300 bg-indigo-50 pl-6 py-4 my-8 rounded-r-lg">
      <div className="text-indigo-900 italic text-lg leading-relaxed">
        {children}
      </div>
    </blockquote>
  ),

  // Text formatting
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">
      {children}
    </strong>
  ),

  em: ({ children }) => (
    <em className="italic text-gray-700 font-medium">{children}</em>
  ),

  // Enhanced tables
  table: ({ children }) => (
    <div className="my-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,

  tbody: ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),

  tr: ({ children }) => (
    <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
  ),

  th: ({ children }) => (
    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => (
    <div className="my-12 flex items-center justify-center">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="mx-4">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  ),

  // Enhanced images
  img: MDXImage,

  // Custom components
  Callout,
  CodeEditor,
  CodeTabs,
  MDXImage,
};
