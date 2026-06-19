# Plan 004: Delete stale duplicate `dashboard` route files

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- "apps/web/src/app/dashboard" "apps/web/src/app/(dashboard)"`
> If either tree changed since this plan was written, re-verify the
> "Current state" facts before proceeding; on a mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

The route-group migration left an orphaned copy of the dashboard route segment.
The canonical pages live under `src/app/(dashboard)/dashboard/…` (a route group —
`(dashboard)` does not appear in the URL, so these serve `/dashboard/*`). A
second, literal `src/app/dashboard/` directory still exists but contains **only
`loading.tsx` files and no `page.tsx`** — so it defines nothing routable on its
own and its loading files are byte-for-byte duplicates of the route-group ones.
These dead files invite editing the wrong copy and muddy where dashboard loading
UI is defined. Deleting them removes the ambiguity with zero behavior change.

## Current state

- Canonical, live dashboard tree (KEEP, do not touch):
  `apps/web/src/app/(dashboard)/dashboard/` — contains `page.tsx`, `layout.tsx`,
  `loading.tsx`, and the real subpages (`analytics/`, `customers/`, `payouts/`,
  `products/`, `billing/`, etc.), including their own `loading.tsx` files.

- Stale, orphaned tree (DELETE) — these are git-tracked and contain only
  `loading.tsx` files:
  - `apps/web/src/app/dashboard/loading.tsx`
  - `apps/web/src/app/dashboard/analytics/loading.tsx`
  - `apps/web/src/app/dashboard/customers/loading.tsx`
  - `apps/web/src/app/dashboard/payouts/loading.tsx`

  Verified: `apps/web/src/app/dashboard/` contains **no** `page.tsx` anywhere,
  and `apps/web/src/app/dashboard/loading.tsx` is identical to
  `apps/web/src/app/(dashboard)/dashboard/loading.tsx`.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Install   | `bun install`                        | exit 0              |
| List dir  | `find apps/web/src/app/dashboard -type f` | only `loading.tsx` files (no `page.tsx`) |
| Typecheck | `bun run typecheck` (from `apps/web`)| exit 0, no errors   |
| Lint      | `bun run lint` (from `apps/web`)     | exit 0              |

## Scope

**In scope** (delete only):
- `apps/web/src/app/dashboard/loading.tsx`
- `apps/web/src/app/dashboard/analytics/loading.tsx`
- `apps/web/src/app/dashboard/customers/loading.tsx`
- `apps/web/src/app/dashboard/payouts/loading.tsx`
- the now-empty directories `apps/web/src/app/dashboard/{analytics,customers,payouts}`
  and `apps/web/src/app/dashboard` (remove if empty after the file deletions)

**Out of scope** (do NOT touch):
- Everything under `apps/web/src/app/(dashboard)/` — that is the live app.
- Any other `loading.tsx` elsewhere in the app.

## Git workflow

- Branch: `advisor/004-remove-stale-dashboard-routes`
- Commit style — conventional commits (e.g.
  `chore(web): remove orphaned dashboard loading routes`).
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Re-verify the directory is page-less and the files are duplicates

```
find apps/web/src/app/dashboard -type f
diff apps/web/src/app/dashboard/loading.tsx "apps/web/src/app/(dashboard)/dashboard/loading.tsx"
```

Expected: the `find` lists only the four `loading.tsx` files; the `diff`
reports **no differences**. If a `page.tsx` exists anywhere under
`apps/web/src/app/dashboard/`, STOP (see STOP conditions).

### Step 2: Delete the orphaned files and empty directories

```
git rm apps/web/src/app/dashboard/loading.tsx \
       apps/web/src/app/dashboard/analytics/loading.tsx \
       apps/web/src/app/dashboard/customers/loading.tsx \
       apps/web/src/app/dashboard/payouts/loading.tsx
```

Then remove any now-empty directories (`git rm` of the files leaves no tracked
content; remove leftover empty dirs from the working tree if present).

**Verify**: `find apps/web/src/app/dashboard -type f` → prints nothing (path
gone or empty).

### Step 3: Confirm the app still typechecks and lints

**Verify**:
- `cd apps/web && bun run typecheck` → exit 0
- `cd apps/web && bun run lint` → exit 0

## Test plan

- No new tests — this is a dead-file deletion. The guard is that typecheck and
  lint still pass and the canonical `(dashboard)` tree is untouched
  (`git status` shows only deletions under `src/app/dashboard/`).
- Optional manual check: if a dev server is run (`bun run dev`), `/dashboard`,
  `/dashboard/analytics`, `/dashboard/customers`, `/dashboard/payouts` still
  render their loading states from the `(dashboard)` group.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `find apps/web/src/app/dashboard -type f` returns nothing
- [ ] `cd apps/web && bun run typecheck` exits 0
- [ ] `cd apps/web && bun run lint` exits 0
- [ ] `git status` shows only deletions under `apps/web/src/app/dashboard/`
      and no changes under `apps/web/src/app/(dashboard)/`
- [ ] `plans/README.md` status row for 004 updated

## STOP conditions

Stop and report back (do not improvise) if:

- A `page.tsx`, `route.ts`, `layout.tsx`, or any non-`loading.tsx` file exists
  under `apps/web/src/app/dashboard/` — the directory may be load-bearing; do
  not delete blindly.
- `diff` shows the loading files are **not** identical to the route-group
  copies — investigate why before deleting.
- Typecheck or lint fails after deletion (unexpected — these files have no
  importers).

## Maintenance notes

- After this, the single source of dashboard routing is
  `src/app/(dashboard)/dashboard/`. Future dashboard pages go there.
- Reviewer should confirm the diff is deletions only.
