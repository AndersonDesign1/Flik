import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/50 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm">
          <span className="rounded-full bg-primary-violet px-2 py-0.5 font-medium text-white text-xs">
            New
          </span>
          <span className="text-muted-foreground">
            Instant payouts now available
          </span>
          <ArrowRight className="size-3 text-muted-foreground" />
        </div>

        <div className="flex w-full flex-col gap-6">
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
            The platform for{" "}
            <span className="text-primary-violet">digital creators</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl">
            Sell digital products, memberships, and services with the most
            creator-friendly platform. No monthly fees. Just 5% per transaction.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
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

        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-6 border-border border-y py-8 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-12">
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

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 pt-16">
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary-violet/10">
            <Image
              alt="Dashboard screenshot showing analytics and revenue overview"
              className="w-full"
              height={600}
              priority
              src="/sample.webp"
              width={1200}
            />
          </div>
          <div className="absolute -right-8 -bottom-8 -left-8 -z-10 h-32 rounded-3xl bg-gradient-to-r from-primary-violet-50 via-secondary-magenta-50 to-primary-violet-50 blur-2xl" />
        </div>

        <div className="flex w-full flex-col items-center gap-8 text-center">
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
