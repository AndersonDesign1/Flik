"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSession } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";

function getResendButtonText(isResending: boolean, resendCooldown: number) {
  if (isResending) {
    return "Sending…";
  }
  if (resendCooldown > 0) {
    return `Resend (${resendCooldown}s)`;
  }
  return "Resend";
}

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { user, isLoading: isSessionLoading } = useSession();

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Security check: if user is authenticated, validate email matches session
  const isEmailMismatch = user && email && user.email !== email;

  const handleSendOTP = async () => {
    if (!email || isEmailMismatch || resendCooldown > 0) {
      return;
    }

    setIsResending(true);
    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to send code");
        return;
      }

      toast.success("Verification code sent!");
      setResendCooldown(60);
    } catch {
      toast.error("Failed to send verification code");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length !== 6 || !email || isEmailMismatch) {
      return;
    }

    setIsLoading(true);
    try {
      // Use emailOtp.verifyEmail for email verification (not signIn.emailOtp which is for passwordless login)
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp: value,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Invalid code");
        return;
      }

      toast.success("Email verified! Welcome to Flik.");
      router.push("/onboarding");
    } catch {
      toast.error("Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking session
  if (isSessionLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <span className="size-8 animate-spin rounded-full border-4 border-primary-violet/20 border-t-primary-violet" />
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  // Security: Show error if authenticated user tries to verify different email
  if (isEmailMismatch) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-error-red/10">
            <AlertTriangle className="size-8 text-error-red" />
          </div>
        </div>
        <h1 className="font-semibold text-2xl text-foreground">
          Invalid Verification
        </h1>
        <p className="text-muted-foreground text-sm">
          You're signed in as{" "}
          <span className="font-medium text-foreground">{user.email}</span> but
          trying to verify{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
        <div className="flex flex-col gap-3">
          <Button asChild className="h-11 w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button
            className="h-11 w-full"
            onClick={() => router.push(`/verify-email?email=${user.email}`)}
            variant="outline"
          >
            Verify {user.email}
          </Button>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Verification Required
        </h1>
        <p className="text-muted-foreground text-sm">
          Please sign up first to verify your email.
        </p>
        <Button asChild className="h-11 w-full">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Verify your email
        </h1>
        <p className="text-muted-foreground text-sm">
          We've sent a 6-digit code to
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <InputOTP
            disabled={isLoading}
            maxLength={6}
            onChange={(val) => setValue(val)}
            pattern={REGEXP_ONLY_DIGITS}
            value={value}
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
          disabled={isLoading || value.length !== 6}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Verifying…
            </div>
          ) : (
            "Verify Email"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Didn't receive the code?{" "}
          <button
            className="font-medium text-primary-violet hover:underline disabled:opacity-50"
            disabled={isResending || resendCooldown > 0}
            onClick={handleSendOTP}
            type="button"
          >
            {getResendButtonText(isResending, resendCooldown)}
          </button>
        </p>
      </div>

      <p className="text-center text-muted-foreground text-sm">
        Wrong email?{" "}
        <Link
          className="font-medium text-primary-violet hover:underline"
          href="/signup"
        >
          Sign up again
        </Link>
      </p>
    </div>
  );
}
