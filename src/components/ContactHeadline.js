"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function ContactHeadline() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(line1Ref.current, {
      duration: 0.9,
      scrambleText: {
        text: "Let's",
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        revealDelay: 0.2,
        speed: 0.6,
      },
      ease: "none",
    }).to(
      line2Ref.current,
      {
        duration: 0.9,
        scrambleText: {
          text: "talk.",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          revealDelay: 0.2,
          speed: 0.6,
        },
        ease: "none",
      },
      "-=0.5"
    );
  }, []);

  return (
    <h1 className="text-[clamp(2.8rem,7vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-gray-950">
      <span ref={line1Ref}>Let&apos;s</span>
      <br />
      <span ref={line2Ref}>talk.</span>
    </h1>
  );
}
