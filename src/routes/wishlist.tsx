import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { productsQuery } from "@/lib/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your wishlist — Ateliér" },
      { name: "description", content: "Items you love, saved for later." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist();
  const { data = [], isLoading } = useQuery(productsQuery({ limit: 60 }));
  const items = (data as Product[]).filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <h1 className="font-display text-4xl md:text-5xl">Your wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>

      {isLoading ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border bg-card p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
            <Heart size={22} className="text-muted-foreground" />
          </div>
          <h2 className="mt-4 font-display text-2xl">No favorites yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart on any product to save it here.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
