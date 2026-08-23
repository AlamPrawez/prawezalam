'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { PageButton, PageSectionItem, HeroLayoutStyle } from '../types';
import { Plus, Trash2, Link as LinkIcon, Unlink, Settings2, ExternalLink, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { uploadWebpToSupabase } from '@/lib/uploadWebpToSupabase';
// 1. Import your Supabase WebP upload utility function
// import { uploadWebpToSupabase } from '@/lib/supabase'; // Adjust import path if needed

type OnChange = (patch: Partial<PageSectionItem>) => void;

export const HERO_VARIANTS: { value: HeroLayoutStyle; label: string; desc: string }[] = [
  { value: 'profile-hero', label: 'Profile', desc: 'Avatar, badges, and headline.' },
  { value: 'interactive-code-hero', label: 'Code Terminal', desc: 'Interactive developer preview.' },
  { value: 'split-right', label: 'Split Right', desc: 'Text left, hero media right.' },
  { value: 'split-left', label: 'Split Left', desc: 'Hero media left, text right.' },
  { value: 'centered', label: 'Centered', desc: 'Minimalist middle alignment.' },
];



export function makeBlankHero(layoutStyle: HeroLayoutStyle = 'centered'): PageSectionItem {
  switch (layoutStyle) {
    case 'profile-hero':
      return {
        id: `sec-${Date.now()}`,
        type: 'hero',
        layoutStyle,
        title: 'Full-Stack Engineer for React & FastAPI',
        subtitle: 'Elite software development, engineered for performance.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        buttons: [{ id: `btn-${Date.now()}`, text: 'Book Call', url: '#', variant: 'primary' }],
      };

    case 'interactive-code-hero':
      return {
        id: `sec-${Date.now()}`,
        type: 'hero',
        layoutStyle,
        title: 'Ship Production APIs Fast',
        subtitle: 'Async FastAPI backends, modern React frontends.',
        bulletPoints: ['Async by default', 'Type-safe'],
        buttons: [{ id: `btn-${Date.now()}`, text: 'Start a Project', url: '#', variant: 'primary' }],
      };

    case 'split-right':
      return {
        id: `sec-${Date.now()}`,
        type: 'hero',
        layoutStyle,
        bgTheme: 'dark',
        title: 'React.js Development Services',
        subtitle: 'Production-ready codebases built for scale.',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started', url: '#', variant: 'primary' }],
      };

    case 'split-left':
      return {
        id: `sec-${Date.now()}`,
        type: 'hero',
        layoutStyle,
        bgTheme: 'slate',
        title: 'Developer-First Engineering',
        subtitle: 'Clean, maintainable codebases for technical founders.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        buttons: [{ id: `btn-${Date.now()}`, text: 'Explore Codebase', url: '#', variant: 'primary' }],
      };

    case 'centered':
      return {
        id: `sec-${Date.now()}`,
        type: 'hero',
        layoutStyle,
        bgTheme: 'indigo',
        title: 'Let’s Build Something Exceptional',
        subtitle: 'Partner with an expert full-stack engineer.',
        buttons: [{ id: `btn-${Date.now()}`, text: 'Get a Quote', url: '#', variant: 'primary' }],
      };

    default:
      return {
        id: `sec-${Date.now()}`,
        type: 'hero',
        layoutStyle: 'centered',
        bgTheme: 'indigo',
        title: 'New Hero Headline',
        subtitle: 'Add subtitle here...',
        imageUrl: '',
        buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started', url: '#', variant: 'primary' }],
        bulletPoints: [],
      };
  }
}

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export const EditableText: React.FC<{
  value?: string;
  onCommit: (next: string) => void;
  as?: React.ElementType;
  className?: string;
  placeholder?: string;
}> = ({ value = '', onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
  const ref = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const savedSelection = useRef<Range | null>(null);

  useEffect(() => {
    if (!focused && ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value, focused]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection.current);
      }
    }
  };

  const handleApplyLink = () => {
    restoreSelection();
    if (linkUrl.trim()) {
      document.execCommand('createLink', false, linkUrl.trim());
    }
    setShowLinkModal(false);
    if (ref.current) onCommit(ref.current.innerHTML);
  };

  const handleUnlink = () => {
    restoreSelection();
    document.execCommand('unlink', false);
    if (ref.current) onCommit(ref.current.innerHTML);
  };

  return (
    <div className="relative group/text-editor inline-block w-full">
      <div className="sticky top-2 z-30 mb-2 hidden group-focus-within/text-editor:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl max-w-max text-xs" data-editor-only>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            setShowLinkModal(true);
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          <LinkIcon className="w-3.5 h-3.5 text-indigo-400" /> Insert Link
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            handleUnlink();
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          <Unlink className="w-3.5 h-3.5 text-red-400" /> Remove Link
        </button>
      </div>

      {showLinkModal && (
        <div className="absolute top-10 left-0 z-40 bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl space-y-3 w-80" data-editor-only>
          <div className="flex justify-between items-center text-xs font-bold text-slate-200">
            <span>Insert Hyperlink</span>
            <button type="button" onClick={() => setShowLinkModal(false)}>
              <X className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </div>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleApplyLink}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition"
          >
            Apply Link
          </button>
        </div>
      )}

      <Tag
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setFocused(true)}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          setFocused(false);
          onCommit(e.currentTarget.innerHTML);
        }}
        data-placeholder={placeholder}
        className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
      />
    </div>
  );
};

// Advanced Editable Image Component Integrated with uploadWebpToSupabase
export const EditableImage: React.FC<{
  src?: string;
  alt?: string;
  imageLinkUrl?: string;
  className?: string;
  onUpdate: (patch: { imageUrl?: string; imageAlt?: string; imageLinkUrl?: string }) => void;
}> = ({ src, alt = 'Hero Image', imageLinkUrl, className = '', onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(src || '');
  const [altInput, setAltInput] = useState(alt || '');
  const [linkInput, setLinkInput] = useState(imageLinkUrl || '');
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Uploads the converted WebP image and receives the public Supabase storage URL
      const publicUrl = await uploadWebpToSupabase(file, undefined, 'blogs/hero');
      
      setUrlInput(publicUrl);
      onUpdate({ imageUrl: publicUrl });
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to upload image to Supabase:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onUpdate({ imageUrl: '', imageLinkUrl: '' });
    setUrlInput('');
    setLinkInput('');
    setIsOpen(false);
  };

  const renderImageContent = () => (
    <img src={src} alt={alt} className={className} />
  );

  return (
    <div ref={menuRef} className="relative group/image inline-block w-full">
      {src ? (
        imageLinkUrl ? (
          <a href={imageLinkUrl} target="_blank" rel="noopener noreferrer" className="block relative">
            {renderImageContent()}
            <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-400 border border-slate-800 flex items-center gap-1 z-10">
              <ExternalLink className="w-3 h-3" /> Linked Image
            </span>
          </a>
        ) : (
          renderImageContent()
        )
      ) : (
        <div className="w-full h-56 bg-slate-900/60 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-xs p-6 space-y-3">
          <ImageIcon className="w-8 h-8 text-slate-600" />
          <span>No image configured</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition"
          >
            Upload or Add Image
          </button>
        </div>
      )}

      {src && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 text-white border border-slate-800 text-xs font-semibold shadow-lg backdrop-blur hover:bg-slate-800 opacity-0 group-hover/image:opacity-100 transition z-20 flex items-center gap-1.5"
          data-editor-only
        >
          <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Image Settings</span>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-12 right-2 z-50 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 space-y-4 text-slate-200 text-xs" data-editor-only>
          <div className="font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Hero Image Settings</span>
            <button type="button" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Image Source URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    onUpdate({ imageUrl: urlInput });
                    setIsOpen(false);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl shrink-0"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Target Hyperlink URL (OnClick)</label>
              <input
                type="text"
                value={linkInput}
                onChange={(e) => {
                  setLinkInput(e.target.value);
                  onUpdate({ imageLinkUrl: e.target.value });
                }}
                placeholder="https://example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Alt Text (SEO)</label>
              <input
                type="text"
                value={altInput}
                onChange={(e) => {
                  setAltInput(e.target.value);
                  onUpdate({ imageAlt: e.target.value });
                }}
                placeholder="Image description..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Or</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Converting & Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Upload WebP to Supabase</span>
                </>
              )}
            </button>

            {src && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium py-2 px-3 rounded-xl border border-red-500/20 transition flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Image</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EditableButtons: React.FC<{
  buttons: PageButton[];
  onChange: (next: PageButton[]) => void;
  primaryClass: string;
  secondaryClass: string;
  wrapClass?: string;
}> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center gap-3' }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setActiveMenuIndex(null));

  const updateButton = (i: number, patch: Partial<PageButton>) => {
    const next = [...buttons];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => {
    setActiveMenuIndex(null);
    onChange(buttons.filter((_, idx) => idx !== i));
  };

  const add = () =>
    onChange([
      ...buttons,
      { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
    ]);

  return (
    <div className={wrapClass} ref={menuRef}>
      {buttons.map((btn, i) => (
        <div key={btn.id} className="group/item relative inline-flex items-center">
          <a
            href={btn.url || '#'}
            onClick={(e) => {
              if (!btn.url || btn.url === '#') e.preventDefault();
            }}
            className={`px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center ${
              btn.variant === 'primary' ? primaryClass : secondaryClass
            }`}
          >
            <EditableText
              as="span"
              value={btn.text}
              onCommit={(v) => updateButton(i, { text: v })}
              placeholder="Button label"
            />
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveMenuIndex(activeMenuIndex === i ? null : i);
            }}
            className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
            data-editor-only
          >
            ⚙
          </button>

          {activeMenuIndex === i && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3"
              data-editor-only
            >
              <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
                <span>Configure Button</span>
                <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-300 text-[11px]">
                  Delete
                </button>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase">Target Link URL</label>
                <input
                  type="text"
                  value={btn.url || ''}
                  onChange={(e) => updateButton(i, { url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase">Variant Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateButton(i, { variant: 'primary' })}
                    className={`py-1 rounded-lg border text-[11px] ${
                      btn.variant === 'primary' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    onClick={() => updateButton(i, { variant: 'secondary' })}
                    className={`py-1 rounded-lg border text-[11px] ${
                      btn.variant !== 'primary' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
        data-editor-only
      >
        + Button
      </button>
    </div>
  );
};

const EditableBullets: React.FC<{
  bullets: string[];
  onChange: (next: string[]) => void;
  renderItem: (text: React.ReactNode, i: number) => React.ReactNode;
}> = ({ bullets, onChange, renderItem }) => {
  const updateAt = (i: number, v: string) => {
    const next = [...bullets];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));
  const add = () => onChange([...bullets, 'New highlight…']);

  return (
    <>
      {bullets.map((bp, i) => (
        <span key={i} className="group/item relative inline-flex items-center gap-1">
          {renderItem(<EditableText as="span" value={bp} onCommit={(v) => updateAt(i, v)} placeholder="Highlight…" />, i)}
          <button
            type="button"
            onClick={() => remove(i)}
            className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 text-[10px] flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition"
            data-editor-only
          >
            ×
          </button>
        </span>
      ))}
      <button type="button" onClick={add} className="text-[11px] text-slate-500 hover:text-slate-300 underline transition" data-editor-only>
        + Add highlight
      </button>
    </>
  );
};

export const ProfileServicesHero: React.FC<{
  sec: PageSectionItem;
  onChange: OnChange;
}> = ({ sec, onChange }) => {
  const badgeText = sec.badgeText;

  return (
    <section className="relative bg-[#0A0D14] text-white min-h-[560px] flex items-center py-16 px-6 md:px-16 border-b border-slate-800">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <EditableImage
          src={sec.imageUrl}
          alt={sec.imageAlt || sec.title}
          imageLinkUrl={sec.imageLinkUrl}
          className="w-full h-full object-cover object-right opacity-25 filter grayscale"
          onUpdate={(patch) => onChange(patch)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/90 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-6">
        {badgeText !== undefined ? (
          <div className="group/badge relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold tracking-wider uppercase pr-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
            <EditableText
              as="span"
              value={badgeText}
              onCommit={(v) => onChange({ badgeText: v })}
              placeholder="React.js Development Services"
              className="inline-block"
            />
            <button
              type="button"
              onClick={() => onChange({ badgeText: undefined })}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-slate-900/80 text-slate-400 hover:text-red-400 opacity-0 group-hover/badge:opacity-100 transition"
              title="Remove badge"
              data-editor-only
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="pt-1" data-editor-only>
            <button
              type="button"
              onClick={() => onChange({ badgeText: 'React.js Development Services' })}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-dashed border-slate-700 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 transition"
            >
              <Plus className="w-3 h-3" /> Add Badge
            </button>
          </div>
        )}

        <EditableText
          as="h1"
          value={sec.title}
          onCommit={(v) => onChange({ title: v })}
          placeholder="Hero title…"
          className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]"
        />

        <EditableText
          as="div"
          value={sec.subtitle}
          onCommit={(v) => onChange({ subtitle: v })}
          placeholder="Hero subtitle…"
          className="block text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed whitespace-pre-line font-normal"
        />

        {sec.buttons && (
          <div className="pt-2">
            <EditableButtons
              buttons={sec.buttons}
              onChange={(buttons) => onChange({ buttons })}
              primaryClass="bg-white text-slate-950 hover:bg-slate-200 shadow-md hover:shadow-lg"
              secondaryClass="bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
            />
          </div>
        )}
      </div>
    </section>
  );
};

const StandardHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
  const isSplitLeft = sec.layoutStyle === 'split-left';
  const isCentered = sec.layoutStyle === 'centered';
  const bulletPoints = sec.bulletPoints || [];

  return (
    <section className={`relative py-16 px-6 text-white ${sec.bgTheme === 'indigo' ? 'bg-indigo-950' : sec.bgTheme === 'slate' ? 'bg-slate-900' : 'bg-slate-950'}`}>
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className={`${isCentered ? 'md:col-span-12 text-center' : sec.imageUrl ? 'md:col-span-7' : 'md:col-span-12'} ${isSplitLeft ? 'md:order-2' : ''}`}>
          <EditableText
            as="h1"
            value={sec.title}
            onCommit={(v) => onChange({ title: v })}
            placeholder="Hero title…"
            className="block text-4xl font-extrabold tracking-tight mb-4 text-white"
          />
          <EditableText
            as="p"
            value={sec.subtitle}
            onCommit={(v) => onChange({ subtitle: v })}
            placeholder="Hero subtitle…"
            className="block text-slate-300 text-base leading-relaxed mb-6"
          />

          <div className={`space-y-2 mb-6 text-xs text-slate-300 ${isCentered ? 'items-center flex flex-col' : ''}`}>
            <EditableBullets
              bullets={bulletPoints}
              onChange={(next) => onChange({ bulletPoints: next })}
              renderItem={(text) => (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {text}
                </span>
              )}
            />
          </div>

          {sec.buttons && (
            <EditableButtons
              buttons={sec.buttons}
              onChange={(buttons) => onChange({ buttons })}
              primaryClass="bg-indigo-600 text-white hover:bg-indigo-500"
              secondaryClass="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
              wrapClass={`flex flex-wrap gap-3 ${isCentered ? 'justify-center' : 'justify-start'}`}
            />
          )}
        </div>

        {(!isCentered || sec.imageUrl) && (
          <div className={`md:col-span-5 ${isSplitLeft ? 'md:order-1' : ''}`}>
            <div className="rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <EditableImage
                src={sec.imageUrl}
                alt={sec.imageAlt || sec.title}
                imageLinkUrl={sec.imageLinkUrl}
                className="w-full h-auto object-cover rounded-2xl"
                onUpdate={(patch) => onChange(patch)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const InteractiveCodeHero: React.FC<{
  sec: PageSectionItem;
  onChange: OnChange;
}> = ({ sec, onChange }) => {
  const bulletPoints = sec.bulletPoints || [];
  const badgeText = sec.badgeText;

  return (
    <section className="relative bg-slate-950 text-white py-20 px-6 md:px-16 border-b border-slate-800/80">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          {badgeText !== undefined ? (
            <div className="group/badge relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide pr-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <EditableText
                as="span"
                value={badgeText}
                onCommit={(v) => onChange({ badgeText: v })}
                placeholder="Status badge content…"
                className="inline-block"
              />
              <button
                type="button"
                onClick={() => onChange({ badgeText: undefined })}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-slate-900/80 text-slate-400 hover:text-red-400 opacity-0 group-hover/badge:opacity-100 transition"
                title="Remove badge"
                data-editor-only
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="pt-1" data-editor-only>
              <button
                type="button"
                onClick={() => onChange({ badgeText: 'Available for Q3/Q4 Architecture Projects' })}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-dashed border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition"
              >
                <Plus className="w-3 h-3" /> Add Status Badge
              </button>
            </div>
          )}

          <EditableText
            as="h1"
            value={sec.title}
            onCommit={(v) => onChange({ title: v })}
            placeholder="Hero title…"
            className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          />

          <EditableText
            as="p"
            value={sec.subtitle}
            onCommit={(v) => onChange({ subtitle: v })}
            placeholder="Hero subtitle…"
            className="block text-sm md:text-base text-slate-300 leading-relaxed max-w-xl"
          />

          <div className="flex flex-wrap gap-2 pt-1">
            <EditableBullets
              bullets={bulletPoints}
              onChange={(next) => onChange({ bulletPoints: next })}
              renderItem={(text) => (
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                  ⚡ {text}
                </span>
              )}
            />
          </div>

          {sec.buttons && (
            <div className="pt-3">
              <EditableButtons
                buttons={sec.buttons}
                onChange={(buttons) => onChange({ buttons })}
                primaryClass="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20"
                secondaryClass="bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-[11px] font-mono text-slate-400">api_gateway.py</span>
            </div>

            <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed">
              <p className="text-slate-500"># Next-gen async API route</p>
              <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends</p>
              <p><span className="text-purple-400">from</span> app.services <span className="text-purple-400">import</span> AIStreamer</p>
              <br />
              <p><span className="text-blue-400">@app</span>.post(<span className="text-emerald-300">"/v1/build"</span>)</p>
              <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">execute_pipeline</span>(payload: ProjectSchema):</p>
              <p className="pl-4 text-slate-300">result = <span className="text-purple-400">await</span> AIStreamer.deploy(payload)</p>
              <p className="pl-4 text-purple-400">return <span className="text-slate-300">{`{"status": "success", "score": 100}`}</span></p>
            </div>

            <div className="px-5 py-3 bg-indigo-950/40 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Lighthouse Performance</span>
              <span className="font-bold text-emerald-400">100 / 100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroView: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
  if (sec.layoutStyle === 'profile-hero') return <ProfileServicesHero sec={sec} onChange={onChange} />;
  if (sec.layoutStyle === 'interactive-code-hero') return <InteractiveCodeHero sec={sec} onChange={onChange} />;
  return <StandardHero sec={sec} onChange={onChange} />;
};



export function HeroLayoutThumbnail({ layoutStyle }: { layoutStyle: HeroLayoutStyle }) {
  const sample = makeBlankHero(layoutStyle);
  return (
    <div className="relative w-full h-40 overflow-hidden rounded-lg bg-slate-950">
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '1280px', transform: 'scale(0.235)', transformOrigin: 'top left' }}
      >
        <HeroView sec={sample} onChange={() => {}} />
      </div>
    </div>
  );
}
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { PageButton, PageSectionItem, HeroLayoutStyle } from '../types';
// import { Plus, Trash2 } from 'lucide-react';

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// // Dedicated factory function for default hero states
// export function makeBlankHero(layoutStyle: HeroLayoutStyle = 'centered'): PageSectionItem {
//   switch (layoutStyle) {
//     case 'profile-hero':
//       return {
//         id: `sec-${Date.now()}`,
//         type: 'hero',
//         layoutStyle,
//         title: 'Full-Stack Engineer for React & FastAPI',
//         subtitle: 'Elite software development, engineered for performance.',
//         imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
//         buttons: [{ id: `btn-${Date.now()}`, text: 'Book Call', url: '#', variant: 'primary' }],
//       };

//     case 'interactive-code-hero':
//       return {
//         id: `sec-${Date.now()}`,
//         type: 'hero',
//         layoutStyle,
//         title: 'Ship Production APIs Fast',
//         subtitle: 'Async FastAPI backends, modern React frontends.',
//         bulletPoints: ['Async by default', 'Type-safe'],
//         buttons: [{ id: `btn-${Date.now()}`, text: 'Start a Project', url: '#', variant: 'primary' }],
//       };

//     case 'split-right':
//       return {
//         id: `sec-${Date.now()}`,
//         type: 'hero',
//         layoutStyle,
//         bgTheme: 'dark',
//         title: 'React.js Development Services',
//         subtitle: 'Production-ready codebases built for scale.',
//         imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
//         buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started', url: '#', variant: 'primary' }],
//       };

//     case 'split-left':
//       return {
//         id: `sec-${Date.now()}`,
//         type: 'hero',
//         layoutStyle,
//         bgTheme: 'slate',
//         title: 'Developer-First Engineering',
//         subtitle: 'Clean, maintainable codebases for technical founders.',
//         imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
//         buttons: [{ id: `btn-${Date.now()}`, text: 'Explore Codebase', url: '#', variant: 'primary' }],
//       };

//     case 'centered':
//       return {
//         id: `sec-${Date.now()}`,
//         type: 'hero',
//         layoutStyle,
//         bgTheme: 'indigo',
//         title: 'Let’s Build Something Exceptional',
//         subtitle: 'Partner with an expert full-stack engineer.',
//         buttons: [{ id: `btn-${Date.now()}`, text: 'Get a Quote', url: '#', variant: 'primary' }],
//       };

//     default:
//       return {
//         id: `sec-${Date.now()}`,
//         type: 'hero',
//         layoutStyle: 'centered',
//         bgTheme: 'indigo',
//         title: 'New Hero Headline',
//         subtitle: 'Add subtitle here...',
//         imageUrl: '',
//         buttons: [{ id: `btn-${Date.now()}`, text: 'Get Started', url: '#', variant: 'primary' }],
//         bulletPoints: [],
//       };
//   }
// }

// // Custom Hook for Outside Clicks
// function useOnClickOutside<T extends HTMLElement>(
//   ref: React.RefObject<T | null>,
//   handler: () => void
// ) {
//   useEffect(() => {
//     const listener = (event: MouseEvent | TouchEvent) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }
//       handler();
//     };
//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
// }

// // Shared Editable Text
// export const EditableText: React.FC<{
//   value: string;
//   onCommit: (next: string) => void;
//   as?: React.ElementType;
//   className?: string;
//   placeholder?: string;
// }> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
//   const ref = useRef<HTMLElement>(null);
//   const [focused, setFocused] = useState(false);

//   useEffect(() => {
//     if (!focused && ref.current && ref.current.innerText !== value) {
//       ref.current.innerText = value;
//     }
//   }, [value, focused]);

//   return (
//     <Tag
//       ref={ref}
//       contentEditable
//       suppressContentEditableWarning
//       onFocus={() => setFocused(true)}
//       onBlur={(e: React.FocusEvent<HTMLElement>) => {
//         setFocused(false);
//         onCommit(e.currentTarget.innerText);
//       }}
//       data-placeholder={placeholder}
//       className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//     />
//   );
// };

// // Interactive Image Popover
// export const EditableImage: React.FC<{
//   src?: string;
//   alt?: string;
//   className?: string;
//   onUpdate: (url: string) => void;
// }> = ({ src, alt = 'Hero Image', className = '', onUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [urlInput, setUrlInput] = useState(src || '');
//   const menuRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useOnClickOutside(menuRef, () => setIsOpen(false));

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (typeof reader.result === 'string') {
//           onUpdate(reader.result);
//           setIsOpen(false);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div ref={menuRef} className="relative group/image inline-block w-full">
//       {src ? (
//         <img src={src} alt={alt} className={className} />
//       ) : (
//         <div className="w-full h-48 bg-slate-800/60 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-400 text-sm">
//           No Image Set
//         </div>
//       )}

//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white border border-slate-700 text-xs font-semibold shadow-lg backdrop-blur hover:bg-slate-800 opacity-0 group-hover/image:opacity-100 transition duration-200 z-20 flex items-center gap-1.5"
//       >
//         <span>📷 Edit Image</span>
//       </button>

//       {isOpen && (
//         <div className="absolute top-12 right-2 z-50 w-64 sm:w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 space-y-3 text-slate-200 text-xs">
//           <div className="font-bold text-slate-100 border-b border-slate-800 pb-2">Image Options</div>
//           <div className="space-y-1">
//             <label className="text-[11px] text-slate-400 font-medium">Image URL</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={urlInput}
//                 onChange={(e) => setUrlInput(e.target.value)}
//                 placeholder="https://..."
//                 className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   onUpdate(urlInput);
//                   setIsOpen(false);
//                 }}
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg shrink-0"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//           <div className="relative flex py-1 items-center">
//             <div className="flex-grow border-t border-slate-800"></div>
//             <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Or</span>
//             <div className="flex-grow border-t border-slate-800"></div>
//           </div>
//           <div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-3 rounded-lg border border-slate-700 transition flex items-center justify-center gap-2"
//             >
//               <span>📁 Upload from Computer</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Button Row
// const EditableButtons: React.FC<{
//   buttons: PageButton[];
//   onChange: (next: PageButton[]) => void;
//   primaryClass: string;
//   secondaryClass: string;
//   wrapClass?: string;
// }> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center gap-3' }) => {
//   const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useOnClickOutside(menuRef, () => setActiveMenuIndex(null));

//   const updateButton = (i: number, patch: Partial<PageButton>) => {
//     const next = [...buttons];
//     next[i] = { ...next[i], ...patch };
//     onChange(next);
//   };

//   const remove = (i: number) => {
//     setActiveMenuIndex(null);
//     onChange(buttons.filter((_, idx) => idx !== i));
//   };

//   const add = () =>
//     onChange([
//       ...buttons,
//       { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
//     ]);

//   return (
//     <div className={wrapClass} ref={menuRef}>
//       {buttons.map((btn, i) => (
//         <div key={btn.id} className="group/item relative inline-flex items-center">
//           <a
//             href={btn.url || '#'}
//             onClick={(e) => {
//               if (!btn.url || btn.url === '#') e.preventDefault();
//             }}
//             className={`px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center ${
//               btn.variant === 'primary' ? primaryClass : secondaryClass
//             }`}
//           >
//             <EditableText
//               as="span"
//               value={btn.text}
//               onCommit={(v) => updateButton(i, { text: v })}
//               placeholder="Button label"
//             />
//           </a>

//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setActiveMenuIndex(activeMenuIndex === i ? null : i);
//             }}
//             className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
//           >
//             ⚙
//           </button>

//           {activeMenuIndex === i && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3"
//             >
//               <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
//                 <span>Configure Button</span>
//                 <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-300 text-[11px]">
//                   Delete
//                 </button>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 uppercase">Target Link URL</label>
//                 <input
//                   type="text"
//                   value={btn.url || ''}
//                   onChange={(e) => updateButton(i, { url: e.target.value })}
//                   placeholder="https://example.com"
//                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 uppercase">Variant Style</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'primary' })}
//                     className={`py-1 rounded-lg border text-[11px] ${
//                       btn.variant === 'primary' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
//                     }`}
//                   >
//                     Primary
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'secondary' })}
//                     className={`py-1 rounded-lg border text-[11px] ${
//                       btn.variant !== 'primary' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
//                     }`}
//                   >
//                     Secondary
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={add}
//         className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
//       >
//         + Button
//       </button>
//     </div>
//   );
// };

// // Bullets
// const EditableBullets: React.FC<{
//   bullets: string[];
//   onChange: (next: string[]) => void;
//   renderItem: (text: React.ReactNode, i: number) => React.ReactNode;
// }> = ({ bullets, onChange, renderItem }) => {
//   const updateAt = (i: number, v: string) => {
//     const next = [...bullets];
//     next[i] = v;
//     onChange(next);
//   };
//   const remove = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));
//   const add = () => onChange([...bullets, 'New highlight…']);

//   return (
//     <>
//       {bullets.map((bp, i) => (
//         <span key={i} className="group/item relative inline-flex items-center gap-1">
//           {renderItem(<EditableText as="span" value={bp} onCommit={(v) => updateAt(i, v)} placeholder="Highlight…" />, i)}
//           <button
//             type="button"
//             onClick={() => remove(i)}
//             className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 text-[10px] flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition"
//           >
//             ×
//           </button>
//         </span>
//       ))}
//       <button type="button" onClick={add} className="text-[11px] text-slate-500 hover:text-slate-300 underline transition">
//         + Add highlight
//       </button>
//     </>
//   );
// };

// // Layout Variations
// export const ProfileServicesHero: React.FC<{
//   sec: PageSectionItem;
//   onChange: OnChange;
// }> = ({ sec, onChange }) => {
//   const badgeText = sec.badgeText;

//   return (
//     <section className="relative bg-[#0A0D14] text-white min-h-[560px] flex items-center py-16 px-6 md:px-16 border-b border-slate-800">
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <EditableImage
//           src={sec.imageUrl}
//           alt={sec.title}
//           className="w-full h-full object-cover object-right opacity-25 filter grayscale"
//           onUpdate={(url) => onChange({ imageUrl: url })}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/90 to-transparent pointer-events-none" />
//       </div>

//       <div className="relative z-10 max-w-3xl space-y-6">
//         {/* Editable & Removable Badge */}
//         {badgeText !== undefined ? (
//           <div className="group/badge relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold tracking-wider uppercase pr-8">
//             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
//             <EditableText
//               as="span"
//               value={badgeText}
//               onCommit={(v) => onChange({ badgeText: v })}
//               placeholder="React.js Development Services"
//               className="inline-block"
//             />
//             <button
//               type="button"
//               onClick={() => onChange({ badgeText: undefined })}
//               className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-slate-900/80 text-slate-400 hover:text-red-400 opacity-0 group-hover/badge:opacity-100 transition"
//               title="Remove badge"
//               data-editor-only
//             >
//               <Trash2 className="w-3 h-3" />
//             </button>
//           </div>
//         ) : (
//           <div className="pt-1" data-editor-only>
//             <button
//               type="button"
//               onClick={() => onChange({ badgeText: 'React.js Development Services' })}
//               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-dashed border-slate-700 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/50 transition"
//             >
//               <Plus className="w-3 h-3" /> Add Badge
//             </button>
//           </div>
//         )}

//         <EditableText
//           as="h1"
//           value={sec.title}
//           onCommit={(v) => onChange({ title: v })}
//           placeholder="Hero title…"
//           className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]"
//         />

//         <EditableText
//           as="div"
//           value={sec.subtitle}
//           onCommit={(v) => onChange({ subtitle: v })}
//           placeholder="Hero subtitle…"
//           className="block text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed whitespace-pre-line font-normal"
//         />

//         {sec.buttons && (
//           <div className="pt-2">
//             <EditableButtons
//               buttons={sec.buttons}
//               onChange={(buttons) => onChange({ buttons })}
//               primaryClass="bg-white text-slate-950 hover:bg-slate-200 shadow-md hover:shadow-lg"
//               secondaryClass="bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// const StandardHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   const isSplitLeft = sec.layoutStyle === 'split-left';
//   const isCentered = sec.layoutStyle === 'centered';
//   const bulletPoints = sec.bulletPoints || [];

//   return (
//     <section className={`relative py-16 px-6 text-white ${sec.bgTheme === 'indigo' ? 'bg-indigo-950' : sec.bgTheme === 'slate' ? 'bg-slate-900' : 'bg-slate-950'}`}>
//       <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//         <div className={`${isCentered ? 'md:col-span-12 text-center' : sec.imageUrl ? 'md:col-span-7' : 'md:col-span-12'} ${isSplitLeft ? 'md:order-2' : ''}`}>
//           <EditableText
//             as="h1"
//             value={sec.title}
//             onCommit={(v) => onChange({ title: v })}
//             placeholder="Hero title…"
//             className="block text-4xl font-extrabold tracking-tight mb-4 text-white"
//           />
//           <EditableText
//             as="p"
//             value={sec.subtitle}
//             onCommit={(v) => onChange({ subtitle: v })}
//             placeholder="Hero subtitle…"
//             className="block text-slate-300 text-base leading-relaxed mb-6"
//           />

//           <div className={`space-y-2 mb-6 text-xs text-slate-300 ${isCentered ? 'items-center flex flex-col' : ''}`}>
//             <EditableBullets
//               bullets={bulletPoints}
//               onChange={(next) => onChange({ bulletPoints: next })}
//               renderItem={(text) => (
//                 <span className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
//                   {text}
//                 </span>
//               )}
//             />
//           </div>

//           {sec.buttons && (
//             <EditableButtons
//               buttons={sec.buttons}
//               onChange={(buttons) => onChange({ buttons })}
//               primaryClass="bg-indigo-600 text-white hover:bg-indigo-500"
//               secondaryClass="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
//               wrapClass={`flex flex-wrap gap-3 ${isCentered ? 'justify-center' : 'justify-start'}`}
//             />
//           )}
//         </div>

//         {!isCentered && (
//           <div className={`md:col-span-5 ${isSplitLeft ? 'md:order-1' : ''}`}>
//             <div className="rounded-2xl border border-slate-800 shadow-2xl relative">
//               <EditableImage
//                 src={sec.imageUrl}
//                 alt={sec.title}
//                 className="w-full h-auto object-cover rounded-2xl"
//                 onUpdate={(url) => onChange({ imageUrl: url })}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export const InteractiveCodeHero: React.FC<{
//   sec: PageSectionItem;
//   onChange: OnChange;
// }> = ({ sec, onChange }) => {
//   const bulletPoints = sec.bulletPoints || [];
//   const badgeText = sec.badgeText;// !== undefined ? sec.badgeText : 'Available for Q3/Q4 Architecture Projects';

//   return (
//     <section className="relative bg-slate-950 text-white py-20 px-6 md:px-16 border-b border-slate-800/80">
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//         <div className="lg:col-span-7 space-y-6">
//           {/* Editable & Removable Badge */}
//           {badgeText !== undefined ? (
//             <div className="group/badge relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide pr-8">
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
//               <EditableText
//                 as="span"
//                 value={badgeText}
//                 onCommit={(v) => onChange({ badgeText: v })}
//                 placeholder="Status badge content…"
//                 className="inline-block"
//               />
//               <button
//                 type="button"
//                 onClick={() => onChange({ badgeText: undefined })}
//                 className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-slate-900/80 text-slate-400 hover:text-red-400 opacity-0 group-hover/badge:opacity-100 transition"
//                 title="Remove badge"
//                 data-editor-only
//               >
//                 <Trash2 className="w-3 h-3" />
//               </button>
//             </div>
//           ) : (
//             <div className="pt-1" data-editor-only>
//               <button
//                 type="button"
//                 onClick={() => onChange({ badgeText: 'Available for Q3/Q4 Architecture Projects' })}
//                 className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-dashed border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition"
//               >
//                 <Plus className="w-3 h-3" /> Add Status Badge
//               </button>
//             </div>
//           )}

//           <EditableText
//             as="h1"
//             value={sec.title}
//             onCommit={(v) => onChange({ title: v })}
//             placeholder="Hero title…"
//             className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
//           />

//           <EditableText
//             as="p"
//             value={sec.subtitle}
//             onCommit={(v) => onChange({ subtitle: v })}
//             placeholder="Hero subtitle…"
//             className="block text-sm md:text-base text-slate-300 leading-relaxed max-w-xl"
//           />

//           <div className="flex flex-wrap gap-2 pt-1">
//             <EditableBullets
//               bullets={bulletPoints}
//               onChange={(next) => onChange({ bulletPoints: next })}
//               renderItem={(text) => (
//                 <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
//                   ⚡ {text}
//                 </span>
//               )}
//             />
//           </div>

//           {sec.buttons && (
//             <div className="pt-3">
//               <EditableButtons
//                 buttons={sec.buttons}
//                 onChange={(buttons) => onChange({ buttons })}
//                 primaryClass="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20"
//                 secondaryClass="bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800"
//               />
//             </div>
//           )}
//         </div>

//         <div className="lg:col-span-5">
//           <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl overflow-hidden">
//             <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
//               </div>
//               <span className="text-[11px] font-mono text-slate-400">api_gateway.py</span>
//             </div>

//             <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed">
//               <p className="text-slate-500"># Next-gen async API route</p>
//               <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends</p>
//               <p><span className="text-purple-400">from</span> app.services <span className="text-purple-400">import</span> AIStreamer</p>
//               <br />
//               <p><span className="text-blue-400">@app</span>.post(<span className="text-emerald-300">"/v1/build"</span>)</p>
//               <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">execute_pipeline</span>(payload: ProjectSchema):</p>
//               <p className="pl-4 text-slate-300">result = <span className="text-purple-400">await</span> AIStreamer.deploy(payload)</p>
//               <p className="pl-4 text-purple-400">return <span className="text-slate-300">{`{"status": "success", "score": 100}`}</span></p>
//             </div>

//             <div className="px-5 py-3 bg-indigo-950/40 border-t border-slate-800/80 flex items-center justify-between text-xs">
//               <span className="text-slate-400">Lighthouse Performance</span>
//               <span className="font-bold text-emerald-400">100 / 100</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// // Main Export Component
// export const HeroView: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   if (sec.layoutStyle === 'profile-hero') return <ProfileServicesHero sec={sec} onChange={onChange} />;
//   if (sec.layoutStyle === 'interactive-code-hero') return <InteractiveCodeHero sec={sec} onChange={onChange} />;
//   return <StandardHero sec={sec} onChange={onChange} />;
// };





// import React, { useState, useRef, useEffect } from 'react';
// import { PageButton, PageSectionItem } from '../types';

// type OnChange = (patch: Partial<PageSectionItem>) => void;

// // =========================================================
// // Custom Hook for Outside Clicks
// // =========================================================
// function useOnClickOutside<T extends HTMLElement>(
//   ref: React.RefObject<T | null>,
//   handler: () => void
// ) {
//   useEffect(() => {
//     const listener = (event: MouseEvent | TouchEvent) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }
//       handler();
//     };
//     document.addEventListener('mousedown', listener);
//     document.addEventListener('touchstart', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//       document.removeEventListener('touchstart', listener);
//     };
//   }, [ref, handler]);
// }

// // =========================================================
// // Shared Editable-Text Primitive
// // =========================================================
// export const EditableText: React.FC<{
//   value: string;
//   onCommit: (next: string) => void;
//   as?: React.ElementType;
//   className?: string;
//   placeholder?: string;
//   multiline?: boolean;
// }> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
//   const ref = useRef<HTMLElement>(null);
//   const [focused, setFocused] = useState(false);

//   useEffect(() => {
//     if (!focused && ref.current && ref.current.innerText !== value) {
//       ref.current.innerText = value;
//     }
//   }, [value, focused]);

//   return (
//     <Tag
//       ref={ref}
//       contentEditable
//       suppressContentEditableWarning
//       onFocus={() => setFocused(true)}
//       onBlur={(e: React.FocusEvent<HTMLElement>) => {
//         setFocused(false);
//         onCommit(e.currentTarget.innerText);
//       }}
//       data-placeholder={placeholder}
//       className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//     />
//   );
// };

// // =========================================================
// // Interactive Image Control Popover (Fixed Positioning)
// // =========================================================
// export const EditableImage: React.FC<{
//   src?: string;
//   alt?: string;
//   className?: string;
//   onUpdate: (url: string) => void;
// }> = ({ src, alt = 'Hero Image', className = '', onUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [urlInput, setUrlInput] = useState(src || '');
//   const menuRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useOnClickOutside(menuRef, () => setIsOpen(false));

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (typeof reader.result === 'string') {
//           onUpdate(reader.result);
//           setIsOpen(false);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div ref={menuRef} className="relative group/image inline-block w-full">
//       {src ? (
//         <img src={src} alt={alt} className={className} />
//       ) : (
//         <div className="w-full h-48 bg-slate-800/60 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-400 text-sm">
//           No Image Set
//         </div>
//       )}

//       {/* Floating trigger button */}
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white border border-slate-700 text-xs font-semibold shadow-lg backdrop-blur hover:bg-slate-800 opacity-0 group-hover/image:opacity-100 transition duration-200 z-20 flex items-center gap-1.5"
//         data-editor-only
//       >
//         <span>📷 Edit Image</span>
//       </button>

//       {/* Popover Menu (Positioned safely left-0/top-12 z-50 to avoid clipping) */}
//       {isOpen && (
//         <div className="absolute top-12 right-2 z-50 w-64 sm:w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 space-y-3 text-slate-200 text-xs" data-editor-only>
//           <div className="font-bold text-slate-100 border-b border-slate-800 pb-2">Image Options</div>

//           <div className="space-y-1">
//             <label className="text-[11px] text-slate-400 font-medium">Image URL</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={urlInput}
//                 onChange={(e) => setUrlInput(e.target.value)}
//                 placeholder="https://..."
//                 className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   onUpdate(urlInput);
//                   setIsOpen(false);
//                 }}
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg shrink-0"
//               >
//                 Save
//               </button>
//             </div>
//           </div>

//           <div className="relative flex py-1 items-center">
//             <div className="flex-grow border-t border-slate-800"></div>
//             <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Or</span>
//             <div className="flex-grow border-t border-slate-800"></div>
//           </div>

//           <div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-3 rounded-lg border border-slate-700 transition flex items-center justify-center gap-2"
//             >
//               <span>📁 Upload from Computer</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Small "x" chip used to delete a bullet / button inline.
// const RemoveChip: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     title={label}
//     className="w-4 h-4 shrink-0 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition"
//   >
//     ×
//   </button>
// );

// // =========================================================
// // Editable Buttons Row (Positioned Above Button)
// // =========================================================
// const EditableButtons: React.FC<{
//   buttons: PageButton[];
//   onChange: (next: PageButton[]) => void;
//   primaryClass: string;
//   secondaryClass: string;
//   wrapClass?: string;
// }> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center gap-3' }) => {
//   const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useOnClickOutside(menuRef, () => setActiveMenuIndex(null));

//   const updateButton = (i: number, patch: Partial<PageButton>) => {
//     const next = [...buttons];
//     next[i] = { ...next[i], ...patch };
//     onChange(next);
//   };

//   const remove = (i: number) => {
//     setActiveMenuIndex(null);
//     onChange(buttons.filter((_, idx) => idx !== i));
//   };

//   const add = () =>
//     onChange([
//       ...buttons,
//       { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
//     ]);

//   return (
//     <div className={wrapClass} ref={menuRef}>
//       {buttons.map((btn, i) => (
//         <div key={btn.id} className="group/item relative inline-flex items-center">
//           {/* Rendered as link <a> element */}
//           <a
//             href={btn.url || '#'}
//             onClick={(e) => {
//               if (!btn.url || btn.url === '#') {
//                 e.preventDefault();
//               }
//             }}
//             className={`px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center ${btn.variant === 'primary' ? primaryClass : secondaryClass
//               }`}
//           >
//             <EditableText
//               as="span"
//               value={btn.text}
//               onCommit={(v) => updateButton(i, { text: v })}
//               placeholder="Button label"
//             />
//           </a>

//           {/* Configuration Trigger */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setActiveMenuIndex(activeMenuIndex === i ? null : i);
//             }}
//             title="Configure Button Link & Style"
//             className="ml-1 w-5 h-5 shrink-0 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition z-10"
//             data-editor-only
//           >
//             ⚙
//           </button>

//           {/* Button Settings Menu (Positioned Above with bottom-full) */}
//           {activeMenuIndex === i && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-slate-200 text-xs space-y-3"
//               data-editor-only
//             >
//               <div className="font-bold border-b border-slate-800 pb-1.5 flex justify-between items-center">
//                 <span>Configure Button Link</span>
//                 <button
//                   type="button"
//                   onClick={() => remove(i)}
//                   className="text-red-400 hover:text-red-300 text-[11px] font-normal"
//                 >
//                   Delete
//                 </button>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 font-medium uppercase">Target Link URL</label>
//                 <input
//                   type="text"
//                   value={btn.url || ''}
//                   onChange={(e) => updateButton(i, { url: e.target.value })}
//                   placeholder="https://example.com"
//                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] text-slate-400 font-medium uppercase">Variant Style</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'primary' })}
//                     className={`py-1 rounded-lg border text-[11px] font-semibold ${btn.variant === 'primary'
//                         ? 'bg-indigo-600 border-indigo-500 text-white'
//                         : 'bg-slate-800 border-slate-700 text-slate-400'
//                       }`}
//                   >
//                     Primary
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => updateButton(i, { variant: 'secondary' })}
//                     className={`py-1 rounded-lg border text-[11px] font-semibold ${btn.variant !== 'primary'
//                         ? 'bg-indigo-600 border-indigo-500 text-white'
//                         : 'bg-slate-800 border-slate-700 text-slate-400'
//                       }`}
//                   >
//                     Secondary
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={add}
//         className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
//         data-editor-only
//       >
//         + Button
//       </button>
//     </div>
//   );
// };

// // =========================================================
// // Editable Bullet List
// // =========================================================
// const EditableBullets: React.FC<{
//   bullets: string[];
//   onChange: (next: string[]) => void;
//   renderItem: (text: React.ReactNode, i: number) => React.ReactNode;
// }> = ({ bullets, onChange, renderItem }) => {
//   const updateAt = (i: number, v: string) => {
//     const next = [...bullets];
//     next[i] = v;
//     onChange(next);
//   };
//   const remove = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));
//   const add = () => onChange([...bullets, 'New highlight…']);

//   return (
//     <>
//       {bullets.map((bp, i) => (
//         <span key={i} className="group/item relative inline-flex items-center gap-1">
//           {renderItem(
//             <EditableText
//               as="span"
//               value={bp}
//               onCommit={(v) => updateAt(i, v)}
//               placeholder="Highlight…"
//             />,
//             i
//           )}
//           <RemoveChip onClick={() => remove(i)} label="Remove highlight" />
//         </span>
//       ))}
//       <button
//         type="button"
//         onClick={add}
//         className="text-[11px] text-slate-500 hover:text-slate-300 underline underline-offset-2 transition"
//       >
//         + Add highlight
//       </button>
//     </>
//   );
// };

// // =========================================================
// // 1. Profile Services Hero
// // =========================================================
// const ProfileServicesHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => (
//   <section className="relative bg-[#0A0D14] text-white min-h-[560px] flex items-center py-16 px-6 md:px-16 border-b border-slate-800">
//     <div className="absolute inset-0 z-0 overflow-hidden">
//       <EditableImage
//         src={sec.imageUrl}
//         alt={sec.title}
//         className="w-full h-full object-cover object-right opacity-25 filter grayscale"
//         onUpdate={(url) => onChange({ imageUrl: url })}
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/90 to-transparent pointer-events-none" />
//     </div>

//     <div className="relative z-10 max-w-3xl space-y-6">
//       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold tracking-wider uppercase">
//         <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//         React.js Development Services
//       </div>

//       <EditableText
//         as="h1"
//         value={sec.title}
//         onCommit={(v) => onChange({ title: v })}
//         placeholder="Hero title…"
//         className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]"
//       />

//       <EditableText
//         as="div"
//         value={sec.subtitle}
//         onCommit={(v) => onChange({ subtitle: v })}
//         placeholder="Hero subtitle…"
//         className="block text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed whitespace-pre-line font-normal"
//       />

//       {sec.buttons && (
//         <div className="pt-2">
//           <EditableButtons
//             buttons={sec.buttons}
//             onChange={(buttons) => onChange({ buttons })}
//             primaryClass="bg-white text-slate-950 hover:bg-slate-200 shadow-md hover:shadow-lg"
//             secondaryClass="bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
//           />
//         </div>
//       )}
//     </div>
//   </section>
// );

// // =========================================================
// // 2. Standard Hero (Split-Right / Split-Left / Centered)
// // =========================================================
// const StandardHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   const isSplitLeft = sec.layoutStyle === 'split-left';
//   const isCentered = sec.layoutStyle === 'centered';
//   const bulletPoints = sec.bulletPoints || [];

//   return (
//     <section
//       className={`relative py-16 px-6 text-white ${sec.bgTheme === 'indigo' ? 'bg-indigo-950' : sec.bgTheme === 'slate' ? 'bg-slate-900' : 'bg-slate-950'
//         }`}
//     >
//       <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//         <div
//           className={`${isCentered ? 'md:col-span-12 text-center' : sec.imageUrl ? 'md:col-span-7' : 'md:col-span-12'
//             } ${isSplitLeft ? 'md:order-2' : ''}`}
//         >
//           <EditableText
//             as="h1"
//             value={sec.title}
//             onCommit={(v) => onChange({ title: v })}
//             placeholder="Hero title…"
//             className="block text-4xl font-extrabold tracking-tight mb-4 text-white"
//           />
//           <EditableText
//             as="p"
//             value={sec.subtitle}
//             onCommit={(v) => onChange({ subtitle: v })}
//             placeholder="Hero subtitle…"
//             className="block text-slate-300 text-base leading-relaxed mb-6"
//           />

//           <div className={`space-y-2 mb-6 text-xs text-slate-300 ${isCentered ? 'items-center flex flex-col' : ''}`}>
//             <EditableBullets
//               bullets={bulletPoints}
//               onChange={(next) => onChange({ bulletPoints: next })}
//               renderItem={(text) => (
//                 <span className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
//                   {text}
//                 </span>
//               )}
//             />
//           </div>

//           {sec.buttons && (
//             <EditableButtons
//               buttons={sec.buttons}
//               onChange={(buttons) => onChange({ buttons })}
//               primaryClass="bg-indigo-600 text-white hover:bg-indigo-500"
//               secondaryClass="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
//               wrapClass={`flex flex-wrap gap-3 ${isCentered ? 'justify-center' : 'justify-start'}`}
//             />
//           )}
//         </div>

//         {!isCentered && (
//           <div className={`md:col-span-5 ${isSplitLeft ? 'md:order-1' : ''}`}>
//             {/* Removed overflow-hidden from image frame so popovers render completely */}
//             <div className="rounded-2xl border border-slate-800 shadow-2xl relative">
//               <EditableImage
//                 src={sec.imageUrl}
//                 alt={sec.title}
//                 className="w-full h-auto object-cover rounded-2xl"
//                 onUpdate={(url) => onChange({ imageUrl: url })}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// // =========================================================
// // 3. Interactive Code Hero
// // =========================================================
// const InteractiveCodeHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   const bulletPoints = sec.bulletPoints || [];

//   return (
//     <section className="relative bg-slate-950 text-white py-20 px-6 md:px-16 border-b border-slate-800/80">
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//         <div className="lg:col-span-7 space-y-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//             Available for Q3/Q4 Architecture Projects
//           </div>

//           <EditableText
//             as="h1"
//             value={sec.title}
//             onCommit={(v) => onChange({ title: v })}
//             placeholder="Hero title…"
//             className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
//           />

//           <EditableText
//             as="p"
//             value={sec.subtitle}
//             onCommit={(v) => onChange({ subtitle: v })}
//             placeholder="Hero subtitle…"
//             className="block text-sm md:text-base text-slate-300 leading-relaxed max-w-xl"
//           />

//           <div className="flex flex-wrap gap-2 pt-1">
//             <EditableBullets
//               bullets={bulletPoints}
//               onChange={(next) => onChange({ bulletPoints: next })}
//               renderItem={(text) => (
//                 <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
//                   ⚡ {text}
//                 </span>
//               )}
//             />
//           </div>

//           {sec.buttons && (
//             <div className="pt-3">
//               <EditableButtons
//                 buttons={sec.buttons}
//                 onChange={(buttons) => onChange({ buttons })}
//                 primaryClass="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20"
//                 secondaryClass="bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right Column: Code Card */}
//         <div className="lg:col-span-5">
//           <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl overflow-hidden">
//             <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
//               </div>
//               <span className="text-[11px] font-mono text-slate-400">api_gateway.py</span>
//             </div>

//             <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed">
//               <p className="text-slate-500"># Next-gen async API route</p>
//               <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends</p>
//               <p><span className="text-purple-400">from</span> app.services <span className="text-purple-400">import</span> AIStreamer</p>
//               <br />
//               <p><span className="text-blue-400">@app</span>.post(<span className="text-emerald-300">"/v1/build"</span>)</p>
//               <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">execute_pipeline</span>(payload: ProjectSchema):</p>
//               <p className="pl-4 text-slate-300">result = <span className="text-purple-400">await</span> AIStreamer.deploy(payload)</p>
//               <p className="pl-4 text-purple-400">return <span className="text-slate-300">{`{"status": "success", "score": 100}`}</span></p>
//             </div>

//             <div className="px-5 py-3 bg-indigo-950/40 border-t border-slate-800/80 flex items-center justify-between text-xs">
//               <span className="text-slate-400">Lighthouse Performance</span>
//               <span className="font-bold text-emerald-400">100 / 100</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // =========================================================
// // Main Router
// // =========================================================
// export const HeroView: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   if (sec.layoutStyle === 'profile-hero') return <ProfileServicesHero sec={sec} onChange={onChange} />;
//   if (sec.layoutStyle === 'interactive-code-hero') return <InteractiveCodeHero sec={sec} onChange={onChange} />;
//   return <StandardHero sec={sec} onChange={onChange} />;
// };




// import React, { useState } from 'react';
// import { PageButton, PageSectionItem } from '../types';

// // A patch callback: caller decides how to merge it into state.
// type OnChange = (patch: Partial<PageSectionItem>) => void;

// // =========================================================
// // Shared editable-text primitive
// // contentEditable that behaves like a text field: writes back
// // on blur (not every keystroke), and only re-syncs from props
// // while not focused so you don't fight the caret.
// // =========================================================
// export const EditableText: React.FC<{
//   value: string;
//   onCommit: (next: string) => void;
//   as?: React.ElementType;
//   className?: string;
//   placeholder?: string;
//   multiline?: boolean;
// }> = ({ value, onCommit, as: Tag = 'span', className = '', placeholder = 'Click to edit…' }) => {
//   const ref = React.useRef<HTMLElement>(null);
//   const [focused, setFocused] = useState(false);

//   React.useEffect(() => {
//     if (!focused && ref.current && ref.current.innerText !== value) {
//       ref.current.innerText = value;
//     }
//   }, [value, focused]);

//   return (
//     <Tag
//       ref={ref}
//       contentEditable
//       suppressContentEditableWarning
//       onFocus={() => setFocused(true)}
//       onBlur={(e: React.FocusEvent<HTMLElement>) => {
//         setFocused(false);
//         onCommit(e.currentTarget.innerText);
//       }}
//       data-placeholder={placeholder}
//       className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 ${className}`}
//     />
//   );
// };

// // Small "x" chip used to delete a bullet / button inline.
// const RemoveChip: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     title={label}
//     className="w-4 h-4 shrink-0 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 text-[10px] leading-none flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition"
//   >
//     ×
//   </button>
// );

// // =========================================================
// // Editable buttons row — reused by all three hero variants.
// // =========================================================
// const EditableButtons: React.FC<{
//   buttons: PageButton[];
//   onChange: (next: PageButton[]) => void;
//   primaryClass: string;
//   secondaryClass: string;
//   wrapClass?: string;
// }> = ({ buttons, onChange, primaryClass, secondaryClass, wrapClass = 'flex flex-wrap items-center gap-3' }) => {
//   const updateText = (i: number, text: string) => {
//     const next = [...buttons];
//     next[i] = { ...next[i], text };
//     onChange(next);
//   };
//   const remove = (i: number) => onChange(buttons.filter((_, idx) => idx !== i));
//   const add = () =>
//     onChange([
//       ...buttons,
//       { id: `btn-${Date.now()}`, text: 'New Button', url: '#', variant: buttons.length === 0 ? 'primary' : 'secondary' },
//     ]);

//   return (
//     <div className={wrapClass}>
//       {buttons.map((btn, i) => (
//         <span key={btn.id} className="group/item relative inline-flex items-center">
//           <EditableText
//             as="span"
//             value={btn.text}
//             onCommit={(v) => updateText(i, v)}
//             placeholder="Button label"
//             className={`px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center ${
//               btn.variant === 'primary' ? primaryClass : secondaryClass
//             }`}
//           />
//           <span className="absolute -top-1.5 -right-1.5">
//             <RemoveChip onClick={() => remove(i)} label="Remove button" />
//           </span>
//         </span>
//       ))}
//       <button
//         type="button"
//         onClick={add}
//         className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition"
//       >
//         + Button
//       </button>
//     </div>
//   );
// };

// // =========================================================
// // Editable bullet list — reused by Standard + Code hero.
// // =========================================================
// const EditableBullets: React.FC<{
//   bullets: string[];
//   onChange: (next: string[]) => void;
//   renderItem: (text: React.ReactNode, i: number) => React.ReactNode;
// }> = ({ bullets, onChange, renderItem }) => {
//   const updateAt = (i: number, v: string) => {
//     const next = [...bullets];
//     next[i] = v;
//     onChange(next);
//   };
//   const remove = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));
//   const add = () => onChange([...bullets, 'New highlight…']);

//   return (
//     <>
//       {bullets.map((bp, i) => (
//         <span key={i} className="group/item relative inline-flex items-center gap-1">
//           {renderItem(
//             <EditableText
//               as="span"
//               value={bp}
//               onCommit={(v) => updateAt(i, v)}
//               placeholder="Highlight…"
//             />,
//             i
//           )}
//           <RemoveChip onClick={() => remove(i)} label="Remove highlight" />
//         </span>
//       ))}
//       <button
//         type="button"
//         onClick={add}
//         className="text-[11px] text-slate-500 hover:text-slate-300 underline underline-offset-2 transition"
//       >
//         + Add highlight
//       </button>
//     </>
//   );
// };

// // =========================================================
// // 1. Profile Services Hero
// // =========================================================
// const ProfileServicesHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => (
//   <section className="relative overflow-hidden bg-[#0A0D14] text-white min-h-[560px] flex items-center py-16 px-6 md:px-16 border-b border-slate-800">
//     {sec.imageUrl && (
//       <div className="absolute inset-0 z-0">
//         <img
//           src={sec.imageUrl}
//           alt={sec.title}
//           className="w-full h-full object-cover object-right opacity-25 filter grayscale"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/90 to-transparent" />
//       </div>
//     )}

//     <div className="relative z-10 max-w-3xl space-y-6">
//       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold tracking-wider uppercase">
//         <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//         React.js Development Services
//       </div>

//       <EditableText
//         as="h1"
//         value={sec.title}
//         onCommit={(v) => onChange({ title: v })}
//         placeholder="Hero title…"
//         className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]"
//       />

//       <EditableText
//         as="div"
//         value={sec.subtitle}
//         onCommit={(v) => onChange({ subtitle: v })}
//         placeholder="Hero subtitle…"
//         className="block text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed whitespace-pre-line font-normal"
//       />

//       {sec.buttons && (
//         <div className="pt-2">
//           <EditableButtons
//             buttons={sec.buttons}
//             onChange={(buttons) => onChange({ buttons })}
//             primaryClass="bg-white text-slate-950 hover:bg-slate-200 shadow-md hover:shadow-lg"
//             secondaryClass="bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
//           />
//         </div>
//       )}
//     </div>
//   </section>
// );

// // =========================================================
// // 2. Standard Hero (split-right / split-left / centered)
// // =========================================================
// const StandardHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   const isSplitLeft = sec.layoutStyle === 'split-left';
//   const isCentered = sec.layoutStyle === 'centered';
//   const bulletPoints = sec.bulletPoints || [];

//   return (
//     <section
//       className={`relative py-16 px-6 text-white overflow-hidden ${
//         sec.bgTheme === 'indigo' ? 'bg-indigo-950' : sec.bgTheme === 'slate' ? 'bg-slate-900' : 'bg-slate-950'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//         <div
//           className={`${
//             isCentered ? 'md:col-span-12 text-center' : sec.imageUrl ? 'md:col-span-7' : 'md:col-span-12'
//           } ${isSplitLeft ? 'md:order-2' : ''}`}
//         >
//           <EditableText
//             as="h1"
//             value={sec.title}
//             onCommit={(v) => onChange({ title: v })}
//             placeholder="Hero title…"
//             className="block text-4xl font-extrabold tracking-tight mb-4 text-white"
//           />
//           <EditableText
//             as="p"
//             value={sec.subtitle}
//             onCommit={(v) => onChange({ subtitle: v })}
//             placeholder="Hero subtitle…"
//             className="block text-slate-300 text-base leading-relaxed mb-6"
//           />

//           <div className={`space-y-2 mb-6 text-xs text-slate-300 ${isCentered ? 'items-center flex flex-col' : ''}`}>
//             <EditableBullets
//               bullets={bulletPoints}
//               onChange={(next) => onChange({ bulletPoints: next })}
//               renderItem={(text) => (
//                 <span className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
//                   {text}
//                 </span>
//               )}
//             />
//           </div>

//           {sec.buttons && (
//             <EditableButtons
//               buttons={sec.buttons}
//               onChange={(buttons) => onChange({ buttons })}
//               primaryClass="bg-indigo-600 text-white hover:bg-indigo-500"
//               secondaryClass="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
//               wrapClass={`flex flex-wrap gap-3 ${isCentered ? 'justify-center' : 'justify-start'}`}
//             />
//           )}
//         </div>

//         {sec.imageUrl && !isCentered && (
//           <div className={`md:col-span-5 ${isSplitLeft ? 'md:order-1' : ''}`}>
//             <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
//               <img src={sec.imageUrl} alt={sec.title} className="w-full h-auto object-cover" />
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// // =========================================================
// // 3. Interactive Code Hero
// // =========================================================
// const InteractiveCodeHero: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   const bulletPoints = sec.bulletPoints || [];

//   return (
//     <section className="relative overflow-hidden bg-slate-950 text-white py-20 px-6 md:px-16 border-b border-slate-800/80">
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//         <div className="lg:col-span-7 space-y-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//             Available for Q3/Q4 Architecture Projects
//           </div>

//           <EditableText
//             as="h1"
//             value={sec.title}
//             onCommit={(v) => onChange({ title: v })}
//             placeholder="Hero title…"
//             className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
//           />

//           <EditableText
//             as="p"
//             value={sec.subtitle}
//             onCommit={(v) => onChange({ subtitle: v })}
//             placeholder="Hero subtitle…"
//             className="block text-sm md:text-base text-slate-300 leading-relaxed max-w-xl"
//           />

//           <div className="flex flex-wrap gap-2 pt-1">
//             <EditableBullets
//               bullets={bulletPoints}
//               onChange={(next) => onChange({ bulletPoints: next })}
//               renderItem={(text) => (
//                 <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
//                   ⚡ {text}
//                 </span>
//               )}
//             />
//           </div>

//           {sec.buttons && (
//             <div className="pt-3">
//               <EditableButtons
//                 buttons={sec.buttons}
//                 onChange={(buttons) => onChange({ buttons })}
//                 primaryClass="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20"
//                 secondaryClass="bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right Column: decorative code card — not editable content */}
//         <div className="lg:col-span-5">
//           <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl overflow-hidden">
//             <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
//               </div>
//               <span className="text-[11px] font-mono text-slate-400">api_gateway.py</span>
//             </div>

//             <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed">
//               <p className="text-slate-500"># Next-gen async API route</p>
//               <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends</p>
//               <p><span className="text-purple-400">from</span> app.services <span className="text-purple-400">import</span> AIStreamer</p>
//               <br />
//               <p><span className="text-blue-400">@app</span>.post(<span className="text-emerald-300">"/v1/build"</span>)</p>
//               <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">execute_pipeline</span>(payload: ProjectSchema):</p>
//               <p className="pl-4 text-slate-300">result = <span className="text-purple-400">await</span> AIStreamer.deploy(payload)</p>
//               <p className="pl-4 text-purple-400">return <span className="text-slate-300">{`{"status": "success", "score": 100}`}</span></p>
//             </div>

//             <div className="px-5 py-3 bg-indigo-950/40 border-t border-slate-800/80 flex items-center justify-between text-xs">
//               <span className="text-slate-400">Lighthouse Performance</span>
//               <span className="font-bold text-emerald-400">100 / 100</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // =========================================================
// // Main router — picks the variant, everything inside is
// // already directly editable. No separate form.
// // =========================================================
// export const HeroView: React.FC<{ sec: PageSectionItem; onChange: OnChange }> = ({ sec, onChange }) => {
//   if (sec.layoutStyle === 'profile-hero') return <ProfileServicesHero sec={sec} onChange={onChange} />;
//   if (sec.layoutStyle === 'interactive-code-hero') return <InteractiveCodeHero sec={sec} onChange={onChange} />;
//   return <StandardHero sec={sec} onChange={onChange} />;
// };