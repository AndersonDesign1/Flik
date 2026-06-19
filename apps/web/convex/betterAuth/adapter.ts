import { convexAdapter, createApi } from "@convex-dev/better-auth";
import { createAuthOptions } from "../authOptions";
import schema from "./schema";

export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, (ctx) =>
  createAuthOptions(ctx, convexAdapter(ctx, {} as never), {
    forSchemaGeneration: true,
  })
);