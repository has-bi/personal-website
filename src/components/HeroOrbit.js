"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const centerCopyRef = useRef(null);
  const captionRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayWashRef = useRef(null);
  const overlayPortalRef = useRef(null);
  const overlayHoleRef = useRef(null);
  const overlayGlowRef = useRef(null);
  const nodeRefs = useRef([]);
  const labelRefs = useRef([]);
  const transitionTimelineRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const captionLabelRef = useRef(null);
  const captionTitleRef = useRef(null);
  const captionPreviewRef = useRef(null);
  const scrollActiveRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionSection, setTransitionSection] = useState(sections[0] ?? null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);

    const prefetchedRoutes = new Set();

    sections.forEach((section) => {
      if (
        section.href &&
        !section.href.startsWith("#") &&
        !prefetchedRoutes.has(section.href)
      ) {
        prefetchedRoutes.add(section.href);
        router.prefetch(section.href);
      }
    });

    return () => {
      mediaQuery.removeEventListener?.("change", syncPreference);
      transitionTimelineRef.current?.kill();
      document.body.style.overflow = "";
    };
  }, [router, sections]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const centerCopy = centerCopyRef.current;
    const caption = captionRef.current;
    const nodes = nodeRefs.current.filter(Boolean);

    if (!hero || !stage || nodes.length === 0) return undefined;

    const media = gsap.matchMedia();

    media.add("(min-width: 961px)", () => {
      const orbitProxy = { angle: 0 };
      let orbitRadiusX = 0;
      let orbitRadiusY = 0;

      const applyOrbitPositions = () => {
        let bottomY = -Infinity;
        let bottomIndex = 0;

        nodes.forEach((node, index) => {
          const point = polarPosition(
            index,
            nodes.length,
            orbitRadiusX,
            orbitRadiusY,
            orbitProxy.angle
          );

          gsap.set(node, { x: point.x, y: point.y });

          if (point.y > bottomY) {
            bottomY = point.y;
            bottomIndex = index;
          }
        });

        if (scrollActiveRef.current !== bottomIndex) {
          scrollActiveRef.current = bottomIndex;
          const section = sections[bottomIndex];
          if (section) {
            if (captionLabelRef.current) captionLabelRef.current.textContent = section.label;
            if (captionTitleRef.current) captionTitleRef.current.textContent = section.title;
            if (captionPreviewRef.current) captionPreviewRef.current.textContent = section.preview;
          }
        }
      };

      const measure = () => {
        const rect = stage.getBoundingClientRect();
        orbitRadiusX = rect.width * 0.325;
        orbitRadiusY = rect.height * 0.225;

        nodes.forEach((node) => {
          gsap.set(node, {
            left: "50%",
            top: "46%",
            xPercent: -50,
            yPercent: -50,
          });
        });

        gsap.set(centerCopy, { opacity: 1, y: 0 });
        gsap.set(caption, { opacity: 1, y: 0 });
        applyOrbitPositions();
      };

      measure();

      // Pin-only ScrollTrigger — no scrub, no animation state
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=360%",
        pin: true,
        invalidateOnRefresh: true,
        onLeave: () => {
          // Reset orbit and intro, then seamlessly loop to start
          orbitProxy.angle = 0;
          applyOrbitPositions();
          gsap.set(centerCopy, { opacity: 1, y: 0 });
          gsap.set(stage, { scale: 1 });
          introPlayed = false;
          window.scrollTo({ top: st.start, behavior: "instant" });
        },
      });

      // Play the center-copy fade once on first scroll
      let introPlayed = false;
      const playIntro = () => {
        if (introPlayed) return;
        introPlayed = true;
        gsap.to(centerCopy, { opacity: 0.58, y: -16, duration: 0.5, ease: "power1.out" });
        gsap.to(stage, { scale: 1.02, duration: 0.5, ease: "power1.out" });
      };

      // Direct scroll → orbit angle — no scrub lag, no tween state to fight
      const onScroll = () => {
        const scrollY = window.scrollY;
        const scrollRange = st.end - st.start;
        if (scrollRange <= 0) return;

        const progress = Math.min(1, Math.max(0, (scrollY - st.start) / scrollRange));
        orbitProxy.angle = progress * Math.PI * 2;
        applyOrbitPositions();

        if (scrollY > st.start + 10) playIntro();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      ScrollTrigger.addEventListener("refreshInit", measure);

      return () => {
        window.removeEventListener("scroll", onScroll);
        ScrollTrigger.removeEventListener("refreshInit", measure);
        st.kill();
      };
    });

    return () => {
      media.revert();
    };
  }, [sections]);

  const selectedSection = sections[activeIndex] ?? sections[0];

  const resetPortalState = (selectedNode, nodes, labels, centerCopy, caption, stage) => {
    document.body.style.overflow = "";
    gsap.set(nodes, { clearProps: "opacity,scale" });
    gsap.set(labels, { clearProps: "opacity" });
    gsap.set(selectedNode, { clearProps: "opacity" });
    gsap.set([centerCopy, caption, stage], { clearProps: "opacity,y,scale" });
    gsap.set(overlayRef.current, { clearProps: "opacity,visibility" });
    gsap.set(overlayWashRef.current, { clearProps: "opacity" });
    gsap.set(overlayPortalRef.current, {
      clearProps: "x,y,width,height,scale,opacity",
    });
    gsap.set(overlayHoleRef.current, { clearProps: "scale,opacity" });
    gsap.set(overlayGlowRef.current, { clearProps: "scale,opacity" });
    isTransitioningRef.current = false;
  };

  const handlePreviewChange = (index) => {
    if (isTransitioningRef.current) return;
    setActiveIndex(index);
    const section = sections[index];
    if (section) {
      if (captionLabelRef.current) captionLabelRef.current.textContent = section.label;
      if (captionTitleRef.current) captionTitleRef.current.textContent = section.title;
      if (captionPreviewRef.current) captionPreviewRef.current.textContent = section.preview;
    }
  };

  const handleNodeClick = (event, index) => {
    const section = sections[index];
    if (!section) return;

    event.preventDefault();
    setActiveIndex(index);

    const isReducedMotion =
      prefersReducedMotionRef.current || window.innerWidth < 961;

    if (isReducedMotion) {
      router.push(section.href || "/");
      return;
    }

    const selectedNode = nodeRefs.current[index];
    const disc = selectedNode?.querySelector(".editorial-orbit-disc");
    const overlay = overlayRef.current;
    const overlayWash = overlayWashRef.current;
    const overlayPortal = overlayPortalRef.current;
    const overlayHole = overlayHoleRef.current;
    const overlayGlow = overlayGlowRef.current;
    const centerCopy = centerCopyRef.current;
    const caption = captionRef.current;
    const stage = stageRef.current;
    const nodes = nodeRefs.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (
      !selectedNode ||
      !disc ||
      !overlay ||
      !overlayWash ||
      !overlayPortal ||
      !overlayHole ||
      !overlayGlow ||
      !centerCopy ||
      !caption ||
      !stage
    ) {
      router.push(section.href || "/");
      return;
    }

    isTransitioningRef.current = true;
    transitionTimelineRef.current?.kill();

    flushSync(() => {
      setTransitionSection(section);
    });

    const discRect = disc.getBoundingClientRect();
    const size = Math.max(discRect.width, discRect.height);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const finalSize = Math.max(viewportWidth, viewportHeight) * 2.4;
    const finalX = viewportWidth / 2 - finalSize / 2;
    const finalY = viewportHeight / 2 - finalSize / 2;

    document.body.style.overflow = "hidden";

    gsap.set(overlay, { autoAlpha: 1 });
    gsap.set(overlayWash, { opacity: 0 });
    gsap.set(overlayPortal, {
      x: discRect.left,
      y: discRect.top,
      width: size,
      height: size,
      scale: 1,
      opacity: 1,
    });
    gsap.set(overlayHole, { scale: 0.08, opacity: 0.6 });
    gsap.set(overlayGlow, { scale: 0.88, opacity: 0.18 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        resetPortalState(selectedNode, nodes, labels, centerCopy, caption, stage);
      },
    });

    transitionTimelineRef.current = timeline;

    timeline
      .to(
        [centerCopy, caption],
        {
          autoAlpha: 0,
          y: 14,
          duration: 0.2,
        },
        0
      )
      .to(
        labels,
        {
          opacity: 0,
          duration: 0.14,
          stagger: 0.015,
        },
        0
      )
      .to(
        nodes.filter((_, nodeIndex) => nodeIndex !== index),
        {
          opacity: 0.12,
          scale: 0.84,
          duration: 0.22,
          stagger: 0.015,
        },
        0
      )
      .to(
        selectedNode,
        {
          opacity: 0,
          duration: 0.08,
        },
        0.06
      )
      .to(
        overlayPortal,
        {
          scale: 1.2,
          duration: 0.22,
          ease: "power2.out",
        },
        0.05
      )
      .to(
        overlayHole,
        {
          scale: 0.66,
          opacity: 1,
          duration: 0.24,
          ease: "power2.out",
        },
        0.08
      )
      .to(
        overlayGlow,
        {
          scale: 1.18,
          opacity: 0.3,
          duration: 0.24,
          ease: "power2.out",
        },
        0.08
      )
      .to(
        overlayWash,
        {
          opacity: 1,
          duration: 0.28,
        },
        0.18
      )
      .to(
        overlayPortal,
        {
          x: finalX,
          y: finalY,
          width: finalSize,
          height: finalSize,
          duration: 0.74,
          ease: "power4.in",
        },
        0.2
      )
      .to(
        overlayHole,
        {
          scale: 1.14,
          duration: 0.74,
          ease: "power4.in",
        },
        0.2
      )
      .to(
        overlayGlow,
        {
          scale: 1.4,
          opacity: 0.1,
          duration: 0.74,
          ease: "power4.in",
        },
        0.2
      )
      .add(() => {
        router.push(section.href || "/");
      }, 0.64);
  };

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
                    index === activeIndex ? " is-active" : ""
                  }`}
                  ref={(node) => {
                    nodeRefs.current[index] = node;
                  }}
                  onMouseEnter={() => handlePreviewChange(index)}
                  onFocus={() => handlePreviewChange(index)}
                  onClick={(event) => handleNodeClick(event, index)}
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
            <p ref={captionLabelRef} className="editorial-orbit-caption-label">
              {selectedSection?.label}
            </p>
            <h2 ref={captionTitleRef}>{selectedSection?.title}</h2>
            <p ref={captionPreviewRef}>{selectedSection?.preview}</p>
          </div>

          <div
            ref={overlayRef}
            className="editorial-transition-layer"
            aria-hidden="true"
          >
            <div ref={overlayWashRef} className="editorial-transition-wash" />
            <div
              ref={overlayPortalRef}
              className="editorial-transition-portal"
              style={{ "--transition-image": transitionSection?.image }}
            >
              <div className="editorial-transition-portal-surface" />
              <div ref={overlayGlowRef} className="editorial-transition-glow" />
              <div ref={overlayHoleRef} className="editorial-transition-hole" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
