"use client";

import React from "react";
import { getPlainText } from "@/utils/notion";

export default function NotionRenderer({ blocks, title, showTitle = true }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Content coming soon
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This content is being prepared. Check back soon for the full
            details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-lg prose-gray max-w-none">
      {showTitle && title && (
        <h1 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-900">
          {title}
        </h1>
      )}
      {blocks.map((block, index) => (
        <NotionBlock key={block.id || index} block={block} />
      ))}
    </div>
  );
}

function NotionBlock({ block }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return (
        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-4xl lg:text-5xl font-light mb-8 mt-12 leading-tight text-gray-900">
          <RichText richText={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-3xl lg:text-4xl font-light mb-6 mt-12 leading-tight text-gray-900">
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-2xl lg:text-3xl font-medium mb-4 mt-10 text-gray-900">
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li className="text-gray-700 leading-relaxed text-lg ml-6 list-disc mb-2">
          <RichText richText={block.bulleted_list_item.rich_text} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="text-gray-700 leading-relaxed text-lg ml-6 list-decimal mb-2">
          <RichText richText={block.numbered_list_item.rich_text} />
        </li>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-indigo-500 pl-6 my-8 text-gray-600 italic text-lg">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <div className="my-8 border border-gray-200 rounded-xl overflow-hidden">
          {block.code.language && (
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                {block.code.language}
              </span>
            </div>
          )}
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
              <code className="text-sm font-mono">
                <RichText richText={block.code.rich_text} />
              </code>
            </pre>
            <button
              onClick={() => {
                const code = getPlainText(block.code.rich_text);
                navigator.clipboard?.writeText(code);
              }}
              className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      );

    case "image":
      const imageUrl = block.image.file?.url || block.image.external?.url;
      const caption = block.image.caption
        ? getPlainText(block.image.caption)
        : "";

      return (
        <div className="my-8">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={caption || "Content image"}
              className="w-full rounded-xl shadow-lg"
            />
          )}
          {caption && (
            <p className="text-center text-gray-500 text-sm mt-2 italic">
              {caption}
            </p>
          )}
        </div>
      );

    case "divider":
      return <hr className="my-8 border-gray-200" />;

    case "callout":
      const icon = block.callout.icon?.emoji || "💡";
      return (
        <div className="my-8 p-6 bg-indigo-50 border border-indigo-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <span className="text-xl">{icon}</span>
            <div className="flex-1">
              <RichText richText={block.callout.rich_text} />
            </div>
          </div>
        </div>
      );

    case "toggle":
      return (
        <details className="my-4 p-4 border border-gray-200 rounded-lg">
          <summary className="font-medium text-gray-900 cursor-pointer">
            <RichText richText={block.toggle.rich_text} />
          </summary>
          <div className="mt-4">
            {/* Note: Notion toggle children would need separate API call */}
            <p className="text-gray-600">Toggle content...</p>
          </div>
        </details>
      );

    default:
      // Fallback for unsupported block types
      return (
        <div className="my-4 p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
          <p className="text-gray-600 text-sm">
            Unsupported block type: {type}
          </p>
        </div>
      );
  }
}

function RichText({ richText }) {
  if (!richText) return null;

  return richText.map((text, index) => {
    let element = text.plain_text;

    // Apply formatting
    if (text.annotations.bold) {
      element = (
        <strong key={index} className="text-gray-900 font-medium">
          {element}
        </strong>
      );
    }
    if (text.annotations.italic) {
      element = (
        <em key={index} className="text-gray-700">
          {element}
        </em>
      );
    }
    if (text.annotations.strikethrough) {
      element = <del key={index}>{element}</del>;
    }
    if (text.annotations.underline) {
      element = <u key={index}>{element}</u>;
    }
    if (text.annotations.code) {
      element = (
        <code
          key={index}
          className="text-gray-900 bg-gray-100 px-2 py-1 rounded text-base font-mono"
        >
          {element}
        </code>
      );
    }

    // Handle links
    if (text.href) {
      element = (
        <a
          key={index}
          href={text.href}
          className="text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600 transition-colors"
          target={text.href.startsWith("http") ? "_blank" : "_self"}
          rel={text.href.startsWith("http") ? "noopener noreferrer" : ""}
        >
          {element}
        </a>
      );
    }

    return typeof element === "string" ? (
      <span key={index}>{element}</span>
    ) : (
      element
    );
  });
}
