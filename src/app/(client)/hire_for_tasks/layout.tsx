import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Prawez Alam | Hire Developer for Small Tasks, Full Projects, Challenge Tasks | Bug Fixes, Features & DevOps Support",
//   description:
//     "Hire an experienced Full Stack Developer for small tasks, Full Projects, Challenge Tasks, urgent bug fixes, feature additions, DevOps support, Docker setup, CI/CD pipelines, and server deployment. Fast turnaround and reliable delivery.",
//   keywords: [
//     "Hire Developer for Small Tasks",
//     "Fix Website Bugs",
//     "Hire React Developer",
//     "Hire Node.js Developer",
//     "DevOps Support",
//     "Docker Setup",
//     "CI/CD Pipeline Setup",
//     "Nginx Configuration",
//     "Linux Server Management",
//     "Urgent Website Fix",
//     "Hourly Developer",
//   ],
//   alternates: {
//     canonical: "https://prawez.com/hire_for_tasks",
//   },
//   openGraph: {
//     title: "Hire Developer for Small Tasks, Full Projects, Challenge Tasks | Fast & Reliable Support",
//     description:
//       "Get quick bug fixes, feature upgrades, DevOps setup, and server deployment support from an experienced Full Stack Developer.",
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
//     title: "Hire Developer for Tasks, Full Projects, Challenge Tasks | Bug Fixes & DevOps",
//     description:
//       "Professional developer available for small tasks, urgent fixes, and DevOps support.",
//     images: ["https://prawez.com/prawez.webp"],  
//   },
// };
// const faqs = [
//   {
//     question: "What kind of tasks can I hire you for?",
//     answer:
//       "You can hire me for bug fixes, feature additions, performance optimization, DevOps setup, Docker configuration, CI/CD pipeline setup, API integration, server deployment, and code refactoring.",
//   },
//   {
//     question: "Do you handle urgent fixes?",
//     answer:
//       "Yes, I prioritize urgent tasks and provide fast turnaround for critical production issues.",
//   },
//   {
//     question: "Can you work on existing projects?",
//     answer:
//       "Absolutely. I can join your existing project, understand the codebase, and implement fixes or new features efficiently.",
//   },
//   {
//     question: "Do you provide DevOps and deployment support?",
//     answer:
//       "Yes. I handle Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, and cloud deployments.",
//   },
//   {
//     question: "How is pricing structured?",
//     answer:
//       "Pricing depends on task complexity. I offer flexible task-based or hourly pricing with transparent cost estimation before starting.",
//   },
// ];
export const metadata: Metadata = {
  title:
    "Prawez Alam | Post Jobs or Hire a Full Stack Developer | Bug Fixes, Full Projects & DevOps Support",

  description:
    "Post jobs or hire an experienced Full Stack Developer for bug fixes, feature development, full projects, DevOps support, Docker setup, CI/CD pipelines, server deployment, and urgent technical tasks. Fast turnaround and reliable delivery.",

  keywords: [
    "Post Jobs",
    "Hire Developer",
    "Hire Full Stack Developer",
    "Hire React Developer",
    "Hire Node.js Developer",
    "Bug Fixes",
    "Full Project Development",
    "DevOps Support",
    "Docker Setup",
    "CI/CD Pipeline Setup",
    "Nginx Configuration",
    "Linux Server Management",
    "Urgent Developer Support",
    "Hourly Developer",
  ],

  alternates: {
    canonical: "https://prawez.com/hire_for_tasks",
  },

  openGraph: {
    title:
      "Post Jobs or Hire a Full Stack Developer | Fast & Reliable Development Support",

    description:
      "Post jobs or hire for bug fixes, feature development, full projects, DevOps setup, server deployment, and urgent technical support.",

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

    title:
      "Post Jobs or Hire a Developer | Bug Fixes, Projects & DevOps Support",

    description:
      "Hire an experienced developer for urgent fixes, full projects, feature development, and DevOps support.",

    images: ["https://prawez.com/prawez.webp"],
  },
};

const faqs = [
  {
    question: "What jobs or tasks can I post or hire you for?",
    answer:
      "You can post jobs or hire me for bug fixes, feature development, full-stack projects, API integration, performance optimization, DevOps setup, Docker configuration, CI/CD pipelines, server deployment, and code refactoring.",
  },

  {
    question: "Do you handle urgent fixes or production issues?",
    answer:
      "Yes, I prioritize urgent technical issues and provide fast turnaround for production bugs, deployment failures, and critical fixes.",
  },

  {
    question: "Can you work on existing projects?",
    answer:
      "Absolutely. I can join your existing project, understand your codebase, fix issues, improve performance, and implement new features efficiently.",
  },

  {
    question: "Do you provide DevOps and deployment support?",
    answer:
      "Yes. I handle Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, cloud deployments, and infrastructure optimization.",
  },

  {
    question: "How is pricing structured?",
    answer:
      "Pricing depends on project scope and complexity. I offer flexible hourly, task-based, and project-based pricing with transparent estimates before work begins.",
  },
];
export default function hireLayout({
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
