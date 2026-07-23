'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Plus,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Send,
  Check,
  Lock,
  RotateCcw,
  Sparkles,
  Save,
  Loader2,
} from 'lucide-react';
import { FullPagePayload } from '@/@types/cms';
// import { CmsServiceRepository } from '@/api/CmsServiceRepository';

// Modular Section Imports
import SeoSection from '@/components/cms/SeoSection';
import HeroSection from '@/components/cms/HeroSection';
import ServicesSection from '@/components/cms/ServicesSection';
import ContentSections from '@/components/cms/ContentSections';
import FaqSection from '@/components/cms/FaqSection';
import ProcessSection from '@/components/cms/ProcessSection';
import WhyChooseSection from '@/components/cms/WhyChooseSection';
import FeaturesAndIndustriesSection from '@/components/cms/FeaturesAndIndustriesSection';
import WhyWorkWithMeSection from '@/components/cms/WhyWorkWithMeSection';
import CtaSection from '@/components/cms/CtaSection';

import ServicesListView, { ServiceItem } from '@/components/cms/ServicesListView';
import { cmsService } from '@/services/api/endpoints';

const LOCAL_STORAGE_KEY = 'cms_page_builder_draft_data';
const COMPLETED_STEPS_KEY = 'cms_page_builder_completed_steps';

export default function PageBuilderForm() {
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Supabase State Management
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const defaultFormValues: FullPagePayload = {
    seo: { title: '', slug: '', description: '', canonicalUrl: '', ogImage: '', keywords: '' },
    hero: {
      badge: 'Service Offering',
      headline: '',
      paragraphHtml: '',
      heroImage: '',
      buttons: [
        { id: 'btn-1', label: 'Get Free Consultation', url: '/contact', variant: 'primary', openInNewTab: false },
      ],
    },
    
    services: { sectionTitle: 'React Development Services', sectionSubtitle: '', cards: [] },
features_industries: {
    featuresSection: {
      title: 'Frequently Built Features',
      subtitle: 'Some of the solutions I regularly engineer into custom web applications:',
      items: [{ id: 'feat-1', label: '' }],
    },
    industriesSection: {
      title: 'Industries I Work With',
      subtitle: 'React structures fit seamlessly into many domain configurations, including:',
      items: [{ id: 'ind-1', name: '' }],
    },
  },
  
    process: {
    badge: 'EXECUTION STRATEGY',
    title: 'My Development Process',
    subtitle: 'A systematic, engineering-focused workflow designed to turn ideas into highly maintainable production assets.',
    steps: [
      {
        id: 'step-1',
        stepNumber: '01',
        title: 'Discovery & Architecture Planning',
        description: 'Analyze system requirements, map out component hierarchies, and choose the optimal tech stack.',
      },
    ],
  },
  
    contentSections: [{ id: 'sec-1', heading: '', contentHtml: '', imageUrl: '', imageAlt: '' }],
    faqs: [{ id: 'faq-1', question: '', answerHtml: '' }],
  };

  const methods = useForm<FullPagePayload>({
    defaultValues: defaultFormValues,
  });

  // Load Services from Supabase
  const loadServices = useCallback(async () => {
    try {
      setIsLoadingServices(true);
      const data = await cmsService.fetchServicesList();
      if (data) {
        const formatted: ServiceItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          status: item.status,
          updatedAt: new Date(item.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        }));
        setServicesList(formatted);
      }
    } catch (err: any) {
      console.error('Failed to load services list from Supabase:', err.message);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Load Local Storage Draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedSteps = localStorage.getItem(COMPLETED_STEPS_KEY);

    if (savedDraft) {
      try {
        methods.reset(JSON.parse(savedDraft));
      } catch (err) {
        console.error('Failed to parse draft:', err);
      }
    }

    if (savedSteps) {
      try {
        setCompletedSteps(JSON.parse(savedSteps));
      } catch (err) {
        console.error('Failed to parse steps:', err);
      }
    }
  }, [methods]);

  // Persist local state
  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
  }, [completedSteps]);

  const stepsList = [
    { num: 1, title: 'SEO', component: <SeoSection baseCanonicalUrl="https://prawez.com/services" /> },
    { num: 2, title: 'Hero', component: <HeroSection /> },
    { num: 3, title: 'Services', component: <ServicesSection /> },
    { num: 4, title: 'Why Choose', component: <WhyChooseSection /> },
    { num: 5, title: 'Process', component: <ProcessSection /> },
    { num: 6, title: 'Features', component: <FeaturesAndIndustriesSection /> },
    { num: 7, title: 'Why Work', component: <WhyWorkWithMeSection /> },
    { num: 8, title: 'Content', component: <ContentSections /> },
    { num: 9, title: 'FAQs', component: <FaqSection /> },
    { num: 10, title: 'CTA', component: <CtaSection /> },
  ];

  const handleSaveAndNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep < stepsList.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepNum: number) => {
    const isCompleted = completedSteps.includes(stepNum);
    const isCurrent = stepNum === currentStep;
    const isFirstStep = stepNum === 1;

    if (isCompleted || isCurrent || isFirstStep) {
      setCurrentStep(stepNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    if (confirm('Reset form fields? Unsaved progress will be erased.')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(COMPLETED_STEPS_KEY);
      methods.reset(defaultFormValues);
      setCompletedSteps([]);
      setCurrentStep(1);
      setEditingServiceId(null);
    }
  };

  // Fetch complete details from Supabase when editing an item
  const handleEditService = async (service: ServiceItem) => {
    try {
      setIsLoadingServices(true);
      const fullServiceData = await cmsService.getServiceWithDetails(service.id);
      
      if (fullServiceData) {
        const details = fullServiceData.cms_service_details?.[0] || fullServiceData.cms_service_details;
        
        const reconstructedPayload: FullPagePayload = {
          seo: details?.seo || { title: fullServiceData.title, slug: fullServiceData.slug, description: '', canonicalUrl: '', ogImage: '', keywords: '' },
          hero: details?.hero || defaultFormValues.hero,
          services: details?.services || defaultFormValues.services,
          process:details?.process || defaultFormValues.process,
          features_industries: details?.features_industries || details?.featuresAndIndustries || defaultFormValues.features_industries,
          contentSections: details?.content_sections || defaultFormValues.contentSections,
          faqs: details?.faqs || defaultFormValues.faqs,
          ...(details?.process ? { process: details.process } : {}),
          ...(details?.why_choose ? { whyChoose: details.why_choose } : {}),
          ...(details?.features_industries ? { featuresAndIndustries: details.features_industries } : {}),
          ...(details?.why_work_with_me ? { whyWorkWithMe: details.why_work_with_me } : {}),
          ...(details?.cta ? { cta: details.cta } : {}),
        };

        methods.reset(reconstructedPayload);
        setEditingServiceId(service.id);
        setCompletedSteps([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        setActiveTab('create');
        setCurrentStep(1);
      }
    } catch (err: any) {
      alert(`Error loading service: ${err.message}`);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const handleCreateNew = () => {
    handleResetForm();
    setActiveTab('create');
  };

  // Process submission to Supabase
  const handleFormSubmission = async (data: FullPagePayload, status: 'Draft' | 'Published') => {
    try {
      setIsSaving(true);
      await cmsService.saveService(data, status, editingServiceId || undefined);

      // alert(`Service successfully ${status === 'Published' ? 'published' : 'saved as draft'}!`);
      
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(COMPLETED_STEPS_KEY);
      methods.reset(defaultFormValues);
      setCompletedSteps([]);
      setEditingServiceId(null);
      setCurrentStep(1);

      await loadServices();
      setActiveTab('view');
    } catch (err: any) {
      console.error('Error saving service:', err);
      alert(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = (data: FullPagePayload) => {
    handleFormSubmission(data, 'Published');
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-50/60 pb-16">
        <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
          {/* HEADER TABS */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 rounded-2xl border shadow-2xs">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition ${
                  activeTab === 'create'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Plus className="w-4 h-4" /> {editingServiceId ? 'Edit Service' : 'Create New Service'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('view');
                  loadServices();
                }}
                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition ${
                  activeTab === 'view'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4" /> View Services List
              </button>
            </div>

            {activeTab === 'create' && (
              <button
                type="button"
                onClick={handleResetForm}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition px-2 py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Draft
              </button>
            )}
          </div>

          {activeTab === 'create' && (
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              {/* STEP TRACKER WITH SMALL TEXT LABELS UNDERNEATH */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                {/* STEP HEADER COUNTER */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-extrabold text-[11px]">
                      {currentStep}
                    </span>
                    <span>
                      <span className="text-slate-400 font-medium">Step {currentStep}: </span>
                      {stepsList[currentStep - 1].title}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <Sparkles className="w-3 h-3" />
                    {completedSteps.length} / {stepsList.length} Completed
                  </span>
                </div>

                {/* CONNECTED STEP NODES WITH TEXT LABELS BELOW */}
                <div className="relative pt-1 pb-2 px-1">
                  {/* BACKGROUND PROGRESS LINE */}
                  <div className="absolute top-[20px] left-5 right-5 h-1 bg-slate-100 rounded-full -z-0">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {/* STEP NODES ROW */}
                  <div className="relative z-10 flex items-start justify-between">
                    {stepsList.map((step) => {
                      const isCurrent = step.num === currentStep;
                      const isCompleted = completedSteps.includes(step.num);
                      const isClickable = isCompleted || isCurrent || step.num === 1;

                      return (
                        <div key={step.num} className="flex flex-col items-center flex-1">
                          {/* CIRCULAR BADGE */}
                          <button
                            type="button"
                            disabled={!isClickable}
                            onClick={() => handleStepClick(step.num)}
                            className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-200 ${
                              isCurrent
                                ? 'bg-indigo-600 text-white shadow-md ring-4 ring-indigo-100 scale-110'
                                : isCompleted
                                ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 shadow-2xs'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-4 h-4 stroke-[3]" />
                            ) : !isClickable ? (
                              <Lock className="w-3 h-3 text-slate-300" />
                            ) : (
                              <span>{step.num}</span>
                            )}
                          </button>

                          {/* SMALL TEXT LABEL UNDERNEATH BADGE */}
                          <span
                            className={`text-[10px] leading-tight font-medium mt-1.5 text-center max-w-[60px] truncate transition-colors ${
                              isCurrent
                                ? 'text-indigo-600 font-bold'
                                : isCompleted
                                ? 'text-slate-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CURRENT STEP CONTENT */}
              <div>{stepsList[currentStep - 1].component}</div>

              {/* FOOTER ACTION BUTTONS */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1 || isSaving}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-xs transition ${
                    currentStep === 1 || isSaving
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Step
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={methods.handleSubmit((data) => handleFormSubmission(data, 'Draft'))}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition active:scale-95 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-slate-500" />} Save Draft
                  </button>

                  {currentStep < stepsList.length ? (
                    <button
                      type="button"
                      onClick={handleSaveAndNext}
                      className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition active:scale-95"
                    >
                      Save & Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSaving}
                      onClick={() => {
                        if (!completedSteps.includes(10)) {
                          setCompletedSteps((prev) => [...prev, 10]);
                        }
                      }}
                      className="flex items-center gap-1.5 px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition active:scale-95 disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publish Final Page
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {activeTab === 'view' && (
            <ServicesListView
              services={servicesList}
              isLoading={isLoadingServices}
              onEditService={handleEditService}
              onCreateNew={handleCreateNew}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
}

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import {
//   Plus,
//   LayoutGrid,
//   ChevronLeft,
//   ChevronRight,
//   Send,
//   Check,
//   Lock,
//   RotateCcw,
//   Sparkles,
// } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// // Modular Section Imports
// import SeoSection from '@/components/cms/SeoSection';
// import HeroSection from '@/components/cms/HeroSection';
// import ServicesSection from '@/components/cms/ServicesSection';
// import ContentSections from '@/components/cms/ContentSections';
// import FaqSection from '@/components/cms/FaqSection';
// import ProcessSection from '@/components/cms/ProcessSection';
// import WhyChooseSection from '@/components/cms/WhyChooseSection';
// import FeaturesAndIndustriesSection from '@/components/cms/FeaturesAndIndustriesSection';
// import WhyWorkWithMeSection from '@/components/cms/WhyWorkWithMeSection';
// import CtaSection from '@/components/cms/CtaSection';

// import ServicesListView, { ServiceItem } from '@/components/cms/ServicesListView';

// const LOCAL_STORAGE_KEY = 'cms_page_builder_draft_data';
// const COMPLETED_STEPS_KEY = 'cms_page_builder_completed_steps';

// const INITIAL_SERVICES_LIST: ServiceItem[] = [
//   {
//     id: '1',
//     title: 'React.js Development Services',
//     slug: 'react-js-development',
//     updatedAt: 'Jul 22, 2026',
//     status: 'Published',
//   },
//   {
//     id: '2',
//     title: 'Next.js Web Applications',
//     slug: 'nextjs-web-applications',
//     updatedAt: 'Jul 18, 2026',
//     status: 'Published',
//   },
//   {
//     id: '3',
//     title: 'Full-Stack Node.js Solutions',
//     slug: 'fullstack-nodejs-solutions',
//     updatedAt: 'Jul 10, 2026',
//     status: 'Draft',
//   },
// ];

// export default function PageBuilderForm() {
//   const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([]);

//   const defaultFormValues: FullPagePayload = {
//     seo: { title: '', slug: '', description: '', canonicalUrl: '', ogImage: '', keywords: '' },
//     hero: {
//       badge: 'Service Offering',
//       headline: '',
//       paragraphHtml: '',
//       heroImage: '',
//       buttons: [
//         { id: 'btn-1', label: 'Get Free Consultation', url: '/contact', variant: 'primary', openInNewTab: false },
//       ],
//     },
//     services: { sectionTitle: 'React Development Services', sectionSubtitle: '', cards: [] },
//     contentSections: [{ id: 'sec-1', heading: '', contentHtml: '', imageUrl: '', imageAlt: '' }],
//     faqs: [{ id: 'faq-1', question: '', answerHtml: '' }],
//   };

//   const methods = useForm<FullPagePayload>({
//     defaultValues: defaultFormValues,
//   });

//   // Load saved draft and completed steps
//   useEffect(() => {
//     const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
//     const savedSteps = localStorage.getItem(COMPLETED_STEPS_KEY);

//     if (savedDraft) {
//       try {
//         methods.reset(JSON.parse(savedDraft));
//       } catch (err) {
//         console.error('Failed to parse draft:', err);
//       }
//     }

//     if (savedSteps) {
//       try {
//         setCompletedSteps(JSON.parse(savedSteps));
//       } catch (err) {
//         console.error('Failed to parse steps:', err);
//       }
//     }
//   }, [methods]);

//   // Persist form changes
//   useEffect(() => {
//     const subscription = methods.watch((value) => {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
//     });
//     return () => subscription.unsubscribe();
//   }, [methods]);

//   // Persist completed steps
//   useEffect(() => {
//     localStorage.setItem(COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
//   }, [completedSteps]);

//   const stepsList = [
//     { num: 1, title: 'SEO', component: <SeoSection baseCanonicalUrl="https://prawez.com/services" /> },
//     { num: 2, title: 'Hero', component: <HeroSection /> },
//     { num: 3, title: 'Services', component: <ServicesSection /> },
//     { num: 4, title: 'Why Choose', component: <WhyChooseSection /> },
//     { num: 5, title: 'Process', component: <ProcessSection /> },
//     { num: 6, title: 'Features', component: <FeaturesAndIndustriesSection /> },
//     { num: 7, title: 'Why Work', component: <WhyWorkWithMeSection /> },
//     { num: 8, title: 'Content', component: <ContentSections /> },
//     { num: 9, title: 'FAQs', component: <FaqSection /> },
//     { num: 10, title: 'CTA', component: <CtaSection /> },
//   ];

//   const handleSaveAndNext = () => {
//     if (!completedSteps.includes(currentStep)) {
//       setCompletedSteps((prev) => [...prev, currentStep]);
//     }

//     if (currentStep < stepsList.length) {
//       setCurrentStep((prev) => prev + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleStepClick = (stepNum: number) => {
//     const isCompleted = completedSteps.includes(stepNum);
//     const isCurrent = stepNum === currentStep;
//     const isFirstStep = stepNum === 1;

//     if (isCompleted || isCurrent || isFirstStep) {
//       setCurrentStep(stepNum);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleResetForm = () => {
//     if (confirm('Reset form fields? Unsaved progress will be erased.')) {
//       localStorage.removeItem(LOCAL_STORAGE_KEY);
//       localStorage.removeItem(COMPLETED_STEPS_KEY);
//       methods.reset(defaultFormValues);
//       setCompletedSteps([]);
//       setCurrentStep(1);
//     }
//   };

//   const handleEditService = (service: ServiceItem) => {
//     setActiveTab('create');
//     setCurrentStep(1);
//   };

//   const handleCreateNew = () => {
//     handleResetForm();
//     setActiveTab('create');
//   };

//   const onSubmit = (data: FullPagePayload) => {
//     console.log('🚀 CLEAN SUBMITTED PAYLOAD:', JSON.stringify(data, null, 2));
//     alert('Service successfully published!');
//     localStorage.removeItem(LOCAL_STORAGE_KEY);
//     localStorage.removeItem(COMPLETED_STEPS_KEY);
//     setCompletedSteps([]);
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="min-h-screen bg-slate-50/60 pb-16">
//         <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
//           {/* HEADER TABS */}
//           <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 rounded-2xl border shadow-2xs">
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setActiveTab('create')}
//                 className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition ${
//                   activeTab === 'create'
//                     ? 'border-indigo-600 text-indigo-600'
//                     : 'border-transparent text-slate-500 hover:text-slate-800'
//                 }`}
//               >
//                 <Plus className="w-4 h-4" /> Create New Service
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setActiveTab('view')}
//                 className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition ${
//                   activeTab === 'view'
//                     ? 'border-indigo-600 text-indigo-600'
//                     : 'border-transparent text-slate-500 hover:text-slate-800'
//                 }`}
//               >
//                 <LayoutGrid className="w-4 h-4" /> View Services List
//               </button>
//             </div>

//             {activeTab === 'create' && (
//               <button
//                 type="button"
//                 onClick={handleResetForm}
//                 className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition px-2 py-1"
//               >
//                 <RotateCcw className="w-3.5 h-3.5" /> Clear Draft
//               </button>
//             )}
//           </div>

//           {activeTab === 'create' && (
//             <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
//               {/* STEP TRACKER WITH SMALL TEXT LABELS UNDERNEATH */}
//               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
//                 {/* STEP HEADER COUNTER */}
//                 <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-100 pb-3">
//                   <div className="flex items-center gap-2">
//                     <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-extrabold text-[11px]">
//                       {currentStep}
//                     </span>
//                     <span>
//                       <span className="text-slate-400 font-medium">Step {currentStep}: </span>
//                       {stepsList[currentStep - 1].title}
//                     </span>
//                   </div>

//                   <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
//                     <Sparkles className="w-3 h-3" />
//                     {completedSteps.length} / {stepsList.length} Completed
//                   </span>
//                 </div>

//                 {/* CONNECTED STEP NODES WITH TEXT LABELS BELOW */}
//                 <div className="relative pt-1 pb-2 px-1">
//                   {/* BACKGROUND PROGRESS LINE */}
//                   <div className="absolute top-[20px] left-5 right-5 h-1 bg-slate-100 rounded-full -z-0">
//                     <div
//                       className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
//                       style={{
//                         width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`,
//                       }}
//                     />
//                   </div>

//                   {/* STEP NODES ROW */}
//                   <div className="relative z-10 flex items-start justify-between">
//                     {stepsList.map((step) => {
//                       const isCurrent = step.num === currentStep;
//                       const isCompleted = completedSteps.includes(step.num);
//                       const isClickable = isCompleted || isCurrent || step.num === 1;

//                       return (
//                         <div key={step.num} className="flex flex-col items-center flex-1">
//                           {/* CIRCULAR BADGE */}
//                           <button
//                             type="button"
//                             disabled={!isClickable}
//                             onClick={() => handleStepClick(step.num)}
//                             className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-200 ${
//                               isCurrent
//                                 ? 'bg-indigo-600 text-white shadow-md ring-4 ring-indigo-100 scale-110'
//                                 : isCompleted
//                                 ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 shadow-2xs'
//                                 : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
//                             }`}
//                           >
//                             {isCompleted ? (
//                               <Check className="w-4 h-4 stroke-[3]" />
//                             ) : !isClickable ? (
//                               <Lock className="w-3 h-3 text-slate-300" />
//                             ) : (
//                               <span>{step.num}</span>
//                             )}
//                           </button>

//                           {/* SMALL TEXT LABEL UNDERNEATH BADGE */}
//                           <span
//                             className={`text-[10px] leading-tight font-medium mt-1.5 text-center max-w-[60px] truncate transition-colors ${
//                               isCurrent
//                                 ? 'text-indigo-600 font-bold'
//                                 : isCompleted
//                                 ? 'text-slate-700'
//                                 : 'text-slate-400'
//                             }`}
//                           >
//                             {step.title}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>

//               {/* CURRENT STEP CONTENT */}
//               <div className="">
//                 {stepsList[currentStep - 1].component}
//               </div>

//               {/* FOOTER ACTION BUTTONS */}
//               <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
//                 <button
//                   type="button"
//                   onClick={handlePrevStep}
//                   disabled={currentStep === 1}
//                   className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-xs transition ${
//                     currentStep === 1
//                       ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
//                       : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
//                   }`}
//                 >
//                   <ChevronLeft className="w-4 h-4" /> Previous Step
//                 </button>

//                 <div className="flex items-center gap-3">
//                   {currentStep < stepsList.length ? (
//                     <button
//                       type="button"
//                       onClick={handleSaveAndNext}
//                       className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition active:scale-95"
//                     >
//                       Save & Next Step <ChevronRight className="w-4 h-4" />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       onClick={() => {
//                         if (!completedSteps.includes(10)) {
//                           setCompletedSteps((prev) => [...prev, 10]);
//                         }
//                       }}
//                       className="flex items-center gap-1.5 px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition active:scale-95"
//                     >
//                       <Send className="w-4 h-4" /> Publish Final Page
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           )}

//           {activeTab === 'view' && (
//             <ServicesListView
//               services={INITIAL_SERVICES_LIST}
//               onEditService={handleEditService}
//               onCreateNew={handleCreateNew}
//             />
//           )}
//         </div>
//       </div>
//     </FormProvider>
//   );
// }



// 'use client';

// import React from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { Code2 } from 'lucide-react';
// import { FullPagePayload } from '@/@types/cms';

// // Modular Section Imports
// import SeoSection from '@/components/cms/SeoSection';
// import HeroSection from '@/components/cms/HeroSection';
// import ServicesSection from '@/components/cms/ServicesSection';
// // import ContentSections from '@/components/cms/ContentSections';
// import FaqSection from '@/components/cms/FaqSection';
// import ContentSections from '@/components/cms/ContentSections';
// import ProcessSection from '@/components/cms/ProcessSection';
// import WhyChooseSection from '@/components/cms/WhyChooseSection';
// import FeaturesAndIndustriesSection from '@/components/cms/FeaturesAndIndustriesSection';
// import WhyWorkWithMeSection from '@/components/cms/WhyWorkWithMeSection';
// import CtaSection from '@/components/cms/CtaSection';

// export default function PageBuilderForm() {
//   const methods = useForm<FullPagePayload>({
//     defaultValues: {
//       seo: {
//         title: '',
//         slug: '',
//         description: '',
//         canonicalUrl: '',
//         ogImage: '',
//         keywords: '',
//       },
//       hero: {
//         badge: 'Service Offering',
//         headline: '',
//         paragraphHtml: '',
//         heroImage: '',
//         buttons: [
//           {
//             id: 'btn-1',
//             label: 'Get Free Consultation',
//             url: '/contact',
//             variant: 'primary',
//             openInNewTab: false,
//           },
//         ],
//       },
//       services: {
//         sectionTitle: 'React Development Services',
//         sectionSubtitle: '',
//         cards: [],
//       },
//       contentSections: [
//         {
//           id: 'sec-1',
//           heading: '',
//           contentHtml: '',
//           imageUrl: '',
//           imageAlt: '',
//         },
//       ],
//       faqs: [
//         {
//           id: 'faq-1',
//           question: '',
//           answerHtml: '',
//         },
//       ],
//     },
//   });

//   const onSubmit = (data: FullPagePayload) => {
//     console.log('====================================');
//     console.log('🚀 CLEAN SUBMITTED PAYLOAD:');
//     console.log(JSON.stringify(data, null, 2));
//     console.log('====================================');
//     alert('Submitted successfully! Check developer console (F12).');
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="min-h-screen"
//       >
//         <div className="max-w-5xl mx-auto space-y-8">
//           {/* TOP BAR */}
//           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                 <Code2 className="w-7 h-7 text-indigo-600" /> Page CMS Builder
//               </h1>
//               <p className="text-sm text-slate-500 mt-1">
//                 Modular architecture using React Hook Form.
//               </p>
//             </div>
//             <button
//               type="submit"
//               className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition"
//             >
//               Publish Page
//             </button>
//           </div>

//           {/* MODULAR SECTIONS (ZERO PROPS) */}
//           <SeoSection baseCanonicalUrl="https://prawez.com/services" />
//           <HeroSection />
//           <ServicesSection />
//           <WhyChooseSection />
//           <ProcessSection />
//           <FeaturesAndIndustriesSection />
//           <WhyWorkWithMeSection />
//           <ContentSections />
//           <FaqSection />
//           <CtaSection />

//           {/* SUBMIT BUTTON */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base rounded-xl shadow-md transition"
//             >
//               Submit & Console Payload
//             </button>
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }


// 'use client';

// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
// import { Plus, Trash2, Code2, Globe, Sparkles, HelpCircle, FileText } from 'lucide-react';
// import 'react-quill-new/dist/quill.snow.css';

// // Dynamically import react-quill-new with SSR disabled (prevents 'window is not defined' errors)
// const ReactQuill = dynamic(() => import('react-quill-new'), {
//     ssr: false,
//     loading: () => (
//         <div className="h-40 w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-slate-400 text-sm">
//             Loading Rich Text Editor...
//         </div>
//     ),
// });

// // Rich Editor Configuration Options
// const editorModules = {
//     toolbar: [
//         [{ header: [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         ['link', 'image', 'code-block'],
//         ['clean'],
//     ],
// };

// // TypeScript Data Interfaces
// export interface SeoMeta {
//     title: string;
//     description: string;
//     slug: string;
//     canonicalUrl: string;
//     ogImage: string;
//     keywords: string;
// }


// export interface HeroCtaButton {
//     id: string;
//     label: string;
//     url: string;
//     variant: 'primary' | 'secondary' | 'outline';
//     openInNewTab: boolean;
// }

// export interface HeroSection {
//     badge: string;
//     headline: string;
//     paragraphHtml: string; // Changed to rich text HTML
//     heroImage: string;
//     buttons: HeroCtaButton[]; // Array for dynamic buttons
// }


// export interface ServiceCardItem {
//   id: string;
//   title: string;
//   description: string;
//   focusTitle: string; // e.g., "FOCUS & DEPLOYMENTS:"
//   focusPoints: string[]; // Dynamic bullet points list
// }

// export interface ServicesSectionData {
//   sectionTitle: string; // e.g., "React Development Services"
//   sectionSubtitle: string; // e.g., "I provide end-to-end React.js development services..."
//   cards: ServiceCardItem[];
// }

// export interface ContentSection {
//     id: string;
//     heading: string;
//     contentHtml: string;
//     imageUrl?: string;
//     imageAlt?: string;
// }

// export interface FaqItem {
//     id: string;
//     question: string;
//     answerHtml: string;
// }

// export interface PagePayload {
//     seo: SeoMeta;
//     hero: HeroSection;
//     contentSections: ContentSection[];
//     faqs: FaqItem[];
// }

// export default function PageBuilderForm() {
//     // State: SEO Metadata
//     const [seo, setSeo] = useState<SeoMeta>({
//         title: '',
//         description: '',
//         slug: '',
//         canonicalUrl: '',
//         ogImage: '',
//         keywords: '',
//     });

//     // State: Hero Banner Section
//     // 2. Updated Initial State inside your PageBuilderForm component
//     const [hero, setHero] = useState<HeroSection>({
//         badge: 'Service Offering',
//         headline: '',
//         paragraphHtml: '',
//         heroImage: '',
//         buttons: [
//             {
//                 id: 'btn-1',
//                 label: 'Get Free Consultation',
//                 url: '/contact',
//                 variant: 'primary',
//                 openInNewTab: false,
//             },
//         ],
//     });
//     // 3. Dynamic Button Handler Functions
//     const addHeroButton = () => {
//         setHero((prev) => ({
//             ...prev,
//             buttons: [
//                 ...prev.buttons,
//                 {
//                     id: `btn-${Date.now()}`,
//                     label: '',
//                     url: '',
//                     variant: 'secondary',
//                     openInNewTab: false,
//                 },
//             ],
//         }));
//     };

//     const removeHeroButton = (id: string) => {
//         if (hero.buttons.length === 1) return;
//         setHero((prev) => ({
//             ...prev,
//             buttons: prev.buttons.filter((btn) => btn.id !== id),
//         }));
//     };

//     const updateHeroButton = (
//         id: string,
//         field: keyof HeroCtaButton,
//         value: string | boolean
//     ) => {
//         setHero((prev) => ({
//             ...prev,
//             buttons: prev.buttons.map((btn) =>
//                 btn.id === id ? { ...btn, [field]: value } : btn
//             ),
//         }));
//     };


//     // State: Dynamic Content Blocks
//     const [contentSections, setContentSections] = useState<ContentSection[]>([
//         {
//             id: 'sec-1',
//             heading: '',
//             contentHtml: '',
//             imageUrl: '',
//             imageAlt: '',
//         },
//     ]);

    
//     // Handler: Meta Inputs
//     const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setSeo((prev) => ({ ...prev, [name]: value }));
//     };

//     // Handler: Hero Inputs
//     const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setHero((prev) => ({ ...prev, [name]: value }));
//     };


//     // Content Sections Actions
//     const addContentSection = () => {
//         setContentSections((prev) => [
//             ...prev,
//             { id: `sec-${Date.now()}`, heading: '', contentHtml: '', imageUrl: '', imageAlt: '' },
//         ]);
//     };

//     const removeContentSection = (id: string) => {
//         if (contentSections.length === 1) return;
//         setContentSections((prev) => prev.filter((sec) => sec.id !== id));
//     };

//     const updateContentSection = (id: string, field: keyof ContentSection, value: string) => {
//         setContentSections((prev) =>
//             prev.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
//         );
//     };


//     // State: Dynamic FAQ Items
//     const [faqs, setFaqs] = useState<FaqItem[]>([
//         {
//             id: 'faq-1',
//             question: '',
//             answerHtml: '',
//         },
//     ]);

//     // FAQ Actions
//     const addFaqItem = () => {
//         setFaqs((prev) => [...prev, { id: `faq-${Date.now()}`, question: '', answerHtml: '' }]);
//     };

//     const removeFaqItem = (id: string) => {
//         if (faqs.length === 1) return;
//         setFaqs((prev) => prev.filter((faq) => faq.id !== id));
//     };

//     const updateFaqItem = (id: string, field: keyof FaqItem, value: string) => {
//         setFaqs((prev) =>
//             prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
//         );
//     };

//     // Submit Handler: Assembles full payload & logs to console
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const fullPayload: PagePayload = {
//             seo,
//             hero,
//             contentSections,
//             faqs,
//         };

//         console.log('====================================');
//         console.log('🚀 SUBMITTED PAGE DATA PAYLOAD:');
//         console.log(JSON.stringify(fullPayload, null, 2));
//         console.log('====================================');

//         alert('Page data submitted successfully! Check browser DevTools console (F12).');
//     };

//     return (
//         <div className="min-h-screen py-5 px-4 sm:px-4 lg:px-4">
//             <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
//                 {/* PAGE HEADER */}
//                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
//                     <div>
//                         <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                             <Code2 className="w-7 h-7 text-indigo-600" /> Page & SEO Content Builder
//                         </h1>
//                         <p className="text-sm text-slate-500 mt-1">
//                             Configure SEO, Hero presentation, body content blocks, and FAQs.
//                         </p>
//                     </div>
//                     <button
//                         type="submit"
//                         className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Publish & Save Page
//                     </button>
//                 </div>

//                 {/* 1. SEO METADATA SECTION */}
//                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//                     <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//                         <Globe className="w-5 h-5 text-indigo-600" />
//                         <h2 className="text-lg font-semibold text-slate-900">1. SEO & Social Metadata</h2>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                 Meta Title
//                             </label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={seo.title}
//                                 onChange={handleSeoChange}
//                                 placeholder="e.g. React JS Development Services | Expert Agency"
//                                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                 URL Slug
//                             </label>
//                             <input
//                                 type="text"
//                                 name="slug"
//                                 value={seo.slug}
//                                 onChange={handleSeoChange}
//                                 placeholder="react-js-development"
//                                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             />
//                         </div>

//                         <div className="md:col-span-2">
//                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                 Meta Description
//                             </label>
//                             <textarea
//                                 name="description"
//                                 rows={3}
//                                 value={seo.description}
//                                 onChange={handleSeoChange}
//                                 placeholder="Brief summary shown in Google SERP snippet..."
//                                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                 Canonical URL
//                             </label>
//                             <input
//                                 type="url"
//                                 name="canonicalUrl"
//                                 value={seo.canonicalUrl}
//                                 onChange={handleSeoChange}
//                                 placeholder="https://prawez.com/services/react-js-development"
//                                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                 OG Image URL (Social Share)
//                             </label>
//                             <input
//                                 type="url"
//                                 name="ogImage"
//                                 value={seo.ogImage}
//                                 onChange={handleSeoChange}
//                                 placeholder="https://prawez.com/images/og-react.jpg"
//                                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>
//                     </div>
//                 </div>


                // {/* 2. HERO BANNER SECTION */}
                // <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                //     <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                //         <Sparkles className="w-5 h-5 text-indigo-600" />
                //         <h2 className="text-lg font-semibold text-slate-900">2. Hero Banner Settings</h2>
                //     </div>

                //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                //         <div>
                //             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                //                 Badge / Tagline
                //             </label>
                //             <input
                //                 type="text"
                //                 name="badge"
                //                 value={hero.badge}
                //                 onChange={handleHeroChange}
                //                 placeholder="e.g. Next.js & React Experts"
                //                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //             />
                //         </div>

                //         <div>
                //             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                //                 Main Headline (H1)
                //             </label>
                //             <input
                //                 type="text"
                //                 name="headline"
                //                 value={hero.headline}
                //                 onChange={handleHeroChange}
                //                 placeholder="High-Performance React JS Development"
                //                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //                 required
                //             />
                //         </div>

                //         {/* HERO RICH TEXT PARAGRAPH */}
                //         <div className="md:col-span-2">
                //             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                //                 Hero Description / Paragraph
                //             </label>
                //             <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
                //                 <ReactQuill
                //                     theme="snow"
                //                     value={hero.paragraphHtml}
                //                     onChange={(html) => setHero((prev) => ({ ...prev, paragraphHtml: html }))}
                //                     modules={{
                //                         toolbar: [
                //                             ['bold', 'italic', 'underline', 'strike'],
                //                             [{ list: 'ordered' }, { list: 'bullet' }],
                //                             ['link', 'clean'],
                //                         ],
                //                     }}
                //                     placeholder="Write detailed hero overview paragraph with formatted text and links..."
                //                 />
                //             </div>
                //         </div>

                //         <div className="md:col-span-2">
                //             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                //                 Hero Image URL
                //             </label>
                //             <input
                //                 type="url"
                //                 name="heroImage"
                //                 value={hero.heroImage}
                //                 onChange={handleHeroChange}
                //                 placeholder="https://prawez.com/assets/react-hero.png"
                //                 className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //             />
                //         </div>
                //     </div>

                //     {/* CALL TO ACTION BUTTONS SECTION */}
                //     <div className="border-t border-slate-100 pt-5 space-y-4">
                //         <div className="flex items-center justify-between">
                //             <div>
                //                 <h3 className="text-sm font-bold text-slate-800">Call to Action (CTA) Buttons</h3>
                //                 <p className="text-xs text-slate-500">Add one or multiple action buttons to your hero header.</p>
                //             </div>
                //             <button
                //                 type="button"
                //                 onClick={addHeroButton}
                //                 className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                //             >
                //                 <Plus className="w-4 h-4" /> Add Button
                //             </button>
                //         </div>

                //         <div className="space-y-3">
                //             {hero.buttons.map((btn, index) => (
                //                 <div key={btn.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                //                     <div className="flex items-center justify-between">
                //                         <span className="text-xs font-bold text-slate-500 uppercase">
                //                             Button #{index + 1}
                //                         </span>
                //                         {hero.buttons.length > 1 && (
                //                             <button
                //                                 type="button"
                //                                 onClick={() => removeHeroButton(btn.id)}
                //                                 className="text-slate-400 hover:text-red-600 transition"
                //                                 title="Remove Button"
                //                             >
                //                                 <Trash2 className="w-4 h-4" />
                //                             </button>
                //                         )}
                //                     </div>

                //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                //                         <div>
                //                             <label className="block text-xs font-medium text-slate-600 mb-1">
                //                                 Button Text
                //                             </label>
                //                             <input
                //                                 type="text"
                //                                 value={btn.label}
                //                                 onChange={(e) => updateHeroButton(btn.id, 'label', e.target.value)}
                //                                 placeholder="e.g. View Portfolio"
                //                                 className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //                             />
                //                         </div>

                //                         <div>
                //                             <label className="block text-xs font-medium text-slate-600 mb-1">
                //                                 Destination URL
                //                             </label>
                //                             <input
                //                                 type="text"
                //                                 value={btn.url}
                //                                 onChange={(e) => updateHeroButton(btn.id, 'url', e.target.value)}
                //                                 placeholder="/portfolio or https://..."
                //                                 className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //                             />
                //                         </div>

                //                         <div>
                //                             <label className="block text-xs font-medium text-slate-600 mb-1">
                //                                 Style Variant
                //                             </label>
                //                             <select
                //                                 value={btn.variant}
                //                                 onChange={(e) => updateHeroButton(btn.id, 'variant', e.target.value as HeroCtaButton['variant'])}
                //                                 className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //                             >
                //                                 <option value="primary">Primary (Solid Indigo)</option>
                //                                 <option value="secondary">Secondary (Dark Slate)</option>
                //                                 <option value="outline">Outline (Bordered)</option>
                //                             </select>
                //                         </div>
                //                     </div>

                //                     <div className="flex items-center gap-2 pt-1">
                //                         <input
                //                             type="checkbox"
                //                             id={`tab-${btn.id}`}
                //                             checked={btn.openInNewTab}
                //                             onChange={(e) => updateHeroButton(btn.id, 'openInNewTab', e.target.checked)}
                //                             className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                //                         />
                //                         <label htmlFor={`tab-${btn.id}`} className="text-xs text-slate-600 cursor-pointer">
                //                             Open link in new tab (`target="_blank"`)
                //                         </label>
                //                     </div>
                //                 </div>
                //             ))}
                //         </div>
                //     </div>
                // </div>


//                 {/* 3. DYNAMIC CONTENT SECTIONS (WITH REACT-QUILL-NEW) */}
//                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//                     <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//                         <div className="flex items-center gap-2">
//                             <FileText className="w-5 h-5 text-indigo-600" />
//                             <h2 className="text-lg font-semibold text-slate-900">3. Body Content Blocks</h2>
//                         </div>
//                         <button
//                             type="button"
//                             onClick={addContentSection}
//                             className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//                         >
//                             <Plus className="w-4 h-4" /> Add Block
//                         </button>
//                     </div>

//                     <div className="space-y-6">
//                         {contentSections.map((sec, index) => (
//                             <div key={sec.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-4">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
//                                         Block #{index + 1}
//                                     </span>
//                                     {contentSections.length > 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => removeContentSection(sec.id)}
//                                             className="text-slate-400 hover:text-red-600 transition"
//                                             title="Remove section"
//                                         >
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                         Section Heading (H2)
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={sec.heading}
//                                         onChange={(e) => updateContentSection(sec.id, 'heading', e.target.value)}
//                                         placeholder="Why Choose React for Enterprise Development?"
//                                         className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
//                                         Rich Text Content
//                                     </label>
//                                     <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
//                                         <ReactQuill
//                                             theme="snow"
//                                             value={sec.contentHtml}
//                                             onChange={(html) => updateContentSection(sec.id, 'contentHtml', html)}
//                                             modules={editorModules}
//                                             placeholder="Write your structured section content here..."
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-xs font-medium text-slate-600 mb-1">
//                                             Inline Image Link (Optional)
//                                         </label>
//                                         <input
//                                             type="url"
//                                             value={sec.imageUrl || ''}
//                                             onChange={(e) => updateContentSection(sec.id, 'imageUrl', e.target.value)}
//                                             placeholder="https://example.com/section-graphic.jpg"
//                                             className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-xs font-medium text-slate-600 mb-1">
//                                             Image Alt Text
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={sec.imageAlt || ''}
//                                             onChange={(e) => updateContentSection(sec.id, 'imageAlt', e.target.value)}
//                                             placeholder="Architecture diagram showing React component flow"
//                                             className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* 4. FAQ SECTION (ADD MORE OPTIONS) */}
//                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
//                     <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//                         <div className="flex items-center gap-2">
//                             <HelpCircle className="w-5 h-5 text-indigo-600" />
//                             <h2 className="text-lg font-semibold text-slate-900">4. Frequently Asked Questions (FAQ)</h2>
//                         </div>
//                         <button
//                             type="button"
//                             onClick={addFaqItem}
//                             className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//                         >
//                             <Plus className="w-4 h-4" /> Add FAQ
//                         </button>
//                     </div>

//                     <div className="space-y-4">
//                         {faqs.map((faq, index) => (
//                             <div key={faq.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-xs font-bold text-slate-500 uppercase">
//                                         Question #{index + 1}
//                                     </span>
//                                     {faqs.length > 1 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => removeFaqItem(faq.id)}
//                                             className="text-slate-400 hover:text-red-600 transition"
//                                             title="Remove FAQ"
//                                         >
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>

//                                 <input
//                                     type="text"
//                                     value={faq.question}
//                                     onChange={(e) => updateFaqItem(faq.id, 'question', e.target.value)}
//                                     placeholder="e.g. How long does a typical React JS project take?"
//                                     className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
//                                 />

//                                 <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
//                                     <ReactQuill
//                                         theme="snow"
//                                         value={faq.answerHtml}
//                                         onChange={(html) => updateFaqItem(faq.id, 'answerHtml', html)}
//                                         modules={{ toolbar: [['bold', 'italic', 'link'], [{ list: 'bullet' }], ['clean']] }}
//                                         placeholder="Write detailed answer here..."
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* SUBMIT BUTTON */}
//                 <div className="flex justify-end pt-4">
//                     <button
//                         type="submit"
//                         className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base rounded-xl shadow-md transition-all"
//                     >
//                         Submit & Console Data Payload
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }