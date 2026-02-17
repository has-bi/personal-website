"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const mobileButtonRef = useRef(null);

  // Handle mobile menu keyboard navigation and focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isMenuOpen) {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
          mobileButtonRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target) && !mobileButtonRef.current?.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      // Focus first menu item when opened
      const firstMenuItem = menuRef.current?.querySelector('a');
      firstMenuItem?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");

      if (!heroSection) {
        // If no hero section exists (like blog pages), always show blurry bg
        setIsScrolled(true);
        return;
      }

      // If hero section exists, check if we're still within it
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsScrolled(heroBottom <= 100);
    };

    // Set initial state
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) {
      // No hero section = always blurry
      setIsScrolled(true);
    } else {
      // Hero section exists, check initial position
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed w-full top-6 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border border-gray-200/50"
          : "bg-transparent"
      } rounded-full mx-auto max-w-6xl left-0 right-0 px-4`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 transition-all duration-300 group-hover:scale-105">
            <Image
              src="/images/Logo Primary - Transparant.png"
              alt="Hasbi Hassadiqin"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${isActive
                  ? isScrolled 
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-white/20 text-white backdrop-blur-sm"
                  : isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={`hidden md:inline-flex items-center gap-2 text-sm font-medium rounded-full px-6 py-2.5 transition-all duration-300 group active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
            isScrolled
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          }`}
        >
          <span>Contact Me</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <button
          ref={mobileButtonRef}
          className="md:hidden p-3 rounded-full hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isScrolled ? "currentColor" : "white"}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden"
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 min-h-[44px] flex items-center active:scale-95 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 min-h-[44px] active:scale-95"
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsMenuOpen(false);
                  }
                }}
              >
                <span>Contact Me</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
