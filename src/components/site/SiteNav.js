"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/site";
import { localize, otherLocale, splitLocale, t } from "@/lib/i18n";
import ThemeToggle from "@/components/site/ThemeToggle";

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

// language-toggle: a pill holding ID / EN, always in that order. The current language is
// plain text; the other one links to the same page in that language.
function LanguageToggle({ lang, path, postLanguages, className = "" }) {
  const target = otherLocale(lang);
  const codes = ["id", "en"];
  return (
    <p className={`t-nav flex h-11 items-center gap-xs rounded-pill bg-surface px-md text-faint lg:h-9 ${className}`}>
      {codes.map((code, index) => (
        <span key={code} className="flex items-center gap-xs">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {code === lang ? (
            <span className="text-ink" aria-current="true">
              {code.toUpperCase()}
            </span>
          ) : (
            <Link href={switchHref(path, target, postLanguages)} hrefLang={code} lang={code} className="flex min-h-11 items-center rounded-pill px-xs hover:text-ink lg:min-h-9">
              <span className="sr-only">{t(lang).nav.switchTo}</span>
              {code.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </p>
  );
}

// nav-pill: one link in the centred pill group. The current page is the solid pill.
function navPillClass(active) {
  return `t-nav flex h-9 items-center rounded-pill px-md transition-colors ${
    active ? "bg-primary text-on-primary" : "bg-surface text-muted hover:bg-surface-sunken hover:text-ink"
  }`;
}

// Wordmark left, pill links centred, language pill right (the reference's layout).
// `sections` comes from sectionNumbers(); an item it leaves out (Projects, while none is
// published) is not shown, so no nav item leads to an empty page.
export default function SiteNav({ lang, postLanguages = {}, sections }) {
  const labels = t(lang).nav;
  const items = NAV_ITEMS.filter((item) => sections[item.key]).map((item) => ({
    ...item,
    label: labels[item.key],
    to: localize(lang, item.href),
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
    <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur">
      {/* Desktop */}
      <div className="band hidden h-16 items-center lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href={localize(lang, "/")} className="t-nav flex min-h-11 items-center gap-sm justify-self-start text-ink">
          <LogoMark />
          Hasbi Hassadiqin
        </Link>
        <nav aria-label={labels.primary} className="flex items-center gap-xs">
          {items.map((item) => {
            const active = isActive(path, item.href);
            return (
              <Link key={item.href} href={item.to} aria-current={active ? "page" : undefined} className={navPillClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-xs justify-self-end">
          <ThemeToggle labels={labels} />
          <LanguageToggle {...toggle} />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-14 items-center justify-between px-md lg:hidden">
        <Link href={localize(lang, "/")} className="t-nav flex min-h-11 items-center gap-[10px] text-ink">
          <LogoMark />
          Hasbi
        </Link>
        <div className="flex items-center gap-xs">
          <ThemeToggle labels={labels} />
          <LanguageToggle {...toggle} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="t-nav h-11 rounded-pill bg-primary px-md text-on-primary"
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
          <ul className="flex flex-col gap-xs p-md">
            {items.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.to}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center rounded-card px-lg py-md ${active ? "bg-primary text-on-primary" : "bg-surface text-ink"}`}
                  >
                    <span className="t-display-lg font-light">{item.label}</span>
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
