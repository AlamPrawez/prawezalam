"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Eye } from "lucide-react";

const STORAGE_KEY = 'recent_blogs';

export default function ResentBlogsSection() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const skeletonCount = 4;

    useEffect(() => {
        function loadBlogsFromStorage() {
            try {
                // Fetch saved recent blogs array from localStorage
                const storedRaw = localStorage.getItem(STORAGE_KEY);
                const recentBlogs = storedRaw ? JSON.parse(storedRaw) : [];

                // console.log(recentBlogs)
                if (Array.isArray(recentBlogs)) {
                    setBlogs(recentBlogs);
                }
            } catch (error) {
                console.error("Error reading blogs from localStorage:", error);
            } finally {
                setLoading(false);
            }
        }

        loadBlogsFromStorage();
    }, []);




    return (
        <div className="bg-slate-50 py-10">

            <div className="text-center mb-16 relative max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100 shadow-2xs">
                    Insights & Articles
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Recently Viewed & Published
                </h2>
                <p className="text-gray-500 mt-4 text-base sm:text-lg leading-relaxed">
                    Explore your recent reading history and dive into the latest technical write-ups, cloud architecture guides, and engineering tutorials.
                </p>
            </div>


            {loading ? (
                <div className="m-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                </div>
            ) : (
                <section id="blogs" className="m-20">
                    {blogs.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 text-slate-500">
                            <p className="text-lg font-semibold text-slate-700">No recently viewed articles.</p>
                            <p className="text-xs text-slate-500 mt-1">Explore articles to see your reading history here!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
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
                                        <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        {/* DESCRIPTION PREVIEW */}
                                        {blog.seo?.description && (
                                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                                {blog.seo.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* READ ARTICLE ACTION BUTTON */}
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition">
                                        <span>Read Article</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
