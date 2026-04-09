"use client";

import {
  ArrowLeft,
  Check,
  Download,
  ExternalLink,
  ShoppingCart,
  Store,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

export interface PublicProductDetailData {
  _id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  compareAtPrice?: number;
  allowCustomPrice: boolean;
  coverUrl?: string;
  galleryImages: Array<{
    fileName: string;
    fileSize: number;
    mimeType?: string;
    url?: string;
  }>;
  sales: number;
  inventoryCount: number;
  files: Array<{
    fileName: string;
    fileSize: number;
    mimeType?: string;
  }>;
  sellerName: string;
  storeName?: string;
  storeSlug?: string;
}

interface PublicProductDetailProps {
  product: PublicProductDetailData;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "ST";
}

function formatFileSize(fileSize: number) {
  const sizeInMb = fileSize / (1024 * 1024);
  if (sizeInMb >= 1) {
    return `${sizeInMb.toFixed(2)} MB`;
  }

  const sizeInKb = fileSize / 1024;
  return `${sizeInKb.toFixed(0)} KB`;
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    templates: "Templates",
    courses: "Courses",
    ebooks: "eBooks",
    software: "Software",
    design: "Design Assets",
    other: "Other",
  };

  return labels[category] ?? category;
}

export function PublicProductDetail({ product }: PublicProductDetailProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product._id);
  const compareAtPrice = product.compareAtPrice;
  const hasDiscount =
    compareAtPrice !== undefined && compareAtPrice > product.price;
  const discountPercentage =
    hasDiscount && compareAtPrice !== undefined
      ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
      : null;
  const categoryLabel = getCategoryLabel(product.category);
  const mediaItems = [
    ...(product.coverUrl
      ? [
          {
            url: product.coverUrl,
            label: `${product.name} cover image`,
          },
        ]
      : []),
    ...product.galleryImages
      .filter((image) => image.url)
      .map((image) => ({
        url: image.url as string,
        label: image.fileName,
      })),
  ];
  const [selectedImage, setSelectedImage] = useState<string | null>(
    mediaItems[0]?.url ?? null
  );

  useEffect(() => {
    setSelectedImage(mediaItems[0]?.url ?? null);
  }, [product._id, product.coverUrl, product.galleryImages]);

  const details = [
    product.category ? `Category: ${categoryLabel}` : null,
    product.inventoryCount > 0
      ? `${product.inventoryCount} file${product.inventoryCount === 1 ? "" : "s"} included`
      : "No downloadable files attached",
    product.allowCustomPrice ? "Custom pricing available" : "Fixed price purchase",
  ].filter((item): item is string => Boolean(item));

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      seller: product.sellerName,
      image: product.coverUrl,
    });
  };

  return (
    <section className="relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_26%)]" />

      <div className="mx-auto max-w-6xl">
        <Link
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary-violet/5">
              {selectedImage ? (
                <img
                  alt={product.name}
                  className="h-full w-full object-cover"
                  src={selectedImage}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-violet-100 via-background to-accent-teal/10 text-muted-foreground">
                  <span className="text-6xl">{getInitials(product.name)}</span>
                </div>
              )}
            </div>

            {mediaItems.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {mediaItems.map((image) => {
                  const isSelected = image.url === selectedImage;
                  return (
                    <button
                      className={`overflow-hidden rounded-2xl border transition ${
                        isSelected
                          ? "border-primary-violet shadow-md shadow-primary-violet/15"
                          : "border-border hover:border-primary-violet/40"
                      }`}
                      key={`${image.url}-${image.label}`}
                      onClick={() => setSelectedImage(image.url)}
                      type="button"
                    >
                      <img
                        alt={image.label}
                        className="aspect-square h-full w-full object-cover"
                        src={image.url}
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                {product.category ? (
                  <span className="rounded-full border border-primary-violet/20 bg-primary-violet-100 px-2.5 py-1 font-medium text-primary-violet-700">
                    {categoryLabel}
                  </span>
                ) : null}
                <span className="rounded-full bg-primary-violet-100 px-2.5 py-1 font-medium text-primary-violet-700">
                  Active
                </span>
                <span>{product.sales.toLocaleString()} sales</span>
                <span>Instant access</span>
              </div>

              <h1 className="font-bold text-3xl text-foreground tracking-tight">
                {product.name}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              {product.storeSlug ? (
                <Link
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary-violet/30 hover:shadow-lg hover:shadow-primary-violet/10"
                  href={`/store/${product.storeSlug}`}
                >
                  <div className="bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(6,182,212,0.08))] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <Store className="h-3.5 w-3.5" />
                        Storefront
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-violet font-semibold text-sm text-white shadow-sm">
                        {getInitials(product.sellerName)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground text-base">
                          {product.storeName ?? product.sellerName}
                        </p>
                        <p className="truncate text-muted-foreground text-sm">
                          by {product.sellerName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">
                      Explore the full seller page
                    </span>
                    <span className="font-medium text-primary-violet">
                      Visit store
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-violet font-semibold text-sm text-white">
                    {getInitials(product.sellerName)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {product.sellerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Store link unavailable
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-bold text-4xl text-foreground">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount ? (
                <>
                  <span className="text-muted-foreground text-xl line-through">
                    {formatCurrency(compareAtPrice)}
                  </span>
                  <span className="rounded-full bg-accent-teal/10 px-2 py-0.5 font-medium text-accent-teal text-sm">
                    {discountPercentage}% off
                  </span>
                </>
              ) : null}
            </div>

            <div className="flex gap-3">
              {inCart ? (
                <Button
                  asChild
                  className="h-12 flex-1 gap-2 rounded-full bg-accent-teal text-white hover:bg-accent-teal/90"
                >
                  <Link href="/cart">
                    <Check className="h-4 w-4" />
                    In Cart - View Cart
                  </Link>
                </Button>
              ) : (
                <Button className="h-12 flex-1 gap-2 rounded-full" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 font-semibold text-foreground">Product details</h2>
              <ul className="space-y-3">
                {details.map((detail) => (
                  <li className="flex items-center gap-3 text-muted-foreground" key={detail}>
                    <Store className="h-4 w-4 text-primary-violet" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {product.files.length > 0 ? (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 font-semibold text-foreground">Included files</h2>
                <ul className="space-y-3">
                  {product.files.map((file) => (
                    <li
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3"
                      key={`${file.fileName}-${file.fileSize}`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-violet-100 text-primary-violet-700">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground text-sm">
                            {file.fileName}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {file.mimeType ?? "File"}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-muted-foreground text-xs">
                        {formatFileSize(file.fileSize)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {product.tags.length > 0 ? (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 font-semibold text-foreground">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground"
                      key={tag}
                    >
                      <Tag className="h-3.5 w-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
