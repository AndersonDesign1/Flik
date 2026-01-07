import { OnboardingFlow } from "@/components/auth/onboarding-flow";

export const metadata = {
  title: "Get Started | Overlay",
  description:
    "Tell us about yourself so we can personalize your Overlay experience.",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
