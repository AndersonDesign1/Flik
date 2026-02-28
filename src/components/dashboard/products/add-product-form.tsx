"use client";

import { useMutation } from "convex/react";
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
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_PRODUCT_FILE_SIZE_BYTES = 250 * 1024 * 1024;

interface UploadedProductFile {
  storageId: Id<"_storage">;
  fileName: string;
  fileSize: number;
  mimeType?: string;
}

export function AddProductForm() {
  const router = useRouter();
  const generateProductUploadUrl = useMutation(
    api.products.generateProductUploadUrl
  );
  const deleteUploadedFile = useMutation(api.products.deleteUploadedFile);
  const registerUploadedFile = useMutation(api.products.registerUploadedFile);
  const createProduct = useMutation(api.products.createProduct);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("templates");
  const [tagsInput, setTagsInput] = useState("");
  const [priceInput, setPriceInput] = useState("29");
  const [comparePriceInput, setComparePriceInput] = useState("49");
  const [allowCustomPrice, setAllowCustomPrice] = useState(false);

  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [coverStorageId, setCoverStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [files, setFiles] = useState<UploadedProductFile[]>([]);

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedStorageIdsRef = useRef<Set<Id<"_storage">>>(new Set());
  const isSubmittedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [coverPreviewUrl]);

  useEffect(() => {
    return () => {
      if (isSubmittedRef.current) {
        return;
      }

      for (const storageId of uploadedStorageIdsRef.current) {
        deleteUploadedFile({ storageId }).catch(() => undefined);
      }
    };
  }, [deleteUploadedFile]);

  const uploadFileToConvex = async (file: File): Promise<Id<"_storage">> => {
    const uploadUrl = await generateProductUploadUrl();
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }

    const { storageId } = (await uploadResponse.json()) as {
      storageId?: Id<"_storage">;
    };

    if (!storageId) {
      throw new Error("Upload did not return a storageId");
    }

    try {
      await registerUploadedFile({
        storageId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type || undefined,
      });
      uploadedStorageIdsRef.current.add(storageId);
    } catch {
      await deleteUploadedFile({ storageId }).catch(() => undefined);
      throw new Error("Failed to register uploaded file");
    }

    return storageId;
  };

  const parseTags = () =>
    tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

  const parsePriceValue = (raw: string, fallback = 0) => {
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const uploadCover = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Cover must be an image file");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error("Cover image must be 10MB or smaller");
      return;
    }

    try {
      const uploadedStorageId = await uploadFileToConvex(file);
      const previewUrl = URL.createObjectURL(file);

      if (coverStorageId) {
        await deleteUploadedFile({ storageId: coverStorageId });
        uploadedStorageIdsRef.current.delete(coverStorageId);
      }
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }

      setCoverStorageId(uploadedStorageId);
      setCoverPreviewUrl(previewUrl);
      toast.success("Cover image uploaded");
    } catch {
      toast.error("Failed to upload cover image");
    }
  };

  const uploadProductFiles = async (newFiles: File[]) => {
    for (const file of newFiles) {
      if (file.size > MAX_PRODUCT_FILE_SIZE_BYTES) {
        toast.error(`${file.name} is larger than 250MB`);
        continue;
      }

      try {
        const uploadedStorageId = await uploadFileToConvex(file);
        setFiles((prev) => [
          ...prev,
          {
            storageId: uploadedStorageId,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type || undefined,
          },
        ]);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const removeFile = async (index: number) => {
    const fileToRemove = files[index];
    if (!fileToRemove) {
      return;
    }

    try {
      await deleteUploadedFile({ storageId: fileToRemove.storageId });
      uploadedStorageIdsRef.current.delete(fileToRemove.storageId);
      setFiles((prev) => prev.filter((_, i) => i !== index));
      toast.success("File removed");
    } catch {
      toast.error("Failed to remove file");
    }
  };

  const removeCover = async () => {
    if (!coverStorageId) {
      setCoverPreviewUrl(null);
      return;
    }

    try {
      await deleteUploadedFile({ storageId: coverStorageId });
      uploadedStorageIdsRef.current.delete(coverStorageId);
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
      setCoverStorageId(null);
      setCoverPreviewUrl(null);
      toast.success("Cover removed");
    } catch {
      toast.error("Failed to remove cover");
    }
  };

  const submitProduct = async (status: "active" | "draft") => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      toast.error("Product name is required");
      return false;
    }

    if (status === "active" && !trimmedDescription) {
      toast.error("Description is required to publish");
      return false;
    }

    const parsedPrice = Math.max(0, parsePriceValue(priceInput, 0));
    const parsedComparePriceRaw = parsePriceValue(comparePriceInput, 0);
    const parsedComparePrice =
      comparePriceInput.trim().length > 0
        ? Math.max(0, parsedComparePriceRaw)
        : undefined;

    if (
      parsedComparePrice !== undefined &&
      parsedComparePrice > 0 &&
      parsedComparePrice < parsedPrice
    ) {
      toast.error("Compare-at price must be greater than or equal to price");
      return false;
    }

    await createProduct({
      name: trimmedName,
      description: trimmedDescription,
      category,
      tags: parseTags(),
      price: parsedPrice,
      compareAtPrice: parsedComparePrice,
      allowCustomPrice,
      status,
      coverStorageId: coverStorageId ?? undefined,
      files,
    });

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const saved = await submitProduct("active");
      if (!saved) {
        return;
      }

      isSubmittedRef.current = true;
      uploadedStorageIdsRef.current.clear();
      toast.success("Product published successfully");
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to publish product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      const saved = await submitProduct("draft");
      if (!saved) {
        return;
      }

      isSubmittedRef.current = true;
      uploadedStorageIdsRef.current.clear();
      toast.success("Draft saved");
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save draft"
      );
    } finally {
      setIsSavingDraft(false);
    }
  };

  const previewPrice = parsePriceValue(priceInput, 0);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            uploadCover(file).catch(() => undefined);
          }
          event.target.value = "";
        }}
        ref={coverInputRef}
        type="file"
      />
      <input
        className="hidden"
        multiple
        onChange={(event) => {
          const selectedFiles = Array.from(event.target.files ?? []);
          if (selectedFiles.length > 0) {
            uploadProductFiles(selectedFiles).catch(() => undefined);
          }
          event.target.value = "";
        }}
        ref={fileInputRef}
        type="file"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            href="/dashboard/products"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-semibold text-gray-900 text-xl sm:text-2xl">
              Add New Product
            </h1>
            <p className="hidden text-gray-500 text-sm sm:block">
              Create a new digital product to sell
            </p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            className="flex-1 border-gray-200 sm:flex-none"
            disabled={isSavingDraft || isSubmitting}
            onClick={() => {
              handleSaveDraft().catch(() => undefined);
            }}
            size="sm"
            type="button"
            variant="outline"
          >
            {isSavingDraft ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save Draft"
            )}
          </Button>
          <Button
            className="flex-1 gap-2 bg-gray-900 text-white hover:bg-gray-800 sm:flex-none"
            disabled={isSubmitting || isSavingDraft}
            size="sm"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Publishing...</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">Publish</span>
                <span className="hidden sm:inline">Publish Product</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
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
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Ultimate Design System"
                  required
                  value={name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  className="min-h-[150px] w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0"
                  id="description"
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe your product in detail. What's included? Who is it for?"
                  required
                  value={description}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger className="h-11 w-full">
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
                    onChange={(event) => setTagsInput(event.target.value)}
                    placeholder="design, templates, figma"
                    value={tagsInput}
                  />
                </div>
              </div>
            </div>
          </Card>

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

            {coverPreviewUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                {/* biome-ignore lint/performance/noImgElement: local object URL preview for in-form upload */}
                <img
                  alt="Product cover preview"
                  className="h-full w-full object-cover"
                  height={720}
                  src={coverPreviewUrl}
                  width={1280}
                />
                <button
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                  onClick={() => {
                    removeCover().catch(() => undefined);
                  }}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-gray-200 border-dashed bg-gray-50 transition-colors hover:border-gray-300 hover:bg-gray-100"
                onClick={() => coverInputRef.current?.click()}
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
                    PNG, JPG, WEBP up to 10MB (1280x720 recommended)
                  </p>
                </div>
              </button>
            )}
          </Card>

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
                  key={file.storageId}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {file.fileName}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      removeFile(index).catch(() => undefined);
                    }}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 border-dashed p-4 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add file</span>
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
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
                    onChange={(event) => setPriceInput(event.target.value)}
                    placeholder="29"
                    required
                    step="0.01"
                    type="number"
                    value={priceInput}
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
                    onChange={(event) =>
                      setComparePriceInput(event.target.value)
                    }
                    placeholder="49"
                    step="0.01"
                    type="number"
                    value={comparePriceInput}
                  />
                </div>
                <p className="text-gray-400 text-xs">
                  Shows as original price with discount
                </p>
              </div>

              <div className="border-gray-100 border-t pt-4">
                <label className="flex items-center gap-3">
                  <input
                    checked={allowCustomPrice}
                    className="h-4 w-4 rounded border-gray-300"
                    onChange={(event) =>
                      setAllowCustomPrice(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span className="text-gray-700 text-sm">
                    Allow customers to pay what they want
                  </span>
                </label>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="border-gray-100 border-b bg-gray-50 px-6 py-4">
              <h3 className="font-medium text-gray-900 text-sm">
                Product Preview
              </h3>
            </div>
            <div className="p-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                {coverPreviewUrl ? (
                  // biome-ignore lint/performance/noImgElement: local object URL preview for in-form upload
                  <img
                    alt="Product preview"
                    className="h-full w-full object-cover"
                    height={720}
                    src={coverPreviewUrl}
                    width={1280}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-300">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">
                  {name.trim() || "Your Product Name"}
                </p>
                <p className="mt-1 text-gray-600 text-sm">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(previewPrice)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
