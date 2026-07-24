import React from 'react';
import { PageSectionItem } from '../types';
import { getThemeClass, getPaddingClass, renderButtonStyle } from '../utils';

export const CTAView: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  return (
    <div className={`${getPaddingClass(sec.paddingSize)} ${getThemeClass(sec.bgTheme)} text-center space-y-6 max-w-4xl mx-auto rounded-3xl`}>
      <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{sec.title || 'Ready to Start?'}</h2>
      <p className="text-sm sm:text-base opacity-80 max-w-xl mx-auto">{sec.subtitle}</p>
      
      {(sec?.buttons ?? []).length > 0 && (
        <div className="flex justify-center gap-3 pt-2">
          {sec?.buttons &&  sec?.buttons.map((btn) => (
            <a key={btn.id} href={btn.url} className={`px-8 py-3.5 rounded-xl font-bold text-sm transition ${renderButtonStyle(btn.variant)}`}>
              {btn.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};