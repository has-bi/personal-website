// components/BlogSection.js - Pure Server Component
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/utils/blog";
import BlogSectionClient from "./BlogSectionClient";

// ✅ Server Component - data fetching happens on server
export default function BlogSection() {
  // Server-side data fetching - no useEffect needed!
  const allPosts = getBlogPosts();
  const posts = allPosts.slice(0, 3); // Get first 3 posts

  // Pass serialized data to client component
  const serializedPosts = posts.map((post) => ({
    ...post,
    frontmatter: {
      ...post.frontmatter,
      // Ensure dates are serializable
      date: post.frontmatter.date
        ? new Date(post.frontmatter.date).toISOString()
        : "",
    },
  }));

  return <BlogSectionClient posts={serializedPosts} />;
}

// These components are ONLY used server-side now
// Featured Blog Card - Server Component
function FeaturedBlogCard({ post }) {
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

// Regular Blog Card - Server Component
function BlogCard({ post }) {
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

// Empty State - Server Component
function EmptyState() {
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

// Export for use by other server components if needed
export { FeaturedBlogCard, BlogCard, EmptyState };
