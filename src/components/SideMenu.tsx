"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";
import { authentication } from "@/services/api/endpoints";
import { useRouter } from "next/navigation";

const SideMenu: React.FC = () => {
    const pathname = usePathname();

    const router = useRouter();
    const handleLogout = async () => {
        const { success, error } = await authentication.signOut();
        if (error) {
            console.error("Error logging out:", error?.message);
        }
        if (success) {
            // window.location.href = "/dashboard";
            router.refresh();
            router.replace("/");
        }
    };


    const linksList = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: "fa-solid fa-border-all"
        },
        {
            title: "My Gigs",
            href: "/dashboard/gigs",
            icon: "fa-solid fa-gear"
        },
        {
            title: "Orders",
            href: "/dashboard/orders",
            icon: "fa-solid fa-gear"
        }
    ];

    return (
        <div className="">
            <div className="">
                <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
                    {/* Profile wrapper */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
                        {/* Profile image */}
                        <div className="w-full flex items-center justify-center">
                            <div className="w-30 h-30 rounded-full overflow-hidden border border-gray-200">
                                <img
                                    src="/prawez.JPEG"
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 sm:gap-6">
                        {/* Profile info */}
                        <div className="text-center">
                            <div className="text-lg font-semibold text-gray-800">
                                Er. Prawez Alam
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

                            <div className="flex justify-center items-center gap-4 text-gray-500 mt-5">
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
                    <div className="py-4 mt-4 border-t border-gray-200">
                        {
                            linksList.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 ps-4 py-2 my-1 rounded-lg transition-all ${isActive
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <i className={`${link.icon} w-5`}></i>
                                        <span>{link.title}</span>
                                    </Link>
                                );
                            })
                        }
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-6 ps-11 py-2 rounded-lg transition-all text-gray-600 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default SideMenu;



