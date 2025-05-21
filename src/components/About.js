import React from "react";
import Link from "next/link";

function About() {
  return (
    <section className="w-full pt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-1/4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <h2 className="uppercase text-sm font-medium tracking-wider">
                What I do
              </h2>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:w-3/4">
            <h1 className="text-3xl md:text-4xl font-normal mb-6 leading-snug">
              A Frontend developer based in Jakarta, passionate about creating
              immersive web experiences. From crafting responsive interfaces to
              dynamic animations and interactions.
            </h1>

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-4 hover:underline"
            >
              About Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="w-full border-t border-gray-200 mt-16 flex justify-center">
        <div className="w-5 h-5 bg-white flex items-center justify-center -mt-2.5">
          <span className="text-xl">+</span>
        </div>
      </div>
    </section>
  );
}

export default About;
