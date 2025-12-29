import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
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

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
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
          <Link
            className="font-medium text-gray-600 text-sm transition-colors hover:text-gray-900"
            href="/store/designstudio"
          >
            Examples
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            className="hidden font-medium text-gray-600 text-sm transition-colors hover:text-gray-900 sm:block"
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
      </div>
    </nav>
  );
}
