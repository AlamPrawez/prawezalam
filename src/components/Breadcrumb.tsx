"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname(); // e.g. /dashboard/orders/123
  const segments = pathname.split("/").filter(Boolean);

  const buildHref = (index: number) =>
    "/" + segments.slice(0, index + 1).join("/");

  const formatLabel = (segment: string) =>
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav className="text-sm text-gray-500 mb-2">
      <ol className="flex items-center flex-wrap">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-gray-800 font-medium">
                  {formatLabel(segment)}
                </span>
              ) : (
                <Link
                  href={buildHref(index)}
                  className="hover:text-gray-700 transition"
                >
                  {formatLabel(segment)}
                </Link>
              )}

              {!isLast && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}