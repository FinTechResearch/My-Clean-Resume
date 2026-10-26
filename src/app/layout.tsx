import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theblockverse.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aditya Madhok — Web Designer & Developer",
    template: "%s — Aditya Madhok",
  },
  description:
    "Aditya Madhok designs and builds modern websites for businesses — redesigned storefronts, property brands, fashion e-commerce and interactive web experiences.",
  keywords: [
    "Aditya Madhok",
    "web designer",
    "web developer",
    "website redesign",
    "e-commerce website",
    "fashion e-commerce",
    "business website",
    "responsive design",
    "3D web experience",
  ],
  authors: [{ name: "Aditya Madhok" }],
  creator: "Aditya Madhok",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aditya Madhok",
    title: "Aditya Madhok — Web Designer & Developer",
    description:
      "Modern websites with clarity and character. Selected builds include Well Value India and a Nykaa Fashion-inspired 3D e-commerce remake.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Madhok — Web Designer & Developer",
    description:
      "Web design and development for businesses — storefronts, property brands and interactive commerce.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
