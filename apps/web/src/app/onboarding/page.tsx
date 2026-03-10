import { redirect } from "next/navigation";
import { OnboardingFlow } from "@/components/auth/onboarding-flow";
import {
  fetchAuthMutation,
  fetchAuthQuery,
  isAuthenticated,
} from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export const metadata = {
  title: "Get Started | Flik",
  description:
    "Tell us about yourself so we can personalize your Flik experience.",
};

export default async function OnboardingPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login?redirect=/onboarding");
  }

  // Defense-in-depth: verify email is confirmed
  const user = await fetchAuthQuery(api.users.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  const profile = await fetchAuthQuery(api.profiles.getProfile);

  if (profile?.onboardingCompleted) {
    redirect("/dashboard");
  }

  // Claim any pending role invite for OAuth/new users
  await fetchAuthMutation(api.profiles.claimRoleInvite);

  return <OnboardingFlow />;
}
