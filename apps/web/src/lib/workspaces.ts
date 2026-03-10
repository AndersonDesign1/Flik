export type UserType = "buyer" | "seller" | "both";

export function canAccessSellerWorkspace(userType?: string | null): boolean {
  return userType === "seller" || userType === "both";
}

export function getNextUserTypeForStore(userType?: string | null): UserType {
  if (userType === "both" || userType === "seller") {
    return userType;
  }

  if (userType === "buyer") {
    return "both";
  }

  return "seller";
}
