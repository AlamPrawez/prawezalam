'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import {
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  isAppType,
  isWebType,
  platformKind,
  platformsFor,
  type DownloadPlatform,
  type Product,
  type ProductStatus,
  type ProductType,
} from '@/@types/product';

import 'react-quill-new/dist/quill.snow.css';
import { cmsProduct, SaveProductInput } from '@/services/api/endpoints';

// Quill touches `document`, so it must only load in the browser.
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-[340px] animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
  ),
});

// ---------------------------------------------------------------------
// Constants & helpers
// ---------------------------------------------------------------------
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'];
const MAX_SCREENSHOTS = 12;
const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const inputCls =
  'w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500';
const labelCls = 'mb-1 flex items-center justify-between text-[11px] font-semibold uppercase text-slate-400';
const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60';

const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const parseKeywords = (raw: string) =>
  Array.from(
    new Set(
      raw
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
    )
  ).slice(0, 15);

const emptyToNull = (v: string) => (v.trim() ? v.trim() : null);

function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return `${file.name}: only PNG, JPG, WebP, AVIF or GIF images are allowed.`;
  if (file.size > MAX_IMAGE_BYTES) return `${file.name}: image must be 5 MB or smaller.`;
  return null;
}

// Rich-text editor config. Images and video are intentionally NOT available:
// they are missing from the toolbar AND from `formats`, so pasted or dropped
// images are stripped too.
const QUILL_MODULES = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    ['link'],
    ['clean'],
  ],
};

const QUILL_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'blockquote',
  'link',
];

// Quill represents an empty document as <p><br></p>; store that as ''.
const normalizeQuillHtml = (html: string) => (html === '<p><br></p>' ? '' : html);

// Dark theme for the Quill snow UI, scoped to this wrapper.
const QUILL_THEME =
  '[&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-slate-800 [&_.ql-toolbar]:bg-slate-900 ' +
  '[&_.ql-container]:rounded-b-xl [&_.ql-container]:border-slate-800 [&_.ql-container]:bg-slate-900 ' +
  '[&_.ql-editor]:min-h-[280px] [&_.ql-editor]:max-h-[520px] [&_.ql-editor]:overflow-y-auto ' +
  '[&_.ql-editor]:text-sm [&_.ql-editor]:leading-relaxed [&_.ql-editor]:text-slate-100 ' +
  '[&_.ql-editor.ql-blank::before]:text-slate-600! [&_.ql-editor.ql-blank::before]:not-italic ' +
  '[&_.ql-stroke]:stroke-slate-300! [&_.ql-fill]:fill-slate-300! ' +
  '[&_.ql-picker]:text-slate-300! [&_.ql-picker-options]:border-slate-700! [&_.ql-picker-options]:bg-slate-900! ' +
  '[&_button:hover_.ql-stroke]:stroke-indigo-400! [&_button.ql-active_.ql-stroke]:stroke-indigo-400! ' +
  '[&_button:hover_.ql-fill]:fill-indigo-400! [&_button.ql-active_.ql-fill]:fill-indigo-400! ' +
  '[&_.ql-tooltip]:border-slate-700! [&_.ql-tooltip]:bg-slate-900! [&_.ql-tooltip]:text-slate-200! ' +
  '[&_.ql-tooltip_input]:border-slate-700! [&_.ql-tooltip_input]:bg-slate-950! [&_.ql-tooltip_input]:text-white!';

interface ImageDraft {
  key: string;
  url: string; // public URL or blob: preview URL
  path: string | null; // storage path for already-uploaded images
  file: File | null; // set only for new, not-yet-uploaded images
  alt: string;
}

interface DownloadRow {
  platform: DownloadPlatform;
  label: string;
  url: string;
  version: string;
}

interface FormValues {
  title: string;
  slug: string;
  short_description: string;
  details_html: string;
  product_type: ProductType;
  status: ProductStatus;
  live_url: string;
  downloads: DownloadRow[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  no_index: boolean;
}

const blankDownload = (type: ProductType): DownloadRow => ({
  platform: platformsFor(type)[0]?.value ?? 'other',
  label: '',
  url: '',
  version: '',
});

function toDefaults(p?: Product | null): FormValues {
  if (!p) {
    return {
      title: '',
      slug: '',
      short_description: '',
      details_html: '',
      product_type: 'website',
      status: 'draft',
      live_url: '',
      downloads: [],
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      canonical_url: '',
      og_title: '',
      og_description: '',
      og_image_url: '',
      no_index: false,
    };
  }
  return {
    title: p.title,
    slug: p.slug,
    short_description: p.short_description,
    details_html: p.details_html,
    product_type: p.product_type,
    status: p.status,
    live_url: p.live_url ?? '',
    downloads: p.downloads.map((d) => ({
      platform: d.platform,
      label: d.label ?? '',
      url: d.url,
      version: d.version ?? '',
    })),
    meta_title: p.meta_title ?? '',
    meta_description: p.meta_description ?? '',
    meta_keywords: p.meta_keywords.join(', '),
    canonical_url: p.canonical_url ?? '',
    og_title: p.og_title ?? '',
    og_description: p.og_description ?? '',
    og_image_url: p.og_image_url ?? '',
    no_index: p.no_index,
  };
}

// ---------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------
function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-white">{title}</h2>
        {description && <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-[11px] text-red-400">{msg}</p> : null;
}

function Counter({ value, max }: { value: string; max: number }) {
  const n = value?.length ?? 0;
  return (
    <span className={`text-[10px] font-normal normal-case ${n > max ? 'text-amber-400' : 'text-slate-500'}`}>
      {n}/{max}
    </span>
  );
}

// ---------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------
interface Props {
  initial?: Product | null;
  onCancel: () => void;
  onSaved: (id: string, mode: 'created' | 'updated') => void;
}

export default function ProductForm({ initial = null, onCancel, onSaved }: Props) {
  const defaults = useMemo(() => toDefaults(initial), [initial]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: defaults });

  const { fields, append, remove, replace } = useFieldArray({ control, name: 'downloads' });

  const title = watch('title');
  const slug = watch('slug');
  const productType = watch('product_type');
  const shortDescription = watch('short_description');
  const metaTitle = watch('meta_title');
  const metaDescription = watch('meta_description');

  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [thumb, setThumb] = useState<ImageDraft | null>(
    initial?.thumbnail_url
      ? { key: 'thumb', url: initial.thumbnail_url, path: initial.thumbnail_path, file: null, alt: '' }
      : null
  );
  const [shots, setShots] = useState<ImageDraft[]>(
    () =>
      initial?.screenshots.map((s) => ({
        key: s.id,
        url: s.image_url,
        path: s.storage_path,
        file: null,
        alt: s.alt_text ?? '',
      })) ?? []
  );
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Track blob preview URLs so they are always revoked.
  const blobUrls = useRef<Set<string>>(new Set());
  useEffect(() => {
    const urls = blobUrls.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls.clear();
    };
  }, []);

  const makeDraft = (file: File): ImageDraft => {
    const url = URL.createObjectURL(file);
    blobUrls.current.add(url);
    return { key: crypto.randomUUID(), url, path: null, file, alt: '' };
  };

  const releaseDraft = (d: ImageDraft | null) => {
    if (d?.file && blobUrls.current.has(d.url)) {
      URL.revokeObjectURL(d.url);
      blobUrls.current.delete(d.url);
    }
  };

  // Auto-generate slug from title until the user edits the slug manually.
  useEffect(() => {
    if (!slugTouched) setValue('slug', slugify(title ?? ''));
  }, [title, slugTouched, setValue]);

  // Reset download rows when switching between mobile / desktop / web.
  const prevType = useRef<ProductType>(defaults.product_type);
  const handleTypeChange = (next: ProductType) => {
    if (platformKind(prevType.current) !== platformKind(next)) {
      replace(isAppType(next) ? [blankDownload(next)] : []);
    }
    prevType.current = next;
  };

  // ---- images ----
  const handleThumbnail = (file: File | undefined) => {
    if (!file) return;
    const err = validateImage(file);
    if (err) {
      setImageErrors([err]);
      return;
    }
    setImageErrors([]);
    releaseDraft(thumb);
    setThumb(makeDraft(file));
  };

  const addScreenshots = (list: FileList | File[]) => {
    const files = Array.from(list);
    const room = MAX_SCREENSHOTS - shots.length;
    const errs: string[] = [];
    const accepted: ImageDraft[] = [];

    for (const file of files) {
      if (accepted.length >= room) {
        errs.push(`Only ${MAX_SCREENSHOTS} screenshots are allowed per product.`);
        break;
      }
      const err = validateImage(file);
      if (err) errs.push(err);
      else accepted.push(makeDraft(file));
    }
    setImageErrors(errs);
    if (accepted.length) setShots((prev) => [...prev, ...accepted]);
  };

  const moveShot = (index: number, dir: -1 | 1) => {
    setShots((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeShot = (index: number) => {
    setShots((prev) => {
      releaseDraft(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ---- submit ----
  const onSubmit = async (values: FormValues) => {
    setFormError(null);

    const downloads = isAppType(values.product_type) ? values.downloads.filter((d) => d.url.trim()) : [];
    if (isAppType(values.product_type) && downloads.length === 0) {
      setFormError('Add at least one download link for this app.');
      return;
    }
    if (values.status === 'published' && !thumb) {
      setFormError('A thumbnail is required before a product can be published.');
      return;
    }

    setSubmitting(true);
    const productId = initial?.id ?? crypto.randomUUID();
    const uploadedPaths: string[] = []; // for rollback if the save fails

    try {
      // Thumbnail
      let thumbnailUrl = thumb?.url ?? null;
      let thumbnailPath = thumb?.path ?? null;
      if (thumb?.file) {
        setProgress('Uploading thumbnail…');
        const up = await cmsProduct.uploadImage(productId, thumb.file, 'thumbnail');
        uploadedPaths.push(up.path);
        thumbnailUrl = up.url;
        thumbnailPath = up.path;
      }

      // Screenshots (sequential: predictable order + simple rollback)
      const screenshots: SaveProductInput['screenshots'] = [];
      for (let i = 0; i < shots.length; i++) {
        const s = shots[i];
        let imageUrl = s.url;
        let storagePath = s.path;
        if (s.file) {
          setProgress(`Uploading screenshot ${i + 1} of ${shots.length}…`);
          const up = await cmsProduct.uploadImage(productId, s.file, 'screenshots');
          uploadedPaths.push(up.path);
          imageUrl = up.url;
          storagePath = up.path;
        }
        screenshots.push({
          image_url: imageUrl,
          storage_path: storagePath as string,
          alt_text: emptyToNull(s.alt),
          sort_order: i,
        });
      }

      setProgress('Saving…');
      await cmsProduct.saveProduct({
        id: productId,
        slug: values.slug.trim(),
        title: values.title.trim(),
        short_description: values.short_description.trim(),
        details_html: values.details_html,
        product_type: values.product_type,
        status: values.status,
        live_url: isWebType(values.product_type) ? emptyToNull(values.live_url) : null,
        thumbnail_url: thumbnailUrl,
        thumbnail_path: thumbnailPath,
        meta_title: emptyToNull(values.meta_title),
        meta_description: emptyToNull(values.meta_description),
        meta_keywords: parseKeywords(values.meta_keywords),
        canonical_url: emptyToNull(values.canonical_url),
        og_title: emptyToNull(values.og_title),
        og_description: emptyToNull(values.og_description),
        og_image_url: emptyToNull(values.og_image_url),
        no_index: values.no_index,
        downloads: downloads.map((d, i) => ({
          platform: d.platform,
          label: emptyToNull(d.label),
          url: d.url.trim(),
          version: emptyToNull(d.version),
          sort_order: i,
        })),
        screenshots,
      });

      // Remove files that are no longer referenced (replaced / deleted images).
      const keep = new Set<string>([thumbnailPath ?? '', ...screenshots.map((s) => s.storage_path)]);
      const previous = [initial?.thumbnail_path ?? '', ...(initial?.screenshots.map((s) => s.storage_path) ?? [])];
      await cmsProduct.removeImages(previous.filter((p) => p && !keep.has(p)));

      onSaved(productId, initial ? 'updated' : 'created');
    } catch (e) {
      await cmsProduct.removeImages(uploadedPaths); // roll back this attempt's uploads
      setFormError((e as Error).message || 'Could not save the product.');
    } finally {
      setSubmitting(false);
      setProgress(null);
    }
  };

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prawez.com').replace(/\/$/, '');
  const platformOptions = platformsFor(productType);

  return (
    <form id="product-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Sticky header */}
      <div className="sticky top-4 z-30 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
            aria-label="Back to products"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              {initial ? 'Edit product' : 'New product'}
            </p>
            <h1 className="max-w-xs truncate text-lg font-extrabold text-white">
              {title?.trim() || 'Untitled product'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {progress && <span className="text-[11px] text-slate-400">{progress}</span>}
          <button type="submit" disabled={submitting} className={btnPrimary}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {initial ? 'Save changes' : 'Create product'}
          </button>
        </div>
      </div>

      {formError && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-300">{formError}</p>
        </div>
      )}

      {imageErrors.length > 0 && (
        <div role="alert" className="space-y-1 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          {imageErrors.map((e) => (
            <p key={e} className="text-xs text-amber-300">
              {e}
            </p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ============ LEFT COLUMN ============ */}
        <div className="space-y-6 lg:col-span-8">
          {/* Content */}
          <Card title="Content" description="What visitors will read about this product.">
            <div>
              <label className={labelCls} htmlFor="title">
                <span>Title</span>
              </label>
              <input
                id="title"
                type="text"
                maxLength={160}
                placeholder="e.g. QuantumPOS"
                className={inputCls}
                {...register('title', {
                  required: 'Title is required.',
                  minLength: { value: 2, message: 'Title must be at least 2 characters.' },
                })}
              />
              <FieldError msg={errors.title?.message} />
            </div>

            <div>
              <label className={labelCls} htmlFor="short_description">
                <span>Short description</span>
                <Counter value={shortDescription ?? ''} max={300} />
              </label>
              <textarea
                id="short_description"
                rows={3}
                maxLength={300}
                placeholder="One or two sentences shown on cards and in listings."
                className={`${inputCls} resize-none`}
                {...register('short_description', { required: 'Short description is required.' })}
              />
              <FieldError msg={errors.short_description?.message} />
            </div>

            <div>
              <label className={labelCls}>
                <span>Detailed description</span>
                <span className="text-[9px] font-normal normal-case text-indigo-400">Rich text</span>
              </label>
              <div className={QUILL_THEME}>
                <Controller
                  name="details_html"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={(html: string) => field.onChange(normalizeQuillHtml(html))}
                      modules={QUILL_MODULES}
                      formats={QUILL_FORMATS}
                      placeholder="Describe the product, key features, and use cases…"
                    />
                  )}
                />
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                Images can&apos;t be added here (use Screenshots). Content is sanitized when displayed.
              </p>
            </div>
          </Card>

          {/* Distribution */}
          <Card
            title={isWebType(productType) ? 'Website link' : 'Downloads'}
            description={
              isWebType(productType)
                ? 'Visitors will be sent to this site.'
                : productType === 'mobile_app'
                  ? 'Add a store or direct link for each mobile platform.'
                  : 'Add a download link for each desktop platform.'
            }
          >
            {isWebType(productType) ? (
              <div>
                <label className={labelCls} htmlFor="live_url">
                  <span>Live URL</span>
                </label>
                <input
                  id="live_url"
                  type="url"
                  placeholder="https://example.com"
                  className={inputCls}
                  {...register('live_url', {
                    validate: (v) => {
                      if (!isWebType(getValues('product_type'))) return true;
                      if (!v.trim()) return 'A live URL is required for websites and web apps.';
                      return URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.';
                    },
                  })}
                />
                <FieldError msg={errors.live_url?.message} />
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((field, i) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 items-start gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 sm:grid-cols-12"
                  >
                    <div className="sm:col-span-3">
                      <select
                        aria-label="Platform"
                        className={inputCls}
                        {...register(`downloads.${i}.platform` as const, { required: true })}
                      >
                        {platformOptions.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        maxLength={80}
                        placeholder="Label (e.g. Google Play)"
                        className={inputCls}
                        {...register(`downloads.${i}.label` as const)}
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <input
                        type="url"
                        placeholder="https://…"
                        className={`${inputCls} font-mono`}
                        {...register(`downloads.${i}.url` as const, {
                          validate: (v) => !v.trim() || URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.',
                        })}
                      />
                      <FieldError msg={errors.downloads?.[i]?.url?.message} />
                    </div>
                    <div className="flex items-center gap-1 sm:col-span-2">
                      <input
                        type="text"
                        maxLength={40}
                        placeholder="v1.0.0"
                        className={inputCls}
                        {...register(`downloads.${i}.version` as const)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="shrink-0 rounded-lg p-2 text-red-400 transition hover:bg-red-500/20"
                        aria-label="Remove download"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {fields.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950 p-4 text-center text-xs text-slate-500">
                    No download links yet.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => append(blankDownload(productType))}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md transition hover:bg-indigo-500"
                >
                  <Plus className="h-3.5 w-3.5" /> Add platform
                </button>
              </div>
            )}
          </Card>

          {/* Screenshots */}
          <Card
            title={`Screenshots (${shots.length}/${MAX_SCREENSHOTS})`}
            description="PNG, JPG, WebP, AVIF or GIF · up to 5 MB each. The first screenshot is shown first."
          >
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addScreenshots(e.dataTransfer.files);
              }}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center transition hover:border-indigo-500/60"
            >
              <Upload className="h-5 w-5 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-200">Click to upload or drag &amp; drop</span>
              <span className="text-[10px] text-slate-500">You can select multiple images at once</span>
              <input
                type="file"
                multiple
                accept={ALLOWED_IMAGE_TYPES.join(',')}
                className="sr-only"
                disabled={shots.length >= MAX_SCREENSHOTS}
                onChange={(e) => {
                  if (e.target.files) addScreenshots(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>

            {shots.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {shots.map((s, i) => (
                  <div key={s.key} className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.url} alt={s.alt || `Screenshot ${i + 1}`} className="h-full w-full object-cover" />
                      <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        #{i + 1}
                      </span>
                      {s.file && (
                        <span className="absolute right-2 top-2 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        maxLength={200}
                        value={s.alt}
                        onChange={(e) =>
                          setShots((prev) => prev.map((x, idx) => (idx === i ? { ...x, alt: e.target.value } : x)))
                        }
                        placeholder="Alt text (describe the image)"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={() => moveShot(i, -1)}
                        className="rounded-lg bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800 disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={i === shots.length - 1}
                        onClick={() => moveShot(i, 1)}
                        className="rounded-lg bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800 disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeShot(i)}
                        className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/20"
                        aria-label="Remove screenshot"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* SEO */}
          <Card title="SEO" description="Controls how this product appears in search results and when shared.">
            {/* SERP preview */}
            <div className="space-y-0.5 rounded-xl border border-slate-800 bg-white p-4">
              <p className="truncate text-[11px] text-slate-600">
                {siteUrl}/products/{slug || 'your-slug'}
              </p>
              <p className="truncate text-base font-medium text-[#1a0dab]">
                {metaTitle?.trim() || title?.trim() || 'Product title'}
              </p>
              <p className="line-clamp-2 text-xs text-slate-700">
                {metaDescription?.trim() || shortDescription?.trim() || 'Your meta description will appear here.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="meta_title">
                  <span>Meta title</span>
                  <Counter value={metaTitle ?? ''} max={60} />
                </label>
                <input
                  id="meta_title"
                  type="text"
                  maxLength={70}
                  placeholder="Falls back to the product title"
                  className={inputCls}
                  {...register('meta_title')}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="meta_description">
                  <span>Meta description</span>
                  <Counter value={metaDescription ?? ''} max={160} />
                </label>
                <textarea
                  id="meta_description"
                  rows={3}
                  maxLength={170}
                  placeholder="Falls back to the short description"
                  className={`${inputCls} resize-none`}
                  {...register('meta_description')}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="meta_keywords">
                  <span>Keywords</span>
                  <span className="text-[9px] font-normal normal-case text-slate-500">comma separated · max 15</span>
                </label>
                <input
                  id="meta_keywords"
                  type="text"
                  placeholder="pos software, point of sale, retail"
                  className={inputCls}
                  {...register('meta_keywords')}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="canonical_url">
                  <span>Canonical URL</span>
                </label>
                <input
                  id="canonical_url"
                  type="url"
                  placeholder="https://… (leave empty to use the default page URL)"
                  className={`${inputCls} font-mono`}
                  {...register('canonical_url', {
                    validate: (v) => !v.trim() || URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.',
                  })}
                />
                <FieldError msg={errors.canonical_url?.message} />
              </div>

              <div>
                <label className={labelCls} htmlFor="og_title">
                  <span>Open Graph title</span>
                </label>
                <input id="og_title" type="text" maxLength={100} className={inputCls} {...register('og_title')} />
              </div>

              <div>
                <label className={labelCls} htmlFor="og_image_url">
                  <span>Open Graph image URL</span>
                </label>
                <input
                  id="og_image_url"
                  type="url"
                  placeholder="Falls back to the thumbnail"
                  className={`${inputCls} font-mono`}
                  {...register('og_image_url', {
                    validate: (v) => !v.trim() || URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.',
                  })}
                />
                <FieldError msg={errors.og_image_url?.message} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="og_description">
                  <span>Open Graph description</span>
                </label>
                <textarea
                  id="og_description"
                  rows={2}
                  maxLength={220}
                  className={`${inputCls} resize-none`}
                  {...register('og_description')}
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300 sm:col-span-2">
                <input type="checkbox" className="h-4 w-4 accent-indigo-500" {...register('no_index')} />
                Hide from search engines (<code className="text-[11px] text-slate-400">noindex</code>)
              </label>
            </div>
          </Card>
        </div>

        {/* ============ RIGHT COLUMN ============ */}
        <div className="space-y-6 lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Card title="Publishing">
              <div>
                <label className={labelCls} htmlFor="status">
                  <span>Status</span>
                </label>
                <select id="status" className={inputCls} {...register('status')}>
                  {PRODUCT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls} htmlFor="product_type">
                  <span>Product type</span>
                </label>
                <select
                  id="product_type"
                  className={inputCls}
                  {...register('product_type', {
                    onChange: (e) => handleTypeChange(e.target.value as ProductType),
                  })}
                >
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls} htmlFor="slug">
                  <span>Slug</span>
                  {!slugTouched && <span className="text-[9px] font-normal normal-case text-indigo-400">auto</span>}
                </label>
                <input
                  id="slug"
                  type="text"
                  maxLength={100}
                  className={`${inputCls} font-mono`}
                  {...register('slug', {
                    required: 'Slug is required.',
                    pattern: { value: SLUG_RE, message: 'Use lowercase letters, numbers and single hyphens only.' },
                    onChange: () => setSlugTouched(true),
                  })}
                />
                <FieldError msg={errors.slug?.message} />
              </div>
            </Card>

            <Card title="Thumbnail" description="Shown on cards and as the default social image.">
              {thumb ? (
                <div className="space-y-3">
                  <div className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb.url} alt="Thumbnail preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700">
                      <Upload className="h-3.5 w-3.5" /> Replace
                      <input
                        type="file"
                        accept={ALLOWED_IMAGE_TYPES.join(',')}
                        className="sr-only"
                        onChange={(e) => {
                          handleThumbnail(e.target.files?.[0]);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        releaseDraft(thumb);
                        setThumb(null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
                    >
                      <X className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-950 text-center transition hover:border-indigo-500/60">
                  <ImagePlus className="h-5 w-5 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-200">Upload thumbnail</span>
                  <span className="text-[10px] text-slate-500">16:9 recommended</span>
                  <input
                    type="file"
                    accept={ALLOWED_IMAGE_TYPES.join(',')}
                    className="sr-only"
                    onChange={(e) => {
                      handleThumbnail(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                </label>
              )}
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
// 'use client';

// import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
// import { useFieldArray, useForm } from 'react-hook-form';
// import {
//   AlertTriangle,
//   ArrowDown,
//   ArrowLeft,
//   ArrowUp,
//   ImagePlus,
//   Loader2,
//   Plus,
//   Save,
//   Trash2,
//   Upload,
//   X,
// } from 'lucide-react';
// // import { removeImages, saveProduct, uploadImage, type SaveProductInput } from '@/lib/products/api';

// import { cmsProduct, SaveProductInput } from '@/services/api/endpoints';

// import {
//   PRODUCT_STATUSES,
//   PRODUCT_TYPES,
//   isAppType,
//   isWebType,
//   platformKind,
//   platformsFor,
//   type DownloadPlatform,
//   type Product,
//   type ProductStatus,
//   type ProductType,
// } from '@/@types/product';

// // ---------------------------------------------------------------------
// // Constants & helpers
// // ---------------------------------------------------------------------
// const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
// const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'];
// const MAX_SCREENSHOTS = 12;
// const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
// const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// const inputCls =
//   'w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500';
// const labelCls = 'mb-1 flex items-center justify-between text-[11px] font-semibold uppercase text-slate-400';
// const btnPrimary =
//   'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60';

// const slugify = (v: string) =>
//   v
//     .toLowerCase()
//     .normalize('NFKD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '')
//     .slice(0, 80);

// const parseKeywords = (raw: string) =>
//   Array.from(
//     new Set(
//       raw
//         .split(',')
//         .map((k) => k.trim())
//         .filter(Boolean)
//     )
//   ).slice(0, 15);

// const emptyToNull = (v: string) => (v.trim() ? v.trim() : null);

// function validateImage(file: File): string | null {
//   if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return `${file.name}: only PNG, JPG, WebP, AVIF or GIF images are allowed.`;
//   if (file.size > MAX_IMAGE_BYTES) return `${file.name}: image must be 5 MB or smaller.`;
//   return null;
// }

// interface ImageDraft {
//   key: string;
//   url: string; // public URL or blob: preview URL
//   path: string | null; // storage path for already-uploaded images
//   file: File | null; // set only for new, not-yet-uploaded images
//   alt: string;
// }

// interface DownloadRow {
//   platform: DownloadPlatform;
//   label: string;
//   url: string;
//   version: string;
// }

// interface FormValues {
//   title: string;
//   slug: string;
//   short_description: string;
//   details_html: string;
//   product_type: ProductType;
//   status: ProductStatus;
//   live_url: string;
//   downloads: DownloadRow[];
//   meta_title: string;
//   meta_description: string;
//   meta_keywords: string;
//   canonical_url: string;
//   og_title: string;
//   og_description: string;
//   og_image_url: string;
//   no_index: boolean;
// }

// const blankDownload = (type: ProductType): DownloadRow => ({
//   platform: platformsFor(type)[0]?.value ?? 'other',
//   label: '',
//   url: '',
//   version: '',
// });

// function toDefaults(p?: Product | null): FormValues {
//   if (!p) {
//     return {
//       title: '',
//       slug: '',
//       short_description: '',
//       details_html: '',
//       product_type: 'website',
//       status: 'draft',
//       live_url: '',
//       downloads: [],
//       meta_title: '',
//       meta_description: '',
//       meta_keywords: '',
//       canonical_url: '',
//       og_title: '',
//       og_description: '',
//       og_image_url: '',
//       no_index: false,
//     };
//   }
//   return {
//     title: p.title,
//     slug: p.slug,
//     short_description: p.short_description,
//     details_html: p.details_html,
//     product_type: p.product_type,
//     status: p.status,
//     live_url: p.live_url ?? '',
//     downloads: p.downloads.map((d) => ({
//       platform: d.platform,
//       label: d.label ?? '',
//       url: d.url,
//       version: d.version ?? '',
//     })),
//     meta_title: p.meta_title ?? '',
//     meta_description: p.meta_description ?? '',
//     meta_keywords: p.meta_keywords.join(', '),
//     canonical_url: p.canonical_url ?? '',
//     og_title: p.og_title ?? '',
//     og_description: p.og_description ?? '',
//     og_image_url: p.og_image_url ?? '',
//     no_index: p.no_index,
//   };
// }

// // ---------------------------------------------------------------------
// // Small presentational helpers
// // ---------------------------------------------------------------------
// function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
//   return (
//     <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
//       <div>
//         <h2 className="text-xs font-bold uppercase tracking-wider text-white">{title}</h2>
//         {description && <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>}
//       </div>
//       {children}
//     </section>
//   );
// }

// function FieldError({ msg }: { msg?: string }) {
//   return msg ? <p className="mt-1 text-[11px] text-red-400">{msg}</p> : null;
// }

// function Counter({ value, max }: { value: string; max: number }) {
//   const n = value?.length ?? 0;
//   return (
//     <span className={`text-[10px] font-normal normal-case ${n > max ? 'text-amber-400' : 'text-slate-500'}`}>
//       {n}/{max}
//     </span>
//   );
// }

// // ---------------------------------------------------------------------
// // Form
// // ---------------------------------------------------------------------
// interface Props {
//   initial?: Product | null;
//   onCancel: () => void;
//   onSaved: (id: string, mode: 'created' | 'updated') => void;
// }

// export default function ProductForm({ initial = null, onCancel, onSaved }: Props) {
//   const defaults = useMemo(() => toDefaults(initial), [initial]);

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm<FormValues>({ defaultValues: defaults });

//   const { fields, append, remove, replace } = useFieldArray({ control, name: 'downloads' });

//   const title = watch('title');
//   const slug = watch('slug');
//   const productType = watch('product_type');
//   const shortDescription = watch('short_description');
//   const metaTitle = watch('meta_title');
//   const metaDescription = watch('meta_description');

//   const [slugTouched, setSlugTouched] = useState(Boolean(initial));
//   const [thumb, setThumb] = useState<ImageDraft | null>(
//     initial?.thumbnail_url
//       ? { key: 'thumb', url: initial.thumbnail_url, path: initial.thumbnail_path, file: null, alt: '' }
//       : null
//   );
//   const [shots, setShots] = useState<ImageDraft[]>(
//     () =>
//       initial?.screenshots.map((s) => ({
//         key: s.id,
//         url: s.image_url,
//         path: s.storage_path,
//         file: null,
//         alt: s.alt_text ?? '',
//       })) ?? []
//   );
//   const [imageErrors, setImageErrors] = useState<string[]>([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [progress, setProgress] = useState<string | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);

//   // Track blob preview URLs so they are always revoked.
//   const blobUrls = useRef<Set<string>>(new Set());
//   useEffect(() => {
//     const urls = blobUrls.current;
//     return () => {
//       urls.forEach((u) => URL.revokeObjectURL(u));
//       urls.clear();
//     };
//   }, []);

//   const makeDraft = (file: File): ImageDraft => {
//     const url = URL.createObjectURL(file);
//     blobUrls.current.add(url);
//     return { key: crypto.randomUUID(), url, path: null, file, alt: '' };
//   };

//   const releaseDraft = (d: ImageDraft | null) => {
//     if (d?.file && blobUrls.current.has(d.url)) {
//       URL.revokeObjectURL(d.url);
//       blobUrls.current.delete(d.url);
//     }
//   };

//   // Auto-generate slug from title until the user edits the slug manually.
//   useEffect(() => {
//     if (!slugTouched) setValue('slug', slugify(title ?? ''));
//   }, [title, slugTouched, setValue]);

//   // Reset download rows when switching between mobile / desktop / web.
//   const prevType = useRef<ProductType>(defaults.product_type);
//   const handleTypeChange = (next: ProductType) => {
//     if (platformKind(prevType.current) !== platformKind(next)) {
//       replace(isAppType(next) ? [blankDownload(next)] : []);
//     }
//     prevType.current = next;
//   };

//   // ---- images ----
//   const handleThumbnail = (file: File | undefined) => {
//     if (!file) return;
//     const err = validateImage(file);
//     if (err) {
//       setImageErrors([err]);
//       return;
//     }
//     setImageErrors([]);
//     releaseDraft(thumb);
//     setThumb(makeDraft(file));
//   };

//   const addScreenshots = (list: FileList | File[]) => {
//     const files = Array.from(list);
//     const room = MAX_SCREENSHOTS - shots.length;
//     const errs: string[] = [];
//     const accepted: ImageDraft[] = [];

//     for (const file of files) {
//       if (accepted.length >= room) {
//         errs.push(`Only ${MAX_SCREENSHOTS} screenshots are allowed per product.`);
//         break;
//       }
//       const err = validateImage(file);
//       if (err) errs.push(err);
//       else accepted.push(makeDraft(file));
//     }
//     setImageErrors(errs);
//     if (accepted.length) setShots((prev) => [...prev, ...accepted]);
//   };

//   const moveShot = (index: number, dir: -1 | 1) => {
//     setShots((prev) => {
//       const target = index + dir;
//       if (target < 0 || target >= prev.length) return prev;
//       const next = [...prev];
//       [next[index], next[target]] = [next[target], next[index]];
//       return next;
//     });
//   };

//   const removeShot = (index: number) => {
//     setShots((prev) => {
//       releaseDraft(prev[index]);
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   // ---- submit ----
//   const onSubmit = async (values: FormValues) => {
//     setFormError(null);

//     const downloads = isAppType(values.product_type) ? values.downloads.filter((d) => d.url.trim()) : [];
//     if (isAppType(values.product_type) && downloads.length === 0) {
//       setFormError('Add at least one download link for this app.');
//       return;
//     }
//     if (values.status === 'published' && !thumb) {
//       setFormError('A thumbnail is required before a product can be published.');
//       return;
//     }

//     setSubmitting(true);
//     const productId = initial?.id ?? crypto.randomUUID();
//     const uploadedPaths: string[] = []; // for rollback if the save fails

//     try {
//       // Thumbnail
//       let thumbnailUrl = thumb?.url ?? null;
//       let thumbnailPath = thumb?.path ?? null;
//       if (thumb?.file) {
//         setProgress('Uploading thumbnail…');
//         const up = await cmsProduct.uploadImage(productId, thumb.file, 'thumbnail');
//         uploadedPaths.push(up.path);
//         thumbnailUrl = up.url;
//         thumbnailPath = up.path;
//       }

//       // Screenshots (sequential: predictable order + simple rollback)
//       const screenshots: SaveProductInput['screenshots'] = [];
//       for (let i = 0; i < shots.length; i++) {
//         const s = shots[i];
//         let imageUrl = s.url;
//         let storagePath = s.path;
//         if (s.file) {
//           setProgress(`Uploading screenshot ${i + 1} of ${shots.length}…`);
//           const up = await cmsProduct.uploadImage(productId, s.file, 'screenshots');
//           uploadedPaths.push(up.path);
//           imageUrl = up.url;
//           storagePath = up.path;
//         }
//         screenshots.push({
//           image_url: imageUrl,
//           storage_path: storagePath as string,
//           alt_text: emptyToNull(s.alt),
//           sort_order: i,
//         });
//       }

//       setProgress('Saving…');
//       await cmsProduct.saveProduct({
//         id: productId,
//         slug: values.slug.trim(),
//         title: values.title.trim(),
//         short_description: values.short_description.trim(),
//         details_html: values.details_html,
//         product_type: values.product_type,
//         status: values.status,
//         live_url: isWebType(values.product_type) ? emptyToNull(values.live_url) : null,
//         thumbnail_url: thumbnailUrl,
//         thumbnail_path: thumbnailPath,
//         meta_title: emptyToNull(values.meta_title),
//         meta_description: emptyToNull(values.meta_description),
//         meta_keywords: parseKeywords(values.meta_keywords),
//         canonical_url: emptyToNull(values.canonical_url),
//         og_title: emptyToNull(values.og_title),
//         og_description: emptyToNull(values.og_description),
//         og_image_url: emptyToNull(values.og_image_url),
//         no_index: values.no_index,
//         downloads: downloads.map((d, i) => ({
//           platform: d.platform,
//           label: emptyToNull(d.label),
//           url: d.url.trim(),
//           version: emptyToNull(d.version),
//           sort_order: i,
//         })),
//         screenshots,
//       });

//       // Remove files that are no longer referenced (replaced / deleted images).
//       const keep = new Set<string>([thumbnailPath ?? '', ...screenshots.map((s) => s.storage_path)]);
//       const previous = [initial?.thumbnail_path ?? '', ...(initial?.screenshots.map((s) => s.storage_path) ?? [])];
//       await cmsProduct.removeImages(previous.filter((p) => p && !keep.has(p)));

//       onSaved(productId, initial ? 'updated' : 'created');
//     } catch (e) {
//       await cmsProduct.removeImages(uploadedPaths); // roll back this attempt's uploads
//       setFormError((e as Error).message || 'Could not save the product.');
//     } finally {
//       setSubmitting(false);
//       setProgress(null);
//     }
//   };

//   const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prawez.com').replace(/\/$/, '');
//   const platformOptions = platformsFor(productType);

//   return (
//     <form id="product-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
//       {/* Sticky header */}
//       <div className="sticky top-4 z-30 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={submitting}
//             className="rounded-lg bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
//             aria-label="Back to products"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </button>
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
//               {initial ? 'Edit product' : 'New product'}
//             </p>
//             <h1 className="max-w-xs truncate text-lg font-extrabold text-white">
//               {title?.trim() || 'Untitled product'}
//             </h1>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           {progress && <span className="text-[11px] text-slate-400">{progress}</span>}
//           <button type="submit" disabled={submitting} className={btnPrimary}>
//             {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//             {initial ? 'Save changes' : 'Create product'}
//           </button>
//         </div>
//       </div>

//       {formError && (
//         <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
//           <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
//           <p className="text-xs text-red-300">{formError}</p>
//         </div>
//       )}

//       {imageErrors.length > 0 && (
//         <div role="alert" className="space-y-1 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
//           {imageErrors.map((e) => (
//             <p key={e} className="text-xs text-amber-300">
//               {e}
//             </p>
//           ))}
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
//         {/* ============ LEFT COLUMN ============ */}
//         <div className="space-y-6 lg:col-span-8">
//           {/* Content */}
//           <Card title="Content" description="What visitors will read about this product.">
//             <div>
//               <label className={labelCls} htmlFor="title">
//                 <span>Title</span>
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 maxLength={160}
//                 placeholder="e.g. QuantumPOS"
//                 className={inputCls}
//                 {...register('title', {
//                   required: 'Title is required.',
//                   minLength: { value: 2, message: 'Title must be at least 2 characters.' },
//                 })}
//               />
//               <FieldError msg={errors.title?.message} />
//             </div>

//             <div>
//               <label className={labelCls} htmlFor="short_description">
//                 <span>Short description</span>
//                 <Counter value={shortDescription ?? ''} max={300} />
//               </label>
//               <textarea
//                 id="short_description"
//                 rows={3}
//                 maxLength={300}
//                 placeholder="One or two sentences shown on cards and in listings."
//                 className={`${inputCls} resize-none`}
//                 {...register('short_description', { required: 'Short description is required.' })}
//               />
//               <FieldError msg={errors.short_description?.message} />
//             </div>

//             <div>
//               <label className={labelCls} htmlFor="details_html">
//                 <span>Detailed description</span>
//                 <span className="text-[9px] font-normal normal-case text-indigo-400">HTML supported</span>
//               </label>
//               <textarea
//                 id="details_html"
//                 rows={14}
//                 placeholder="<h2>Overview</h2><p>Describe the product, key features, and use cases…</p>"
//                 className={`${inputCls} font-mono leading-relaxed`}
//                 {...register('details_html')}
//               />
//               <p className="mt-1 text-[10px] text-slate-500">Content is sanitized when displayed.</p>
//             </div>
//           </Card>

//           {/* Distribution */}
//           <Card
//             title={isWebType(productType) ? 'Website link' : 'Downloads'}
//             description={
//               isWebType(productType)
//                 ? 'Visitors will be sent to this site.'
//                 : productType === 'mobile_app'
//                   ? 'Add a store or direct link for each mobile platform.'
//                   : 'Add a download link for each desktop platform.'
//             }
//           >
//             {isWebType(productType) ? (
//               <div>
//                 <label className={labelCls} htmlFor="live_url">
//                   <span>Live URL</span>
//                 </label>
//                 <input
//                   id="live_url"
//                   type="url"
//                   placeholder="https://example.com"
//                   className={inputCls}
//                   {...register('live_url', {
//                     validate: (v) => {
//                       if (!isWebType(getValues('product_type'))) return true;
//                       if (!v.trim()) return 'A live URL is required for websites and web apps.';
//                       return URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.';
//                     },
//                   })}
//                 />
//                 <FieldError msg={errors.live_url?.message} />
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {fields.map((field, i) => (
//                   <div
//                     key={field.id}
//                     className="grid grid-cols-1 items-start gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 sm:grid-cols-12"
//                   >
//                     <div className="sm:col-span-3">
//                       <select
//                         aria-label="Platform"
//                         className={inputCls}
//                         {...register(`downloads.${i}.platform` as const, { required: true })}
//                       >
//                         {platformOptions.map((p) => (
//                           <option key={p.value} value={p.value}>
//                             {p.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="sm:col-span-3">
//                       <input
//                         type="text"
//                         maxLength={80}
//                         placeholder="Label (e.g. Google Play)"
//                         className={inputCls}
//                         {...register(`downloads.${i}.label` as const)}
//                       />
//                     </div>
//                     <div className="sm:col-span-4">
//                       <input
//                         type="url"
//                         placeholder="https://…"
//                         className={`${inputCls} font-mono`}
//                         {...register(`downloads.${i}.url` as const, {
//                           validate: (v) => !v.trim() || URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.',
//                         })}
//                       />
//                       <FieldError msg={errors.downloads?.[i]?.url?.message} />
//                     </div>
//                     <div className="flex items-center gap-1 sm:col-span-2">
//                       <input
//                         type="text"
//                         maxLength={40}
//                         placeholder="v1.0.0"
//                         className={inputCls}
//                         {...register(`downloads.${i}.version` as const)}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => remove(i)}
//                         className="shrink-0 rounded-lg p-2 text-red-400 transition hover:bg-red-500/20"
//                         aria-label="Remove download"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//                 {fields.length === 0 && (
//                   <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950 p-4 text-center text-xs text-slate-500">
//                     No download links yet.
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => append(blankDownload(productType))}
//                   className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md transition hover:bg-indigo-500"
//                 >
//                   <Plus className="h-3.5 w-3.5" /> Add platform
//                 </button>
//               </div>
//             )}
//           </Card>

//           {/* Screenshots */}
//           <Card
//             title={`Screenshots (${shots.length}/${MAX_SCREENSHOTS})`}
//             description="PNG, JPG, WebP, AVIF or GIF · up to 5 MB each. The first screenshot is shown first."
//           >
//             <label
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 addScreenshots(e.dataTransfer.files);
//               }}
//               className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center transition hover:border-indigo-500/60"
//             >
//               <Upload className="h-5 w-5 text-indigo-400" />
//               <span className="text-xs font-semibold text-slate-200">Click to upload or drag &amp; drop</span>
//               <span className="text-[10px] text-slate-500">You can select multiple images at once</span>
//               <input
//                 type="file"
//                 multiple
//                 accept={ALLOWED_IMAGE_TYPES.join(',')}
//                 className="sr-only"
//                 disabled={shots.length >= MAX_SCREENSHOTS}
//                 onChange={(e) => {
//                   if (e.target.files) addScreenshots(e.target.files);
//                   e.target.value = '';
//                 }}
//               />
//             </label>

//             {shots.length > 0 && (
//               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 {shots.map((s, i) => (
//                   <div key={s.key} className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-3">
//                     <div className="relative aspect-video overflow-hidden rounded-lg border border-slate-800">
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img src={s.url} alt={s.alt || `Screenshot ${i + 1}`} className="h-full w-full object-cover" />
//                       <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
//                         #{i + 1}
//                       </span>
//                       {s.file && (
//                         <span className="absolute right-2 top-2 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
//                           New
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <input
//                         type="text"
//                         maxLength={200}
//                         value={s.alt}
//                         onChange={(e) =>
//                           setShots((prev) => prev.map((x, idx) => (idx === i ? { ...x, alt: e.target.value } : x)))
//                         }
//                         placeholder="Alt text (describe the image)"
//                         className={inputCls}
//                       />
//                       <button
//                         type="button"
//                         disabled={i === 0}
//                         onClick={() => moveShot(i, -1)}
//                         className="rounded-lg bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800 disabled:opacity-30"
//                         aria-label="Move up"
//                       >
//                         <ArrowUp className="h-3.5 w-3.5" />
//                       </button>
//                       <button
//                         type="button"
//                         disabled={i === shots.length - 1}
//                         onClick={() => moveShot(i, 1)}
//                         className="rounded-lg bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800 disabled:opacity-30"
//                         aria-label="Move down"
//                       >
//                         <ArrowDown className="h-3.5 w-3.5" />
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => removeShot(i)}
//                         className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/20"
//                         aria-label="Remove screenshot"
//                       >
//                         <Trash2 className="h-3.5 w-3.5" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>

//           {/* SEO */}
//           <Card title="SEO" description="Controls how this product appears in search results and when shared.">
//             {/* SERP preview */}
//             <div className="space-y-0.5 rounded-xl border border-slate-800 bg-white p-4">
//               <p className="truncate text-[11px] text-slate-600">
//                 {siteUrl}/products/{slug || 'your-slug'}
//               </p>
//               <p className="truncate text-base font-medium text-[#1a0dab]">
//                 {metaTitle?.trim() || title?.trim() || 'Product title'}
//               </p>
//               <p className="line-clamp-2 text-xs text-slate-700">
//                 {metaDescription?.trim() || shortDescription?.trim() || 'Your meta description will appear here.'}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <label className={labelCls} htmlFor="meta_title">
//                   <span>Meta title</span>
//                   <Counter value={metaTitle ?? ''} max={60} />
//                 </label>
//                 <input
//                   id="meta_title"
//                   type="text"
//                   maxLength={70}
//                   placeholder="Falls back to the product title"
//                   className={inputCls}
//                   {...register('meta_title')}
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className={labelCls} htmlFor="meta_description">
//                   <span>Meta description</span>
//                   <Counter value={metaDescription ?? ''} max={160} />
//                 </label>
//                 <textarea
//                   id="meta_description"
//                   rows={3}
//                   maxLength={170}
//                   placeholder="Falls back to the short description"
//                   className={`${inputCls} resize-none`}
//                   {...register('meta_description')}
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className={labelCls} htmlFor="meta_keywords">
//                   <span>Keywords</span>
//                   <span className="text-[9px] font-normal normal-case text-slate-500">comma separated · max 15</span>
//                 </label>
//                 <input
//                   id="meta_keywords"
//                   type="text"
//                   placeholder="pos software, point of sale, retail"
//                   className={inputCls}
//                   {...register('meta_keywords')}
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className={labelCls} htmlFor="canonical_url">
//                   <span>Canonical URL</span>
//                 </label>
//                 <input
//                   id="canonical_url"
//                   type="url"
//                   placeholder="https://… (leave empty to use the default page URL)"
//                   className={`${inputCls} font-mono`}
//                   {...register('canonical_url', {
//                     validate: (v) => !v.trim() || URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.',
//                   })}
//                 />
//                 <FieldError msg={errors.canonical_url?.message} />
//               </div>

//               <div>
//                 <label className={labelCls} htmlFor="og_title">
//                   <span>Open Graph title</span>
//                 </label>
//                 <input id="og_title" type="text" maxLength={100} className={inputCls} {...register('og_title')} />
//               </div>

//               <div>
//                 <label className={labelCls} htmlFor="og_image_url">
//                   <span>Open Graph image URL</span>
//                 </label>
//                 <input
//                   id="og_image_url"
//                   type="url"
//                   placeholder="Falls back to the thumbnail"
//                   className={`${inputCls} font-mono`}
//                   {...register('og_image_url', {
//                     validate: (v) => !v.trim() || URL_RE.test(v.trim()) || 'Enter a valid http(s) URL.',
//                   })}
//                 />
//                 <FieldError msg={errors.og_image_url?.message} />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className={labelCls} htmlFor="og_description">
//                   <span>Open Graph description</span>
//                 </label>
//                 <textarea
//                   id="og_description"
//                   rows={2}
//                   maxLength={220}
//                   className={`${inputCls} resize-none`}
//                   {...register('og_description')}
//                 />
//               </div>

//               <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300 sm:col-span-2">
//                 <input type="checkbox" className="h-4 w-4 accent-indigo-500" {...register('no_index')} />
//                 Hide from search engines (<code className="text-[11px] text-slate-400">noindex</code>)
//               </label>
//             </div>
//           </Card>
//         </div>

//         {/* ============ RIGHT COLUMN ============ */}
//         <div className="space-y-6 lg:col-span-4">
//           <div className="space-y-6 lg:sticky lg:top-28">
//             <Card title="Publishing">
//               <div>
//                 <label className={labelCls} htmlFor="status">
//                   <span>Status</span>
//                 </label>
//                 <select id="status" className={inputCls} {...register('status')}>
//                   {PRODUCT_STATUSES.map((s) => (
//                     <option key={s.value} value={s.value}>
//                       {s.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className={labelCls} htmlFor="product_type">
//                   <span>Product type</span>
//                 </label>
//                 <select
//                   id="product_type"
//                   className={inputCls}
//                   {...register('product_type', {
//                     onChange: (e) => handleTypeChange(e.target.value as ProductType),
//                   })}
//                 >
//                   {PRODUCT_TYPES.map((t) => (
//                     <option key={t.value} value={t.value}>
//                       {t.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className={labelCls} htmlFor="slug">
//                   <span>Slug</span>
//                   {!slugTouched && <span className="text-[9px] font-normal normal-case text-indigo-400">auto</span>}
//                 </label>
//                 <input
//                   id="slug"
//                   type="text"
//                   maxLength={100}
//                   className={`${inputCls} font-mono`}
//                   {...register('slug', {
//                     required: 'Slug is required.',
//                     pattern: { value: SLUG_RE, message: 'Use lowercase letters, numbers and single hyphens only.' },
//                     onChange: () => setSlugTouched(true),
//                   })}
//                 />
//                 <FieldError msg={errors.slug?.message} />
//               </div>
//             </Card>

//             <Card title="Thumbnail" description="Shown on cards and as the default social image.">
//               {thumb ? (
//                 <div className="space-y-3">
//                   <div className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img src={thumb.url} alt="Thumbnail preview" className="h-full w-full object-cover" />
//                   </div>
//                   <div className="flex gap-2">
//                     <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700">
//                       <Upload className="h-3.5 w-3.5" /> Replace
//                       <input
//                         type="file"
//                         accept={ALLOWED_IMAGE_TYPES.join(',')}
//                         className="sr-only"
//                         onChange={(e) => {
//                           handleThumbnail(e.target.files?.[0]);
//                           e.target.value = '';
//                         }}
//                       />
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         releaseDraft(thumb);
//                         setThumb(null);
//                       }}
//                       className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
//                     >
//                       <X className="h-3.5 w-3.5" /> Remove
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <label className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-950 text-center transition hover:border-indigo-500/60">
//                   <ImagePlus className="h-5 w-5 text-indigo-400" />
//                   <span className="text-xs font-semibold text-slate-200">Upload thumbnail</span>
//                   <span className="text-[10px] text-slate-500">16:9 recommended</span>
//                   <input
//                     type="file"
//                     accept={ALLOWED_IMAGE_TYPES.join(',')}
//                     className="sr-only"
//                     onChange={(e) => {
//                       handleThumbnail(e.target.files?.[0]);
//                       e.target.value = '';
//                     }}
//                   />
//                 </label>
//               )}
//             </Card>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }