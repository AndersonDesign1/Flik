"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Mail,
  Package,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserType = "seller" | "buyer" | "both";

interface OnboardingOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  userType?: UserType;
}

interface StepData {
  title: string;
  subtitle: string;
  options: OnboardingOption[];
  multiSelect?: boolean;
}

const STEPS: StepData[] = [
  {
    title: "What brings you to Overlay?",
    subtitle: "We'll personalize your experience based on your goals",
    options: [
      {
        id: "sell",
        icon: <Package className="size-6" />,
        title: "I want to sell",
        userType: "seller",
      },
      {
        id: "buy",
        icon: <ShoppingBag className="size-6" />,
        title: "I want to discover",
        userType: "buyer",
      },
      {
        id: "both",
        icon: <Sparkles className="size-6" />,
        title: "Both",
        userType: "both",
      },
    ],
  },
  {
    title: "Which model best describes your offer?",
    subtitle: "This helps us tailor your dashboard and tools",
    options: [
      {
        id: "courses",
        icon: <BookOpen className="size-6" />,
        title: "Coaching and courses",
      },
      {
        id: "agency",
        icon: <Briefcase className="size-6" />,
        title: "Agency services",
      },
      {
        id: "digital",
        icon: <Package className="size-6" />,
        title: "Digital products",
      },
      {
        id: "events",
        icon: <Calendar className="size-6" />,
        title: "Events",
      },
      {
        id: "newsletter",
        icon: <Mail className="size-6" />,
        title: "Newsletter",
      },
      {
        id: "physical",
        icon: <Store className="size-6" />,
        title: "Physical products",
      },
    ],
    multiSelect: true,
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<
    Record<number, string | string[]>
  >({});

  const currentStepData = STEPS[currentStep];
  const currentSelection = selections[currentStep];
  const isMultiSelect = currentStepData.multiSelect ?? false;
  const isLastStep = currentStep === STEPS.length - 1;

  // Check if current step has valid selection
  const hasSelection = isMultiSelect
    ? Array.isArray(currentSelection) && currentSelection.length > 0
    : currentSelection !== undefined;
  const canContinue = hasSelection;

  // Check if user selected "buyer" in step 0 - skip step 2 for buyers
  const isBuyerPath = selections[0] === "buy";

  // Helper to check if an option is selected
  const isSelected = (optionId: string) => {
    if (isMultiSelect) {
      return (
        Array.isArray(currentSelection) && currentSelection.includes(optionId)
      );
    }
    return currentSelection === optionId;
  };

  const handleSelect = (id: string) => {
    if (isMultiSelect) {
      setSelections((prev) => {
        const current = prev[currentStep];
        const currentArray = Array.isArray(current) ? current : [];
        const isAlreadySelected = currentArray.includes(id);
        const newSelection = isAlreadySelected
          ? currentArray.filter((i) => i !== id)
          : [...currentArray, id];
        return { ...prev, [currentStep]: newSelection };
      });
    } else {
      setSelections((prev) => ({ ...prev, [currentStep]: id }));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    // If buyer, skip to signup after first step
    if (currentStep === 0 && isBuyerPath) {
      router.push("/signup?userType=buyer");
      return;
    }

    if (isLastStep) {
      // Determine user type from selections
      const firstSelection = selections[0] as string;
      const selectedOption = STEPS[0].options.find(
        (opt) => opt.id === firstSelection
      );
      const userType = selectedOption?.userType ?? "seller";

      // Redirect to signup with user type
      router.push(`/signup?userType=${userType}`);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    router.push("/signup");
  };

  // Calculate progress percentage
  const totalSteps = isBuyerPath ? 1 : STEPS.length;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/20 to-transparent blur-3xl dark:from-primary-violet-900/10" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[600px] rounded-full bg-gradient-to-t from-secondary-magenta-100/10 to-transparent blur-3xl dark:from-secondary-magenta-900/5" />
      </div>

      {/* Header with progress */}
      <div className="flex items-center gap-4 px-6 py-4">
        {currentStep > 0 ? (
          <button
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={handleBack}
            type="button"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : (
          <Link
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            href="/"
          >
            <ArrowLeft className="size-5" />
          </Link>
        )}

        {/* Progress bar */}
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            className="h-full rounded-full bg-primary-violet"
            initial={{ width: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full max-w-3xl flex-col items-center gap-10"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
            key={currentStep}
            transition={{ duration: 0.3 }}
          >
            {/* Title */}
            <div className="flex flex-col gap-2 text-center">
              <h1 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
                {currentStepData.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Options grid */}
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
              {currentStepData.options.map((option, index) => {
                const selected = isSelected(option.id);
                return (
                  <motion.button
                    animate={{
                      borderColor: selected
                        ? "var(--primary-violet)"
                        : "var(--border)",
                    }}
                    className={cn(
                      "group relative flex flex-col items-center gap-4 rounded-2xl border-2 bg-card p-6 text-center transition-all duration-200",
                      selected
                        ? "bg-primary-violet-50 shadow-primary-violet/5 shadow-sm dark:bg-primary-violet-50/10"
                        : "hover:border-primary-violet/50 hover:shadow-md"
                    )}
                    initial={false}
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    transition={{ duration: 0.2 }}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: selected ? [1, 1.15, 1] : 1,
                      }}
                      className={cn(
                        "flex size-14 items-center justify-center rounded-xl transition-colors duration-200",
                        selected
                          ? "bg-primary-violet text-white"
                          : "bg-muted text-muted-foreground group-hover:bg-primary-violet-50 group-hover:text-primary-violet"
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        duration: 0.4,
                      }}
                    >
                      {option.icon}
                    </motion.div>

                    {/* Title */}
                    <span className="font-medium text-foreground">
                      {option.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-20 flex items-center justify-between border-border border-t bg-background/80 px-6 py-4 backdrop-blur-md sm:bg-card/50">
        <button
          className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          onClick={handleSkip}
          type="button"
        >
          Skip for now
        </button>

        <Button
          className={cn(
            "gap-2 rounded-full px-6 transition-all duration-300",
            canContinue
              ? "bg-primary-violet text-white shadow-md shadow-primary-violet/25 hover:bg-primary-violet-700"
              : "opacity-50"
          )}
          disabled={!canContinue}
          onClick={handleContinue}
          size="lg"
          type="button"
        >
          Continue
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
