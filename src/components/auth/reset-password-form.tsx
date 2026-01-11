"use client";

import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to reset password");
        return;
      }

      setIsSuccess(true);
      toast.success("Password reset successfully!");
    } catch {
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Invalid Reset Link
        </h1>
        <p className="text-muted-foreground text-sm">
          This password reset link is invalid or has expired.
        </p>
        <Button asChild className="h-11 w-full">
          <Link href="/forgot-password">Request New Link</Link>
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle className="size-6 text-green-600" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl text-foreground">
            Password Reset!
          </h1>
          <p className="text-muted-foreground text-sm">
            Your password has been successfully reset.
          </p>
        </div>
        <Button
          className="h-11 w-full bg-primary-violet text-white shadow-md shadow-primary-violet/25 hover:bg-primary-violet-700"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Set new password
        </h1>
        <p className="text-muted-foreground text-sm">
          Your new password must be at least 8 characters.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            autoComplete="new-password"
            className="h-11"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password…"
            required
            type="password"
            value={password}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            autoComplete="new-password"
            className="h-11"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password…"
            required
            type="password"
            value={confirmPassword}
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
              Resetting…
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      <Link
        className="flex items-center justify-center gap-2 font-medium text-muted-foreground text-sm hover:text-foreground"
        href="/login"
      >
        <ArrowLeft className="size-4" />
        Back to Sign In
      </Link>
    </div>
  );
}
