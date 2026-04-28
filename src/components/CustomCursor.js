"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Don't show on touch-only devices
    if (!window.matchMedia("(hover: hover)").matches) return;

    dot.style.display = "block";

    const half = dot.offsetWidth / 2;

    const onMouseMove = (e) => {
      dot.style.transform = `translate(${e.clientX - half}px, ${e.clientY - half}px)`;
    };

    const onMouseEnterInteractive = () => dot.classList.add("is-hover");
    const onMouseLeaveInteractive = () => dot.classList.remove("is-hover");

    document.addEventListener("mousemove", onMouseMove);

    const interactive = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return <div ref={dotRef} className="custom-cursor" aria-hidden="true" style={{ display: "none" }} />;
}
