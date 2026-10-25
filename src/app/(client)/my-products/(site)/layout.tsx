import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prawez.com').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Products',
  description: 'Websites, web apps, mobile apps and desktop software.',
  alternates: { canonical: '/my-products' },
};

export default function ProductsSiteLayout({ children }: { children: ReactNode }) {
  return (
    <section className="py-24 bg-gray-50/60 transition-colors duration-300 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}