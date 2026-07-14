// src/app/(client)/about/layout.tsx
import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Dynamically generate the SEO tags from your content/about.md file
export async function generateMetadata(): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'about.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      title: data.title,
      description: data.description,
      keywords: [
        "About Er Prawez Alam",
        "Expert Full-Stack Developer",
        "Next.js Portfolio Specialist",
        "FastAPI Back-End Developer",
        "Systems Architecture Consultant",
        "Software Engineer Profile",
        "Clean Code Architecture",
        "PostgreSQL Database Optimization",
        "Scalable Component Design",
        "Docker Workspace Setup"
      ],
      alternates: {
        canonical: "https://prawez.com/about",
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
        title: data.title,
        description: data.description,
        url: "https://prawez.com/about",
        images: [
          {
            url: "https://prawez.com/prawez.webp",
            width: 1200,
            height: 630,
            alt: "Er. Prawez Alam - Professional Technical Profile",
          },
        ],
        locale: "en_US",
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: ["https://prawez.com/prawez.webp"],
      },
    };
  } catch {
    return { title: "About Er. Prawez Alam" };
  }
}

const aboutFaqs = [
  {
    question: "What is your preferred core development stack?",
    answer: "My gold-standard architecture for building high-performance web applications pairs Next.js on the front-end with FastAPI on the back-end."
  },
  {
    question: "How do you ensure web application performance and optimization?",
    answer: "I specialize in technical performance optimization, writing clean code structured to target perfect 100/100 Lighthouse metrics."
  },
  {
    question: "Can you onboard into complex existing codebases?",
    answer: "Yes. I am experienced in joining existing project ecosystems seamlessly."
  },
  {
    question: "What is your approach to system design and database management?",
    answer: "I design systems with scale, security, and modularity in mind using PostgreSQL and gRPC microservices."
  }
];


export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const aboutPageJsonGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://prawez.com/#person",
        "name": "Er. Prawez Alam",
        "url": "https://prawez.com",
        "jobTitle": "Expert Full-Stack Developer & Systems Engineer",
        "image": "https://prawez.com/prawez.webp",
        "sameAs": [
          "https://linkedin.com/in/prawez-alam",
          "https://github.com/AlamPrawez"
        ],
        "knowsAbout": [
          "React", 
          "Next.js", 
          "FastAPI",
          "Python",
          "Node.js", 
          "PostgreSQL",
          "System Architecture",
          "DevOps Infrastructure"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://prawez.com/about/#faq",
        "author": {
          "@id": "https://prawez.com/#person"
        },
        "about": {
          "@id": "https://prawez.com/#person"
        },
        "mainEntity": aboutFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonGraph) }}
      />
      {children}
    </>
  );
}


// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Er. Prawez Alam | Expert Full-Stack Developer & Systems Architect",
//   description:
//     "Explore the technical background and engineering philosophy of Er. Prawez Alam. Specializing in high-performance FastAPI backend engineering and production-ready Next.js web applications.",
//   keywords: [
//     "About Er Prawez Alam",
//     "Expert Full-Stack Developer",
//     "Next.js Portfolio Specialist",
//     "FastAPI Back-End Developer",
//     "Systems Architecture Consultant",
//     "Software Engineer Profile",
//     "Clean Code Architecture",
//     "PostgreSQL Database Optimization",
//     "Scalable Component Design",
//     "Docker Workspace Setup"
//   ],
//   alternates: {
//     canonical: "https://prawez.com/about",
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
//     title: "About Er. Prawez Alam | Full-Stack Developer & Systems Architect",
//     description:
//       "Deep dive into the clean-code methodologies, engineering frameworks, and architectural principles of Er. Prawez Alam.",
//     url: "https://prawez.com/about",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
//         width: 1200,
//         height: 630,
//         alt: "Er. Prawez Alam - Professional Technical Profile",
//       },
//     ],
//     locale: "en_US",
//     type: "profile",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "About Er. Prawez Alam | Full-Stack Systems Engineer",
//     description: "Deep dive into my design values, full stack architecture layers, and expert engineering workflows.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };

// // Highly targeted, page-specific technical FAQs for the About Page
// const aboutFaqs = [
//   {
//     question: "What is your preferred core development stack?",
//     answer: "My gold-standard architecture for building high-performance web applications pairs Next.js on the front-end with FastAPI on the back-end. This specific combination guarantees ultra-fast render speeds, lightweight deployments, robust type safety, and an incredibly responsive asynchronous backend API layer."
//   },
//   {
//     question: "How do you ensure web application performance and optimization?",
//     answer: "I specialize in technical performance optimization, writing clean code structured to target perfect 100/100 Lighthouse metrics. This includes implementing fine-tuned state management, asset compression, database optimization, and efficient server-side caching mechanics."
//   },
//   {
//     question: "Can you onboard into complex existing codebases?",
//     answer: "Yes. I am experienced in joining existing project ecosystems seamlessly. I quickly map out software dependencies, trace application logic, and implement clean extensions or system modernizations without disrupting production stability or core infrastructure."
//   },
//   {
//     question: "What is your approach to system design and database management?",
//     answer: "I design systems with scale, security, and modularity in mind. For data layers, I focus on building resilient database systems utilizing PostgreSQL alongside robust multi-protocol architectures like REST gateways and high-efficiency gRPC microservices."
//   }
// ];

// export default function AboutLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
  
//   const aboutPageJsonGraph = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Person",
//         "@id": "https://prawez.com/#person",
//         "name": "Er. Prawez Alam",
//         "url": "https://prawez.com",
//         "jobTitle": "Expert Full-Stack Developer & Systems Engineer",
//         "image": "https://prawez.com/prawez.webp",
//         "sameAs": [
//           "https://linkedin.com/in/prawez-alam",
//           "https://github.com/AlamPrawez"
//         ],
//         "knowsAbout": [
//           "React", 
//           "Next.js", 
//           "FastAPI",
//           "Python",
//           "Node.js", 
//           "PostgreSQL",
//           "System Architecture",
//           "DevOps Infrastructure"
//         ]
//       },
//       {
//         "@type": "FAQPage",
//         "@id": "https://prawez.com/about/#faq",
//         "author": {
//           "@id": "https://prawez.com/#person"
//         },
//         "about": {
//           "@id": "https://prawez.com/#person"
//         },
//         "mainEntity": aboutFaqs.map((faq) => ({
//           "@type": "Question",
//           "name": faq.question,
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": faq.answer,
//           },
//         })),
//       }
//     ]
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonGraph) }}
//       />
//       {children}
//     </>
//   );
// }


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
//     canonical: "https://prawez.com/about",
//   },
//   openGraph: {
//     title: "Prawez Alam | Full-Stack Developer & AWS DevOps Expert | Bug Fixes, Features, System Design",
//     description:
//       "Hire Prawez Alam, an expert Full-Stack Developer skilled in React, Vue, Nuxt, Next, Node.js, NestJS, Laravel, Python, and AWS DevOps. Fast, reliable solutions for bug fixes, feature development, system design, CI/CD, and cloud deployments.",
//     url: "https://prawez.com/about",
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
// export default function AboutLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // Using the @graph structure to combine Person and FAQPage
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Person",
//         "@id": "https://prawez.com",
//         "name": "Prawez Alam",
//         "url": "https://prawez.com",
//         "jobTitle": "Full-Stack Developer",
//         "image": "https://prawez.com/prawez.webp",
//         "sameAs": [
//           "https://linkedin.com/in/prawez-alam",
//           "https://github.com/AlamPrawez"
//         ],
//         "knowsAbout": ["React", "Next.js", "Node.js", "Python", "AWS", "DevOps", "System Design"]
//       },
//       {
//         "@type": "FAQPage",
//         "@id": "https://prawez.com/about",
//         "mainEntity": faqs.map((faq) => ({
//           "@type": "Question",
//           "name": faq.question,
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": faq.answer,
//           },
//         })),
//       }
//     ]
//   };

//   return (
//     <>

//       {/* Structured Data for FAQ */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       {children}
//     </>
//   );
// }
