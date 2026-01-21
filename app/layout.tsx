import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tailwind-animate.com"),
  title: "Tailwind Animate: The Fastest Way to Create Custom Keyframes (Free Tool)",
  description:
    "Tailwind Animate is a visual tool to generate Tailwind CSS animations and custom keyframes with live preview. One-click copy the tailwind.config.js extension and ready-to-use classes.",
  keywords: "tailwind animate, tailwind css animation, css animation generator, tailwind config, animation tool, custom animations, css keyframes, tailwind-animate.com",
  authors: [{ name: "Tailwind Animate" }],
  alternates: {
    canonical: "https://tailwind-animate.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tailwind Animate: The Fastest Way to Create Custom Keyframes (Free Tool)",
    description:
      "A visual tool to generate Tailwind CSS animations and custom keyframes with live preview. One-click copy the Tailwind config extension and ready-to-use classes.",
    type: "website",
    url: "https://tailwind-animate.com",
    siteName: "Tailwind Animate",
    images: [
      {
        url: "https://tailwind-animate.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tailwind Animate - Custom Animation Generator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailwind Animate: The Fastest Way to Create Custom Keyframes (Free Tool)",
    description:
      "A visual tool to generate Tailwind CSS animations and custom keyframes with live preview. One-click copy the config extension and classes.",
    images: ["https://tailwind-animate.com/og-image.png"],
    creator: "@tailwindanimate",
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
