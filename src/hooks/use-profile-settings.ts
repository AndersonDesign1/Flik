"use client";

import { useMutation, useQuery } from "convex/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const WHITESPACE_REGEX = /\s+/;

interface PasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface LinkedAccount {
  providerId?: string;
  password?: string | null;
}

function extractLinkedAccounts(value: unknown): LinkedAccount[] {
  if (!(value && typeof value === "object" && "data" in value)) {
    return [];
  }

  const data = (value as { data?: unknown }).data;
  if (!Array.isArray(data)) {
    return [];
  }

  const linkedAccounts: LinkedAccount[] = [];

  for (const item of data) {
    if (!(item && typeof item === "object")) {
      continue;
    }

    const providerId =
      "providerId" in item && typeof item.providerId === "string"
        ? item.providerId
        : undefined;
    const password =
      "password" in item &&
      (typeof item.password === "string" || item.password === null)
        ? item.password
        : undefined;

    linkedAccounts.push({ providerId, password });
  }

  return linkedAccounts;
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
        avatarUrl?: string;
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
  const generateAvatarUploadUrl = useMutation(
    api.profiles.generateAvatarUploadUrl
  ) as () => Promise<string>;
  const setAvatar = useMutation(api.profiles.setAvatar) as (args: {
    storageId: Id<"_storage">;
  }) => Promise<string | null>;
  const removeAvatarMutation = useMutation(api.profiles.removeAvatar) as () => Promise<null>;

  const hasSeededFormRef = useRef(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [canChangePassword, setCanChangePassword] = useState(true);

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

  useEffect(() => {
    let isMounted = true;

    const loadAccounts = async () => {
      try {
        const authClientWithAccounts = authClient as typeof authClient & {
          listAccounts?: () => Promise<unknown>;
        };

        const result = await authClientWithAccounts.listAccounts?.();
        const linkedAccounts = extractLinkedAccounts(result);

        if (!(isMounted && linkedAccounts.length > 0)) {
          return;
        }

        const hasPasswordProvider = linkedAccounts.some((account) => {
          if (account.password) {
            return true;
          }

          const providerId = account.providerId?.toLowerCase();
          return !providerId || providerId === "credential";
        });

        setCanChangePassword(hasPasswordProvider);
      } catch {
        setCanChangePassword(true);
      }
    };

    void loadAccounts();

    return () => {
      isMounted = false;
    };
  }, []);

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
    if (!canChangePassword) {
      toast.error("Password is managed by your sign-in provider");
      return false;
    }

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

  const uploadAvatar = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return false;
    }

    setIsUploadingAvatar(true);

    try {
      const uploadUrl = await generateAvatarUploadUrl();
      const uploadResponse = await fetch(uploadUrl, {
        body: file,
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        toast.error("Failed to upload profile image");
        return false;
      }

      const { storageId } = (await uploadResponse.json()) as {
        storageId?: Id<"_storage">;
      };

      if (!storageId) {
        toast.error("Failed to process profile image");
        return false;
      }

      const avatarUrl = await setAvatar({ storageId });
      const result = await authClient.updateUser({ image: avatarUrl ?? "" });

      if (result.error) {
        toast.warning(result.error.message ?? "Avatar saved but account image sync failed");
      }

      toast.success("Profile image updated");
      return true;
    } catch {
      toast.error("Failed to upload profile image");
      return false;
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const removeAvatar = async () => {
    setIsUploadingAvatar(true);

    try {
      await removeAvatarMutation();

      const result = await authClient.updateUser({ image: "" });

      if (result.error) {
        toast.error(result.error.message ?? "Failed to remove profile image");
        return false;
      }

      toast.success("Profile image removed");
      return true;
    } catch {
      toast.error("Failed to remove profile image");
      return false;
    } finally {
      setIsUploadingAvatar(false);
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
    isUploadingAvatar,
    uploadAvatar,
    removeAvatar,
    isChangingPassword,
    canChangePassword,
    changePassword,
  };
}
