import { OnboardingFlow } from "@/components/auth/onboarding-flow";

export const metadata = {
  title: "Get Started | Flik",
  description:
    "Tell us about yourself so we can personalize your Flik experience.",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
