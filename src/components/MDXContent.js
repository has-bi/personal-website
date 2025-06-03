"use client";

import React from "react";

export default function MDXContent({ source }) {
  // Simple markdown-to-HTML renderer that works with your existing content
  const renderContent = (mdxSource) => {
    if (!mdxSource) return null;

    // Split content into blocks
    const blocks = mdxSource.split("\n\n").filter((block) => block.trim());

    return blocks.map((block, index) => {
      const trimmedBlock = block.trim();

      // Headers
      if (trimmedBlock.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-4xl lg:text-5xl font-light mb-8 mt-12 leading-tight text-gray-900"
          >
            {trimmedBlock.slice(2)}
          </h1>
        );
      }

      if (trimmedBlock.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-3xl lg:text-4xl font-light mb-6 mt-12 leading-tight text-gray-900"
          >
            {trimmedBlock.slice(3)}
          </h2>
        );
      }

      if (trimmedBlock.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-2xl lg:text-3xl font-medium mb-4 mt-10 text-gray-900"
          >
            {trimmedBlock.slice(4)}
          </h3>
        );
      }

      if (trimmedBlock.startsWith("#### ")) {
        return (
          <h4
            key={index}
            className="text-xl font-medium mb-3 mt-8 text-gray-900"
          >
            {trimmedBlock.slice(5)}
          </h4>
        );
      }

      // Code blocks
      if (trimmedBlock.startsWith("```")) {
        const lines = trimmedBlock.split("\n");
        const language = lines[0].slice(3) || "text";
        const code = lines.slice(1, -1).join("\n");

        return (
          <div
            key={index}
            className="my-8 border border-gray-200 rounded-xl overflow-hidden"
          >
            {language && language !== "text" && (
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  {language}
                </span>
              </div>
            )}
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
                <code className="text-sm font-mono">{code}</code>
              </pre>
              <button
                onClick={() => navigator.clipboard?.writeText(code)}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        );
      }

      // Blockquotes
      if (trimmedBlock.startsWith("> ")) {
        const content = trimmedBlock
          .split("\n")
          .map((line) => line.replace(/^> ?/, ""))
          .join(" ");
        return (
          <blockquote
            key={index}
            className="border-l-4 border-indigo-500 pl-6 my-8 text-gray-600 italic text-lg"
          >
            {content}
          </blockquote>
        );
      }

      // Lists
      if (trimmedBlock.includes("\n- ") || trimmedBlock.startsWith("- ")) {
        const items = trimmedBlock
          .split("\n")
          .filter((line) => line.trim().startsWith("- "));
        return (
          <ul key={index} className="my-6 space-y-2 ml-6">
            {items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-gray-700 leading-relaxed text-lg list-disc"
              >
                {parseInlineMarkdown(item.replace(/^- /, ""))}
              </li>
            ))}
          </ul>
        );
      }

      if (trimmedBlock.includes("\n* ") || trimmedBlock.startsWith("* ")) {
        const items = trimmedBlock
          .split("\n")
          .filter((line) => line.trim().startsWith("* "));
        return (
          <ul key={index} className="my-6 space-y-2 ml-6">
            {items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-gray-700 leading-relaxed text-lg list-disc"
              >
                {parseInlineMarkdown(item.replace(/^\* /, ""))}
              </li>
            ))}
          </ul>
        );
      }

      // Numbered lists
      if (/^\d+\. /.test(trimmedBlock)) {
        const items = trimmedBlock
          .split("\n")
          .filter((line) => /^\d+\. /.test(line.trim()));
        return (
          <ol key={index} className="my-6 space-y-2 ml-6">
            {items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-gray-700 leading-relaxed text-lg list-decimal"
              >
                {parseInlineMarkdown(item.replace(/^\d+\. /, ""))}
              </li>
            ))}
          </ol>
        );
      }

      // Images
      if (trimmedBlock.startsWith("![")) {
        const match = trimmedBlock.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (match) {
          const [, alt, src] = match;
          return (
            <div key={index} className="my-8">
              <img
                src={src}
                alt={alt}
                className="w-full rounded-xl shadow-lg"
              />
              {alt && (
                <p className="text-center text-gray-500 text-sm mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          );
        }
      }

      // Regular paragraphs
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
          {parseInlineMarkdown(trimmedBlock)}
        </p>
      );
    });
  };

  // Parse inline markdown (bold, italic, links, inline code)
  const parseInlineMarkdown = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold text **text**
      const boldMatch = remaining.match(/^(.*?)\*\*(.*?)\*\*(.*)/);
      if (boldMatch) {
        const [, before, bold, after] = boldMatch;
        if (before) parts.push(before);
        parts.push(
          <strong key={key++} className="text-gray-900 font-medium">
            {bold}
          </strong>
        );
        remaining = after;
        continue;
      }

      // Italic text *text*
      const italicMatch = remaining.match(/^(.*?)\*(.*?)\*(.*)/);
      if (italicMatch) {
        const [, before, italic, after] = italicMatch;
        if (before) parts.push(before);
        parts.push(
          <em key={key++} className="text-gray-700">
            {italic}
          </em>
        );
        remaining = after;
        continue;
      }

      // Links [text](url)
      const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)(.*)/);
      if (linkMatch) {
        const [, before, text, url, after] = linkMatch;
        if (before) parts.push(before);
        parts.push(
          <a
            key={key++}
            href={url}
            className="text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600 transition-colors"
          >
            {text}
          </a>
        );
        remaining = after;
        continue;
      }

      // Inline code `code`
      const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)/);
      if (codeMatch) {
        const [, before, code, after] = codeMatch;
        if (before) parts.push(before);
        parts.push(
          <code
            key={key++}
            className="text-gray-900 bg-gray-100 px-2 py-1 rounded text-base font-mono"
          >
            {code}
          </code>
        );
        remaining = after;
        continue;
      }

      // No more matches, add remaining text
      parts.push(remaining);
      break;
    }

    return parts;
  };

  return (
    <div className="prose prose-lg prose-gray max-w-none">
      {renderContent(source)}
    </div>
  );
}
