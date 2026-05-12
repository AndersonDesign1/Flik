# Flik Delivery Phases

## Status Model
- `Done`
- `In Progress`
- `Planned`
- `Deferred`

This roadmap assumes the repo is mostly scaffolded with real foundations already in place. Statuses below intentionally avoid overstating current completeness.

## Phase 1. Foundation and Product Baseline
**Current status:** `In Progress`

**Objective**
Establish the technical and product foundation Flik needs to evolve into a creator-commerce platform.

**Why it matters**
This phase defines the base architecture, routing, auth, and core entities that every later creator, buyer, and storefront workflow depends on.

**Checklist**
- [x] Monorepo structure with root workspace and `apps/web`
- [x] Next.js application shell and route groups for major surfaces
- [x] Convex schema for `profiles`, `stores`, `products`, and `product_uploads`
- [x] Auth foundation with Better Auth and Convex integration
- [x] Initial onboarding and role/profile scaffolding
- [ ] Shared package extraction for reusable cross-app systems
- [ ] Product-wide source-of-truth docs for roadmap and requirements

**Current status note**
The repo already has meaningful foundations in place, but the monorepo is still early and shared packages are not yet established.

**Exit criteria**
- Architecture supports creator, buyer, and internal surfaces cleanly
- Core auth and profile flows are stable
- Core entities are reliable enough to build against
- Planning docs exist and become the implementation reference

## Phase 2. Core Creator Commerce
**Current status:** `In Progress`

**Objective**
Enable creators to become sellers, create a store, add digital products, and manage the minimum viable commerce flow.

**Why it matters**
This is the first real value loop for Flik. If creators cannot set up and sell smoothly, the rest of the platform does not matter.

**Checklist**
- [x] Seller-aware store data model with slug support
- [x] Store creation flow backed by Convex
- [x] Product creation and editing backend for digital products
- [x] Product media and file upload registration flows
- [x] Public product query paths and storefront product loading basics
- [ ] Onboarding flow fully connected to seller activation
- [ ] Product publishing flow validated end-to-end in production-ready UX
- [ ] Buyer checkout completed against a chosen payment provider
- [ ] Post-purchase delivery, access, and order history finalized
- [ ] Product management UX hardened for creator day-to-day use

**Current status note**
The repo has real store and product foundations, but checkout, fulfillment, and creator workflow polish still appear incomplete.

**Exit criteria**
- A creator can complete onboarding, create a store, publish a digital product, and accept a successful purchase
- Product and asset handling are stable and understandable
- Buyer purchase and access basics work without manual intervention

## Phase 3. Services Commerce
**Current status:** `Planned`

**Objective**
Add services as a first-class offer type alongside digital products.

**Why it matters**
Flik is not only a download store. Services widen creator use cases and make the platform more valuable for consultants, educators, and operators.

**Checklist**
- [ ] Service offer data model
- [ ] Bookable service flow
- [ ] Paid service checkout flow
- [ ] Custom request flow for bespoke work
- [ ] Service order lifecycle and state handling
- [ ] Service detail pages and creator management views
- [ ] Confirmation, fulfillment, and customer communication basics

**Current status note**
The current backend does not yet expose services as a first-class model, so this should be treated as new product work rather than a polish task.

**Exit criteria**
- Creators can publish service offers
- Buyers can book or request services and complete checkout
- Service order states are visible and manageable by creators

## Phase 4. Marketplace and Storefront Experience
**Current status:** `In Progress`

**Objective**
Make marketplace discovery and seller-owned storefronts feel like equal pillars of the product.

**Why it matters**
The product direction requires both central discovery and branded seller presence. Neither should feel like an afterthought.

**Checklist**
- [x] Storefront route structure exists
- [x] Public product detail route exists
- [x] Store page query/filter foundation exists
- [x] Buyer account route scaffolding exists
- [ ] Marketplace homepage positioned around discovery and conversion
- [ ] Search, categories, and browse experience aligned with real data
- [ ] Seller storefront experience polished and consistent
- [ ] Service detail surfaces added once services ship
- [ ] Buyer purchases, library, and account flows completed
- [ ] Discovery and storefront analytics clarified for creators

**Current status note**
Route coverage is broad, but the marketplace and buyer experience still need productization and visual cohesion.

**Exit criteria**
- Buyers can discover offers through Flik, evaluate them, and navigate cleanly into storefront and checkout flows
- Storefronts feel intentional, branded, and conversion-ready
- Buyer account areas support the post-purchase journey

## Phase 5. Premium Redesign System
**Current status:** `Planned`

**Objective**
Create a premium visual system and redesign key surfaces in a safe parallel workstream before migrating the best patterns into the main app.

**Why it matters**
The current UI quality is not yet at the Stripe, Shopify, or Dub standard the product needs to feel premium and trustworthy.

**Checklist**
- [ ] Create a dedicated design-lab app in the monorepo
- [ ] Define typography, spacing, color usage, and motion principles
- [ ] Establish premium section patterns for marketing and storefront surfaces
- [ ] Redesign the marketing landing experience
- [ ] Redesign the seller storefront experience
- [ ] Redesign the dashboard shell and highest-value workspace views
- [ ] Create migration rules for moving proven patterns into `apps/web`
- [ ] Remove placeholder, inconsistent, or obviously generated UI language

**Current status note**
There is already a design-system route and motion utilities, but the actual visual language is inconsistent and not yet at product-grade quality.

**Exit criteria**
- The design-lab app demonstrates a coherent premium system
- Core surfaces have approved redesigns
- Migration from experiment app to main app can happen in controlled slices

## Phase 6. Structured Builder
**Current status:** `Planned`

**Objective**
Introduce structured storefront customization without crossing into a fully freeform page builder.

**Why it matters**
Customization is part of Flik's differentiation, but uncontrolled builder scope would slow delivery and degrade product simplicity.

**Checklist**
- [ ] Theme token model for storefront customization
- [ ] Section catalog for storefront composition
- [ ] Section ordering and visibility controls
- [ ] Configurable content blocks inside each section type
- [ ] Controlled layout options for storefront pages
- [ ] Preview workflow inside Flik
- [ ] Builder-state persistence and publishing model inside Flik

**Current status note**
This should be treated as a net-new product system. It is not yet represented as a complete contract in the codebase.

**Exit criteria**
- Creators can personalize storefront structure meaningfully
- Builder controls stay understandable and constrained
- Storefront customization improves differentiation without introducing freeform chaos

## Phase 7. Lean Operations and Platform Controls
**Current status:** `Planned`

**Objective**
Ship only the internal operational controls needed to keep the platform healthy and safe in the early product life cycle.

**Why it matters**
Flik needs operational visibility, but internal tooling should support the business rather than consume the roadmap.

**Checklist**
- [x] Staff, admin, and super-admin route scaffolding exists
- [ ] Clarify essential moderation workflows
- [ ] Define minimum seller and user oversight tools
- [ ] Implement only necessary trust and support operations
- [ ] Scope payouts, disputes, and compliance as lean workflows
- [ ] Separate true operational requirements from placeholder admin surface area

**Current status note**
The route structure suggests ambitious internal tooling, but the roadmap should keep this intentionally lean until core creator commerce is proven.

**Exit criteria**
- Internal teams can review key seller and user issues
- Essential moderation and support flows are usable
- The internal surface area stays proportionate to product maturity

## Phase 8. Post-v1 Expansion
**Current status:** `Deferred`

**Objective**
Extend Flik beyond its first release into a more complete multi-tenant commerce platform.

**Why it matters**
These capabilities are important to the long-term vision, but shipping them too early would slow the core product.

**Checklist**
- [ ] Creator subdomains
- [ ] Custom domains
- [ ] External publishing workflow
- [ ] More advanced builder depth
- [ ] Broader team collaboration workflows
- [ ] Expanded platform operations and compliance depth
- [ ] Additional commerce models beyond current v1 focus

**Current status note**
These items should remain consciously deferred until Flik proves its core creator launch and sell loop.

**Exit criteria**
- V1 is stable and validated by real creator usage
- Deferred expansion items have clear evidence and priority
- The next roadmap is driven by adoption data rather than ambition alone

## Cross-Phase Defaults
- Solo creators remain the primary optimization target until product data justifies widening the core audience.
- Marketplace and seller storefronts remain equally important product surfaces.
- Services in scope means booking, checkout, and custom requests.
- Structured customization remains the builder boundary until explicitly expanded.
- Custom domains and external publishing remain post-v1 work.
