"use client";

import Link from "next/link";
import { useState } from "react";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-semibold text-2xl text-gray-900">Welcome back</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Sign in to your account to continue
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="font-medium text-gray-600 text-sm hover:text-gray-900"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            autoComplete="current-password"
            className="h-11"
            id="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </div>

        <Button
          className="h-11 w-full bg-gray-900 text-white hover:bg-gray-800"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <Link
          className="font-medium text-gray-900 hover:underline"
          href="/signup"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
