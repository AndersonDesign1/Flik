"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = ComponentProps<typeof Input>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          className={cn("pr-10", className)}
          ref={ref}
          type={isVisible ? "text" : "password"}
          {...props}
        />
        <Button
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
          onClick={() => setIsVisible((value) => !value)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
