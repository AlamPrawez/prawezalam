"use client"; // Required for client-side effects in Next.js;
import React from "react";

const About: React.FC = () => {
    const skills = [
        "React.js", "Vue.js", "Nuxt.js", "Next.js",
        "Node.js", "NestJS", "Laravel", "Python",
        "AWS DevOps", "System Design", "Application Design", "API Development", "Performance Optimization"
    ]
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center">
                <div className="w-full max-w-6xl rounded-xl border border-gray-300 p-6 bg-white shadow-md">

                    {/* About Section */}
                    <div className="space-y-6">

                        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
                            About Me
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            I am an <span className="font-bold text-gray-800">Experienced full-stack developer</span> with a strong track record of designing, developing, and delivering high-quality web applications across multiple industries. My work focuses on creating <span className="font-bold text-gray-800">scalable, reliable, and maintainable solutions</span> that meet business objectives and provide an exceptional user experience.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            On the <span className="font-bold text-gray-800">Front-end</span>, I specialize in building modern, responsive, and user-friendly interfaces using <span className="font-medium text-gray-800">React.js, Vue.js, Nuxt.js, and Next.js</span>. I prioritize creating intuitive designs and smooth interactions that enhance usability and accessibility.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            On the <span className="font-bold text-gray-800">Back-end</span>, I am proficient in <span className="font-bold text-gray-800">Node.js, Express.js, NestJS, Laravel (PHP), and Python</span>, enabling me to develop complete end-to-end solutions, from database modeling and API design to server-side logic and performance optimization.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            I have expertise in <span className="font-bold text-gray-800">System and application design</span>, focusing on scalable architectures, clean code practices, and modular development. My experience includes building <span className="font-bold text-gray-800">RESTful APIs, microservices, and cloud-based applications</span>, ensuring reliability, maintainability, and security.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            I am also skilled in <span className="font-bold text-gray-800">AWS and DevOps tools</span>, enabling deployment automation, CI/CD pipelines, cloud infrastructure management, and monitoring to ensure applications perform efficiently under heavy traffic and scale seamlessly.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            I take a <span className="font-bold text-gray-800">User-focused and feedback-driven approach</span> to development, collaborating closely with clients, designers, and teams to deliver features that are both practical and impactful. My strong problem-solving skills help me debug complex issues, optimize performance, and enhance system reliability.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            Beyond technical skills, I am an <span className="font-bold text-gray-800">Effective communicator and collaborative team player</span>, experienced in agile workflows, remote coordination, and independent project ownership. I continuously learn and adopt modern frameworks, best practices, and emerging technologies to stay ahead in a fast-evolving tech landscape.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            Overall, my goal is to deliver <span className="font-bold text-gray-800">Business-driven, scalable, and high-quality solutions</span> that consistently exceed client expectations while balancing technical excellence with usability and performance.
                        </p>

                        {/* Skills Badges */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
        // <div className="container mx-auto px-4 py-6">
        //     <div className="flex justify-center">
        //         <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
        //             <div className="space-y-4">

        //                 <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
        //                     About
        //                 </h2>

        //                 <div className="space-y-3 text-sm leading-relaxed text-gray-600">
        //                     <p>
        //                         Experienced Software Developer with a strong track record of delivering
        //                         high-quality, scalable web applications across diverse industries.
        //                     </p>

        //                     <p>
        //                         Specialized in building modern, responsive front-end solutions using
        //                         <span className="font-medium text-gray-800">
        //                             {" "}React.js, Vue.js, Nuxt.js, and Next.js
        //                         </span>.
        //                     </p>

        //                     <p>
        //                         Proficient in backend development with
        //                         <span className="font-medium text-gray-800">
        //                             {" "}Node.js, Express.js, NestJS, and Laravel (PHP)
        //                         </span>,
        //                         enabling end-to-end application development.
        //                     </p>

        //                     <p>
        //                         Highly skilled in full-stack architecture, RESTful API design, and writing
        //                         clean, reusable, and maintainable code.
        //                     </p>

        //                     <p>
        //                         Strong problem-solving ability with proven experience in debugging,
        //                         performance optimization, and system reliability improvements.
        //                     </p>

        //                     <p>
        //                         User-focused developer who values feedback-driven feature development to
        //                         create practical and impactful solutions.
        //                     </p>

        //                     <p>
        //                         Effective communicator and collaborative team player, experienced in agile,
        //                         remote, and independent working environments.
        //                     </p>

        //                     <p>
        //                         Continuously learning and adopting modern technologies, frameworks, and best
        //                         practices to stay ahead in a fast-evolving tech landscape.
        //                     </p>

        //                     <p>
        //                         Committed to delivering on-time, scalable, and business-driven solutions
        //                         that consistently exceed client expectations.
        //                     </p>
        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default About;