import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WISHLIST_ITEMS = [
  {
    id: "1",
    name: "Glassmorphism Assets",
    seller: "Template Hub",
    price: "$59.00",
    originalPrice: "$99.00",
    onSale: true,
    image: "",
  },
  {
    id: "2",
    name: "Abstract Shapes Bundle",
    seller: "Design Studio Co",
    price: "$19.00",
    originalPrice: null,
    onSale: false,
    image: "",
  },
  {
    id: "3",
    name: "Dark Mode Templates",
    seller: "UI Kit Pro",
    price: "$39.00",
    originalPrice: "$59.00",
    onSale: true,
    image: "",
  },
  {
    id: "4",
    name: "Minimal Icon Set",
    seller: "Icon Foundry",
    price: "$24.00",
    originalPrice: null,
    onSale: false,
    image: "",
  },
  {
    id: "5",
    name: "Landing Page Kit",
    seller: "Creative Assets",
    price: "$49.00",
    originalPrice: null,
    onSale: false,
    image: "",
  },
];

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Wishlist</h2>
          <p className="text-gray-500 text-sm">
            {WISHLIST_ITEMS.length} items saved for later.
          </p>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WISHLIST_ITEMS.map((item) => (
          <Card className="group relative overflow-hidden" key={item.id}>
            {/* Sale Badge */}
            {item.onSale && (
              <div className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2 py-1 font-medium text-white text-xs">
                Sale
              </div>
            )}

            {/* Remove Button */}
            <button
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
              type="button"
            >
              <Trash2 className="h-4 w-4 text-gray-500" />
            </button>

            {/* Image */}
            <div className="relative aspect-video bg-gray-100">
              {item.image ? (
                <Image
                  alt={item.name}
                  className="object-cover"
                  fill
                  src={item.image}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <Heart className="h-8 w-8" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              <p className="text-gray-500 text-xs">by {item.seller}</p>

              <div className="mt-3 flex items-center gap-2">
                <span className="font-bold text-gray-900">{item.price}</span>
                {item.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">
                    {item.originalPrice}
                  </span>
                )}
              </div>

              <Button className="mt-4 w-full gap-2" size="sm">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
