"use client";

import { BarChart3, Globe2, Layers, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Global Payments",
    description:
      "Accept payments from 135+ countries with automated tax compliance.",
    icon: Globe2,
    span: "col-span-1 md:col-span-2",
    image: "/images/payments.png",
  },
  {
    title: "Instant Analytics",
    description: "Real-time insights into your revenue and churn.",
    icon: BarChart3,
    span: "col-span-1",
    image: "/images/analytics.png",
  },
  {
    title: "Developer First",
    description: "Full API access and webhooks for ultimate flexibility.",
    icon: Layers,
    span: "col-span-1",
    image: "/images/api.png",
  },
  {
    title: "Fraud Protection",
    description: "Enterprise-grade fraud detection powered by ML.",
    icon: ShieldCheck,
    span: "col-span-1 md:col-span-2",
    image: null, // Text only / Gradient card
  },
];

export function FeatureGrid() {
  return (
    <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:grid-cols-3">
      {FEATURES.map((feature, _i) => (
        <div
          className={cn(
            "group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-border",
            feature.span
          )}
          key={feature.title}
        >
          {/* Background Image */}
          {feature.image && (
            <div className="absolute inset-0 z-0">
              <Image
                alt={feature.title}
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                fill
                src={feature.image}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
            </div>
          )}

          {/* Fallback Gradient if no image */}
          {!feature.image && (
            <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          )}

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6">
            <div className="mb-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-background/50 text-foreground backdrop-blur-md">
              <feature.icon className="h-5 w-5" />
            </div>

            <h3 className="mb-2 font-semibold text-foreground text-xl tracking-tight">
              {feature.title}
            </h3>
            <p className="max-w-[90%] text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
