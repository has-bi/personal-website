"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambleText({ text, delay = 0, chars, speed = 0.6, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(ref.current, {
      delay,
      duration: 1,
      scrambleText: {
        text,
        chars: chars ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        revealDelay: 0.2,
        speed,
      },
      ease: "none",
    });
  }, [text, delay, chars, speed]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
