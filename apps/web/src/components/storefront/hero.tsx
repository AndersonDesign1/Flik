"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

// Stats data
const STATS = [
  { value: "$50M+", label: "Paid to creators" },
  { value: "100K+", label: "Creators" },
  { value: "2M+", label: "Products sold" },
  { value: "99.9%", label: "Uptime" },
];

// Company logos
const COMPANIES = ["OpenAI", "Linear", "Figma", "Vercel", "Notion", "Stripe"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, isInView: statsInView } = useScrollReveal({
    threshold: 0.3,
  });
  const { ref: imageRef, isInView: imageInView } = useScrollReveal({
    threshold: 0.2,
  });
  const { ref: logosRef, isInView: logosInView } = useScrollReveal({
    threshold: 0.5,
  });

  // Parallax effect for dashboard image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      className="relative w-full overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24"
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/50 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: DURATION.hero, ease: EASING.outExpo }}
        />
      </div>

      {/* Main hero content */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        {/* Badge */}
        <motion.div
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm"
          initial="hidden"
          transition={{ delay: 0.1 }}
          variants={ENTRANCE_VARIANTS.slideDown}
        >
          <span className="rounded-full bg-primary-violet px-2 py-0.5 font-medium text-white text-xs">
            New
          </span>
          <span className="text-muted-foreground">
            Instant payouts now available
          </span>
          <ArrowRight className="size-3 text-muted-foreground" />
        </motion.div>

        {/* Headline + Subline - Static for LCP */}
        <div className="flex w-full flex-col gap-6">
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
            Sell your digital products in a{" "}
            <span className="text-primary-violet">Flik.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl">
            A simplified platform designed to help you launch your store before
            your coffee gets cold.
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          animate="visible"
          className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          initial="hidden"
          transition={{ delay: 0.2 }}
          variants={ENTRANCE_VARIANTS.slideUp}
        >
          <Button
            asChild
            className="h-12 rounded-full px-8 font-medium"
            size="lg"
          >
            <Link href="/signup">Launch your store</Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full px-8 font-medium"
            size="lg"
            variant="outline"
          >
            <Link href="/how-it-works">How Flik works</Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          animate={statsInView ? "visible" : "hidden"}
          className="grid w-full grid-cols-2 gap-x-6 gap-y-6 border-border border-y py-8 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-12"
          initial="hidden"
          ref={statsRef}
          variants={createStaggerContainer(STAGGERS.fast, 0)}
        >
          {STATS.map((stat) => (
            <motion.div
              className="flex flex-col gap-1 text-center"
              key={stat.label}
              variants={ENTRANCE_VARIANTS.slideUp}
            >
              <p className="font-bold text-3xl text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dashboard image and logos */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 pt-16">
        {/* Dashboard screenshot with parallax */}
        <motion.div
          animate={
            imageInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.98 }
          }
          className="relative"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          ref={imageRef}
          style={{ y: imageY }}
          transition={{
            duration: DURATION.hero,
            ease: EASING.outExpo,
          }}
        >
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary-violet/10">
            <Image
              alt="Dashboard screenshot showing analytics and revenue overview"
              className="w-full"
              height={600}
              priority
              src="/sample.webp"
              width={1200}
            />
          </div>
          <div className="absolute -right-8 -bottom-8 -left-8 -z-10 h-32 rounded-3xl bg-gradient-to-r from-primary-violet-50 via-secondary-magenta-50 to-primary-violet-50 blur-2xl" />
        </motion.div>

        {/* Trusted by logos */}
        <motion.div
          animate={logosInView ? "visible" : "hidden"}
          className="flex w-full flex-col items-center gap-8 text-center"
          initial="hidden"
          ref={logosRef}
          variants={createStaggerContainer(STAGGERS.fast, 0)}
        >
          <motion.p
            className="font-medium text-muted-foreground text-sm uppercase tracking-widest"
            variants={ENTRANCE_VARIANTS.fade}
          >
            Trusted by creators at
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {COMPANIES.map((company, index) => (
              <motion.span
                className="font-semibold text-muted-foreground text-xl opacity-60"
                key={company}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 0.6,
                    y: 0,
                    transition: {
                      duration: DURATION.slow,
                      ease: EASING.outQuart,
                      delay: index * STAGGERS.fast,
                    },
                  },
                }}
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
