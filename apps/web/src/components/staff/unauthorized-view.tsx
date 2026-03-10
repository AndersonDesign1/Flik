"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UnauthorizedViewProps {
  isAuthenticated: boolean;
}

export function UnauthorizedView({ isAuthenticated }: UnauthorizedViewProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <LockKeyhole className="size-8 text-muted-foreground" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-semibold text-2xl text-foreground">
          {isAuthenticated ? "Access Denied" : "Login Required"}
        </h1>
        <p className="max-w-sm text-muted-foreground text-sm">
          {isAuthenticated
            ? "You don't have permission to access the staff panel. Please contact an administrator."
            : "Please sign in to access the staff panel."}
        </p>
      </div>
      <div className="flex gap-3">
        {isAuthenticated ? (
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
            <Button
              asChild
              className="bg-primary-violet text-white hover:bg-primary-violet-700"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
