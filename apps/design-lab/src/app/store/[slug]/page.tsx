import {
  FinalCtaSection,
  StorefrontHero,
  StorefrontSections,
  TestimonialSection,
} from "@/components/design-lab/sections";
import { PublicFooter, PublicHeader } from "@/components/design-lab/site-shell";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: StorePageProps) {
  await params;

  return (
    <>
      <PublicHeader />
      <main className="pb-10">
        <StorefrontHero />
        <StorefrontSections />
        <TestimonialSection />
        <FinalCtaSection />
      </main>
      <PublicFooter />
    </>
  );
}
