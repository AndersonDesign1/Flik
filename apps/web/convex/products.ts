import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
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

async function getOwnedProductOrThrow(
  ctx: MutationCtx,
  userId: string,
  productId: Id<"products">
) {
  const product = await ctx.db.get(productId);
  if (!product || product.userId !== userId) {
    throw new Error("Product not found");
  }

  return product;
}

async function assertSellerWorkspaceAccess(ctx: MutationCtx, userId: string) {
  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .first();

  if (!(profile?.userType === "seller" || profile?.userType === "both")) {
    throw new Error("Seller workspace required");
  }
}

export const generateProductUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    await assertSellerWorkspaceAccess(ctx, user._id);

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
    await assertSellerWorkspaceAccess(ctx, user._id);

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
    await assertSellerWorkspaceAccess(ctx, user._id);

    const uploadRegistration = await ctx.db
      .query("product_uploads")
      .withIndex("by_user_id_storage_id", (q) =>
        q.eq("userId", user._id).eq("storageId", args.storageId)
      )
      .first();

    if (!uploadRegistration) {
      throw new Error("Only pending uploads can be deleted directly");
    }

    await ctx.db.delete(uploadRegistration._id);

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
    await assertSellerWorkspaceAccess(ctx, user._id);

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
      sales: 0,
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
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return {
        page: [],
        isDone: true,
        continueCursor: args.paginationOpts.cursor,
        splitCursor: null,
        pageStatus: null,
      };
    }

    const paginatedProducts = await ctx.db
      .query("products")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .order("desc")
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      paginatedProducts.page.map(async (product) => ({
        _id: product._id,
        name: product.name,
        status: product.status,
        price: product.price,
        inventory: product.files.length,
        sales: product.sales ?? 0,
        coverUrl: product.coverStorageId
          ? ((await ctx.storage.getUrl(product.coverStorageId)) ?? undefined)
          : undefined,
      }))
    );

    return {
      ...paginatedProducts,
      page,
    };
  },
});

export const getMyProductForEdit = query({
  args: {
    productId: v.id("products"),
  },
  returns: v.union(
    v.object({
      _id: v.id("products"),
      name: v.string(),
      description: v.string(),
      category: v.string(),
      tags: v.array(v.string()),
      price: v.number(),
      compareAtPrice: v.optional(v.number()),
      allowCustomPrice: v.boolean(),
      status: v.union(v.literal("draft"), v.literal("active")),
      coverStorageId: v.optional(v.id("_storage")),
      coverUrl: v.optional(v.string()),
      files: v.array(productFileValidator),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }

    const product = await ctx.db.get(args.productId);
    if (!product || product.userId !== user._id) {
      return null;
    }

    if (product.status === "archived") {
      return null;
    }

    const coverUrl = product.coverStorageId
      ? await ctx.storage.getUrl(product.coverStorageId)
      : undefined;

    return {
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      tags: product.tags,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      allowCustomPrice: product.allowCustomPrice,
      status: product.status,
      coverStorageId: product.coverStorageId,
      coverUrl: coverUrl ?? undefined,
      files: product.files,
    };
  },
});

export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
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
    await assertSellerWorkspaceAccess(ctx, user._id);

    const currentProduct = await getOwnedProductOrThrow(
      ctx,
      user._id,
      args.productId
    );

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

    const nextStorageIds = new Set<string>([
      ...(args.coverStorageId ? [args.coverStorageId] : []),
      ...args.files.map((file) => file.storageId),
    ]);

    const existingStorageIds = new Set(
      getStorageIdsFromProduct(currentProduct)
    );

    const newlyAddedStorageIds = [...nextStorageIds].filter(
      (storageId) => !existingStorageIds.has(storageId)
    );

    const newRegistrations = newlyAddedStorageIds.length
      ? await Promise.all(
          newlyAddedStorageIds.map((storageId) =>
            ctx.db
              .query("product_uploads")
              .withIndex("by_user_id_storage_id", (q) =>
                q
                  .eq("userId", user._id)
                  .eq("storageId", storageId as Id<"_storage">)
              )
              .first()
          )
        )
      : [];

    if (newRegistrations.some((registration) => !registration)) {
      throw new Error("One or more files are not owned by the current user");
    }

    const removedStorageIds = [...existingStorageIds].filter(
      (storageId) => !nextStorageIds.has(storageId)
    );

    await ctx.db.patch(args.productId, {
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
      updatedAt: Date.now(),
    });

    await Promise.all(
      newRegistrations
        .filter((registration) => registration !== null)
        .map((registration) => ctx.db.delete(registration._id))
    );

    await Promise.all(
      removedStorageIds.map(async (storageId) => {
        await ctx.storage.delete(storageId as Id<"_storage">);
      })
    );

    return args.productId;
  },
});

export const deleteProduct = mutation({
  args: {
    productId: v.id("products"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    await assertSellerWorkspaceAccess(ctx, user._id);

    const product = await getOwnedProductOrThrow(ctx, user._id, args.productId);
    const storageIds = getStorageIdsFromProduct(product);

    await ctx.db.delete(args.productId);

    await Promise.all(
      storageIds.map(async (storageId) => {
        await ctx.storage.delete(storageId as Id<"_storage">);
      })
    );

    return null;
  },
});
