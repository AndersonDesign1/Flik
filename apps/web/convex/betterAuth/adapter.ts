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
  // `forAdapterInit` builds the options object the CRUD adapter needs for
  // table/schema resolution without requiring the full runtime env. The CRUD
  // handlers below do not consume the env-gated options (baseURL,
  // haveIBeenPwned, socialProviders), so this does not affect data operations.
  createAuthOptions(ctx, convexAdapter(ctx, {} as never), {
    forAdapterInit: true,
  })
);
