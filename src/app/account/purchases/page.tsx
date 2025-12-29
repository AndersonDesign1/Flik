import { Download, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PURCHASES = [
  {
    id: "ORD-001",
    name: "Cosmic Icon Pack",
    seller: "Design Studio Co",
    price: "$29.00",
    date: "Dec 25, 2024",
    status: "completed",
  },
  {
    id: "ORD-002",
    name: "Neo-Grid UI Kit",
    seller: "Creative Assets",
    price: "$49.00",
    date: "Dec 20, 2024",
    status: "completed",
  },
  {
    id: "ORD-003",
    name: "Linear Icons",
    seller: "Icon Foundry",
    price: "$24.00",
    date: "Dec 15, 2024",
    status: "completed",
  },
  {
    id: "ORD-004",
    name: "Prism Wallpapers",
    seller: "UI Kit Pro",
    price: "$15.00",
    date: "Dec 10, 2024",
    status: "completed",
  },
  {
    id: "ORD-005",
    name: "Dark Mode Templates",
    seller: "Template Hub",
    price: "$39.00",
    date: "Dec 5, 2024",
    status: "refunded",
  },
];

export default function PurchasesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-2xl text-gray-900">Purchases</h2>
        <p className="text-gray-500 text-sm">
          Your order history and receipts.
        </p>
      </div>

      {/* Purchases List */}
      <Card>
        <div className="divide-y divide-gray-100">
          {PURCHASES.map((purchase) => (
            <div
              className="flex items-center justify-between p-4"
              key={purchase.id}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-xl">📦</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">
                      {purchase.name}
                    </p>
                    <Badge
                      className="capitalize"
                      variant={
                        purchase.status === "completed"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {purchase.id} • {purchase.seller} • {purchase.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 text-sm">
                  {purchase.price}
                </span>
                <Button className="gap-1" size="sm" variant="outline">
                  <Receipt className="h-3 w-3" />
                  Receipt
                </Button>
                {purchase.status === "completed" && (
                  <Button className="gap-1" size="sm">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
