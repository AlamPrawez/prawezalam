import React from 'react';
import { ExternalLink } from 'lucide-react';

export function renderRichTextWithLinks(text: string) {
  if (!text) return null;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`${match.index}-${match[2]}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold inline-flex items-center gap-1 transition-colors"
      >
        {match[1]} <ExternalLink className="w-3 h-3 inline" />
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export function renderButtonStyle(variant: string) {
  switch (variant) {
    case 'secondary':
      return 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 shadow-md';
    case 'outline':
      return 'bg-transparent hover:bg-indigo-600/10 text-indigo-400 border border-indigo-500/40 shadow-sm';
    case 'ghost':
      return 'bg-transparent hover:bg-white/5 text-slate-300 shadow-none';
    case 'primary':
    default:
      return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30';
  }
}

export function getPaddingClass(size?: string) {
  switch (size) {
    case 'sm': return 'p-4 sm:p-6';
    case 'md': return 'p-6 sm:p-10';
    case 'xl': return 'p-10 sm:p-20';
    case 'lg':
    default: return 'p-8 sm:p-14';
  }
}

export function getThemeClass(theme: string) {
  switch (theme) {
    case 'indigo': return 'bg-indigo-950/80 border-indigo-500/40 text-white';
    case 'light': return 'bg-slate-100 border-slate-300 text-slate-900';
    case 'slate': return 'bg-slate-900 border-slate-800 text-slate-100';
    case 'dark':
    default: return 'bg-slate-950 border-slate-800 text-white';
  }
}