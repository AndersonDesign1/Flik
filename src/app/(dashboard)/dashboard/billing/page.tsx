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
import { useDashboardMode } from "@/components/dashboard/dashboard-mode-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const DEMO_PLAN = {
  name: "Pro Plan",
  price: "$29/month",
  renewsOn: "Jan 1, 2025",
};

const DEMO_PAYMENT_METHODS = [
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
];

const DEMO_INVOICES = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
  const mode = useDashboardMode();
  const [plan, setPlan] = useState(mode === "demo" ? DEMO_PLAN : null);
  const [paymentMethods, setPaymentMethods] = useState(
    mode === "demo" ? DEMO_PAYMENT_METHODS : []
  );
  const [invoices] = useState(mode === "demo" ? DEMO_INVOICES : []);

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
            {plan ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <Input
                      className="h-8 max-w-44"
                      onChange={(event) =>
                        setPlan((current) =>
                          current
                            ? {
                                ...current,
                                name: event.target.value,
                              }
                            : current
                        )
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
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                No subscription plan yet.
              </p>
            )}
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
                    brand: "",
                    last4: "",
                    expires: "",
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
          {paymentMethods.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm">
              No payment methods added.
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {paymentMethods.map((method) => (
                <div
                  className="flex items-center justify-between p-4"
                  key={method.id}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-16 items-center justify-center rounded-md border border-border bg-white">
                      <span className="font-bold text-sm">
                        {method.brand || "CARD"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {method.brand || "Card"} ending in{" "}
                        {method.last4 || "----"}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Expires {method.expires || "--/----"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {method.isDefault ? (
                      <span className="mr-2 rounded-full bg-success-50 px-2 py-0.5 font-medium text-success-700 text-xs">
                        Default
                      </span>
                    ) : (
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
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Billing History
              </h3>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Download your invoices and receipts.
              </p>
            </div>
            <Button size="sm" variant="outline">
              <ExternalLink className="mr-1.5 h-4 w-4" />
              View all
            </Button>
          </div>
          {invoices.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm">
              No invoices yet.
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {invoices.map((invoice) => (
                <div
                  className="flex items-center justify-between p-4"
                  key={invoice.id}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
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
                    <span className="font-semibold text-foreground text-sm tabular-nums">
                      {invoice.amount}
                    </span>
                    <span className="rounded-full bg-success-50 px-2 py-0.5 font-medium text-success-700 text-xs">
                      {invoice.status}
                    </span>
                    <Button size="icon" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
