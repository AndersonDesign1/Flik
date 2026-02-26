"use client";

import { Camera, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials, useProfileSettings } from "@/hooks/use-profile-settings";

export default function SettingsPage() {
  const {
    user,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    location,
    setLocation,
    fullName,
    isProfileReady,
    isSavingProfile,
    saveProfile,
    isChangingPassword,
    changePassword,
  } = useProfileSettings();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSave = async () => {
    const changed = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (changed) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Settings</h2>
          <p className="text-gray-500 text-sm">
            Manage your account preferences.
          </p>
        </div>
        <Button
          className="gap-2"
          disabled={isSavingProfile || !isProfileReady}
          onClick={saveProfile}
        >
          {isSavingProfile ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSavingProfile ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Profile</h3>
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="flex size-20 items-center justify-center rounded-full bg-gray-100 font-bold text-2xl text-gray-600">
              {getInitials(fullName || user?.name)}
            </div>
            <button
              className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
              type="button"
            >
              <Camera className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                onChange={(event) => setLocation(event.target.value)}
                value={location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                value={phone}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Email</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" readOnly type="email" value={user?.email ?? ""} />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              onChange={(event) => setCurrentPassword(event.target.value)}
              type="password"
              value={currentPassword}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                onChange={(event) => setNewPassword(event.target.value)}
                type="password"
                value={newPassword}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                value={confirmPassword}
              />
            </div>
          </div>
          <div>
            <Button disabled={isChangingPassword} onClick={handlePasswordSave}>
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </Card>

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
