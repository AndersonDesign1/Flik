import {
  CollectionGrid,
  DiscoverHero,
  FinalCtaSection,
  ProductGridSection,
  TestimonialSection,
} from "@/components/design-lab/sections";
import { PublicFooter, PublicHeader } from "@/components/design-lab/site-shell";

export default function DiscoverPage() {
  return (
    <>
      <PublicHeader />
      <main className="pb-10">
        <DiscoverHero />
        <CollectionGrid />
        <ProductGridSection />
        <TestimonialSection />
        <FinalCtaSection />
      </main>
      <PublicFooter />
    </>
  );
}
