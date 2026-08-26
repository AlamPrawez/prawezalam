'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Quote, Link as LinkIcon, Unlink, X } from 'lucide-react';
import type { ArticleLayoutStyle, PageSectionItem } from '../types';
import { RichEditableText } from '../editor/RichEditableText';

type OnChange = (patch: Partial<PageSectionItem>) => void;

// export type ArticleLayoutStyle =
//   | 'single-col'
//   | 'editorial-2col'
//   | 'bordered-callout'
//   | 'hero-header'
//   | 'quote-box';

export const ARTICLE_VARIANTS: { value: ArticleLayoutStyle; label: string; description: string }[] = [
  {
    value: 'single-col',
    label: 'Standard Single-Column',
    description: 'Clean single-column block designed for distraction-free blog copy.',
  },
  {
    value: 'editorial-2col',
    label: '2-Column Editorial',
    description: 'Modern magazine-style two-column body text split.',
  },
  {
    value: 'bordered-callout',
    label: 'Bordered Callout Box',
    description: 'Framed card with a left indigo accent border line for emphasis.',
  },
  {
    value: 'hero-header',
    label: 'Hero Header Card',
    description: 'Large title header card with separated content panel underneath.',
  },
  {
    value: 'quote-box',
    label: 'Quote Highlight Box',
    description: 'Pull-quote styled box featuring an icon badge and styled typography.',
  },
];

// Exported factory function for blank article sections
export function makeBlankArticle(layoutStyle: ArticleLayoutStyle = 'single-col'): PageSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'article',
    layoutStyle: layoutStyle as any,
    bgTheme: 'dark',
    paddingSize: 'md',
    title: 'Engineering Best Practices',
    subtitle:
      'Building scalable frontend and backend solutions requires modularity, strict typing, and comprehensive test coverage.',
  };
}





// VARIANT 1: Single-Column Standard
const SingleColView: React.FC<{
  title: string;
  content: string;
  proseThemeClass: string;
  onUpdate: (patch: Partial<PageSectionItem>) => void;
}> = ({ title, content, proseThemeClass, onUpdate }) => (
  <div className="space-y-6">
    <RichEditableText
      value={title}
      onCommit={(v) => onUpdate({ title: v })}
      placeholder="Article Title..."
      className="block text-3xl sm:text-4xl font-extrabold tracking-tight"
    />

    <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
      <RichEditableText
        value={content}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Select any text to apply links..."
        className="block whitespace-pre-line min-h-[100px]"
      />
    </div>
  </div>
);

// VARIANT 2: 2-Column Editorial
// const Editorial2ColView: React.FC<{
//   title: string;
//   content: string;
//   proseThemeClass: string;
//   onUpdate: (patch: Partial<PageSectionItem>) => void;
// }> = ({ title, content, proseThemeClass, onUpdate }) => (
//   <div className="space-y-6">
//     <div className="border-b border-slate-800/80 pb-4">
//       <RichEditableText
//         value={title}
//         onCommit={(v) => onUpdate({ title: v })}
//         placeholder="Article Title..."
//         className="block text-3xl sm:text-4xl font-black tracking-tight"
//       />
//     </div>

//     <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 columns-1 md:columns-2 gap-8 ${proseThemeClass}`}>
//       <RichEditableText
//         value={content}
//         onCommit={(v) => onUpdate({ subtitle: v })}
//         placeholder="Select any text to apply links..."
//         className="block whitespace-pre-line min-h-[100px]"
//       />
//     </div>
//   </div>
// );

const Editorial2ColView: React.FC<{
  title: string;
  content: string;
  secondContent?: string;
  proseThemeClass: string;
  onUpdate: (patch: Partial<PageSectionItem>) => void;
}> = ({
  title,
  content,
  secondContent = '',
  proseThemeClass,
  onUpdate,
}) => (
  <div className="space-y-6">
    {/* Title Header */}
    <div className="border-b border-slate-800/80 pb-4">
      <RichEditableText
        value={title}
        onCommit={(v) => onUpdate({ title: v })}
        placeholder="Article Title..."
        className="block text-3xl sm:text-4xl font-black tracking-tight"
      />
    </div>

    {/* Clean Two-Column Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Column 1 - Editable */}
      <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
        <RichEditableText
          value={content}
          onCommit={(v) => onUpdate({ subtitle: v })}
          placeholder="First column content..."
          className="block whitespace-pre-line min-h-[100px]"
        />
      </div>

      {/* Column 2 - Editable */}
      <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
        <RichEditableText
          value={secondContent}
          onCommit={(v) => onUpdate({ contentHtml: v })}
          placeholder="Second column content..."
          className="block whitespace-pre-line min-h-[100px]"
        />
      </div>
    </div>
  </div>
);


// VARIANT 3: Bordered Callout Box
const BorderedCalloutView: React.FC<{
  title: string;
  content: string;
  proseThemeClass: string;
  onUpdate: (patch: Partial<PageSectionItem>) => void;
}> = ({ title, content, proseThemeClass, onUpdate }) => (
  <div className="border-l-4 border-indigo-500 pl-6 space-y-4">
    <RichEditableText
      value={title}
      onCommit={(v) => onUpdate({ title: v })}
      placeholder="Article Title..."
      className="block text-2xl sm:text-3xl font-extrabold tracking-tight"
    />

    <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
      <RichEditableText
        value={content}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Select any text to apply links..."
        className="block whitespace-pre-line min-h-[80px]"
      />
    </div>
  </div>
);

// VARIANT 4: Hero Header Card
const HeroHeaderView: React.FC<{
  title: string;
  content: string;
  proseThemeClass: string;
  cardThemeClass: string;
  onUpdate: (patch: Partial<PageSectionItem>) => void;
}> = ({ title, content, proseThemeClass, cardThemeClass, onUpdate }) => (
  <div className="space-y-6">
    <div className="p-8 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-center space-y-3">
      <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
        <BookOpen className="w-5 h-5" />
      </div>
      <RichEditableText
        value={title}
        onCommit={(v) => onUpdate({ title: v })}
        placeholder="Article Title..."
        className="block text-3xl sm:text-4xl font-black tracking-tight"
      />
    </div>

    <div className={`p-6 sm:p-8 rounded-2xl border ${cardThemeClass}`}>
      <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
        <RichEditableText
          value={content}
          onCommit={(v) => onUpdate({ subtitle: v })}
          placeholder="Select any text to apply links..."
          className="block whitespace-pre-line min-h-[100px]"
        />
      </div>
    </div>
  </div>
);

// VARIANT 5: Quote Highlight Box
const QuoteBoxView: React.FC<{
  title: string;
  content: string;
  proseThemeClass: string;
  onUpdate: (patch: Partial<PageSectionItem>) => void;
}> = ({ title, content, proseThemeClass, onUpdate }) => (
  <div className="relative p-6 sm:p-10 rounded-3xl bg-indigo-950/40 border border-indigo-800/40 space-y-4">
    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
      <Quote className="w-5 h-5" />
    </div>

    <RichEditableText
      value={title}
      onCommit={(v) => onUpdate({ title: v })}
      placeholder="Article Title..."
      className="block text-2xl sm:text-3xl font-black tracking-tight italic"
    />

    <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
      <RichEditableText
        value={content}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Select any text to apply links..."
        className="block whitespace-pre-line min-h-[80px]"
      />
    </div>
  </div>
);

// Main ArticleView Component
export const ArticleView: React.FC<{
  sec: PageSectionItem;
  onChange?: OnChange;
}> = ({ sec, onChange }) => {
  const handleUpdate = (patch: Partial<PageSectionItem>) => {
    if (onChange) onChange(patch);
  };

  const paddingClass =
    sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

  const themeClass =
    sec.bgTheme === 'indigo'
      ? 'bg-indigo-950 text-white'
      : sec.bgTheme === 'light'
      ? 'bg-slate-100 text-slate-900'
      : 'bg-slate-950 text-white';

  const cardThemeClass =
    sec.bgTheme === 'light'
      ? 'bg-white border-slate-200'
      : 'bg-slate-900/60 border-slate-800';

  const proseThemeClass = sec.bgTheme === 'light' ? 'prose-slate' : 'prose-invert';

  const title = sec.title || '';
  const content = sec.subtitle || '';

  return (
    <div className={`mx-auto ${paddingClass} ${themeClass}`}>
      {sec.layoutStyle === 'editorial-2col' && (
        <Editorial2ColView
          title={title}
          content={content}
          proseThemeClass={proseThemeClass}
          onUpdate={handleUpdate}
        />
      )}
      {sec.layoutStyle === 'bordered-callout' && (
        <BorderedCalloutView
          title={title}
          content={content}
          proseThemeClass={proseThemeClass}
          onUpdate={handleUpdate}
        />
      )}
      {sec.layoutStyle === 'hero-header' && (
        <HeroHeaderView
          title={title}
          content={content}
          proseThemeClass={proseThemeClass}
          cardThemeClass={cardThemeClass}
          onUpdate={handleUpdate}
        />
      )}
      {sec.layoutStyle === 'quote-box' && (
        <QuoteBoxView
          title={title}
          content={content}
          proseThemeClass={proseThemeClass}
          onUpdate={handleUpdate}
        />
      )}
      {(!sec.layoutStyle || sec.layoutStyle === 'single-col') && (
        <SingleColView
          title={title}
          content={content}
          proseThemeClass={proseThemeClass}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

// Layout Thumbnail Helper Component
export function ArticleThumbnail({ layoutStyle = 'single-col' }: { layoutStyle?: ArticleLayoutStyle }) {
  const sampleArticle = makeBlankArticle(layoutStyle);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
      <div
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{
          width: '1280px',
          transform: 'scale(0.235)',
          transformOrigin: 'top left',
        }}
      >
        <ArticleView sec={sampleArticle} onChange={() => {}} />
      </div>
    </div>
  );
}














// import React, { useState, useRef, useEffect } from 'react';
// import { PageSectionItem } from '../types';



// type OnChange = (patch: Partial<PageSectionItem>) => void;


// function makeBlankArticle(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'article',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Engineering Best Practices',
//     subtitle:
//       'Building scalable frontend and backend solutions requires modularity, strict typing, and comprehensive test coverage.',
//   };
// }

// // Editable Text Primitive
// const EditableText: React.FC<{
//   value: string;
//   onCommit: (next: string) => void;
//   as?: React.ElementType;
//   className?: string;
//   placeholder?: string;
// }> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
//   const ref = useRef<HTMLElement>(null);
//   const [focused, setFocused] = useState(false);

//   useEffect(() => {
//     if (!focused && ref.current && ref.current.innerText !== value) {
//       ref.current.innerText = value;
//     }
//   }, [value, focused]);

//   return (
//     <Tag
//       ref={ref}
//       contentEditable
//       suppressContentEditableWarning
//       onFocus={() => setFocused(true)}
//       onBlur={(e: React.FocusEvent<HTMLElement>) => {
//         setFocused(false);
//         onCommit(e.currentTarget.innerText);
//       }}
//       data-placeholder={placeholder}
//       className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//     />
//   );
// };

// export const ArticleView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white border border-indigo-800/50'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900 border border-slate-200'
//       : 'bg-slate-950 text-white border border-slate-800';

//   return (
//     <div className={`my-8 max-w-4xl mx-auto rounded-3xl space-y-6 ${paddingClass} ${themeClass}`}>
//       <EditableText
//         as="h2"
//         value={sec.title || ''}
//         onCommit={(v) => handleUpdate({ title: v })}
//         placeholder="Article Title..."
//         className="block text-3xl font-extrabold tracking-tight"
//       />

//       <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed opacity-90">
//         <EditableText
//           as="div"
//           value={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Write your article content or rich text paragraphs here..."
//           className="block whitespace-pre-line min-h-[100px]"
//         />
//       </div>
//     </div>
//   );
// };