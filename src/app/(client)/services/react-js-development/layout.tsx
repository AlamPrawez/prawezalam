import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
  // 1. Establish bulletproof fallback parameters using new target values
  let pageTitle = "React.js Development Services | Custom React Web Application Developer";
  let pageDesc = "Build fast, scalable React.js applications for startups and businesses. Custom web apps, SaaS platforms, dashboards, API integrations, and ongoing React development support.";

  try {
    const filePath = path.join(process.cwd(), 'content', 'react-js-development.md');
    
    // Dynamic filesystem read for front matter values
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.title) pageTitle = data.title;
      if (data.description) pageDesc = data.description;
    }
  } catch (error) {
    console.error("System failed to process react-js-development.md, running hardcoded fallbacks:", error);
  }

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "React.js Development Services",
      "Custom React Developer",
      "React Web Application Development",
      "SaaS Platform Development",
      "React Dashboards & Portals",
      "Er Prawez Alam Services",
      "Next.js Integration",
      "Front-End Architecture Design",
      "Single Page Applications SPA",
      "API Integrations React",
      "React Performance Optimization",
      "Technical Consulting"
    ],
    alternates: {
      canonical: "https://prawez.com/services/react-js-development",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: "React.js Development Services | Custom React Web Application Developer",
      description: "Need a React developer? I build scalable React.js applications, SaaS platforms, dashboards, and custom business software for companies worldwide.",
      url: "https://prawez.com/services/react-js-development",
      siteName: "Prawez Alam",
      images: [
        {
          url: "https://prawez.com/services/react-js-development.jpg",
          width: 1200,
          height: 630,
          alt: "React.js developer building scalable custom web applications for startups and businesses",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "React.js Development Services | Custom React Web Application Developer",
      description: "Need a React developer? I build scalable React.js applications, SaaS platforms, dashboards, and custom business software for companies worldwide.",
      images: ["https://prawez.com/services/react-js-development.jpg"],
    },
  };
}

const servicesFaqs = [
  {
    question: "What custom React.js development services do you provide?",
    answer: "I build high-performance, responsive React.js web applications, complex business dashboards, interactive SaaS tools, and single-page applications tailored directly to your startup or enterprise requirements."
  },
  {
    question: "Can you optimize or refactor an existing React codebase?",
    answer: "Yes. I provide React architecture optimization services. I can dive deep into your project to eliminate unnecessary re-renders, implement optimal state management solutions, and audit bundle sizes to boost lighthouse metrics."
  },
  {
    question: "Do your React applications seamlessly integrate with backend APIs?",
    answer: "Absolutely. I focus heavily on writing clean, multi-protocol integration strategies connecting your React client architecture to fast asynchronous REST APIs, real-time WebSockets networks, or GraphQL services."
  }
];

 // Interconnected JSON-LD schema referencing your updated React service path mapping
  const servicesJsonGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://prawez.com/services/react-js-development/#core-services",
        "serviceType": "Custom React.js Development & Single Page Application Engineering",
        "provider": {
          "@type": "Person",
          "@id": "https://prawez.com/#person",
          "name": "Er. Prawez Alam",
          "url": "https://prawez.com"
        },
        "description": "Premium front-end development of custom React.js web platforms, dashboards, and custom business tools focused on modular maintainability and fluid states.",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://prawez.com/services/react-js-development/#faq",
        "provider": {
          "@id": "https://prawez.com/#person"
        },
        "mainEntity": servicesFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      }
    ]
  };

export default function ReactServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonGraph) }}
      />
      {children}
    </>
  );
}