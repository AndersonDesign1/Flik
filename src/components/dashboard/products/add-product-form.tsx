"use client";

import {
  ArrowLeft,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Loader2,
  Plus,
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

export function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual product creation
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleCoverUpload = () => {
    // Mock cover image upload
    setCoverImage("/mock-cover.jpg");
  };

  const handleFileUpload = () => {
    // Mock file upload
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
              Add New Product
            </h1>
            <p className="text-gray-500 text-sm">
              Create a new digital product to sell
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="border-gray-200" type="button" variant="outline">
            Save as Draft
          </Button>
          <Button
            className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Product"
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
                  id="name"
                  placeholder="e.g. Ultimate Design System"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  className="min-h-[150px] w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0"
                  id="description"
                  placeholder="Describe your product in detail. What's included? Who is it for?"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
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
                    id="tags"
                    placeholder="design, templates, figma"
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
                    id="price"
                    min="0"
                    placeholder="29"
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
                    id="comparePrice"
                    min="0"
                    placeholder="49"
                    step="0.01"
                    type="number"
                  />
                </div>
                <p className="text-gray-400 text-xs">
                  Shows as original price with discount
                </p>
              </div>

              <div className="border-gray-100 border-t pt-4">
                <label className="flex items-center gap-3">
                  <input
                    className="h-4 w-4 rounded border-gray-300"
                    type="checkbox"
                  />
                  <span className="text-gray-700 text-sm">
                    Allow customers to pay what they want
                  </span>
                </label>
              </div>
            </div>
          </Card>

          {/* Preview Card */}
          <Card className="overflow-hidden">
            <div className="border-gray-100 border-b bg-gray-50 px-6 py-4">
              <h3 className="font-medium text-gray-900 text-sm">
                Product Preview
              </h3>
            </div>
            <div className="p-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                {coverImage ? (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <span className="text-4xl">🖼️</span>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-300">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Your Product Name</p>
                <p className="mt-1 text-gray-600 text-sm">$0.00</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
