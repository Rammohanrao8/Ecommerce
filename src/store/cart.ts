import { useSyncExternalStore } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  qty: number;
};

const KEY = "lv_cart_v1";
const listeners = new Set<() => void>();
let cache: CartItem[] | null = null;

function read(): CartItem[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: CartItem[]) {
  cache = next;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const EMPTY: CartItem[] = [];

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
}

function keyOf(i: Pick<CartItem, "productId" | "size" | "color">) {
  return `${i.productId}::${i.size ?? ""}::${i.color ?? ""}`;
}

export const cart = {
  add(item: CartItem) {
    const items = read().slice();
    const k = keyOf(item);
    const idx = items.findIndex((i) => keyOf(i) === k);
    if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
    else items.push(item);
    write(items);
  },
  setQty(k: string, qty: number) {
    const items = read()
      .map((i) => (keyOf(i) === k ? { ...i, qty: Math.max(1, qty) } : i));
    write(items);
  },
  remove(k: string) {
    write(read().filter((i) => keyOf(i) !== k));
  },
  clear() {
    write([]);
  },
  keyOf,
};

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { subtotal, shipping, tax, total, count };
}
