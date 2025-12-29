"use client";

import {
  ArrowLeft,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock existing product data
const EXISTING_PRODUCT = {
  id: "1",
  name: "Ultimate Design System",
  description:
    "A comprehensive design system with 500+ components, 50+ page templates, and full Figma source files. Perfect for building modern web applications quickly.",
  category: "templates",
  tags: "design, templates, figma",
  price: 49,
  comparePrice: 99,
  coverImage: "/mock-cover.jpg",
  files: ["design-system-v2.zip", "figma-source.fig"],
};

interface EditProductFormProps {
  productId: string;
}

export function EditProductForm({
  productId: _productId,
}: EditProductFormProps) {
  // TODO: Fetch product by productId from API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(
    EXISTING_PRODUCT.coverImage
  );
  const [files, setFiles] = useState<string[]>(EXISTING_PRODUCT.files);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual product update
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // TODO: Implement actual product deletion
    setTimeout(() => setIsDeleting(false), 2000);
  };

  const handleCoverUpload = () => {
    setCoverImage("/mock-cover.jpg");
  };

  const handleFileUpload = () => {
    setFiles([...files, `product-file-${files.length + 1}.zip`]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            href="/dashboard/products"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-semibold text-2xl text-gray-900">
              Edit Product
            </h1>
            <p className="text-gray-500 text-sm">Update your product details</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            disabled={isDeleting}
            onClick={handleDelete}
            type="button"
            variant="outline"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </Button>
          <Button
            className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  Product Information
                </h2>
                <p className="text-gray-500 text-sm">
                  Basic details about your product
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  className="h-11"
                  defaultValue={EXISTING_PRODUCT.name}
                  id="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  className="min-h-[150px] w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0"
                  defaultValue={EXISTING_PRODUCT.description}
                  id="description"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={EXISTING_PRODUCT.category}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="courses">Courses</SelectItem>
                      <SelectItem value="ebooks">eBooks</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="design">Design Assets</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    className="h-11"
                    defaultValue={EXISTING_PRODUCT.tags}
                    id="tags"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Cover Image */}
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <ImageIcon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Cover Image</h2>
                <p className="text-gray-500 text-sm">
                  This will be displayed on your product page
                </p>
              </div>
            </div>

            {coverImage ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                <div className="flex h-full items-center justify-center text-gray-400">
                  <span className="text-6xl">🖼️</span>
                </div>
                <button
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                  onClick={() => setCoverImage(null)}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-gray-200 border-dashed bg-gray-50 transition-colors hover:border-gray-300 hover:bg-gray-100"
                onClick={handleCoverUpload}
                type="button"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-700 text-sm">
                    Click to upload cover image
                  </p>
                  <p className="text-gray-400 text-xs">
                    PNG, JPG up to 10MB (1280x720 recommended)
                  </p>
                </div>
              </button>
            )}
          </Card>

          {/* Product Files */}
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Upload className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Product Files</h2>
                <p className="text-gray-500 text-sm">
                  Upload the files customers will download
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
                  key={file}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {file}
                      </p>
                      <p className="text-gray-400 text-xs">2.4 MB</p>
                    </div>
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
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 border-dashed p-4 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50"
                onClick={handleFileUpload}
                type="button"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add file</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Pricing</h2>
                <p className="text-gray-500 text-sm">Set your product price</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <Input
                    className="h-11 pl-8"
                    defaultValue={EXISTING_PRODUCT.price}
                    id="price"
                    min="0"
                    required
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comparePrice">
                  Compare-at Price (optional)
                </Label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <Input
                    className="h-11 pl-8"
                    defaultValue={EXISTING_PRODUCT.comparePrice}
                    id="comparePrice"
                    min="0"
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-gray-900">Product Status</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked
                  name="status"
                  type="radio"
                />
                <div>
                  <span className="font-medium text-gray-900 text-sm">
                    Published
                  </span>
                  <p className="text-gray-500 text-xs">Visible to customers</p>
                </div>
              </label>
              <label className="flex items-center gap-3">
                <input
                  className="h-4 w-4 rounded border-gray-300"
                  name="status"
                  type="radio"
                />
                <div>
                  <span className="font-medium text-gray-900 text-sm">
                    Draft
                  </span>
                  <p className="text-gray-500 text-xs">Only visible to you</p>
                </div>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
