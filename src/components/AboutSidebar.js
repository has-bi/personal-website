"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSidebar({ skills }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="lg:sticky lg:top-32 space-y-10">
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[4/5] relative overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-gray-100">
          <Image
            src="/images/Me-1.png"
            alt="Hasbi Hassadiqin - Professional"
            fill
            className={`object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />

          <Image
            src="/images/Me-2.jpg"
            alt="Hasbi Hassadiqin - Fun Side"
            fill
            className={`object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />

          <div
            className={`absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            👋 Hey there!
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl border-4 border-white shadow-2xl pointer-events-none transform group-hover:scale-105 transition-transform duration-300"></div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Location
          </h3>
          <p className="text-gray-900 font-medium text-lg">Jakarta, Indonesia</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Experience
          </h3>
          <p className="text-gray-900 font-medium text-lg">2+ Years</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Core Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-2 bg-indigo-50 text-indigo-600 text-sm rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Let&apos;s Connect
        </h3>
        <div className="space-y-3">
          <Link
            href="/contact"
            className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">Get in touch</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="font-medium">View my work</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
