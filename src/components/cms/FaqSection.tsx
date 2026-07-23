'use client';

import React, { useState } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import {
  HelpCircle,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Zap,
  ClipboardCheck,
  FileText,
  Code,
} from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-32 w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium">
      Loading Rich Text Editor...
    </div>
  ),
});

const editorModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'code-block', 'clean'],
  ],
};

interface ParsedFaq {
  id: string;
  question: string;
  answerHtml: string;
}

export default function FaqSection() {
  const { register, control, watch, setValue } = useFormContext<FullPagePayload>();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'faqs',
  });

  // Track accordion expand state
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Track editor mode state per FAQ: true = Rich Text (Quill), false = Plain Textarea
  const [useRichText, setUseRichText] = useState<Record<string, boolean>>({});

  // Bulk Paste Modal State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : false,
    }));
  };

  const toggleEditorType = (id: string) => {
    setUseRichText((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // PARSER FOR RAW FAQ TEXT BLOCKS
  const parseAndPopulateFaqs = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    const parsedItems: ParsedFaq[] = [];
    let currentQuestion = '';
    let currentAnswerLines: string[] = [];

    // Filter out common header line
    let startIndex = 0;
    if (lines[0].toLowerCase().includes('frequently asked questions')) {
      startIndex = 1;
    }

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];

      // Detect question line ending with '?' or starting with Q:
      const isQuestion = line.endsWith('?') || /^Q[:\.]/i.test(line);

      if (isQuestion) {
        // Save previous FAQ pair if existing
        if (currentQuestion) {
          parsedItems.push({
            id: `faq-${Date.now()}-${parsedItems.length + 1}`,
            question: currentQuestion,
            answerHtml: currentAnswerLines.join('\n\n'),
          });
        }
        currentQuestion = line.replace(/^Q[:\.]\s*/i, '');
        currentAnswerLines = [];
      } else {
        if (currentQuestion) {
          currentAnswerLines.push(line);
        }
      }
    }

    // Push trailing FAQ item
    if (currentQuestion) {
      parsedItems.push({
        id: `faq-${Date.now()}-${parsedItems.length + 1}`,
        question: currentQuestion,
        answerHtml: currentAnswerLines.join('\n\n'),
      });
    }

    if (parsedItems.length > 0) {
      replace(parsedItems as never[]);
    }
  };

  // Inline Auto-Paste Detection
  const handleInlinePaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.includes('?') && pasteText.split('\n').length > 3) {
      e.preventDefault();
      parseAndPopulateFaqs(pasteText);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">4. Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Manage accordion FAQs with plain text or rich-text answers.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition"
          >
            <Zap className="w-3.5 h-3.5" /> Bulk Paste FAQs
          </button>

          <button
            type="button"
            onClick={() => {
              const newId = `faq-${Date.now()}`;
              append({ id: newId, question: '', answerHtml: '' });
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add FAQ Item
          </button>
        </div>
      </div>

      {/* FAQ ITEMS LIST */}
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">No FAQ items added yet</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Click "Add FAQ Item" or use "Bulk Paste FAQs" above to populate questions.
            </p>
          </div>
        ) : (
          fields.map((field, index) => {
            const isExpanded = openItems[field.id] ?? true;
            const isRichText = useRichText[field.id] ?? false; // Default to Textarea
            const watchedQuestion = watch(`faqs.${index}.question`);

            return (
              <div
                key={field.id}
                className="border border-slate-200 rounded-2xl bg-slate-50/60 overflow-hidden shadow-2xs hover:border-indigo-200 transition"
              >
                {/* FAQ ITEM HEADER BAR */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-slate-100">
                  <div className="flex items-center gap-3 flex-1 mr-4">
                    <span className="shrink-0 text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      FAQ #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 truncate max-w-xs sm:max-w-md">
                      {watchedQuestion && watchedQuestion.trim() !== ''
                        ? watchedQuestion
                        : 'Untitled Question'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(field.id)}
                      className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
                        title="Remove FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* FAQ BODY INPUTS */}
                {isExpanded && (
                  <div className="p-5 space-y-4 bg-slate-50/40">
                    {/* QUESTION INPUT */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Question Label
                        </label>
                        <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
                          <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
                        </span>
                      </div>
                      <input
                        type="text"
                        {...register(`faqs.${index}.question`)}
                        onPaste={handleInlinePaste}
                        placeholder="e.g. Is React a good choice for my project?"
                        className="w-full px-3.5 py-2 text-sm font-medium border border-slate-300 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                      />
                    </div>

                    {/* ANSWER CONTENT INPUT WITH TEXTAREA/RICH-TEXT TOGGLE */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Answer Content
                        </label>

                        {/* MODE TOGGLE BUTTON */}
                        <button
                          type="button"
                          onClick={() => toggleEditorType(field.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-md transition"
                        >
                          {isRichText ? (
                            <>
                              <FileText className="w-3 h-3" /> Switch to Textarea
                            </>
                          ) : (
                            <>
                              <Code className="w-3 h-3" /> Switch to Rich Text
                            </>
                          )}
                        </button>
                      </div>

                      {/* TEXTAREA MODE */}
                      {!isRichText ? (
                        <textarea
                          rows={4}
                          {...register(`faqs.${index}.answerHtml`)}
                          placeholder="Provide a detailed answer for this question..."
                          className="w-full px-3.5 py-2.5 text-xs font-normal text-slate-700 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed shadow-2xs"
                        />
                      ) : (
                        /* RICH TEXT MODE */
                        <div className="bg-white rounded-xl overflow-hidden border border-slate-300 shadow-2xs">
                          <Controller
                            name={`faqs.${index}.answerHtml`}
                            control={control}
                            render={({ field: quillField }) => (
                              <ReactQuill
                                theme="snow"
                                value={quillField.value || ''}
                                onChange={quillField.onChange}
                                modules={editorModules}
                                placeholder="Provide a detailed answer with bullet points or formatted links..."
                              />
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* BULK PASTE FAQ MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill FAQs
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
              Paste raw FAQ questions and answers below. The parser will split questions (ending with <code>?</code>) and map them directly to their corresponding answers.
            </p>
            <textarea
              rows={10}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Frequently Asked Questions\n\nIs React a good choice for my project?\nReact is a strong option for applications that require dynamic interfaces...\n\nDo you only build frontend applications?\nNo. I'm a full-stack developer and can build complete applications...`}
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
                  parseAndPopulateFaqs(bulkText);
                  setShowBulkModal(false);
                  setBulkText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Auto-Generate FAQs
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
// import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
// import dynamic from 'next/dynamic';
// import { HelpCircle, Plus, Trash2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';
// import 'react-quill-new/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-32 w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium">
//       Loading Rich Text Editor...
//     </div>
//   ),
// });

// const editorModules = {
//   toolbar: [
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['link', 'code-block', 'clean'],
//   ],
// };

// export default function FaqSection() {
//   const { register, control, watch } = useFormContext<FullPagePayload>();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'faqs',
//   });

//   // Track expanded state for accordion-style editing view
//   const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

//   const toggleAccordion = (id: string) => {
//     setOpenItems((prev) => ({
//       ...prev,
//       [id]: prev[id] !== undefined ? !prev[id] : false, // Defaults to expanded on creation
//     }));
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* SECTION HEADER */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//         <div className="flex items-center gap-2.5">
//           <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
//             <HelpCircle className="w-5 h-5" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">4. Frequently Asked Questions</h2>
//             <p className="text-xs text-slate-500">Manage accordion FAQs and rich-text answers for your page.</p>
//           </div>
//         </div>
//         <button
//           type="button"
//           onClick={() => {
//             const newId = `faq-${Date.now()}`;
//             append({ id: newId, question: '', answerHtml: '' });
//           }}
//           className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
//         >
//           <Plus className="w-4 h-4" /> Add FAQ Item
//         </button>
//       </div>

//       {/* FAQ ITEMS LIST */}
//       <div className="space-y-4">
//         {fields.length === 0 ? (
//           <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
//             <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//             <p className="text-sm font-medium text-slate-600">No FAQ items added yet</p>
//             <p className="text-xs text-slate-400 mt-0.5">Click "Add FAQ Item" above to get started.</p>
//           </div>
//         ) : (
//           fields.map((field, index) => {
//             const isExpanded = openItems[field.id] ?? true;
//             const watchedQuestion = watch(`faqs.${index}.question`);

//             return (
//               <div
//                 key={field.id}
//                 className="border border-slate-200 rounded-2xl bg-slate-50/60 overflow-hidden shadow-2xs hover:border-indigo-200 transition"
//               >
//                 {/* FAQ ITEM HEADER / BAR */}
//                 <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-slate-100">
//                   <div className="flex items-center gap-3 flex-1 mr-4">
//                     <span className="shrink-0 text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
//                       FAQ #{index + 1}
//                     </span>
//                     <span className="text-xs font-semibold text-slate-700 truncate max-w-xs sm:max-w-md">
//                       {watchedQuestion && watchedQuestion.trim() !== ''
//                         ? watchedQuestion
//                         : 'Untitled Question'}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 shrink-0">
//                     <button
//                       type="button"
//                       onClick={() => toggleAccordion(field.id)}
//                       className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
//                       title={isExpanded ? 'Collapse' : 'Expand'}
//                     >
//                       {isExpanded ? (
//                         <ChevronUp className="w-4 h-4" />
//                       ) : (
//                         <ChevronDown className="w-4 h-4" />
//                       )}
//                     </button>

//                     {fields.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
//                         title="Remove FAQ"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* FAQ BODY INPUTS */}
//                 {isExpanded && (
//                   <div className="p-5 space-y-4 bg-slate-50/40">
//                     {/* QUESTION INPUT */}
//                     <div>
//                       <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
//                         Question Label
//                       </label>
//                       <input
//                         type="text"
//                         {...register(`faqs.${index}.question`)}
//                         placeholder="e.g. What is the typical turnaround time for a custom React app?"
//                         className="w-full px-3.5 py-2 text-sm font-medium border border-slate-300 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
//                       />
//                     </div>

//                     {/* RICH TEXT ANSWER */}
//                     <div>
//                       <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
//                         Answer Content (Rich Text)
//                       </label>
//                       <div className="bg-white rounded-xl overflow-hidden border border-slate-300 shadow-2xs">
//                         <Controller
//                           name={`faqs.${index}.answerHtml`}
//                           control={control}
//                           render={({ field: quillField }) => (
//                             <ReactQuill
//                               theme="snow"
//                               value={quillField.value || ''}
//                               onChange={quillField.onChange}
//                               modules={editorModules}
//                               placeholder="Provide a detailed answer with bullet points or formatted links..."
//                             />
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }