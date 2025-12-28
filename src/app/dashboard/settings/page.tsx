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
  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-foreground text-lg">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your store settings and preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Profile */}
        <div className="overflow-hidden rounded-xl border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Store Profile
            </h3>
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
                <Input defaultValue="Andy Commerce" id="name" />
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="url">
                  Store URL
                </Label>
                <Input defaultValue="andy-commerce.vercel.app" id="url" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="email">
                  Support Email
                </Label>
                <Input
                  defaultValue="support@andycommerce.com"
                  id="email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-sm" htmlFor="phone">
                  Support Phone
                </Label>
                <Input defaultValue="+1 (555) 123-4567" id="phone" type="tel" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="overflow-hidden rounded-xl border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Payment Settings
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Configure currency and payout preferences.
            </p>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-sm">Currency</Label>
                <Select defaultValue="usd">
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
                <Select defaultValue="weekly">
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
                defaultValue="$100.00"
                id="payout-threshold"
                placeholder="$100.00"
              />
              <p className="text-muted-foreground text-xs">
                Payouts will only be processed when balance exceeds this amount.
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="overflow-hidden rounded-xl border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Notifications
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Manage email notifications for your store.
            </p>
          </div>
          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <Label className="font-medium text-sm" htmlFor="order-email">
                Order Notifications Email
              </Label>
              <Input
                defaultValue="orders@andycommerce.com"
                id="order-email"
                type="email"
              />
              <p className="text-muted-foreground text-xs">
                Receive notifications for new orders and updates.
              </p>
            </div>
          </div>
          <div className="border-border/30 border-t bg-surface-2/30 px-5 py-4">
            <Button size="sm">Save Changes</Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="overflow-hidden rounded-xl border border-destructive-200 bg-surface-1 dark:border-destructive-100/50">
          <div className="border-destructive-200/50 border-b px-5 py-4 dark:border-destructive-100/30">
            <h3 className="font-semibold text-destructive-600 text-sm dark:text-destructive-500">
              Danger Zone
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Irreversible actions for your store.
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">
                  Delete Store
                </p>
                <p className="mt-0.5 text-muted-foreground text-xs">
                  Permanently remove your store and all data.
                </p>
              </div>
              <Button size="sm" variant="destructive">
                Delete Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
