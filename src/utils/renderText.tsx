import React from 'react';

export function renderText(value: any): React.ReactNode {
  if (value === null || value === undefined) return '';

  let rawText = '';

  if (typeof value === 'string' || typeof value === 'number') {
    rawText = String(value);
  } else if (typeof value === 'object') {
    rawText =
      value.text ||
      value.title ||
      value.label ||
      value.heading ||
      value.name ||
      value.desc ||
      value.description ||
      '';
  }

  if (!rawText) return '';

  // Capturing groups: [1] = Link Label, [2] = Link URL
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = rawText.split(markdownLinkRegex);

  // If no markdown links are found, return plain text
  if (parts.length === 1) return rawText;

  const result: React.ReactNode[] = [];

  // String.split with 2 groups yields chunks in steps of 3:
  // [plainText, linkText, linkUrl, plainText, linkText, linkUrl, ...]
  for (let i = 0; i < parts.length; i += 3) {
    // 1. Add plain text before link
    if (parts[i]) {
      result.push(parts[i]);
    }

    // 2. Add the formatted <a> tag if link text & URL exist
    if (i + 1 < parts.length && i + 2 < parts.length) {
      const linkText = parts[i + 1];
      const linkUrl = parts[i + 2];

      result.push(
        <a
          key={i}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline font-medium"
        >
          {linkText}
        </a>
      );
    }
  }

  return result;
}



export const htmlToTextWithLinks = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const blockTags = new Set(['P', 'DIV', 'BR', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TR']);

  let result = '';

  const walk = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent || '';
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;

    if (el.tagName === 'A') {
      const href = el.getAttribute('href') || '';
      const label = el.textContent?.trim() || '';
      result += href && label ? `[${label}](${href})` : label;
      return;
    }

    if (el.tagName === 'BR') {
      result += '\n';
      return;
    }

    el.childNodes.forEach(walk);

    if (blockTags.has(el.tagName)) {
      result += '\n';
    }
  };

  doc.body.childNodes.forEach(walk);
  return result;
};