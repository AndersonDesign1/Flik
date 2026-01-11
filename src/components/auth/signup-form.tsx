"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        email: email.trim(),
        password,
        name: `${firstName.trim()} ${lastName.trim()}`,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to create account");
        return;
      }

      // Send email verification OTP immediately after signup
      await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "email-verification",
      });

      toast.success(
        "Account created! Check your email for the verification code."
      );
      router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Start your journey with Flik
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              autoComplete="given-name"
              className="h-11"
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John…"
              required
              value={firstName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              autoComplete="family-name"
              className="h-11"
              id="lastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe…"
              required
              value={lastName}
            />
          </div>
        </div>

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
          <Label htmlFor="password">Password</Label>
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
          <p className="text-muted-foreground text-xs">
            Must be at least 8 characters
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            checked={termsAccepted}
            className="mt-0.5"
            id="terms"
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
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
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Creating account…
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="text-center text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link
          className="font-medium text-primary-violet hover:underline"
          href="/login"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
