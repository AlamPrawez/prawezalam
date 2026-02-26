import React from "react";
import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";

const ProfileCard: React.FC = () => {

    return (
        <div className="bg-gray-100">
            <div className="container">
                <div className="flex justify-center">
                    <div className="w-full mx-30 max-w-4xl sm:max-w-full  rounded-none sm:rounded-xl border-none sm:border border-gray-300 p-5">

                        {/* Profile wrapper */}
                        <div className="min-w-full flex flex-col items-center sm:items-start gap-4 sm:flex-row  sm:gap-6">

                            {/* Profile image */}
                            <div className="max-w-42 h-42 sm:max-w-100 sm:h-90 rounded-full sm:rounded-md overflow-hidden border border-gray-200">
                                <img
                                    src="/prawez.JPEG"
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Profile info */}
                            <div className="text-center sm:text-left w-full max-w-4xl mt-0 sm:mt-10">
                                <div className="justify-between">
                                    <div>
                                        <div className="text-lg sm:text-6xl font-semibold text-gray-800">
                                            ER. PRAWEZ ALAM
                                        </div>

                                        <div className="text-md text-gray-800 my-1">
                                            Expert Full Stack Developer
                                        </div>

                                        <div className="mt-2 text-md text-gray-800 my-1">
                                            +977 9804083811
                                        </div>

                                        <div className="text-md text-gray-800 my-1">
                                            prawezalam9@gmail.com
                                        </div>
                                    </div>
                                    <div className="hidden sm:block mt-2 text-gray-500">
                                        Full-stack developer skilled in React, Vue, Nuxt, Next, Node, NestJS, Laravel, Python, and AWS DevOps tools, with expertise in system and application design, building scalable, user-focused web applications with clean, maintainable code and a focus on performance and reliability.
                                    </div>

                                    <div className="mt-2 sm:mt-2">
                                        <div className="inline-block rounded-xl bg-green-200 text-green-800 border border-gray-200 px-3 py-1">
                                            $17/hour (USD)
                                        </div>
                                    </div>

                                </div>

                                <div className="flex justify-center sm:justify-start items-center gap-4 text-gray-500 mt-5">
                                    <a
                                        href="https://www.linkedin.com/in/prawez-alam/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-600 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin className="w-5 h-5" />
                                    </a>

                                    <a
                                        href="https://github.com/AlamPrawez"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-gray-800 transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <FaGithub className="w-5 h-5" />
                                    </a>

                                    <a
                                        href="https://gitlab.com/prawezAlam"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-orange-600 transition-colors"
                                        aria-label="GitLab"
                                    >
                                        <FaGitlab className="w-5 h-5" />
                                    </a>
                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;