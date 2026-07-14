
# Enterprise E-Commerce Build Plan

You picked all four slices. Realistic delivery = phased. Each phase is shippable on its own; I'll build **Phase 1 in this turn**, then confirm before Phase 2, etc.

## Stack (fixed by your answers)
- TanStack Start + React 19 + TypeScript + Tailwind v4 (Vite under the hood)
- Lovable Cloud (Postgres + Auth + Storage) as backend
- TanStack Query for data, TanStack Router for routes
- Framer Motion, Swiper, react-hook-form + zod, sonner (toasts), recharts (charts), lucide-react (icons)

Note: Redux Toolkit / Axios / React Router DOM / React Hot Toast / React Icons / Chart.js from your spec are replaced by the platform-native equivalents above. Same capabilities, better fit — no functionality lost.

## Design direction
Premium retail: crisp neutrals, single bold accent, generous whitespace, rounded-2xl cards, layered shadows, subtle glass on sticky nav. Inspired by Apple + Nike more than Amazon's density. Framer Motion for hero, product cards, cart drawer, page transitions.

---

## Phase 1 — Storefront core (this turn)

Backend (Cloud migration):
- Tables: `categories`, `products`, `product_images`, `product_variants`, `reviews`, `wishlists`, `carts`, `cart_items`, `addresses`, `orders`, `order_items`, `profiles`, `user_roles` (app_role enum: admin, seller, customer), `coupons`
- RLS + GRANTs per rules; `has_role()` security-definer
- Seed ~40 products across 6 categories via migration

Routes & UI:
- `__root.tsx`: sticky glass navbar (logo, mega-menu categories, search, wishlist, cart drawer trigger, account), footer
- `/` home: hero slider, category grid, flash sale strip, trending, new arrivals, best sellers, brand strip, newsletter
- `/shop` + `/category/$slug`: filter sidebar (price, brand, rating, availability, discount), sort, product grid, pagination
- `/product/$slug`: gallery + zoom, variants (size/color), qty, add-to-cart, wishlist, specs, reviews, related, "frequently bought together"
- `/search?q=`: debounced results with suggestions
- `/cart`: line items, qty controls, coupon, totals, shipping estimate
- `/wishlist`
- Cart drawer (Sheet) accessible from any page

Reusable primitives: ProductCard, PriceTag, RatingStars, Badge variants, EmptyState, Skeleton loaders, FilterGroup, QuantityStepper.

## Phase 2 — Auth + Checkout
- Google + email/password (via `supabase--configure_social_auth`)
- `/auth` public route (login/signup tabs, forgot password, `/reset-password`)
- `_authenticated/` gate (integration-managed)
- Login popup interceptor for Buy Now / Checkout
- `/checkout` stepper: Address → Delivery → Payment (stub) → Confirmation
- `/buy-now/$productId` single-item flow
- Order creation server fn

## Phase 3 — User profile area
- `/account` dashboard, `/account/orders` (timeline, invoice, cancel, return), `/account/addresses` CRUD, `/account/wishlist`, `/account/recently-viewed`, `/account/coupons`, `/account/settings`

## Phase 4 — Admin + Seller dashboards
- `_authenticated/_admin/` gated by `has_role('admin')`; `_authenticated/_seller/` by `has_role('seller')`
- Recharts: sales, revenue, orders, top products, customers
- Products/Orders/Inventory/Coupons/Users/Returns tables with CRUD

---

## Out of scope (would each need their own turn if you want them)
Voice search, 360° viewer, product comparison page, review videos, real payment processor (Stripe/Paddle — say the word), notifications system, email verification templates, maintenance page, PWA/offline, i18n, real invoice PDF generation.

## What I'll do right now
1. Enable Lovable Cloud
2. Ship Phase 1 (schema + seed + storefront UI end-to-end)
3. Report back with what's live and confirm before Phase 2

Reply "go" to proceed, or tell me to reshuffle phases / cut scope.
