"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SPRING_PHYSICS } from "@/lib/design-system";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-40">
      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-border/40 bg-muted/50 px-3 py-1 font-medium text-muted-foreground text-xs backdrop-blur-md">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            v2.0 is now live
          </div>

          <h1 className="bg-linear-to-b from-foreground to-foreground/40 bg-clip-text font-extrabold text-6xl text-transparent tracking-tighter sm:text-7xl md:text-8xl">
            The new standard for <br />
            <span className="text-foreground">Digital Commerce.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A complete platform for selling digital products. Built for creators
            who demand the best design, analytics, and performance.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button className="h-12 rounded-full px-8 text-base" size="lg">
              Start Selling <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="h-12 rounded-full px-8 text-base"
              size="lg"
              variant="outline"
            >
              View Demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Dashboard Mockup Container with Perspective */}
      <div className="perspective-[2000px] mt-20 w-full max-w-6xl px-6">
        <motion.div
          animate={{ opacity: 1, rotateX: 25, y: 0 }}
          className="relative mx-auto rounded-xl border border-border/40 bg-background/50 p-2 shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, rotateX: 20, y: 100 }}
          style={{ transformStyle: "preserve-3d" }}
          transition={{ duration: 1, delay: 0.2, ...SPRING_PHYSICS.slow }}
        >
          {/* Mockup Window */}
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-xs">
            <Image
              alt="Platform Dashboard"
              className="h-auto w-full object-cover"
              height={1600}
              priority
              src="/images/dashboard.png"
              width={2400}
            />
          </div>

          {/* Reflection Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 rounded-xl bg-linear-to-tr from-transparent via-white/5 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
