import { FeatureGrid } from "@/components/marketing/feature-grid";
import { FAQ } from "@/components/storefront/faq";
import { FinalCTA } from "@/components/storefront/final-cta";
import { Hero } from "@/components/storefront/hero";
import { Pricing } from "@/components/storefront/pricing";
import { Testimonials } from "@/components/storefront/testimonials";

export default function StorefrontPage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <FeatureGrid />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
