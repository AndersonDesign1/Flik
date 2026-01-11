"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type Step = "email" | "otp" | "password";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "forget-password",
      });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to send code");
        return;
      }

      toast.success("Code sent to your email!");
      setStep("otp");
    } catch {
      toast.error("Failed to send code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email: email.trim(),
        otp,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Invalid verification code");
        return;
      }

      setStep("password");
    } catch {
      toast.error("Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authClient.emailOtp.resetPassword({
        email: email.trim(),
        otp,
        password,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to reset password");
        return;
      }

      toast.success("Password reset successfully!");
      router.push("/login");
    } catch {
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Email input
  if (step === "email") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="font-semibold text-2xl text-foreground">
            Forgot password?
          </h1>
          <p className="text-muted-foreground text-sm">
            We'll send you a verification code.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSendOTP}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email"
              className="h-11"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com…"
              required
              spellCheck={false}
              type="email"
              value={email}
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
                Sending…
              </div>
            ) : (
              "Send Code"
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

  // Step 2: OTP input
  if (step === "otp") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="font-semibold text-2xl text-foreground">
            Enter verification code
          </h1>
          <p className="text-muted-foreground text-sm">
            We've sent a 6-digit code to
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleVerifyOTP}>
          <div className="flex justify-center">
            <InputOTP
              disabled={isLoading}
              maxLength={6}
              onChange={(val) => setOtp(val)}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
            >
              <InputOTPGroup>
                <InputOTPSlot className="size-12 text-lg" index={0} />
                <InputOTPSlot className="size-12 text-lg" index={1} />
                <InputOTPSlot className="size-12 text-lg" index={2} />
                <InputOTPSlot className="size-12 text-lg" index={3} />
                <InputOTPSlot className="size-12 text-lg" index={4} />
                <InputOTPSlot className="size-12 text-lg" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="h-11 w-full bg-primary-violet text-white shadow-md shadow-primary-violet/25 hover:bg-primary-violet-700"
            disabled={otp.length !== 6 || isLoading}
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                Verifying…
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <button
          className="text-center font-medium text-muted-foreground text-sm hover:text-foreground"
          onClick={() => setStep("email")}
          type="button"
        >
          <ArrowLeft className="mr-1 inline size-4" />
          Back
        </button>
      </div>
    );
  }

  // Step 3: New password
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

      <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
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

      <button
        className="text-center font-medium text-muted-foreground text-sm hover:text-foreground"
        onClick={() => setStep("otp")}
        type="button"
      >
        <ArrowLeft className="mr-1 inline size-4" />
        Back
      </button>
    </div>
  );
}
