"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface OAuthButtonsProps {
  isLoading?: boolean;
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        className="h-11 gap-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        disabled={isLoading}
        type="button"
        variant="outline"
      >
        <FaGoogle className="h-4 w-4" />
        Google
      </Button>
      <Button
        className="h-11 gap-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        disabled={isLoading}
        type="button"
        variant="outline"
      >
        <FaGithub className="h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
