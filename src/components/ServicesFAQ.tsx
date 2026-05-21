"use client";

import { useState } from 'react';
import { ChevronDown, Layers } from 'lucide-react';

export default function ServicesFAQ() {
    // Array explicitly mirrors the layout schema for perfect indexing compliance
    const servicesFaqs = [
        {
            question: "What core development services do you provide?",
            answer: "I build enterprise-grade SaaS systems and custom web applications utilizing high-performance tech stacks, primarily focusing on Next.js for fluid front-end interfaces and FastAPI or Node.js for ultra-fast, async back-end infrastructure."
        },
        {
            question: "Can you optimize or scale an existing application?",
            answer: "Yes. I offer performance auditing and optimization services. I can jump into your codebase to refactor inefficient application logic, implement advanced caching patterns, fix core system bugs, and scale your overall application design."
        },
        {
            question: "What DevOps and server deployment support do you offer?",
            answer: "I provide end-to-end cloud infrastructure services. This includes managing AWS cloud ecosystems, setting up secure Linux VPS server environments, building optimized Docker configurations, and structuring automated CI/CD deployment pipelines."
        },
        {
            question: "Do you specialize in third-party API integrations and system design?",
            answer: "Absolutely. I design highly decoupled, multi-protocol systems incorporating RESTful gateways, real-time WebSockets, and high-speed internal gRPC services, alongside clean integrations for any external enterprise APIs or payment systems."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section 
            id="faq" 
            className="w-full bg-white border border-gray-200/80 p-6 sm:p-10 rounded-2xl shadow-premium relative scroll-mt-20"
            aria-labelledby="services-faq-title"
        >
            {/* Header Block */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100/50 shrink-0">
                    <Layers size={20} className="stroke-[2.5]" />
                </div>
                <div>
                    <h2 id="services-faq-title" className="text-lg font-extrabold text-gray-900 tracking-tight">
                        Service Delivery FAQs
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                        Common questions regarding capabilities, cloud deployments, and integration architectures.
                    </p>
                </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
                {servicesFaqs.map((faq, index) => {
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
                                onClick={() => setOpenIndex(isOpen ? null : index)}
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
                                    isOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                                }`}
                            >
                                <div className="p-5 pt-0 text-xs text-gray-500 leading-relaxed font-normal border-t border-gray-100/60 bg-white/50 rounded-b-xl">
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