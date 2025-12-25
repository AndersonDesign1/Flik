import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Back Nav */}
      <div className="mb-8">
        <Link
          className="inline-flex items-center text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to store
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* Left Column: Media Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted">
            {/* Main Image */}
            <Image
              alt={product.title}
              className="h-full w-full object-cover"
              fill
              src={product.image}
            />
          </div>
          {/* Gallery Mocks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video w-full rounded-xl border border-border/30 bg-muted/50" />
            <div className="aspect-video w-full rounded-xl border border-border/30 bg-muted/50" />
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none pt-8">
            <h3>About this asset</h3>
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="relative">
          <div className="sticky top-24 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="rounded-full" variant="secondary">
                  {product.category}
                </Badge>
              </div>
              <h1 className="font-bold text-4xl text-foreground tracking-tight">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-3xl">${product.price}</span>
                <span className="text-muted-foreground text-sm">
                  USD / One-time
                </span>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-card/30 p-6 backdrop-blur-sm">
              <Button className="h-12 w-full text-base" size="lg">
                Buy Now
              </Button>
              <p className="flex items-center justify-center gap-1 text-center text-muted-foreground text-xs">
                <ShieldCheck className="h-3 w-3" /> Secure checkout powered by
                Stripe
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Check className="h-4 w-4 text-primary" /> Instant Download
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Check className="h-4 w-4 text-primary" /> Lifetime Updates
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Check className="h-4 w-4 text-primary" /> Standard License
              </div>
            </div>

            <div className="border-border border-t pt-8">
              <Accordion className="w-full" collapsible type="single">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is included?</AccordionTrigger>
                  <AccordionContent>
                    You get all the source files in Figma, Sketch, and Adobe XD
                    formats, along with the exported assets.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I use this commercially?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, the Standard License allows for unlimited commercial
                    projects for yourself or clients.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
