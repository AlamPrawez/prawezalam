'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray, ArrayPath } from 'react-hook-form';
import { UserCheck, Check, Plus, Trash2, Sparkles, Zap, ClipboardCheck } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

interface BulletItem {
  id: string;
  text: string;
}

export default function WhyWorkWithMeSection() {
  const { register, control, setValue } = useFormContext<FullPagePayload>();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // Dynamic list for checkmark bullet points
  const {
    fields: bulletFields,
    append: appendBullet,
    remove: removeBullet,
    replace: replaceBullets,
  } = useFieldArray({
    control,
    name: 'whyWorkWithMe.bullets' as ArrayPath<FullPagePayload>,
  });

  // Default fallback to ensure at least one bullet exists
  useEffect(() => {
    if (bulletFields.length === 0) {
      appendBullet({
        id: `bullet-${Date.now()}-1`,
        text: '',
      } as never);
    }
  }, [bulletFields.length, appendBullet]);

  // SMART PARSER FOR SECTION TEXT
  const parseAndPopulateSection = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 1) return;

    let title = '';
    let subtitle = '';
    let footerText = '';
    const parsedBullets: BulletItem[] = [];

    let lineIndex = 0;

    // 1. Title Line Detection
    if (lines[lineIndex].toLowerCase().includes('why work with me')) {
      title = lines[lineIndex];
      lineIndex++;
    }

    // 2. Subtitle / Intro Paragraph Detection
    if (lineIndex < lines.length && !lines[lineIndex].endsWith(':') && !lines[lineIndex].startsWith('•') && !lines[lineIndex].startsWith('-')) {
      subtitle = lines[lineIndex];
      lineIndex++;
    }

    // Check for trigger phrase line (e.g. "That means I can:")
    if (lineIndex < lines.length && lines[lineIndex].endsWith(':')) {
      if (!subtitle) {
        subtitle = lines[lineIndex];
      } else {
        subtitle += ' ' + lines[lineIndex];
      }
      lineIndex++;
    }

    let inBullets = true;

    // 3. Process Bullets & Footer
    for (let i = lineIndex; i < lines.length; i++) {
      const line = lines[i];
      const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');

      // If line is long and does not start with bullet indicators, treat as trailing footer
      if (inBullets && !isBullet && line.length > 60 && parsedBullets.length > 0) {
        inBullets = false;
        footerText = line;
        continue;
      }

      if (inBullets) {
        const cleanBullet = line.replace(/^[\textbullet\-\*\d\.\)\s]+/, '').trim();
        if (cleanBullet) {
          parsedBullets.push({
            id: `bullet-${Date.now()}-${parsedBullets.length + 1}`,
            text: cleanBullet,
          });
        }
      } else {
        footerText += ' ' + line;
      }
    }

    // Apply values to Form State
    if (title) {
      setValue('whyWorkWithMe.title' as never, title as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (subtitle) {
      setValue('whyWorkWithMe.subtitle' as never, subtitle as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (footerText) {
      setValue('whyWorkWithMe.footerText' as never, footerText as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (parsedBullets.length > 0) {
      replaceBullets(parsedBullets as never[]);
    }
  };

  // Single Input Paste Event Listener
  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 2) {
      e.preventDefault();
      parseAndPopulateSection(pasteText);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Why Work With Me Section</h2>
            <p className="text-xs text-slate-500">
              Manage your engineering credentials and full-stack value propositions.
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
              appendBullet({
                id: `bullet-${Date.now()}`,
                text: '',
              } as never)
            }
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Value Point
          </button>
        </div>
      </div>

      {/* HEADER & TOP DESCRIPTION INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            {...register('whyWorkWithMe.title' as never)}
            onPaste={handlePaste}
            defaultValue="Why Work With Me?"
            placeholder="e.g. Why Work With Me?"
            className="w-full px-3.5 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            Subtitle / Intro Paragraph
          </label>
          <textarea
            rows={2}
            {...register('whyWorkWithMe.subtitle' as never)}
            defaultValue="As a full-stack developer, I don't only build user interfaces—I understand the entire application layer lifecycle."
            placeholder="e.g. As a full-stack developer..."
            className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* VISUAL FORM PREVIEW CONTAINER */}
      <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500" /> Value Points List ({bulletFields.length})
          </span>
        </div>

        {/* CHECKMARK BULLETS ARRAY (OPTION 2) */}
        <div className="space-y-2.5">
          {bulletFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3 bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl shadow-2xs hover:border-indigo-300 transition"
            >
              <Check className="w-4 h-4 text-indigo-600 shrink-0 font-bold" />
              <input
                type="text"
                {...register(`whyWorkWithMe.bullets.${index}.text` as never)}
                placeholder="e.g. Design scalable system architecture frameworks from scratch."
                className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
              />
              {bulletFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBullet(index)}
                  className="text-slate-400 hover:text-red-500 transition p-1 shrink-0"
                  title="Remove Point"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER SUBTEXT INPUT */}
        <div className="border-t border-slate-200/80 pt-4">
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
            Bottom Summary / Footnote Text
          </label>
          <textarea
            rows={2}
            {...register('whyWorkWithMe.footerText' as never)}
            defaultValue="Rather than delivering isolated frontend code that is difficult to wire up, I build complete web solutions designed to run safely and predictably from the browser directly to the server infrastructure."
            placeholder="e.g. Rather than delivering isolated frontend code..."
            className="w-full px-3.5 py-2 text-xs text-slate-500 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* BULK PASTE MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Bulk Auto-Fill Why Work With Me Section
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
              Paste raw section content below. Titles, subtitles, bullet point items, and bottom summary notes will be populated automatically.
            </p>
            <textarea
              rows={10}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Why Work With Me?\nAs a full-stack developer, I don't only build user interfaces—I understand the entire application.\nThat means I can:\nDesign scalable system architecture\nBuild secure backend APIs\nIntegrate cloud infrastructure\nRather than delivering isolated frontend code, I build solutions...`}
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
                  parseAndPopulateSection(bulkText);
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