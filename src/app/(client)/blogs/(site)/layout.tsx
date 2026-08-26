import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Static fallback parameters (No 'fs', 'path', or '.md' files used)
  const pageTitle = "Software Engineering & Cloud DevOps Insights | Er. Prawez Alam";
  const pageDesc = "Explore technical articles, deep dives, and architectural guides on Next.js, FastAPI, AWS cloud solutions, and scalable web architectures by Er. Prawez Alam.";

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      "Er Prawez Alam Blog",
      "Software Engineering Articles",
      "Web Development Insights",
      "Next.js Tutorials",
      "FastAPI Architecture Deep Dives",
      "DevOps & Cloud Guides",
      "AWS System Design Best Practices",
      "Database Optimization Strategies",
      "SaaS Development Tutorials",
      "Tech Leadership & Engineering Notes"
    ],
    alternates: {
      canonical: "https://prawez.com/blogs",
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
      title: "Er. Prawez Alam | Software Engineering & Tech Insights",
      description: pageDesc,
      url: "https://prawez.com/blogs",
      images: [
        {
          url: "https://prawez.com/blogs.png",
          width: 1200,
          height: 630,
          alt: "Er. Prawez Alam - Blog and Technical Insights",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Er. Prawez Alam | Technical Blog & Engineering Notes",
      description: pageDesc,
      images: ["https://prawez.com/blogs.png"],
    },
  };
}

const blogsFaqs = [
  {
    question: "What topics are covered on this blog?",
    answer: "I cover full-stack software development, cloud infrastructure design, FastAPI performance optimizations, Next.js page builders, Supabase integrations, and real-world DevOps workflows."
  },
  {
    question: "How frequently are new technical articles published?",
    answer: "New deep dives, tutorials, and system design patterns are published regularly as I explore new web technologies and solve production-level engineering challenges."
  },
  {
    question: "Can I implement these code examples in production?",
    answer: "Yes. All architectural designs, code samples, and schema templates shared in these articles are extracted from production-grade implementations and optimized for real-world application."
  }
];

// Interconnected JSON-LD schema linking your blog index back to your identity graph
const blogsJsonGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://prawez.com/blogs/#blog",
      "name": "Er. Prawez Alam Technical Blog",
      "url": "https://prawez.com/blogs",
      "description": "Technical articles and architectural breakdowns covering modern full-stack web engineering and cloud systems.",
      "publisher": {
        "@type": "Person",
        "@id": "https://prawez.com/#person",
        "name": "Er. Prawez Alam",
        "url": "https://prawez.com"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://prawez.com/blogs/#faq",
      "provider": {
        "@id": "https://prawez.com/#person"
      },
      "mainEntity": blogsFaqs.map((faq) => ({
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

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsJsonGraph) }}
      />
      {children}
    </>
  );
}