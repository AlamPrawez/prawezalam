import React from 'react';
import { buildPageJsonLd } from '@/lib/seo/schema-builder';

// ⚙️ Default toggle: set to true for multiline wrapped view, false for single-line minified view
const PRETTY_PRINT_DEFAULT = false;

interface JsonLdProps {
  seo?: any;
  faqs?: any[];
  prettyPrint?: boolean; // Optional prop to control formatting per page
}

/**
 * Extracts script content and formats it (multiline wrapped vs minified single-line)
 */
const extractAndFormatScripts = (rawString: string, isPretty: boolean): string[] => {
  if (!rawString) return [];

  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const formattedBlocks: string[] = [];
  let match;

  while ((match = scriptRegex.exec(rawString)) !== null) {
    const rawContent = match[1].trim();
    if (rawContent) {
      try {
        const parsed = JSON.parse(rawContent);
        // true -> multiline with 2-space indentation; false -> minified single line
        formattedBlocks.push(isPretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      } catch {
        formattedBlocks.push(rawContent);
      }
    }
  }

  // Fallback: If no <script> tags were matched, try parsing the whole string directly
  if (formattedBlocks.length === 0 && rawString.trim()) {
    try {
      const parsed = JSON.parse(rawString.trim());
      formattedBlocks.push(isPretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
    } catch {
      formattedBlocks.push(rawString.trim());
    }
  }

  return formattedBlocks;
};

export const JsonLd: React.FC<JsonLdProps> = ({ 
  seo, 
  faqs, 
  prettyPrint = PRETTY_PRINT_DEFAULT 
}) => {
  const { rawCustomScripts, faqSchema } = buildPageJsonLd({ seo, faqs });
  const scriptBlocks = extractAndFormatScripts(rawCustomScripts, prettyPrint);

  // Format FAQ schema dynamically based on prettyPrint state
  const formattedFaqSchema = faqSchema 
    ? (prettyPrint ? JSON.stringify(faqSchema, null, 2) : JSON.stringify(faqSchema))
    : null;

  return (
    <>
      {/* 1. Custom Database Scripts */}
      {scriptBlocks.map((content, index) => (
        <script
          key={`db-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: prettyPrint ? `\n${content}\n` : content,
          }}
        />
      ))}

      {/* 2. Dynamic FAQ Script */}
      {formattedFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: prettyPrint ? `\n${formattedFaqSchema}\n` : formattedFaqSchema,
          }}
        />
      )}
    </>
  );
};

// import React from 'react';
// import { buildPageJsonLd } from '@/lib/seo/schema-builder';

// interface JsonLdProps {
//   seo?: any;
//   faqs?: any[];
// }

// /**
//  * Helper to extract raw JSON contents from single or multiple <script> tags
//  */
// const extractScriptContents = (rawString: string): string[] => {
//   if (!rawString) return [];

//   const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
//   const contents: string[] = [];
//   let match;

//   while ((match = scriptRegex.exec(rawString)) !== null) {
//     if (match[1].trim()) {
//       contents.push(match[1].trim());
//     }
//   }

//   // Fallback: If no <script> tags were found, treat the string as raw JSON
//   if (contents.length === 0 && rawString.trim()) {
//     contents.push(rawString.trim());
//   }

//   return contents;
// };

// export const JsonLd: React.FC<JsonLdProps> = ({ seo, faqs }) => {
//   const { rawCustomScripts, faqSchema } = buildPageJsonLd({ seo, faqs });
//   const scriptBlocks = extractScriptContents(rawCustomScripts);

//   return (
//     <>
//       {/* 1. Render each database script block without any wrapping <div> */}
//       {scriptBlocks.map((content, index) => (
//         <script
//           key={`db-jsonld-${index}`}
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//       ))}

//       {/* 2. Separate dynamic FAQ Script */}
//       {faqSchema && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//         />
//       )}
//     </>
//   );
// };