import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-display text-3xl">Ateliér</span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              A curated shop for well-made things. Fast delivery, free returns, no fuss.
            </p>
            <div className="mt-5 flex gap-3">
              <a aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent">
                <Instagram size={16} />
              </a>
              <a aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent">
                <Twitter size={16} />
              </a>
              <a aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border hover:bg-accent">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          <FooterCol
            title="Shop"
            links={[
              { label: "New arrivals", to: "/shop" },
              { label: "Best sellers", to: "/shop" },
              { label: "Deals", to: "/shop" },
              { label: "Gift cards", to: "/shop" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: "Contact us", to: "/" },
              { label: "Shipping", to: "/" },
              { label: "Returns", to: "/" },
              { label: "FAQ", to: "/" },
            ]}
          />
          <div>
            <h4 className="text-sm font-semibold">Get 10% off your first order</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Join the newsletter for drops, deals and design stories.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2 rounded-full border bg-background p-1"
            >
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none"
              />
              <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Ateliér. All rights reserved.</div>
          <div className="flex gap-5">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
