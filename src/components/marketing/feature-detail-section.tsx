"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ENTRANCE_VARIANTS } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface FeatureDetailSectionProps {
  title: string;
  description: string;
  imagePath?: string;
  imageAlt?: string;
  reversed?: boolean;
  features?: string[];
  category?: string;
}

export function FeatureDetailSection({
  title,
  description,
  imagePath,
  imageAlt,
  reversed = false,
  features = [],
  category,
}: FeatureDetailSectionProps) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8 lg:py-24" ref={ref}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20",
          reversed && "lg:flex-row-reverse"
        )}
      >
        {/* Content Side */}
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-1 flex-col gap-6"
          initial="hidden"
          variants={
            reversed
              ? ENTRANCE_VARIANTS.slideRight
              : ENTRANCE_VARIANTS.slideLeft
          }
        >
          {category && (
            <span className="font-semibold text-primary-violet text-sm uppercase tracking-wider">
              {category}
            </span>
          )}
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          {features.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature) => (
                <li className="flex items-center gap-3" key={feature}>
                  <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-violet/10 text-primary-violet">
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Visual Side */}
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="relative flex-1"
          initial="hidden"
          variants={
            reversed
              ? ENTRANCE_VARIANTS.slideLeft
              : ENTRANCE_VARIANTS.slideRight
          }
        >
          {imagePath ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <Image
                alt={imageAlt || title}
                className="w-full transition-transform duration-500 hover:scale-105"
                height={400}
                src={imagePath}
                width={600}
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border border-dashed bg-muted/50">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <svg
                  aria-hidden="true"
                  className="size-12 opacity-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                  />
                </svg>
                <span className="font-medium text-sm italic">
                  Visualization Coming Soon
                </span>
              </div>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute -top-8 -right-8 -z-10 size-32 rounded-full bg-primary-violet/5 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 -z-10 size-32 rounded-full bg-secondary-magenta/5 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
