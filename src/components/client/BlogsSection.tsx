"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { cmsBlog } from '@/services/api/endpoints';
import { ArrowRight, Calendar, Eye } from "lucide-react";
import { syncRecentBlogsToStorage } from "@/services/blog";


export default function BlogsSection() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadBlogs() {
            try {
                setLoading(true);
                // Fetch published CMS blogs from Supabase repository
                const data = await cmsBlog.fetchBlogsList()
                syncRecentBlogsToStorage(data)
                if (data && data.length > 0) {
                    setBlogs(data);
                } else {
                    setBlogs([]);
                }
            } catch (err) {
                console.error("Failed to load blogs from database:", err);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        }

        loadBlogs();
    }, []);

    if (loading) {
        const skeletonCount = 6;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: skeletonCount }).map((_, idx) => (
                    <div
                        key={`skeleton-${idx}`}
                        className="flex flex-col justify-between bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm animate-pulse overflow-hidden"
                    >
                        <div className="space-y-4">
                            {/* Skeleton OG Image Placeholder */}
                            <div className="-mx-6 -mt-6 mb-4 h-48 bg-slate-200 border-b border-slate-100" />

                            {/* Skeleton Metadata Bar */}
                            <div className="flex items-center justify-between text-xs">
                                <div className="h-4 w-24 bg-slate-200 rounded-md" />
                                <div className="h-4 w-16 bg-slate-200 rounded-md" />
                            </div>

                            {/* Skeleton Title Lines */}
                            <div className="space-y-2 pt-1">
                                <div className="h-5 bg-slate-200 rounded-md w-11/12" />
                                <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                            </div>

                            {/* Skeleton Description Lines */}
                            <div className="space-y-2 pt-2">
                                <div className="h-3 bg-slate-100 rounded-md w-full" />
                                <div className="h-3 bg-slate-100 rounded-md w-full" />
                                <div className="h-3 bg-slate-100 rounded-md w-4/5" />
                            </div>
                        </div>

                        {/* Skeleton Read Action Button */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="h-4 w-28 bg-slate-200 rounded-md" />
                            <div className="h-4 w-4 bg-slate-200 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <section id="blogs" className="mb-20">
            {blogs.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 text-slate-500">
                    <p className="text-lg font-semibold text-slate-700">No articles published yet.</p>
                    <p className="text-xs text-slate-500 mt-1">Check back soon for new technical write-ups and tutorials!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blogs/${blog.slug}`}
                            className="group flex flex-col justify-between bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition duration-300 overflow-hidden"
                        >
                            <div className="space-y-4">
                                {/* OPTIONAL OG IMAGE COVER */}
                                {blog.seo?.ogImage && (
                                    <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl border-b border-slate-100 bg-slate-50">
                                        <img
                                            src={blog.seo.ogImage}
                                            alt={blog.seo?.ogImageAlt || blog.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* METADATA BAR */}
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                                        <span>{new Date(blog.updated_at || blog.created_at).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex items-center gap-1 text-cyan-600 font-medium">
                                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{(blog.views_count || 10).toLocaleString()} views</span>
                                    </div>
                                </div>

                                {/* TITLE */}
                                <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                    {blog.title}
                                </h2>

                                {/* DESCRIPTION PREVIEW FROM SEO IF AVAILABLE */}
                                {blog.seo?.description && (
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                        {blog.seo.description}
                                    </p>
                                )}
                            </div>

                            {/* READ ARTICLE ACTION BUTTON */}
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition">
                                <span>Read Full Article</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>

    );
}