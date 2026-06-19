# Orders & Checkout — Design Spike

**Status:** Draft for team review  
**Date:** 2026-06-19  
**Scope:** Design only — no schema or runtime changes in this spike

---

## 1. Problem framing & goals

### The gap

Flik presents as a full e-commerce platform (storefront cart/checkout, merchant dashboards for analytics/customers/payouts), but **no purchase is ever persisted**:

- `convex/schema.ts` defines `profiles`, `stores`, `products`, etc. — but no `orders`, `transactions`, or `payouts` tables.
- The storefront cart (`src/contexts/cart-context.tsx`) is client-only React state: `{ id, name, price, image?, seller }` with no server backing.
- Checkout (`src/app/(storefront)/checkout/page.tsx`) fakes payment with a 2-second timeout, clears the cart, and redirects to `/order/success` — no mutation, no record.
- Merchant dashboards read static JSON from `src/data/*.json` and `src/lib/mock-data.ts`.

### Concrete outcome

A buyer completes checkout and a **durable order + per-seller line items** are recorded in Convex. Seller dashboards can query real sales data instead of mock JSON.

### Non-goals (first iteration)

- Refunds, disputes, chargebacks
- Multi-currency (USD only initially)
- Physical goods / shipping
- Subscription or recurring billing
- Tax calculation (defer; show pre-tax totals)
- Real-time analytics (traffic sources in `analytics.json` stay mocked until a separate analytics effort)
- Payout execution to bank accounts (record earnings; payout transfer is phase 2)

---

## 2. Proposed schema

Draft tables for `convex/schema.ts` (not wired yet):

```ts
// --- orders: one checkout session per buyer ---
orders: defineTable({
  buyerId: v.string(),                    // Better Auth user._id
  status: v.union(
    v.literal("pending"),                 // created, awaiting payment
    v.literal("paid"),                    // payment confirmed
    v.literal("fulfilled"),               // digital files granted
    v.literal("failed"),                  // payment failed / expired
    v.literal("cancelled")
  ),
  currency: v.literal("usd"),
  subtotalCents: v.int64(),               // sum of line items before fees
  platformFeeCents: v.int64(),            // 5% per checkout (matches checkout UI)
  totalCents: v.int64(),                  // subtotal + fees (buyer pays)
  paymentProvider: v.optional(v.string()), // e.g. "stripe"
  paymentIntentId: v.optional(v.string()), // provider reference
  idempotencyKey: v.optional(v.string()),  // client-supplied dedup key
  createdAt: v.float64(),
  updatedAt: v.float64(),
})
  .index("by_buyer_id", ["buyerId"])
  .index("by_buyer_id_created_at", ["buyerId", "createdAt"])
  .index("by_status", ["status"])
  .index("by_payment_intent_id", ["paymentIntentId"])
  .index("by_idempotency_key", ["idempotencyKey"]),

// --- order_items: one row per product purchased ---
order_items: defineTable({
  orderId: v.id("orders"),
  productId: v.id("products"),
  sellerId: v.string(),                   // denormalized from product.userId
  storeId: v.optional(v.id("stores")),    // denormalized for seller queries
  productName: v.string(),                  // snapshot at purchase time
  productSlug: v.optional(v.string()),
  unitPriceCents: v.int64(),                // captured price — never trust live product.price later
  quantity: v.int64(),                      // always 1 for digital goods v1
  lineTotalCents: v.int64(),
  // Digital delivery: snapshot file refs granted on fulfillment
  grantedFiles: v.array(
    v.object({
      storageId: v.id("_storage"),
      fileName: v.string(),
      fileSize: v.float64(),
      mimeType: v.optional(v.string()),
    })
  ),
  createdAt: v.float64(),
})
  .index("by_order_id", ["orderId"])
  .index("by_seller_id", ["sellerId"])
  .index("by_seller_id_created_at", ["sellerId", "createdAt"])
  .index("by_product_id", ["productId"])
  .index("by_buyer_via_order", ["orderId", "sellerId"]), // join pattern

// --- seller_transactions: per-seller earnings rollup (payouts hang here later) ---
seller_transactions: defineTable({
  orderId: v.id("orders"),
  orderItemId: v.id("order_items"),
  sellerId: v.string(),
  grossCents: v.int64(),                  // line total before platform cut
  platformFeeCents: v.int64(),            // seller's share of platform fee
  netCents: v.int64(),                    // gross - platformFee (seller earns)
  status: v.union(
    v.literal("pending"),                   // order not yet paid
    v.literal("available"),                 // paid, eligible for payout
    v.literal("paid_out"),                  // included in a payout batch (future)
    v.literal("refunded")                   // future
  ),
  createdAt: v.float64(),
  updatedAt: v.float64(),
})
  .index("by_seller_id", ["sellerId"])
  .index("by_seller_id_status", ["sellerId", "status"])
  .index("by_seller_id_created_at", ["sellerId", "createdAt"])
  .index("by_order_id", ["orderId"]),
```

### Index justification

| Index | Serves |
|-------|--------|
| `orders.by_buyer_id_created_at` | Buyer's purchase history (`/account/purchases`, library) |
| `orders.by_payment_intent_id` | Webhook idempotency — find order by Stripe PaymentIntent |
| `orders.by_idempotency_key` | Client retry dedup on `createOrder` |
| `order_items.by_seller_id_created_at` | Seller's sales list, revenue aggregates |
| `order_items.by_order_id` | Order detail / success page line items |
| `seller_transactions.by_seller_id_status` | Payout dashboard: available vs pending balance |

### Relationship to existing tables

- `products.userId` → `order_items.sellerId` (denormalized for seller-scoped queries without joins)
- `products.files[]` → copied into `order_items.grantedFiles` at fulfillment (immutable grant even if seller later edits product)
- `products.sales` counter can be incremented in the same mutation as order creation (existing optional field)

---

## 3. Checkout mutation contract

### `orders.createCheckout` (mutation)

**Auth gate:** `authComponent.getAuthUser(ctx)` required; reject unauthenticated. Require `emailVerified === true` (consistent with other privileged mutations).

**Args:**

```ts
{
  items: v.array(
    v.object({
      productId: v.id("products"),
      quantity: v.optional(v.int64()), // default 1; v1 digital goods = 1 only
    })
  ),
  idempotencyKey: v.optional(v.string()), // client-generated UUID per checkout attempt
}
```

**Server-side price recomputation (never trust client prices):**

1. For each `productId`, load product from DB.
2. Reject if `status !== "active"`.
3. Reject if buyer's own product (self-purchase) — optional v1 rule.
4. Use `product.price` (and `allowCustomPrice` logic if applicable) as `unitPriceCents`.
5. Reject duplicate product IDs in cart (matches current cart behavior: one per product).
6. Compute `subtotalCents`, `platformFeeCents` (5% of subtotal, matching `PLATFORM_FEE_RATE = 0.05` in checkout UI), `totalCents`.

**Idempotency:**

- If `idempotencyKey` provided and an `orders` row with that key exists for this buyer, return the existing order (no double-charge).
- Store key on insert; index `by_idempotency_key` enforces lookup.

**Payment flow (two-phase):**

1. Mutation creates `orders` (status: `pending`), `order_items`, `seller_transactions` (status: `pending`).
2. Returns `{ orderId, totalCents, clientSecret? }` for payment provider handoff.
3. Webhook/action confirms payment → patch order to `paid`, transactions to `available`, grant files → `fulfilled`.

**Returns (for `order/success` page):**

```ts
{
  orderId: v.id("orders"),
  status: v.literal("pending"), // or "paid" for zero-price shortcut
  totalCents: v.int64(),
  currency: v.literal("usd"),
  items: v.array(
    v.object({
      productName: v.string(),
      unitPriceCents: v.int64(),
      sellerId: v.string(),
    })
  ),
}
```

**Follow-up query:** `orders.getOrderForBuyer({ orderId })` — buyer-scoped read for success page polling until `paid`/`fulfilled`.

---

## 4. Payments boundary

### Integration point

```
[Client checkout] → createCheckout mutation → order: pending
       ↓
[Stripe Checkout Session / PaymentIntent] ← clientSecret or redirect URL
       ↓
[Stripe webhook HTTP action] → verify signature → patch order: paid
       ↓
[Internal fulfillment] → copy product.files → order_items.grantedFiles → order: fulfilled
```

Digital goods delivery is **gated on `paid`**: download URLs (`ctx.storage.getUrl`) are only returned from a buyer-scoped query when `order.status ∈ { paid, fulfilled }`.

### Candidate approaches

| Approach | Pros | Cons |
|----------|------|------|
| **Stripe Checkout Sessions** (hosted page) | Fastest to ship; PCI scope minimal; built-in email receipts | Redirect UX; less control over checkout UI |
| **Stripe Payment Intents + Elements** | Matches current inline checkout form; stays on-site | More frontend work; PCI considerations for Elements |
| **Zero-price orders only (v0)** | No provider needed; validates full data path | No real revenue until Stripe lands |

### Recommendation (decision for maintainer)

**Phase 1:** Zero-price / test-mode orders end-to-end (persist order, grant files, show in dashboards).  
**Phase 2:** Stripe Checkout Sessions — fastest path to real payments with webhook confirmation.

### Security concerns

- Verify Stripe webhook signatures in Convex HTTP action (`stripe.webhooks.constructEvent`).
- Re-check `totalCents` against PaymentIntent amount in webhook handler — reject mismatch.
- Webhook handler must be idempotent (Stripe retries); use `paymentIntentId` index to skip duplicate processing.
- Never expose `grantedFiles` storage URLs before `paid`.

---

## 5. Dashboard wiring & mock retirement

| Mock source | Dashboard surface | Live query (post-orders) |
|-------------|-------------------|--------------------------|
| `dashboard.json` metrics | `/dashboard` overview cards | `orders.getSellerOverview({ sellerId })` — aggregate `seller_transactions` by status/date range |
| `customers.json` | `/dashboard/customers` | `orders.listSellerCustomers({ sellerId })` — distinct buyers from `order_items` joined to orders, with spent/lastOrder aggregates |
| `payouts.json` | `/dashboard/payouts` | `orders.getSellerPayoutSummary({ sellerId })` — sum `seller_transactions` where `status === "available"` |
| `analytics.json` | `/dashboard/analytics` | Partial: order-based revenue charts from `seller_transactions`; traffic/conversion metrics stay mocked |
| `admin-dashboard.json` | `/admin/*` staff views | `platform.getStaffOrderMetrics()` — platform-wide order counts/revenue (extends existing `platform.ts` patterns) |
| `mock-data.ts` PRODUCTS | Storefront browse (some pages) | Already partially on Convex `getPublicProductBySlug`; full cutover separate |

### Buyer-facing surfaces

| Route | Live query |
|-------|------------|
| `/account/purchases` | `orders.listBuyerOrders({ buyerId })` |
| `/account/library` | `orders.listBuyerDownloads({ buyerId })` — items with `grantedFiles` |

---

## 6. Migration & rollout

### Schema introduction

- **Additive only** — no changes to existing tables.
- Deploy schema first; no behavior change until mutations ship.

### Feature flag

- Env var `CHECKOUT_ENABLED=false` (default) gates the real `createCheckout` mutation and keeps the current fake timeout UX.
- When enabled, checkout page calls mutation instead of `setTimeout`.

### Smallest first slice

1. Add tables (schema deploy).
2. Implement `createCheckout` for **zero-total carts** (or explicit test products at $0): skip payment provider, immediately set `paid` → `fulfilled`, grant files.
3. Wire `order/success` to read real `orderId` from URL query param.
4. Wire `/account/purchases` to `listBuyerOrders`.
5. Add Stripe in a follow-up plan once data path is proven.

### Rollout order

```
schema → zero-price checkout → buyer library → seller dashboard cutover → Stripe → payouts
```

---

## 7. Open questions

| Question | Recommendation | Tradeoff |
|----------|----------------|----------|
| **Payments vendor** | Stripe Checkout Sessions | PayPal adds buyer trust but doubles integration surface; defer |
| **One order vs split orders per seller** | Single order, multiple `order_items` / `seller_transactions` | Simpler buyer UX (one receipt); seller payouts still per-line. Multi-order only needed if sellers have incompatible payout currencies |
| **Digital delivery model** | Copy `product.files` into `order_items.grantedFiles` at fulfillment | Immutable grant; seller can edit product without affecting past buyers. Alternative: live reference is simpler but breaks on product deletion |
| **Platform fee allocation** | 5% of subtotal, deducted from seller `netCents` | Matches current checkout UI. Alternative: fee on top of listed price changes seller economics |
| **Self-purchase** | Block in v1 | Prevents artificial sales inflation; can relax later |
| **Custom / pay-what-you-want pricing** | Honor `allowCustomPrice` with server-validated `customPriceCents` arg in v2 | v1: fixed `product.price` only |
| **Refunds** | Defer; design `seller_transactions.status: "refunded"` hook now | Schema ready; no UI/mutation in v1 |
| **Tax** | Defer; display "Tax calculated at checkout" placeholder | Stripe Tax can be added later without schema change if amounts stored as final cents |
| **Convex codegen for removed mutations** | Run `bunx convex codegen` with deployment access after plan 006 | Generated API still references deleted `checkEmailExists` / `normalizeLegacyAdminRoleData` until codegen runs |

---

## Appendix: Current cart shape (reference)

```ts
interface CartItem {
  id: string;       // maps to products._id
  name: string;
  price: number;    // display only — server recomputes
  image?: string;
  seller: string;   // seller display name — server uses product.userId
}
```

Checkout mutation args should send **only `productId` (+ optional idempotencyKey)** — not prices or seller names.