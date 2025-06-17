// src/components/SafeImage.js - Fixed version
"use client";

import { useState } from "react";
import Image from "next/image";

export function SafeImage({
  src,
  alt,
  className,
  fallbackIcon = "image",
  width,
  height,
  fill = false,
  ...props
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Check if src is valid
  if (!src || src.trim() === "" || imageError) {
    console.log("❌ SafeImage: No src or error occurred:", { src, imageError });

    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
      >
        {fallbackIcon === "project" ? (
          <div className="text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-xs text-gray-400">No Image</p>
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-gray-400">No Image</p>
          </div>
        )}
      </div>
    );
  }

  // Conditional rendering based on whether fill is used
  if (fill) {
    // When using fill, we need a positioned parent
    return (
      <div className="relative w-full h-full">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="animate-pulse text-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-xs text-gray-400">Loading...</p>
            </div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          onError={(e) => {
            console.error("❌ Image failed to load:", src);
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => {
            // console.log("✅ Image loaded successfully:", src);
            setImageLoading(false);
          }}
          {...props}
        />
      </div>
    );
  } else {
    // When not using fill, use width/height
    return (
      <div className="relative">
        {imageLoading && (
          <div
            className={`absolute inset-0 bg-gray-100 flex items-center justify-center z-10 ${className}`}
          >
            <div className="animate-pulse text-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-xs text-gray-400">Loading...</p>
            </div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          width={width || 400}
          height={height || 300}
          className={className}
          onError={(e) => {
            console.error("❌ Image failed to load:", src);
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => {
            console.log("✅ Image loaded successfully:", src);
            setImageLoading(false);
          }}
          {...props}
        />
      </div>
    );
  }
}

// Blog Image - Uses width/height (no fill)
export function SafeBlogImage({
  src,
  alt,
  className,
  width = 600,
  height = 400,
  ...props
}) {
  return (
    <SafeImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      fallbackIcon="image"
      {...props}
    />
  );
}

// Project Image - Can use fill for hero images
export function SafeProjectImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  ...props
}) {
  if (fill) {
    return (
      <SafeImage
        src={src}
        alt={alt}
        className={className}
        fill={true}
        fallbackIcon="project"
        {...props}
      />
    );
  } else {
    return (
      <SafeImage
        src={src}
        alt={alt}
        className={className}
        width={width || 800}
        height={height || 600}
        fallbackIcon="project"
        {...props}
      />
    );
  }
}
