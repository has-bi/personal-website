"use client";

import { useState, useRef } from "react";

export default function ImpactCard({ value, label, tooltip }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
      className="relative border-t border-gray-200/80 py-10 pr-12"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      <p
        data-clip-reveal
        className="whitespace-nowrap text-[clamp(3rem,6vw,7rem)] font-black uppercase leading-none tracking-[-0.07em]"
      >
        {value}
      </p>
      <p className="mt-4 text-[0.65rem] font-semibold uppercase leading-5 tracking-[0.22em] text-[#6840c8]">
        {label}
      </p>

      {/* Floating tooltip */}
      {visible && (
        <div
          className="pointer-events-none absolute z-50 w-56 rounded-none border border-gray-200 bg-white px-4 py-3 shadow-md"
          style={{
            left: pos.x + 18,
            top: pos.y - 20,
            transform: "translateY(-50%)",
          }}
        >
          <p className="text-[0.72rem] leading-[1.65] text-gray-600">{tooltip}</p>
          <span className="mt-2 block h-px w-6 bg-[#6840c8]/40" />
        </div>
      )}
    </div>
  );
}
