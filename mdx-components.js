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
    // Clean headings - NO GRADIENTS, Apple style
    h1: ({ children }) => (
      <h1 className="text-4xl font-normal text-gray-900 mb-6 mt-8 border-b border-gray-200 pb-2 first:mt-0 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-normal text-gray-900 mb-4 mt-8 leading-tight tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-normal text-gray-900 mb-3 mt-6 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium text-gray-900 mb-2 mt-4">
        {children}
      </h4>
    ),

    // Clean paragraphs
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4 text-lg">{children}</p>
    ),

    // Clean lists - no indigo dots
    ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="space-y-2 mb-6 ml-4 list-decimal">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-700 leading-relaxed flex items-start">
        <span className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
        <span>{children}</span>
      </li>
    ),

    // Clean links - no indigo colors
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-600 transition-all duration-200"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Clean code styling
    pre: ({ children }) => (
      <div className="my-8 rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="text-gray-600 text-xs font-mono">Code</span>
        </div>
        <pre className="bg-gray-50 text-gray-900 p-6 overflow-x-auto text-sm leading-relaxed font-mono">
          {children}
        </pre>
      </div>
    ),

    code: ({ children, className }) => {
      // Inline code - clean gray styling
      if (!className) {
        return (
          <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm font-mono border">
            {children}
          </code>
        );
      }
      // For code blocks, just render simple version
      return <code className={className}>{children}</code>;
    },

    // Clean blockquote - no indigo
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-300 pl-6 py-4 my-8">
        <div className="text-gray-600 italic text-lg leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),

    // Clean text formatting
    strong: ({ children }) => (
      <strong className="font-medium text-gray-900">{children}</strong>
    ),

    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,

    // Clean tables
    table: ({ children }) => (
      <div className="my-8 overflow-hidden rounded-xl border border-gray-200">
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
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {children}
      </td>
    ),

    // Simple horizontal rule - no gradient
    hr: () => (
      <div className="my-12">
        <div className="h-px bg-gray-200"></div>
      </div>
    ),

    // Clean images
    img: ({ src, alt, caption, ...props }) => (
      <figure className="my-12">
        <div className="relative rounded-xl overflow-hidden">
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
