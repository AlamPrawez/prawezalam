import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prawezalam.vercel.app"), // temporary
  title: "Prawez Alam",
  description: `Experienced Software Developer hands-on industry experience delivering high-quality web applications.
Strong expertise in React.js, Vue.js, Nuxt.js, and Next.js for building modern, responsive, and scalable front-end solutions.
Proficient in backend development using Node.js, Express.js, NestJS framework, and Laravel (PHP).
Skilled in developing full-stack applications, RESTful APIs, and clean, reusable, stand-alone code.
Proven ability in debugging, troubleshooting, and optimizing performance across complex systems.
Experienced in user feedback-driven feature development, ensuring practical, user-focused solutions.
Effective communicator and team collaborator, comfortable working in agile, remote, and independent environments.
Continuously learning and adopting new technologies, frameworks, and best practices.
Dedicated to delivering on-time, scalable, and business-oriented solutions that exceed client expectations.`,

  openGraph: {
    title: "Prawez Alam",
    description:
      "Expert Full Stack Developer specializing in React, Vue, Nuxt, Next.js, Node.js, and Laravel.",
    siteName: "Prawez Alam",
    images: [
      {
        url: "/prawez.JPEG", // now SAFE
        width: 1200,
        height: 630,
        alt: "Prawez Alam – Expert Full Stack Developer",
      },
    ],
    type: "profile",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prawez Alam",
    description:
      "Expert Full Stack Developer building scalable, high-performance web applications.",
    images: ["/prawez.JPEG"],
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
        {children}
      </body>
    </html>
  );
}
