"use client";

import {
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartButton } from "@/components/cart/cart-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 border-border border-b bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          className="flex items-center gap-2 font-bold text-foreground text-lg tracking-tight"
          href="/"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary-violet text-white">
            <span className="font-bold text-sm">F</span>
          </div>
          Flik
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/categories"
          >
            Browse
          </Link>
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="#pricing"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <CartButton />
          <div className="hidden items-center gap-3 sm:flex">
            {isLoading && (
              <div className="size-8 animate-pulse rounded-full bg-muted" />
            )}
            {!isLoading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-violet to-secondary-magenta font-semibold text-white text-xs ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    type="button"
                  >
                    <Avatar className="size-8">
                      <AvatarImage
                        alt={user.name}
                        src={user.image ?? undefined}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary-violet to-secondary-magenta text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Open user menu</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm leading-none">
                        {user.name}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link href="/dashboard">
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link href="/dashboard/profile">
                      <User className="size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link href="/dashboard/billing">
                      <CreditCard className="size-4" />
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link href="/dashboard/settings">
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link href="/dashboard/help">
                      <HelpCircle className="size-4" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-destructive-600 focus:text-destructive-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!(isLoading || user) && (
              <>
                <Link
                  className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                  href="/login"
                >
                  Log in
                </Link>
                <Button asChild className="rounded-full px-5" size="sm">
                  <Link href="/onboarding">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <div className="sm:hidden">
            <Sheet onOpenChange={setIsOpen} open={isOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 pt-8">
                  <Link
                    className="font-medium text-lg text-muted-foreground"
                    href="/categories"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse
                  </Link>
                  <Link
                    className="font-medium text-lg text-muted-foreground"
                    href="#features"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    className="font-medium text-lg text-muted-foreground"
                    href="#pricing"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <hr className="border-border" />
                  {user ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage
                            alt={user.name}
                            src={user.image ?? undefined}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-primary-violet to-secondary-magenta text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        className="font-medium text-lg text-muted-foreground"
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        className="text-left font-medium text-destructive-600 text-lg"
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        type="button"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        className="font-medium text-lg text-muted-foreground"
                        href="/login"
                        onClick={() => setIsOpen(false)}
                      >
                        Log in
                      </Link>
                      <Button
                        asChild
                        className="h-12 w-full rounded-xl"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/onboarding">Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
