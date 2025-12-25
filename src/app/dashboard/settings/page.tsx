import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Settings</h2>
      </div>

      <div className="grid max-w-2xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Store Profile</CardTitle>
            <CardDescription>
              Manage your store settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input defaultValue="Andy Commerce" id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Store URL</Label>
              <Input defaultValue="andy-commerce.vercel.app" id="url" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Support Email</Label>
              <Input defaultValue="support@andy.com" id="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input defaultValue="USD ($)" disabled id="currency" />
              <p className="text-[0.8rem] text-muted-foreground">
                Currency cannot be changed after first sale.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Store</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
