"use client"; // Required for client-side effects in Next.js;
import React from "react";

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">

                    {/* About section */}
                    <div className="space-y-4">

                        <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                            About
                        </h2>

                        <div className="space-y-3 text-sm leading-relaxed text-gray-600">
                            <p>
                                Experienced Software Developer with a strong track record of delivering
                                high-quality, scalable web applications across diverse industries.
                            </p>

                            <p>
                                Specialized in building modern, responsive front-end solutions using
                                <span className="font-medium text-gray-800">
                                    {" "}React.js, Vue.js, Nuxt.js, and Next.js
                                </span>.
                            </p>

                            <p>
                                Proficient in backend development with
                                <span className="font-medium text-gray-800">
                                    {" "}Node.js, Express.js, NestJS, and Laravel (PHP)
                                </span>,
                                enabling end-to-end application development.
                            </p>

                            <p>
                                Highly skilled in full-stack architecture, RESTful API design, and writing
                                clean, reusable, and maintainable code.
                            </p>

                            <p>
                                Strong problem-solving ability with proven experience in debugging,
                                performance optimization, and system reliability improvements.
                            </p>

                            <p>
                                User-focused developer who values feedback-driven feature development to
                                create practical and impactful solutions.
                            </p>

                            <p>
                                Effective communicator and collaborative team player, experienced in agile,
                                remote, and independent working environments.
                            </p>

                            <p>
                                Continuously learning and adopting modern technologies, frameworks, and best
                                practices to stay ahead in a fast-evolving tech landscape.
                            </p>

                            <p>
                                Committed to delivering on-time, scalable, and business-driven solutions
                                that consistently exceed client expectations.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;