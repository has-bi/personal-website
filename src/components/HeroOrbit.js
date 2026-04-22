"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function polarPosition(index, total, radiusX, radiusY, angleOffset = 0) {
  const angle = angleOffset + (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * radiusX,
    y: Math.sin(angle) * radiusY,
  };
}

export default function HeroOrbit({ sections = [] }) {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const centerCopyRef = useRef(null);
  const captionRef = useRef(null);
  const nodeRefs = useRef([]);
  const labelRefs = useRef([]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const centerCopy = centerCopyRef.current;
    const caption = captionRef.current;
    const nodes = nodeRefs.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!hero || !stage || nodes.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const proxy = { angle: 0 };
      const activeIndex = 0;
      let orbitRadiusX = 0;
      let orbitRadiusY = 0;
      let focusLeft = 0;
      let stackStart = 0;
      let stackGap = 0;

      const applyOrbitPositions = (angle = proxy.angle) => {
        nodes.forEach((node, index) => {
          const point = polarPosition(index, nodes.length, orbitRadiusX, orbitRadiusY, angle);
          gsap.set(node, { x: point.x, y: point.y });
        });
      };

      const measure = () => {
        const rect = stage.getBoundingClientRect();
        orbitRadiusX = rect.width * 0.28;
        orbitRadiusY = rect.height * 0.2;
        focusLeft = rect.width * 0.24;
        stackStart = rect.width * 0.66;
        stackGap = rect.width * 0.09;

        nodes.forEach((node, index) => {
          gsap.set(node, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            opacity: 1,
          });
        });

        gsap.set(labels, { opacity: 1 });
        gsap.set(centerCopy, { opacity: 1, y: 0 });
        gsap.set(caption, { opacity: 0, y: 12 });
        proxy.angle = 0;
        applyOrbitPositions(0);
      };

      measure();

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        proxy,
        {
          angle: Math.PI * 2,
          duration: 1.05,
          ease: "none",
          onUpdate: () => applyOrbitPositions(proxy.angle),
        },
        0
      )
        .to(
          labels,
          {
            opacity: 0,
            duration: 0.25,
            stagger: 0.02,
          },
          0.74
        )
        .to(
          centerCopy,
          {
            opacity: 0,
            y: 12,
            duration: 0.28,
          },
          0.84
        )
        .to(
          nodes[activeIndex],
          {
            left: () => focusLeft,
            x: 0,
            y: 0,
            scale: 6.6,
            duration: 0.76,
            ease: "power3.inOut",
          },
          0.94
        )
        .to(
          nodes.filter((_, index) => index !== activeIndex),
          {
            left: (index) => stackStart + index * stackGap,
            top: "50%",
            x: 0,
            y: 0,
            scale: 0.72,
            opacity: 0.34,
            duration: 0.76,
            ease: "power3.inOut",
            stagger: 0.03,
          },
          0.94
        )
        .to(
          caption,
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
          },
          1.18
        );

      ScrollTrigger.addEventListener("refreshInit", measure);
    }, hero);

    return () => ctx.revert();
  }, [sections]);

  return (
    <section ref={heroRef} className="editorial-hero editorial-hero-stage">
      <div className="editorial-hero-sticky">
        <div className="editorial-orbit-shell">
          <div ref={centerCopyRef} className="editorial-orbit-center">
            <p className="editorial-orbit-copy">
              Applied AI engineer building practical systems, products, and
              interfaces with a minimal approach.
            </p>
          </div>

          <div className="editorial-orbit-camera" aria-label="Section navigation">
            <div ref={stageRef} className="editorial-orbit-stage">
              {sections.map((section, index) => (
                <a
                  key={section.label}
                  href={section.href}
                  className={`editorial-orbit-node${
                    index === 0 ? " is-active" : ""
                  }`}
                  ref={(node) => {
                    nodeRefs.current[index] = node;
                  }}
                >
                  <span className="editorial-orbit-node-inner">
                    <span
                      className="editorial-orbit-disc"
                      aria-hidden="true"
                      style={{ "--node-image": section.image }}
                    />
                    <span
                      className="editorial-orbit-label"
                      ref={(label) => {
                        labelRefs.current[index] = label;
                      }}
                    >
                      {section.label}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div ref={captionRef} className="editorial-orbit-caption">
            <p className="editorial-orbit-caption-label">{sections[0]?.label}</p>
            <h2>{sections[0]?.title}</h2>
            <p>{sections[0]?.preview}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
