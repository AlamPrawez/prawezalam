'use client';

import React, { useRef, useState } from 'react';
import { useForm, FormProvider, useWatch, useFormContext } from 'react-hook-form';
import { Trash2, Plus, X, Check } from 'lucide-react';
import type { HeroLayoutStyle, PageBuilderValues, PageSectionItem } from './types';
import { HeroView } from './views/HeroView';

// ------------------------------------------------------------------
// What actually gets stored, per section, once you hit Save.
// This is what a "fetch from DB and render" step would receive —
// note there's no title/subtitle/buttons here anymore, just markup.
// ------------------------------------------------------------------

export interface StoredSection {
  id: string;
  type: string;
  html: string;
}

// Strips editor-only chrome (delete/add buttons) and contentEditable
// attributes out of a captured DOM fragment before it's saved, so what
// gets stored is clean output — not a snapshot of the editing UI.
function cleanExportHtml(rawHtml: string): string {
  const container = document.createElement('div');
  container.innerHTML = rawHtml;
  container.querySelectorAll('[data-editor-only]').forEach((el) => el.remove());
  container.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
  container.querySelectorAll('[data-placeholder]').forEach((el) => el.removeAttribute('data-placeholder'));
  return container.innerHTML;
}

// Walks the live canvas DOM and pulls the real rendered markup for
// each section by id. This is the actual "capture the edited UI"
// step — no reading from react-hook-form field values here.
function buildStoredSections(sections: PageSectionItem[], canvasEl: HTMLElement | null): StoredSection[] {
  return sections.map((sec) => {
    const root = canvasEl?.querySelector<HTMLElement>(`[data-section-root="${sec.id}"]`);
    return {
      id: sec.id,
      type: sec.type,
      html: root ? cleanExportHtml(root.innerHTML) : '',
    };
  });
}

// ------------------------------------------------------------------
// Preview-only sample content — only used to render legible thumbnails
// in the layout picker. Never written to the actual section.
// ------------------------------------------------------------------

function makePreviewSample(layoutStyle: HeroLayoutStyle): PageSectionItem {
  switch (layoutStyle) {
    case 'profile-hero':
      return {
        id: 'preview', type: 'hero', layoutStyle,
        title: 'Full-Stack Engineer for React & FastAPI',
        subtitle: 'Elite software development, engineered for performance.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        buttons: [{ id: 'p1', text: 'Book Call', url: '#', variant: 'primary' }],
      };
    case 'interactive-code-hero':
      return {
        id: 'preview', type: 'hero', layoutStyle,
        title: 'Ship Production APIs Fast',
        subtitle: 'Async FastAPI backends, modern React frontends.',
        bulletPoints: ['Async by default', 'Type-safe'],
        buttons: [{ id: 'p1', text: 'Start a Project', url: '#', variant: 'primary' }],
      };
    case 'split-right':
      return {
        id: 'preview', type: 'hero', layoutStyle, bgTheme: 'dark',
        title: 'React.js Development Services',
        subtitle: 'Production-ready codebases built for scale.',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        buttons: [{ id: 'p1', text: 'Get Started', url: '#', variant: 'primary' }],
      };
    case 'split-left':
      return {
        id: 'preview', type: 'hero', layoutStyle, bgTheme: 'slate',
        title: 'Developer-First Engineering',
        subtitle: 'Clean, maintainable codebases for technical founders.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        buttons: [{ id: 'p1', text: 'Explore Codebase', url: '#', variant: 'primary' }],
      };
    case 'centered':
      return {
        id: 'preview', type: 'hero', layoutStyle, bgTheme: 'indigo',
        title: 'Let’s Build Something Exceptional',
        subtitle: 'Partner with an expert full-stack engineer.',
        buttons: [{ id: 'p1', text: 'Get a Quote', url: '#', variant: 'primary' }],
      };
  }
}

// What lands on the canvas when you pick a layout: same structure,
// zero content. You still edit via HeroView's fields while authoring —
// it's only what gets *saved* that changes to raw HTML.
function makeBlankHero(layoutStyle: HeroLayoutStyle): PageSectionItem {
  const bgTheme = layoutStyle === 'split-left' ? 'slate' : layoutStyle === 'split-right' ? 'dark' : layoutStyle === 'centered' ? 'indigo' : undefined;
  return {
    id: `sec-${Date.now()}`,
    type: 'hero',
    layoutStyle,
    bgTheme,
    title: '',
    subtitle: '',
    imageUrl: '',
    buttons: [],
    bulletPoints: [],
  };
}

const VARIANTS: { value: HeroLayoutStyle; label: string }[] = [
  { value: 'profile-hero', label: 'Profile' },
  { value: 'interactive-code-hero', label: 'Code Terminal' },
  { value: 'split-right', label: 'Split Right' },
  { value: 'split-left', label: 'Split Left' },
  { value: 'centered', label: 'Centered' },
];

function LayoutThumbnail({ layoutStyle }: { layoutStyle: HeroLayoutStyle }) {
  const sample = makePreviewSample(layoutStyle);
  return (
    <div className="relative w-full h-40 overflow-hidden rounded-lg bg-slate-950">
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '1280px', transform: 'scale(0.235)', transformOrigin: 'top left' }}
      >
        <HeroView sec={sample} onChange={() => {}} />
      </div>
    </div>
  );
}

function LayoutPickerModal({ onPick, onClose }: { onPick: (v: HeroLayoutStyle) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base font-extrabold text-white">Choose a Hero Layout</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VARIANTS.map((v) => (
            <button
              key={v.value}
              type="button"
              onClick={() => onPick(v.value)}
              className="group text-left rounded-2xl border border-slate-800 hover:border-indigo-500 bg-slate-950 p-3 transition"
            >
              <LayoutThumbnail layoutStyle={v.value} />
              <div className="flex items-center justify-between pt-3 px-1">
                <span className="text-xs font-bold text-slate-200">{v.label}</span>
                <span className="text-[10px] font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> Use this
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// One hero block on the canvas. The data-section-root div is exactly
// what gets captured on Save — it wraps ONLY the HeroView output, so
// the delete button (a sibling) is naturally excluded from storage.
// ------------------------------------------------------------------

function HeroBlock({ index }: { index: number }) {
  const { watch, setValue } = useFormContext<PageBuilderValues>();
  const sections = watch('sections') || [];
  const sec = sections[index];
  if (!sec) return null;

  const handleChange = (patch: Partial<PageSectionItem>) => {
    setValue(`sections.${index}` as const, { ...sec, ...patch }, { shouldDirty: true });
  };

  const removeSection = () => {
    setValue('sections', sections.filter((_, i) => i !== index), { shouldDirty: true });
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={removeSection}
        className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-slate-950/90 border border-slate-800 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition"
        title="Delete section"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      <div data-section-root={sec.id}>
        <HeroView sec={sec} onChange={handleChange} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Canvas — forwards a ref up to Page so Save can read the live DOM.
// ------------------------------------------------------------------

function Canvas({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement | null> }) {
  const { setValue } = useFormContext<PageBuilderValues>();
  const sections: PageSectionItem[] = useWatch({ name: 'sections' }) || [];
  const [pickerOpen, setPickerOpen] = useState(false);

  const handlePick = (variant: HeroLayoutStyle) => {
    setValue('sections', [...sections, makeBlankHero(variant)], { shouldDirty: true });
    setPickerOpen(false);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setPickerOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30"
      >
        <Plus className="w-4 h-4" /> Add Hero Section
      </button>

      <div ref={canvasRef} className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        {sections.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-slate-950">
            No sections yet — click "Add Hero Section", pick a layout, then click any text on it to edit.
          </div>
        ) : (
          sections.map((sec, index) => <HeroBlock key={sec.id} index={index} />)
        )}
      </div>

      {pickerOpen && <LayoutPickerModal onPick={handlePick} onClose={() => setPickerOpen(false)} />}
    </div>
  );
}

// ------------------------------------------------------------------
// Page — form still drives the live editing (title/subtitle/etc are
// still what HeroView edits in place). Save ignores those field
// values and instead reads the rendered DOM to build StoredSection[],
// which is the shape you'd persist and later render directly.
// ------------------------------------------------------------------

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const methods = useForm<PageBuilderValues>({
    defaultValues: { title: '', slug: '', sections: [] },
  });

  const onSubmit = (data: PageBuilderValues) => {
    const stored = buildStoredSections(data.sections, canvasRef.current);
    console.log('🚀 Stored payload (this is what you save to the DB):');
    console.log(JSON.stringify(stored, null, 2));
    alert('Rendered HTML captured — check the browser console (F12).');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800">
          <span className="px-2 text-xs text-slate-400">Click any title, subtitle, bullet, or button below to edit it directly.</span>
          <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">
            Save Page Data
          </button>
        </div>

        <Canvas canvasRef={canvasRef} />
      </form>
    </FormProvider>
  );
}



// 'use client';

// import BlogPageBuilder from '@/components/Blog/BlogPageBuilder';
// import { PageSectionItem } from '@/components/Blog/types';
// import { HeroView } from '@/components/Blog/views/HeroView';
// import React, { useState } from 'react';
// import { useForm, FormProvider, useWatch } from 'react-hook-form';

// // Component to handle live preview rendering
// const LivePreviewRenderer: React.FC = () => {
//   // Read real-time sections array from react-hook-form
//   const sections: PageSectionItem[] = useWatch({ name: 'sections' }) || [];

//   if (sections.length === 0) {
//     return (
//       <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
//         No sections added yet. Add a section above to preview live UI.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-2 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
//       {sections.map((sec, index) => {
//         // Render corresponding view component based on section type
//         switch (sec.type) {
//           case 'hero':
//             return <HeroView key={sec.id || index} sec={sec} />;
          
//           // Add cases for other views here as you build them:
//           // case 'features':
//           //   return <FeaturesView key={sec.id || index} sec={sec} />;
          
//           default:
//             return (
//               <div key={index} className="p-4 bg-slate-900 text-slate-400 text-xs font-mono">
//                 [Unsupported Section Type: {sec.type}]
//               </div>
//             );
//         }
//       })}
//     </div>
//   );
// };

// export default function BlogsBoard() {
//   const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');

//   const methods = useForm({
//     defaultValues: {
//       title: '',
//       slug: '',
//       sections: [], // Keeps track of dynamic sections
//     },
//   });

//   const onSubmit = (data: any) => {
//     console.log('🚀 Submission Payload:', JSON.stringify(data, null, 2));
//     alert('Payload ready! Check browser console (F12).');
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 max-w-7xl mx-auto p-4">
        
//         {/* Navigation Bar to switch between Builder and Live UI Preview */}
//         <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800">
//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={() => setActiveTab('builder')}
//               className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
//                 activeTab === 'builder'
//                   ? 'bg-indigo-600 text-white'
//                   : 'text-slate-400 hover:text-white'
//               }`}
//             >
//               🛠 Builder Mode
//             </button>
//             <button
//               type="button"
//               onClick={() => setActiveTab('preview')}
//               className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
//                 activeTab === 'preview'
//                   ? 'bg-indigo-600 text-white'
//                   : 'text-slate-400 hover:text-white'
//               }`}
//             >
//               👁 Live UI Preview
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
//           >
//             Save Page Data
//           </button>
//         </div>

//         {/* Tab 1: Builder View */}
//         {activeTab === 'builder' && <BlogPageBuilder />}

//         {/* Tab 2: Full Rendered UI View */}
//         {activeTab === 'preview' && (
//           <div className="space-y-4">
//             <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
//               Live Browser Render Output:
//             </h2>
//             <LivePreviewRenderer />
//           </div>
//         )}

//       </form>
//     </FormProvider>
//   );
// }