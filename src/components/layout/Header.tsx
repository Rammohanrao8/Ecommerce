import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categoriesQuery, searchQuery } from "@/lib/queries";
import { useCart, cartTotals } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { CartDrawer } from "./CartDrawer";
import { cn } from "@/lib/utils";

export function Header() {
  const { data: cats = [] } = useQuery(categoriesQuery());
  const items = useCart();
  const wishItems = useWishlist();
  const { count } = cartTotals(items);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement */}
      <div className="brand-gradient text-brand-foreground">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-[11px] font-medium tracking-wide sm:text-xs">
          Free shipping on orders over $100 · 30-day easy returns
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-shadow duration-200",
          scrolled ? "glass shadow-[0_1px_0_0_var(--color-border)]" : "bg-background",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-6">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent lg:hidden"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[86vw] max-w-sm p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <span className="font-display text-2xl">Ateliér</span>
                  <button onClick={() => setMobileOpen(false)} aria-label="Close">
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-3">
                  {cats.map((c) => (
                    <Link
                      key={c.id}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
                    >
                      <span>{c.name}</span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Link>
                  ))}
                  <Link
                    to="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
                  >
                    Shop all <ChevronRight size={16} className="text-muted-foreground" />
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-baseline gap-1.5">
            <span className="font-display text-2xl leading-none sm:text-3xl">Ateliér</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:inline">
              /shop
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden min-w-0 flex-1 items-center gap-1 lg:flex">
            <MegaMenu categories={cats} />
            <Link
              to="/shop"
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
            >
              New
            </Link>
            <Link
              to="/shop"
              search={{ sort: "deals" } as never}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
            >
              Deals
            </Link>
          </nav>

          <SearchBar />

          <div className="flex items-center gap-1">
            <Link
              to="/wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.75} />
              {wishItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
                  {wishItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/"
              className="hidden h-10 w-10 place-items-center rounded-full hover:bg-accent sm:grid"
              aria-label="Account"
            >
              <User size={18} strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

function MegaMenu({ categories }: { categories: { id: string; slug: string; name: string; image_url: string | null; tagline: string | null }[] }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground">
        Shop
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[min(920px,90vw)] rounded-2xl border bg-popover p-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {c.image_url && (
                    <img
                      src={c.image_url}
                      alt={c.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <div className="font-medium">{c.name}</div>
                    {c.tagline && <div className="text-[11px] opacity-80">{c.tagline}</div>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchBar() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [debounced, setDebounced] = useState("");
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 220);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const { data: results = [] } = useQuery({ ...searchQuery(debounced), staleTime: 15_000 });

  return (
    <div ref={ref} className="relative ml-auto hidden min-w-0 max-w-md flex-1 md:block lg:ml-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) navigate({ to: "/search", search: { q: q.trim() } });
        }}
        className="relative"
      >
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search products, brands..."
          className="h-11 w-full rounded-full border border-input bg-secondary/50 pl-10 pr-4 text-sm outline-none transition focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20"
        />
      </form>
      {focused && (q.trim().length > 0) && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[420px] overflow-y-auto rounded-2xl border bg-popover shadow-xl">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No matches for "{q}"</div>
          ) : (
            <ul className="p-2">
              {results.slice(0, 8).map((r) => (
                <li key={r.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: r.slug }}
                    onClick={() => setFocused(false)}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-accent"
                  >
                    <img
                      src={(r.images as string[])?.[0]}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {r.brand}
                      </div>
                      <div className="truncate text-sm">{r.name}</div>
                    </div>
                    <div className="text-sm font-semibold">${Number(r.price).toFixed(0)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
