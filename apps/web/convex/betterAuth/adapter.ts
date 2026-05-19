import { createApi } from "@convex-dev/better-auth";
import schema from "./schema";
import { getSharedAuthPlugins } from "./shared-plugins";

// Minimal auth options for schema validation only — no env vars needed.
// This must declare the same plugins as the full createAuthOptions in ../auth.ts
// so that the schema validators include all plugin fields.
const createSchemaOptions = () => ({
  emailAndPassword: { enabled: true },
  plugins: getSharedAuthPlugins(),
});

export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, createSchemaOptions);
