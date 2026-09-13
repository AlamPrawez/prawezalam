"use client";

import { useEffect } from "react";
import { addRecentBlogToStorage } from "@/services/blog";

export default function TrackBlogView({ blogData }: { blogData: any }) {
  useEffect(() => {
    if (blogData) {
      addRecentBlogToStorage(blogData);
    }
  }, [blogData]);

  // Renders nothing visually; only runs the client-side side-effect
  return null;
}