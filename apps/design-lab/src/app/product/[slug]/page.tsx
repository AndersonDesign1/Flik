import {
  FinalCtaSection,
  ProductHero,
  ProductSupportSection,
  TestimonialSection,
} from "@/components/design-lab/sections";
import { PublicFooter, PublicHeader } from "@/components/design-lab/site-shell";
import { productDetails } from "@/lib/mock-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const detail =
    productDetails[slug as keyof typeof productDetails] ??
    productDetails["notion-brand-kit"];

  return (
    <>
      <PublicHeader />
      <main className="pb-10">
        <ProductHero {...detail} />
        <ProductSupportSection />
        <TestimonialSection />
        <FinalCtaSection />
      </main>
      <PublicFooter />
    </>
  );
}
