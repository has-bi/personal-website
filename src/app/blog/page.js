// src/app/blog/page.js
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/utils/blog";

export const metadata = {
  title: "Blog - Hasbi Hassadiqin",
  description: "Thoughts on development, AI, and building digital experiences",
};

export default async function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-light mb-6 text-gray-900">
              Blog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Sharing insights on development, AI, and the art of building
              meaningful digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
        {/* Cover Image */}
        {frontmatter.coverImage && (
          <div className="aspect-[16/10] overflow-hidden">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
            {frontmatter.title}
          </h2>

          {/* Excerpt */}
          {frontmatter.excerpt && (
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
              {frontmatter.excerpt}
            </p>
          )}

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {frontmatter.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{frontmatter.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
