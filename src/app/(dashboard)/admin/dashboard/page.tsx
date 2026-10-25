"use client"

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ClipboardList,
    FileText,
    Briefcase,
    MessageSquare,
    Package,
    RefreshCw,
    type LucideIcon,
} from "lucide-react";
import { cmsDashboard, DashboardCounts } from "@/services/api/endpoints";
// ↓ import from the file that exports cmsBlog / cmsService / cmsProduct

interface StatCard {
    key: keyof DashboardCounts;
    label: string;
    icon: LucideIcon;
    iconClass: string;
    href: string; // ← adjust to your dashboard routes
    sub: (c: DashboardCounts) => string | null;
}

const draftsText = (total: number | null, published: number | null) =>
    total === null || published === null
        ? null
        : `${published} published · ${Math.max(total - published, 0)} draft`;

const CARDS: StatCard[] = [
    {
        key: "blogs",
        label: "Blogs",
        icon: FileText,
        iconClass: "bg-indigo-50 text-indigo-600",
        href: "/manager/blogs",
        sub: (c) => draftsText(c.blogs.total, c.blogs.published),
    },
    {
        key: "services",
        label: "Services",
        icon: Briefcase,
        iconClass: "bg-emerald-50 text-emerald-600",
        href: "/manager/services",
        sub: (c) => draftsText(c.services.total, c.services.published),
    },
    {
        key: "products",
        label: "Products",
        icon: Package,
        iconClass: "bg-amber-50 text-amber-600",
        href: "/manager/products",
        sub: (c) => draftsText(c.products.total, c.products.published),
    },
    {
        key: "orders",
        label: "Hire requests",
        icon: ClipboardList,
        iconClass: "bg-sky-50 text-sky-600",
        href: "/manager/orders",
        sub: () => "Total received",
    },
    {
        key: "messages",
        label: "Messages",
        icon: MessageSquare,
        iconClass: "bg-rose-50 text-rose-600",
        href: "/manager/messages",
        sub: () => "Contact inquiries",
    },
];

export default function AdminBoard() {
    const [counts, setCounts] = useState<DashboardCounts | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setCounts(await cmsDashboard.getCounts());
        } catch (e) {
            setError((e as Error).message || "Could not load dashboard numbers.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <>
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
                <h1 className="font-bold">Admin Panel</h1>
                <h2 className="text-2xl font-semibold">Dashboard !!</h2>
                <p className="text-gray-600 mt-2">Welcome to your protected admin area.</p>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Overview</h3>
                <button
                    type="button"
                    onClick={load}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {error && (
                <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {CARDS.map((card) => {
                    const Icon = card.icon;
                    const total = counts?.[card.key].total ?? null;

                    return (
                        <Link
                            key={card.key}
                            href={card.href}
                            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className={`rounded-lg p-2.5 ${card.iconClass}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <ArrowRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-500" />
                            </div>

                            <p className="mt-4 text-sm font-medium text-gray-500">{card.label}</p>

                            {loading && !counts ? (
                                <div className="mt-1 h-9 w-16 animate-pulse rounded bg-gray-100" />
                            ) : (
                                <p className="mt-1 text-3xl font-bold text-gray-900">
                                    {total === null ? "—" : total.toLocaleString()}
                                </p>
                            )}

                            <p className="mt-1 min-h-4 text-xs text-gray-500">
                                {counts ? card.sub(counts) : ""}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}