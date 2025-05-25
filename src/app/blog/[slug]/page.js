// src/app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/utils/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../mdx-components";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  console.log("=== DEBUG: Blog post loading ===");
  console.log("Slug:", params.slug);

  const post = getBlogPost(params.slug);

  if (!post) {
    console.log("ERROR: Post not found");
    notFound();
  }

  console.log("=== DEBUG: Post data ===");
  console.log("Frontmatter:", JSON.stringify(post.frontmatter, null, 2));
  console.log("Content preview:", post.content.substring(0, 100) + "...");
  console.log(
    "Content starts with frontmatter?",
    post.content.startsWith("---")
  );

  const { frontmatter, content } = post;
  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-white">
      {/* Debug Section - Remove this after fixing */}
      <div className="bg-red-100 border border-red-300 p-4 m-4 rounded">
        <h3 className="font-bold text-red-800">
          DEBUG INFO (Remove after fixing):
        </h3>
        <p>
          <strong>Title:</strong> {frontmatter.title}
        </p>
        <p>
          <strong>Content starts with:</strong> {content.substring(0, 50)}...
        </p>
        <p>
          <strong>Content includes frontmatter?</strong>{" "}
          {content.includes("---") ? "YES - PROBLEM!" : "NO - GOOD!"}
        </p>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Back to Blog
            </Link>
          </nav>

          <div className="mb-6">
            <span className="text-gray-500 text-sm">
              {new Date(frontmatter.date).toLocaleDateString()} •{" "}
              {frontmatter.author}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {frontmatter.title}
          </h1>

          {frontmatter.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{frontmatter.excerpt}</p>
          )}

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={content} components={components} />
          </div>
        </div>
      </article>
    </div>
  );
}
