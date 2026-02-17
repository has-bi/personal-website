"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DEFAULT_MODAL_OFFSET = { x: 16, y: 18 };

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function useCursorModalPosition(activeId) {
  const rafRef = useRef(0);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0, ready: false });

  useEffect(() => {
    if (!activeId) return undefined;

    const onMove = (event) => {
      cursorRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        setPos({ x: cursorRef.current.x, y: cursorRef.current.y, ready: true });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [activeId]);

  return pos;
}

function ExternalImg({ src, alt, width, height, className, fallback = null }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return fallback;

  return (
    // Use <img> to avoid Next Image remote host allowlist for arbitrary URLs.
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default function AfterHoursGrid({ books = [], lolImageSrc = "" }) {
  const [activeId, setActiveId] = useState("");
  const [anchorRect, setAnchorRect] = useState(null);
  const cursor = useCursorModalPosition(activeId);

  const items = useMemo(
    () => [
      {
        id: "books",
        title: "Books",
        eyebrow: "Reading",
        blurb: "Strategy, product, and decision-making.",
        modal: (
          <div className="cursor-modal-content">
            <p className="cursor-modal-title">Reading queue</p>
            {books.length === 0 ? (
              <p className="cursor-modal-copy">No books added yet.</p>
            ) : (
              <div className="cursor-modal-books" aria-label="Books">
                {books.map((book) => (
                  <div className="cursor-modal-book" key={book.title}>
                    <div className="cursor-modal-cover">
                      <ExternalImg
                        src={book.cover}
                        alt={`${book.title} cover`}
                        width={74}
                        height={108}
                        fallback={
                          <div className="cursor-modal-placeholder">
                            No cover
                          </div>
                        }
                      />
                    </div>
                    <p className="cursor-modal-copy">
                      <span>{book.status}:</span> {book.title} by {book.author}.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "lol",
        title: "League of Legends",
        eyebrow: "Games",
        blurb: "Competitive mindset, pattern recognition.",
        modal: (
          <div className="cursor-modal-content">
            <p className="cursor-modal-title">League of Legends</p>
            <p className="cursor-modal-copy">
              I use competitive games to sharpen decision speed, adapt under
              uncertainty, and stay calm under pressure.
            </p>
            <div className="cursor-modal-media" aria-label="League image">
              {lolImageSrc ? (
                <ExternalImg
                  src={lolImageSrc}
                  alt="League of Legends"
                  width={320}
                  height={180}
                  fallback={
                    <div className="cursor-modal-placeholder">
                      Image unavailable
                    </div>
                  }
                />
              ) : (
                <div className="cursor-modal-placeholder">
                  Image placeholder (send me the image next)
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        id: "design",
        title: "Design",
        eyebrow: "Taste",
        blurb: "Layouts, typography, and system thinking.",
        modal: (
          <div className="cursor-modal-content">
            <p className="cursor-modal-title">Design</p>
            <p className="cursor-modal-copy">
              I care about information hierarchy, whitespace, and interaction
              design. Clean UI is faster to understand and easier to trust.
            </p>
            <ul className="cursor-modal-list" aria-label="Design focus">
              <li>Hierarchy-first layouts</li>
              <li>Small, deliberate motion</li>
              <li>Systems over one-offs</li>
            </ul>
          </div>
        ),
      },
      {
        id: "content",
        title: "Content creation",
        eyebrow: "Output",
        blurb: "Explaining ideas clearly, shipping consistently.",
        modal: (
          <div className="cursor-modal-content">
            <p className="cursor-modal-title">Content creation</p>
            <p className="cursor-modal-copy">
              I like turning messy work into clear notes, demos, and reusable
              playbooks.
            </p>
            <ul className="cursor-modal-list" aria-label="Content formats">
              <li>Short explainers</li>
              <li>Build-in-public notes</li>
              <li>Case studies</li>
            </ul>
          </div>
        ),
      },
    ],
    [books, lolImageSrc]
  );

  useEffect(() => {
    if (!activeId) return;
    const el = document.querySelector(`[data-after-hours="${activeId}"]`);
    if (!el) return;
    setAnchorRect(el.getBoundingClientRect());
  }, [activeId]);

  const activeItem = items.find((item) => item.id === activeId);
  const modal = activeItem?.modal ?? null;

  let modalStyle = { opacity: 0 };
  if (activeId) {
    const modalW = 360;
    const modalH = 260;
    const offset = DEFAULT_MODAL_OFFSET;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    const baseX = cursor.ready ? cursor.x : anchorRect?.right ?? 0;
    const baseY = cursor.ready ? cursor.y : anchorRect?.top ?? 0;

    const x = clamp(baseX + offset.x, 12, vw - modalW - 12);
    const y = clamp(baseY + offset.y, 12, vh - modalH - 12);

    modalStyle = {
      left: `${x}px`,
      top: `${y}px`,
      opacity: 1,
    };
  }

  return (
    <div className="after-hours-wrap">
      <div className="after-hours-grid" role="list">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const tooltipId = `after-hours-tip-${item.id}`;

          return (
            <button
              key={item.id}
              type="button"
              className={`after-hours-card${isActive ? " is-active" : ""}`}
              data-after-hours={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId("")}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId("")}
              aria-describedby={isActive ? tooltipId : undefined}
              role="listitem"
            >
              <p className="after-hours-eyebrow">{item.eyebrow}</p>
              <h3 className="after-hours-title">{item.title}</h3>
              <p className="after-hours-blurb">{item.blurb}</p>
              <p className="after-hours-cta">Hover for details</p>
            </button>
          );
        })}
      </div>

      {activeId &&
        modal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="cursor-modal"
            style={modalStyle}
            role="tooltip"
            id={`after-hours-tip-${activeId}`}
          >
            {modal}
          </div>,
          document.body
        )}
    </div>
  );
}
