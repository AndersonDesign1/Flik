import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/storefront/hero";

export default function StorefrontPage() {
  return (
    <div className="overflow-hidden">
      <Hero />

      <div className="mx-auto max-w-7xl space-y-32 px-6 pb-24">
        {/* Trusted By */}
        <section className="space-y-8 text-center">
          <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
            Trusted by 10,000+ creators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {/* Dummy Logo Placeholders - replace with SVGs later if needed */}
            <div className="h-8 w-32 rounded bg-foreground/20" />
            <div className="h-8 w-24 rounded bg-foreground/20" />
            <div className="h-10 w-10 rounded-full bg-foreground/20" />
            <div className="h-8 w-36 rounded bg-foreground/20" />
            <div className="h-8 w-28 rounded bg-foreground/20" />
          </div>
        </section>

        {/* Feature Grid */}
        <section className="space-y-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
              Everything you need to scale.
            </h2>
            <p className="text-lg text-muted-foreground">
              Focus on your product. We handle the billing, licensing, and
              global compliance.
            </p>
          </div>

          <FeatureGrid />
        </section>

        {/* Simple CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-12 text-center">
          <div className="relative z-10 space-y-6">
            <h2 className="font-bold text-3xl">Ready to start selling?</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Join the platform that powers the next generation of digital
              creators. No monthly fees. Just 5% per transaction.
            </p>
            <button
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90"
              type="button"
            >
              Get Started Now
            </button>
          </div>
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        </section>
      </div>
    </div>
  );
}
