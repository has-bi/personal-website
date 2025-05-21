import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero-section" className="px-5 pt-5">
      <div className="relative h-225 w-full">
        <div className="absolute inset-0 z-0 ">
          <Image
            src="/images/hero-bg.jpg"
            alt="Background"
            className="object-cover rounded-4xl"
            fill
            priority
          ></Image>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10 h-full flex flex-col justify-end">
          <div className="w-full max-w-160">
            <h1 className="text-5xl font-bold leading-tight mb-4 text-white">
              I Make Machines Do More So You Can Do Less
            </h1>

            <p className="text-xl mb-8 text-white/80">
              Hi! I'm Hasbi, an Applied AI Engineer based in Jakarta.
            </p>

            <div className="flex gap-4">
              <Link
                href="/project"
                className="bg-indigo-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-indigo-300 transition-colors"
              >
                See Projects
              </Link>
              <Link
                href="/blog"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
