'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, Check, ChevronDown } from 'lucide-react';
import type { PageSectionItem, FAQItem } from '../types';

type OnChange = (patch: Partial<PageSectionItem>) => void;

export type FAQLayoutStyle = 'stack' | 'grid-2col' | 'accordion';

export const FAQ_VARIANTS: { value: FAQLayoutStyle; label: string; description: string }[] = [
  {
    value: 'stack',
    label: 'Standard Stack',
    description: 'Clean single-column stacked layout with highlighted question cards.',
  },
  {
    value: 'grid-2col',
    label: '2-Column Grid',
    description: 'Balanced two-column grid ideal for displaying many questions concisely.',
  },
  {
    value: 'accordion',
    label: 'Accordion Box',
    description: 'Interactive expanding accordion list with smooth collapsible cards.',
  },
];

// Exported factory function for blank FAQ sections supporting layout variants
export function makeBlankFAQ(layoutStyle: FAQLayoutStyle = 'stack'): PageSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'faq',
    layoutStyle: layoutStyle as any, // Prevents strict type mismatch with PageSectionItem
    bgTheme: 'dark',
    paddingSize: 'md',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our development services.',
    faqList: [
      { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
      { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
      { question: 'Do you offer ongoing support?', answer: 'Yes, we provide full maintenance and continuous deployment support.' },
    ],
  };
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

// VARIANT 1: Standard Stack
const StackFAQView: React.FC<{
  faqs: FAQItem[];
  cardThemeClass: string;
  updateFaq: (idx: number, patch: Partial<FAQItem>) => void;
  removeFaq: (idx: number) => void;
}> = ({ faqs, cardThemeClass, updateFaq, removeFaq }) => (
  <div className="space-y-4">
    {faqs.map((item, idx) => (
      <div key={idx} className={`group/faq relative p-5 rounded-2xl border space-y-2 ${cardThemeClass}`}>
        <button
          type="button"
          data-editor-only
          onClick={() => removeFaq(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition z-10"
          title="Delete question"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 text-sm font-bold pr-8">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
          <EditableText
            as="span"
            value={item.question}
            onCommit={(v) => updateFaq(idx, { question: v })}
            placeholder="Question text…"
            className="w-full"
          />
        </div>

        <div className="pl-6">
          <EditableText
            as="p"
            value={item.answer}
            onCommit={(v) => updateFaq(idx, { answer: v })}
            placeholder="Answer text…"
            className="block text-xs opacity-75 leading-relaxed"
          />
        </div>
      </div>
    ))}
  </div>
);

// VARIANT 2: 2-Column Grid
const Grid2ColFAQView: React.FC<{
  faqs: FAQItem[];
  cardThemeClass: string;
  updateFaq: (idx: number, patch: Partial<FAQItem>) => void;
  removeFaq: (idx: number) => void;
}> = ({ faqs, cardThemeClass, updateFaq, removeFaq }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {faqs.map((item, idx) => (
      <div key={idx} className={`group/faq relative p-5 rounded-2xl border space-y-2 ${cardThemeClass}`}>
        <button
          type="button"
          data-editor-only
          onClick={() => removeFaq(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition z-10"
          title="Delete question"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 text-sm font-bold pr-8">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
          <EditableText
            as="span"
            value={item.question}
            onCommit={(v) => updateFaq(idx, { question: v })}
            placeholder="Question text…"
            className="w-full"
          />
        </div>

        <div className="pl-6">
          <EditableText
            as="p"
            value={item.answer}
            onCommit={(v) => updateFaq(idx, { answer: v })}
            placeholder="Answer text…"
            className="block text-xs opacity-75 leading-relaxed"
          />
        </div>
      </div>
    ))}
  </div>
);

// VARIANT 3: Accordion Box
const AccordionFAQView: React.FC<{
  faqs: FAQItem[];
  cardThemeClass: string;
  updateFaq: (idx: number, patch: Partial<FAQItem>) => void;
  removeFaq: (idx: number) => void;
}> = ({ faqs, cardThemeClass, updateFaq, removeFaq }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-3">
      {faqs.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div key={idx} className={`group/faq relative rounded-2xl border overflow-hidden ${cardThemeClass}`}>
            <button
              type="button"
              data-editor-only
              onClick={() => removeFaq(idx)}
              className="absolute top-4 right-10 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition z-10"
              title="Delete question"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div
              onClick={() => toggle(idx)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition select-none"
            >
              <div className="flex items-center gap-2 text-sm font-bold pr-8">
                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <EditableText
                  as="span"
                  value={item.question}
                  onCommit={(v) => updateFaq(idx, { question: v })}
                  placeholder="Question text…"
                  className="w-full"
                />
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-indigo-400' : ''
                }`}
              />
            </div>

            {isOpen && (
              <div className="px-5 pb-4 pt-1 border-t border-slate-800/50">
                <EditableText
                  as="p"
                  value={item.answer}
                  onCommit={(v) => updateFaq(idx, { answer: v })}
                  placeholder="Answer text…"
                  className="block text-xs opacity-75 leading-relaxed pl-6"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Main FAQView Component
export const FAQView: React.FC<{
  sec: PageSectionItem;
  onChange?: OnChange;
}> = ({ sec, onChange }) => {
  const faqs = sec.faqList ?? [
    { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
    { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
    { question: 'Do you offer ongoing support?', answer: 'Yes, we provide full maintenance and continuous deployment support.' },
  ];

  const handleUpdate = (patch: Partial<PageSectionItem>) => {
    if (onChange) onChange(patch);
  };

  const updateFaq = (index: number, patch: Partial<FAQItem>) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ faqList: updated });
  };

  const addFaq = () => {
    handleUpdate({
      faqList: [...faqs, { question: 'New Question?', answer: 'Click here to write the answer.' }],
    });
  };

  const removeFaq = (index: number) => {
    handleUpdate({ faqList: faqs.filter((_, i) => i !== index) });
  };

  const paddingClass =
    sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

  const themeClass =
    sec.bgTheme === 'indigo'
      ? 'bg-indigo-950 text-white'
      : sec.bgTheme === 'light'
      ? 'bg-slate-100 text-slate-900'
      : 'bg-slate-950 text-white';

  const cardThemeClass =
    sec.bgTheme === 'light'
      ? 'bg-white border-slate-200'
      : 'bg-slate-900/80 border-slate-800';

  return (
    // Full-width background wrapper — bleeds edge-to-edge on the page
    <div className={`w-full ${themeClass}`}>
      {/* Centered content container — leaves whitespace on left/right at large widths */}
      <div className={`max-w-5xl mx-auto space-y-8 ${paddingClass}`}>
        <div className="text-center space-y-2">
          <EditableText
            as="h2"
            value={sec.title || ''}
            onCommit={(v) => handleUpdate({ title: v })}
            placeholder="Frequently Asked Questions"
            className="block text-3xl font-extrabold tracking-tight"
          />
          <EditableText
            as="p"
            value={sec.subtitle || ''}
            onCommit={(v) => handleUpdate({ subtitle: v })}
            placeholder="Everything you need to know about our service."
            className="block text-sm opacity-80 max-w-xl mx-auto"
          />
        </div>

        {sec.layoutStyle === 'grid-2col' && (
          <Grid2ColFAQView
            faqs={faqs}
            cardThemeClass={cardThemeClass}
            updateFaq={updateFaq}
            removeFaq={removeFaq}
          />
        )}
        {sec.layoutStyle === 'accordion' && (
          <AccordionFAQView
            faqs={faqs}
            cardThemeClass={cardThemeClass}
            updateFaq={updateFaq}
            removeFaq={removeFaq}
          />
        )}
        {(!sec.layoutStyle || sec.layoutStyle === 'stack') && (
          <StackFAQView
            faqs={faqs}
            cardThemeClass={cardThemeClass}
            updateFaq={updateFaq}
            removeFaq={removeFaq}
          />
        )}

        <div className="text-center pt-2" data-editor-only>
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

// Layout Thumbnail Helper Component
export function FaqThumbnail({ layoutStyle = 'stack' }: { layoutStyle?: FAQLayoutStyle }) {
  const sampleFaq = makeBlankFAQ(layoutStyle);

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
        <FAQView sec={sampleFaq} onChange={() => {}} />
      </div>
    </div>
  );
}

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { HelpCircle, Plus, Trash2, Check, ChevronDown } from 'lucide-react';
// import type { PageSectionItem, FAQItem } from '../types';

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// export type FAQLayoutStyle = 'stack' | 'grid-2col' | 'accordion';

// export const FAQ_VARIANTS: { value: FAQLayoutStyle; label: string; description: string }[] = [
//   {
//     value: 'stack',
//     label: 'Standard Stack',
//     description: 'Clean single-column stacked layout with highlighted question cards.',
//   },
//   {
//     value: 'grid-2col',
//     label: '2-Column Grid',
//     description: 'Balanced two-column grid ideal for displaying many questions concisely.',
//   },
//   {
//     value: 'accordion',
//     label: 'Accordion Box',
//     description: 'Interactive expanding accordion list with smooth collapsible cards.',
//   },
// ];

// // Exported factory function for blank FAQ sections supporting layout variants
// export function makeBlankFAQ(layoutStyle: FAQLayoutStyle = 'stack'): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'faq',
//     layoutStyle: layoutStyle as any, // Prevents strict type mismatch with PageSectionItem
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Frequently Asked Questions',
//     subtitle: 'Everything you need to know about our development services.',
//     faqList: [
//       { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
//       { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
//       { question: 'Do you offer ongoing support?', answer: 'Yes, we provide full maintenance and continuous deployment support.' },
//     ],
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

// // VARIANT 1: Standard Stack
// const StackFAQView: React.FC<{
//   faqs: FAQItem[];
//   cardThemeClass: string;
//   updateFaq: (idx: number, patch: Partial<FAQItem>) => void;
//   removeFaq: (idx: number) => void;
// }> = ({ faqs, cardThemeClass, updateFaq, removeFaq }) => (
//   <div className="space-y-4">
//     {faqs.map((item, idx) => (
//       <div key={idx} className={`group/faq relative p-5 rounded-2xl border space-y-2 ${cardThemeClass}`}>
//         <button
//           type="button"
//           onClick={() => removeFaq(idx)}
//           className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition z-10"
//           title="Delete question"
//         >
//           <Trash2 className="w-3.5 h-3.5" />
//         </button>

//         <div className="flex items-center gap-2 text-sm font-bold pr-8">
//           <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
//           <EditableText
//             as="span"
//             value={item.question}
//             onCommit={(v) => updateFaq(idx, { question: v })}
//             placeholder="Question text…"
//             className="w-full"
//           />
//         </div>

//         <div className="pl-6">
//           <EditableText
//             as="p"
//             value={item.answer}
//             onCommit={(v) => updateFaq(idx, { answer: v })}
//             placeholder="Answer text…"
//             className="block text-xs opacity-75 leading-relaxed"
//           />
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // VARIANT 2: 2-Column Grid
// const Grid2ColFAQView: React.FC<{
//   faqs: FAQItem[];
//   cardThemeClass: string;
//   updateFaq: (idx: number, patch: Partial<FAQItem>) => void;
//   removeFaq: (idx: number) => void;
// }> = ({ faqs, cardThemeClass, updateFaq, removeFaq }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {faqs.map((item, idx) => (
//       <div key={idx} className={`group/faq relative p-5 rounded-2xl border space-y-2 ${cardThemeClass}`}>
//         <button
//           type="button"
//           onClick={() => removeFaq(idx)}
//           className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition z-10"
//           title="Delete question"
//         >
//           <Trash2 className="w-3.5 h-3.5" />
//         </button>

//         <div className="flex items-center gap-2 text-sm font-bold pr-8">
//           <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
//           <EditableText
//             as="span"
//             value={item.question}
//             onCommit={(v) => updateFaq(idx, { question: v })}
//             placeholder="Question text…"
//             className="w-full"
//           />
//         </div>

//         <div className="pl-6">
//           <EditableText
//             as="p"
//             value={item.answer}
//             onCommit={(v) => updateFaq(idx, { answer: v })}
//             placeholder="Answer text…"
//             className="block text-xs opacity-75 leading-relaxed"
//           />
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // VARIANT 3: Accordion Box
// const AccordionFAQView: React.FC<{
//   faqs: FAQItem[];
//   cardThemeClass: string;
//   updateFaq: (idx: number, patch: Partial<FAQItem>) => void;
//   removeFaq: (idx: number) => void;
// }> = ({ faqs, cardThemeClass, updateFaq, removeFaq }) => {
//   const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

//   const toggle = (idx: number) => {
//     setOpenIndexes((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   return (
//     <div className="space-y-3">
//       {faqs.map((item, idx) => {
//         const isOpen = openIndexes.includes(idx);
//         return (
//           <div key={idx} className={`group/faq relative rounded-2xl border overflow-hidden ${cardThemeClass}`}>
//             <button
//               type="button"
//               onClick={() => removeFaq(idx)}
//               className="absolute top-4 right-10 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition z-10"
//               title="Delete question"
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//             </button>

//             <div
//               onClick={() => toggle(idx)}
//               className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition select-none"
//             >
//               <div className="flex items-center gap-2 text-sm font-bold pr-8">
//                 <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
//                 <EditableText
//                   as="span"
//                   value={item.question}
//                   onCommit={(v) => updateFaq(idx, { question: v })}
//                   placeholder="Question text…"
//                   className="w-full"
//                 />
//               </div>
//               <ChevronDown
//                 className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
//                   isOpen ? 'rotate-180 text-indigo-400' : ''
//                 }`}
//               />
//             </div>

//             {isOpen && (
//               <div className="px-5 pb-4 pt-1 border-t border-slate-800/50">
//                 <EditableText
//                   as="p"
//                   value={item.answer}
//                   onCommit={(v) => updateFaq(idx, { answer: v })}
//                   placeholder="Answer text…"
//                   className="block text-xs opacity-75 leading-relaxed pl-6"
//                 />
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Main FAQView Component
// export const FAQView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const faqs = sec.faqList ?? [
//     { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
//     { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
//     { question: 'Do you offer ongoing support?', answer: 'Yes, we provide full maintenance and continuous deployment support.' },
//   ];

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const updateFaq = (index: number, patch: Partial<FAQItem>) => {
//     const updated = [...faqs];
//     updated[index] = { ...updated[index], ...patch };
//     handleUpdate({ faqList: updated });
//   };

//   const addFaq = () => {
//     handleUpdate({
//       faqList: [...faqs, { question: 'New Question?', answer: 'Click here to write the answer.' }],
//     });
//   };

//   const removeFaq = (index: number) => {
//     handleUpdate({ faqList: faqs.filter((_, i) => i !== index) });
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900'
//       : 'bg-slate-950 text-white';

//   const cardThemeClass =
//     sec.bgTheme === 'light'
//       ? 'bg-white border-slate-200'
//       : 'bg-slate-900/80 border-slate-800';

//   return (
//     <div className={`mx-auto space-y-8 ${paddingClass} ${themeClass}`}>
//       <div className="text-center space-y-2">
//         <EditableText
//           as="h2"
//           value={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Frequently Asked Questions"
//           className="block text-3xl font-extrabold tracking-tight"
//         />
//         <EditableText
//           as="p"
//           value={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Everything you need to know about our service."
//           className="block text-sm opacity-80 max-w-xl mx-auto"
//         />
//       </div>

//       {sec.layoutStyle === 'grid-2col' && (
//         <Grid2ColFAQView
//           faqs={faqs}
//           cardThemeClass={cardThemeClass}
//           updateFaq={updateFaq}
//           removeFaq={removeFaq}
//         />
//       )}
//       {sec.layoutStyle === 'accordion' && (
//         <AccordionFAQView
//           faqs={faqs}
//           cardThemeClass={cardThemeClass}
//           updateFaq={updateFaq}
//           removeFaq={removeFaq}
//         />
//       )}
//       {(!sec.layoutStyle || sec.layoutStyle === 'stack') && (
//         <StackFAQView
//           faqs={faqs}
//           cardThemeClass={cardThemeClass}
//           updateFaq={updateFaq}
//           removeFaq={removeFaq}
//         />
//       )}

//       <div className="text-center pt-2">
//         <button
//           type="button"
//           onClick={addFaq}
//           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
//         >
//           <Plus className="w-3.5 h-3.5" /> Add Question
//         </button>
//       </div>
//     </div>
//   );
// };

// // Layout Thumbnail Helper Component
// export function FaqThumbnail({ layoutStyle = 'stack' }: { layoutStyle?: FAQLayoutStyle }) {
//   const sampleFaq = makeBlankFAQ(layoutStyle);

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
//         <FAQView sec={sampleFaq} onChange={() => {}} />
//       </div>
//     </div>
//   );
// }



// import React, { useState, useRef, useEffect } from 'react';
// import { HelpCircle, Plus, Trash2 } from 'lucide-react';

// export interface FAQItem {
//   question: string;
//   answer: string;
// }

// export interface PageSectionItem {
//   id: string;
//   type: string;
//   layoutStyle?: string;
//   bgTheme?: string;
//   paddingSize?: string;
//   title?: string;
//   subtitle?: string;
//   faqList?: FAQItem[];
// }

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// function makeBlankFAQ(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'faq',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Frequently Asked Questions',
//     subtitle: 'Everything you need to know about our development services.',
//     faqList: [
//       { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
//       { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
//     ],
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

// export const FAQView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const faqs = sec.faqList ?? [
//     { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
//     { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
//   ];

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const updateFaq = (index: number, patch: Partial<FAQItem>) => {
//     const updated = [...faqs];
//     updated[index] = { ...updated[index], ...patch };
//     handleUpdate({ faqList: updated });
//   };

//   const addFaq = () => {
//     handleUpdate({
//       faqList: [...faqs, { question: 'New Question?', answer: 'Click here to write the answer.' }],
//     });
//   };

//   const removeFaq = (index: number) => {
//     handleUpdate({ faqList: faqs.filter((_, i) => i !== index) });
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white border border-indigo-800/50'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900 border border-slate-200'
//       : 'bg-slate-950 text-white border border-slate-800';

//   return (
//     <div className={`my-8 max-w-4xl mx-auto rounded-3xl space-y-8 ${paddingClass} ${themeClass}`}>
//       <div className="text-center space-y-2">
//         <EditableText
//           as="h2"
//           value={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Frequently Asked Questions"
//           className="block text-3xl font-extrabold tracking-tight"
//         />
//         <EditableText
//           as="p"
//           value={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Everything you need to know about our service."
//           className="block text-sm opacity-80 max-w-xl mx-auto"
//         />
//       </div>

//       <div className="space-y-4">
//         {faqs.map((item, idx) => (
//           <div key={idx} className="group/faq relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
//             <button
//               type="button"
//               onClick={() => removeFaq(idx)}
//               className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/faq:opacity-100 transition"
//               title="Delete question"
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//             </button>

//             <div className="flex items-center gap-2 text-sm font-bold text-white pr-8">
//               <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
//               <EditableText
//                 as="span"
//                 value={item.question}
//                 onCommit={(v) => updateFaq(idx, { question: v })}
//                 placeholder="Question text…"
//                 className="w-full"
//               />
//             </div>

//             <div className="pl-6">
//               <EditableText
//                 as="p"
//                 value={item.answer}
//                 onCommit={(v) => updateFaq(idx, { answer: v })}
//                 placeholder="Answer text…"
//                 className="block text-xs text-slate-400 leading-relaxed"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center pt-2">
//         <button
//           type="button"
//           onClick={addFaq}
//           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
//         >
//           <Plus className="w-3.5 h-3.5" /> Add Question
//         </button>
//       </div>
//     </div>
//   );
// };