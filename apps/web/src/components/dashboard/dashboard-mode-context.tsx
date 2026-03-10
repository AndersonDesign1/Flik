"use client";

import { createContext, useContext } from "react";
import type { DashboardDataMode } from "@/lib/dashboard-mode";

const DashboardModeContext = createContext<DashboardDataMode>("demo");

export function DashboardModeProvider({
  mode,
  children,
}: {
  mode: DashboardDataMode;
  children: React.ReactNode;
}) {
  return (
    <DashboardModeContext.Provider value={mode}>
      {children}
    </DashboardModeContext.Provider>
  );
}

export function useDashboardMode() {
  return useContext(DashboardModeContext);
}
