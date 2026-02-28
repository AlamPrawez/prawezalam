import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Prawez Alam | Services | Web, Mobile Development, DevOps & System Design",
  description:
    "Explore the professional services offered by Prawez Alam including web and mobile development, SaaS solutions, API integrations, DevOps consulting, system architecture, VPS setup, bug fixing, performance optimization, and project deployment.",
  keywords: [
    "Prawez Alam Services",
    "Web Development Services",
    "Mobile App Development",
    "SaaS Development",
    "API Integration",
    "DevOps Consulting",
    "AWS System Design",
    "VPS Setup",
    "Bug Fixing Services",
    "Performance Optimization",
    "Project Deployment",
    "Technical Consulting",
    "Cloud Architecture",
    "Scalable Systems",
  ],
  alternates: {
    canonical: "https://prawez.com/services",
  },
  openGraph: {
    title: "Prawez Alam | Development & DevOps Services",
    description:
      "Discover professional services including web & mobile app development, SaaS architecture, API integrations, cloud system design, DevOps setup, VPS management, and deployment support.",
    url: "https://prawez.com/services",
    images: [
      {
        url: "https://prawez.com/serives.png",
        width: 1200,
        height: 630,
        alt: "Prawez Alam - Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prawez Alam | Development & Cloud Services",
    description:
      "Professional services including web & mobile development, SaaS solutions, DevOps consulting, system architecture, and deployment support.",
    images: ["https://prawez.com/serives.png"],
  },
};

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I provide web and mobile app development, SaaS platform design, API integrations, DevOps consulting, system architecture planning, VPS setup, performance optimization, and project deployment support.",
  },
  {
    question: "Can you help improve an existing project?",
    answer:
      "Yes, I can review your existing system, optimize performance, fix bugs, improve scalability, and implement new features.",
  },
  {
    question: "Do you provide cloud and infrastructure support?",
    answer:
      "Yes, I design and manage systems using AWS tools, VPS environments, and production-ready deployment strategies.",
  },
  {
    question: "Do you work on complex or custom features?",
    answer:
      "Absolutely. I specialize in building challenging custom functionalities and integrating third-party services.",
  },
  {
    question: "Can you handle deployment and setup?",
    answer:
      "Yes, I manage complete deployment processes including server setup, security configuration, and production readiness.",
  },
];

export default function ServicesLayout({
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
