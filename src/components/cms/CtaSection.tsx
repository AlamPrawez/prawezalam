'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Megaphone, ExternalLink, Sparkles, Zap, ClipboardCheck } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

export default function CtaSection() {
  const { register, setValue } = useFormContext<FullPagePayload>();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // SMART PARSER FOR CTA TEXT CONTENT
  const parseAndPopulateCta = (rawText: string) => {
    const lines = rawText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    let title = '';
    let description = '';
    let subText = '';
    let buttonText = '';
    let buttonUrl = '';

    const remainingBody: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 1. Explicit Key-Value Parsing (e.g. Title: ..., Button: ..., Link: ...)
      if (line.match(/^(headline|title|cta title|cta headline)[\:\=]/i)) {
        title = line.replace(/^(headline|title|cta title|cta headline)[\:\=]/i, '').trim();
        continue;
      }
      if (line.match(/^(desc|description|body)[\:\=]/i)) {
        description = line.replace(/^(desc|description|body)[\:\=]/i, '').trim();
        continue;
      }
      if (line.match(/^(subtext|pitch|secondary)[\:\=]/i)) {
        subText = line.replace(/^(subtext|pitch|secondary)[\:\=]/i, '').trim();
        continue;
      }
      if (line.match(/^(button|btn|button text|action)[\:\=]/i)) {
        buttonText = line.replace(/^(button|btn|button text|action)[\:\=]/i, '').trim();
        continue;
      }
      if (line.match(/^(link|url|target|button url)[\:\=]/i)) {
        buttonUrl = line.replace(/^(link|url|target|button url)[\:\=]/i, '').trim();
        continue;
      }

      // 2. Button Link / URL Auto-Detection
      if (line.startsWith('/') || line.startsWith('http://') || line.startsWith('https://') || line.startsWith('#')) {
        buttonUrl = line;
        continue;
      }

      // 3. Fallback sequential block processing
      if (!title && i === 0) {
        title = line;
      } else {
        remainingBody.push(line);
      }
    }

    // Process remaining sequential paragraphs if explicit key-values weren't present
    if (remainingBody.length > 0) {
      if (!description) {
        description = remainingBody.shift() || '';
      }
      if (remainingBody.length > 0 && !subText) {
        // If next line looks like button CTA text
        const nextLine = remainingBody[0];
        if (nextLine.toLowerCase().includes('contact') || nextLine.toLowerCase().includes('discuss') || nextLine.length < 50) {
          if (!buttonText) buttonText = remainingBody.shift() || '';
        } else {
          subText = remainingBody.shift() || '';
        }
      }
      if (remainingBody.length > 0 && !buttonText) {
        buttonText = remainingBody.join(' ');
      }
    }

    // Update Form State
    if (title) {
      setValue('ctaSection.title' as never, title as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (description) {
      setValue('ctaSection.description' as never, description as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (subText) {
      setValue('ctaSection.subText' as never, subText as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (buttonText) {
      setValue('ctaSection.buttonText' as never, buttonText as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (buttonUrl) {
      setValue('ctaSection.buttonUrl' as never, buttonUrl as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // Handle single-input paste event
  const handleHeadlinePaste = (e: React.ClipboardEvent) => {
    const pasteText = e.clipboardData.getData('text');
    if (pasteText.split('\n').filter((l) => l.trim()).length > 1) {
      e.preventDefault();
      parseAndPopulateCta(pasteText);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Call To Action (CTA) Section</h2>
            <p className="text-xs text-slate-500">
              Manage the bottom banner headline, subtext, and primary contact button.
            </p>
          </div>
        </div>

        {/* BULK PASTE BUTTON */}
        <button
          type="button"
          onClick={() => setShowBulkModal(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition"
        >
          <Zap className="w-3.5 h-3.5" /> Bulk Paste CTA
        </button>
      </div>

      {/* FORM INPUTS */}
      <div className="space-y-4">
        {/* MAIN TITLE */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase">
              CTA Headline Title (H2)
            </label>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-0.5">
              <ClipboardCheck className="w-3 h-3" /> Auto-fill on Paste
            </span>
          </div>
          <input
            type="text"
            {...register('ctaSection.title' as never)}
            onPaste={handleHeadlinePaste}
            defaultValue="Let's Build Your React Application"
            placeholder="e.g. Let's Build Your React Application"
            className="w-full px-3.5 py-2 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* PRIMARY DESCRIPTION */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            Primary Description Paragraph
          </label>
          <textarea
            rows={2}
            {...register('ctaSection.description' as never)}
            defaultValue="Whether you're starting from a raw product idea, improving an existing codebase ecosystem, or looking to scale a rapidly growing platform, I'd be happy to map out your project solutions."
            placeholder="Whether you're starting from a raw product idea..."
            className="w-full px-3.5 py-2 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* SECONDARY SUBTEXT */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
            Secondary Light Subtext / Pitch
          </label>
          <textarea
            rows={2}
            {...register('ctaSection.subText' as never)}
            defaultValue="If you are looking for a reliable software engineer who values pristine formatting logic, robust framework scalability, and long-term codebase maintainability—let's talk."
            placeholder="If you are looking for a reliable software engineer..."
            className="w-full px-3.5 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* BUTTON SETTINGS (LABEL & LINK) */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Primary Button Settings
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Button Text
              </label>
              <input
                type="text"
                {...register('ctaSection.buttonText' as never)}
                defaultValue="Contact Me Today to Discuss Your Project"
                placeholder="e.g. Contact Me Today..."
                className="w-full px-3 py-1.5 text-xs font-semibold text-slate-800 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Button Target URL / Action
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('ctaSection.buttonUrl' as never)}
                  defaultValue="/contact"
                  placeholder="e.g. /contact or #contact"
                  className="w-full pl-3 pr-8 py-1.5 text-xs text-slate-700 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
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
                Bulk Auto-Fill Call To Action
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
              Paste raw CTA text below. Headlines, description body paragraphs, pitch subtext, and button links will automatically populate into their input fields.
            </p>
            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Let's Build Your React Application\n\nWhether you're starting from a raw product idea or improving an existing codebase, I'd be happy to discuss solutions.\n\nIf you value pristine formatting logic and framework scalability—let's talk.\n\nContact Me Today\n/contact`}
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
                  parseAndPopulateCta(bulkText);
                  setShowBulkModal(false);
                  setBulkText('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Auto-Generate CTA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}