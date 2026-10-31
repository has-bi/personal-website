import "./globals.css";
import { Funnel_Sans, JetBrains_Mono } from "next/font/google";
import ClientRuntimeGuards from "@/components/ClientRuntimeGuards";
import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import { alternates, SITE_URL } from "@/lib/site";

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-funnel-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const SITE_TITLE = "Hasbi Hassadiqin | Tutorials on AI & Automation";
const SITE_DESCRIPTION =
  "Tutorials and notes on AI and automation by Hasbi Hassadiqin, plus a few personal projects.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Hasbi Hassadiqin",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    types: alternates("/").types,
  },
  keywords: ["AI tutorials", "LLM", "RAG", "Automation", "Hasbi Hassadiqin"],
  authors: [{ name: "Hasbi Hassadiqin", url: SITE_URL }],
  creator: "Hasbi Hassadiqin",
  publisher: "Hasbi Hassadiqin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Hasbi Hassadiqin",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@hssdqn",
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hasbi Hassadiqin",
  url: SITE_URL,
  sameAs: [
    "https://twitter.com/hssdqn",
    "https://www.linkedin.com/in/hasbi-hassadiqin/",
    "https://github.com/has-bi",
  ],
  description: "Writes tutorials and notes on AI and automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${funnelSans.variable} ${jetbrainsMono.variable}`}>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="t-mono-nav sr-only bg-primary px-md py-sm text-on-primary focus:not-sr-only focus:fixed focus:left-md focus:top-md focus:z-50"
        >
          Skip to content
        </a>
        <ClientRuntimeGuards />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
