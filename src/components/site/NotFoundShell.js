"use client";

import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import NotFoundBody from "@/components/site/NotFoundBody";
import { t } from "@/lib/i18n";

// The whole page for global-not-found.js. `lang` comes from the x-locale header that
// src/middleware.js sets, because a global 404 gets no params.
export default function NotFoundShell({ lang, sections, postLanguages }) {
  return (
    <>
      <a
        href="#main"
        className="t-nav sr-only bg-primary px-md py-sm text-on-primary focus:not-sr-only focus:fixed focus:left-md focus:top-md focus:z-50"
      >
        {t(lang).skip}
      </a>
      <SiteNav lang={lang} postLanguages={postLanguages} sections={sections} />
      <main id="main">
        <NotFoundBody lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
