import { components } from "../_generated/api";
import type { QueryCtx } from "../_generated/server";

export interface DirectoryUser {
  _id: string;
  createdAt?: number;
  email: string;
  name?: string;
}

export interface PaginatedUsersResponse {
  continueCursor: string | null;
  page: DirectoryUser[];
}

export function isDirectoryUser(value: unknown): value is DirectoryUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate._id === "string" &&
    typeof candidate.email === "string" &&
    (candidate.name === undefined || typeof candidate.name === "string") &&
    (candidate.createdAt === undefined ||
      typeof candidate.createdAt === "number")
  );
}

export function parsePaginatedUsersResponse(
  value: unknown,
  makeError: (message: string) => Error
): PaginatedUsersResponse {
  if (typeof value !== "object" || value === null) {
    throw makeError("Invalid Better Auth user page response");
  }
  const candidate = value as Record<string, unknown>;
  const page = candidate.page;
  const continueCursor = candidate.continueCursor;
  if (!(Array.isArray(page) && page.every(isDirectoryUser))) {
    throw makeError("Better Auth user page payload is malformed");
  }
  if (!(continueCursor === null || typeof continueCursor === "string")) {
    throw makeError("Better Auth pagination cursor is malformed");
  }
  return { continueCursor, page };
}

const USER_PAGE_SIZE = 5000;
const MAX_USER_PAGE_ITERATIONS = 100;

/**
 * Page through the entire Better Auth user table.
 * `makeError` lets callers choose their error type (Error vs ConvexError).
 */
export async function collectAllAuthUsers(
  ctx: QueryCtx,
  makeError: (message: string) => Error
): Promise<DirectoryUser[]> {
  const users: DirectoryUser[] = [];
  let cursor: string | null = null;
  let iteration = 0;

  while (true) {
    iteration += 1;
    if (iteration > MAX_USER_PAGE_ITERATIONS) {
      throw makeError(
        "Exceeded Better Auth pagination safeguard while loading users"
      );
    }
    const rawResponse = await ctx.runQuery(
      components.betterAuth.adapter.findMany,
      {
        model: "user",
        paginationOpts: { cursor, numItems: USER_PAGE_SIZE },
        sortBy: { direction: "desc", field: "createdAt" },
      }
    );
    const response = parsePaginatedUsersResponse(rawResponse, makeError);
    users.push(...response.page);
    if (!response.continueCursor) {
      break;
    }
    cursor = response.continueCursor;
  }

  return users;
}
