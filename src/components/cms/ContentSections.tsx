'use client';

import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';
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

export default function ContentSections() {
  const { register, control } = useFormContext<FullPagePayload>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contentSections',
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900">3. Body Content Blocks</h2>
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              id: `sec-${Date.now()}`,
              heading: '',
              contentHtml: '',
              imageUrl: '',
              imageAlt: '',
            })
          }
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Block
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Block #{index + 1}
              </span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-slate-400 hover:text-red-600 transition"
                  title="Remove section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* HEADING */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Section Heading (H2)
              </label>
              <input
                type="text"
                {...register(`contentSections.${index}.heading`)}
                placeholder="Why Choose React for Enterprise Development?"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* RICH TEXT EDITOR */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Rich Text Content
              </label>
              <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
                <Controller
                  name={`contentSections.${index}.contentHtml`}
                  control={control}
                  render={({ field: quillField }) => (
                    <ReactQuill
                      theme="snow"
                      value={quillField.value || ''}
                      onChange={quillField.onChange}
                      modules={editorModules}
                      placeholder="Write your structured section content here..."
                    />
                  )}
                />
              </div>
            </div>

            {/* OPTIONAL IMAGE & ALT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Section Image URL (Optional)
                </label>
                <input
                  type="url"
                  {...register(`contentSections.${index}.imageUrl`)}
                  placeholder="https://prawez.com/assets/section-img.png"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Image Alt Text (Optional)
                </label>
                <input
                  type="text"
                  {...register(`contentSections.${index}.imageAlt`)}
                  placeholder="React architecture diagram"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}