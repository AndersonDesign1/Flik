"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
} from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  /** Animation variant to use */
  variant?: keyof typeof ENTRANCE_VARIANTS;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Whether to stagger children */
  stagger?: boolean;
  /** Stagger delay between children */
  staggerDelay?: number;
}

/**
 * Scroll-triggered animated section wrapper.
 * Reveals content when it enters the viewport.
 */
export function AnimatedSection({
  children,
  className,
  variant = "slideUp",
  delay = 0,
  stagger = false,
  staggerDelay = 0.05,
  ...props
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollReveal();

  const baseVariant = ENTRANCE_VARIANTS[variant];
  const variants = {
    hidden: baseVariant.hidden,
    visible: {
      ...baseVariant.visible,
      transition: {
        ...baseVariant.visible.transition,
        delay,
      },
    },
  };

  if (stagger) {
    return (
      <motion.section
        animate={isInView ? "visible" : "hidden"}
        className={cn(className)}
        initial="hidden"
        ref={ref}
        variants={createStaggerContainer(staggerDelay, delay)}
        {...props}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
      initial="hidden"
      ref={ref}
      variants={variants}
      {...props}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  /** Animation variant to use */
  variant?: keyof typeof ENTRANCE_VARIANTS;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** HTML element to render as */
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "li";
}

/**
 * Animated item for use inside stagger containers or standalone.
 */
export function AnimatedItem({
  children,
  className,
  variant = "slideUp",
  delay = 0,
  as = "div",
  ...props
}: AnimatedItemProps) {
  const baseVariant = ENTRANCE_VARIANTS[variant];
  const variants = {
    hidden: baseVariant.hidden,
    visible: {
      ...baseVariant.visible,
      transition: {
        ...baseVariant.visible.transition,
        delay,
      },
    },
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component className={cn(className)} variants={variants} {...props}>
      {children}
    </Component>
  );
}

interface CountUpProps {
  /** Target number to count to */
  value: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "+", "%", "M") */
  suffix?: string;
  /** Duration in seconds */
  duration?: number;
  /** Decimal places */
  decimals?: number;
}

/**
 * Animated counting number component.
 * Uses spring animation for smooth counting effect.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  decimals = 0,
}: CountUpProps) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.5 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out quart for smooth deceleration
      const eased = 1 - (1 - progress) ** 4;
      const current = startValue + (value - startValue) * eased;

      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.floor(current).toString()
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration, decimals]);

  return (
    <motion.span
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      initial={{ opacity: 0 }}
      ref={ref}
      transition={{ duration: DURATION.slow, ease: EASING.outQuart }}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
