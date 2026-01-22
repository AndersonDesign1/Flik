"use client";

import { ArrowRight, Box, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
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

const PLATFORM_FEE_RATE = 0.05;

export default function CartPage() {
  const { items, removeItem, totalPrice, clearCart } = useCart();
  const { ref: contentRef, isInView: contentInView } = useScrollReveal({
    threshold: 0.2,
  });

  if (items.length === 0) {
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

        <motion.div
          animate="visible"
          className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center text-center"
          initial="hidden"
          variants={createStaggerContainer(STAGGERS.section, 0)}
        >
          <motion.div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
            variants={ENTRANCE_VARIANTS.scaleUp}
          >
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </motion.div>
          <motion.h1
            className="mb-2 font-bold text-2xl text-foreground"
            variants={ENTRANCE_VARIANTS.slideUp}
          >
            Your cart is empty
          </motion.h1>
          <motion.p
            className="mb-8 text-muted-foreground"
            variants={ENTRANCE_VARIANTS.fade}
          >
            Looks like you haven't added anything yet.
          </motion.p>
          <motion.div variants={ENTRANCE_VARIANTS.slideUp}>
            <Button asChild className="gap-2 rounded-full">
              <Link
                className="inline-flex items-center gap-2"
                href="/categories"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }

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

      <motion.div
        animate={contentInView ? "visible" : "hidden"}
        className="mx-auto max-w-4xl"
        initial="hidden"
        ref={contentRef}
        variants={createStaggerContainer(STAGGERS.section, 0)}
      >
        {/* Header */}
        <motion.div
          className="mb-8 flex items-center justify-between"
          variants={ENTRANCE_VARIANTS.slideUp}
        >
          <h1 className="font-bold text-2xl text-foreground">
            Shopping Cart ({items.length})
          </h1>
          <Button
            className="text-muted-foreground"
            onClick={clearCart}
            size="sm"
            variant="ghost"
          >
            Clear all
          </Button>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <motion.div
            className="space-y-4 lg:col-span-2"
            variants={createStaggerContainer(STAGGERS.fast, 0)}
          >
            {items.map((item, index) => (
              <motion.div
                className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:bg-primary-violet-50/50 dark:hover:bg-primary-violet-50/5"
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: DURATION.entrance,
                      ease: EASING.outExpo,
                      delay: index * STAGGERS.fast,
                    },
                  },
                }}
              >
                {/* Image */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {item.image ? (
                    <Image
                      alt={item.name}
                      className="object-cover"
                      fill
                      src={item.image}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <Box className="h-8 w-8" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      by {item.seller}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      className="h-8 w-8 text-muted-foreground hover:text-red-500"
                      onClick={() => removeItem(item.id)}
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="h-fit rounded-2xl border border-border bg-card p-6"
            variants={ENTRANCE_VARIANTS.slideRight}
          >
            <h2 className="mb-4 font-semibold text-foreground">
              Order Summary
            </h2>

            {/* Coupon Code */}
            <div className="mb-4">
              <label
                className="mb-2 block font-medium text-foreground text-sm"
                htmlFor="coupon-code"
              >
                Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-foreground text-sm placeholder:text-muted-foreground focus:border-primary-violet focus:outline-none focus:ring-1 focus:ring-primary-violet disabled:cursor-not-allowed disabled:opacity-50"
                  id="coupon-code"
                  placeholder="Enter code"
                  type="text"
                  disabled
                />
                <Button className="h-9 shrink-0 rounded-lg" variant="outline" disabled>
                  Apply
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Platform fee ({PLATFORM_FEE_RATE * 100}%)
                </span>
                <span className="text-foreground">
                  ${(totalPrice * PLATFORM_FEE_RATE).toFixed(2)}
                </span>
              </div>
              <div className="border-border border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">
                    ${(totalPrice * (1 + PLATFORM_FEE_RATE)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Button asChild className="mt-6 w-full rounded-full">
              <Link
                className="inline-flex items-center justify-center gap-2"
                href="/checkout"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-center text-muted-foreground text-xs">
              Secure checkout powered by Stripe
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
