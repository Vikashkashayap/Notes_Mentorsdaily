import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GlobalSEO } from "@/components/seo/SEO";
import { publisherMetadata } from "@/lib/seo/metadata";
import { SITE_URL, UPSC_HUB_PATH } from "@/lib/seo/constants";
import "./globals.css";
import "@/styles/seo.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UPSC Notes & IAS Study Material | Mentors Daily",
    template: "%s",
  },
  description:
    "Free UPSC Notes and IAS study material for Prelims and Mains — structured syllabus notes by Mentors Daily.",
  ...publisherMetadata,
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  alternates: {
    canonical: UPSC_HUB_PATH,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className={inter.className}>
        <GlobalSEO />
        {children}
      </body>
    </html>
  );
}
