"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

interface UseScrollRevealOptions {
  /** Threshold for triggering reveal (0-1) */
  threshold?: number;
  /** Only trigger once */
  once?: boolean;
}

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses Intersection Observer via Motion React's useInView.
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.2, once = true } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  return { ref, isInView };
}
