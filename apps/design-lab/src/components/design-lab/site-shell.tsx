import {
  ArrowRight01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

import { FlikIcon } from "@/components/design-lab/icon";
import { buttonVariants } from "@/components/ui/button";
import { navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-(--border-soft)/60 border-b bg-background/90 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <Link
          className="flex items-center gap-2.5 font-semibold text-[0.9rem] text-foreground tracking-[-0.02em]"
          href="/"
        >
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-[var(--accent)] text-white shadow-[0_1px_3px_rgba(121,89,255,0.3)]">
            <FlikIcon icon={ShoppingBag01Icon} size={16} />
          </span>
          Flik
        </Link>
        <nav className="hidden items-center gap-7 text-muted-foreground text-sm md:flex">
          {navItems.map((item) => (
            <Link
              className="transition-colors hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "hidden h-9 rounded-full border-(--border-soft) bg-white px-4 text-foreground shadow-none sm:inline-flex"
            )}
            href="/discover"
          >
            Browse
          </Link>
          <Link
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-9 rounded-full bg-[var(--accent)] px-4 text-white hover:bg-[color:color-mix(in_oklab,var(--accent)_88%,black)]"
            )}
            href="/store/studio-neon"
          >
            Launch preview
            <FlikIcon icon={ArrowRight01Icon} size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="dark-band mt-24 border-white/10 border-t pt-16 pb-12 text-white">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <span className="eyebrow border-white/15 bg-white/8 text-white/72">
            Flik future commerce
          </span>
          <h2 className="max-w-xl text-balance font-[family:var(--font-display)] font-semibold text-4xl tracking-[-0.05em] md:text-5xl">
            Build a storefront that looks premium before you touch a single
            domain setting.
          </h2>
          <p className="max-w-xl text-base text-white/68 leading-7">
            Design-lab is where we pressure-test the public experience first:
            sharper hierarchy, stronger trust, cleaner merchandising, and a
            visual system we can migrate into the main app with confidence.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <FooterList
            items={[
              { href: "/", label: "Landing" },
              { href: "/discover", label: "Marketplace" },
              { href: "/store/studio-neon", label: "Storefront" },
              { href: "/product/notion-brand-kit", label: "Product detail" },
            ]}
            title="Explore"
          />
          <FooterList
            items={[
              { href: "#", label: "Editorial structure" },
              { href: "#", label: "Controlled purple accents" },
              { href: "#", label: "Trust-led conversion" },
              { href: "#", label: "Migration-first system" },
            ]}
            title="Design principles"
          />
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="mb-4 font-medium text-sm text-white/92">{title}</p>
      <ul className="space-y-3 text-sm text-white/62">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              className="transition-colors hover:text-white"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
