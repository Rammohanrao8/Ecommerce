import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { RatingStars } from "./RatingStars";
import { PriceTag } from "./PriceTag";
import { cart } from "@/store/cart";
import { wishlist, useIsWishlisted } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const wished = useIsWishlisted(product.id);
  const img = product.images?.[0] ?? "";
  const alt = product.images?.[1] ?? img;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    cart.add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: Number(product.price),
      image: img,
      size: product.sizes[0],
      color: product.colors[0],
      qty: 1,
    });
    toast.success(`Added ${product.name}`, { description: "Ready in your cart" });
  }

  function toggleWish(e: React.MouseEvent) {
    e.preventDefault();
    wishlist.toggle(product.id);
    toast(wished ? "Removed from wishlist" : "Saved to wishlist");
  }

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className={cn(
        "group relative flex flex-col overflow-hidden card-elevated card-elevated-hover",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={alt}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_flash_sale && (
            <span className="rounded-full brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground shadow-sm">
              Flash
            </span>
          )}
          {product.is_new && !product.is_flash_sale && (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={toggleWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur transition hover:scale-105 hover:bg-background"
        >
          <Heart
            size={16}
            className={cn(wished ? "fill-brand text-brand" : "text-foreground")}
            strokeWidth={1.75}
          />
        </button>

        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-xs font-semibold uppercase tracking-wider text-background opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag size={14} /> Quick add
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </div>
        <h3 className="line-clamp-1 text-sm font-medium text-foreground">{product.name}</h3>
        <RatingStars value={product.rating} size={12} showValue reviews={product.review_count} />
        <div className="mt-1">
          <PriceTag price={product.price} compareAt={product.compare_at_price} size="md" />
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="aspect-[4/5] animate-pulse bg-muted" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-5 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
