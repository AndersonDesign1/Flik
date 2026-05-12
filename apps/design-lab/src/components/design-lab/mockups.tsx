import {
  CheckmarkBadge03Icon,
  MagicWand01Icon,
  Package01Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons";

import { FlikIcon } from "@/components/design-lab/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HeroCommerceMockup() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-2xl border border-(--border-strong) bg-white shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-(--border-soft) border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="size-2 rounded-full bg-foreground/12" />
            <span className="size-2 rounded-full bg-foreground/10" />
          </div>
          <div className="text-muted-foreground text-sm">
            Studio Neon preview
          </div>
        </div>
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="border-(--border-soft) border-b bg-[var(--panel-strong)] px-4 py-4 lg:border-r lg:border-b-0">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--ink)] text-white">
                <FlikIcon icon={ShoppingCart01Icon} size={16} />
              </span>
              <div>
                <p className="font-medium text-foreground">Studio Neon</p>
                <p className="text-muted-foreground text-sm">Storefront</p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              {["Overview", "Products", "Services", "Bundles", "Checkout"].map(
                (item, index) => (
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      index === 1
                        ? "bg-white font-medium text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                        : "text-muted-foreground"
                    }`}
                    key={item}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="mt-6 rounded-xl border border-(--border-soft) bg-white p-3">
              <p className="text-muted-foreground text-sm">Best for</p>
              <p className="mt-1 font-medium text-foreground text-sm leading-6">
                Creators selling templates, retainers, and limited bundles from
                one store.
              </p>
            </div>
          </aside>
          <div className="bg-white p-4 md:p-5">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-4">
                <div className="rounded-xl border border-(--border-soft) bg-[var(--panel)] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-lg">
                      <h3 className="font-[family:var(--font-display)] font-semibold text-3xl tracking-[-0.05em]">
                        Brand systems and launch assets for creators who sell
                        clearly.
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm leading-6">
                        Products and service offers sit in one place with
                        cleaner framing, direct pricing, and stronger proof.
                      </p>
                    </div>
                    <div className="rounded-lg border border-[color:rgba(121,89,255,0.18)] bg-white px-3 py-2 text-[var(--accent)] text-sm">
                      Live draft
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ["Notion Brand System", "$129"],
                    ["Launch Architecture", "$480"],
                    ["Creator Bundle", "$249"],
                  ].map(([label, value], index) => (
                    <div
                      className="rounded-xl border border-(--border-soft) bg-white p-3"
                      key={label}
                    >
                      <div
                        className={`aspect-[1.16] rounded-lg border border-(--border-soft) ${
                          index === 0
                            ? "bg-[var(--accent-soft)]"
                            : "bg-[var(--panel)]"
                        }`}
                      />
                      <p className="mt-3 font-medium text-foreground text-sm">
                        {label}
                      </p>
                      <p className="mt-1 text-muted-foreground text-sm">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-(--border-soft) bg-white p-4">
                  <div className="flex items-center justify-between border-(--border-soft) border-b pb-3">
                    <div>
                      <p className="font-medium text-foreground">
                        Store reasons to trust
                      </p>
                      <p className="text-muted-foreground text-sm">
                        The details buyers should understand quickly.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      "Clear offer structure",
                      "Direct pricing and next steps",
                      "Proof without extra noise",
                    ].map((item) => (
                      <div
                        className="rounded-lg bg-[var(--panel)] px-3 py-3 text-foreground text-sm"
                        key={item}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-(--border-soft) bg-[var(--panel)] p-4">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <FlikIcon icon={ShoppingCart01Icon} size={16} />
                    Checkout summary
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Notion Brand System", "$129"],
                      ["Creator bonus pack", "$29"],
                    ].map(([label, value]) => (
                      <div
                        className="flex items-center justify-between rounded-lg border border-(--border-soft) bg-white px-3 py-2.5"
                        key={label}
                      >
                        <span className="text-foreground text-sm">{label}</span>
                        <span className="font-medium text-foreground text-sm">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-(--border-soft) border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium text-foreground">$158</span>
                    </div>
                    <div className="mt-3 rounded-lg bg-[var(--ink)] px-4 py-2.5 text-center font-medium text-sm text-white">
                      Complete purchase
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-(--border-soft) bg-white p-4">
                  <p className="font-medium text-foreground text-sm">
                    Store setup
                  </p>
                  <div className="mt-3 space-y-2">
                    {[
                      "Products and services in one catalog",
                      "Cleaner CTA flow across product pages",
                      "Checkout details buyers can verify quickly",
                    ].map((item) => (
                      <div className="flex items-start gap-2" key={item}>
                        <FlikIcon
                          className="mt-0.5 text-[var(--accent)]"
                          icon={CheckmarkBadge03Icon}
                          size={16}
                        />
                        <p className="text-foreground text-sm leading-6">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketplaceShowcase() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="border-(--border-soft) bg-white/92 py-0 shadow-[var(--shadow-soft)]">
        <CardHeader className="border-(--border-soft) border-b py-4">
          <CardTitle className="font-[family:var(--font-display)] text-xl tracking-[-0.03em]">
            Discovery that feels curated
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-5">
          {[
            "Trending creator kits",
            "Fast-growing service offers",
            "High-retention memberships",
          ].map((item) => (
            <div
              className="rounded-2xl border border-(--border-soft) bg-[var(--panel)] px-4 py-3"
              key={item}
            >
              <p className="font-medium text-foreground">{item}</p>
              <p className="mt-1 text-muted-foreground text-sm leading-6">
                Rich proof, clean pricing, and clearer buyer intent signals.
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="soft-grid overflow-hidden rounded-[30px] border border-(--border-soft) bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Store quality", "94%"],
            ["Verified proof", "1.2k"],
            ["Repeat buyers", "38%"],
          ].map(([label, value]) => (
            <div
              className="rounded-[24px] border border-(--border-soft) bg-[var(--panel)] p-4"
              key={label}
            >
              <p className="text-muted-foreground text-sm">{label}</p>
              <p className="mt-6 font-[family:var(--font-display)] font-semibold text-4xl text-foreground tracking-[-0.05em]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductSpotlightMockup() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="soft-grid relative overflow-hidden rounded-[30px] border border-(--border-soft) bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="absolute top-6 right-6 rounded-full border border-[color:rgba(121,89,255,0.18)] bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)] text-xs">
          Product page
        </div>
        <div className="grid gap-4 md:grid-cols-[0.84fr_1.16fr]">
          <div className="rounded-[24px] bg-[var(--accent-soft)] p-4">
            <div className="h-full min-h-72 rounded-[20px] border border-white/70 bg-white p-4" />
          </div>
          <div className="flex flex-col justify-between gap-5 py-2">
            <div className="space-y-3">
              <p className="eyebrow">Creator commerce</p>
              <h3 className="text-balance font-[family:var(--font-display)] font-semibold text-4xl tracking-[-0.05em]">
                Trust-forward product framing with calmer checkout momentum.
              </h3>
              <p className="max-w-xl text-base text-muted-foreground leading-7">
                Rich previews, better proof, structured value breakdowns, and
                CTA hierarchy that feels decisive without being loud.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Included assets", "4 templates + launch pack"],
                ["Best for", "Creators selling polished digital systems"],
              ].map(([label, value]) => (
                <div
                  className="rounded-2xl border border-(--border-soft) bg-[var(--panel)] p-4"
                  key={label}
                >
                  <p className="text-muted-foreground text-sm">{label}</p>
                  <p className="mt-2 font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <Card className="border-(--border-soft) bg-white/92 py-0 shadow-[var(--shadow-soft)]">
          <CardHeader className="border-(--border-soft) border-b py-4">
            <CardTitle className="flex items-center gap-2">
              <FlikIcon icon={Package01Icon} />
              What buyers should see quickly
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-5">
            {[
              "What the product is",
              "Who it is for",
              "Why this creator is credible",
              "What happens after purchase",
            ].map((item) => (
              <div
                className="flex items-center gap-3 rounded-2xl bg-[var(--panel)] px-4 py-3"
                key={item}
              >
                <FlikIcon
                  className="text-[var(--accent)]"
                  icon={CheckmarkBadge03Icon}
                />
                <span className="text-foreground text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-(--border-soft) bg-[var(--ink)] py-0 text-white shadow-[var(--shadow-card)]">
          <CardHeader className="border-white/10 border-b py-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <FlikIcon
                className="text-[var(--accent-2)]"
                icon={MagicWand01Icon}
              />
              Later migration path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 py-5 text-sm text-white/68 leading-6">
            <p>Typography and tokens migrate first.</p>
            <p>Then public shell, storefront sections, and trust components.</p>
            <p>
              Dashboard redesign follows only after the public surface feels
              locked.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
