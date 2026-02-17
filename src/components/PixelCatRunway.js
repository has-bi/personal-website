"use client";

import { useEffect, useRef } from "react";

const START_X = -52;
const END_PADDING = 10;
const NOSE_OFFSET = 10;
const LOOP_MS = 7000;

export default function PixelCatRunway({
  message = "THANK YOU FOR READING MY SITE",
}) {
  const runwayRef = useRef(null);
  const catRef = useRef(null);
  const maskRef = useRef(null);
  const lapRef = useRef(0);
  const prevCatXRef = useRef(START_X);

  useEffect(() => {
    let raf;
    const t0 = performance.now();

    const tick = (now) => {
      const runway = runwayRef.current;
      const cat = catRef.current;
      const mask = maskRef.current;
      if (!runway || !cat || !mask) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const W = runway.clientWidth;
      const endX = W + END_PADDING;
      const distance = endX - START_X;
      const progress = ((now - t0) % LOOP_MS) / LOOP_MS;
      const catX = START_X + distance * progress;
      const noseX = catX + NOSE_OFFSET;

      cat.style.left = `${catX}px`;

      // Detect lap wrap
      if (catX < prevCatXRef.current) {
        lapRef.current += 1;
      }
      prevCatXRef.current = catX;

      const revealing = lapRef.current % 2 === 0;

      if (revealing) {
        // Mask covers right side — text revealed behind the cat
        mask.style.left = `${Math.max(0, noseX - 2)}px`;
        mask.style.right = "0";
      } else {
        // Mask covers left side — text hidden behind the cat
        mask.style.left = "0";
        mask.style.right = `${Math.max(0, W - noseX + 2)}px`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="cat-runway"
      ref={runwayRef}
      aria-label="Mini pixel cat animation"
    >
      <p className="cat-message">
        {message.split("").map((char, i) => (
          <span key={i}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </p>

      <div className="cat-mask" ref={maskRef} />

      <div
        className="pixel-cat"
        ref={catRef}
        aria-hidden="true"
        style={{ left: `${START_X}px` }}
      >
        <span className="cat-head" />
        <span className="cat-ear cat-ear-left" />
        <span className="cat-ear cat-ear-right" />
        <span className="cat-body" />
        <span className="cat-tail" />
        <span className="cat-leg cat-leg-front" />
        <span className="cat-leg cat-leg-back" />
      </div>
    </div>
  );
}
