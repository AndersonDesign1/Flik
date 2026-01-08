"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What kind of products can I sell?",
    answer:
      "You can sell any digital product including ebooks, courses, templates, software, music, art, and more. We also support memberships and subscriptions.",
  },
  {
    question: "How long does it take to get paid?",
    answer:
      "With our instant payouts feature, you can receive your earnings within 24 hours. Standard payouts are processed within 3-5 business days.",
  },
  {
    question: "Do you offer custom packages?",
    answer:
      "Yes! For high-volume sellers or specific requirements, we offer custom enterprise plans. Contact our sales team to discuss your needs.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "You set your own refund policy for your products. We handle the refund process automatically based on your settings.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! Pro and Business plans include custom domain support. You can connect your domain and create a fully branded storefront.",
  },
];

export function FAQ() {
  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <span className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm">
            FAQ
          </span>
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about selling with Flik.
          </p>
        </div>

        <Accordion
          className="flex flex-col gap-3"
          collapsible
          defaultValue="item-0"
          type="single"
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              className="overflow-hidden rounded-xl border border-border bg-card px-5"
              key={item.question}
              value={`item-${index}`}
            >
              <AccordionTrigger className="py-5 font-medium text-base text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
