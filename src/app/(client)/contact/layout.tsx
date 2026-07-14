import { generatePageGraph } from "@/lib/faq-utils.";
import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Highly targeted SEO Metadata optimization for top-tier search rankings
// export const metadata: Metadata = {
//   title: "Hire Prawez Alam | Expert Full-Stack Developer & DevOps Engineer",
//   description:
//     "Hire Er. Prawez Alam, a premium Full-Stack Developer specializing in high-performance Next.js and FastAPI architectures. Expert services for custom web applications, urgent bug fixes, AWS DevOps, system design, and performance tuning with rapid delivery.",
//   keywords: [
//     "Hire Full-Stack Developer",
//     "Next.js Developer Expert",
//     "FastAPI Back-End Developer",
//     "Er Prawez Alam Portfolio",
//     "Hire React Developer",
//     "Node.js Engineer",
//     "Python Web Developer",
//     "AWS DevOps Support",
//     "System Design Consultant",
//     "Application Architecture",
//     "Urgent Bug Fixes",
//     "Feature Development",
//     "CI/CD Pipeline Setup",
//     "Docker Server Deployment",
//     "Website Performance Optimization",
//     "Hourly Freelance Developer",
//     "Remote Software Engineer"
//   ],
//   alternates: {
//     canonical: "https://prawez.com/contact",
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
//     title: "Er. Prawez Alam | Expert Full-Stack Developer & DevOps Engineer",
//     description:
//       "Looking for rapid feature development, robust system design, or critical bug fixes? Hire Prawez Alam for cutting-edge FastAPI, Next.js, and AWS cloud solutions.",
//     url: "https://prawez.com/contact",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
//         width: 1200,
//         height: 630,
//         alt: "Er. Prawez Alam - Expert Full Stack Developer",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Hire Prawez Alam | Full-Stack Developer & DevOps Expert",
//     description:
//       "Available for scalable web applications, urgent production fixes, system engineering, and automated cloud deployments.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };


export async function generateMetadata(): Promise<Metadata> {
  // 1. Fallback base configurations using your exact corporate parameters
  let pageTitle = "Hire Prawez Alam | Expert Full-Stack Developer & DevOps Engineer";
  let pageDesc = "Hire Er. Prawez Alam, a premium Full-Stack Developer specializing in high-performance Next.js and FastAPI architectures.";

  try {
    const filePath = path.join(process.cwd(), 'content', 'contact.md');
    
    // Read your contact markdown file if it exists at root
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.title) pageTitle = data.title;
      if (data.description) pageDesc = data.description;
    }
  } catch (error) {
    console.error("System failed to read contact.md, running hardcoded fallbacks:", error);
  }

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "Hire Full-Stack Developer",
      "Next.js Developer Expert",
      "FastAPI Back-End Developer",
      "Er Prawez Alam Portfolio",
      "Hire React Developer",
      "Node.js Engineer",
      "Python Web Developer",
      "AWS DevOps Support",
      "System Design Consultant",
      "Application Architecture",
      "Urgent Bug Fixes",
      "Feature Development",
      "CI/CD Pipeline Setup",
      "Docker Server Deployment",
      "Website Performance Optimization",
      "Hourly Freelance Developer",
      "Remote Software Engineer"
    ],
    alternates: {
      canonical: "https://prawez.com/contact",
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
      title: pageTitle,
      description: pageDesc,
      url: "https://prawez.com/contact",
      images: [
        {
          url: "https://prawez.com/prawez.webp",
          width: 1200,
          height: 630,
          alt: "Er. Prawez Alam - Expert Full Stack Developer",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hire Prawez Alam | Full-Stack Developer & DevOps Expert",
      description: pageDesc,
      images: ["https://prawez.com/prawez.webp"],
    },
  };
}

const constFaqs = [
  {
    question: "What kind of tasks can I hire you for?",
    answer:
      "I handle a wide range of tasks including complete application development, core bug fixes, feature creation, speed and performance optimization, API integrations, system and application design, DevOps orchestration, Docker environment setups, custom CI/CD pipelines, and secure server deployments.",
  },
  {
    question: "Do you handle urgent production fixes?",
    answer:
      "Yes, I prioritize time-critical, urgent tasks. I provide rapid turnarounds for sudden infrastructure or source code crashes to maintain business continuity and minimize server downtime.",
  },
  {
    question: "Can you work within an existing codebase?",
    answer:
      "Absolutely. I regularly jump into existing code systems, rapidly map out dependencies, and implement optimized features or fixes cleanly without disrupting established engineering configurations.",
  },
  {
    question: "Do you provide DevOps and deployment support?",
    answer:
      "Yes. I provide cloud systems architecture management across AWS, Docker workspace builds, Nginx routing setup, automated CI/CD engine assembly, Linux server hardening, and highly scalable deployment infrastructures.",
  },
  {
    question: "How is pricing structured for development services?",
    answer:
      "Pricing is flexible and modeled entirely around project complexity or delivery timeline. I offer both milestones-focused contract pricing and transparent hourly tracking scales with crystal-clear upfront projections.",
  },
];

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 

  const contactJsonGraph = generatePageGraph(constFaqs, "https://prawez.com/contact");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonGraph),
        }}
      />
      {children}
    </>
  );
}




 // Combines Local Business/Professional Identity and FAQ Data into a single JSON-LD loop for fast crawling
  // const structuredDataJson = {
  //   "@context": "https://schema.org",
  //   "@graph": [
  //     {
  //       "@type": "ProfessionalService",
  //       "@id": "https://prawez.com/#professional-service",
  //       "name": "Er. Prawez Alam - Full Stack Developer",
  //       "url": "https://prawez.com",
  //       "image": "https://prawez.com/prawez.webp",
  //       "description": "Expert Full-Stack Developer providing high-performance Next.js and FastAPI web solutions, system designs, and custom cloud DevOps pipelines.",
  //       "telephone": "+9779804083811",
  //       "priceRange": "$$",
  //       "address": {
  //         "@type": "PostalAddress",
  //         "addressCountry": "NP"
  //       }
  //     },
  //     {
  //       "@type": "FAQPage",
  //       "@id": "https://prawez.com/contact/#faq",
  //       "author": {
  //         "@id": "https://prawez.com/#person"
  //       },
  //       "about": {
  //         "@id": "https://prawez.com/#person"
  //       },
  //       "mainEntity": constFaqs.map((faq) => ({
  //         "@type": "Question",
  //         "name": faq.question,
  //         "acceptedAnswer": {
  //           "@type": "Answer",
  //           "text": faq.answer,
  //         },
  //       })),
  //     }
  //   ]
  // };


// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Prawez Alam | Hire Expert Full-Stack Developer | Bug Fixes, Features, DevOps, System & Application Design",
//   description:
//     "Hire Prawez Alam, an experienced Full-Stack Developer skilled in React, Vue, Nuxt, Next, Node.js, NestJS, Laravel, Python, and AWS DevOps tools. Available for small tasks, full projects, urgent bug fixes, feature development, performance optimization, CI/CD setup, and cloud deployments with fast, reliable delivery.",
//   keywords: [
//     "Full-Stack Developer Hire",
//     "React Developer",
//     "Vue.js Developer",
//     "Node.js Developer",
//     "Python Developer",
//     "Laravel Developer",
//     "NestJS Developer",
//     "AWS DevOps Support",
//     "System Design Expert",
//     "Application Design",
//     "Bug Fixes",
//     "Feature Development",
//     "CI/CD Setup",
//     "Docker Setup",
//     "Server Deployment",
//     "Urgent Website Fix",
//     "Hourly Developer",
//   ],
//   alternates: {
//     canonical: "https://prawez.com/contact",
//   },
//   openGraph: {
//     title: "Prawez Alam | Full-Stack Developer & AWS DevOps Expert | Bug Fixes, Features, System Design",
//     description:
//       "Hire Prawez Alam, an expert Full-Stack Developer skilled in React, Vue, Nuxt, Next, Node.js, NestJS, Laravel, Python, and AWS DevOps. Fast, reliable solutions for bug fixes, feature development, system design, CI/CD, and cloud deployments.",
//     url: "https://prawez.com/contact",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
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
//     title: "Hire Prawez Alam | Full-Stack Developer for Tasks, Projects & DevOps",
//     description:
//       "Professional Full-Stack Developer available for small tasks, urgent fixes, feature development, system design, and AWS DevOps support.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };

// const faqs = [
//   {
//     question: "What kind of tasks can I hire you for?",
//     answer:
//       "I handle a wide range of tasks including bug fixes, feature development, performance optimization, API integration, system and application design, DevOps setup, Docker configuration, CI/CD pipeline setup, server deployment, and code refactoring.",
//   },
//   {
//     question: "Do you handle urgent fixes?",
//     answer:
//       "Yes, I prioritize urgent tasks and provide fast turnaround for critical production issues, ensuring minimal downtime and reliable results.",
//   },
//   {
//     question: "Can you work on existing projects?",
//     answer:
//       "Absolutely. I can join existing projects, quickly understand the codebase, and implement new features or fixes efficiently while following best practices.",
//   },
//   {
//     question: "Do you provide DevOps and deployment support?",
//     answer:
//       "Yes. I offer full DevOps support including AWS cloud management, Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, and deployment of scalable applications.",
//   },
//   {
//     question: "How is pricing structured?",
//     answer:
//       "Pricing depends on task complexity and scope. I offer flexible task-based or hourly pricing with transparent cost estimates before starting any work.",
//   },
// ];
// export default function ContactLayout({
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
