"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/site";
import { localize, otherLocale, splitLocale, t } from "@/lib/i18n";

// `path` is the language-neutral path ("/writing/x"), so active state works in both languages.
function isActive(path, href) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

// The same page in the other language. A post that is not translated yet leads to the
// other language's writing list instead of a 404.
function switchHref(path, target, postLanguages) {
  const post = /^\/writing\/([^/]+)$/.exec(path);
  if (post && !postLanguages[post[1]]?.includes(target)) return localize(target, "/writing");
  return localize(target, path);
}

function LogoMark() {
  return <Image src="/images/brand/logo-mark.svg" alt="" width={31} height={22} priority />;
}

// language-toggle: ID / EN, always in that order. The current language is plain text;
// the other one links to the same page in that language.
function LanguageToggle({ lang, path, postLanguages, className = "" }) {
  const target = otherLocale(lang);
  const codes = ["id", "en"];
  return (
    <p className={`t-mono-nav flex items-center gap-xs text-faint ${className}`}>
      {codes.map((code, index) => (
        <span key={code} className="flex items-center gap-xs">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {code === lang ? (
            <span className="text-ink" aria-current="true">
              {code.toUpperCase()}
            </span>
          ) : (
            <Link href={switchHref(path, target, postLanguages)} hrefLang={code} lang={code} className="flex min-h-11 items-center hover:text-ink">
              <span className="sr-only">{t(lang).nav.switchTo}</span>
              {code.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </p>
  );
}

// `sections` holds the numbers from sectionNumbers(); an item without a number (Projects,
// while none is published) is left out, so no nav item leads to an empty page.
export default function SiteNav({ lang, postLanguages = {}, sections }) {
  const labels = t(lang).nav;
  const items = NAV_ITEMS.filter((item) => sections[item.key]).map((item) => ({
    ...item,
    label: labels[item.key],
    to: localize(lang, item.href),
    number: sections[item.key],
  }));
  const pathname = usePathname() || "/";
  const { path } = splitLocale(pathname);
  const toggle = { lang, path, postLanguages };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      {/* Desktop */}
      <div className="hidden h-14 items-stretch lg:flex">
        <Link href={localize(lang, "/")} className="t-mono-nav flex items-center gap-sm border-r border-hairline px-xl text-ink">
          <LogoMark />
          Hasbi Hassadiqin
        </Link>
        <nav aria-label={labels.primary} className="flex items-stretch">
          {items.map((item) => {
            const active = isActive(path, item.href);
            return (
              <Link
                key={item.href}
                href={item.to}
                aria-current={active ? "page" : undefined}
                className={`t-mono-nav flex items-center border-r border-hairline px-md transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-faint"
                }`}
              >
                [ {item.number} ] {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex-1" />
        <LanguageToggle {...toggle} className="border-l border-hairline px-md" />
      </div>

      {/* Mobile */}
      <div className="flex h-14 items-center justify-between px-md lg:hidden">
        <Link href={localize(lang, "/")} className="t-mono-nav flex min-h-11 items-center gap-[10px] text-ink">
          <LogoMark />
          Hasbi
        </Link>
        <div className="flex items-center gap-md">
          <LanguageToggle {...toggle} className="px-xs" />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="t-mono-nav h-11 border border-hairline-strong px-sm text-ink"
          >
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label={labels.primary}
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-canvas lg:hidden"
        >
          <ul className="border-t border-hairline">
            {items.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href} className="border-b border-hairline">
                  <Link
                    href={item.to}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-md px-md py-lg"
                  >
                    <span className="t-mono-label text-faint">[ {item.number} ]</span>
                    <span className={`t-display-lg ${active ? "text-ink" : "text-muted"}`}>/{item.key}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
