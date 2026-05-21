"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const features = [
    {
        title: "Custom Offers That Fit Your Budget",
        description:
            "Get optimized, milestone-based pricing structures tailored perfectly to your specific project scope. You pay strictly for the value and features you need, eliminating unnecessary overhead while maximizing your return on investment.",
    },
    {
        title: "Fast & Reliable Delivery",
        description:
            "Time-to-market is critical. Your project is backed by realistic timelines, proactive progress tracking, and seamless communication, ensuring predictable, on-time deployment without compromising quality.",
    },
    {
        title: "Production-Ready Code Quality",
        description:
            "Built using industry-standard engineering practices. Every module is crafted to be exceptionally clean, heavily optimized, and fully typed, giving you a robust foundation ready to handle real-world user traffic from day one.",
    },
    {
        title: "Well-Structured & Scalable Project Architecture",
        description:
            "Avoid technical debt with a modular, future-proof directory setup. By isolating reusable logic and component states, your application remains highly maintainable and ready to scale smoothly as your business grows.",
    },
    {
        title: "Secure & Trusted Solutions",
        description:
            "Data protection is treated as a core feature, not an afterthought. Advanced authentication, rigorous authorization controls, and secure API handling protocols are integrated natively to safeguard your platform and user data.",
    },
    {
        title: "Clean UI & User-Friendly Experience",
        description:
            "Convert and retain users with an immersive, intuitive interface. Every view is built with pixel-perfect responsive layouts, fluid micro-interactions, and accessible design principles that elevate your brand's digital presence.",
    },
    {
        title: "Easy Maintenance & Future Updates",
        description:
            "Handover assets are structured for friction-free long-term ownership. Clear documentation and self-documenting code patterns ensure that adding new features, running updates, or onboarding internal teams remains effortless.",
    },
    {
        title: "Clear Communication & Ongoing Support",
        description:
            "Experience a transparent collaborative partnership. You receive structured daily or weekly updates throughout development, followed by dedicated post-launch support to guarantee stable operations.",
    },
];

export default function Features() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-gray-200/70 shadow-premium p-6 sm:p-10 transition-all duration-300">
            {/* Component Section Header */}
            <div className="mb-8 border-b border-gray-100 pb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3 border border-indigo-100/60 shadow-3xs font-mono">
                    Value Proposition
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                    Project Guarantees &amp; Operational Frameworks
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1.5 leading-relaxed">
                    Explore the fundamental values, code standards, and delivery pillars baked directly into your builds.
                </p>
            </div>

            {/* Features Accordion Container Layout - Stretched to Full Width Single Column */}
            <div className="w-full flex flex-col gap-4">
                {features.map((item, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className={`w-full rounded-xl border transition-all duration-300 ease-in-out ${
                                isOpen
                                    ? "border-indigo-500 bg-gradient-to-b from-white to-indigo-50/10 shadow-md ring-4 ring-indigo-100/50"
                                    : "border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-sm"
                            }`}
                        >
                            {/* Title Trigger Panel */}
                            <button
                                type="button"
                                onClick={() => toggleItem(index)}
                                className="flex w-full items-center justify-between p-5 text-left group cursor-pointer focus:outline-none"
                            >
                                <div className="flex items-center gap-3.5 pr-4">
                                    {/* Number Badge Index indicator */}
                                    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md transition-colors duration-200 ${
                                        isOpen 
                                            ? "bg-indigo-600 text-white" 
                                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                    }`}>
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>
                                    <h3 className={`text-sm sm:text-base font-bold tracking-tight transition-colors duration-200 ${
                                        isOpen ? "text-indigo-950" : "text-gray-800 group-hover:text-gray-900"
                                    }`}>
                                        {item.title}
                                    </h3>
                                </div>

                                <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                                    isOpen ? "bg-indigo-100 text-indigo-600" : "bg-gray-50 text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-100"
                                }`}>
                                    <ChevronDown
                                        size={16}
                                        className={`transform transition-transform stroke-[2.5] duration-200 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </div>
                            </button>

                            {/* Description Panel Layer */}
                            <div className={`grid transition-all duration-200 ease-in-out ${
                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                            }`}>
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-5 pl-[47px]">
                                        <p className="text-xs sm:text-sm text-gray-500/90 leading-relaxed font-normal border-t border-gray-100/70 pt-3">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// const features = [
//     {
//         title: "Custom Offers That Fit Your Budget",
//         description:
//             "I create flexible pricing plans based on your project scope, ensuring you get the best value without unnecessary costs.",
//     },
//     {
//         title: "Fast & Reliable Delivery",
//         description:
//             "Deadlines matter. I deliver projects on time with clear communication and consistent progress updates.",
//     },
//     {
//         title: "Production-Ready Code Quality",
//         description:
//             "Every project follows industry best practices with clean, scalable, and maintainable code ready for real-world deployment.",
//     },
//     {
//         title: "Well-Structured & Scalable Project Architecture",
//         description:
//             "I organize projects using a clean folder structure, modular components, and reusable logic to support future growth and easy maintenance.",
//     },
//     {
//         title: "Secure & Trusted Solutions",
//         description:
//             "Security is a priority. I implement authentication, authorization, and best security practices to protect your data and users.",
//     },
//     {
//         title: "Clean UI & User-Friendly Experience",
//         description:
//             "I focus on intuitive design and smooth user experience so your product looks professional and feels easy to use.",
//     },
//     {
//         title: "Easy Maintenance & Future Updates",
//         description:
//             "My codebase is easy to understand and extend, making future updates, feature additions, and maintenance hassle-free.",
//     },
//     {
//         title: "Clear Communication & Ongoing Support",
//         description:
//             "You’ll receive regular updates, clear explanations, and reliable support even after the project is completed.",
//     },
// ];



// export default function Features() {

//     const [activeIndex, setActiveIndex] = useState(0);

//     const toggleItem = (index: any) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };
//     return (
//         <>

//             <div className="w-full space-y-4">
//                 {features.map((item, index) => {
//                     const isOpen = activeIndex === index;

//                     return (
//                         <div
//                             key={index}
//                             className="mx-4 sm:mx-0 rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
//                         >
//                             {/* Title */}
//                             <button
//                                 onClick={() => toggleItem(index)}
//                                 className="flex w-full items-center justify-between p-6 text-left"
//                             >
//                                 <h3 className="text-lg font-semibold text-gray-900">
//                                     {item.title}
//                                 </h3>

//                                 <ChevronDown
//                                     size={18}
//                                     className={`transform transition-transform duration-200 ${isOpen
//                                         ? "rotate-180 text-gray-900"
//                                         : "text-gray-400"
//                                         }`}
//                                 />
//                             </button>

//                             {/* Description */}
//                             {isOpen && (
//                                 <div className="px-6 pb-6">
//                                     <p className="text-sm text-gray-600 leading-relaxed">
//                                         {item.description}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </>

//     );
// }






// <div className="w-xl space-y-4">
//     {features.map((item, index) => (
//         <div
//             key={index}
//             className="rounded-xl border border-gray-200 bg-white p-6 transition duration-200 hover:shadow-md"
//         >
//             <h3 className="mb-2 text-lg font-semibold text-gray-900">
//                 {item.title}
//             </h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//                 {item.description}
//             </p>
//         </div>
//     ))}
// </div>