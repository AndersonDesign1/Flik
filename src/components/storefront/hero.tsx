import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-12 lg:pt-32 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/50 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm">
          <span className="rounded-full bg-primary-violet px-2 py-0.5 font-medium text-white text-xs">
            New
          </span>
          <span className="text-muted-foreground">
            Instant payouts now available
          </span>
          <ArrowRight className="size-3 text-muted-foreground" />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
            The platform for{" "}
            <span className="text-gradient-accent">digital creators</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl">
            Sell digital products, memberships, and services with the most
            creator-friendly platform. No monthly fees. Just 5% per transaction.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-full px-8 font-medium"
            size="lg"
          >
            <Link href="/signup">Start selling today</Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full px-8 font-medium"
            size="lg"
            variant="outline"
          >
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-border border-y py-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12 sm:gap-y-6">
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold text-3xl text-foreground">$50M+</p>
            <p className="text-muted-foreground text-sm">Paid to creators</p>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold text-3xl text-foreground">100K+</p>
            <p className="text-muted-foreground text-sm">Creators</p>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold text-3xl text-foreground">2M+</p>
            <p className="text-muted-foreground text-sm">Products sold</p>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold text-3xl text-foreground">99.9%</p>
            <p className="text-muted-foreground text-sm">Uptime</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 pt-16">
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary-violet/10">
            <div className="flex items-center gap-2 border-border border-b bg-muted px-4 py-3">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-error-red" />
                <div className="size-3 rounded-full bg-amber-400" />
                <div className="size-3 rounded-full bg-accent-teal" />
              </div>
              <div className="flex-1 pl-4">
                <div className="mx-auto max-w-md rounded-md bg-background px-4 py-1.5 text-center text-muted-foreground text-xs">
                  app.overlay.com/dashboard
                </div>
              </div>
            </div>
            <div className="bg-muted p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {[
                  {
                    label: "Total Revenue",
                    value: "$24,560",
                    change: "+12.5%",
                  },
                  { label: "Products Sold", value: "1,234", change: "+8.2%" },
                  { label: "Customers", value: "892", change: "+15.3%" },
                  { label: "Conversion", value: "4.2%", change: "+2.1%" },
                ].map((metric) => (
                  <div
                    className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3 sm:p-4"
                    key={metric.label}
                  >
                    <p className="truncate text-muted-foreground text-xs">
                      {metric.label}
                    </p>
                    <div className="flex flex-col items-baseline justify-between sm:flex-row">
                      <p className="font-bold text-base text-foreground sm:text-xl">
                        {metric.value}
                      </p>
                      <span className="font-medium text-accent-teal text-xs">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground text-sm">
                    Revenue Overview
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded-md bg-muted px-2 py-1 text-muted-foreground text-xs">
                      7 days
                    </span>
                  </div>
                </div>
                <div className="flex h-32 items-end gap-2">
                  {[
                    { day: "mon", height: 40 },
                    { day: "tue", height: 65 },
                    { day: "wed", height: 45 },
                    { day: "thu", height: 80 },
                    { day: "fri", height: 55 },
                    { day: "sat", height: 90 },
                    { day: "sun", height: 70 },
                  ].map((bar) => (
                    <div
                      className="flex-1 rounded-t-md bg-primary-violet"
                      key={bar.day}
                      style={{ height: `${bar.height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 -left-8 -z-10 h-32 rounded-3xl bg-gradient-to-r from-primary-violet-50 via-secondary-magenta-50 to-primary-violet-50 blur-2xl" />
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
          <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
            Trusted by creators at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {["OpenAI", "Linear", "Figma", "Vercel", "Notion", "Stripe"].map(
              (company) => (
                <span
                  className="font-semibold text-muted-foreground text-xl"
                  key={company}
                >
                  {company}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
