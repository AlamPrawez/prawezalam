"use client"; // Required for client-side effects in Next.js;
import React from "react";

const ExpertiseSection: React.FC = () => {
    const skills = [
        { name: "JavaScript", img: "/skills/javascript.png" },
        { name: "TypeScript", img: "/skills/typescript.png" },
        { name: "Node.js", img: "/skills/nodejs-logo.png" },
        { name: "Express", img: "/skills/express-logo.png" },
        { name: "NestJS", img: "/skills/nestjs-logo.png" },

        { name: "PHP", img: "/skills/php.png" },
        { name: "Laravel", img: "/skills/laravel.png" },

        { name: "Python", img: "/skills/python.png" },
        { name: "Flask", img: "/skills/flask.png" },
        { name: "FastAPI", img: "/skills/fastapi.png" },
        { name: "Django", img: "/skills/django1.png" },

        { name: "Vue.js", img: "/skills/vuejs.png" },
        { name: "NuxtJS", img: "/skills/nuxtjs.png" },
        { name: "React.js", img: "/skills/react.png" },
        { name: "Next.js", img: "/skills/nextjs-logo.png" },

        { name: "HTML5", img: "/skills/html.png" },
        { name: "CSS3", img: "/skills/css3.png" },
        { name: "Bootstrap", img: "/skills/boostrap-logo.png" },
        { name: "Tailwind CSS", img: "/skills/tailwindlogo.png" },

        { name: "AI Integration", img: "/skills/ai.png" },
        { name: "Supabase", img: "/skills/supabase.webp" },
        { name: "MySQL", img: "/skills/mysql.png" },
        { name: "PostgreSQL", img: "/skills/postgresql.webp" },
        { name: "MongoDB", img: "/skills/mongodb.png" },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
                    <section className="">
                        <div className="mx-auto max-w-7xl px-4">
                            {/* Heading */}
                            <div className="py-6 text-center sm:text-start mb-2">
                                <h2 className="text-lg font-bold text-gray-500">
                                    Expertise & Innovations
                                </h2>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ExpertiseSection;