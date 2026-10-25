'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
// import { deleteProduct, listProducts } from '@/services/api/endpoints';

import { cmsProduct } from '@/services/api/endpoints';

import {
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  type ProductListItem,
  type ProductStatus,
  type ProductType,
} from '@/@types/product';
import { StatusBadge, TypeBadge } from './ProductBadges';

const PAGE_SIZE = 10;

interface Props {
  onCreate: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onNotice: (message: string, kind?: 'success' | 'error') => void;
}

export default function ProductList({ onCreate, onView, onEdit, onNotice }: Props) {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProductStatus | 'all'>('all');
  const [type, setType] = useState<ProductType | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [toDelete, setToDelete] = useState<ProductListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    cmsProduct.listProducts({ page, pageSize: PAGE_SIZE, search, status, type })
      .then(({ items, total }) => {
        if (cancelled) return;
        setItems(items);
        setTotal(total);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, search, status, type, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // If the current page became empty (e.g. last item deleted), step back.
  useEffect(() => {
    if (!loading && items.length === 0 && page > 1) setPage((p) => p - 1);
  }, [loading, items.length, page]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await cmsProduct.deleteProduct(toDelete.id);
      onNotice(`"${toDelete.title}" was deleted.`);
      setToDelete(null);
      reload();
    } catch (e) {
      onNotice((e as Error).message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const selectCls =
    'rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            <Package className="h-3 w-3" /> Products
          </div>
          <h1 className="text-xl font-extrabold text-white">
            All products <span className="text-sm font-medium text-slate-400">({total})</span>
          </h1>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title…"
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as ProductType | 'all');
            setPage(1);
          }}
          className={selectCls}
          aria-label="Filter by type"
        >
          <option value="all">All types</option>
          {PRODUCT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as ProductStatus | 'all');
            setPage(1);
          }}
          className={selectCls}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {PRODUCT_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Body */}
      {error ? (
        <div className="space-y-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-red-400" />
          <p className="text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={reload}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700"
          >
            Try again
          </button>
        </div>
      ) : loading && items.length === 0 ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="space-y-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 py-20 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-600/10 text-indigo-400">
            <Package className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              {search || status !== 'all' || type !== 'all' ? 'No products match your filters' : 'No products yet'}
            </h3>
            <p className="mx-auto max-w-sm text-xs text-slate-400">
              {search || status !== 'all' || type !== 'all'
                ? 'Try clearing the search or filters.'
                : 'Create your first product to show it on your website.'}
            </p>
          </div>
          {!search && status === 'all' && type === 'all' && (
            <button
              type="button"
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4" /> Create product
            </button>
          )}
        </div>
      ) : (
        <div className={`space-y-3 transition-opacity ${loading ? 'opacity-60' : ''}`}>
          {items.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-slate-700 sm:flex-row sm:items-center"
            >
              <div className="h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                {p.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.thumbnail_url} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-600">
                    <Package className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold text-white">{p.title}</h3>
                  <TypeBadge type={p.product_type} />
                  <StatusBadge status={p.status} />
                </div>
                <p className="line-clamp-1 text-xs text-slate-400">{p.short_description}</p>
                <p className="text-[10px] text-slate-500">
                  /{p.slug} · Updated{' '}
                  {new Date(p.updated_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onView(p.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
                >
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(p.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-bold text-indigo-300 transition hover:bg-indigo-600/30"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setToDelete(p)}
                  className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                  aria-label={`Delete ${p.title}`}
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!error && total > PAGE_SIZE && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {toDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md space-y-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-500/10 p-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-white">Delete this product?</h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-slate-200">{toDelete.title}</span> and all of its
                  download links and screenshots will be permanently removed. This can&apos;t be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setToDelete(null)}
                className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                {deleting ? 'Deleting…' : 'Delete product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}