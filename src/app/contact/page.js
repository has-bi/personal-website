"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      description: "Code Repositorys",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xpwrzkjg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not specified",
          projectType: formData.projectType,
          timeline: formData.timeline || "Not specified",
          message: formData.message,
          _subject: `New project inquiry from ${formData.name}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          timeline: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  Contact
                </span>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-gray-900">
                Let's build something
                <br />
                <span className="text-gray-500">amazing together</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                Whether you're looking to automate processes, integrate AI into
                your business, or build the next great web application, I'd love
                to hear about your project. Let's discuss how we can bring your
                vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column - Contact Methods & Info */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-10">
                {/* Contact Methods */}
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-8">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <a
                        key={index}
                        href={method.action}
                        target={
                          method.action.startsWith("http") ? "_blank" : "_self"
                        }
                        rel={
                          method.action.startsWith("http")
                            ? "noopener noreferrer"
                            : ""
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
                                method.primary
                                  ? "text-indigo-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {method.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {method.description}
                            </p>
                            <p
                              className={`font-medium ${
                                method.primary
                                  ? "text-indigo-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {method.value}
                            </p>
                          </div>
                          <svg
                            className={`w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
                              method.primary
                                ? "text-indigo-500"
                                : "text-gray-400"
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

                {/* Response Time */}
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

                {/* Availability */}
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

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4">
                    Start Your Project
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Tell me about your project and I'll get back to you with a
                    detailed proposal and timeline. The more details you
                    provide, the better I can understand your needs.
                  </p>
                </div>

                {submitStatus === "success" && (
                  <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800">
                          Message sent successfully!
                        </h3>
                        <p className="text-green-700 text-sm">
                          I'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-red-800">
                          Failed to send message
                        </h3>
                        <p className="text-red-700 text-sm">
                          Please try again or contact me directly via email.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Your company name (optional)"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Project Description *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project, goals, challenges, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
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
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                    <Link
                      href="/projects"
                      className="px-8 py-4 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View My Work</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Quick answers to common questions about working with me. Don't see
              your question? Feel free to reach out directly.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
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

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            The best projects start with a simple conversation. Let's discuss
            your ideas and see how we can turn them into reality.
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
