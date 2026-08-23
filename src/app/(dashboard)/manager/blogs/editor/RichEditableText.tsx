"use client"

import { useEffect, useRef, useState } from "react";
import { BookOpen, Quote, Link as LinkIcon, Unlink, X } from 'lucide-react';

export const RichEditableText: React.FC<{
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
      if (ref.current) {
        const anchors = ref.current.querySelectorAll('a');
        anchors.forEach((a) => {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.classList.add('text-indigo-400', 'underline', 'hover:text-indigo-300', 'transition');
        });
      }
    }
    setShowLinkModal(false);
    if (ref.current) onCommit(ref.current.innerHTML);
  };

  const handleUnlink = () => {
    restoreSelection();
    document.execCommand('unlink', false);
    setShowLinkModal(false);
    if (ref.current) onCommit(ref.current.innerHTML);
  };

  return (
    <div className="relative group/text-editor inline-block w-full">
      <div
        className="sticky top-2 z-30 mb-2 hidden group-focus-within/text-editor:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl max-w-max text-xs"
        data-editor-only
      >
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
        <div
          className="absolute top-10 left-0 z-40 bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl space-y-3 w-80"
          data-editor-only
        >
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
            autoFocus
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
        className={`outline-none rounded-md transition focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500/60 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 [&_a]:text-indigo-400 [&_a]:underline [&_a]:hover:text-indigo-300 ${className}`}
      />
    </div>
  );
};