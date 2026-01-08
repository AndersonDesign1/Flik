"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OnboardingOption {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

interface OnboardingStepProps {
  title: string;
  subtitle: string;
  options: OnboardingOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  currentStep: number;
  totalSteps: number;
}

export function OnboardingStep({
  title,
  subtitle,
  options,
  selectedId,
  onSelect,
  currentStep,
  totalSteps,
}: OnboardingStepProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-2xl flex-col gap-8"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Progress indicator */}
      <div
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
        aria-valuemax={totalSteps}
        aria-valuemin={1}
        aria-valuenow={currentStep + 1}
        className="flex items-center justify-center gap-2"
        role="progressbar"
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepId = `step-${currentStep >= index ? "completed" : "pending"}-${totalSteps}`;
          const getStepClass = () => {
            if (index === currentStep) {
              return "w-8 bg-primary-violet";
            }
            if (index < currentStep) {
              return "w-2 bg-primary-violet/60";
            }
            return "w-2 bg-border";
          };
          return (
            <div
              aria-hidden="true"
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                getStepClass()
              )}
              // biome-ignore lint/suspicious/noArrayIndexKey: Static progress indicator that never reorders
              key={`${stepId}-${index}`}
            />
          );
        })}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>

      {/* Options */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <motion.button
            animate={{
              borderColor:
                selectedId === option.id
                  ? "var(--primary-violet)"
                  : "var(--border)",
            }}
            className={cn(
              "group relative flex flex-col items-center gap-4 rounded-2xl border-2 p-6 text-center transition-all duration-200",
              selectedId === option.id
                ? "bg-primary-violet-50/50 shadow-primary-violet/5 shadow-sm"
                : "bg-card hover:border-primary-violet/50 hover:shadow-md"
            )}
            initial={false}
            key={option.id}
            onClick={() => onSelect(option.id)}
            transition={{ duration: 0.2 }}
            type="button"
            whileTap={{ scale: 0.98 }}
          >
            {/* Selection indicator */}
            <div
              className={cn(
                "absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border-2 transition-all duration-200",
                selectedId === option.id
                  ? "border-primary-violet bg-primary-violet"
                  : "border-border bg-transparent"
              )}
            >
              {selectedId === option.id && (
                <motion.svg
                  animate={{ scale: 1, rotate: 0 }}
                  aria-label="Selected"
                  className="size-3 text-white"
                  fill="none"
                  initial={{ scale: 0, rotate: -45 }}
                  role="img"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  viewBox="0 0 24 24"
                >
                  <title>Selected</title>
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              )}
            </div>

            {/* Icon */}
            <motion.div
              animate={{
                scale: selectedId === option.id ? [1, 1.15, 1] : 1,
              }}
              className={cn(
                "flex size-14 items-center justify-center rounded-xl transition-colors duration-200",
                selectedId === option.id
                  ? "bg-primary-violet text-white"
                  : "bg-muted text-muted-foreground group-hover:bg-primary-violet-50 group-hover:text-primary-violet"
              )}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              {option.icon}
            </motion.div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-foreground">{option.title}</h3>
              <p className="text-muted-foreground text-sm">
                {option.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
