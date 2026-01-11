"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        if (result.error.status === 403) {
          toast.error("Please verify your email first");
          router.push(
            `/verify-email?email=${encodeURIComponent(email.trim())}`
          );
          return;
        }
        toast.error(result.error.message ?? "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully!");
      router.push("/dashboard");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-semibold text-2xl text-foreground">Welcome back</h1>
        <p className="text-muted-foreground text-sm">
          Sign in to your account to continue
        </p>
      </div>

      <OAuthButtons isLoading={isLoading} />

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-border border-t" />
        </div>
        <span className="relative bg-card px-4 text-muted-foreground text-sm">
          or continue with email
        </span>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            className="h-11"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            spellCheck={false}
            type="email"
            value={email}
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
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password…"
            required
            type="password"
            value={password}
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
              Signing in…
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-muted-foreground text-sm">
        Don't have an account?{" "}
        <Link
          className="font-medium text-primary-violet hover:underline"
          href="/signup"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
