import React from "react";
import Link from "next/link";

// Primary CTA Component - Main call to action
export function PrimaryCTA({
  title = "Ready to Automate Your Business?",
  description = "Let's discuss how I can build similar AI solutions for your company. From document processing to customer service automation, I build solutions that deliver real ROI.",
  primaryButton = "Start Your Project",
  primaryLink = "/contact",
  secondaryButton = "View My Work",
  secondaryLink = "/projects",
  className = "",
}) {
  return (
    <section className={`py-12 px-6 ${className}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href={primaryLink}
            className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-xl font-medium transition-colors group"
          >
            <span>{primaryButton}</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          <Link
            href={secondaryLink}
            className="inline-flex items-center justify-center gap-3 text-gray-600 hover:text-gray-900 px-8 py-4 font-medium transition-colors"
          >
            <span>{secondaryButton}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Gradient CTA Component - Eye-catching version
export function GradientCTA({
  title = "Transform Your Operations with AI",
  description = "Join companies that have automated their processes and reduced operational costs by up to 88%. Let's build your intelligent solution.",
  buttonText = "Get Started Today",
  buttonLink = "/contact",
  className = "",
}) {
  return (
    <section className={`py-24 px-6 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 lg:p-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 mb-10 leading-relaxed text-lg max-w-2xl mx-auto">
            {description}
          </p>
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors group text-lg"
          >
            <span>{buttonText}</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
      </div>
    </section>
  );
}

// Inline CTA Component - Subtle, within content
export function InlineCTA({
  text = "Interested in similar automation solutions?",
  buttonText = "Let's discuss your project",
  buttonLink = "/contact",
  className = "",
}) {
  return (
    <div
      className={`my-12 p-8 bg-indigo-50 border border-indigo-200 rounded-2xl text-center ${className}`}
    >
      <p className="text-gray-700 mb-6 text-lg">{text}</p>
      <Link
        href={buttonLink}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors group"
      >
        <span>{buttonText}</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
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
  );
}

// Contact CTA Component - Direct contact focus
export function ContactCTA({
  title = "Let's Build Something Amazing",
  description = "Whether you're looking to automate processes, integrate AI into your business, or build intelligent solutions, I'd love to hear about your project.",
  className = "",
}) {
  return (
    <section className={`py-24 px-6 bg-gray-50 ${className}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Email CTA */}
          <a
            href="mailto:hello@hasbihassadiqin.com"
            className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <svg
                className="w-6 h-6 text-indigo-600"
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
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Send Email</h3>
            <p className="text-gray-600 text-sm text-center">
              For detailed project discussions
            </p>
          </a>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 text-sm text-center">
              Quick questions & updates
            </p>
          </a>

          {/* Schedule CTA */}
          <Link
            href="/contact"
            className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Schedule Call</h3>
            <p className="text-gray-600 text-sm text-center">
              Book a consultation
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Project Showcase CTA - Links to portfolio
export function ProjectCTA({
  title = "See AI Automation in Action",
  description = "Explore real projects where I've reduced operational costs by 88%, automated customer service, and eliminated manual processes.",
  className = "",
}) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-indigo-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/projects"
              className="flex items-center justify-between p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 group"
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-indigo-600">
                  View All Projects
                </h3>
                <p className="text-gray-600 text-sm">
                  Complete portfolio showcase
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
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

            <Link
              href="/blog"
              className="flex items-center justify-between p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 group"
            >
              <div>
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-indigo-600">
                  Read Case Studies
                </h3>
                <p className="text-gray-600 text-sm">
                  Technical deep dives & insights
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
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
        </div>
      </div>
    </section>
  );
}

// Usage Examples Component
export function CTAExamples() {
  return (
    <div className="space-y-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        CTA Components Examples
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          1. Primary CTA (Main Call-to-Action)
        </h2>
        <PrimaryCTA />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          2. Gradient CTA (Eye-catching)
        </h2>
        <GradientCTA />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          3. Inline CTA (Within Content)
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">
            This is some sample content in a blog post or article. The inline
            CTA appears naturally within the content flow.
          </p>
          <InlineCTA />
          <p className="text-gray-600 mt-4">
            And the content continues after the CTA, maintaining natural reading
            flow.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          4. Contact CTA (Multiple Contact Options)
        </h2>
        <ContactCTA />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          5. Project CTA (Portfolio Showcase)
        </h2>
        <ProjectCTA />
      </div>
    </div>
  );
}

export default CTAExamples;
