import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import {
  Calendar,
  Eye,
  ChevronRight,
  ArrowLeft,
  User,
  Clock,
} from 'lucide-react';
import 'highlight.js/styles/vs2015.css';

import { JsonLd } from '@/components/seo/JsonLd';
import { cmsBlog } from '@/services/api/endpoints';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type BgTheme = 'dark' | 'indigo' | 'slate' | 'light';

const themeStyles: Record<
  BgTheme,
  {
    pageBg: string;
    border: string;
    heroBg: string;
    textProse: string;
    accentGlow: string;
    subtext: string;
  }
> = {
  dark: {
    pageBg: 'bg-neutral-950 text-neutral-100',
    border: 'border-neutral-800',
    heroBg: 'bg-neutral-900/80',
    textProse: 'prose-invert',
    accentGlow: 'from-neutral-900/30 to-transparent',
    subtext: 'text-neutral-400',
  },
  slate: {
    pageBg: 'bg-slate-950 text-slate-100',
    border: 'border-slate-800',
    heroBg: 'bg-slate-900/80',
    textProse: 'prose-invert',
    accentGlow: 'from-slate-900/30 to-transparent',
    subtext: 'text-slate-400',
  },
  indigo: {
    pageBg: 'bg-slate-950 text-slate-100',
    border: 'border-indigo-900/40',
    heroBg: 'bg-indigo-950/40',
    textProse: 'prose-invert',
    accentGlow: 'from-indigo-600/15 to-transparent',
    subtext: 'text-indigo-200/70',
  },
  light: {
    pageBg: 'bg-white text-slate-900',
    border: 'border-slate-200/80',
    heroBg: 'bg-slate-50/80 shadow-sm',
    textProse: 'prose-slate',
    accentGlow: 'from-slate-200/40 to-transparent',
    subtext: 'text-slate-600',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blogData = await cmsBlog.getBlogBySlug(slug);

    if (!blogData || blogData.status?.toLowerCase() !== 'published') {
      return {
        title: 'Blog Post Not Found',
      };
    }

    const details = Array.isArray(blogData.cms_blogs_details)
      ? blogData.cms_blogs_details[0] || {}
      : blogData.cms_blogs_details || {};

    const seo = blogData.seo || details.seo || {};
    const baseUrl = 'https://prawez.com';
    const canonicalUrl = seo.canonicalUrl || `${baseUrl}/blogs/${slug}`;

    return {
      title: seo.title || blogData.title,
      description:
        seo.description ||
        `Read "${blogData.title}" on Er. Prawez Alam's engineering blog covering web architecture and cloud solutions.`,
      keywords: seo.keywords
        ? Array.isArray(seo.keywords)
          ? seo.keywords
          : seo.keywords.split(',').map((k: string) => k.trim())
        : [],
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seo.title || blogData.title,
        description: seo.description || undefined,
        url: canonicalUrl,
        siteName: 'Er. Prawez Alam Blog',
        images: seo.ogImage
          ? [
            {
              url: seo.ogImage,
              alt: seo.ogImageAlt || seo.title || blogData.title,
            },
          ]
          : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.title || blogData.title,
        description: seo.description || undefined,
        images: seo.ogImage ? [seo.ogImage] : [],
      },
    };
  } catch (error) {
    console.error('Blog metadata generation error:', error);
    return {
      title: 'Blog Post Details',
    };
  }
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  let blogData: any = null;

  try {
    blogData = await cmsBlog.getBlogBySlug(slug);
  } catch (error) {
    console.error('Error fetching blog page:', error);
  }

  if (!blogData || blogData.status?.toLowerCase() !== 'published') {
    notFound();
  }

  const details = Array.isArray(blogData.cms_blogs_details)
    ? blogData.cms_blogs_details[0] || {}
    : blogData.cms_blogs_details || {};

  const seo = blogData.seo || details.seo || {};
  const sections: any[] = details.sections || [];

  const rawTheme = (details.bg_theme || details.bgTheme || 'slate').toLowerCase();
  const bgThemeKey: BgTheme = ['dark', 'indigo', 'slate', 'light'].includes(rawTheme)
    ? (rawTheme as BgTheme)
    : 'slate';

  const theme = themeStyles[bgThemeKey];

  const authorName = blogData.author_name || blogData.authorName || 'Er. Prawez Alam';
  const authorRole = blogData.author_role || blogData.authorRole || 'Software Engineer';
  const publishDate = blogData.publish_date || blogData.publishDate || (blogData.created_at ? new Date(blogData.created_at).toLocaleDateString() : null);
  const readTime = blogData.read_time || blogData.readTime;
  const ogImage = seo.ogImage || blogData.ogImage;

  return (
    <div className={`min-h-screen transition-colors duration-300 pt-10 ${theme.pageBg}`}>
      <JsonLd seo={seo} faqs={details?.faqs} />

      <div className={`fixed inset-0 bg-gradient-to-b ${theme.accentGlow} pointer-events-none -z-10`} />

      <article className="break-words [overflow-wrap:break-word] [word-break:normal]">
        <div className={`relative overflow-hidden font-sans transition-colors duration-500 border-b ${
          bgThemeKey === 'light' 
            ? 'bg-gradient-to-b from-slate-100 via-slate-50 to-white border-slate-200/80' 
            : bgThemeKey === 'indigo'
            ? 'bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950 border-indigo-900/40'
            : bgThemeKey === 'dark'
            ? 'bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 border-slate-800/80'
            : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-slate-800/80'
        }`}>
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full blur-[120px] opacity-35 transition-all duration-700 ${
                bgThemeKey === 'indigo'
                  ? 'bg-indigo-600'
                  : bgThemeKey === 'dark'
                  ? 'bg-purple-600'
                  : bgThemeKey === 'light'
                  ? 'bg-indigo-400'
                  : 'bg-cyan-600'
              }`} 
            />
          </div>

          <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs font-semibold mb-8">
              <Link 
                href="/blogs" 
                className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
                  bgThemeKey === 'light' 
                    ? 'bg-white/80 hover:bg-white border-slate-300/80 text-slate-700 hover:text-indigo-600 shadow-slate-200/50' 
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/60 text-slate-300 hover:text-white shadow-black/40'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-indigo-500 group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span>Back to Blogs</span>
              </Link>
              <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${theme.subtext}`} />
              <span className={`truncate max-w-[180px] sm:max-w-xs ${theme.subtext} font-normal opacity-80`}>
                {blogData.title}
              </span>
            </nav>

            <header className="space-y-8">
              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] break-words ${
                bgThemeKey === 'light' 
                  ? 'text-slate-900' 
                  : 'bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent'
              }`}>
                {blogData.title}
              </h1>

              <div className={`flex flex-wrap items-center justify-between gap-4 text-xs font-medium pt-6 border-t ${
                bgThemeKey === 'light' ? 'border-slate-200/80' : 'border-slate-800/80'
              }`}>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-colors ${
                    bgThemeKey === 'light'
                      ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
                      : 'bg-slate-900/90 border-slate-800 text-slate-200'
                  }`}>
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] ring-1 ring-indigo-500/30">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">{authorName}</span>
                      {authorRole && <span className="opacity-60 text-[11px]">({authorRole})</span>}
                    </div>
                  </div>

                  {publishDate && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md ${
                      bgThemeKey === 'light'
                        ? 'bg-white/70 border-slate-200 text-slate-600'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                    }`}>
                      <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{publishDate}</span>
                    </div>
                  )}

                  {readTime && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md ${
                      bgThemeKey === 'light'
                        ? 'bg-white/70 border-slate-200 text-slate-600'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                    }`}>
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{readTime}</span>
                    </div>
                  )}
                </div>

                <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-semibold backdrop-blur-md transition-colors ${
                  bgThemeKey === 'light'
                    ? 'bg-cyan-50/80 border-cyan-200 text-cyan-800 shadow-sm'
                    : 'bg-cyan-950/50 border-cyan-800/50 text-cyan-400'
                }`}>
                  <Eye className="w-3.5 h-3.5 opacity-80 shrink-0" />
                  <span>{(blogData.views_count || 10).toLocaleString()} views</span>
                </div>
              </div>

              {ogImage && (
                <div className="relative pt-2 group">
                  <div className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
                    bgThemeKey === 'light'
                      ? 'border-slate-200 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl'
                      : 'border-slate-800 shadow-2xl shadow-black/80 group-hover:border-indigo-500/30'
                  }`}>
                    <img
                      src={ogImage}
                      alt={seo.ogImageAlt || blogData.title}
                      className="w-full max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              )}
            </header>
          </div>
        </div>

        <main className="">
          {sections.length === 0 ? (
            <div className={`p-12 text-center opacity-60 ${theme.heroBg} rounded-3xl border ${theme.border}`}>
              <p className="text-sm">No content sections available for this article.</p>
            </div>
          ) : (
            sections.map((section: any, idx: number) => {
              const cleanHtml = section.html ? DOMPurify.sanitize(section.html) : '';

              return (
                <section key={section.id || idx} className={`prose ${theme.textProse} max-w-none break-words [overflow-wrap:break-word] [word-break:normal]`}>
                  {cleanHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                  ) : (
                    <div className={`p-5 ${theme.heroBg} border ${theme.border} rounded-2xl`}>
                      {JSON.stringify(section.content || section)}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </main>
      </article>
    </div>
  );
}

// import React from 'react';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import DOMPurify from 'isomorphic-dompurify';
// import {
//   Calendar,
//   Eye,
//   ChevronRight,
//   ArrowLeft,
//   User,
//   Clock,
// } from 'lucide-react';
// // import hljs from 'highlight.js';
// import 'highlight.js/styles/vs2015.css';

// import { JsonLd } from '@/components/seo/JsonLd';
// import { cmsBlog } from '@/services/api/endpoints';


// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// type BgTheme = 'dark' | 'indigo' | 'slate' | 'light';

// /**
//  * Mapped theme configurations supporting 'dark' | 'indigo' | 'slate' | 'light'
//  */
// const themeStyles: Record<
//   BgTheme,
//   {
//     pageBg: string;
//     border: string;
//     heroBg: string;
//     textProse: string;
//     accentGlow: string;
//     subtext: string;
//   }
// > = {
//   dark: {
//     pageBg: 'bg-neutral-950 text-neutral-100',
//     border: 'border-neutral-800',
//     heroBg: 'bg-neutral-900/80',
//     textProse: 'prose-invert',
//     accentGlow: 'from-neutral-900/30 to-transparent',
//     subtext: 'text-neutral-400',
//   },
//   slate: {
//     pageBg: 'bg-slate-950 text-slate-100',
//     border: 'border-slate-800',
//     heroBg: 'bg-slate-900/80',
//     textProse: 'prose-invert',
//     accentGlow: 'from-slate-900/30 to-transparent',
//     subtext: 'text-slate-400',
//   },
//   indigo: {
//     pageBg: 'bg-slate-950 text-slate-100',
//     border: 'border-indigo-900/40',
//     heroBg: 'bg-indigo-950/40',
//     textProse: 'prose-invert',
//     accentGlow: 'from-indigo-600/15 to-transparent',
//     subtext: 'text-indigo-200/70',
//   },
//   light: {
//     pageBg: 'bg-white text-slate-900',
//     border: 'border-slate-200/80',
//     heroBg: 'bg-slate-50/80 shadow-sm',
//     textProse: 'prose-slate',
//     accentGlow: 'from-slate-200/40 to-transparent',
//     subtext: 'text-slate-600',
//   },
// };

// /**
//  * 1. DYNAMIC METADATA GENERATION FOR BLOG SEO
//  */
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;

//   try {
//     const blogData = await cmsBlog.getBlogBySlug(slug);

//     if (!blogData || blogData.status?.toLowerCase() !== 'published') {
//       return {
//         title: 'Blog Post Not Found',
//       };
//     }

//     const details = Array.isArray(blogData.cms_blogs_details)
//       ? blogData.cms_blogs_details[0] || {}
//       : blogData.cms_blogs_details || {};

//     const seo = blogData.seo || details.seo || {};
//     const baseUrl = 'https://prawez.com';
//     const canonicalUrl = seo.canonicalUrl || `${baseUrl}/blogs/${slug}`;

//     return {
//       title: seo.title || blogData.title,
//       description:
//         seo.description ||
//         `Read "${blogData.title}" on Er. Prawez Alam's engineering blog covering web architecture and cloud solutions.`,
//       keywords: seo.keywords
//         ? Array.isArray(seo.keywords)
//           ? seo.keywords
//           : seo.keywords.split(',').map((k: string) => k.trim())
//         : [],
//       alternates: {
//         canonical: canonicalUrl,
//       },
//       openGraph: {
//         title: seo.title || blogData.title,
//         description: seo.description || undefined,
//         url: canonicalUrl,
//         siteName: 'Er. Prawez Alam Blog',
//         images: seo.ogImage
//           ? [
//             {
//               url: seo.ogImage,
//               alt: seo.ogImageAlt || seo.title || blogData.title,
//             },
//           ]
//           : [],
//         type: 'article',
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: seo.title || blogData.title,
//         description: seo.description || undefined,
//         images: seo.ogImage ? [seo.ogImage] : [],
//       },
//     };
//   } catch (error) {
//     console.error('Blog metadata generation error:', error);
//     return {
//       title: 'Blog Post Details',
//     };
//   }
// }

// /**
//  * 2. DYNAMIC BLOG DETAILS PAGE COMPONENT
//  */
// export default async function BlogDetailsPage({ params }: PageProps) {
//   const { slug } = await params;

//   let blogData: any = null;

//   try {
//     blogData = await cmsBlog.getBlogBySlug(slug);
//   } catch (error) {
//     console.error('Error fetching blog page:', error);
//   }

//   // Guard: Return 404 if blog doesn't exist or isn't published
//   if (!blogData || blogData.status?.toLowerCase() !== 'published') {
//     notFound();
//   }

//   // Handle both Object and Array structures for cms_blogs_details
//   const details = Array.isArray(blogData.cms_blogs_details)
//     ? blogData.cms_blogs_details[0] || {}
//     : blogData.cms_blogs_details || {};

//   const seo = blogData.seo || details.seo || {};
//   const sections: any[] = details.sections || [];

//   // Parse bg_theme / bgTheme dynamically with 'slate' fallback
//   const rawTheme = (details.bg_theme || details.bgTheme || 'slate').toLowerCase();
//   const bgThemeKey: BgTheme = ['dark', 'indigo', 'slate', 'light'].includes(rawTheme)
//     ? (rawTheme as BgTheme)
//     : 'slate';

//   const theme = themeStyles[bgThemeKey];

//   // Extract author & publish details (supporting snake_case and camelCase)
//   const authorName = blogData.author_name || blogData.authorName || 'Er. Prawez Alam';
//   const authorRole = blogData.author_role || blogData.authorRole || 'Software Engineer';
//   const publishDate = blogData.publish_date || blogData.publishDate || (blogData.created_at ? new Date(blogData.created_at).toLocaleDateString() : null);
//   const readTime = blogData.read_time || blogData.readTime;
//   const ogImage = seo.ogImage || blogData.ogImage;

//   return (
//     <div className={`min-h-screen transition-colors duration-300 pt-10 ${theme.pageBg}`}>
//       <JsonLd seo={seo} faqs={details?.faqs} />

//       {/* AMBIENT BACKGROUND GLOW */}
//       <div className={`fixed inset-0 bg-gradient-to-b ${theme.accentGlow} pointer-events-none -z-10`} />

//       <article className="">
//         {/* BREADCRUMB & HEADER CONTAINER - MATCHABLE & EYE-ATTRACTIVE */}
// <div className={`relative overflow-hidden font-sans transition-colors duration-500 border-b ${
//   bgThemeKey === 'light' 
//     ? 'bg-gradient-to-b from-slate-100 via-slate-50 to-white border-slate-200/80' 
//     : bgThemeKey === 'indigo'
//     ? 'bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950 border-indigo-900/40'
//     : bgThemeKey === 'dark'
//     ? 'bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 border-slate-800/80'
//     : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-slate-800/80' // slate
// }`}>
  
//   {/* THEME-MATCHED AMBIENT GLOW BACKDROP */}
//   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//     <div 
//       className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full blur-[120px] opacity-35 transition-all duration-700 ${
//         bgThemeKey === 'indigo'
//           ? 'bg-indigo-600'
//           : bgThemeKey === 'dark'
//           ? 'bg-purple-600'
//           : bgThemeKey === 'light'
//           ? 'bg-indigo-400'
//           : 'bg-cyan-600'
//       }`} 
//     />
//   </div>

//   <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    
//     {/* BREADCRUMB NAVIGATION */}
//     <nav className="flex items-center gap-2 text-xs font-semibold mb-8">
//       <Link 
//         href="/blogs" 
//         className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
//           bgThemeKey === 'light' 
//             ? 'bg-white/80 hover:bg-white border-slate-300/80 text-slate-700 hover:text-indigo-600 shadow-slate-200/50' 
//             : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/60 text-slate-300 hover:text-white shadow-black/40'
//         }`}
//       >
//         <ArrowLeft className="w-3.5 h-3.5 text-indigo-500 group-hover:-translate-x-0.5 transition-transform duration-200" />
//         <span>Back to Blogs</span>
//       </Link>
//       <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${theme.subtext}`} />
//       <span className={`truncate max-w-[180px] sm:max-w-xs ${theme.subtext} font-normal opacity-80`}>
//         {blogData.title}
//       </span>
//     </nav>

//     {/* HEADER SECTION */}
//     <header className="space-y-8">
      
//       {/* ARTICLE TITLE */}
//       <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] ${
//         bgThemeKey === 'light' 
//           ? 'text-slate-900' 
//           : 'bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent'
//       }`}>
//         {blogData.title}
//       </h1>

//       {/* AUTHOR & METADATA BADGES BAR */}
//       <div className={`flex flex-wrap items-center justify-between gap-4 text-xs font-medium pt-6 border-t ${
//         bgThemeKey === 'light' ? 'border-slate-200/80' : 'border-slate-800/80'
//       }`}>
//         <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          
//           {/* AUTHOR BADGE */}
//           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-colors ${
//             bgThemeKey === 'light'
//               ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
//               : 'bg-slate-900/90 border-slate-800 text-slate-200'
//           }`}>
//             <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] ring-1 ring-indigo-500/30">
//               <User className="w-3.5 h-3.5 text-indigo-400" />
//             </div>
//             <div className="flex items-center gap-1.5">
//               <span className="font-bold">{authorName}</span>
//               {authorRole && <span className="opacity-60 text-[11px]">({authorRole})</span>}
//             </div>
//           </div>

//           {/* POST DATE */}
//           {publishDate && (
//             <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md ${
//               bgThemeKey === 'light'
//                 ? 'bg-white/70 border-slate-200 text-slate-600'
//                 : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
//             }`}>
//               <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
//               <span>{publishDate}</span>
//             </div>
//           )}

//           {/* READ TIME */}
//           {readTime && (
//             <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md ${
//               bgThemeKey === 'light'
//                 ? 'bg-white/70 border-slate-200 text-slate-600'
//                 : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
//             }`}>
//               <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
//               <span>{readTime}</span>
//             </div>
//           )}
//         </div>

//         {/* VIEWS COUNT BADGE */}
//         <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-semibold backdrop-blur-md transition-colors ${
//           bgThemeKey === 'light'
//             ? 'bg-cyan-50/80 border-cyan-200 text-cyan-800 shadow-sm'
//             : 'bg-cyan-950/50 border-cyan-800/50 text-cyan-400'
//         }`}>
//           <Eye className="w-3.5 h-3.5 opacity-80 shrink-0" />
//           <span>{(blogData.views_count || 10).toLocaleString()} views</span>
//         </div>
//       </div>

//       {/* FEATURED / OG IMAGE CONTAINER */}
//       {ogImage && (
//         <div className="relative pt-2 group">
//           <div className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
//             bgThemeKey === 'light'
//               ? 'border-slate-200 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl'
//               : 'border-slate-800 shadow-2xl shadow-black/80 group-hover:border-indigo-500/30'
//           }`}>
//             <img
//               src={ogImage}
//               alt={seo.ogImageAlt || blogData.title}
//               className="w-full max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.015]"
//             />
//           </div>
//         </div>
//       )}

//     </header>
//   </div>
// </div>
//         {/* DYNAMIC CANVAS SECTIONS CONTENT */}
//         <main className="">
//           {sections.length === 0 ? (
//             <div className={`p-12 text-center opacity-60 ${theme.heroBg} rounded-3xl border ${theme.border}`}>
//               <p className="text-sm">No content sections available for this article.</p>
//             </div>
//           ) : (
//             sections.map((section: any, idx: number) => {
//               const cleanHtml = section.html ? DOMPurify.sanitize(section.html) : '';

//               return (
//                 <section key={section.id || idx} className={`prose ${theme.textProse} max-w-none`}>
//                   {cleanHtml ? (
//                     <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
//                   ) : (
//                     <div className={`p-5 ${theme.heroBg} border ${theme.border} rounded-2xl`}>
//                       {JSON.stringify(section.content || section)}
//                     </div>
//                   )}
//                 </section>
//               );
//             })
//           )}
//         </main>
//       </article>
//     </div>
//   );
// }