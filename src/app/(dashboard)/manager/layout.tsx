"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import SideMenu from "@/components/manager/SideMenu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function ManagerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Track sidebar collapse state to allow smooth width changes for the content area
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div>
            <Navbar />
           <div className="flex justify-center w-full min-h-screen bg-gray-50">
               <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                   <main className="pb-24 pt-24">
                       <div className="flex gap-5 items-start">
                           {/* Sidebar Container with dynamic transition */}
                           <div className={`shrink-0 transition-all duration-300`}>
                               <div className="mb-6 sticky top-6">
                                   <SideMenu onToggleCollapse={(collapsed) => setIsCollapsed(collapsed)} />
                               </div>
                           </div>
                           
                           {/* Main Content Area expands automatically */}
                           <div className="w-full min-w-0">
                               <Breadcrumb />
                               {children}
                           </div>
                       </div>
                   </main>
               </div>
           </div>
           <Footer />
        </div>
    );
}


// "use client"

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";

// import Breadcrumb from "@/components/Breadcrumb";
// import SideMenu from "@/components/manager/SideMenu";



// export default function ManagerLayout({
//     children
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
    
//     return (
//         <div>
//             <Navbar />
//             <div className="flex justify-center">
//                 <div className="w-full max-w-7xl px-1 sm:px-14">
//                     <main className="pb-24 px-8">
//                         <div className="my-5 pt-24">
//                             <div className="flex gap-5">
//                                 <div className="w-100">
//                                     <div className="mb-6">
//                                         <SideMenu />
//                                     </div>
                                   
//                                 </div>
//                                 <div className="w-full max-w-5xl">
//                                     <Breadcrumb />
//                                     {children}
//                                 </div>

//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }
