import { n as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Star, n as X, u as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as categoriesQuery, c as productsQuery, n as ProductCard, o as cn } from "./ProductCard-DU7wvuMF.mjs";
import { n as Sheet, o as SheetTrigger, r as SheetContent, s as Slider, t as Checkbox } from "./checkbox-IEXmXU_9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-7yT9Be6-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopView, {
		title: "Shop all",
		subtitle: "Everything in one place — filter it your way.",
		filter: { limit: 60 }
	});
}
function ShopView({ title, subtitle, filter, lockedCategoryId }) {
	const { data: products = [] } = useSuspenseQuery(productsQuery(filter));
	const { data: cats = [] } = useSuspenseQuery(categoriesQuery());
	const priceMax = (0, import_react.useMemo)(() => Math.max(200, ...products.map((p) => Math.ceil(Number(p.price)))), [products]);
	const [price, setPrice] = (0, import_react.useState)([0, priceMax]);
	const [brands, setBrands] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [categoryIds, setCategoryIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [minRating, setMinRating] = (0, import_react.useState)(0);
	const [inStock, setInStock] = (0, import_react.useState)(false);
	const [onSale, setOnSale] = (0, import_react.useState)(false);
	const [sort, setSort] = (0, import_react.useState)("featured");
	const brandsList = (0, import_react.useMemo)(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = products;
		if (lockedCategoryId) list = list.filter((p) => p.category_id === lockedCategoryId);
		if (categoryIds.size) list = list.filter((p) => categoryIds.has(p.category_id));
		if (brands.size) list = list.filter((p) => brands.has(p.brand));
		list = list.filter((p) => Number(p.price) >= price[0] && Number(p.price) <= price[1]);
		if (minRating > 0) list = list.filter((p) => Number(p.rating) >= minRating);
		if (inStock) list = list.filter((p) => p.stock > 0);
		if (onSale) list = list.filter((p) => Number(p.compare_at_price ?? 0) > Number(p.price));
		list = [...list];
		switch (sort) {
			case "priceAsc":
				list.sort((a, b) => Number(a.price) - Number(b.price));
				break;
			case "priceDesc":
				list.sort((a, b) => Number(b.price) - Number(a.price));
				break;
			case "rating":
				list.sort((a, b) => Number(b.rating) - Number(a.rating));
				break;
			case "newest":
				list = list.filter(Boolean);
				break;
			case "featured":
				list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
				break;
		}
		return list;
	}, [
		products,
		categoryIds,
		brands,
		price,
		minRating,
		inStock,
		onSale,
		sort,
		lockedCategoryId
	]);
	const active = brands.size + categoryIds.size + (minRating > 0 ? 1 : 0) + (inStock ? 1 : 0) + (onSale ? 1 : 0) + (price[0] !== 0 || price[1] !== priceMax ? 1 : 0);
	const filters = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
		cats,
		brandsList,
		categoryIds,
		setCategoryIds,
		brands,
		setBrands,
		price,
		setPrice,
		priceMax,
		minRating,
		setMinRating,
		inStock,
		setInStock,
		onSale,
		setOnSale,
		lockedCategoryId,
		clearAll: () => {
			setBrands(/* @__PURE__ */ new Set());
			setCategoryIds(/* @__PURE__ */ new Set());
			setPrice([0, priceMax]);
			setMinRating(0);
			setInStock(false);
			setOnSale(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 md:py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "Home"
						}),
						" / ",
						title
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl md:text-5xl",
					children: title
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted-foreground",
					children: subtitle
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[260px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky top-24",
					children: filters
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: filtered.length
					}), " products"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-accent lg:hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 14 }),
								" Filters",
								active > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-brand-foreground",
									children: active
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
						side: "left",
						className: "w-[85vw] max-w-sm overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-6",
							children: filters
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "featured",
								children: "Featured"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "priceAsc",
								children: "Price: low to high"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "priceDesc",
								children: "Price: high to low"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "rating",
								children: "Top rated"
							})
						]
					})]
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-2xl",
					children: "No products match those filters."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try clearing a filter or two."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3",
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})] })]
		})]
	});
}
function Filters(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Filters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: props.clearAll,
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 }), " Clear all"]
				})]
			}),
			!props.lockedCategoryId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Category",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: props.cats.map((c) => {
						const checked = props.categoryIds.has(c.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								id: `cat-${c.id}`,
								checked,
								onCheckedChange: (v) => {
									const next = new Set(props.categoryIds);
									if (v) next.add(c.id);
									else next.delete(c.id);
									props.setCategoryIds(next);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: `cat-${c.id}`,
								className: "text-sm",
								children: c.name
							})]
						}, c.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterGroup, {
				title: "Price",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: props.price,
					min: 0,
					max: props.priceMax,
					step: 5,
					onValueChange: (v) => props.setPrice([v[0], v[1]])
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", props.price[0]] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", props.price[1]] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-48 space-y-2 overflow-y-auto pr-1",
					children: props.brandsList.map((b) => {
						const checked = props.brands.has(b);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								id: `brand-${b}`,
								checked,
								onCheckedChange: (v) => {
									const next = new Set(props.brands);
									if (v) next.add(b);
									else next.delete(b);
									props.setBrands(next);
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: `brand-${b}`,
								className: "text-sm",
								children: b
							})]
						}, b);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Rating",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						0,
						3,
						4,
						4.5
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => props.setMinRating(r),
						className: cn("inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition", props.minRating === r ? "border-foreground bg-foreground text-background" : "hover:bg-accent"),
						children: r === 0 ? "Any" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size: 12,
								className: "fill-current"
							}),
							" ",
							r,
							"+"
						] })
					}, r))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Availability",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: props.inStock,
							onCheckedChange: (v) => props.setInStock(!!v)
						}), "In stock only"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: props.onSale,
							onCheckedChange: (v) => props.setOnSale(!!v)
						}), "On sale"]
					})]
				})
			})
		]
	});
}
function FilterGroup({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 text-xs font-semibold uppercase tracking-wider text-foreground",
		children: title
	}), children] });
}
//#endregion
export { ShopView, ShopPage as component };
