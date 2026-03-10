"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { SPRING_PHYSICS } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface SplitViewProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function SplitView({
  children,
  sidebar,
  isOpen,
  onClose,
  className,
}: SplitViewProps) {
  return (
    <div className={cn("flex h-full w-full overflow-hidden", className)}>
      {/* Main Content Area */}
      <motion.div
        animate={{
          width: isOpen ? "60%" : "100%",
          paddingRight: isOpen ? "1.5rem" : "0",
        }}
        className="flex h-full min-w-0 flex-1 flex-col overflow-hidden"
        layout
        transition={SPRING_PHYSICS.default}
      >
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </motion.div>

      {/* Sidebar / Detail Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col overflow-hidden rounded-xl border border-border/40 bg-surface-1 shadow-lg"
            exit={{ x: "100%", opacity: 0 }}
            initial={{ x: "100%", opacity: 0 }}
            style={{ width: "40%", minWidth: "400px" }}
            transition={SPRING_PHYSICS.default}
          >
            <div className="flex items-center justify-between border-border/30 border-b bg-surface-2/30 px-6 py-4">
              <span className="font-semibold text-foreground text-sm">
                Details
              </span>
              <Button
                className="h-8 w-8"
                onClick={onClose}
                size="icon"
                variant="ghost"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{sidebar}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
