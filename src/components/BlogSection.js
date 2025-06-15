// components/BlogSection.js - Final Notion version
import React from "react";
import { getFeaturedBlogPosts } from "@/utils/notion";
import BlogSectionClient from "./BlogSectionClient";

export default async function BlogSection() {
  const allPosts = await getFeaturedBlogPosts(3);

  const serializedPosts = allPosts.map((post) => ({
    ...post,
    date: post.date ? new Date(post.date).toISOString() : "",
  }));

  return <BlogSectionClient posts={serializedPosts} />;
}
