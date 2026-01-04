export const DURATION = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.4,
} as const;

export const EASING = {
  default: "easeOut",
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.4, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
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
} as const;

export const STAGGERS = {
  fast: 0.05,
  default: 0.1,
  slow: 0.2,
};

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
