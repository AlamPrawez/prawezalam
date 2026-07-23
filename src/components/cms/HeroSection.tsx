'use client';

import React, { useState, useId } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Sparkles, Plus, Trash2, Image as ImageIcon, Upload, Loader2, Zap, ClipboardCheck } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';
import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-32 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
      Loading Editor...
    </div>
  ),
});

interface HeroSectionProps {
  /** Optional custom storage bucket name override */
  bucketName?: string;
}

/**
 * Sub-component for individual CTA buttons to ensure hydration-safe element IDs
 */
function HeroButtonItem({
  index,
  canRemove,
  onRemove,
}: {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}) {
  const { register } = useFormContext<FullPagePayload>();
  const checkboxId = useId();

  return (
    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase">
          Button #{index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-slate-400 hover:text-red-600 transition"
            title="Remove Button"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Button Text
          </label>
          <input
            type="text"
            {...register(`hero.buttons.${index}.label`)}
            placeholder="e.g. View Portfolio"
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Destination URL
          </label>
          <input
            type="text"
            {...register(`hero.buttons.${index}.url`)}
            placeholder="/portfolio or https://..."
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Style Variant
          </label>
          <select
            {...register(`hero.buttons.${index}.variant`)}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="primary">Primary (Solid Indigo)</option>
            <option value="secondary">Secondary (Dark Slate)</option>
            <option value="outline">Outline (Bordered)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id={checkboxId}
          {...register(`hero.buttons.${index}.openInNewTab`)}
          className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
        />
        <label htmlFor={checkboxId} className="text-xs text-slate-600 cursor-pointer select-none">
          Open link in new tab (`target="_blank"`)
        </label>
      </div>
    </div>
  );
}

export default function HeroSection({ bucketName }: HeroSectionProps) {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const [isUploading, setIsUploading] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'hero.buttons',
  });

  // SMART PARSER FOR HERO SECTION COPY & CTA BUTTONS
  const parseAndPopulateHero = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    let badge = '';
    let headline = '';
    const bodyParagraphs: string[] = [];
    const detectedButtons: Array<{
      id: string;
      label: string;
      url: string;
      variant: 'primary' | 'secondary' | 'outline';
      openInNewTab: boolean;
    }> = [];

    lines.forEach((line) => {
      // Check for explicitly marked CTA triggers or lines like "Call to Action: ..."
      const ctaMatch = line.match(/^(call to action|cta|action|button)[\:\=]\s*(.*)/i);

      if (ctaMatch) {
        const btnLabel = ctaMatch[2].trim();
        if (btnLabel) {
          detectedButtons.push({
            id: `btn-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            label: btnLabel,
            url: btnLabel.toLowerCase().includes('contact') || btnLabel.toLowerCase().includes('touch') ? '/contact' : '#',
            variant: detectedButtons.length === 0 ? 'primary' : 'secondary',
            openInNewTab: false,
          });
        }
        return;
      }

      // First short line -> Badge / Category Tagline
      if (!badge && line.length <= 45 && !line.match(/^http/i)) {
        badge = line;
        return;
      }

      // Next prominent line -> Main H1 Headline
      if (!headline) {
        headline = line;
        return;
      }

      // Remaining content lines form the body paragraph
      bodyParagraphs.push(line);
    });

    // Populate standard inputs
    if (badge) {
      setValue('hero.badge' as never, badge as never, { shouldValidate: true, shouldDirty: true });
    }
    if (headline) {
      setValue('hero.headline' as never, headline as never, { shouldValidate: true, shouldDirty: true });
    }

    // Format remaining body text into HTML paragraphs for ReactQuill
    if (bodyParagraphs.length > 0) {
      const formattedHtml = bodyParagraphs.map((p) => `<p>${p}</p>`).join('');
      setValue('hero.paragraphHtml' as never, formattedHtml as never, { shouldValidate: true, shouldDirty: true });
    }

    // Append auto-detected CTA buttons if available
    if (detectedButtons.length > 0) {
      if (fields.length === 0 || (fields.length === 1 && !fields[0].label)) {
        replace(detectedButtons);
      } else {
        detectedButtons.forEach((btn) => append(btn));
      }
    }
  };

  // Auto-fill when pasting multi-line text into input fields
  const handleAutoPaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 1) {
      e.preventDefault();
      parseAndPopulateHero(pasteText);
    }
  };

  // Upload image logic
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const publicUrl = await uploadWebpToSupabase(file, bucketName, 'hero');
      setValue('hero.heroImage', publicUrl, { shouldValidate: true, shouldDirty: true });
    } catch (error) {
      console.error('Failed to upload hero image:', error);
      alert('Failed to convert and upload hero image. Check browser console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900">2. Hero Banner Settings</h2>
        </div>

        {/* BULK AUTO-PARSE BUTTON */}
        <button
          type="button"
          onClick={() => setShowBulkModal(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
        >
          <Zap className="w-3.5 h-3.5" /> Bulk Paste Copy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BADGE / TAGLINE */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase">
              Badge / Tagline
            </label>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
            </span>
          </div>
          <input
            type="text"
            {...register('hero.badge')}
            onPaste={handleAutoPaste}
            placeholder="e.g. Next.js & React Experts"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* HEADLINE */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Main Headline (H1)
          </label>
          <input
            type="text"
            {...register('hero.headline')}
            onPaste={handleAutoPaste}
            placeholder="High-Performance React JS Development"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* HERO RICH TEXT PARAGRAPH */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Hero Description / Paragraph
          </label>
          <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
            <Controller
              name="hero.paragraphHtml"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value || ''}
                  onChange={field.onChange}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'clean'],
                    ],
                  }}
                  placeholder="Write detailed hero overview paragraph with formatted text and links..."
                />
              )}
            />
          </div>
        </div>

        {/* HERO IMAGE URL WITH WEBP UPLOAD */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
            Hero Image URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              {...register('hero.heroImage')}
              placeholder="https://prawez.com/assets/react-hero.webp"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors shrink-0 text-sm font-medium">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleHeroImageUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION BUTTONS SECTION */}
      <div className="border-t border-slate-100 pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Call to Action (CTA) Buttons</h3>
            <p className="text-xs text-slate-500">Add one or multiple action buttons to your hero header.</p>
          </div>

          <button
            type="button"
            onClick={() =>
              append({
                id: `btn-${Date.now()}`,
                label: '',
                url: '',
                variant: 'secondary',
                openInNewTab: false,
              })
            }
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
          >
            <Plus className="w-4 h-4" /> Add Button
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((btn, index) => (
            <HeroButtonItem
              key={btn.id}
              index={index}
              canRemove={fields.length > 1}
              onRemove={() => remove(index)}
            />
          ))}
        </div>
      </div>

      {/* BULK AUTO-PARSE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill Hero Content
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
              Paste your raw hero text below. Badges, titles, multi-paragraph bodies, and dynamic buttons will be structured automatically.
            </p>
            <textarea
              rows={9}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`React.js Development Services\nBuild Fast, Scalable React Applications\n\nNeed a modern web application that is fast and responsive? I build high-quality React applications.\n\nCall to Action: Get in touch for a free project discussion.`}
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
                  parseAndPopulateHero(bulkText);
                  setShowBulkModal(false);
                  setBulkText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Auto-Generate Hero Fields
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 'use client';

// import React, { useState, useId } from 'react';
// import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
// import dynamic from 'next/dynamic';
// import { Sparkles, Plus, Trash2, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';
// import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';
// import 'react-quill-new/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-32 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
//       Loading Editor...
//     </div>
//   ),
// });

// interface HeroSectionProps {
//   /** Optional custom storage bucket name override */
//   bucketName?: string;
// }

// /**
//  * Sub-component for individual CTA buttons to ensure hydration-safe element IDs
//  */
// function HeroButtonItem({
//   index,
//   canRemove,
//   onRemove,
// }: {
//   index: number;
//   canRemove: boolean;
//   onRemove: () => void;
// }) {
//   const { register } = useFormContext<FullPagePayload>();

//   // Guarantees matching ID across Server and Client hydration
//   const checkboxId = useId();

//   return (
//     <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
//       <div className="flex items-center justify-between">
//         <span className="text-xs font-bold text-slate-500 uppercase">
//           Button #{index + 1}
//         </span>
//         {canRemove && (
//           <button
//             type="button"
//             onClick={onRemove}
//             className="text-slate-400 hover:text-red-600 transition"
//             title="Remove Button"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//         <div>
//           <label className="block text-xs font-medium text-slate-600 mb-1">
//             Button Text
//           </label>
//           <input
//             type="text"
//             {...register(`hero.buttons.${index}.label`)}
//             placeholder="e.g. View Portfolio"
//             className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-medium text-slate-600 mb-1">
//             Destination URL
//           </label>
//           <input
//             type="text"
//             {...register(`hero.buttons.${index}.url`)}
//             placeholder="/portfolio or https://..."
//             className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-medium text-slate-600 mb-1">
//             Style Variant
//           </label>
//           <select
//             {...register(`hero.buttons.${index}.variant`)}
//             className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="primary">Primary (Solid Indigo)</option>
//             <option value="secondary">Secondary (Dark Slate)</option>
//             <option value="outline">Outline (Bordered)</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex items-center gap-2 pt-1">
//         <input
//           type="checkbox"
//           id={checkboxId}
//           {...register(`hero.buttons.${index}.openInNewTab`)}
//           className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
//         />
//         <label htmlFor={checkboxId} className="text-xs text-slate-600 cursor-pointer select-none">
//           Open link in new tab (`target="_blank"`)
//         </label>
//       </div>
//     </div>
//   );
// }

// export default function HeroSection({ bucketName }: HeroSectionProps) {
//   const { register, control, setValue } = useFormContext<FullPagePayload>();
//   const [isUploading, setIsUploading] = useState(false);

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'hero.buttons',
//   });

//   // Convert and upload WebP image to Supabase bucket
//   const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setIsUploading(true);
//       // Uploads image to Supabase and sets public URL into hero.heroImage
//       const publicUrl = await uploadWebpToSupabase(file, bucketName, 'hero');
//       setValue('hero.heroImage', publicUrl, { shouldValidate: true, shouldDirty: true });
//     } catch (error) {
//       console.error('Failed to upload hero image:', error);
//       alert('Failed to convert and upload hero image. Check browser console for details.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//         <Sparkles className="w-5 h-5 text-indigo-600" />
//         <h2 className="text-lg font-semibold text-slate-900">2. Hero Banner Settings</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* BADGE / TAGLINE */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Badge / Tagline
//           </label>
//           <input
//             type="text"
//             {...register('hero.badge')}
//             placeholder="e.g. Next.js & React Experts"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* HEADLINE */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Main Headline (H1)
//           </label>
//           <input
//             type="text"
//             {...register('hero.headline')}
//             placeholder="High-Performance React JS Development"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* HERO RICH TEXT PARAGRAPH */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Hero Description / Paragraph
//           </label>
//           <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
//             <Controller
//               name="hero.paragraphHtml"
//               control={control}
//               render={({ field }) => (
//                 <ReactQuill
//                   theme="snow"
//                   value={field.value || ''}
//                   onChange={field.onChange}
//                   modules={{
//                     toolbar: [
//                       ['bold', 'italic', 'underline', 'strike'],
//                       [{ list: 'ordered' }, { list: 'bullet' }],
//                       ['link', 'clean'],
//                     ],
//                   }}
//                   placeholder="Write detailed hero overview paragraph with formatted text and links..."
//                 />
//               )}
//             />
//           </div>
//         </div>

//         {/* HERO IMAGE URL WITH WEBP UPLOAD */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
//             <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
//             Hero Image URL
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="url"
//               {...register('hero.heroImage')}
//               placeholder="https://prawez.com/assets/react-hero.webp"
//               className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <label className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors shrink-0 text-sm font-medium">
//               {isUploading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Upload className="w-4 h-4" />
//               )}
//               <span>Upload</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleHeroImageUpload}
//                 disabled={isUploading}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* CALL TO ACTION BUTTONS SECTION */}
//       <div className="border-t border-slate-100 pt-5 space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-sm font-bold text-slate-800">Call to Action (CTA) Buttons</h3>
//             <p className="text-xs text-slate-500">Add one or multiple action buttons to your hero header.</p>
//           </div>


//           <button
//             type="button"
//             onClick={() =>
//               append({
//                 id: `btn-${Date.now()}`,
//                 label: '',
//                 url: '',
//                 variant: 'secondary',
//                 openInNewTab: false,
//               })
//             }
//             className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//           >
//             <Plus className="w-4 h-4" /> Add Button
//           </button>

//         </div>

//         <div className="space-y-3">
//           {fields.map((btn, index) => (
//             <HeroButtonItem
//               key={btn.id}
//               index={index}
//               canRemove={fields.length > 1}
//               onRemove={() => remove(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import React from 'react';
// import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
// import dynamic from 'next/dynamic';
// import { Sparkles, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';
// import 'react-quill-new/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-32 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
//       Loading Editor...
//     </div>
//   ),
// });

// export default function HeroSection() {
//   const { register, control } = useFormContext<FullPagePayload>();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'hero.buttons',
//   });

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//         <Sparkles className="w-5 h-5 text-indigo-600" />
//         <h2 className="text-lg font-semibold text-slate-900">2. Hero Banner Settings</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* BADGE / TAGLINE */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Badge / Tagline
//           </label>
//           <input
//             type="text"
//             {...register('hero.badge')}
//             placeholder="e.g. Next.js & React Experts"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* HEADLINE */}
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Main Headline (H1)
//           </label>
//           <input
//             type="text"
//             {...register('hero.headline')}
//             placeholder="High-Performance React JS Development"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* HERO RICH TEXT PARAGRAPH */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Hero Description / Paragraph
//           </label>
//           <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
//             <Controller
//               name="hero.paragraphHtml"
//               control={control}
//               render={({ field }) => (
//                 <ReactQuill
//                   theme="snow"
//                   value={field.value || ''}
//                   onChange={field.onChange}
//                   modules={{
//                     toolbar: [
//                       ['bold', 'italic', 'underline', 'strike'],
//                       [{ list: 'ordered' }, { list: 'bullet' }],
//                       ['link', 'clean'],
//                     ],
//                   }}
//                   placeholder="Write detailed hero overview paragraph with formatted text and links..."
//                 />
//               )}
//             />
//           </div>
//         </div>

//         {/* HERO IMAGE URL (RESTORED) */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
//             <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
//             Hero Image URL
//           </label>
//           <input
//             type="url"
//             {...register('hero.heroImage')}
//             placeholder="https://prawez.com/assets/react-hero.png"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* CALL TO ACTION BUTTONS SECTION */}
//       <div className="border-t border-slate-100 pt-5 space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-sm font-bold text-slate-800">Call to Action (CTA) Buttons</h3>
//             <p className="text-xs text-slate-500">Add one or multiple action buttons to your hero header.</p>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               append({
//                 id: `btn-${Date.now()}`,
//                 label: '',
//                 url: '',
//                 variant: 'secondary',
//                 openInNewTab: false,
//               })
//             }
//             className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//           >
//             <Plus className="w-4 h-4" /> Add Button
//           </button>
//         </div>

//         <div className="space-y-3">
//           {fields.map((btn, index) => (
//             <div key={btn.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-xs font-bold text-slate-500 uppercase">
//                   Button #{index + 1}
//                 </span>
//                 {fields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => remove(index)}
//                     className="text-slate-400 hover:text-red-600 transition"
//                     title="Remove Button"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1">
//                     Button Text
//                   </label>
//                   <input
//                     type="text"
//                     {...register(`hero.buttons.${index}.label`)}
//                     placeholder="e.g. View Portfolio"
//                     className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1">
//                     Destination URL
//                   </label>
//                   <input
//                     type="text"
//                     {...register(`hero.buttons.${index}.url`)}
//                     placeholder="/portfolio or https://..."
//                     className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1">
//                     Style Variant
//                   </label>
//                   <select
//                     {...register(`hero.buttons.${index}.variant`)}
//                     className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   >
//                     <option value="primary">Primary (Solid Indigo)</option>
//                     <option value="secondary">Secondary (Dark Slate)</option>
//                     <option value="outline">Outline (Bordered)</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 pt-1">
//                 <input
//                   type="checkbox"
//                   id={`tab-${btn.id}`}
//                   {...register(`hero.buttons.${index}.openInNewTab`)}
//                   className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
//                 />
//                 <label htmlFor={`tab-${btn.id}`} className="text-xs text-slate-600 cursor-pointer">
//                   Open link in new tab (`target="_blank"`)
//                 </label>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }