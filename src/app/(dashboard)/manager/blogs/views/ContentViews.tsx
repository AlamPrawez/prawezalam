'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ContentLayoutStyle, PageSectionItem } from '../types';
import { EditableBlogImage } from '../editor/EditableBlogImage';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-40 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
      Loading Rich Text Editor...
    </div>
  ),
});

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
};

export interface ContentSectionItem extends PageSectionItem {
  type: 'content';
  layoutStyle?: ContentLayoutStyle;
}

export interface ContentViewsProps {
  sections?: ContentSectionItem[];
  sec?: ContentSectionItem;
  onChange?: (patch: Partial<ContentSectionItem>) => void;
  isThumbnail?: boolean;
}

export const CONTENT_VARIANTS: {
  value: ContentLayoutStyle;
  label: string;
  description: string;
}[] = [
  {
    value: 'standard-block',
    label: 'Standard Body Block',
    description: 'Full-width rich text section with clean document flow.',
  },
  {
    value: 'split-image',
    label: 'Split Media & Text',
    description: 'Two-column layout balancing rich body copy with an image container.',
  },
  {
    value: 'card-grid',
    label: 'Card Enclosed Block',
    description: 'Enclosed card styling suited for highlighted or featured content.',
  },
  {
    value: 'bordered-callout',
    label: 'Bordered Accent Block',
    description: 'Left border accent highlight line for key body takeaways.',
  },
  {
    value: 'simple-quill',
    label: 'Simple Text Block',
    description: 'Minimalistic section rendering only rich text content.',
  },
];

export function makeBlankContent(
  layoutStyle: ContentLayoutStyle = 'standard-block'
): ContentSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'content',
    title: 'Engineering Best Practices',
    subtitle: 'Building scalable frontend and backend solutions.',
    heading: 'Engineering Best Practices',
    contentHtml:
      '<p>Building scalable frontend and backend solutions requires modularity, strict typing, and comprehensive test coverage.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
    imageAlt: 'React architecture diagram',
    layoutStyle,
    bgTheme: 'dark',
    paddingSize: 'md',
  };
}

/* ============================================================================
 * QUILL → PORTABLE HTML NORMALIZER
 * ========================================================================== */

type ListStackEntry = {
  level: number;
  type: 'bullet' | 'ordered';
  el: HTMLElement;
};

function listClasses(type: 'bullet' | 'ordered'): string {
  return type === 'ordered'
    ? 'list-decimal list-outside pl-6 space-y-1 my-3'
    : 'list-disc list-outside pl-6 space-y-1 my-3';
}

function convertQuillLists(root: HTMLElement, doc: Document) {
  const hasLegacyMarkers = Boolean(root.querySelector('li[data-list]'));

  if (!hasLegacyMarkers) {
    root.querySelectorAll('ol, ul').forEach((list) => {
      const isOrdered = list.tagName === 'OL';
      list.setAttribute('class', listClasses(isOrdered ? 'ordered' : 'bullet'));
    });
    root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
    root.querySelectorAll('li[class]').forEach((li) => li.removeAttribute('class'));
    return;
  }

  const legacyLists = Array.from(root.querySelectorAll('ol, ul'));

  legacyLists.forEach((oldList) => {
    const items = Array.from(oldList.children).filter(
      (el): el is HTMLLIElement => el.tagName === 'LI'
    );
    if (!items.length) return;

    const wrapper = doc.createElement('div');
    const stack: ListStackEntry[] = [];

    items.forEach((li) => {
      const explicitType = li.getAttribute('data-list');
      const type: 'bullet' | 'ordered' = explicitType === 'ordered' ? 'ordered' : 'bullet';
      const indentMatch = (li.getAttribute('class') || '').match(/ql-indent-(\d+)/);
      const level = indentMatch ? parseInt(indentMatch[1], 10) : 0;

      const uiSpan = li.querySelector('.ql-ui');
      if (uiSpan) uiSpan.remove();
      li.removeAttribute('data-list');
      li.removeAttribute('class');

      while (stack.length && stack[stack.length - 1].level > level) stack.pop();

      let top = stack[stack.length - 1];
      const needsNewList =
        !top || top.level < level || (top.level === level && top.type !== type);

      if (needsNewList) {
        if (top && top.level === level) stack.pop();
        const parent = stack[stack.length - 1];

        const newList = doc.createElement(type === 'ordered' ? 'ol' : 'ul');
        newList.setAttribute('class', listClasses(type));

        if (parent) {
          const lastLi = parent.el.lastElementChild;
          (lastLi || parent.el).appendChild(newList);
        } else {
          wrapper.appendChild(newList);
        }

        stack.push({ level, type, el: newList });
        top = stack[stack.length - 1];
      }

      top.el.appendChild(li);
    });

    oldList.replaceWith(...Array.from(wrapper.childNodes));
  });
}

function normalizeQuillImages(root: HTMLElement) {
  root.querySelectorAll('img').forEach((img) => {
    img.removeAttribute('style');
    const existing = img.getAttribute('class') || '';
    const merged = `${existing} rounded-lg max-w-full h-auto my-4 block`
      .split(/\s+/)
      .filter(Boolean)
      .filter((cls, idx, arr) => arr.indexOf(cls) === idx)
      .join(' ');
    img.setAttribute('class', merged);
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
  });
}

export function sanitizeQuillHtml(html: string): string {
  const raw = (html || '').trim();
  if (!raw) return '';

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return raw;
  }

  const doc = new DOMParser().parseFromString(`<div id="quill-root">${raw}</div>`, 'text/html');
  const root = doc.getElementById('quill-root');
  if (!root) return raw;

  root.querySelectorAll('.ql-align-center').forEach((el) => el.classList.add('text-center'));
  root.querySelectorAll('.ql-align-right').forEach((el) => el.classList.add('text-right'));
  root.querySelectorAll('.ql-align-justify').forEach((el) => el.classList.add('text-justify'));

  convertQuillLists(root, doc);
  normalizeQuillImages(root);

  root.querySelectorAll('pre').forEach((pre) => {
    pre.setAttribute(
      'class',
      'bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm my-4'
    );
  });

  root.querySelectorAll('blockquote').forEach((bq) => {
    bq.setAttribute('class', 'border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-4');
  });

  root.querySelectorAll('a').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    const existing = a.getAttribute('class') || '';
    a.setAttribute('class', `${existing} text-indigo-400 underline underline-offset-2`.trim());
  });

  root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
  root.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
  root.querySelectorAll('[data-list]').forEach((el) => el.removeAttribute('data-list'));
  root.querySelectorAll('[class]').forEach((el) => {
    const cleaned = (el.getAttribute('class') || '')
      .split(/\s+/)
      .filter((cls) => cls && !cls.startsWith('ql-'))
      .join(' ');
    if (cleaned) el.setAttribute('class', cleaned);
    else el.removeAttribute('class');
  });

  return root.innerHTML;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHeadingHtml(section: ContentSectionItem, extraClass = ''): string {
  const heading = section.heading || section.title || '';
  if (!heading) return '';
  return `<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight${
    extraClass ? ` ${extraClass}` : ''
  }">${escapeHtml(heading)}</h2>`;
}

// Now theme-aware: picks prose-invert (dark bg) vs prose-slate (light bg),
// same rule ContentViews uses for the live/editable body render.
function buildBodyHtml(section: ContentSectionItem, isLight: boolean): string {
  const body = sanitizeQuillHtml(section.contentHtml || '');
  const proseVariant = isLight ? 'prose-slate' : 'prose-invert';
  return `<div class="prose ${proseVariant} max-w-none leading-relaxed">${body}</div>`;
}

function buildImageHtml(section: ContentSectionItem): string {
  const src = section.imageUrl?.trim();
  if (!src) return '';

  const alt = escapeHtml(section.imageAlt || section.heading || section.title || 'Section image');
  const img = `<img src="${escapeHtml(src)}" alt="${alt}" class="w-full h-64 sm:h-72 object-cover" loading="lazy" />`;
  const linked = section.imageLinkUrl
    ? `<a href="${escapeHtml(section.imageLinkUrl)}" target="_blank" rel="noopener noreferrer">${img}</a>`
    : img;
  const caption = section.imageAlt
    ? `<p class="p-2 text-xs text-center text-slate-400 italic bg-slate-900 border-t border-slate-800">${escapeHtml(
        section.imageAlt
      )}</p>`
    : '';

  return `<div class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900">${linked}${caption}</div>`;
}

/* ----------------------------------------------------------------------------
 * Exported/state-based HTML path. Now applies bgTheme background + text color
 * exactly like the live ContentViews wrapper does, using the SAME outer
 * full-bleed / inner max-w-4xl structure fixed earlier for spacing.
 * -------------------------------------------------------------------------- */
export function renderContentSectionHtml(section: ContentSectionItem): string {
  const layout = section.layoutStyle || 'standard-block';
  const hasImage = Boolean(section.imageUrl?.trim());

  const isLight = section.bgTheme === 'light';
  const themeClass =
    section.bgTheme === 'indigo'
      ? 'bg-indigo-950 text-white'
      : section.bgTheme === 'light'
      ? 'bg-slate-100 text-slate-900'
      : 'bg-slate-950 text-white';
  const headingThemeClass = isLight ? 'text-slate-900' : 'text-white';
  const borderColor = isLight ? 'border-slate-300' : 'border-slate-800';

  const paddingClass =
    section.paddingSize === 'sm'
      ? 'py-6 px-6'
      : section.paddingSize === 'lg'
      ? 'py-16 px-6'
      : 'py-10 px-6';

  let inner = '';

  if (layout === 'simple-quill') {
    inner = `<article class="w-full">${buildBodyHtml(section, isLight)}</article>`;
  } else if (layout === 'bordered-callout') {
    const cardBg = isLight
      ? 'bg-white/70 border-slate-300'
      : 'bg-slate-900/60 border-slate-800';
    inner = `<article class="p-6 sm:p-8 rounded-2xl ${cardBg} border-l-4 border-indigo-500 border-y border-r shadow-sm space-y-6">${buildHeadingHtml(
      section,
      headingThemeClass
    )}${buildBodyHtml(section, isLight)}</article>`;
  } else if (layout === 'card-grid') {
    const cardBg = isLight
      ? 'bg-white text-slate-900 border-slate-200'
      : 'bg-slate-900 text-white border-slate-800';
    inner = `<article class="p-8 rounded-3xl ${cardBg} border shadow-xl space-y-6">${buildHeadingHtml(
      section,
      headingThemeClass
    )}${buildBodyHtml(section, isLight)}</article>`;
  } else {
    const showTwoCol = hasImage || layout === 'split-image';
    const bodyCol = showTwoCol
      ? `<div class="lg:col-span-7">${buildBodyHtml(section, isLight)}</div>`
      : `<div class="w-full">${buildBodyHtml(section, isLight)}</div>`;
    const imageCol = hasImage
      ? `<div class="lg:col-span-5">${buildImageHtml(section)}</div>`
      : '';

    inner = `<article class="space-y-6">${buildHeadingHtml(
      section,
      `border-b ${borderColor} pb-3 ${headingThemeClass}`
    )}<div class="grid grid-cols-1 ${
      showTwoCol ? 'lg:grid-cols-12' : ''
    } gap-8 items-start mt-5">${bodyCol}${imageCol}</div></article>`;
  }

  return `<div class="w-full ${themeClass}"><div class="max-w-4xl mx-auto space-y-6 ${paddingClass}">${inner}</div></div>`;
}

export function renderContentSectionsHtml(sections: ContentSectionItem[]): string {
  if (!sections.length) return '';
  const inner = sections.map((s) => renderContentSectionHtml(s)).join('');
  return `<section class="space-y-6">${inner}</section>`;
}

function QuillEditorColorFix() {
  return (
    <style jsx global>{`
      .quill-editor-scope .ql-editor {
        color: #1e293b;
        font-size: 0.925rem;
        line-height: 1.6;
      }
      .quill-editor-scope .ql-editor.ql-blank::before {
        color: #94a3b8;
        font-style: normal;
      }
      .quill-editor-scope .ql-editor a {
        color: #4f46e5;
        text-decoration: underline;
      }
      .quill-editor-scope .ql-editor h1,
      .quill-editor-scope .ql-editor h2,
      .quill-editor-scope .ql-editor h3 {
        color: #0f172a;
      }
      .quill-editor-scope .ql-editor blockquote {
        color: #475569;
      }
      .quill-editor-scope .ql-editor pre.ql-syntax {
        background: #0f172a;
        color: #e2e8f0;
        border-radius: 0.5rem;
      }
    `}</style>
  );
}

export function ContentViews({
  sections,
  sec,
  onChange,
  isThumbnail = false,
}: ContentViewsProps) {
  const activeSections = sec ? [sec] : sections || [];

  if (!activeSections.length) return null;

  const isEditable = Boolean(onChange) && !isThumbnail;

  return (
    <div className="w-full space-y-6">
      {isEditable && <QuillEditorColorFix />}
      {activeSections.map((section, idx) => {
        const key = section.id || `content-view-${idx}`;
        const hasImage = Boolean(section.imageUrl?.trim());
        const layout = section.layoutStyle || 'standard-block';

        const paddingClass =
          section.paddingSize === 'sm'
            ? 'py-6 px-6'
            : section.paddingSize === 'lg'
            ? 'py-16 px-6'
            : 'py-10 px-6';

        const themeClass =
          section.bgTheme === 'indigo'
            ? 'bg-indigo-950 text-white'
            : section.bgTheme === 'light'
            ? 'bg-slate-100 text-slate-900'
            : 'bg-slate-950 text-white';

        const headingThemeClass =
          section.bgTheme === 'light' ? 'text-slate-900' : 'text-white';

        const renderHeading = (extraClasses = '') => {
          const displayHeading = section.heading || section.title || '';
          if (isEditable && onChange) {
            return (
              <input
                type="text"
                value={displayHeading}
                onChange={(e) =>
                  onChange({ heading: e.target.value, title: e.target.value })
                }
                placeholder="Enter section heading..."
                className={`w-full text-2xl sm:text-3xl font-extrabold bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none transition ${headingThemeClass} ${extraClasses}`}
              />
            );
          }
          return (
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${headingThemeClass} ${extraClasses}`}
            >
              {displayHeading}
            </h2>
          );
        };

        const renderBodyContent = () => {
          if (isEditable && onChange) {
            return (
              <div
                data-editor-only="true"
                className="quill-editor-scope bg-white rounded-lg overflow-hidden border border-slate-300"
              >
                <ReactQuill
                  theme="snow"
                  value={section.contentHtml || ''}
                  onChange={(html: string) => onChange({ contentHtml: html })}
                  modules={editorModules}
                  placeholder="Write your structured section content here..."
                />
              </div>
            );
          }
          return (
            <div
              className={`prose ${
                section.bgTheme === 'light' ? 'prose-slate' : 'prose-invert'
              } max-w-none leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: sanitizeQuillHtml(section.contentHtml || '') }}
            />
          );
        };

        const renderImage = () => {
          if (isEditable && onChange) {
            return (
              <EditableBlogImage
                src={section.imageUrl || ''}
                alt={section.imageAlt || section.heading || 'Blog image'}
                imageLinkUrl={section.imageLinkUrl}
                onUpdate={(patch: {
                  imageUrl?: string;
                  imageAlt?: string;
                  imageLinkUrl?: string;
                }) => onChange(patch)}
              />
            );
          }

          if (!hasImage) return null;

          return (
            <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <div className="relative w-full h-64 sm:h-72">
                <Image
                  src={section.imageUrl!}
                  alt={
                    section.imageAlt ||
                    section.heading ||
                    section.title ||
                    'Section image'
                  }
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              {section.imageAlt && (
                <p className="p-2 text-xs text-center text-slate-400 italic bg-slate-900 border-t border-slate-800">
                  {section.imageAlt}
                </p>
              )}
            </div>
          );
        };

        return (
          <div key={key} className={`w-full ${themeClass}`}>
            <div className={`max-w-4xl mx-auto space-y-6 ${paddingClass}`}>
              {layout === 'simple-quill' && (
                <article className="w-full">{renderBodyContent()}</article>
              )}

              {layout === 'bordered-callout' && (
                <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border-l-4 border-indigo-500 border-y border-r border-slate-800 shadow-sm space-y-6">
                  {renderHeading()}
                  {renderBodyContent()}
                </article>
              )}

              {layout === 'card-grid' && (
                <article className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
                  {renderHeading('text-white')}
                  {renderBodyContent()}
                </article>
              )}

              {(layout === 'standard-block' || layout === 'split-image') && (
                <article className="space-y-6">
                  {renderHeading('border-b border-slate-800/50 pb-3')}

                  <div
                    className={`grid grid-cols-1 ${
                      hasImage || isEditable || layout === 'split-image'
                        ? 'lg:grid-cols-12'
                        : ''
                    } gap-8 items-start`}
                  >
                    <div
                      className={
                        hasImage || isEditable || layout === 'split-image'
                          ? 'lg:col-span-7'
                          : 'w-full'
                      }
                    >
                      {renderBodyContent()}
                    </div>

                    {(hasImage || isEditable) && (
                      <div className="lg:col-span-5">{renderImage()}</div>
                    )}
                  </div>
                </article>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContentLayoutThumbnail({
  layoutStyle = 'standard-block',
}: {
  layoutStyle?: ContentLayoutStyle;
}) {
  const sampleSection = makeBlankContent(layoutStyle);

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
        <ContentViews sec={sampleSection} isThumbnail={true} />
      </div>
    </div>
  );
}

// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { ContentLayoutStyle, PageSectionItem } from '../types';
// import { EditableBlogImage } from '../editor/EditableBlogImage';
// import 'react-quill-new/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-40 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
//       Loading Rich Text Editor...
//     </div>
//   ),
// });

// const editorModules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['link', 'image', 'code-block'],
//     ['clean'],
//   ],
// };

// export interface ContentSectionItem extends PageSectionItem {
//   type: 'content';
//   layoutStyle?: ContentLayoutStyle;
// }

// export interface ContentViewsProps {
//   sections?: ContentSectionItem[];
//   sec?: ContentSectionItem;
//   onChange?: (patch: Partial<ContentSectionItem>) => void;
//   isThumbnail?: boolean;
// }

// export const CONTENT_VARIANTS: {
//   value: ContentLayoutStyle;
//   label: string;
//   description: string;
// }[] = [
//   {
//     value: 'standard-block',
//     label: 'Standard Body Block',
//     description: 'Full-width rich text section with clean document flow.',
//   },
//   {
//     value: 'split-image',
//     label: 'Split Media & Text',
//     description: 'Two-column layout balancing rich body copy with an image container.',
//   },
//   {
//     value: 'card-grid',
//     label: 'Card Enclosed Block',
//     description: 'Enclosed card styling suited for highlighted or featured content.',
//   },
//   {
//     value: 'bordered-callout',
//     label: 'Bordered Accent Block',
//     description: 'Left border accent highlight line for key body takeaways.',
//   },
//   {
//     value: 'simple-quill',
//     label: 'Simple Text Block',
//     description: 'Minimalistic section rendering only rich text content.',
//   },
// ];

// export function makeBlankContent(
//   layoutStyle: ContentLayoutStyle = 'standard-block'
// ): ContentSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'content',
//     title: 'Engineering Best Practices',
//     subtitle: 'Building scalable frontend and backend solutions.',
//     heading: 'Engineering Best Practices',
//     contentHtml:
//       '<p>Building scalable frontend and backend solutions requires modularity, strict typing, and comprehensive test coverage.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
//     imageAlt: 'React architecture diagram',
//     layoutStyle,
//     bgTheme: 'dark',
//     paddingSize: 'md',
//   };
// }

// /* ============================================================================
//  * QUILL → PORTABLE HTML NORMALIZER
//  * ========================================================================== */

// type ListStackEntry = {
//   level: number;
//   type: 'bullet' | 'ordered';
//   el: HTMLElement;
// };

// function listClasses(type: 'bullet' | 'ordered'): string {
//   return type === 'ordered'
//     ? 'list-decimal list-outside pl-6 space-y-1 my-3'
//     : 'list-disc list-outside pl-6 space-y-1 my-3';
// }

// function convertQuillLists(root: HTMLElement, doc: Document) {
//   const hasLegacyMarkers = Boolean(root.querySelector('li[data-list]'));

//   if (!hasLegacyMarkers) {
//     root.querySelectorAll('ol, ul').forEach((list) => {
//       const isOrdered = list.tagName === 'OL';
//       list.setAttribute('class', listClasses(isOrdered ? 'ordered' : 'bullet'));
//     });
//     root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
//     root.querySelectorAll('li[class]').forEach((li) => li.removeAttribute('class'));
//     return;
//   }

//   const legacyLists = Array.from(root.querySelectorAll('ol, ul'));

//   legacyLists.forEach((oldList) => {
//     const items = Array.from(oldList.children).filter(
//       (el): el is HTMLLIElement => el.tagName === 'LI'
//     );
//     if (!items.length) return;

//     const wrapper = doc.createElement('div');
//     const stack: ListStackEntry[] = [];

//     items.forEach((li) => {
//       const explicitType = li.getAttribute('data-list');
//       const type: 'bullet' | 'ordered' = explicitType === 'ordered' ? 'ordered' : 'bullet';
//       const indentMatch = (li.getAttribute('class') || '').match(/ql-indent-(\d+)/);
//       const level = indentMatch ? parseInt(indentMatch[1], 10) : 0;

//       const uiSpan = li.querySelector('.ql-ui');
//       if (uiSpan) uiSpan.remove();
//       li.removeAttribute('data-list');
//       li.removeAttribute('class');

//       while (stack.length && stack[stack.length - 1].level > level) stack.pop();

//       let top = stack[stack.length - 1];
//       const needsNewList =
//         !top || top.level < level || (top.level === level && top.type !== type);

//       if (needsNewList) {
//         if (top && top.level === level) stack.pop();
//         const parent = stack[stack.length - 1];

//         const newList = doc.createElement(type === 'ordered' ? 'ol' : 'ul');
//         newList.setAttribute('class', listClasses(type));

//         if (parent) {
//           const lastLi = parent.el.lastElementChild;
//           (lastLi || parent.el).appendChild(newList);
//         } else {
//           wrapper.appendChild(newList);
//         }

//         stack.push({ level, type, el: newList });
//         top = stack[stack.length - 1];
//       }

//       top.el.appendChild(li);
//     });

//     oldList.replaceWith(...Array.from(wrapper.childNodes));
//   });
// }

// function normalizeQuillImages(root: HTMLElement) {
//   root.querySelectorAll('img').forEach((img) => {
//     img.removeAttribute('style');
//     const existing = img.getAttribute('class') || '';
//     const merged = `${existing} rounded-lg max-w-full h-auto my-4 block`
//       .split(/\s+/)
//       .filter(Boolean)
//       .filter((cls, idx, arr) => arr.indexOf(cls) === idx)
//       .join(' ');
//     img.setAttribute('class', merged);
//     if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
//     if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
//   });
// }

// export function sanitizeQuillHtml(html: string): string {
//   const raw = (html || '').trim();
//   if (!raw) return '';

//   if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
//     return raw;
//   }

//   const doc = new DOMParser().parseFromString(`<div id="quill-root">${raw}</div>`, 'text/html');
//   const root = doc.getElementById('quill-root');
//   if (!root) return raw;

//   root.querySelectorAll('.ql-align-center').forEach((el) => el.classList.add('text-center'));
//   root.querySelectorAll('.ql-align-right').forEach((el) => el.classList.add('text-right'));
//   root.querySelectorAll('.ql-align-justify').forEach((el) => el.classList.add('text-justify'));

//   convertQuillLists(root, doc);
//   normalizeQuillImages(root);

//   root.querySelectorAll('pre').forEach((pre) => {
//     pre.setAttribute(
//       'class',
//       'bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm my-4'
//     );
//   });

//   root.querySelectorAll('blockquote').forEach((bq) => {
//     bq.setAttribute('class', 'border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-4');
//   });

//   root.querySelectorAll('a').forEach((a) => {
//     a.setAttribute('target', '_blank');
//     a.setAttribute('rel', 'noopener noreferrer');
//     const existing = a.getAttribute('class') || '';
//     a.setAttribute('class', `${existing} text-indigo-400 underline underline-offset-2`.trim());
//   });

//   root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
//   root.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
//   root.querySelectorAll('[data-list]').forEach((el) => el.removeAttribute('data-list'));
//   root.querySelectorAll('[class]').forEach((el) => {
//     const cleaned = (el.getAttribute('class') || '')
//       .split(/\s+/)
//       .filter((cls) => cls && !cls.startsWith('ql-'))
//       .join(' ');
//     if (cleaned) el.setAttribute('class', cleaned);
//     else el.removeAttribute('class');
//   });

//   return root.innerHTML;
// }

// function escapeHtml(input: string): string {
//   return input
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');
// }

// function buildHeadingHtml(section: ContentSectionItem, extraClass = ''): string {
//   const heading = section.heading || section.title || '';
//   if (!heading) return '';
//   return `<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight${
//     extraClass ? ` ${extraClass}` : ''
//   }">${escapeHtml(heading)}</h2>`;
// }

// function buildBodyHtml(section: ContentSectionItem): string {
//   const body = sanitizeQuillHtml(section.contentHtml || '');
//   return `<div class="prose prose-invert max-w-none leading-relaxed">${body}</div>`;
// }

// function buildImageHtml(section: ContentSectionItem): string {
//   const src = section.imageUrl?.trim();
//   if (!src) return '';

//   const alt = escapeHtml(section.imageAlt || section.heading || section.title || 'Section image');
//   const img = `<img src="${escapeHtml(src)}" alt="${alt}" class="w-full h-64 sm:h-72 object-cover" loading="lazy" />`;
//   const linked = section.imageLinkUrl
//     ? `<a href="${escapeHtml(section.imageLinkUrl)}" target="_blank" rel="noopener noreferrer">${img}</a>`
//     : img;
//   const caption = section.imageAlt
//     ? `<p class="p-2 text-xs text-center text-slate-400 italic bg-slate-900 border-t border-slate-800">${escapeHtml(
//         section.imageAlt
//       )}</p>`
//     : '';

//   return `<div class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900">${linked}${caption}</div>`;
// }

// export function renderContentSectionHtml(section: ContentSectionItem): string {
//   const layout = section.layoutStyle || 'standard-block';
//   const hasImage = Boolean(section.imageUrl?.trim());

//   if (layout === 'simple-quill') {
//     return `<article className="max-w-4xl mx-auto px-4 py-8">${buildBodyHtml(section)}</article>`;
//   }

//   if (layout === 'bordered-callout') {
//     return `<article className="max-w-4xl mx-auto px-4 py-8">${buildHeadingHtml(
//       section
//     )}${buildBodyHtml(section)}</article>`;
//   }

//   if (layout === 'card-grid') {
//     return `<article className="max-w-4xl mx-auto px-4 py-8">${buildHeadingHtml(
//       section,
//       'text-white'
//     )}${buildBodyHtml(section)}</article>`;
//   }

//   const showTwoCol = hasImage || layout === 'split-image';
//   const bodyCol = showTwoCol
//     ? `<div className="lg:col-span-7">${buildBodyHtml(section)}</div>`
//     : `<div className="w-full">${buildBodyHtml(section)}</div>`;
//   const imageCol = hasImage ? `<div className="lg:col-span-5">${buildImageHtml(section)}</div>` : '';

//   return `<article className="max-w-4xl mx-auto px-4 py-8">${buildHeadingHtml(
//     section,
//     'border-b border-slate-800 pb-3'
//   )}<div className="grid grid-cols-1 ${
//     showTwoCol ? 'lg:grid-cols-12' : ''
//   } gap-8 items-start mt-5">${bodyCol}${imageCol}</div></article>`;
// }

// export function renderContentSectionsHtml(sections: ContentSectionItem[]): string {
//   if (!sections.length) return '';
//   const inner = sections.map((s) => renderContentSectionHtml(s)).join('');
//   return `<section className="space-y-6">${inner}</section>`;
// }

// function QuillEditorColorFix() {
//   return (
//     <style jsx global>{`
//       .quill-editor-scope .ql-editor {
//         color: #1e293b;
//         font-size: 0.925rem;
//         line-height: 1.6;
//       }
//       .quill-editor-scope .ql-editor.ql-blank::before {
//         color: #94a3b8;
//         font-style: normal;
//       }
//       .quill-editor-scope .ql-editor a {
//         color: #4f46e5;
//         text-decoration: underline;
//       }
//       .quill-editor-scope .ql-editor h1,
//       .quill-editor-scope .ql-editor h2,
//       .quill-editor-scope .ql-editor h3 {
//         color: #0f172a;
//       }
//       .quill-editor-scope .ql-editor blockquote {
//         color: #475569;
//       }
//       .quill-editor-scope .ql-editor pre.ql-syntax {
//         background: #0f172a;
//         color: #e2e8f0;
//         border-radius: 0.5rem;
//       }
//     `}</style>
//   );
// }

// export function ContentViews({
//   sections,
//   sec,
//   onChange,
//   isThumbnail = false,
// }: ContentViewsProps) {
//   const activeSections = sec ? [sec] : sections || [];

//   if (!activeSections.length) return null;

//   const isEditable = Boolean(onChange) && !isThumbnail;

//   return (
//     <div className="w-full space-y-6">
//       {isEditable && <QuillEditorColorFix />}
//       {activeSections.map((section, idx) => {
//         const key = section.id || `content-view-${idx}`;
//         const hasImage = Boolean(section.imageUrl?.trim());
//         const layout = section.layoutStyle || 'standard-block';

//         const paddingClass =
//           section.paddingSize === 'sm'
//             ? 'py-6 px-4 sm:px-8'
//             : section.paddingSize === 'lg'
//             ? 'py-16 px-4 sm:px-8'
//             : 'py-10 px-4 sm:px-8';

//         const themeClass =
//           section.bgTheme === 'indigo'
//             ? 'bg-indigo-950 text-white'
//             : section.bgTheme === 'light'
//             ? 'bg-slate-100 text-slate-900'
//             : 'bg-slate-950 text-white';

//         const headingThemeClass =
//           section.bgTheme === 'light' ? 'text-slate-900' : 'text-white';

//         const renderHeading = (extraClasses = '') => {
//           const displayHeading = section.heading || section.title || '';
//           if (isEditable && onChange) {
//             return (
//               <input
//                 type="text"
//                 value={displayHeading}
//                 onChange={(e) =>
//                   onChange({ heading: e.target.value, title: e.target.value })
//                 }
//                 placeholder="Enter section heading..."
//                 className={`w-full text-2xl sm:text-3xl font-extrabold bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none transition ${headingThemeClass} ${extraClasses}`}
//               />
//             );
//           }
//           return (
//             <h2
//               className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${headingThemeClass} ${extraClasses}`}
//             >
//               {displayHeading}
//             </h2>
//           );
//         };

//         const renderBodyContent = () => {
//           if (isEditable && onChange) {
//             return (
//               <div
//                 data-editor-only="true"
//                 className="quill-editor-scope bg-white rounded-lg overflow-hidden border border-slate-300"
//               >
//                 <ReactQuill
//                   theme="snow"
//                   value={section.contentHtml || ''}
//                   onChange={(html: string) => onChange({ contentHtml: html })}
//                   modules={editorModules}
//                   placeholder="Write your structured section content here..."
//                 />
//               </div>
//             );
//           }
//           return (
//             <div
//               className={`prose ${
//                 section.bgTheme === 'light' ? 'prose-slate' : 'prose-invert'
//               } max-w-none leading-relaxed`}
//               dangerouslySetInnerHTML={{ __html: sanitizeQuillHtml(section.contentHtml || '') }}
//             />
//           );
//         };

//         const renderImage = () => {
//           if (isEditable && onChange) {
//             return (
//               <EditableBlogImage
//                 src={section.imageUrl || ''}
//                 alt={section.imageAlt || section.heading || 'Blog image'}
//                 imageLinkUrl={section.imageLinkUrl}
//                 onUpdate={(patch: {
//                   imageUrl?: string;
//                   imageAlt?: string;
//                   imageLinkUrl?: string;
//                 }) => onChange(patch)}
//               />
//             );
//           }

//           if (!hasImage) return null;

//           return (
//             <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
//               <div className="relative w-full h-64 sm:h-72">
//                 <Image
//                   src={section.imageUrl!}
//                   alt={
//                     section.imageAlt ||
//                     section.heading ||
//                     section.title ||
//                     'Section image'
//                   }
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   sizes="(max-width: 768px) 100vw, 40vw"
//                 />
//               </div>
//               {section.imageAlt && (
//                 <p className="p-2 text-xs text-center text-slate-400 italic bg-slate-900 border-t border-slate-800">
//                   {section.imageAlt}
//                 </p>
//               )}
//             </div>
//           );
//         };

//         return (
//           <div key={key} className={`w-full ${themeClass} ${paddingClass}`}>
//             <div className="max-w-4xl mx-auto space-y-6">
//               {layout === 'simple-quill' && (
//                 <article className="w-full">{renderBodyContent()}</article>
//               )}

//               {layout === 'bordered-callout' && (
//                 <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border-l-4 border-indigo-500 border-y border-r border-slate-800 shadow-sm space-y-6">
//                   {renderHeading()}
//                   {renderBodyContent()}
//                 </article>
//               )}

//               {layout === 'card-grid' && (
//                 <article className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
//                   {renderHeading('text-white')}
//                   {renderBodyContent()}
//                 </article>
//               )}

//               {(layout === 'standard-block' || layout === 'split-image') && (
//                 <article className="space-y-6">
//                   {renderHeading('border-b border-slate-800/50 pb-3')}

//                   <div
//                     className={`grid grid-cols-1 ${
//                       hasImage || isEditable || layout === 'split-image'
//                         ? 'lg:grid-cols-12'
//                         : ''
//                     } gap-8 items-start`}
//                   >
//                     <div
//                       className={
//                         hasImage || isEditable || layout === 'split-image'
//                           ? 'lg:col-span-7'
//                           : 'w-full'
//                       }
//                     >
//                       {renderBodyContent()}
//                     </div>

//                     {(hasImage || isEditable) && (
//                       <div className="lg:col-span-5">{renderImage()}</div>
//                     )}
//                   </div>
//                 </article>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export function ContentLayoutThumbnail({
//   layoutStyle = 'standard-block',
// }: {
//   layoutStyle?: ContentLayoutStyle;
// }) {
//   const sampleSection = makeBlankContent(layoutStyle);

//   return (
//     <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
//       <div
//         className="absolute top-0 left-0 pointer-events-none select-none"
//         style={{
//           width: '1280px',
//           transform: 'scale(0.235)',
//           transformOrigin: 'top left',
//         }}
//       >
//         <ContentViews sec={sampleSection} isThumbnail={true} />
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { ContentLayoutStyle, PageSectionItem } from '../types';
// import { EditableBlogImage } from '../editor/EditableBlogImage';
// import 'react-quill-new/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-40 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
//       Loading Rich Text Editor...
//     </div>
//   ),
// });

// const editorModules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['link', 'image', 'code-block'],
//     ['clean'],
//   ],
// };

// export interface ContentSectionItem extends PageSectionItem {
//   type: 'content';
//   layoutStyle?: ContentLayoutStyle;
// }

// export interface ContentViewsProps {
//   sections?: ContentSectionItem[];
//   sec?: ContentSectionItem;
//   onChange?: (patch: Partial<ContentSectionItem>) => void;
//   isThumbnail?: boolean;
// }

// export const CONTENT_VARIANTS: {
//   value: ContentLayoutStyle;
//   label: string;
//   description: string;
// }[] = [
//   {
//     value: 'standard-block',
//     label: 'Standard Body Block',
//     description: 'Full-width rich text section with clean document flow.',
//   },
//   {
//     value: 'split-image',
//     label: 'Split Media & Text',
//     description: 'Two-column layout balancing rich body copy with an image container.',
//   },
//   {
//     value: 'card-grid',
//     label: 'Card Enclosed Block',
//     description: 'Enclosed card styling suited for highlighted or featured content.',
//   },
//   {
//     value: 'bordered-callout',
//     label: 'Bordered Accent Block',
//     description: 'Left border accent highlight line for key body takeaways.',
//   },
//   {
//     value: 'simple-quill',
//     label: 'Simple Text Block',
//     description: 'Minimalistic section rendering only rich text content.',
//   },
// ];

// export function makeBlankContent(
//   layoutStyle: ContentLayoutStyle = 'standard-block'
// ): ContentSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'content',
//     title: 'Engineering Best Practices',
//     subtitle: 'Building scalable frontend and backend solutions.',
//     heading: 'Engineering Best Practices',
//     contentHtml:
//       '<p>Building scalable frontend and backend solutions requires modularity, strict typing, and comprehensive test coverage.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
//     imageAlt: 'React architecture diagram',
//     layoutStyle,
//   };
// }

// /* ============================================================================
//  * QUILL → PORTABLE HTML NORMALIZER
//  *
//  * react-quill-new (Quill 2.x) emits real semantic <ol>/<ul> for lists —
//  * numbered lists are genuine <ol>, bullets are genuine <ul>, correctly
//  * nested. Older Quill (1.x) instead flattened everything into ONE <ol> per
//  * list block, with every <li> tagged data-list="bullet" | "ordered" plus a
//  * ql-indent-N class for depth, and relied on quill.snow.css's ::before
//  * pseudo-elements to actually draw the marker/indent.
//  *
//  * We support both:
//  *  - If any li[data-list] exists anywhere in the content -> legacy flat
//  *    format -> rebuild real nested <ul>/<ol> from the flat list.
//  *  - Otherwise -> already-semantic Quill 2 output -> just re-style the
//  *    existing <ol>/<ul> in place (critically: do NOT guess the type from a
//  *    missing attribute, or numbered lists get misread as bullets).
//  *
//  * Either way the result is plain Tailwind-styled <ul>/<ol> with zero
//  * dependency on quill.snow.css, so saved sections render correctly anywhere.
//  * ========================================================================== */

// type ListStackEntry = {
//   level: number;
//   type: 'bullet' | 'ordered';
//   el: HTMLElement;
// };

// function listClasses(type: 'bullet' | 'ordered'): string {
//   return type === 'ordered'
//     ? 'list-decimal list-outside pl-6 space-y-1 my-3'
//     : 'list-disc list-outside pl-6 space-y-1 my-3';
// }

// function convertQuillLists(root: HTMLElement, doc: Document) {
//   const hasLegacyMarkers = Boolean(root.querySelector('li[data-list]'));

//   if (!hasLegacyMarkers) {
//     // Quill 2 semantic output: <ol> is already a real numbered list, <ul> is
//     // already a real bullet list, and nesting (if any) is real DOM nesting.
//     // Just re-style — no restructuring, so numbers stay numbers.
//     root.querySelectorAll('ol, ul').forEach((list) => {
//       const isOrdered = list.tagName === 'OL';
//       list.setAttribute('class', listClasses(isOrdered ? 'ordered' : 'bullet'));
//     });
//     root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
//     root.querySelectorAll('li[class]').forEach((li) => li.removeAttribute('class'));
//     return;
//   }

//   // Legacy Quill 1.x flat format: every list item, bullet or ordered, at any
//   // indent level, is a sibling <li data-list="..."> inside one wrapper list.
//   // Rebuild real nested <ul>/<ol> from it.
//   const legacyLists = Array.from(root.querySelectorAll('ol, ul'));

//   legacyLists.forEach((oldList) => {
//     const items = Array.from(oldList.children).filter(
//       (el): el is HTMLLIElement => el.tagName === 'LI'
//     );
//     if (!items.length) return;

//     const wrapper = doc.createElement('div');
//     const stack: ListStackEntry[] = [];

//     items.forEach((li) => {
//       const explicitType = li.getAttribute('data-list');
//       const type: 'bullet' | 'ordered' = explicitType === 'ordered' ? 'ordered' : 'bullet';
//       const indentMatch = (li.getAttribute('class') || '').match(/ql-indent-(\d+)/);
//       const level = indentMatch ? parseInt(indentMatch[1], 10) : 0;

//       const uiSpan = li.querySelector('.ql-ui');
//       if (uiSpan) uiSpan.remove();
//       li.removeAttribute('data-list');
//       li.removeAttribute('class');

//       while (stack.length && stack[stack.length - 1].level > level) stack.pop();

//       let top = stack[stack.length - 1];
//       const needsNewList =
//         !top || top.level < level || (top.level === level && top.type !== type);

//       if (needsNewList) {
//         if (top && top.level === level) stack.pop();
//         const parent = stack[stack.length - 1];

//         const newList = doc.createElement(type === 'ordered' ? 'ol' : 'ul');
//         newList.setAttribute('class', listClasses(type));

//         if (parent) {
//           const lastLi = parent.el.lastElementChild;
//           (lastLi || parent.el).appendChild(newList);
//         } else {
//           wrapper.appendChild(newList);
//         }

//         stack.push({ level, type, el: newList });
//         top = stack[stack.length - 1];
//       }

//       top.el.appendChild(li);
//     });

//     oldList.replaceWith(...Array.from(wrapper.childNodes));
//   });
// }

// function normalizeQuillImages(root: HTMLElement) {
//   root.querySelectorAll('img').forEach((img) => {
//     img.removeAttribute('style'); // drop any resize-module inline width/height
//     const existing = img.getAttribute('class') || '';
//     const merged = `${existing} rounded-lg max-w-full h-auto my-4 block`
//       .split(/\s+/)
//       .filter(Boolean)
//       .filter((cls, idx, arr) => arr.indexOf(cls) === idx)
//       .join(' ');
//     img.setAttribute('class', merged);
//     if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
//     if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
//   });
// }

// /**
//  * Normalizes raw Quill-generated HTML into plain, self-contained HTML that
//  * renders correctly with no Quill CSS present — real bullet/number lists,
//  * constrained images, styled code blocks/quotes/links.
//  *
//  * Runs client-side only (DOMParser). On the server it returns the raw HTML
//  * unchanged as a safe fallback (this builder canvas is a client-only tool,
//  * so this only affects a first-paint before hydration, not the saved page).
//  */
// export function sanitizeQuillHtml(html: string): string {
//   const raw = (html || '').trim();
//   if (!raw) return '';

//   if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
//     return raw;
//   }

//   const doc = new DOMParser().parseFromString(`<div id="quill-root">${raw}</div>`, 'text/html');
//   const root = doc.getElementById('quill-root');
//   if (!root) return raw;

//   // Text alignment set via the Quill align picker.
//   root.querySelectorAll('.ql-align-center').forEach((el) => el.classList.add('text-center'));
//   root.querySelectorAll('.ql-align-right').forEach((el) => el.classList.add('text-right'));
//   root.querySelectorAll('.ql-align-justify').forEach((el) => el.classList.add('text-justify'));

//   convertQuillLists(root, doc);
//   normalizeQuillImages(root);

//   root.querySelectorAll('pre').forEach((pre) => {
//     pre.setAttribute(
//       'class',
//       'bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm my-4'
//     );
//   });

//   root.querySelectorAll('blockquote').forEach((bq) => {
//     bq.setAttribute('class', 'border-l-4 border-indigo-300 pl-4 italic text-slate-600 my-4');
//   });

//   root.querySelectorAll('a').forEach((a) => {
//     a.setAttribute('target', '_blank');
//     a.setAttribute('rel', 'noopener noreferrer');
//     const existing = a.getAttribute('class') || '';
//     a.setAttribute('class', `${existing} text-indigo-600 underline underline-offset-2`.trim());
//   });

//   // Final cleanup: remove any leftover editor-only artifacts.
//   root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
//   root.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
//   root.querySelectorAll('[data-list]').forEach((el) => el.removeAttribute('data-list'));
//   root.querySelectorAll('[class]').forEach((el) => {
//     const cleaned = (el.getAttribute('class') || '')
//       .split(/\s+/)
//       .filter((cls) => cls && !cls.startsWith('ql-'))
//       .join(' ');
//     if (cleaned) el.setAttribute('class', cleaned);
//     else el.removeAttribute('class');
//   });

//   return root.innerHTML;
// }

// function escapeHtml(input: string): string {
//   return input
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');
// }

// function buildHeadingHtml(section: ContentSectionItem, extraClass = ''): string {
//   const heading = section.heading || section.title || '';
//   if (!heading) return '';
//   return `<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight${
//     extraClass ? ` ${extraClass}` : ''
//   }">${escapeHtml(heading)}</h2>`;
// }

// function buildBodyHtml(section: ContentSectionItem): string {
//   const body = sanitizeQuillHtml(section.contentHtml || '');
//   return `<div class="prose prose-slate max-w-none text-slate-700 leading-relaxed">${body}</div>`;
// }

// function buildImageHtml(section: ContentSectionItem): string {
//   const src = section.imageUrl?.trim();
//   if (!src) return '';

//   const alt = escapeHtml(section.imageAlt || section.heading || section.title || 'Section image');
//   const img = `<img src="${escapeHtml(src)}" alt="${alt}" class="w-full h-64 sm:h-72 object-cover" loading="lazy" />`;
//   const linked = section.imageLinkUrl
//     ? `<a href="${escapeHtml(section.imageLinkUrl)}" target="_blank" rel="noopener noreferrer">${img}</a>`
//     : img;
//   const caption = section.imageAlt
//     ? `<p class="p-2 text-xs text-center text-slate-500 italic bg-white border-t border-slate-100">${escapeHtml(
//         section.imageAlt
//       )}</p>`
//     : '';

//   return `<div class="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">${linked}${caption}</div>`;
// }

// /**
//  * Pure, DOM-free HTML generator for a single content section.
//  * This is the ONLY correct way to export a 'content' section.
//  */
// export function renderContentSectionHtml(section: ContentSectionItem): string {
//   const layout = section.layoutStyle || 'standard-block';
//   const hasImage = Boolean(section.imageUrl?.trim());

//   if (layout === 'simple-quill') {
//     return `<article class="p-6 sm:p-8">${buildBodyHtml(section)}</article>`;
//   }

//   if (layout === 'bordered-callout') {
//     return `<article class="p-6 sm:p-8">${buildHeadingHtml(
//       section
//     )}${buildBodyHtml(section)}</article>`;
//   }

//   if (layout === 'card-grid') {
//     return `<article class="p-8">${buildHeadingHtml(
//       section,
//       'text-white'
//     )}${buildBodyHtml(section)}</article>`;
//   }

//   // standard-block / split-image
//   const showTwoCol = hasImage || layout === 'split-image';
//   const bodyCol = showTwoCol
//     ? `<div class="lg:col-span-7">${buildBodyHtml(section)}</div>`
//     : `<div class="w-full">${buildBodyHtml(section)}</div>`;
//   const imageCol = hasImage ? `<div class="lg:col-span-5">${buildImageHtml(section)}</div>` : '';

//   return `<article class="p-6 sm:p-8">${buildHeadingHtml(
//     section,
//     'border-b border-slate-100 pb-3'
//   )}<div class="grid grid-cols-1 ${
//     showTwoCol ? 'lg:grid-cols-12' : ''
//   } gap-8 items-start mt-5">${bodyCol}${imageCol}</div></article>`;
// }

// /**
//  * Convenience batch version for an array of content sections wrapped in the
//  * same outer <section> your read-only ContentViews renders.
//  */
// export function renderContentSectionsHtml(sections: ContentSectionItem[]): string {
//   if (!sections.length) return '';
//   const inner = sections.map((s) => renderContentSectionHtml(s)).join('');
//   return `<section class="space-y-12 mx-auto px-4">${inner}</section>`;
// }

// /**
//  * Global (but scoped-by-classname) style override for the live Quill editor.
//  *
//  * Why this is needed: .ql-editor itself sets no text color, so while editing
//  * it inherits whatever color cascades down from the surrounding page-builder
//  * chrome (which uses light text for its own dark theme). That light color
//  * landing on the editor's white background is what made typed text look
//  * washed out — the read-only preview never had this problem because that
//  * branch explicitly sets text-slate-700 itself.
//  *
//  * This is rendered once per ContentViews mount and scoped under
//  * `.quill-editor-scope` so it can't leak into or be affected by anything
//  * else on the page.
//  */
// function QuillEditorColorFix() {
//   return (
//     <style jsx global>{`
//       .quill-editor-scope .ql-editor {
//         color: #1e293b; /* slate-800 — always readable on the white editor bg */
//         font-size: 0.925rem;
//         line-height: 1.6;
//       }
//       .quill-editor-scope .ql-editor.ql-blank::before {
//         color: #94a3b8; /* slate-400 placeholder, not italic-gray-on-gray */
//         font-style: normal;
//       }
//       .quill-editor-scope .ql-editor a {
//         color: #4f46e5; /* indigo-600, matches saved-output link color */
//         text-decoration: underline;
//       }
//       .quill-editor-scope .ql-editor h1,
//       .quill-editor-scope .ql-editor h2,
//       .quill-editor-scope .ql-editor h3 {
//         color: #0f172a; /* slate-900 */
//       }
//       .quill-editor-scope .ql-editor blockquote {
//         color: #475569; /* slate-600 */
//       }
//       .quill-editor-scope .ql-editor pre.ql-syntax {
//         background: #0f172a;
//         color: #e2e8f0;
//         border-radius: 0.5rem;
//       }
//     `}</style>
//   );
// }

// export function ContentViews({
//   sections,
//   sec,
//   onChange,
//   isThumbnail = false,
// }: ContentViewsProps) {
//   const activeSections = sections || (sec ? [sec] : []);

//   if (!activeSections.length) return null;

//   const isEditable = Boolean(onChange) && !isThumbnail;

//   return (
//     <section className="mx-auto px-4">
//       {isEditable && <QuillEditorColorFix />}
//       {activeSections.map((section, idx) => {
//         const key = section.id || `content-view-${idx}`;
//         const hasImage = Boolean(section.imageUrl?.trim());
//         const layout = section.layoutStyle || 'standard-block';

//         const renderHeading = (extraClasses = '') => {
//           const displayHeading = section.heading || section.title || '';
//           if (isEditable && onChange) {
//             return (
//               <input
//                 type="text"
//                 value={displayHeading}
//                 onChange={(e) =>
//                   onChange({ heading: e.target.value, title: e.target.value })
//                 }
//                 placeholder="Enter section heading..."
//                 className={`w-full text-2xl sm:text-3xl font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition ${extraClasses}`}
//               />
//             );
//           }
//           return (
//             <h2
//               className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${extraClasses}`}
//             >
//               {displayHeading}
//             </h2>
//           );
//         };

//         const renderBodyContent = () => {
//           if (isEditable && onChange) {
//             return (
//               // Marked data-editor-only for consistency/safety, but the real
//               // fix is that page.tsx never scrapes this node's DOM at all
//               // for 'content' sections — see renderContentSectionHtml above.
//               // "quill-editor-scope" ties this instance to the color-fix
//               // style block above regardless of surrounding theme.
//               <div
//                 data-editor-only="true"
//                 className="quill-editor-scope bg-white rounded-lg overflow-hidden border border-slate-300"
//               >
//                 <ReactQuill
//                   theme="snow"
//                   value={section.contentHtml || ''}
//                   onChange={(html: string) => onChange({ contentHtml: html })}
//                   modules={editorModules}
//                   placeholder="Write your structured section content here..."
//                 />
//               </div>
//             );
//           }
//           // Normalize so bullet/number lists and inline images render
//           // correctly here too — matches exactly what gets saved.
//           return (
//             <div
//               className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: sanitizeQuillHtml(section.contentHtml || '') }}
//             />
//           );
//         };

//         const renderImage = () => {
//           if (isEditable && onChange) {
//             return (
//               <EditableBlogImage
//                 src={section.imageUrl || ''}
//                 alt={section.imageAlt || section.heading || 'Blog image'}
//                 imageLinkUrl={section.imageLinkUrl}
//                 onUpdate={(patch: {
//                   imageUrl?: string;
//                   imageAlt?: string;
//                   imageLinkUrl?: string;
//                 }) => onChange(patch)}
//               />
//             );
//           }

//           if (!hasImage) return null;

//           return (
//             <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//               <div className="relative w-full h-64 sm:h-72">
//                 <Image
//                   src={section.imageUrl!}
//                   alt={
//                     section.imageAlt ||
//                     section.heading ||
//                     section.title ||
//                     'Section image'
//                   }
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   sizes="(max-width: 768px) 100vw, 40vw"
//                 />
//               </div>
//               {section.imageAlt && (
//                 <p className="p-2 text-xs text-center text-slate-500 italic bg-white border-t border-slate-100">
//                   {section.imageAlt}
//                 </p>
//               )}
//             </div>
//           );
//         };

//         if (layout === 'simple-quill') {
//           return (
//             <article key={key} className="w-full p-6">
//               {renderBodyContent()}
//             </article>
//           );
//         }

//         if (layout === 'bordered-callout') {
//           return (
//             <article
//               key={key}
//               className="p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-indigo-500 border-y border-r border-slate-200 shadow-sm space-y-6"
//             >
//               {renderHeading()}
//               {renderBodyContent()}
//             </article>
//           );
//         }

//         if (layout === 'card-grid') {
//           return (
//             <article
//               key={key}
//               className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6"
//             >
//               {renderHeading('text-white')}
//               {renderBodyContent()}
//             </article>
//           );
//         }

//         return (
//           <article
//             key={key}
//             className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm transition hover:shadow-md space-y-6"
//           >
//             {renderHeading('border-b border-slate-100 pb-3')}

//             <div
//               className={`grid grid-cols-1 ${
//                 hasImage || isEditable || layout === 'split-image'
//                   ? 'lg:grid-cols-12'
//                   : ''
//               } gap-8 items-start`}
//             >
//               <div
//                 className={
//                   hasImage || isEditable || layout === 'split-image'
//                     ? 'lg:col-span-7'
//                     : 'w-full'
//                 }
//               >
//                 {renderBodyContent()}
//               </div>

//               {(hasImage || isEditable) && (
//                 <div className="lg:col-span-5">{renderImage()}</div>
//               )}
//             </div>
//           </article>
//         );
//       })}
//     </section>
//   );
// }

// export function ContentLayoutThumbnail({
//   layoutStyle = 'standard-block',
// }: {
//   layoutStyle?: ContentLayoutStyle;
// }) {
//   const sampleSection = makeBlankContent(layoutStyle);

//   return (
//     <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
//       <div
//         className="absolute top-0 left-0 pointer-events-none select-none"
//         style={{
//           width: '1280px',
//           transform: 'scale(0.235)',
//           transformOrigin: 'top left',
//         }}
//       >
//         <ContentViews sections={[sampleSection]} isThumbnail={true} />
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { ContentLayoutStyle, PageSectionItem } from '../types';
// import { EditableBlogImage } from '../editor/EditableBlogImage';
// import 'react-quill-new/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill-new'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-40 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
//       Loading Rich Text Editor...
//     </div>
//   ),
// });

// const editorModules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['link', 'image', 'code-block'],
//     ['clean'],
//   ],
// };


// export interface ContentSectionItem extends PageSectionItem {
//   type: 'content';
//   layoutStyle?: ContentLayoutStyle;
// }

// export interface ContentViewsProps {
//   sections?: ContentSectionItem[];
//   sec?: ContentSectionItem;
//   onChange?: (patch: Partial<ContentSectionItem>) => void;
//   isThumbnail?: boolean;
// }

// export const CONTENT_VARIANTS: {
//   value: ContentLayoutStyle;
//   label: string;
//   description: string;
// }[] = [
//   {
//     value: 'standard-block',
//     label: 'Standard Body Block',
//     description: 'Full-width rich text section with clean document flow.',
//   },
//   {
//     value: 'split-image',
//     label: 'Split Media & Text',
//     description: 'Two-column layout balancing rich body copy with an image container.',
//   },
//   {
//     value: 'card-grid',
//     label: 'Card Enclosed Block',
//     description: 'Enclosed card styling suited for highlighted or featured content.',
//   },
//   {
//     value: 'bordered-callout',
//     label: 'Bordered Accent Block',
//     description: 'Left border accent highlight line for key body takeaways.',
//   },
//   {
//     value: 'simple-quill',
//     label: 'Simple Text Block',
//     description: 'Minimalistic section rendering only rich text content.',
//   },
// ];

// export function makeBlankContent(
//   layoutStyle: ContentLayoutStyle = 'standard-block'
// ): ContentSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'content',
//     title: 'Engineering Best Practices',
//     subtitle: 'Building scalable frontend and backend solutions.',
//     heading: 'Engineering Best Practices',
//     contentHtml:
//       '<p>Building scalable frontend and backend solutions requires modularity, strict typing, and comprehensive test coverage.</p>',
//     imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
//     imageAlt: 'React architecture diagram',
//     layoutStyle,
//   };
// }

// /* ============================================================================
//  * PRIMARY EXPORT PATH — build public HTML straight from state.
//  *
//  * page.tsx's buildStoredSections() must call this for every section with
//  * type === 'content' INSTEAD OF scraping that section's live DOM. Content
//  * sections are the one place in this builder where the real saved text
//  * lives inside an alternate editor DOM (Quill's toolbar/container/tooltip),
//  * not directly on the final markup like the other contentEditable-based
//  * primitives. A generic "strip data-editor-only" DOM walker cannot safely
//  * handle that: marking the whole Quill mount editor-only would also delete
//  * the actual paragraph text, and NOT marking it lets toolbar/tooltip chrome
//  * leak into the saved HTML. Skipping the DOM entirely sidesteps both.
//  * ========================================================================== */

// function escapeHtml(input: string): string {
//   return input
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');
// }

// function buildHeadingHtml(section: ContentSectionItem, extraClass = ''): string {
//   const heading = section.heading || section.title || '';
//   if (!heading) return '';
//   return `<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight${
//     extraClass ? ` ${extraClass}` : ''
//   }">${escapeHtml(heading)}</h2>`;
// }

// function buildBodyHtml(section: ContentSectionItem): string {
//   const body = section.contentHtml?.trim() || '';
//   return `<div class="prose prose-slate max-w-none text-slate-700 leading-relaxed [&_a]:text-indigo-600 [&_a]:underline">${body}</div>`;
// }

// function buildImageHtml(section: ContentSectionItem): string {
//   const src = section.imageUrl?.trim();
//   if (!src) return '';

//   const alt = escapeHtml(section.imageAlt || section.heading || section.title || 'Section image');
//   const img = `<img src="${escapeHtml(src)}" alt="${alt}" class="w-full h-64 sm:h-72 object-cover" loading="lazy" />`;
//   const linked = section.imageLinkUrl
//     ? `<a href="${escapeHtml(section.imageLinkUrl)}" target="_blank" rel="noopener noreferrer">${img}</a>`
//     : img;
//   const caption = section.imageAlt
//     ? `<p class="p-2 text-xs text-center text-slate-500 italic bg-white border-t border-slate-100">${escapeHtml(
//         section.imageAlt
//       )}</p>`
//     : '';

//   return `<div class="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">${linked}${caption}</div>`;
// }

// /**
//  * Pure, DOM-free HTML generator for a single content section.
//  * This is the ONLY correct way to export a 'content' section — see note above.
//  */
// export function renderContentSectionHtml(section: ContentSectionItem): string {
//   const layout = section.layoutStyle || 'standard-block';
//   const hasImage = Boolean(section.imageUrl?.trim());

//   if (layout === 'simple-quill') {
//     return `<article class="w-full">${buildBodyHtml(section)}</article>`;
//   }

//   if (layout === 'bordered-callout') {
//     return `<article class="p-6 sm:p-8">${buildHeadingHtml(
//       section
//     )}${buildBodyHtml(section)}</article>`;
//   }

//   if (layout === 'card-grid') {
//     return `<article class="p-8">${buildHeadingHtml(
//       section,
//       'text-white'
//     )}${buildBodyHtml(section)}</article>`;
//   }

//   // standard-block / split-image
//   const showTwoCol = hasImage || layout === 'split-image';
//   const bodyCol = showTwoCol
//     ? `<div class="lg:col-span-7">${buildBodyHtml(section)}</div>`
//     : `<div class="w-full">${buildBodyHtml(section)}</div>`;
//   const imageCol = hasImage ? `<div class="lg:col-span-5">${buildImageHtml(section)}</div>` : '';

//   return `<article class="p-6 sm:p-8">${buildHeadingHtml(
//     section,
//     'border-b border-slate-100 pb-3'
//   )}<div class="grid grid-cols-1 ${
//     showTwoCol ? 'lg:grid-cols-12' : ''
//   } gap-8 items-start">${bodyCol}${imageCol}</div></article>`;
// }

// /**
//  * Convenience batch version for an array of content sections wrapped in the
//  * same outer <section> your read-only ContentViews renders.
//  */
// export function renderContentSectionsHtml(sections: ContentSectionItem[]): string {
//   if (!sections.length) return '';
//   const inner = sections.map((s) => renderContentSectionHtml(s)).join('');
//   return `<section class="space-y-12 mx-auto px-4">${inner}</section>`;
// }

// export function ContentViews({
//   sections,
//   sec,
//   onChange,
//   isThumbnail = false,
// }: ContentViewsProps) {
//   const activeSections = sections || (sec ? [sec] : []);

//   if (!activeSections.length) return null;

//   const isEditable = Boolean(onChange) && !isThumbnail;

//   return (
//     <section className="mx-auto px-4">
//       {activeSections.map((section, idx) => {
//         const key = section.id || `content-view-${idx}`;
//         const hasImage = Boolean(section.imageUrl?.trim());
//         const layout = section.layoutStyle || 'standard-block';

//         const renderHeading = (extraClasses = '') => {
//           const displayHeading = section.heading || section.title || '';
//           if (isEditable && onChange) {
//             return (
//               <input
//                 type="text"
//                 value={displayHeading}
//                 onChange={(e) =>
//                   onChange({ heading: e.target.value, title: e.target.value })
//                 }
//                 placeholder="Enter section heading..."
//                 className={`w-full text-2xl sm:text-3xl font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition ${extraClasses}`}
//               />
//             );
//           }
//           return (
//             <h2
//               className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${extraClasses}`}
//             >
//               {displayHeading}
//             </h2>
//           );
//         };

//         const renderBodyContent = () => {
//           if (isEditable && onChange) {
//             return (
//               // Marked data-editor-only for consistency/safety, but the real
//               // fix is that page.tsx never scrapes this node's DOM at all
//               // for 'content' sections — see renderContentSectionHtml above.
//               <div
//                 data-editor-only="true"
//                 className="bg-white rounded-lg overflow-hidden border border-slate-300"
//               >
//                 <ReactQuill
//                   theme="snow"
//                   value={section.contentHtml || ''}
//                   onChange={(html: string) => onChange({ contentHtml: html })}
//                   modules={editorModules}
//                   placeholder="Write your structured section content here..."
//                 />
//               </div>
//             );
//           }
//           return (
//             <div
//               className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&_a]:text-indigo-600 [&_a]:underline"
//               dangerouslySetInnerHTML={{ __html: section.contentHtml || '' }}
//             />
//           );
//         };

//         const renderImage = () => {
//           if (isEditable && onChange) {
//             return (
//               <EditableBlogImage
//                 src={section.imageUrl || ''}
//                 alt={section.imageAlt || section.heading || 'Blog image'}
//                 imageLinkUrl={section.imageLinkUrl}
//                 onUpdate={(patch: {
//                   imageUrl?: string;
//                   imageAlt?: string;
//                   imageLinkUrl?: string;
//                 }) => onChange(patch)}
//               />
//             );
//           }

//           if (!hasImage) return null;

//           return (
//             <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//               <div className="relative w-full h-64 sm:h-72">
//                 <Image
//                   src={section.imageUrl!}
//                   alt={
//                     section.imageAlt ||
//                     section.heading ||
//                     section.title ||
//                     'Section image'
//                   }
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   sizes="(max-width: 768px) 100vw, 40vw"
//                 />
//               </div>
//               {section.imageAlt && (
//                 <p className="p-2 text-xs text-center text-slate-500 italic bg-white border-t border-slate-100">
//                   {section.imageAlt}
//                 </p>
//               )}
//             </div>
//           );
//         };

//         if (layout === 'simple-quill') {
//           return (
//             <article key={key} className="w-full">
//               {renderBodyContent()}
//             </article>
//           );
//         }

//         if (layout === 'bordered-callout') {
//           return (
//             <article
//               key={key}
//               className="p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-indigo-500 border-y border-r border-slate-200 shadow-sm space-y-6"
//             >
//               {renderHeading()}
//               {renderBodyContent()}
//             </article>
//           );
//         }

//         if (layout === 'card-grid') {
//           return (
//             <article
//               key={key}
//               className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6"
//             >
//               {renderHeading('text-white')}
//               {renderBodyContent()}
//             </article>
//           );
//         }

//         return (
//           <article
//             key={key}
//             className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm transition hover:shadow-md space-y-6"
//           >
//             {renderHeading('border-b border-slate-100 pb-3')}

//             <div
//               className={`grid grid-cols-1 ${
//                 hasImage || isEditable || layout === 'split-image'
//                   ? 'lg:grid-cols-12'
//                   : ''
//               } gap-8 items-start`}
//             >
//               <div
//                 className={
//                   hasImage || isEditable || layout === 'split-image'
//                     ? 'lg:col-span-7'
//                     : 'w-full'
//                 }
//               >
//                 {renderBodyContent()}
//               </div>

//               {(hasImage || isEditable) && (
//                 <div className="lg:col-span-5">{renderImage()}</div>
//               )}
//             </div>
//           </article>
//         );
//       })}
//     </section>
//   );
// }

// export function ContentLayoutThumbnail({
//   layoutStyle = 'standard-block',
// }: {
//   layoutStyle?: ContentLayoutStyle;
// }) {
//   const sampleSection = makeBlankContent(layoutStyle);

//   return (
//     <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
//       <div
//         className="absolute top-0 left-0 pointer-events-none select-none"
//         style={{
//           width: '1280px',
//           transform: 'scale(0.235)',
//           transformOrigin: 'top left',
//         }}
//       >
//         <ContentViews sections={[sampleSection]} isThumbnail={true} />
//       </div>
//     </div>
//   );
// }