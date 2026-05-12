# Flik Product Requirements Document

## Summary
Flik is a premium creator-commerce platform for digital products and services. It combines a central marketplace with seller-owned storefronts inside Flik, then expands later into external publishing through subdomains and custom domains.

This PRD treats the current repo as an early but credible foundation:
- The monorepo already contains one active Next.js app in `apps/web`.
- Auth, onboarding, storefront, dashboard, buyer account, staff/admin surfaces, and core Convex entities already exist in some form.
- Parts of the experience appear real and wired, while other areas are still scaffolded, mock-backed, or not yet production-complete.
- The redesign is a parallel workstream that should improve trust, polish, and consistency without redefining the product scope.

## Product Vision
Flik helps creators launch a premium commerce presence without needing a custom build. A creator should be able to set up a store, add digital products or services, present them through a polished storefront, and convert buyers through a fast and trustworthy buying experience.

Long term, Flik should grow into a multi-tenant commerce platform where creators can configure their store inside Flik and later publish that store to a dedicated subdomain or custom domain. In the near term, all storefronts live inside Flik itself.

## Core User
The primary v1 user is a solo creator selling digital products and services:
- Writers selling ebooks, guides, and templates
- Designers selling assets, kits, and creative downloads
- Educators selling resources, sessions, or packaged offers
- Operators or consultants selling bookable services and custom work

Secondary users exist, but are not first-class in v1:
- Small teams collaborating on a creator business
- Internal staff moderating and supporting the platform
- Admins overseeing trust, users, and platform health

## Problem Statement
Creators need more control than rigid storefront tools provide, but they often do not want the complexity of building a fully custom site. Many commerce tools are either:
- Too static to feel branded or premium
- Too generic and template-driven to convert well
- Too operationally heavy for solo creators
- Too visually basic to inspire trust

Flik should solve this by giving creators a polished commerce platform with structured customization, strong product presentation, and a premium buyer journey.

## Positioning
Flik is a creator-first commerce product with premium presentation and structured customization. It should feel closer to Stripe, Shopify, or Dub in quality and confidence than to generic marketplace templates or AI-looking builder products.

The core promise is:
- Fast to launch
- Premium by default
- Flexible enough to feel personal
- Focused enough to stay simple

## Product Pillars
### 1. Premium Trust-Building UI
Every key surface should make creators look credible and make buyers feel safe transacting.

### 2. Fast Creator Setup
Creators should be able to move from signup to a usable store quickly, without a long configuration burden.

### 3. Conversion-Focused Storefronts
The product should help creators present offers clearly and turn traffic into purchases or bookings.

### 4. Controlled Customization
Flik should provide meaningful customization through structure, not chaos. The product should avoid becoming a fully freeform builder in v1.

### 5. Multi-Tenant-Ready Foundation
The architecture and product model should support future publishing and tenant expansion, even though external domains are not part of v1.

## Key Capability Definitions
### Marketplace
The central Flik discovery layer where buyers can browse, search, and evaluate creators and offers.

### Storefront
A seller-owned branded page inside Flik where products, services, and creator identity come together.

### Structured Builder
A controlled customization system with:
- Reorderable sections
- Configurable content blocks
- Theme and layout options
- Curated patterns rather than arbitrary drag-and-drop freedom

### Offer Types
Flik v1 supports three offer types:
- Digital product
- Bookable service
- Custom-request service

### Internal Ops
Lean internal workflows for moderation, seller oversight, and essential support. These exist to keep the platform safe, not to dominate the early roadmap.

## V1 Scope
### Creator setup and identity
- Signup, login, and verification
- Onboarding flow
- Creator profile and store setup
- Store naming, slug, and baseline brand presence

### Digital product commerce
- Product creation and editing
- File and media upload flows
- Product publishing states
- Public product detail experience
- Buyer checkout and post-purchase access basics

### Services commerce
- Service offer creation
- Paid service checkout
- Booking/session flow
- Custom request flow for bespoke work
- Basic order and state handling

### Marketplace and storefronts
- Homepage and discovery entry points
- Search and category-based browsing
- Seller storefront pages inside Flik
- Public offer presentation for both products and services

### Creator workspace
- Seller dashboard foundations
- Core performance and management views
- Product and service management surfaces
- Essential profile and settings controls

### Buyer experience
- Discovery and browsing
- Cart and checkout basics
- Purchases, library, or post-purchase account areas
- Core account management surfaces

### Structured builder
- Curated section catalog
- Section ordering and visibility
- Controlled layout/theme choices
- In-Flik preview workflow

### Lean platform operations
- Essential moderation views
- Seller and user oversight basics
- Minimal admin controls needed to operate safely

## Explicitly Out of Scope for V1
- Custom domains and creator-owned subdomains
- External publishing beyond Flik-hosted storefronts
- Advanced freeform drag-and-drop builder
- Deep compliance, disputes, and backoffice suites
- Broad physical commerce support
- Large-team-first collaboration workflows
- Full enterprise-grade operational tooling

These items are not rejected permanently. They are deferred to preserve focus and ensure the first release solves the core creator launch problem well.

## User Roles and Product Boundaries
### User roles
- Buyer
- Creator or seller
- Staff
- Admin or super admin

V1 should keep staff and admin roles intentionally lean. Creator and buyer flows are the product center of gravity.

### Core product surfaces
- Marketplace
- Seller storefront
- Creator dashboard
- Buyer account
- Internal ops surface

### Tenant boundary
Flik should behave like a multi-tenant product in its data model and storefront structure from the start. External tenant publishing is a later expansion, not a v1 dependency.

## Success Criteria
Flik v1 succeeds when:
- Creators can onboard, create a store, publish offers, and complete real transactions
- Buyers can discover, evaluate, and purchase or book with low friction
- The product feels premium, trustworthy, and distinct from generic template marketplaces
- The structured builder gives creators enough control to feel personal without introducing major complexity

## Design Direction
The redesign should elevate the product without changing the product contract.

### Brand anchors
- Keep white and purple as the primary brand language
- Allow supporting neutrals and refined accent tones that improve depth and premium feel

### Visual goals
- Remove generic or AI-generated layout patterns
- Build stronger hierarchy, spacing, and rhythm
- Use typography that feels editorial, confident, and modern
- Use restrained motion to communicate polish rather than novelty
- Increase perceived trust through product framing, proof points, and clearer information density

### Inspiration sources
- Stripe
- Dub
- The provided reference landing pages and dashboard compositions

### Redesign principle
The redesign should happen in a parallel design-lab app inside the monorepo first, then proven patterns can move into the main application.

## Current-State Note
The current codebase already contains meaningful foundations:
- Monorepo structure with `apps/web`
- Next.js application routing across storefront, account, dashboard, onboarding, staff, admin, and super-admin surfaces
- Convex schema for profiles, stores, products, and uploads
- Seller-oriented store and product functions with slugging, asset handling, and public query paths

The current codebase also appears to have material gaps:
- Several routes likely still rely on mock data or scaffold UI
- Service commerce is not yet represented as a first-class backend model
- Builder capabilities are not yet defined as a coherent system
- Admin and operational areas appear broader in navigation than in proven implementation depth
- Visual quality is inconsistent and includes leftover placeholder content from earlier experimentation

Future implementation should not assume that existing route count equals feature completeness.

## Dependencies and Open Product Decisions
These do not block this PRD, but they should be resolved during implementation planning:
- Payment provider and checkout infrastructure
- Service booking model and calendar strategy
- File delivery and post-purchase access rules
- Refund, cancellation, and dispute policy depth
- Search and ranking strategy for marketplace discovery
- Theme token system for the structured builder

## Acceptance Criteria for This PRD
This PRD is complete when:
- V1 scope and non-scope are explicit
- Services include booking, checkout, and custom requests
- Marketplace and storefronts are both treated as first-class surfaces
- External publishing is clearly placed after v1
- The redesign direction is connected to product trust and conversion, not just aesthetics
