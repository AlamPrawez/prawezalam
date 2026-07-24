import React from 'react';
import { PageSectionItem } from '../types';
import { getThemeClass, getPaddingClass, renderRichTextWithLinks, renderButtonStyle } from '../utils';
import { Layers, ArrowRight } from 'lucide-react';

export const FeaturesView: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  return (
    <div className={`${getPaddingClass(sec.paddingSize)} ${getThemeClass(sec.bgTheme)} space-y-10`}>
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight">{sec.title || 'Features & Stack'}</h2>
        <p className="text-sm opacity-80">{renderRichTextWithLinks(sec.subtitle)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {(sec.cardsList ?? []).map((card, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl hover:border-indigo-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{card.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {(sec.buttons ?? []).length > 0 && (
        <div className="flex justify-center pt-2">
          {sec?.buttons && sec?.buttons.map((btn) => (
            <a key={btn.id} href={btn.url} className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition ${renderButtonStyle(btn.variant)}`}>
              {btn.text} <ArrowRight className="w-4 h-4 inline ml-1" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};