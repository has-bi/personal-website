"use client";
import React from "react";
import { useEffect } from "react";

export default function useCardStackEffect() {
  useEffect(() => {
    const cardWrappers = document.querySelectorAll(".card-wrapper");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "-10px 0px",
      }
    );

    cardWrappers.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cardWrappers.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);
}
