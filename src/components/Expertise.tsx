"use client"; // Required for client-side effects in Next.js;
import React from "react";
import Image from "next/image";

const ExpertiseSection: React.FC = () => {
    // const skills = [
    //     { name: "JavaScript", img: "/skills/javascript.png", experience: 7, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "TypeScript", img: "/skills/typescript.png", experience: 3, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Node.js", img: "/skills/nodejs-logo.png", experience: 5, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Express", img: "/skills/express-logo.png", experience: 4, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "NestJS", img: "/skills/nestjs-logo.png", experience: 4, shortDesc: "Building interactive UIs and SPAs" },

    //     { name: "PHP", img: "/skills/php.png", experience: 7, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Laravel", img: "/skills/laravel.png", experience: 7, shortDesc: "Building interactive UIs and SPAs" },

    //     { name: "Python", img: "/skills/python.png", experience: 4, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Flask", img: "/skills/flask.png", experience: 4, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "FastAPI", img: "/skills/fastapi.png", experience: 4, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Django", img: "/skills/django1.png", experience: 2, shortDesc: "Building interactive UIs and SPAs" },

    //     { name: "Vue.js", img: "/skills/vuejs.png", experience: 5, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "NuxtJS", img: "/skills/nuxtjs.png", experience: 5, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "React.js", img: "/skills/react.png", experience: 5, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Next.js", img: "/skills/nextjs-logo.png", experience: 5, shortDesc: "Building interactive UIs and SPAs" },

    //     { name: "HTML5", img: "/skills/html.png", experience: 8, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "CSS3", img: "/skills/css3.png", experience: 8, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Bootstrap", img: "/skills/boostrap-logo.png", experience: 8, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Tailwind CSS", img: "/skills/tailwindlogo.png", experience: 3, shortDesc: "Building interactive UIs and SPAs" },

    //     { name: "AI Integration", img: "/skills/ai.png", experience: 3, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Supabase", img: "/skills/supabase.webp", experience: 2, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "MySQL", img: "/skills/mysql.png", experience: 7, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "PostgreSQL", img: "/skills/postgresql.webp", experience: 3, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "MongoDB", img: "/skills/mongodb.png", experience: 3, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Sqlite", img: "/skills/sqlite.png", experience: 2, shortDesc: "Building interactive UIs and SPAs" },
    //     { name: "Redis", img: "/skills/redis.webp", experience: 4, shortDesc: "Building interactive UIs and SPAs" },
    // ];
    const skills = [
        { name: "JavaScript", img: "/skills/javascript.png", experience: 7, shortDesc: "Core language for web applications" },
        { name: "TypeScript", img: "/skills/typescript.png", experience: 3, shortDesc: "Typed JavaScript for scalable apps" },
        { name: "Node.js", img: "/skills/nodejs-logo.png", experience: 5, shortDesc: "Backend runtime for APIs" },
        { name: "Express", img: "/skills/express-logo.png", experience: 4, shortDesc: "Lightweight Node.js framework" },
        { name: "NestJS", img: "/skills/nestjs-logo.png", experience: 4, shortDesc: "Enterprise Node.js framework" },

        { name: "PHP", img: "/skills/php.png", experience: 7, shortDesc: "Server-side web scripting" },
        { name: "Laravel", img: "/skills/laravel.png", experience: 7, shortDesc: "Modern PHP web framework" },

        { name: "Python", img: "/skills/python.png", experience: 4, shortDesc: "Backend & automation scripting" },
        { name: "Flask", img: "/skills/flask.png", experience: 4, shortDesc: "Lightweight Python API framework" },
        { name: "FastAPI", img: "/skills/fastapi.png", experience: 4, shortDesc: "High-performance API framework" },
        { name: "Django", img: "/skills/django1.png", experience: 2, shortDesc: "Full-featured Python framework" },

        { name: "Vue.js", img: "/skills/vuejs.png", experience: 5, shortDesc: "Reactive frontend framework" },
        { name: "NuxtJS", img: "/skills/nuxtjs.png", experience: 5, shortDesc: "SSR Vue framework" },
        { name: "React.js", img: "/skills/react.png", experience: 5, shortDesc: "Component-based UI library" },
        { name: "Next.js", img: "/skills/nextjs-logo.png", experience: 5, shortDesc: "Full-stack React framework" },
        {
            name: "React Native",
            img: "/skills/react-native.png",  // make sure the image file matches React Native logo
            experience: 2,
            shortDesc: "Build native mobile apps using React Native framework"
        },
        { name: "HTML5", img: "/skills/html.png", experience: 8, shortDesc: "Web page structure" },
        { name: "CSS3", img: "/skills/css3.png", experience: 8, shortDesc: "Modern UI styling" },
        { name: "Bootstrap", img: "/skills/boostrap-logo.png", experience: 8, shortDesc: "Responsive UI framework" },
        { name: "Tailwind CSS", img: "/skills/tailwindlogo.png", experience: 3, shortDesc: "Utility-first CSS framework" },

        { name: "AI Integration", img: "/skills/ai.png", experience: 3, shortDesc: "AI-powered app features" },
        { name: "Supabase", img: "/skills/supabase.webp", experience: 2, shortDesc: "Backend-as-a-service platform" },
        { name: "MySQL", img: "/skills/mysql.png", experience: 7, shortDesc: "Relational database system" },
        { name: "PostgreSQL", img: "/skills/postgresql.webp", experience: 3, shortDesc: "Advanced SQL database" },
        { name: "MongoDB", img: "/skills/mongodb.png", experience: 3, shortDesc: "NoSQL document database" },
        { name: "Sqlite", img: "/skills/sqlite.png", experience: 2, shortDesc: "Lightweight embedded database" },
        { name: "Redis", img: "/skills/redis.webp", experience: 4, shortDesc: "In-memory caching system" },
    ];

    return (
        <div className="bg-gray-50/60 py-16 transition-colors duration-300 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">

                        {/* Premium Section Title Header */}
                        <div className="ps-4 mb-8 text-center sm:text-start relative">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-2.5 border border-indigo-100 shadow-3xs">
                                Capabilities
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                                Core Technical Stack
                            </h2>
                        </div>

                        <section className="mx-auto">
                            {/* Flex Grid Alignment Container */}
                            <div className="flex flex-wrap justify-center gap-5 px-2 py-4">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row items-center sm:items-start md:items-center bg-white border border-gray-200/70 rounded-2xl p-4 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] w-full sm:w-[47%] lg:w-[31.5%] group relative overflow-hidden"
                                    >
                                        {/* Hidden Left Border Accent Bar Triggered on Hover */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                        {/* Left Side: Tech Logo Wrapper with Interactive Depth */}
                                        <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-50/80 rounded-xl mb-3 sm:mb-0 sm:mr-4 border border-gray-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100/50 transition-colors duration-300">
                                            <Image
                                                src={skill.img}
                                                alt={`${skill.name} Environment Deployment Asset`}
                                                width={100}
                                                height={100}
                                                className="w-20 h-20 object-contain block filter drop-shadow-3xs transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Right Side: Copywriting & Quantitative Metrics Data */}
                                        <div className="flex-1 w-full text-center sm:text-left">
                                            {/* Technical Key SEO Text Integration */}
                                            <h3 className="text-base font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                                {skill.name}
                                            </h3>

                                            {/* Short Informational Description */}
                                            <p className="text-xs text-gray-500 font-normal mt-0.5 leading-relaxed min-h-[32px] flex items-center justify-center sm:justify-start">
                                                {skill.shortDesc}
                                            </p>

                                            {/* Experience / Progress Metrics Bar Frame */}
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 tracking-wide uppercase mb-1.5 font-mono">
                                                    <span>Proficiency</span>
                                                    <span className="text-indigo-600 font-extrabold bg-indigo-50/80 px-1.5 py-0.5 rounded-md border border-indigo-100/30">
                                                        {skill.experience} {skill.experience === 1 ? 'Year' : 'Yrs'}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden border border-gray-200/20 shadow-2xs">
                                                    <div
                                                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full transition-all duration-1000 ease-out shadow-3xs"
                                                        style={{ width: `${Math.min((skill.experience / 10) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        // <div className="bg-gray-100">
        //     <div className="container mx-auto px-4 py-6 ">
        //         <div className="flex justify-center">
        //             <div className="w-full max-w-6xl rounded-xl">
        //                 <div className="ps-9 pt-6 text-center sm:text-start">
        //                     <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left mb-5">
        //                         Skills
        //                     </h2>
        //                 </div>
        //                 <section className="">
        //                     <div className="mx-auto max-w-7xl">
        //                         {/* Heading */}
        //                         <div className="flex flex-wrap justify-center gap-4 px-4 py-6">
        //                             {skills.map((skill, index) => (
        //                                 <div
        //                                     key={index}
        //                                     className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm transition hover:shadow-md w-full sm:w-[48%] lg:w-[31%]"
        //                                 >
        //                                     {/* Left side: Smaller Image */}
        //                                     <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-50 rounded-lg mb-3 md:mb-0 md:mr-3">
        //                                         <img
        //                                             src={skill.img}
        //                                             alt={skill.name}
        //                                             className="h-12 w-12 md:h-16 md:w-16 object-contain"
        //                                         />
        //                                     </div>

        //                                     {/* Right side: Info */}
        //                                     <div className="flex-1">
        //                                         {/* Skill Name */}
        //                                         <h5 className="text-md font-semibold text-gray-800">{skill.name}</h5>

        //                                         {/* Short Description */}
        //                                         <p className="text-xs text-gray-500 mt-1 mb-2">{skill.shortDesc}</p>

        //                                         {/* Experience / Progress Bar */}
        //                                         <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        //                                             <div
        //                                                 className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
        //                                                 style={{ width: `${(skill.experience / 10) * 100}%` }}
        //                                             ></div>
        //                                         </div>

        //                                         {/* Experience Label */}
        //                                         <span className="text-xs text-gray-600 mt-1 block">{skill.experience} yrs</span>
        //                                     </div>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                     </div>
        //                 </section>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ExpertiseSection;