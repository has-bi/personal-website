import React from "react";

export default function WorkSection() {
  const workExperience = [
    {
      id: 1,
      position: "AI Engineer",
      company: "Youvit",
      description:
        "Built AI-powered solutions including NutriTalk chatbot, automated data processing systems, and affiliate management platforms. Independently managed full-stack projects from concept to deployment, reducing manual operations by 80% and creating scalable data pipelines on Google Cloud Platform.",
      duration: "2024 - Present",
      isActive: true,
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                Experience
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight text-gray-900">
              A yearly snapshot of my
              <br />
              <span className="text-gray-500">creative growth</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              An annual summary that captures my creative journey and
              professional development throughout the years.
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-0">
          {workExperience.map((work, index) => (
            <article
              key={work.id}
              className="group relative border-b border-gray-200 last:border-b-0 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-12 px-6 -mx-6">
                {/* Duration */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                  <time className="text-sm font-medium text-gray-500 tracking-wider">
                    {work.duration}
                  </time>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
                        {work.position}
                      </h3>
                      <p className="text-indigo-600 font-medium text-sm mb-4">
                        {work.company}
                      </p>
                    </div>

                    {/* Current Position Indicator */}
                    {work.isActive && (
                      <div className="flex-shrink-0 mx-4">
                        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                          Current
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed max-w-3xl">
                    {work.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
