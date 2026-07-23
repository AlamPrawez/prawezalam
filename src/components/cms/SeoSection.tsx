'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Globe, Upload, Loader2, Zap, Sparkles, ClipboardCheck } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';
import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';

interface SeoSectionProps {
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

export default function SeoSection({
  baseCanonicalUrl = 'https://prawez.com',
  bucketName,
}: SeoSectionProps) {
  const { register, setValue } = useFormContext<FullPagePayload>();
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
    const lines = rawText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

    lines.forEach((line) => {
      // 1. URL / Path parsing
      if (line.match(/^(url|link|canonical|canonical url)[\:\=]/i)) {
        const urlValue = line.replace(/^(url|link|canonical|canonical url)[\:\=]/i, '').trim();
        const cleanPath = urlValue.replace(/^https?:\/\//i, '');
        const segments = cleanPath.split('/').filter(Boolean);
        const extractedSlug = segments.length > 0 ? slugify(segments[segments.length - 1]) : '';

        if (extractedSlug) {
          setValue('seo.slug' as never, extractedSlug as never, { shouldValidate: true, shouldDirty: true });
          setValue('seo.canonicalUrl' as never, buildCanonicalUrl(extractedSlug) as never, {
            shouldValidate: true,
            shouldDirty: true,
          });
        } else if (urlValue) {
          setValue('seo.canonicalUrl' as never, urlValue as never, { shouldValidate: true, shouldDirty: true });
        }
      }

      // 2. Title parsing
      if (line.match(/^(title|meta title)[\:\=]/i)) {
        const titleVal = line.replace(/^(title|meta title)[\:\=]/i, '').trim();
        setValue('seo.title' as never, titleVal as never, { shouldValidate: true, shouldDirty: true });

        const generatedSlug = slugify(titleVal.split('|')[0]);
        if (generatedSlug) {
          setValue('seo.slug' as never, generatedSlug as never, { shouldValidate: true, shouldDirty: true });
          setValue('seo.canonicalUrl' as never, buildCanonicalUrl(generatedSlug) as never, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }

      // 3. Description parsing
      if (line.match(/^(desc|description|meta desc|meta description)[\:\=]/i)) {
        const descVal = line.replace(/^(desc|description|meta desc|meta description)[\:\=]/i, '').trim();
        setValue('seo.description' as never, descVal as never, { shouldValidate: true, shouldDirty: true });
      }

      // 4. Keywords parsing
      if (line.match(/^(keywords|keyword|tags)[\:\=]/i)) {
        const kwVal = line.replace(/^(keywords|keyword|tags)[\:\=]/i, '').trim();
        setValue('seo.keywords' as never, kwVal as never, { shouldValidate: true, shouldDirty: true });
      }

      // 5. Image Alt Parsing
      if (line.match(/^(alt|image alt|og:alt|og alt)[\:\=]/i)) {
        const altVal = line.replace(/^(alt|image alt|og:alt|og alt)[\:\=]/i, '').trim();
        setValue('seo.ogImageAlt' as never, altVal as never, { shouldValidate: true, shouldDirty: true });
      }

      // 6. OG Image URL parsing
      if (line.match(/^(og|ogimage|og:image|image)[\:\=]/i)) {
        const imgVal = line.replace(/^(og|ogimage|og:image|image)[\:\=]/i, '').trim();
        if (imgVal.startsWith('http') || imgVal.startsWith('/')) {
          setValue('seo.ogImage' as never, imgVal as never, { shouldValidate: true, shouldDirty: true });
        }
      }
    });
  };

  // Single input paste auto-detection
  const handleTitlePaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.includes(':\n') || pasteText.match(/(url|title|desc|keywords)\:/i)) {
      e.preventDefault();
      parseAndPopulateSeo(pasteText);
    }
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

  // Upload handler leveraging WebP conversion and Supabase storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const publicUrl = await uploadWebpToSupabase(file, bucketName, 'seo');

      setValue('seo.ogImage', publicUrl, { shouldValidate: true, shouldDirty: true });
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to process and upload image. Check console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900">1. SEO & Social Metadata</h2>
        </div>

        {/* BULK PASTE BUTTON */}
        <button
          type="button"
          onClick={() => setShowBulkModal(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
        >
          <Zap className="w-3.5 h-3.5" /> Bulk Paste SEO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Meta Title */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase">
              Meta Title
            </label>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
            </span>
          </div>
          <input
            {...register('seo.title')}
            onChange={handleTitleChange}
            onPaste={handleTitlePaste}
            placeholder="e.g. React JS Development Services | Expert Solutions"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* URL Slug */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            URL Slug
          </label>
          <input
            {...register('seo.slug')}
            onChange={handleSlugChange}
            placeholder="react-js-development"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Meta Keywords */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Keywords
          </label>
          <input
            {...register('seo.keywords')}
            placeholder="e.g. react, nextjs, frontend development, web dev (comma-separated)"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Meta Description
          </label>
          <textarea
            {...register('seo.description')}
            rows={3}
            placeholder="Brief summary for search engine results..."
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Canonical URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Canonical URL
          </label>
          <input
            {...register('seo.canonicalUrl')}
            placeholder={`${normalizedBaseUrl}/react-js-development`}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* OG Image URL with WebP Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            OG Image URL
          </label>
          <div className="flex gap-2">
            <input
              {...register('seo.ogImage')}
              placeholder={`${normalizedBaseUrl}/images/og-react.jpg`}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors shrink-0 text-sm font-medium">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
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
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Image Alt Text
          </label>
          <input
            {...register('seo.ogImageAlt' as never)}
            placeholder="Descriptive alt text for accessibility & SEO"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* BULK PASTE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill SEO Fields
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Paste your structured SEO data below. Key prefixes like <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Url:</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Title:</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Desc:</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Keywords:</code>, and <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Alt:</code> will be parsed into their inputs.
            </p>
            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Url: prawez.com/services/react-js-development\nTitle: React.js Development Services\nDesc: Build fast, scalable React.js applications...\nKeywords: react, custom web apps\nAlt: React JS development hero image`}
              className="w-full p-3 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-800"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
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
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Auto-Generate SEO Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}















































// 'use client';

// import React, { useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { Globe, Upload, Loader2, Zap, Sparkles, ClipboardCheck } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';
// import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';

// interface SeoSectionProps {
//   /** Base canonical URL path (e.g. "https://prawez.com/services" or "https://prawez.com/blog") */
//   baseCanonicalUrl?: string;
//   /** Optional custom Supabase storage bucket name override */
//   bucketName?: string;
// }

// /**
//  * Utility to convert text into a clean, URL-safe slug
//  * Example: "React JS Development & Services!" -> "react-js-development-services"
//  */
// function slugify(text: string): string {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[\s_]+/g, '-')       // Replace spaces and underscores with hyphens
//     .replace(/[^\w\-]+/g, '')      // Remove special characters
//     .replace(/\-\-+/g, '-')        // Collapse multiple hyphens
//     .replace(/^-+/, '')            // Trim hyphens from start
//     .replace(/-+$/, '');           // Trim hyphens from end
// }

// export default function SeoSection({
//   baseCanonicalUrl = 'https://prawez.com',
//   bucketName,
// }: SeoSectionProps) {
//   const { register, setValue } = useFormContext<FullPagePayload>();
//   const [isUploading, setIsUploading] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [bulkText, setBulkText] = useState('');

//   // Normalize base URL (strip trailing slash)
//   const normalizedBaseUrl = baseCanonicalUrl.replace(/\/+$/, '');

//   // Helper to build canonical URL
//   const buildCanonicalUrl = (slug: string) => {
//     return slug ? `${normalizedBaseUrl}/${slug}` : normalizedBaseUrl;
//   };

//   // ADVANCED PARSER FOR BULK PASTED SEO TEXT
//   const parseAndPopulateSeo = (rawText: string) => {
//     const lines = rawText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

//     lines.forEach((line) => {
//       // 1. URL / Path parsing
//       if (line.match(/^(url|link|canonical|canonical url)[\:\=]/i)) {
//         const urlValue = line.replace(/^(url|link|canonical|canonical url)[\:\=]/i, '').trim();
//         // Clean off protocol and extract trailing slug
//         const cleanPath = urlValue.replace(/^https?:\/\//i, '');
//         const segments = cleanPath.split('/').filter(Boolean);
//         const extractedSlug = segments.length > 0 ? slugify(segments[segments.length - 1]) : '';

//         if (extractedSlug) {
//           setValue('seo.slug' as never, extractedSlug as never, { shouldValidate: true, shouldDirty: true });
//           setValue('seo.canonicalUrl' as never, buildCanonicalUrl(extractedSlug) as never, {
//             shouldValidate: true,
//             shouldDirty: true,
//           });
//         } else if (urlValue) {
//           setValue('seo.canonicalUrl' as never, urlValue as never, { shouldValidate: true, shouldDirty: true });
//         }
//       }

//       // 2. Title parsing
//       if (line.match(/^(title|meta title)[\:\=]/i)) {
//         const titleVal = line.replace(/^(title|meta title)[\:\=]/i, '').trim();
//         setValue('seo.title' as never, titleVal as never, { shouldValidate: true, shouldDirty: true });

//         // Auto-generate slug if slug is not explicitly parsed yet
//         const generatedSlug = slugify(titleVal.split('|')[0]);
//         if (generatedSlug) {
//           setValue('seo.slug' as never, generatedSlug as never, { shouldValidate: true, shouldDirty: true });
//           setValue('seo.canonicalUrl' as never, buildCanonicalUrl(generatedSlug) as never, {
//             shouldValidate: true,
//             shouldDirty: true,
//           });
//         }
//       }

//       // 3. Description parsing
//       if (line.match(/^(desc|description|meta desc|meta description)[\:\=]/i)) {
//         const descVal = line.replace(/^(desc|description|meta desc|meta description)[\:\=]/i, '').trim();
//         setValue('seo.description' as never, descVal as never, { shouldValidate: true, shouldDirty: true });
//       }

//       // 4. Keywords parsing
//       if (line.match(/^(keywords|keyword|tags)[\:\=]/i)) {
//         const kwVal = line.replace(/^(keywords|keyword|tags)[\:\=]/i, '').trim();
//         setValue('seo.keywords' as never, kwVal as never, { shouldValidate: true, shouldDirty: true });
//       }

//       // 5. Image Alt / OG Image parsing
//       if (line.match(/^(alt|og|ogimage|og:image|image)[\:\=]/i)) {
//         const imgVal = line.replace(/^(alt|og|ogimage|og:image|image)[\:\=]/i, '').trim();
//         if (imgVal.startsWith('http') || imgVal.startsWith('/')) {
//           setValue('seo.ogImage' as never, imgVal as never, { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//   };

//   // Single input paste auto-detection
//   const handleTitlePaste = (e: React.ClipboardEvent) => {
//     const pasteText = e.clipboardData.getData('text');
//     if (pasteText.includes(':\n') || pasteText.match(/(url|title|desc|keywords)\:/i)) {
//       e.preventDefault();
//       parseAndPopulateSeo(pasteText);
//     }
//   };

//   // Auto-generate Slug & Canonical URL on Title change
//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const title = e.target.value;
//     const generatedSlug = slugify(title);

//     setValue('seo.title', title, { shouldValidate: true, shouldDirty: true });
//     setValue('seo.slug', generatedSlug, { shouldValidate: true, shouldDirty: true });
//     setValue('seo.canonicalUrl', buildCanonicalUrl(generatedSlug), {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   // Keep Canonical URL synchronized when Slug is edited manually
//   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const manualSlug = slugify(e.target.value);

//     setValue('seo.slug', manualSlug, { shouldValidate: true, shouldDirty: true });
//     setValue('seo.canonicalUrl', buildCanonicalUrl(manualSlug), {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   // Upload handler leveraging WebP conversion and Supabase storage
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setIsUploading(true);
//       const publicUrl = await uploadWebpToSupabase(file, bucketName, 'seo');

//       setValue('seo.ogImage', publicUrl, { shouldValidate: true, shouldDirty: true });
//     } catch (error) {
//       console.error('Failed to upload image:', error);
//       alert('Failed to process and upload image. Check console for details.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* HEADER SECTION */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//         <div className="flex items-center gap-2">
//           <Globe className="w-5 h-5 text-indigo-600" />
//           <h2 className="text-lg font-semibold text-slate-900">1. SEO & Social Metadata</h2>
//         </div>

//         {/* BULK PASTE BUTTON */}
//         <button
//           type="button"
//           onClick={() => setShowBulkModal(true)}
//           className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
//         >
//           <Zap className="w-3.5 h-3.5" /> Bulk Paste SEO
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Meta Title */}
//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <label className="block text-xs font-semibold text-slate-700 uppercase">
//               Meta Title
//             </label>
//             <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
//               <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
//             </span>
//           </div>
//           <input
//             {...register('seo.title')}
//             onChange={handleTitleChange}
//             onPaste={handleTitlePaste}
//             placeholder="e.g. React JS Development Services | Expert Solutions"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* URL Slug */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             URL Slug
//           </label>
//           <input
//             {...register('seo.slug')}
//             onChange={handleSlugChange}
//             placeholder="react-js-development"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Meta Keywords */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Keywords
//           </label>
//           <input
//             {...register('seo.keywords')}
//             placeholder="e.g. react, nextjs, frontend development, web dev (comma-separated)"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Meta Description */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Meta Description
//           </label>
//           <textarea
//             {...register('seo.description')}
//             rows={3}
//             placeholder="Brief summary for search engine results..."
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Canonical URL */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Canonical URL
//           </label>
//           <input
//             {...register('seo.canonicalUrl')}
//             placeholder={`${normalizedBaseUrl}/react-js-development`}
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* OG Image URL with WebP Upload */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             OG Image URL
//           </label>
//           <div className="flex gap-2">
//             <input
//               {...register('seo.ogImage')}
//               placeholder={`${normalizedBaseUrl}/images/og-react.jpg`}
//               className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <label className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors shrink-0 text-sm font-medium">
//               {isUploading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Upload className="w-4 h-4" />
//               )}
//               <span>Upload</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 disabled={isUploading}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* BULK PASTE MODAL */}
//       {showBulkModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
//             <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//               <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
//                 <Sparkles className="w-4 h-4 text-emerald-600" />
//                 Bulk Auto-Fill SEO Fields
//               </h3>
//               <button
//                 type="button"
//                 onClick={() => setShowBulkModal(false)}
//                 className="text-slate-400 hover:text-slate-600 text-sm font-bold"
//               >
//                 ✕
//               </button>
//             </div>
//             <p className="text-xs text-slate-500">
//               Paste your structured SEO data below. Key prefixes like <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Url:</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Title:</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Desc:</code>, and <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-semibold">Keywords:</code> will be parsed into their inputs.
//             </p>
//             <textarea
//               rows={8}
//               value={bulkText}
//               onChange={(e) => setBulkText(e.target.value)}
//               placeholder={`Url: prawez.com/services/react-js-development\nTitle: React.js Development Services\nDesc: Build fast, scalable React.js applications...\nKeywords: react, custom web apps`}
//               className="w-full p-3 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-800"
//             />
//             <div className="flex justify-end gap-2 pt-2">
//               <button
//                 type="button"
//                 onClick={() => setShowBulkModal(false)}
//                 className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   parseAndPopulateSeo(bulkText);
//                   setShowBulkModal(false);
//                   setBulkText('');
//                 }}
//                 className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Auto-Generate SEO Data
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// 'use client';

// import React, { useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { Globe, Upload, Loader2 } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';
// import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';

// interface SeoSectionProps {
//   /** Base canonical URL path (e.g. "https://prawez.com/services" or "https://prawez.com/blog") */
//   baseCanonicalUrl?: string;
//   /** Optional custom Supabase storage bucket name override */
//   bucketName?: string;
// }

// /**
//  * Utility to convert text into a clean, URL-safe slug
//  * Example: "React JS Development & Services!" -> "react-js-development-services"
//  */
// function slugify(text: string): string {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[\s_]+/g, '-')       // Replace spaces and underscores with hyphens
//     .replace(/[^\w\-]+/g, '')      // Remove special characters
//     .replace(/\-\-+/g, '-')        // Collapse multiple hyphens
//     .replace(/^-+/, '')            // Trim hyphens from start
//     .replace(/-+$/, '');           // Trim hyphens from end
// }

// export default function SeoSection({
//   baseCanonicalUrl = 'https://prawez.com',
//   bucketName,
// }: SeoSectionProps) {
//   const { register, setValue } = useFormContext<FullPagePayload>();
//   const [isUploading, setIsUploading] = useState(false);

//   // Normalize base URL (strip trailing slash)
//   const normalizedBaseUrl = baseCanonicalUrl.replace(/\/+$/, '');

//   // Helper to build canonical URL
//   const buildCanonicalUrl = (slug: string) => {
//     return slug ? `${normalizedBaseUrl}/${slug}` : normalizedBaseUrl;
//   };

//   // Auto-generate Slug & Canonical URL on Title change
//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const title = e.target.value;
//     const generatedSlug = slugify(title);

//     setValue('seo.title', title, { shouldValidate: true, shouldDirty: true });
//     setValue('seo.slug', generatedSlug, { shouldValidate: true, shouldDirty: true });
//     setValue('seo.canonicalUrl', buildCanonicalUrl(generatedSlug), {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   // Keep Canonical URL synchronized when Slug is edited manually
//   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const manualSlug = slugify(e.target.value);

//     setValue('seo.slug', manualSlug, { shouldValidate: true, shouldDirty: true });
//     setValue('seo.canonicalUrl', buildCanonicalUrl(manualSlug), {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   // Upload handler leveraging WebP conversion and Supabase storage
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setIsUploading(true);
//       // Calls upload utility (bucket fallback handled inside utility function)
//       const publicUrl = await uploadWebpToSupabase(file, bucketName, 'seo');

//       setValue('seo.ogImage', publicUrl, { shouldValidate: true, shouldDirty: true });
//     } catch (error) {
//       console.error('Failed to upload image:', error);
//       alert('Failed to process and upload image. Check console for details.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//         <Globe className="w-5 h-5 text-indigo-600" />
//         <h2 className="text-lg font-semibold text-slate-900">1. SEO & Social Metadata</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Meta Title */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Meta Title
//           </label>
//           <input
//             {...register('seo.title')}
//             onChange={handleTitleChange}
//             placeholder="e.g. React JS Development Services | Expert Solutions"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* URL Slug */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             URL Slug
//           </label>
//           <input
//             {...register('seo.slug')}
//             onChange={handleSlugChange}
//             placeholder="react-js-development"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Meta Keywords */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Keywords
//           </label>
//           <input
//             {...register('seo.keywords')}
//             placeholder="e.g. react, nextjs, frontend development, web dev (comma-separated)"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Meta Description */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Meta Description
//           </label>
//           <textarea
//             {...register('seo.description')}
//             rows={3}
//             placeholder="Brief summary for search engine results..."
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Canonical URL */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Canonical URL
//           </label>
//           <input
//             {...register('seo.canonicalUrl')}
//             placeholder={`${normalizedBaseUrl}/react-js-development`}
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* OG Image URL with WebP Upload */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             OG Image URL
//           </label>
//           <div className="flex gap-2">
//             <input
//               {...register('seo.ogImage')}
//               placeholder={`${normalizedBaseUrl}/images/og-react.jpg`}
//               className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <label className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors shrink-0 text-sm font-medium">
//               {isUploading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Upload className="w-4 h-4" />
//               )}
//               <span>Upload</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 disabled={isUploading}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }