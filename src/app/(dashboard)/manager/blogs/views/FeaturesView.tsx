'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Layers, ArrowRight, Plus, Trash2, Check, ExternalLink } from 'lucide-react';
import type { FeatureCard, PageSectionItem, PageButton } from '../types';

type OnChange = (patch: Partial<PageSectionItem>) => void;

export type FeaturesLayoutStyle = 'grid-3col' | 'list-vertical' | 'bento';

export const FEATURES_VARIANTS: { value: FeaturesLayoutStyle; label: string; description: string }[] = [
  {
    value: 'grid-3col',
    label: '3-Column Grid',
    description: 'Balanced 3-column feature card layout suitable for core product pillars.',
  },
  {
    value: 'list-vertical',
    label: 'Vertical Icon List',
    description: 'Clean stacked feature list with prominent icon blocks and inline copy.',
  },
  {
    value: 'bento',
    label: 'Bento Grid Layout',
    description: 'Modern asymmetric grid layout featuring an accented wide primary card.',
  },
];

// Exported factory function for blank features sections
export function makeBlankFeatures(layoutStyle: FeaturesLayoutStyle = 'grid-3col'): PageSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'features',
    layoutStyle: layoutStyle as any, // Prevents strict type mismatch with PageSectionItem
    bgTheme: 'dark',
    paddingSize: 'md',
    title: 'Features & Architecture',
    subtitle: 'Modern software patterns built for high speed and scale.',
    cardsList: [
      { title: 'FastAPI Backend', desc: 'High-performance Python backend with automatic OpenAPI spec validation.' },
      { title: 'Next.js Frontend', desc: 'App router-based React architecture engineered for speed and SEO.' },
      { title: 'Scalable Database', desc: 'PostgreSQL architecture configured with async ORMs and optimized indexes.' },
    ],
    buttons: [{ id: `btn-${Date.now()}`, text: 'View System Specs', url: '#', variant: 'primary' }],
  };
}

// Shared Outside Click Hook
function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Shared Editable-Text Primitive
const EditableText: React.FC<{
  value: string;
  onCommit: (next: string) => void;
  as?: React.ElementType;
  className?: string;
  placeholder?: string;
}> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
  const ref = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused && ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value, focused]);

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocused(true)}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        setFocused(false);
        onCommit(e.currentTarget.innerText);
      }}
      data-placeholder={placeholder}
      className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
    />
  );
};

// Configurable Editable Buttons with Link Selector
const EditableButtons: React.FC<{
  buttons: PageButton[];
  onChange: (next: PageButton[]) => void;
}> = ({ buttons, onChange }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setActiveMenuIndex(null));

  const updateButton = (i: number, patch: Partial<PageButton>) => {
    const next = [...buttons];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => {
    setActiveMenuIndex(null);
    onChange(buttons.filter((_, idx) => idx !== i));
  };

  const add = () =>
    onChange([
      ...buttons,
      { id: `btn-${Date.now()}`, text: 'New Action Link', url: '#', variant: 'primary' },
    ]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2" ref={menuRef}>
      {buttons.map((btn, i) => (
        <div key={btn.id} className="group/item relative inline-flex items-center">
          <a
            href={btn.url || '#'}
            onClick={(e) => {
              if (!btn.url || btn.url === '#') e.preventDefault();
            }}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition flex items-center gap-2"
          >
            <EditableText
              as="span"
              value={btn.text}
              onCommit={(v) => updateButton(i, { text: v })}
              placeholder="Button Label"
            />
            <ArrowRight className="w-4 h-4 inline" />
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveMenuIndex(activeMenuIndex === i ? null : i);
            }}
            title="Configure Button URL"
            className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
          >
            ⚙
          </button>

          {activeMenuIndex === i && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3 text-left"
            >
              <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
                <span>Configure URL Link</span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-red-400 hover:text-red-300 text-[11px] font-normal"
                >
                  Delete
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium uppercase">Target Link URL</label>
                <input
                  type="text"
                  value={btn.url || ''}
                  onChange={(e) => updateButton(i, { url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {buttons.length === 0 && (
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add CTA Button
        </button>
      )}
    </div>
  );
};

// VARIANT 1: 3-Column Grid
const Grid3ColView: React.FC<{
  cards: FeatureCard[];
  cardThemeClass: string;
  updateCard: (i: number, patch: Partial<FeatureCard>) => void;
  removeCard: (i: number) => void;
}> = ({ cards, cardThemeClass, updateCard, removeCard }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {cards.map((card, idx) => (
      <div
        key={idx}
        className={`group/card relative p-6 rounded-2xl border space-y-3 shadow-xl transition ${cardThemeClass}`}
      >
        <button
          type="button"
          onClick={() => removeCard(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition z-10"
          title="Delete feature card"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
          <Layers className="w-5 h-5" />
        </div>

        <EditableText
          as="h3"
          value={card.title}
          onCommit={(v) => updateCard(idx, { title: v })}
          placeholder="Feature Title"
          className="block text-base font-bold"
        />

        <EditableText
          as="p"
          value={card.desc}
          onCommit={(v) => updateCard(idx, { desc: v })}
          placeholder="Feature description…"
          className="block text-xs opacity-75 leading-relaxed"
        />
      </div>
    ))}
  </div>
);

// VARIANT 2: Vertical List
const VerticalListView: React.FC<{
  cards: FeatureCard[];
  cardThemeClass: string;
  updateCard: (i: number, patch: Partial<FeatureCard>) => void;
  removeCard: (i: number) => void;
}> = ({ cards, cardThemeClass, updateCard, removeCard }) => (
  <div className="space-y-4 max-w-3xl mx-auto">
    {cards.map((card, idx) => (
      <div
        key={idx}
        className={`group/card relative p-5 rounded-2xl border flex items-start gap-4 shadow-lg transition ${cardThemeClass}`}
      >
        <button
          type="button"
          onClick={() => removeCard(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition z-10"
          title="Delete feature card"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold mt-0.5">
          <Layers className="w-5 h-5" />
        </div>

        <div className="space-y-1 pr-6 flex-1">
          <EditableText
            as="h3"
            value={card.title}
            onCommit={(v) => updateCard(idx, { title: v })}
            placeholder="Feature Title"
            className="block text-base font-bold"
          />

          <EditableText
            as="p"
            value={card.desc}
            onCommit={(v) => updateCard(idx, { desc: v })}
            placeholder="Feature description…"
            className="block text-xs opacity-75 leading-relaxed"
          />
        </div>
      </div>
    ))}
  </div>
);

// VARIANT 3: Bento Grid
const BentoGridView: React.FC<{
  cards: FeatureCard[];
  cardThemeClass: string;
  updateCard: (i: number, patch: Partial<FeatureCard>) => void;
  removeCard: (i: number) => void;
}> = ({ cards, cardThemeClass, updateCard, removeCard }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {cards.map((card, idx) => {
      const isLarge = idx === 0;
      return (
        <div
          key={idx}
          className={`group/card relative p-6 rounded-2xl border space-y-3 shadow-xl transition ${cardThemeClass} ${
            isLarge ? 'md:col-span-2 bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-900 border-indigo-500/30' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => removeCard(idx)}
            className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition z-10"
            title="Delete feature card"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              isLarge ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-indigo-600/20 text-indigo-400'
            }`}
          >
            <Layers className="w-5 h-5" />
          </div>

          <EditableText
            as="h3"
            value={card.title}
            onCommit={(v) => updateCard(idx, { title: v })}
            placeholder="Feature Title"
            className={`block font-bold ${isLarge ? 'text-xl' : 'text-base'}`}
          />

          <EditableText
            as="p"
            value={card.desc}
            onCommit={(v) => updateCard(idx, { desc: v })}
            placeholder="Feature description…"
            className={`block text-xs opacity-75 leading-relaxed ${isLarge ? 'max-w-xl text-sm' : ''}`}
          />
        </div>
      );
    })}
  </div>
);

// Main FeaturesView Component
export const FeaturesView: React.FC<{
  sec: PageSectionItem;
  onChange?: OnChange;
}> = ({ sec, onChange }) => {
  const cards = sec.cardsList ?? [
    { title: 'FastAPI Backend', desc: 'High-performance Python backend with automatic OpenAPI spec validation.' },
    { title: 'Next.js Frontend', desc: 'App router-based React architecture engineered for speed and SEO.' },
    { title: 'Scalable Database', desc: 'PostgreSQL architecture configured with async ORMs and optimized indexes.' },
  ];

  const buttons = sec.buttons ?? [];

  const handleUpdate = (patch: Partial<PageSectionItem>) => {
    if (onChange) onChange(patch);
  };

  const updateCard = (index: number, patch: Partial<FeatureCard>) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ cardsList: updated });
  };

  const addCard = () => {
    handleUpdate({
      cardsList: [...cards, { title: 'New Feature', desc: 'Add description for this feature here.' }],
    });
  };

  const removeCard = (index: number) => {
    handleUpdate({ cardsList: cards.filter((_, i) => i !== index) });
  };

  const paddingClass =
    sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

  const themeClass =
    sec.bgTheme === 'indigo'
      ? 'bg-indigo-950 text-white border border-indigo-800/50'
      : sec.bgTheme === 'light'
      ? 'bg-slate-100 text-slate-900 border border-slate-200'
      : 'bg-slate-950 text-white border border-slate-800';

  const cardThemeClass =
    sec.bgTheme === 'light'
      ? 'bg-white border-slate-200 hover:border-indigo-400'
      : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40';

  return (
    <div className={`my-8 max-w-6xl mx-auto rounded-3xl space-y-8 ${paddingClass} ${themeClass}`}>
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <EditableText
          as="h2"
          value={sec.title || ''}
          onCommit={(v) => handleUpdate({ title: v })}
          placeholder="Features & Stack"
          className="block text-3xl font-extrabold tracking-tight"
        />
        <EditableText
          as="p"
          value={sec.subtitle || ''}
          onCommit={(v) => handleUpdate({ subtitle: v })}
          placeholder="Production-ready components designed to scale effortlessly."
          className="block text-sm opacity-80"
        />
      </div>

      {sec.layoutStyle === 'list-vertical' && (
        <VerticalListView
          cards={cards}
          cardThemeClass={cardThemeClass}
          updateCard={updateCard}
          removeCard={removeCard}
        />
      )}
      {sec.layoutStyle === 'bento' && (
        <BentoGridView
          cards={cards}
          cardThemeClass={cardThemeClass}
          updateCard={updateCard}
          removeCard={removeCard}
        />
      )}
      {(!sec.layoutStyle || sec.layoutStyle === 'grid-3col') && (
        <Grid3ColView
          cards={cards}
          cardThemeClass={cardThemeClass}
          updateCard={updateCard}
          removeCard={removeCard}
        />
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={addCard}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Card
        </button>
      </div>

      <EditableButtons
        buttons={buttons}
        onChange={(next) => handleUpdate({ buttons: next })}
      />
    </div>
  );
};

// Layout Thumbnail Helper Component
export function FeaturesThumbnail({ layoutStyle = 'grid-3col' }: { layoutStyle?: FeaturesLayoutStyle }) {
  const sampleFeatures = makeBlankFeatures(layoutStyle);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
      <div
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{
          width: '1280px',
          transform: 'scale(0.235)',
          transformOrigin: 'top left',
        }}
      >
        <FeaturesView sec={sampleFeatures} onChange={() => {}} />
      </div>
    </div>
  );
}

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Layers, ArrowRight, Plus, Trash2 } from 'lucide-react';
// import type { FeatureCard, PageSectionItem } from '../types';

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// // Exported factory function for blank features sections
// export function makeBlankFeatures(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'features',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Features & Architecture',
//     subtitle: 'Modern software patterns built for high speed and scale.',
//     cardsList: [
//       { title: 'FastAPI Backend', desc: 'High-performance Python backend with automatic OpenAPI spec validation.' },
//       { title: 'Next.js Frontend', desc: 'App router-based React architecture engineered for speed and SEO.' },
//       { title: 'Scalable Database', desc: 'PostgreSQL architecture configured with async ORMs and optimized indexes.' },
//     ],
//     buttons: [{ id: `btn-${Date.now()}`, text: 'View System Specs', url: '#', variant: 'primary' }],
//   };
// }

// // Shared Editable-Text Primitive
// const EditableText: React.FC<{
//   value: string;
//   onCommit: (next: string) => void;
//   as?: React.ElementType;
//   className?: string;
//   placeholder?: string;
// }> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
//   const ref = useRef<HTMLElement>(null);
//   const [focused, setFocused] = useState(false);

//   useEffect(() => {
//     if (!focused && ref.current && ref.current.innerText !== value) {
//       ref.current.innerText = value;
//     }
//   }, [value, focused]);

//   return (
//     <Tag
//       ref={ref}
//       contentEditable
//       suppressContentEditableWarning
//       onFocus={() => setFocused(true)}
//       onBlur={(e: React.FocusEvent<HTMLElement>) => {
//         setFocused(false);
//         onCommit(e.currentTarget.innerText);
//       }}
//       data-placeholder={placeholder}
//       className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//     />
//   );
// };

// // Main FeaturesView Component
// export const FeaturesView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const cards = sec.cardsList ?? [
//     { title: 'FastAPI Backend', desc: 'High-performance Python backend with automatic OpenAPI spec validation.' },
//     { title: 'Next.js Frontend', desc: 'App router-based React architecture engineered for speed and SEO.' },
//     { title: 'Scalable Database', desc: 'PostgreSQL architecture configured with async ORMs and optimized indexes.' },
//   ];

//   const buttons = sec.buttons ?? [];

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const updateCard = (index: number, patch: Partial<FeatureCard>) => {
//     const updated = [...cards];
//     updated[index] = { ...updated[index], ...patch };
//     handleUpdate({ cardsList: updated });
//   };

//   const addCard = () => {
//     handleUpdate({
//       cardsList: [...cards, { title: 'New Feature', desc: 'Add description for this feature here.' }],
//     });
//   };

//   const removeCard = (index: number) => {
//     handleUpdate({ cardsList: cards.filter((_, i) => i !== index) });
//   };

//   const updateButtonText = (btnId: string, newText: string) => {
//     const updated = buttons.map((b) => (b.id === btnId ? { ...b, text: newText } : b));
//     handleUpdate({ buttons: updated });
//   };

//   const addButton = () => {
//     handleUpdate({
//       buttons: [...buttons, { id: `btn-${Date.now()}`, text: 'Explore Architecture', url: '#', variant: 'primary' }],
//     });
//   };

//   const removeButton = (btnId: string) => {
//     handleUpdate({ buttons: buttons.filter((b) => b.id !== btnId) });
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white border border-indigo-800/50'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900 border border-slate-200'
//       : 'bg-slate-950 text-white border border-slate-800';

//   const cardThemeClass =
//     sec.bgTheme === 'light'
//       ? 'bg-white border-slate-200 hover:border-indigo-400'
//       : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40';

//   return (
//     <div className={`my-8 max-w-6xl mx-auto rounded-3xl space-y-10 ${paddingClass} ${themeClass}`}>
//       <div className="text-center space-y-3 max-w-2xl mx-auto">
//         <EditableText
//           as="h2"
//           value={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Features & Stack"
//           className="block text-3xl font-extrabold tracking-tight"
//         />
//         <EditableText
//           as="p"
//           value={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Production-ready components designed to scale effortlessly."
//           className="block text-sm opacity-80"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             className={`group/card relative p-6 rounded-2xl border space-y-3 shadow-xl transition ${cardThemeClass}`}
//           >
//             <button
//               type="button"
//               onClick={() => removeCard(idx)}
//               className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition z-10"
//               title="Delete feature card"
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//             </button>

//             <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
//               <Layers className="w-5 h-5" />
//             </div>

//             <EditableText
//               as="h3"
//               value={card.title}
//               onCommit={(v) => updateCard(idx, { title: v })}
//               placeholder="Feature Title"
//               className="block text-base font-bold"
//             />

//             <EditableText
//               as="p"
//               value={card.desc}
//               onCommit={(v) => updateCard(idx, { desc: v })}
//               placeholder="Feature description…"
//               className="block text-xs opacity-75 leading-relaxed"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="text-center">
//         <button
//           type="button"
//           onClick={addCard}
//           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
//         >
//           <Plus className="w-3.5 h-3.5" /> Add Card
//         </button>
//       </div>

//       <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
//         {buttons.map((btn) => (
//           <div key={btn.id} className="group/btn relative inline-flex items-center">
//             <div className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition flex items-center gap-2">
//               <EditableText
//                 as="span"
//                 value={btn.text}
//                 onCommit={(v) => updateButtonText(btn.id, v)}
//                 placeholder="Button Text"
//               />
//               <ArrowRight className="w-4 h-4 inline" />
//             </div>
//             <button
//               type="button"
//               onClick={() => removeButton(btn.id)}
//               className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 opacity-0 group-hover/btn:opacity-100 transition shadow"
//               title="Remove button"
//             >
//               <Trash2 className="w-3 h-3" />
//             </button>
//           </div>
//         ))}

//         {buttons.length === 0 && (
//           <button
//             type="button"
//             onClick={addButton}
//             className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
//           >
//             <Plus className="w-3.5 h-3.5" /> Add CTA Button
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };



// import React, { useState, useRef, useEffect } from 'react';
// import { Layers, ArrowRight, Plus, Trash2 } from 'lucide-react';
// import { FeatureCard, PageSectionItem } from '../types';



// type OnChange = (patch: Partial<PageSectionItem>) => void;

// function makeBlankFeatures(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'features',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Features & Architecture',
//     subtitle: 'Modern software patterns built for high speed and scale.',
//     cardsList: [
//       { title: 'FastAPI Backend', desc: 'High-performance Python backend with automatic OpenAPI spec validation.' },
//       { title: 'Next.js Frontend', desc: 'App router-based React architecture engineered for speed and SEO.' },
//       { title: 'Scalable Database', desc: 'PostgreSQL architecture configured with async ORMs and optimized indexes.' },
//     ],
//     buttons: [{ id: `btn-${Date.now()}`, text: 'View System Specs', url: '#', variant: 'primary' }],
//   };
// }
// // Editable Text Primitive
// const EditableText: React.FC<{
//   value: string;
//   onCommit: (next: string) => void;
//   as?: React.ElementType;
//   className?: string;
//   placeholder?: string;
// }> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
//   const ref = useRef<HTMLElement>(null);
//   const [focused, setFocused] = useState(false);

//   useEffect(() => {
//     if (!focused && ref.current && ref.current.innerText !== value) {
//       ref.current.innerText = value;
//     }
//   }, [value, focused]);

//   return (
//     <Tag
//       ref={ref}
//       contentEditable
//       suppressContentEditableWarning
//       onFocus={() => setFocused(true)}
//       onBlur={(e: React.FocusEvent<HTMLElement>) => {
//         setFocused(false);
//         onCommit(e.currentTarget.innerText);
//       }}
//       data-placeholder={placeholder}
//       className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//     />
//   );
// };

// export const FeaturesView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const cards = sec.cardsList ?? [
//     { title: 'FastAPI Backend', desc: 'High-performance Python backend with automatic OpenAPI spec validation.' },
//     { title: 'Next.js Frontend', desc: 'App router-based React architecture engineered for speed and SEO.' },
//     { title: 'Scalable Database', desc: 'PostgreSQL architecture configured with async ORMs and optimized indexes.' },
//   ];

//   const buttons = sec.buttons ?? [];

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const updateCard = (index: number, patch: Partial<FeatureCard>) => {
//     const updated = [...cards];
//     updated[index] = { ...updated[index], ...patch };
//     handleUpdate({ cardsList: updated });
//   };

//   const addCard = () => {
//     handleUpdate({
//       cardsList: [...cards, { title: 'New Feature', desc: 'Add description for this feature here.' }],
//     });
//   };

//   const removeCard = (index: number) => {
//     handleUpdate({ cardsList: cards.filter((_, i) => i !== index) });
//   };

//   const updateButtonText = (btnId: string, newText: string) => {
//     const updated = buttons.map((b) => (b.id === btnId ? { ...b, text: newText } : b));
//     handleUpdate({ buttons: updated });
//   };

//   const addButton = () => {
//     handleUpdate({
//       buttons: [...buttons, { id: `btn-${Date.now()}`, text: 'Explore Architecture', url: '#', variant: 'primary' }],
//     });
//   };

//   const removeButton = (btnId: string) => {
//     handleUpdate({ buttons: buttons.filter((b) => b.id !== btnId) });
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900'
//       : 'bg-slate-950 text-white';

//   return (
//     <div className={`my-8 max-w-6xl mx-auto rounded-3xl space-y-10 ${paddingClass} ${themeClass}`}>
//       <div className="text-center space-y-3 max-w-2xl mx-auto">
//         <EditableText
//           as="h2"
//           value={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Features & Stack"
//           className="block text-3xl font-extrabold tracking-tight"
//         />
//         <EditableText
//           as="p"
//           value={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Production-ready components designed to scale effortlessly."
//           className="block text-sm opacity-80"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             className="group/card relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl hover:border-indigo-500/40 transition"
//           >
//             <button
//               type="button"
//               onClick={() => removeCard(idx)}
//               className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition"
//               title="Delete feature card"
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//             </button>

//             <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
//               <Layers className="w-5 h-5" />
//             </div>

//             <EditableText
//               as="h3"
//               value={card.title}
//               onCommit={(v) => updateCard(idx, { title: v })}
//               placeholder="Feature Title"
//               className="block text-base font-bold text-white"
//             />

//             <EditableText
//               as="p"
//               value={card.desc}
//               onCommit={(v) => updateCard(idx, { desc: v })}
//               placeholder="Feature description…"
//               className="block text-xs text-slate-400 leading-relaxed"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="text-center">
//         <button
//           type="button"
//           onClick={addCard}
//           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
//         >
//           <Plus className="w-3.5 h-3.5" /> Add Card
//         </button>
//       </div>

//       <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
//         {buttons.map((btn) => (
//           <div key={btn.id} className="group/btn relative inline-flex items-center">
//             <div className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition flex items-center gap-2">
//               <EditableText
//                 as="span"
//                 value={btn.text}
//                 onCommit={(v) => updateButtonText(btn.id, v)}
//                 placeholder="Button Text"
//               />
//               <ArrowRight className="w-4 h-4 inline" />
//             </div>
//             <button
//               type="button"
//               onClick={() => removeButton(btn.id)}
//               className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 opacity-0 group-hover/btn:opacity-100 transition shadow"
//               title="Remove button"
//             >
//               <Trash2 className="w-3 h-3" />
//             </button>
//           </div>
//         ))}

//         {buttons.length === 0 && (
//           <button
//             type="button"
//             onClick={addButton}
//             className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
//           >
//             <Plus className="w-3.5 h-3.5" /> Add CTA Button
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };