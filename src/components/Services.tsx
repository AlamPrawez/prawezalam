"use client";

import React from "react";
import OrderServiceButton from "./OrderServiceButton";

// Structuring dataset with precise, high-intent indexing terms for search engine bots
const services = [
    {
        title: "Mobile App Development",
        desc: "Build scalable, modern Android, iOS & cross-platform mobile apps tailored to your business goals. Engineered using high-performance runtime logic focused on responsive usability and long-term codebase maintainability.",
        link: null
    },
    {
        title: "Web Apps & Websites",
        desc: "Develop exceptionally fast, highly secure, and fully responsive full-stack web applications designed using a mobile-first philosophy to seamlessly manage concurrent user growth.",
        link: null
    },
    {
        title: "Tech & DevOps Consulting",
        desc: "Get expert system architect guidance on mapping your multi-protocol backend microservices, optimizing database schemas, selecting technical stacks, and outlining multi-region deployment infrastructures.",
        link: null
    },
    {
        title: "API & Third-Party Integration",
        desc: "Connect your ecosystem with modern payment gateways, cloud CRMs, external messaging tools, or enterprise data services through highly secure and modular REST or gRPC API pipelines.",
        link: null
    },
    {
        title: "Code Review & Optimization",
        desc: "Deeply analyze your existing codebase to systematically reduce structural technical debt while engineering fine-tuned performance optimizations to hit lightning-fast loading speeds.",
        link: null
    },
    {
        title: "SaaS Application Design",
        desc: "Design and ship high-availability SaaS platforms incorporating secure multi-tenant structures, custom access management tiers, and scalable cloud-ready backend workflows.",
        link: null
    },
    {
        title: "System Architecture (AWS)",
        desc: "Map secure cloud-native systems utilizing proven AWS infrastructure blueprints to guarantee absolute reliability, automatic failover routines, and high computational performance.",
        link: null
    },
    {
        title: "VPS Setup & Management",
        desc: "Configure, secure, and monitor production-ready Linux VPS environments using reverse proxy structures like Nginx, automated Docker multi-container setups, and live tracking diagnostics.",
        link: null
    },
    {
        title: "Complex Feature Development",
        desc: "Implement high-fidelity custom system features—including end-to-end live chat architectures, real-time node tracking, and interactive video streaming modules—requiring advanced programming logic.",
        link: null
    },
    {
        title: "Bug Detection & Fixing",
        desc: "Isolate and debug buried performance bottlenecks, async failures, or database deadlocks affecting overall service availability, resolving system bugs efficiently.",
        link: null
    },
    {
        title: "Figma / PDF to Frontend Conversion",
        desc: "Convert static UI designs into pixel-perfect, accessible, and ultra-performant Next.js, NuxtJS, or modern utility-first Tailwind CSS frontend interfaces.",
        link: null
    },
    {
        title: "Project Deployment",
        desc: "Execute complete continuous delivery (CI/CD) pipelines from local code commits to stable, live production web architectures with highly optimized runtime configurations.",
        link: null
    },
    {
        title: "React.js Development Services",
        desc: "Need a modern web application that is fast, responsive, and easy to scale? I build high-quality React.js applications for startups, businesses, and agencies looking for a reliable development partner.",
        link: "/services/react-js-development"
    }
];

export default function ServicesSection() {
    return (
        <section className="py-24 bg-gray-50/60 transition-colors duration-300 font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Modern Centered Premium Heading */}
                <div className="text-center mb-16 relative max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100 shadow-2xs">
                        Engineering Catalog
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Professional Services & Solutions
                    </h2>
                    <p className="text-gray-500 mt-4 text-base sm:text-lg leading-relaxed">
                        From system architecture design to live environment tracking, complete end-to-end technical support engineered to build, secure, and scale software.
                    </p>
                </div>

                {/* Premium Animated Grid Array */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 sm:p-8 rounded-2xl border border-gray-200/70 bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group relative overflow-hidden"
                        >
                            {/* Hidden Left Border Accent Bar Triggered on Hover */}
                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                            <div>
                                {/* Visual Structural Icon/Code Design Node */}
                                <div className="mb-4 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gray-50 text-indigo-600 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors duration-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>

                                {/* Core Semantic Technical SEO Heading Key */}
                                {/* <h3 className="text-lg font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                    {item.title}
                                </h3> */}

                                <h3 className="text-lg font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className="text-inherit font-inherit no-underline block relative z-20"
                                        >
                                            {item.title}
                                        </a>
                                    ) : (
                                        item.title
                                    )}
                                </h3>

                                <p className="text-gray-600 text-[14px] leading-relaxed mb-6 font-normal">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Button Section matches the original layout constraint */}
                            <div className="flex justify-end mt-auto pt-2 border-t border-gray-50 group-hover:border-gray-100 transition-colors duration-300">
                                <OrderServiceButton title={item.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



// "use client";

// import OrderServiceButton from "./OrderServiceButton";

// const services = [
//     {
//         title: "Mobile App Development",
//         desc: "Build scalable, modern Android & cross-platform apps tailored to your business needs. Focused on performance, usability, and long-term maintainability."
//     },
//     {
//         title: "Web Apps & Websites",
//         desc: "Develop fast, secure, and responsive web applications or business websites designed to handle real users and real growth."
//     },
//     {
//         title: "Tech & DevOps Consulting",
//         desc: "Get expert guidance on choosing the right tech stack, system architecture, and deployment strategy to scale efficiently."
//     },
//     {
//         title: "API & Third-Party Integration",
//         desc: "Connect your platform with payment gateways, CRMs, external tools, or services through secure and seamless API integrations."
//     },
//     {
//         title: "Code Review & Optimization",
//         desc: "Analyze your existing codebase to improve speed, structure, scalability, and reduce future technical debt."
//     },
//     {
//         title: "SaaS Application Design",
//         desc: "Design and build scalable SaaS platforms with proper multi-user architecture and growth-ready infrastructure."
//     },
//     {
//         title: "System Architecture (AWS)",
//         desc: "Plan and design cloud-based systems using AWS tools to ensure high availability, performance, and reliability."
//     },
//     {
//         title: "VPS Setup & Management",
//         desc: "Configure and secure VPS servers with production-ready setup including Nginx, Docker, and monitoring tools."
//     },
//     {
//         title: "Complex Feature Development",
//         desc: "Implement challenging custom features that require deep technical understanding and scalable logic."
//     },
//     {
//         title: "Bug Detection & Fixing",
//         desc: "Identify hidden issues affecting performance or functionality and resolve them efficiently."
//     },
//     {
//         title: "Figma / PDF to Frontend Conversion",
//         desc: "Convert Figma, PDF, or design files into pixel-perfect Next.js, Nuxt.js, or modern responsive frontend interfaces."
//     },
//     {
//         title: "Project Deployment",
//         desc: "Handle complete deployment from development to live production with optimized setup and stability."
//     }
// ]

// export default function ServicesSection() {
//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-6xl mx-auto px-4">

//                 <div className="text-center mb-14">
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//                         Services I Offer
//                     </h2>
//                     <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
//                         From development to deployment — complete technical support to build, scale, and optimize your digital products.
//                     </p>
//                 </div>

//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {services.map((item, index) => (
//                         <div
//                             key={index}
//                             className="p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xl transition duration-300 flex flex-col justify-between"
//                         >
//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                                     {item.title}
//                                 </h3>

//                                 <p className="text-gray-500 text-sm leading-relaxed mb-5">
//                                     {item.desc}
//                                 </p>
//                             </div>

//                             <div className="flex justify-end mt-4">
//                                 <OrderServiceButton title={item.title} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }