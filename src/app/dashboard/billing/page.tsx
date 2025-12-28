"use client";

import {
  CreditCard,
  Download,
  ExternalLink,
  Plus,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const INVOICES = [
  {
    id: "INV-001",
    date: "Dec 1, 2024",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "Nov 1, 2024",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "Oct 1, 2024",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-004",
    date: "Sep 1, 2024",
    amount: "$29.00",
    status: "Paid",
  },
];

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-semibold text-foreground text-lg">Billing</h2>
        <p className="text-muted-foreground text-sm">
          Manage your subscription and payment methods.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Current Plan */}
        <Card>
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Current Plan
            </h3>
          </div>
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Pro Plan</p>
                <p className="text-muted-foreground text-sm">
                  $29/month · Renews on Jan 1, 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Change Plan
              </Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card>
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Payment Methods
              </h3>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Manage your payment methods.
              </p>
            </div>
            <Button className="gap-1.5" size="sm" variant="outline">
              <Plus className="h-4 w-4" />
              Add Card
            </Button>
          </div>
          <div className="divide-y divide-border/40">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-16 items-center justify-center rounded-md border border-border bg-white">
                  <span className="font-bold text-blue-600 text-sm">VISA</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Visa ending in 4242
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Expires 12/2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="mr-2 rounded-full bg-success-50 px-2 py-0.5 font-medium text-success-700 text-xs">
                  Default
                </span>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-16 items-center justify-center rounded-md border border-border bg-white">
                  <span className="font-bold text-orange-500 text-sm">MC</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Mastercard ending in 8888
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Expires 06/2025
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost">
                  Set Default
                </Button>
                <Button size="sm" variant="ghost">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Billing History */}
        <Card>
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Billing History
              </h3>
              <p className="mt-0.5 text-muted-foreground text-xs">
                View and download past invoices.
              </p>
            </div>
            <Button className="gap-1.5" size="sm" variant="outline">
              <ExternalLink className="h-4 w-4" />
              View All
            </Button>
          </div>
          <div className="divide-y divide-border/40">
            {INVOICES.map((invoice) => (
              <div
                className="flex items-center justify-between p-4"
                key={invoice.id}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {invoice.id}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {invoice.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-foreground text-sm tabular-nums">
                    {invoice.amount}
                  </span>
                  <span className="rounded-full bg-success-50 px-2 py-0.5 font-medium text-success-700 text-xs">
                    {invoice.status}
                  </span>
                  <Button className="h-8 w-8" size="icon" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
