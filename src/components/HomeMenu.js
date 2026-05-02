"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/about", label: "Experience" },
  { href: "/blog", label: "Notes" },
  { href: "https://twitter.com/hssdqn", label: "X / Twitter" },
  { href: "https://www.linkedin.com/in/hasbi-hassadiqin/", label: "LinkedIn" },
  { href: "https://github.com/has-bi", label: "GitHub" },
];

function DotGrid() {
  return (
    <span className="editorial-menu-grid" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} />
      ))}
    </span>
  );
}

export default function HomeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`editorial-nav${isOpen ? " is-open" : ""}`}>
      <Link href="/" className="editorial-wordmark" aria-label="Hasbi Hassadiqin home">
        <Image
          src="/images/Logo Primary - Transparant.png"
          alt=""
          width={42}
          height={42}
          priority
          className="editorial-logo-mark"
        />
      </Link>

      <div ref={menuRef} className="editorial-menu">
        <div className="editorial-menu-controls">
          <span className="editorial-menu-dot" aria-hidden="true" />
          <button
            type="button"
            className="editorial-menu-button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <DotGrid />
          </button>
        </div>

        <nav
          className="editorial-menu-panel"
          aria-label="Primary menu"
          aria-hidden={!isOpen}
        >
          <div className="editorial-menu-note">
            <span>Navigation</span>
            <p>Applied AI, product systems, and writing.</p>
          </div>

          <div className="editorial-menu-primary">
            {primaryLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={closeMenu}
                tabIndex={isOpen ? undefined : -1}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="editorial-menu-resources">
            <p>Elsewhere</p>
            {resourceLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={closeMenu}
                tabIndex={isOpen ? undefined : -1}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="editorial-menu-cta"
            onClick={closeMenu}
            tabIndex={isOpen ? undefined : -1}
          >
            Start a conversation
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
