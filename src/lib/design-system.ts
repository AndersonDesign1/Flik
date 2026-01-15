export const DURATION = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.4,
  entrance: 0.5,
  hero: 0.6,
} as const;

export const EASING = {
  // Standard easings
  default: "easeOut",
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.65, 0, 0.35, 1],

  // Exponential easings (more natural, like real physics)
  outQuart: [0.25, 1, 0.5, 1], // Smooth, refined - recommended default
  outQuint: [0.22, 1, 0.36, 1], // Slightly more dramatic
  outExpo: [0.16, 1, 0.3, 1], // Snappy, confident

  // Legacy spring (use sparingly)
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.4, 0, 0.2, 1],
} as const;

export const SPRING_PHYSICS = {
  fast: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1,
  },
  default: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  slow: {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  gentle: {
    type: "spring",
    stiffness: 120,
    damping: 14,
    mass: 0.8,
  },
} as const;

export const STAGGERS = {
  fast: 0.03,
  default: 0.05,
  slow: 0.08,
  section: 0.1,
};

// Motion React entrance variants
export const ENTRANCE_VARIANTS = {
  // Slide up and fade in (most common)
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.entrance, ease: EASING.outExpo },
    },
  },

  // Slide down (for headers, badges)
  slideDown: {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASING.outQuart },
    },
  },

  // Fade only (subtle, for text)
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION.slow, ease: EASING.outQuart },
    },
  },

  // Scale up (for images, cards)
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: DURATION.entrance, ease: EASING.outExpo },
    },
  },

  // Slide from left
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION.entrance, ease: EASING.outExpo },
    },
  },

  // Slide from right
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION.entrance, ease: EASING.outExpo },
    },
  },
} as const;

// Container variants for staggered children
export const STAGGER_CONTAINER = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGERS.default,
      delayChildren: 0,
    },
  },
} as const;

// Create stagger container with custom timing
export function createStaggerContainer(
  staggerDelay = STAGGERS.default,
  initialDelay = 0
) {
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

// Legacy exports for backwards compatibility
export const TRANSITIONS = {
  cardHover: {
    duration: DURATION.normal,
    ease: EASING.out,
  },
  buttonPress: {
    duration: DURATION.fast,
    ease: EASING.default,
  },
  entrance: {
    duration: DURATION.slow,
    ease: EASING.spring,
  },
  fade: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
} as const;
