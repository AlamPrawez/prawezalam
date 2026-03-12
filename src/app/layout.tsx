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
