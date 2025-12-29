import { ArrowLeft, Download, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock product data
const PRODUCT = {
  id: "1",
  name: "Ultimate Design System",
  description:
    "A comprehensive design system with 500+ components, 50+ page templates, and full Figma source files. Perfect for building modern web applications quickly.",
  price: 49,
  originalPrice: 99,
  rating: 4.9,
  reviews: 127,
  sales: 1234,
  image: "/product-preview.png",
  seller: {
    name: "Design Studio",
    username: "designstudio",
    avatar: "DS",
  },
  features: [
    "500+ React components",
    "50+ page templates",
    "Figma source files",
    "TypeScript support",
    "Tailwind CSS",
    "Lifetime updates",
  ],
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // TODO: Fetch product by id from API
  const { id: _id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Back Link */}
      <Link
        className="mb-8 inline-flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
        href="/"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <div className="flex h-full items-center justify-center text-gray-400">
              <span className="text-6xl">🎨</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{PRODUCT.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">
                ({PRODUCT.reviews} reviews)
              </span>
              <span className="text-gray-400 text-sm">
                • {PRODUCT.sales.toLocaleString()} sales
              </span>
            </div>
            <h1 className="font-bold text-3xl text-gray-900">{PRODUCT.name}</h1>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {PRODUCT.description}
          </p>

          {/* Seller */}
          <Link
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
            href={`/store/${PRODUCT.seller.username}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-semibold text-sm text-white">
              {PRODUCT.seller.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {PRODUCT.seller.name}
              </p>
              <p className="text-gray-500 text-xs">View store →</p>
            </div>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-bold text-4xl text-gray-900">
              ${PRODUCT.price}
            </span>
            <span className="text-gray-400 text-xl line-through">
              ${PRODUCT.originalPrice}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-700 text-sm">
              {Math.round(
                ((PRODUCT.originalPrice - PRODUCT.price) /
                  PRODUCT.originalPrice) *
                  100
              )}
              % off
            </span>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Button className="h-12 flex-1 gap-2 bg-gray-900 text-white hover:bg-gray-800">
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-gray-900">
              What's included
            </h3>
            <ul className="space-y-3">
              {PRODUCT.features.map((feature) => (
                <li
                  className="flex items-center gap-3 text-gray-600"
                  key={feature}
                >
                  <Download className="h-4 w-4 text-gray-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
