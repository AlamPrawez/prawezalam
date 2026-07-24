import React from 'react';
import { PageSectionItem } from '../types';
import { getThemeClass, getPaddingClass, renderRichTextWithLinks } from '../utils';

export const ProcessView: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  return (
    <div className={`${getPaddingClass(sec.paddingSize)} ${getThemeClass(sec.bgTheme)} space-y-10`}>
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight">{sec.title || 'Development Process'}</h2>
        <p className="text-sm opacity-80">{renderRichTextWithLinks(sec.subtitle)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {(sec.cardsList ?? []).map((card, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">{card.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};