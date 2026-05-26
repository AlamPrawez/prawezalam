// lib/faq-utils.ts

import { FAQItem, FAQSchema } from "@/@types/faq";

const businessIdentity = {
  "@type": "ProfessionalService",
  "@id": "https://prawez.com/#professional-service",
  "name": "Er. Prawez Alam - Full Stack Developer",
  "url": "https://prawez.com",
  "image": "https://prawez.com/prawez.webp",
  "description": "Expert Full-Stack Developer providing high-performance Next.js and FastAPI web solutions.",
  "telephone": "+9779804083811",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NP"
  }
};

export const generatePageGraph = (faqs: FAQItem[], pageUrl: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    businessIdentity, // Always included
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      "url": pageUrl,
      "author": { "@id": "https://prawez.com/#person" },
      "about": { "@id": "https://prawez.com/#person" },
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    }
  ]
});

// export const generateFAQGraph = (faqs: FAQItem[], pageUrl: string) => ({
//   "@context": "https://schema.org",
//   "@graph": [
//     {
//       "@type": "FAQPage",
//       "@id": `${pageUrl}/#faq`,
//       "url": pageUrl, // Good practice for SEO
//       "provider": { "@type": "Person", "@id": "https://prawez.com/#person" },
//       "author": { "@id": "https://prawez.com/#person" },
//       "about": { "@id": "https://prawez.com/#person" },
//       "mainEntity": faqs.map((faq) => ({
//         "@type": "Question",
//         "name": faq.question,
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": faq.answer,
//         },
//       })),
//     },
//   ],
// });