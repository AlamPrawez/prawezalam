import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
  // 1. Establish bulletproof fallback parameters
  let pageTitle = "Professional Web Development & AWS DevOps Services | Er. Prawez Alam";
  let pageDesc = "Explore elite development services offered by Er. Prawez Alam. Specializing in high-performance Next.js and FastAPI applications.";

  try {
    const filePath = path.join(process.cwd(), 'content', 'services.md');
    
    // Dynamic filesystem read for front matter values
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.title) pageTitle = data.title;
      if (data.description) pageDesc = data.description;
    }
  } catch (error) {
    console.error("System failed to process services.md, running hardcoded fallbacks:", error);
  }

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "Er Prawez Alam Services",
      "Web Development Services",
      "Next.js Development Services",
      "FastAPI Back-End Engineering",
      "SaaS Platform Development",
      "Custom API Integration",
      "DevOps Consulting Services",
      "AWS System Design Architecture",
      "VPS Server Setup & Hardening",
      "Bug Fixing Services",
      "Website Performance Optimization",
      "Project Deployment Support",
      "Technical Consulting",
      "Scalable Software Infrastructure"
    ],
    alternates: {
      canonical: "https://prawez.com/services",
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
      title: "Er. Prawez Alam | High-Performance Development & Cloud Services",
      description: pageDesc,
      url: "https://prawez.com/services",
      images: [
        {
          url: "https://prawez.com/services.png",
          width: 1200,
          height: 630,
          alt: "Er. Prawez Alam - Professional Software Development Services",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Er. Prawez Alam | Premium Development & DevOps Services",
      description: pageDesc,
      images: ["https://prawez.com/services.png"],
    },
  };
}
// Premium Service-tier SEO Meta optimization for search ranking dominance
// export const metadata: Metadata = {
//   title: "Professional Web Development & AWS DevOps Services | Er. Prawez Alam",
//   description:
//     "Explore elite development services offered by Er. Prawez Alam. Specializing in high-performance Next.js and FastAPI applications, custom SaaS development, API integrations, AWS cloud system design, and production-ready CI/CD pipelines.",
//   keywords: [
//     "Er Prawez Alam Services",
//     "Web Development Services",
//     "Next.js Development Services",
//     "FastAPI Back-End Engineering",
//     "SaaS Platform Development",
//     "Custom API Integration",
//     "DevOps Consulting Services",
//     "AWS System Design Architecture",
//     "VPS Server Setup & Hardening",
//     "Bug Fixing Services",
//     "Website Performance Optimization",
//     "Project Deployment Support",
//     "Technical Consulting",
//     "Scalable Software Infrastructure"
//   ],
//   alternates: {
//     canonical: "https://prawez.com/services",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   openGraph: {
//     title: "Er. Prawez Alam | High-Performance Development & Cloud Services",
//     description:
//       "Accelerate your business with expert services including web development, robust SaaS architecture, clean API systems, cloud engineering, and automated deployment pipelines.",
//     url: "https://prawez.com/services",
//     images: [
//       {
//         url: "https://prawez.com/services.png", // Corrected typo path from serives.png
//         width: 1200,
//         height: 630,
//         alt: "Er. Prawez Alam - Professional Software Development Services",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Er. Prawez Alam | Premium Development & DevOps Services",
//     description:
//       "Scalable web applications, custom SaaS systems, AWS cloud setups, and rapid bug fixing services by an expert software engineer.",
//     images: ["https://prawez.com/services.png"], // Corrected typo path
//   },
// };

// Deep, service-focused FAQs targeting feature delivery, architecture, and technology specs
const servicesFaqs = [
  {
    question: "What core development services do you provide?",
    answer: "I build enterprise-grade SaaS systems and custom web applications utilizing high-performance tech stacks, primarily focusing on Next.js for fluid front-end interfaces and FastAPI or Node.js for ultra-fast, async back-end infrastructure."
  },
  {
    question: "Can you optimize or scale an existing application?",
    answer: "Yes. I offer performance auditing and optimization services. I can jump into your codebase to refactor inefficient application logic, implement advanced caching patterns, fix core system bugs, and scale your overall application design."
  },
  {
    question: "What DevOps and server deployment support do you offer?",
    answer: "I provide end-to-end cloud infrastructure services. This includes managing AWS cloud ecosystems, setting up secure Linux VPS server environments, building optimized Docker configurations, and structuring automated CI/CD deployment pipelines."
  },
  {
    question: "Do you specialize in third-party API integrations and system design?",
    answer: "Absolutely. I design highly decoupled, multi-protocol systems incorporating RESTful gateways, real-time WebSockets, and high-speed internal gRPC services, alongside clean integrations for any external enterprise APIs or payment systems."
  }
];

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Clean interconnected JSON-LD schema linking your page-specific services back to your identity graph
  const servicesJsonGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://prawez.com/services/#core-services",
        "serviceType": "Full-Stack Web Development & Cloud Infrastructure Engineering",
        "provider": {
          "@type": "Person",
          "@id": "https://prawez.com/#person",
          "name": "Er. Prawez Alam",
          "url": "https://prawez.com"
        },
        "description": "Premium design, development, and deployment of modern SaaS platforms, cloud environments, and high-efficiency APIs using Next.js and FastAPI.",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://prawez.com/services/#faq",
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






// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Prawez Alam | Services | Web, Mobile Development, DevOps & System Design",
//   description:
//     "Explore the professional services offered by Prawez Alam including web and mobile development, SaaS solutions, API integrations, DevOps consulting, system architecture, VPS setup, bug fixing, performance optimization, and project deployment.",
//   keywords: [
//     "Prawez Alam Services",
//     "Web Development Services",
//     "Mobile App Development",
//     "SaaS Development",
//     "API Integration",
//     "DevOps Consulting",
//     "AWS System Design",
//     "VPS Setup",
//     "Bug Fixing Services",
//     "Performance Optimization",
//     "Project Deployment",
//     "Technical Consulting",
//     "Cloud Architecture",
//     "Scalable Systems",
//   ],
//   alternates: {
//     canonical: "https://prawez.com/services",
//   },
//   openGraph: {
//     title: "Prawez Alam | Development & DevOps Services",
//     description:
//       "Discover professional services including web & mobile app development, SaaS architecture, API integrations, cloud system design, DevOps setup, VPS management, and deployment support.",
//     url: "https://prawez.com/services",
//     images: [
//       {
//         url: "https://prawez.com/serives.png",
//         width: 1200,
//         height: 630,
//         alt: "Prawez Alam - Services",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Prawez Alam | Development & Cloud Services",
//     description:
//       "Professional services including web & mobile development, SaaS solutions, DevOps consulting, system architecture, and deployment support.",
//     images: ["https://prawez.com/serives.png"],
//   },
// };

// const faqs = [
//   {
//     question: "What services do you offer?",
//     answer:
//       "I provide web and mobile app development, SaaS platform design, API integrations, DevOps consulting, system architecture planning, VPS setup, performance optimization, and project deployment support.",
//   },
//   {
//     question: "Can you help improve an existing project?",
//     answer:
//       "Yes, I can review your existing system, optimize performance, fix bugs, improve scalability, and implement new features.",
//   },
//   {
//     question: "Do you provide cloud and infrastructure support?",
//     answer:
//       "Yes, I design and manage systems using AWS tools, VPS environments, and production-ready deployment strategies.",
//   },
//   {
//     question: "Do you work on complex or custom features?",
//     answer:
//       "Absolutely. I specialize in building challenging custom functionalities and integrating third-party services.",
//   },
//   {
//     question: "Can you handle deployment and setup?",
//     answer:
//       "Yes, I manage complete deployment processes including server setup, security configuration, and production readiness.",
//   },
// ];

// export default function ServicesLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       {/* Structured Data for FAQ */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "FAQPage",
//             mainEntity: faqs.map((faq) => ({
//               "@type": "Question",
//               name: faq.question,
//               acceptedAnswer: {
//                 "@type": "Answer",
//                 text: faq.answer,
//               },
//             })),
//           }),
//         }} />
//       {children}
//     </>
//   );
// }
