// components/MDXProvider.js
"use client";

import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./MDXComponents";

export default function CustomMDXProvider({ children }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
