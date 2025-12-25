export const SPRING_PHYSICS = {
  // Snappy, for small interactions (hover, toggle)
  fast: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1,
  },
  // Default, for layout transitions and modal entrances
  default: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  // Slow, for "grand" entrances or large emphasis
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
