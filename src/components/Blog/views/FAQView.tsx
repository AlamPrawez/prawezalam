import React from 'react';
import { PageSectionItem } from '../types';
import { getThemeClass, getPaddingClass } from '../utils';
import { HelpCircle } from 'lucide-react';

export const FAQView: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  const faqs =  sec?.faqList ?? [
    { question: 'What stack do you use?', answer: 'We build using FastAPI, Next.js, PostgreSQL, and Tailwind CSS.' },
    { question: 'How fast is deployment?', answer: 'Standard projects go live within 2 to 4 weeks.' },
  ];

  return (
    <div className={`${getPaddingClass(sec.paddingSize)} ${getThemeClass(sec.bgTheme)} max-w-4xl mx-auto space-y-8`}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">{sec.title || 'Frequently Asked Questions'}</h2>
        <p className="text-sm opacity-80">{sec.subtitle}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> {item.question}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};