import { n as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as useCart, i as formatCurrency, n as cartTotals, t as cart } from "./format-CDIcmAXO.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Minus, d as ShoppingBag, g as Plus, o as Trash2, s as Tag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DNXp-8g0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COUPONS = {
	WELCOME10: .1,
	ATELIER15: .15
};
function CartPage() {
	const items = useCart();
	const [code, setCode] = (0, import_react.useState)("");
	const [applied, setApplied] = (0, import_react.useState)(null);
	const totals = cartTotals(items);
	const discount = applied ? +(totals.subtotal * applied.pct).toFixed(2) : 0;
	const total = +(totals.total - discount).toFixed(2);
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
					size: 36,
					className: "text-muted-foreground"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-4xl",
				children: "Your bag is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Discover our latest edit and start shopping."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90",
				children: "Shop now"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-5xl",
				children: "Your bag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					totals.count,
					" ",
					totals.count === 1 ? "item" : "items"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-10 lg:grid-cols-[1fr_380px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y rounded-2xl border bg-card",
					children: items.map((i) => {
						const k = cart.keyOf(i);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 p-4 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$slug",
								params: { slug: i.slug },
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: i.image,
									alt: i.name,
									className: "h-28 w-24 rounded-xl object-cover sm:h-32 sm:w-28"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: i.brand
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/product/$slug",
										params: { slug: i.slug },
										className: "mt-0.5 text-base font-medium hover:underline",
										children: i.name
									}),
									(i.size || i.color) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: [i.size, i.color].filter(Boolean).join(" · ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto flex items-end justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center rounded-full border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => cart.setQty(k, i.qty - 1),
													className: "grid h-9 w-9 place-items-center hover:bg-accent",
													"aria-label": "Decrease",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 text-center text-sm tabular-nums",
													children: i.qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => cart.setQty(k, i.qty + 1),
													className: "grid h-9 w-9 place-items-center hover:bg-accent",
													"aria-label": "Increase",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold tabular-nums",
												children: formatCurrency(i.price * i.qty)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => cart.remove(k),
												className: "text-muted-foreground hover:text-destructive",
												"aria-label": "Remove",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
											})]
										})]
									})
								]
							})]
						}, k);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Order summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Subtotal",
									value: formatCurrency(totals.subtotal)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Shipping",
									value: totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Tax (8%)",
									value: formatCurrency(totals.tax)
								}),
								applied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: `Discount (${applied.code})`,
									value: `− ${formatCurrency(discount)}`,
									positive: true
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								const norm = code.trim().toUpperCase();
								const pct = COUPONS[norm];
								if (pct) {
									setApplied({
										code: norm,
										pct
									});
									toast.success(`${Math.round(pct * 100)}% off applied`);
								} else toast.error("Invalid coupon");
							},
							className: "mt-5 flex items-center gap-2 rounded-full border bg-background p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									size: 14,
									className: "ml-3 text-muted-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: code,
									onChange: (e) => setCode(e.target.value),
									placeholder: "Try WELCOME10",
									className: "min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90",
									children: "Apply"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-baseline justify-between border-t pt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-semibold",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-semibold tabular-nums",
								children: formatCurrency(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toast.info("Checkout ships in phase 2 with auth", { description: "You'll be prompted to sign in." }),
							className: "mt-6 grid h-12 w-full place-items-center rounded-full bg-foreground text-sm font-semibold text-background hover:opacity-90",
							children: ["Checkout · ", formatCurrency(total)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-3 grid h-11 w-full place-items-center rounded-full border text-sm font-semibold hover:bg-accent",
							children: "Continue shopping"
						})
					]
				}) })]
			})
		]
	});
}
function Row({ label, value, positive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: positive ? "font-medium text-success" : "font-medium",
			children: value
		})]
	});
}
//#endregion
export { CartPage as component };
