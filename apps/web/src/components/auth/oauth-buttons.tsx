"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface OAuthButtonsProps {
  isLoading?: boolean;
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/onboarding",
      });
    } catch {
      toast.error("Failed to sign in with Google");
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/onboarding",
      });
    } catch {
      toast.error("Failed to sign in with GitHub");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button
        className="h-11 gap-2 border-border bg-card text-foreground hover:bg-muted"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        type="button"
        variant="outline"
      >
        {isLoading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
        ) : (
          <FaGoogle className="size-4" />
        )}
        Google
      </Button>
      <Button
        className="h-11 gap-2 border-border bg-card text-foreground hover:bg-muted"
        disabled={isLoading}
        onClick={handleGitHubSignIn}
        type="button"
        variant="outline"
      >
        {isLoading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
        ) : (
          <FaGithub className="size-4" />
        )}
        GitHub
      </Button>
    </div>
  );
}
