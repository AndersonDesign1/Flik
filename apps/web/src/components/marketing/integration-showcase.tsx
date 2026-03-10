"use client";

import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ENTRANCE_VARIANTS } from "@/lib/design-system";

const INTEGRATIONS = [
  { id: "stripe", name: "Stripe" },
  { id: "paypal", name: "PayPal" },
  { id: "apple-pay", name: "Apple Pay" },
  { id: "google-pay", name: "Google Pay" },
  { id: "visa", name: "Visa" },
  { id: "mastercard", name: "Mastercard" },
  { id: "wordpress", name: "WordPress" },
  { id: "webflow", name: "Webflow" },
  { id: "shopify", name: "Shopify" },
  { id: "framer", name: "Framer" },
  { id: "wix", name: "Wix" },
  { id: "squarespace", name: "Squarespace" },
];

export function IntegrationShowcase() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });

  // Triple the items to ensure seamless loop
  const marqueeItems = [...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section className="w-full bg-muted/30 py-20 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
          initial="hidden"
          variants={ENTRANCE_VARIANTS.slideUp}
        >
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Works with your favorite tools
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect Flik to the tools you already use and love.
          </p>
        </motion.div>

        {/* Integration Marquee */}
        <div className="relative overflow-hidden before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-muted/30 before:to-transparent after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-muted/30 after:to-transparent">
          <motion.div
            animate={{ x: ["0%", "-33.33%"] }}
            className="flex w-fit items-center gap-12 py-4"
            transition={{
              duration: 40,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {marqueeItems.map((item, idx) => (
              <div
                className="flex items-center justify-center rounded-xl border border-border bg-card px-8 py-4 font-bold text-muted-foreground text-xl shadow-sm"
                key={`${item.id}-${idx}`}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
