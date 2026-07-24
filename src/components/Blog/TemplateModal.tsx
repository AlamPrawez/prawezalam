import React from 'react';
import { X, Check, LayoutGrid, PlusCircle } from 'lucide-react';
import { PageSectionItem } from './types';
import { SectionViewRenderer } from './views';

interface TemplateModalProps {
  selectedType: { id: string; name: string };
  sampleOptions: Omit<PageSectionItem, 'id'>[];
  selectedSampleIndex: number;
  onSelectSampleIndex: (idx: number) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  selectedType,
  sampleOptions,
  selectedSampleIndex,
  onSelectSampleIndex,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Select Live {selectedType.name} Preset</h3>
              <p className="text-xs text-slate-400">Click any live template variant below to insert it directly onto your canvas.</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Stacked Live Template Cards */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950/60">
          {sampleOptions.map((opt, idx) => {
            const isSelected = selectedSampleIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => onSelectSampleIndex(idx)}
                className={`cursor-pointer group relative rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-600/20 ring-2 ring-indigo-500/60'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Variant Header Bar */}
                <div className="p-4 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Preset #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition">
                        {opt.title || `${selectedType.name} Variant`}
                      </h4>
                      <p className="text-[11px] text-slate-400 capitalize">
                        Style: <span className="text-slate-200">{opt.layoutStyle}</span> • Theme: <span className="text-slate-200">{opt.bgTheme}</span>
                      </p>
                    </div>
                  </div>

                  {/* Immediate Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSampleIndex(idx);
                      onConfirm();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      isSelected
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                    {isSelected ? 'Selected (Click to Add)' : 'Add Preset to Canvas'}
                  </button>
                </div>

                {/* Actual Live Rendered Component */}
                <div className="pointer-events-none p-2 bg-slate-950">
                  <div className="rounded-2xl overflow-hidden border border-slate-800/60">
                    <SectionViewRenderer
                      sec={{
                        ...opt,
                        id: `preview-live-${idx}`,
                      } as PageSectionItem}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center">
          <span className="text-xs text-slate-400">
            Selected: <strong className="text-indigo-400">Preset #{selectedSampleIndex + 1}</strong>
          </span>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Add Preset #{selectedSampleIndex + 1} to Canvas
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};