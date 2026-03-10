import { EditProductForm } from "@/components/dashboard/products/edit-product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  return <EditProductForm productId={id} />;
}
