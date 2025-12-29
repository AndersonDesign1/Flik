"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartButton } from "@/components/cart/cart-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 border-gray-200/80 border-b bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          className="flex items-center gap-2 font-bold text-gray-900 text-lg tracking-tight"
          href="/"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
            <span className="font-bold text-sm">O</span>
          </div>
          Overlay
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            className="font-medium text-gray-600 text-sm transition-colors hover:text-gray-900"
            href="/categories"
          >
            Browse
          </Link>
          <Link
            className="font-medium text-gray-600 text-sm transition-colors hover:text-gray-900"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="font-medium text-gray-600 text-sm transition-colors hover:text-gray-900"
            href="#pricing"
          >
            Pricing
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <CartButton />
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              className="font-medium text-gray-600 text-sm transition-colors hover:text-gray-900"
              href="/login"
            >
              Log in
            </Link>
            <Button
              asChild
              className="rounded-full bg-gray-900 px-5 text-white hover:bg-gray-800"
              size="sm"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="sm:hidden">
            <Sheet onOpenChange={setIsOpen} open={isOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  <Link
                    className="font-medium text-gray-600 text-lg"
                    href="/categories"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse
                  </Link>
                  <Link
                    className="font-medium text-gray-600 text-lg"
                    href="#features"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    className="font-medium text-gray-600 text-lg"
                    href="#pricing"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <hr className="border-gray-100" />
                  <Link
                    className="font-medium text-gray-600 text-lg"
                    href="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Button
                    asChild
                    className="h-12 w-full rounded-xl bg-gray-900 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
