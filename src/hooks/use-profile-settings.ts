"use client";

import { useMutation, useQuery } from "convex/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";
import { api } from "../../convex/_generated/api";

const WHITESPACE_REGEX = /\s+/;

interface PasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function splitName(name?: string | null) {
  const fullName = name?.trim();
  if (!fullName) {
    return { firstName: "", lastName: "" };
  }

  const parts = fullName.split(WHITESPACE_REGEX).filter(Boolean);
  const [firstName = "", ...rest] = parts;

  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export function getInitials(name?: string | null) {
  if (!name?.trim()) {
    return "U";
  }

  return name
    .trim()
    .split(WHITESPACE_REGEX)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function useProfileSettings() {
  const { user } = useSession();
  const profile = useQuery(api.profiles.getProfile) as
    | {
        firstName?: string;
        lastName?: string;
        phone?: string;
        location?: string;
      }
    | null
    | undefined;
  const updateProfile = useMutation(api.profiles.updateProfile) as (args: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    location?: string;
  }) => Promise<unknown>;

  const hasSeededFormRef = useRef(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const isProfileReady = profile !== undefined;

  useEffect(() => {
    if (!(isProfileReady && !hasSeededFormRef.current)) {
      return;
    }

    const fromName = splitName(user?.name);
    setFirstName(profile?.firstName ?? fromName.firstName);
    setLastName(profile?.lastName ?? fromName.lastName);
    setPhone(profile?.phone ?? "");
    setLocation(profile?.location ?? "");
    hasSeededFormRef.current = true;
  }, [isProfileReady, profile, user?.name]);

  const fullName = useMemo(
    () => `${firstName} ${lastName}`.trim(),
    [firstName, lastName]
  );

  const saveProfile = async () => {
    if (!user?.email) {
      toast.error("You must be signed in to update your profile");
      return;
    }

    if (!isProfileReady) {
      toast.error("Profile is still loading. Please try again.");
      return;
    }

    setIsSavingProfile(true);

    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        location: location.trim(),
      });

      const updateUserResult = await authClient.updateUser({
        name: fullName,
      });

      if (updateUserResult.error) {
        toast.warning(
          updateUserResult.error.message ??
            "Profile saved. Display name sync failed; please retry."
        );
      } else {
        toast.success("Profile updated");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const changePassword = async (payload: PasswordInput) => {
    const currentPassword = payload.currentPassword.trim();
    const newPassword = payload.newPassword.trim();
    const confirmPassword = payload.confirmPassword.trim();

    if (!(currentPassword && newPassword && confirmPassword)) {
      toast.error("Please fill all password fields");
      return false;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    setIsChangingPassword(true);

    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to update password");
        return false;
      }

      toast.success("Password updated");
      return true;
    } catch {
      toast.error("Failed to update password");
      return false;
    } finally {
      setIsChangingPassword(false);
    }
  };

  return {
    user,
    profile,
    isProfileReady,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    location,
    setLocation,
    fullName,
    isSavingProfile,
    saveProfile,
    isChangingPassword,
    changePassword,
  };
}
