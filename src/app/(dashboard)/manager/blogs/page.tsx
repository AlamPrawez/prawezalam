'use client';

import BlogPageBuilder from '@/components/Blog/BlogPageBuilder';
import { PageSectionItem } from '@/components/Blog/types';
import { HeroView } from '@/components/Blog/views/HeroView';
import React, { useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';

// Component to handle live preview rendering
const LivePreviewRenderer: React.FC = () => {
  // Read real-time sections array from react-hook-form
  const sections: PageSectionItem[] = useWatch({ name: 'sections' }) || [];

  if (sections.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
        No sections added yet. Add a section above to preview live UI.
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      {sections.map((sec, index) => {
        // Render corresponding view component based on section type
        switch (sec.type) {
          case 'hero':
            return <HeroView key={sec.id || index} sec={sec} />;
          
          // Add cases for other views here as you build them:
          // case 'features':
          //   return <FeaturesView key={sec.id || index} sec={sec} />;
          
          default:
            return (
              <div key={index} className="p-4 bg-slate-900 text-slate-400 text-xs font-mono">
                [Unsupported Section Type: {sec.type}]
              </div>
            );
        }
      })}
    </div>
  );
};

export default function BlogsBoard() {
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');

  const methods = useForm({
    defaultValues: {
      title: '',
      slug: '',
      sections: [], // Keeps track of dynamic sections
    },
  });

  const onSubmit = (data: any) => {
    console.log('🚀 Submission Payload:', JSON.stringify(data, null, 2));
    alert('Payload ready! Check browser console (F12).');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 max-w-7xl mx-auto p-4">
        
        {/* Navigation Bar to switch between Builder and Live UI Preview */}
        <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'builder'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🛠 Builder Mode
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'preview'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👁 Live UI Preview
            </button>
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
          >
            Save Page Data
          </button>
        </div>

        {/* Tab 1: Builder View */}
        {activeTab === 'builder' && <BlogPageBuilder />}

        {/* Tab 2: Full Rendered UI View */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Live Browser Render Output:
            </h2>
            <LivePreviewRenderer />
          </div>
        )}

      </form>
    </FormProvider>
  );
}