"use client";

import dynamic from "next/dynamic";

const DevRoleSwitcher = dynamic(
  () => import("./role-switcher").then((mod) => mod.DevRoleSwitcher),
  { ssr: false }
);

export function DevTools() {
  if (process.env.NODE_ENV === "production") return null;
  return <DevRoleSwitcher />;
}
