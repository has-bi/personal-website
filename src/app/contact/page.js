import ContactHeadline from "@/components/ContactHeadline";
import ScrambleText from "@/components/ScrambleText";

const secondaryLinks = [
  {
    label: "WhatsApp",
    value: "+62 819-3259-6925",
    href: "https://wa.me/6281932596925",
  },
  {
    label: "LinkedIn",
    value: "hasbi-hassadiqin",
    href: "https://www.linkedin.com/in/hasbi-hassadiqin/",
  },
  {
    label: "GitHub",
    value: "has-bi",
    href: "https://github.com/has-bi",
  },
];

export const metadata = {
  title: "Contact",
  description:
    "Where to reach Hasbi Hassadiqin.",
};

export default function ContactPage() {
  return (
    <div className="route-shell route-shell-contact">
      <section className="min-h-screen flex flex-col justify-between px-5 sm:px-8 pt-36 pb-16">
        <div className="mx-auto w-full max-w-6xl flex-1 flex flex-col justify-center gap-20">

          {/* Header label */}
          <div className="ml-16">
            <span className="text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-gray-400">
              Contact
            </span>
          </div>

          {/* Main CTA */}
          <div className="space-y-10">
            <ContactHeadline />

            <p className="max-w-sm text-base leading-7 text-gray-400">
              Got a project, a question, or just want to say hi — send me an
              email and I&apos;ll get back to you within 24 hours.
            </p>

            <a
              href="mailto:hasbi.at.work@gmail.com"
              className="group inline-flex items-baseline gap-4"
            >
              <span className="h-px w-10 bg-[#6840c8] transition-all duration-300 group-hover:w-16 self-center" />
              <ScrambleText
                text="hasbi.at.work@gmail.com"
                delay={1.2}
                chars="abcdefghijklmnopqrstuvwxyz.@"
                speed={0.5}
                className="text-[clamp(1rem,2.2vw,1.5rem)] font-semibold tracking-[-0.02em] text-[#6840c8] underline underline-offset-4 decoration-1 decoration-[#6840c8]/40 group-hover:decoration-[#6840c8] transition-all duration-200"
              />
            </a>
          </div>

          {/* Secondary channels */}
          <div>
            <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gray-300">
              Or find me on
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-16">
              {secondaryLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3"
                >
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gray-400">
                    {link.label}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.06em] text-gray-500 group-hover:text-[#6840c8] transition-colors duration-200">
                    {link.value}&nbsp;↗
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer row */}
        <div className="mx-auto w-full max-w-6xl flex items-baseline justify-between mt-16">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6840c8] animate-pulse" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gray-400">
              Available for new projects
            </span>
          </div>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gray-300">
            Jakarta, UTC+7
          </span>
        </div>
      </section>
    </div>
  );
}
