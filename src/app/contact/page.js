import ContactForm from "@/components/ContactForm";

const projectTypes = [
  "AI Integration & Automation",
  "Web Application Development",
  "Data Analytics & Visualization",
  "WhatsApp Bot Development",
  "Document Processing Automation",
  "Consultation & Strategy",
  "Other",
];

const timelines = [
  "ASAP (Rush project)",
  "1-2 months",
  "3-6 months",
  "6+ months",
  "Flexible",
];

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    description: "For detailed project discussions",
    value: "hasbi.at.work@gmail.com",
    action: "mailto:hasbi.at.work@gmail.com",
    primary: true,
  },
  {
    icon: "💬",
    title: "WhatsApp",
    description: "Quick questions and updates",
    value: "+62 819-3259-6925",
    action: "https://wa.me/6281932596925",
    primary: false,
  },
  {
    icon: "💼",
    title: "LinkedIn",
    description: "Professional networking",
    value: "Hasbi Hassadiqin",
    action: "https://www.linkedin.com/in/hasbi-hassadiqin/",
    primary: false,
  },
  {
    icon: "🐙",
    title: "GitHub",
    description: "Code Repositories",
    value: "has-bi",
    action: "https://github.com/has-bi",
    primary: false,
  },
];

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Most projects take 1-3 months depending on complexity. AI automation projects typically require 2-4 weeks, while full web applications can take 2-3 months. I always provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely! I work with clients globally. I'm based in Jakarta (UTC+7) but I'm flexible with meeting times to accommodate different time zones.",
  },
  {
    question: "What's included in your AI consultation?",
    answer:
      "My consultation includes analysis of your current processes, identification of automation opportunities, technology recommendations, implementation roadmap, and ROI projections. It's a comprehensive review of how AI can benefit your specific business.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes! I offer different support packages including bug fixes, feature updates, performance monitoring, and training for your team. We can discuss the best support option for your project during our consultation.",
  },
];

export default function ContactPage() {
  return (
    <div className="route-shell route-shell-contact">
      <section className="pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Contact
                </span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-900">
                Let&apos;s build something
                <br />
                <span className="text-gray-500">amazing together</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                Whether you&apos;re looking to automate processes, integrate AI
                into your business, or build the next great web application,
                I&apos;d love to hear about your project. Let&apos;s discuss how
                we can bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-10">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-8">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    {contactMethods.map((method) => (
                      <a
                        key={method.title}
                        href={method.action}
                        target={method.action.startsWith("http") ? "_blank" : "_self"}
                        rel={
                          method.action.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`block p-6 rounded-2xl border transition-all duration-300 group ${
                          method.primary
                            ? "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">{method.icon}</div>
                          <div className="flex-1">
                            <h3
                              className={`font-medium mb-1 ${
                                method.primary ? "text-indigo-900" : "text-gray-900"
                              }`}
                            >
                              {method.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {method.description}
                            </p>
                            <p
                              className={`font-medium ${
                                method.primary ? "text-indigo-600" : "text-gray-700"
                              }`}
                            >
                              {method.value}
                            </p>
                          </div>
                          <svg
                            className={`w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
                              method.primary ? "text-indigo-500" : "text-gray-400"
                            }`}
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
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="font-medium text-green-800">
                      Quick Response
                    </h3>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">
                    I typically respond to emails within 24 hours and WhatsApp
                    messages within a few hours during business days (Jakarta
                    time).
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Current Availability
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Projects:</span>
                      <span className="text-green-600 font-medium">
                        Available
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation:</span>
                      <span className="text-red-500 font-medium">
                        Unavailable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ContactForm projectTypes={projectTypes} timelines={timelines} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Quick answers to common questions about working with me. Don&apos;t
              see your question? Feel free to reach out directly.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            The best projects start with a simple conversation. Let&apos;s
            discuss your ideas and see how we can turn them into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:hasbi.at.work@gmail.com"
              className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-xl font-medium transition-colors group"
            >
              <span>Send Email</span>
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/6281932596925"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 text-gray-600 hover:text-gray-900 px-8 py-4 font-medium transition-colors"
            >
              <span>WhatsApp Message</span>
            </a>
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
