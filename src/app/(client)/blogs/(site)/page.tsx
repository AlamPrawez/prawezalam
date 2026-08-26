
import Link from 'next/link';

import { Calendar, Eye, ArrowRight, HelpCircle } from 'lucide-react';
import { cmsBlog } from '@/services/api/endpoints';

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
  // Fetch published blog cards directly using your repository
  const blogs = await cmsBlog.fetchBlogsList().catch((err) => {
    console.error("Failed to load blog list for client page:", err);
    return [];
  });

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
      <section id="blogs" className="mb-20">
        {blogs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 text-slate-500">
            <p className="text-lg font-semibold text-slate-700">No articles published yet.</p>
            <p className="text-xs text-slate-500 mt-1">Check back soon for new technical write-ups and tutorials!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col justify-between bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="space-y-4">
                  {/* OPTIONAL OG IMAGE COVER */}
                  {blog.seo?.ogImage && (
                    <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl border-b border-slate-100 bg-slate-50">
                      <img
                        src={blog.seo.ogImage}
                        alt={blog.seo?.ogImageAlt || blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* METADATA BAR */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{new Date(blog.updated_at || blog.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-1 text-cyan-600 font-medium">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{(blog.views_count || 10).toLocaleString()} views</span>
                    </div>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* DESCRIPTION PREVIEW FROM SEO IF AVAILABLE */}
                  {blog.seo?.description && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.seo.description}
                    </p>
                  )}
                </div>

                {/* READ ARTICLE ACTION BUTTON */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
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