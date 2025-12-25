import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 border-border/40 border-b bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          className="font-bold text-foreground text-lg tracking-tight"
          href="/"
        >
          property-dey
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/login"
          >
            Log in
          </Link>
          <Button className="rounded-full px-4" size="sm">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Cart (0)
          </Button>
        </div>
      </div>
    </nav>
  );
}
