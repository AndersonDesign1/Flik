"use client";

import { ArrowLeft, Check, Download, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  DURATION,
  EASING,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

// Mock product data
const PRODUCT = {
  id: "1",
  name: "Ultimate Design System",
  description:
    "A comprehensive design system with 500+ components, 50+ page templates, and full Figma source files. Perfect for building modern web applications quickly.",
  price: 49,
  originalPrice: 99,
  rating: 4.9,
  reviews: 127,
  sales: 1234,
  image: "/product-preview.png",
  seller: {
    name: "Design Studio",
    username: "designstudio",
    avatar: "DS",
  },
  features: [
    "500+ React components",
    "50+ page templates",
    "Figma source files",
    "TypeScript support",
    "Tailwind CSS",
    "Lifetime updates",
  ],
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params: _params }: ProductPageProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(PRODUCT.id);
  const { ref: contentRef, isInView: contentInView } = useScrollReveal({
    threshold: 0.2,
  });

  const handleAddToCart = () => {
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      seller: PRODUCT.seller.name,
    });
  };

  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/40 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: DURATION.hero, ease: EASING.outExpo }}
        />
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/4 right-0 h-[300px] w-[400px] translate-x-1/2 rounded-full bg-gradient-to-b from-secondary-magenta-100/20 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: DURATION.hero,
            ease: EASING.outExpo,
            delay: 0.1,
          }}
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
            href="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: DURATION.entrance, ease: EASING.outExpo }}
          >
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary-violet/5">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <span className="text-6xl">🎨</span>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            animate={contentInView ? "visible" : "hidden"}
            className="space-y-6"
            initial="hidden"
            ref={contentRef}
            variants={createStaggerContainer(STAGGERS.section, 0)}
          >
            <motion.div variants={ENTRANCE_VARIANTS.slideUp}>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground text-sm">
                    {PRODUCT.rating}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  ({PRODUCT.reviews} reviews)
                </span>
                <span className="text-muted-foreground text-sm">
                  • {PRODUCT.sales.toLocaleString()} sales
                </span>
              </div>
              <h1 className="font-bold text-3xl text-foreground tracking-tight">
                {PRODUCT.name}
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              variants={ENTRANCE_VARIANTS.fade}
            >
              {PRODUCT.description}
            </motion.p>

            {/* Seller */}
            <motion.div variants={ENTRANCE_VARIANTS.slideUp}>
              <Link
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:bg-primary-violet-50 dark:hover:bg-primary-violet-50/10"
                href={`/store/${PRODUCT.seller.username}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-violet font-semibold text-sm text-white">
                  {PRODUCT.seller.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {PRODUCT.seller.name}
                  </p>
                  <p className="text-muted-foreground text-xs">View store →</p>
                </div>
              </Link>
            </motion.div>

            {/* Price */}
            <motion.div
              className="flex items-baseline gap-3"
              variants={ENTRANCE_VARIANTS.slideUp}
            >
              <span className="font-bold text-4xl text-foreground">
                ${PRODUCT.price}
              </span>
              <span className="text-muted-foreground text-xl line-through">
                ${PRODUCT.originalPrice}
              </span>
              <span className="rounded-full bg-accent-teal/10 px-2 py-0.5 font-medium text-accent-teal text-sm">
                {Math.round(
                  ((PRODUCT.originalPrice - PRODUCT.price) /
                    PRODUCT.originalPrice) *
                    100
                )}
                % off
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex gap-3"
              variants={ENTRANCE_VARIANTS.slideUp}
            >
              {inCart ? (
                <Button
                  asChild
                  className="h-12 flex-1 gap-2 rounded-full bg-accent-teal text-white hover:bg-accent-teal/90"
                >
                  <Link href="/cart">
                    <Check className="h-4 w-4" />
                    In Cart - View Cart
                  </Link>
                </Button>
              ) : (
                <Button
                  className="h-12 flex-1 gap-2 rounded-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              )}
            </motion.div>

            {/* Features */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:bg-primary-violet-50/50 dark:hover:bg-primary-violet-50/5"
              variants={ENTRANCE_VARIANTS.scaleUp}
            >
              <h3 className="mb-4 font-semibold text-foreground">
                What's included
              </h3>
              <ul className="space-y-3">
                {PRODUCT.features.map((feature) => (
                  <li
                    className="flex items-center gap-3 text-muted-foreground"
                    key={feature}
                  >
                    <Download className="h-4 w-4 text-primary-violet" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
