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
    <section className="px-6 py-24" id="pricing">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-medium text-gray-600 text-sm">
            Pricing
          </span>
          <h2 className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Choose a plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-gray-900 bg-white shadow-xl"
                  : "border-gray-200 bg-white"
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gray-900 px-3 py-1 font-medium text-white text-xs">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 text-xl">
                  {plan.name}
                </h3>
                <p className="mt-1 text-gray-500 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="font-bold text-4xl text-gray-900">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-1 text-gray-500 text-sm">+ {plan.fee}</p>
              </div>

              {/* CTA */}
              <Button
                asChild
                className={`mb-8 w-full ${
                  plan.popular
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "border-gray-300"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li className="flex items-center gap-3" key={feature}>
                    <Check className="h-4 w-4 text-gray-900" />
                    <span className="text-gray-600 text-sm">{feature}</span>
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
