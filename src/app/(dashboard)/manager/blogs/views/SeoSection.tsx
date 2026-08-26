'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Globe, Upload, Loader2, Zap, Sparkles, ClipboardCheck, Code2 } from 'lucide-react';
import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';


interface SeoFormProps {
  /** Base canonical URL path (e.g. "https://prawez.com/services" or "https://prawez.com/blog") */
  baseCanonicalUrl?: string;
  /** Optional custom Supabase storage bucket name override */
  bucketName?: string;
}

/**
 * Utility to convert text into a clean, URL-safe slug
 * Example: "React JS Development & Services!" -> "react-js-development-services"
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')       // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, '')      // Remove special characters
    .replace(/\-\-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-+/, '')            // Trim hyphens from start
    .replace(/-+$/, '');           // Trim hyphens from end
}

export default function SeoForm({
  baseCanonicalUrl = 'https://prawez.com',
  bucketName,
}: SeoFormProps) {
  const { register, setValue } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // Normalize base URL (strip trailing slash)
  const normalizedBaseUrl = baseCanonicalUrl.replace(/\/+$/, '');

  // Helper to build canonical URL
  const buildCanonicalUrl = (slug: string) => {
    return slug ? `${normalizedBaseUrl}/${slug}` : normalizedBaseUrl;
  };

  // ADVANCED PARSER FOR BULK PASTED SEO TEXT
  const parseAndPopulateSeo = (rawText: string) => {
    let processingText = rawText;

    // Extract raw <script type="application/ld+json"> blocks if present
    const scriptMatches = processingText.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
    );
    if (scriptMatches && scriptMatches.length > 0) {
      const combinedLdJson = scriptMatches.join('\n\n');
      setValue('seo.ldjson', combinedLdJson, { shouldValidate: true, shouldDirty: true });
      
      processingText = processingText.replace(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
        ''
      );
    }

    const lines = processingText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

    lines.forEach((line) => {
      // 1. URL / Path parsing
      if (line.match(/^(url|link|canonical|canonical url)[\:\=]/i)) {
        const urlValue = line.replace(/^(url|link|canonical|canonical url)[\:\=]/i, '').trim();
        const cleanPath = urlValue.replace(/^https?:\/\//i, '');
        const segments = cleanPath.split('/').filter(Boolean);
        const extractedSlug = segments.length > 0 ? slugify(segments[segments.length - 1]) : '';

        if (extractedSlug) {
          setValue('seo.slug', extractedSlug, { shouldValidate: true, shouldDirty: true });
          setValue('seo.canonicalUrl', buildCanonicalUrl(extractedSlug), {
            shouldValidate: true,
            shouldDirty: true,
          });
        } else if (urlValue) {
          setValue('seo.canonicalUrl', urlValue, { shouldValidate: true, shouldDirty: true });
        }
      }

      // 2. Title parsing
      if (line.match(/^(title|meta title)[\:\=]/i)) {
        const titleVal = line.replace(/^(title|meta title)[\:\=]/i, '').trim();
        setValue('seo.title', titleVal, { shouldValidate: true, shouldDirty: true });

        const generatedSlug = slugify(titleVal.split('|')[0]);
        if (generatedSlug) {
          setValue('seo.slug', generatedSlug, { shouldValidate: true, shouldDirty: true });
          setValue('seo.canonicalUrl', buildCanonicalUrl(generatedSlug), {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }

      // 3. Description parsing
      if (line.match(/^(desc|description|meta desc|meta description)[\:\=]/i)) {
        const descVal = line.replace(/^(desc|description|meta desc|meta description)[\:\=]/i, '').trim();
        setValue('seo.description', descVal, { shouldValidate: true, shouldDirty: true });
      }

      // 4. Keywords parsing
      if (line.match(/^(keywords|keyword|tags)[\:\=]/i)) {
        const kwVal = line.replace(/^(keywords|keyword|tags)[\:\=]/i, '').trim();
        setValue('seo.keywords', kwVal, { shouldValidate: true, shouldDirty: true });
      }

      // 5. Image Alt Parsing
      if (line.match(/^(alt|image alt|og:alt|og alt)[\:\=]/i)) {
        const altVal = line.replace(/^(alt|image alt|og:alt|og alt)[\:\=]/i, '').trim();
        setValue('seo.ogImageAlt', altVal, { shouldValidate: true, shouldDirty: true });
      }

      // 6. OG Image URL parsing
      if (line.match(/^(og|ogimage|og:image|image)[\:\=]/i)) {
        const imgVal = line.replace(/^(og|ogimage|og:image|image)[\:\=]/i, '').trim();
        if (imgVal.startsWith('http') || imgVal.startsWith('/')) {
          setValue('seo.ogImage', imgVal, { shouldValidate: true, shouldDirty: true });
        }
      }

      // 7. LDJSON / Schema Key Parsing
      if (line.match(/^(ldjson|schema|jsonld|json-ld)[\:\=]/i) && !scriptMatches) {
        const ldVal = line.replace(/^(ldjson|schema|jsonld|json-ld)[\:\=]/i, '').trim();
        setValue('seo.ldjson', ldVal, { shouldValidate: true, shouldDirty: true });
      }
    });
  };

  // Auto-generate Slug & Canonical URL on Title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = slugify(title);

    setValue('seo.title', title, { shouldValidate: true, shouldDirty: true });
    setValue('seo.slug', generatedSlug, { shouldValidate: true, shouldDirty: true });
    setValue('seo.canonicalUrl', buildCanonicalUrl(generatedSlug), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Keep Canonical URL synchronized when Slug is edited manually
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualSlug = slugify(e.target.value);

    setValue('seo.slug', manualSlug, { shouldValidate: true, shouldDirty: true });
    setValue('seo.canonicalUrl', buildCanonicalUrl(manualSlug), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Single input paste auto-detection
  const handleTitlePaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.includes(':\n') || pasteText.match(/(url|title|desc|keywords|ldjson|schema)\:/i)) {
      e.preventDefault();
      parseAndPopulateSeo(pasteText);
    }
  };

  // WebP Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const publicUrl = await uploadWebpToSupabase(file, bucketName, 'seo');
      setValue('seo.ogImage', publicUrl, { shouldValidate: true, shouldDirty: true });
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to process and upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Step 1: SEO & Social Metadata</h2>
        </div>

        {/* BULK PASTE BUTTON */}
        <button
          type="button"
          onClick={() => setShowBulkModal(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition"
        >
          <Zap className="w-3.5 h-3.5" /> Bulk Paste SEO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Meta Title */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Meta Title
            </label>
            <span className="text-[10px] text-indigo-400 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fills Slug
            </span>
          </div>
          <input
            {...register('seo.title')}
            onChange={handleTitleChange}
            onPaste={handleTitlePaste}
            placeholder="e.g. Building Modern Web Applications at Scale"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* URL Slug */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            URL Slug
          </label>
          <input
            {...register('seo.slug')}
            onChange={handleSlugChange}
            placeholder="building-modern-web-applications"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Meta Keywords */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Keywords
          </label>
          <input
            {...register('seo.keywords')}
            placeholder="e.g. react, nextjs, frontend development (comma-separated)"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Meta Description
          </label>
          <textarea
            {...register('seo.description')}
            rows={3}
            placeholder="Brief summary for search engine results..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 resize-none transition"
          />
        </div>

        {/* Canonical URL */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Canonical URL
          </label>
          <input
            {...register('seo.canonicalUrl')}
            placeholder={`${normalizedBaseUrl}/building-modern-web-applications`}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* OG Image URL with WebP Upload */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            OG Image URL
          </label>
          <div className="flex gap-2">
            <input
              {...register('seo.ogImage')}
              placeholder="https://example.com/images/og.webp"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
            />
            <label className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-lg cursor-pointer transition shrink-0 text-xs font-semibold">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Image Alt Text */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Image Alt Text
          </label>
          <input
            {...register('seo.ogImageAlt')}
            placeholder="Descriptive alt text for image accessibility"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* JSON-LD / Structured Data (Schema) */}
        <div className="md:col-span-2 pt-2 border-t border-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              JSON-LD Structured Data (Schema)
            </label>
          </div>
          <textarea
            {...register('seo.ldjson')}
            rows={5}
            placeholder={`<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting"\n}\n</script>`}
            className="w-full p-3.5 text-xs font-mono border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 bg-slate-950 text-emerald-400 placeholder:text-slate-600 transition"
          />
        </div>
      </div>

      {/* BULK PASTE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Bulk Auto-Fill SEO Data
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Url: prawez.com/blog/building-modern-apps\nTitle: Building Modern Web Applications\nDesc: Learn frontend & backend engineering...\nKeywords: react, nextjs\nAlt: Hero architecture image`}
              className="w-full p-3 text-xs font-mono border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 bg-slate-950 text-slate-200"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  parseAndPopulateSeo(bulkText);
                  setShowBulkModal(false);
                  setBulkText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
              >
                Auto-Fill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}