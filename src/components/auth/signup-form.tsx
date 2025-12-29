"use client";

import Link from "next/link";
import { useState } from "react";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);

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
        <h1 className="font-semibold text-2xl text-gray-900">
          Create an account
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Start selling in minutes with Overlay
        </p>
      </div>

      {/* OAuth */}
      <OAuthButtons isLoading={isLoading} />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-gray-200 border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">or continue with</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
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
          <p className="text-gray-500 text-xs">Must be at least 8 characters</p>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox className="mt-0.5" id="terms" required />
          <Label
            className="font-normal text-gray-600 text-sm leading-tight"
            htmlFor="terms"
          >
            I agree to the{" "}
            <Link className="text-gray-900 hover:underline" href="#">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="text-gray-900 hover:underline" href="#">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          className="h-11 w-full bg-gray-900 text-white hover:bg-gray-800"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <Link
          className="font-medium text-gray-900 hover:underline"
          href="/login"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
