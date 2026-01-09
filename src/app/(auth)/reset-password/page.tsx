import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Reset Password | Flik",
  description: "Set a new password for your Flik account.",
};

function ResetPasswordLoading() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="size-8 animate-spin rounded-full border-4 border-primary-violet/20 border-t-primary-violet" />
      <p className="text-muted-foreground text-sm">Loading…</p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
