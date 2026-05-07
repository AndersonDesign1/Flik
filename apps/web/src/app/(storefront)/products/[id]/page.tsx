import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import {
  PublicProductDetail,
  type PublicProductDetailData,
} from "@/components/storefront/public-product-detail";
import { api } from "../../../../../convex/_generated/api";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: slugOrId } = await params;
  const product = await fetchQuery(api.products.getPublicProductBySlug, {
    slugOrId,
  });

  if (!product) {
    notFound();
  }

  return <PublicProductDetail product={product as PublicProductDetailData} />;
}
