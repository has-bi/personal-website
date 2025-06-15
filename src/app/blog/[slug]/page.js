import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostFromNotion, getBlogPostsFromNotion } from "@/utils/notion";
import NotionRenderer from "@/components/NotionRenderer";

export async function generateStaticParams() {
  const posts = await getBlogPostsFromNotion();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostFromNotion(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - Hasbi Hassadiqin",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title || "Blog Post"} - Hasbi Hassadiqin`,
    description: post.excerpt || post.desc || "A blog post by Hasbi Hassadiqin",
    openGraph: {
      title: post.title || "Blog Post",
      description:
        post.excerpt || post.desc || "A blog post by Hasbi Hassadiqin",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostFromNotion(slug);

  if (!post) {
    notFound();
  }

  // Helper function to format date safely
  const formatDate = (dateString) => {
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
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Navigation */}
          <nav className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              All Articles
            </Link>
          </nav>

          {/* Article Header */}
          <div className="mb-12">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <time>{formatDate(post.date)}</time>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>by {post.author}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-light mb-6 leading-tight text-gray-900">
              {post.title || "Untitled Post"}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl mb-12 bg-gray-100">
              <img
                src={post.coverImage}
                alt={post.title || "Blog post cover"}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <main className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <NotionRenderer
            blocks={post.content}
            title={post.title}
            showTitle={false}
          />
        </div>
      </main>

      {/* Article Footer */}
      <section className="border-t border-gray-200 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Share Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Share this article
              </h3>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title || "Check out this article"
                  )}&url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* More Articles */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                More articles
              </h3>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
              >
                <span>Browse all articles</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="relative">
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
    </div>
  );
}
