import React from "react";

// experienceData.ts - Unchanged data contract
export interface Experience {
    role: string;
    company?: string;
    location?: string;
    duration?: string;
    responsibilities: string[];
}

export const experiences: Experience[] = [
    {
        role: "Self and Freelancer",
        company: "",
        location: "",
        duration: "2020 - continue",
        responsibilities: [
            "Managed complete project lifecycles independently as an autonomous engineer",
            "Excelled in full-stack architectural design, client relationship management, and scoping",
            "Delivered successful production platforms across diverse corporate and consumer domains",
            "Ensured timely, high-quality project delivery with absolute code maintainability",
            "Shipped client web applications and regional platforms: ansaritoolsandparts.com, Breakdownserviceqatar.com",
            "Designed and launched proprietary SaaS solutions: prawez.com (personal agency platform), school management systems",
            "Architecture & Design Stacks: TypeScript, PHP (Laravel), React.js, Vue.js, Bootstrap, jQuery, Tailwind CSS templates, Supabase",
            "The Gold Standard Stack: Engineered modern applications utilizing Next.js for high-fidelity frontends coupled with Python (FastAPI, Flask, Django) for rapid backend systems",
            "ImgoTool Core Engineering: Architected an end-to-end image processing utility featuring format conversion, asset size compression, and AI-driven background removal using the rembg library",
            "Technical SEO & Web Optimization: Managed full site performance optimizations to target a perfect 100/100 Lighthouse performance profile and tracked Ahrefs health scores",
            "Security & Server Management: Configured, audited, and maintained development and hosting servers utilizing Kali Linux environments, VPS management, and Redis caching layers"
        ]
    },
    {
        role: "Full Stack Engineer",
        company: "Garjoo Inc",
        location: "Canada",
        duration: "Jul 2022 – Present · 3 yrs 7 mos",
        responsibilities: [
            // Core Responsibilities
            "Comprehensive development of frontend and backend systems",
            "Created responsive, user-friendly interfaces",
            "Developed secure and scalable APIs",
            "Designed and optimized databases for performance",
            "Collaborated with teams for seamless integration",
            "Conducted testing and debugging",
            "Stayed updated with modern technologies",
            "Deployed and maintained applications effectively",

            // Production Deliverables & Domains
            "Production platforms shipped: garjoo.com, garjoo.ca, garjoonepal.com",
            "Enterprise and clinical systems deployed: dreamsette.com, thehealththread.com, tht.garjoo.com",

            // Core Technical Stack, Databases & Architectures
            "Backend & Frontend Stack: Node.js (Express), FastAPI, Next.js, Nuxt.js, NestJS, Laravel",
            "Database Systems: Complex schema design and optimization using PostgreSQL and MongoDB",
            "Advanced Multi-Protocol Gateway: Implemented high-performance networks via REST and gRPC service integrations",

            // DevOps, Cloud Infrastructure & Hosting
            "DevOps & Infrastructure: Automated CI/CD pipelines, Docker containerization, and AWS Cloud configurations",
            "Server Management: Linux VPS server management, Nginx configuration, performance monitoring, and environment optimization",

            // Advanced System Features & Integrations
            "Engineered end-to-end real-time chat architecture and live interactive video meeting integration",
            "Implemented AI integration, custom AI assistance logic, and advanced Google Maps spatial tracking APIs",
            "Geospatial Engineering: Handled advanced space-time analytics using specialized PostgreSQL extensions like PostGIS and MobilityDB"
        ],
    },
    {
        role: "Full Stack Engineer",
        company: "VOLGAI",
        location: "Kathmandu, Anamnagar , Nepal",
        duration: "March 2022 - November 2023",
        responsibilities: [
            "Specialize in API creation and integration for frontend.",
            "Skilled in team and independent development.",
            "Collaborated with teams for seamless integration",
            "Comprehensive development of frontend and backend systems",
            "Created responsive, user-friendly interfaces",
            "Build efficient and seamless solutions.",
            "Stayed updated with modern technologies",
            "Designed and optimized databases for performance",
            "nodejs(express) for microservices, Nextjs , laravel. etc",
            "Developed secure and scalable APIs",
            "Conducted testing and debugging",
            "Deployed and maintained applications effectively",
            "Delivered 10+ successful projects.",
            "wentworthcentral.com.au , exchange",
            "Nrna, postApp , Saffroncottages , Nepbhumi.",
            "msntraveltours.com, Ridingnepal.com, karnaliyoga.com",
        ],
    },
    {
        role: "Full Stack Engineer",
        company: "Flintt",
        location: "Australia Elsternwick",
        duration: "October 2022 - August 2023 (Remote)",
        responsibilities: [
            "Lead both frontend and backend development processes.",
            "Ensure smooth and efficient app performance.",
            "Optimize user experience across platforms.",
            "Implement and maintain scalable architecture.",
            "Drive development for the app.flintt.au application",
            "Collaborate with cross - functional teams for seamless integration.",
            "FrontEnd Architecture: React.js (Next.js), Vue.js (NuxtJS), HTML5, CSS3, Tailwind CSS",
            "BackEnd Infrastructure: Laravel (PHP), Express (Node.js), Inertia.js, Redis integration for in-memory caching",
            "GenAI Implementations: ChatGPT API integration for automated content generation pipelines, AI Integration features"
        ],
    },
    {
        role: "Senior Full Stack Engineer",
        company: "Pailatech",
        location: "Biratnagar, Morag Nepal",
        duration: "June 2019 - March 2020",
       responsibilities: [
            "Delivered high-quality projects exceeding expectations.",
            "Demonstrated a strong commitment to excellence.",
            "Maintained meticulous attention to detail.",
            "Consistently upheld superior project standards.",
            "Core Product Delivery: TvNet — connection management system.",
            "Core Engineering Stack: Laravel (PHP), Vue.js, React.js, CodeIgniter, JavaScript, MySQL, SQLite",
            "Advanced UI Components: Bootstrap, CSS3, Google Maps API integration for real-time node-to-node connection monitoring networks"
        ],
    },
    
];

const ExperienceCard: React.FC = () => {
    return (
        <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Modern Premium Header */}
                <div className="border-b border-gray-200 pb-8 mb-16 relative">
                    <div className="absolute top-0 left-0 h-1 w-16 bg-indigo-600 rounded-full -mt-4" />
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Work History & Contributions
                    </h2>
                    <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-3xl">
                        A clean, detailed ledger of web applications built, microservices scaled, and production platforms shipped globally.
                    </p>
                </div>

                {/* Vertical Stacked Cards */}
                <div className="space-y-10">
                    {experiences.map((exp, index) => {
                        // Separate standard text bullets from items containing tool lists or domain URLs
                        const toolsAndProjects = exp.responsibilities.filter(
                            item => item.includes('.com') || 
                                    item.includes('.ca') ||
                                    item.includes('.au') ||
                                    item.includes('exchange') ||
                                    item.includes('Stack:') || 
                                    item.includes('Database') || 
                                    item.includes('Gateway:') || 
                                    item.includes('DevOps') || 
                                    item.includes('Server') || 
                                    item.includes('Features:') || 
                                    item.includes('Geospatial') ||
                                    item.includes('Laravel') || 
                                    item.includes('nodejs') || 
                                    item.includes('FrontEnd') ||
                                    item.includes('BackEnd') ||
                                    item.includes('Architecture') ||
                                    item.includes('ImgoTool') ||
                                    item.includes('Technical SEO') ||
                                    item.includes('Security &') ||
                                    item.includes('Implementations:') ||
                                    item.includes('Deployments:') ||
                                    item.includes('Core Product') ||
                                    item.includes('Core Engineering') ||
                                    item.includes('Advanced UI') ||
                                    item.includes('GenAI')
                        );
                        
                        const standardResponsibilities = exp.responsibilities.filter(
                            item => !toolsAndProjects.includes(item)
                        );

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 relative group overflow-hidden"
                            >
                                {/* Left accent hover bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                {/* Card Header Area */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                            {exp.role}
                                        </h3>
                                        
                                        {exp.company ? (
                                            <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-indigo-600 mt-1">
                                                <span>{exp.company}</span>
                                                <span className="text-gray-300 font-normal">|</span>
                                                <span className="text-gray-500 font-medium">{exp.location}</span>
                                            </div>
                                        ) : (
                                            <div className="text-sm font-semibold text-indigo-600 mt-1">
                                                Independent Consulting & Development
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200/60 tracking-wide shadow-2xs">
                                            {exp.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Main Responsibilities Content Grid */}
                                <div className="space-y-4">
                                    <ul className="space-y-3.5 pl-0 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                                        {standardResponsibilities.map((item, i) => (
                                            <li key={i} className="flex items-start group/item">
                                                <div className="mt-1 mr-3.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors group-hover/item:bg-emerald-100">
                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="group-hover/item:text-gray-900 transition-colors duration-150">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Technologies & Projects Showcase Area */}
                                {toolsAndProjects.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-dashed border-gray-200 bg-gray-50/70 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 rounded-b-2xl">
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Technologies Stack & Deployed Ecosystems
                                            </h4>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {toolsAndProjects.map((item, i) => (
                                                <span 
                                                    key={i} 
                                                    className="inline-flex items-center text-xs font-medium bg-white text-gray-700 px-3 py-2 rounded-xl border border-gray-200 shadow-3xs font-mono transition-transform duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-900"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExperienceCard;

// import React from "react";

// // experienceData.ts - Unchanged data contract
// export interface Experience {
//     role: string;
//     company?: string;
//     location?: string;
//     duration?: string;
//     responsibilities: string[];
// }

// export const experiences: Experience[] = [
//     {
//         role: "Full Stack Engineer",
//         company: "Garjoo Inc",
//         location: "Canada",
//         duration: "Jul 2022 – Present · 3 yrs 7 mos",
//         responsibilities: [
//             "Comprehensive development of frontend and backend systems",
//             "Created responsive, user-friendly interfaces",
//             "Developed secure and scalable APIs",
//             "Designed and optimized databases for performance",
//             "Collaborated with teams for seamless integration",
//             "Conducted testing and debugging",
//             "Stayed updated with modern technologies",
//             "Deployed and maintained applications effectively",
//         ],
//     },
//     {
//         role: "Full Stack Engineer",
//         company: "VOLGAI",
//         location: "Kathmandu, Anamnagar , Nepal",
//         duration: "March 2022 - November 2023",
//         responsibilities: [
//             "Specialize in API creation and integration for frontend.",
//             "Skilled in team and independent development.",
//             "Collaborated with teams for seamless integration",
//             "Comprehensive development of frontend and backend systems",
//             "Created responsive, user-friendly interfaces",
//             "Build efficient and seamless solutions.",
//             "Stayed updated with modern technologies",
//             "Designed and optimized databases for performance",
//             "nodejs(express) for microservices, Nextjs , laravel. etc",
//             "Developed secure and scalable APIs",
//             "Conducted testing and debugging",
//             "Deployed and maintained applications effectively",
//             "Delivered 10+ successful projects.",
//             "wentworthcentral.com.au , exchange",
//             "Nrna, postApp , Saffroncottages , Nepbhumi.",
//             "msntraveltours.com, Ridingnepal.com, karnaliyoga.com",
//         ],
//     },
//     {
//         role: "Full Stack Engineer",
//         company: "Flintt",
//         location: "Australia Elsternwick",
//         duration: "October 2022 - August 2023 (Remote)",
//         responsibilities: [
//             "Lead both frontend and backend development processes.",
//             "Ensure smooth and efficient app performance.",
//             "Optimize user experience across platforms.",
//             "Implement and maintain scalable architecture.",
//             "Drive development for the app.flintt.au application",
//             "Collaborate with cross - functional teams for seamless integration.",
//             "FrontEnd: reactjs(next), vuejs(Nuxt).backEnd: laravel, express,inertia.GenAI: ChatJpt for generating content for Post."
//         ],
//     },
//     {
//         role: "Senior Full Stack Engineer",
//         company: "Pailatech",
//         location: "Biratnagar, Morag Nepal",
//         duration: "June 2019 - March 2020",
//         responsibilities: [
//             "Delivered high-quality projects exceeding expectations.",
//             "Demonstrated a strong commitment to excellence.",
//             "Maintained meticulous attention to detail.",
//             "Consistently upheld superior project standards.",
//             "TvNet — connection management system.",
//             "Laravel, vue.js , reactjs , codeigniter, etc. google maps integration for node to node connection monitoring."
//         ],
//     },
//     {
//         role: "Self and Freelancer",
//         company: "",
//         location: "",
//         duration: "2020 - continue",
//         responsibilities: [
//             "Managed projects independently as a freelancer.",
//             "Excelled in full project management roles.",
//             "Delivered successful projects across diverse domains.",
//             "Built strong client relationships through effective management.",
//             "Ensured timely and high - quality project delivery.",
//             "ansaritoolsandparts.com, Breakdownserviceqatar.com, school management system.",
//             "Laravel, react, vue, laravel template, bootstrap, jquery, etc",
//         ]
//     },
// ];

// const ExperienceCard: React.FC = () => {
//     return (
//         <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-5xl mx-auto">
//                 {/* Clean, Left-Aligned Minimal Header */}
//                 <div className="border-b border-gray-200 pb-6 mb-12">
//                     <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
//                         Professional Experience
//                     </h2>
//                     <p className="mt-2 text-sm sm:text-base text-gray-500">
//                         A clean record of frameworks deployed, platforms engineered, and global products launched.
//                     </p>
//                 </div>

//                 {/* Clean Stacked Cards */}
//                 <div className="space-y-8">
//                     {experiences.map((exp, index) => {
//                         // Separate standard text bullets from items containing tool lists or domain URLs
//                         const toolsAndProjects = exp.responsibilities.filter(
//                             item => item.includes('.com') || item.includes('FrontEnd:') || item.includes('Laravel,') || item.includes('nodejs') || item.includes('Nrna,')
//                         );
                        
//                         const standardResponsibilities = exp.responsibilities.filter(
//                             item => !toolsAndProjects.includes(item)
//                         );

//                         return (
//                             <div
//                                 key={index}
//                                 className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
//                             >
//                                 {/* Top Layout Header */}
//                                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-gray-100 pb-4 mb-4">
//                                     <div>
//                                         <h3 className="text-xl font-bold text-gray-900">
//                                             {exp.role}
//                                         </h3>
//                                         {exp.company ? (
//                                             <p className="text-sm font-medium text-indigo-600 mt-0.5">
//                                                 {exp.company} <span className="text-gray-300">|</span> <span className="text-gray-500 font-normal">{exp.location}</span>
//                                             </p>
//                                         ) : (
//                                             <p className="text-sm font-medium text-indigo-600 mt-0.5">
//                                                 Independent Operations
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="text-left sm:text-right">
//                                         <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
//                                             {exp.duration}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Main Tasks List */}
//                                 <ul className="space-y-2.5 pl-0 text-sm text-gray-600">
//                                     {standardResponsibilities.map((item, i) => (
//                                         <li key={i} className="flex items-start">
//                                             <svg className="h-4 w-4 text-emerald-500 mr-2.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                             </svg>
//                                             <span>{item}</span>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 {/* Modern Highlight Section for Stacks, Projects, or URLs (If they exist) */}
//                                 {toolsAndProjects.length > 0 && (
//                                     <div className="mt-5 pt-4 border-t border-dashed border-gray-200 bg-gray-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-xl">
//                                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
//                                             Technologies, Products & Frameworks Deployed
//                                         </h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {toolsAndProjects.map((item, i) => (
//                                                 <span 
//                                                     key={i} 
//                                                     className="inline-flex items-center text-xs font-medium bg-white text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs font-mono"
//                                                 >
//                                                     {item}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ExperienceCard;

// import React from "react";

// // experienceData.ts
// export interface Experience {
//     role: string;
//     company?: string;
//     location?: string;
//     duration?: string;
//     responsibilities: string[];
// }

// export const experiences: Experience[] = [
//     {
//         role: "Full Stack Engineer",
//         company: "Garjoo Inc",
//         location: "Canada",
//         duration: "Jul 2022 – Present · 3 yrs 7 mos",
//         responsibilities: [
//             "Comprehensive development of frontend and backend systems",
//             "Created responsive, user-friendly interfaces",
//             "Developed secure and scalable APIs",
//             "Designed and optimized databases for performance",
//             "Collaborated with teams for seamless integration",
//             "Conducted testing and debugging",
//             "Stayed updated with modern technologies",
//             "Deployed and maintained applications effectively",
//         ],
//     },
//     {
//         role: "Full Stack Engineer",
//         company: "VOLGAI",
//         location: "Kathmandu, Anamnagar , Nepal",
//         duration: "March 2022 - November 2023",
//         responsibilities: [
//             "Specialize in API creation and integration for frontend.",
//             "Skilled in team and independent development.",
//             "Collaborated with teams for seamless integration",
//             "Comprehensive development of frontend and backend systems",
//             "Created responsive, user-friendly interfaces",
//             "Build efficient and seamless solutions.",
//             "Stayed updated with modern technologies",
//             "Designed and optimized databases for performance",
//             "nodejs(express) for microservices, Nextjs , laravel. etc",
//             "Developed secure and scalable APIs",
//             "Conducted testing and debugging",
//             "Deployed and maintained applications effectively",
//             "Delivered 10+ successful projects.",
//             "wentworthcentral.com.au , exchange",
//             "Nrna, postApp , Saffroncottages , Nepbhumi.",
//             "msntraveltours.com, Ridingnepal.com, karnaliyoga.com",
//         ],
//     },
//     {
//         role: "Full Stack Engineer",
//         company: "Flintt",
//         location: "Australia Elsternwick",
//         duration: "October 2022 - August 2023 (Remote)",
//         responsibilities: [
//             "Lead both frontend and backend development processes.",
//             "Ensure smooth and efficient app performance.",
//             "Optimize user experience across platforms.",
//             "Implement and maintain scalable architecture.",
//             "Drive development for the app.flintt.au application",
//             "Collaborate with cross - functional teams for seamless integration.",
//             "FrontEnd: reactjs(next), vuejs(Nuxt).backEnd: laravel, express,inertia.GenAI: ChatJpt for generating content for Post."
//         ],
//     },
//     {
//         role: "Senior Full Stack Engineer",
//         company: "Pailatech",
//         location: "Biratnagar, Morag Nepal",
//         duration: "June 2019 - March 2020",
//         responsibilities: [
//             "Delivered high-quality projects exceeding expectations.",
//             "Demonstrated a strong commitment to excellence.",
//             "Maintained meticulous attention to detail.",
//             "Consistently upheld superior project standards.",
//             "TvNet — connection management system.",
//             "Laravel, vue.js , reactjs , codeigniter, etc. google maps integration for node to node connection monitoring."
//         ],
//     },
//     {
//         role: "Self and Freelancer",
//         company: "",
//         location: "",
//         duration: "2020 - continue",
//         responsibilities: [
//             "Managed projects independently as a freelancer.",
//             "Excelled in full project management roles.",
//             "Delivered successful projects across diverse domains.",
//             "Built strong client relationships through effective management.",
//             "Ensured timely and high - quality project delivery.",
//             "ansaritoolsandparts.com, Breakdownserviceqatar.com, school management system.",
//             "Laravel, react, vue, laravel template, bootstrap, jquery, etc",
//         ]
//     },
// ];

// const ExperienceCard: React.FC = () => {
//     return (
//         <div className="container mx-auto py-6">
//             <div className="flex justify-center">
//                 <div className="w-full max-w-6xl py-5">
//                     <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left mb-5">
//                         Experiences & Organizations I’ve Contributed To
//                     </h2>
                   

//                     <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 ">

//                         {experiences.map((exp, index) => (
//                             <div
//                                 key={index}
//                                 className="p-4 rounded-xl border border-gray-300 bg-white shadow-sm"
//                             >
//                                 <h2 className="text-xl font-semibold text-gray-900">
//                                     {exp.role}
//                                 </h2>

//                                 {exp.company && (<p className="mt-1 text-sm text-gray-600">
//                                     <span className="font-medium text-gray-800">
//                                         {exp.company}
//                                     </span>{" "}
//                                     · {exp.location}
//                                 </p>)}

//                                 <p className="mt-1 text-sm text-gray-500">
//                                     {exp.duration}
//                                 </p>

//                                 <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
//                                     {exp.responsibilities.map((item, i) => (
//                                         <li key={i}>{item}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}


//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ExperienceCard;