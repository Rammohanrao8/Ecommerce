import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, cart, cartTotals } from "@/store/cart";
import { formatCurrency } from "@/lib/format";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const items = useCart();
  const { subtotal, shipping, count } = cartTotals(items);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag size={18} /> Your bag
            <span className="ml-1 text-sm font-normal text-muted-foreground">({count})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-muted">
              <ShoppingBag size={28} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Your bag is empty</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Browse the shop and add things you love. We'll keep them here for you.
            </p>
            <Link
              to="/shop"
              onClick={() => onOpenChange(false)}
              className="mt-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="divide-y">
                {items.map((i) => {
                  const k = cart.keyOf(i);
                  return (
                    <li key={k} className="flex gap-4 py-4">
                      <Link
                        to="/product/$slug"
                        params={{ slug: i.slug }}
                        onClick={() => onOpenChange(false)}
                        className="shrink-0"
                      >
                        <img src={i.image} alt={i.name} className="h-24 w-20 rounded-lg object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {i.brand}
                        </div>
                        <Link
                          to="/product/$slug"
                          params={{ slug: i.slug }}
                          onClick={() => onOpenChange(false)}
                          className="line-clamp-1 text-sm font-medium hover:underline"
                        >
                          {i.name}
                        </Link>
                        {(i.size || i.color) && (
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {[i.size, i.color].filter(Boolean).join(" · ")}
                          </div>
                        )}
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border">
                            <button
                              onClick={() => cart.setQty(k, i.qty - 1)}
                              className="grid h-8 w-8 place-items-center hover:bg-accent"
                              aria-label="Decrease"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm tabular-nums">{i.qty}</span>
                            <button
                              onClick={() => cart.setQty(k, i.qty + 1)}
                              className="grid h-8 w-8 place-items-center hover:bg-accent"
                              aria-label="Increase"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-semibold tabular-nums">
                              {formatCurrency(i.price * i.qty)}
                            </div>
                            <button
                              onClick={() => cart.remove(k)}
                              className="text-muted-foreground hover:text-destructive"
                              aria-label="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t bg-secondary/40 p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {shipping === 0
                  ? "Free shipping applied"
                  : `Add ${formatCurrency(100 - subtotal)} more for free shipping`}
              </div>
              <Link
                to="/cart"
                onClick={() => onOpenChange(false)}
                className="mt-4 grid h-12 place-items-center rounded-full bg-foreground text-sm font-semibold text-background hover:opacity-90"
              >
                View bag & checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
