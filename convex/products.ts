import { v } from "convex/values";
import type { MutationCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

const MAX_FILE_COUNT = 20;

const productFileValidator = v.object({
  storageId: v.id("_storage"),
  fileName: v.string(),
  fileSize: v.number(),
  mimeType: v.optional(v.string()),
});

function getStorageIdsFromProduct(product: {
  coverStorageId?: string;
  files: Array<{ storageId: string }>;
}) {
  const fileStorageIds = product.files.map((file) => file.storageId);
  return product.coverStorageId
    ? [product.coverStorageId, ...fileStorageIds]
    : fileStorageIds;
}

async function isStorageOwnedByUserProducts(
  ctx: MutationCtx,
  userId: string,
  storageId: string
) {
  const ownedProducts = await ctx.db
    .query("products")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .collect();

  return ownedProducts.some((product) =>
    getStorageIdsFromProduct(product).some((id) => id === storageId)
  );
}

export const generateProductUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const registerUploadedFile = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileSize: v.number(),
    mimeType: v.optional(v.string()),
  },
  returns: v.id("product_uploads"),
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const existingRegistration = await ctx.db
      .query("product_uploads")
      .withIndex("by_user_id_storage_id", (q) =>
        q.eq("userId", user._id).eq("storageId", args.storageId)
      )
      .first();

    if (existingRegistration) {
      await ctx.db.patch(existingRegistration._id, {
        fileName: args.fileName,
        fileSize: args.fileSize,
        mimeType: args.mimeType,
        updatedAt: Date.now(),
      });
      return existingRegistration._id;
    }

    return await ctx.db.insert("product_uploads", {
      userId: user._id,
      storageId: args.storageId,
      fileName: args.fileName,
      fileSize: args.fileSize,
      mimeType: args.mimeType,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const deleteUploadedFile = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const uploadRegistration = await ctx.db
      .query("product_uploads")
      .withIndex("by_user_id_storage_id", (q) =>
        q.eq("userId", user._id).eq("storageId", args.storageId)
      )
      .first();

    const isOwnedByProduct = await isStorageOwnedByUserProducts(
      ctx,
      user._id,
      args.storageId
    );

    if (!(uploadRegistration || isOwnedByProduct)) {
      throw new Error("Not authorized to delete this file");
    }

    if (uploadRegistration) {
      await ctx.db.delete(uploadRegistration._id);
    }

    await ctx.storage.delete(args.storageId);
    return null;
  },
});

export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    allowCustomPrice: v.boolean(),
    status: v.union(v.literal("draft"), v.literal("active")),
    coverStorageId: v.optional(v.id("_storage")),
    files: v.array(productFileValidator),
  },
  returns: v.id("products"),
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const name = args.name.trim();
    if (!name) {
      throw new Error("Product name is required");
    }

    const description = args.description.trim();
    if (args.status === "active" && !description) {
      throw new Error("Description is required to publish");
    }

    if (args.price < 0) {
      throw new Error("Price must be 0 or greater");
    }

    if (
      args.compareAtPrice !== undefined &&
      args.compareAtPrice > 0 &&
      args.compareAtPrice < args.price
    ) {
      throw new Error(
        "Compare-at price must be greater than or equal to price"
      );
    }

    if (args.files.length > MAX_FILE_COUNT) {
      throw new Error(`Maximum ${MAX_FILE_COUNT} product files allowed`);
    }

    const requiredStorageIds = [
      ...(args.coverStorageId ? [args.coverStorageId] : []),
      ...args.files.map((file) => file.storageId),
    ];

    const uploadRegistrations = requiredStorageIds.length
      ? await Promise.all(
          requiredStorageIds.map((storageId) =>
            ctx.db
              .query("product_uploads")
              .withIndex("by_user_id_storage_id", (q) =>
                q.eq("userId", user._id).eq("storageId", storageId)
              )
              .first()
          )
        )
      : [];

    if (uploadRegistrations.some((registration) => !registration)) {
      throw new Error("One or more files are not owned by the current user");
    }

    const now = Date.now();

    const productId = await ctx.db.insert("products", {
      userId: user._id,
      name,
      description,
      category: args.category,
      tags: args.tags,
      price: args.price,
      compareAtPrice: args.compareAtPrice,
      allowCustomPrice: args.allowCustomPrice,
      status: args.status,
      coverStorageId: args.coverStorageId,
      files: args.files,
      createdAt: now,
      updatedAt: now,
    });

    await Promise.all(
      uploadRegistrations
        .filter((registration) => registration !== null)
        .map((registration) => ctx.db.delete(registration._id))
    );

    return productId;
  },
});

export const listMyProducts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("products"),
      name: v.string(),
      status: v.union(
        v.literal("active"),
        v.literal("draft"),
        v.literal("archived")
      ),
      price: v.number(),
      inventory: v.number(),
      sales: v.number(),
      coverUrl: v.optional(v.string()),
    })
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return [];
    }

    const products = await ctx.db
      .query("products")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return await Promise.all(
      products.map(async (product) => ({
        _id: product._id,
        name: product.name,
        status: product.status,
        price: product.price,
        inventory: product.files.length,
        sales: 0,
        coverUrl: product.coverStorageId
          ? ((await ctx.storage.getUrl(product.coverStorageId)) ?? undefined)
          : undefined,
      }))
    );
  },
});
