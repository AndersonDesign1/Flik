"use client";

import { ArrowRight, Box, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

const PLATFORM_FEE_RATE = 0.05;


export default function CartPage() {
  const { items, removeItem, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="mb-2 font-bold text-2xl text-gray-900">
          Your cart is empty
        </h1>
        <p className="mb-8 text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Button asChild className="gap-2">
          <Link href="/categories">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">
          Shopping Cart ({items.length})
        </h1>
        <Button
          className="text-gray-500"
          onClick={clearCart}
          size="sm"
          variant="ghost"
        >
          Clear all
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
              key={item.id}
            >
              {/* Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {item.image ? (
                  <Image
                    alt={item.name}
                    className="object-cover"
                    fill
                    src={item.image}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">
                    <Box className="h-8 w-8" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">by {item.seller}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-gray-900">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Platform fee ({PLATFORM_FEE_RATE * 100}%)</span>
              <span className="text-gray-900">
                ${(totalPrice * PLATFORM_FEE_RATE).toFixed(2)}
              </span>
            </div>
            <div className="border-gray-200 border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  ${(totalPrice * (1 + PLATFORM_FEE_RATE)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <Button asChild className="mt-6 w-full gap-2">
            <Link href="/checkout">
              Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-center text-gray-400 text-xs">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
