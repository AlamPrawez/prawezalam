import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Prawez Alam | Technical Skills | Full-Stack Development, DevOps & System Architecture",
  description:
    "Explore the technical skills of Prawez Alam, a Full-Stack Developer experienced in JavaScript, TypeScript, React, Vue, Nuxt, Next.js, Node.js, NestJS, Laravel, Python, AWS, Docker, CI/CD, and scalable system architecture.",
  keywords: [
    "Prawez Alam Skills",
    "Full-Stack Developer Skills",
    "React Expertise",
    "Vue.js Expertise",
    "Next.js Developer",
    "Nuxt Developer",
    "Node.js Skills",
    "NestJS Experience",
    "Laravel Development",
    "Python Backend",
    "AWS DevOps",
    "Docker",
    "Nginx",
    "CI/CD",
    "System Architecture",
    "Load Balancer",
    "Cloud Deployment",
    "Scalable Application Design",
  ],
  alternates: {
    canonical: "https://prawez.com/experience",
  },
  openGraph: {
    title: "Prawez Alam | Full-Stack & DevOps Technical Skills",
    description:
      "Discover the technical stack and engineering capabilities of Prawez Alam including modern frontend, backend, DevOps, cloud architecture, and scalable system design.",
    url: "https://prawez.com/experience",
    images: [
      {
        url: "https://prawez.com/prawez.webp",
        width: 1200,
        height: 630,
        alt: "Prawez Alam - Technical Skills",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prawez Alam | Full-Stack Developer Technical Expertise",
    description:
      "Explore technologies, tools, and system design expertise including React, Vue, Node.js, Python, AWS, Docker, CI/CD, and scalable architecture.",
    images: ["https://prawez.com/prawez.webp"],
  },
};
const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in modern full-stack technologies including JavaScript, TypeScript, React, Vue, Nuxt, Next.js, Node.js, NestJS, Laravel, and Python for building scalable and maintainable applications.",
  },
  {
    question: "Do you have experience with cloud and DevOps?",
    answer:
      "Yes, I work extensively with AWS services, Docker, CI/CD pipelines, Nginx, Linux servers, and load balancers to deploy and manage scalable production systems.",
  },
  {
    question: "What kind of system architecture do you design?",
    answer:
      "I design scalable, secure, and performance-optimized architectures including microservices, API-driven systems, cloud-native deployments, and high-traffic ready infrastructure.",
  },
  {
    question: "Do you work across frontend and backend?",
    answer:
      "Yes, I build complete end-to-end solutions — from interactive UI development to backend APIs, database design, and deployment pipelines.",
  },
  {
    question: "Do you optimize performance and scalability?",
    answer:
      "Absolutely. I focus on performance optimization, efficient data handling, caching strategies, and infrastructure scaling to ensure applications run reliably under heavy load.",
  },
];
export default function ExperienceLayout({
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
