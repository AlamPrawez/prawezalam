'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
import { GitCommit, Plus, Trash2, ArrowUpDown, Zap, ClipboardCheck, Sparkles, ListPlus } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  subText?: string;
  bulletList?: string[];
  secondParagraph?: string;
}

export default function ProcessSection() {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // FIXED: Changed name from 'processSteps' to 'process.steps' to match backend JSON payload
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
    replace: replaceSteps,
  } = useFieldArray({
    control,
    name: 'process.steps' as ArrayPath<FullPagePayload>,
  });

  // Ensure minimum 2 process steps exist by default
  useEffect(() => {
    if (stepFields.length === 0) {
      appendStep({
        id: `step-${Date.now()}-1`,
        stepNumber: '01',
        title: '',
        description: '',
        subText: '',
        bulletList: [],
        secondParagraph: '',
      } as never);
      appendStep({
        id: `step-${Date.now()}-2`,
        stepNumber: '02',
        title: '',
        description: '',
        subText: '',
        bulletList: [],
        secondParagraph: '',
      } as never);
    } else if (stepFields.length === 1) {
      appendStep({
        id: `step-${Date.now()}-2`,
        stepNumber: '02',
        title: '',
        description: '',
        subText: '',
        bulletList: [],
        secondParagraph: '',
      } as never);
    }
  }, [stepFields.length, appendStep]);

  // ADVANCED SECTION PARSER
  const parseAndPopulateFullSection = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 1) return;

    let lineIndex = 0;

    // Optional Badge
    if (
      lines[lineIndex].toUpperCase() === lines[lineIndex] &&
      lines[lineIndex].length < 35 &&
      lines.length > 3 &&
      !lines[lineIndex].match(/^(step\s*\d+|\d{1,2}[\.\:\-\)])/i)
    ) {
      setValue('process.badge' as never, lines[lineIndex] as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
      lineIndex++;
    }

    // Main Section Title (e.g., "My Development Process")
    if (lineIndex < lines.length && !lines[lineIndex].match(/^(step\s*\d+|\d{1,2}[\.\:\-\)])/i)) {
      setValue('process.title' as never, lines[lineIndex] as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
      lineIndex++;
    }

    // Subheading Paragraph (If present before Step 1)
    if (lineIndex < lines.length && !lines[lineIndex].match(/^(step\s*\d+|\d{1,2}[\.\:\-\)])/i)) {
      setValue('process.subtitle' as never, lines[lineIndex] as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
      lineIndex++;
    }

    const remainingLines = lines.slice(lineIndex);
    const parsedSteps: ProcessStep[] = [];

    let currentStep: ProcessStep | null = null;
    let inBulletsState = false;

    for (let i = 0; i < remainingLines.length; i++) {
      const line = remainingLines[i];
      const isNewStepHeader = line.match(/^(step\s*\d+[\:\.\-]?|\d{1,2}[\.\:\-\)]|\#\d+)/i);

      // 1. New Step Header
      if (isNewStepHeader) {
        if (currentStep) {
          parsedSteps.push(currentStep);
        }

        const cleanTitle = line.replace(/^(step\s*\d+[\:\.\-]?|\d{1,2}[\.\:\-\)]|\#\d+)\s*/i, '').trim();

        currentStep = {
          id: `step-${Date.now()}-${parsedSteps.length + 1}`,
          stepNumber: String(parsedSteps.length + 1).padStart(2, '0'),
          title: cleanTitle || line,
          description: '',
          subText: '',
          bulletList: [],
          secondParagraph: '',
        };
        inBulletsState = false;
        continue;
      }

      if (!currentStep) continue;

      // 2. Bullet Trigger Line
      const isBulletTrigger =
        line.endsWith(':') ||
        line.match(/^(we discuss|this includes|key points|features|deliverables|common technologies|before launch)/i);

      if (isBulletTrigger && !inBulletsState) {
        currentStep.subText = line;
        inBulletsState = true;
        continue;
      }

      // 3. Bullet Items or Trailing Text
      const isExplicitBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');

      if (inBulletsState) {
        if (!isExplicitBullet && line.length > 80) {
          inBulletsState = false;
          currentStep.secondParagraph = line;
          continue;
        }

        const cleanBullet = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
        if (cleanBullet) {
          currentStep.bulletList = currentStep.bulletList || [];
          currentStep.bulletList.push(cleanBullet);
        }
        continue;
      }

      // 4. Regular Text Fallback
      if (!currentStep.description) {
        currentStep.description = line;
      } else if (!currentStep.subText) {
        currentStep.subText = line;
      } else if (!currentStep.secondParagraph) {
        currentStep.secondParagraph = line;
      } else {
        currentStep.secondParagraph += ' ' + line;
      }
    }

    if (currentStep) {
      parsedSteps.push(currentStep);
    }

    // Minimum 2 steps safety check
    while (parsedSteps.length < 2) {
      parsedSteps.push({
        id: `step-${Date.now()}-${parsedSteps.length + 1}`,
        stepNumber: String(parsedSteps.length + 1).padStart(2, '0'),
        title: '',
        description: '',
        subText: '',
        bulletList: [],
        secondParagraph: '',
      });
    }

    if (parsedSteps.length > 0) {
      replaceSteps(parsedSteps as never[]);
    }
  };

  const handleSectionPaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 3) {
      e.preventDefault();
      parseAndPopulateFullSection(pasteText);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Development Process / Execution Strategy
            </h2>
            <p className="text-xs text-slate-500">
              Manage your step-by-step technical workflow and execution timeline.
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
              appendStep({
                id: `step-${Date.now()}`,
                stepNumber: String(stepFields.length + 1).padStart(2, '0'),
                title: '',
                description: '',
                subText: '',
                bulletList: [],
                secondParagraph: '',
              } as never)
            }
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Process Step
          </button>
        </div>
      </div>

      {/* STRATEGY BADGE, TITLE & SUBTITLE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            Top Badge Text (Optional)
          </label>
          <input
            type="text"
            {...register('process.badge' as never)}
            defaultValue="EXECUTION STRATEGY"
            placeholder="e.g. EXECUTION STRATEGY"
            className="w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase">
              Main Title
            </label>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fill section on Paste
            </span>
          </div>
          <input
            type="text"
            {...register('process.title' as never)}
            onPaste={handleSectionPaste}
            defaultValue="My Development Process"
            placeholder="e.g. My Development Process"
            className="w-full px-3 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            Subheading (Optional)
          </label>
          <input
            type="text"
            {...register('process.subtitle' as never)}
            defaultValue="A systematic, engineering-focused workflow designed to turn ideas into highly maintainable production assets."
            placeholder="A systematic, engineering-focused workflow..."
            className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* PROCESS STEPS TIMELINE CARDS */}
      <div className="relative space-y-6 pt-2 before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-indigo-100">
        {stepFields.map((step, index) => (
          <ProcessStepItem
            key={step.id}
            index={index}
            totalSteps={stepFields.length}
            removeStep={removeStep}
          />
        ))}
      </div>

      {/* BULK PASTE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill Process Section
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
              Paste raw process text below. It automatically creates step titles, main descriptions, intro trigger notes, point-by-point bullet lists, and trailing paragraphs.
            </p>
            <textarea
              rows={12}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`My Development Process\n\n1. Understand Your Goals\nEvery project begins with understanding your business goals.\nWe discuss:\nProject goals\nBusiness challenges\nTarget users`}
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

{/* INDIVIDUAL PROCESS STEP COMPONENT */}
function ProcessStepItem({
  index,
  totalSteps,
  removeStep,
}: {
  index: number;
  totalSteps: number;
  removeStep: (index: number) => void;
}) {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const formattedNumber = String(index + 1).padStart(2, '0');

  // FIXED: Changed name from `processSteps.${index}.bulletList` to `process.steps.${index}.bulletList`
  const {
    fields: bulletFields,
    append: appendBullet,
    remove: removeBullet,
    replace: replaceBullets,
  } = useFieldArray({
    control,
    name: `process.steps.${index}.bulletList` as ArrayPath<FullPagePayload>,
  });

  // Single step paste handler
  const handleStepPaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    const lines = pasteText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length >= 2) {
      e.preventDefault();

      const titleLine = lines[0]
        .replace(/^(step\s*\d+[\:\.\-]?|\d{1,2}[\.\:\-\)]|\#\d+)\s*/i, '')
        .trim();
      const description = lines[1];
      const restLines = lines.slice(2);

      const bullets: string[] = [];
      let subText = '';
      let secondParagraph = '';
      let inBullets = false;

      restLines.forEach((l) => {
        const isTrigger =
          l.endsWith(':') ||
          l.match(/^(we discuss|this includes|key points|features|deliverables|common technologies|before launch)/i);

        if (isTrigger && !subText) {
          subText = l;
          inBullets = true;
          return;
        }

        if (inBullets) {
          if (l.length > 80 && !l.startsWith('•') && !l.startsWith('-')) {
            inBullets = false;
            secondParagraph = l;
          } else {
            const clean = l.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
            if (clean) bullets.push(clean);
          }
        } else if (!subText) {
          subText = l;
        } else {
          secondParagraph += (secondParagraph ? ' ' : '') + l;
        }
      });

      // FIXED: Updated registrations to target `process.steps`
      setValue(`process.steps.${index}.title` as never, titleLine as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue(`process.steps.${index}.description` as never, description as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (subText) {
        setValue(`process.steps.${index}.subText` as never, subText as never, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      if (bullets.length > 0) {
        replaceBullets(bullets as never[]);
      }
      if (secondParagraph) {
        setValue(`process.steps.${index}.secondParagraph` as never, secondParagraph as never, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  };

  return (
    <div className="relative flex gap-5 items-start pl-2">
      {/* STEP NUMBER BADGE */}
      <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 text-xs font-black shadow-xs shrink-0 mt-3">
        {formattedNumber}
      </div>

      {/* CARD FORM BLOCK */}
      <div className="flex-1 border border-slate-200 rounded-2xl p-5 bg-slate-50/60 hover:bg-white hover:border-indigo-200 transition shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
            Step #{index + 1}
          </span>
          {totalSteps > 2 && (
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="text-slate-400 hover:text-red-600 transition p-1"
              title="Remove Step"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* 1. STEP TITLE */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold text-slate-600 uppercase">
                Step Title
              </label>
              <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
                <Sparkles className="w-3 h-3" /> Auto-fill step on Paste
              </span>
            </div>
            <input
              type="text"
              {...register(`process.steps.${index}.title` as never)}
              onPaste={handleStepPaste}
              placeholder="e.g. Understand Your Goals"
              className="w-full px-3.5 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 2. MAIN DESCRIPTION PARAGRAPH */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Main Description Paragraph
            </label>
            <textarea
              rows={2}
              {...register(`process.steps.${index}.description` as never)}
              placeholder="Every project begins with understanding your business, users, and objectives..."
              className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 3. SUMMARY / INTRO SUBTEXT (BEFORE BULLETS) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Summary / Subtext Note (Optional)
            </label>
            <input
              type="text"
              {...register(`process.steps.${index}.subText` as never)}
              placeholder="e.g. We discuss:"
              className="w-full px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg bg-slate-100/60 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* 4. STRUCTURED BULLET POINTS LIST */}
          <div className="bg-slate-100/50 p-3 rounded-xl border border-slate-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1">
                <ListPlus className="w-3.5 h-3.5 text-indigo-500" /> Key Bullet Points
              </label>

              {/* DEDICATED ADD POINT BUTTON */}
              <button
                type="button"
                onClick={() => appendBullet('' as never)}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg transition shadow-2xs"
              >
                <Plus className="w-3 h-3" /> Add Point
              </button>
            </div>

            {/* DYNAMIC LIST OF BULLET INPUT FIELDS */}
            <div className="space-y-2">
              {bulletFields.map((bulletItem, bIdx) => (
                <div key={bulletItem.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <input
                    type="text"
                    {...register(`process.steps.${index}.bulletList.${bIdx}` as never)}
                    placeholder={`Point #${bIdx + 1}`}
                    className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(bIdx)}
                    className="text-slate-400 hover:text-red-500 p-1 transition"
                    title="Remove point"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {bulletFields.length === 0 && (
                <p className="text-[11px] text-slate-400 italic py-1">
                  No bullet points added yet. Click &quot;+ Add Point&quot; above to add one manually.
                </p>
              )}
            </div>
          </div>

          {/* 5. SECONDARY PARAGRAPH (AFTER BULLETS) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Secondary Paragraph (Optional - Placed after bullet points)
            </label>
            <textarea
              rows={2}
              {...register(`process.steps.${index}.secondParagraph` as never)}
              placeholder="e.g. Technology choices are always based on your project's needs..."
              className="w-full px-3.5 py-2 text-xs text-slate-600 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
// import { GitCommit, Plus, Trash2, ArrowUpDown, Zap, ClipboardCheck, Sparkles, ListPlus } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// interface ProcessStep {
//   id: string;
//   stepNumber: string;
//   title: string;
//   description: string;
//   subText?: string;
//   bulletList?: string[];
//   secondParagraph?: string;
// }

// export default function ProcessSection() {
//   const { register, control, setValue } = useFormContext<FullPagePayload>();
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [bulkText, setBulkText] = useState('');

//   // Field Array for dynamic process steps
//   const {
//     fields: stepFields,
//     append: appendStep,
//     remove: removeStep,
//     replace: replaceSteps,
//   } = useFieldArray({
//     control,
//     name: 'process.steps' as ArrayPath<FullPagePayload>,
//   });

//   // Ensure minimum 2 process steps exist by default
//   useEffect(() => {
//     if (stepFields.length === 0) {
//       appendStep({
//         id: `step-${Date.now()}-1`,
//         stepNumber: '01',
//         title: '',
//         description: '',
//         subText: '',
//         bulletList: [],
//         secondParagraph: '',
//       } as never);
//       appendStep({
//         id: `step-${Date.now()}-2`,
//         stepNumber: '02',
//         title: '',
//         description: '',
//         subText: '',
//         bulletList: [],
//         secondParagraph: '',
//       } as never);
//     } else if (stepFields.length === 1) {
//       appendStep({
//         id: `step-${Date.now()}-2`,
//         stepNumber: '02',
//         title: '',
//         description: '',
//         subText: '',
//         bulletList: [],
//         secondParagraph: '',
//       } as never);
//     }
//   }, [stepFields.length, appendStep]);

//   // ADVANCED SECTION PARSER
//   const parseAndPopulateFullSection = (rawText: string) => {
//     const lines = rawText
//       .split('\n')
//       .map((l) => l.trim())
//       .filter((l) => l.length > 0);

//     if (lines.length < 1) return;

//     let lineIndex = 0;

//     // Optional Badge
//     if (
//       lines[lineIndex].toUpperCase() === lines[lineIndex] &&
//       lines[lineIndex].length < 35 &&
//       lines.length > 3 &&
//       !lines[lineIndex].match(/^(step\s*\d+|\d{1,2}[\.\:\-\)])/i)
//     ) {
//       setValue('process.badge' as never, lines[lineIndex] as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       lineIndex++;
//     }

//     // Main Section Title (e.g., "My Development Process")
//     if (lineIndex < lines.length && !lines[lineIndex].match(/^(step\s*\d+|\d{1,2}[\.\:\-\)])/i)) {
//       setValue('process.title' as never, lines[lineIndex] as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       lineIndex++;
//     }

//     // Subheading Paragraph (If present before Step 1)
//     if (lineIndex < lines.length && !lines[lineIndex].match(/^(step\s*\d+|\d{1,2}[\.\:\-\)])/i)) {
//       setValue('process.subtitle' as never, lines[lineIndex] as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       lineIndex++;
//     }

//     const remainingLines = lines.slice(lineIndex);
//     const parsedSteps: ProcessStep[] = [];

//     let currentStep: ProcessStep | null = null;
//     let inBulletsState = false;

//     for (let i = 0; i < remainingLines.length; i++) {
//       const line = remainingLines[i];
//       const isNewStepHeader = line.match(/^(step\s*\d+[\:\.\-]?|\d{1,2}[\.\:\-\)]|\#\d+)/i);

//       // 1. New Step Header
//       if (isNewStepHeader) {
//         if (currentStep) {
//           parsedSteps.push(currentStep);
//         }

//         const cleanTitle = line.replace(/^(step\s*\d+[\:\.\-]?|\d{1,2}[\.\:\-\)]|\#\d+)\s*/i, '').trim();

//         currentStep = {
//           id: `step-${Date.now()}-${parsedSteps.length + 1}`,
//           stepNumber: String(parsedSteps.length + 1).padStart(2, '0'),
//           title: cleanTitle || line,
//           description: '',
//           subText: '',
//           bulletList: [],
//           secondParagraph: '',
//         };
//         inBulletsState = false;
//         continue;
//       }

//       if (!currentStep) continue;

//       // 2. Bullet Trigger Line
//       const isBulletTrigger =
//         line.endsWith(':') ||
//         line.match(/^(we discuss|this includes|key points|features|deliverables|common technologies|before launch)/i);

//       if (isBulletTrigger && !inBulletsState) {
//         currentStep.subText = line;
//         inBulletsState = true;
//         continue;
//       }

//       // 3. Bullet Items or Trailing Text
//       const isExplicitBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');

//       if (inBulletsState) {
//         if (!isExplicitBullet && line.length > 80) {
//           inBulletsState = false;
//           currentStep.secondParagraph = line;
//           continue;
//         }

//         const cleanBullet = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
//         if (cleanBullet) {
//           currentStep.bulletList = currentStep.bulletList || [];
//           currentStep.bulletList.push(cleanBullet);
//         }
//         continue;
//       }

//       // 4. Regular Text Fallback
//       if (!currentStep.description) {
//         currentStep.description = line;
//       } else if (!currentStep.subText) {
//         currentStep.subText = line;
//       } else if (!currentStep.secondParagraph) {
//         currentStep.secondParagraph = line;
//       } else {
//         currentStep.secondParagraph += ' ' + line;
//       }
//     }

//     if (currentStep) {
//       parsedSteps.push(currentStep);
//     }

//     // Minimum 2 steps safety check
//     while (parsedSteps.length < 2) {
//       parsedSteps.push({
//         id: `step-${Date.now()}-${parsedSteps.length + 1}`,
//         stepNumber: String(parsedSteps.length + 1).padStart(2, '0'),
//         title: '',
//         description: '',
//         subText: '',
//         bulletList: [],
//         secondParagraph: '',
//       });
//     }

//     if (parsedSteps.length > 0) {
//       replaceSteps(parsedSteps as never[]);
//     }
//   };

//   const handleSectionPaste = (e: React.ClipboardEvent) => {
//     const pasteText = e.clipboardData.getData('text');
//     if (pasteText.split('\n').filter((l) => l.trim()).length > 3) {
//       e.preventDefault();
//       parseAndPopulateFullSection(pasteText);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* SECTION HEADER */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//         <div className="flex items-center gap-2.5">
//           <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
//             <GitCommit className="w-5 h-5" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">
//               Development Process / Execution Strategy
//             </h2>
//             <p className="text-xs text-slate-500">
//               Manage your step-by-step technical workflow and execution timeline.
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => setShowBulkModal(true)}
//             className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition"
//           >
//             <Zap className="w-3.5 h-3.5" /> Bulk Paste Section
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               appendStep({
//                 id: `step-${Date.now()}`,
//                 stepNumber: String(stepFields.length + 1).padStart(2, '0'),
//                 title: '',
//                 description: '',
//                 subText: '',
//                 bulletList: [],
//                 secondParagraph: '',
//               } as never)
//             }
//             className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
//           >
//             <Plus className="w-4 h-4" /> Add Process Step
//           </button>
//         </div>
//       </div>

//       {/* STRATEGY BADGE, TITLE & SUBTITLE */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80">
//         <div>
//           <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//             Top Badge Text (Optional)
//           </label>
//           <input
//             type="text"
//             {...register('process.badge' as never)}
//             defaultValue="EXECUTION STRATEGY"
//             placeholder="e.g. EXECUTION STRATEGY"
//             className="w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <label className="block text-[11px] font-bold text-slate-600 uppercase">
//               Main Title
//             </label>
//             <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
//               <ClipboardCheck className="w-3 h-3" /> Auto-fill section on Paste
//             </span>
//           </div>
//           <input
//             type="text"
//             {...register('process.title' as never)}
//             onPaste={handleSectionPaste}
//             defaultValue="My Development Process"
//             placeholder="e.g. My Development Process"
//             className="w-full px-3 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//             Subheading (Optional)
//           </label>
//           <input
//             type="text"
//             {...register('process.subtitle' as never)}
//             defaultValue="A systematic, engineering-focused workflow designed to turn ideas into highly maintainable production assets."
//             placeholder="A systematic, engineering-focused workflow..."
//             className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* PROCESS STEPS TIMELINE CARDS */}
//       <div className="relative space-y-6 pt-2 before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-indigo-100">
//         {stepFields.map((step, index) => (
//           <ProcessStepItem
//             key={step.id}
//             index={index}
//             totalSteps={stepFields.length}
//             removeStep={removeStep}
//           />
//         ))}
//       </div>

//       {/* BULK PASTE MODAL */}
//       {showBulkModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
//             <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//               <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
//                 <Zap className="w-4 h-4 text-emerald-600" />
//                 Bulk Auto-Fill Process Section
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
//               Paste raw process text below. It automatically creates step titles, main descriptions, intro trigger notes, point-by-point bullet lists, and trailing paragraphs.
//             </p>
//             <textarea
//               rows={12}
//               value={bulkText}
//               onChange={(e) => setBulkText(e.target.value)}
//               placeholder={`My Development Process\n\n1. Understand Your Goals\nEvery project begins with understanding your business goals.\nWe discuss:\nProject goals\nBusiness challenges\nTarget users`}
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
//                   parseAndPopulateFullSection(bulkText);
//                   setShowBulkModal(false);
//                   setBulkText('');
//                 }}
//                 className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Auto-Generate Section
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// {/* INDIVIDUAL PROCESS STEP COMPONENT */}
// function ProcessStepItem({
//   index,
//   totalSteps,
//   removeStep,
// }: {
//   index: number;
//   totalSteps: number;
//   removeStep: (index: number) => void;
// }) {
//   const { register, control, setValue } = useFormContext<FullPagePayload>();
//   const formattedNumber = String(index + 1).padStart(2, '0');

//   // NESTED FIELD ARRAY FOR BULLET POINTS
//   const {
//     fields: bulletFields,
//     append: appendBullet,
//     remove: removeBullet,
//     replace: replaceBullets,
//   } = useFieldArray({
//     control,
//     name: `processSteps.${index}.bulletList` as ArrayPath<FullPagePayload>,
//   });

//   // Single step paste handler
//   const handleStepPaste = (e: React.ClipboardEvent) => {
//     const pasteText = e.clipboardData.getData('text');
//     const lines = pasteText
//       .split('\n')
//       .map((l) => l.trim())
//       .filter((l) => l.length > 0);

//     if (lines.length >= 2) {
//       e.preventDefault();

//       const titleLine = lines[0]
//         .replace(/^(step\s*\d+[\:\.\-]?|\d{1,2}[\.\:\-\)]|\#\d+)\s*/i, '')
//         .trim();
//       const description = lines[1];
//       const restLines = lines.slice(2);

//       const bullets: string[] = [];
//       let subText = '';
//       let secondParagraph = '';
//       let inBullets = false;

//       restLines.forEach((l) => {
//         const isTrigger =
//           l.endsWith(':') ||
//           l.match(/^(we discuss|this includes|key points|features|deliverables|common technologies|before launch)/i);

//         if (isTrigger && !subText) {
//           subText = l;
//           inBullets = true;
//           return;
//         }

//         if (inBullets) {
//           if (l.length > 80 && !l.startsWith('•') && !l.startsWith('-')) {
//             inBullets = false;
//             secondParagraph = l;
//           } else {
//             const clean = l.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
//             if (clean) bullets.push(clean);
//           }
//         } else if (!subText) {
//           subText = l;
//         } else {
//           secondParagraph += (secondParagraph ? ' ' : '') + l;
//         }
//       });

//       setValue(`processSteps.${index}.title` as never, titleLine as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       setValue(`processSteps.${index}.description` as never, description as never, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//       if (subText) {
//         setValue(`processSteps.${index}.subText` as never, subText as never, {
//           shouldValidate: true,
//           shouldDirty: true,
//         });
//       }
//       if (bullets.length > 0) {
//         replaceBullets(bullets as never[]);
//       }
//       if (secondParagraph) {
//         setValue(`processSteps.${index}.secondParagraph` as never, secondParagraph as never, {
//           shouldValidate: true,
//           shouldDirty: true,
//         });
//       }
//     }
//   };

//   return (
//     <div className="relative flex gap-5 items-start pl-2">
//       {/* STEP NUMBER BADGE */}
//       <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 text-xs font-black shadow-xs shrink-0 mt-3">
//         {formattedNumber}
//       </div>

//       {/* CARD FORM BLOCK */}
//       <div className="flex-1 border border-slate-200 rounded-2xl p-5 bg-slate-50/60 hover:bg-white hover:border-indigo-200 transition shadow-2xs space-y-4">
//         <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
//           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
//             <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
//             Step #{index + 1}
//           </span>
//           {totalSteps > 2 && (
//             <button
//               type="button"
//               onClick={() => removeStep(index)}
//               className="text-slate-400 hover:text-red-600 transition p-1"
//               title="Remove Step"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           )}
//         </div>

//         <div className="space-y-3">
//           {/* 1. STEP TITLE */}
//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-[11px] font-bold text-slate-600 uppercase">
//                 Step Title
//               </label>
//               <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
//                 <Sparkles className="w-3 h-3" /> Auto-fill step on Paste
//               </span>
//             </div>
//             <input
//               type="text"
//               {...register(`processSteps.${index}.title` as never)}
//               onPaste={handleStepPaste}
//               placeholder="e.g. Understand Your Goals"
//               className="w-full px-3.5 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* 2. MAIN DESCRIPTION PARAGRAPH */}
//           <div>
//             <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
//               Main Description Paragraph
//             </label>
//             <textarea
//               rows={2}
//               {...register(`processSteps.${index}.description` as never)}
//               placeholder="Every project begins with understanding your business, users, and objectives..."
//               className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* 3. SUMMARY / INTRO SUBTEXT (BEFORE BULLETS) */}
//           <div>
//             <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
//               Summary / Subtext Note (Optional)
//             </label>
//             <input
//               type="text"
//               {...register(`processSteps.${index}.subText` as never)}
//               placeholder="e.g. We discuss:"
//               className="w-full px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg bg-slate-100/60 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//             />
//           </div>

//           {/* 4. STRUCTURED BULLET POINTS LIST (OPTION 2) */}
//           <div className="bg-slate-100/50 p-3 rounded-xl border border-slate-200/60 space-y-2">
//             <div className="flex items-center justify-between">
//               <label className="block text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1">
//                 <ListPlus className="w-3.5 h-3.5 text-indigo-500" /> Key Bullet Points
//               </label>

//               {/* DEDICATED ADD POINT BUTTON */}
//               <button
//                 type="button"
//                 onClick={() => appendBullet('' as never)}
//                 className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg transition shadow-2xs"
//               >
//                 <Plus className="w-3 h-3" /> Add Point
//               </button>
//             </div>

//             {/* DYNAMIC LIST OF BULLET INPUT FIELDS */}
//             <div className="space-y-2">
//               {bulletFields.map((bulletItem, bIdx) => (
//                 <div key={bulletItem.id} className="flex items-center gap-2">
//                   <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
//                   <input
//                     type="text"
//                     {...register(`processSteps.${index}.bulletList.${bIdx}` as never)}
//                     placeholder={`Point #${bIdx + 1}`}
//                     className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeBullet(bIdx)}
//                     className="text-slate-400 hover:text-red-500 p-1 transition"
//                     title="Remove point"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ))}

//               {bulletFields.length === 0 && (
//                 <p className="text-[11px] text-slate-400 italic py-1">
//                   No bullet points added yet. Click &quot;+ Add Point&quot; above to add one manually.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* 5. SECONDARY PARAGRAPH (AFTER BULLETS) */}
//           <div>
//             <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
//               Secondary Paragraph (Optional - Placed after bullet points)
//             </label>
//             <textarea
//               rows={2}
//               {...register(`processSteps.${index}.secondParagraph` as never)}
//               placeholder="e.g. Technology choices are always based on your project's needs..."
//               className="w-full px-3.5 py-2 text-xs text-slate-600 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }