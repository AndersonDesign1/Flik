"use client";

import { useMutation, useQuery } from "convex/react";
import { Camera, Mail, MapPin, Phone, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { api } from "../../../../../convex/_generated/api";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

const WHITESPACE_REGEX = /\s+/;

function splitName(name: string | null | undefined) {
  if (!name?.trim()) {
    return { firstName: "", lastName: "" };
  }

  const [firstName, ...rest] = name.trim().split(WHITESPACE_REGEX);
  return {
    firstName: firstName ?? "",
    lastName: rest.join(" "),
  };
}

export default function ProfilePage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const profile = useQuery(api.profiles.getProfile);
  const updateProfile = useMutation(api.profiles.updateProfile);

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isSessionPending || profile === undefined || isInitialized) {
      return;
    }

    const user = session?.user;
    const nameFromAuth = splitName(user?.name);

    setForm({
      firstName: profile?.firstName ?? nameFromAuth.firstName,
      lastName: profile?.lastName ?? nameFromAuth.lastName,
      email: user?.email ?? "",
      phone: profile?.phone ?? "",
      location: profile?.location ?? "",
    });
    setIsInitialized(true);
  }, [isSessionPending, profile, isInitialized, session?.user]);

  const displayName = useMemo(() => {
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    return fullName || session?.user?.name || "";
  }, [form.firstName, form.lastName, session?.user?.name]);

  const initials = useMemo(() => {
    const source = displayName || form.email;
    if (!source) {
      return "?";
    }

    const parts = source.trim().split(WHITESPACE_REGEX);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }, [displayName, form.email]);

  const handleChange = (field: keyof FormState) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      const saveProfile = updateProfile as unknown as (args: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        location?: string;
      }) => Promise<unknown>;

      await saveProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        location: form.location,
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
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
              <Avatar className="h-20 w-20">
                <AvatarImage alt="Profile" src={session?.user?.image ?? ""} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-lg text-white">
                  {initials}
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
                {displayName || "—"}
              </p>
              <p className="text-muted-foreground text-xs">
                Upload a new avatar or remove the current one.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Upload
                </Button>
                <Button size="sm" variant="ghost">
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
                    onChange={(event) =>
                      handleChange("firstName")(event.target.value)
                    }
                    value={form.firstName}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  onChange={(event) =>
                    handleChange("lastName")(event.target.value)
                  }
                  value={form.lastName}
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
                  value={form.email}
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
                  onChange={(event) =>
                    handleChange("phone")(event.target.value)
                  }
                  type="tel"
                  value={form.phone}
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
                  onChange={(event) =>
                    handleChange("location")(event.target.value)
                  }
                  value={form.location}
                />
              </div>
            </div>
          </div>
          <div className="border-border/30 border-t bg-surface-2/30 px-5 py-4">
            <Button disabled={isSubmitting} onClick={handleSave} size="sm">
              {isSubmitting ? "Saving..." : "Save Changes"}
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
          <div className="border-border/30 border-t bg-surface-2/30 px-5 py-4">
            <Button size="sm">Update Password</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
