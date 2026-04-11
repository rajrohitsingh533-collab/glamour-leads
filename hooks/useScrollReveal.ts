"use client";
import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container and adds the
 * `.revealed` class to every child that has `.reveal`, `.reveal-left`,
 * or `.reveal-right` as it scrolls into view.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
