"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedBook, setSelectedBook] = useState(0);

  const skills = [
    "Next.js & React",
    "Tailwind CSS",
    "TypeScript",
    "Python",
    "AI Integration",
    "Google Cloud",
    "n8n",
  ];

  const funFacts = [
    {
      icon: "🎮",
      title: "League of Legends Player",
      description:
        "When I'm not coding, you'll find me trying to destroy enemy bases in Summoners Rift. Yeah, I've been playing League of Legends for over 7 years now.",
    },
    {
      icon: "☕",
      title: "Coffee Lover",
      description:
        "I believe the best code is written with the perfect cup of coffee. Currently obsessed with cold brew with floral and fruity notes (Halu Banana from West Java is my favorite).",
    },
    {
      icon: "📚",
      title: "Continuous Learner",
      description:
        "Always diving deep into new technologies. Currently exploring the intersection of AI and web development, and just finished Full Stack Developer Bootcamp by Devscale.",
    },
  ];

  const currentlyReading = [
    {
      title: "How Will You Measure Your Life?",
      author: "Clayton M. Christensen",
      cover:
        "https://m.media-amazon.com/images/I/71+T2JA9QuL._AC_UF1000,1000_QL80_.jpg",
      progress: 15,
      status: "Currently Reading",
      thoughts:
        "It's too early to say, but I love the book so far. The way Christensen applies theories into practical life lessons, like the Bernoulli Principle, is fascinating.",
      category: "Self-Improvement",
      favoriteQuote:
        "It's easier to hold your principles 100% of the time than it is to hold them 98% of the time.",
    },
    {
      title: "Your Next Five Moves",
      author: "Patrick Bet-David",
      cover:
        "https://m.media-amazon.com/images/I/71di3H8Co9L._AC_UF1000,1000_QL80_.jpg",
      progress: 100,
      status: "Recently Finished",
      thoughts:
        "Bet-David's emphasis on anticipating consequences and planning multiple scenarios ahead is incredibly practical. It's not about predicting the future perfectly, but about developing the mental framework to think strategically.",
      category: "Self-Improvement",
      favoriteQuote:
        "The ability to think strategically is the ability to see the invisible - to see what others cannot see, to anticipate what others cannot anticipate.",
    },
  ];

  const career = [
    {
      year: "2024 - Present",
      role: "AI Engineer",
      company: "Youvit",
      description:
        "Building AI-powered solutions that reduce manual operations by 80% and scale customer service infinitely.",
    },
    {
      year: "2024 - Present",
      role: "Data Analytics Consultant",
      company: "Altrabyte (Co-founder)",
      description:
        "Co-founded consulting venture handling full-stack analytics solutions for retail and e-commerce clients.",
    },
  ];

  const teachingExperience = [
    {
      year: "2024 - Present",
      role: "AI & Data Analytics Mentor",
      company: "RevoU",
      description:
        "Mentoring aspiring data professionals in AI implementation, data analytics fundamentals, and practical data visualizations. Helping students bridge the gap between theory and real-world applications.",
      highlights: [
        "AI Implementation",
        "Career Guidance",
        "Industry Best Practices",
      ],
    },
  ];

  const education = [
    {
      year: "2025",
      title: "Fullstack JavaScript Bootcamp",
      institution: "Devscale Indonesia",
      description:
        "Intensive 3-month bootcamp achieving excellent grade in modern web development. Mastered full-stack JavaScript development from dynamic frontend interfaces to scalable backend APIs. Built complete end-to-end applications using industry best practices, covering both relational and non-relational databases, responsive design, and seamless frontend-backend integration.",
      image: "/images/about/devscale-bootcamp.jpg",
      highlights: [
        "React.js & State Management",
        "Node.js & Express.js",
        "RESTful API Development",
        "Database Systems (PostgreSQL, MongoDB)",
        "Full-Stack Application Development",
        "Git Version Control",
        "Responsive Web Design",
      ],
    },
    {
      year: "2023",
      title: "Full Stack Data Analytics",
      institution: "RevoU",
      description:
        "Comprehensive data analytics program covering the complete data pipeline from collection to visualization. Gained hands-on experience in data gathering, manipulation, and creating actionable business insights through modern analytics tools and methodologies.",
      image: "/images/about/revou-analytics.jpg",
      highlights: [
        "Data Manipulation (SQL, Python)",
        "Data Visualization (Tableau, Google Data Studio)",
        "Spreadsheet Analytics",
        "Business Intelligence",
      ],
    },
    {
      year: "2018 - 2023",
      title: "Computer Engineering",
      institution: "Univeritas Brawijaya",
      description:
        "Computer Engineering degree with thesis focused on developing a classification system for plastic waste types based on Resin Identification Code using YOLOv5s on Raspberry Pi. This project enhanced plastic recycling efficiency and sustainability, demonstrating expertise in deep learning and embedded systems integration.",
      image: "/images/about/data-science-study.jpg",
      highlights: [
        "Computer Engineering",
        "Computer Vision",
        "Machine Learning",
        "Deep Learning",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Column - Label */}
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  About Me
                </span>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-900">
                From curiosity to code,
                <br />
                <span className="text-gray-500">
                  building the future with AI
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                I'm Hasbi Hassadiqin, an AI Engineer based in Jakarta who
                transforms complex problems into elegant digital solutions. My
                journey combines technical expertise with creative
                problem-solving to build systems that truly make a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-10">
                {/* Interactive Picture Frame */}
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="aspect-[4/5] relative overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-gray-100">
                    {/* Professional Photo */}
                    <Image
                      src="/images/Me-1.jpg"
                      alt="Hasbi Hassadiqin - Professional"
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isHovered ? "opacity-0" : "opacity-100"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                    />

                    {/* Fun Photo */}
                    <Image
                      src="/images/Me-2.jpg"
                      alt="Hasbi Hassadiqin - Fun Side"
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    {/* Hover Indicator */}
                    <div
                      className={`absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      👋 Hey there!
                    </div>
                  </div>

                  {/* Frame Shadow Effect */}
                  <div className="absolute inset-0 rounded-3xl border-4 border-white shadow-2xl pointer-events-none transform group-hover:scale-105 transition-transform duration-300"></div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Location
                    </h3>
                    <p className="text-gray-900 font-medium text-lg">
                      Jakarta, Indonesia
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Experience
                    </h3>
                    <p className="text-gray-900 font-medium text-lg">
                      2+ Years
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                    Core Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-indigo-50 text-indigo-600 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Let's Connect
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
            </div>

            {/* Right Column - Scrollable Content */}
            <div className="lg:col-span-8 space-y-16">
              {/* Professional Story */}
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-8 leading-tight">
                  The Professional Side
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  <p>
                    My journey into AI and web development began with a
                    fundamental question: "How can technology make people's
                    lives genuinely better?" What started as a deliberate path
                    toward data science—from analyst to engineer to
                    scientist—took an unexpected turn when I discovered the
                    emerging field of AI engineering.
                  </p>
                  <p>
                    Rather than waiting until I felt "expert enough," I chose to
                    embrace this unanticipated opportunity. Sometimes the best
                    career moves come from recognizing when to pivot from your
                    original plan and lean into new possibilities that align
                    with your core mission.
                  </p>
                  <p>
                    At Youvit, this philosophy translates into building AI
                    systems that transform customer service, automate complex
                    document processing, and scale operations without losing the
                    human touch. Every project I work on eliminates repetitive
                    tasks so people can focus on what truly matters—whether
                    that's delivering better customer experiences or solving
                    complex business challenges.
                  </p>
                </div>
              </div>

              {/* Career Timeline */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Career Highlights
                </h3>
                <div className="space-y-8">
                  {career.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 pl-8 pb-8 last:pb-0"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <time className="text-sm font-medium text-indigo-600">
                          {item.year}
                        </time>
                      </div>
                      <h4 className="text-xl font-medium text-gray-900 mb-2">
                        {item.role}
                      </h4>
                      <p className="text-gray-600 font-medium mb-4 text-lg">
                        {item.company}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching & Mentoring Section */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Teaching & Mentoring
                </h3>
                <div className="space-y-8">
                  {teachingExperience.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <time className="text-sm font-medium text-indigo-600">
                          {item.year}
                        </time>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      </div>
                      <h4 className="text-xl font-medium text-gray-900 mb-2">
                        {item.role}
                      </h4>
                      <p className="text-indigo-600 font-medium mb-4 text-lg">
                        {item.company}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-3">
                        {item.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-900">
                      💡 Why I teach:
                    </span>{" "}
                    Sharing knowledge isn't just about helping others grow—it's
                    about continuously learning myself. Every question from
                    students challenges me to think deeper and explain concepts
                    more clearly.
                  </p>
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Education & Learning
                </h3>
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <div
                      key={index}
                      className={`border rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                        selectedEducation === index
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white"
                      }`}
                      onClick={() =>
                        setSelectedEducation(
                          selectedEducation === index ? null : index
                        )
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <time className="text-sm font-medium text-indigo-600">
                              {item.year}
                            </time>
                            <div
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                selectedEducation === index
                                  ? "bg-indigo-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          </div>
                          <h4 className="text-xl font-medium text-gray-900 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 font-medium mb-4 text-lg">
                            {item.institution}
                          </p>
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {item.description}
                          </p>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-3">
                            {item.highlights.map((highlight, hIndex) => (
                              <span
                                key={hIndex}
                                className={`px-3 py-1 text-sm rounded-full font-medium transition-colors duration-300 ${
                                  selectedEducation === index
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Click indicator */}
                        <div
                          className={`ml-6 transition-transform duration-300 ${
                            selectedEducation === index
                              ? "rotate-45"
                              : "rotate-0"
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Expandable Image Section */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          selectedEducation === index
                            ? "max-h-80 opacity-100 mt-8"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={`${item.title} at ${item.institution}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />

                          {/* Image overlay with info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 text-white">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm opacity-90">
                              {item.institution} • {item.year}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Helper text */}
                <p className="text-sm text-gray-500 mt-6 text-center">
                  💡 Click on any education item to view related images
                </p>
              </div>

              {/* Currently Reading Section */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Currently Reading
                </h3>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Book Navigation */}
                  <div className="flex border-b border-gray-100">
                    {currentlyReading.map((book, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBook(index)}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                          selectedBook === index
                            ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              book.progress === 100
                                ? "bg-green-500"
                                : "bg-indigo-500"
                            }`}
                          ></div>
                          <span className="hidden sm:inline">{book.title}</span>
                          <span className="sm:hidden">{index + 1}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Book Display */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {/* Book Cover */}
                      <div className="sm:col-span-1">
                        <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg group">
                          <Image
                            src={currentlyReading[selectedBook].cover}
                            alt={`${currentlyReading[selectedBook].title} book cover`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 25vw"
                          />
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="sm:col-span-2 space-y-6">
                        {/* Title & Author */}
                        <div>
                          <h4 className="text-xl font-medium text-gray-900 mb-2">
                            {currentlyReading[selectedBook].title}
                          </h4>
                          <p className="text-gray-600 font-medium text-lg">
                            by {currentlyReading[selectedBook].author}
                          </p>
                        </div>

                        {/* Status & Progress */}
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-4 py-2 text-sm font-medium rounded-full ${
                              currentlyReading[selectedBook].status ===
                              "Recently Finished"
                                ? "bg-green-100 text-green-700"
                                : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {currentlyReading[selectedBook].status}
                          </span>
                          <span className="px-3 py-1 bg-amber-50 text-amber-600 text-sm rounded-full">
                            {currentlyReading[selectedBook].category}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-gray-700">
                              Reading Progress
                            </span>
                            <span className="text-gray-500">
                              {currentlyReading[selectedBook].progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                currentlyReading[selectedBook].progress === 100
                                  ? "bg-green-500"
                                  : "bg-indigo-500"
                              }`}
                              style={{
                                width: `${currentlyReading[selectedBook].progress}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* My Thoughts */}
                        <div>
                          <h5 className="font-medium text-gray-700 mb-3">
                            💭 My Thoughts
                          </h5>
                          <p className="text-gray-600 leading-relaxed">
                            {currentlyReading[selectedBook].thoughts}
                          </p>
                        </div>

                        {/* Favorite Quote */}
                        {currentlyReading[selectedBook].favoriteQuote && (
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h5 className="font-medium text-gray-700 mb-3">
                              ✨ Favorite Quote
                            </h5>
                            <blockquote className="text-gray-800 italic leading-relaxed">
                              "{currentlyReading[selectedBook].favoriteQuote}"
                            </blockquote>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Facts */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Beyond the Code
                </h3>
                <div className="grid gap-6">
                  {funFacts.map((fact, index) => (
                    <div
                      key={index}
                      className="flex gap-6 p-6 bg-white rounded-2xl hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                    >
                      <div className="text-3xl flex-shrink-0">{fact.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 text-lg">
                          {fact.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {fact.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center">
                <h3 className="text-3xl font-light text-white mb-6">
                  Let's Build Something Amazing
                </h3>
                <p className="text-gray-300 mb-10 leading-relaxed text-lg max-w-2xl mx-auto">
                  Whether you're looking to automate processes, integrate AI
                  into your business, or build the next great web application,
                  I'd love to hear about your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-colors group text-lg"
                  >
                    <span>Start a Project</span>
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
                    href="/projects"
                    className="inline-flex items-center justify-center gap-3 text-white hover:text-gray-200 px-8 py-4 font-medium transition-colors text-lg"
                  >
                    <span>View My Work</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="relative">
        <div className="w-full h-px bg-gray-200"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
