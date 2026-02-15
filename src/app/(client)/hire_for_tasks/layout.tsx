import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Prawez Alam | Hire Developer for Small Tasks, Full Projects, Challenge Tasks | Bug Fixes, Features & DevOps Support",
  description:
    "Hire an experienced Full Stack Developer for small tasks,  Full Projects, Challenge Tasks ,urgent bug fixes, feature additions, DevOps support, Docker setup, CI/CD pipelines, and server deployment. Fast turnaround and reliable delivery.",
  keywords: [
    "Hire Developer for Small Tasks",
    "Fix Website Bugs",
    "Hire React Developer",
    "Hire Node.js Developer",
    "DevOps Support",
    "Docker Setup",
    "CI/CD Pipeline Setup",
    "Nginx Configuration",
    "Linux Server Management",
    "Urgent Website Fix",
    "Hourly Developer",
  ],
  alternates: {
    canonical: "https://prawez.com/hire_for_tasks",
  },
  openGraph: {
    title: "Hire Developer for Small Tasks | Fast & Reliable Support",
    description:
      "Get quick bug fixes, feature upgrades, DevOps setup, and server deployment support from an experienced Full Stack Developer.",
    url: "https://prawez.com/hire_for_tasks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Developer for Tasks | Bug Fixes & DevOps",
    description:
      "Professional developer available for small tasks, urgent fixes, and DevOps support.",
  },
};
const faqs = [
  {
    question: "What kind of tasks can I hire you for?",
    answer:
      "You can hire me for bug fixes, feature additions, performance optimization, DevOps setup, Docker configuration, CI/CD pipeline setup, API integration, server deployment, and code refactoring.",
  },
  {
    question: "Do you handle urgent fixes?",
    answer:
      "Yes, I prioritize urgent tasks and provide fast turnaround for critical production issues.",
  },
  {
    question: "Can you work on existing projects?",
    answer:
      "Absolutely. I can join your existing project, understand the codebase, and implement fixes or new features efficiently.",
  },
  {
    question: "Do you provide DevOps and deployment support?",
    answer:
      "Yes. I handle Docker setup, CI/CD pipelines, Nginx configuration, Linux server management, and cloud deployments.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing depends on task complexity. I offer flexible task-based or hourly pricing with transparent cost estimation before starting.",
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
