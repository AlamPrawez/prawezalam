import React from 'react';
import { PageSectionItem } from '../types';
import { getThemeClass, getPaddingClass, renderRichTextWithLinks } from '../utils';

export const ArticleView: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  return (
    <div className={`${getPaddingClass(sec.paddingSize)} ${getThemeClass(sec.bgTheme)} max-w-4xl mx-auto space-y-6`}>
      <h2 className="text-3xl font-extrabold tracking-tight">{sec.title}</h2>
      <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed opacity-90">
        {renderRichTextWithLinks(sec.subtitle)}
      </div>
    </div>
  );
};