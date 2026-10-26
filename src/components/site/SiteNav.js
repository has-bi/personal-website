"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/site";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LogoMark() {
  return <Image src="/images/brand/logo-mark.svg" alt="" width={31} height={22} priority />;
}

// language-toggle: EN is the current language; ID leads to the Indonesian writing list.
function LanguageToggle({ className = "" }) {
  return (
    <p className={`t-mono-nav flex items-center gap-xs text-faint ${className}`}>
      <span className="text-ink" aria-current="true">
        EN
      </span>
      <span aria-hidden="true">/</span>
      <Link href="/writing?lang=id" hrefLang="id" lang="id" className="flex min-h-11 items-center hover:text-ink">
        <span className="sr-only">Bahasa Indonesia: </span>ID
      </Link>
    </p>
  );
}

export default function SiteNav() {
  const pathname = usePathname() || "/";
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
        <Link href="/" className="t-mono-nav flex items-center gap-sm border-r border-hairline px-xl text-ink">
          <LogoMark />
          Hasbi Hassadiqin
        </Link>
        <nav aria-label="Primary" className="flex items-stretch">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
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
        <LanguageToggle className="border-l border-hairline px-md" />
      </div>

      {/* Mobile */}
      <div className="flex h-14 items-center justify-between px-md lg:hidden">
        <Link href="/" className="t-mono-nav flex min-h-11 items-center gap-[10px] text-ink">
          <LogoMark />
          Hasbi
        </Link>
        <div className="flex items-center gap-md">
          <LanguageToggle className="px-xs" />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="t-mono-nav h-11 border border-hairline-strong px-sm text-ink"
          >
            {open ? "[ CLOSE ]" : "[ MENU ]"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-canvas lg:hidden"
        >
          <ul className="border-t border-hairline">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-hairline">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-md px-md py-lg"
                  >
                    <span className="t-mono-label text-faint">[ {item.number} ]</span>
                    <span className={`t-display-lg ${active ? "text-ink" : "text-muted"}`}>/{item.label.toLowerCase()}</span>
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
