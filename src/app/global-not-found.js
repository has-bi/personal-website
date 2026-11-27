import "./globals.css";
import { headers } from "next/headers";
import NotFoundShell from "@/components/site/NotFoundShell";
import { funnelSans, jetbrainsMono } from "@/lib/fonts";
import { DEFAULT_THEME, themeScript } from "@/lib/theme";
import { sectionNumbers } from "@/lib/site";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { getPostLanguages, getProjects } from "@/utils/content";

// The 404 for URLs that match no route (enabled by experimental.globalNotFound in
// next.config.mjs). It is a full document because no root layout wraps it.
export const metadata = { title: "Halaman tidak ditemukan | Hasbi Hassadiqin", robots: { index: false } };

export default async function GlobalNotFound() {
  // src/middleware.js sets x-locale from the address.
  const requested = (await headers()).get("x-locale");
  const lang = isLocale(requested) ? requested : DEFAULT_LOCALE;
  const [postLanguages, projects] = await Promise.all([getPostLanguages(), getProjects()]);
  const sections = sectionNumbers({ hasProjects: projects.length > 0 });

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
        <NotFoundShell lang={lang} sections={sections} postLanguages={postLanguages} />
      </body>
    </html>
  );
}
