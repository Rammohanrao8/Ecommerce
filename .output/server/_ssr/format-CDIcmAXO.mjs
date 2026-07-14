import { n as __toESM } from "../_runtime.mjs";
import { h as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-CDIcmAXO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "lv_cart_v1";
var listeners = /* @__PURE__ */ new Set();
var cache = null;
function read() {
	if (cache) return cache;
	if (typeof window === "undefined") return [];
	try {
		cache = JSON.parse(localStorage.getItem(KEY) ?? "[]");
	} catch {
		cache = [];
	}
	return cache;
}
function write(next) {
	cache = next;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
	listeners.forEach((l) => l());
}
function subscribe(l) {
	listeners.add(l);
	return () => listeners.delete(l);
}
var EMPTY = [];
function useCart() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => read(), () => EMPTY);
}
function keyOf(i) {
	return `${i.productId}::${i.size ?? ""}::${i.color ?? ""}`;
}
var cart = {
	add(item) {
		const items = read().slice();
		const k = keyOf(item);
		const idx = items.findIndex((i) => keyOf(i) === k);
		if (idx >= 0) items[idx] = {
			...items[idx],
			qty: items[idx].qty + item.qty
		};
		else items.push(item);
		write(items);
	},
	setQty(k, qty) {
		write(read().map((i) => keyOf(i) === k ? {
			...i,
			qty: Math.max(1, qty)
		} : i));
	},
	remove(k) {
		write(read().filter((i) => keyOf(i) !== k));
	},
	clear() {
		write([]);
	},
	keyOf
};
function cartTotals(items) {
	const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
	const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
	const tax = +(subtotal * .08).toFixed(2);
	return {
		subtotal,
		shipping,
		tax,
		total: +(subtotal + shipping + tax).toFixed(2),
		count: items.reduce((s, i) => s + i.qty, 0)
	};
}
function formatCurrency(value, currency = "USD") {
	const n = typeof value === "string" ? Number(value) : value;
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		minimumFractionDigits: n % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2
	}).format(n);
}
function discountPct(price, compareAt) {
	if (!compareAt) return 0;
	const p = Number(price);
	const c = Number(compareAt);
	if (!c || c <= p) return 0;
	return Math.round((c - p) / c * 100);
}
//#endregion
export { useCart as a, formatCurrency as i, cartTotals as n, discountPct as r, cart as t };
