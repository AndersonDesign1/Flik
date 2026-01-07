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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-semibold text-2xl text-foreground">Welcome back</h1>
        <p className="text-muted-foreground text-sm">
          Sign in to your account to continue
        </p>
      </div>

      {/* OAuth */}
      <OAuthButtons isLoading={isLoading} />

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-border border-t" />
        </div>
        <div className="relative flex bg-card px-4 text-muted-foreground text-sm">
          or continue with
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary-violet"
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
          className="h-11 w-full bg-primary-violet text-white shadow-md shadow-primary-violet/25 hover:bg-primary-violet-700"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Sign in
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-muted-foreground text-sm">
        Don't have an account?{" "}
        <Link
          className="font-medium text-primary-violet hover:underline"
          href="/signup"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
