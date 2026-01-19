import { Check, Info } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/storefront/faq";
import { FinalCTA } from "@/components/storefront/final-cta";
import { PricingComparisonTable } from "@/components/storefront/pricing-comparison-table";
import { Button } from "@/components/ui/button";

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

        <PricingComparisonTable />
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
