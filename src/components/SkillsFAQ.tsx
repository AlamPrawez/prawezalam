"use client";

import { useState } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';

export default function SkillsFAQ() {
    const skillsFaqs = [
        {
            question: "What specific core engineering stacks do you specialize in?",
            answer: "I specialize in constructing highly optimized web applications utilizing Next.js for client architecture and FastAPI or Node.js for backend server handling. I build cleanly with TypeScript to enforce end-to-end type safety across the entire codebase."
        },
        {
            question: "What are your capabilities regarding database management and optimization?",
            answer: "I design and tune relational data layers primarily using PostgreSQL. My expertise covers writing high-efficiency queries, structuring scalable schemas, setting up spatial or performance extensions, and building reliable caching strategies."
        },
        {
            question: "How do you handle cloud deployments and DevOps infrastructure?",
            answer: "I orchestrate production environments using AWS services and standalone Linux configurations. I containerize systems with Docker, configure secure Nginx edge reverse-proxies with load balancing, and build automated Git-driven CI/CD deployment pipelines."
        },
        {
            question: "What advanced application architectures can you implement?",
            answer: "I build robust, modular applications. This includes multi-protocol architectures pairing RESTful public gateways with ultra-fast internal gRPC microservices, real-time message routing, and decoupled event-driven systems."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section 
            id="faq" 
            className="w-full bg-white border border-gray-200/80 p-6 sm:p-10 rounded-2xl shadow-premium relative scroll-mt-20"
            aria-labelledby="skills-faq-title"
        >
            {/* Header Block */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100/50 shrink-0">
                    <Cpu size={20} className="stroke-[2.5]" />
                </div>
                <div>
                    <h2 id="skills-faq-title" className="text-lg font-extrabold text-gray-900 tracking-tight">
                        Architecture & Strategy FAQs
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                        Detailed answers regarding full-stack capability baselines, performance limits, and workflows.
                    </p>
                </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
                {skillsFaqs.map((faq, index) => {
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
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
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