"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <FaEnvelope className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="font-semibold text-2xl text-gray-900">
            Check your email
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            We've sent a password reset link to your email address. Please check
            your inbox and follow the instructions.
          </p>
        </div>
        <Button
          asChild
          className="h-11 w-full bg-gray-900 text-white hover:bg-gray-800"
        >
          <Link href="/login">Back to sign in</Link>
        </Button>
        <p className="text-gray-500 text-sm">
          Didn't receive the email?{" "}
          <button
            className="font-medium text-gray-900 hover:underline"
            onClick={() => setIsSubmitted(false)}
            type="button"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-semibold text-2xl text-gray-900">
          Forgot password?
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          No worries, we'll send you reset instructions.
        </p>
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

        <Button
          className="h-11 w-full bg-gray-900 text-white hover:bg-gray-800"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      {/* Back to login */}
      <Link
        className="flex items-center justify-center gap-2 font-medium text-gray-600 text-sm hover:text-gray-900"
        href="/login"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
