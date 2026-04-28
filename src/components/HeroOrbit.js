"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ExpoScaleEase } from "gsap/EasePack";

gsap.registerPlugin(Flip, ExpoScaleEase);

const orbitSampleImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
];

function orbitSampleImage(index = 0) {
  return orbitSampleImages[index % orbitSampleImages.length];
}

const centerTextLines = [
  "Applied AI engineer",
  "building practical systems",
  "You can see my work through",
  "click the circle!",
];

function polarPosition(index, total, radiusX, radiusY, angleOffset = 0) {
  const angle = angleOffset + (index / total) * Math.PI * 2 - Math.PI / 2;

  return {
    x: Math.cos(angle) * radiusX,
    y: Math.sin(angle) * radiusY,
  };
}

function cssImageValue(image) {
  if (!image) return "none";
  if (image.startsWith("/") || image.startsWith("http")) return `url(${image})`;
  return image;
}


export default function HeroOrbit({ sections = [] }) {
  const router = useRouter();
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const centerCopyRef = useRef(null);
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
  const scrollActiveRef = useRef(0);
  const touchStartRef = useRef(null);
  const textPhaseLockedRef = useRef(false);
  const scrollAccumRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

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
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [router, sections]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const centerCopy = centerCopyRef.current;
    const nodes = nodeRefs.current.filter(Boolean);

    if (!hero || !stage || nodes.length === 0) return undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("all", () => {
        const orbitProxy = { angle: 0 };
        let orbitRadiusX = 0;
        let orbitRadiusY = 0;
        let targetAngle = 0;
        let introPlayed = false;

        const syncActiveSection = (index) => {
          if (scrollActiveRef.current === index) return;

          scrollActiveRef.current = index;
          setActiveIndex(index);
        };

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

          syncActiveSection(bottomIndex);
        };

        const measure = () => {
          const rect = stage.getBoundingClientRect();
          orbitRadiusX = rect.width * 0.42;
          orbitRadiusY = rect.height * 0.31;

          nodes.forEach((node) => {
            gsap.set(node, { left: "50%", top: "46%", xPercent: -50, yPercent: -50 });
          });

          gsap.set(centerCopy, { opacity: 1, y: 0 });
          applyOrbitPositions();
        };

        measure();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        const playIntro = () => {
          if (introPlayed) return;
          introPlayed = true;
          gsap.to(centerCopy, { opacity: 0.58, y: -16, duration: 0.5, ease: "power1.out" });
          gsap.to(stage, { scale: 1.02, duration: 0.5, ease: "power1.out" });
        };

        const SWAP_THRESHOLD = 500;

        const triggerTextSwap = () => {
          if (textPhaseLockedRef.current) return;
          textPhaseLockedRef.current = true;

          const copy = centerCopyRef.current;
          if (!copy) return;

          gsap.killTweensOf(copy);
          gsap.to(copy, {
            opacity: 0,
            y: 8,
            duration: 0.22,
            ease: "power2.in",
            overwrite: true,
            onComplete: () => {
              setTextPhase(1);
              gsap.fromTo(
                copy,
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.05 }
              );
            },
          });
        };

        const rotateOrbit = (delta, multiplier = 0.0028) => {
          // Don't rotate orbit while a click transition is playing
          if (isTransitioningRef.current) return;
          if (Math.abs(delta) < 1) return;

          if (!textPhaseLockedRef.current) {
            scrollAccumRef.current += Math.abs(delta);
            if (scrollAccumRef.current >= SWAP_THRESHOLD) {
              triggerTextSwap();
            }
          }

          targetAngle += delta * multiplier;

          gsap.to(orbitProxy, {
            angle: targetAngle,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
            onUpdate: applyOrbitPositions,
          });

          playIntro();
        };

        const onWheel = (event) => {
          event.preventDefault();

          const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
            ? event.deltaY
            : event.deltaX;

          rotateOrbit(delta);
        };

        const onTouchStart = (event) => {
          const touch = event.touches[0];
          if (!touch) return;
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        };

        const onTouchMove = (event) => {
          const touch = event.touches[0];
          const start = touchStartRef.current;
          if (!touch || !start) return;

          event.preventDefault();

          const deltaX = start.x - touch.clientX;
          const deltaY = start.y - touch.clientY;
          const delta = Math.abs(deltaY) >= Math.abs(deltaX) ? deltaY : deltaX;

          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          rotateOrbit(delta, 0.006);
        };

        const onKeyDown = (event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") return;
          if (event.target instanceof Element && event.target.closest(".editorial-menu")) return;

          event.preventDefault();
          const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
          rotateOrbit(direction * 120);
        };

        const onResize = () => measure();

        hero.addEventListener("wheel", onWheel, { passive: false });
        hero.addEventListener("touchstart", onTouchStart, { passive: true });
        hero.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);

        return () => {
          hero.removeEventListener("wheel", onWheel);
          hero.removeEventListener("touchstart", onTouchStart);
          hero.removeEventListener("touchmove", onTouchMove);
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("resize", onResize);
        };
      });
    }, hero);

    return () => ctx.revert();
  }, [sections]);

  const resetTransitionState = () => {
    const nodes = nodeRefs.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const centerCopy = centerCopyRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const overlayWash = overlayWashRef.current;
    const overlayPortal = overlayPortalRef.current;
    const overlayHole = overlayHoleRef.current;
    const overlayGlow = overlayGlowRef.current;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
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
    if (stage) gsap.set(stage, { clearProps: "scale" });
  };

  const handlePreviewChange = (index) => {
    if (isTransitioningRef.current) return;
    setActiveIndex(index);
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
    const stage = stageRef.current;
    const nodes = nodeRefs.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!selectedNode || !disc || !overlay || !overlayWash || !overlayPortal || !overlayHole || !overlayGlow || !centerCopy || !stage) {
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

    overlayPortal.style.setProperty("--transition-image", cssImageValue(section.image));

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
      gsap.to(centerCopy, { autoAlpha: 0, y: 12, duration: 0.2, ease: "power1.in" });
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
          <div ref={centerCopyRef} className="editorial-orbit-center">
            <p className="editorial-orbit-copy" aria-live="polite">
              <span>{textPhase === 0 ? centerTextLines[0] : centerTextLines[2]}</span>
              <span>{textPhase === 0 ? centerTextLines[1] : centerTextLines[3]}</span>
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
                      style={{ "--node-image": cssImageValue(orbitSampleImage(index)) }}
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
