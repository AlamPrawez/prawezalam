import React from "react";
import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";

const ProfileCard: React.FC = () => {

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">

                    {/* Profile wrapper */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">

                        {/* Profile image */}
                        <div className="w-42 h-42 rounded-full overflow-hidden border border-gray-200">
                            <img
                                src="/prawez.JPEG"
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Profile info */}
                        <div className="text-center sm:text-left">
                            <div className="text-lg font-semibold text-gray-800">
                                Er. Pravej Alam
                            </div>

                            <div className="text-sm text-gray-500">
                                Expert Full Stack Developer
                            </div>

                            <div className="mt-2 text-sm text-gray-500">
                                +977 9804083811
                            </div>

                            <div className="text-sm text-gray-500">
                                prawezalam9@gmail.com
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
    )
}

export default ProfileCard;