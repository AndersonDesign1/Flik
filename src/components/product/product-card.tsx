"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SPRING_PHYSICS } from "@/lib/design-system";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("group relative block h-full", product.span)}
      initial={{ opacity: 0, y: 20 }}
      transition={{ ...SPRING_PHYSICS.default, delay: index * 0.05 }}
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:translate-y-[-4px] hover:shadow-card-hover">
        <Link className="flex h-full flex-col" href={`/p/${product.slug}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <Image
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
              fill
              src={product.image}
            />

            <div className="absolute right-4 bottom-4 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Button
                className="rounded-full shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                }}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1 bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-semibold text-foreground">
                  {product.title}
                </h3>
              </div>
              <span className="rounded-full bg-primary-violet-50 px-2.5 py-0.5 font-semibold text-primary-violet text-sm">
                ${product.price}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
