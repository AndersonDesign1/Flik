import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const benefits = [
  "No monthly fees",
  "5% transaction fee only",
  "Instant payouts",
  "Free forever starter plan",
];

export function FinalCTA() {
  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-16">
          {/* Subtle gradient orbs */}
          <div className="pointer-events-none absolute top-0 right-0 size-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-violet/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-secondary-magenta/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            {/* Badge */}
            <span className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm">
              Join 100,000+ creators
            </span>

            {/* Main heading */}
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
                Ready to start selling?
              </h2>
              <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                Launch your digital product business today. No technical skills
                required, no upfront costs, no complicated setup.
              </p>
            </div>

            {/* Benefits grid */}
            <div className="grid w-full max-w-lg grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div
                  className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-3"
                  key={benefit}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-accent-teal" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full px-8 font-medium"
                size="lg"
              >
                <Link className="inline-flex items-center gap-2" href="/signup">
                  <Zap className="size-4" />
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full px-8 font-medium"
                size="lg"
                variant="outline"
              >
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="size-4" />
                No credit card required
              </p>
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="size-4" />
                Setup in under 5 minutes
              </p>
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="size-4" />
                Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
