"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {    
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
