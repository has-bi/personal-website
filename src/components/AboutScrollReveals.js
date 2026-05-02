"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutScrollReveals({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(root.querySelectorAll("[data-about-reveal], [data-clip-reveal]"), {
        autoAlpha: 1,
        y: 0,
        clipPath: "none",
        filter: "none",
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      // — Fade + rise reveals (body copy, labels, lists)
      const revealItems = gsap.utils.toArray("[data-about-reveal]");
      gsap.set(revealItems, { autoAlpha: 0, y: 32, filter: "blur(6px)" });
      ScrollTrigger.batch(revealItems, {
        start: "top 90%",
        once: true,
        batchMax: 4,
        interval: 0.12,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
            clearProps: "transform,filter,visibility",
          });
        },
      });

      // — Clip-path left-to-right reveal (headings, big numbers)
      const clipItems = gsap.utils.toArray("[data-clip-reveal]");
      gsap.set(clipItems, { clipPath: "inset(0 100% 0 0)" });
      clipItems.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              ease: "power4.out",
            });
          },
        });
      });

      // — Title parallax scrub
      const titleSection = root.querySelector("[data-about-title]");
      if (titleSection) {
        gsap.to(titleSection, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: titleSection,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
