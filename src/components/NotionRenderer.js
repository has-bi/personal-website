"use client";

import React from "react";
import Image from "next/image";
import { getPlainText } from "@/utils/notion";

export default function NotionRenderer({ blocks, title, showTitle = false }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-center py-32">
        <div className="max-w-lg mx-auto">
          <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <svg
              className="w-14 h-14 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Content coming soon
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            This content is being prepared. Check back soon for the full details.
          </p>
        </div>
      </div>
    );
  }

  // Group consecutive list items
  const groupedBlocks = groupListItems(blocks);

  return (
    <div className="notion-content max-w-none">
      {showTitle && title && (
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 mt-0 leading-tight text-gray-900 tracking-tight">
            {title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        </header>
      )}
      <div className="space-y-6">
        {groupedBlocks.map((block, index) => (
          <NotionBlock key={block.id || `group-${index}`} block={block} />
        ))}
      </div>
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

// Helper functions for callout styling
function getCalloutStyle(icon) {
  const styles = {
    '💡': { background: 'bg-yellow-50', border: 'border-yellow-400', iconBg: 'bg-yellow-100', text: 'text-yellow-900' },
    '⚠️': { background: 'bg-orange-50', border: 'border-orange-400', iconBg: 'bg-orange-100', text: 'text-orange-900' },
    '🚨': { background: 'bg-red-50', border: 'border-red-400', iconBg: 'bg-red-100', text: 'text-red-900' },
    '✅': { background: 'bg-green-50', border: 'border-green-400', iconBg: 'bg-green-100', text: 'text-green-900' },
    '❌': { background: 'bg-red-50', border: 'border-red-400', iconBg: 'bg-red-100', text: 'text-red-900' },
    '📝': { background: 'bg-blue-50', border: 'border-blue-400', iconBg: 'bg-blue-100', text: 'text-blue-900' },
    '🔥': { background: 'bg-orange-50', border: 'border-orange-400', iconBg: 'bg-orange-100', text: 'text-orange-900' },
    '⭐': { background: 'bg-yellow-50', border: 'border-yellow-400', iconBg: 'bg-yellow-100', text: 'text-yellow-900' },
    '🎯': { background: 'bg-purple-50', border: 'border-purple-400', iconBg: 'bg-purple-100', text: 'text-purple-900' },
    '📢': { background: 'bg-indigo-50', border: 'border-indigo-400', iconBg: 'bg-indigo-100', text: 'text-indigo-900' }
  };
  
  return styles[icon] || { 
    background: 'bg-gray-50', 
    border: 'border-gray-400', 
    iconBg: 'bg-gray-100', 
    text: 'text-gray-900' 
  };
}

// Helper functions for video URL processing
function isYouTubeUrl(url) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function isVimeoUrl(url) {
  return url.includes("vimeo.com");
}

function getYouTubeEmbedUrl(url) {
  const embedPrefix = "https://www.youtube-nocookie.com/embed/";

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `${embedPrefix}${videoId}?rel=0`;
  } else if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `${embedPrefix}${videoId}?rel=0`;
  } else if (url.includes("youtube.com/embed/")) {
    const videoId = url.split("embed/")[1]?.split("?")[0];
    return videoId ? `${embedPrefix}${videoId}?rel=0` : url;
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
        <p className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-4xl lg:text-5xl font-bold mt-16 mb-8 leading-tight text-gray-900 tracking-tight relative">
          <RichText richText={block.heading_1.rich_text} />
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-4"></div>
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-3xl lg:text-4xl font-semibold mt-14 mb-6 leading-tight text-gray-900 tracking-tight">
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-2xl lg:text-3xl font-medium mt-12 mb-4 leading-tight text-gray-900 tracking-tight">
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

    // NEW: Grouped bulleted list
    case "bulleted_list_group":
      return (
        <ul className="space-y-3 ml-6 list-none relative">
          {block.items.map((item, index) => (
            <li
              key={item.id || index}
              className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-indigo-500 before:font-bold before:text-xl before:leading-relaxed"
            >
              <RichText richText={item.bulleted_list_item.rich_text} />
            </li>
          ))}
        </ul>
      );

    // NEW: Grouped numbered list
    case "numbered_list_group":
      return (
        <ol className="space-y-3 ml-6 list-none relative">
          {block.items.map((item, index) => (
            <li
              key={item.id || index}
              className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide relative pl-8"
            >
              <span className="absolute left-0 top-0 text-indigo-600 font-semibold text-lg">
                {index + 1}.
              </span>
              <RichText richText={item.numbered_list_item.rich_text} />
            </li>
          ))}
        </ol>
      );

    // Keep individual cases for backward compatibility (shouldn't be used now)
    case "bulleted_list_item":
      return (
        <ul className="space-y-3 ml-6 list-none relative">
          <li className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-indigo-500 before:font-bold before:text-xl before:leading-relaxed">
            <RichText richText={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol className="space-y-3 ml-6 list-none relative">
          <li className="text-gray-800 leading-relaxed text-lg font-normal tracking-wide relative pl-8">
            <span className="absolute left-0 top-0 text-indigo-600 font-semibold text-lg">1.</span>
            <RichText richText={block.numbered_list_item.rich_text} />
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote className="relative my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
          <div className="absolute top-4 left-4 text-indigo-300 opacity-50">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
            </svg>
          </div>
          <div className="pl-8 text-gray-700 text-xl leading-relaxed font-medium italic tracking-wide">
            <RichText richText={block.quote.rich_text} />
          </div>
        </blockquote>
      );

    case "code":
      return (
        <div className="my-8 border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          {block.code.language && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {block.code.language}
                </span>
              </div>
            </div>
          )}
          <div className="relative bg-gray-900">
            <pre className="p-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <code className="text-sm font-mono leading-relaxed text-gray-100">
                <RichText richText={block.code.rich_text} />
              </code>
            </pre>
            <button
              onClick={() => {
                const code = getPlainText(block.code.rich_text);
                navigator.clipboard?.writeText(code);
              }}
              className="absolute top-4 right-4 px-3 py-2 text-xs bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-200 border border-gray-600 font-medium flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
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
        <figure className="my-10 group">
          {imageUrl && (
            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Image
                src={imageUrl}
                alt={caption || "Content image"}
                width={800}
                height={600}
                className="w-full group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          {caption && (
            <figcaption className="text-center text-gray-600 text-base mt-4 italic font-medium">
              {caption}
            </figcaption>
          )}
        </figure>
      );

    case "video":
      const videoUrl = block.video.file?.url || block.video.external?.url;
      const videoCaption = block.video.caption
        ? getPlainText(block.video.caption)
        : "";

      return (
        <figure className="my-10 group">
          {videoUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100 group-hover:shadow-xl transition-all duration-300">
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
                  className="w-full h-full object-cover rounded-2xl"
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
            <figcaption className="text-center text-gray-600 text-base mt-4 italic font-medium">
              {videoCaption}
            </figcaption>
          )}
        </figure>
      );

    case "embed":
      const embedUrl = block.embed.url;
      const embedCaption = block.embed.caption
        ? getPlainText(block.embed.caption)
        : "";

      return (
        <figure className="my-10 group">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100 group-hover:shadow-xl transition-all duration-300">
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
            <figcaption className="text-center text-gray-600 text-base mt-4 italic font-medium">
              {embedCaption}
            </figcaption>
          )}
        </figure>
      );

    case "divider":
      return (
        <div className="my-12 flex items-center justify-center">
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      );

    case "callout":
      const icon = block.callout.icon?.emoji || "💡";
      const calloutStyle = getCalloutStyle(icon);
      return (
        <div className={`my-8 p-6 rounded-2xl shadow-sm border-l-4 ${calloutStyle.background} ${calloutStyle.border}`}>
          <div className="flex items-start gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${calloutStyle.iconBg} flex-shrink-0`}>
              <span className="text-2xl">{icon}</span>
            </div>
            <div className={`flex-1 ${calloutStyle.text} text-lg leading-relaxed font-medium`}>
              <RichText richText={block.callout.rich_text} />
            </div>
          </div>
        </div>
      );

    case "toggle":
      return (
        <details className="my-6 group">
          <summary className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200 font-medium text-gray-900 text-lg border border-gray-200 group-hover:border-gray-300">
            <svg 
              className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-90" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <RichText richText={block.toggle.rich_text} />
          </summary>
          <div className="mt-4 pl-8 text-gray-700 text-lg leading-relaxed">
            <p>Toggle content is not fully implemented yet.</p>
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
        <strong key={index} className="font-bold text-gray-900">
          {element}
        </strong>
      );
    }
    if (text.annotations.italic) {
      element = (
        <em key={index} className="italic text-gray-800">
          {element}
        </em>
      );
    }
    if (text.annotations.strikethrough) {
      element = (
        <del key={index} className="line-through text-gray-600">
          {element}
        </del>
      );
    }
    if (text.annotations.underline) {
      element = (
        <u key={index} className="underline decoration-indigo-400 underline-offset-2">
          {element}
        </u>
      );
    }
    if (text.annotations.code) {
      element = (
        <code
          key={index}
          className="bg-gray-100 text-indigo-700 px-2 py-1 rounded-md text-sm font-mono font-semibold border border-gray-200"
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
          className="text-indigo-600 font-medium underline decoration-indigo-300 decoration-2 underline-offset-2 hover:decoration-indigo-600 hover:text-indigo-800 transition-all duration-200"
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
