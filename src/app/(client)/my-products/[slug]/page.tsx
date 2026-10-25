import { cache } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

import { isAppType, isWebType, platformLabel, typeLabel } from '@/@types/product';
import { cmsProduct } from '@/services/api/endpoints';
import ScreenshotCarousel from '@/components/client/products/ScreenshotCarousel';

export const revalidate = 60;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prawez.com').replace(/\/$/, '');

interface PageProps {
  params: Promise<{ slug: string }>;
}

// One DB call per request, shared by generateMetadata and the page.
const getProduct = cache((slug: string) => cmsProduct.getProductBySlug(slug));

export async function generateStaticParams() {
  try {
    const rows = await cmsProduct.productsSitemapGenerator();
    return (rows ?? []).map((r) => ({ slug: r.slug as string }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Product not found', robots: { index: false, follow: false } };

  const title = product.meta_title || product.title;
  const description = product.meta_description || product.short_description;
  const url = product.canonical_url || `${SITE_URL}/my-products/${product.slug}`;
  const image = product.og_image_url || product.thumbnail_url || undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: product.meta_keywords.length ? product.meta_keywords : undefined,
    alternates: { canonical: url },
    robots: product.no_index ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title: product.og_title || title,
      description: product.og_description || description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: product.og_title || title,
      description: product.og_description || description,
      images: image ? [image] : undefined,
    },
  };
}

const PROSE =
  'text-base leading-relaxed text-gray-600 ' +
  '[&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-gray-900 ' +
  '[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 ' +
  '[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 ' +
  '[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1.5 ' +
  '[&_a]:text-indigo-600 [&_a]:underline [&_a]:underline-offset-4 ' +
  '[&_img]:my-5 [&_img]:rounded-2xl [&_img]:border [&_img]:border-gray-200 ' +
  '[&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic ' +
  '[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-gray-100 [&_pre]:p-4 [&_code]:text-sm';

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const normalizedHtml = product.details_html 
        ? product.details_html.replace(/&nbsp;|\u00A0/g, ' ') 
        : '';


  const safeHtml = DOMPurify.sanitize(normalizedHtml, { USE_PROFILES: { html: true } });
  const pageUrl = `${SITE_URL}/my-products/${product.slug}`;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type':
      product.product_type === 'website'
        ? 'WebSite'
        : product.product_type === 'web_app'
          ? 'WebApplication'
          : 'SoftwareApplication',
    name: product.title,
    description: product.meta_description || product.short_description,
    url: pageUrl,
    ...(product.thumbnail_url ? { image: product.thumbnail_url } : {}),
    ...(product.product_type === 'mobile_app' || product.product_type === 'desktop_app'
      ? {
          applicationCategory: 'Application',
          operatingSystem: Array.from(new Set(product.downloads.map((d) => platformLabel(d.platform)))).join(', ') || undefined,
        }
      : {}),
  };

  return (
    <section className="py-24 bg-gray-50/60 transition-colors duration-300 font-sans">
      <script
        type="application/ld+json"
        // "<" is escaped so content can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <article className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href="/my-products"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> All products
        </Link>

        {/* Hero */}
        <header className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <span className="inline-block rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              {typeLabel(product.product_type)}
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">{product.title}</h1>
            <p className="text-lg leading-relaxed text-gray-600">{product.short_description}</p>

            {isWebType(product.product_type) && product.live_url && (
              <a
                href={product.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                Visit {product.product_type === 'website' ? 'website' : 'app'} <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {isAppType(product.product_type) && product.downloads.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">Download for</p>
                <div className="flex flex-wrap gap-3">
                  {product.downloads.map((d) => (
                    <a
                      key={d.id}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:border-indigo-300 hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4 text-indigo-600" />
                      {d.label || platformLabel(d.platform)}
                      {d.version && (
                        <span className="text-xs font-normal text-gray-500">v{d.version.replace(/^v/i, '')}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {product.thumbnail_url && (
            <div className="aspect-video overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.thumbnail_url} alt={product.title} className="h-full w-full object-cover" />
            </div>
          )}
        </header>

        {/* Screenshots */}
        {product.screenshots.length > 0 && (
          <section aria-label="Screenshots" className="mt-14">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Screenshots</h2>
            <ScreenshotCarousel
              images={product.screenshots.map((s, i) => ({
                url: s.image_url,
                alt: s.alt_text || `${product.title} screenshot ${i + 1}`,
              }))}
            />
          </section>
        )}

        {/* Details */}
        {safeHtml && (
          <section aria-label="Details" className="mt-14 max-w-none [overflow-wrap:break-word] [word-break:normal]">
            <div className={`${PROSE} max-w-none [overflow-wrap:break-word] [word-break:normal]`} dangerouslySetInnerHTML={{ __html: safeHtml }} />
          </section>
        )}
      </article>
    </section>
  );
}