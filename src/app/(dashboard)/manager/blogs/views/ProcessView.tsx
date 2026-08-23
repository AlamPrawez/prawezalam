'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Check, ArrowRight } from 'lucide-react';
import type { PageSectionItem, ProcessCard } from '../types';

type OnChange = (patch: Partial<PageSectionItem>) => void;

export type ProcessLayoutStyle =
  | 'grid-2col'
  | 'stepper-horizontal'
  | 'timeline-vertical'
  | 'numbered-cards'
  | 'zigzag';

export const PROCESS_VARIANTS: { value: ProcessLayoutStyle; label: string; description: string }[] = [
  {
    value: 'grid-2col',
    label: '2-Column Grid',
    description: 'Clean two-column layout ideal for 4 to 6 concise execution steps.',
  },
  {
    value: 'stepper-horizontal',
    label: 'Horizontal Stepper',
    description: 'Linear horizontal step flow connected with directional indicator arrows.',
  },
  {
    value: 'timeline-vertical',
    label: 'Vertical Timeline',
    description: 'Chronological roadmap with a central vertical connector line.',
  },
  {
    value: 'numbered-cards',
    label: 'Numbered Cards',
    description: 'Prominent large step numbers placed inside styled accent background cards.',
  },
  {
    value: 'zigzag',
    label: 'Alternating Zig-Zag',
    description: 'Alternating left-and-right steps for enhanced scannability.',
  },
];

// Exported factory function for blank process sections
export function makeBlankProcess(layoutStyle: ProcessLayoutStyle = 'grid-2col'): PageSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'process',
    layoutStyle: layoutStyle as any, // Prevents strict type mismatch with PageSectionItem
    bgTheme: 'dark',
    paddingSize: 'md',
    title: 'Development Process',
    subtitle: 'A structured approach to delivery and engineering excellence.',
    cardsList: [
      { title: 'Discovery & System Design', desc: 'Analyzing technical constraints and mapping out API architecture.' },
      { title: 'Iterative Implementation', desc: 'Developing clean React components and robust FastAPI backend services.' },
      { title: 'Testing & Optimization', desc: 'Conducting load testing, type validation, and database query optimizations.' },
      { title: 'Deployment & Launch', desc: 'Configuring CI/CD pipelines and deploying production-ready containers.' },
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

// VARIANT 1: 2-Column Grid
const Grid2ColView: React.FC<{
  steps: ProcessCard[];
  cardThemeClass: string;
  updateStep: (i: number, patch: Partial<ProcessCard>) => void;
  removeStep: (i: number) => void;
}> = ({ steps, cardThemeClass, updateStep, removeStep }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {steps.map((card, idx) => (
      <div
        key={idx}
        className={`group/step relative p-5 rounded-2xl border flex items-start gap-4 transition ${cardThemeClass}`}
      >
        <button
          type="button"
          onClick={() => removeStep(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition z-10"
          title="Delete step"
          data-editor-only
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          {idx + 1}
        </div>

        <div className="space-y-1 w-full pr-6">
          <EditableText
            as="h4"
            value={card.title}
            onCommit={(v) => updateStep(idx, { title: v })}
            placeholder="Step Title"
            className="block text-sm font-bold"
          />

          <EditableText
            as="p"
            value={card.desc}
            onCommit={(v) => updateStep(idx, { desc: v })}
            placeholder="Step description…"
            className="block text-xs opacity-75 leading-relaxed"
          />
        </div>
      </div>
    ))}
  </div>
);

// VARIANT 2: Horizontal Stepper
const StepperHorizontalView: React.FC<{
  steps: ProcessCard[];
  cardThemeClass: string;
  updateStep: (i: number, patch: Partial<ProcessCard>) => void;
  removeStep: (i: number) => void;
}> = ({ steps, cardThemeClass, updateStep, removeStep }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
    {steps.map((card, idx) => (
      <div
        key={idx}
        className={`group/step relative p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition ${cardThemeClass}`}
      >
        <button
          type="button"
          onClick={() => removeStep(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition z-10"
          title="Delete step"
          data-editor-only
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-between">
          <span className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
            0{idx + 1}
          </span>
          {idx < steps.length - 1 && (
            <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />
          )}
        </div>

        <div className="space-y-1.5 flex-1">
          <EditableText
            as="h4"
            value={card.title}
            onCommit={(v) => updateStep(idx, { title: v })}
            placeholder="Step Title"
            className="block text-sm font-bold"
          />

          <EditableText
            as="p"
            value={card.desc}
            onCommit={(v) => updateStep(idx, { desc: v })}
            placeholder="Step description…"
            className="block text-xs opacity-75 leading-relaxed"
          />
        </div>
      </div>
    ))}
  </div>
);

// VARIANT 3: Vertical Timeline
const TimelineVerticalView: React.FC<{
  steps: ProcessCard[];
  cardThemeClass: string;
  updateStep: (i: number, patch: Partial<ProcessCard>) => void;
  removeStep: (i: number) => void;
}> = ({ steps, cardThemeClass, updateStep, removeStep }) => (
  <div className="relative max-w-2xl mx-auto space-y-6 before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-800">
    {steps.map((card, idx) => (
      <div key={idx} className="relative pl-10 group/step">
        <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-indigo-500 z-10 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </div>

        <div className={`relative p-5 rounded-2xl border space-y-1 transition ${cardThemeClass}`}>
          <button
            type="button"
            onClick={() => removeStep(idx)}
            className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition z-10"
            title="Delete step"
            data-editor-only
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
            Step {idx + 1}
          </span>

          <EditableText
            as="h4"
            value={card.title}
            onCommit={(v) => updateStep(idx, { title: v })}
            placeholder="Step Title"
            className="block text-sm font-bold"
          />

          <EditableText
            as="p"
            value={card.desc}
            onCommit={(v) => updateStep(idx, { desc: v })}
            placeholder="Step description…"
            className="block text-xs opacity-75 leading-relaxed"
          />
        </div>
      </div>
    ))}
  </div>
);

// VARIANT 4: Numbered Cards
const NumberedCardsView: React.FC<{
  steps: ProcessCard[];
  cardThemeClass: string;
  updateStep: (i: number, patch: Partial<ProcessCard>) => void;
  removeStep: (i: number) => void;
}> = ({ steps, cardThemeClass, updateStep, removeStep }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    {steps.map((card, idx) => (
      <div
        key={idx}
        className={`group/step relative p-6 rounded-3xl border space-y-3 transition ${cardThemeClass}`}
      >
        <button
          type="button"
          onClick={() => removeStep(idx)}
          className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition z-10"
          title="Delete step"
          data-editor-only
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="text-4xl font-black text-indigo-500/30">
          0{idx + 1}
        </div>

        <EditableText
          as="h4"
          value={card.title}
          onCommit={(v) => updateStep(idx, { title: v })}
          placeholder="Step Title"
          className="block text-base font-extrabold"
        />

        <EditableText
          as="p"
          value={card.desc}
          onCommit={(v) => updateStep(idx, { desc: v })}
          placeholder="Step description…"
          className="block text-xs opacity-75 leading-relaxed"
        />
      </div>
    ))}
  </div>
);

// VARIANT 5: Alternating Zig-Zag
const ZigZagView: React.FC<{
  steps: ProcessCard[];
  cardThemeClass: string;
  updateStep: (i: number, patch: Partial<ProcessCard>) => void;
  removeStep: (i: number) => void;
}> = ({ steps, cardThemeClass, updateStep, removeStep }) => (
  <div className="space-y-6 max-w-3xl mx-auto">
    {steps.map((card, idx) => {
      const isEven = idx % 2 === 0;
      return (
        <div
          key={idx}
          className={`flex flex-col md:flex-row items-center gap-4 ${
            isEven ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-600/30">
            {idx + 1}
          </div>

          <div
            className={`group/step relative p-5 rounded-2xl border flex-1 space-y-1 transition w-full ${cardThemeClass}`}
          >
            <button
              type="button"
              onClick={() => removeStep(idx)}
              className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition z-10"
              title="Delete step"
              data-editor-only
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <EditableText
              as="h4"
              value={card.title}
              onCommit={(v) => updateStep(idx, { title: v })}
              placeholder="Step Title"
              className="block text-sm font-bold"
            />

            <EditableText
              as="p"
              value={card.desc}
              onCommit={(v) => updateStep(idx, { desc: v })}
              placeholder="Step description…"
              className="block text-xs opacity-75 leading-relaxed"
            />
          </div>
        </div>
      );
    })}
  </div>
);

// Main ProcessView Component
export const ProcessView: React.FC<{
  sec: PageSectionItem;
  onChange?: OnChange;
}> = ({ sec, onChange }) => {
  const steps = sec.cardsList ?? [
    { title: 'Discovery & System Design', desc: 'Analyzing technical constraints and mapping out API architecture.' },
    { title: 'Iterative Implementation', desc: 'Developing clean React components and robust FastAPI backend services.' },
    { title: 'Testing & Optimization', desc: 'Conducting load testing, type validation, and database query optimizations.' },
    { title: 'Deployment & Launch', desc: 'Configuring CI/CD pipelines and deploying production-ready containers.' },
  ];

  const handleUpdate = (patch: Partial<PageSectionItem>) => {
    if (onChange) onChange(patch);
  };

  const updateStep = (index: number, patch: Partial<ProcessCard>) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ cardsList: updated });
  };

  const addStep = () => {
    handleUpdate({
      cardsList: [...steps, { title: 'New Process Step', desc: 'Click here to describe this step.' }],
    });
  };

  const removeStep = (index: number) => {
    handleUpdate({ cardsList: steps.filter((_, i) => i !== index) });
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
      ? 'bg-white border-slate-200 hover:border-slate-300'
      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700';

  return (
    <div className={`my-8 max-w-5xl mx-auto rounded-3xl space-y-10 ${paddingClass} ${themeClass}`}>
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <EditableText
          as="h2"
          value={sec.title || ''}
          onCommit={(v) => handleUpdate({ title: v })}
          placeholder="Development Process"
          className="block text-3xl font-extrabold tracking-tight"
        />
        <EditableText
          as="p"
          value={sec.subtitle || ''}
          onCommit={(v) => handleUpdate({ subtitle: v })}
          placeholder="A structured approach to delivery and engineering excellence."
          className="block text-sm opacity-80"
        />
      </div>

      {sec.layoutStyle === 'stepper-horizontal' && (
        <StepperHorizontalView
          steps={steps}
          cardThemeClass={cardThemeClass}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      )}
      {sec.layoutStyle === 'timeline-vertical' && (
        <TimelineVerticalView
          steps={steps}
          cardThemeClass={cardThemeClass}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      )}
      {sec.layoutStyle === 'numbered-cards' && (
        <NumberedCardsView
          steps={steps}
          cardThemeClass={cardThemeClass}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      )}
      {sec.layoutStyle === 'zigzag' && (
        <ZigZagView
          steps={steps}
          cardThemeClass={cardThemeClass}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      )}
      {(!sec.layoutStyle || sec.layoutStyle === 'grid-2col') && (
        <Grid2ColView
          steps={steps}
          cardThemeClass={cardThemeClass}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      )}

      <div className="text-center" data-editor-only>
        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Process Step
        </button>
      </div>
    </div>
  );
};

// Layout Thumbnail Helper Component
export function ProcessThumbnail({ layoutStyle = 'grid-2col' }: { layoutStyle?: ProcessLayoutStyle }) {
  const sampleProcess = makeBlankProcess(layoutStyle);

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
        <ProcessView sec={sampleProcess} onChange={() => {}} />
      </div>
    </div>
  );
}

// import React, { useState, useRef, useEffect } from 'react';
// import { Plus, Trash2 } from 'lucide-react';
// import { PageSectionItem, ProcessCard } from '../types';


// type OnChange = (patch: Partial<PageSectionItem>) => void;

// function makeBlankProcess(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'process',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Development Process',
//     subtitle: 'A structured approach to delivery and engineering excellence.',
//     cardsList: [
//       { title: 'Discovery & System Design', desc: 'Analyzing technical constraints and mapping out API architecture.' },
//       { title: 'Iterative Implementation', desc: 'Developing clean React components and robust FastAPI backend services.' },
//       { title: 'Testing & Optimization', desc: 'Conducting load testing, type validation, and database query optimizations.' },
//       { title: 'Deployment & Launch', desc: 'Configuring CI/CD pipelines and deploying production-ready containers.' },
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

// export const ProcessView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const steps = sec.cardsList ?? [
//     { title: 'Discovery & System Design', desc: 'Analyzing technical constraints and mapping out API architecture.' },
//     { title: 'Iterative Implementation', desc: 'Developing clean React components and robust FastAPI backend services.' },
//     { title: 'Testing & Optimization', desc: 'Conducting load testing, type validation, and database query optimizations.' },
//     { title: 'Deployment & Launch', desc: 'Configuring CI/CD pipelines and deploying production-ready containers.' },
//   ];

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const updateStep = (index: number, patch: Partial<ProcessCard>) => {
//     const updated = [...steps];
//     updated[index] = { ...updated[index], ...patch };
//     handleUpdate({ cardsList: updated });
//   };

//   const addStep = () => {
//     handleUpdate({
//       cardsList: [...steps, { title: 'New Process Step', desc: 'Click here to describe this step.' }],
//     });
//   };

//   const removeStep = (index: number) => {
//     handleUpdate({ cardsList: steps.filter((_, i) => i !== index) });
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
//     <div className={`my-8 max-w-5xl mx-auto rounded-3xl space-y-10 ${paddingClass} ${themeClass}`}>
//       <div className="text-center space-y-3 max-w-2xl mx-auto">
//         <EditableText
//           as="h2"
//           value={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Development Process"
//           className="block text-3xl font-extrabold tracking-tight"
//         />
//         <EditableText
//           as="p"
//           value={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="A structured approach to delivery and engineering excellence."
//           className="block text-sm opacity-80"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {steps.map((card, idx) => (
//           <div
//             key={idx}
//             className="group/step relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition"
//           >
//             <button
//               type="button"
//               onClick={() => removeStep(idx)}
//               className="absolute top-3 right-3 p-1 rounded-md bg-slate-800 text-slate-400 hover:text-red-400 opacity-0 group-hover/step:opacity-100 transition"
//               title="Delete step"
//               data-editor-only
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//             </button>

//             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
//               {idx + 1}
//             </div>

//             <div className="space-y-1 w-full pr-6">
//               <EditableText
//                 as="h4"
//                 value={card.title}
//                 onCommit={(v) => updateStep(idx, { title: v })}
//                 placeholder="Step Title"
//                 className="block text-sm font-bold text-white"
//               />

//               <EditableText
//                 as="p"
//                 value={card.desc}
//                 onCommit={(v) => updateStep(idx, { desc: v })}
//                 placeholder="Step description…"
//                 className="block text-xs text-slate-400 leading-relaxed"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center" data-editor-only>
//         <button
//           type="button"
//           onClick={addStep}
//           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
//         >
//           <Plus className="w-3.5 h-3.5" /> Add Process Step
//         </button>
//       </div>
//     </div>
//   );
// };