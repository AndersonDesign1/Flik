"use client";

import { Check, HelpCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const PLANS = [
  { key: "starter", name: "Starter" },
  { key: "pro", name: "Pro" },
  { key: "business", name: "Business" },
] as const;

interface Feature {
  name: string;
  description: string;
  starter: boolean | string;
  pro: boolean | string;
  business: boolean | string;
}

interface FeatureSection {
  category: string;
  features: Feature[];
}

const FEATURES_COMPARISON: FeatureSection[] = [
  {
    category: "Storefront",
    features: [
      {
        name: "Unlimited Products",
        description:
          "List as many products as you want without any restrictions.",
        starter: true,
        pro: true,
        business: true,
      },
      {
        name: "Secure Checkout",
        description:
          "Lightning-fast, optimized checkout experience for your customers.",
        starter: true,
        pro: true,
        business: true,
      },
      {
        name: "Custom Themes",
        description:
          "Personalize your storefront with custom colors and layout options.",
        starter: false,
        pro: "Basic",
        business: "Advanced",
      },
      {
        name: "Custom Domain",
        description:
          "Connect your own domain name (e.g., store.yourbrand.com).",
        starter: false,
        pro: true,
        business: true,
      },
      {
        name: "White-label Store",
        description: "Remove all Flik branding for a fully custom experience.",
        starter: false,
        pro: "Basic",
        business: true,
      },
    ],
  },
  {
    category: "Payments & Payouts",
    features: [
      {
        name: "Transaction Fee",
        description:
          "Small percentage fee on each sale to cover platform costs.",
        starter: "7%",
        pro: "5%",
        business: "3%",
      },
      {
        name: "Standard Payouts",
        description: "Regular payout schedule to your connected bank account.",
        starter: true,
        pro: true,
        business: true,
      },
      {
        name: "Flik-Speed™ Payouts",
        description:
          "Get your money in minutes, not days, with instant payouts.",
        starter: false,
        pro: true,
        business: true,
      },
      {
        name: "Multi-currency Support",
        description: "Sell to customers worldwide in over 135+ currencies.",
        starter: true,
        pro: true,
        business: true,
      },
      {
        name: "Tax Handling",
        description:
          "Automatic tax calculation and compliance for global sales.",
        starter: true,
        pro: true,
        business: true,
      },
    ],
  },
  {
    category: "Marketing & Growth",
    features: [
      {
        name: "Discount Codes",
        description: "Create custom percentage or fixed-amount discount codes.",
        starter: true,
        pro: true,
        business: true,
      },
      {
        name: "Affiliate Program",
        description:
          "Let others promote your products in exchange for a commission.",
        starter: false,
        pro: true,
        business: true,
      },
      {
        name: "Email Marketing Tool",
        description:
          "Send automated emails to your customers directly from Flik.",
        starter: false,
        pro: true,
        business: true,
      },
      {
        name: "Upsells & Cross-sells",
        description:
          "Recommend related products to increase your average order value.",
        starter: false,
        pro: true,
        business: true,
      },
      {
        name: "Bundles",
        description: "Group multiple products together for a discounted price.",
        starter: false,
        pro: true,
        business: true,
      },
    ],
  },
  {
    category: "Support & Maintenance",
    features: [
      {
        name: "Email Support",
        description:
          "Get help from our expert support team whenever you need it.",
        starter: "Standard",
        pro: "Priority",
        business: "24/7 Dedicated",
      },
      {
        name: "API Access",
        description:
          "Programmatically interact with your store using our REST API.",
        starter: false,
        pro: false,
        business: true,
      },
      {
        name: "Webhooks",
        description:
          "Real-time notifications for events like new sales or payouts.",
        starter: false,
        pro: false,
        business: true,
      },
      {
        name: "Audit Logs",
        description:
          "Detailed history of all actions performed in your account.",
        starter: false,
        pro: false,
        business: true,
      },
    ],
  },
];

function FeatureValue({
  value,
  className,
}: {
  value: boolean | string;
  className?: string;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className={cn("size-4 text-primary-violet md:size-5", className)}
      />
    ) : (
      <span className="text-muted-foreground/50">—</span>
    );
  }
  return (
    <span
      className={cn(
        "font-medium text-foreground text-xs md:text-sm",
        className
      )}
    >
      {value}
    </span>
  );
}

function MobileFeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-4 text-primary-violet" />
    ) : (
      <span className="text-muted-foreground/50">—</span>
    );
  }
  return <span className="font-medium text-foreground text-sm">{value}</span>;
}

// Mobile compact layout component
function MobileComparisonTable() {
  return (
    <div className="flex flex-col lg:hidden">
      {FEATURES_COMPARISON.map((section, sectionIndex) => (
        <div key={section.category}>
          {/* Category Header */}
          <div
            className={`border-border border-y bg-muted/30 px-4 py-3 ${sectionIndex > 0 ? "mt-6" : ""}`}
          >
            <span className="font-bold text-primary-violet text-xs uppercase tracking-[0.15em]">
              {section.category}
            </span>
          </div>

          {/* Features in this category */}
          {section.features.map((feature, featureIndex) => (
            <div
              className={`border-border ${featureIndex < section.features.length - 1 ? "border-b" : ""}`}
              key={feature.name}
            >
              {/* Feature Name Header */}
              <div className="flex items-center gap-2 border-border border-b bg-muted/10 px-4 py-3">
                <span className="font-semibold text-foreground text-sm">
                  {feature.name}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="inline-flex cursor-help items-center text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                        type="button"
                      >
                        <HelpCircle className="size-3.5" />
                        <span className="sr-only">Explain {feature.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      className="max-w-[200px] border bg-popover text-center text-popover-foreground shadow-sm"
                      sideOffset={8}
                    >
                      <p>{feature.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Plan rows for this feature */}
              {PLANS.map((plan) => (
                <div
                  className="flex items-center justify-between border-border border-b px-4 py-2.5 last:border-b-0"
                  key={plan.key}
                >
                  <span className="text-muted-foreground text-sm">
                    {plan.name}
                  </span>
                  <MobileFeatureValue
                    value={
                      feature[
                        plan.key as keyof Omit<Feature, "name" | "description">
                      ]
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Desktop table layout component
function DesktopComparisonTable() {
  return (
    <div className="hidden w-full lg:block">
      <Table className="w-full table-fixed border-collapse text-left">
        <TableHeader>
          <TableRow className="border-border border-b-2 hover:bg-transparent">
            <TableHead className="w-[280px] py-10 font-bold text-foreground text-xl">
              Features
            </TableHead>
            <TableHead className="w-[120px] py-10 text-center font-bold text-foreground text-xl">
              Starter
            </TableHead>
            <TableHead className="w-[120px] py-10 text-center font-bold text-foreground text-xl">
              Pro
            </TableHead>
            <TableHead className="w-[120px] py-10 text-center font-bold text-foreground text-xl">
              Business
            </TableHead>
          </TableRow>
        </TableHeader>
        {FEATURES_COMPARISON.map((section) => (
          <TableBody key={section.category}>
            <TableRow className="hover:bg-transparent">
              <TableCell
                className="px-2 py-16 font-bold text-primary-violet text-sm uppercase tracking-[0.2em]"
                colSpan={4}
              >
                {section.category}
              </TableCell>
            </TableRow>
            {section.features.map((feature) => (
              <TableRow
                className="border-border border-b transition-colors hover:bg-muted/5"
                key={feature.name}
              >
                <TableCell className="py-12 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-lg">
                      {feature.name}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="inline-flex cursor-help items-center text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                            type="button"
                          >
                            <HelpCircle className="size-4" />
                            <span className="sr-only">
                              Explain {feature.name}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          className="max-w-[200px] border bg-popover text-center text-popover-foreground shadow-sm"
                          sideOffset={8}
                        >
                          <p>{feature.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>

                <TableCell className="py-12 text-center">
                  <div className="flex justify-center">
                    <FeatureValue value={feature.starter} />
                  </div>
                </TableCell>
                <TableCell className="py-12 text-center">
                  <div className="flex justify-center">
                    <FeatureValue value={feature.pro} />
                  </div>
                </TableCell>
                <TableCell className="py-12 text-center">
                  <div className="flex justify-center">
                    <FeatureValue value={feature.business} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ))}
      </Table>
    </div>
  );
}

export function PricingComparisonTable() {
  return (
    <>
      <MobileComparisonTable />
      <DesktopComparisonTable />
    </>
  );
}
