import { OTPVerificationForm } from "@/components/auth/otp-verification-form";

export const metadata = {
  title: "Verify Email | Overlay",
  description: "Enter the verification code sent to your email.",
};

export default function VerifyPage() {
  return <OTPVerificationForm />;
}
