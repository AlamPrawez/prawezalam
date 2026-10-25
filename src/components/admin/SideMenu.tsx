"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiLogOut, 
  FiExternalLink 
} from "react-icons/fi";
import { 
  LayoutDashboard, 
  BookOpen, 
  ConciergeBell, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  MessageSquare, 
  Package
} from "lucide-react";
import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";
import { authentication } from "@/services/api/endpoints";

interface SideMenuProps {
  onToggleCollapse?: (isCollapsed: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onToggleCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = async () => {
    const { success, error } = await authentication.signOut();
    if (error) {
      console.error("Error logging out:", error?.message);
    }
    if (success) {
      router.refresh();
      router.replace("/");
    }
  };

  const linksList = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    // Manager links (will open in a new tab)
    {
      title: "Blogs",
      href: "/manager/blogs",
      icon: BookOpen,
    },
    {
      title: "Services",
      href: "/manager/services",
      icon: ConciergeBell,
    },
    {
      title: "Products",
      href: "/manager/products",
      icon: Package,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "My Gigs",
      href: "/admin/gigs",
      icon: Briefcase,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Message",
      href: "/admin/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <aside
      className={`relative transition-all duration-300 ease-in-out border border-gray-300 rounded-xl bg-white p-4 ${
        isCollapsed ? "w-20" : "w-80 max-w-full"
      }`}
    >
      {/* Sidebar Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-300 shadow-md rounded-full p-1.5 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all z-10"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
      </button>

      {/* Profile Wrapper */}
      <div className="flex flex-col items-center">
        {/* Profile Avatar - Dynamic sizing when collapsed */}
        <div 
          className={`rounded-full overflow-hidden border border-gray-200 shrink-0 transition-all duration-300 ${
            isCollapsed ? "w-10 h-10" : "w-20 h-20"
          }`}
        >
          <img
            src="/prawez.JPEG"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info (Hidden when collapsed) */}
        {!isCollapsed && (
          <div className="text-center mt-3 transition-opacity duration-200">
            <div className="text-base font-semibold text-gray-800">
              Er. Prawez Alam
            </div>
            <div className="text-xs text-gray-500">
              Expert Full Stack Developer
            </div>
            <div className="mt-1 text-xs text-gray-500">+977 9804083811</div>
            <div className="text-xs text-gray-500">prawezalam9@gmail.com</div>

            {/* Social Links */}
            <div className="flex justify-center items-center gap-4 text-gray-500 mt-3">
              <a
                href="https://www.linkedin.com/in/prawez-alam/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/AlamPrawez"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://gitlab.com/prawezAlam"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition-colors"
                aria-label="GitLab"
              >
                <FaGitlab className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu List */}
      <nav className="py-4 mt-4 border-t border-gray-200 flex flex-col gap-1">
        {linksList.map((link) => {
          const isActive = pathname === link.href;
          const isManagerRoute = link.href.startsWith("/manager/");
          const IconComponent = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              target={isManagerRoute ? "_blank" : "_self"}
              rel={isManagerRoute ? "noopener noreferrer" : undefined}
              title={isCollapsed ? link.title : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isCollapsed ? "justify-center" : "justify-start"
              } ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {/* Menu Item Icon */}
              <IconComponent size={20} className="shrink-0" />

              {!isCollapsed && (
                <span className="flex-1 text-sm truncate">{link.title}</span>
              )}

              {/* Indicator icon for links opening in a new tab */}
              {!isCollapsed && isManagerRoute && (
                <FiExternalLink className="text-xs text-gray-400 shrink-0 ml-auto" />
              )}
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg transition-all text-gray-600 hover:bg-red-50 hover:text-red-600 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <FiLogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </nav>
    </aside>
  );
};

export default SideMenu;

// "use client"

// import Link from "next/link";
// import { usePathname } from 'next/navigation';
// import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";
// import { authentication } from "@/services/api/endpoints";
// import { useRouter } from "next/navigation";

// const SideMenu: React.FC = () => {
//     const pathname = usePathname();

//     const router = useRouter();
//     const handleLogout = async () => {
//         const { success, error } = await authentication.signOut();
//         if (error) {
//             console.error("Error logging out:", error?.message);
//         }
//         if (success) {
//             // window.location.href = "/dashboard";
//             router.refresh();
//             router.replace("/");
//         }
//     };


//     const linksList = [
//         {
//             title: "Dashboard",
//             href: "/admin/dashboard",
//             icon: "fa-solid fa-border-all"
//         },
//         // for both admin and manager
//         {
//             title: "Blogs",
//             href: "/manager/blogs",
//             icon: "fa-solid fa-border-all"
//         },
//         {
//             title: "Services",
//             href: "/manager/services",
//             icon: "fa-solid fa-border-all"
//         },
//         // end
//         {
//             title: "Users",
//             href: "/admin/users",
//             icon: "fa-solid fa-border-all"
//         },
//         {
//             title: "My Gigs",
//             href: "/admin/gigs",
//             icon: "fa-solid fa-gear"
//         },
//         {
//             title: "Orders",
//             href: "/admin/orders",
//             icon: "fa-solid fa-gear"
//         },
//         {
//             title: "message",
//             href: "/admin/messages",
//             icon: "fa-solid fa-gear"
//         }
//     ];

//     return (
//         <div className="">
//             <div className="">
//                 <div className="w-full max-w-4xl rounded-xl border border-gray-300 p-5">
//                     {/* Profile wrapper */}
//                     <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
//                         {/* Profile image */}
//                         <div className="w-full flex items-center justify-center">
//                             <div className="w-30 h-30 rounded-full overflow-hidden border border-gray-200">
//                                 <img
//                                     src="/prawez.JPEG"
//                                     alt="profile"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-col items-center gap-4 sm:gap-6">
//                         {/* Profile info */}
//                         <div className="text-center">
//                             <div className="text-lg font-semibold text-gray-800">
//                                 Er. Prawez Alam
//                             </div>

//                             <div className="text-sm text-gray-500">
//                                 Expert Full Stack Developer
//                             </div>

//                             <div className="mt-2 text-sm text-gray-500">
//                                 +977 9804083811
//                             </div>

//                             <div className="text-sm text-gray-500">
//                                 prawezalam9@gmail.com
//                             </div>

//                             <div className="flex justify-center items-center gap-4 text-gray-500 mt-5">
//                                 <a
//                                     href="https://www.linkedin.com/in/prawez-alam/"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="hover:text-blue-600 transition-colors"
//                                     aria-label="LinkedIn"
//                                 >
//                                     <FaLinkedin className="w-5 h-5" />
//                                 </a>

//                                 <a
//                                     href="https://github.com/AlamPrawez"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="hover:text-gray-800 transition-colors"
//                                     aria-label="GitHub"
//                                 >
//                                     <FaGithub className="w-5 h-5" />
//                                 </a>

//                                 <a
//                                     href="https://gitlab.com/prawezAlam"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="hover:text-orange-600 transition-colors"
//                                     aria-label="GitLab"
//                                 >
//                                     <FaGitlab className="w-5 h-5" />
//                                 </a>
//                             </div>

//                         </div>

//                     </div>
//                     <div className="py-4 mt-4 border-t border-gray-200">
//                         {
//                             linksList.map((link) => {
//                                 const isActive = pathname === link.href;

//                                 return (
//                                     <Link
//                                         key={link.href}
//                                         href={link.href}
//                                         className={`flex items-center gap-3 ps-4 py-2 my-1 rounded-lg transition-all ${isActive
//                                             ? "bg-blue-50 text-blue-600 font-medium"
//                                             : "text-gray-600 hover:bg-gray-100"
//                                             }`}
//                                     >
//                                         <i className={`${link.icon} w-5`}></i>
//                                         <span>{link.title}</span>
//                                     </Link>
//                                 );
//                             })
//                         }
//                         <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center gap-6 ps-11 py-2 rounded-lg transition-all text-gray-600 hover:bg-gray-100"
//                         >
//                             Logout
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </div >
//     );
// };

// export default SideMenu;



