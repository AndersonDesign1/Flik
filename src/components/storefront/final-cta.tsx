import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-violet-800 to-primary-violet-900 p-12 text-center lg:p-16">
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-bold text-3xl text-white tracking-tight sm:text-4xl">
              Ready to start selling?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-primary-violet-200">
              Join over 100,000 creators already earning with Overlay. Get
              started in minutes.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-white px-8 font-medium text-primary-violet-900 hover:bg-primary-violet-50"
                size="lg"
              >
                <Link className="inline-flex items-center gap-2" href="/signup">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full border-white/30 bg-transparent px-8 font-medium text-white hover:bg-white/10"
                size="lg"
                variant="outline"
              >
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>

            <p className="text-primary-violet-300 text-sm">
              No credit card required • Free forever on Starter plan
            </p>
          </div>

          <div className="absolute top-0 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-magenta/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 size-64 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-teal/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
