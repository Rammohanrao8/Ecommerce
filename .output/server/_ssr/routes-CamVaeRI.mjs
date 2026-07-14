import { n as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ArrowRight, a as Truck, f as ShieldCheck, h as RefreshCw, l as Sparkles } from "../_libs/lucide-react.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as categoriesQuery, c as productsQuery, n as ProductCard, r as ProductCardSkeleton } from "./ProductCard-DU7wvuMF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CamVaeRI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					eyebrow: "Ends in 24h",
					title: "Flash sale",
					subtitle: "Limited pieces at their lowest of the season",
					href: "/shop",
					filter: {
						flashSale: true,
						limit: 8
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					eyebrow: "Editor's picks",
					title: "Trending now",
					subtitle: "What everyone's buying this week",
					href: "/shop",
					filter: {
						featured: true,
						limit: 8
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoBanner, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					eyebrow: "Just dropped",
					title: "New arrivals",
					subtitle: "Fresh from the makers",
					href: "/shop",
					filter: {
						isNew: true,
						limit: 8
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					eyebrow: "Loved by many",
					title: "Best sellers",
					subtitle: "Our most-shipped, most-reviewed",
					href: "/shop",
					filter: {
						bestSeller: true,
						limit: 8
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perks, {})
			]
		})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "hero-gradient relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24 md:pb-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 12,
							className: "text-brand"
						}), " Autumn edit is live"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl",
						children: [
							"Well-made",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"things, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-brand",
								children: "carefully"
							}),
							" chosen."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-base text-foreground/70",
						children: "A short list of the best sneakers, audio, watches and gear from the makers we trust. Free shipping over $100."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90",
							children: ["Shop the edit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								size: 16,
								className: "transition group-hover:translate-x-0.5"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/$slug",
							params: { slug: "sneakers" },
							className: "inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/50 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-background",
							children: "Browse sneakers"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1400&q=85",
						alt: "Featured sneaker",
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold uppercase tracking-widest opacity-80",
								children: "Featured"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-display text-2xl",
								children: "Air Runner Pulse"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm opacity-80",
								children: "$149 · Limited stock"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute -bottom-6 -left-6 hidden rotate-[-6deg] rounded-2xl border bg-background p-4 shadow-xl md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Rated by 12,400+ buyers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl text-brand",
						children: "4.9"
					})]
				})]
			})]
		})
	});
}
function MarqueeStrip() {
	const items = [
		"Free shipping over $100",
		"30-day returns",
		"Authenticity guarantee",
		"Carbon-neutral delivery",
		"24/7 support",
		"Members save 15%"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-y bg-foreground text-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-marquee inline-flex min-w-[200%] gap-12 whitespace-nowrap py-3 text-xs font-semibold uppercase tracking-widest",
			children: [...items, ...items].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-brand",
					children: "✦"
				}), t]
			}, i))
		})
	});
}
function CategoryGrid() {
	const { data } = useSuspenseQuery(categoriesQuery());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Shop by",
			title: "Categories"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
			children: data.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/category/$slug",
				params: { slug: c.slug },
				className: "group relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted transition hover:shadow-lg",
				children: [
					c.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.image_url,
						alt: c.name,
						loading: "lazy",
						className: "h-full w-full object-cover transition duration-500 group-hover:scale-110"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 p-4 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl leading-tight",
							children: c.name
						}), c.tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-[11px] opacity-80",
							children: c.tagline
						})]
					})
				]
			}, c.id))
		})]
	});
}
function Section({ eyebrow, title, subtitle, href, filter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow,
			title,
			subtitle,
			href
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionGrid, { filter })
		})]
	});
}
function SectionGrid({ filter }) {
	const { data } = useSuspenseQuery(productsQuery(filter));
	const list = data.slice(0, 8);
	if (list.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
		children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
	});
}
function GridSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
		children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
	});
}
function SectionHeader({ eyebrow, title, subtitle, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold uppercase tracking-widest text-brand",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl leading-tight sm:text-4xl",
				children: title
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			})
		] }), href && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: href,
			className: "hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground sm:inline-flex",
			children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
		})]
	});
}
function PromoBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-16 grid gap-4 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-3xl bg-foreground p-8 text-background sm:p-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase tracking-widest text-brand",
						children: "Member exclusive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-display text-4xl leading-tight",
						children: "15% off your first order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm opacity-80",
						children: "Sign up for the newsletter and get a code delivered instantly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90",
						children: "Join the club"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full brand-gradient opacity-40 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
					alt: "Autumn edit",
					className: "h-full min-h-64 w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-semibold uppercase tracking-widest opacity-80",
							children: "Editorial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 max-w-sm font-display text-4xl leading-tight",
							children: "The autumn edit is live"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90",
							children: ["Shop the story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
						})
					]
				})
			]
		})]
	});
}
function Perks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-20 grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4",
		children: [
			{
				icon: Truck,
				title: "Free shipping",
				copy: "On all orders over $100"
			},
			{
				icon: RefreshCw,
				title: "30-day returns",
				copy: "No questions asked"
			},
			{
				icon: ShieldCheck,
				title: "Authenticity",
				copy: "100% authentic, guaranteed"
			},
			{
				icon: Sparkles,
				title: "Curated",
				copy: "Hand-picked by our team"
			}
		].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
					size: 18,
					strokeWidth: 1.75
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: p.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: p.copy
			})] })]
		}, p.title))
	});
}
//#endregion
export { Home as component };
