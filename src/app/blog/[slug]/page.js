// src/app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/utils/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../mdx-components";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.frontmatter.title} - Hasbi Hassadiqin`,
    description: post.frontmatter.excerpt || post.frontmatter.title,
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-orange-500"></div>

        {/* Content */}
        <div className="relative z-10 px-6 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {frontmatter.title}
            </h1>

            <p className="text-xl sm:text-2xl leading-relaxed mb-8 opacity-90 max-w-3xl mx-auto">
              {frontmatter.excerpt}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Share
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Get started
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content - Left Column (3/4 width) */}
            <article className="lg:col-span-3">
              {/* Article Meta */}
              <div className="flex items-center mb-8 text-sm text-gray-500">
                <time>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="mx-2">•</span>
                <span>{frontmatter.readTime}</span>
                <span className="mx-2">•</span>
                <span>By {frontmatter.author}</span>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg prose-gray max-w-none">
                {/* Large First Letter */}
                <div className="float-left text-6xl font-bold leading-none mr-3 mt-1 text-gray-900">
                  M
                </div>

                {/* Content */}
                <MDXRemote source={content} components={components} />

                {/* Featured Image with People Avatars Overlay */}
                <div className="relative my-12">
                  <div className="aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/blog/featured-workspace.jpg"
                      alt="Modern workspace"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                    />

                    {/* Floating Avatar Elements */}
                    <div className="absolute inset-0">
                      {/* Example floating avatars */}
                      <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-sm">👤</span>
                      </div>
                      <div className="absolute top-20 right-12 w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                      <div className="absolute bottom-12 left-20 w-14 h-14 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                      <div className="absolute bottom-6 right-6 w-11 h-11 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Quote Section */}
                <blockquote className="text-xl italic text-gray-700 bg-gray-50 p-8 rounded-2xl my-12 border-l-4 border-blue-500">
                  "In a world older and more complete than ours they move
                  finished and complete, gifted with extensions of the senses we
                  have lost or never attained, living by voices we shall never
                  hear."
                  <footer className="mt-4 flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <cite className="text-sm text-gray-600 not-italic">
                      Amelia Laurent, Product Designer
                    </cite>
                  </footer>
                </blockquote>

                {/* Continue with more content sections */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Tools and Resources
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Placerat nunc lorem ut aliquam est rutrum integer tellus.
                      Quis hac adipiscing ullamcorper porttitor nisi interdum
                      laoreet tempor ut turpis ut eu ac adipiscing fermentum.
                      Sollicitudin lacinia augue molestie cursus vestibulum
                      ipsum phasellus sit molestie et mattis faucibus ut ut
                      sodales cursus et tempus.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Advice for New Designers
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Est nisi et eleifend est nisi. Pulvinar at ante urna
                      imperdiet commodo consectetur conseils ther. Sed
                      condimentum enim dignissim adipiscing faucibus consequat,
                      urna. Viverra purus et sed auctor augue. Risus, vulputate
                      vulputate porttitor ipsum vel congue consequat aliquet.
                      Ante et integer donec porttitor magna.
                    </p>

                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>
                        Start with research and understand your users' needs
                      </li>
                      <li>
                        Learn the fundamentals before jumping to trendy
                        techniques
                      </li>
                      <li>
                        Practice consistently and seek feedback from experienced
                        designers
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Conclusion
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Nunc sed fermentum ut mauris, ullamcorper est dui mauris.
                      Tellus id suspendens elit aliquet tellus. Felis est et sed
                      leo risus, blandit elit sagittis. Quisque tristique
                      consequat quam vel. Nisl et semper et orci nulla porta
                      facilisis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar - Right Column (1/4 width) */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Table of Contents */}
              <div className="sticky top-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Introduction
                  </h3>
                  <nav className="space-y-3">
                    <Link
                      href="#tools"
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Tools and resources
                    </Link>
                    <Link
                      href="#advice"
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Advice for new designers
                    </Link>
                    <Link
                      href="#approach"
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      How you start
                    </Link>
                    <Link
                      href="#conclusion"
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      What's next?
                    </Link>
                  </nav>
                </div>

                {/* Author Info */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Written by
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold">H</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Hasbi Hassadiqin
                        </p>
                        <p className="text-sm text-gray-600">
                          Applied AI Engineer
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Olivia Rheyette
                        </p>
                        <p className="text-sm text-gray-600">
                          Product Designer
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Mia di Silva
                        </p>
                        <p className="text-sm text-gray-600">
                          Senior UX/UI Designer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gray-900 text-white rounded-2xl p-6 mt-6">
                  <h4 className="font-semibold mb-2">
                    Subscribe to our newsletter
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Get the latest updates and insights.
                  </p>

                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to level up your business?
          </h2>
          <p className="text-gray-300 mb-8">
            Start your 30-day free trial. Cancel anytime.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Get started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-bold">Hasbi</span>
              </div>
              <p className="text-gray-400 text-sm">
                Applied AI Engineer building intelligent solutions that make
                complex problems simple.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Overview</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get the app</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 Hasbi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
