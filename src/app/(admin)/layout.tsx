"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import SideMenu from "./@sideMenu/page";
import Breadcrumb from "@/components/Breadcrumb";


export default function ClientLayout({
    children,
    // SideMenu
}: Readonly<{
    children: React.ReactNode;
    // SideMenu: React.ReactNode;
}>) {
    
    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="w-full max-w-7xl px-1 sm:px-14">
                    <main className="pb-24 px-8">
                        <div className="my-5 pt-24">
                            <div className="flex gap-5">
                                <div className="w-100">
                                    <div className="mb-6">
                                        <SideMenu />
                                    </div>
                                   
                                </div>
                                <div className="w-full max-w-5xl">
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
