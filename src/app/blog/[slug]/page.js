import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../mdx-components";
import { getBlogPost, getAllBlogSlugs } from "@/utils/blog"; // Adjust as needed

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - Hasbi Hassadiqin",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - Hasbi Hassadiqin`,
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = params;
  const post = getBlogPost(slug);
  const components = useMDXComponents({});

  if (!post) {
    notFound();
  }

  return (
    <main className="px-6 pb-24">
      <div className="container mx-auto max-w-4xl">
        {post.content ? (
          <div
            className="prose prose-lg prose-gray max-w-none
            prose-headings:font-light prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:leading-tight
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
            <MDXRemote source={post.content} components={components} />
          </div>
        ) : (
          <>
            {/* Placeholder content here, as in your original file */}
            {/* ... */}
          </>
        )}
      </div>
    </main>
  );
}
