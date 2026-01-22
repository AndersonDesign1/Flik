"use client";

import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import CATEGORY_INFO_DATA from "@/data/categories.json";
import PRODUCTS_DATA from "@/data/category-products.json";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

const CATEGORY_INFO = CATEGORY_INFO_DATA as Record<
  string,
  { name: string; icon: string }
>;
const PRODUCTS = PRODUCTS_DATA;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { addItem, isInCart } = useCart();
  const { ref: headerRef, isInView: headerInView } = useScrollReveal({
    threshold: 0.3,
  });
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({
    threshold: 0.1,
  });

  // Get category info
  const resolvedParams = use(params);
  const category = CATEGORY_INFO[resolvedParams.slug] || {
    name: "Category",
    icon: "📦",
  };

  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/30 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: DURATION.hero, ease: EASING.outExpo }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Back Link */}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -10 }}
          transition={{ duration: DURATION.slow, ease: EASING.outQuart }}
        >
          <Link
            className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/categories"
          >
            <ArrowLeft className="h-4 w-4" />
            All categories
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          animate={headerInView ? "visible" : "hidden"}
          className="mb-8"
          initial="hidden"
          ref={headerRef}
          variants={createStaggerContainer(STAGGERS.section, 0)}
        >
          <motion.div
            aria-hidden="true"
            className="mb-2 text-4xl"
            variants={ENTRANCE_VARIANTS.scaleUp}
          >
            {category.icon}
          </motion.div>
          <motion.h1
            className="mb-2 font-bold text-3xl text-foreground tracking-tight"
            variants={ENTRANCE_VARIANTS.slideUp}
          >
            {category.name}
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            variants={ENTRANCE_VARIANTS.fade}
          >
            {PRODUCTS.length} products
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          animate={gridInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          ref={gridRef}
          variants={createStaggerContainer(STAGGERS.default, 0)}
        >
          {PRODUCTS.map((product, index) => (
            <motion.div
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:bg-primary-violet-50 dark:hover:bg-primary-violet-50/10"
              key={product.id}
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
              {/* Image */}
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                    <span aria-hidden="true" className="text-5xl">
                      {category.icon}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground text-xs">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    ({product.sales.toLocaleString()} sales)
                  </span>
                </div>

                <Link href={`/products/${product.id}`}>
                  <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary-violet">
                    {product.name}
                  </h3>
                </Link>
                <p className="mb-3 text-muted-foreground text-sm">
                  by {product.seller}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-foreground text-lg">
                      ${product.price}
                    </span>
                    <span className="text-muted-foreground text-sm line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  {isInCart(product.id) ? (
                    <Button
                      asChild
                      className="rounded-full"
                      size="sm"
                      variant="outline"
                    >
                      <Link href="/cart">In Cart</Link>
                    </Button>
                  ) : (
                    <Button
                      className="gap-1 rounded-full"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          seller: product.seller,
                        })
                      }
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
