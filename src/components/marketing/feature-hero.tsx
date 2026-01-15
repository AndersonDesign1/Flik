"use client";

import { motion } from "motion/react";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

interface FeatureHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function FeatureHero({ title, subtitle, badge }: FeatureHeroProps) {
  return (
    <section className="relative w-full overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/30 to-transparent blur-3xl dark:from-primary-violet-900/20"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: DURATION.hero, ease: EASING.outExpo }}
        />
      </div>

      <motion.div
        animate="visible"
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center"
        initial="hidden"
        variants={createStaggerContainer(STAGGERS.section, 0.1)}
      >
        {badge && (
          <motion.span
            className="inline-block rounded-full border border-primary-violet/10 bg-primary-violet/5 px-4 py-1.5 font-medium text-primary-violet text-sm backdrop-blur-sm"
            variants={ENTRANCE_VARIANTS.slideDown}
          >
            {badge}
          </motion.span>
        )}

        <motion.div
          className="flex w-full flex-col gap-6"
          variants={ENTRANCE_VARIANTS.slideUp}
        >
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-7xl">
            {title}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl">
            {subtitle}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
