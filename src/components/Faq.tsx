"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQSectionProps {
    faqs: FAQItem[];
    title?: string;
    subtitle?: string;
    className?: string;
    showSchema?: boolean;
}

export default function Faq({
    faqs = [],
    title = "Frequently Asked Questions",
    subtitle = "Everything you need to know about starting a project engagement or task delivery.",
    className = "",
    showSchema = true
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ Schema JSON-LD dynamically
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
     <section 
      id="faq" 
      className={`w-full bg-white border border-gray-200/80 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm relative scroll-mt-20 ${className}`}
      aria-labelledby="faq-title"
    >
      {/* Inject JSON-LD Schema for SEO */}
      {showSchema && faqs.length > 0 && faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header Segment */}
      <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-8">
        <div className="bg-indigo-50 p-2 sm:p-2.5 rounded-xl text-indigo-600 border border-indigo-100/60 shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 
            id="faq-title" 
            className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-900 tracking-tight leading-snug break-words"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1 font-medium leading-relaxed break-words">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5 sm:space-y-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'border-indigo-200/90 bg-indigo-50/10 shadow-sm' 
                  : 'border-gray-200/80 bg-white hover:border-gray-300 shadow-xs'
              }`}
            >
              {/* Accordion Header / Button */}
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleFaq(index)}
                className={`w-full min-h-[48px] flex items-start justify-between gap-3 sm:gap-4 px-4 py-3.5 sm:px-5 sm:py-4 transition-colors cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 active:bg-indigo-50/40 ${
                  isOpen ? 'text-indigo-600' : 'text-gray-800 hover:text-gray-900'
                }`}
              >
                <span className={`text-left text-sm sm:text-base leading-snug break-words flex-1 ${isOpen ? 'font-bold' : 'font-semibold'}`}>
                  {faq.question}
                </span>
                
                {/* mt-0.5 aligns the icon perfectly with the first line of text on multi-line questions */}
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 mt-0.5 ${
                    isOpen ? 'transform rotate-180 text-indigo-600' : ''
                  }`} 
                />
              </button>
              
              {/* Accordion Content Container (Grid trick for dynamic smooth height) */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 sm:pt-2 text-sm text-gray-600 leading-relaxed font-normal border-t border-gray-100 bg-gray-50/30 break-words">
                    {faq.answer}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
    );
}