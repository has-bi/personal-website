// mdx-components.js (in your root directory)
import {
  ClientCodeEditor,
  ClientCodeTabs,
} from "./src/components/ClientMDXComponents";

// Server-safe components
function Callout({ type = "info", children }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };

  const icons = {
    info: "💡",
    warning: "⚠️",
    error: "❌",
    success: "✅",
  };

  return (
    <div className={`p-4 border-l-4 rounded-r-lg my-6 ${styles[type]}`}>
      <div className="flex items-start">
        <span className="mr-2 text-lg">{icons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function CodeEditor(props) {
  return <ClientCodeEditor {...props} />;
}

function CodeTabs(props) {
  return <ClientCodeTabs {...props} />;
}

export function useMDXComponents(components) {
  return {
    // Headings with better styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 border-b border-gray-200 pb-2 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-900 mb-4 mt-8">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {children}
        </span>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
        {children}
      </h4>
    ),

    // Enhanced paragraphs
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4 text-lg">{children}</p>
    ),

    // Styled lists
    ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="space-y-2 mb-6 ml-4 list-decimal">{children}</ol>
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

    // Enhanced code styling
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
      // If it's inline code
      if (!className) {
        return (
          <code className="bg-gray-100 text-indigo-600 px-2 py-1 rounded-md text-sm font-mono border">
            {children}
          </code>
        );
      }

      // For code blocks, just render simple version
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

    // Enhanced text formatting
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
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
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

    // Enhanced horizontal rule
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
    img: ({ src, alt, caption, ...props }) => (
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
    ),

    // Custom components
    Callout,
    CodeEditor,
    CodeTabs,

    // Override any passed components
    ...components,
  };
}
