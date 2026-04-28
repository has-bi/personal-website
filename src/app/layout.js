import "./globals.css";
import ClientRuntimeGuards from "@/components/ClientRuntimeGuards";
import CustomCursor from "@/components/CustomCursor";
import { Manrope, Newsreader } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: {
    default: "Hasbi Hassadiqin | Applied AI Engineer",
    template: "%s | Hasbi Hassadiqin",
  },
  description:
    "Minimal editorial portfolio for Hasbi Hassadiqin, an applied AI engineer building practical AI products, automation systems, and thoughtful interfaces.",
  keywords: [
    "AI Engineer",
    "Applied AI",
    "AI Product Engineer",
    "Automation",
    "LLM Systems",
    "Portfolio",
  ],
  authors: [{ name: "Hasbi Hassadiqin", url: "https://www.hasbi.pro" }],
  creator: "Hasbi Hassadiqin",
  publisher: "Hasbi Hassadiqin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hasbi.pro",
    title: "Hasbi Hassadiqin | Applied AI Engineer",
    description:
      "Minimal editorial portfolio focused on applied AI, product thinking, and practical systems that ship.",
    siteName: "Hasbi Hassadiqin",
    images: [
      {
        url: "https://www.hasbi.pro/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasbi Hassadiqin - Applied AI Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hasbi Hassadiqin | Applied AI Engineer",
    description:
      "Minimal editorial portfolio focused on applied AI, automation, and writing.",
    creator: "@hssdqn",
    images: ["https://www.hasbi.pro/images/twitter-card.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

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

  verification: {
    google: "f2e8a295bf683fbe",
  },
};

export const viewport = {
  themeColor: "#f7f1e8",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hasbi Hassadiqin",
  url: "https://www.hasbi.pro",
  sameAs: ["https://twitter.com/hssdqn"],
  jobTitle: "Applied AI Engineer",
  description:
    "Applied AI Engineer building practical AI products, automation systems, and thoughtful interfaces.",
  image: "https://www.hasbi.pro/images/og-image.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${newsreader.variable} antialiased`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <CustomCursor />
        <ClientRuntimeGuards />
        {children}
      </body>
    </html>
  );
}
