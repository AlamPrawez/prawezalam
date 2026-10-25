'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { AlertTriangle, ArrowLeft, Download, ExternalLink, Loader2, Package, Pencil, X } from 'lucide-react';
// import { getProduct } from '@/lib/products/api';
import { platformLabel, isAppType, isWebType, type Product } from '@/@types/product';
import { StatusBadge, TypeBadge } from './ProductBadges';
import { cmsProduct } from '@/services/api/endpoints';

interface Props {
  id: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

const PROSE =
  'text-sm leading-relaxed text-slate-300 ' +
  '[&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-white ' +
  '[&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white ' +
  '[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-white ' +
  '[&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 ' +
  '[&_a]:text-indigo-400 [&_a]:underline [&_a]:underline-offset-4 ' +
  '[&_img]:my-4 [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-800 ' +
  '[&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic ' +
  '[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_code]:text-xs';

export default function ProductDetails({ id, onBack, onEdit }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setProduct(null);
    setError(null);
    cmsProduct.getProduct(id)
      .then((p) => {
        if (!cancelled) setProduct(p);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const backBtn = (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
    >
      <ArrowLeft className="h-4 w-4" /> Back to products
    </button>
  );

  if (error) {
    return (
      <div className="space-y-4">
        {backBtn}
        <div className="space-y-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-red-400" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-4">
        {backBtn}
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  const safeHtml = DOMPurify.sanitize(product.details_html, { USE_PROFILES: { html: true } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {backBtn}
        <button
          type="button"
          onClick={() => onEdit(product.id)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
        >
          <Pencil className="h-4 w-4" /> Edit product
        </button>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            {product.thumbnail_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.thumbnail_url} alt={product.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-600">
                <Package className="h-8 w-8" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={product.product_type} />
            <StatusBadge status={product.status} />
            {product.no_index && (
              <span className="rounded-full border border-slate-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                noindex
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{product.title}</h1>
          <p className="text-sm leading-relaxed text-slate-300">{product.short_description}</p>
          <p className="font-mono text-[11px] text-slate-500">/{product.slug}</p>

          {/* Distribution */}
          {isWebType(product.product_type) && product.live_url && (
            <a
              href={product.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              Visit site <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {isAppType(product.product_type) && (
            <div className="flex flex-wrap gap-2">
              {product.downloads.length === 0 ? (
                <p className="text-xs text-slate-500">No download links added.</p>
              ) : (
                product.downloads.map((d) => (
                  <a
                    key={d.id}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-slate-100 transition hover:bg-white/20"
                  >
                    <Download className="h-4 w-4 text-indigo-400" />
                    {d.label || platformLabel(d.platform)}
                    {d.version && <span className="font-normal text-slate-400">v{d.version.replace(/^v/i, '')}</span>}
                  </a>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Screenshots */}
      {product.screenshots.length > 0 && (
        <section className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Screenshots ({product.screenshots.length})
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {product.screenshots.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setLightbox(s.image_url)}
                className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition hover:border-indigo-500/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image_url}
                  alt={s.alt_text || `${product.title} screenshot`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Details */}
      {safeHtml && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Details</h2>
          <div className={PROSE} dangerouslySetInnerHTML={{ __html: safeHtml }} />
        </section>
      )}

      {/* SEO summary */}
      <section className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">SEO</h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-xs sm:grid-cols-2">
          <SeoRow label="Meta title" value={product.meta_title} />
          <SeoRow label="Canonical URL" value={product.canonical_url} />
          <SeoRow label="Meta description" value={product.meta_description} wide />
          <SeoRow
            label="Keywords"
            value={product.meta_keywords.length ? product.meta_keywords.join(', ') : null}
            wide
          />
          <SeoRow label="OG title" value={product.og_title} />
          <SeoRow label="OG image" value={product.og_image_url} />
          <SeoRow label="OG description" value={product.og_description} wide />
        </dl>
      </section>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-lg bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Screenshot preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}
    </div>
  );
}

function SeoRow({ label, value, wide }: { label: string; value: string | null; wide?: boolean }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="mb-0.5 font-semibold text-slate-500">{label}</dt>
      <dd className="break-words text-slate-200">{value || <span className="text-slate-600">—</span>}</dd>
    </div>
  );
}