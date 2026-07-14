import { useSyncExternalStore } from "react";

const KEY = "lv_wishlist_v1";
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    cache = [];
  }
  return cache;
}
function write(next: string[]) {
  cache = next;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}
const EMPTY: string[] = [];

export function useWishlist() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => read(),
    () => EMPTY,
  );
}
export function useIsWishlisted(id: string) {
  const list = useWishlist();
  return list.includes(id);
}
export const wishlist = {
  toggle(id: string) {
    const list = read();
    write(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  },
  remove(id: string) {
    write(read().filter((x) => x !== id));
  },
  clear() {
    write([]);
  },
};
