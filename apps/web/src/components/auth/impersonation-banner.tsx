"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function ImpersonationBanner() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const session = data?.session as { impersonatedBy?: string } | undefined;

  if (!session?.impersonatedBy) {
    return null;
  }

  const stopImpersonating = async () => {
    const result = await authClient.admin.stopImpersonating();

    if (result.error) {
      toast.error(result.error.message || "Could not stop impersonating");
      return;
    }

    toast.success("Returned to your admin session");
    router.push("/super-admin/admins");
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-3 border-warning-100 border-b bg-warning-50 px-4 py-2 text-sm text-warning-700">
      <span className="font-medium">
        You are impersonating another account.
      </span>
      <Button onClick={stopImpersonating} size="sm" variant="outline">
        Stop
      </Button>
    </div>
  );
}
