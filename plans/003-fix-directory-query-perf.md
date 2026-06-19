# Plan 003: Eliminate N+1 user lookups in admin/staff directory queries

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- apps/web/convex/platform.ts`
> If `platform.ts` changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/001-test-baseline.md`, `plans/002-consolidate-directory-helpers.md`
- **Category**: perf
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

Every staff / super-admin dashboard load runs queries in `convex/platform.ts`
that issue **one `authComponent.getAnyUserById` call per store and per product**
on top of already paging the *entire* Better Auth user table into memory. In
`getStaffOverview` the same user data is fetched three different ways in a single
request: `buildDirectoryPeople` pages every user, `buildSellerRows` then calls
`getAnyUserById` once per store, and `recentProducts` calls it again per product.
Because `buildDirectoryPeople` has already loaded **every** user, those per-row
lookups are entirely redundant — the owner record is already in memory.

This plan removes the redundant per-row lookups by threading the already-fetched
user list (as a `Map`) into the row builders. It is **output-preserving**: the
same fields, same values, same ordering. It does **not** attempt to fix the
whole-table `.collect()` scans (see Maintenance notes) — that is a deliberate
boundary to keep this change low-risk.

## Current state

Confirm these in `apps/web/convex/platform.ts` before editing.

- `buildDirectoryPeople(ctx, profiles, stores)` (after plan 002) calls
  `collectAllAuthUsers(ctx, …)` to get **all** users, builds `authUsers`
  (each joined to its profile/store), then a `profileOnlyPeople` list for
  profiles whose `userId` is not in the auth set, and returns `{ people, summary }`.
  Every user that exists is therefore represented in `people` (with `_id`,
  `email`, `name`, `createdAt`, `role`, `storeName`, `storeSlug`, `userType`).

- `buildSellerRows(ctx, stores, products, profiles)` (lines ~307–355) does, per
  store: `const owner = await authComponent.getAnyUserById(ctx, store.ownerId);`
  then uses `owner?.email` / `owner?.name`. **N getAnyUserById calls.**

- `getStaffOverview` (lines ~592–682):
  - `const directory = await buildDirectoryPeople(ctx, profiles, stores);`
  - `recentProducts` maps the 5 newest products, each calling
    `authComponent.getAnyUserById(ctx, product.userId)` (≤5 calls).
  - `const sellerRows = await buildSellerRows(ctx, stores, products, profiles);`

- `listStaffProducts` (lines ~684–734): maps **all** products, each calling
  `authComponent.getAnyUserById(ctx, product.userId)` — **unbounded N+1**, and it
  does *not* currently call `buildDirectoryPeople`.

- `listSellerPerformance` (lines ~527–555): calls `buildSellerRows` directly —
  also does *not* currently load the directory.

- `getSuperAdminOverview` (lines ~423–482) and `getSuperAdminPeopleDirectory`
  (lines ~557–590) call `buildDirectoryPeople`; `getSuperAdminOverview`'s
  `recentStores` does ≤5 `getAnyUserById` calls.

The user object returned by `getAnyUserById` exposes `email`, `name`,
`createdAt`. The `DirectoryPerson` objects in `buildDirectoryPeople`'s `people`
carry exactly those (`email`, `name`, `createdAt`) keyed by `_id`. So a
`Map<userId, { email; name?; createdAt }>` built from `people` is a drop-in
substitute for the per-row `getAnyUserById` results.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Install   | `bun install`                        | exit 0              |
| Typecheck | `bun run typecheck` (from `apps/web`)| exit 0, no errors   |
| Lint      | `bun run lint` (from `apps/web`)     | exit 0              |
| Test      | `bun test` (from `apps/web`)         | all tests pass      |

## Scope

**In scope**:
- `apps/web/convex/platform.ts` only.

**Out of scope** (do NOT touch):
- The `ctx.db.query("…").collect()` whole-table scans. Do **not** try to add
  pagination/indexes to them in this plan — it changes aggregate semantics and
  is a separate effort. (See Maintenance notes / STOP conditions.)
- `convex/profiles.ts` `getAllUsers` — leave it; it already builds a user map.
- Return validators (`returns: v.object({…})`) — outputs must not change, so
  validators must not change.
- `convex/lib/directory.ts` — keep `collectAllAuthUsers` as the single source.

## Git workflow

- Branch: `advisor/003-fix-directory-query-perf`
- Commit style — conventional commits (e.g.
  `perf(convex): reuse loaded user directory to drop N+1 lookups`).
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Add a reusable "load all users as a map" helper

In `apps/web/convex/platform.ts`, add a small helper (near the other
module-level functions) that returns both the list and a lookup map, built on
the shared `collectAllAuthUsers` from plan 002:

```ts
type AuthUserRecord = { _id: string; email: string; name?: string; createdAt?: number };

async function loadAuthUserMap(ctx: QueryCtx) {
  const users = await collectAllAuthUsers(
    ctx,
    (message) => new ConvexError({ code: "INTERNAL_ERROR", message })
  );
  const byId = new Map<string, AuthUserRecord>(
    users.map((user) => [user._id, user] as const)
  );
  return { users, byId };
}
```

(`collectAllAuthUsers`, `QueryCtx`, and `ConvexError` are already imported.)

**Verify**: `cd apps/web && bun run typecheck` → exit 0.

### Step 2: Make `buildSellerRows` accept a user map instead of fetching per row

Change `buildSellerRows` to take a `Map<string, AuthUserRecord>` and read owners
from it. It no longer needs `ctx` for user lookups, so it becomes synchronous:

```ts
function buildSellerRows(
  usersById: Map<string, AuthUserRecord>,
  stores: DirectoryStore[],
  products: Array<{ /* unchanged shape */ }>,
  profiles: DirectoryProfile[]
) {
  const profileByUserId = new Map(
    profiles.map((entry) => [entry.userId, entry] as const)
  );

  return stores.map((store) => {
    const owner = usersById.get(store.ownerId);
    const ownerProfile = profileByUserId.get(store.ownerId);
    const ownedProducts = products.filter(
      (product) => product.userId === store.ownerId
    );
    return {
      activeProducts: ownedProducts.filter((p) => p.status === "active").length,
      createdAt: store.createdAt,
      name: store.name,
      ownerEmail: owner?.email ?? "Unknown",
      ownerName: owner?.name ?? owner?.email ?? "Store owner",
      slug: store.slug,
      status: store.status,
      totalProducts: ownedProducts.length,
      totalSales: ownedProducts.reduce((t, p) => t + (p.sales ?? 0), 0),
      userType:
        normalizeUserType(ownerProfile?.userType) ??
        (canAccessSellerWorkspace(ownerProfile?.userType) ? "seller" : undefined),
    };
  });
}
```

Keep every field name and fallback string identical to the current code
(`"Unknown"`, `"Store owner"`). Since it's now synchronous, callers stop using
`await`/`Promise.all` around it.

**Verify** after updating callers (Step 3): typecheck.

### Step 3: Update the callers to share one user map

- **`listSellerPerformance`**: load the map, pass it in:
  ```ts
  const [stores, products, profiles] = await Promise.all([...]); // unchanged
  const { byId } = await loadAuthUserMap(ctx);
  return buildSellerRows(byId, stores, products, profiles);
  ```

- **`getStaffOverview`**: it already calls `buildDirectoryPeople`. Reuse that
  directory's people as the map source so users are loaded **once**:
  ```ts
  const directory = await buildDirectoryPeople(ctx, profiles, stores);
  const usersById = new Map(
    directory.people.map((person) => [
      person._id,
      { _id: person._id, email: person.email, name: person.name, createdAt: person.createdAt },
    ] as const)
  );
  ```
  Then:
  - `recentProducts`: replace `await authComponent.getAnyUserById(ctx, product.userId)`
    with `usersById.get(product.userId)` (drop the `async`/`await`/`Promise.all`
    if no longer needed — the mapper becomes synchronous). Keep the
    `owner?.name ?? owner?.email ?? "Seller"` fallback.
  - `sellerRows`: `const sellerRows = buildSellerRows(usersById, stores, products, profiles);`

- **`getSuperAdminOverview`**: build `usersById` from its `buildDirectoryPeople`
  result the same way, and have `recentStores` read owners from `usersById`
  instead of `getAnyUserById`. Keep `owner?.name ?? owner?.email ?? "Store owner"`.

- **`listStaffProducts`**: it does not currently load the directory. Add
  `const { byId } = await loadAuthUserMap(ctx);` and replace the per-product
  `await authComponent.getAnyUserById(ctx, product.userId)` with
  `byId.get(product.userId)`. Keep the `"Unknown"` / `"Seller"` fallbacks. The
  mapper becomes synchronous — return the plain mapped array.

> **Important fallback-parity note**: `buildDirectoryPeople`'s `profileOnlyPeople`
> branch sets `email: "Unknown"` for profiles with no auth user. That means a
> store/product owned by a profile-only user resolves to `email: "Unknown"` via
> the map — which matches the *current* `getAnyUserById` → `owner?.email ?? "Unknown"`
> behavior. Owners with neither profile nor auth record were already "Unknown"
> before. Parity holds. If you find a case where the map is missing a `userId`
> that products/stores reference, the `?? "Unknown"` / `?? "Store owner"` /
> `?? "Seller"` fallbacks preserve the old output.

**Verify**: `cd apps/web && bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 4: Confirm no remaining per-row user fetches in the row builders

```
grep -n "getAnyUserById" apps/web/convex/platform.ts
```

Expected after this plan: matches remain **only** inside `buildDirectoryPeople`'s
`profileOnlyPeople` branch (which intentionally looks up the *small* set of
profile-only users). There should be **no** `getAnyUserById` inside
`buildSellerRows`, `listStaffProducts`, `recentProducts`, or `recentStores`.

**Verify**: the grep output matches the expectation above.

## Test plan

- This change is output-preserving, so the guard is **typecheck + lint + the
  existing `bun test` suite** plus a manual behavioral diff (below). No return
  validators change, which is itself a strong invariant: if the shape changed,
  `tsc` and Convex's `returns` validators would reject it.
- Manual behavioral check (recommended, not blocking): if a dev Convex
  deployment is available, call `getStaffOverview` / `listStaffProducts` /
  `listSellerPerformance` before and after and diff the JSON. If no deployment
  is available, rely on typecheck + the unchanged `returns` validators.
- Run `cd apps/web && bun test` → all existing tests still pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `cd apps/web && bun run typecheck` exits 0
- [ ] `cd apps/web && bun run lint` exits 0
- [ ] `cd apps/web && bun test` exits 0
- [ ] `grep -n "getAnyUserById" apps/web/convex/platform.ts` shows matches only
      inside `buildDirectoryPeople` (none in `buildSellerRows`,
      `listStaffProducts`, or the `recentProducts`/`recentStores` mappers)
- [ ] No `returns:` validator in `platform.ts` was changed (`git diff` shows
      only handler-body / helper-signature changes)
- [ ] Only `apps/web/convex/platform.ts` is modified (`git status`)
- [ ] `plans/README.md` status row for 003 updated

## STOP conditions

Stop and report back (do not improvise) if:

- Plans 001/002 have not landed (`convex/lib/directory.ts` /
  `collectAllAuthUsers` missing).
- The functions in `platform.ts` don't match the "Current state" excerpts.
- You discover a place where `getAnyUserById` returns a field that the
  `DirectoryPerson` map does **not** carry (so the map can't substitute) —
  STOP rather than guessing.
- You find yourself needing to change a `returns:` validator to make types pass
  — that means an output shape is drifting; STOP.
- You are tempted to also paginate/replace the `.collect()` scans — that is
  explicitly out of scope; STOP and note it as follow-up.

## Maintenance notes

- **Deferred, by design**: the `.collect()` of entire `profiles`/`stores`/
  `products` tables and the full user-table pagination remain. These cap how
  far the admin dashboards scale (Convex function memory/time limits) and are
  the next perf effort once data volume warrants it — likely an aggregate/
  counter table or incremental rollups rather than per-request full scans.
- If a future change makes `buildDirectoryPeople` stop returning every user
  (e.g. it gets paginated), the map-reuse in `getStaffOverview` /
  `getSuperAdminOverview` must be revisited — they assume the directory contains
  every owner.
- Reviewer should scrutinize fallback parity (`"Unknown"`, `"Store owner"`,
  `"Seller"`) and confirm no `returns` validator changed.
