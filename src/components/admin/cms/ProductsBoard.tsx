'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle2, Loader2, X } from 'lucide-react';
// import { getProduct } from '@/lib/products/api';
import type { Product } from '@/@types/product';
import ProductDetails from './ProductDetails';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { cmsProduct } from '@/services/api/endpoints';

type View =
  | { mode: 'list' }
  | { mode: 'create' }
  | { mode: 'view'; id: string }
  | { mode: 'edit'; id: string };

interface Notice {
  id: number;
  message: string;
  kind: 'success' | 'error';
}

export default function ProductsBoard() {
  const [view, setView] = useState<View>({ mode: 'list' });
  const [notice, setNotice] = useState<Notice | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotice = useCallback((message: string, kind: 'success' | 'error' = 'success') => {
    if (timer.current) clearTimeout(timer.current);
    setNotice({ id: Date.now(), message, kind });
    timer.current = setTimeout(() => setNotice(null), 4500);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const goList = () => setView({ mode: 'list' });

  return (
    <div className="relative mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-950 p-4 text-slate-100 shadow-2xl sm:p-8">
      {view.mode === 'list' && (
        <ProductList
          onCreate={() => setView({ mode: 'create' })}
          onView={(id) => setView({ mode: 'view', id })}
          onEdit={(id) => setView({ mode: 'edit', id })}
          onNotice={showNotice}
        />
      )}

      {view.mode === 'create' && (
        <ProductForm
          onCancel={goList}
          onSaved={() => {
            showNotice('Product created.');
            goList();
          }}
        />
      )}

      {view.mode === 'edit' && (
        <EditLoader
          id={view.id}
          onCancel={goList}
          onSaved={() => {
            showNotice('Product updated.');
            goList();
          }}
        />
      )}

      {view.mode === 'view' && (
        <ProductDetails
          id={view.id}
          onBack={goList}
          onEdit={(id) => setView({ mode: 'edit', id })}
        />
      )}

      {/* Toast */}
      {notice && (
        <div
          key={notice.id}
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md ${
            notice.kind === 'success'
              ? 'border-emerald-500/30 bg-emerald-950/90 text-emerald-200'
              : 'border-red-500/30 bg-red-950/90 text-red-200'
          }`}
        >
          {notice.kind === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          )}
          <p className="text-xs font-medium">{notice.message}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="ml-1 shrink-0 text-current opacity-60 transition hover:opacity-100"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

/** Loads the product, then mounts the form with it as `initial`. */
function EditLoader({
  id,
  onCancel,
  onSaved,
}: {
  id: string;
  onCancel: () => void;
  onSaved: (id: string, mode: 'created' | 'updated') => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to products
        </button>
        <div className="space-y-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-red-400" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return <ProductForm initial={product} onCancel={onCancel} onSaved={onSaved} />;
}