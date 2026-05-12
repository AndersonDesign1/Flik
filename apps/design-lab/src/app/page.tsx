import {
  FeatureStorySection,
  FinalCtaSection,
  LandingHero,
  LogoCloudSection,
  StatsBandSection,
  TestimonialSection,
} from "@/components/design-lab/sections";
import { PublicFooter, PublicHeader } from "@/components/design-lab/site-shell";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="pb-10">
        <LandingHero />
        <LogoCloudSection />
        <FeatureStorySection />
        <StatsBandSection />
        <TestimonialSection />
        <FinalCtaSection />
      </main>
      <PublicFooter />
    </>
  );
}
