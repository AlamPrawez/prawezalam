import { FAQItem } from "@/@types/faq";
import { generatePageGraph } from "@/lib/faq-utils.";
import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
  // 1. Establish structural transactional defaults
  let pageTitle = "Post Jobs & Hire Er. Prawez Alam | Expert Full-Stack Developer & DevOps Specialist";
  let pageDesc = "Post technical jobs or hire Er. Prawez Alam for full-stack web applications, urgent production bug fixes, and specialized AWS DevOps consulting.";

  try {
    const filePath = path.join(process.cwd(), 'content', 'hire-for-tasks.md');
    
    // Dynamic filesystem read for front matter values
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.title) pageTitle = data.title;
      if (data.description) pageDesc = data.description;
    }
  } catch (error) {
    console.error("System failed to process hire-for-tasks.md, running hardcoded fallbacks:", error);
  }

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "Post Technical Jobs",
      "Hire Full Stack Developer",
      "Contract Software Engineer",
      "Hire Remote Full Stack Engineer",
      "Freelance Web Developer for Hire",
      "Hourly Developer Support",
      "On-Demand Software Developer",
      "Hire Developer for Small Tasks",
      "Post a Web Development Job",
      "Hire Next.js Expert",
      "Hire FastAPI Backend Developer",
      "Next.js Freelance Developer",
      "FastAPI Developer for Hire",
      "React Developer for Tasks",
      "Python Backend Engineer Contract",
      "TypeScript Full Stack Expert",
      "Urgent Website Production Fixes",
      "Fix Production Server Crash",
      "Emergency Bug Fixing Services",
      "Urgent Web Developer Support",
      "Onboard Developer to Existing Project",
      "Docker Infrastructure Setup",
      "CI/CD Pipeline Automation",
      "Nginx Reverse Proxy Configuration",
      "Linux Server Management Services",
      "AWS Cloud Deployment Specialist",
      "System Architecture Consultant"
    ],
    alternates: {
      canonical: "https://prawez.com/hire-for-tasks",
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
      title: "Post Jobs or Hire Er. Prawez Alam | Elite Development & Infrastructure Support",
      description: pageDesc,
      url: "https://prawez.com/hire-for-tasks",
      images: [
        {
          url: "https://prawez.com/prawez.webp",
          width: 1200,
          height: 630,
          alt: "Hire Er. Prawez Alam - Project Milestones & Deliverables",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hire Er. Prawez Alam | On-Demand Full-Stack & DevOps Engineering",
      description: pageDesc,
      images: ["https://prawez.com/prawez.webp"],
    },
  };
}
// import type { Metadata } from "next";

// // Premium transactional meta optimization targeting clients ready to deploy budgets
// export const metadata: Metadata = {
//   title: "Post Jobs & Hire Er. Prawez Alam | Expert Full-Stack Developer & DevOps Specialist",
//   description:
//     "Post technical jobs or hire Er. Prawez Alam for full-stack web applications, urgent production bug fixes, complex feature development, and specialized AWS DevOps consulting. Offering fast, milestone-based engineering deliverables.",
//   keywords: [
//     // --- The "Problem-First" Client (Role & Contract focused) ---
//     "Post Technical Jobs",
//     "Hire Full Stack Developer",
//     "Contract Software Engineer",
//     "Hire Remote Full Stack Engineer",
//     "Freelance Web Developer for Hire",
//     "Hourly Developer Support",
//     "On-Demand Software Developer",
//     "Hire Developer for Small Tasks",
//     "Post a Web Development Job",

//     // --- The "Tech-Stack Specific" Client (High-Value Expert Searches) ---
//     "Hire Next.js Expert",
//     "Hire FastAPI Backend Developer",
//     "Next.js Freelance Developer",
//     "FastAPI Developer for Hire",
//     "React Developer for Tasks",
//     "Python Backend Engineer Contract",
//     "TypeScript Full Stack Expert",

//     // --- The Urgent / Fix-It Client (Immediate Transactional Intent) ---
//     "Urgent Website Production Fixes",
//     "Fix Production Server Crash",
//     "Emergency Bug Fixing Services",
//     "Urgent Web Developer Support",
//     "Onboard Developer to Existing Project",

//     // --- Infrastructure & DevOps Client (Systems & Operations focused) ---
//     "Docker Infrastructure Setup",
//     "CI/CD Pipeline Automation",
//     "Nginx Reverse Proxy Configuration",
//     "Linux Server Management Services",
//     "AWS Cloud Deployment Specialist",
//     "System Architecture Consultant"
//   ],
//   alternates: {
//     canonical: "https://prawez.com/hire-for-tasks",
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
//     title: "Post Jobs or Hire Er. Prawez Alam | Elite Development & Infrastructure Support",
//     description:
//       "Onboard an expert systems engineer for high-stakes technical features, urgent production resolution, full-cycle applications, and automated deployments.",
//     url: "https://prawez.com/hire-for-tasks",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
//         width: 1200,
//         height: 630,
//         alt: "Hire Er. Prawez Alam - Project Milestones & Deliverables",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Hire Er. Prawez Alam | On-Demand Full-Stack & DevOps Engineering",
//     description:
//       "Available for small high-impact tasks, complete system development, production system repair, and architecture consulting.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };

// High-converting, actionable answers targeting immediate hiring concerns
const hireFaqs: FAQItem[] = [
  {
    question: "What technical jobs or tasks can I post or hire you for?",
    answer: "You can contract me for comprehensive full-stack applications, urgent production bug repairs, API optimizations, performance tuning, Docker configuration, automated CI/CD flow setups, secure Linux server engineering, and specialized FastAPI + Next.js integrations."
  },
  {
    question: "How do you handle urgent production failures or crashes?",
    answer: "I treat severe system downtime or deployment breaks with immediate priority. I rapidly locate the architectural bottleneck, trace deployment logs, isolate the code defects, and push clean hotfixes to minimize business interruption."
  },
  {
    question: "Are you able to join and contribute to an existing codebase?",
    answer: "Yes. I am engineered to integrate cleanly into existing workflows. I audit your current code dependencies, map your data paths, and begin executing feature expansions or systems patches without disturbing legacy stability."
  },
  {
    question: "What cloud platforms and infrastructure setups do you manage?",
    answer: "I deploy and optimize cloud resources inside AWS, standalone Linux VPS hosts, and automated server networks. This includes building fine-tuned Nginx routing matrices, containerized multi-container Docker systems, and strict platform security policies."
  },
  {
    question: "How are contractual payments and pricing structures managed?",
    answer: "Engagements are scoped cleanly based on your timelines and operational depth. I provide clear, upfront cost estimations using flexible project milestone parameters, fixed task valuations, or direct hourly engineering logs."
  }
];

export default function HireLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const hireJsonGraph = generatePageGraph(hireFaqs, "https://prawez.com/hire-for-tasks");
  // const faqSchema = generateFAQSchema(hireFaqs);
  // Directly establishes your commercial availability under your unified person identifier
  // const hireJsonGraph = {
  //   "@context": "https://schema.org",
  //   "@graph": [
  //     {
  //       "@type": "FAQPage",
  //       "@id": "https://prawez.com/hire_for_tasks/#faq",
  //       "provider": {
  //         "@type": "Person",
  //         "@id": "https://prawez.com/#person"
  //       },
  //       "author": {
  //         "@id": "https://prawez.com/#person"
  //       },
  //       "about": {
  //         "@id": "https://prawez.com/#person"
  //       },
  //       "mainEntity": hireFaqs.map((faq) => ({
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hireJsonGraph) }}
      />
      {children}
    </>
  );
}

// import type { Metadata } from "next";
// // export const metadata: Metadata = {
// //   title: "Prawez Alam | Hire Developer for Small Tasks, Full Projects, Challenge Tasks | Bug Fixes, Features & DevOps Support",
// //   description:
// //     "Hire an experienced Full Stack Developer for small tasks, Full Projects, Challenge Tasks, urgent bug fixes, feature additions, DevOps support, Docker setup, CI/CD pipelines, and server deployment. Fast turnaround and reliable delivery.",
// //   keywords: [
// //     "Hire Developer for Small Tasks",
// //     "Fix Website Bugs",
// //     "Hire React Developer",
// //     "Hire Node.js Developer",
// //     "DevOps Support",
// //     "Docker Setup",
// //     "CI/CD Pipeline Setup",
// //     "Nginx Configuration",
// //     "Linux Server Management",
// //     "Urgent Website Fix",
// //     "Hourly Developer",
// //   ],
// //   alternates: {
// //     canonical: "https://prawez.com/hire_for_tasks",
// //   },
// //   openGraph: {
// //     title: "Hire Developer for Small Tasks, Full Projects, Challenge Tasks | Fast & Reliable Support",
// //     description:
// //       "Get quick bug fixes, feature upgrades, DevOps setup, and server deployment support from an experienced Full Stack Developer.",
// //     url: "https://prawez.com/hire_for_tasks",
// //     images: [
// //       {
// //         url: "https://prawez.com/prawez.webp",
// //         width: 1200,
// //         height: 630,
// //         alt: "Prawez Alam - Full Stack Developer",
// //       },
// //     ],
// //     locale: "en_US",
// //     type: "website",
// //   },
// //   twitter: {
// //     card: "summary_large_image",
// //     title: "Hire Developer for Tasks, Full Projects, Challenge Tasks | Bug Fixes & DevOps",
// //     description:
// //       "Professional developer available for small tasks, urgent fixes, and DevOps support.",
// //     images: ["https://prawez.com/prawez.webp"],  
// //   },
// // };
// // const faqs = [
// //   {
// //     question: "What kind of tasks can I hire you for?",
// //     answer:
// //       "You can hire me for bug fixes, feature additions, performance optimization, DevOps setup, Docker configuration, CI/CD pipeline setup, API integration, server deployment, and code refactoring.",
// //   },
// //   {
// //     question: "Do you handle urgent fixes?",
// //     answer:
// //       "Yes, I prioritize urgent tasks and provide fast turnaround for critical production issues.",
// //   },
// //   {
// //     question: "Can you work on existing projects?",
// //     answer:
// //       "Absolutely. I can join your existing project, understand the codebase, and implement fixes or new features efficiently.",
// //   },
// //   {
// //     question: "Do you provide DevOps and deployment support?",
// //     answer:
// //       "Yes. I handle Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, and cloud deployments.",
// //   },
// //   {
// //     question: "How is pricing structured?",
// //     answer:
// //       "Pricing depends on task complexity. I offer flexible task-based or hourly pricing with transparent cost estimation before starting.",
// //   },
// // ];
// export const metadata: Metadata = {
//   title:
//     "Prawez Alam | Post Jobs or Hire a Full Stack Developer | Bug Fixes, Full Projects & DevOps Support",

//   description:
//     "Post jobs or hire an experienced Full Stack Developer for bug fixes, feature development, full projects, DevOps support, Docker setup, CI/CD pipelines, server deployment, and urgent technical tasks. Fast turnaround and reliable delivery.",

//   keywords: [
//     "Post Jobs",
//     "Hire Developer",
//     "Hire Full Stack Developer",
//     "Hire React Developer",
//     "Hire Node.js Developer",
//     "Bug Fixes",
//     "Full Project Development",
//     "DevOps Support",
//     "Docker Setup",
//     "CI/CD Pipeline Setup",
//     "Nginx Configuration",
//     "Linux Server Management",
//     "Urgent Developer Support",
//     "Hourly Developer",
//   ],

//   alternates: {
//     canonical: "https://prawez.com/hire_for_tasks",
//   },

//   openGraph: {
//     title:
//       "Post Jobs or Hire a Full Stack Developer | Fast & Reliable Development Support",

//     description:
//       "Post jobs or hire for bug fixes, feature development, full projects, DevOps setup, server deployment, and urgent technical support.",

//     url: "https://prawez.com/hire_for_tasks",

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

//     title:
//       "Post Jobs or Hire a Developer | Bug Fixes, Projects & DevOps Support",

//     description:
//       "Hire an experienced developer for urgent fixes, full projects, feature development, and DevOps support.",

//     images: ["https://prawez.com/prawez.webp"],
//   },
// };

// const faqs = [
//   {
//     question: "What jobs or tasks can I post or hire you for?",
//     answer:
//       "You can post jobs or hire me for bug fixes, feature development, full-stack projects, API integration, performance optimization, DevOps setup, Docker configuration, CI/CD pipelines, server deployment, and code refactoring.",
//   },

//   {
//     question: "Do you handle urgent fixes or production issues?",
//     answer:
//       "Yes, I prioritize urgent technical issues and provide fast turnaround for production bugs, deployment failures, and critical fixes.",
//   },

//   {
//     question: "Can you work on existing projects?",
//     answer:
//       "Absolutely. I can join your existing project, understand your codebase, fix issues, improve performance, and implement new features efficiently.",
//   },

//   {
//     question: "Do you provide DevOps and deployment support?",
//     answer:
//       "Yes. I handle Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, cloud deployments, and infrastructure optimization.",
//   },

//   {
//     question: "How is pricing structured?",
//     answer:
//       "Pricing depends on project scope and complexity. I offer flexible hourly, task-based, and project-based pricing with transparent estimates before work begins.",
//   },
// ];
// export default function hireLayout({
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
