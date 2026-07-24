import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://prawez.com"),

    title: {
        default: "Prawez Alam | Remote Full Stack Engineer & Software Architect",
        template: "%s | Prawez Alam",
    },

    description:
        "Expert Full Stack Engineer specializing in high-performance web systems, custom API gateways, and scalable cloud architectures. Engineering robust solutions globally with Next.js, FastAPI, and gRPC.",

    keywords: [
        // Global & Remote Client Intent
        "Remote Full Stack Engineer",
        "Remote Full Stack Engineer in Nepal",
        "Contract Software Architect",
        "Freelance Next.js Specialist",
        "FastAPI Backend Developer",
        "Remote Web Application Developer",

        // Advanced/Niche Stack (Attracts Global Tech Companies)
        "Next.js FastAPI Architecture",
        "gRPC Multi-Protocol Gateway",
        "PostGIS MobilityDB Geospatial Engineer",
        "High Performance Web Optimization",
        "Tailwind CSS Frontend Engineer",
        "Automated Background Removal API Development",

        // Geographic / Competitive Fallback
        "Full Stack Developer Nepal",
        "Top Software Engineer Kathmandu",
        "MERN Stack Developer in Nepal"
    ],

    authors: [{ name: "Prawez Alam", url: "https://prawez.com" }],
    creator: "Prawez Alam",
    publisher: "Prawez Alam",

    openGraph: {
        title: "Prawez Alam | Remote Full Stack Engineer & Software Architect",
        description:
            "Engineering enterprise-grade web applications and high-performance APIs globally. Specializing in Next.js, FastAPI, microservices, and 100/100 Lighthouse performance metrics.",
        url: "https://prawez.com",
        siteName: "Prawez Alam | Technical Portfolio",
        images: [
            {
                url: "https://prawez.com/prawez.JPEG",
                width: 1200,
                height: 630,
                alt: "Prawez Alam - Remote Full Stack Engineer",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Prawez Alam | Remote Full Stack Developer & Architect",
        description:
            "Building production-ready, highly optimized web applications globally. Next.js, FastAPI, and robust cloud deployments.",
        images: ["https://prawez.com/prawez.JPEG"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    alternates: {
        canonical: "https://prawez.com",
    },
};

// 1. Separated FAQ Questions & Answers Data Array
export const faqs = [
    {
        question: "What industries and locations do you provide software development services for?",
        answer: "I operate globally as a remote Full Stack Engineer, serving international clients, startups, and enterprises worldwide, while maintaining a strong local presence for corporate clients in Nepal. My expertise spans healthcare applications, custom SaaS platforms, image processing tools, and high-performance e-commerce systems."
    },
    {
        question: "What is your primary technology stack for building applications?",
        answer: "My 'Gold Standard' production architecture is Next.js (React) for blazing-fast, SEO-optimized frontends combined with FastAPI (Python) or NestJS (Node.js) for robust, high-performance backends. I specialize in utility-first frameworks like Tailwind CSS, modern state management, and multi-protocol setups using REST and gRPC API gateways."
    },
    {
        question: "How do you ensure web applications are secure and highly optimized?",
        answer: "Performance and security are built in from day one. I engineer applications to achieve perfect 100/100 Lighthouse performance and Core Web Vitals scores by leveraging server-side rendering, advanced asset compression, and clean database structures. Security architectures are vetted using dedicated testing environments like Kali Linux to prevent vulnerabilities."
    },
    {
        question: "Can you integrate AI features or advanced spatial tracking into existing projects?",
        answer: "Yes. I have extensive experience integrating Large Language Models (LLMs) via LangChain for structured data pipelines, building automated image processing tools (such as background removal utilities), and configuring advanced geospatial backends using PostgreSQL extensions like PostGIS and MobilityDB."
    }
];

// 2. Dynamically Generated Schema from FAQ Array
export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};
// const faqSchema = {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": [
//         {
//             "@type": "Question",
//             "name": "What industries and locations do you provide software development services for?",
//             "acceptedAnswer": {
//                 "@type": "Answer",
//                 "text": "I operate globally as a remote Full Stack Engineer, serving international clients, startups, and enterprises worldwide, while maintaining a strong local presence for corporate clients in Nepal. My expertise spans healthcare applications, custom SaaS platforms, image processing tools, and high-performance e-commerce systems."
//             }
//         },
//         {
//             "@type": "Question",
//             "name": "What is your primary technology stack for building applications?",
//             "acceptedAnswer": {
//                 "@type": "Answer",
//                 "text": "My 'Gold Standard' production architecture is Next.js (React) for blazing-fast, SEO-optimized frontends combined with FastAPI (Python) or NestJS (Node.js) for robust, high-performance backends. I specialize in utility-first frameworks like Tailwind CSS, modern state management, and multi-protocol setups using REST and gRPC API gateways."
//             }
//         },
//         {
//             "@type": "Question",
//             "name": "How do you ensure web applications are secure and highly optimized?",
//             "acceptedAnswer": {
//                 "@type": "Answer",
//                 "text": "Performance and security are built in from day one. I engineer applications to achieve perfect 100/100 Lighthouse performance and Core Web Vitals scores by leveraging server-side rendering, advanced asset compression, and clean database structures. Security architectures are vetted using dedicated testing environments like Kali Linux to prevent vulnerabilities."
//             }
//         },
//         {
//             "@type": "Question",
//             "name": "Can you integrate AI features or advanced spatial tracking into existing projects?",
//             "acceptedAnswer": {
//                 "@type": "Answer",
//                 "text": "Yes. I have extensive experience integrating Large Language Models (LLMs) via LangChain for structured data pipelines, building automated image processing tools (such as background removal utilities), and configuring advanced geospatial backends using PostgreSQL extensions like PostGIS and MobilityDB."
//             }
//         }
//     ]
// };



const defaultJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "name": "Prawez Alam",
            "jobTitle": "Full Stack Engineer & Software Architect",
            "url": "https://prawez.com",
            "image": "https://prawez.com/prawez.JPEG",
            "sameAs": [
                "https://github.com/AlamPrawez",
                "https://linkedin.com/in/prawez-alam"
            ],
            "knowsAbout": [
                "Software Architecture",
                "Full Stack Web Development",
                "Full Stack Development in nepal",
                "FastAPI",
                "Next.js",
                "gRPC API Gateway Design",
                "Geospatial Data Engineering",
                "Web Performance Optimization"
            ],
            "offers": {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Remote Software Engineering & Custom Application Development",
                    "areaServed": "Worldwide"
                }
            }
        },
        {
            "@type": "FAQPage",
            "@id": "https://prawez.com",
            "mainEntity": faqSchema.mainEntity,
        }
    ]
};


export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultJsonLd) }}
            />
            {children}
        </>
    );
}