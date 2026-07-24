import React from 'react';
import { useFormContext } from 'react-hook-form';
import { X, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { PageSectionItem } from './types';

interface SectionEditorProps {
  index: number;
  sec: PageSectionItem;
  onClose: () => void;
  addBulletPoint: (idx: number) => void;
  removeBulletPoint: (secIdx: number, bulletIdx: number) => void;
  addStepCard: (idx: number) => void;
  removeStepCard: (secIdx: number, cardIdx: number) => void;
  moveStepCard: (secIdx: number, cardIdx: number, dir: 'up' | 'down') => void;
  addButton: (idx: number) => void;
  removeButton: (secIdx: number, btnIdx: number) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  index,
  sec,
  onClose,
  addBulletPoint,
  removeBulletPoint,
  addStepCard,
  removeStepCard,
  moveStepCard,
  addButton,
  removeButton,
}) => {
  const { register } = useFormContext();

  return (
    <div className="p-6 bg-slate-900 border-b border-slate-800 space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center pb-3 border-b border-slate-800">
        <h3 className="text-sm font-extrabold text-indigo-400 uppercase tracking-wider">
          Editing Section #{index + 1} ({sec.type})
        </h3>
        <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400">Section Title</label>
          <input
            {...register(`sections.${index}.title`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Layout Style */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400">Layout Style</label>
          <select
            {...register(`sections.${index}.layoutStyle`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="split-right">Split Right</option>
            <option value="split-left">Split Left</option>
            <option value="centered">Centered</option>
            <option value="grid-cards">Grid Cards</option>
            <option value="workflow-steps">Workflow Steps</option>
          </select>
        </div>

        {/* Theme */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400">Background Theme</label>
          <select
            {...register(`sections.${index}.bgTheme`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="dark">Dark Slate</option>
            <option value="indigo">Deep Indigo</option>
            <option value="slate">Mid Slate</option>
            <option value="light">Light Theme</option>
          </select>
        </div>

        {/* Padding */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400">Padding Size</label>
          <select
            {...register(`sections.${index}.paddingSize`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>

        {/* Subtitle / Rich Markdown Body */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-[11px] font-bold text-slate-400">Subtitle / Description (Supports Markdown Links)</label>
          <textarea
            rows={3}
            {...register(`sections.${index}.subtitle`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-[11px] font-bold text-slate-400">Image URL (Optional)</label>
          <input
            {...register(`sections.${index}.imageUrl`)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Buttons Manager */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-300">Action Buttons</span>
          <button
            type="button"
            onClick={() => addButton(index)}
            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-bold hover:bg-indigo-600/30 transition flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Button
          </button>
        </div>

        {(sec.buttons || []).map((btn, bIdx) => (
          <div key={btn.id || bIdx} className="grid grid-cols-12 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 items-center">
            <input
              {...register(`sections.${index}.buttons.${bIdx}.text`)}
              placeholder="Button Label"
              className="col-span-4 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              {...register(`sections.${index}.buttons.${bIdx}.url`)}
              placeholder="URL (# or https://)"
              className="col-span-4 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <select
              {...register(`sections.${index}.buttons.${bIdx}.variant`)}
              className="col-span-3 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
            <button
              type="button"
              onClick={() => removeButton(index, bIdx)}
              className="col-span-1 p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg flex justify-center"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Cards List / Step Manager */}
      {(sec.cardsList || sec.type === 'process' || sec.type === 'features') && (
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300">Cards / Workflow Steps</span>
            <button
              type="button"
              onClick={() => addStepCard(index)}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-bold hover:bg-emerald-600/30 transition flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Card Step
            </button>
          </div>

          {(sec.cardsList || []).map((card, cIdx) => (
            <div key={cIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  {...register(`sections.${index}.cardsList.${cIdx}.title`)}
                  placeholder="Card Header Title"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => moveStepCard(index, cIdx, 'up')}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => moveStepCard(index, cIdx, 'down')}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => removeStepCard(index, cIdx)}
                  className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                {...register(`sections.${index}.cardsList.${cIdx}.desc`)}
                placeholder="Card detail description..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          ))}
        </div>
      )}

      {/* Bullet Points Manager */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-300">Bullet Point Highlights</span>
          <button
            type="button"
            onClick={() => addBulletPoint(index)}
            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-bold hover:bg-indigo-600/30 transition flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Highlight
          </button>
        </div>

        {(sec.bulletPoints || []).map((_, bpIdx) => (
          <div key={bpIdx} className="flex gap-2 items-center">
            <input
              {...register(`sections.${index}.bulletPoints.${bpIdx}`)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
            <button
              type="button"
              onClick={() => removeBulletPoint(index, bpIdx)}
              className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};