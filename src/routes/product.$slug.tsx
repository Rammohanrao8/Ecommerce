import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Heart, Share2, Truck, RefreshCw, ShieldCheck, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { productBySlugQuery } from "@/lib/queries";
import { PriceTag } from "@/components/product/PriceTag";
import { RatingStars } from "@/components/product/RatingStars";
import { ProductCard } from "@/components/product/ProductCard";
import { cart } from "@/store/cart";
import { wishlist, useIsWishlisted } from "@/store/wishlist";
import { recentlyViewed } from "@/store/recentlyViewed";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(productBySlugQuery(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product as Product;
    const img = (p.images as string[])?.[0];
    return {
      meta: [
        { title: `${p.name} by ${p.brand} — Ateliér` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — ${formatCurrency(p.price)}` },
        { property: "og:description", content: p.description.slice(0, 155) },
        ...(img ? [{ property: "og:image", content: img } as const] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-flex text-sm underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const p = product as Product & { categories?: { slug: string; name: string } };
  const wished = useIsWishlisted(p.id);

  const [size, setSize] = useState<string | undefined>(p.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(p.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    recentlyViewed.push(p.slug);
  }, [p.slug]);

  const images = (p.images as string[]) ?? [];

  function add() {
    cart.add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      price: Number(p.price),
      image: images[0] ?? "",
      size,
      color,
      qty,
    });
    toast.success(`${p.name} added to bag`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        {p.categories && (
          <>
            <ChevronRight size={12} />
            <Link
              to="/category/$slug"
              params={{ slug: p.categories.slug }}
              className="hover:text-foreground"
            >
              {p.categories.name}
            </Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="truncate text-foreground">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div className="grid gap-4 md:grid-cols-[80px_1fr]">
          <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-20 md:w-20",
                  i === activeImg ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100",
                )}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 md:order-2">
            <div className="group relative aspect-square overflow-hidden rounded-3xl bg-muted">
              <img
                src={images[activeImg]}
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {p.is_flash_sale && (
                  <span className="rounded-full brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-foreground shadow">
                    Flash sale
                  </span>
                )}
                {p.is_new && (
                  <span className="rounded-full bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-background">
                    New
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {p.brand}
          </div>
          <h1 className="mt-1 font-display text-4xl leading-tight md:text-5xl">{p.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <RatingStars value={p.rating} showValue reviews={p.review_count} size={16} />
            <span className="text-xs text-muted-foreground">
              {p.stock > 0 ? `In stock (${p.stock})` : "Out of stock"}
            </span>
          </div>

          <div className="mt-5">
            <PriceTag price={p.price} compareAt={p.compare_at_price} size="xl" />
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {p.description}
          </p>

          {p.colors?.length > 0 && (
            <OptionGroup title="Color" value={color}>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      color === c
                        ? "border-foreground bg-foreground text-background"
                        : "hover:bg-accent",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </OptionGroup>
          )}

          {p.sizes?.length > 0 && (
            <OptionGroup title="Size" value={size}>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-12 rounded-xl border px-4 py-2.5 text-sm transition",
                      size === s
                        ? "border-foreground bg-foreground text-background"
                        : "hover:bg-accent",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </OptionGroup>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-full border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-12 w-12 place-items-center hover:bg-accent"
                aria-label="Decrease"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="grid h-12 w-12 place-items-center hover:bg-accent"
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <button
              onClick={add}
              disabled={p.stock === 0}
              className="min-w-48 flex-1 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 sm:flex-none"
            >
              Add to bag
            </button>
            <button
              onClick={() => {
                wishlist.toggle(p.id);
                toast(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
              className={cn(
                "grid h-12 w-12 place-items-center rounded-full border transition hover:bg-accent",
                wished && "border-brand text-brand",
              )}
              aria-label="Wishlist"
            >
              <Heart size={18} className={cn(wished && "fill-current")} />
            </button>
            <button
              onClick={() => {
                const nav = typeof navigator !== "undefined" ? navigator : undefined;
                if (nav && typeof nav.share === "function") {
                  nav.share({ title: p.name, url: window.location.href }).catch(() => {});
                } else if (nav?.clipboard) {
                  nav.clipboard.writeText(window.location.href);
                  toast("Link copied");
                }
              }}
              className="grid h-12 w-12 place-items-center rounded-full border transition hover:bg-accent"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>

          <div className="mt-8 grid gap-3 border-t pt-6 sm:grid-cols-3">
            <Perk icon={Truck} title="Free shipping" copy="Orders over $100" />
            <Perk icon={RefreshCw} title="Free returns" copy="Within 30 days" />
            <Perk icon={ShieldCheck} title="Authentic" copy="Guaranteed" />
          </div>
        </div>
      </div>

      {/* Specs / highlights */}
      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Highlights</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {p.tags.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-brand" />
                <span className="capitalize">{t.replace(/-/g, " ")}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-brand" />
              Ships from a certified {p.brand} authorized retailer
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Specifications</h2>
          <dl className="mt-4 divide-y rounded-2xl border bg-card">
            {[
              ["Brand", p.brand],
              ["Category", p.categories?.name ?? "—"],
              ["Rating", `${Number(p.rating).toFixed(1)} / 5`],
              ["Reviews", String(p.review_count)],
              ["Stock", String(p.stock)],
              ["SKU", p.id.slice(0, 8).toUpperCase()],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl">You might also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {(related as Product[]).slice(0, 4).map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function OptionGroup({
  title,
  value,
  children,
}: {
  title: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="text-sm">
        <span className="font-semibold">{title}</span>
        {value && <span className="ml-2 text-muted-foreground">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function Perk({
  icon: Icon,
  title,
  copy,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
        <Icon size={16} strokeWidth={1.75} />
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{copy}</div>
      </div>
    </div>
  );
}
