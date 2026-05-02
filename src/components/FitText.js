"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function FitText({ children, className, hoverImages }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const wordRefs = useRef([]);
  const imageRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const currentImage = useRef(null);

  const words = typeof children === "string" ? children.trim().split(/\s+/) : [children];
  const hasImages = hoverImages && hoverImages.some(Boolean);

  const fit = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;
    text.style.fontSize = "100px";
    const containerWidth = container.getBoundingClientRect().width;
    const textWidth = text.getBoundingClientRect().width;
    text.style.fontSize = `${(containerWidth / textWidth) * 100}px`;
  }, []);

  useEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [fit]);

  useEffect(() => {
    if (!hasImages || !imageRef.current) return;
    gsap.set(imageRef.current, { opacity: 0, scale: 0.85, xPercent: -50, yPercent: -50 });
    quickX.current = gsap.quickTo(imageRef.current, "x", { duration: 0.5, ease: "power3.out" });
    quickY.current = gsap.quickTo(imageRef.current, "y", { duration: 0.5, ease: "power3.out" });
  }, [hasImages]);

  const handleWordEnter = (i, e) => {
    const src = hoverImages?.[i];
    if (!src || !imageRef.current) return;
    currentImage.current = src;
    const img = imageRef.current.querySelector("img");
    if (img) img.src = src;
    quickX.current?.(e.clientX);
    quickY.current?.(e.clientY);
    gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
  };

  const handleWordMove = (e) => {
    quickX.current?.(e.clientX);
    quickY.current?.(e.clientY);
  };

  const handleWordLeave = () => {
    gsap.to(imageRef.current, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" });
  };

  return (
    <>
      <div ref={containerRef} className="w-full overflow-hidden">
        <span
          ref={textRef}
          className={className}
          style={{ whiteSpace: "nowrap", display: "inline-block" }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span
                ref={(el) => (wordRefs.current[i] = el)}
                style={{ display: "inline-block" }}
                onMouseEnter={(e) => handleWordEnter(i, e)}
                onMouseMove={handleWordMove}
                onMouseLeave={handleWordLeave}
              >
                {word}
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </span>
      </div>

      {hasImages && (
        <div
          ref={imageRef}
          className="pointer-events-none fixed left-0 top-0 z-9999 h-70 w-52.5 overflow-hidden rounded-2xl"
        >
          <img
            src={hoverImages.find(Boolean)}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}
    </>
  );
}
