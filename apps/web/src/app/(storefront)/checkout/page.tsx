"use client";

import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/cart-context";

const PLATFORM_FEE_RATE = 0.05;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    timerRef.current = setTimeout(() => {
      clearCart();
      router.push("/order/success");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="mb-2 font-bold text-2xl text-gray-900">
          Nothing to checkout
        </h1>
        <p className="mb-8 text-gray-500">Add items to your cart first.</p>
        <Button asChild>
          <Link href="/categories">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Back Link */}
      <Link
        className="mb-8 inline-flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
        href="/cart"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Checkout Form */}
        <div>
          <h1 className="mb-6 font-bold text-2xl text-gray-900">Checkout</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                required
                type="email"
              />
              <p className="text-gray-500 text-xs">
                Your download links will be sent here
              </p>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900">Payment Details</h2>
              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="4242 4242 4242 4242" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </div>

            {/* Billing */}
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900">Billing Address</h2>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" required />
              </div>
            </div>

            {/* Submit */}
            <Button
              className="w-full gap-2"
              disabled={isProcessing}
              size="lg"
              type="submit"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Pay ${(totalPrice * (1 + PLATFORM_FEE_RATE)).toFixed(2)}
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <CreditCard className="h-4 w-4" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-gray-900">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div className="flex justify-between" key={item.id}>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-xs">by {item.seller}</p>
                </div>
                <span className="font-medium text-gray-900 text-sm">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-gray-200 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Platform fee ({PLATFORM_FEE_RATE * 100}%)
              </span>
              <span>${(totalPrice * PLATFORM_FEE_RATE).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(totalPrice * (1 + PLATFORM_FEE_RATE)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
