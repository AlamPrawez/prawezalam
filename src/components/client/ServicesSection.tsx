"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cmsService } from "@/services/api/endpoints";
import OrderServiceButton from "../OrderServiceButton";

export interface ServiceItem {
    id: string;
    title: string;
    desc: string;
    link: string | null;
}

export default function ServicesSectionNew() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadServices() {
            try {
                setLoading(true);
                // Fetch published CMS services from Supabase repository
                const data = await cmsService.fetchServicesList();
                if (data && data.length > 0) {
                    const cmsItems: ServiceItem[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.cms_service_details?.hero?.badge || item.title,
                        desc:
                            item.description ||
                            item.meta_description ||
                            "Explore our specialized engineering solutions and technical consulting services built for performance and scalability.",
                        link: item.slug ? `/services/${item.slug}` : null,
                    }));

                    setServices(cmsItems);
                } else {
                    setServices([]);
                }
            } catch (err) {
                console.error("Failed to load services from database:", err);
                setServices([]);
            } finally {
                setLoading(false);
            }
        }

        loadServices();
    }, []);

    return (
        <section className="py-24 bg-gray-50/60 transition-colors duration-300 font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Modern Centered Premium Heading */}
                <div className="text-center mb-16 relative max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100 shadow-2xs">
                        Capabilities & Core Stack
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Custom Software & Cloud Engineering
                    </h2>
                    <p className="text-gray-500 mt-4 text-base sm:text-lg leading-relaxed">
                        From scalable web applications to high-availability cloud architecture—end-to-end technical solutions engineered for security, speed, and long-term growth.
                    </p>
                </div>

                {/* Premium Animated Grid Array */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        // Skeleton Loading States
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="p-6 sm:p-8 rounded-2xl border border-gray-200/70 bg-white shadow-2xs animate-pulse flex flex-col justify-between"
                            >
                                <div>
                                    <div className="h-10 w-10 bg-gray-100 rounded-xl mb-4" />
                                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                                    <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                                    <div className="h-3 w-5/6 bg-gray-100 rounded mb-2" />
                                    <div className="h-3 w-4/6 bg-gray-100 rounded" />
                                </div>
                                <div className="pt-4 mt-6 border-t border-gray-50 flex justify-end">
                                    <div className="h-8 w-24 bg-gray-100 rounded-lg" />
                                </div>
                            </div>
                        ))
                    ) : services.length > 0 ? (
                        // Dynamic Database Services
                        services.map((item) => (
                            <div
                                key={item.id}
                                className="p-6 sm:p-8 min-h-[21rem] rounded-2xl border border-gray-200/70 bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* Hidden Left Border Accent Bar Triggered on Hover */}
                                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                <div>
                                    {/* Visual Icon Node */}
                                    <div className="mb-4 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gray-50 text-indigo-600 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors duration-300">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                            />
                                        </svg>
                                    </div>

                                    {/* Core Semantic Technical Heading */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                        {item.link ? (
                                            <Link
                                                href={item.link}
                                                className="text-inherit font-inherit no-underline block relative z-20 hover:underline decoration-indigo-500/30 underline-offset-4"
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            item.title
                                        )}
                                    </h3>

                                    <p className="text-gray-600 text-[14px] leading-relaxed mb-6 font-normal">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Button Section */}
                                <div className="flex justify-end mt-auto pt-2 border-t border-gray-50 group-hover:border-gray-100 transition-colors duration-300">
                                    <OrderServiceButton title={item.title} />
                                </div>
                            </div>
                        ))
                    ) : (
                        // Fallback Empty State if DB is empty
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No published services found. Add and publish services in your CMS dashboard to display them here.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}