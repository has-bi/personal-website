"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-8 z-50">
      <div className="container mx-auto py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="bg-white rounded-full p-1 flex justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo Primary - Transparant.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* Desktop Navigations */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-white text-sm font-light px-3 py-1 rounded-full border border-white  hover:bg-gray-200/40 hover:text-black transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-white text-sm font-light px-3 py-1 rounded-full border border-white  hover:bg-gray-200/40 hover:text-black transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/"
            className="text-white text-sm font-light px-3 py-1 rounded-full border border-white  hover:bg-gray-200/40 hover:text-black transition-colors"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-white text-sm font-light px-3 py-1 rounded-full border border-white  hover:bg-gray-200/40 hover:text-black transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* CTA BUTTON */}
        <Link
          href="/contact"
          className="hidden md:block bg-black text-white text-sm rounded-full px-4 py-2 font-medium hover:bg-opacity-80 transition-colors"
        >
          Hire Me
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/"
                className="text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="bg-black text-white text-sm rounded-full px-4 py-2 font-medium inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Me
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
