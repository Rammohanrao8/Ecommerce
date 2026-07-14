import { n as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as formatCurrency, r as discountPct, t as cart } from "./format-CDIcmAXO.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as Heart, c as Star, d as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-2Q1c5Cy_.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, n as numberType, r as objectType, t as booleanType } from "../_libs/zod.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-DU7wvuMF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("74cf57a5ce5acc5ff7716c464d5de5a2260685d83f4d25828e2026fb3932cf53"));
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	categorySlug: stringType().optional(),
	featured: booleanType().optional(),
	flashSale: booleanType().optional(),
	isNew: booleanType().optional(),
	bestSeller: booleanType().optional(),
	limit: numberType().int().min(1).max(60).optional()
}).parse(input ?? {})).handler(createSsrRpc("51ad93d03c52987e0e52d0164e41771f8765a8919d8a537367eaf795dff9b9d8"));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1) }).parse(input)).handler(createSsrRpc("934a19e0a64899030ca094a104b50f8fc2c2f2533d480be67184ceddaf6faaf0"));
var searchProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ q: stringType().min(1).max(80) }).parse(input)).handler(createSsrRpc("98f6ea06219c15c258067120d8debbcde0f6f83e0efb6c06816ddb77b33849a7"));
var categoriesQuery = () => queryOptions({
	queryKey: ["categories"],
	queryFn: () => listCategories(),
	staleTime: 5 * 6e4
});
var productsQuery = (params = {}) => queryOptions({
	queryKey: ["products", params],
	queryFn: () => listProducts({ data: params }),
	staleTime: 6e4
});
var productBySlugQuery = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: () => getProductBySlug({ data: { slug } }),
	staleTime: 6e4
});
var searchQuery = (q) => queryOptions({
	queryKey: ["search", q],
	queryFn: () => searchProducts({ data: { q } }),
	enabled: q.trim().length > 0,
	staleTime: 3e4
});
var KEY = "lv_wishlist_v1";
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
var EMPTY = [];
function useWishlist() {
	return (0, import_react.useSyncExternalStore)((l) => (listeners.add(l), () => listeners.delete(l)), () => read(), () => EMPTY);
}
function useIsWishlisted(id) {
	return useWishlist().includes(id);
}
var wishlist = {
	toggle(id) {
		const list = read();
		write(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
	},
	remove(id) {
		write(read().filter((x) => x !== id));
	},
	clear() {
		write([]);
	}
};
function RatingStars({ value, size = 14, className, showValue = false, reviews }) {
	const v = Math.max(0, Math.min(5, Number(value) || 0));
	const full = Math.floor(v);
	const half = v - full >= .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-center gap-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "inline-flex",
			children: [
				0,
				1,
				2,
				3,
				4
			].map((i) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
					size,
					className: cn("shrink-0", i < full || i === full && half ? "fill-brand text-brand" : "fill-transparent text-muted-foreground/40"),
					strokeWidth: 1.5
				}, i);
			})
		}), showValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs font-medium text-foreground",
			children: [v.toFixed(1), typeof reviews === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ml-1 text-muted-foreground",
				children: [
					"(",
					reviews.toLocaleString(),
					")"
				]
			})]
		})]
	});
}
function PriceTag({ price, compareAt, size = "md", className }) {
	const disc = discountPct(price, compareAt);
	const priceCls = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-xl",
		xl: "text-3xl"
	}[size];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-baseline gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-semibold tabular-nums text-foreground", priceCls),
			children: formatCurrency(price)
		}), compareAt && disc > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground line-through tabular-nums",
			children: formatCurrency(compareAt)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand",
			children: [
				"−",
				disc,
				"%"
			]
		})] })]
	});
}
function ProductCard({ product, className }) {
	const wished = useIsWishlisted(product.id);
	const img = product.images?.[0] ?? "";
	const alt = product.images?.[1] ?? img;
	function quickAdd(e) {
		e.preventDefault();
		cart.add({
			productId: product.id,
			slug: product.slug,
			name: product.name,
			brand: product.brand,
			price: Number(product.price),
			image: img,
			size: product.sizes[0],
			color: product.colors[0],
			qty: 1
		});
		toast.success(`Added ${product.name}`, { description: "Ready in your cart" });
	}
	function toggleWish(e) {
		e.preventDefault();
		wishlist.toggle(product.id);
		toast(wished ? "Removed from wishlist" : "Saved to wishlist");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/product/$slug",
		params: { slug: product.slug },
		className: cn("group relative flex flex-col overflow-hidden card-elevated card-elevated-hover", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] overflow-hidden bg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img,
					alt: product.name,
					loading: "lazy",
					className: "absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: alt,
					alt: "",
					"aria-hidden": true,
					loading: "lazy",
					className: "absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 top-3 flex flex-col gap-1.5",
					children: [product.is_flash_sale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground shadow-sm",
						children: "Flash"
					}), product.is_new && !product.is_flash_sale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background",
						children: "New"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: toggleWish,
					"aria-label": wished ? "Remove from wishlist" : "Add to wishlist",
					className: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur transition hover:scale-105 hover:bg-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
						size: 16,
						className: cn(wished ? "fill-brand text-brand" : "text-foreground"),
						strokeWidth: 1.75
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: quickAdd,
					className: "absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-xs font-semibold uppercase tracking-wider text-background opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 14 }), " Quick add"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-1.5 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: product.brand
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-1 text-sm font-medium text-foreground",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingStars, {
					value: product.rating,
					size: 12,
					showValue: true,
					reviews: product.review_count
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
						price: product.price,
						compareAt: product.compare_at_price,
						size: "md"
					})
				})
			]
		})]
	});
}
function ProductCardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-elevated overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] animate-pulse bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-16 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-3/4 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-24 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-20 animate-pulse rounded bg-muted" })
			]
		})]
	});
}
//#endregion
export { categoriesQuery as a, productsQuery as c, useWishlist as d, wishlist as f, RatingStars as i, searchQuery as l, ProductCard as n, cn as o, ProductCardSkeleton as r, productBySlugQuery as s, PriceTag as t, useIsWishlisted as u };
