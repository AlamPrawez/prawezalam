import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';

import { PRODUCT_TYPES, typeLabel, type ProductType } from '@/@types/product';
import { cmsProduct } from '@/services/api/endpoints';

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { type: rawType } = await searchParams;
  const activeType: ProductType | 'all' = PRODUCT_TYPES.some((t) => t.value === rawType)
    ? (rawType as ProductType)
    : 'all';

  const products = await cmsProduct.fetchProductsList({ type: activeType });

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-xs font-bold transition ${
      active
        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'
    }`;

  return (
    <>
      <header className="mb-10 space-y-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Products</h1>
        <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
          Websites, web apps, mobile apps and desktop software.
        </p>
      </header>

      <nav aria-label="Filter products by type" className="mb-8 flex flex-wrap justify-center gap-2">
        <Link href="/my-products" className={chip(activeType === 'all')}>
          All
        </Link>
        {PRODUCT_TYPES.map((t) => (
          <Link key={t.value} href={`/my-products?type=${t.value}`} className={chip(activeType === t.value)}>
            {t.label}
          </Link>
        ))}
      </nav>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <Package className="mx-auto mb-3 h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-500">No products to show yet.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/my-products/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden border-b border-gray-200 bg-gray-100">
                  {p.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumbnail_url}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-300">
                      <Package className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="w-fit rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {typeLabel(p.product_type)}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900">{p.title}</h2>
                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{p.short_description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                    View details <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}