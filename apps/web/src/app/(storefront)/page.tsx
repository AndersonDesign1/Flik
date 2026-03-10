import dynamic from "next/dynamic";
import { Hero } from "@/components/storefront/hero";

const FeatureGrid = dynamic(() =>
  import("@/components/marketing/feature-grid").then((mod) => mod.FeatureGrid)
);
const FAQ = dynamic(() =>
  import("@/components/storefront/faq").then((mod) => mod.FAQ)
);
const FinalCTA = dynamic(() =>
  import("@/components/storefront/final-cta").then((mod) => mod.FinalCTA)
);
const Testimonials = dynamic(() =>
  import("@/components/storefront/testimonials").then((mod) => mod.Testimonials)
);

export default function StorefrontPage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <FeatureGrid />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
