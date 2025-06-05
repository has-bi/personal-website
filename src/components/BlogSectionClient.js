// components/BlogSectionClient.js - Pure Client Component (no server imports!)
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function BlogSectionClient({ posts }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="pt-24" id="blog-section" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                Blog
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight text-gray-900">
              Insights from building
              <br />
              <span className="text-gray-500">intelligent solutions</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Sharing learnings, discoveries, and thoughts on AI, web
              development, and creating meaningful digital experiences.
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        {posts && posts.length > 0 ? (
          <>
            {/* Featured Post (First/Latest) */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="mb-16"
            >
              <ClientFeaturedBlogCard post={posts[0]} />
            </motion.div>

            {/* Other Posts Grid */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {posts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardVariants}
                    transition={{
                      delay: (index + 1) * 0.1,
                    }}
                    className="h-full"
                  >
                    <ClientBlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All Link */}
            <div className="flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-gray-900 hover:text-gray-700 transition-colors duration-300 group"
              >
                <span className="font-medium">Read all articles</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <ClientEmptyState />
        )}
      </div>

      {/* Decorative Divider */}
      <div className="relative mt-24">
        <div className="w-full h-px bg-gray-200"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// Client-side versions of components (no server imports)
function ClientFeaturedBlogCard({ post }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          {frontmatter.coverImage && (
            <div className="aspect-[16/10] lg:aspect-square overflow-hidden bg-gray-50">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {frontmatter.readTime && (
                <>
                  <span>•</span>
                  <span>{frontmatter.readTime}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
              {frontmatter.title}
            </h3>

            {/* Excerpt */}
            {frontmatter.excerpt && (
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                {frontmatter.excerpt}
              </p>
            )}

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {frontmatter.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read More */}
            <div className="flex items-center gap-3 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              <span className="font-medium">Read article</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ClientBlogCard({ post }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-sm overflow-hidden h-full flex flex-col">
        {/* Cover Image */}
        {frontmatter.coverImage && (
          <div className="aspect-[16/10] overflow-hidden bg-gray-50">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <time>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {frontmatter.readTime && (
              <>
                <span>•</span>
                <span>{frontmatter.readTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2 flex-grow">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          {frontmatter.excerpt && (
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2 text-sm">
              {frontmatter.excerpt}
            </p>
          )}

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {frontmatter.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {frontmatter.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{frontmatter.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function ClientEmptyState() {
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
        <h3 className="text-xl font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600 leading-relaxed">
          Check back soon for new articles about AI, development, and digital
          innovation.
        </p>
      </div>
    </div>
  );
}
