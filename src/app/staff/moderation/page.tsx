"use client";

import { Check, Eye, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PENDING_PRODUCTS = [
  {
    id: "1",
    name: "Dark Theme UI Kit",
    seller: "UI Kit Pro",
    price: "$49.00",
    submitted: "2 hours ago",
    image: "",
  },
  {
    id: "2",
    name: "Icon Pack v3",
    seller: "Icon Foundry",
    price: "$29.00",
    submitted: "4 hours ago",
    image: "",
  },
  {
    id: "3",
    name: "Landing Templates",
    seller: "Template Hub",
    price: "$39.00",
    submitted: "6 hours ago",
    image: "",
  },
  {
    id: "4",
    name: "Figma Components",
    seller: "Design Studio",
    price: "$59.00",
    submitted: "12 hours ago",
    image: "",
  },
];

export default function StaffModerationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-2xl text-gray-900">
          Product Moderation
        </h2>
        <p className="text-gray-500 text-sm">
          Review and approve new product submissions.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PENDING_PRODUCTS.map((product) => (
          <Card className="overflow-hidden" key={product.id}>
            {/* Image */}
            <div className="relative aspect-video bg-gray-100">
              {product.image ? (
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  src={product.image}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <span className="text-4xl">🖼️</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs">by {product.seller}</p>
                </div>
                <span className="font-semibold text-gray-900 text-sm">
                  {product.price}
                </span>
              </div>
              <p className="mb-4 text-gray-400 text-xs">
                Submitted {product.submitted}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 gap-1" size="sm" variant="outline">
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
                <Button
                  className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                  size="sm"
                >
                  <Check className="h-3 w-3" />
                  Approve
                </Button>
                <Button className="gap-1" size="sm" variant="destructive">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
