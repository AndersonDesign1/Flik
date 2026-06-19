# Plan 002: Consolidate duplicated directory/pagination helpers into one module

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- apps/web/convex/profiles.ts apps/web/convex/platform.ts`
> If either file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW-MED
- **Depends on**: `plans/001-test-baseline.md` (needs the `bun test` runner and
  `convex/lib/roles.ts` it creates)
- **Category**: tech-debt
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

`convex/profiles.ts` and `convex/platform.ts` independently re-implement the
same Better-Auth user directory machinery: the `DirectoryUser` shape, the
`isDirectoryUser` type guard, `parsePaginatedUsersResponse`, and the
"page through the entire user table 5000 at a time, max 100 iterations" loop.
That is ~120 lines duplicated across two large files. When the Better Auth
response shape or pagination contract changes, both copies must change in
lockstep or one silently rots. This plan extracts a single shared module so the
contract lives in one place. It is a **pure, behavior-preserving refactor** and
a natural predecessor to plan 003 (which optimizes this same code) — doing the
de-duplication first means 003 has one function to optimize, not two.

## Current state

Two files contain near-identical helpers. Confirm before editing.

- `apps/web/convex/profiles.ts`:
  - `interface DirectoryUser` (lines ~77–82): `_id`, optional `createdAt`,
    `email`, optional `name`.
  - `interface PaginatedUsersResponse` (lines ~84–87): `continueCursor`, `page`.
  - `isDirectoryUser` (lines ~97–110) — type guard.
  - `parsePaginatedUsersResponse` (lines ~112–130) — throws plain `Error` on
    malformed payloads.
  - Inside `getAllUsers` (lines ~207–245): the `pageSize = 5000`,
    `maxIterations = 100`, `while (true)` pagination loop calling
    `ctx.runQuery(components.betterAuth.adapter.findMany, …)`.

- `apps/web/convex/platform.ts`:
  - `interface DirectoryUser` (lines ~44–49) — identical shape.
  - `interface PaginatedUsersResponse` (lines ~51–54) — identical.
  - `isDirectoryUser` (lines ~127–140) — identical logic.
  - `parsePaginatedUsersResponse` (lines ~142–169) — same checks but throws
    `ConvexError` instead of `Error`.
  - `getAuthUsers` (lines ~171–191) — single-page fetch wrapper.
  - `buildDirectoryPeople` (lines ~193–305) — the full pagination loop +
    profile/store joining + summary reduction.

Key behavioral difference to preserve: **`profiles.ts` throws `Error`**, while
**`platform.ts` throws `ConvexError`** on malformed payloads. Keep each call
site's existing error type (see Step 2).

`components` is imported from `./_generated/api` in both files; `QueryCtx` from
`./_generated/server` in `platform.ts`.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Install   | `bun install`                        | exit 0              |
| Typecheck | `bun run typecheck` (from `apps/web`)| exit 0, no errors   |
| Lint      | `bun run lint` (from `apps/web`)     | exit 0              |
| Test      | `bun test` (from `apps/web`)         | all tests pass      |

## Scope

**In scope**:
- `apps/web/convex/lib/directory.ts` (create)
- `apps/web/convex/lib/directory.test.ts` (create)
- `apps/web/convex/profiles.ts` — import shared helpers, delete local copies
- `apps/web/convex/platform.ts` — import shared helpers, delete local copies

**Out of scope** (do NOT touch):
- Any change to query return shapes or the data each function produces — this
  is a structural refactor only. Plan 003 owns the performance rewrite.
- `buildSellerRows`, `requireSuperAdmin`, `requireOperator`,
  `normalizeUserType`, `canAccessSellerWorkspace` — leave in `platform.ts`.
- The N+1 `getAnyUserById` calls — they stay exactly as-is here; 003 fixes them.

## Git workflow

- Branch: `advisor/002-consolidate-directory-helpers`
- Commit style — conventional commits (e.g.
  `refactor(convex): extract shared user-directory pagination helpers`).
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Create the shared directory module

Create `apps/web/convex/lib/directory.ts`. Move the shared types, type guard,
parser, and pagination loop here. Make the parser's error type configurable so
both call sites keep their current behavior:

```ts
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
```

> Note: `MutationCtx` also satisfies the `ctx.runQuery` usage, but every current
> caller is a `query`, so typing the parameter as `QueryCtx` is correct. If a
> mutation ever needs this, widen the type then.

**Verify**: `cd apps/web && bun run typecheck` → exit 0.

### Step 2: Refactor `profiles.ts` to use the shared module

In `apps/web/convex/profiles.ts`:

1. Delete the local `DirectoryUser`, `PaginatedUsersResponse`,
   `isDirectoryUser`, and `parsePaginatedUsersResponse` definitions.
2. Add `import { collectAllAuthUsers } from "./lib/directory";` (and keep the
   `DirectoryUser`/etc. import only if still referenced — `DirectoryProfile`
   and `DirectoryUserSummary` are *local* and stay).
3. In `getAllUsers`, replace the entire `while (true)` pagination block (the
   `pageSize`/`maxIterations`/`cursor` loop that builds `authUsers`) with:

   ```ts
   const authUsers = await collectAllAuthUsers(
     ctx,
     (message) => new Error(message)
   );
   ```

   Leave everything after the loop (the `profileByUserId` map,
   `authBackedUsers`, `profileOnlyUsers`, final sort) unchanged.

**Verify**: `cd apps/web && bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 3: Refactor `platform.ts` to use the shared module

In `apps/web/convex/platform.ts`:

1. Delete the local `DirectoryUser`, `PaginatedUsersResponse`,
   `isDirectoryUser`, `parsePaginatedUsersResponse`, and `getAuthUsers`.
2. Add `import { collectAllAuthUsers } from "./lib/directory";`.
3. In `buildDirectoryPeople`, replace the `pageSize`/`maxIterations`/
   `while (true)` loop that fills `users` with:

   ```ts
   const users = await collectAllAuthUsers(
     ctx,
     (message) => new ConvexError({ code: "INTERNAL_ERROR", message })
   );
   ```

   `ConvexError` is already imported in `platform.ts`. Leave the rest of
   `buildDirectoryPeople` (the `profileByUserId`/`storeByOwnerId` maps,
   `authUsers` mapping, `profileOnlyPeople`, `summary`) unchanged.

**Verify**: `cd apps/web && bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 4: Add unit tests for the pure helpers

Create `apps/web/convex/lib/directory.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { isDirectoryUser, parsePaginatedUsersResponse } from "./directory";

const err = (m: string) => new Error(m);

describe("isDirectoryUser", () => {
  test("accepts a minimal valid user", () => {
    expect(isDirectoryUser({ _id: "u1", email: "a@b.com" })).toBe(true);
  });
  test("rejects missing id or email", () => {
    expect(isDirectoryUser({ email: "a@b.com" })).toBe(false);
    expect(isDirectoryUser({ _id: "u1" })).toBe(false);
    expect(isDirectoryUser(null)).toBe(false);
  });
  test("rejects wrong field types", () => {
    expect(isDirectoryUser({ _id: 1, email: "a@b.com" })).toBe(false);
    expect(isDirectoryUser({ _id: "u1", email: "a@b.com", name: 5 })).toBe(false);
  });
});

describe("parsePaginatedUsersResponse", () => {
  test("returns the page and cursor for a valid payload", () => {
    const out = parsePaginatedUsersResponse(
      { page: [{ _id: "u1", email: "a@b.com" }], continueCursor: null },
      err
    );
    expect(out.page).toHaveLength(1);
    expect(out.continueCursor).toBeNull();
  });
  test("throws via the provided factory on a malformed page", () => {
    expect(() =>
      parsePaginatedUsersResponse({ page: "nope", continueCursor: null }, err)
    ).toThrow();
  });
  test("throws on a malformed cursor", () => {
    expect(() =>
      parsePaginatedUsersResponse({ page: [], continueCursor: 5 }, err)
    ).toThrow();
  });
});
```

**Verify**: `cd apps/web && bun test` → all tests pass (001's tests plus these).

## Test plan

- New tests: `convex/lib/directory.test.ts` — type-guard accept/reject cases and
  parser happy-path + two malformed-payload paths.
- Pattern: model after `convex/lib/roles.test.ts` from plan 001.
- The behavior of the refactored queries is covered only structurally here
  (typecheck + the pure-helper tests); their output shape is unchanged by
  design. Confirm via the done criteria below.
- Verification: `cd apps/web && bun test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `cd apps/web && bun test` exits 0 with the new directory tests passing
- [ ] `cd apps/web && bun run typecheck` exits 0
- [ ] `cd apps/web && bun run lint` exits 0
- [ ] `grep -rn "maxIterations" apps/web/convex/profiles.ts apps/web/convex/platform.ts` returns **no** matches (loop now lives only in `lib/directory.ts`)
- [ ] `grep -rn "function isDirectoryUser\|function parsePaginatedUsersResponse" apps/web/convex/profiles.ts apps/web/convex/platform.ts` returns **no** matches
- [ ] `apps/web/convex/lib/directory.ts` exists and is imported by both files
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row for 002 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The helper code in either file does not match the "Current state" excerpts.
- Plan 001 has not landed (no `bun test` script, no `convex/lib/roles.ts`) —
  this plan depends on it.
- The `ctx.runQuery(components.betterAuth.adapter.findMany, …)` call signature
  in the live code differs from the excerpt (the Better Auth component API
  changed) — moving it could silently change behavior.
- After refactoring, `getAllUsers` or any `platform.ts` query changes its
  returned data in a way you can observe — STOP; the refactor must be
  behavior-preserving.
- Any verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Plan 003 optimizes `collectAllAuthUsers`/`buildDirectoryPeople` for
  performance; it should build on this single shared module.
- If a future caller needs a single page rather than the whole table, add a
  separate exported helper rather than re-inlining `findMany`.
- Reviewer should diff the JSON shape returned by `getAllUsers`,
  `getStaffOverview`, `getSuperAdminOverview`, and `getSuperAdminPeopleDirectory`
  before/after to confirm no behavior change.
