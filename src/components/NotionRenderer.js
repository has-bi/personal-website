"use client";

import React from "react";
import { getPlainText } from "@/utils/notion";

export default function NotionRenderer({ blocks, title, showTitle = false }) {
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

  // Group consecutive list items
  const groupedBlocks = groupListItems(blocks);

  return (
    <div className="prose prose-lg prose-gray max-w-none">
      {showTitle && title && (
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 mt-0 leading-tight text-gray-900 border-b border-gray-200 pb-4">
          {title}
        </h1>
      )}
      {groupedBlocks.map((block, index) => (
        <NotionBlock key={block.id || `group-${index}`} block={block} />
      ))}
    </div>
  );
}

// Function to group consecutive list items
function groupListItems(blocks) {
  const grouped = [];
  let currentBulletGroup = [];
  let currentNumberGroup = [];

  blocks.forEach((block, index) => {
    if (block.type === "bulleted_list_item") {
      // Add to current bullet group
      currentBulletGroup.push(block);

      // If next block is not a bullet item, close the group
      const nextBlock = blocks[index + 1];
      if (!nextBlock || nextBlock.type !== "bulleted_list_item") {
        grouped.push({
          type: "bulleted_list_group",
          id: `bullet-group-${index}`,
          items: currentBulletGroup,
        });
        currentBulletGroup = [];
      }
    } else if (block.type === "numbered_list_item") {
      // Add to current number group
      currentNumberGroup.push(block);

      // If next block is not a numbered item, close the group
      const nextBlock = blocks[index + 1];
      if (!nextBlock || nextBlock.type !== "numbered_list_item") {
        grouped.push({
          type: "numbered_list_group",
          id: `number-group-${index}`,
          items: currentNumberGroup,
        });
        currentNumberGroup = [];
      }
    } else {
      // Regular block, add as-is
      grouped.push(block);
    }
  });

  return grouped;
}

// Helper functions for video URL processing
function isYouTubeUrl(url) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function isVimeoUrl(url) {
  return url.includes("vimeo.com");
}

function getYouTubeEmbedUrl(url) {
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("youtube.com/embed/")) {
    return url;
  }
  return url;
}

function getVimeoEmbedUrl(url) {
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1].split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

function NotionBlock({ block }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return (
        <p className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 mt-16 leading-tight text-gray-900 border-b border-gray-100 pb-3">
          <RichText richText={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6 mt-12 leading-tight text-gray-900">
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-xl lg:text-2xl font-medium mb-4 mt-10 leading-tight text-gray-900">
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

    // NEW: Grouped bulleted list
    case "bulleted_list_group":
      return (
        <ul className="my-6 space-y-2 ml-6 list-disc">
          {block.items.map((item, index) => (
            <li
              key={item.id || index}
              className="text-gray-700 leading-relaxed text-base lg:text-lg"
            >
              <RichText richText={item.bulleted_list_item.rich_text} />
            </li>
          ))}
        </ul>
      );

    // NEW: Grouped numbered list
    case "numbered_list_group":
      return (
        <ol className="my-6 space-y-2 ml-6 list-decimal">
          {block.items.map((item, index) => (
            <li
              key={item.id || index}
              className="text-gray-700 leading-relaxed text-base lg:text-lg"
            >
              <RichText richText={item.numbered_list_item.rich_text} />
            </li>
          ))}
        </ol>
      );

    // Keep individual cases for backward compatibility (shouldn't be used now)
    case "bulleted_list_item":
      return (
        <ul className="my-6 space-y-2 ml-6 list-disc">
          <li className="text-gray-700 leading-relaxed text-base lg:text-lg">
            <RichText richText={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol className="my-6 space-y-2 ml-6 list-decimal">
          <li className="text-gray-700 leading-relaxed text-base lg:text-lg">
            <RichText richText={block.numbered_list_item.rich_text} />
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-indigo-500 pl-6 my-8 text-gray-600 italic text-lg bg-gray-50 py-4 rounded-r-lg">
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
            <p className="text-center text-gray-500 text-sm mt-3 italic">
              {caption}
            </p>
          )}
        </div>
      );

    case "video":
      const videoUrl = block.video.file?.url || block.video.external?.url;
      const videoCaption = block.video.caption
        ? getPlainText(block.video.caption)
        : "";

      return (
        <div className="my-8">
          {videoUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-100">
              {isYouTubeUrl(videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(videoUrl)}
                  title={videoCaption || "Video content"}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isVimeoUrl(videoUrl) ? (
                <iframe
                  src={getVimeoEmbedUrl(videoUrl)}
                  title={videoCaption || "Video content"}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl} type="video/webm" />
                  <source src={videoUrl} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          {videoCaption && (
            <p className="text-center text-gray-500 text-sm mt-3 italic">
              {videoCaption}
            </p>
          )}
        </div>
      );

    case "embed":
      const embedUrl = block.embed.url;
      const embedCaption = block.embed.caption
        ? getPlainText(block.embed.caption)
        : "";

      return (
        <div className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-100">
            {isYouTubeUrl(embedUrl) ? (
              <iframe
                src={getYouTubeEmbedUrl(embedUrl)}
                title={embedCaption || "Embedded content"}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isVimeoUrl(embedUrl) ? (
              <iframe
                src={getVimeoEmbedUrl(embedUrl)}
                title={embedCaption || "Embedded content"}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <iframe
                src={embedUrl}
                title={embedCaption || "Embedded content"}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            )}
          </div>
          {embedCaption && (
            <p className="text-center text-gray-500 text-sm mt-3 italic">
              {embedCaption}
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
            <div className="flex-1 text-gray-800">
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
            <p className="text-gray-600">Toggle content...</p>
          </div>
        </details>
      );

    default:
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
        <strong key={index} className="font-semibold text-gray-900">
          {element}
        </strong>
      );
    }
    if (text.annotations.italic) {
      element = (
        <em key={index} className="italic text-gray-700">
          {element}
        </em>
      );
    }
    if (text.annotations.strikethrough) {
      element = (
        <del key={index} className="line-through">
          {element}
        </del>
      );
    }
    if (text.annotations.underline) {
      element = (
        <u key={index} className="underline">
          {element}
        </u>
      );
    }
    if (text.annotations.code) {
      element = (
        <code
          key={index}
          className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm font-mono"
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
          className="text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:decoration-indigo-600 transition-colors"
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
