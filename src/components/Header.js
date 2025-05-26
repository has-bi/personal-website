"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
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
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={`hidden md:inline-flex items-center gap-2 text-sm font-medium rounded-full px-6 py-2.5 transition-all duration-300 group ${
            isScrolled
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          }`}
        >
          <span>Hire Me</span>
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
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-4 py-3 rounded-xl font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Hire Me</span>
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
