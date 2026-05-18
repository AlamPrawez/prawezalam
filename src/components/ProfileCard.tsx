import React from 'react';
import { FaLinkedin, FaGithub, FaGitlab } from 'react-icons/fa';

export default function FullyResponsiveCompactProfile() {
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800 relative overflow-hidden flex items-center justify-center">
            
            {/* Dynamic visual shaping lines running from bottom-left up toward top-right */}
            <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
                <svg className="absolute min-w-full min-h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M-10,110 L30,-10 L45,-10 L0,110 Z" fill="url(#shape-grad-1)" />
                    <path d="M10,110 L60,-10 L70,-10 L20,110 Z" fill="url(#shape-grad-2)" />
                    <defs>
                        <linearGradient id="shape-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c7d2fe" />
                            <stop offset="100%" stopColor="#e0f2fe" />
                        </linearGradient>
                        <linearGradient id="shape-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            
            {/* Compact Max Width - Makes everything less wide and tight */}
            <div className="w-full max-w-7xl relative z-10">
                {/* Responsive Layout Flow: Row layout on lg screen, columns on everything else */}
                <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
                    
                    {/* Left/Top Column: Highly adaptive picture wrapper */}
                    {/* Width: 100% on mobile/tablet, anchors perfectly to 35% on lg screens */}
                    {/* Height: Stays aspect-square on smaller viewports, switches to full-height container layout on large screens */}
                    <div className="w-full lg:w-[35%] aspect-square sm:aspect-[4/3] lg:aspect-auto min-h-[280px] sm:min-h-[380px] lg:min-h-full relative flex-shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-200">
                        <img
                            src="/prawez.JPEG"
                            alt="ER. PRAWEZ ALAM"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Right/Bottom Column: Content spacing fluidly matches layout adjustments */}
                    <div className="w-full lg:w-[65%] py-2 flex flex-col justify-between">
                        
                        {/* Core Header Info & Availability */}
                        <div>
                            <div className="border-b border-gray-300/70 pb-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-center sm:text-left">
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                        ER. PRAWEZ ALAM
                                    </h1>
                                    <p className="text-sm font-semibold text-indigo-600 mt-1">
                                        Expert Full Stack Developer
                                    </p>
                                    
                                    {/* Contact Elements */}
                                    <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600 font-medium">
                                        <span className="flex items-center gap-1">📞 +977 9804083811</span>
                                        <span className="hidden sm:inline text-gray-300">|</span>
                                        <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
                                    </div>
                                </div>

                                {/* Status Hub */}
                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-1.5 flex-shrink-0">
                                    <div className="inline-flex items-center gap-1.5 bg-emerald-200/60 border border-emerald-300 rounded-lg px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                                        <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                                        Available
                                    </div>
                                    <div className="text-md font-bold text-gray-900 tracking-tight">
                                        $17 <span className="text-xs text-gray-500 font-semibold uppercase">/ hr (USD)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Descriptive Profile Bio */}
                            <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
                                <p>
                                    <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up.
                                </p>
                                <p>
                                    By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-medium">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-medium">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-medium">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
                                </p>
                                <p>
                                    Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
                                </p>
                            </div>
                        </div>

                        {/* Social Links & Competency Tags */}
                        <div className="mt-6">
                            <div className="flex justify-center sm:justify-start items-center gap-4 pb-5">
                                <a href="https://www.linkedin.com/in/prawez-alam/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
                                <a href="https://github.com/AlamPrawez" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors text-xl" aria-label="GitHub"><FaGithub /></a>
                                <a href="https://gitlab.com/prawezAlam" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors text-xl" aria-label="GitLab"><FaGitlab /></a>
                            </div>

                            <div className="pt-5 border-t border-gray-200/70">
                                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                                    {[
                                        { name: "FullStack", color: "bg-gray-200 text-gray-700 border-gray-300" },
                                        { name: "React", color: "bg-blue-100/70 text-blue-800 border-blue-200" },
                                        { name: "NextJS", color: "bg-slate-200 text-slate-700 border-slate-300" },
                                        { name: "VueJS", color: "bg-emerald-100/70 text-emerald-700 border-emerald-200" },
                                        { name: "NodeJS", color: "bg-green-100/70 text-green-700 border-green-200" },
                                        { name: "NestJS", color: "bg-red-100/70 text-red-700 border-red-200" },
                                        { name: "Laravel", color: "bg-orange-100/70 text-orange-700 border-orange-200" },
                                        { name: "Python", color: "bg-yellow-100/70 text-yellow-800 border-yellow-200" },
                                        { name: "AWS", color: "bg-purple-100/70 text-purple-700 border-purple-200" },
                                        { name: "DevOps", color: "bg-indigo-100/70 text-indigo-700 border-indigo-200" },
                                        { name: "SystemArchitecture", color: "bg-neutral-200/80 text-neutral-700 border-neutral-300" }
                                    ].map((tag, idx) => (
                                        <span key={idx} className={`px-2 py-0.5 text-xs font-medium rounded-md border ${tag.color}`}>
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

// import React from 'react';
// import { FaLinkedin, FaGithub, FaGitlab } from 'react-icons/fa';

// export default function BorderlessGeometricProfile() {
//     return (
//         <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800 relative overflow-hidden flex items-center justify-center">
            
//             {/* Dynamic visual shaping lines running from bottom-left up toward top-right */}
//             <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
//                 <svg className="absolute min-w-full min-h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <path d="M-10,110 L30,-10 L45,-10 L0,110 Z" fill="url(#shape-grad-1)" />
//                     <path d="M10,110 L60,-10 L70,-10 L20,110 Z" fill="url(#shape-grad-2)" />
//                     <defs>
//                         <linearGradient id="shape-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#c7d2fe" />
//                             <stop offset="100%" stopColor="#e0f2fe" />
//                         </linearGradient>
//                         <linearGradient id="shape-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </div>
            
//             {/* Completely Box-Free & Borderless Layout */}
//             <div className="w-full max-w-7xl relative z-10">
//                 <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
                    
//                     {/* Left Column: Image perfectly handles the 35% side, borderless and sharp */}
//                     <div className="w-full lg:w-[35%] min-h-[350px] sm:min-h-[450px] lg:min-h-full relative flex-shrink-0 rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm bg-gray-200">
//                         <img
//                             src="/prawez.JPEG"
//                             alt="ER. PRAWEZ ALAM"
//                             className="absolute inset-0 w-full h-full object-cover object-top"
//                         />
//                     </div>

//                     {/* Right Column: Text and Interactive Info flowing over the page background */}
//                     <div className="w-full lg:w-[65%] py-4 flex flex-col justify-between">
                        
//                         {/* Core Header Info & Availability */}
//                         <div>
//                             <div className="border-b border-gray-300/70 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-center sm:text-left">
//                                 <div>
//                                     <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                                         ER. PRAWEZ ALAM
//                                     </h1>
//                                     <p className="text-md font-semibold text-indigo-600 mt-1">
//                                         Expert Full Stack Developer
//                                     </p>
                                    
//                                     {/* Contact Elements */}
//                                     <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
//                                         <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                         <span className="hidden sm:inline text-gray-400">|</span>
//                                         <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                     </div>
//                                 </div>

//                                 {/* Status Hub */}
//                                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2 flex-shrink-0">
//                                     <div className="inline-flex items-center gap-2 bg-emerald-200/60 border border-emerald-300 rounded-lg px-3 py-1 text-xs font-bold text-emerald-800">
//                                         <span className="h-2 w-2 bg-emerald-600 rounded-full animate-pulse"></span>
//                                         Available
//                                     </div>
//                                     <div className="text-lg font-bold text-gray-900 tracking-tight">
//                                         $17 <span className="text-xs text-gray-500 font-semibold uppercase">/ hr (USD)</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Descriptive Profile Bio */}
//                             <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-gray-700">
//                                 <p>
//                                     <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up.
//                                 </p>
//                                 <p>
//                                     By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-medium">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-medium">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-medium">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                 </p>
//                                 <p>
//                                     Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Social Links & Competency Tags */}
//                         <div className="mt-8">
//                             <div className="flex justify-center sm:justify-start items-center gap-5 text-gray-400 pb-6">
//                                 <a href="https://www.linkedin.com/in/prawez-alam/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
//                                 <a href="https://github.com/AlamPrawez" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors text-xl" aria-label="GitHub"><FaGithub /></a>
//                                 <a href="https://gitlab.com/prawezAlam" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors text-xl" aria-label="GitLab"><FaGitlab /></a>
//                             </div>

//                             <div className="pt-6 border-t border-gray-300/70">
//                                 <div className="flex flex-wrap justify-center sm:justify-start gap-2">
//                                     {[
//                                         { name: "FullStack", color: "bg-gray-200 text-gray-700 border-gray-300" },
//                                         { name: "React", color: "bg-blue-100/70 text-blue-800 border-blue-200" },
//                                         { name: "NextJS", color: "bg-slate-200 text-slate-700 border-slate-300" },
//                                         { name: "VueJS", color: "bg-emerald-100/70 text-emerald-700 border-emerald-200" },
//                                         { name: "NodeJS", color: "bg-green-100/70 text-green-700 border-green-200" },
//                                         { name: "NestJS", color: "bg-red-100/70 text-red-700 border-red-200" },
//                                         { name: "Laravel", color: "bg-orange-100/70 text-orange-700 border-orange-200" },
//                                         { name: "Python", color: "bg-yellow-100/70 text-yellow-800 border-yellow-200" },
//                                         { name: "AWS", color: "bg-purple-100/70 text-purple-700 border-purple-200" },
//                                         { name: "DevOps", color: "bg-indigo-100/70 text-indigo-700 border-indigo-200" },
//                                         { name: "SystemArchitecture", color: "bg-neutral-200/80 text-neutral-700 border-neutral-300" }
//                                     ].map((tag, idx) => (
//                                         <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${tag.color}`}>
//                                             #{tag.name}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from 'react';
// import { FaLinkedin, FaGithub, FaGitlab } from 'react-icons/fa';

// export default function GeometricLayoutProfile() {
//     return (
//         <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800 relative overflow-hidden flex items-center justify-center">
            
//             {/* Dynamic visual shaping lines from bottom-left running toward top-right */}
//             <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/40 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
//                 <svg className="absolute min-w-full min-h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <path d="M-10,110 L30,-10 L45,-10 L0,110 Z" fill="url(#shape-grad-1)" />
//                     <path d="M10,110 L60,-10 L70,-10 L20,110 Z" fill="url(#shape-grad-2)" />
//                     <defs>
//                         <linearGradient id="shape-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#c7d2fe" />
//                             <stop offset="100%" stopColor="#e0f2fe" />
//                         </linearGradient>
//                         <linearGradient id="shape-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </div>
            
//             {/* Main Wrapper Layout Card */}
//             <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
//                 <div className="flex flex-col lg:flex-row min-h-[600px]">
                    
//                     {/* Left Column: Image perfectly covers the entire left container side */}
//                     <div className="w-full lg:w-[35%] min-h-[350px] lg:min-h-full relative flex-shrink-0 bg-gray-200">
//                         <img
//                             src="/prawez.JPEG"
//                             alt="ER. PRAWEZ ALAM"
//                             className="absolute inset-0 w-full h-full object-cover object-top"
//                         />
//                     </div>

//                     {/* Right Column: Detailed Context & Adaptive Typography Grid */}
//                     <div className="w-full lg:w-[65%] p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                        
//                         {/* Core Info Metadata Header */}
//                         <div>
//                             <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-center sm:text-left">
//                                 <div>
//                                     <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                                         ER. PRAWEZ ALAM
//                                     </h1>
//                                     <p className="text-md font-semibold text-indigo-600 mt-1">
//                                         Expert Full Stack Developer
//                                     </p>
                                    
//                                     {/* Quick Links Line */}
//                                     <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600">
//                                         <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                         <span className="hidden sm:inline text-gray-300">|</span>
//                                         <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                     </div>
//                                 </div>

//                                 {/* Availability Hub */}
//                                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2 flex-shrink-0">
//                                     <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-lg px-3 py-1 text-xs font-bold text-emerald-800">
//                                         <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
//                                         Available
//                                     </div>
//                                     <div className="text-lg font-bold text-gray-900 tracking-tight">
//                                         $17 <span className="text-xs text-gray-500 font-semibold uppercase">/ hr (USD)</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Descriptive Summary Paragraphs */}
//                             <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-gray-700">
//                                 <p>
//                                     <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up.
//                                 </p>
//                                 <p>
//                                     By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-medium">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-medium">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-medium">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                 </p>
//                                 <p>
//                                     Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Interactive Socials & Framework Chips */}
//                         <div className="mt-8">
//                             <div className="flex justify-center sm:justify-start items-center gap-5 text-gray-400 pb-6">
//                                 <a href="https://www.linkedin.com/in/prawez-alam/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
//                                 <a href="https://github.com/AlamPrawez" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors text-xl" aria-label="GitHub"><FaGithub /></a>
//                                 <a href="https://gitlab.com/prawezAlam" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors text-xl" aria-label="GitLab"><FaGitlab /></a>
//                             </div>

//                             <div className="pt-6 border-t border-gray-200">
//                                 <div className="flex flex-wrap justify-center sm:justify-start gap-2">
//                                     {[
//                                         { name: "FullStack", color: "bg-gray-100 text-gray-700 border-gray-300" },
//                                         { name: "React", color: "bg-blue-50 text-blue-700 border-blue-200" },
//                                         { name: "NextJS", color: "bg-slate-50 text-slate-700 border-slate-200" },
//                                         { name: "VueJS", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
//                                         { name: "NodeJS", color: "bg-green-50 text-green-700 border-green-200" },
//                                         { name: "NestJS", color: "bg-red-50 text-red-700 border-red-200" },
//                                         { name: "Laravel", color: "bg-orange-50 text-orange-700 border-orange-200" },
//                                         { name: "Python", color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
//                                         { name: "AWS", color: "bg-purple-50 text-purple-700 border-purple-200" },
//                                         { name: "DevOps", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
//                                         { name: "SystemArchitecture", color: "bg-neutral-100 text-neutral-700 border-neutral-200" }
//                                     ].map((tag, idx) => (
//                                         <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${tag.color}`}>
//                                             #{tag.name}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import React from "react";
// import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";

// const ProfileCard: React.FC = () => {

//     return (
//         <div className="bg-gray-100 min-h-screen py-10">
//             <div className="container mx-auto px-4">
//                 <div className="flex justify-center">
//                     <div className="w-full max-w-5xl p-4 sm:p-6">

//                         {/* Profile wrapper */}
//                         <div className="flex flex-col items-center sm:items-start gap-6 sm:flex-row">

//                             {/* Profile image */}
//                             <div className="w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-gray-200">
//                                 <img
//                                     src="/prawez.JPEG"
//                                     alt="ER. PRAWEZ ALAM"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>

//                             {/* Profile info */}
//                             <div className="text-center sm:text-left flex-1 w-full">
                                
//                                 {/* Header Info Row */}
//                                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
//                                     <div>
//                                         <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                                             ER. PRAWEZ ALAM
//                                         </h1>
//                                         <p className="text-md font-semibold text-indigo-600 mt-1">
//                                             Expert Full Stack Developer
//                                         </p>
                                        
//                                         {/* Contact Details */}
//                                         <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
//                                             <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                             <span className="hidden sm:inline text-gray-400">|</span>
//                                             <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                         </div>
//                                     </div>

//                                     {/* Availability & Rate badges */}
//                                     <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2">
//                                         <div className="flex items-center gap-1.5 bg-emerald-200/60 border border-emerald-300 rounded-full px-3 py-1 text-xs font-bold text-emerald-800">
//                                             <span className="h-2 w-2 bg-emerald-600 rounded-full animate-pulse"></span>
//                                             Available
//                                         </div>
//                                         <div className="rounded-full bg-gray-200 text-gray-800 border border-gray-300 px-3 py-1 text-xs font-bold tracking-wide">
//                                             $17 / hr (USD)
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Social Links */}
//                                 <div className="flex justify-center sm:justify-start items-center gap-4 text-gray-400 mt-4 pb-6 border-b border-gray-300">
//                                     <a
//                                         href="https://www.linkedin.com/in/prawez-alam/"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:text-blue-600 transition-colors"
//                                         aria-label="LinkedIn"
//                                     >
//                                         <FaLinkedin className="w-5 h-5" />
//                                     </a>
//                                     <a
//                                         href="https://github.com/AlamPrawez"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:text-gray-900 transition-colors"
//                                         aria-label="GitHub"
//                                     >
//                                         <FaGithub className="w-5 h-5" />
//                                     </a>
//                                     <a
//                                         href="https://gitlab.com/prawezAlam"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:text-orange-600 transition-colors"
//                                         aria-label="GitLab"
//                                     >
//                                         <FaGitlab className="w-5 h-5" />
//                                     </a>
//                                 </div>

//                                 {/* About Me Descriptive Section */}
//                                 <div className="mt-6 text-left">
//                                     <h2 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">About Me</h2>
//                                     <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
//                                         <p>
//                                             <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up. By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-semibold">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-semibold">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-semibold">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                         </p>
//                                         <p>
//                                             Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                         </p>
//                                     </div>

//                                     {/* Tech Tags */}
//                                     <div className="mt-6 pt-5 border-t border-gray-300">
//                                         <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Core Expertise</h3>
//                                         <div className="flex flex-wrap gap-2">
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-gray-200 text-gray-700 border border-gray-300 rounded-md">#FullStack</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 rounded-md">#React</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-slate-200 text-slate-800 border border-slate-300 rounded-md">#NextJS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded-md">#NodeJS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded-md">#NestJS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200 rounded-md">#Laravel</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-900 border border-yellow-200 rounded-md">#Python</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 rounded-md">#AWS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-md">#DevOps</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-md">#SystemArchitecture</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//         // <div className="bg-gray-100">
//         //     <div className="container">
//         //         <div className="flex justify-center">
//         //             <div className="w-full mx-20 max-w-4xl sm:max-w-full rounded-none sm:rounded-xl border-none sm:border border-gray-300 p-5">

//         //                 {/* Profile wrapper */}
//         //                 <div className="min-w-full flex flex-col items-center sm:items-start gap-4 sm:flex-row  sm:gap-6">

//         //                     {/* Profile image */}
//         //                     <div className="sm:w-max-content rounded-full sm:rounded-md overflow-hidden border border-gray-200">
//         //                         <img
//         //                             src="/prawez.JPEG"
//         //                             alt="profile"
//         //                             className="w-full h-full object-cover"
//         //                         />
//         //                     </div>

//         //                     {/* Profile info */}
//         //                     <div className="text-center sm:text-left w-full max-w-5xl mt-0 sm:mt-10">
//         //                         <div className="justify-between">
//         //                             <div>
//         //                                 <div className="text-lg sm:text-6xl font-semibold text-gray-800">
//         //                                     ER. PRAWEZ ALAM
//         //                                 </div>

//         //                                 <div className="text-md text-gray-800 my-1">
//         //                                     Expert Full Stack Developer
//         //                                 </div>

//         //                                 <div className="mt-2 text-md text-gray-800 my-1">
//         //                                     +977 9804083811
//         //                                 </div>

//         //                                 <div className="text-md text-gray-800 my-1">
//         //                                     prawezalam9@gmail.com
//         //                                 </div>
//         //                             </div>
//         //                             <div className="hidden sm:block mt-2 text-gray-500">
//         //                                 {/* Full-stack developer skilled in React, Vue, Nuxt, Next, Node, NestJS, Laravel, Python, and AWS DevOps tools, with expertise in system and application design, building scalable, user-focused web applications with clean, maintainable code and a focus on performance and reliability. */}

//         //                                 <div className="max-w-3xl mx-auto my-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-slate-300 font-sans">

//         //                                     <div className="flex items-center space-x-4 mb-6">
//         //                                         <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
//         //                                         <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold font-mono">Available for Opportunities</span>
//         //                                     </div>

//         //                                     <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
//         //                                         About <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Me</span>
//         //                                     </h2>


//         //                                     <div className="space-y-6 text-base leading-relaxed text-slate-300">
//         //                                         <p>
//         //                                             <strong className="text-white font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up. By seamlessly combining deep frontend expertise (<span className="text-sky-400">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-400">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <strong className="text-purple-400 font-medium">AWS DevOps</strong> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//         //                                         </p>

//         //                                         <p>
//         //                                             Beyond writing code, I am highly adept at advanced <strong className="text-white font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//         //                                         </p>
//         //                                     </div>


//         //                                     <div className="mt-8 pt-6 border-t border-slate-800">
//         //                                         <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Core Expertise</h3>
//         //                                         <div className="flex flex-wrap gap-2">
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">#FullStack</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">#React</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">#NextJS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">#NodeJS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">#NestJS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">#Laravel</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">#Python</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">#AWS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">#DevOps</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full">#SystemArchitecture</span>
//         //                                         </div>
//         //                                     </div>
//         //                                 </div>
//         //                             </div>

//         //                             <div className="mt-2 sm:mt-2">
//         //                                 <div className="inline-block rounded-xl bg-green-200 text-green-800 border border-gray-200 px-3 py-1">
//         //                                     $17/hour (USD)
//         //                                 </div>
//         //                             </div>

//         //                         </div>

//         //                         <div className="flex justify-center sm:justify-start items-center gap-4 text-gray-500 mt-5">
//         //                             <a
//         //                                 href="https://www.linkedin.com/in/prawez-alam/"
//         //                                 target="_blank"
//         //                                 rel="noopener noreferrer"
//         //                                 className="hover:text-blue-600 transition-colors"
//         //                                 aria-label="LinkedIn"
//         //                             >
//         //                                 <FaLinkedin className="w-5 h-5" />
//         //                             </a>

//         //                             <a
//         //                                 href="https://github.com/AlamPrawez"
//         //                                 target="_blank"
//         //                                 rel="noopener noreferrer"
//         //                                 className="hover:text-gray-800 transition-colors"
//         //                                 aria-label="GitHub"
//         //                             >
//         //                                 <FaGithub className="w-5 h-5" />
//         //                             </a>

//         //                             <a
//         //                                 href="https://gitlab.com/prawezAlam"
//         //                                 target="_blank"
//         //                                 rel="noopener noreferrer"
//         //                                 className="hover:text-orange-600 transition-colors"
//         //                                 aria-label="GitLab"
//         //                             >
//         //                                 <FaGitlab className="w-5 h-5" />
//         //                             </a>
//         //                         </div>



//         //                     </div>

//         //                 </div>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>
//     )
// }

// export default ProfileCard;