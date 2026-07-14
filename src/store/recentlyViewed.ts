import { useSyncExternalStore } from "react";

const KEY = "lv_recent_v1";
const MAX = 8;
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
function write(n: string[]) {
  cache = n;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(n));
  listeners.forEach((l) => l());
}
const EMPTY: string[] = [];
export function useRecentlyViewed() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => read(),
    () => EMPTY,
  );
}
export const recentlyViewed = {
  push(slug: string) {
    const cur = read().filter((s) => s !== slug);
    cur.unshift(slug);
    write(cur.slice(0, MAX));
  },
};
