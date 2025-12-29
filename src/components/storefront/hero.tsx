import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-12 lg:pt-32 lg:pb-20">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gray-900/5 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        {/* Announcement Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm shadow-sm">
          <span className="rounded-full bg-gray-900 px-2 py-0.5 font-medium text-white text-xs">
            New
          </span>
          <span className="text-gray-600">Instant payouts now available</span>
          <ArrowRight className="h-3 w-3 text-gray-400" />
        </div>

        {/* Headline */}
        <h1 className="font-bold text-4xl text-gray-900 tracking-tight sm:text-5xl lg:text-6xl">
          The platform for{" "}
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            digital creators
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-gray-600 text-lg lg:text-xl">
          Sell digital products, memberships, and services with the most
          creator-friendly platform. No monthly fees. Just 5% per transaction.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-full bg-gray-900 px-8 font-medium text-white hover:bg-gray-800"
            size="lg"
          >
            <Link href="/signup">Start selling today</Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full border-gray-300 px-8 font-medium"
            size="lg"
            variant="outline"
          >
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-gray-200 border-y py-8">
          <div className="text-center">
            <p className="font-bold text-3xl text-gray-900">$50M+</p>
            <p className="mt-1 text-gray-500 text-sm">Paid to creators</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-3xl text-gray-900">100K+</p>
            <p className="mt-1 text-gray-500 text-sm">Creators</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-3xl text-gray-900">2M+</p>
            <p className="mt-1 text-gray-500 text-sm">Products sold</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-3xl text-gray-900">99.9%</p>
            <p className="mt-1 text-gray-500 text-sm">Uptime</p>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="mx-auto mt-16 max-w-6xl">
        <div className="relative">
          {/* Browser chrome */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
            {/* Browser header */}
            <div className="flex items-center gap-2 border-gray-100 border-b bg-gray-50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto max-w-md rounded-md bg-white px-4 py-1.5 text-center text-gray-400 text-xs">
                  app.overlay.com/dashboard
                </div>
              </div>
            </div>
            {/* Dashboard preview - simplified version */}
            <div className="bg-gray-50 p-6">
              <div className="grid gap-4 md:grid-cols-4">
                {/* Metric cards */}
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
                    className="rounded-xl border border-gray-200 bg-white p-4"
                    key={metric.label}
                  >
                    <p className="text-gray-500 text-xs">{metric.label}</p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <p className="font-bold text-gray-900 text-xl">
                        {metric.value}
                      </p>
                      <span className="font-medium text-green-600 text-xs">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Chart placeholder */}
              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-medium text-gray-900 text-sm">
                    Revenue Overview
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600 text-xs">
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
                      className="flex-1 rounded-t-md bg-gray-900"
                      key={bar.day}
                      style={{ height: `${bar.height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Decorative gradient behind */}
          <div className="absolute -right-8 -bottom-8 -left-8 -z-10 h-32 rounded-3xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 blur-2xl" />
        </div>
      </div>

      {/* Trusted by logos */}
      <div className="mx-auto mt-24 max-w-4xl text-center">
        <p className="mb-8 font-medium text-gray-400 text-sm uppercase tracking-widest">
          Trusted by creators at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {["OpenAI", "Linear", "Figma", "Vercel", "Notion", "Stripe"].map(
            (company) => (
              <span
                className="font-semibold text-gray-400 text-xl"
                key={company}
              >
                {company}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
