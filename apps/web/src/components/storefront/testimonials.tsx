"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

const TESTIMONIALS = [
  {
    quote:
      "This platform completely transformed my business. The intuitive design and powerful features made it an instant favorite.",
    author: "Michael Lee",
    role: "Digital Course Creator",
    rating: 5,
    avatar: "ML",
  },
  {
    quote:
      "From day one, the experience felt premium. The dashboard is beautiful, and payouts are incredibly fast.",
    author: "Sarah Chen",
    role: "UI Designer",
    rating: 5,
    avatar: "SC",
  },
  {
    quote:
      "I switched from Gumroad and haven't looked back. Better analytics, lower fees, and a way better customer experience.",
    author: "James Wilson",
    role: "Template Creator",
    rating: 5,
    avatar: "JW",
  },
];

export function Testimonials() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: cardsRef, isInView: cardsInView } = useScrollReveal({
    threshold: 0.15,
  });

  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        {/* Header */}
        <motion.div
          animate={headerInView ? "visible" : "hidden"}
          className="flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:mx-auto"
          initial="hidden"
          ref={headerRef}
          variants={createStaggerContainer(STAGGERS.section, 0)}
        >
          <motion.span
            className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm"
            variants={ENTRANCE_VARIANTS.slideDown}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl"
            variants={ENTRANCE_VARIANTS.slideUp}
          >
            Loved by creators worldwide
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={ENTRANCE_VARIANTS.fade}
          >
            Join thousands of creators who are already selling with Flik.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          animate={cardsInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          ref={cardsRef}
          variants={createStaggerContainer(STAGGERS.default, 0)}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:bg-primary-violet-50"
              key={testimonial.author}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: DURATION.entrance,
                    ease: EASING.outExpo,
                    delay: index * STAGGERS.slow,
                  },
                },
              }}
            >
              {/* Stars */}
              <motion.div
                className="flex gap-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { delay: 0.2 + index * STAGGERS.slow },
                  },
                }}
              >
                {testimonial.rating > 0
                  ? Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star
                        className="size-4 fill-amber-400 text-amber-400"
                        key={`${testimonial.author}-star-${i}`}
                      />
                    ))
                  : null}
              </motion.div>

              <p className="text-foreground/80 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                  {testimonial.avatar}
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-foreground text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
