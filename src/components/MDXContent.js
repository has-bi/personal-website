"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../mdx-components";

export default function MDXContent({ source }) {
  const components = useMDXComponents({});

  return (
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
      <MDXRemote source={source} components={components} />
    </div>
  );
}
