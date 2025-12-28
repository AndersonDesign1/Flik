import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-6">
      {/* Header - Compact */}
      <div>
        <h2 className="font-semibold text-foreground text-lg">Settings</h2>
        <p className="text-muted-foreground text-xs">
          Manage your store settings and preferences.
        </p>
      </div>

      {/* Settings Cards - Compact */}
      <div className="max-w-xl space-y-4">
        {/* Store Profile */}
        <div className="overflow-hidden rounded-lg border border-border/40 bg-surface-1">
          <div className="border-border/30 border-b px-4 py-3">
            <h3 className="font-semibold text-foreground text-sm">
              Store Profile
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Your store's public information.
            </p>
          </div>
          <div className="space-y-4 p-4">
            <div className="space-y-1.5">
              <Label className="font-medium text-xs" htmlFor="name">
                Store Name
              </Label>
              <Input className="h-9" defaultValue="Andy Commerce" id="name" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-medium text-xs" htmlFor="url">
                Store URL
              </Label>
              <Input
                className="h-9"
                defaultValue="andy-commerce.vercel.app"
                id="url"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-medium text-xs" htmlFor="email">
                Support Email
              </Label>
              <Input
                className="h-9"
                defaultValue="support@andy.com"
                id="email"
                type="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-medium text-xs" htmlFor="currency">
                Currency
              </Label>
              <Input
                className="h-9"
                defaultValue="USD ($)"
                disabled
                id="currency"
              />
              <p className="text-[10px] text-muted-foreground">
                Currency cannot be changed after first sale.
              </p>
            </div>
          </div>
          <div className="border-border/30 border-t bg-surface-2/30 px-4 py-3">
            <Button className="h-8" size="sm">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="overflow-hidden rounded-lg border border-destructive-200 bg-surface-1 dark:border-destructive-100/50">
          <div className="border-destructive-200/50 border-b px-4 py-3 dark:border-destructive-100/30">
            <h3 className="font-semibold text-destructive-600 text-sm dark:text-destructive-500">
              Danger Zone
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Irreversible actions for your store.
            </p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">
                  Delete Store
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Permanently remove your store and all data.
                </p>
              </div>
              <Button className="h-8" size="sm" variant="destructive">
                Delete Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
