"use client";

import { useMutation, useQuery } from "convex/react";
import { ArrowRight, BadgeCheck, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "../../../../convex/_generated/api";

function slugifyStoreName(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function StartSellingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const workspaceAccess = useQuery(api.platform.getWorkspaceAccess);
  const myStore = useQuery(api.stores.getMyStore);
  const createStore = useMutation(api.stores.createStore);

  const [storeName, setStoreName] = useState("");
  const [storeSlug, setStoreSlug] = useState("");
  const [description, setDescription] = useState("");

  const derivedSlug = storeSlug || slugifyStoreName(storeName);
  const canSubmit = storeName.trim().length >= 2;
  const hasSellerWorkspace = !!workspaceAccess?.canAccessSeller;
  const hasStore = !!myStore;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      toast.error("Enter a store name to continue");
      return;
    }

    setIsSubmitting(true);
    try {
      await createStore({
        description: description.trim() || undefined,
        name: storeName,
        slug: storeSlug.trim() || undefined,
      });
      toast.success("Seller workspace is ready");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create store"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (workspaceAccess === undefined || myStore === undefined) {
    return <div className="h-40 animate-pulse rounded-xl bg-muted/40" />;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl text-foreground">
          Start Selling on Flik
        </h2>
        <p className="max-w-2xl text-muted-foreground text-sm">
          Keep the same account for buying and selling. Create your store once,
          then switch between buyer and seller workspaces whenever you need.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          {hasStore ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600">
                  <BadgeCheck className="size-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-lg">
                    Your seller workspace is active
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {myStore.name} is already connected to this account.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                <p className="font-medium text-foreground text-sm">Store URL</p>
                <p className="mt-1 text-muted-foreground text-sm">
                  /store/{myStore.slug}
                </p>
              </div>
              <Button
                onClick={() => {
                  router.push("/dashboard");
                  router.refresh();
                }}
                variant="primary"
              >
                Open Seller Workspace
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  className="font-medium text-foreground text-sm"
                  htmlFor="store-name"
                >
                  Store name
                </label>
                <Input
                  id="store-name"
                  onChange={(event) => setStoreName(event.target.value)}
                  placeholder="Studio North"
                  value={storeName}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="font-medium text-foreground text-sm"
                  htmlFor="store-slug"
                >
                  Store URL
                </label>
                <Input
                  id="store-slug"
                  onChange={(event) => setStoreSlug(event.target.value)}
                  placeholder="studio-north"
                  value={storeSlug}
                />
                <p className="text-muted-foreground text-xs">
                  Your public store will appear at{" "}
                  <span className="font-medium text-foreground">
                    /store/{derivedSlug || "your-store"}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <label
                  className="font-medium text-foreground text-sm"
                  htmlFor="store-description"
                >
                  Short description
                </label>
                <Textarea
                  id="store-description"
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Tell buyers what you sell and why your store is worth following."
                  rows={4}
                  value={description}
                />
              </div>

              <Button
                disabled={isSubmitting || !canSubmit}
                type="submit"
                variant="primary"
              >
                {isSubmitting ? "Creating Store..." : "Create Store"}
                <ArrowRight className="size-4" />
              </Button>
            </form>
          )}
        </Card>

        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-violet/10 p-2 text-primary-violet">
              <Store className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                One account, two workspaces
              </h3>
              <p className="text-muted-foreground text-sm">
                Buyer features stay available after seller activation.
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-border/50 bg-muted/30 p-4">
            <div>
              <p className="font-medium text-foreground text-sm">
                Buyer workspace
              </p>
              <p className="text-muted-foreground text-xs">
                Purchases, library, wishlist, profile, and discovery.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                Seller workspace
              </p>
              <p className="text-muted-foreground text-xs">
                Products, analytics, payouts, customers, and store settings.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <Link
              className="font-medium text-primary-violet hover:underline"
              href="/account"
            >
              Return to buyer account
            </Link>
            {hasSellerWorkspace && (
              <Link
                className="font-medium text-primary-violet hover:underline"
                href="/dashboard"
              >
                Open seller workspace
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
