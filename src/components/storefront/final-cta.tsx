"use client";

import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

const benefits = [
  "No monthly fees",
  "5% transaction fee only",
  "Instant payouts",
  "Free forever starter plan",
];

export function FinalCTA() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-16"
          initial="hidden"
          ref={ref}
          variants={{
            hidden: { opacity: 0, scale: 0.98, y: 20 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: DURATION.hero,
                ease: EASING.outExpo,
              },
            },
          }}
        >
          {/* Animated background blurs */}
          <motion.div
            animate={
              isInView
                ? { opacity: 1, scale: 1, x: "50%", y: "-50%" }
                : { opacity: 0, scale: 0.8, x: "40%", y: "-40%" }
            }
            className="pointer-events-none absolute top-0 right-0 size-64 rounded-full bg-primary-violet/10 blur-3xl"
            initial={{ opacity: 0, scale: 0.8, x: "40%", y: "-40%" }}
            transition={{ duration: 0.8, ease: EASING.outQuart }}
          />
          <motion.div
            animate={
              isInView
                ? { opacity: 1, scale: 1, x: "-33%", y: "33%" }
                : { opacity: 0, scale: 0.8, x: "-25%", y: "25%" }
            }
            className="pointer-events-none absolute bottom-0 left-0 size-48 rounded-full bg-secondary-magenta/10 blur-3xl"
            initial={{ opacity: 0, scale: 0.8, x: "-25%", y: "25%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASING.outQuart }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8 text-center"
            variants={createStaggerContainer(STAGGERS.section, 0.1)}
          >
            <motion.span
              className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm"
              variants={ENTRANCE_VARIANTS.slideDown}
            >
              Join 100,000+ creators
            </motion.span>

            <motion.div
              className="flex flex-col gap-4"
              variants={ENTRANCE_VARIANTS.slideUp}
            >
              <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
                Ready to start selling?
              </h2>
              <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                Launch your digital product business today. No technical skills
                required, no upfront costs, no complicated setup.
              </p>
            </motion.div>

            {/* Benefits grid */}
            <motion.div
              className="grid w-full max-w-lg grid-cols-2 gap-3"
              variants={createStaggerContainer(STAGGERS.fast, 0)}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-3"
                  key={benefit}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: DURATION.slow,
                        ease: EASING.outQuart,
                        delay: index * STAGGERS.fast,
                      },
                    },
                  }}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-accent-teal" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              variants={ENTRANCE_VARIANTS.slideUp}
            >
              <Button
                asChild
                className="h-12 rounded-full px-8 font-medium"
                size="lg"
              >
                <Link className="inline-flex items-center gap-2" href="/signup">
                  <Zap className="size-4" />
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full px-8 font-medium"
                size="lg"
                variant="outline"
              >
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              variants={ENTRANCE_VARIANTS.fade}
            >
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="size-4" />
                No credit card required
              </p>
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="size-4" />
                Setup in under 5 minutes
              </p>
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="size-4" />
                Cancel anytime
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
