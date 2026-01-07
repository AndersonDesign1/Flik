"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface OAuthButtonsProps {
  isLoading?: boolean;
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button
        className="h-11 gap-2 border-border bg-card text-foreground hover:bg-muted"
        disabled={isLoading}
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
