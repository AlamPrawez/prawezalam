import { typeLabel, type ProductStatus, type ProductType } from '@/@types/product';

const STATUS_STYLES: Record<ProductStatus, string> = {
  published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  draft: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  archived: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export function TypeBadge({ type }: { type: ProductType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
      {typeLabel(type)}
    </span>
  );
}