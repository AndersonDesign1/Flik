"use client";

import {
  type ProgressBarItem,
  ProgressBarList,
} from "@/components/shared/progress-bar-list";

interface PaymentMethod {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface PaymentMethodsCardProps {
  methods: PaymentMethod[];
  totalValue?: string;
  trend?: string;
}

export function PaymentMethodsCard({
  methods,
  totalValue,
  trend,
}: PaymentMethodsCardProps) {
  const items: ProgressBarItem[] = methods.map((method) => ({
    name: method.name,
    value: method.value,
    percent: method.percent,
    color: method.color,
  }));

  return (
    <ProgressBarList
      formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
      items={items}
      onViewAll={() => {
        // TODO: Implement view all payment methods
      }}
      title="Payment Methods"
      totalValue={totalValue}
      trend={trend}
      trendLabel="all time"
      viewAllLabel="Manage"
    />
  );
}
