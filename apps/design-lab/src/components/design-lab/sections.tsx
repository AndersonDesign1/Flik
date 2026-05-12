import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  CheckmarkBadge03Icon,
  ShoppingCart01Icon,
  Package01Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";

import { FlikIcon } from "@/components/design-lab/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HeroCommerceMockup,
  MarketplaceShowcase,
  ProductSpotlightMockup,
} from "@/components/design-lab/mockups";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  featureStories,
  logoCloud,
  marketplaceCollections,
  products,
  statsBand,
  storefrontHighlights,
  storeProfile,
  testimonials,
  heroMetrics,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden dot-bg pb-12 pt-8 md:pt-16">
      {/* Background gradient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-180px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,89,255,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="page-shell relative">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[color:rgba(121,89,255,0.2)] bg-white/60 backdrop-blur-md px-3.5 py-1.5 text-sm shadow-[var(--shadow-soft)] transition-all hover:bg-white hover:shadow-[var(--shadow-lift)]">
            <span className="font-medium text-foreground/80">Trusted by fast-growing creators worldwide</span>
            <Link href="/success-stories" className="font-medium text-[var(--accent)] transition-colors hover:text-[color:color-mix(in_oklab,var(--accent)_80%,black)]">
              Learn more
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl text-center">
          <h1 className="text-balance font-[family:var(--font-display)] font-semibold text-[clamp(2.5rem,5.5vw,4.5rem)] text-foreground leading-[0.95] tracking-[-0.05em]">
            <span className="block">Sell from a storefront that</span>
            <span className="block gradient-text">already feels established.</span>
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[clamp(1rem,1.5vw,1.15rem)] text-muted-foreground leading-[1.7]">
          Flik helps creators publish storefronts with cleaner merchandising,
          stronger trust cues, and a checkout flow that feels ready on day one.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            className={cn(
              buttonVariants({ size: "lg" }),
              "group h-12 gap-2 rounded-full bg-[var(--ink)] px-8 font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:scale-[1.01] hover:bg-[color:color-mix(in_oklab,var(--ink)_92%,white)]"
            )}
            href="/store/studio-neon"
          >
            Start for free
            <FlikIcon
              className="text-white/70 transition-transform group-hover:translate-x-1"
              icon={ArrowRight01Icon}
              size={16}
            />
          </Link>
        </div>

        <Tabs defaultValue="storefronts" className="mt-12 sm:mt-14 relative z-20 mx-auto w-full max-w-6xl px-4 flex flex-col items-center">
          {/* Purple glow behind the screenshot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 rounded-[44px] bg-[radial-gradient(ellipse_at_center,rgba(121,89,255,0.15)_0%,transparent_60%)]"
          />

          {/* Floating TabsList */}
          <TabsList className="relative z-30 mb-8 inline-flex h-11 w-fit items-center justify-center gap-1 rounded-full border border-(--border-soft) bg-white/70 p-1 shadow-sm backdrop-blur-md">
            <TabsTrigger 
              value="storefronts" 
              className="flex-none rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 data-active:!bg-[var(--accent)] data-active:!text-white data-[active]:!bg-[var(--accent)] data-[active]:!text-white data-[state=active]:!bg-[var(--accent)] data-[state=active]:!text-white text-muted-foreground hover:text-foreground data-active:hover:text-white"
            >
              <FlikIcon icon={ShoppingCart01Icon} size={15} className="mr-1.5 opacity-90" />
              Storefronts
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="flex-none rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 data-active:!bg-[var(--accent)] data-active:!text-white data-[active]:!bg-[var(--accent)] data-[active]:!text-white data-[state=active]:!bg-[var(--accent)] data-[state=active]:!text-white text-muted-foreground hover:text-foreground data-active:hover:text-white"
            >
              <FlikIcon icon={Package01Icon} size={15} className="mr-1.5 opacity-90" />
              Product Pages
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex-none rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 data-active:!bg-[var(--accent)] data-active:!text-white data-[active]:!bg-[var(--accent)] data-[active]:!text-white data-[state=active]:!bg-[var(--accent)] data-[state=active]:!text-white text-muted-foreground hover:text-foreground data-active:hover:text-white"
            >
              <FlikIcon icon={ArrowUpRight01Icon} size={15} className="mr-1.5 opacity-90" />
              Creator Analytics
            </TabsTrigger>
          </TabsList>

          {/* The Mockup Contents */}
          <div className="relative overflow-hidden w-full rounded-2xl border border-(--border-strong) bg-white shadow-[0_30px_80px_-12px_rgba(43,32,89,0.2),0_0_0_1px_rgba(0,0,0,0.03)] transition-transform duration-700 ease-out hover:scale-[1.01] hover:shadow-[0_40px_100px_-12px_rgba(121,89,255,0.25)]">
            <div className="bg-white relative w-full">
              <TabsContent value="storefronts" className="m-0 outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 duration-500">
                <Image
                  alt="Flik creator storefront dashboard view"
                  className="w-full"
                  height={900}
                  src="/hero-mockup.png"
                  width={1600}
                  priority
                />
              </TabsContent>

              <TabsContent value="products" className="m-0 outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 duration-500">
                <HeroMockupPlaceholder 
                  icon={Package01Icon} 
                  title="Product Details View" 
                  description="Showcase your templates, assets, and service plans directly in your storefront." 
                />
              </TabsContent>

              <TabsContent value="analytics" className="m-0 outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 duration-500">
                <HeroMockupPlaceholder 
                  icon={ArrowUpRight01Icon} 
                  title="Performance Analytics" 
                  description="Monitor your traffic, sales attribution, and recurring revenue growth in real-time." 
                />
              </TabsContent>
            </div>
            
            {/* Bottom fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent z-20"
            />
          </div>
        </Tabs>
      </div>
    </section>
  );
}

function HeroMockupPlaceholder({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="relative flex aspect-[1600/900] w-full flex-col items-center justify-center bg-white/95 backdrop-blur-sm px-4">
      <div className="text-center space-y-4">
        <div className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-[var(--accent-soft)] p-0 shadow-[var(--shadow-soft)] ring-1 ring-[color:rgba(121,89,255,0.15)] text-[var(--accent)]">
          <FlikIcon icon={icon} size={28} />
        </div>
        <p className="font-[family:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-foreground">
          {title}
        </p>
        <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function LogoCloudSection() {
  return (
    <section className="page-shell pt-16">
      <div className="rounded-[28px] border border-(--border-soft) bg-white px-6 py-5 shadow-[var(--shadow-soft)]">
        <p className="text-center font-medium text-muted-foreground text-xs uppercase tracking-[0.26em]">
          Design references translated into creator-commerce trust patterns
        </p>
        <div className="mt-5 grid grid-cols-2 gap-6 text-center font-medium text-foreground/68 text-sm sm:grid-cols-3 lg:grid-cols-6">
          {logoCloud.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureStorySection() {
  return (
    <section className="page-shell pt-20">
      <div className="grid gap-5 lg:grid-cols-3">
        {featureStories.map((story, index) => (
          <Card
            className={cn(
              "border-(--border-soft) py-0 shadow-[var(--shadow-soft)]",
              index === 2 &&
                "bg-[linear-gradient(160deg,#14111b,#251f35)] text-white ring-white/10"
            )}
            key={story.title}
          >
            <CardHeader
              className={cn(
                "border-(--border-soft) border-b py-5",
                index === 2 && "border-white/10"
              )}
            >
              <p
                className={cn(
                  "eyebrow w-fit",
                  index === 2 && "border-white/15 bg-white/8 text-white/70"
                )}
              >
                {story.eyebrow}
              </p>
              <CardTitle
                className={cn(
                  "text-balance font-[family:var(--font-display)] font-semibold text-3xl tracking-[-0.05em]",
                  index === 2 && "text-white"
                )}
              >
                {story.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 py-5">
              <p
                className={cn(
                  "text-base text-muted-foreground leading-7",
                  index === 2 && "text-white/68"
                )}
              >
                {story.copy}
              </p>
              <div className="space-y-3">
                {story.bullets.map((bullet) => (
                  <div className="flex items-start gap-3" key={bullet}>
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]",
                        index === 2 && "bg-white/10 text-white"
                      )}
                    >
                      <FlikIcon icon={CheckmarkBadge03Icon} size={14} />
                    </span>
                    <p
                      className={cn(
                        "text-foreground/84 text-sm leading-6",
                        index === 2 && "text-white/72"
                      )}
                    >
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function StatsBandSection() {
  return (
    <section className="page-shell pt-20">
      <div className="soft-grid overflow-hidden rounded-[32px] border border-(--border-soft) bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Signals that matter</p>
            <h2 className="section-title max-w-lg">
              Better structure should improve trust, discoverability, and
              conversion.
            </h2>
          </div>
          <p className="section-copy max-w-2xl">
            This redesign isn’t about decoration. It’s about making public
            surfaces feel sharper, calmer, and more credible so the product can
            move faster afterward.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {statsBand.map((stat) => (
            <div
              className="rounded-[24px] border border-(--border-soft) bg-[var(--panel)] p-5"
              key={stat.label}
            >
              <p className="font-[family:var(--font-display)] font-semibold text-5xl text-foreground tracking-[-0.06em]">
                {stat.value}
              </p>
              <p className="mt-4 max-w-xs text-muted-foreground text-sm leading-6">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section className="page-shell pt-20">
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-4">
          <p className="eyebrow">Creator proof</p>
          <h2 className="section-title max-w-md">
            Trust should come from product depth, not hype language.
          </h2>
          <p className="section-copy max-w-md">
            The references all do this well in different ways. Flik should do it
            with creator commerce surfaces, stronger proof, and cleaner
            information chunking.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              className="border-(--border-soft) py-0 shadow-[var(--shadow-soft)]"
              key={testimonial.name}
            >
              <CardContent className="flex h-full flex-col justify-between gap-8 py-5">
                <p className="text-base text-foreground/82 leading-7">
                  “{testimonial.quote}”
                </p>
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="page-shell pt-20">
      <div className="dark-band overflow-hidden rounded-[36px] border border-white/10 px-6 py-10 shadow-[var(--shadow-card)] md:px-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow border-white/15 bg-white/8 text-white/70">
              Next migration slice
            </p>
            <h2 className="mt-5 text-balance font-[family:var(--font-display)] font-semibold text-4xl text-white tracking-[-0.06em] md:text-5xl">
              Approve the public system here, then move it back into the main
              app with less churn.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-base text-white/68 leading-7">
              We’ll migrate typography, tokens, shared public shell, storefront
              sections, and product detail patterns first. Dashboard redesign
              comes after the public experience feels locked.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-[var(--accent)] px-5 text-white hover:bg-[color:color-mix(in_oklab,var(--accent)_88%,black)]"
                )}
                href="/product/notion-brand-kit"
              >
                Open product page
                <FlikIcon icon={ArrowUpRight01Icon} />
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/12 bg-white/6 px-5 text-white hover:bg-white/10"
                )}
                href="/discover"
              >
                View marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DiscoverHero() {
  return (
    <section className="page-shell pt-14">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <p className="eyebrow">Marketplace discovery</p>
          <h1 className="section-title max-w-md text-5xl md:text-6xl">
            Browse stores, products, and offers that already look trustworthy.
          </h1>
          <p className="section-copy mt-5 max-w-md">
            Flik discovery should feel more curated than noisy: better
            collections, cleaner product framing, and stronger reasons to keep
            exploring.
          </p>
        </div>
        <MarketplaceShowcase />
      </div>
    </section>
  );
}

export function CollectionGrid() {
  return (
    <section className="page-shell pt-18">
      <div className="grid gap-4 md:grid-cols-3">
        {marketplaceCollections.map((collection) => (
          <Card
            className="border-(--border-soft) py-0 shadow-[var(--shadow-soft)]"
            key={collection.title}
          >
            <CardHeader className="border-(--border-soft) border-b py-5">
              <CardTitle className="font-[family:var(--font-display)] text-2xl tracking-[-0.04em]">
                {collection.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 py-5">
              <p className="text-muted-foreground text-sm leading-7">
                {collection.copy}
              </p>
              <Link
                className="inline-flex items-center gap-2 font-medium text-foreground text-sm"
                href="/product/notion-brand-kit"
              >
                View collection
                <FlikIcon icon={ArrowRight01Icon} />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ProductGridSection() {
  return (
    <section className="page-shell pt-18">
      <div className="grid gap-4 lg:grid-cols-3">
        {products.map((product, index) => (
          <Link href={`/product/${product.slug}`} key={product.slug}>
            <Card className="h-full border-(--border-soft) py-0 shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-1">
              <CardContent className="space-y-5 py-5">
                <div
                  className={cn(
                    "aspect-[1.18] rounded-[26px]",
                    index === 0 && "bg-[var(--accent-soft)]",
                    index === 1 && "bg-[color:rgba(121,89,255,0.14)]",
                    index === 2 && "bg-[color:rgba(121,89,255,0.1)]"
                  )}
                />
                <div className="space-y-3">
                  <Badge
                    className="border-(--border-soft) bg-[var(--panel)] text-muted-foreground"
                    variant="outline"
                  >
                    {product.category}
                  </Badge>
                  <h3 className="font-[family:var(--font-display)] font-semibold text-2xl text-foreground tracking-[-0.04em]">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-7">
                    {product.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between border-(--border-soft) border-t pt-4">
                  <span className="font-medium text-foreground text-sm">
                    {product.price}
                  </span>
                  <span className="inline-flex items-center gap-2 font-medium text-foreground text-sm">
                    Open
                    <FlikIcon icon={ArrowUpRight01Icon} />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function StorefrontHero() {
  return (
    <section className="page-shell pt-14">
      <div className="soft-grid overflow-hidden rounded-[36px] border border-(--border-soft) bg-white px-6 py-8 shadow-[var(--shadow-card)] md:px-8 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div className="space-y-5">
            <p className="eyebrow">Storefront prototype</p>
            <h1 className="text-balance font-[family:var(--font-display)] font-semibold text-5xl tracking-[-0.06em] md:text-6xl">
              {storeProfile.name}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground leading-8">
              {storeProfile.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {storeProfile.stats.map((stat) => (
                <div
                  className="rounded-2xl border border-(--border-soft) bg-[var(--panel)] px-4 py-4"
                  key={stat.label}
                >
                  <p className="font-[family:var(--font-display)] font-semibold text-3xl text-foreground tracking-[-0.05em]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <HeroCommerceMockup />
        </div>
      </div>
    </section>
  );
}

export function StorefrontSections() {
  return (
    <section className="page-shell pt-18">
      <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <Card className="border-(--border-soft) py-0 shadow-[var(--shadow-soft)]">
          <CardHeader className="border-(--border-soft) border-b py-5">
            <CardTitle className="font-[family:var(--font-display)] text-3xl tracking-[-0.05em]">
              Section structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-5">
            {storefrontHighlights.map((item) => (
              <div
                className="flex items-start gap-3 rounded-2xl bg-[var(--panel)] px-4 py-3"
                key={item}
              >
                <FlikIcon
                  className="mt-0.5 text-[var(--accent)]"
                  icon={CheckmarkBadge03Icon}
                />
                <p className="text-foreground/84 text-sm leading-6">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <ProductGridSection />
      </div>
    </section>
  );
}

export function ProductHero({
  eyebrow,
  title,
  description,
  price,
  includes,
}: {
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  includes: string[];
}) {
  return (
    <section className="page-shell pt-14">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="soft-grid rounded-[34px] border border-(--border-soft) bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="rounded-[30px] bg-[linear-gradient(135deg,rgba(121,89,255,0.24),rgba(255,255,255,0.82))] p-4">
            <div className="h-full min-h-[28rem] rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,242,255,0.76))] p-5" />
          </div>
        </div>
        <div className="space-y-6">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="text-balance font-[family:var(--font-display)] font-semibold text-5xl tracking-[-0.06em] md:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-8">
            {description}
          </p>
          <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-(--border-soft) py-0 shadow-[var(--shadow-soft)]">
              <CardContent className="space-y-4 py-5">
                <p className="text-muted-foreground text-sm">Price</p>
                <p className="font-[family:var(--font-display)] font-semibold text-5xl text-foreground tracking-[-0.06em]">
                  {price}
                </p>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full rounded-full bg-[var(--accent)] text-white hover:bg-[color:color-mix(in_oklab,var(--accent)_88%,black)]"
                  )}
                  href="#"
                >
                  Buy now
                  <FlikIcon icon={ArrowRight01Icon} />
                </Link>
              </CardContent>
            </Card>
            <Card className="border-(--border-soft) py-0 shadow-[var(--shadow-soft)]">
              <CardHeader className="border-(--border-soft) border-b py-5">
                <CardTitle className="text-lg">What’s included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 py-5">
                {includes.map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <FlikIcon
                      className="mt-0.5 text-[var(--accent)]"
                      icon={CheckmarkBadge03Icon}
                    />
                    <p className="text-foreground/84 text-sm leading-6">
                      {item}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductSupportSection() {
  return (
    <section className="page-shell pt-18">
      <ProductSpotlightMockup />
    </section>
  );
}
