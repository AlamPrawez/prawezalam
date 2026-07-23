'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
import { Tags, Building2, Plus, Trash2, Zap, Sparkles, ClipboardCheck } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

interface FeatureItem {
  id: string;
  label: string;
}

interface IndustryItem {
  id: string;
  name: string;
}

export default function FeaturesAndIndustriesSection() {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // Field Array for Frequently Built Features (Pill Badges)
  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
    replace: replaceFeatures,
  } = useFieldArray({
    control,
    name: 'features_industries.featuresSection.items' as ArrayPath<FullPagePayload>,
  });

  // Field Array for Industries (2-column Cards)
  const {
    fields: industryFields,
    append: appendIndustry,
    remove: removeIndustry,
    replace: replaceIndustries,
  } = useFieldArray({
    control,
    name: 'features_industries.industriesSection.items' as ArrayPath<FullPagePayload>,
  });

  // Default fallbacks to ensure items exist
  useEffect(() => {
    if (featureFields.length === 0) {
      appendFeature({ id: `feat-${Date.now()}-1`, label: '' } as never);
    }
    if (industryFields.length === 0) {
      appendIndustry({ id: `ind-${Date.now()}-1`, name: '' } as never);
    }
  }, [featureFields.length, industryFields.length, appendFeature, appendIndustry]);

  // SMART PARSER FOR BOTH SECTIONS
  const parseAndPopulateSections = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 1) return;

    let currentMode: 'INDUSTRIES' | 'FEATURES' | 'NONE' = 'NONE';

    const parsedIndustries: IndustryItem[] = [];
    const parsedFeatures: FeatureItem[] = [];

    let indTitle = '';
    let indSub = '';
    let featTitle = '';
    let featSub = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect Industries Header Block
      if (line.match(/^(industries|industries i work with|domains|verticals)/i)) {
        currentMode = 'INDUSTRIES';
        indTitle = line;
        continue;
      }

      // Detect Features Header Block
      if (line.match(/^(frequently built features|features|solutions|key features|built features)/i)) {
        currentMode = 'FEATURES';
        featTitle = line;
        continue;
      }

      const cleanLine = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();

      if (!cleanLine) continue;

      if (currentMode === 'INDUSTRIES') {
        // Subtitle detection (if line ends with ':' or contains descriptive text)
        if (!indSub && (line.endsWith(':') || line.toLowerCase().includes('including'))) {
          indSub = line;
          continue;
        }

        parsedIndustries.push({
          id: `ind-${Date.now()}-${parsedIndustries.length + 1}`,
          name: cleanLine,
        });
      } else if (currentMode === 'FEATURES') {
        // Subtitle detection
        if (!featSub && (line.endsWith(':') || line.toLowerCase().includes('include'))) {
          featSub = line;
          continue;
        }

        parsedFeatures.push({
          id: `feat-${Date.now()}-${parsedFeatures.length + 1}`,
          label: cleanLine,
        });
      } else {
        // Fallback detection if no header is found first
        if (line.toLowerCase().includes('industr')) {
          currentMode = 'INDUSTRIES';
          indTitle = line;
        } else if (line.toLowerCase().includes('feature') || line.toLowerCase().includes('solution')) {
          currentMode = 'FEATURES';
          featTitle = line;
        }
      }
    }

    // Populate Fields & Update Form
    if (indTitle) {
      setValue('features_industries.industriesSection.title' as never, indTitle as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (indSub) {
      setValue('features_industries.industriesSection.subtitle' as never, indSub as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (parsedIndustries.length > 0) {
      replaceIndustries(parsedIndustries as never[]);
    }

    if (featTitle) {
      setValue('features_industries.featuresSection.title' as never, featTitle as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (featSub) {
      setValue('features_industries.featuresSection.subtitle' as never, featSub as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (parsedFeatures.length > 0) {
      replaceFeatures(parsedFeatures as never[]);
    }
  };

  // Single Field Paste Event Trigger
  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 3) {
      e.preventDefault();
      parseAndPopulateSections(pasteText);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER & BULK ACTION */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          Features & Industries Overview
        </h2>

        <button
          type="button"
          onClick={() => setShowBulkModal(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
        >
          <Zap className="w-3.5 h-3.5" /> Bulk Paste Both Sections
        </button>
      </div>

      {/* 2-COLUMN GRID FOR CMS FORMS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= LEFT COLUMN: FREQUENTLY BUILT FEATURES ================= */}
        <div className="space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
          {/* COLUMN HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Tags className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Frequently Built Features</h2>
            </div>
            <button
              type="button"
              onClick={() => appendFeature({ id: `feat-${Date.now()}`, label: '' } as never)}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Tag
            </button>
          </div>

          {/* SECTION HEADER INPUTS */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-bold text-slate-600 uppercase">
                  Section Title
                </label>
                <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
                  <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
                </span>
              </div>
              <input
                type="text"
                {...register('features_industries.featuresSection.title' as never)}
                onPaste={handlePaste}
                defaultValue="Frequently Built Features"
                placeholder="e.g. Frequently Built Features"
                className="w-full px-3 py-2 text-xs font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Subtitle / Description
              </label>
              <input
                type="text"
                {...register('features_industries.featuresSection.subtitle' as never)}
                defaultValue="Some of the solutions I regularly engineer into custom web applications:"
                placeholder="e.g. Some of the solutions I regularly engineer..."
                className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* DYNAMIC PILL BADGES FORM LIST (OPTION 2) */}
          <div className="space-y-2 pt-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Feature Badges ({featureFields.length})
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              {featureFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 pl-2.5 pr-1 py-1 rounded-lg shadow-2xs hover:border-indigo-300 transition"
                >
                  <input
                    type="text"
                    {...register(`features_industries.featuresSection.items.${index}.label` as never)}
                    placeholder="e.g. User authentication"
                    className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none w-36 sm:w-auto"
                  />
                  {featureFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-slate-400 hover:text-red-500 transition p-0.5 rounded"
                      title="Remove Badge"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INDUSTRIES I WORK WITH ================= */}
        <div className="space-y-5">
          {/* COLUMN HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Industries I Work With</h2>
            </div>
            <button
              type="button"
              onClick={() => appendIndustry({ id: `ind-${Date.now()}`, name: '' } as never)}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Industry
            </button>
          </div>

          {/* SECTION HEADER INPUTS */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-bold text-slate-600 uppercase">
                  Section Title
                </label>
                <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
                  <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
                </span>
              </div>
              <input
                type="text"
                {...register('features_industries.industriesSection.title' as never)}
                onPaste={handlePaste}
                defaultValue="Industries I Work With"
                placeholder="e.g. Industries I Work With"
                className="w-full px-3 py-2 text-xs font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Subtitle / Description
              </label>
              <input
                type="text"
                {...register('features_industries.industriesSection.subtitle' as never)}
                defaultValue="React structures fit seamlessly into many domain configurations, including:"
                placeholder="e.g. React structures fit seamlessly into..."
                className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* DYNAMIC INDUSTRIES 2-COLUMN CARDS GRID (OPTION 2) */}
          <div className="space-y-2 pt-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Industry Cards ({industryFields.length})
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
              {industryFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-2xs hover:border-indigo-300 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  <input
                    type="text"
                    {...register(`features_industries.industriesSection.items.${index}.name` as never)}
                    placeholder="e.g. Healthcare"
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
                  />
                  {industryFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIndustry(index)}
                      className="text-slate-400 hover:text-red-500 transition p-0.5 shrink-0"
                      title="Remove Industry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BULK PASTE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill Features & Industries
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
              Paste your raw text below. The system automatically populates titles, subtitles, industry list items, and feature badges.
            </p>
            <textarea
              rows={12}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Industries I Work With\nReact works well across many industries, including:\nSaaS\nHealthcare\nEducation\n\nFrequently Built Features\nSome of the solutions I regularly develop include:\nUser authentication\nAdmin dashboards`}
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
                  parseAndPopulateSections(bulkText);
                  setShowBulkModal(false);
                  setBulkText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Auto-Generate Lists
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
// import { Tags, Building2, Plus, Trash2, Zap, Sparkles, ClipboardCheck } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// interface FeatureItem {
//   id: string;
//   label: string;
// }

// interface IndustryItem {
//   id: string;
//   name: string;
// }

// export default function FeaturesAndIndustriesSection() {
//   const { register, control, setValue } = useFormContext<FullPagePayload>();
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [bulkText, setBulkText] = useState('');

//   // Field Array for Frequently Built Features (Pill Badges)
//   const {
//     fields: featureFields,
//     append: appendFeature,
//     remove: removeFeature,
//     replace: replaceFeatures,
//   } = useFieldArray({
//     control,
//     name: 'featuresSection.items' as ArrayPath<FullPagePayload>,
//   });

//   // Field Array for Industries (2-column Cards)
//   const {
//     fields: industryFields,
//     append: appendIndustry,
//     remove: removeIndustry,
//     replace: replaceIndustries,
//   } = useFieldArray({
//     control,
//     name: 'industriesSection.items' as ArrayPath<FullPagePayload>,
//   });

//   // Default fallbacks to ensure items exist
//   useEffect(() => {
//     if (featureFields.length === 0) {
//       appendFeature({ id: `feat-${Date.now()}-1`, label: '' } as never);
//     }
//     if (industryFields.length === 0) {
//       appendIndustry({ id: `ind-${Date.now()}-1`, name: '' } as never);
//     }
//   }, [featureFields.length, industryFields.length, appendFeature, appendIndustry]);

//   // SMART PARSER FOR BOTH SECTIONS
//   const parseAndPopulateSections = (rawText: string) => {
//     const lines = rawText
//       .split('\n')
//       .map((l) => l.trim())
//       .filter((l) => l.length > 0);

//     if (lines.length < 1) return;

//     let currentMode: 'INDUSTRIES' | 'FEATURES' | 'NONE' = 'NONE';

//     const parsedIndustries: IndustryItem[] = [];
//     const parsedFeatures: FeatureItem[] = [];

//     let indTitle = '';
//     let indSub = '';
//     let featTitle = '';
//     let featSub = '';

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i];

//       // Detect Industries Header Block
//       if (line.match(/^(industries|industries i work with|domains|verticals)/i)) {
//         currentMode = 'INDUSTRIES';
//         indTitle = line;
//         continue;
//       }

//       // Detect Features Header Block
//       if (line.match(/^(frequently built features|features|solutions|key features|built features)/i)) {
//         currentMode = 'FEATURES';
//         featTitle = line;
//         continue;
//       }

//       const isBulletOrDash = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
//       const cleanLine = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();

//       if (!cleanLine) continue;

//       if (currentMode === 'INDUSTRIES') {
//         // Subtitle detection (if line ends with ':' or contains descriptive text)
//         if (!indSub && (line.endsWith(':') || line.toLowerCase().includes('including'))) {
//           indSub = line;
//           continue;
//         }

//         parsedIndustries.push({
//           id: `ind-${Date.now()}-${parsedIndustries.length + 1}`,
//           name: cleanLine,
//         });
//       } else if (currentMode === 'FEATURES') {
//         // Subtitle detection
//         if (!featSub && (line.endsWith(':') || line.toLowerCase().includes('include'))) {
//           featSub = line;
//           continue;
//         }

//         parsedFeatures.push({
//           id: `feat-${Date.now()}-${parsedFeatures.length + 1}`,
//           label: cleanLine,
//         });
//       } else {
//         // Fallback detection if no header is found first
//         if (line.toLowerCase().includes('industr')) {
//           currentMode = 'INDUSTRIES';
//           indTitle = line;
//         } else if (line.toLowerCase().includes('feature') || line.toLowerCase().includes('solution')) {
//           currentMode = 'FEATURES';
//           featTitle = line;
//         }
//       }
//     }

//     // Populate Fields & Update Form
//     if (indTitle) {
//       setValue('industriesSection.title' as never, indTitle as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//     if (indSub) {
//       setValue('industriesSection.subtitle' as never, indSub as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//     if (parsedIndustries.length > 0) {
//       replaceIndustries(parsedIndustries as never[]);
//     }

//     if (featTitle) {
//       setValue('featuresSection.title' as never, featTitle as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//     if (featSub) {
//       setValue('featuresSection.subtitle' as never, featSub as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//     if (parsedFeatures.length > 0) {
//       replaceFeatures(parsedFeatures as never[]);
//     }
//   };

//   // Single Field Paste Event Trigger
//   const handlePaste = (e: React.ClipboardEvent) => {
//     const pasteText = e.clipboardData.getData('text');
//     if (pasteText.split('\n').filter((l) => l.trim()).length > 3) {
//       e.preventDefault();
//       parseAndPopulateSections(pasteText);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* SECTION HEADER & BULK ACTION */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//         <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
//           Features & Industries Overview
//         </h2>

//         <button
//           type="button"
//           onClick={() => setShowBulkModal(true)}
//           className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
//         >
//           <Zap className="w-3.5 h-3.5" /> Bulk Paste Both Sections
//         </button>
//       </div>

//       {/* 2-COLUMN GRID FOR CMS FORMS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* ================= LEFT COLUMN: FREQUENTLY BUILT FEATURES ================= */}
//         <div className="space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
//           {/* COLUMN HEADER */}
//           <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
//                 <Tags className="w-4 h-4" />
//               </div>
//               <h2 className="text-base font-bold text-slate-900">Frequently Built Features</h2>
//             </div>
//             <button
//               type="button"
//               onClick={() => appendFeature({ id: `feat-${Date.now()}`, label: '' } as never)}
//               className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//             >
//               <Plus className="w-3.5 h-3.5" /> Add Tag
//             </button>
//           </div>

//           {/* SECTION HEADER INPUTS */}
//           <div className="space-y-3">
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <label className="block text-[11px] font-bold text-slate-600 uppercase">
//                   Section Title
//                 </label>
//                 <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
//                   <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 {...register('featuresSection.title' as never)}
//                 onPaste={handlePaste}
//                 defaultValue="Frequently Built Features"
//                 placeholder="e.g. Frequently Built Features"
//                 className="w-full px-3 py-2 text-xs font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//                 Subtitle / Description
//               </label>
//               <input
//                 type="text"
//                 {...register('featuresSection.subtitle' as never)}
//                 defaultValue="Some of the solutions I regularly engineer into custom web applications:"
//                 placeholder="e.g. Some of the solutions I regularly engineer..."
//                 className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           </div>

//           {/* DYNAMIC PILL BADGES FORM LIST (OPTION 2) */}
//           <div className="space-y-2 pt-2">
//             <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//               Feature Badges ({featureFields.length})
//             </label>
//             <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
//               {featureFields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="flex items-center gap-1.5 bg-white border border-slate-200 pl-2.5 pr-1 py-1 rounded-lg shadow-2xs hover:border-indigo-300 transition"
//                 >
//                   <input
//                     type="text"
//                     {...register(`featuresSection.items.${index}.label` as never)}
//                     placeholder="e.g. User authentication"
//                     className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none w-36 sm:w-auto"
//                   />
//                   {featureFields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeFeature(index)}
//                       className="text-slate-400 hover:text-red-500 transition p-0.5 rounded"
//                       title="Remove Badge"
//                     >
//                       <Trash2 className="w-3 h-3" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ================= RIGHT COLUMN: INDUSTRIES I WORK WITH ================= */}
//         <div className="space-y-5">
//           {/* COLUMN HEADER */}
//           <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
//                 <Building2 className="w-4 h-4" />
//               </div>
//               <h2 className="text-base font-bold text-slate-900">Industries I Work With</h2>
//             </div>
//             <button
//               type="button"
//               onClick={() => appendIndustry({ id: `ind-${Date.now()}`, name: '' } as never)}
//               className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//             >
//               <Plus className="w-3.5 h-3.5" /> Add Industry
//             </button>
//           </div>

//           {/* SECTION HEADER INPUTS */}
//           <div className="space-y-3">
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <label className="block text-[11px] font-bold text-slate-600 uppercase">
//                   Section Title
//                 </label>
//                 <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
//                   <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 {...register('industriesSection.title' as never)}
//                 onPaste={handlePaste}
//                 defaultValue="Industries I Work With"
//                 placeholder="e.g. Industries I Work With"
//                 className="w-full px-3 py-2 text-xs font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//                 Subtitle / Description
//               </label>
//               <input
//                 type="text"
//                 {...register('industriesSection.subtitle' as never)}
//                 defaultValue="React structures fit seamlessly into many domain configurations, including:"
//                 placeholder="e.g. React structures fit seamlessly into..."
//                 className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           </div>

//           {/* DYNAMIC INDUSTRIES 2-COLUMN CARDS GRID (OPTION 2) */}
//           <div className="space-y-2 pt-2">
//             <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//               Industry Cards ({industryFields.length})
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
//               {industryFields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-2xs hover:border-indigo-300 transition"
//                 >
//                   <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
//                   <input
//                     type="text"
//                     {...register(`industriesSection.items.${index}.name` as never)}
//                     placeholder="e.g. Healthcare"
//                     className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
//                   />
//                   {industryFields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeIndustry(index)}
//                       className="text-slate-400 hover:text-red-500 transition p-0.5 shrink-0"
//                       title="Remove Industry"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
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
//                 Bulk Auto-Fill Features & Industries
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
//               Paste your raw text below. The system automatically populates titles, subtitles, industry list items, and feature badges.
//             </p>
//             <textarea
//               rows={12}
//               value={bulkText}
//               onChange={(e) => setBulkText(e.target.value)}
//               placeholder={`Industries I Work With\nReact works well across many industries, including:\nSaaS\nHealthcare\nEducation\n\nFrequently Built Features\nSome of the solutions I regularly develop include:\nUser authentication\nAdmin dashboards`}
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
//                   parseAndPopulateSections(bulkText);
//                   setShowBulkModal(false);
//                   setBulkText('');
//                 }}
//                 className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Auto-Generate Lists
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }