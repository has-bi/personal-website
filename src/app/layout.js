// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Hasbi Hassadiqin - AI Engineer & Automation Specialist",
    template: "%s | Hasbi Hassadiqin",
  },
  description:
    "AI Engineer specializing in intelligent automation solutions. I build systems that eliminate manual processes and scale operations, reducing costs by up to 88% through smart technology.",
  keywords: [
    "AI Engineer",
    "Automation Specialist",
    "Process Automation",
    "AI Integration",
    "Document Processing",
    "WhatsApp Bot Development",
    "Business Intelligence",
    "Jakarta Developer",
    "Machine Learning",
    "Data Analytics",
    "Custom AI Solutions",
    "Workflow Automation",
  ],
  authors: [{ name: "Hasbi Hassadiqin", url: "https://www.hasbi.pro" }],
  creator: "Hasbi Hassadiqin",
  publisher: "Hasbi Hassadiqin",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hasbi.pro",
    title: "Hasbi Hassadiqin - AI Engineer & Automation Specialist",
    description:
      "AI Engineer specializing in intelligent automation solutions. I build systems that eliminate manual processes and scale operations.",
    siteName: "Hasbi Hassadiqin Portfolio",
    images: [
      {
        url: "https://www.hasbi.pro/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasbi Hassadiqin - AI Engineer Portfolio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Hasbi Hassadiqin - AI Engineer & Automation Specialist",
    description:
      "AI Engineer specializing in intelligent automation solutions. I build systems that eliminate manual processes and scale operations.",
    creator: "@hssdqn",
    images: ["https://www.hasbi.pro/images/twitter-card.jpg"],
  },

  // Favicon and Icons
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

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Additional Meta Tags
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

  // Verification
  verification: {
    google: "f2e8a295bf683fbe",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },

  // Geo Location (Jakarta)
  other: {
    "geo.region": "ID-JK",
    "geo.placename": "Jakarta",
    "geo.position": "-6.2088;106.8456",
    ICBM: "-6.2088, 106.8456",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hasbi Hassadiqin",
              jobTitle: "AI Engineer",
              description:
                "AI Engineer specializing in intelligent automation solutions",
              url: "https://www.hasbi.pro",
              image: "https://www.hasbi.pro/images/hasbi-professional.jpg",
              sameAs: [
                "https://www.linkedin.com/in/hasbi-hassadiqin/",
                "https://github.com/hasbihassadiqin",
                "https://twitter.com/hssdqn",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jakarta",
                addressCountry: "Indonesia",
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Process Automation",
                "Machine Learning",
                "Document Processing",
                "Business Intelligence",
                "WhatsApp Bot Development",
              ],
              offers: {
                "@type": "Service",
                name: "AI Automation Solutions",
                description:
                  "Custom AI solutions for business process automation",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
