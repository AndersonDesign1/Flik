"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SignupFormContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get user type from URL params (set by onboarding flow)
  const userType = searchParams.get("userType") ?? "seller";
  const isSeller = userType === "seller" || userType === "both";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual signup
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Create an account
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Start your journey with Overlay
        </p>
      </div>

      {/* OAuth */}
      <OAuthButtons isLoading={isLoading} />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-border border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-4 text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              autoComplete="given-name"
              className="h-11"
              id="firstName"
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              autoComplete="family-name"
              className="h-11"
              id="lastName"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            className="h-11"
            id="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>

        {/* Store name - only for sellers */}
        {isSeller && (
          <div className="space-y-2">
            <Label htmlFor="storeName">Store name</Label>
            <Input
              autoComplete="organization"
              className="h-11"
              id="storeName"
              placeholder="My Awesome Store"
              required
            />
            <p className="text-muted-foreground text-xs">
              This will be your public store URL
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            className="h-11"
            id="password"
            placeholder="Create a password"
            required
            type="password"
          />
          <p className="text-muted-foreground text-xs">
            Must be at least 8 characters
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox className="mt-0.5" id="terms" required />
          <Label
            className="font-normal text-muted-foreground text-sm leading-tight"
            htmlFor="terms"
          >
            I agree to the{" "}
            <Link className="text-primary-violet hover:underline" href="/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-primary-violet hover:underline"
              href="/privacy"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          className="h-11 w-full bg-primary-violet text-white shadow-md shadow-primary-violet/25 hover:bg-primary-violet-700"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link
          className="font-medium text-primary-violet hover:underline"
          href="/login"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export function SignupForm() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary-violet border-t-transparent" />
        </div>
      }
    >
      <SignupFormContent />
    </Suspense>
  );
}
