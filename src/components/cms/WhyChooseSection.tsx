'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
import { CheckCircle2, Plus, Trash2, HelpCircle, Zap, ClipboardCheck, AlignLeft } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

export default function WhyChooseSection() {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // Field Array for dynamic checkmark features
  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
    replace: replaceFeatures,
  } = useFieldArray({
    control,
    name: 'whyChoose.features' as ArrayPath<FullPagePayload>,
  });

  // Guarantee at least 3 feature pills exist on initial load or empty state
  useEffect(() => {
    if (featureFields.length < 3) {
      const needed = 3 - featureFields.length;
      for (let i = 0; i < needed; i++) {
        appendFeature({
          id: `feat-${Date.now()}-${i}`,
          text: '',
        } as never);
      }
    }
  }, [featureFields.length, appendFeature]);

  // SMART FULL-SECTION PARSER (Title, Top Paragraph, Feature Pills, Bottom Paragraph)
  const parseAndPopulateFullSection = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 1) return;

    // 1. Title
    const title = lines[0];
    setValue('whyChoose.title' as never, title as never, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (lines.length === 1) return;

    let topParagraph = '';
    let bottomParagraph = '';
    const parsedFeatures: string[] = [];

    const isExplicitBullet = (line: string) =>
      line.startsWith('•') ||
      line.startsWith('-') ||
      line.startsWith('*') ||
      line.match(/^\d+[\.\)]/);

    const isShortPillCandidate = (line: string) => {
      return line.length < 50 && !line.endsWith('.') && !line.endsWith(':');
    };

    let stage: 'TOP_PARAGRAPH' | 'PILLS' | 'BOTTOM_PARAGRAPH' = 'TOP_PARAGRAPH';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      const isPill = isExplicitBullet(line) || isShortPillCandidate(line);

      if (stage === 'TOP_PARAGRAPH') {
        if (isPill) {
          stage = 'PILLS';
        } else {
          topParagraph += (topParagraph ? '\n' : '') + line;
          continue;
        }
      }

      if (stage === 'PILLS') {
        if (isPill) {
          const cleanItem = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
          if (cleanItem) {
            if (cleanItem.includes(',')) {
              const splitItems = cleanItem
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
              parsedFeatures.push(...splitItems);
            } else {
              parsedFeatures.push(cleanItem);
            }
          }
          continue;
        } else {
          // Encountered a non-pill sentence/paragraph after pills -> switch to bottom paragraph
          stage = 'BOTTOM_PARAGRAPH';
        }
      }

      if (stage === 'BOTTOM_PARAGRAPH') {
        bottomParagraph += (bottomParagraph ? '\n' : '') + line;
      }
    }

    // Set Top Description
    if (topParagraph) {
      setValue('whyChoose.description' as never, topParagraph as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    // Set Bottom Description
    if (bottomParagraph) {
      setValue('whyChoose.bottomDescription' as never, bottomParagraph as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    // Populate feature pills (ensuring minimum 3 exist)
    if (parsedFeatures.length > 0) {
      while (parsedFeatures.length < 3) {
        parsedFeatures.push('');
      }

      const featureObjects = parsedFeatures.map((text, idx) => ({
        id: `feat-${Date.now()}-${idx}`,
        text,
      }));

      replaceFeatures(featureObjects as never[]);
    }
  };

  // Handle paste directly into Section Title input
  const handleSectionPaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 2) {
      e.preventDefault();
      parseAndPopulateFullSection(pasteText);
    }
  };

  // Handle paste inside an individual feature input
  const handleFeatureInputPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pasteText = e.clipboardData.getData('text');

    if (pasteText.includes(',') || pasteText.includes('\n')) {
      e.preventDefault();

      const items = pasteText
        .split(/[\n,]/)
        .map((item) => item.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim())
        .filter((item) => item.length > 0);

      if (items.length === 0) return;

      setValue(`whyChoose.features.${index}.text` as never, items[0] as never, {
        shouldValidate: true,
        shouldDirty: true,
      });

      for (let i = 1; i < items.length; i++) {
        appendFeature({
          id: `feat-${Date.now()}-${i}`,
          text: items[i],
        } as never);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Why Choose Section</h2>
            <p className="text-xs text-slate-500">
              Manage your primary value proposition and key feature highlights grid.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition"
          >
            <Zap className="w-3.5 h-3.5" /> Bulk Paste Section
          </button>

          <button
            type="button"
            onClick={() =>
              appendFeature({
                id: `feat-${Date.now()}`,
                text: '',
              } as never)
            }
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Feature Pill
          </button>
        </div>
      </div>

      {/* HEADING & TOP DESCRIPTION INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase">
              Section Title
            </label>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fill section on Paste
            </span>
          </div>
          <input
            type="text"
            {...register('whyChoose.title' as never)}
            onPaste={handleSectionPaste}
            defaultValue="Why Choose React?"
            placeholder="e.g. Why Choose React? (or paste full section text here)"
            className="w-full px-3.5 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            Top Paragraph / Intro Text
          </label>
          <textarea
            rows={2}
            {...register('whyChoose.description' as never)}
            defaultValue="React is one of the most widely adopted frontend libraries for building modern web applications because it offers:"
            placeholder="Top paragraph leading into feature pills..."
            className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* LIVE FORM PREVIEW CONTAINER */}
      <div className="bg-[#2D2A8C] p-6 rounded-2xl shadow-md text-white space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-400/30 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Feature Pills Grid ({featureFields.length})
          </span>
          <span className="text-[11px] text-indigo-300">
            3 Columns Layout (Minimum 3 Visible)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featureFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-indigo-400/20 p-2.5 rounded-xl transition hover:bg-white/15"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
              <input
                type="text"
                {...register(`whyChoose.features.${index}.text` as never)}
                onPaste={(e) => handleFeatureInputPaste(e, index)}
                placeholder="e.g. Fast rendering (Paste comma-separated to split)"
                className="w-full bg-transparent text-xs text-white placeholder-indigo-300/60 focus:outline-none font-medium"
              />
              {featureFields.length > 3 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-indigo-300 hover:text-red-400 transition p-1 shrink-0"
                  title="Remove Feature"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM PARAGRAPH FIELD */}
      <div className="pt-2">
        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 flex items-center gap-1.5">
          <AlignLeft className="w-3.5 h-3.5 text-indigo-500" />
          Bottom Paragraph / Outro Text
        </label>
        <textarea
          rows={3}
          {...register('whyChoose.bottomDescription' as never)}
          defaultValue="It's an excellent choice for startups launching an MVP as well as businesses building complex enterprise applications."
          placeholder="Bottom summary paragraph placed after the feature pills..."
          className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* BULK PASTE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill Why Choose Section
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
              Paste your section block below. The parser auto-detects Title, Top Paragraph, Feature Pills, and Bottom Paragraph automatically!
            </p>
            <textarea
              rows={12}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Why Choose React?\n\nReact is one of the most widely adopted frontend libraries because it offers:\n\nFast rendering\nReusable components\nStrong ecosystem\nExcellent scalability\nLarge community support\nLong-term maintainability\nGreat developer tooling\n\nIt's an excellent choice for startups launching an MVP as well as businesses building complex enterprise applications.`}
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
                  parseAndPopulateFullSection(bulkText);
                  setShowBulkModal(false);
                  setBulkText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Auto-Generate Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


































// 'use client';

// import React from 'react';
// import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
// import { CheckCircle2, Plus, Trash2, HelpCircle } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// export default function WhyChooseSection() {
//   const { register, control } = useFormContext<FullPagePayload>();

//   // Field Array for dynamic checkmark features
//   const {
//     fields: featureFields,
//     append: appendFeature,
//     remove: removeFeature,
//   } = useFieldArray({
//     control,
//     name: 'whyChoose.features' as ArrayPath<FullPagePayload>,
//   });

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* SECTION HEADER */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//         <div className="flex items-center gap-2.5">
//           <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
//             <CheckCircle2 className="w-5 h-5" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">Why Choose Section</h2>
//             <p className="text-xs text-slate-500">
//               Manage your primary value proposition and key feature highlights grid.
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={() =>
//             appendFeature({
//               id: `feat-${Date.now()}`,
//               text: '',
//             } as never)
//           }
//           className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
//         >
//           <Plus className="w-4 h-4" /> Add Feature Pill
//         </button>
//       </div>

//       {/* HEADING & DESCRIPTION INPUTS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//             Section Title
//           </label>
//           <input
//             type="text"
//             {...register('whyChoose.title' as never)}
//             defaultValue="Why Choose React?"
//             placeholder="e.g. Why Choose React?"
//             className="w-full px-3.5 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//             Section Paragraph / Description
//           </label>
//           <textarea
//             rows={3}
//             {...register('whyChoose.description' as never)}
//             defaultValue="React is one of the most widely adopted frontend libraries for building modern web applications. It's an excellent choice for startups launching an MVP as well as enterprises building complex core software."
//             placeholder="React is one of the most widely adopted frontend libraries..."
//             className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* LIVE FORM PREVIEW CONTAINER (Matching Dark Banner Aesthetics) */}
//       <div className="bg-[#2D2A8C] p-6 rounded-2xl shadow-md text-white space-y-6">
//         <div className="flex items-center justify-between border-b border-indigo-400/30 pb-3">
//           <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
//             <HelpCircle className="w-4 h-4" /> Feature Pills Grid ({featureFields.length})
//           </span>
//           <span className="text-[11px] text-indigo-300">3 Columns Layout</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           {featureFields.map((field, index) => (
//             <div
//               key={field.id}
//               className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-indigo-400/20 p-2.5 rounded-xl transition hover:bg-white/15"
//             >
//               <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
//               <input
//                 type="text"
//                 {...register(`whyChoose.features.${index}.text` as never)}
//                 placeholder="e.g. Fast rendering via Virtual DOM"
//                 className="w-full bg-transparent text-xs text-white placeholder-indigo-300/60 focus:outline-none font-medium"
//               />
//               {featureFields.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeFeature(index)}
//                   className="text-indigo-300 hover:text-red-400 transition p-1 shrink-0"
//                   title="Remove Feature"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }