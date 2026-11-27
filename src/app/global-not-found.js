import "./globals.css";
import { headers } from "next/headers";
import NotFoundShell from "@/components/site/NotFoundShell";
import { funnelSans, jetbrainsMono } from "@/lib/fonts";
import { DEFAULT_THEME, themeScript } from "@/lib/theme";
import { SITE_NAME } from "@/lib/site";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { getPostLanguages } from "@/utils/content";

// The 404 for URLs that match no route (enabled by experimental.globalNotFound in
// next.config.mjs). It is a full document because no root layout wraps it.
export const metadata = { title: `Halaman tidak ditemukan | ${SITE_NAME}`, robots: { index: false } };

export default async function GlobalNotFound() {
  // src/middleware.js sets x-locale from the address.
  const requested = (await headers()).get("x-locale");
  const lang = isLocale(requested) ? requested : DEFAULT_LOCALE;
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
        <NotFoundShell lang={lang} postLanguages={postLanguages} />
      </body>
    </html>
  );
}
