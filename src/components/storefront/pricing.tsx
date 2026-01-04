import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for getting started",
    price: "$0",
    period: "/month",
    fee: "9% per transaction",
    features: [
      "Unlimited products",
      "Customer support",
      "Basic analytics",
      "Secure checkout",
      "Instant delivery",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing creators",
    price: "$19",
    period: "/month",
    fee: "5% per transaction",
    features: [
      "Everything in Starter",
      "Advanced analytics",
      "Custom branding",
      "Priority support",
      "Affiliate program",
      "Discount codes",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Business",
    description: "For established sellers",
    price: "$49",
    period: "/month",
    fee: "3% per transaction",
    features: [
      "Everything in Pro",
      "Custom domain",
      "API access",
      "Dedicated account manager",
      "SSO support",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8" id="pricing">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:mx-auto">
          <span className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm">
            Pricing
          </span>
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose a plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              className={`relative flex flex-col gap-6 rounded-2xl border p-8 ${
                plan.popular
                  ? "border-primary-violet bg-card shadow-xl ring-1 ring-primary-violet/20"
                  : "border-border bg-card"
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary-violet px-3 py-1 font-medium text-white text-xs">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-foreground text-xl">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-4xl text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm">+ {plan.fee}</p>
              </div>

              <Button
                asChild
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>

              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li className="flex items-center gap-3" key={feature}>
                    <Check className="size-4 text-accent-teal" />
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
