'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PageSectionItem } from '../types';
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

export type ContentLayoutStyle =
  | 'standard-block'
  | 'split-image'
  | 'card-grid'
  | 'bordered-callout';

export interface ContentSectionItem extends PageSectionItem {
  type: 'content';
  layoutStyle?: ContentLayoutStyle;
}

export interface ContentViewsProps {
  sections?: ContentSectionItem[];
  sec?: ContentSectionItem;
  onChange?: (patch: Partial<ContentSectionItem>) => void;
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
  };
}

/**
 * Sanitizes full exported DOM HTML by removing editor wrappers, toolbars, interactive controls, and inputs.
 * Call this function on your raw DOM export string before saving or rendering clean static HTML.
 */
export function cleanExportHtml(rawHtml: string): string {
  if (typeof window === 'undefined') return rawHtml;

  const container = document.createElement('div');
  container.innerHTML = rawHtml;

  // 1. Remove Quill toolbar controls, tooltips, hidden elements, and dropdowns
  container
    .querySelectorAll('.ql-toolbar, .ql-tooltip, select.ql-header, [aria-hidden="true"]')
    .forEach((el) => el.remove());

  // 2. Replace section heading text inputs with clean semantic <h2> elements
  container.querySelectorAll('input[type="text"]').forEach((inputEl) => {
    const input = inputEl as HTMLInputElement;
    if (input.closest('.ql-tooltip')) return; // Ignore internal Quill tooltip inputs

    const h2 = document.createElement('h2');
    h2.className = 'text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight';
    h2.textContent = input.value || input.placeholder || '';
    input.replaceWith(h2);
  });

  // 3. Unwrap Quill editor content (.ql-editor) and remove outer editor wrappers
  container.querySelectorAll('.ql-editor').forEach((editorEl) => {
    const wrapper =
      editorEl.closest('.bg-white.rounded-lg.overflow-hidden') ||
      editorEl.closest('.quill');
    if (wrapper) {
      const fragment = document.createDocumentFragment();
      while (editorEl.firstChild) {
        fragment.appendChild(editorEl.firstChild);
      }
      wrapper.replaceWith(fragment);
    }
  });

  // 4. Transform EditableBlogImage wrappers into clean static image elements
  container.querySelectorAll('.group\\/image, .relative.group').forEach((imgGroup) => {
    const img = imgGroup.querySelector('img');
    if (img) {
      img.removeAttribute('class');
      img.className = 'rounded-xl border border-slate-200 object-cover w-full h-auto';
      imgGroup.replaceWith(img);
    }
  });

  // 5. Clean up remaining editor-only attributes, metadata, and classes
  container.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
  container.querySelectorAll('[data-editor-only]').forEach((el) => el.remove());
  container.querySelectorAll('[data-placeholder]').forEach((el) => el.removeAttribute('data-placeholder'));
  container.querySelectorAll('.ql-blank, .ql-container, .ql-snow').forEach((el) => {
    el.classList.remove('ql-blank', 'ql-container', 'ql-snow');
  });

  return container.innerHTML;
}

export function ContentViews({ sections, sec, onChange }: ContentViewsProps) {
  const activeSections = sections || (sec ? [sec] : []);

  if (!activeSections.length) return null;

  return (
    <section className="space-y-12 my-8 max-w-4xl mx-auto px-4">
      {activeSections.map((section, idx) => {
        const key = section.id || `content-view-${idx}`;
        const hasImage = Boolean(section.imageUrl?.trim());
        const layout = section.layoutStyle || 'standard-block';

        // Render editable inline title or standard h2
        const renderHeading = (extraClasses = '') => {
          const displayHeading = section.heading || section.title || '';
          if (onChange) {
            return (
              <input
                type="text"
                value={displayHeading}
                onChange={(e) =>
                  onChange({ heading: e.target.value, title: e.target.value })
                }
                placeholder="Enter section heading..."
                className={`w-full text-2xl sm:text-3xl font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none transition ${extraClasses}`}
              />
            );
          }
          return (
            <h2
              className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${extraClasses}`}
            >
              {displayHeading}
            </h2>
          );
        };

        // Render ReactQuill editor when editing paragraph blocks
        const renderBodyContent = () => {
          if (onChange) {
            return (
              <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
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
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&_a]:text-indigo-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: section.contentHtml || '' }}
            />
          );
        };

        // Render EditableBlogImage when editing
        const renderImage = () => {
          if (onChange) {
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
            <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
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
                <p className="p-2 text-xs text-center text-slate-500 italic bg-white border-t border-slate-100">
                  {section.imageAlt}
                </p>
              )}
            </div>
          );
        };

        if (layout === 'bordered-callout') {
          return (
            <article
              key={key}
              className="p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-indigo-500 border-y border-r border-slate-200 shadow-sm space-y-6"
            >
              {renderHeading()}
              {renderBodyContent()}
            </article>
          );
        }

        if (layout === 'card-grid') {
          return (
            <article
              key={key}
              className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6"
            >
              {renderHeading('text-white')}
              {renderBodyContent()}
            </article>
          );
        }

        // Standard Block & Split Image rendering
        return (
          <article
            key={key}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm transition hover:shadow-md space-y-6"
          >
            {renderHeading('border-b border-slate-100 pb-3')}

            <div
              className={`grid grid-cols-1 ${
                hasImage || onChange || layout === 'split-image'
                  ? 'lg:grid-cols-12'
                  : ''
              } gap-8 items-start`}
            >
              <div
                className={
                  hasImage || onChange || layout === 'split-image'
                    ? 'lg:col-span-7'
                    : 'w-full'
                }
              >
                {renderBodyContent()}
              </div>

              {(hasImage || onChange) && (
                <div className="lg:col-span-5">{renderImage()}</div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

// Layout Thumbnail Helper Component
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
        <ContentViews sections={[sampleSection]} />
      </div>
    </div>
  );
}