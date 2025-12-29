"use client";

import { Plus } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { SPRING_PHYSICS } from "@/lib/design-system";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]), {
    damping: 15,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]), {
    damping: 15,
    stiffness: 200,
  });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position from center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("group relative block h-full", product.span)}
      initial={{ opacity: 0, y: 20 }}
      style={{ perspective: 1000 }}
      transition={{ ...SPRING_PHYSICS.default, delay: index * 0.05 }}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:shadow-2xl"
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <Link className="flex h-full flex-col" href={`/p/${product.slug}`}>
          {/* Glossy Reflection Overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
            style={{
              background: useMotionTemplate`linear-gradient(${useTransform(x, [-0.5, 0.5], ["-45deg", "45deg"])}, transparent, rgba(255,255,255,0.1) 50%, transparent)`,
              opacity: useTransform(x, (v) => Math.abs(v * 2)), // Only show when tilting
            }}
          />

          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <Image
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
              fill
              src={product.image}
              // Perspective effect on image too? Maybe simpler to just scale.
              style={{ transform: "translateZ(0)" }}
            />

            {/* Quick Add Overlay */}
            <div className="absolute right-4 bottom-4 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Button
                className="rounded-full shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement add to cart functionality
                }}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1 bg-card/80 p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div
                className="transition-transform duration-300"
                style={{ transform: "translateZ(20px)" }}
              >
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-semibold text-foreground">
                  {product.title}
                </h3>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground text-xs">
                ${product.price}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
