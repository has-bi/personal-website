"use client";

import { useEffect, useRef } from "react";

// ascii-rain: columns of ASCII characters falling like a waterfall behind the home hero.
// The glyphs are the ones the hero photo's ASCII figure is made of. Each column is a drop
// with a bright head (ink) and a tail that fades out (faint); characters belong to grid
// cells, so a tail reads as a steady streak rather than flicker. Colours come from the
// theme tokens at the canvas (so a light scope applies) and follow the theme toggle. The animation pauses when the hero is off
// screen or the tab is hidden, and draws one still frame for prefers-reduced-motion.
const GLYPHS = "@#%XxOo0*+=-:.";
const CELL = 16; // px per character cell (width and height)
const FPS = 24;
const TAIL_ALPHA = 0.5; // the whole rain stays quiet behind the text

const glyphAt = (column, row) => GLYPHS[(((column * 73856093) ^ (row * 19349663)) >>> 0) % GLYPHS.length];

function newDrop(height, anywhere) {
  return {
    y: anywhere ? Math.random() * height : -Math.random() * height * 0.6,
    speed: 40 + Math.random() * 110, // px per second
    length: 6 + Math.floor(Math.random() * 18), // cells
  };
}

export default function AsciiRain({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let drops = [];
    let colors = { tail: "#8e88a0", head: "#f3f0ff" };
    let frame = 0;
    let last = 0;
    let onScreen = true;

    const readColors = () => {
      // From the canvas itself, so a [data-surface="light"] scope around it applies.
      const styles = getComputedStyle(canvas);
      colors = {
        tail: styles.getPropertyValue("--color-faint").trim() || colors.tail,
        head: styles.getPropertyValue("--color-ink").trim() || colors.head,
      };
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.font = `13px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      drops = Array.from({ length: Math.ceil(width / CELL) }, () => newDrop(height, true));
    };

    const draw = (seconds) => {
      ctx.clearRect(0, 0, width, height);
      drops.forEach((drop, column) => {
        drop.y += drop.speed * seconds;
        const x = column * CELL + CELL / 2;
        const headRow = Math.floor(drop.y / CELL);
        for (let k = 0; k < drop.length; k += 1) {
          const row = headRow - k;
          const y = row * CELL + CELL / 2;
          if (y < -CELL || y > height + CELL) continue;
          ctx.globalAlpha = k === 0 ? 0.9 : TAIL_ALPHA * (1 - k / drop.length);
          ctx.fillStyle = k === 0 ? colors.head : colors.tail;
          ctx.fillText(glyphAt(column, row), x, y);
        }
        if ((headRow - drop.length) * CELL > height) drops[column] = newDrop(height, false);
      });
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (!onScreen || document.hidden) {
        last = now;
        return;
      }
      if (now - last < 1000 / FPS) return;
      const seconds = Math.min((now - last) / 1000, 0.1);
      last = now;
      draw(seconds);
    };

    readColors();
    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(tick);
    }

    const sizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    viewObserver.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none font-mono ${className}`} />;
}
