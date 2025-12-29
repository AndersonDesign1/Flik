"use client";

import { Camera, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Settings</h2>
          <p className="text-gray-500 text-sm">
            Manage your account preferences.
          </p>
        </div>
        <Button className="gap-2" disabled={isSaving} onClick={handleSave}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Profile</h3>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 font-bold text-2xl text-gray-600">
              J
            </div>
            <button
              className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
              type="button"
            >
              <Camera className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input defaultValue="John" id="firstName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input defaultValue="Doe" id="lastName" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input defaultValue="johndoe" id="username" />
            </div>
          </div>
        </div>
      </Card>

      {/* Email Section */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Email</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input defaultValue="john@example.com" id="email" type="email" />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="h-4 w-4 rounded border-gray-300"
              defaultChecked
              id="marketing"
              type="checkbox"
            />
            <Label className="font-normal" htmlFor="marketing">
              Receive marketing emails and product updates
            </Label>
          </div>
        </div>
      </Card>

      {/* Password Section */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 p-6">
        <h3 className="mb-2 font-semibold text-red-600">Danger Zone</h3>
        <p className="mb-4 text-gray-500 text-sm">
          Once you delete your account, there is no going back.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </Card>
    </div>
  );
}
