"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
    const faqs = [
        {
            question: "What kind of tasks can I hire you for?",
            answer: "I handle a wide range of tasks including complete application development, core bug fixes, feature creation, speed and performance optimization, API integrations, system and application design, DevOps orchestration, Docker environment setups, custom CI/CD pipelines, and secure server deployments."
        },
        {
            question: "Do you handle urgent production fixes?",
            answer: "Yes, I prioritize time-critical, urgent tasks. I provide rapid turnarounds for sudden infrastructure or source code crashes to maintain business continuity and minimize server downtime."
        },
        {
            question: "Can you work within an existing codebase?",
            answer: "Absolutely. I regularly jump into existing code systems, rapidly map out dependencies, and implement optimized features or fixes cleanly without disrupting established engineering configurations."
        },
        {
            question: "Do you provide DevOps and deployment support?",
            answer: "Yes. I provide cloud systems architecture management across AWS, Docker workspace builds, Nginx routing setup, automated CI/CD engine assembly, Linux server hardening, and highly scalable deployment infrastructures."
        },
        {
            question: "How is pricing structured for development services?",
            answer: "Pricing is flexible and modeled entirely around project complexity or delivery timeline. I offer both milestones-focused contract pricing and transparent hourly tracking scales with crystal-clear upfront projections."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section 
            id="faq" 
            className="w-full bg-white border border-gray-200/80 p-6 sm:p-10 rounded-2xl shadow-premium relative scroll-mt-20"
            aria-labelledby="faq-title"
        >
            {/* Header / Meta Segment */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100/50 shrink-0">
                    <HelpCircle size={20} className="stroke-[2.5]" />
                </div>
                <div>
                    <h2 id="faq-title" className="text-lg font-extrabold text-gray-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                        Everything you need to know about starting a project engagement or task delivery.
                    </p>
                </div>
            </div>

            {/* Accordion Stream Grid */}
            <div className="space-y-3.5">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index} 
                            className={`border rounded-xl transition-all duration-200 ${
                                isOpen 
                                    ? 'border-indigo-100 bg-indigo-50/5 shadow-3xs' 
                                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-4xs'
                            }`}
                        >
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() => toggleFaq(index)}
                                className={`w-full flex items-center justify-between p-5 text-left text-sm font-bold transition-colors cursor-pointer select-none outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/20 ${
                                    isOpen ? 'text-indigo-600' : 'text-gray-800'
                                }`}
                            >
                                <span className="pr-4">{faq.question}</span>
                                <ChevronDown 
                                    size={16} 
                                    className={`text-gray-400 transition-transform duration-300 shrink-0 ${
                                        isOpen ? 'transform rotate-180 text-indigo-500' : ''
                                    }`} 
                                />
                            </button>
                            
                            <div 
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                                }`}
                            >
                                <div className="p-5 pt-0 text-xs text-gray-500 leading-relaxed font-normal border-t border-gray-100/60 mt-0 bg-white/50 rounded-b-xl">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}