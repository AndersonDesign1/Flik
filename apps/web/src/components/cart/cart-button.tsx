"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

export function CartButton() {
  const { totalItems } = useCart();

  return (
    <Button asChild className="relative" size="icon" variant="ghost">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 font-medium text-white text-xs">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
