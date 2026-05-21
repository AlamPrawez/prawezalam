"use client";

import { useState } from 'react';
import { ChevronDown, Code2 } from 'lucide-react';

export default function AboutFAQ() {
    const aboutFaqs = [
        {
            question: "What is your preferred core development stack?",
            answer: "My gold-standard architecture for building high-performance web applications pairs Next.js on the front-end with FastAPI on the back-end. This specific combination guarantees ultra-fast render speeds, lightweight deployments, robust type safety, and an incredibly responsive asynchronous backend API layer."
        },
        {
            question: "How do you ensure web application performance and optimization?",
            answer: "I specialize in technical performance optimization, writing clean code structured to target perfect 100/100 Lighthouse metrics. This includes implementing fine-tuned state management, asset compression, database optimization, and efficient server-side caching mechanics."
        },
        {
            question: "Can you onboard into complex existing codebases?",
            answer: "Yes. I am experienced in joining existing project ecosystems seamlessly. I quickly map out software dependencies, trace application logic, and implement clean extensions or system modernizations without disrupting production stability or core infrastructure."
        },
        {
            question: "What is your approach to system design and database management?",
            answer: "I design systems with scale, security, and modularity in mind. For data layers, I focus on building resilient database systems utilizing PostgreSQL alongside robust multi-protocol architectures like REST gateways and high-efficiency gRPC microservices."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section 
            id="faq" 
            className="w-full bg-white border border-gray-200/80 p-6 sm:p-10 rounded-2xl shadow-premium relative scroll-mt-20"
            aria-labelledby="about-faq-title"
        >
            {/* Header Block */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100/50 shrink-0">
                    <Code2 size={20} className="stroke-[2.5]" />
                </div>
                <div>
                    <h2 id="about-faq-title" className="text-lg font-extrabold text-gray-900 tracking-tight">
                        Technical Expertise & Workflows
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                        Insights into my architectural choices, systems design, and optimization engineering.
                    </p>
                </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
                {aboutFaqs.map((faq, index) => {
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