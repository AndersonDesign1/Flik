"use client";

import {
  CreditCard,
  Download,
  Globe,
  LayoutDashboard,
  LineChart,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

const FEATURES = [
  {
    icon: Zap,
    title: "Flik-Speed Payouts",
    description:
      "Get paid within 24 hours. No more waiting weeks for your money.",
  },
  {
    icon: LayoutDashboard,
    title: "Beautiful Dashboard",
    description:
      "Track sales, customers, and revenue with a dashboard designed for creators.",
  },
  {
    icon: Globe,
    title: "Sell Globally",
    description:
      "Accept payments from 195+ countries with automatic currency conversion.",
  },
  {
    icon: Download,
    title: "Digital Delivery",
    description:
      "Secure file hosting and instant delivery for all your digital products.",
  },
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description:
      "Understand your audience with detailed insights on traffic, conversions, and revenue.",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description:
      "Built-in fraud detection and chargeback protection for peace of mind.",
  },
];

export function FeatureGrid() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({
    threshold: 0.1,
  });

  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <motion.div
          animate={headerInView ? "visible" : "hidden"}
          className="mb-16 w-full max-w-2xl text-center sm:mx-auto"
          initial="hidden"
          ref={headerRef}
          variants={createStaggerContainer(STAGGERS.section, 0)}
        >
          <motion.span
            className="mb-4 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-medium text-gray-600 text-sm"
            variants={ENTRANCE_VARIANTS.slideDown}
          >
            Features
          </motion.span>
          <motion.h2
            className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl dark:text-foreground"
            variants={ENTRANCE_VARIANTS.slideUp}
          >
            Everything you need to sell
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 text-lg dark:text-muted-foreground"
            variants={ENTRANCE_VARIANTS.fade}
          >
            From checkout to delivery, we handle the technical stuff so you can
            focus on creating.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          animate={gridInView ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          ref={gridRef}
          variants={createStaggerContainer(STAGGERS.default, 0)}
        >
          {/* Large featured card */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white md:col-span-2 dark:border-gray-700"
            variants={ENTRANCE_VARIANTS.scaleUp}
          >
            <div className="relative z-10">
              <div className="mb-4 inline-flex rounded-xl bg-white/10 p-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-2xl">
                AI-Powered Insights
              </h3>
              <p className="max-w-md text-gray-300">
                Get personalized recommendations to grow your business faster.
                Our AI analyzes your data and suggests the best strategies.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Small card */}
          <motion.div
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:bg-primary-violet-50 dark:border-gray-700 dark:bg-card dark:hover:bg-primary-violet-50"
            variants={ENTRANCE_VARIANTS.slideUp}
          >
            <div className="mb-4 inline-flex rounded-xl bg-gray-100 p-3 transition-colors group-hover:bg-primary-violet-100 dark:bg-muted dark:group-hover:bg-primary-violet-100">
              <CreditCard className="size-5 text-gray-700 transition-colors group-hover:text-primary-violet dark:text-muted-foreground dark:group-hover:text-primary-violet" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-foreground">
              Multiple Payment Methods
            </h3>
            <p className="text-gray-600 text-sm dark:text-muted-foreground">
              Accept cards, Apple Pay, Google Pay, and regional payment methods.
            </p>
          </motion.div>

          {/* Regular feature cards */}
          {FEATURES.map((feature, index) => (
            <motion.div
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:bg-primary-violet-50 dark:border-gray-700 dark:bg-card dark:hover:bg-primary-violet-50"
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: DURATION.entrance,
                    ease: EASING.outExpo,
                    delay: index * STAGGERS.fast,
                  },
                },
              }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-gray-100 p-3 transition-colors group-hover:bg-primary-violet-100 dark:bg-muted dark:group-hover:bg-primary-violet-100">
                <feature.icon className="size-5 text-gray-700 transition-colors group-hover:text-primary-violet dark:text-muted-foreground dark:group-hover:text-primary-violet" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-foreground">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm dark:text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
