import Link from "next/link";
import { getBlogPostsFromNotion } from "@/utils/notion";
import { SafeBlogImage } from "@/components/SafeImage";

export const metadata = {
  title: "Blog - Hasbi Hassadiqin",
  description: "Thoughts on development, AI, and building digital experiences",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPostsFromNotion();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Blog
                </span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-light mb-6 leading-tight text-gray-900">
                Thoughts on development, AI,
                <br />
                <span className="text-gray-500">
                  and building digital experiences
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Sharing insights, learnings, and discoveries from my journey in
                creating intelligent solutions and meaningful digital
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Featured Post */}
              {posts.length > 0 && (
                <div className="mb-24">
                  <FeaturedBlogCard post={posts[0]} />
                </div>
              )}

              {/* All Posts Grid */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

// Helper function
function formatDate(dateString) {
  if (!dateString) return "Recently";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Recently";
  }
}

// Featured Blog Card - FIXED: Use width/height instead of fill
function FeaturedBlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image - FIXED: Proper aspect ratio container */}
          {post.coverImage && (
            <div className="aspect-[16/10] lg:aspect-square overflow-hidden bg-gray-50">
              <SafeBlogImage
                src={post.coverImage}
                alt={post.title || "Blog post"}
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time>{formatDate(post.date)}</time>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>

            <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
              {post.title || "Untitled Post"}
            </h3>

            {post.excerpt && (
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              <span className="font-medium">Read article</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
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

// Regular Blog Card - FIXED: Use width/height
function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-sm overflow-hidden h-full flex flex-col">
        {post.coverImage && (
          <div className="aspect-[16/10] overflow-hidden bg-gray-50">
            <SafeBlogImage
              src={post.coverImage}
              alt={post.title || "Blog post"}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <time>{formatDate(post.date)}</time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2 flex-grow">
            {post.title || "Untitled Post"}
          </h3>

          {post.excerpt && (
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2 text-sm">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

// Empty State Component
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600 leading-relaxed">
          Check back soon for new articles about development, AI, and digital
          experiences.
        </p>
      </div>
    </div>
  );
}
