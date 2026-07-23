'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
import { Layers, Plus, Trash2, ListPlus, Sparkles, ClipboardCheck, Zap } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

export default function ServicesSection() {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // Main Field Array for Service Cards
  const {
    fields: cardFields,
    append: appendCard,
    remove: removeCard,
    replace: replaceCards,
  } = useFieldArray({
    control,
    name: 'services.cards',
  });

  // Ensure minimum 2 cards exist by default
  useEffect(() => {
    if (cardFields.length === 0) {
      appendCard({
        id: `card-${Date.now()}-1`,
        title: '',
        description: '',
        focusTitle: 'FOCUS & DEPLOYMENTS:',
        focusPoints: [''],
      });
      appendCard({
        id: `card-${Date.now()}-2`,
        title: '',
        description: '',
        focusTitle: 'FOCUS & DEPLOYMENTS:',
        focusPoints: [''],
      });
    } else if (cardFields.length === 1) {
      appendCard({
        id: `card-${Date.now()}-2`,
        title: '',
        description: '',
        focusTitle: 'FOCUS & DEPLOYMENTS:',
        focusPoints: [''],
      });
    }
  }, [cardFields.length, appendCard]);

  // SMART FULL-SECTION PARSER
  const parseAndPopulateFullSection = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) return;

    // Line 1: Section Title
    const sectionTitle = lines[0];
    // Line 2: Section Subtitle
    const sectionSubtitle = lines[1];

    setValue('services.sectionTitle', sectionTitle, { shouldValidate: true, shouldDirty: true });
    setValue('services.sectionSubtitle', sectionSubtitle, { shouldValidate: true, shouldDirty: true });

    // Parse Cards starting from line 3
    const remainingLines = lines.slice(2);
    const parsedCards: Array<{
      id: string;
      title: string;
      description: string;
      focusTitle: string;
      focusPoints: string[];
    }> = [];

    // Check if line is a Focus Header (ends with ':' or matches common section phrases)
    const isFocusHeader = (line: string) => {
      const lower = line.toLowerCase();
      return (
        line.endsWith(':') ||
        lower.startsWith('perfect for') ||
        lower.startsWith('benefits include') ||
        lower.startsWith('already have') ||
        lower.startsWith('if your existing') ||
        lower.startsWith('still using') ||
        lower.startsWith('software continues') ||
        lower.includes('support for') ||
        lower.includes('improve:')
      );
    };

    let currentCard: {
      id: string;
      title: string;
      description: string;
      focusTitle: string;
      focusPoints: string[];
    } | null = null;

    let isParsingPoints = false;

    for (let i = 0; i < remainingLines.length; i++) {
      const line = remainingLines[i];

      // Detect Focus Header line (e.g. "Perfect for:", "Benefits include:")
      if (isFocusHeader(line)) {
        if (currentCard) {
          currentCard.focusTitle = line;
          isParsingPoints = true;
        }
        continue;
      }

      // If we are currently collecting points for a card
      if (isParsingPoints && currentCard) {
        // A short non-sentence line OR a bulleted line is treated as a bullet point
        const cleanBullet = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();

        // Check if this line looks like a NEW CARD TITLE instead of a point
        // (A new card title usually has no ending punctuation, doesn't start with bullet symbols, and isn't a short item)
        const looksLikeNewTitle =
          !line.startsWith('•') &&
          !line.startsWith('-') &&
          !line.startsWith('*') &&
          i + 1 < remainingLines.length &&
          (remainingLines[i + 1].length > 40 || isFocusHeader(remainingLines[i + 1]));

        if (looksLikeNewTitle && currentCard.focusPoints.length > 0) {
          // Save completed current card and start new card
          parsedCards.push(currentCard);
          currentCard = {
            id: `card-${Date.now()}-${parsedCards.length + 1}`,
            title: line,
            description: '',
            focusTitle: 'KEY HIGHLIGHTS:',
            focusPoints: [],
          };
          isParsingPoints = false;
        } else {
          // Append to bullet points list
          if (cleanBullet) {
            currentCard.focusPoints.push(cleanBullet);
          }
        }
        continue;
      }

      // If we don't have a card yet, create one
      if (!currentCard) {
        currentCard = {
          id: `card-${Date.now()}-${parsedCards.length + 1}`,
          title: line,
          description: '',
          focusTitle: 'KEY HIGHLIGHTS:',
          focusPoints: [],
        };
        isParsingPoints = false;
        continue;
      }

      // If description is empty, assign this line to description
      if (!currentCard.description) {
        currentCard.description = line;
      } else {
        // If description is already filled and line is not a focus header, it's a new card title
        parsedCards.push(currentCard);
        currentCard = {
          id: `card-${Date.now()}-${parsedCards.length + 1}`,
          title: line,
          description: '',
          focusTitle: 'KEY HIGHLIGHTS:',
          focusPoints: [],
        };
        isParsingPoints = false;
      }
    }

    // Push the last processed card
    if (currentCard) {
      if (currentCard.focusPoints.length === 0) {
        currentCard.focusPoints = [''];
      }
      parsedCards.push(currentCard);
    }

    // Replace form cards with newly parsed array
    if (parsedCards.length > 0) {
      replaceCards(parsedCards as any);
    }
  };

  // Handle paste directly into Section Title input
  const handleSectionPaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 4) {
      e.preventDefault();
      parseAndPopulateFullSection(pasteText);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900">3. Services Section</h2>
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
              appendCard({
                id: `card-${Date.now()}`,
                title: '',
                description: '',
                focusTitle: 'FOCUS & DEPLOYMENTS:',
                focusPoints: [''],
              })
            }
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition"
          >
            <Plus className="w-4 h-4" /> Add Service Card
          </button>
        </div>
      </div>

      {/* SECTION TITLE & SUBTITLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase">
              Section Title
            </label>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fill section on Paste
            </span>
          </div>
          <input
            type="text"
            {...register('services.sectionTitle')}
            onPaste={handleSectionPaste}
            placeholder="e.g. React Development Services (or paste full section text here)"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Section Subtitle
          </label>
          <input
            type="text"
            {...register('services.sectionSubtitle')}
            placeholder="e.g. I provide end-to-end React.js development services..."
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* SERVICE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {cardFields.map((card, cardIndex) => (
          <ServiceCardItem
            key={card.id}
            cardIndex={cardIndex}
            totalCards={cardFields.length}
            removeCard={removeCard}
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
                Bulk Auto-Fill Entire Section
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
              Paste your raw unformatted document text below. It will automatically populate section title, subtitle, and create all service cards with their descriptions and bullet points.
            </p>
            <textarea
              rows={12}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Paste entire section block here..."
              className="w-full p-3 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
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

{/* INDIVIDUAL CARD ITEM */}
function ServiceCardItem({
  cardIndex,
  totalCards,
  removeCard,
}: {
  cardIndex: number;
  totalCards: number;
  removeCard: (index: number) => void;
}) {
  const { register, control, setValue } = useFormContext<FullPagePayload>();

  const {
    fields: pointFields,
    append: appendPoint,
    remove: removePoint,
    replace: replacePoints,
  } = useFieldArray({
    control,
    name: `services.cards.${cardIndex}.focusPoints` as ArrayPath<FullPagePayload>,
  });

  useEffect(() => {
    if (pointFields.length === 0) {
      appendPoint('' as never);
    }
  }, [pointFields.length, appendPoint]);

  // SMART PER-CARD AUTO-PASTE HANDLER
  const handleSmartCardPaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');

    const lines = pasteText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length >= 2) {
      e.preventDefault();

      let title = lines[0];
      let description = '';
      let focusTitle = 'FOCUS & DEPLOYMENTS:';
      const bulletPoints: string[] = [];

      let isCollectingBullets = false;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        const isHeaderLine =
          line.endsWith(':') ||
          line.toLowerCase().startsWith('perfect for') ||
          line.toLowerCase().startsWith('benefits include') ||
          line.toLowerCase().startsWith('already have') ||
          line.toLowerCase().startsWith('if your existing') ||
          line.toLowerCase().startsWith('still using') ||
          line.toLowerCase().startsWith('software continues');

        if (isHeaderLine) {
          focusTitle = line;
          isCollectingBullets = true;
          continue;
        }

        if (isCollectingBullets) {
          const cleanBullet = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
          if (cleanBullet) bulletPoints.push(cleanBullet);
        } else {
          description += (description ? ' ' : '') + line;
        }
      }

      setValue(`services.cards.${cardIndex}.title`, title, { shouldValidate: true, shouldDirty: true });
      setValue(`services.cards.${cardIndex}.description`, description, { shouldValidate: true, shouldDirty: true });
      setValue(`services.cards.${cardIndex}.focusTitle`, focusTitle, { shouldValidate: true, shouldDirty: true });

      if (bulletPoints.length > 0) {
        replacePoints(bulletPoints as never[]);
      } else {
        replacePoints([''] as never[]);
      }
    }
  };

  // Handles pasting comma-separated values into individual bullet inputs
  const handlePointPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    pointIndex: number
  ) => {
    const pasteData = e.clipboardData.getData('text');

    if (pasteData.includes(',')) {
      e.preventDefault();

      const points = pasteData
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      if (points.length === 0) return;

      setValue(
        `services.cards.${cardIndex}.focusPoints.${pointIndex}` as any,
        points[0],
        { shouldValidate: true, shouldDirty: true }
      );

      for (let i = 1; i < points.length; i++) {
        appendPoint(points[i] as never);
      }
    }
  };

  return (
    <div className="flex flex-col bg-slate-50/80 border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-indigo-200 transition space-y-4">
      {/* CARD HEADER / REMOVE BUTTON */}
      <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Card #{cardIndex + 1}
        </span>

        {totalCards > 2 && (
          <button
            type="button"
            onClick={() => removeCard(cardIndex)}
            className="text-slate-400 hover:text-red-600 transition p-1"
            title="Remove Card"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* CARD TITLE WITH PER-CARD PASTE */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-[11px] font-semibold text-slate-600 uppercase">
            Card Title (H3)
          </label>
          <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
            <ClipboardCheck className="w-3 h-3" /> Auto-fill Card on Paste
          </span>
        </div>
        <input
          type="text"
          {...register(`services.cards.${cardIndex}.title`)}
          onPaste={handleSmartCardPaste}
          placeholder="e.g. Custom React Web Applications (or paste single card text block here)"
          className="w-full px-3 py-2 text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* CARD DESCRIPTION */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
          Card Description
        </label>
        <textarea
          rows={3}
          {...register(`services.cards.${cardIndex}.description`)}
          placeholder="Build custom web applications tailored to your business processes..."
          className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* FOCUS & DEPLOYMENTS SECTION */}
      <div className="border-t border-slate-200/80 pt-3 space-y-3 flex-1">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 tracking-wider">
            Focus Header Title
          </label>
          <input
            type="text"
            {...register(`services.cards.${cardIndex}.focusTitle`)}
            placeholder="FOCUS & DEPLOYMENTS:"
            className="w-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-200 rounded-md bg-slate-100/60 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* BULLET POINTS LIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600">
              Bullet Points ({pointFields.length})
            </span>
            <button
              type="button"
              onClick={() => appendPoint('' as never)}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition"
            >
              <ListPlus className="w-3.5 h-3.5" /> Add Point
            </button>
          </div>

          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {pointFields.map((pointField, pointIndex) => (
              <div key={pointField.id} className="flex items-center gap-2">
                <span className="text-indigo-500 text-xs font-bold select-none">•</span>
                <input
                  type="text"
                  {...register(
                    `services.cards.${cardIndex}.focusPoints.${pointIndex}`
                  )}
                  onPaste={(e) => handlePointPaste(e, pointIndex)}
                  placeholder="e.g. SaaS platforms, Web portals"
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {pointFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePoint(pointIndex)}
                    className="text-slate-400 hover:text-red-600 transition shrink-0 p-0.5"
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
  );
}

// 'use client';

// import React, { useEffect } from 'react';
// import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
// import { Layers, Plus, Trash2, ListPlus, Sparkles, ClipboardCheck } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// export default function ServicesSection() {
//   const { register, control } = useFormContext<FullPagePayload>();

//   // Main Field Array for Service Cards
//   const {
//     fields: cardFields,
//     append: appendCard,
//     remove: removeCard,
//   } = useFieldArray({
//     control,
//     name: 'services.cards',
//   });

//   // Ensure minimum 2 cards exist by default
//   useEffect(() => {
//     if (cardFields.length === 0) {
//       appendCard({
//         id: `card-${Date.now()}-1`,
//         title: '',
//         description: '',
//         focusTitle: 'FOCUS & DEPLOYMENTS:',
//         focusPoints: [''],
//       });
//       appendCard({
//         id: `card-${Date.now()}-2`,
//         title: '',
//         description: '',
//         focusTitle: 'FOCUS & DEPLOYMENTS:',
//         focusPoints: [''],
//       });
//     } else if (cardFields.length === 1) {
//       appendCard({
//         id: `card-${Date.now()}-2`,
//         title: '',
//         description: '',
//         focusTitle: 'FOCUS & DEPLOYMENTS:',
//         focusPoints: [''],
//       });
//     }
//   }, [cardFields.length, appendCard]);

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* SECTION HEADER */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//         <div className="flex items-center gap-2">
//           <Layers className="w-5 h-5 text-indigo-600" />
//           <h2 className="text-lg font-semibold text-slate-900">3. Services Section</h2>
//         </div>
//         <button
//           type="button"
//           onClick={() =>
//             appendCard({
//               id: `card-${Date.now()}`,
//               title: '',
//               description: '',
//               focusTitle: 'FOCUS & DEPLOYMENTS:',
//               focusPoints: [''],
//             })
//           }
//           className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition"
//         >
//           <Plus className="w-4 h-4" /> Add Service Card
//         </button>
//       </div>

//       {/* SECTION TITLE & SUBTITLE */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Section Title
//           </label>
//           <input
//             type="text"
//             {...register('services.sectionTitle')}
//             placeholder="e.g. React Development Services"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Section Subtitle
//           </label>
//           <input
//             type="text"
//             {...register('services.sectionSubtitle')}
//             placeholder="e.g. I provide end-to-end React.js development services..."
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* SERVICE CARDS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
//         {cardFields.map((card, cardIndex) => (
//           <ServiceCardItem
//             key={card.id}
//             cardIndex={cardIndex}
//             totalCards={cardFields.length}
//             removeCard={removeCard}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// {/* CARD ITEM COMPONENT with Smart Multi-Field Auto-Paste */}
// function ServiceCardItem({
//   cardIndex,
//   totalCards,
//   removeCard,
// }: {
//   cardIndex: number;
//   totalCards: number;
//   removeCard: (index: number) => void;
// }) {
//   const { register, control, setValue } = useFormContext<FullPagePayload>();

//   // Nested Field Array for Focus Points
//   const {
//     fields: pointFields,
//     append: appendPoint,
//     remove: removePoint,
//     replace: replacePoints,
//   } = useFieldArray({
//     control,
//     name: `services.cards.${cardIndex}.focusPoints` as ArrayPath<FullPagePayload>,
//   });

//   // Ensure at least one bullet point exists by default
//   useEffect(() => {
//     if (pointFields.length === 0) {
//       appendPoint('' as never);
//     }
//   }, [pointFields.length, appendPoint]);

//   // SMART AUTO-PASTE HANDLER (Pasting structured multi-line text into Title or Description)
//   const handleSmartCardPaste = (e: React.ClipboardEvent) => {
//     const pasteText = e.clipboardData.getData('text');

//     // Check if the pasted text has multiple lines (indicates raw block paste)
//     const lines = pasteText
//       .split('\n')
//       .map((line) => line.trim())
//       .filter((line) => line.length > 0);

//     if (lines.length >= 3) {
//       e.preventDefault();

//       let title = '';
//       let description = '';
//       let focusTitle = 'FOCUS & DEPLOYMENTS:';
//       const bulletPoints: string[] = [];

//       title = lines[0]; // Line 1 -> Title

//       // Process remaining lines
//       let isCollectingBullets = false;

//       for (let i = 1; i < lines.length; i++) {
//         const line = lines[i];

//         // Check if line looks like a Focus Header (ends with : or starts with "Perfect for", "Focus", etc.)
//         if (line.endsWith(':') || line.toLowerCase().startsWith('perfect for') || line.toLowerCase().startsWith('focus')) {
//           focusTitle = line;
//           isCollectingBullets = true;
//           continue;
//         }

//         if (isCollectingBullets) {
//           // Clean bullet symbols like •, -, *, or numbers
//           const cleanBullet = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
//           if (cleanBullet) bulletPoints.push(cleanBullet);
//         } else {
//           // Lines between Title and Focus Title belong to Description
//           description += (description ? ' ' : '') + line;
//         }
//       }

//       // Automatically fill form fields
//       setValue(`services.cards.${cardIndex}.title`, title, { shouldValidate: true, shouldDirty: true });
//       setValue(`services.cards.${cardIndex}.description`, description, { shouldValidate: true, shouldDirty: true });
//       setValue(`services.cards.${cardIndex}.focusTitle`, focusTitle, { shouldValidate: true, shouldDirty: true });

//       // Fill bullet points
//       if (bulletPoints.length > 0) {
//         replacePoints(bulletPoints as never[]);
//       }
//     }
//   };

//   // Handles pasting comma-separated values into individual bullet inputs
//   const handlePointPaste = (
//     e: React.ClipboardEvent<HTMLInputElement>,
//     pointIndex: number
//   ) => {
//     const pasteData = e.clipboardData.getData('text');

//     if (pasteData.includes(',')) {
//       e.preventDefault();

//       const points = pasteData
//         .split(',')
//         .map((item) => item.trim())
//         .filter((item) => item.length > 0);

//       if (points.length === 0) return;

//       setValue(
//         `services.cards.${cardIndex}.focusPoints.${pointIndex}` as any,
//         points[0],
//         { shouldValidate: true, shouldDirty: true }
//       );

//       for (let i = 1; i < points.length; i++) {
//         appendPoint(points[i] as never);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col bg-slate-50/80 border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-indigo-200 transition space-y-4">
//       {/* CARD HEADER / REMOVE BUTTON */}
//       <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
//         <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
//           <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
//           Card #{cardIndex + 1}
//         </span>

//         {totalCards > 2 && (
//           <button
//             type="button"
//             onClick={() => removeCard(cardIndex)}
//             className="text-slate-400 hover:text-red-600 transition p-1"
//             title="Remove Card"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* CARD TITLE */}
//       <div>
//         <div className="flex justify-between items-center mb-1">
//           <label className="block text-[11px] font-semibold text-slate-600 uppercase">
//             Card Title (H3)
//           </label>
//           <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
//             <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
//           </span>
//         </div>
//         <input
//           type="text"
//           {...register(`services.cards.${cardIndex}.title`)}
//           onPaste={handleSmartCardPaste}
//           placeholder="Paste full raw content block here to auto-fill card..."
//           className="w-full px-3 py-2 text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* CARD DESCRIPTION */}
//       <div>
//         <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
//           Card Description
//         </label>
//         <textarea
//           rows={3}
//           {...register(`services.cards.${cardIndex}.description`)}
//           onPaste={handleSmartCardPaste}
//           placeholder="Build custom web applications tailored to your business processes..."
//           className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* FOCUS & DEPLOYMENTS SECTION */}
//       <div className="border-t border-slate-200/80 pt-3 space-y-3 flex-1">
//         <div>
//           <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 tracking-wider">
//             Focus Header Title
//           </label>
//           <input
//             type="text"
//             {...register(`services.cards.${cardIndex}.focusTitle`)}
//             placeholder="FOCUS & DEPLOYMENTS:"
//             className="w-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-200 rounded-md bg-slate-100/60 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//           />
//         </div>

//         {/* BULLET POINTS LIST */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-[11px] font-semibold text-slate-600">
//               Bullet Points ({pointFields.length})
//             </span>
//             <button
//               type="button"
//               onClick={() => appendPoint('' as never)}
//               className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition"
//             >
//               <ListPlus className="w-3.5 h-3.5" /> Add Point
//             </button>
//           </div>

//           <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
//             {pointFields.map((pointField, pointIndex) => (
//               <div key={pointField.id} className="flex items-center gap-2">
//                 <span className="text-indigo-500 text-xs font-bold select-none">•</span>
//                 <input
//                   type="text"
//                   {...register(
//                     `services.cards.${cardIndex}.focusPoints.${pointIndex}`
//                   )}
//                   onPaste={(e) => handlePointPaste(e, pointIndex)}
//                   placeholder="e.g. SaaS platforms, Web portals"
//                   className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                 />
//                 {pointFields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removePoint(pointIndex)}
//                     className="text-slate-400 hover:text-red-600 transition shrink-0 p-0.5"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useEffect } from 'react';
// import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
// import { Layers, Plus, Trash2, ListPlus, Sparkles } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// export default function ServicesSection() {
//   const { register, control } = useFormContext<FullPagePayload>();

//   // Main Field Array for Service Cards
//   const {
//     fields: cardFields,
//     append: appendCard,
//     remove: removeCard,
//   } = useFieldArray({
//     control,
//     name: 'services.cards',
//   });

//   // Ensure minimum 2 cards exist by default
//   useEffect(() => {
//     if (cardFields.length === 0) {
//       appendCard({
//         id: `card-${Date.now()}-1`,
//         title: '',
//         description: '',
//         focusTitle: 'FOCUS & DEPLOYMENTS:',
//         focusPoints: [''],
//       });
//       appendCard({
//         id: `card-${Date.now()}-2`,
//         title: '',
//         description: '',
//         focusTitle: 'FOCUS & DEPLOYMENTS:',
//         focusPoints: [''],
//       });
//     } else if (cardFields.length === 1) {
//       appendCard({
//         id: `card-${Date.now()}-2`,
//         title: '',
//         description: '',
//         focusTitle: 'FOCUS & DEPLOYMENTS:',
//         focusPoints: [''],
//       });
//     }
//   }, [cardFields.length, appendCard]);

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//       {/* SECTION HEADER */}
//       <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//         <div className="flex items-center gap-2">
//           <Layers className="w-5 h-5 text-indigo-600" />
//           <h2 className="text-lg font-semibold text-slate-900">3. Services Section</h2>
//         </div>
//         <button
//           type="button"
//           onClick={() =>
//             appendCard({
//               id: `card-${Date.now()}`,
//               title: '',
//               description: '',
//               focusTitle: 'FOCUS & DEPLOYMENTS:',
//               focusPoints: [''],
//             })
//           }
//           className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition"
//         >
//           <Plus className="w-4 h-4" /> Add Service Card
//         </button>
//       </div>

//       {/* SECTION TITLE & SUBTITLE */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Section Title
//           </label>
//           <input
//             type="text"
//             {...register('services.sectionTitle')}
//             placeholder="e.g. React Development Services"
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//             Section Subtitle
//           </label>
//           <input
//             type="text"
//             {...register('services.sectionSubtitle')}
//             placeholder="e.g. I provide end-to-end React.js development services..."
//             className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* SERVICE CARDS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
//         {cardFields.map((card, cardIndex) => (
//           <ServiceCardItem
//             key={card.id}
//             cardIndex={cardIndex}
//             totalCards={cardFields.length}
//             removeCard={removeCard}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// {/* CARD ITEM COMPONENT matching the visual form layout */}
// function ServiceCardItem({
//   cardIndex,
//   totalCards,
//   removeCard,
// }: {
//   cardIndex: number;
//   totalCards: number;
//   removeCard: (index: number) => void;
// }) {
//   const { register, control, setValue } = useFormContext<FullPagePayload>();

//   // Nested Field Array for Focus Points
//   const {
//     fields: pointFields,
//     append: appendPoint,
//     remove: removePoint,
//   } = useFieldArray({
//     control,
//     name: `services.cards.${cardIndex}.focusPoints` as ArrayPath<FullPagePayload>,
//   });

//   // Ensures at least one bullet input exists by default
//   useEffect(() => {
//     if (pointFields.length === 0) {
//       appendPoint('' as never);
//     }
//   }, [pointFields.length, appendPoint]);

//   // Handles pasting comma-separated values into bullet point inputs
//   const handlePointPaste = (
//     e: React.ClipboardEvent<HTMLInputElement>,
//     pointIndex: number
//   ) => {
//     const pasteData = e.clipboardData.getData('text');

//     if (pasteData.includes(',')) {
//       e.preventDefault();

//       // Split pasted string by commas and clean extra whitespace
//       const points = pasteData
//         .split(',')
//         .map((item) => item.trim())
//         .filter((item) => item.length > 0);

//       if (points.length === 0) return;

//       // Replace current focused input with the first pasted bullet
//       setValue(
//         `services.cards.${cardIndex}.focusPoints.${pointIndex}` as any,
//         points[0],
//         { shouldValidate: true, shouldDirty: true }
//       );

//       // Append remaining bullet items as new individual inputs
//       for (let i = 1; i < points.length; i++) {
//         appendPoint(points[i] as never);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col bg-slate-50/80 border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-indigo-200 transition space-y-4">
//       {/* CARD HEADER / REMOVE BUTTON */}
//       <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
//         <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
//           <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
//           Card #{cardIndex + 1}
//         </span>

//         {/* Require at least 2 service cards */}
//         {totalCards > 2 && (
//           <button
//             type="button"
//             onClick={() => removeCard(cardIndex)}
//             className="text-slate-400 hover:text-red-600 transition p-1"
//             title="Remove Card"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* CARD TITLE */}
//       <div>
//         <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
//           Card Title (H3)
//         </label>
//         <input
//           type="text"
//           {...register(`services.cards.${cardIndex}.title`)}
//           placeholder="e.g. Custom React Web Applications"
//           className="w-full px-3 py-2 text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* CARD DESCRIPTION */}
//       <div>
//         <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
//           Card Description
//         </label>
//         <textarea
//           rows={3}
//           {...register(`services.cards.${cardIndex}.description`)}
//           placeholder="Build custom web applications tailored to your business processes..."
//           className="w-full px-3 py-2 text-xs text-slate-600 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* FOCUS & DEPLOYMENTS SECTION */}
//       <div className="border-t border-slate-200/80 pt-3 space-y-3 flex-1">
//         <div>
//           <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 tracking-wider">
//             Focus Header Title
//           </label>
//           <input
//             type="text"
//             {...register(`services.cards.${cardIndex}.focusTitle`)}
//             placeholder="FOCUS & DEPLOYMENTS:"
//             className="w-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-200 rounded-md bg-slate-100/60 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//           />
//         </div>

//         {/* BULLET POINTS LIST */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <span className="text-[11px] font-semibold text-slate-600">
//               Bullet Points ({pointFields.length})
//             </span>
//             <button
//               type="button"
//               onClick={() => appendPoint('' as never)}
//               className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition"
//             >
//               <ListPlus className="w-3.5 h-3.5" /> Add Point
//             </button>
//           </div>

//           <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
//             {pointFields.map((pointField, pointIndex) => (
//               <div key={pointField.id} className="flex items-center gap-2">
//                 <span className="text-indigo-500 text-xs font-bold select-none">•</span>
//                 <input
//                   type="text"
//                   {...register(
//                     `services.cards.${cardIndex}.focusPoints.${pointIndex}`
//                   )}
//                   onPaste={(e) => handlePointPaste(e, pointIndex)}
//                   placeholder="e.g. SaaS platforms, Web portals (Paste comma-separated to auto-split)"
//                   className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                 />
//                 {/* Hide remove button if only 1 bullet point field remains */}
//                 {pointFields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removePoint(pointIndex)}
//                     className="text-slate-400 hover:text-red-600 transition shrink-0 p-0.5"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }