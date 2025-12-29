import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock seller and products data
const SELLER = {
  username: "designstudio",
  name: "Design Studio",
  avatar: "DS",
  bio: "We create beautiful design systems and UI kits for modern web applications. Over 10,000 happy customers.",
  followers: 2345,
  products: 12,
  totalSales: 15_000,
};

const PRODUCTS = [
  {
    id: "1",
    name: "Ultimate Design System",
    price: 49,
    originalPrice: 99,
    rating: 4.9,
    sales: 1234,
  },
  {
    id: "2",
    name: "Dashboard UI Kit",
    price: 39,
    originalPrice: 79,
    rating: 4.8,
    sales: 890,
  },
  {
    id: "3",
    name: "Mobile App Templates",
    price: 29,
    originalPrice: 59,
    rating: 4.7,
    sales: 567,
  },
  {
    id: "4",
    name: "Icon Pack Pro",
    price: 19,
    originalPrice: 39,
    rating: 4.9,
    sales: 2100,
  },
];

interface StorePageProps {
  params: Promise<{ username: string }>;
}

export default async function StorePage({ params }: StorePageProps) {
  // TODO: Fetch seller by username from API
  const { username: _username } = await params;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Back Link */}
      <Link
        className="mb-8 inline-flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
        href="/"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      {/* Seller Header */}
      <div className="mb-12 flex items-start gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-900 font-bold text-2xl text-white">
          {SELLER.avatar}
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-3xl text-gray-900">{SELLER.name}</h1>
          <p className="mt-2 max-w-xl text-gray-600">{SELLER.bio}</p>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div>
              <span className="font-semibold text-gray-900">
                {SELLER.products}
              </span>{" "}
              <span className="text-gray-500">products</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {SELLER.totalSales.toLocaleString()}
              </span>{" "}
              <span className="text-gray-500">sales</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {SELLER.followers.toLocaleString()}
              </span>{" "}
              <span className="text-gray-500">followers</span>
            </div>
          </div>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800">
          Follow
        </Button>
      </div>

      {/* Products Grid */}
      <div>
        <h2 className="mb-6 font-semibold text-gray-900 text-xl">Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                {/* Product Image */}
                <div className="aspect-[4/3] bg-gray-100">
                  <div className="flex h-full items-center justify-center text-gray-400 transition-transform group-hover:scale-105">
                    <span className="text-5xl">🎨</span>
                  </div>
                </div>

                {/* Product Info */}
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

                  <h3 className="mb-3 font-semibold text-gray-900 group-hover:text-gray-700">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-gray-900 text-lg">
                        ${product.price}
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <Button
                      className="h-8 gap-1 bg-gray-900 px-3 text-white text-xs hover:bg-gray-800"
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Buy
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
