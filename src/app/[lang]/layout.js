import "../globals.css";
import { notFound } from "next/navigation";
import ClientRuntimeGuards from "@/components/ClientRuntimeGuards";
import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { isLocale, LOCALES, t } from "@/lib/i18n";
import { getPostLanguages } from "@/utils/content";
import { funnelSans, jetbrainsMono } from "@/lib/fonts";
import { DEFAULT_THEME, themeScript } from "@/lib/theme";


// Each language is its own root layout, so <html lang> is right from the first byte.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { site, ogLocale } = t(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: site.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: site.description,
    keywords: ["AI", "LLM", "Automation", "Guides", SITE_NAME],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: SITE_URL,
      title: site.title,
      description: site.description,
      siteName: SITE_NAME,
    },

    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
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
}

export const viewport = {
  // The light canvas (DESIGN.md, Direction v2); the dark theme is opt-in.
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = (lang) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: lang,
});

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const postLanguages = await getPostLanguages();

  return (
    <html
      lang={lang}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${funnelSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema(lang)) }}
        />
        <a
          href="#main"
          className="t-nav sr-only bg-primary px-md py-sm text-on-primary focus:not-sr-only focus:fixed focus:left-md focus:top-md focus:z-50"
        >
          {t(lang).skip}
        </a>
        <ClientRuntimeGuards />
        <SiteNav lang={lang} postLanguages={postLanguages} />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
