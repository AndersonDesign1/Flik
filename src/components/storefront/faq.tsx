"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            Everything you need to know about selling with Overlay.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              className="overflow-hidden rounded-xl border border-border bg-card"
              key={item.question}
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                type="button"
              >
                <span className="font-medium text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={`size-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-border border-t px-5 pt-4 pb-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
