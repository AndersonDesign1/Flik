"use client";

import { Box, Search, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";

// Mock search results
const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Ultimate Design System",
    price: 49,
    rating: 4.9,
    sales: 1234,
    seller: "Design Studio",
    category: "UI Kits",
  },
  {
    id: "2",
    name: "Dashboard UI Kit",
    price: 39,
    rating: 4.8,
    sales: 890,
    seller: "Creative Assets",
    category: "Templates",
  },
  {
    id: "3",
    name: "Icon Pack Pro",
    price: 19,
    rating: 4.9,
    sales: 2100,
    seller: "Icon Foundry",
    category: "Icons",
  },
  {
    id: "4",
    name: "Landing Page Templates",
    price: 34,
    rating: 4.6,
    sales: 445,
    seller: "Template Hub",
    category: "Templates",
  },
  {
    id: "5",
    name: "Dark Mode Components",
    price: 44,
    rating: 4.8,
    sales: 678,
    seller: "UI Designers",
    category: "UI Kits",
  },
  {
    id: "6",
    name: "Mobile App UI Kit",
    price: 29,
    rating: 4.7,
    sales: 567,
    seller: "App Studio",
    category: "UI Kits",
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addItem, isInCart } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q");
    if (typeof q === "string") {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const results = query
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.seller.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PRODUCTS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Search Header */}
      <div className="mb-8">
        <form className="mx-auto max-w-xl" onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              className="h-12 rounded-full pr-4 pl-12"
              defaultValue={query}
              name="q"
              placeholder="Search products..."
            />
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {query ? (
            <>
              <span className="font-medium">{results.length}</span> results for
              "{query}"
            </>
          ) : (
            "All products"
          )}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">No products found for "{query}"</p>
          <Button asChild variant="outline">
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <Card className="group overflow-hidden" key={product.id}>
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[4/3] bg-gray-100">
                  <div className="flex h-full items-center justify-center text-gray-400 transition-transform group-hover:scale-105">
                    <Box className="h-12 w-12" />
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 text-xs">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600 text-xs">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <Link href={`/products/${product.id}`}>
                  <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-gray-700">
                    {product.name}
                  </h3>
                </Link>
                <p className="mb-3 text-gray-500 text-sm">
                  by {product.seller}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-lg">
                    ${product.price}
                  </span>
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
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-gray-500">Loading...</div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
