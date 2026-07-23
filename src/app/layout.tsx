import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
// import Navbar from "@/components/Navbar";

import "./globals.css";
// import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://prawez.com"),

  title: {
    default: "Prawez Alam | Remote Full Stack Engineer & Software Architect",
    template: "%s | Prawez Alam",
  },

  description:
    "Expert Full Stack Engineer specializing in high-performance web systems, custom API gateways, and scalable cloud architectures. Engineering robust solutions globally with Next.js, FastAPI, and gRPC.",

  keywords: [
    // Global & Remote Client Intent
    "Remote Full Stack Engineer",
    "Remote Full Stack Engineer in Nepal",
    "Contract Software Architect",
    "Freelance Next.js Specialist",
    "FastAPI Backend Developer",
    "Remote Web Application Developer",

    // Advanced/Niche Stack (Attracts Global Tech Companies)
    "Next.js FastAPI Architecture",
    "gRPC Multi-Protocol Gateway",
    "PostGIS MobilityDB Geospatial Engineer",
    "High Performance Web Optimization",
    "Tailwind CSS Frontend Engineer",
    "Automated Background Removal API Development",

    // Geographic / Competitive Fallback
    "Full Stack Developer Nepal",
    "Top Software Engineer Kathmandu",
    "MERN Stack Developer in Nepal"
  ],

  authors: [{ name: "Prawez Alam", url: "https://prawez.com" }],
  creator: "Prawez Alam",
  publisher: "Prawez Alam",

  openGraph: {
    title: "Prawez Alam | Remote Full Stack Engineer & Software Architect",
    description:
      "Engineering enterprise-grade web applications and high-performance APIs globally. Specializing in Next.js, FastAPI, microservices, and 100/100 Lighthouse performance metrics.",
    url: "https://prawez.com",
    siteName: "Prawez Alam | Technical Portfolio",
    images: [
      {
        url: "https://prawez.com/prawez.JPEG",
        width: 1200,
        height: 630,
        alt: "Prawez Alam - Remote Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prawez Alam | Remote Full Stack Developer & Architect",
    description:
      "Building production-ready, highly optimized web applications globally. Next.js, FastAPI, and robust cloud deployments.",
    images: ["https://prawez.com/prawez.JPEG"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://prawez.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What industries and locations do you provide software development services for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I operate globally as a remote Full Stack Engineer, serving international clients, startups, and enterprises worldwide, while maintaining a strong local presence for corporate clients in Nepal. My expertise spans healthcare applications, custom SaaS platforms, image processing tools, and high-performance e-commerce systems."
      }
    },
    {
      "@type": "Question",
      "name": "What is your primary technology stack for building applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "My 'Gold Standard' production architecture is Next.js (React) for blazing-fast, SEO-optimized frontends combined with FastAPI (Python) or NestJS (Node.js) for robust, high-performance backends. I specialize in utility-first frameworks like Tailwind CSS, modern state management, and multi-protocol setups using REST and gRPC API gateways."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure web applications are secure and highly optimized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance and security are built in from day one. I engineer applications to achieve perfect 100/100 Lighthouse performance and Core Web Vitals scores by leveraging server-side rendering, advanced asset compression, and clean database structures. Security architectures are vetted using dedicated testing environments like Kali Linux to prevent vulnerabilities."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate AI features or advanced spatial tracking into existing projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. I have extensive experience integrating Large Language Models (LLMs) via LangChain for structured data pipelines, building automated image processing tools (such as background removal utilities), and configuring advanced geospatial backends using PostgreSQL extensions like PostGIS and MobilityDB."
      }
    }
  ]
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "Person",
      "name": "Prawez Alam",
      "jobTitle": "Full Stack Engineer & Software Architect",
      "url": "https://prawez.com",
      "image": "https://prawez.com/prawez.JPEG",
      "sameAs": [
        "https://github.com/AlamPrawez",
        "https://linkedin.com/in/prawez-alam"
      ],
      "knowsAbout": [
        "Software Architecture",
        "Full Stack Web Development",
        "Full Stack Development in nepal",
        "FastAPI",
        "Next.js",
        "gRPC API Gateway Design",
        "Geospatial Data Engineering",
        "Web Performance Optimization"
      ],
      "offers": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Remote Software Engineering & Custom Application Development",
          "areaServed": "Worldwide"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://prawez.com",
      "mainEntity": faqSchema.mainEntity,
    }
    ]
  };

return (
  <html lang="en">
    <head>
        {/* Place the script here in the head */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="shO09nrtYl4h6+p++cxBZw" async></script>
      </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </body>
  </html>
);
}






// export const metadata: Metadata = {
//   metadataBase: new URL("https://prawez.com"),

//   title: {
//     default: "Prawez Alam | Full Stack Developer | Software Engineer | Website & Mobile App Development Expert",
//     template: "%s | Prawez Alam",
//   },

//   description:
//     "Full Stack Developer in Nepal, specializing in Website Development, Mobile App Development, and Custom Software Solutions. Expert in React.js, Vue.js, Next.js, Nuxt.js, Node.js, NestJS, Laravel, and scalable backend systems.",

//   keywords: [
//   // Core Services
//   "Website Development",
//   "Mobile App Development",
//   "Full Stack Developer",
//   "Custom Software Development",
//   "Web Application Development",

//   // Frontend
//   "React Developer",
//   "Vue Developer",
//   "Next.js Developer",
//   "Nuxt.js Developer",
//   "TypeScript Developer",

//   // Backend
//   "Node.js Developer",
//   "NestJS Developer",
//   "Express.js Developer",
//   "Laravel Developer",
//   "REST API Development",

//   // DevOps & Cloud
//   "DevOps Engineer",
//   "CI/CD Pipeline",
//   "Docker",
//   "Kubernetes",
//   "Nginx",
//   "Linux Server Management",
//   "AWS Deployment",
//   "DigitalOcean Deployment",
//   "Cloud Infrastructure",
//   "Server Optimization",
//   "Performance Optimization",

//   // Business Intent
//   "Software Development Company",
//   "Custom Web Applications",
//   "Scalable Web Applications",
// ],

//   authors: [{ name: "Prawez Alam", url: "https://prawez.com" }],
//   creator: "Prawez Alam",
//   publisher: "Prawez Alam",

//   openGraph: {
//     title: "Prawez Alam | Full Stack Developer | Software Engineer | Website & Mobile App Development Expert",
//     description:
//       "Full Stack Developer , Professional Website & Mobile App Development Services. Scalable, High-Performance Web Applications built with React, Vue, Next.js, Node.js & Laravel.",
//     url: "https://prawez.com",
//     siteName: "Prawez Alam",
//     images: [
//       {
//         url: "https://prawez.com/prawez.JPEG",
//         width: 1200,
//         height: 630,
//         alt: "Prawez Alam - Full Stack Developer",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Prawez Alam | Full Stack Developer | Software Engineer | Website & Mobile App Development Expert",
//     description:
//       "Full Stack Developer providing Website Development, Mobile Apps & Custom Software Solutions.",
//     images: ["https://prawez.com/prawez.JPEG"],
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },

//   alternates: {
//     canonical: "https://prawez.com",
//   },
// };
