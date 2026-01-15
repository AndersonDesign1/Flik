"use client";

import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";

const CATEGORIES = [
  { slug: "templates", name: "Templates", icon: "📄", count: 234 },
  { slug: "ui-kits", name: "UI Kits", icon: "🎨", count: 156 },
  { slug: "icons", name: "Icons", icon: "✨", count: 89 },
  { slug: "illustrations", name: "Illustrations", icon: "🖼️", count: 123 },
];

const FEATURED_PRODUCTS = [
  {
    id: "f1",
    name: "Ultimate Design System",
    seller: "Design Studio",
    price: 49,
    originalPrice: 99,
    rating: 4.9,
    sales: 1234,
  },
  {
    id: "f2",
    name: "Dashboard UI Kit",
    seller: "Creative Assets",
    price: 39,
    originalPrice: 79,
    rating: 4.8,
    sales: 890,
  },
  {
    id: "f3",
    name: "Icon Pack Pro",
    seller: "Icon Foundry",
    price: 19,
    originalPrice: 39,
    rating: 4.9,
    sales: 2100,
  },
  {
    id: "f4",
    name: "Mobile App Templates",
    seller: "App Studio",
    price: 29,
    originalPrice: 59,
    rating: 4.7,
    sales: 567,
  },
  {
    id: "f5",
    name: "Landing Page Kit",
    seller: "Template Hub",
    price: 34,
    originalPrice: 69,
    rating: 4.6,
    sales: 445,
  },
  {
    id: "f6",
    name: "Dark Mode Components",
    seller: "UI Designers",
    price: 44,
    originalPrice: 89,
    rating: 4.8,
    sales: 678,
  },
];

export default function DiscoverPage() {
  const { addItem, isInCart } = useCart();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-2xl text-gray-900">
          Discover Products
        </h2>
        <p className="text-gray-500 text-sm">
          Find the best digital products for your next project.
        </p>
      </div>

      {/* Categories */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Browse Categories</h3>
          <Link
            className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700"
            href="/categories"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:bg-primary-violet-50"
              href={`/categories/${cat.slug}`}
              key={cat.slug}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-medium text-gray-900">{cat.name}</p>
                <p className="text-gray-500 text-xs">{cat.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Featured Products</h3>
          <Link
            className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700"
            href="/search"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PRODUCTS.map((product) => (
            <Card className="overflow-hidden" key={product.id}>
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[4/3] bg-gray-100">
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <span className="text-4xl">📦</span>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600 text-xs">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    ({product.sales} sales)
                  </span>
                </div>
                <Link href={`/products/${product.id}`}>
                  <h4 className="font-medium text-gray-900 hover:text-gray-700">
                    {product.name}
                  </h4>
                </Link>
                <p className="text-gray-500 text-sm">by {product.seller}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-gray-900">
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
                      <ShoppingCart className="mr-1 h-3 w-3" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
