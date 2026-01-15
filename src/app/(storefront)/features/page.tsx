import { FeatureDetailSection } from "@/components/marketing/feature-detail-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { FeatureHero } from "@/components/marketing/feature-hero";
import { IntegrationShowcase } from "@/components/marketing/integration-showcase";
import { FinalCTA } from "@/components/storefront/final-cta";

export const metadata = {
  title: "Features | Flik",
  description:
    "Explore the powerful features that make Flik the fastest way to sell digital products.",
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <FeatureHero
        badge="Platform Overview"
        subtitle="We've built Flik to be the fastest, most intuitive platform for digital creators. Discover the tools designed to help you scale without the complexity."
        title="Everything you need to scale fast."
      />

      {/* Categories & Deep Dives */}
      <div className="flex flex-col gap-8 lg:gap-16">
        {/* Category 1: Payments & Revenue */}
        <FeatureDetailSection
          category="Unified Payments"
          description="Get paid how you want, when you want. We handle the complex financial infrastructure so you can focus on building your brand."
          features={[
            "Flik-Speed Payouts (within 24 hours)",
            "Automatic Digital VAT & Sales Tax",
            "195+ Countries support",
            "Apple Pay & Google Pay ready",
          ]}
          imageAlt="Payments dashboard showing revenue and payouts"
          imagePath="/payments-mockup.png"
          title="Revenue that arrives in a Flik."
        />

        {/* Category 2: Global Operations */}
        <FeatureDetailSection
          category="Global Operations"
          description="Scale your reach across borders with confidence. Our platform adapts to your customers' locale, currency, and preferences automatically."
          features={[
            "Multi-currency conversion",
            "Localized checkout experiences",
            "Built-in Fraud Protection",
            "Automatic SEO generation",
          ]}
          imageAlt="Global map showing sales distribution"
          imagePath="/global-map-mockup.png"
          reversed
          title="Sell to anyone, anywhere on Earth."
        />

        {/* Integration Showcase */}
        <IntegrationShowcase />

        {/* Category 3: Creator Experience */}
        <FeatureDetailSection
          category="Creator Experience"
          description="Your products deserve a premium home. Our dashboard and delivery systems are crafted to be as beautiful as the products you create."
          features={[
            "Custom Domain Support",
            "Beautiful, optimized storefronts",
            "Secure File Delivery",
            "AI-Powered Growth Insights",
          ]}
          imageAlt="Clean dashboard interface for creators"
          imagePath="/creator-dashboard-mockup.png"
          title="Built for the modern digital creator."
        />
      </div>

      {/* Secondary Feature Grid for smaller details */}
      <div className="mt-20 border-border border-t">
        <FeatureGrid />
      </div>

      <FinalCTA />
    </div>
  );
}
