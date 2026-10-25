"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import SideMenu from "@/components/admin/SideMenu";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Track sidebar collapse state here so the parent layout can adjust width smoothly
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="w-full max-w-7xl px-1 sm:px-14">
                    <main className="pb-24 px-8">
                        <div className="my-5 pt-24">
                            <div className="flex gap-5 items-start">
                                {/* Sidebar Container with dynamic transition */}
                                <div className={`shrink-0 transition-all duration-300`}>
                                    <div className="mb-6 sticky top-28">
                                        <SideMenu onToggleCollapse={(collapsed) => setIsCollapsed(collapsed)} />
                                    </div>
                                </div>
                                
                                {/* Main Content Area expands automatically */}
                                <div className="w-full min-w-0">
                                    <Breadcrumb />
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
