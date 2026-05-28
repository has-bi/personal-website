"use client";

import { useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  message: "",
};

const fieldClass =
  "w-full bg-transparent border-b border-gray-200 pb-3 pt-1 text-sm text-gray-950 placeholder:text-gray-300 focus:outline-none focus:border-[#6840c8] transition-colors duration-200";

const labelClass =
  "block text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gray-400 mb-3";

export default function ContactForm({ projectTypes, timelines }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xpwrzkjg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!response.ok) throw new Error("Form submission failed");

      setSubmitStatus("success");
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-14">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-400 mb-5">
          01 — Project Inquiry
        </p>
        <h2 className="text-[clamp(1.6rem,2.8vw,2.6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-gray-950">
          Tell me what<br />you&apos;re building.
        </h2>
      </div>

      {submitStatus === "success" && (
        <div className="mb-10 py-6 border-t border-b border-gray-200">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#6840c8] mb-2">
            Sent ✓
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Message received. I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-10 py-6 border-t border-b border-gray-200">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gray-950 mb-2">
            Failed to send
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Something went wrong. Please try emailing me directly at{" "}
            <a
              href="mailto:hasbi.at.work@gmail.com"
              className="text-[#6840c8] underline underline-offset-4"
            >
              hasbi.at.work@gmail.com
            </a>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={fieldClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={fieldClass}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Company / Organization</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={fieldClass}
            placeholder="Optional"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label className={labelClass}>Project Type *</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              required
              className={`${fieldClass} appearance-none`}
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
            <label className={labelClass}>Timeline</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className={`${fieldClass} appearance-none`}
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

        <div>
          <label className={labelClass}>Project Description *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className={`${fieldClass} resize-none`}
            placeholder="What are you building, what's the challenge, what does success look like?"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center gap-5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gray-950 hover:text-[#6840c8] disabled:text-gray-300 transition-colors duration-200"
          >
            <span className="h-px w-10 bg-current transition-all duration-300 group-hover:w-16 group-disabled:w-10" />
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
