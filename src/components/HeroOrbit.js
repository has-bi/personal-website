"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ExpoScaleEase } from "gsap/EasePack";

gsap.registerPlugin(ScrollTrigger, Flip, ExpoScaleEase);

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
  const transitionCtxRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const captionLabelRef = useRef(null);
  const captionTitleRef = useRef(null);
  const captionPreviewRef = useRef(null);
  const scrollActiveRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);

    const prefetchedRoutes = new Set();
    sections.forEach((section) => {
      if (section.href && !section.href.startsWith("#") && !prefetchedRoutes.has(section.href)) {
        prefetchedRoutes.add(section.href);
        router.prefetch(section.href);
      }
    });

    return () => {
      mediaQuery.removeEventListener?.("change", syncPreference);
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

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 961px)", () => {
        const orbitProxy = { angle: 0 };
        let orbitRadiusX = 0;
        let orbitRadiusY = 0;

        const applyOrbitPositions = () => {
          let bottomY = -Infinity;
          let bottomIndex = 0;

          nodes.forEach((node, index) => {
            const point = polarPosition(index, nodes.length, orbitRadiusX, orbitRadiusY, orbitProxy.angle);
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
            gsap.set(node, { left: "50%", top: "46%", xPercent: -50, yPercent: -50 });
          });

          gsap.set(centerCopy, { opacity: 1, y: 0 });
          gsap.set(caption, { opacity: 1, y: 0 });
          applyOrbitPositions();
        };

        measure();

        const st = ScrollTrigger.create({
          id: "orbit-pin",
          trigger: hero,
          start: "top top",
          end: "+=360%",
          pin: true,
          invalidateOnRefresh: true,
          onLeave: () => {
            // Don't reset while a click transition is in progress
            if (isTransitioningRef.current) return;
            orbitProxy.angle = 0;
            applyOrbitPositions();
            gsap.set(centerCopy, { opacity: 1, y: 0 });
            gsap.set(stage, { scale: 1 });
            introPlayed = false;
            window.scrollTo({ top: st.start, behavior: "instant" });
          },
        });

        let introPlayed = false;
        const playIntro = () => {
          if (introPlayed) return;
          introPlayed = true;
          gsap.to(centerCopy, { opacity: 0.58, y: -16, duration: 0.5, ease: "power1.out" });
          gsap.to(stage, { scale: 1.02, duration: 0.5, ease: "power1.out" });
        };

        const onScroll = () => {
          // Don't rotate orbit while a click transition is playing
          if (isTransitioningRef.current) return;

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
    }, hero);

    return () => ctx.revert();
  }, [sections]);

  const selectedSection = sections[activeIndex] ?? sections[0];

  const resetTransitionState = () => {
    const nodes = nodeRefs.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const centerCopy = centerCopyRef.current;
    const caption = captionRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const overlayWash = overlayWashRef.current;
    const overlayPortal = overlayPortalRef.current;
    const overlayHole = overlayHoleRef.current;
    const overlayGlow = overlayGlowRef.current;

    document.body.style.overflow = "";
    isTransitioningRef.current = false;

    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    if (overlayWash) gsap.set(overlayWash, { opacity: 0 });
    // Restore portal to CSS-default position: absolute with no inline styles
    if (overlayPortal) {
      gsap.set(overlayPortal, { clearProps: "all" });
      overlayPortal.style.removeProperty("--transition-image");
    }
    if (overlayHole) gsap.set(overlayHole, { clearProps: "all" });
    if (overlayGlow) gsap.set(overlayGlow, { clearProps: "all" });
    if (nodes.length) gsap.set(nodes, { clearProps: "opacity,scale" });
    if (labels.length) gsap.set(labels, { clearProps: "opacity" });
    if (centerCopy) gsap.set(centerCopy, { clearProps: "opacity,y,autoAlpha" });
    if (caption) gsap.set(caption, { clearProps: "opacity,y,autoAlpha" });
    if (stage) gsap.set(stage, { clearProps: "scale" });
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

    const isReducedMotion = prefersReducedMotionRef.current || window.innerWidth < 961;
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

    if (!selectedNode || !disc || !overlay || !overlayWash || !overlayPortal || !overlayHole || !overlayGlow || !centerCopy || !caption || !stage) {
      router.push(section.href || "/");
      return;
    }

    // Cancel any previous transition
    transitionCtxRef.current?.revert();
    isTransitioningRef.current = true;
    document.body.style.overflow = "hidden";

    const discRect = disc.getBoundingClientRect();
    const discSize = Math.max(discRect.width, discRect.height);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Circle large enough to cover the entire viewport from any position
    const finalSize = Math.hypot(vw, vh) * 1.15;
    const startScale = discSize / finalSize;

    overlayPortal.style.setProperty("--transition-image", section.image || "none");

    const ctx = gsap.context(() => {
      // Show overlay container
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(overlayWash, { opacity: 0 });

      // Step 1: clear any stale transforms from previous runs, separately from setting new props
      gsap.set(overlayPortal, { clearProps: "transform,x,y,xPercent,yPercent,scale,rotate" });

      // Step 2: position portal as position:absolute inside the fixed layer —
      // left/top are viewport-relative. Place it exactly over the disc.
      gsap.set(overlayPortal, {
        left: discRect.left,
        top: discRect.top,
        width: discSize,
        height: discSize,
        borderRadius: "50%",
        opacity: 1,
      });
      gsap.set(overlayHole, { scale: 0.08, opacity: 0.6 });
      gsap.set(overlayGlow, { scale: 0.9, opacity: 0.18 });

      // Step 3: capture Flip state — portal is visually on top of the disc
      const flipState = Flip.getState(overlayPortal);

      // Step 4: set the target (fullscreen) state
      gsap.set(overlayPortal, {
        left: (vw - finalSize) / 2,
        top: (vh - finalSize) / 2,
        width: finalSize,
        height: finalSize,
      });

      // Step 5: fade out everything except the clicked node (that one pops to overlay)
      gsap.to([centerCopy, caption], { autoAlpha: 0, y: 12, duration: 0.2, ease: "power1.in" });
      gsap.to(labels, { opacity: 0, duration: 0.15, stagger: 0.01 });
      gsap.to(
        nodes.filter((_, i) => i !== index),
        { opacity: 0, scale: 0.9, duration: 0.22, stagger: 0.012, ease: "power1.in" }
      );
      gsap.to(selectedNode, { opacity: 0, duration: 0.12, delay: 0.05 });

      // Step 6: Flip from disc position → fullscreen using ExpoScaleEase.
      // ExpoScaleEase maps equal *perceived* scale progress across a huge ratio
      // (disc ~80px → diagonal ~2200px = ~27× scale jump).
      Flip.from(flipState, {
        targets: overlayPortal,
        duration: 1.0,
        ease: ExpoScaleEase.config(startScale, 1, "power2.inOut"),
        scale: true,
        onStart: () => {
          gsap.to(overlayHole, { scale: 1.06, opacity: 1, duration: 1.0, ease: "power2.in" });
          gsap.to(overlayGlow, { scale: 1.5, opacity: 0.06, duration: 1.0, ease: "power2.in" });
          gsap.to(overlayWash, { opacity: 1, duration: 0.5, delay: 0.4, ease: "power1.in" });
        },
        onComplete: () => {
          router.push(section.href || "/");
          // State cleanup happens after route change unmounts; keep overlay visible until then
        },
      });
    });

    transitionCtxRef.current = ctx;
  };

  return (
    <section ref={heroRef} className="editorial-hero editorial-hero-stage">
      <div className="editorial-hero-sticky">
        <div className="editorial-orbit-shell">
          {/* Background video — muted, looping, no controls */}
          <div className="editorial-hero-video" aria-hidden="true">
            <video
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="metadata"
            >
              <source src="/video/hero-bg.webm" type="video/webm" />
              <source src="/video/hero-bg.mp4" type="video/mp4" />
            </video>
          </div>

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
                  className={`editorial-orbit-node${index === activeIndex ? " is-active" : ""}`}
                  ref={(node) => { nodeRefs.current[index] = node; }}
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
                      ref={(label) => { labelRefs.current[index] = label; }}
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

          <div ref={overlayRef} className="editorial-transition-layer" aria-hidden="true">
            <div ref={overlayWashRef} className="editorial-transition-wash" />
            <div ref={overlayPortalRef} className="editorial-transition-portal">
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
