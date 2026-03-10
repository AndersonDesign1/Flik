"use client";

import {
  Archive,
  DollarSign,
  FileText,
  Loader2,
  Plus,
  Save,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import type { DashboardProduct } from "@/components/dashboard/products/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: DashboardProduct;
}

const statusConfig = {
  active: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    label: "Active",
  },
  draft: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
    label: "Draft",
  },
  archived: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    label: "Archived",
  },
};

export function ProductDetail({ product }: ProductDetailProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(
    "/mock-cover.jpg"
  );
  const [files, setFiles] = useState<string[]>(["product-file-v1.zip"]);

  const status = statusConfig[product.status];
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  const handleFileUpload = () => {
    setFiles([...files, `product-file-${files.length + 1}.zip`]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <SheetHeader>
        <div className="flex items-start justify-between">
          <div>
            <SheetTitle className="text-left">{product.name}</SheetTitle>
            <SheetDescription className="flex items-center gap-2 text-left">
              <span className="font-mono">{product.id}</span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 font-medium text-xs capitalize",
                  status.bg,
                  status.text,
                  status.border
                )}
              >
                {status.label}
              </span>
            </SheetDescription>
          </div>
        </div>
      </SheetHeader>

      {/* Scrollable Content */}
      <div className="grid flex-1 auto-rows-min gap-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium text-xs">Price</span>
            </div>
            <div className="font-bold text-gray-900 text-xl tabular-nums">
              {formattedPrice}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <Archive className="h-4 w-4" />
              <span className="font-medium text-xs">Inventory</span>
            </div>
            <div className="font-bold text-gray-900 text-xl tabular-nums">
              {product.inventory}
            </div>
          </div>
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-600">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium text-xs">Sales</span>
            </div>
            <div className="font-bold text-blue-700 text-xl tabular-nums">
              {product.sales}
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-500 text-xs uppercase tracking-wider">
            Product Information
          </h3>

          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="name">
                Product Name
              </Label>
              <Input className="h-10" defaultValue={product.name} id="name" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm" htmlFor="description">
                Description
              </Label>
              <Textarea
                className="min-h-[100px] resize-none"
                defaultValue="A premium digital asset for modern designers."
                id="description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="category">
                  Category
                </Label>
                <Select defaultValue="templates">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="templates">Templates</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                    <SelectItem value="ebooks">eBooks</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="design">Design Assets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="tags">
                  Tags
                </Label>
                <Input
                  className="h-10"
                  defaultValue="design, templates"
                  id="tags"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-500 text-xs uppercase tracking-wider">
            Cover Image
          </h3>

          {coverImage ? (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <div className="flex h-full items-center justify-center text-gray-400">
                <span className="text-5xl">🖼️</span>
              </div>
              <button
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md"
                onClick={() => setCoverImage(null)}
                type="button"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-200 border-dashed bg-gray-50 transition-colors hover:border-gray-300"
              onClick={() => setCoverImage("/mock.jpg")}
              type="button"
            >
              <Upload className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500 text-sm">Upload cover image</span>
            </button>
          )}
        </div>

        {/* Product Files */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-500 text-xs uppercase tracking-wider">
            Product Files
          </h3>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
                key={file}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 text-sm">{file}</span>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => removeFile(index)}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 border-dashed p-3 text-gray-500 transition-colors hover:bg-gray-50"
              onClick={handleFileUpload}
              type="button"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">Add file</span>
            </button>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-500 text-xs uppercase tracking-wider">
            Pricing
          </h3>

          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="price">
                  Price ($)
                </Label>
                <Input
                  className="h-10"
                  defaultValue={product.price}
                  id="price"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="comparePrice">
                  Compare-at ($)
                </Label>
                <Input
                  className="h-10"
                  defaultValue={product.price * 2}
                  id="comparePrice"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="inventory">
                  Inventory
                </Label>
                <Input
                  className="h-10"
                  defaultValue={product.inventory}
                  id="inventory"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="status">
                  Status
                </Label>
                <Select defaultValue={product.status}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <SheetFooter>
        <Button
          className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50"
          type="button"
          variant="outline"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
        <Button
          className="flex-1 gap-2 bg-gray-900 text-white hover:bg-gray-800"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </SheetFooter>
    </form>
  );
}
