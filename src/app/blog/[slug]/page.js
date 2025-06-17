import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostFromNotion } from "@/utils/notion";
import NotionRenderer from "@/components/NotionRenderer";
import { SafeBlogImage } from "@/components/SafeImage";
import ShareButton from "@/components/ShareButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const post = await getBlogPostFromNotion(slug);
    if (!post) {
      return {
        title: "Blog Post Not Found - Hasbi Hassadiqin",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: `${post.title || "Blog Post"} - Hasbi Hassadiqin`,
      description: post.excerpt || "A blog post by Hasbi Hassadiqin",
      openGraph: {
        title: post.title || "Blog Post",
        description: post.excerpt || "A blog post by Hasbi Hassadiqin",
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post - Hasbi Hassadiqin",
      description: "A blog post by Hasbi Hassadiqin",
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPostFromNotion(slug);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
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

          {/* Cover Image - FIXED: Use proper container with height */}
          {post.coverImage && (
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl mb-12 bg-gray-100">
              <SafeBlogImage
                src={post.coverImage}
                alt={post.title || "Blog post cover"}
                width={1024}
                height={576}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
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
                <ShareButton
                  platform="twitter"
                  title={post.title || "Check out this article"}
                />
                <ShareButton
                  platform="linkedin"
                  title={post.title || "Check out this article"}
                />
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
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
