import { Check, HelpCircle, Info } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/storefront/faq";
import { FinalCTA } from "@/components/storefront/final-cta";
import { Button } from "@/components/ui/button";
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

export const metadata = {
  title: "Pricing | Flik",
  description:
    "Simple, transparent pricing for creators of all sizes. Choose a plan that fits your ambition.",
};

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for new creators launching their first products.",
    price: "$0",
    period: "/month",
    fee: "7% per transaction",
    features: [
      "Unlimited products",
      "Secure checkout",
      "Instant digital delivery",
      "Basic analytics dashboard",
      "Email support",
      "Standard payouts",
    ],
    cta: "Start Selling for Free",
    href: "/signup",
    popular: false,
    color: "violet",
  },
  {
    name: "Pro",
    description: "For growing creators who want more control and lower fees.",
    price: "$29",
    period: "/month",
    fee: "5% per transaction",
    features: [
      "Everything in Starter",
      "Flik-Speed™ Payouts",
      "Custom branding & themes",
      "Custom domain support",
      "Basic white-labeled store",
      "Affiliate marketing tools",
      "Advanced analytics & export",
      "Priority email support",
      "Discount & coupon codes",
      "Abandoned cart recovery",
    ],

    cta: "Start 14-day Free Trial",
    href: "/signup",
    popular: true,
    color: "magenta",
  },
  {
    name: "Business",
    description: "For high-volume sellers and professional creative teams.",
    price: "$79",
    period: "/month",
    fee: "3% per transaction",
    features: [
      "Everything in Pro",
      "Team member access",
      "API & Webhook access",
      "Dedicated account manager",
      "SSO & SAML support",
      "White-label storefront",
      "Early access to new features",
    ],
    cta: "Scale Your Business",
    href: "/signup",
    popular: false,
    color: "dark",
  },
];

const FEATURES_COMPARISON = [
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

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-16 pt-20 pb-12 sm:gap-24 lg:pt-32 lg:pb-24">
      {/* Hero */}
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h1 className="font-bold text-3xl text-foreground tracking-tight sm:text-5xl lg:text-7xl">
          Simple pricing for{" "}
          <span className="text-primary-violet">limitless creators.</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:mt-8 sm:text-lg lg:text-xl">
          Scale from your first sale to your first million without the
          complexity. No hidden fees. Every feature is built for speed.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              className={`relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:bg-primary-violet-50 sm:rounded-3xl sm:p-10 ${
                plan.popular
                  ? "border-transparent ring-2 ring-primary-violet lg:scale-105"
                  : ""
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary-violet px-4 py-1 font-bold text-white text-xs uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-foreground text-xl tracking-tight sm:text-2xl">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-muted-foreground text-sm sm:mt-2 sm:text-base">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 border-border border-t pt-6 sm:mb-8 sm:pt-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="font-medium text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-1.5 font-medium text-primary-violet text-sm sm:mt-2">
                  {plan.fee}
                </p>
              </div>

              <Button
                asChild
                className={`mb-6 h-11 rounded-full font-bold transition-all sm:mb-8 sm:h-12 ${
                  plan.popular
                    ? "bg-primary-violet shadow-lg shadow-primary-violet/20 hover:bg-primary-violet/90"
                    : "border-border hover:bg-muted"
                }`}
                size="lg"
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              <ul className="flex flex-col gap-3 sm:gap-4">
                {plan.features.map((feature) => (
                  <li
                    className="flex items-start gap-2.5 sm:gap-3"
                    key={feature}
                  >
                    <Check
                      className={`mt-0.5 size-4 shrink-0 sm:size-5 ${plan.popular ? "text-primary-violet" : "text-muted-foreground"}`}
                    />
                    <span className="text-foreground/80 text-xs leading-snug sm:text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-32 lg:py-40">
        <div className="mb-12 text-center sm:mb-24">
          <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
            Compare every feature
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl">
            See exactly what's included in each plan.
          </p>
        </div>

        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[640px]">
            <Table className="w-full table-fixed border-collapse text-left">
              <TableHeader>
                <TableRow className="border-border border-b-2 hover:bg-transparent">
                  <TableHead className="w-[35%] py-6 font-bold text-base text-foreground sm:w-[40%] sm:py-10 sm:text-xl">
                    Features
                  </TableHead>
                  <TableHead className="w-[21.67%] py-6 text-center font-bold text-base text-foreground sm:w-[20%] sm:py-10 sm:text-xl">
                    Starter
                  </TableHead>
                  <TableHead className="w-[21.67%] py-6 text-center font-bold text-base text-foreground sm:w-[20%] sm:py-10 sm:text-xl">
                    Pro
                  </TableHead>
                  <TableHead className="w-[21.67%] py-6 text-center font-bold text-base text-foreground sm:w-[20%] sm:py-10 sm:text-xl">
                    Business
                  </TableHead>
                </TableRow>
              </TableHeader>
              {FEATURES_COMPARISON.map((section) => (
                <TableBody key={section.category}>
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      className="px-1 py-8 font-bold text-primary-violet text-xs uppercase tracking-[0.15em] sm:px-2 sm:py-16 sm:text-sm sm:tracking-[0.2em]"
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
                      <TableCell className="py-6 pr-3 sm:py-12 sm:pr-6">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-semibold text-foreground text-sm sm:text-lg">
                            {feature.name}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="inline-flex cursor-help items-center text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                                  type="button"
                                >
                                  <HelpCircle className="size-3.5 sm:size-4" />
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

                      <TableCell className="py-6 text-center sm:py-12">
                        <FeatureValue value={feature.starter} />
                      </TableCell>
                      <TableCell className="py-6 text-center sm:py-12">
                        <FeatureValue value={feature.pro} />
                      </TableCell>
                      <TableCell className="py-6 text-center sm:py-12">
                        <FeatureValue value={feature.business} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ))}
            </Table>
          </div>
        </div>
      </div>

      {/* Enterprise / Special Case */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:rounded-3xl sm:p-12 lg:p-16">
          <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:gap-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary-violet/10 sm:size-16 sm:rounded-2xl">
              <Info className="size-6 text-primary-violet sm:size-8" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
              <h2 className="font-bold text-foreground text-xl tracking-tight sm:text-3xl">
                Need something special?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-lg">
                For high-volume sellers (over $1M/year), non-profits, or
                educational institutions, we offer custom transaction rates and
                dedicated support structures.
              </p>
            </div>
            <Button
              asChild
              className="h-10 rounded-full px-6 sm:h-12 sm:px-8"
              size="lg"
              variant="outline"
            >
              <Link href="/contact">Contact Our Sales Team</Link>
            </Button>
          </div>
          <div className="absolute top-0 right-0 hidden h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-violet/5 blur-3xl sm:block" />
          <div className="absolute bottom-0 left-0 hidden h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-violet/5 blur-3xl sm:block" />
        </div>
      </div>

      <FAQ />
      <FinalCTA />
    </div>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex justify-center">
        <Check className="size-4 text-primary-violet sm:size-5" />
      </div>
    ) : null;
  }
  return (
    <span className="font-medium text-foreground text-xs sm:text-sm">
      {value}
    </span>
  );
}
