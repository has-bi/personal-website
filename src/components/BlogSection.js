// src/components/BlogSection.js - Updated for SSR
import React from "react";
import BlogSectionClient from "./BlogSectionClient";

export default function BlogSection({ posts = [] }) {
  // Serialize posts for client component
  const serializedPosts = posts.map((post) => ({
    ...post,
    date: post.date ? new Date(post.date).toISOString() : "",
  }));

  return <BlogSectionClient posts={serializedPosts} />;
}
