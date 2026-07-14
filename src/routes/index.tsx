import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";
import { categoriesQuery, productsQuery } from "@/lib/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import type { Product, Category } from "@/lib/types";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(categoriesQuery());
    context.queryClient.ensureQueryData(productsQuery({ flashSale: true, limit: 8 }));
    context.queryClient.ensureQueryData(productsQuery({ featured: true, limit: 8 }));
    context.queryClient.ensureQueryData(productsQuery({ isNew: true, limit: 8 }));
    context.queryClient.ensureQueryData(productsQuery({ bestSeller: true, limit: 8 }));
  },
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <MarqueeStrip />
      <div className="mx-auto max-w-7xl px-4">
        <CategoryGrid />
        <Section
          eyebrow="Ends in 24h"
          title="Flash sale"
          subtitle="Limited pieces at their lowest of the season"
          href="/shop"
          filter={{ flashSale: true, limit: 8 }}
        />
        <Section
          eyebrow="Editor's picks"
          title="Trending now"
          subtitle="What everyone's buying this week"
          href="/shop"
          filter={{ featured: true, limit: 8 }}
        />
        <PromoBanner />
        <Section
          eyebrow="Just dropped"
          title="New arrivals"
          subtitle="Fresh from the makers"
          href="/shop"
          filter={{ isNew: true, limit: 8 }}
        />
        <Section
          eyebrow="Loved by many"
          title="Best sellers"
          subtitle="Our most-shipped, most-reviewed"
          href="/shop"
          filter={{ bestSeller: true, limit: 8 }}
        />
        <Perks />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24 md:pb-32">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
            <Sparkles size={12} className="text-brand" /> Autumn edit is live
          </div>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            Well-made
            <br />
            things, <em className="text-brand">carefully</em> chosen.
          </h1>
          <p className="mt-5 max-w-md text-base text-foreground/70">
            A short list of the best sneakers, audio, watches and gear from the makers we trust.
            Free shipping over $100.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Shop the edit
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/category/$slug"
              params={{ slug: "sneakers" }}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/50 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-background"
            >
              Browse sneakers
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1400&q=85"
              alt="Featured sneaker"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
                Featured
              </div>
              <div className="mt-1 font-display text-2xl">Air Runner Pulse</div>
              <div className="mt-1 text-sm opacity-80">$149 · Limited stock</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rotate-[-6deg] rounded-2xl border bg-background p-4 shadow-xl md:block">
            <div className="text-xs text-muted-foreground">Rated by 12,400+ buyers</div>
            <div className="mt-1 font-display text-3xl text-brand">4.9</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = [
    "Free shipping over $100",
    "30-day returns",
    "Authenticity guarantee",
    "Carbon-neutral delivery",
    "24/7 support",
    "Members save 15%",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y bg-foreground text-background">
      <div className="animate-marquee inline-flex min-w-[200%] gap-12 whitespace-nowrap py-3 text-xs font-semibold uppercase tracking-widest">
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-6">
            <span className="text-brand">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryGrid() {
  const { data } = useSuspenseQuery(categoriesQuery());
  return (
    <section className="pt-16">
      <SectionHeader eyebrow="Shop by" title="Categories" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {(data as Category[]).map((c) => (
          <Link
            key={c.id}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted transition hover:shadow-lg"
          >
            {c.image_url && (
              <img
                src={c.image_url}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="font-display text-xl leading-tight">{c.name}</div>
              {c.tagline && (
                <div className="mt-0.5 text-[11px] opacity-80">{c.tagline}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  href,
  filter,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href: string;
  filter: Parameters<typeof productsQuery>[0];
}) {
  return (
    <section className="pt-16">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} href={href} />
      <Suspense fallback={<GridSkeleton />}>
        <SectionGrid filter={filter} />
      </Suspense>
    </section>
  );
}

function SectionGrid({ filter }: { filter: Parameters<typeof productsQuery>[0] }) {
  const { data } = useSuspenseQuery(productsQuery(filter));
  const list = (data as Product[]).slice(0, 8);
  if (list.length === 0) return null;
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">
          {eyebrow}
        </div>
        <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {href && (
        <Link
          to={href}
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground sm:inline-flex"
        >
          View all <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

function PromoBanner() {
  return (
    <section className="mt-16 grid gap-4 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background sm:p-12">
        <div className="max-w-xs">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">
            Member exclusive
          </div>
          <h3 className="mt-3 font-display text-4xl leading-tight">15% off your first order</h3>
          <p className="mt-3 text-sm opacity-80">
            Sign up for the newsletter and get a code delivered instantly.
          </p>
          <button className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90">
            Join the club
          </button>
        </div>
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full brand-gradient opacity-40 blur-3xl" />
      </div>
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80"
          alt="Autumn edit"
          className="h-full min-h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-12">
          <div className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
            Editorial
          </div>
          <h3 className="mt-3 max-w-sm font-display text-4xl leading-tight">
            The autumn edit is live
          </h3>
          <Link
            to="/shop"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
          >
            Shop the story <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Perks() {
  const perks = [
    { icon: Truck, title: "Free shipping", copy: "On all orders over $100" },
    { icon: RefreshCw, title: "30-day returns", copy: "No questions asked" },
    { icon: ShieldCheck, title: "Authenticity", copy: "100% authentic, guaranteed" },
    { icon: Sparkles, title: "Curated", copy: "Hand-picked by our team" },
  ];
  return (
    <section className="mt-20 grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
      {perks.map((p) => (
        <div key={p.title} className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
            <p.icon size={18} strokeWidth={1.75} />
          </div>
          <div>
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-muted-foreground">{p.copy}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
