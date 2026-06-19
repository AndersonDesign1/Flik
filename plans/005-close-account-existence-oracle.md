# Plan 005: Stop disclosing account existence in the password-reset flow

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- apps/web/convex/users.ts apps/web/src/components/auth/forgot-password-form.tsx`
> If either file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

`convex/users.ts` exposes `checkEmailExists` as a **public, unauthenticated**
query that returns whether a given email is registered. The password-reset form
calls it and, when it returns `false`, shows **"No account found for this email.
Sign up first."** Together these turn the reset page into an account-existence
oracle: anyone can probe arbitrary emails and learn which are registered
(useful for credential-stuffing target lists and phishing). The standard
mitigation is to respond identically whether or not the account exists.

This is a deliberate UX tradeoff today (the friendly "sign up first" message),
so the change has a product cost: a user who mistypes their email no longer gets
an explicit "no account" message — they get a neutral "if an account exists, a
code has been sent." That is the accepted privacy posture for password reset.
**Confirm the operator wants this** (the AskUserQuestion selection that produced
this plan implies yes).

## Current state

- `apps/web/convex/users.ts` (lines ~37–57) — public query, no auth check:

  ```ts
  export const checkEmailExists = query({
    args: { email: v.string() },
    returns: v.boolean(),
    handler: async (ctx, args) => {
      const email = args.email.trim().toLowerCase();
      const user = await ctx.runQuery(components.betterAuth.adapter.findOne, {
        model: "user",
        where: [{ field: "email", operator: "eq", value: email }],
      });
      return user !== null;
    },
  });
  ```

- `apps/web/src/components/auth/forgot-password-form.tsx` — calls it in two
  places and branches the UX on the result:
  - `handleSendOTP` (lines ~33–64): `const hasAccount = await convex.query(api.users.checkEmailExists, …)`;
    `if (!hasAccount) { toast.error("No account found for this email. Sign up first."); return; }`
    then `authClient.forgetPassword.emailOtp({ email })`.
  - `handleResendOTP` (lines ~75–106): same `checkEmailExists` gate, then
    `toast.error("No account found …"); setStep("email"); return;`.
  - The reset itself (`handleResetPassword`, lines ~108–142) uses
    `authClient.emailOtp.resetPassword({ email, otp, password })` and is
    unchanged by this plan.

- `checkEmailExists` is used **only** in this file (verified:
  `grep -rn "checkEmailExists" apps/web/src` returns the two lines above).

## Commands you will need

| Purpose   | Command                                   | Expected on success |
|-----------|-------------------------------------------|---------------------|
| Install   | `bun install`                             | exit 0              |
| Find uses | `grep -rn "checkEmailExists" apps/web/src`| no matches after Step 2 |
| Typecheck | `bun run typecheck` (from `apps/web`)     | exit 0, no errors   |
| Lint      | `bun run lint` (from `apps/web`)          | exit 0              |
| Test      | `bun test` (from `apps/web`)              | all tests pass (if 001 landed) |

## Scope

**In scope**:
- `apps/web/src/components/auth/forgot-password-form.tsx` — remove the
  existence-branching, always proceed, neutral messaging.
- `apps/web/convex/users.ts` — remove the now-unused `checkEmailExists` query
  (and the now-unused `components` import **only if** nothing else in the file
  uses it — see Step 3).

**Out of scope** (do NOT touch):
- `authClient.forgetPassword.emailOtp` / `authClient.emailOtp.resetPassword`
  behavior — Better Auth already handles unknown emails without confirming
  existence; do not change auth config.
- The OTP entry and new-password steps of the form (Step 2 / Step 3 UI).
- Any other auth form (login, signup) — they do not use `checkEmailExists`.

## Git workflow

- Branch: `advisor/005-close-account-existence-oracle`
- Commit style — conventional commits (e.g.
  `fix(auth): stop revealing account existence on password reset`).
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Remove existence-branching from `handleSendOTP`

In `forgot-password-form.tsx`, rewrite `handleSendOTP` so it no longer calls
`checkEmailExists` and no longer reveals existence. Always attempt to send and
always advance with neutral copy:

```ts
const handleSendOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const result = await authClient.forgetPassword.emailOtp({
      email: normalizedEmail,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Failed to send code");
      return;
    }
    toast.success("If an account exists, a code has been sent.");
    setStep("otp");
  } catch {
    toast.error("Failed to send code");
  } finally {
    setIsLoading(false);
  }
};
```

Remove the now-unused `useConvex` import/`convex` variable **only if** it is not
used elsewhere in the file (it is used in `handleResendOTP` until Step 2 — do
the removal after both handlers are updated).

### Step 2: Remove existence-branching from `handleResendOTP`

```ts
const handleResendOTP = async () => {
  setIsLoading(true);
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const result = await authClient.forgetPassword.emailOtp({
      email: normalizedEmail,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Failed to resend code");
      return;
    }
    toast.success("If an account exists, a new code has been sent.");
    setOtp("");
  } catch {
    toast.error("Failed to resend code");
  } finally {
    setIsLoading(false);
  }
};
```

Now remove the `import { useConvex } from "convex/react";`, the
`const convex = useConvex();` line, and the
`import { api } from "../../../convex/_generated/api";` import **if** `api` /
`convex` are no longer referenced anywhere in the file.

**Verify**: `grep -n "checkEmailExists\|useConvex" apps/web/src/components/auth/forgot-password-form.tsx`
→ no matches; `cd apps/web && bun run typecheck` → exit 0.

### Step 3: Remove the unused public query

In `apps/web/convex/users.ts`, delete the entire `checkEmailExists` export. Then
check whether `components` (imported from `./_generated/api`) is still used by
the remaining `getCurrentUser` query:

```
grep -n "components" apps/web/convex/users.ts
```

If `components` has no remaining references, remove its import line too. Leave
`getCurrentUser` and all its imports (`v`, `query`, `authComponent`) intact.

**Verify**: `cd apps/web && bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 4: Full verification

**Verify**:
- `grep -rn "checkEmailExists" apps/web` → no matches
- `cd apps/web && bun run typecheck` → exit 0
- `cd apps/web && bun run lint` → exit 0
- `cd apps/web && bun test` → all pass (if plan 001 has landed)

## Test plan

- No unit test is added (this is a UI-flow + dead-query removal; the form is a
  client component without a test harness). The guard is typecheck + lint +
  grep proving the oracle query is gone and unreferenced.
- Manual check (recommended, not blocking): run `bun run dev`, open
  `/forgot-password`, submit a **non-existent** email → you should see the
  neutral "If an account exists, a code has been sent." and advance to the OTP
  step (no "No account found" message). Submit a real email → a code arrives as
  before.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -rn "checkEmailExists" apps/web` returns no matches
- [ ] `grep -n "No account found" apps/web/src/components/auth/forgot-password-form.tsx` returns no matches
- [ ] `cd apps/web && bun run typecheck` exits 0
- [ ] `cd apps/web && bun run lint` exits 0
- [ ] `cd apps/web && bun test` exits 0 (if 001 landed)
- [ ] Only `users.ts` and `forgot-password-form.tsx` are modified (`git status`)
- [ ] `plans/README.md` status row for 005 updated

## STOP conditions

Stop and report back (do not improvise) if:

- `authClient.forgetPassword.emailOtp` **errors** for an unknown email in a way
  that reveals existence (e.g. message "user not found"). If so, the neutral
  toast still leaks via the error branch — STOP and report; the fix then needs
  to swallow that specific error rather than surface it.
- `checkEmailExists` turns out to be referenced somewhere outside
  `forgot-password-form.tsx` (the drift check / grep finds another caller).
- The form code does not match the "Current state" excerpts.
- Typecheck fails because `api` or `components` is still referenced after you
  removed an import — re-add the import; only remove imports that are truly
  unused.

## Maintenance notes

- Keep password-reset, login, and signup responses existence-agnostic. If a
  future feature needs to check email availability (e.g. live signup
  validation), gate it behind rate limiting and/or authentication, and never
  branch user-visible copy on the boolean in a pre-auth flow.
- Reviewer should confirm no remaining user-facing string distinguishes
  "account exists" from "account doesn't exist" in the reset flow.
