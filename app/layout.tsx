import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tailwind-animate.com"),
  title: "Tailwind Animate - Free Online Tailwind CSS Animation Generator & Custom Keyframes Tool",
  description: "Tailwind Animate: Create custom CSS animations for Tailwind CSS with our free visual animation generator. Generate custom keyframes, adjust duration, delay, iteration, and transforms with live preview. Get ready-to-use Tailwind config and CSS classes.",
  keywords: "tailwind animate, tailwind css animation, css animation generator, tailwind config, animation tool, custom animations, css keyframes, tailwind-animate.com",
  authors: [{ name: "Tailwind Animate" }],
  alternates: {
    canonical: "https://tailwind-animate.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tailwind Animate - Free Online Tailwind CSS Animation Generator & Custom Keyframes Tool",
    description: "Tailwind Animate: Create custom CSS animations for Tailwind CSS with our free visual animation generator. Generate custom keyframes and export ready-to-use code with live preview.",
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
    title: "Tailwind Animate - Free Online Tailwind CSS Animation Generator",
    description: "Tailwind Animate: Create custom CSS animations for Tailwind CSS with our free visual animation generator and custom keyframes tool.",
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
