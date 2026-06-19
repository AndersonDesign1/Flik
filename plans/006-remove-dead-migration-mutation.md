# Plan 006: Remove the orphaned legacy-role migration mutation

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- apps/web/convex/profiles.ts`
> If `profiles.ts` changed since this plan was written, compare the "Current
> state" excerpt against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (but if doing 001/002, prefer to run this **after** them
  to avoid churn on `profiles.ts`)
- **Category**: tech-debt
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

`convex/profiles.ts` exports `normalizeLegacyAdminRoleData`, a one-time data
migration that rewrites any remaining `role: "admin"` rows to `role: "staff"`
across the `profiles` and `role_invites` tables. It has **no callers** anywhere
in the app (`grep -rn "normalizeLegacyAdminRoleData" apps/web/src` returns
nothing). It is super-admin-guarded, so it is not a security hole — but it is
dead, unreferenced surface in the public Convex API. Critically, the read path
already neutralizes legacy data: `normalizeRole("admin")` returns `"staff"`
everywhere roles are read, so removing the migration does not change any
user-visible behavior. Removing it shrinks the API surface and the maintenance
burden.

## Current state

- `apps/web/convex/profiles.ts` (lines ~778–835) — the mutation to remove:

  ```ts
  export const normalizeLegacyAdminRoleData = mutation({
    args: {},
    returns: v.object({
      invitesUpdated: v.number(),
      profilesUpdated: v.number(),
    }),
    handler: async (ctx) => {
      const actor = await authComponent.getAuthUser(ctx);
      if (!actor) { throw new Error("Not authenticated"); }
      const actorProfile = await ctx.db.query("profiles")…first();
      if (normalizeRole(actorProfile?.role) !== "super_admin") {
        throw new Error("Only super admins can normalize legacy operator roles");
      }
      const [profiles, invites] = await Promise.all([...]);
      // rewrites role "admin" -> "staff" on profiles and role_invites
      …
      return { invitesUpdated, profilesUpdated };
    },
  });
  ```

- Read-side safety net (KEEP — this is why removal is safe):
  `normalizeRole` (in `convex/lib/roles.ts` after plan 001, or inline in
  `profiles.ts`/`platform.ts` before it) maps `"admin"` → `"staff"`. So even if
  some legacy `"admin"` rows still exist and were never migrated, every code
  path that reads a role treats them as `"staff"`.

- No callers: `grep -rn "normalizeLegacyAdminRoleData" apps/web/src` → nothing.
  After removal, the generated API (`convex/_generated/api.d.ts`) will drop the
  reference on the next `convex` codegen / build — see Step 2.

## Commands you will need

| Purpose   | Command                                              | Expected on success |
|-----------|------------------------------------------------------|---------------------|
| Install   | `bun install`                                        | exit 0              |
| Find uses | `grep -rn "normalizeLegacyAdminRoleData" apps/web --include=*.ts --include=*.tsx` | only `_generated` matches before, none after codegen |
| Typecheck | `bun run typecheck` (from `apps/web`)                | exit 0, no errors   |
| Lint      | `bun run lint` (from `apps/web`)                     | exit 0              |

## Scope

**In scope**:
- `apps/web/convex/profiles.ts` — delete the `normalizeLegacyAdminRoleData`
  export.

**Out of scope** (do NOT touch):
- `normalizeRole` and the legacy `"admin"` → `"staff"` mapping — that read-side
  net must stay.
- `apps/web/convex/_generated/*` — do **not** hand-edit generated files; they
  regenerate from a `convex` build/codegen (Step 2).
- Any other mutation in `profiles.ts` (`promoteSelfToSuperAdmin`,
  `updateUserRole`, `syncMyBetterAuthRole`, etc.) — leave them.

## Git workflow

- Branch: `advisor/006-remove-dead-migration-mutation`
- Commit style — conventional commits (e.g.
  `chore(convex): drop unused legacy-admin role migration`).
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Confirm it is genuinely unused, then delete it

```
grep -rn "normalizeLegacyAdminRoleData" apps/web/src
```
Expected: no matches. If anything prints, STOP.

Delete the entire `export const normalizeLegacyAdminRoleData = mutation({ … });`
block from `apps/web/convex/profiles.ts`. Leave all surrounding functions and
imports intact (verify `v`, `mutation`, `authComponent`, `normalizeRole` are
still used elsewhere in the file — they are).

**Verify**: `cd apps/web && bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 2: Regenerate Convex bindings (if codegen is available)

The generated API still references the deleted function. Regenerate it the same
way the repo does (see commit `be00e1d "chore: regenerate convex bindings"`):

```
cd apps/web && bunx convex codegen
```

If this command requires a configured Convex deployment / login that is not
available in this environment, **do not hand-edit `_generated`** — instead leave
the generated files as-is and note in your report that codegen must be run by
someone with deployment access. The app still typechecks because removing a
mutation does not break callers (there were none).

**Verify**: `cd apps/web && bun run typecheck` → exit 0. If codegen ran,
`grep -rn "normalizeLegacyAdminRoleData" apps/web/convex/_generated` → no matches.

## Test plan

- No unit test (dead-code removal). Guard: typecheck + lint pass and grep shows
  no app-code references.
- No behavioral test needed — the read-side `normalizeRole("admin") => "staff"`
  net (unchanged) already covers any lingering legacy rows.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -rn "normalizeLegacyAdminRoleData" apps/web/src` returns no matches
- [ ] `grep -n "normalizeLegacyAdminRoleData" apps/web/convex/profiles.ts` returns no matches
- [ ] `cd apps/web && bun run typecheck` exits 0
- [ ] `cd apps/web && bun run lint` exits 0
- [ ] `normalizeRole` still maps `"admin"` → `"staff"` (unchanged)
- [ ] `plans/README.md` status row for 006 updated
- [ ] (If codegen ran) no `_generated` references remain; otherwise report notes
      codegen is pending deployment access

## STOP conditions

Stop and report back (do not improvise) if:

- Any reference to `normalizeLegacyAdminRoleData` exists outside
  `convex/profiles.ts` and `convex/_generated/` (a caller you didn't expect).
- The operator indicates the legacy migration has **not** been run on
  production and they want to keep the tool — in that case, leave the mutation
  and mark this plan REJECTED in the index with that reason.
- Deleting the block causes a typecheck error from a now-unused import — remove
  only imports that are truly unused; if unsure, STOP.

## Maintenance notes

- The read-side `"admin"` → `"staff"` normalization is the permanent safety net;
  do not remove it just because this migration is gone.
- If legacy `"admin"` rows must be physically rewritten (e.g. before adding a DB
  constraint), prefer a one-off Convex script / dashboard action over a
  permanently-exported mutation.
- Reviewer should confirm only a deletion (plus regenerated bindings) is in the
  diff.
