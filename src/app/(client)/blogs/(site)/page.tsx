


import { HelpCircle } from 'lucide-react';
import BlogsSection from '@/components/client/BlogsSection';

const blogsFaqs = [
  {
    question: "What topics are covered on this blog?",
    answer: "I cover full-stack software development, cloud infrastructure design, FastAPI performance optimizations, Next.js page builders, Supabase integrations, and real-world DevOps workflows."
  },
  {
    question: "How frequently are new technical articles published?",
    answer: "New deep dives, tutorials, and system design patterns are published regularly as I explore new web technologies and solve production-level engineering challenges."
  },
  {
    question: "Can I implement these code examples in production?",
    answer: "Yes. All architectural designs, code samples, and schema templates shared in these articles are extracted from production-grade implementations and optimized for real-world application."
  }
];

export default async function BlogsPage() {

  return (
    <main className="">
      <div className='pb-10 pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900'>
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineering Insights & <span className="text-indigo-600">Guides</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Deep dives into modern web engineering, AWS cloud architecture, scalable backends, and full-stack performance tuning.
          </p>
        </div>

        {/* BLOG CARDS GRID SECTION */}
        <BlogsSection />
      </div>


      {/* FAQ SECTION */}
      <div className='bg-slate-100 pb-15 pt-5'>
        <div className="mx-5 sm:mx-7 my-10 pt-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-2 text-indigo-600">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>

            <div className="grid gap-4">
              {blogsFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-2 hover:border-slate-300 hover:shadow-sm transition"
                >
                  <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}