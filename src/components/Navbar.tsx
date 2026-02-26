"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
    { label: "Hire for tasks", href: "/hire_for_tasks" },
    { label: "Home", href: "/#home" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link
                    href="/#home"
                    className="text-xl font-bold text-gray-900"
                >
                    Prawez
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center space-x-8 md:flex">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        {open ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <ul className="flex flex-col space-y-4 px-4 py-6">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;