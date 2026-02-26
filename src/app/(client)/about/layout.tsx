import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Prawez Alam | Hire Expert Full-Stack Developer | Bug Fixes, Features, DevOps, System & Application Design",
  description:
    "Hire Prawez Alam, an experienced Full-Stack Developer skilled in React, Vue, Nuxt, Next, Node.js, NestJS, Laravel, Python, and AWS DevOps tools. Available for small tasks, full projects, urgent bug fixes, feature development, performance optimization, CI/CD setup, and cloud deployments with fast, reliable delivery.",
  keywords: [
    "Full-Stack Developer Hire",
    "React Developer",
    "Vue.js Developer",
    "Node.js Developer",
    "Python Developer",
    "Laravel Developer",
    "NestJS Developer",
    "AWS DevOps Support",
    "System Design Expert",
    "Application Design",
    "Bug Fixes",
    "Feature Development",
    "CI/CD Setup",
    "Docker Setup",
    "Server Deployment",
    "Urgent Website Fix",
    "Hourly Developer",
  ],
  alternates: {
    canonical: "https://prawez.com/hire_for_tasks",
  },
  openGraph: {
    title: "Prawez Alam | Full-Stack Developer & AWS DevOps Expert | Bug Fixes, Features, System Design",
    description:
      "Hire Prawez Alam, an expert Full-Stack Developer skilled in React, Vue, Nuxt, Next, Node.js, NestJS, Laravel, Python, and AWS DevOps. Fast, reliable solutions for bug fixes, feature development, system design, CI/CD, and cloud deployments.",
    url: "https://prawez.com/hire_for_tasks",
    images: [
      {
        url: "https://prawez.com/prawez.webp",
        width: 1200,
        height: 630,
        alt: "Prawez Alam - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Prawez Alam | Full-Stack Developer for Tasks, Projects & DevOps",
    description:
      "Professional Full-Stack Developer available for small tasks, urgent fixes, feature development, system design, and AWS DevOps support.",
    images: ["https://prawez.com/prawez.webp"],
  },
};

const faqs = [
  {
    question: "What kind of tasks can I hire you for?",
    answer:
      "I handle a wide range of tasks including bug fixes, feature development, performance optimization, API integration, system and application design, DevOps setup, Docker configuration, CI/CD pipeline setup, server deployment, and code refactoring.",
  },
  {
    question: "Do you handle urgent fixes?",
    answer:
      "Yes, I prioritize urgent tasks and provide fast turnaround for critical production issues, ensuring minimal downtime and reliable results.",
  },
  {
    question: "Can you work on existing projects?",
    answer:
      "Absolutely. I can join existing projects, quickly understand the codebase, and implement new features or fixes efficiently while following best practices.",
  },
  {
    question: "Do you provide DevOps and deployment support?",
    answer:
      "Yes. I offer full DevOps support including AWS cloud management, Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, and deployment of scalable applications.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing depends on task complexity and scope. I offer flexible task-based or hourly pricing with transparent cost estimates before starting any work.",
  },
];
export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Structured Data for FAQ */}
      <script
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
        }} />
      {children}
    </>
  );
}
