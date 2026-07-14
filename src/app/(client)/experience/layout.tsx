import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
  // 1. Base fallbacks using your specified optimized experience properties
  let pageTitle = "Prawez Alam | Expert Full-Stack Developer, DevOps & System Architect";
  let pageDesc = "Explore the technical expertise of Er. Prawez Alam. Specializing in Next.js + FastAPI architectures, NestJS, Laravel, and PostgreSQL.";

  try {
    const filePath = path.join(process.cwd(), 'content', 'experience.md');
    
    // Attempt to read metadata dynamically from experience markdown
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.title) pageTitle = data.title;
      if (data.description) pageDesc = data.description;
    }
  } catch (error) {
    console.error("Failed to read experience.md, applying hardcoded metadata values:", error);
  }

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "Er Prawez Alam",
      "Expert Full-Stack Developer",
      "FastAPI Next.js Gold Standard Stack",
      "Next.js Developer",
      "NestJS Enterprise Engineer",
      "Laravel PHP Development",
      "Python Backend Architect",
      "gRPC Multi-Protocol Gateway",
      "PostgreSQL PostGIS MobilityDB",
      "MongoDB NoSQL",
      "AI Integration Specialist",
      "Real-time Chat Video Systems",
      "AWS DevOps CI CD",
      "Linux VPS Server Management",
      "Kali Linux Environment Security",
      "Lighthouse Performance Optimization",
      "ImgoTool Background Removal",
      "Scalable System Architecture Design"
    ],
    alternates: {
      canonical: "https://prawez.com/experience",
    },
    openGraph: {
      title: "Prawez Alam | Enterprise Full-Stack & DevOps Technical Architecture",
      description:
        "Discover the advanced technical engineering capabilities of Er. Prawez Alam. Production-ready web systems, real-time communication modules, spatial data processing, and optimized cloud architecture.",
      url: "https://prawez.com/experience",
      images: [
        {
          url: "https://prawez.com/prawez.webp",
          width: 1200,
          height: 630,
          alt: "Er. Prawez Alam - Technical Architecture & Skills Portfolio",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Prawez Alam | Full-Stack Architect & DevOps Expert",
      description:
        "Explore enterprise architectures, AI integrations, and cloud infrastructure engineered by Prawez Alam—featuring Next.js, FastAPI, NestJS, gRPC, and AWS DevOps.",
      images: ["https://prawez.com/prawez.webp"],
    },
  };
}

// export const metadata: Metadata = {
//   title: "Prawez Alam | Expert Full-Stack Developer, DevOps & System Architect",
//   description:
//     "Explore the technical expertise of Er. Prawez Alam. Specializing in Next.js + FastAPI architectures, NestJS, Laravel, PostgreSQL (PostGIS), gRPC, AI integration, AWS CI/CD pipelines, and 100/100 Lighthouse performance optimization.",
//   keywords: [
//     "Er Prawez Alam",
//     "Expert Full-Stack Developer",
//     "FastAPI Next.js Gold Standard Stack",
//     "Next.js Developer",
//     "NestJS Enterprise Engineer",
//     "Laravel PHP Development",
//     "Python Backend Architect",
//     "gRPC Multi-Protocol Gateway",
//     "PostgreSQL PostGIS MobilityDB",
//     "MongoDB NoSQL",
//     "AI Integration Specialist",
//     "Real-time Chat Video Systems",
//     "AWS DevOps CI CD",
//     "Linux VPS Server Management",
//     "Kali Linux Environment Security",
//     "Lighthouse Performance Optimization",
//     "ImgoTool Background Removal",
//     "Scalable System Architecture Design",
//   ],
//   alternates: {
//     canonical: "https://prawez.com/experience",
//   },
//   openGraph: {
//     title: "Prawez Alam | Enterprise Full-Stack & DevOps Technical Architecture",
//     description:
//       "Discover the advanced technical engineering capabilities of Er. Prawez Alam. Production-ready web systems, real-time communication modules, spatial data processing, and optimized cloud architecture.",
//     url: "https://prawez.com/experience",
//     images: [
//       {
//         url: "https://prawez.com/prawez.webp",
//         width: 1200,
//         height: 630,
//         alt: "Er. Prawez Alam - Technical Architecture & Skills Portfolio",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Prawez Alam | Full-Stack Architect & DevOps Expert",
//     description:
//       "Explore enterprise architectures, AI integrations, and cloud infrastructure engineered by Prawez Alam—featuring Next.js, FastAPI, NestJS, gRPC, and AWS DevOps.",
//     images: ["https://prawez.com/prawez.webp"],
//   },
// };


export const faqsExperience = [
  {
    question: "What core frameworks and technologies do you specialize in?",
    answer:
      "I specialize in high-performance full-stack engineering. My primary architectural blueprint combines Next.js for high-fidelity frontends with FastAPI (Python) for rapid, performant microservices. Additionally, I hold extensive production experience across TypeScript, Node.js (Express, NestJS), Vue.js (NuxtJS), PHP (Laravel), and robust database systems including MySQL, MongoDB, and PostgreSQL.",
  },
  {
    question: "Do you design specialized database or geospatial architectures?",
    answer:
      "Yes. Beyond standard relational and NoSQL querying in MySQL and MongoDB, I engineer complex data structures using PostgreSQL. This includes building advanced spatiotemporal networks and high-performance location tracking systems using specialized spatial database extensions like PostGIS and MobilityDB.",
  },
  {
    question: "What kind of communications and advanced features can you implement?",
    answer:
      "I have a proven record of shipping real-time communications architecture, including end-to-end live chat networks and fully integrated video meeting platforms. Furthermore, I implement custom GenAI features, automated LLM content pipelines (such as ChatGPT integrations), interactive spatial map routing via Google Maps, and dedicated utility microservices like ImgoTool—an image processor utilizing the rembg library for background removal and automated asset compression.",
  },
  {
    question: "What are your core cloud deployment and DevOps capabilities?",
    answer:
      "I manage the entire infrastructure lifecycle. This includes deploying scalable web applications on AWS, containerizing environments via Docker, configuring Nginx web servers, and building automated CI/CD pipelines. My core server management workflow is grounded in Linux VPS setups and secure, audited environments optimized using Kali Linux.",
  },
  {
    question: "How do you approach web optimization and technical SEO?",
    answer:
      "Performance and search discoverability are built directly into my development lifecycle. I focus heavily on technical SEO and code optimization to engineer web architectures targeting a perfect 100/100 Lighthouse performance profile, clean Core Web Vitals, and excellent domain health metrics tracked via platforms like Ahrefs and Moz.",
  },
];

export default function ExperienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // A. FAQ Structured Schema Block
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsExperience.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // B. Professional Identity Profile Schema Block (Tells Google exactly who you are)
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Prawez Alam",
      "alternateName": "Er. Prawez Alam",
      "jobTitle": "Full Stack Engineer & System Architect",
      "url": "https://prawez.com",
      "image": "https://prawez.com/prawez.webp",
      "knowsAbout": [
        "Full-Stack Development",
        "FastAPI",
        "Next.js",
        "DevOps",
        "PostgreSQL",
        "PostGIS",
        "Cloud Infrastructure",
        "System Architecture"
      ]
    }
  };

  return (
    <>
      {/* Structured Data for FAQ */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }} /> */}
      {/* Structural Data Injection Head Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      {children}
    </>
  );
}
