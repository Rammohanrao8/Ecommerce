import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Heart } from "../_libs/lucide-react.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as productsQuery, d as useWishlist, n as ProductCard, r as ProductCardSkeleton } from "./ProductCard-DU7wvuMF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-BbOsxibm.js
var import_jsx_runtime = require_jsx_runtime();
function WishlistPage() {
	const ids = useWishlist();
	const { data = [], isLoading } = useQuery(productsQuery({ limit: 60 }));
	const items = data.filter((p) => ids.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-5xl",
				children: "Your wishlist"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					items.length,
					" ",
					items.length === 1 ? "item" : "items",
					" saved"
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-10 max-w-md rounded-2xl border bg-card p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							size: 22,
							className: "text-muted-foreground"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl",
						children: "No favorites yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Tap the heart on any product to save it here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-5 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90",
						children: "Browse the shop"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
				children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	});
}
//#endregion
export { WishlistPage as component };
