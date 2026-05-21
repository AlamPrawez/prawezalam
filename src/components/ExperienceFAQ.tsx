"use client";

import { useState } from 'react';
import { ChevronDown, Code2 } from 'lucide-react';

export default function ExperienceFAQ() {
const faqsExperience = [
  {
    question: "What core frameworks and technologies do you specialize in?",
    answer:
      "I specialize in high-performance full-stack engineering. My primary architectural blueprint combines Next.js for high-fidelity frontends with FastAPI (Python) for rapid, performant microservices. Additionally, I hold extensive production experience across TypeScript, Node.js (Express, NestJS), Vue.js (NuxtJS), PHP (Laravel), and robust database systems including MySQL, MongoDB, and PostgreSQL.",
  },
  {
    question: "Do you design specialized database or geospatial architectures?",
    answer:
      "Yes. Beyond standard relational and NoSQL querying in MySQL and MongoDB, I engineer complex data structures using PostgreSQL. This includes building advanced spatiotemporal networks and high-performance location tracking systems using specialized spatial database extensions like PostGIS and MobilityDB.",
  },
  {
    question: "What kind of communications and advanced features can you implement?",
    answer:
      "I have a proven record of shipping real-time communications architecture, including end-to-end live chat networks and fully integrated video meeting platforms. Furthermore, I implement custom GenAI features, automated LLM content pipelines (such as ChatGPT integrations), interactive spatial map routing via Google Maps, and dedicated utility microservices like ImgoTool—an image processor utilizing the rembg library for background removal and automated asset compression.",
  },
  {
    question: "What are your core cloud deployment and DevOps capabilities?",
    answer:
      "I manage the entire infrastructure lifecycle. This includes deploying scalable web applications on AWS, containerizing environments via Docker, configuring Nginx web servers, and building automated CI/CD pipelines. My core server management workflow is grounded in Linux VPS setups and secure, audited environments optimized using Kali Linux.",
  },
  {
    question: "How do you approach web optimization and technical SEO?",
    answer:
      "Performance and search discoverability are built directly into my development lifecycle. I focus heavily on technical SEO and code optimization to engineer web architectures targeting a perfect 100/100 Lighthouse performance profile, clean Core Web Vitals, and excellent domain health metrics tracked via platforms like Ahrefs and Moz.",
  },
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
                {faqsExperience.map((faq, index) => {
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