import Link from "next/link";
import AboutSidebar from "@/components/AboutSidebar";
import AboutInteractiveSections from "@/components/AboutInteractiveSections";

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
    company: "Altrabyte",
    description:
      "Handling full-stack analytics solutions for retail and e-commerce clients.",
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
    image: "/images/about/devscale-certificate.jpg",
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
    image: "/images/about/revou-certificate.jpg",
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

export default function AboutPage() {
  return (
    <div className="route-shell route-shell-about">
      <section className="pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  About Me
                </span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-900">
                From curiosity to code,
                <br />
                <span className="text-gray-500">
                  building the future with AI
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                I&apos;m Hasbi Hassadiqin, an AI Engineer based in Jakarta who
                transforms complex problems into elegant digital solutions. My
                journey combines technical expertise with creative
                problem-solving to build systems that truly make a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <AboutSidebar skills={skills} />
            </div>

            <div className="lg:col-span-8 space-y-16">
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-8 leading-tight">
                  The Professional Side
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  <p>
                    My journey into AI and web development began with a
                    fundamental question: &quot;How can technology make
                    people&apos;s lives genuinely better?&quot; What started as a
                    deliberate path toward data science, from analyst to
                    engineer to scientist, took an unexpected turn when I
                    discovered the emerging field of AI engineering.
                  </p>
                  <p>
                    Rather than waiting until I felt expert enough, I chose to
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
                    tasks so people can focus on what truly matters, whether
                    that&apos;s delivering better customer experiences or solving
                    complex business challenges.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Career Highlights
                </h3>
                <div className="space-y-8">
                  {career.map((item) => (
                    <div
                      key={`${item.year}-${item.role}`}
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

              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Teaching & Mentoring
                </h3>
                <div className="space-y-8">
                  {teachingExperience.map((item) => (
                    <div
                      key={`${item.year}-${item.role}`}
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

                      <div className="flex flex-wrap gap-3">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
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
                    Sharing knowledge isn&apos;t just about helping others
                    grow. It&apos;s about continuously learning myself. Every
                    question from students challenges me to think deeper and
                    explain concepts more clearly.
                  </p>
                </div>
              </div>

              <AboutInteractiveSections
                education={education}
                currentlyReading={currentlyReading}
              />

              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">
                  Beyond the Code
                </h3>
                <div className="grid gap-6">
                  {funFacts.map((fact) => (
                    <div
                      key={fact.title}
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

              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center">
                <h3 className="text-3xl font-light text-white mb-6">
                  Let&apos;s Build Something Amazing
                </h3>
                <p className="text-gray-300 mb-10 leading-relaxed text-lg max-w-2xl mx-auto">
                  Whether you&apos;re looking to automate processes, integrate
                  AI into your business, or build the next great web
                  application, I&apos;d love to hear about your project.
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
