"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

function ResendButtonText({
  isResending,
  resendCooldown,
}: {
  isResending: boolean;
  resendCooldown: number;
}) {
  if (isResending) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="size-3 animate-spin rounded-full border-2 border-primary-violet/20 border-t-primary-violet" />
        Resending…
      </span>
    );
  }
  if (resendCooldown > 0) {
    return `Resend (${resendCooldown}s)`;
  }
  return "Resend";
}

export function OTPVerificationForm() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length !== 6) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await authClient.twoFactor.verifyOtp({
        code: value,
        trustDevice: true,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Invalid verification code");
        return;
      }

      toast.success("Verified!");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) {
      return;
    }

    setIsResending(true);
    try {
      const result = await authClient.twoFactor.sendOtp();

      if (result.error) {
        toast.error(result.error.message ?? "Failed to resend code");
        return;
      }

      toast.success("Code sent!");
      setResendCooldown(60);
    } catch {
      toast.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          Verify your identity
        </h1>
        <p className="text-muted-foreground text-sm">
          We've sent a 6-digit code to your email.
          <br />
          Enter it below to continue.
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
            "Verify"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Didn't receive the code?{" "}
          <button
            className="font-medium text-primary-violet hover:underline disabled:opacity-50"
            disabled={isResending || resendCooldown > 0}
            onClick={handleResend}
            type="button"
          >
            <ResendButtonText
              isResending={isResending}
              resendCooldown={resendCooldown}
            />
          </button>
        </p>
      </div>

      <p className="text-center text-muted-foreground text-sm">
        <Link
          className="font-medium text-primary-violet hover:underline"
          href="/login"
        >
          ← Back to login
        </Link>
      </p>
    </div>
  );
}
