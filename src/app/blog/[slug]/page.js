// src/app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/utils/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../mdx-components";
import ShareButton from "@/components/ShareButton";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return { title: "Post Not Found - Hasbi Hassadiqin" };
  }

  return {
    title: `${post.frontmatter.title} - Hasbi Hassadiqin`,
    description: post.frontmatter.excerpt || post.frontmatter.title,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt || post.frontmatter.title,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header - Apple Style */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Simple Back Navigation */}
          <nav className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
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
              Blog
            </Link>
          </nav>

          {/* Clean Typography */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 mb-6 leading-tight tracking-tight">
              {frontmatter.title}
            </h1>

            {frontmatter.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                {frontmatter.excerpt}
              </p>
            )}

            {/* Clean Meta Info */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-8">
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
              <span>•</span>
              <span>{frontmatter.author || "Hasbi Hassadiqin"}</span>
            </div>

            {/* Simple Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Minimal Share */}
            <div className="flex justify-center space-x-4">
              <ShareButton platform="twitter" title={frontmatter.title} />
              <ShareButton platform="linkedin" title={frontmatter.title} />
              <ShareButton platform="copy" title={frontmatter.title} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image - Clean and Simple */}
      {frontmatter.coverImage && (
        <section className="px-6 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] relative overflow-hidden rounded-2xl">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content - Apple's Typography Style */}
      <article className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-xl prose-gray max-w-none
            prose-headings:text-gray-900 prose-headings:font-normal prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:leading-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
            prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-300 prose-a:underline-offset-4 hover:prose-a:decoration-gray-600 prose-a:transition-colors
            prose-strong:text-gray-900 prose-strong:font-medium
            prose-em:text-gray-700
            prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-mono
            prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:text-lg
            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
            prose-img:rounded-xl prose-img:my-8"
          >
            <MDXRemote source={content} components={components} />
          </div>
        </div>
      </article>

      {/* Clean Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gray-200"></div>
      </div>
    </div>
  );
}
