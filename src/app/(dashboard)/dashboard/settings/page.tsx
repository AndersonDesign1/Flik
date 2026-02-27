"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const createNotificationEmail = (email: string) => ({
    id: crypto.randomUUID(),
    value: email,
  });

  const [storeSettings, setStoreSettings] = useState({
    name: "Andy Commerce",
    url: "andy-commerce.vercel.app",
    email: "support@andycommerce.com",
    phone: "+1 (555) 123-4567",
    currency: "usd",
    payoutSchedule: "weekly",
    payoutThreshold: "$100.00",
  });
  const [notificationEmails, setNotificationEmails] = useState(() => [
    createNotificationEmail("orders@andycommerce.com"),
  ]);

  const updateStoreSettings =
    (field: keyof typeof storeSettings) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setStoreSettings((current) => ({ ...current, [field]: event.target.value }));
    };

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-semibold text-foreground text-lg">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your store settings and preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="overflow-hidden rounded-xl border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">Store Profile</h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Your store's public information.
            </p>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="name">
                  Store Name
                </Label>
                <Input id="name" onChange={updateStoreSettings("name")} value={storeSettings.name} />
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="url">
                  Store URL
                </Label>
                <Input id="url" onChange={updateStoreSettings("url")} value={storeSettings.url} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="email">
                  Support Email
                </Label>
                <Input
                  id="email"
                  onChange={updateStoreSettings("email")}
                  type="email"
                  value={storeSettings.email}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="phone">
                  Support Phone
                </Label>
                <Input
                  id="phone"
                  onChange={updateStoreSettings("phone")}
                  type="tel"
                  value={storeSettings.phone}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">Payment Settings</h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Configure currency and payout preferences.
            </p>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-sm">Currency</Label>
                <Select
                  onValueChange={(value) =>
                    setStoreSettings((current) => ({ ...current, currency: value }))
                  }
                  value={storeSettings.currency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="ngn">NGN (₦)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-sm">Payout Schedule</Label>
                <Select
                  onValueChange={(value) =>
                    setStoreSettings((current) => ({ ...current, payoutSchedule: value }))
                  }
                  value={storeSettings.payoutSchedule}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium text-sm" htmlFor="payout-threshold">
                Minimum Payout Threshold
              </Label>
              <Input
                id="payout-threshold"
                onChange={updateStoreSettings("payoutThreshold")}
                placeholder="$100.00"
                value={storeSettings.payoutThreshold}
              />
              <p className="text-muted-foreground text-xs">
                Payouts will only be processed when balance exceeds this amount.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Manage email notifications for your store.
            </p>
          </div>
          <div className="space-y-4 p-5">
            {notificationEmails.map((email, index) => (
              <div className="flex items-end gap-2" key={email.id}>
                <div className="flex-1 space-y-2">
                  <Label className="font-medium text-sm" htmlFor={`order-email-${index + 1}`}>
                    Order Notifications Email {index + 1}
                  </Label>
                  <Input
                    id={`order-email-${index + 1}`}
                    onChange={(event) => {
                      setNotificationEmails((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, value: event.target.value }
                            : item
                        )
                      );
                    }}
                    type="email"
                    value={email.value}
                  />
                </div>
                {notificationEmails.length > 1 ? (
                  <Button
                    className="shrink-0"
                    onClick={() =>
                      setNotificationEmails((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index)
                      )
                    }
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                ) : null}
              </div>
            ))}
            <Button
              className="w-fit gap-2"
              onClick={() =>
                setNotificationEmails((current) => [
                  ...current,
                  createNotificationEmail("notifications@yourstore.com"),
                ])
              }
              type="button"
              variant="outline"
            >
              <Plus className="size-4" />
              Add Email
            </Button>
          </div>
          <div className="border-border/30 border-t bg-surface-2/30 px-5 py-4">
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
