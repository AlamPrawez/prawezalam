'use client';

import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Code2 } from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';

// Modular Section Imports
import SeoSection from '@/components/cms/SeoSection';
import HeroSection from '@/components/cms/HeroSection';
import ServicesSection from '@/components/cms/ServicesSection';
import ContentSections from '@/components/cms/ContentSections';
import FaqSection from '@/components/cms/FaqSection';

export default function PageBuilderForm() {
  // Pass FullPagePayload to useForm generics
  const methods = useForm<FullPagePayload>({
    defaultValues: {
      seo: {
        title: '',
        slug: '',
        description: '',
        canonicalUrl: '',
        ogImage: '',
        keywords: '',
      },
      hero: {
        badge: 'Service Offering',
        headline: '',
        paragraphHtml: '',
        heroImage: '',
        buttons: [
          {
            id: 'btn-1',
            label: 'Get Free Consultation',
            url: '/contact',
            variant: 'primary',
            openInNewTab: false,
          },
        ],
      },
      services: {
        sectionTitle: 'React Development Services',
        sectionSubtitle: '',
        cards: [],
      },
      contentSections: [
        {
          id: 'sec-1',
          heading: '',
          contentHtml: '',
          imageUrl: '',
          imageAlt: '',
        },
      ],
      faqs: [
        {
          id: 'faq-1',
          question: '',
          answerHtml: '',
        },
      ],
    },
  });

  // Explicitly type using SubmitHandler<FullPagePayload>
  const onSubmit: SubmitHandler<FullPagePayload> = (data) => {
    console.log('====================================');
    console.log('🚀 CLEAN SUBMITTED PAYLOAD:');
    console.log(JSON.stringify(data, null, 2));
    console.log('====================================');
    alert('Submitted successfully! Check developer console (F12).');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* TOP BAR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-7 h-7 text-indigo-600" /> Page CMS Builder
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Modular architecture using React Hook Form.
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition"
            >
              Publish Page
            </button>
          </div>

          {/* MODULAR SECTIONS */}
          <SeoSection />
          <HeroSection />
          <ServicesSection />
          <ContentSections />
          <FaqSection />

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base rounded-xl shadow-md transition"
            >
              Submit & Console Payload
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}