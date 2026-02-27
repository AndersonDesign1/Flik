"use client";

import {
  CreditCard,
  Download,
  ExternalLink,
  Plus,
  Receipt,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function BillingPage() {
  const [plan, setPlan] = useState({
    name: "Pro Plan",
    price: "$29/month",
    renewsOn: "Jan 1, 2025",
  });
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      brand: "VISA",
      last4: "4242",
      expires: "12/2026",
      isDefault: true,
    },
    {
      id: "2",
      brand: "MC",
      last4: "8888",
      expires: "06/2025",
      isDefault: false,
    },
  ]);
  const [invoices, setInvoices] = useState([
    { id: "INV-001", date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
  ]);

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-semibold text-foreground text-lg">Billing</h2>
        <p className="text-muted-foreground text-sm">
          Manage your subscription and payment methods.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card>
          <div className="border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Current Plan
            </h3>
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <Input
                  className="h-8 max-w-44"
                  onChange={(event) =>
                    setPlan((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  value={plan.name}
                />
                <p className="text-muted-foreground text-sm">
                  {plan.price} · Renews on {plan.renewsOn}
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
            <Button
              className="gap-1.5"
              onClick={() =>
                setPaymentMethods((current) => [
                  ...current,
                  {
                    id: crypto.randomUUID(),
                    brand: "VISA",
                    last4: "0000",
                    expires: "01/2030",
                    isDefault: current.length === 0,
                  },
                ])
              }
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Card
            </Button>
          </div>
          <div className="divide-y divide-border/40">
            {paymentMethods.map((method) => (
              <div
                className="flex items-center justify-between p-4"
                key={method.id}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-16 items-center justify-center rounded-md border border-border bg-white">
                    <span className="font-bold text-sm">{method.brand}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {method.brand} ending in {method.last4}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Expires {method.expires}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {method.isDefault ? (
                    <span className="mr-2 rounded-full bg-success-50 px-2 py-0.5 font-medium text-success-700 text-xs">
                      Default
                    </span>
                  ) : null}
                  {method.isDefault ? null : (
                    <Button
                      onClick={() =>
                        setPaymentMethods((current) =>
                          current.map((item) => ({
                            ...item,
                            isDefault: item.id === method.id,
                          }))
                        )
                      }
                      size="sm"
                      variant="ghost"
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      setPaymentMethods((current) =>
                        current.filter((item) => item.id !== method.id)
                      )
                    }
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

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
            <div className="flex gap-2">
              <Button
                className="gap-1.5"
                onClick={() =>
                  setInvoices((current) => [
                    {
                      id: `INV-${String(current.length + 1).padStart(3, "0")}`,
                      date: new Date().toLocaleDateString(),
                      amount: "$29.00",
                      status: "Paid",
                    },
                    ...current,
                  ])
                }
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                Add Invoice
              </Button>
              <Button className="gap-1.5" size="sm" variant="outline">
                <ExternalLink className="h-4 w-4" />
                View All
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border/40">
            {invoices.map((invoice) => (
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
