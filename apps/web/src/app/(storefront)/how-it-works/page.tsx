import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "How It Works | Flik",
  description: "Learn how to launch your digital store in minutes with Flik.",
};

const STEPS = [
  {
    number: "01",
    title: "Upload your product",
    description:
      "Launch anything from individual downloads to recurring memberships and professional services.",
  },
  {
    number: "02",
    title: "Customize your store",
    description:
      "Choose your colors, add your logo, and set your price. No coding required—ever.",
  },
  {
    number: "03",
    title: "Start selling in a Flik",
    description:
      "Share your link and start getting paid. We handle the payments, delivery, and support.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col gap-24 pt-24 pb-12 lg:pt-32 lg:pb-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
          From idea to income.{" "}
          <span className="text-primary-violet">Just like that.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
          Flik is designed for speed. We've removed every barrier between your
          creativity and your first sale.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            asChild
            className="h-12 rounded-full px-8 text-base"
            size="lg"
          >
            <Link href="/signup">Launch your store</Link>
          </Button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {STEPS.map((step) => (
            <div className="relative flex flex-col gap-6" key={step.number}>
              <span className="font-bold text-6xl text-primary-violet/10 tabular-nums">
                {step.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-2xl text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof/Trust Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8">
              <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
                The fastest path to your first $1,000 online.
              </h2>
              <ul className="flex flex-col gap-4">
                {[
                  "No monthly subscription fees",
                  "Instant payouts (Flik-Speed™)",
                  "Automatic world-wide tax handling",
                  "Built-in fraud protection",
                ].map((item) => (
                  <li
                    className="flex items-center gap-3 text-lg text-muted-foreground"
                    key={item}
                  >
                    <CheckCircle2 className="size-6 text-primary-violet" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex">
                <Button
                  asChild
                  className="h-12 rounded-full px-8 font-medium"
                  variant="outline"
                >
                  <Link className="flex items-center gap-2" href="/signup">
                    Get started for free <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary-violet/10">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-violet-50/50 to-transparent">
                  <span className="animate-pulse font-medium text-muted-foreground">
                    Demo Video Placeholder
                  </span>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 -left-8 -z-10 h-32 rounded-3xl bg-gradient-to-r from-primary-violet-50 via-secondary-magenta-50 to-primary-violet-50 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
