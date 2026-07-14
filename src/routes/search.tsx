import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Search } from "lucide-react";
import { searchQuery } from "@/lib/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/search")({
  validateSearch: (s) => z.object({ q: z.string().optional().default("") }).parse(s),
  head: () => ({
    meta: [
      { title: "Search — Ateliér" },
      { name: "description", content: "Search across products, brands and categories." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data = [], isFetching } = useQuery(searchQuery(q));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <h1 className="font-display text-4xl md:text-5xl">Search</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const val = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
          navigate({ search: { q: val.trim() } });
        }}
        className="relative mt-6 max-w-2xl"
      >
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          name="q"
          defaultValue={q}
          autoFocus
          placeholder="Try 'sneakers', 'headphones', 'watch'..."
          className="h-14 w-full rounded-full border bg-background pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-ring/30"
        />
      </form>

      <div className="mt-8">
        {!q.trim() ? (
          <p className="text-muted-foreground">Start typing to search products.</p>
        ) : isFetching ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <div className="font-display text-2xl">No results for "{q}"</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword, brand or category.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {data.length} results for <span className="font-medium text-foreground">"{q}"</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {(data as unknown as Product[]).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
