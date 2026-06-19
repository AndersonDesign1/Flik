"use node";

import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { betterAuth } from "better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authSchema from "./betterAuth/schema";
import { createAuthOptions } from "./authOptions";

export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
  }
);

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(ctx, authComponent.adapter(ctx)));
