import "../globals.css";
import { notFound } from "next/navigation";
import ClientRuntimeGuards from "@/components/ClientRuntimeGuards";
import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import { sectionNumbers, SITE_URL } from "@/lib/site";
import { isLocale, LOCALES, t } from "@/lib/i18n";
import { CURRENT_ROLE } from "@/app/[lang]/about/data";
import { getPostLanguages, getProjects } from "@/utils/content";
import { funnelSans, jetbrainsMono } from "@/lib/fonts";


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
      template: "%s | Hasbi Hassadiqin",
    },
    description: site.description,
    keywords: ["Solutions Engineer", "Solutions Architect", "AI", "LLM", "RAG", "Automation", "Hasbi Hassadiqin"],
    authors: [{ name: "Hasbi Hassadiqin", url: SITE_URL }],
    creator: "Hasbi Hassadiqin",
    publisher: "Hasbi Hassadiqin",
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: SITE_URL,
      title: site.title,
      description: site.description,
      siteName: "Hasbi Hassadiqin",
    },

    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
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
}

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const personSchema = (lang) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hasbi Hassadiqin",
  url: SITE_URL,
  sameAs: [
    "https://twitter.com/hssdqn",
    "https://www.linkedin.com/in/hasbi-hassadiqin/",
    "https://github.com/has-bi",
  ],
  jobTitle: CURRENT_ROLE.title,
  worksFor: { "@type": "Organization", name: CURRENT_ROLE.org },
  description: t(lang).site.person,
});

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [postLanguages, projects] = await Promise.all([getPostLanguages(), getProjects()]);
  const sections = sectionNumbers({ hasProjects: projects.length > 0 });

  return (
    <html lang={lang} className={`${funnelSans.variable} ${jetbrainsMono.variable}`}>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(lang)) }}
        />
        <a
          href="#main"
          className="t-nav sr-only bg-primary px-md py-sm text-on-primary focus:not-sr-only focus:fixed focus:left-md focus:top-md focus:z-50"
        >
          {t(lang).skip}
        </a>
        <ClientRuntimeGuards />
        <SiteNav lang={lang} postLanguages={postLanguages} sections={sections} />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
