import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import Navbar from "@/components/Navbar";

import "./globals.css";
// import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prawez.com"),

  title: {
    default: "Prawez Alam | Website & Mobile App Development Expert",
    template: "%s | Prawez Alam",
  },

  description:
    "Prawez Alam is a Full Stack Developer specializing in Website Development, Mobile App Development, and Custom Software Solutions. Expert in React.js, Vue.js, Next.js, Nuxt.js, Node.js, NestJS, Laravel, and scalable backend systems.",

  keywords: [
  // Core Services
  "Website Development",
  "Mobile App Development",
  "Full Stack Developer",
  "Custom Software Development",
  "Web Application Development",

  // Frontend
  "React Developer",
  "Vue Developer",
  "Next.js Developer",
  "Nuxt.js Developer",
  "TypeScript Developer",

  // Backend
  "Node.js Developer",
  "NestJS Developer",
  "Express.js Developer",
  "Laravel Developer",
  "REST API Development",

  // DevOps & Cloud
  "DevOps Engineer",
  "CI/CD Pipeline",
  "Docker",
  "Kubernetes",
  "Nginx",
  "Linux Server Management",
  "AWS Deployment",
  "DigitalOcean Deployment",
  "Cloud Infrastructure",
  "Server Optimization",
  "Performance Optimization",

  // Business Intent
  "Software Development Company",
  "Custom Web Applications",
  "Scalable Web Applications",
],

  authors: [{ name: "Prawez Alam", url: "https://prawez.com" }],
  creator: "Prawez Alam",
  publisher: "Prawez Alam",

  openGraph: {
    title: "Prawez Alam | Website & Mobile App Development Expert",
    description:
      "Professional Website & Mobile App Development Services. Scalable, High-Performance Web Applications built with React, Vue, Next.js, Node.js & Laravel.",
    url: "https://prawez.com",
    siteName: "Prawez Alam",
    images: [
      {
        url: "https://prawez.com/prawez.JPEG",
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
    title: "Prawez Alam | Website & Mobile App Developer",
    description:
      "Full Stack Developer providing Website Development, Mobile Apps & Custom Software Solutions.",
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


// export const metadata: Metadata = {
//   metadataBase: new URL("https://prawez.com"), // temporary
//   title: "Prawez Alam",
//   description: `Experienced Software Developer hands-on industry experience delivering high-quality web applications.
// Strong expertise in React.js, Vue.js, Nuxt.js, and Next.js for building modern, responsive, and scalable front-end solutions.
// Proficient in backend development using Node.js, Express.js, NestJS framework, and Laravel (PHP).
// Skilled in developing full-stack applications, RESTful APIs, and clean, reusable, stand-alone code.
// Proven ability in debugging, troubleshooting, and optimizing performance across complex systems.
// Experienced in user feedback-driven feature development, ensuring practical, user-focused solutions.
// Effective communicator and team collaborator, comfortable working in agile, remote, and independent environments.
// Continuously learning and adopting new technologies, frameworks, and best practices.
// Dedicated to delivering on-time, scalable, and business-oriented solutions that exceed client expectations.`,

//   openGraph: {
//     title: "Prawez Alam",
//     description:
//       "Expert Full Stack Developer specializing in React, Vue, Nuxt, Next.js, Node.js, and Laravel.",
//     url: "https://prawez.com",
//     siteName: "Prawez Alam",
//     images: [
//       {
//         url: "https://prawez.com/prawez.JPEG", // must be absolute URL
//         width: 1200,
//         height: 630,
//         alt: "Prawez Alam – Expert Full Stack Developer",
//       },
//     ],
//     type: "profile",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Prawez Alam",
//     description:
//       "Expert Full Stack Developer building scalable, high-performance web applications.",
//     images: ["https://prawez.com/prawez.JPEG"],
//   },
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar /> */}

        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
