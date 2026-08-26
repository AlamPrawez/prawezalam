'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CTALayoutStyle, PageButton, PageSectionItem } from '../types';

type OnChange = (patch: Partial<PageSectionItem>) => void;

export const CTA_VARIANTS: { value: CTALayoutStyle; label: string; description: string }[] = [
  {
    value: 'centered',
    label: 'Centered Banner',
    description: 'Classic centered banner with high-impact title and action buttons.',
  },
  {
    value: 'split-screen',
    label: 'Split Screen',
    description: 'Side-by-side layout separating action copy from action buttons.',
  },
  {
    value: 'card-floating',
    label: 'Card Floating',
    description: 'Elevated floating container with distinct background padding.',
  },
];

// Exported factory function for blank CTA sections supporting layout variants
export function makeBlankCTA(layoutStyle: CTALayoutStyle = 'centered'): PageSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'cta',
    layoutStyle: layoutStyle as any,
    bgTheme: 'indigo',
    paddingSize: 'md',
    title: 'Ready to Start?',
    subtitle: 'Transform your web project today with modern component architectures.',
    buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started Now', url: '#', variant: 'primary' }],
  };
}

// Custom Hook for Outside Clicks
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

// Editable Buttons Component
const EditableButtons: React.FC<{
  buttons: PageButton[];
  onChange: (next: PageButton[]) => void;
  primaryClass: string;
  secondaryClass: string;
  wrapClass?: string;
}> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center justify-center gap-3' }) => {
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
      { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
    ]);

  return (
    <div className={wrapClass} ref={menuRef}>
      {buttons.map((btn, i) => (
        <div key={btn.id} className="group/item relative inline-flex items-center">
          <a
            href={btn.url || '#'}
            onClick={(e) => {
              if (!btn.url || btn.url === '#') {
                e.preventDefault();
              }
            }}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition inline-flex items-center justify-center ${
              btn.variant === 'primary' ? primaryClass : secondaryClass
            }`}
          >
            <EditableText
              as="span"
              value={btn.text}
              onCommit={(v) => updateButton(i, { text: v })}
              placeholder="Button label"
            />
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveMenuIndex(activeMenuIndex === i ? null : i);
            }}
            title="Configure Button Link & Style"
            className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
            data-editor-only
          >
            ⚙
          </button>

          {activeMenuIndex === i && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3 text-left"
              data-editor-only
            >
              <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
                <span>Configure Button Link</span>
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

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-medium uppercase">Variant Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateButton(i, { variant: 'primary' })}
                    className={`py-1 rounded-lg border text-[11px] font-semibold ${
                      btn.variant === 'primary'
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    onClick={() => updateButton(i, { variant: 'secondary' })}
                    className={`py-1 rounded-lg border text-[11px] font-semibold ${
                      btn.variant !== 'primary'
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
        data-editor-only
      >
        + Button
      </button>
    </div>
  );
};

// VARIANT 1: Centered Banner
const CenteredCTAView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
  <div className="text-center space-y-6 max-w-4xl mx-auto">
    <EditableText
      as="h2"
      value={sec.title || ''}
      onCommit={(v) => onUpdate({ title: v })}
      placeholder="Ready to Start?"
      className="block text-3xl sm:text-5xl font-black tracking-tight"
    />

    <EditableText
      as="p"
      value={sec.subtitle || ''}
      onCommit={(v) => onUpdate({ subtitle: v })}
      placeholder="Add subtitle description here..."
      className="block text-sm sm:text-base opacity-80 max-w-xl mx-auto"
    />

    <div className="pt-2">
      <EditableButtons
        buttons={sec.buttons || []}
        onChange={(buttons) => onUpdate({ buttons })}
        primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
        secondaryClass="bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700"
        wrapClass="flex flex-wrap items-center justify-center gap-3"
      />
    </div>
  </div>
);

// VARIANT 2: Split Screen Layout (Expanded Gap & Margins)
const SplitCTAView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 text-center md:text-left my-4">
    <div className="max-w-xl">
      <EditableText
        as="h2"
        value={sec.title || ''}
        onCommit={(v) => onUpdate({ title: v })}
        placeholder="Ready to Start?"
        className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
      />

      <EditableText
        as="p"
        value={sec.subtitle || ''}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Add subtitle description here..."
        className="block mt-4 sm:mt-5 text-sm sm:text-base opacity-80 leading-relaxed"
      />
    </div>

    <div className="shrink-0 flex items-center justify-center md:justify-end">
      <EditableButtons
        buttons={sec.buttons || []}
        onChange={(buttons) => onUpdate({ buttons })}
        primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
        secondaryClass="bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700"
        wrapClass="flex flex-wrap items-center justify-center md:justify-end gap-4"
      />
    </div>
  </div>
);

// VARIANT 3: Card Floating Layout
const FloatingCardCTAView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
  <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
    <EditableText
      as="h2"
      value={sec.title || ''}
      onCommit={(v) => onUpdate({ title: v })}
      placeholder="Ready to Start?"
      className="block text-3xl sm:text-5xl font-black tracking-tight text-white"
    />

    <EditableText
      as="p"
      value={sec.subtitle || ''}
      onCommit={(v) => onUpdate({ subtitle: v })}
      placeholder="Add subtitle description here..."
      className="block text-sm sm:text-base opacity-80 max-w-lg mx-auto"
    />

    <div className="pt-2">
      <EditableButtons
        buttons={sec.buttons || []}
        onChange={(buttons) => onUpdate({ buttons })}
        primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
        secondaryClass="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
        wrapClass="flex flex-wrap items-center justify-center gap-3"
      />
    </div>
  </div>
);

// Main CTAView Component
export const CTAView: React.FC<{
  sec: PageSectionItem;
  onChange?: OnChange;
}> = ({ sec, onChange }) => {
  const handleUpdate = (patch: Partial<PageSectionItem>) => {
    if (onChange) {
      onChange(patch);
    }
  };

  const paddingClass =
    sec.paddingSize === 'sm'
      ? 'py-8 px-6'
      : sec.paddingSize === 'lg'
        ? 'py-24 px-12'
        : 'py-16 px-8';

  const themeClass =
    sec.bgTheme === 'indigo'
      ? 'bg-indigo-950 text-white'
      : sec.bgTheme === 'light'
        ? 'bg-slate-100 text-slate-900'
        : 'bg-slate-950 text-white';

  return (
    <div className={`w-full ${paddingClass} ${themeClass}`}>
      {sec.layoutStyle === 'split-screen' && (
        <SplitCTAView sec={sec} onUpdate={handleUpdate} />
      )}
      {sec.layoutStyle === 'card-floating' && (
        <FloatingCardCTAView sec={sec} onUpdate={handleUpdate} />
      )}
      {(!sec.layoutStyle || sec.layoutStyle === 'centered') && (
        <CenteredCTAView sec={sec} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

// Layout Thumbnail Helper Component
export function CTALayoutThumbnail({ layoutStyle = 'centered' }: { layoutStyle?: CTALayoutStyle }) {
  const sampleCTA = makeBlankCTA(layoutStyle);

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
        <CTAView sec={sampleCTA} onChange={() => { }} />
      </div>
    </div>
  );
}

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Check } from 'lucide-react';
// import { CTALayoutStyle, PageButton, PageSectionItem } from '../types';

// type OnChange = (patch: Partial<PageSectionItem>) => void;



// export const CTA_VARIANTS: { value: CTALayoutStyle; label: string; description: string }[] = [
//   {
//     value: 'centered',
//     label: 'Centered Banner',
//     description: 'Classic centered banner with high-impact title and action buttons.',
//   },
//   {
//     value: 'split-screen',
//     label: 'Split Screen',
//     description: 'Side-by-side layout separating action copy from action buttons.',
//   },
//   {
//     value: 'card-floating',
//     label: 'Card Floating',
//     description: 'Elevated floating container with distinct background padding.',
//   },
// ];

// // Exported factory function for blank CTA sections supporting layout variants
// export function makeBlankCTA(layoutStyle: CTALayoutStyle = 'centered'): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'cta',
//     layoutStyle: layoutStyle as any, // Prevents strict type mismatch with PageSectionItem
//     bgTheme: 'indigo',
//     paddingSize: 'md',
//     title: 'Ready to Start?',
//     subtitle: 'Transform your web project today with modern component architectures.',
//     buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started Now', url: '#', variant: 'primary' }],
//   };
// }

// // Custom Hook for Outside Clicks
// function useOnClickOutside<T extends HTMLElement>(
//   ref: React.RefObject<T | null>,
//   handler: () => void
// ) {
//   useEffect(() => {
//     const listener = (event: MouseEvent | TouchEvent) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }
//       handler();
//     };
//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
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

// // Editable Buttons Component
// const EditableButtons: React.FC<{
//   buttons: PageButton[];
//   onChange: (next: PageButton[]) => void;
//   primaryClass: string;
//   secondaryClass: string;
//   wrapClass?: string;
// }> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center justify-center gap-3' }) => {
//   const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useOnClickOutside(menuRef, () => setActiveMenuIndex(null));

//   const updateButton = (i: number, patch: Partial<PageButton>) => {
//     const next = [...buttons];
//     next[i] = { ...next[i], ...patch };
//     onChange(next);
//   };

//   const remove = (i: number) => {
//     setActiveMenuIndex(null);
//     onChange(buttons.filter((_, idx) => idx !== i));
//   };

//   const add = () =>
//     onChange([
//       ...buttons,
//       { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
//     ]);

//   return (
//     <div className={wrapClass} ref={menuRef}>
//       {buttons.map((btn, i) => (
//         <div key={btn.id} className="group/item relative inline-flex items-center">
//           <a
//             href={btn.url || '#'}
//             onClick={(e) => {
//               if (!btn.url || btn.url === '#') {
//                 e.preventDefault();
//               }
//             }}
//             className={`px-8 py-3.5 rounded-xl font-bold text-sm transition inline-flex items-center justify-center ${btn.variant === 'primary' ? primaryClass : secondaryClass
//               }`}
//           >
//             <EditableText
//               as="span"
//               value={btn.text}
//               onCommit={(v) => updateButton(i, { text: v })}
//               placeholder="Button label"
//             />
//           </a>

//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setActiveMenuIndex(activeMenuIndex === i ? null : i);
//             }}
//             title="Configure Button Link & Style"
//             className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
//             data-editor-only
//           >
//             ⚙
//           </button>

//           {activeMenuIndex === i && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3 text-left"
//               data-editor-only
//             >
//               <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
//                 <span>Configure Button Link</span>
//                 <button
//                   type="button"
//                   onClick={() => remove(i)}
//                   className="text-red-400 hover:text-red-300 text-[11px] font-normal"
//                 >
//                   Delete
//                 </button>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 font-medium uppercase">Target Link URL</label>
//                 <input
//                   type="text"
//                   value={btn.url || ''}
//                   onChange={(e) => updateButton(i, { url: e.target.value })}
//                   placeholder="https://example.com"
//                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 font-medium uppercase">Variant Style</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'primary' })}
//                     className={`py-1 rounded-lg border text-[11px] font-semibold ${btn.variant === 'primary'
//                       ? 'bg-indigo-600 border-indigo-500 text-white'
//                       : 'bg-slate-800 border-slate-700 text-slate-400'
//                       }`}
//                   >
//                     Primary
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'secondary' })}
//                     className={`py-1 rounded-lg border text-[11px] font-semibold ${btn.variant !== 'primary'
//                       ? 'bg-indigo-600 border-indigo-500 text-white'
//                       : 'bg-slate-800 border-slate-700 text-slate-400'
//                       }`}
//                   >
//                     Secondary
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={add}
//         className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
//         data-editor-only
//       >
//         + Button
//       </button>
//     </div>
//   );
// };

// // VARIANT 1: Centered Banner
// const CenteredCTAView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
//   <div className="text-center space-y-6">
//     <EditableText
//       as="h2"
//       value={sec.title || ''}
//       onCommit={(v) => onUpdate({ title: v })}
//       placeholder="Ready to Start?"
//       className="block text-3xl sm:text-5xl font-black tracking-tight"
//     />

//     <EditableText
//       as="p"
//       value={sec.subtitle || ''}
//       onCommit={(v) => onUpdate({ subtitle: v })}
//       placeholder="Add subtitle description here..."
//       className="block text-sm sm:text-base opacity-80 max-w-xl mx-auto"
//     />

//     <div className="pt-2">
//       <EditableButtons
//         buttons={sec.buttons || []}
//         onChange={(buttons) => onUpdate({ buttons })}
//         primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
//         secondaryClass="bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700"
//         wrapClass="flex flex-wrap items-center justify-center gap-3"
//       />
//     </div>
//   </div>
// );

// // VARIANT 2: Split Screen Layout
// const SplitCTAView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
//   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left">
//     <div className="space-y-3 max-w-lg">
//       <EditableText
//         as="h2"
//         value={sec.title || ''}
//         onCommit={(v) => onUpdate({ title: v })}
//         placeholder="Ready to Start?"
//         className="block text-3xl sm:text-4xl font-extrabold tracking-tight"
//       />

//       <EditableText
//         as="p"
//         value={sec.subtitle || ''}
//         onCommit={(v) => onUpdate({ subtitle: v })}
//         placeholder="Add subtitle description here..."
//         className="block text-sm sm:text-base opacity-80"
//       />
//     </div>

//     <div className="shrink-0">
//       <EditableButtons
//         buttons={sec.buttons || []}
//         onChange={(buttons) => onUpdate({ buttons })}
//         primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
//         secondaryClass="bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700"
//         wrapClass="flex flex-wrap items-center justify-start md:justify-end gap-3"
//       />
//     </div>
//   </div>
// );

// // VARIANT 3: Card Floating Layout
// const FloatingCardCTAView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
//   <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
//     <EditableText
//       as="h2"
//       value={sec.title || ''}
//       onCommit={(v) => onUpdate({ title: v })}
//       placeholder="Ready to Start?"
//       className="block text-3xl sm:text-5xl font-black tracking-tight text-white"
//     />

//     <EditableText
//       as="p"
//       value={sec.subtitle || ''}
//       onCommit={(v) => onUpdate({ subtitle: v })}
//       placeholder="Add subtitle description here..."
//       className="block text-sm sm:text-base opacity-80 max-w-lg mx-auto"
//     />

//     <div className="pt-2">
//       <EditableButtons
//         buttons={sec.buttons || []}
//         onChange={(buttons) => onUpdate({ buttons })}
//         primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
//         secondaryClass="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
//         wrapClass="flex flex-wrap items-center justify-center gap-3"
//       />
//     </div>
//   </div>
// );

// // Main CTAView Component
// export const CTAView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) {
//       onChange(patch);
//     }
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm'
//       ? 'p-6'
//       : sec.paddingSize === 'lg'
//         ? 'p-16'
//         : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white'
//       : sec.bgTheme === 'light'
//         ? 'bg-slate-100 text-slate-900'
//         : 'bg-slate-950 text-white';

//   return (
//     <div className={`mx-auto ${paddingClass} ${themeClass}`}>
//       {sec.layoutStyle === 'split-screen' && (
//         <SplitCTAView sec={sec} onUpdate={handleUpdate} />
//       )}
//       {sec.layoutStyle === 'card-floating' && (
//         <FloatingCardCTAView sec={sec} onUpdate={handleUpdate} />
//       )}
//       {(!sec.layoutStyle || sec.layoutStyle === 'centered') && (
//         <CenteredCTAView sec={sec} onUpdate={handleUpdate} />
//       )}
//     </div>
//   );
// };

// // Layout Thumbnail Helper Component
// export function CTALayoutThumbnail({ layoutStyle = 'centered' }: { layoutStyle?: CTALayoutStyle }) {
//   const sampleCTA = makeBlankCTA(layoutStyle);

//   return (
//     <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
//       <div
//         className="absolute top-0 left-0 pointer-events-none select-none"
//         style={{
//           width: '1280px',
//           transform: 'scale(0.235)',
//           transformOrigin: 'top left',
//         }}
//       >
//         <CTAView sec={sampleCTA} onChange={() => { }} />
//       </div>
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from 'react';
// import { PageButton, PageSectionItem } from '../types';


// type OnChange = (patch: Partial<PageSectionItem>) => void;

// function makeBlankCTA(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'cta',
//     bgTheme: 'indigo',
//     paddingSize: 'md',
//     title: 'Ready to Start?',
//     subtitle: 'Transform your web project today with modern component architectures.',
//     buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started Now', url: '#', variant: 'primary' }],
//   };
// }


// // =========================================================
// // Custom Hook for Outside Clicks
// // =========================================================
// function useOnClickOutside<T extends HTMLElement>(
//   ref: React.RefObject<T | null>,
//   handler: () => void
// ) {
//   useEffect(() => {
//     const listener = (event: MouseEvent | TouchEvent) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }
//       handler();
//     };
//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
// }

// // =========================================================
// // Shared Editable-Text Primitive
// // =========================================================
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

// // =========================================================
// // Editable Buttons Component
// // =========================================================
// const EditableButtons: React.FC<{
//   buttons: PageButton[];
//   onChange: (next: PageButton[]) => void;
//   primaryClass: string;
//   secondaryClass: string;
//   wrapClass?: string;
// }> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center justify-center gap-3' }) => {
//   const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useOnClickOutside(menuRef, () => setActiveMenuIndex(null));

//   const updateButton = (i: number, patch: Partial<PageButton>) => {
//     const next = [...buttons];
//     next[i] = { ...next[i], ...patch };
//     onChange(next);
//   };

//   const remove = (i: number) => {
//     setActiveMenuIndex(null);
//     onChange(buttons.filter((_, idx) => idx !== i));
//   };

//   const add = () =>
//     onChange([
//       ...buttons,
//       { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
//     ]);

//   return (
//     <div className={wrapClass} ref={menuRef}>
//       {buttons.map((btn, i) => (
//         <div key={btn.id} className="group/item relative inline-flex items-center">
//           {/* Rendered as actual <a> link tag */}
//           <a
//             href={btn.url || '#'}
//             onClick={(e) => {
//               if (!btn.url || btn.url === '#') {
//                 e.preventDefault();
//               }
//             }}
//             className={`px-8 py-3.5 rounded-xl font-bold text-sm transition inline-flex items-center justify-center ${
//               btn.variant === 'primary' ? primaryClass : secondaryClass
//             }`}
//           >
//             <EditableText
//               as="span"
//               value={btn.text}
//               onCommit={(v) => updateButton(i, { text: v })}
//               placeholder="Button label"
//             />
//           </a>

//           {/* Settings Trigger */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setActiveMenuIndex(activeMenuIndex === i ? null : i);
//             }}
//             title="Configure Button Link & Style"
//             className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
//           >
//             ⚙
//           </button>

//           {/* Floating Settings Popover (Positioned above button) */}
//           {activeMenuIndex === i && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3 text-left"
//             >
//               <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
//                 <span>Configure Button Link</span>
//                 <button
//                   type="button"
//                   onClick={() => remove(i)}
//                   className="text-red-400 hover:text-red-300 text-[11px] font-normal"
//                 >
//                   Delete
//                 </button>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 font-medium uppercase">Target Link URL</label>
//                 <input
//                   type="text"
//                   value={btn.url || ''}
//                   onChange={(e) => updateButton(i, { url: e.target.value })}
//                   placeholder="https://example.com"
//                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 font-medium uppercase">Variant Style</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'primary' })}
//                     className={`py-1 rounded-lg border text-[11px] font-semibold ${
//                       btn.variant === 'primary'
//                         ? 'bg-indigo-600 border-indigo-500 text-white'
//                         : 'bg-slate-800 border-slate-700 text-slate-400'
//                     }`}
//                   >
//                     Primary
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'secondary' })}
//                     className={`py-1 rounded-lg border text-[11px] font-semibold ${
//                       btn.variant !== 'primary'
//                         ? 'bg-indigo-600 border-indigo-500 text-white'
//                         : 'bg-slate-800 border-slate-700 text-slate-400'
//                     }`}
//                   >
//                     Secondary
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={add}
//         className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
//       >
//         + Button
//       </button>
//     </div>
//   );
// };

// // =========================================================
// // Main CTAView Component
// // =========================================================
// export const CTAView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) {
//       onChange(patch);
//     }
//   };

//   // Inline dynamic padding based on props
//   const paddingClass =
//     sec.paddingSize === 'sm'
//       ? 'p-6'
//       : sec.paddingSize === 'lg'
//       ? 'p-16'
//       : 'p-10';

//   // Inline dynamic theme based on props
//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900'
//       : 'bg-slate-900 text-white';

//   return (
//     <div className={`my-8 max-w-4xl mx-auto text-center space-y-6 ${paddingClass} ${themeClass}`}>
//       <EditableText
//         as="h2"
//         value={sec.title || ''}
//         onCommit={(v) => handleUpdate({ title: v })}
//         placeholder="Ready to Start?"
//         className="block text-3xl sm:text-5xl font-black tracking-tight"
//       />

//       <EditableText
//         as="p"
//         value={sec.subtitle || ''}
//         onCommit={(v) => handleUpdate({ subtitle: v })}
//         placeholder="Add subtitle description here..."
//         className="block text-sm sm:text-base opacity-80 max-w-xl mx-auto"
//       />

//       <div className="pt-2">
//         <EditableButtons
//           buttons={sec.buttons || []}
//           onChange={(buttons) => handleUpdate({ buttons })}
//           primaryClass="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
//           secondaryClass="bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700"
//         />
//       </div>
//     </div>
//   );
// };