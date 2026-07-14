import { n as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as cart } from "./format-CDIcmAXO.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Truck, b as Heart, f as ShieldCheck, h as RefreshCw, p as Share2, x as ChevronRight } from "../_libs/lucide-react.mjs";
import { f as wishlist, i as RatingStars, n as ProductCard, o as cn, t as PriceTag, u as useIsWishlisted } from "./ProductCard-DU7wvuMF.mjs";
import { t as Route } from "./product._slug-04skn7qK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-C2_899UR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "lv_recent_v1";
var MAX = 8;
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
function write(n) {
	cache = n;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(n));
	listeners.forEach((l) => l());
}
var recentlyViewed = { push(slug) {
	const cur = read().filter((s) => s !== slug);
	cur.unshift(slug);
	write(cur.slice(0, MAX));
} };
function ProductPage() {
	const { product, related } = Route.useLoaderData();
	const p = product;
	const wished = useIsWishlisted(p.id);
	const [size, setSize] = (0, import_react.useState)(p.sizes?.[0]);
	const [color, setColor] = (0, import_react.useState)(p.colors?.[0]);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [activeImg, setActiveImg] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		recentlyViewed.push(p.slug);
	}, [p.slug]);
	const images = p.images ?? [];
	function add() {
		cart.add({
			productId: p.id,
			slug: p.slug,
			name: p.name,
			brand: p.brand,
			price: Number(p.price),
			image: images[0] ?? "",
			size,
			color,
			qty
		});
		toast.success(`${p.name} added to bag`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "hover:text-foreground",
						children: "Shop"
					}),
					p.categories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/category/$slug",
						params: { slug: p.categories.slug },
						className: "hover:text-foreground",
						children: p.categories.name
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-foreground",
						children: p.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1.1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-[80px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col",
						children: images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveImg(i),
							className: cn("relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-20 md:w-20", i === activeImg ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"),
							"aria-label": `View image ${i + 1}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "h-full w-full object-cover"
							})
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-1 md:order-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative aspect-square overflow-hidden rounded-3xl bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: images[activeImg],
								alt: p.name,
								className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute left-4 top-4 flex flex-col gap-2",
								children: [p.is_flash_sale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-foreground shadow",
									children: "Flash sale"
								}), p.is_new && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-background",
									children: "New"
								})]
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
						children: p.brand
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl leading-tight md:text-5xl",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingStars, {
							value: p.rating,
							showValue: true,
							reviews: p.review_count,
							size: 16
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: p.stock > 0 ? `In stock (${p.stock})` : "Out of stock"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
							price: p.price,
							compareAt: p.compare_at_price,
							size: "xl"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
						children: p.description
					}),
					p.colors?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionGroup, {
						title: "Color",
						value: color,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: p.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setColor(c),
								className: cn("rounded-full border px-4 py-2 text-sm transition", color === c ? "border-foreground bg-foreground text-background" : "hover:bg-accent"),
								children: c
							}, c))
						})
					}),
					p.sizes?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionGroup, {
						title: "Size",
						value: size,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: p.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSize(s),
								className: cn("min-w-12 rounded-xl border px-4 py-2.5 text-sm transition", size === s ? "border-foreground bg-foreground text-background" : "hover:bg-accent"),
								children: s
							}, s))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center rounded-full border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty(Math.max(1, qty - 1)),
										className: "grid h-12 w-12 place-items-center hover:bg-accent",
										"aria-label": "Decrease",
										children: "−"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 text-center font-semibold tabular-nums",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty(qty + 1),
										className: "grid h-12 w-12 place-items-center hover:bg-accent",
										"aria-label": "Increase",
										children: "+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: add,
								disabled: p.stock === 0,
								className: "min-w-48 flex-1 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 sm:flex-none",
								children: "Add to bag"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									wishlist.toggle(p.id);
									toast(wished ? "Removed from wishlist" : "Saved to wishlist");
								},
								className: cn("grid h-12 w-12 place-items-center rounded-full border transition hover:bg-accent", wished && "border-brand text-brand"),
								"aria-label": "Wishlist",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 18,
									className: cn(wished && "fill-current")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									const nav = typeof navigator !== "undefined" ? navigator : void 0;
									if (nav && typeof nav.share === "function") nav.share({
										title: p.name,
										url: window.location.href
									}).catch(() => {});
									else if (nav?.clipboard) {
										nav.clipboard.writeText(window.location.href);
										toast("Link copied");
									}
								},
								className: "grid h-12 w-12 place-items-center rounded-full border transition hover:bg-accent",
								"aria-label": "Share",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 18 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 border-t pt-6 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perk, {
								icon: Truck,
								title: "Free shipping",
								copy: "Orders over $100"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perk, {
								icon: RefreshCw,
								title: "Free returns",
								copy: "Within 30 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perk, {
								icon: ShieldCheck,
								title: "Authentic",
								copy: "Guaranteed"
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 grid gap-10 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Highlights"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [p.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 inline-block h-1 w-1 rounded-full bg-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "capitalize",
							children: t.replace(/-/g, " ")
						})]
					}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 inline-block h-1 w-1 rounded-full bg-brand" }),
							"Ships from a certified ",
							p.brand,
							" authorized retailer"
						]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Specifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 divide-y rounded-2xl border bg-card",
					children: [
						["Brand", p.brand],
						["Category", p.categories?.name ?? "—"],
						["Rating", `${Number(p.rating).toFixed(1)} / 5`],
						["Reviews", String(p.review_count)],
						["Stock", String(p.stock)],
						["SKU", p.id.slice(0, 8).toUpperCase()]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium",
							children: v
						})]
					}, k))
				})] })]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "You might also like"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
					children: related.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: r }, r.id))
				})]
			})
		]
	});
}
function OptionGroup({ title, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: title
			}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 text-muted-foreground",
				children: value
			})]
		}), children]
	});
}
function Perk({ icon: Icon, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 16,
				strokeWidth: 1.75
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: copy
		})] })]
	});
}
//#endregion
export { ProductPage as component };
