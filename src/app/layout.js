import "./globals.css";
import ClientRuntimeGuards from "@/components/ClientRuntimeGuards";

export const metadata = {
  title: {
    default: "Hasbi Hassadiqin | Pixel Dev GUI Landing Page",
    template: "%s | Hasbi Hassadiqin",
  },
  description:
    "Pixel-styled developer GUI landing page for Hasbi Hassadiqin, featuring projects, blog, and personal sections.",
  keywords: [
    "AI Engineer",
    "Automation Specialist",
    "Pixel UI",
    "Developer GUI",
    "Process Automation",
    "Workflow Automation",
  ],
  authors: [{ name: "Hasbi Hassadiqin", url: "https://www.hasbi.pro" }],
  creator: "Hasbi Hassadiqin",
  publisher: "Hasbi Hassadiqin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hasbi.pro",
    title: "Hasbi Hassadiqin | Pixel Dev GUI Landing Page",
    description:
      "Pixel-styled developer GUI landing page focused on AI automation, projects, and writing.",
    siteName: "Hasbi Hassadiqin",
    images: [
      {
        url: "https://www.hasbi.pro/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasbi Hassadiqin - Pixel Dev GUI Landing Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hasbi Hassadiqin | Pixel Dev GUI Landing Page",
    description:
      "Pixel-styled developer GUI landing page focused on AI automation, projects, and writing.",
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
  themeColor: "#f3f4f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientRuntimeGuards />
        {children}
      </body>
    </html>
  );
}
