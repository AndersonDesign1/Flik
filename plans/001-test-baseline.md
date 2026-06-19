# Plan 001: Establish a test baseline and cover role-normalization + input validation

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- apps/web/convex/profiles.ts apps/web/convex/platform.ts apps/web/convex/validation.ts apps/web/package.json`
> If any of those files changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

This repository has **zero automated tests** and no test runner configured
(`apps/web/package.json` has no `test` script; no `*.test.*` files exist).
The most security-sensitive logic in the codebase — role normalization
(including the legacy `"admin"` → `"staff"` mapping that several authorization
checks silently depend on) and the Zod input validators — has no guardrail. A
one-character change to `normalizeRole` could grant or revoke privileged access
with nothing to catch it.

This plan stands up a fast, zero-dependency test runner (`bun test`, matching
the repo's Bun-first toolchain) and writes the first tests over the pure,
deterministic, security-relevant logic. It also extracts the duplicated role
helpers into one shared module so there is a single, tested source of truth.
**Plans 002 and 003 depend on this** — they refactor the same authorization-
adjacent query code and need these tests as a safety net.

## Current state

- `apps/web/convex/profiles.ts` — defines the canonical role helpers (lines 8–36):

  ```ts
  const roleHierarchy = { user: 0, staff: 1, super_admin: 2 } as const;
  type PlatformRole = keyof typeof roleHierarchy;

  function getRoleLevel(role?: string): number {
    const normalizedRole = normalizeRole(role);
    return roleHierarchy[normalizedRole] ?? 0;
  }
  function canManageUsers(role?: string): boolean {
    const normalizedRole = normalizeRole(role);
    return normalizedRole === "staff" || normalizedRole === "super_admin";
  }
  function normalizeRole(role?: string | null): PlatformRole {
    if (role === "admin") return "staff";
    if (role === "staff" || role === "super_admin") return role;
    return "user";
  }
  ```

- `apps/web/convex/platform.ts` — defines a **second, independent copy** of
  `normalizeRole` (lines 67–77) with identical behavior. This duplication is
  the drift risk this plan starts to remove.

- `apps/web/convex/validation.ts` — exported Zod schemas, already importable
  with no Convex runtime dependency (imports only `zod/v4`):
  `updateProfileSchema`, `inviteToRoleSchema` (lowercases + trims email),
  `createStoreSchema`.

- **Convex helper-module convention**: non-function modules live alongside
  functions in `convex/` and are imported by handlers. `convex/validation.ts`
  is the exemplar — a plain module with no `query`/`mutation` export, imported
  by `profiles.ts` and `stores.ts`. A new `convex/lib/roles.ts` follows the
  same pattern. `convex/tsconfig.json` includes `./**/*` (excluding
  `_generated`), so a `lib/` subfolder is compiled automatically.

- **Test imports**: use Bun's built-in runner. Import test primitives
  explicitly from `"bun:test"` (`import { describe, expect, test } from "bun:test";`).
  Types for that module come from `@types/bun`, added in Step 1.

## Commands you will need

| Purpose   | Command                              | Expected on success      |
|-----------|--------------------------------------|--------------------------|
| Install   | `bun install`                        | exit 0                   |
| Typecheck | `bun run typecheck` (from `apps/web`)| exit 0, no errors        |
| Lint      | `bun run lint` (from `apps/web`)     | exit 0                   |
| Test      | `bun test` (from `apps/web`)         | all tests pass           |
| Format    | `bun x ultracite check` (from `apps/web`) | exit 0 (optional)   |

All `cd` examples assume repo root `…/Flik`. Run app commands from `apps/web`.

## Scope

**In scope** (the only files you should create/modify):
- `apps/web/package.json` — add `"test": "bun test"` script + `@types/bun` devDep
- `apps/web/convex/lib/roles.ts` (create)
- `apps/web/convex/lib/roles.test.ts` (create)
- `apps/web/convex/validation.test.ts` (create)
- `apps/web/convex/profiles.ts` — replace local role helpers with imports
- `apps/web/convex/platform.ts` — replace local `normalizeRole` with import

**Out of scope** (do NOT touch, even though they look related):
- `apps/web/convex/platform.ts` `normalizeUserType` / `canAccessSellerWorkspace`
  and the `DirectoryUser` / pagination helpers — those belong to plan 002.
- Any change to query/mutation behavior, args, or return validators.
- `src/lib/roles.ts` (a *frontend* presentation helper, unrelated to the
  Convex role logic) — leave it alone.
- Slug helpers in `products.ts` / `stores.ts`.

## Git workflow

- Branch: `advisor/001-test-baseline`
- Commit style — conventional commits, matching `git log` (e.g.
  `test: add role + validation unit tests and bun test runner`).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the test runner and Bun types

In `apps/web/package.json`, add a `test` script next to the existing scripts:

```jsonc
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "biome check",
  "format": "biome format --write",
  "typecheck": "tsc --noEmit",
  "test": "bun test"
}
```

Then add the Bun type definitions so `tsc` understands `bun:test`:

```
cd apps/web && bun add -d @types/bun
```

**Verify**: `cd apps/web && bun run typecheck` → exit 0 (confirms adding
`@types/bun` did not break the existing typecheck).

### Step 2: Create the shared role module

Create `apps/web/convex/lib/roles.ts` by moving the role helpers verbatim out
of `profiles.ts` and exporting them:

```ts
export const roleHierarchy = {
  user: 0,
  staff: 1,
  super_admin: 2,
} as const;

export type PlatformRole = keyof typeof roleHierarchy;

export function normalizeRole(role?: string | null): PlatformRole {
  if (role === "admin") {
    return "staff";
  }
  if (role === "staff" || role === "super_admin") {
    return role;
  }
  return "user";
}

export function getRoleLevel(role?: string): number {
  return roleHierarchy[normalizeRole(role)] ?? 0;
}

export function canManageUsers(role?: string): boolean {
  const normalizedRole = normalizeRole(role);
  return normalizedRole === "staff" || normalizedRole === "super_admin";
}
```

**Verify**: `cd apps/web && bun run typecheck` → exit 0.

### Step 3: Point `profiles.ts` and `platform.ts` at the shared module

In `apps/web/convex/profiles.ts`: delete the local `roleHierarchy`,
`PlatformRole`, `getRoleLevel`, `canManageUsers`, and `normalizeRole`
definitions (lines ~8–36) and add an import at the top:

```ts
import {
  canManageUsers,
  getRoleLevel,
  normalizeRole,
  type PlatformRole,
} from "./lib/roles";
```

Keep `WHITESPACE_REGEX` and every other helper in `profiles.ts` exactly as-is.

In `apps/web/convex/platform.ts`: delete the local `normalizeRole` (lines
~67–77) and import it from `./lib/roles`:

```ts
import { normalizeRole } from "./lib/roles";
```

Leave `platform.ts`'s `PlatformRole` type alias, `normalizeUserType`,
`canAccessSellerWorkspace`, `requireSuperAdmin`, `requireOperator`, etc.
untouched. (Note: `platform.ts` keeps its own local `PlatformRole` string-union
type used in its interfaces — do not remove it in this plan; only remove the
duplicated `normalizeRole` function.)

**Verify**: `cd apps/web && bun run typecheck` → exit 0, and
`cd apps/web && bun run lint` → exit 0.

### Step 4: Write role unit tests

Create `apps/web/convex/lib/roles.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { canManageUsers, getRoleLevel, normalizeRole } from "./roles";

describe("normalizeRole", () => {
  test("maps legacy admin to staff", () => {
    expect(normalizeRole("admin")).toBe("staff");
  });
  test("passes through staff and super_admin", () => {
    expect(normalizeRole("staff")).toBe("staff");
    expect(normalizeRole("super_admin")).toBe("super_admin");
  });
  test("defaults unknown / null / undefined to user", () => {
    expect(normalizeRole(undefined)).toBe("user");
    expect(normalizeRole(null)).toBe("user");
    expect(normalizeRole("")).toBe("user");
    expect(normalizeRole("root")).toBe("user");
  });
});

describe("getRoleLevel", () => {
  test("orders user < staff < super_admin", () => {
    expect(getRoleLevel("user")).toBeLessThan(getRoleLevel("staff"));
    expect(getRoleLevel("staff")).toBeLessThan(getRoleLevel("super_admin"));
  });
  test("treats legacy admin at staff level", () => {
    expect(getRoleLevel("admin")).toBe(getRoleLevel("staff"));
  });
});

describe("canManageUsers", () => {
  test("true for staff and super_admin only", () => {
    expect(canManageUsers("staff")).toBe(true);
    expect(canManageUsers("super_admin")).toBe(true);
    expect(canManageUsers("admin")).toBe(true); // legacy → staff
    expect(canManageUsers("user")).toBe(false);
    expect(canManageUsers(undefined)).toBe(false);
  });
});
```

**Verify**: `cd apps/web && bun test` → all tests pass (≥ 8 assertions).

### Step 5: Write validation unit tests

Create `apps/web/convex/validation.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import {
  createStoreSchema,
  inviteToRoleSchema,
  updateProfileSchema,
} from "./validation";

describe("inviteToRoleSchema", () => {
  test("lowercases and trims the email", () => {
    const parsed = inviteToRoleSchema.parse({
      email: "  Person@Example.COM ",
      role: "staff",
    });
    expect(parsed.email).toBe("person@example.com");
  });
  test("rejects an invalid email", () => {
    expect(() =>
      inviteToRoleSchema.parse({ email: "not-an-email", role: "staff" })
    ).toThrow();
  });
  test("rejects a role outside the allowed set", () => {
    expect(() =>
      inviteToRoleSchema.parse({ email: "a@b.com", role: "super_user" })
    ).toThrow();
  });
});

describe("updateProfileSchema", () => {
  test("accepts an empty object (all fields optional)", () => {
    expect(() => updateProfileSchema.parse({})).not.toThrow();
  });
  test("rejects a first name over 100 chars", () => {
    expect(() =>
      updateProfileSchema.parse({ firstName: "a".repeat(101) })
    ).toThrow();
  });
  test("rejects more than 10 offer types", () => {
    expect(() =>
      updateProfileSchema.parse({ offerTypes: Array(11).fill("x") })
    ).toThrow();
  });
});

describe("createStoreSchema", () => {
  test("requires a name of at least 2 characters", () => {
    expect(() => createStoreSchema.parse({ name: "a" })).toThrow();
    expect(() => createStoreSchema.parse({ name: "Ok" })).not.toThrow();
  });
});
```

**Verify**: `cd apps/web && bun test` → all tests pass.

## Test plan

- New tests:
  - `convex/lib/roles.test.ts` — legacy `admin`→`staff` mapping, unknown→`user`,
    hierarchy ordering, `canManageUsers` gate.
  - `convex/validation.test.ts` — email normalization, length/array bounds,
    enum rejection on the three exported schemas.
- Structural pattern: these are the first tests, so they *are* the pattern for
  future plans. Keep them flat (per `GEMINI.md`: "Keep test suites reasonably
  flat", "no `.only`/`.skip`", assertions inside `test()`).
- Verification: `cd apps/web && bun test` → all pass; count is ≥ 13 tests.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `cd apps/web && bun test` exits 0 and reports the new tests passing
- [ ] `cd apps/web && bun run typecheck` exits 0
- [ ] `cd apps/web && bun run lint` exits 0
- [ ] `grep -n "function normalizeRole" apps/web/convex/profiles.ts apps/web/convex/platform.ts` returns **no** matches (both now import it)
- [ ] `apps/web/convex/lib/roles.ts` exists and is imported by both `profiles.ts` and `platform.ts`
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row for 001 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The role-helper code in `profiles.ts` does not match the "Current state"
  excerpt (the file drifted since this plan was written).
- `import { … } from "bun:test"` fails to typecheck even after `@types/bun` is
  installed, or `bun test` is unavailable in the environment.
- `import … from "zod/v4"` fails to resolve under `bun test`.
- Removing the local `normalizeRole` from `platform.ts` produces a typecheck
  error you can't resolve by importing from `./lib/roles` (it may rely on its
  own `PlatformRole` type alias — keep that alias, only remove the function).
- Any verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Plans 002 and 003 build on `convex/lib/roles.ts`. Future role logic belongs
  in that module with a matching test, not re-inlined into a function file.
- This baseline deliberately covers only **pure** logic. Integration tests that
  exercise auth-gated queries/mutations need the Convex test harness
  (`convex-test`) plus the Better Auth component, and are complicated by
  `convex/auth.ts` using the `"use node"` runtime — that is a separate, larger
  effort, intentionally deferred.
- Reviewer should confirm no query/mutation behavior changed — this plan is a
  pure refactor + additive tests.
