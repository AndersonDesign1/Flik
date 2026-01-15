"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  createStaggerContainer,
  ENTRANCE_VARIANTS,
  STAGGERS,
} from "@/lib/design-system";

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
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: accordionRef, isInView: accordionInView } = useScrollReveal({
    threshold: 0.1,
  });

  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
        {/* Header */}
        <motion.div
          animate={headerInView ? "visible" : "hidden"}
          className="flex w-full flex-col items-center gap-4 text-center"
          initial="hidden"
          ref={headerRef}
          variants={createStaggerContainer(STAGGERS.section, 0)}
        >
          <motion.span
            className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm"
            variants={ENTRANCE_VARIANTS.slideDown}
          >
            FAQ
          </motion.span>
          <motion.h2
            className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl"
            variants={ENTRANCE_VARIANTS.slideUp}
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={ENTRANCE_VARIANTS.fade}
          >
            Everything you need to know about selling with Flik.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          animate={
            accordionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          initial={{ opacity: 0, y: 20 }}
          ref={accordionRef}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion
            className="flex flex-col gap-3"
            collapsible
            defaultValue="item-0"
            type="single"
          >
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                className="overflow-hidden rounded-xl border border-border bg-card px-5 transition-colors data-[state=open]:bg-primary-violet-50/30"
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
        </motion.div>
      </div>
    </section>
  );
}
