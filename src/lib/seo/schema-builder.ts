const getTextFromHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
};

export const buildPageJsonLd = ({
  seo,
  faqs = [],
}: {
  seo?: any;
  faqs?: any[];
}) => {
  // 1. Raw string stored in DB (contains <script>...</script> <script>...</script>)
  const rawLdJson = seo?.ldjson || seo?.schema || '';

  // 2. Build FAQ Schema if FAQs exist
  let faqSchema: any = null;

  if (faqs && faqs.length > 0) {
    const validFaqs = faqs.filter((faq) => faq.question && (faq.answerHtml || faq.answer));

    if (validFaqs.length > 0) {
      faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${seo?.canonicalUrl || 'https://prawez.com'}#faq`,
        'provider': {
          '@type': 'Person',
          '@id': 'https://prawez.com/#person',
          'name': 'Er. Prawez Alam',
          'url': 'https://prawez.com',
        },
        'mainEntity': validFaqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': getTextFromHtml(faq.answerHtml || faq.answer || ''),
          },
        })),
      };
    }
  }

  return {
    rawCustomScripts: rawLdJson, // Returns the exact string saved in DB
    faqSchema,                 // Returns standard FAQ Object
  };
};

// // src/lib/seo/schema-builder.ts

// const getTextFromHtml = (html: string) => {
//   if (!html) return '';
//   return html.replace(/<[^>]*>?/gm, '').trim();
// };

// const parseCustomLdJson = (rawInput: any): any[] => {
//   if (!rawInput) return [];

//   if (typeof rawInput === 'object') {
//     if (Array.isArray(rawInput)) return rawInput;
//     if (rawInput['@graph']) return rawInput['@graph'];
//     return [rawInput];
//   }

//   if (typeof rawInput !== 'string') return [];

//   const extractedNodes: any[] = [];
//   const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

//   let match;
//   let hasScriptTags = false;

//   while ((match = scriptRegex.exec(rawInput)) !== null) {
//     hasScriptTags = true;
//     const jsonContent = match[1].trim();
//     if (jsonContent) {
//       try {
//         const parsed = JSON.parse(jsonContent);
//         if (Array.isArray(parsed)) {
//           extractedNodes.push(...parsed);
//         } else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
//           extractedNodes.push(...parsed['@graph']);
//         } else {
//           extractedNodes.push(parsed);
//         }
//       } catch (e) {
//         console.error('Error parsing <script> block:', e);
//       }
//     }
//   }

//   if (!hasScriptTags) {
//     try {
//       const parsed = JSON.parse(rawInput.trim());
//       if (Array.isArray(parsed)) return parsed;
//       if (parsed['@graph']) return parsed['@graph'];
//       return [parsed];
//     } catch (e) {
//       console.error('Error parsing raw JSON string:', e);
//     }
//   }

//   return extractedNodes;
// };

// export const buildPageJsonLd = ({
//   seo,
//   faqs = [],
//   serviceTitle,
// }: {
//   seo?: any;
//   faqs?: any[];
//   serviceTitle?: string;
// }) => {
//   const graphNodes: any[] = [];
//   let combinedFaqEntities: any[] = [];
//   let hasCustomServiceNode = false;

//   // 1. Process FAQs from database array prop
//   if (faqs && faqs.length > 0) {
//     const propFaqs = faqs
//       .filter((faq) => faq.question && (faq.answerHtml || faq.answer))
//       .map((faq) => ({
//         '@type': 'Question',
//         'name': faq.question,
//         'acceptedAnswer': {
//           '@type': 'Answer',
//           'text': getTextFromHtml(faq.answerHtml || faq.answer || ''),
//         },
//       }));
//     combinedFaqEntities.push(...propFaqs);
//   }

//   // 2. Parse custom DB nodes from seo.ldjson
//   const customNodes = parseCustomLdJson(seo?.ldjson || seo?.schema);

//   // 3. Process custom nodes and check for duplicate Service / FAQ nodes
//   customNodes.forEach((node) => {
//     const { '@context': _, ...cleanNode } = node;

//     // Detect if custom ldjson already defines a Service
//     if (cleanNode['@type'] === 'Service') {
//       hasCustomServiceNode = true;
//     }

//     if (cleanNode['@type'] === 'FAQPage' && cleanNode.mainEntity) {
//       const existingEntities = Array.isArray(cleanNode.mainEntity)
//         ? cleanNode.mainEntity
//         : [cleanNode.mainEntity];
//       combinedFaqEntities.push(...existingEntities);
//     } else {
//       graphNodes.push(cleanNode);
//     }
//   });

//   // 4. Add Core Service Schema Node ONLY IF not already defined in custom ldjson
//   if (serviceTitle && !hasCustomServiceNode) {
//     graphNodes.unshift({
//       '@type': 'Service',
//       '@id': `${seo?.canonicalUrl || 'https://prawez.com'}#core-services`,
//       'serviceType': serviceTitle,
//       'provider': {
//         '@type': 'Person',
//         '@id': 'https://prawez.com/#person',
//         'name': 'Er. Prawez Alam',
//         'url': 'https://prawez.com',
//       },
//       'description': seo?.description || '',
//       'offers': {
//         '@type': 'Offer',
//         'availability': 'https://schema.org/InStock',
//       },
//     });
//   }

//   // 5. Add ONE single merged FAQPage Node if any FAQs exist
//   if (combinedFaqEntities.length > 0) {
//     graphNodes.push({
//       '@type': 'FAQPage',
//       '@id': `${seo?.canonicalUrl || 'https://prawez.com'}#faq`,
//       'provider': {
//         '@id': 'https://prawez.com/#person',
//       },
//       'mainEntity': combinedFaqEntities,
//     });
//   }

//   // 6. Return standard JS Object (NOT stringified yet)
//   return {
//     '@context': 'https://schema.org',
//     '@graph': graphNodes,
//   };
// };