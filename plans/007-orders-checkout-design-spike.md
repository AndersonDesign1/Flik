# Plan 007: Design spike — orders / transactions data model + checkout flow

> **Executor instructions**: This is a **design/spike plan**, not a
> build-everything plan. Your deliverable is a written design document (and an
> optional, non-wired draft schema), not a shipped feature. Do **not** implement
> checkout, payments, or payouts. Follow the steps, produce the artifact, and
> stop at the open questions for a human to decide. If a STOP condition occurs,
> stop and report. When done, update the status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 72fc967..HEAD -- apps/web/convex/schema.ts apps/web/src/contexts/cart-context.tsx "apps/web/src/app/(storefront)"`
> If these changed materially since this plan was written, skim the new state
> before writing the design.

## Status

- **Priority**: P3
- **Effort**: L (design only; implementation is a separate, later effort)
- **Risk**: LOW (produces a document; no runtime code path changes)
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `72fc967`, 2026-06-19

## Why this matters

Flik is described (README) as an e-commerce platform with a "seamless shopping
experience" and merchant "payouts," but the **data model has not caught up to
the product story**. `convex/schema.ts` defines only `profiles`, `role_invites`,
`stores`, `product_uploads`, and `products` — there is **no `orders`,
`transactions`, `purchases`, or `payouts` table**. As a result:

- The storefront `cart` / `checkout` / `order/success` routes exist but are
  backed by client-only state (`src/contexts/cart-context.tsx`) with no
  persistence — no purchase is ever recorded.
- The merchant dashboards (analytics, customers, payouts, billing) render
  **static JSON** from `src/data/*.json` and `src/lib/mock-data.ts`, not live
  data, because there is no transactional data to render.

The single highest-leverage next build is the **orders/transactions schema plus
a checkout→purchase mutation**: it is the keystone that lets the existing
storefront checkout persist real purchases and lets the mock dashboards switch
to live data. This spike defines that design so an implementation plan can be
written with confidence — and so the team can decide the hard questions
(payments provider, digital-delivery model, payout mechanics) deliberately
rather than by accident.

## Current state (what the spike must read and summarize)

Read these and capture the relevant facts in the design doc:

- `apps/web/convex/schema.ts` — current tables. Note `products` already has
  `price`, `compareAtPrice`, `allowCustomPrice`, `files` (digital downloads),
  `userId` (seller), `status`. There is no buyer↔product purchase link.
- `apps/web/src/contexts/cart-context.tsx` — the client cart shape (what a line
  item looks like today: product id, price, quantity, etc.).
- `apps/web/src/app/(storefront)/cart/page.tsx`,
  `…/checkout/page.tsx`, `…/order/success/page.tsx` — the existing (mock) flow
  the design must connect to.
- `apps/web/convex/products.ts` — `getPublicProductBySlug` (what product data a
  checkout has on hand), `assertSellerWorkspaceAccess` (the seller-gating
  pattern to mirror for any new mutation), and how storage files are modeled
  (digital goods delivered via `_storage`).
- `apps/web/convex/stores.ts` — `getStoreBySlug` (store/seller relationship).
- `src/data/*.json` + `src/lib/mock-data.ts` — the shapes the dashboards expect
  (orders/customers/payouts), which the real schema should be able to satisfy so
  those pages can later switch from mock to live.
- The Convex helper conventions: server-side identity via
  `authComponent.getAuthUser(ctx)`, Zod validation in `convex/validation.ts`,
  argument validators with `v.*`, ownership/role guards re-checked inside every
  mutation (see `products.ts`, `platform.ts`).

## Deliverable

A single design document at **`docs/design/orders-and-checkout.md`** (create the
`docs/design/` directory). It must contain the sections in "Steps" below.
Optionally, a **commented, non-wired** draft schema may be added to the doc as a
fenced code block — do **not** modify `convex/schema.ts` in this spike (adding a
table requires migration thought and would change the deployed schema).

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Install   | `bun install`                        | exit 0              |
| Typecheck | `bun run typecheck` (from `apps/web`)| exit 0 (unchanged — spike adds no app code) |

## Scope

**In scope**:
- `docs/design/orders-and-checkout.md` (create) — the design artifact.

**Out of scope** (do NOT do in this spike):
- Editing `convex/schema.ts` or any Convex function.
- Implementing checkout, a payment integration, or payouts.
- Touching the cart context or storefront routes.
- Choosing a payments vendor on the team's behalf — surface options + tradeoffs,
  let humans decide.

## Steps (each = a required section of the design doc)

### Step 1: Problem framing & goals
State the gap (above), and the concrete outcome: "a buyer completes checkout and
a durable order + per-seller transaction is recorded; dashboards can read it."
List explicit **non-goals** for the first iteration (e.g. refunds, disputes,
multi-currency) so scope stays bounded.

### Step 2: Proposed schema
Define the new tables as Convex `defineTable` drafts (in a fenced block, not in
`schema.ts`). At minimum cover:
- `orders` — buyer `userId`, status (e.g. `pending`/`paid`/`fulfilled`/`failed`),
  totals, currency, created/updated timestamps, payment reference.
- `order_items` (or embedded line items) — `orderId`, `productId`, `sellerId`
  (denormalized for seller queries), unit price captured **at purchase time**
  (do not trust the live product price later), quantity, and the granted
  download/file references for digital goods.
- How **payouts/transactions** attach (per-seller earnings derived from order
  items) — even if payouts are a later build, show where the data hangs.
- Required **indexes** implied by the read patterns (buyer's purchases,
  seller's sales, order by status). Tie each index to a query it serves.

### Step 3: Checkout mutation contract
Specify the `createOrder` / `checkout` mutation: args (cart line items or a
server-recomputed cart), the **server-side price recomputation** rule (never
trust client-sent prices — re-read product price in the mutation), ownership /
availability checks, idempotency (avoid double-charge on retry), and the
returned shape the `order/success` page needs. Note the auth gate
(`authComponent.getAuthUser`) and email-verified requirement consistent with
other mutations.

### Step 4: Payments boundary
Describe where a payment provider plugs in (the order goes `pending` → provider
→ webhook confirms → `paid`), and list 2–3 candidate approaches with tradeoffs
(e.g. Stripe Checkout vs. Payment Intents; how digital-goods delivery is gated
on `paid`). **Recommend** one but mark it a decision for the maintainer. Note
any webhook/idempotency/security concerns (verifying webhook signatures,
re-checking amounts server-side).

### Step 5: Dashboard wiring & mock retirement
Map each currently-mock dashboard surface (`src/data/*.json`,
`src/lib/mock-data.ts` consumers — analytics, customers, payouts, billing) to
the live query it would use once orders exist. This shows the spike pays off the
whole mock layer, not just checkout.

### Step 6: Migration & rollout
How to introduce the tables safely (additive; no change to existing tables),
whether to gate checkout behind a flag, and the smallest first slice (e.g.
"persist a free/zero-price `order` end-to-end before integrating payments").

### Step 7: Open questions
A bulleted list of decisions the team must make (payments vendor; one order
spanning multiple sellers vs. split orders; digital delivery/licensing model;
refunds/disputes; tax). Each with the advisor's recommendation and the tradeoff.

**Verify** (after writing): `cd apps/web && bun run typecheck` → exit 0
(confirms the spike added no app code that breaks the build), and the doc
contains all seven sections.

## Test plan

- No code tests — this is a design artifact. Verification is that the document
  exists, covers all seven sections, includes a concrete schema draft with
  indexes tied to queries, and ends with explicit open questions + recommended
  decisions.

## Done criteria

- [ ] `docs/design/orders-and-checkout.md` exists with sections for Steps 1–7
- [ ] The schema draft names the new tables, their fields, **and** the indexes,
      with each index justified by a query
- [ ] The checkout mutation contract specifies server-side price recomputation
      and idempotency
- [ ] Step 5 maps at least the analytics/customers/payouts dashboards to live
      queries
- [ ] Step 7 lists open questions, each with a recommendation
- [ ] `cd apps/web && bun run typecheck` exits 0 (no app code changed)
- [ ] Only `docs/design/orders-and-checkout.md` is added (`git status`)
- [ ] `plans/README.md` status row for 007 updated

## STOP conditions

Stop and report back (do not improvise) if:

- You find an existing orders/transactions implementation already in the repo
  that contradicts the "no purchase persistence" premise (the codebase drifted).
- The team has an existing payments decision (ADR, `docs/`, env config for a
  provider) — incorporate it rather than re-deciding; if it conflicts with this
  framing, note the conflict.
- You are tempted to start implementing the schema/mutation — that is a separate
  plan; this spike only designs.

## Maintenance notes

- The implementation plan(s) that follow this spike should be written with the
  improve skill once the open questions in Step 7 are answered — likely split
  into: (a) schema + zero-price order persistence, (b) payment-provider
  integration, (c) dashboard live-data cutover.
- Whoever implements must keep purchase-time price capture and server-side
  recomputation — trusting client-sent prices is the classic e-commerce flaw.
- This is the keystone for retiring `src/data/*.json` and `src/lib/mock-data.ts`.
