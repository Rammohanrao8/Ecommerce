import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { toast } from "sonner";
import { useCart, cart, cartTotals } from "@/store/cart";
import { formatCurrency } from "@/lib/format";

const COUPONS: Record<string, number> = {
  WELCOME10: 0.1,
  ATELIER15: 0.15,
};

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your bag — Ateliér" },
      { name: "description", content: "Review your items and check out." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(null);

  const totals = cartTotals(items);
  const discount = applied ? +(totals.subtotal * applied.pct).toFixed(2) : 0;
  const total = +(totals.total - discount).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted">
          <ShoppingBag size={36} className="text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl">Your bag is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover our latest edit and start shopping.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <h1 className="font-display text-4xl md:text-5xl">Your bag</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {totals.count} {totals.count === 1 ? "item" : "items"}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y rounded-2xl border bg-card">
          {items.map((i) => {
            const k = cart.keyOf(i);
            return (
              <li key={k} className="flex gap-4 p-4 sm:p-6">
                <Link to="/product/$slug" params={{ slug: i.slug }} className="shrink-0">
                  <img src={i.image} alt={i.name} className="h-28 w-24 rounded-xl object-cover sm:h-32 sm:w-28" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {i.brand}
                  </div>
                  <Link
                    to="/product/$slug"
                    params={{ slug: i.slug }}
                    className="mt-0.5 text-base font-medium hover:underline"
                  >
                    {i.name}
                  </Link>
                  {(i.size || i.color) && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {[i.size, i.color].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  <div className="mt-auto flex items-end justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border">
                      <button
                        onClick={() => cart.setQty(k, i.qty - 1)}
                        className="grid h-9 w-9 place-items-center hover:bg-accent"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{i.qty}</span>
                      <button
                        onClick={() => cart.setQty(k, i.qty + 1)}
                        className="grid h-9 w-9 place-items-center hover:bg-accent"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-semibold tabular-nums">
                        {formatCurrency(i.price * i.qty)}
                      </div>
                      <button
                        onClick={() => cart.remove(k)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatCurrency(totals.subtotal)} />
              <Row
                label="Shipping"
                value={totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}
              />
              <Row label="Tax (8%)" value={formatCurrency(totals.tax)} />
              {applied && (
                <Row
                  label={`Discount (${applied.code})`}
                  value={`− ${formatCurrency(discount)}`}
                  positive
                />
              )}
            </dl>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const norm = code.trim().toUpperCase();
                const pct = COUPONS[norm];
                if (pct) {
                  setApplied({ code: norm, pct });
                  toast.success(`${Math.round(pct * 100)}% off applied`);
                } else {
                  toast.error("Invalid coupon");
                }
              }}
              className="mt-5 flex items-center gap-2 rounded-full border bg-background p-1"
            >
              <Tag size={14} className="ml-3 text-muted-foreground" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Try WELCOME10"
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none"
              />
              <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90">
                Apply
              </button>
            </form>

            <div className="mt-6 flex items-baseline justify-between border-t pt-5">
              <span className="text-base font-semibold">Total</span>
              <span className="text-2xl font-semibold tabular-nums">{formatCurrency(total)}</span>
            </div>

            <button
              onClick={() =>
                toast.info("Checkout ships in phase 2 with auth", {
                  description: "You'll be prompted to sign in.",
                })
              }
              className="mt-6 grid h-12 w-full place-items-center rounded-full bg-foreground text-sm font-semibold text-background hover:opacity-90"
            >
              Checkout · {formatCurrency(total)}
            </button>
            <Link
              to="/shop"
              className="mt-3 grid h-11 w-full place-items-center rounded-full border text-sm font-semibold hover:bg-accent"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={positive ? "font-medium text-success" : "font-medium"}>{value}</dd>
    </div>
  );
}
