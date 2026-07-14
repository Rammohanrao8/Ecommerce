import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SlidersHorizontal, Star, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { categoriesQuery, productsQuery } from "@/lib/queries";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@/lib/types";

type Sort = "featured" | "priceAsc" | "priceDesc" | "rating" | "newest";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop all — Ateliér" },
      { name: "description", content: "Every product, filtered your way." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery({ limit: 60 }));
    context.queryClient.ensureQueryData(categoriesQuery());
  },
  component: ShopPage,
});

function ShopPage() {
  return <ShopView title="Shop all" subtitle="Everything in one place — filter it your way." filter={{ limit: 60 }} />;
}

export function ShopView({
  title,
  subtitle,
  filter,
  lockedCategoryId,
}: {
  title: string;
  subtitle?: string;
  filter: Parameters<typeof productsQuery>[0];
  lockedCategoryId?: string;
}) {
  const { data: products = [] } = useSuspenseQuery(productsQuery(filter));
  const { data: cats = [] } = useSuspenseQuery(categoriesQuery());

  const priceMax = useMemo(
    () => Math.max(200, ...products.map((p) => Math.ceil(Number(p.price)))),
    [products],
  );

  const [price, setPrice] = useState<[number, number]>([0, priceMax]);
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [categoryIds, setCategoryIds] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");

  const brandsList = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products as Product[];
    if (lockedCategoryId) list = list.filter((p) => p.category_id === lockedCategoryId);
    if (categoryIds.size) list = list.filter((p) => categoryIds.has(p.category_id));
    if (brands.size) list = list.filter((p) => brands.has(p.brand));
    list = list.filter(
      (p) => Number(p.price) >= price[0] && Number(p.price) <= price[1],
    );
    if (minRating > 0) list = list.filter((p) => Number(p.rating) >= minRating);
    if (inStock) list = list.filter((p) => p.stock > 0);
    if (onSale) list = list.filter((p) => Number(p.compare_at_price ?? 0) > Number(p.price));

    list = [...list];
    switch (sort) {
      case "priceAsc":
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "priceDesc":
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "rating":
        list.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      case "newest":
        list = list.filter(Boolean);
        break;
      case "featured":
        list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
        break;
    }
    return list;
  }, [products, categoryIds, brands, price, minRating, inStock, onSale, sort, lockedCategoryId]);

  const active =
    brands.size +
    categoryIds.size +
    (minRating > 0 ? 1 : 0) +
    (inStock ? 1 : 0) +
    (onSale ? 1 : 0) +
    (price[0] !== 0 || price[1] !== priceMax ? 1 : 0);

  const filters = (
    <Filters
      cats={cats as Category[]}
      brandsList={brandsList}
      categoryIds={categoryIds}
      setCategoryIds={setCategoryIds}
      brands={brands}
      setBrands={setBrands}
      price={price}
      setPrice={setPrice}
      priceMax={priceMax}
      minRating={minRating}
      setMinRating={setMinRating}
      inStock={inStock}
      setInStock={setInStock}
      onSale={onSale}
      setOnSale={setOnSale}
      lockedCategoryId={lockedCategoryId}
      clearAll={() => {
        setBrands(new Set());
        setCategoryIds(new Set());
        setPrice([0, priceMax]);
        setMinRating(0);
        setInStock(false);
        setOnSale(false);
      }}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / {title}
        </nav>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{filtered.length}</span> products
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-accent lg:hidden">
                    <SlidersHorizontal size={14} /> Filters
                    {active > 0 && (
                      <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-brand-foreground">
                        {active}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
                  <div className="pt-6">{filters}</div>
                </SheetContent>
              </Sheet>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="priceAsc">Price: low to high</option>
                <option value="priceDesc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-card p-10 text-center">
              <div className="font-display text-2xl">No products match those filters.</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Try clearing a filter or two.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Filters(props: {
  cats: Category[];
  brandsList: string[];
  categoryIds: Set<string>;
  setCategoryIds: (v: Set<string>) => void;
  brands: Set<string>;
  setBrands: (v: Set<string>) => void;
  price: [number, number];
  setPrice: (v: [number, number]) => void;
  priceMax: number;
  minRating: number;
  setMinRating: (v: number) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  onSale: boolean;
  setOnSale: (v: boolean) => void;
  lockedCategoryId?: string;
  clearAll: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Filters</div>
        <button
          onClick={props.clearAll}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <X size={12} /> Clear all
        </button>
      </div>

      {!props.lockedCategoryId && (
        <FilterGroup title="Category">
          <ul className="space-y-2">
            {props.cats.map((c) => {
              const checked = props.categoryIds.has(c.id);
              return (
                <li key={c.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${c.id}`}
                    checked={checked}
                    onCheckedChange={(v) => {
                      const next = new Set(props.categoryIds);
                      if (v) next.add(c.id);
                      else next.delete(c.id);
                      props.setCategoryIds(next);
                    }}
                  />
                  <label htmlFor={`cat-${c.id}`} className="text-sm">
                    {c.name}
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterGroup>
      )}

      <FilterGroup title="Price">
        <Slider
          value={props.price}
          min={0}
          max={props.priceMax}
          step={5}
          onValueChange={(v) => props.setPrice([v[0], v[1]] as [number, number])}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>${props.price[0]}</span>
          <span>${props.price[1]}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Brand">
        <ul className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {props.brandsList.map((b) => {
            const checked = props.brands.has(b);
            return (
              <li key={b} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${b}`}
                  checked={checked}
                  onCheckedChange={(v) => {
                    const next = new Set(props.brands);
                    if (v) next.add(b);
                    else next.delete(b);
                    props.setBrands(next);
                  }}
                />
                <label htmlFor={`brand-${b}`} className="text-sm">
                  {b}
                </label>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="flex flex-wrap gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => props.setMinRating(r)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition",
                props.minRating === r
                  ? "border-foreground bg-foreground text-background"
                  : "hover:bg-accent",
              )}
            >
              {r === 0 ? "Any" : (
                <>
                  <Star size={12} className="fill-current" /> {r}+
                </>
              )}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={props.inStock} onCheckedChange={(v) => props.setInStock(!!v)} />
            In stock only
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={props.onSale} onCheckedChange={(v) => props.setOnSale(!!v)} />
            On sale
          </label>
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}
