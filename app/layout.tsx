import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Online Tailwind CSS Animation Generator - Custom Keyframes Tool",
  description: "Create custom CSS animations for Tailwind CSS with our free visual animation generator. Adjust duration, delay, iteration, and transforms with live preview. Get ready-to-use Tailwind config and CSS classes.",
  keywords: "tailwind css animation, css animation generator, tailwind config, animation tool, custom animations, css keyframes",
  authors: [{ name: "Tailwind Animation Generator" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Free Online Tailwind CSS Animation Generator - Custom Keyframes Tool",
    description: "Create custom CSS animations for Tailwind CSS with our free visual animation generator.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tailwind CSS Animation Generator - Custom Keyframes Tool",
    description: "Create custom CSS animations for Tailwind CSS with our free visual animation generator.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
