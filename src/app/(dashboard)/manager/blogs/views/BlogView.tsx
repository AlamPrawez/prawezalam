'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, User, Link as LinkIcon, Unlink, Settings2, ExternalLink, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import type { BlogLayoutStyle, PageSectionItem } from '../types';
import { RichEditableText } from '../editor/RichEditableText';
import { EditableBlogImage } from '../editor/EditableBlogImage';
// import { uploadWebpToSupabase } from '@/lib/supabase'; // Adjust path if needed

type OnChange = (patch: Partial<PageSectionItem>) => void;


export const BLOG_VARIANTS: { value: BlogLayoutStyle; label: string; description: string }[] = [
  {
    value: 'editorial',
    label: 'Editorial Centered',
    description: 'Classic centered hero article with metadata header.',
  },
  {
    value: 'minimal-split',
    label: 'Minimal Split',
    description: 'Modern 2-column layout with side thumbnail.',
  },
  {
    value: 'card-magazine',
    label: 'Card Magazine',
    description: 'Elevated publication layout inside a framed card.',
  },
];


// Factory function supporting layout variants
export function makeBlankBlog(layoutStyle: BlogLayoutStyle = 'editorial'): PageSectionItem {
  return {
    id: `sec-${Date.now()}`,
    type: 'blog',
    layoutStyle,
    bgTheme: 'dark',
    paddingSize: 'md',
    title: 'Building Modern Web Applications at Scale',
    subtitle:
      'When designing web applications for modern users, speed and responsiveness are non-negotiable. Modern full-stack architectures prioritize clean separations between frontend UI layers and high-throughput async API gateways.',
    authorName: 'Alex River',
    authorRole: 'Full-Stack Architect',
    publishDate: 'Aug 24, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  };
}


// Common Metadata Toolbar
const BlogMetadataHeader: React.FC<{
  sec: PageSectionItem;
  onUpdate: (patch: Partial<PageSectionItem>) => void;
}> = ({ sec, onUpdate }) => (
  <div className="flex flex-wrap items-center gap-4 text-xs opacity-75 border-b border-slate-800/80 pb-4 mb-4">
    <div className="flex items-center gap-1.5">
      <User className="w-3.5 h-3.5 text-indigo-400" />
      <RichEditableText
        value={sec.authorName || 'Alex River'}
        onCommit={(v) => onUpdate({ authorName: v })}
        placeholder="Author..."
        className="font-medium"
      />
      <span>•</span>
      <RichEditableText
        value={sec.authorRole || 'Lead Engineer'}
        onCommit={(v) => onUpdate({ authorRole: v })}
        placeholder="Role..."
      />
    </div>

    <div className="flex items-center gap-1.5">
      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
      <RichEditableText
        value={sec.publishDate || 'Aug 24, 2026'}
        onCommit={(v) => onUpdate({ publishDate: v })}
        placeholder="Date..."
      />
    </div>

    <div className="flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5 text-indigo-400" />
      <RichEditableText
        value={sec.readTime || '5 min read'}
        onCommit={(v) => onUpdate({ readTime: v })}
        placeholder="Read time..."
      />
    </div>
  </div>
);

// VARIANT 1: Editorial Centered (Default)
const EditorialBlogView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
  <div className="space-y-8">
    <div className="space-y-4">
      <BlogMetadataHeader sec={sec} onUpdate={onUpdate} />
      <RichEditableText
        value={sec.title || ''}
        onCommit={(v) => onUpdate({ title: v })}
        placeholder="Blog Title..."
        className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white"
      />
    </div>

    <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900">
      <EditableBlogImage
        src={sec.imageUrl}
        alt={sec.imageAlt || sec.title}
        imageLinkUrl={sec.imageLinkUrl}
        className="w-full h-64 sm:h-96 object-cover"
        onUpdate={onUpdate}
      />
    </div>

    <div className="prose max-w-none text-sm sm:text-base leading-relaxed opacity-90">
      <RichEditableText
        value={sec.subtitle || ''}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Write body paragraphs..."
        className="min-h-[160px]"
      />
    </div>
  </div>
);

// VARIANT 2: Minimal Split Hero Layout
const MinimalSplitBlogView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-8">
      <div className="md:col-span-7 space-y-4">
        <BlogMetadataHeader sec={sec} onUpdate={onUpdate} />
        <RichEditableText
          value={sec.title || ''}
          onCommit={(v) => onUpdate({ title: v })}
          placeholder="Blog Title..."
          className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white"
        />
      </div>
      <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
        <EditableBlogImage
          src={sec.imageUrl}
          alt={sec.imageAlt || sec.title}
          imageLinkUrl={sec.imageLinkUrl}
          className="w-full h-56 md:h-64 object-cover"
          onUpdate={onUpdate}
        />
      </div>
    </div>

    <div className="prose max-w-none text-sm sm:text-base leading-relaxed opacity-90">
      <RichEditableText
        value={sec.subtitle || ''}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Write body content here..."
        className="min-h-[160px]"
      />
    </div>
  </div>
);

// VARIANT 3: Card Magazine Layout
const CardMagazineBlogView: React.FC<{ sec: PageSectionItem; onUpdate: (patch: Partial<PageSectionItem>) => void }> = ({ sec, onUpdate }) => (
  <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
    <div className="rounded-2xl overflow-hidden border border-slate-800/80">
      <EditableBlogImage
        src={sec.imageUrl}
        alt={sec.imageAlt || sec.title}
        imageLinkUrl={sec.imageLinkUrl}
        className="w-full h-64 sm:h-80 object-cover"
        onUpdate={onUpdate}
      />
    </div>

    <BlogMetadataHeader sec={sec} onUpdate={onUpdate} />

    <RichEditableText
      value={sec.title || ''}
      onCommit={(v) => onUpdate({ title: v })}
      placeholder="Blog Title..."
      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
    />

    <div className="prose max-w-none text-sm sm:text-base leading-relaxed opacity-90">
      <RichEditableText
        value={sec.subtitle || ''}
        onCommit={(v) => onUpdate({ subtitle: v })}
        placeholder="Article excerpt or content..."
        className="min-h-[140px]"
      />
    </div>
  </div>
);

// Main Master Component
export const BlogView: React.FC<{
  sec: PageSectionItem;
  onChange?: OnChange;
}> = ({ sec, onChange }) => {
  const handleUpdate = (patch: Partial<PageSectionItem>) => {
    if (onChange) onChange(patch);
  };

  const paddingClass =
    sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

  const themeClass =
    sec.bgTheme === 'indigo'
      ? 'bg-indigo-950 text-white'
      : sec.bgTheme === 'light'
      ? 'bg-slate-100 text-slate-900'
      : 'bg-slate-950 text-white';

  return (
    <article className={`mx-auto ${paddingClass} ${themeClass}`}>
      {sec.layoutStyle === 'minimal-split' && (
        <MinimalSplitBlogView sec={sec} onUpdate={handleUpdate} />
      )}
      {sec.layoutStyle === 'card-magazine' && (
        <CardMagazineBlogView sec={sec} onUpdate={handleUpdate} />
      )}
      {(!sec.layoutStyle || sec.layoutStyle === 'editorial') && (
        <EditorialBlogView sec={sec} onUpdate={handleUpdate} />
      )}
    </article>
  );
};

export function BlogLayoutThumbnail({ layoutStyle = 'editorial' }: { layoutStyle?: BlogLayoutStyle }) {
  const sampleBlog = makeBlankBlog(layoutStyle);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
      <div
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{
          width: '1280px',
          transform: 'scale(0.235)',
          transformOrigin: 'top left',
        }}
      >
        <BlogView sec={sampleBlog} onChange={() => {}} />
      </div>
    </div>
  );
}




























// Inline Dynamic Rich-Text Editor Component
// const RichEditableText: React.FC<{
//   html: string;
//   onCommit: (nextHtml: string) => void;
//   className?: string;
//   placeholder?: string;
// }> = ({ html, onCommit, className = '', placeholder = 'Click to write content...' }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('https://');
//   const savedSelection = useRef<Range | null>(null);

//   useEffect(() => {
//     if (ref.current && ref.current.innerHTML !== html) {
//       ref.current.innerHTML = html;
//     }
//   }, [html]);

//   const saveSelection = () => {
//     const sel = window.getSelection();
//     if (sel && sel.rangeCount > 0) {
//       savedSelection.current = sel.getRangeAt(0).cloneRange();
//     }
//   };

//   const restoreSelection = () => {
//     if (savedSelection.current) {
//       const sel = window.getSelection();
//       if (sel) {
//         sel.removeAllRanges();
//         sel.addRange(savedSelection.current);
//       }
//     }
//   };

//   const handleApplyLink = () => {
//     restoreSelection();
//     if (linkUrl.trim()) {
//       document.execCommand('createLink', false, linkUrl.trim());
//     }
//     setShowLinkModal(false);
//     if (ref.current) onCommit(ref.current.innerHTML);
//   };

//   const handleUnlink = () => {
//     restoreSelection();
//     document.execCommand('unlink', false);
//     if (ref.current) onCommit(ref.current.innerHTML);
//   };

//   return (
//     <div className="relative group/editor">
//       <div className="sticky top-2 z-30 mb-2 hidden group-focus-within/editor:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl max-w-max text-xs" data-editor-only>
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             saveSelection();
//             setShowLinkModal(true);
//           }}
//           className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
//         >
//           <LinkIcon className="w-3.5 h-3.5 text-indigo-400" /> Insert Link
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             saveSelection();
//             handleUnlink();
//           }}
//           className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
//         >
//           <Unlink className="w-3.5 h-3.5 text-red-400" /> Remove Link
//         </button>
//       </div>

//       {showLinkModal && (
//         <div className="absolute top-10 left-0 z-40 bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl space-y-3 w-80" data-editor-only>
//           <div className="flex justify-between items-center text-xs font-bold text-slate-200">
//             <span>Insert Link</span>
//             <button type="button" onClick={() => setShowLinkModal(false)}>
//               <X className="w-4 h-4 text-slate-400 hover:text-white" />
//             </button>
//           </div>
//           <input
//             type="text"
//             value={linkUrl}
//             onChange={(e) => setLinkUrl(e.target.value)}
//             placeholder="https://example.com"
//             className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none focus:border-indigo-500"
//           />
//           <button
//             type="button"
//             onClick={handleApplyLink}
//             className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition"
//           >
//             Apply Link
//           </button>
//         </div>
//       )}

//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onBlur={(e) => onCommit(e.currentTarget.innerHTML)}
//         data-placeholder={placeholder}
//         className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//       />
//     </div>
//   );
// };

// // Dropdown Image Configurator Component with WebP Supabase Upload
// const EditableBlogImage: React.FC<{
//   src?: string;
//   alt?: string;
//   imageLinkUrl?: string;
//   className?: string;
//   onUpdate: (patch: { imageUrl?: string; imageAlt?: string; imageLinkUrl?: string }) => void;
// }> = ({ src, alt = 'Blog cover', imageLinkUrl, className = '', onUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [urlInput, setUrlInput] = useState(src || '');
//   const [altInput, setAltInput] = useState(alt || '');
//   const [linkInput, setLinkInput] = useState(imageLinkUrl || '');
  
//   const menuRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useOnClickOutside(menuRef, () => setIsOpen(false));

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setIsUploading(true);
//       const publicUrl = await uploadWebpToSupabase(file, undefined, 'blog');
//       setUrlInput(publicUrl);
//       onUpdate({ imageUrl: publicUrl });
//       setIsOpen(false);
//     } catch (err) {
//       console.error('Failed to upload image to Supabase:', err);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const renderImageContent = () => (
//     <img
//       src={src || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'}
//       alt={alt}
//       className={className}
//     />
//   );

//   return (
//     <div ref={menuRef} className="relative group/image w-full overflow-visible">
//       {src ? (
//         imageLinkUrl ? (
//           <a href={imageLinkUrl} target="_blank" rel="noopener noreferrer" className="block relative">
//             {renderImageContent()}
//             <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-400 border border-slate-800 flex items-center gap-1 z-10">
//               <ExternalLink className="w-3 h-3" /> Linked Image
//             </span>
//           </a>
//         ) : (
//           renderImageContent()
//         )
//       ) : (
//         <div className="w-full h-56 bg-slate-900/60 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-xs p-6 space-y-3">
//           <ImageIcon className="w-8 h-8 text-slate-600" />
//           <span>No cover image selected</span>
//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition"
//           >
//             Upload or Set Image
//           </button>
//         </div>
//       )}

//       {/* Floating Settings Button */}
//       {src && (
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 text-white border border-slate-800 text-xs font-semibold shadow-lg backdrop-blur hover:bg-slate-800 opacity-0 group-hover/image:opacity-100 transition z-20 flex items-center gap-1.5"
//           data-editor-only
//         >
//           <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
//           <span>Image Settings</span>
//         </button>
//       )}

//       {/* Dropdown Menu (Replaces Modal Overlay) */}
//       {isOpen && (
//         <div className="absolute top-12 right-2 z-50 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 space-y-4 text-slate-200 text-xs" data-editor-only>
//           <div className="font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center justify-between">
//             <span>Blog Image Settings</span>
//             <button type="button" onClick={() => setIsOpen(false)}>
//               <X className="w-4 h-4 text-slate-400 hover:text-white" />
//             </button>
//           </div>

//           <div className="space-y-3">
//             <div>
//               <label className="block text-[11px] text-slate-400 font-medium mb-1">Source Image URL</label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={urlInput}
//                   onChange={(e) => setUrlInput(e.target.value)}
//                   placeholder="https://..."
//                   className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onUpdate({ imageUrl: urlInput });
//                     setIsOpen(false);
//                   }}
//                   className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl shrink-0"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-[11px] text-slate-400 font-medium mb-1">Target Link URL (OnClick)</label>
//               <input
//                 type="text"
//                 value={linkInput}
//                 onChange={(e) => {
//                   setLinkInput(e.target.value);
//                   onUpdate({ imageLinkUrl: e.target.value });
//                 }}
//                 placeholder="https://example.com"
//                 className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-[11px] text-slate-400 font-medium mb-1">Alt Text (SEO)</label>
//               <input
//                 type="text"
//                 value={altInput}
//                 onChange={(e) => {
//                   setAltInput(e.target.value);
//                   onUpdate({ imageAlt: e.target.value });
//                 }}
//                 placeholder="Image description..."
//                 className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
//               />
//             </div>
//           </div>

//           <div className="relative flex py-1 items-center">
//             <div className="flex-grow border-t border-slate-800"></div>
//             <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Or</span>
//             <div className="flex-grow border-t border-slate-800"></div>
//           </div>

//           <div className="space-y-2">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//             <button
//               type="button"
//               disabled={isUploading}
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {isUploading ? (
//                 <>
//                   <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
//                   <span>Converting & Uploading...</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="w-3.5 h-3.5 text-indigo-400" />
//                   <span>Upload WebP to Supabase</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Calendar, Clock, User, Link as LinkIcon, Unlink, Settings2, ExternalLink, X } from 'lucide-react';
// import type { PageSectionItem } from '../types';

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// // Exported factory function for blank blog sections
// export function makeBlankBlog(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'blog',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Building Modern Web Applications at Scale',
//     subtitle:
//       'When designing web applications for modern users, speed and responsiveness are non-negotiable.',
//     authorName: 'Alex River',
//     authorRole: 'Full-Stack Architect',
//     publishDate: 'Aug 24, 2026',
//     readTime: '6 min read',
//     imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
//   };
// }

// // Dynamic Floating Rich-Text Editor Component with Link insertion/removal
// const RichEditableText: React.FC<{
//   html: string;
//   onCommit: (nextHtml: string) => void;
//   className?: string;
//   placeholder?: string;
// }> = ({ html, onCommit, className = '', placeholder = 'Click to write content...' }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('https://');
//   const savedSelection = useRef<Range | null>(null);

//   useEffect(() => {
//     if (ref.current && ref.current.innerHTML !== html) {
//       ref.current.innerHTML = html;
//     }
//   }, [html]);

//   const saveSelection = () => {
//     const sel = window.getSelection();
//     if (sel && sel.rangeCount > 0) {
//       savedSelection.current = sel.getRangeAt(0).cloneRange();
//     }
//   };

//   const restoreSelection = () => {
//     if (savedSelection.current) {
//       const sel = window.getSelection();
//       if (sel) {
//         sel.removeAllRanges();
//         sel.addRange(savedSelection.current);
//       }
//     }
//   };

//   const handleApplyLink = () => {
//     restoreSelection();
//     if (linkUrl.trim()) {
//       document.execCommand('createLink', false, linkUrl.trim());
//     }
//     setShowLinkModal(false);
//     if (ref.current) onCommit(ref.current.innerHTML);
//   };

//   const handleUnlink = () => {
//     restoreSelection();
//     document.execCommand('unlink', false);
//     if (ref.current) onCommit(ref.current.innerHTML);
//   };

//   return (
//     <div className="relative group/editor">
//       {/* Dynamic Toolbar for selected text */}
//       <div className="sticky top-2 z-30 mb-2 hidden group-focus-within/editor:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl max-w-max text-xs">
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             saveSelection();
//             setShowLinkModal(true);
//           }}
//           className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
//         >
//           <LinkIcon className="w-3.5 h-3.5 text-indigo-400" /> Insert Link
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             saveSelection();
//             handleUnlink();
//           }}
//           className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
//         >
//           <Unlink className="w-3.5 h-3.5 text-red-400" /> Remove Link
//         </button>
//       </div>

//       {/* Link Popover */}
//       {showLinkModal && (
//         <div className="absolute top-10 left-0 z-40 bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl space-y-3 w-80">
//           <div className="flex justify-between items-center text-xs font-bold text-slate-200">
//             <span>Insert Hyperlink</span>
//             <button type="button" onClick={() => setShowLinkModal(false)}>
//               <X className="w-4 h-4 text-slate-400 hover:text-white" />
//             </button>
//           </div>
//           <input
//             type="text"
//             value={linkUrl}
//             onChange={(e) => setLinkUrl(e.target.value)}
//             placeholder="https://example.com"
//             className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none focus:border-indigo-500"
//           />
//           <button
//             type="button"
//             onClick={handleApplyLink}
//             className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition"
//           >
//             Apply Link to Selection
//           </button>
//         </div>
//       )}

//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onBlur={(e) => onCommit(e.currentTarget.innerHTML)}
//         data-placeholder={placeholder}
//         className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//       />
//     </div>
//   );
// };

// // Main BlogView Component
// export const BlogView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const [showImgModal, setShowImgModal] = useState(false);

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white border border-indigo-800/50'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900 border border-slate-200'
//       : 'bg-slate-950 text-white border border-slate-800';

//   const proseThemeClass = sec.bgTheme === 'light' ? 'prose-slate' : 'prose-invert';

//   return (
//     <article className={`my-8 max-w-4xl mx-auto rounded-3xl space-y-8 ${paddingClass} ${themeClass}`}>
//       {/* Blog Metadata Header */}
//       <div className="space-y-2">
//         <div className="flex flex-wrap items-center gap-4 text-xs opacity-75 border-b border-slate-800/80 pb-4">
//           <div className="flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-indigo-400" />
//             <RichEditableText
//               html={sec.authorName || 'Alex River'}
//               onCommit={(v) => handleUpdate({ authorName: v })}
//               placeholder="Author..."
//               className="font-medium"
//             />
//             <span>•</span>
//             <RichEditableText
//               html={sec.authorRole || 'Lead Engineer'}
//               onCommit={(v) => handleUpdate({ authorRole: v })}
//               placeholder="Role..."
//             />
//           </div>

//           <div className="flex items-center gap-1.5">
//             <Calendar className="w-3.5 h-3.5 text-indigo-400" />
//             <RichEditableText
//               html={sec.publishDate || 'Aug 24, 2026'}
//               onCommit={(v) => handleUpdate({ publishDate: v })}
//               placeholder="Date..."
//             />
//           </div>

//           <div className="flex items-center gap-1.5">
//             <Clock className="w-3.5 h-3.5 text-indigo-400" />
//             <RichEditableText
//               html={sec.readTime || '5 min read'}
//               onCommit={(v) => handleUpdate({ readTime: v })}
//               placeholder="Read time..."
//             />
//           </div>
//         </div>

//         {/* Title */}
//         <RichEditableText
//           html={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Blog Title..."
//           className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
//         />
//       </div>

//       {/* Featured Cover Image Section */}
//       <div className="relative group/img overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
//         {sec.imageLinkUrl ? (
//           <a href={sec.imageLinkUrl} target="_blank" rel="noopener noreferrer" className="block relative">
//             <img
//               src={sec.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'}
//               alt={sec.imageAlt || 'Blog cover'}
//               className="w-full h-64 sm:h-80 object-cover"
//             />
//             <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-400 border border-slate-800 flex items-center gap-1">
//               <ExternalLink className="w-3 h-3" /> Linked Image
//             </span>
//           </a>
//         ) : (
//           <img
//             src={sec.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'}
//             alt={sec.imageAlt || 'Blog cover'}
//             className="w-full h-64 sm:h-80 object-cover"
//           />
//         )}

//         <button
//           type="button"
//           onClick={() => setShowImgModal(true)}
//           className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 text-xs font-semibold text-slate-300 opacity-0 group-hover/img:opacity-100 transition hover:text-white flex items-center gap-1.5"
//         >
//           <Settings2 className="w-3.5 h-3.5 text-indigo-400" /> Image Settings
//         </button>
//       </div>

//       {/* Image Settings Modal */}
//       {showImgModal && (
//         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
//             <div className="flex justify-between items-center border-b border-slate-800 pb-3">
//               <h4 className="text-sm font-bold text-white">Cover Image Configuration</h4>
//               <button type="button" onClick={() => setShowImgModal(false)}>
//                 <X className="w-4 h-4 text-slate-400 hover:text-white" />
//               </button>
//             </div>

//             <div className="space-y-3 text-xs">
//               <div>
//                 <label className="block text-slate-400 font-semibold mb-1">Image Source URL</label>
//                 <input
//                   type="text"
//                   defaultValue={sec.imageUrl || ''}
//                   onChange={(e) => handleUpdate({ imageUrl: e.target.value })}
//                   placeholder="https://..."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-slate-400 font-semibold mb-1">Target Link URL (OnClick)</label>
//                 <input
//                   type="text"
//                   defaultValue={sec.imageLinkUrl || ''}
//                   onChange={(e) => handleUpdate({ imageLinkUrl: e.target.value })}
//                   placeholder="https://..."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-slate-400 font-semibold mb-1">Alt Text (Accessibility & SEO)</label>
//                 <input
//                   type="text"
//                   defaultValue={sec.imageAlt || ''}
//                   onChange={(e) => handleUpdate({ imageAlt: e.target.value })}
//                   placeholder="Describe the image content..."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
//                 />
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowImgModal(false)}
//               className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded-xl transition"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Main Multi-Paragraph Blog Body */}
//       <div className={`prose max-w-none text-sm sm:text-base leading-relaxed opacity-90 ${proseThemeClass}`}>
//         <RichEditableText
//           html={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Write your blog post body paragraphs here..."
//           className="min-h-[180px]"
//         />
//       </div>
//     </article>
//   );
// };


























// import React, { useState, useRef, useEffect } from 'react';
// import { Calendar, Clock, User, Link as LinkIcon, Unlink, Settings2, ExternalLink, X } from 'lucide-react';

// export interface PageSectionItem {
//   id: string;
//   type: string;
//   bgTheme?: string;
//   paddingSize?: string;
//   title?: string;
//   subtitle?: string;
//   imageUrl?: string;
//   imageAlt?: string;
//   imageLinkUrl?: string;
//   authorName?: string;
//   authorRole?: string;
//   publishDate?: string;
//   readTime?: string;
// }

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// function makeBlankBlog(): PageSectionItem {
//   return {
//     id: `sec-${Date.now()}`,
//     type: 'blog',
//     bgTheme: 'dark',
//     paddingSize: 'md',
//     title: 'Building Modern Web Applications at Scale',
//     subtitle:
//       'When designing web applications for modern users, speed and responsiveness are non-negotiable.',
//     authorName: 'Alex River',
//     authorRole: 'Full-Stack Architect',
//     publishDate: 'Aug 24, 2026',
//     readTime: '6 min read',
//     imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
//   };
// }

// // Dynamic Floating Rich-Text Editor Component with Link insertion/removal
// const RichEditableText: React.FC<{
//   html: string;
//   onCommit: (nextHtml: string) => void;
//   className?: string;
//   placeholder?: string;
// }> = ({ html, onCommit, className = '', placeholder = 'Click to write content...' }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('https://');
//   const savedSelection = useRef<Range | null>(null);

//   useEffect(() => {
//     if (ref.current && ref.current.innerHTML !== html) {
//       ref.current.innerHTML = html;
//     }
//   }, [html]);

//   const saveSelection = () => {
//     const sel = window.getSelection();
//     if (sel && sel.rangeCount > 0) {
//       savedSelection.current = sel.getRangeAt(0).cloneRange();
//     }
//   };

//   const restoreSelection = () => {
//     if (savedSelection.current) {
//       const sel = window.getSelection();
//       if (sel) {
//         sel.removeAllRanges();
//         sel.addRange(savedSelection.current);
//       }
//     }
//   };

//   const handleApplyLink = () => {
//     restoreSelection();
//     if (linkUrl.trim()) {
//       document.execCommand('createLink', false, linkUrl.trim());
//     }
//     setShowLinkModal(false);
//     if (ref.current) onCommit(ref.current.innerHTML);
//   };

//   const handleUnlink = () => {
//     restoreSelection();
//     document.execCommand('unlink', false);
//     if (ref.current) onCommit(ref.current.innerHTML);
//   };

//   return (
//     <div className="relative group/editor">
//       {/* Dynamic Toolbar for selected text */}
//       <div className="sticky top-2 z-30 mb-2 hidden group-focus-within/editor:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl max-w-max text-xs">
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             saveSelection();
//             setShowLinkModal(true);
//           }}
//           className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
//         >
//           <LinkIcon className="w-3.5 h-3.5 text-indigo-400" /> Insert Link
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             saveSelection();
//             handleUnlink();
//           }}
//           className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
//         >
//           <Unlink className="w-3.5 h-3.5 text-red-400" /> Remove Link
//         </button>
//       </div>

//       {/* Link Popover */}
//       {showLinkModal && (
//         <div className="absolute top-10 left-0 z-40 bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl space-y-3 w-80">
//           <div className="flex justify-between items-center text-xs font-bold text-slate-200">
//             <span>Insert Hyperlink</span>
//             <button onClick={() => setShowLinkModal(false)}>
//               <X className="w-4 h-4 text-slate-400 hover:text-white" />
//             </button>
//           </div>
//           <input
//             type="text"
//             value={linkUrl}
//             onChange={(e) => setLinkUrl(e.target.value)}
//             placeholder="https://example.com"
//             className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none focus:border-indigo-500"
//           />
//           <button
//             type="button"
//             onClick={handleApplyLink}
//             className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition"
//           >
//             Apply Link to Selection
//           </button>
//         </div>
//       )}

//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onBlur={(e) => onCommit(e.currentTarget.innerHTML)}
//         data-placeholder={placeholder}
//         className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//       />
//     </div>
//   );
// };

// export const BlogView: React.FC<{
//   sec: PageSectionItem;
//   onChange?: OnChange;
// }> = ({ sec, onChange }) => {
//   const [showImgModal, setShowImgModal] = useState(false);

//   const handleUpdate = (patch: Partial<PageSectionItem>) => {
//     if (onChange) onChange(patch);
//   };

//   const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900'
//       : 'bg-slate-950 text-white';

//   return (
//     <article className={`my-8 max-w-4xl mx-auto rounded-3xl space-y-8 ${paddingClass} ${themeClass}`}>
//       {/* Blog Metadata Header */}
//       <div className="space-y-2">
//         <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-800/80 pb-4">
//           <div className="flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-indigo-400" />
//             <RichEditableText
//               html={sec.authorName || 'Alex River'}
//               onCommit={(v) => handleUpdate({ authorName: v })}
//               placeholder="Author..."
//               className="font-medium text-slate-200"
//             />
//             <span>•</span>
//             <RichEditableText
//               html={sec.authorRole || 'Lead Engineer'}
//               onCommit={(v) => handleUpdate({ authorRole: v })}
//               placeholder="Role..."
//             />
//           </div>

//           <div className="flex items-center gap-1.5">
//             <Calendar className="w-3.5 h-3.5 text-indigo-400" />
//             <RichEditableText
//               html={sec.publishDate || 'Aug 24, 2026'}
//               onCommit={(v) => handleUpdate({ publishDate: v })}
//               placeholder="Date..."
//             />
//           </div>

//           <div className="flex items-center gap-1.5">
//             <Clock className="w-3.5 h-3.5 text-indigo-400" />
//             <RichEditableText
//               html={sec.readTime || '5 min read'}
//               onCommit={(v) => handleUpdate({ readTime: v })}
//               placeholder="Read time..."
//             />
//           </div>
//         </div>

//         {/* Title */}
//         <RichEditableText
//           html={sec.title || ''}
//           onCommit={(v) => handleUpdate({ title: v })}
//           placeholder="Blog Title..."
//           className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
//         />
//       </div>

//       {/* Featured Cover Image Section */}
//       <div className="relative group/img overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
//         {sec.imageLinkUrl ? (
//           <a href={sec.imageLinkUrl} target="_blank" rel="noopener noreferrer" className="block relative">
//             <img
//               src={sec.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'}
//               alt={sec.imageAlt || 'Blog cover'}
//               className="w-full h-64 sm:h-80 object-cover"
//             />
//             <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-400 border border-slate-800 flex items-center gap-1">
//               <ExternalLink className="w-3 h-3" /> Linked Image
//             </span>
//           </a>
//         ) : (
//           <img
//             src={sec.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'}
//             alt={sec.imageAlt || 'Blog cover'}
//             className="w-full h-64 sm:h-80 object-cover"
//           />
//         )}

//         <button
//           type="button"
//           onClick={() => setShowImgModal(true)}
//           className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 text-xs font-semibold text-slate-300 opacity-0 group-hover/img:opacity-100 transition hover:text-white flex items-center gap-1.5"
//         >
//           <Settings2 className="w-3.5 h-3.5 text-indigo-400" /> Image Settings
//         </button>
//       </div>

//       {/* Image Settings Modal */}
//       {showImgModal && (
//         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
//             <div className="flex justify-between items-center border-b border-slate-800 pb-3">
//               <h4 className="text-sm font-bold text-white">Cover Image Configuration</h4>
//               <button onClick={() => setShowImgModal(false)}>
//                 <X className="w-4 h-4 text-slate-400 hover:text-white" />
//               </button>
//             </div>

//             <div className="space-y-3 text-xs">
//               <div>
//                 <label className="block text-slate-400 font-semibold mb-1">Image Source URL</label>
//                 <input
//                   type="text"
//                   defaultValue={sec.imageUrl || ''}
//                   onChange={(e) => handleUpdate({ imageUrl: e.target.value })}
//                   placeholder="https://..."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-slate-400 font-semibold mb-1">Target Link URL (OnClick)</label>
//                 <input
//                   type="text"
//                   defaultValue={sec.imageLinkUrl || ''}
//                   onChange={(e) => handleUpdate({ imageLinkUrl: e.target.value })}
//                   placeholder="https://..."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-slate-400 font-semibold mb-1">Alt Text (Accessibility & SEO)</label>
//                 <input
//                   type="text"
//                   defaultValue={sec.imageAlt || ''}
//                   onChange={(e) => handleUpdate({ imageAlt: e.target.value })}
//                   placeholder="Describe the image content..."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-indigo-500"
//                 />
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowImgModal(false)}
//               className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded-xl transition"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Main Multi-Paragraph Blog Body */}
//       <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed opacity-90">
//         <RichEditableText
//           html={sec.subtitle || ''}
//           onCommit={(v) => handleUpdate({ subtitle: v })}
//           placeholder="Write your blog post body paragraphs here..."
//           className="min-h-[180px]"
//         />
//       </div>
//     </article>
//   );
// };