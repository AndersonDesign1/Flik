"use client";

import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";

// Mock products for category
const CATEGORY_INFO: Record<string, { name: string; icon: string }> = {
  templates: { name: "Templates", icon: "📄" },
  "ui-kits": { name: "UI Kits", icon: "🎨" },
  icons: { name: "Icons", icon: "✨" },
  fonts: { name: "Fonts", icon: "🔤" },
  illustrations: { name: "Illustrations", icon: "🖼️" },
  photos: { name: "Photos", icon: "📷" },
  courses: { name: "Courses", icon: "🎓" },
  ebooks: { name: "eBooks", icon: "📚" },
};

const PRODUCTS = [
  {
    id: "1",
    name: "Ultimate Design System",
    price: 49,
    originalPrice: 99,
    rating: 4.9,
    sales: 1234,
    seller: "Design Studio",
  },
  {
    id: "2",
    name: "Dashboard UI Kit",
    price: 39,
    originalPrice: 79,
    rating: 4.8,
    sales: 890,
    seller: "Creative Assets",
  },
  {
    id: "3",
    name: "Mobile App Templates",
    price: 29,
    originalPrice: 59,
    rating: 4.7,
    sales: 567,
    seller: "App Studio",
  },
  {
    id: "4",
    name: "Icon Pack Pro",
    price: 19,
    originalPrice: 39,
    rating: 4.9,
    sales: 2100,
    seller: "Icon Foundry",
  },
  {
    id: "5",
    name: "Landing Page Kit",
    price: 34,
    originalPrice: 69,
    rating: 4.6,
    sales: 445,
    seller: "Template Hub",
  },
  {
    id: "6",
    name: "Dark Mode Components",
    price: 44,
    originalPrice: 89,
    rating: 4.8,
    sales: 678,
    seller: "UI Designers",
  },
];

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { addItem, isInCart } = useCart();

  // Get category info
  const resolvedParams = await params;
  const category = CATEGORY_INFO[resolvedParams.slug] || {
    name: "Category",
    icon: "📦",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Back Link */}
      <Link
        className="mb-8 inline-flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
        href="/categories"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 text-4xl">{category.icon}</div>
        <h1 className="mb-2 font-bold text-3xl text-gray-900">
          {category.name}
        </h1>
        <p className="text-gray-500">{PRODUCTS.length} products</p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <Card className="group overflow-hidden" key={product.id}>
            {/* Image */}
            <Link href={`/products/${product.id}`}>
              <div className="aspect-[4/3] bg-gray-100">
                <div className="flex h-full items-center justify-center text-gray-400 transition-transform group-hover:scale-105">
                  <span className="text-5xl">{category.icon}</span>
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900 text-xs">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">
                  ({product.sales.toLocaleString()} sales)
                </span>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-gray-700">
                  {product.name}
                </h3>
              </Link>
              <p className="mb-3 text-gray-500 text-sm">by {product.seller}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900 text-lg">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                {isInCart(product.id) ? (
                  <Button asChild size="sm" variant="outline">
                    <Link href="/cart">In Cart</Link>
                  </Button>
                ) : (
                  <Button
                    className="gap-1"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        seller: product.seller,
                      })
                    }
                    size="sm"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
