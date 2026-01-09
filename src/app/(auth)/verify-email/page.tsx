import { Suspense } from "react";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export const metadata = {
  title: "Verify Email | Flik",
  description: "Check your inbox to verify your email address.",
};

function VerifyEmailLoading() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="size-8 animate-spin rounded-full border-4 border-primary-violet/20 border-t-primary-violet" />
      <p className="text-muted-foreground text-sm">Loading…</p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoading />}>
      <VerifyEmailForm />
    </Suspense>
  );
}
