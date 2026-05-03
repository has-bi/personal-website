import Link from "next/link";
import AboutDistanceGreeting from "@/components/AboutDistanceGreeting";
import AboutScrollReveals from "@/components/AboutScrollReveals";
import FitText from "@/components/FitText";
import ImpactCard from "@/components/ImpactCard";

const roles = [
  {
    period: "Dec 2025 - Present",
    title: "AI Specialist",
    company: "Akasha Wira International",
    detail:
      "Leading applied AI systems for order automation, OCR, RAG, ERP-connected workflows, and internal productivity.",
  },
  {
    period: "Nov 2023 - Dec 2025",
    title: "AI & Data Specialist",
    company: "Youvit",
    detail:
      "Built production-grade automation, data infrastructure, OCR pipelines, and conversational AI for operations and customer support.",
  },
  {
    period: "2024 - Present",
    title: "Data Analytics Consultant",
    company: "Altrabyte",
    detail:
      "Designing practical analytics systems for retail and commerce teams, from data modeling to dashboards.",
  },
  {
    period: "Freelance",
    title: "AI & Data Analytics Instructor",
    company: "RevoU",
    detail:
      "Teaching Gen AI, prompt engineering, RAG chatbot development, Document AI, and analytics workflows.",
  },
];

const proofPoints = [
  {
    value: "97%",
    label: "order processing time reduction",
    tooltip:
      "OCR + Python automation at Youvit cut order-to-ERP data entry from hours of manual work down to minutes — end-to-end, no human in the loop.",
  },
  {
    value: "99.98%",
    label: "customer service response improvement",
    tooltip:
      "Nutritalk WhatsApp AI assistant (RAG-powered) reduced response time from 4–5 hours to 4 seconds, handling customer queries around the clock.",
  },
  {
    value: "88%",
    label: "processing cost savings",
    tooltip:
      "Eliminating manual document handling through OCR pipelines and automation slashed operational processing costs by nearly nine-tenths.",
  },
  {
    value: "5.5M IDR",
    label: "monthly operational savings",
    tooltip:
      "Combined impact of order automation and AI-powered customer service — 5.5M IDR saved every month in recurring operational overhead.",
  },
];

const capabilities = [
  "Claude Code",
  "LLM",
  "LangChain",
  "RAG",
  "Document AI",
  "Computer Vision",
  "Vector Databases",
  "Python",
  "Google Cloud Platform",
  "Next.js",
  "Flask",
  "PostgreSQL",
  "n8n",
];

const education = [
  {
    period: "2025",
    title: "Full Stack Developer Bootcamp",
    place: "Devscale Indonesia",
  },
  {
    period: "2023",
    title: "Full Stack Data Analytics",
    place: "RevoU",
  },
  {
    period: "2018 - 2023",
    title: "Bachelor of Engineering, Computer Engineering",
    place: "Universitas Brawijaya",
  },
];

function BeatHeader({ index, label }) {
  return (
    <div data-about-reveal className="mb-14 flex items-center gap-4">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-300">
        0{index}
      </span>
      <span className="h-px w-10 bg-gray-200" />
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-400">
        {label}
      </span>
    </div>
  );
}

export const metadata = {
  title: "About",
  description:
    "About Hasbi Hassadiqin, an AI Specialist building practical automation, RAG, OCR, analytics, and product systems.",
};

export default function AboutPage() {
  return (
    <main className="route-shell route-shell-about about-editorial-shell min-h-screen text-gray-950">
      <AboutScrollReveals>
        <div className="px-5 sm:px-8">
          {/* Nav header */}
          <header
            data-about-reveal
            className="ml-16 flex max-w-[calc(100%-10rem)] flex-col gap-5 pt-5 text-gray-500 sm:flex-row sm:items-center"
          >
            <div className="text-xs font-semibold uppercase leading-5 tracking-[0.16em]">
              <AboutDistanceGreeting />
            </div>
          </header>

          {/* Title */}
          <section data-about-title className="pb-16 pt-28 sm:pt-36">
            <FitText
              className="about-display-title font-black uppercase leading-[0.72] tracking-[0.04em] text-gray-950"
              hoverImages={["/images/Me-1.png", "/images/Me-2.jpg"]}
            >
              About Hasbi
            </FitText>
          </section>

          {/* Beat 1 — Who */}
          <section className="flex min-h-screen flex-col justify-center py-28">
            <div className="mx-auto w-full max-w-6xl">
              <BeatHeader index={1} label="Who" />
              <div className="grid gap-16 md:grid-cols-[1.6fr_1fr]">
                <div>
                  <h2
                    data-clip-reveal
                    className="text-[clamp(1.8rem,3.2vw,3.4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
                  >
                    AI Specialist building production systems for messy business
                    workflows.
                  </h2>
                  <p
                    data-about-reveal
                    className="mt-10 max-w-xl text-base leading-7 text-gray-500"
                  >
                    I work across RAG, OCR, automation, analytics, and
                    full-stack tools. The goal is simple: reduce repeated work,
                    make operations measurable, and ship systems that teams can
                    keep using after the demo is over.
                  </p>
                </div>

                <div
                  data-about-reveal
                  className="flex flex-col justify-between gap-12 md:pt-2"
                >
                  <div className="space-y-3">
                    <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-400">
                      Find me
                    </p>
                    <Link
                      href="/CV_Hasbi Hassadiqin.pdf"
                      className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#6840c8]"
                    >
                      Resume ↗
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/hasbi-hassadiqin/"
                      className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#6840c8]"
                    >
                      LinkedIn ↗
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-400">
                      Working on
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6840c8]">
                      Practical AI
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                      Automation
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                      Clear Systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beat 2 — Impact */}
          <section className="flex min-h-screen flex-col justify-center py-28">
            <div className="mx-auto w-full max-w-6xl">
              <BeatHeader index={2} label="Impact" />
              <div className="grid gap-0 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div key={point.value} data-about-reveal>
                    <ImpactCard
                      value={point.value}
                      label={point.label}
                      tooltip={point.tooltip}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Beat 3 — Work */}
          <section className="flex min-h-screen flex-col justify-center py-28">
            <div className="mx-auto w-full max-w-6xl">
              <BeatHeader index={3} label="Experience" />
              <h2
                data-clip-reveal
                className="mb-14 text-[clamp(3.5rem,8vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.08em]"
              >
                Work so far
              </h2>
              <div className="divide-y divide-gray-200/80 border-y border-gray-200/80">
                {roles.map((role, index) => (
                  <article
                    key={`${role.company}-${role.title}`}
                    data-about-reveal
                    className="grid gap-6 py-8 md:grid-cols-[3.5rem_10rem_1fr]"
                  >
                    <span className="text-xs font-semibold tracking-[0.12em] text-[#6840c8]">
                      0{index + 1}
                    </span>
                    <time className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400 md:pt-1">
                      {role.period}
                    </time>
                    <div>
                      <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">
                        {role.title}
                      </h3>
                      <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#6840c8]">
                        {role.company}
                      </p>
                      <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500">
                        {role.detail}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Beat 4 — Background */}
          <section className="flex min-h-screen flex-col justify-center py-28">
            <div className="mx-auto w-full max-w-6xl">
              <BeatHeader index={4} label="Background" />
              <div className="grid gap-20 md:grid-cols-[1.2fr_1fr]">
                <div data-about-reveal>
                  <p className="mb-8 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-400">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    {capabilities.map((item) => (
                      <span
                        key={item}
                        className="border-b border-gray-200 pb-1 text-lg font-black uppercase leading-none tracking-[-0.03em] text-gray-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div data-about-reveal>
                  <p className="mb-8 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-400">
                    Education
                  </p>
                  <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {education.map((item) => (
                      <div
                        key={`${item.period}-${item.title}`}
                        className="grid grid-cols-[4.5rem_1fr] gap-4 py-5"
                      >
                        <span className="text-xs font-semibold text-[#6840c8]">
                          {item.period}
                        </span>
                        <div>
                          <p className="text-sm font-black uppercase leading-snug">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {item.place}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beat 5 — CTA */}
          <section className="flex min-h-screen flex-col justify-center pb-24 pt-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="border-t border-gray-200/80 pt-10">
                <h2
                  data-clip-reveal
                  className="text-[clamp(4rem,9vw,11rem)] font-black uppercase leading-[0.78] tracking-[-0.08em]"
                >
                  Let&apos;s build
                </h2>
                <div
                  data-about-reveal
                  className="mt-10 flex items-center gap-6"
                >
                  <Link
                    href="/contact"
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6840c8]"
                  >
                    Start a conversation
                  </Link>
                  <span className="h-px w-16 bg-[#6840c8]/30" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </AboutScrollReveals>
    </main>
  );
}
