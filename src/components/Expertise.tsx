"use client"; // Required for client-side effects in Next.js;
import React from "react";

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
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-6 ">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl rounded-xl">
                        <div className="ps-9 pt-6 text-center sm:text-start">
                            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left mb-5">
                                Skills
                            </h2>
                        </div>
                        <section className="">
                            <div className="mx-auto max-w-7xl">
                                {/* Heading */}

                                {/* Grid */}
                                {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="flex h-full flex-col items-center justify-center text-center">
                                            <img
                                                src={skill.img}
                                                alt={skill.name}
                                                className="mb-4 h-14 w-14 object-contain"
                                            />
                                            <h5 className="text-sm font-semibold text-gray-800">
                                                {skill.name}
                                            </h5>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                                <div className="flex flex-wrap justify-center gap-4 px-4 py-6">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm transition hover:shadow-md w-full sm:w-[48%] lg:w-[31%]"
                                        >
                                            {/* Left side: Smaller Image */}
                                            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-50 rounded-lg mb-3 md:mb-0 md:mr-3">
                                                <img
                                                    src={skill.img}
                                                    alt={skill.name}
                                                    className="h-12 w-12 md:h-16 md:w-16 object-contain"
                                                />
                                            </div>

                                            {/* Right side: Info */}
                                            <div className="flex-1">
                                                {/* Skill Name */}
                                                <h5 className="text-md font-semibold text-gray-800">{skill.name}</h5>

                                                {/* Short Description */}
                                                <p className="text-xs text-gray-500 mt-1 mb-2">{skill.shortDesc}</p>

                                                {/* Experience / Progress Bar */}
                                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
                                                        style={{ width: `${(skill.experience / 10) * 100}%` }}
                                                    ></div>
                                                </div>

                                                {/* Experience Label */}
                                                <span className="text-xs text-gray-600 mt-1 block">{skill.experience} yrs</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpertiseSection;