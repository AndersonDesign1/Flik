import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Forgot Password | Flik",
  description: "Reset your Flik account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
