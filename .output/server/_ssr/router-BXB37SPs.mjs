import { n as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as useCart, i as formatCurrency, n as cartTotals, t as cart } from "./format-CDIcmAXO.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { _ as Minus, b as Heart, d as ShoppingBag, g as Plus, i as Twitter, m as Search, n as X, o as Trash2, r as User, t as Youtube, v as Menu, x as ChevronRight, y as Instagram } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as categoriesQuery, c as productsQuery, d as useWishlist, l as searchQuery, o as cn } from "./ProductCard-DU7wvuMF.mjs";
import { a as SheetTitle, i as SheetHeader, n as Sheet, o as SheetTrigger, r as SheetContent } from "./checkbox-IEXmXU_9.mjs";
import { n as Route$1$1, t as Route$4 } from "./category._slug-D5Vd7Vpn.mjs";
import { t as Route$5 } from "./product._slug-04skn7qK.mjs";
import { t as Route$6 } from "./search-BNFnUgyc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BXB37SPs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function CartDrawer({ open, onOpenChange }) {
	const items = useCart();
	const { subtotal, shipping, count } = cartTotals(items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "flex w-full flex-col p-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "border-b p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "flex items-center gap-2 text-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 }),
						" Your bag",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-1 text-sm font-normal text-muted-foreground",
							children: [
								"(",
								count,
								")"
							]
						})
					]
				})
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-20 w-20 place-items-center rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
							size: 28,
							className: "text-muted-foreground"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Your bag is empty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs text-sm text-muted-foreground",
						children: "Browse the shop and add things you love. We'll keep them here for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						onClick: () => onOpenChange(false),
						className: "mt-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90",
						children: "Start shopping"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: items.map((i) => {
						const k = cart.keyOf(i);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$slug",
								params: { slug: i.slug },
								onClick: () => onOpenChange(false),
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: i.image,
									alt: i.name,
									className: "h-24 w-20 rounded-lg object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: i.brand
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/product/$slug",
										params: { slug: i.slug },
										onClick: () => onOpenChange(false),
										className: "line-clamp-1 text-sm font-medium hover:underline",
										children: i.name
									}),
									(i.size || i.color) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: [i.size, i.color].filter(Boolean).join(" · ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center rounded-full border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => cart.setQty(k, i.qty - 1),
													className: "grid h-8 w-8 place-items-center hover:bg-accent",
													"aria-label": "Decrease",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 12 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-6 text-center text-sm tabular-nums",
													children: i.qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => cart.setQty(k, i.qty + 1),
													className: "grid h-8 w-8 place-items-center hover:bg-accent",
													"aria-label": "Increase",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold tabular-nums",
												children: formatCurrency(i.price * i.qty)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => cart.remove(k),
												className: "text-muted-foreground hover:text-destructive",
												"aria-label": "Remove",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
											})]
										})]
									})
								]
							})]
						}, k);
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t bg-secondary/40 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "Subtotal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold tabular-nums",
							children: formatCurrency(subtotal)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-muted-foreground",
						children: shipping === 0 ? "Free shipping applied" : `Add ${formatCurrency(100 - subtotal)} more for free shipping`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cart",
						onClick: () => onOpenChange(false),
						className: "mt-4 grid h-12 place-items-center rounded-full bg-foreground text-sm font-semibold text-background hover:opacity-90",
						children: "View bag & checkout"
					})
				]
			})] })]
		})
	});
}
function Header() {
	const { data: cats = [] } = useQuery(categoriesQuery());
	const items = useCart();
	const wishItems = useWishlist();
	const { count } = cartTotals(items);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "brand-gradient text-brand-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-[11px] font-medium tracking-wide sm:text-xs",
				children: "Free shipping on orders over $100 · 30-day easy returns"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: cn("sticky top-0 z-40 transition-shadow duration-200", scrolled ? "glass shadow-[0_1px_0_0_var(--color-border)]" : "bg-background"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open: mobileOpen,
						onOpenChange: setMobileOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "grid h-10 w-10 place-items-center rounded-full hover:bg-accent lg:hidden",
								"aria-label": "Menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
							side: "left",
							className: "w-[86vw] max-w-sm p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b px-5 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-2xl",
										children: "Ateliér"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setMobileOpen(false),
										"aria-label": "Close",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "flex-1 overflow-y-auto p-3",
									children: [cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/category/$slug",
										params: { slug: c.slug },
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-accent",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											size: 16,
											className: "text-muted-foreground"
										})]
									}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/shop",
										onClick: () => setMobileOpen(false),
										className: "mt-2 flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-accent",
										children: ["Shop all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											size: 16,
											className: "text-muted-foreground"
										})]
									})]
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex shrink-0 items-baseline gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl leading-none sm:text-3xl",
							children: "Ateliér"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:inline",
							children: "/shop"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden min-w-0 flex-1 items-center gap-1 lg:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MegaMenu, { categories: cats }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground",
								children: "New"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { sort: "deals" },
								className: "rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground",
								children: "Deals"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wishlist",
								className: "relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent",
								"aria-label": "Wishlist",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 18,
									strokeWidth: 1.75
								}), wishItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-0.5 -top-0.5 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground",
									children: wishItems.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hidden h-10 w-10 place-items-center rounded-full hover:bg-accent sm:grid",
								"aria-label": "Account",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 18,
									strokeWidth: 1.75
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCartOpen(true),
								className: "relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent",
								"aria-label": "Cart",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
									size: 18,
									strokeWidth: 1.75
								}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-0.5 -top-0.5 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background",
									children: count
								})]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {
			open: cartOpen,
			onOpenChange: setCartOpen
		})
	] });
}
function MegaMenu({ categories }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(null);
	const enter = () => {
		if (timer.current) clearTimeout(timer.current);
		setOpen(true);
	};
	const leave = () => {
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(false), 120);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		onMouseEnter: enter,
		onMouseLeave: leave,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground",
			children: "Shop"
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-0 top-full z-50 w-[min(920px,90vw)] rounded-2xl border bg-popover p-6 shadow-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-4",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/category/$slug",
					params: { slug: c.slug },
					onClick: () => setOpen(false),
					className: "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition hover:shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/10] overflow-hidden bg-muted",
						children: [
							c.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image_url,
								alt: c.name,
								className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-3 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: c.name
								}), c.tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] opacity-80",
									children: c.tagline
								})]
							})
						]
					})
				}, c.id))
			})
		})]
	});
}
function SearchBar() {
	const [q, setQ] = (0, import_react.useState)("");
	const [focused, setFocused] = (0, import_react.useState)(false);
	const [debounced, setDebounced] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebounced(q), 220);
		return () => clearTimeout(t);
	}, [q]);
	(0, import_react.useEffect)(() => {
		const onDoc = (e) => {
			if (!ref.current?.contains(e.target)) setFocused(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	const { data: results = [] } = useQuery({
		...searchQuery(debounced),
		staleTime: 15e3
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative ml-auto hidden min-w-0 max-w-md flex-1 md:block lg:ml-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				if (q.trim()) navigate({
					to: "/search",
					search: { q: q.trim() }
				});
			},
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				size: 16,
				className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				onFocus: () => setFocused(true),
				placeholder: "Search products, brands...",
				className: "h-11 w-full rounded-full border border-input bg-secondary/50 pl-10 pr-4 text-sm outline-none transition focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20"
			})]
		}), focused && q.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 top-full z-50 mt-2 max-h-[420px] overflow-y-auto rounded-2xl border bg-popover shadow-xl",
			children: results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 text-sm text-muted-foreground",
				children: [
					"No matches for \"",
					q,
					"\""
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "p-2",
				children: results.slice(0, 8).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/$slug",
					params: { slug: r.slug },
					onClick: () => setFocused(false),
					className: "flex items-center gap-3 rounded-xl p-2 hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: r.images?.[0],
							alt: "",
							className: "h-12 w-12 rounded-lg object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: r.brand
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm",
								children: r.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold",
							children: ["$", Number(r.price).toFixed(0)]
						})
					]
				}) }, r.id))
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t bg-secondary/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl",
								children: "Ateliér"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xs text-sm text-muted-foreground",
								children: "A curated shop for well-made things. Fast delivery, free returns, no fuss."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										"aria-label": "Instagram",
										className: "grid h-9 w-9 place-items-center rounded-full border hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										"aria-label": "Twitter",
										className: "grid h-9 w-9 place-items-center rounded-full border hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										"aria-label": "YouTube",
										className: "grid h-9 w-9 place-items-center rounded-full border hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { size: 16 })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
						title: "Shop",
						links: [
							{
								label: "New arrivals",
								to: "/shop"
							},
							{
								label: "Best sellers",
								to: "/shop"
							},
							{
								label: "Deals",
								to: "/shop"
							},
							{
								label: "Gift cards",
								to: "/shop"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
						title: "Support",
						links: [
							{
								label: "Contact us",
								to: "/"
							},
							{
								label: "Shipping",
								to: "/"
							},
							{
								label: "Returns",
								to: "/"
							},
							{
								label: "FAQ",
								to: "/"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold",
							children: "Get 10% off your first order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Join the newsletter for drops, deals and design stories."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => e.preventDefault(),
							className: "mt-4 flex gap-2 rounded-full border bg-background p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "you@domain.com",
								className: "min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-full bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90",
								children: "Join"
							})]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Ateliér. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { children: "Privacy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { children: "Terms" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { children: "Cookies" })
					]
				})]
			})]
		})
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
		className: "text-sm font-semibold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 space-y-2 text-sm text-muted-foreground",
		children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: l.to,
			className: "transition hover:text-foreground",
			children: l.label
		}) }, l.label))
	})] });
}
var styles_default = "/assets/styles-DPnN8bRj.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-8xl text-brand",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90",
					children: "Back to shop"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "We couldn't load this page. Try again in a moment."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-full border px-5 py-2.5 text-sm font-semibold hover:bg-accent",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Ateliér — Well-made things, thoughtfully curated" },
			{
				name: "description",
				content: "Shop premium sneakers, audio, watches, bags, cameras and apparel. Free shipping over $100 · 30-day returns."
			},
			{
				property: "og:title",
				content: "Ateliér — Well-made things, thoughtfully curated"
			},
			{
				property: "og:description",
				content: "Shop premium sneakers, audio, watches, bags, cameras and apparel. Free shipping over $100 · 30-day returns."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true,
			closeButton: true
		})]
	});
}
var $$splitComponentImporter$2 = () => import("./wishlist-BbOsxibm.mjs");
var Route$2 = createFileRoute("/wishlist")({
	head: () => ({ meta: [
		{ title: "Your wishlist — Ateliér" },
		{
			name: "description",
			content: "Items you love, saved for later."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./cart-DNXp-8g0.mjs");
var Route$1 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Your bag — Ateliér" },
		{
			name: "description",
			content: "Review your items and check out."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-CamVaeRI.mjs");
var Route = createFileRoute("/")({
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(categoriesQuery());
		context.queryClient.ensureQueryData(productsQuery({
			flashSale: true,
			limit: 8
		}));
		context.queryClient.ensureQueryData(productsQuery({
			featured: true,
			limit: 8
		}));
		context.queryClient.ensureQueryData(productsQuery({
			isNew: true,
			limit: 8
		}));
		context.queryClient.ensureQueryData(productsQuery({
			bestSeller: true,
			limit: 8
		}));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var WishlistRoute = Route$2.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$3
});
var ShopRoute = Route$1$1.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$3
});
var SearchRoute = Route$6.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$3
});
var CartRoute = Route$1.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$3
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$3
});
var ProductSlugRoute = Route$5.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute,
	CartRoute,
	SearchRoute,
	ShopRoute,
	WishlistRoute,
	CategorySlugRoute: Route$4.update({
		id: "/category/$slug",
		path: "/category/$slug",
		getParentRoute: () => Route$3
	}),
	ProductSlugRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
