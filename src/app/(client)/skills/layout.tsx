import type { Metadata } from "next";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
  // 1. Establish structural skill fallbacks using your precise properties
  let pageTitle = "Er. Prawez Alam | Technical Skills & Enterprise Software Architecture";
  let pageDesc = "Explore the production-grade technology stack of Er. Prawez Alam. Expert capabilities across high-performance Next.js and FastAPI.";

  try {
    const filePath = path.join(process.cwd(), 'content', 'skills.md');
    
    // Server-side filesystem validation and extraction
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.title) pageTitle = data.title;
      if (data.description) pageDesc = data.description;
    }
  } catch (error) {
    console.error("System failed to process skills.md, running hardcoded fallbacks:", error);
  }

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "Er Prawez Alam Skills",
      "Full-Stack Developer Stack",
      "Next.js Frontend Expert",
      "FastAPI Backend Development",
      "TypeScript Software Engineer",
      "AWS Cloud Infrastructure",
      "Docker Containerization",
      "CI/CD Automation Pipelines",
      "gRPC Microservices Architecture",
      "PostgreSQL Database Optimization",
      "Load Balancing & Nginx",
      "Lighthouse Performance Optimization"
    ],
    alternates: {
      canonical: "https://prawez.com/skills",
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
      title: "Er. Prawez Alam | Full-Stack Engineering & Cloud DevOps Skills",
      description:
        "Deep dive into the core engineering technologies utilized by Er. Prawez Alam. Building resilient ecosystems with perfect performance profiling.",
      url: "https://prawez.com/skills",
      images: [
        {
          url: "https://prawez.com/prawez.webp",
          width: 1200,
          height: 630,
          alt: "Er. Prawez Alam - Technical Architecture Stack Summary",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Er. Prawez Alam | Full-Stack Engineering & Architecture Profile",
      description: pageDesc,
      images: ["https://prawez.com/prawez.webp"],
    },
  };
}


// Deep, skill-focused FAQs targeting engineering workflows, protocols, and deployment models
const skillsFaqs = [
  {
    question: "What specific core engineering stacks do you specialize in?",
    answer: "I specialize in constructing highly optimized web applications utilizing Next.js for client architecture and FastAPI or Node.js for backend server handling. I build cleanly with TypeScript to enforce end-to-end type safety across the entire codebase."
  },
  {
    question: "What are your capabilities regarding database management and optimization?",
    answer: "I design and tune relational data layers primarily using PostgreSQL. My expertise covers writing high-efficiency queries, structuring scalable schemas, setting up spatial or performance extensions, and building reliable caching strategies."
  },
  {
    question: "How do you handle cloud deployments and DevOps infrastructure?",
    answer: "I orchestrate production environments using AWS services and standalone Linux configurations. I containerize systems with Docker, configure secure Nginx edge reverse-proxies with load balancing, and build automated Git-driven CI/CD deployment pipelines."
  },
  {
    question: "What advanced application architectures can you implement?",
    answer: "I build robust, modular applications. This includes multi-protocol architectures pairing RESTful public gateways with ultra-fast internal gRPC microservices, real-time message routing, and decoupled event-driven systems."
  }
];

export default function SkillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Creates a clean entity loop breaking your tech skills down into an indexed list linked back to you
  const skillsJsonGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": "https://prawez.com/skills/#tech-list",
        "name": "Er. Prawez Alam Core Tech Stack",
        "description": "Comprehensive list of technical competencies and languages utilized by software engineer Er. Prawez Alam.",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Next.js & React Frontend Systems" },
          { "@type": "ListItem", "position": 2, "name": "FastAPI & Python Async Backends" },
          { "@type": "ListItem", "position": 3, "name": "TypeScript Engineering" },
          { "@type": "ListItem", "position": 4, "name": "AWS & Cloud DevOps Infrastructure" },
          { "@type": "ListItem", "position": 5, "name": "Docker Containerization & Pipelines" },
          { "@type": "ListItem", "position": 6, "name": "PostgreSQL Architecture & Systems" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://prawez.com/skills/#faq",
        "author": {
          "@id": "https://prawez.com/#person"
        },
        "mainEntity": skillsFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsJsonGraph) }}
      />
      {children}
    </>
  );
}






// Premium technical capability SEO optimization targeting specialized engineering queries
// export const metadata: Metadata = {
//   title: "Er. Prawez Alam | Technical Skills & Enterprise Software Architecture",
//   description:
//     "Explore the production-grade technology stack of Er. Prawez Alam. Expert capabilities across high-performance Next.js frontends, asynchronous FastAPI backends, AWS cloud DevOps orchestration, and complex database clustering.",
//   keywords: [
//     "Er Prawez Alam Skills",
//     "Full-Stack Developer Stack",
//     "Next.js Frontend Expert",
//     "FastAPI Backend Development",
//     "TypeScript Software Engineer",
//     "AWS Cloud Infrastructure",
//     "Docker Containerization",
//     "CI/CD Automation Pipelines",
//     "gRPC Microservices Architecture",
//     "PostgreSQL Database Optimization",
//     "Load Balancing & Nginx",
//     "Lighthouse Performance Optimization"
//   ],
//   alternates: {
//     canonical: "https://prawez.com/skills",
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
//     title: "Er. Prawez Alam | Full-Stack Engineering & Cloud DevOps Skills",
//     description:
//       "Deep dive into the core engineering technologies utilized by Er. Prawez Alam. Building resilient ecosystems with perfect performance profiling.",
//     url: "https://prawez.com/skills",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
//         width: 1200,
//         height: 630,
//         alt: "Er. Prawez Alam - Technical Architecture Stack Summary",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Er. Prawez Alam | Full-Stack Engineering & Architecture Profile",
//     description:
//       "Production technical expertise across frontend applications, async API development, cloud automation, and database tuning.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };

// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Prawez Alam | Technical Skills | Full-Stack Development, DevOps & System Architecture",
//   description:
//     "Explore the technical skills of Prawez Alam, a Full-Stack Developer experienced in JavaScript, TypeScript, React, Vue, Nuxt, Next.js, Node.js, NestJS, Laravel, Python, AWS, Docker, CI/CD, and scalable system architecture.",
//   keywords: [
//     "Prawez Alam Skills",
//     "Full-Stack Developer Skills",
//     "React Expertise",
//     "Vue.js Expertise",
//     "Next.js Developer",
//     "Nuxt Developer",
//     "Node.js Skills",
//     "NestJS Experience",
//     "Laravel Development",
//     "Python Backend",
//     "AWS DevOps",
//     "Docker",
//     "Nginx",
//     "CI/CD",
//     "System Architecture",
//     "Load Balancer",
//     "Cloud Deployment",
//     "Scalable Application Design",
//   ],
//   alternates: {
//     canonical: "https://prawez.com/skills",
//   },
//   openGraph: {
//     title: "Prawez Alam | Full-Stack & DevOps Technical Skills",
//     description:
//       "Discover the technical stack and engineering capabilities of Prawez Alam including modern frontend, backend, DevOps, cloud architecture, and scalable system design.",
//     url: "https://prawez.com/skills",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
//         width: 1200,
//         height: 630,
//         alt: "Prawez Alam - Technical Skills",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Prawez Alam | Full-Stack Developer Technical Expertise",
//     description:
//       "Explore technologies, tools, and system design expertise including React, Vue, Node.js, Python, AWS, Docker, CI/CD, and scalable architecture.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };
// const faqs = [
//   {
//     question: "What technologies do you specialize in?",
//     answer:
//       "I specialize in modern full-stack technologies including JavaScript, TypeScript, React, Vue, Nuxt, Next.js, Node.js, NestJS, Laravel, and Python for building scalable and maintainable applications.",
//   },
//   {
//     question: "Do you have experience with cloud and DevOps?",
//     answer:
//       "Yes, I work extensively with AWS services, Docker, CI/CD pipelines, Nginx, Linux servers, and load balancers to deploy and manage scalable production systems.",
//   },
//   {
//     question: "What kind of system architecture do you design?",
//     answer:
//       "I design scalable, secure, and performance-optimized architectures including microservices, API-driven systems, cloud-native deployments, and high-traffic ready infrastructure.",
//   },
//   {
//     question: "Do you work across frontend and backend?",
//     answer:
//       "Yes, I build complete end-to-end solutions — from interactive UI development to backend APIs, database design, and deployment pipelines.",
//   },
//   {
//     question: "Do you optimize performance and scalability?",
//     answer:
//       "Absolutely. I focus on performance optimization, efficient data handling, caching strategies, and infrastructure scaling to ensure applications run reliably under heavy load.",
//   },
// ];
// export default function SkillLayout({
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
