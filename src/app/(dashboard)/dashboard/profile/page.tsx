"use client";

import { Camera, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials, useProfileSettings } from "@/hooks/use-profile-settings";

export default function ProfilePage() {
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

  const handlePasswordSubmit = async () => {
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
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-semibold text-foreground text-lg">Profile</h2>
        <p className="text-muted-foreground text-sm">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Profile Picture
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="flex items-center gap-6 p-5">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage alt="Profile" src={user?.image ?? ""} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-lg text-white">
                  {getInitials(fullName || user?.name)}
                </AvatarFallback>
              </Avatar>
              <button
                className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
                type="button"
              >
                <Camera className="h-3.5 w-3.5 text-foreground" />
              </button>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {fullName || user?.name || "Unnamed User"}
              </p>
              <p className="text-muted-foreground text-xs">
                Upload a new avatar or remove the current one.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button disabled size="sm" variant="outline">
                  Upload
                </Button>
                <Button disabled size="sm" variant="ghost">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Personal Information
            </h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Update your personal details.
            </p>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    id="firstName"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                  />
                </div>
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
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  id="email"
                  readOnly
                  type="email"
                  value={user?.email ?? ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  id="phone"
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  value={phone}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  id="location"
                  onChange={(event) => setLocation(event.target.value)}
                  value={location}
                />
              </div>
            </div>
          </div>
          <div className="border-border/30 border-t bg-surface-2/30 px-5 py-4">
            <Button
              disabled={isSavingProfile || !isProfileReady}
              onClick={saveProfile}
              size="sm"
            >
              {isSavingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Card>

        <Card>
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">Password</h3>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Update your password to keep your account secure.
            </p>
          </div>
          <div className="space-y-4 p-5">
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
          </div>
          <div className="border-border/30 border-t bg-surface-2/30 px-5 py-4">
            <Button
              disabled={isChangingPassword}
              onClick={handlePasswordSubmit}
              size="sm"
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
