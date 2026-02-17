import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero-section" className="px-6 pt-6 animate-fade-in">
      <div className="relative h-screen max-h-[900px] min-h-[600px] w-full overflow-hidden rounded-3xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            className="object-cover"
            fill
            priority
            loading="eager"
            sizes="100vw"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-8 py-12 relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-4xl mb-16 animate-fade-in-up animate-delay-200">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white">
              I Make Machines Do More
              <br />
              <span className="text-white/80">So You Can Do Less</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed max-w-2xl">
              Hi! I'm Hasbi, an Applied AI Engineer based in Jakarta, creating
              intelligent solutions that simplify complex problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-500">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 group"
              >
                <span>See Projects</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300 group"
              >
                <span>Read Blog</span>
                <svg
                  className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
