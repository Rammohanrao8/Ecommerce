import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { m as Search } from "../_libs/lucide-react.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as searchQuery, n as ProductCard, r as ProductCardSkeleton } from "./ProductCard-DU7wvuMF.mjs";
import { t as Route } from "./search-BNFnUgyc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-D6jwTecG.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { data = [], isFetching } = useQuery(searchQuery(q));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-5xl",
				children: "Search"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const val = e.currentTarget.elements.namedItem("q").value;
					navigate({ search: { q: val.trim() } });
				},
				className: "relative mt-6 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 18,
					className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "q",
					defaultValue: q,
					autoFocus: true,
					placeholder: "Try 'sneakers', 'headphones', 'watch'...",
					className: "h-14 w-full rounded-full border bg-background pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-ring/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: !q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Start typing to search products."
				}) : isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
					children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
				}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-card p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-2xl",
						children: [
							"No results for \"",
							q,
							"\""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try a different keyword, brand or category."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 text-sm text-muted-foreground",
					children: [
						data.length,
						" results for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-foreground",
							children: [
								"\"",
								q,
								"\""
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
					children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})] })
			})
		]
	});
}
//#endregion
export { SearchPage as component };
