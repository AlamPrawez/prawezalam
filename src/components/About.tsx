"use client";

import React from "react";
import { Code2, Server, Cpu, Layers } from "lucide-react";

const About: React.FC = () => {
    // Categorized Skill Matrix for Visual Structure
    const skillCategories = [
        {
            label: "Core Frameworks & Languages",
            items: ["Next.js", "FastAPI", "React.js", "Vue.js", "Nuxt.js", "Node.js", "NestJS", "Laravel", "Python"]
        },
        {
            label: "AI, Integrations & Real-Time",
            items: ["LangChain", "OpenAI API", "Gemini API", "Structured JSON", "Socket.io", "gRPC Services"]
        },
        {
            label: "Databases & Specialized Engines",
            items: ["PostgreSQL", "PostGIS", "MobilityDB", "Database Modeling"]
        },
        {
            label: "Architecture, DevOps & Performance",
            items: ["System Design", "Application Design", "API Development", "AWS DevOps", "CI/CD Pipelines", "Performance Optimization", "Technical SEO", "Lighthouse Optimization", "Kali Linux"]
        }
    ];

    return (
        <section className="container mx-auto px-4 py-8 bg-white rounded-2xl border border-gray-200/70 shadow-premium p-6 sm:p-10 transition-all duration-300">
            {/* SEO Semantics & Premium Section Header */}
            <header className="mb-8 border-b border-gray-100 pb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3 border border-indigo-100/60 shadow-3xs font-mono">
                    Professional Profile
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    About Me
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1.5 leading-relaxed">
                    A holistic look into my technical philosophy, core stack specializations, and execution frameworks.
                </p>
            </header>

            <div className="space-y-8">
                {/* Core Executive Summary */}
                <article className="prose prose-slate max-w-none">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        I am a dedicated <span className="font-bold text-gray-900">Full Stack Software Engineer</span> with a proven track record of designing, developing, and delivering high-performance web applications across multiple industries. My work centers on architecting <span className="font-bold text-gray-900">scalable, reliable, and maintainable solutions</span> that align perfectly with business objectives while serving an exceptional end-user experience.
                    </p>
                </article>

                {/* Core Pillar Layout - Formatted to Full Width Column Blocks */}
                <div className="w-full flex flex-col gap-5">
                    {/* Front-End Focus Box */}
                    <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                            <Code2 size={20} className="stroke-[2.5]" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
                                Front-End Engineering
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Specializing in building modern, fluid, and fully responsive interfaces using <span className="font-semibold text-gray-800">React.js, Vue.js, Nuxt.js, and Next.js</span>. I prioritize user-focused interactions, web accessibility, and lightning-fast client-side performance.
                            </p>
                        </div>
                    </div>

                    {/* Back-End Focus Box */}
                    <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                            <Server size={20} className="stroke-[2.5]" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
                                Back-End Ecosystems
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Proficient in creating secure architectures using <span className="font-semibold text-gray-800">FastAPI, Node.js, Express.js, NestJS, Laravel, and Python</span>. Capable of building robust server logic, structural relational database modeling, and optimized queries.
                            </p>
                        </div>
                    </div>

                    {/* System Architecture Focus Box */}
                    <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                            <Cpu size={20} className="stroke-[2.5]" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
                                Architecture &amp; APIs
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Expert focus on high-level system layout design, clean modular components, and decoupled microservices. Experienced in deploying stable, clean <span className="font-semibold text-gray-800">RESTful APIs</span> and multi-protocol gateways with <span className="font-semibold text-gray-800">gRPC services</span> engineered for longevity.
                            </p>
                        </div>
                    </div>

                    {/* DevOps & Delivery Focus Box */}
                    <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                            <Layers size={20} className="stroke-[2.5]" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
                                DevOps &amp; Cloud Infrastructure
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Automated application lifecycle management using <span className="font-semibold text-gray-800">AWS DevOps</span> toolkits. Experienced with configuring CI/CD delivery pipelines, cloud system scaling, and active system monitoring under high concurrent volume.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Methodological Information */}
                <div className="space-y-4 border-t border-gray-100 pt-6">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        I take a <span className="font-bold text-gray-900">feedback-driven and user-centric approach</span> to programming, aligning development targets directly with project stakeholders and cross-functional teams. My deep problem-solving focus ensures complex codebases stay well-debugged, thoroughly optimized, and robust.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Beyond core tech skills, I thrive in remote, agile workflows, keeping project communication crystal clear. I consistently study emerging software patterns, modern operational frameworks, and optimization methodologies to deliver technical results that exceed expectation.
                    </p>
                </div>

                {/* Categorized Skills Section Wrapper */}
                <div className="border-t border-gray-100 pt-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-extrabold text-gray-900 tracking-tight mb-4">
                            Complete Technical Competencies
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        {skillCategories.map((category, catIdx) => (
                            <div key={catIdx} className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600/80 font-mono">
                                    {category.label}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/60 text-gray-700 text-xs sm:text-sm font-medium transition-all duration-150 hover:border-indigo-200 hover:bg-indigo-50/30 hover:text-indigo-950 select-none font-sans"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;



























// "use client";

// import React from "react";
// import { Code2, Server, Cpu, Layers } from "lucide-react";

// const About: React.FC = () => {
//     const skills = [
//         "React.js", "Vue.js", "Nuxt.js", "Next.js",
//         "Node.js", "NestJS", "Laravel", "Python",
//         "AWS DevOps", "System Design", "Application Design", 
//         "API Development", "Performance Optimization"
//     ];

//     return (
//         <section className="container mx-auto px-4 py-8 bg-white rounded-2xl border border-gray-200/70 shadow-premium p-6 sm:p-10 transition-all duration-300">
//             {/* SEO Semantics & Premium Section Header */}
//             <header className="mb-8 border-b border-gray-100 pb-6">
//                 <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3 border border-indigo-100/60 shadow-3xs font-mono">
//                     Professional Profile
//                 </span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
//                     About Me
//                 </h2>
//                 <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1.5 leading-relaxed">
//                     A holistic look into my technical philosophy, core stack specializations, and execution frameworks.
//                 </p>
//             </header>

//             <div className="space-y-8">
//                 {/* Core Executive Summary */}
//                 <article className="prose prose-slate max-w-none">
//                     <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                         I am a dedicated <span className="font-bold text-gray-900">Full Stack Software Engineer</span> with a proven track record of designing, developing, and delivering high-performance web applications across multiple industries. My work centers on architecting <span className="font-bold text-gray-900">scalable, reliable, and maintainable solutions</span> that align perfectly with business objectives while serving an exceptional end-user experience.
//                     </p>
//                 </article>

//                 {/* Core Pillar Layout - Formatted to Full Width Column Blocks */}
//                 <div className="w-full flex flex-col gap-5">
//                     {/* Front-End Focus Box */}
//                     <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
//                             <Code2 size={20} className="stroke-[2.5]" />
//                         </div>
//                         <div className="space-y-1.5">
//                             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
//                                 Front-End Engineering
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//                                 Specializing in building modern, fluid, and fully responsive interfaces using <span className="font-semibold text-gray-800">React.js, Vue.js, Nuxt.js, and Next.js</span>. I prioritize user-focused interactions, web accessibility, and lightning-fast client-side performance.
//                             </p>
//                         </div>
//                     </div>

//                     {/* Back-End Focus Box */}
//                     <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
//                             <Server size={20} className="stroke-[2.5]" />
//                         </div>
//                         <div className="space-y-1.5">
//                             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
//                                 Back-End Ecosystems
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//                                 Proficient in creating secure architectures using <span className="font-semibold text-gray-800">Node.js, Express.js, NestJS, Laravel, and Python</span>. Capable of building robust server logic, structural relational database modeling, and optimized queries.
//                             </p>
//                         </div>
//                     </div>

//                     {/* System Architecture Focus Box */}
//                     <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
//                             <Cpu size={20} className="stroke-[2.5]" />
//                         </div>
//                         <div className="space-y-1.5">
//                             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
//                                 Architecture &amp; APIs
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//                                 Expert focus on high-level system layout design, clean modular components, and decoupled microservices. Experienced in deploying stable, clean <span className="font-semibold text-gray-800">RESTful APIs</span> engineered for longevity and effortless third-party integration.
//                             </p>
//                         </div>
//                     </div>

//                     {/* DevOps & Delivery Focus Box */}
//                     <div className="w-full p-5 rounded-xl border border-gray-100 bg-gray-50/30 flex gap-4 items-start transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm">
//                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
//                             <Layers size={20} className="stroke-[2.5]" />
//                         </div>
//                         <div className="space-y-1.5">
//                             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
//                                 DevOps &amp; Cloud Infrastructure
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//                                 Automated application lifecycle management using <span className="font-semibold text-gray-800">AWS DevOps</span> toolkits. Experienced with configuring CI/CD delivery pipelines, cloud system scaling, and active system monitoring under high concurrent volume.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Additional Methodological Information */}
//                 <div className="space-y-4 border-t border-gray-100 pt-6">
//                     <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                         I take a <span className="font-bold text-gray-900">feedback-driven and user-centric approach</span> to programming, aligning development targets directly with project stakeholders and cross-functional teams. My deep problem-solving focus ensures complex codebases stay well-debugged, thoroughly optimized, and robust.
//                     </p>
//                     <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                         Beyond core tech skills, I thrive in remote, agile workflows, keeping project communication crystal clear. I consistently study emerging software patterns, modern operational frameworks, and optimization methodologies to deliver technical results that exceed expectation.
//                     </p>
//                 </div>

//                 {/* Skills Section Wrapper */}
//                 <div className="border-t border-gray-100 pt-6">
//                     <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-3.5">
//                         Core Technical Stack
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                         {skills.map((skill, i) => (
//                             <span
//                                 key={i}
//                                 className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/60 text-gray-700 text-xs sm:text-sm font-medium transition-all duration-150 hover:border-indigo-200 hover:bg-indigo-50/30 hover:text-indigo-950 select-none font-sans"
//                             >
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default About;
// "use client"; // Required for client-side effects in Next.js;
// import React from "react";

// const About: React.FC = () => {
//     const skills = [
//         "React.js", "Vue.js", "Nuxt.js", "Next.js",
//         "Node.js", "NestJS", "Laravel", "Python",
//         "AWS DevOps", "System Design", "Application Design", "API Development", "Performance Optimization"
//     ]
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-center">
//                 <div className="w-full max-w-6xl rounded-xl border border-gray-300 p-6 bg-white shadow-md">

//                     {/* About Section */}
//                     <div className="space-y-6">

//                         <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
//                             About Me
//                         </h2>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             I am an <span className="font-bold text-gray-800">Experienced full-stack developer</span> with a strong track record of designing, developing, and delivering high-quality web applications across multiple industries. My work focuses on creating <span className="font-bold text-gray-800">scalable, reliable, and maintainable solutions</span> that meet business objectives and provide an exceptional user experience.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             On the <span className="font-bold text-gray-800">Front-end</span>, I specialize in building modern, responsive, and user-friendly interfaces using <span className="font-medium text-gray-800">React.js, Vue.js, Nuxt.js, and Next.js</span>. I prioritize creating intuitive designs and smooth interactions that enhance usability and accessibility.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             On the <span className="font-bold text-gray-800">Back-end</span>, I am proficient in <span className="font-bold text-gray-800">Node.js, Express.js, NestJS, Laravel (PHP), and Python</span>, enabling me to develop complete end-to-end solutions, from database modeling and API design to server-side logic and performance optimization.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             I have expertise in <span className="font-bold text-gray-800">System and application design</span>, focusing on scalable architectures, clean code practices, and modular development. My experience includes building <span className="font-bold text-gray-800">RESTful APIs, microservices, and cloud-based applications</span>, ensuring reliability, maintainability, and security.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             I am also skilled in <span className="font-bold text-gray-800">AWS and DevOps tools</span>, enabling deployment automation, CI/CD pipelines, cloud infrastructure management, and monitoring to ensure applications perform efficiently under heavy traffic and scale seamlessly.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             I take a <span className="font-bold text-gray-800">User-focused and feedback-driven approach</span> to development, collaborating closely with clients, designers, and teams to deliver features that are both practical and impactful. My strong problem-solving skills help me debug complex issues, optimize performance, and enhance system reliability.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             Beyond technical skills, I am an <span className="font-bold text-gray-800">Effective communicator and collaborative team player</span>, experienced in agile workflows, remote coordination, and independent project ownership. I continuously learn and adopt modern frameworks, best practices, and emerging technologies to stay ahead in a fast-evolving tech landscape.
//                         </p>

//                         <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                             Overall, my goal is to deliver <span className="font-bold text-gray-800">Business-driven, scalable, and high-quality solutions</span> that consistently exceed client expectations while balancing technical excellence with usability and performance.
//                         </p>

//                         {/* Skills Badges */}
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {skills.map((skill, i) => (
//                                 <span
//                                     key={i}
//                                     className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-medium"
//                                 >
//                                     {skill}
//                                 </span>
//                             ))}
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//         // <div className="container mx-auto px-4 py-6">
//         //     <div className="flex justify-center">
//         //         <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
//         //             <div className="space-y-4">

//         //                 <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
//         //                     About
//         //                 </h2>

//         //                 <div className="space-y-3 text-sm leading-relaxed text-gray-600">
//         //                     <p>
//         //                         Experienced Software Developer with a strong track record of delivering
//         //                         high-quality, scalable web applications across diverse industries.
//         //                     </p>

//         //                     <p>
//         //                         Specialized in building modern, responsive front-end solutions using
//         //                         <span className="font-medium text-gray-800">
//         //                             {" "}React.js, Vue.js, Nuxt.js, and Next.js
//         //                         </span>.
//         //                     </p>

//         //                     <p>
//         //                         Proficient in backend development with
//         //                         <span className="font-medium text-gray-800">
//         //                             {" "}Node.js, Express.js, NestJS, and Laravel (PHP)
//         //                         </span>,
//         //                         enabling end-to-end application development.
//         //                     </p>

//         //                     <p>
//         //                         Highly skilled in full-stack architecture, RESTful API design, and writing
//         //                         clean, reusable, and maintainable code.
//         //                     </p>

//         //                     <p>
//         //                         Strong problem-solving ability with proven experience in debugging,
//         //                         performance optimization, and system reliability improvements.
//         //                     </p>

//         //                     <p>
//         //                         User-focused developer who values feedback-driven feature development to
//         //                         create practical and impactful solutions.
//         //                     </p>

//         //                     <p>
//         //                         Effective communicator and collaborative team player, experienced in agile,
//         //                         remote, and independent working environments.
//         //                     </p>

//         //                     <p>
//         //                         Continuously learning and adopting modern technologies, frameworks, and best
//         //                         practices to stay ahead in a fast-evolving tech landscape.
//         //                     </p>

//         //                     <p>
//         //                         Committed to delivering on-time, scalable, and business-driven solutions
//         //                         that consistently exceed client expectations.
//         //                     </p>
//         //                 </div>

//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>
//     )
// }

// export default About;