import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "This platform completely transformed my business. The intuitive design and powerful features made it an instant favorite.",
    author: "Michael Lee",
    role: "Digital Course Creator",
    rating: 5,
    avatar: "ML",
  },
  {
    quote:
      "From day one, the experience felt premium. The dashboard is beautiful, and payouts are incredibly fast.",
    author: "Sarah Chen",
    role: "UI Designer",
    rating: 5,
    avatar: "SC",
  },
  {
    quote:
      "I switched from Gumroad and haven't looked back. Better analytics, lower fees, and a way better customer experience.",
    author: "James Wilson",
    role: "Template Creator",
    rating: 5,
    avatar: "JW",
  },
];

export function Testimonials() {
  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:mx-auto">
          <span className="inline-block rounded-full border border-border bg-muted px-3 py-1 font-medium text-muted-foreground text-sm">
            Testimonials
          </span>
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Loved by creators worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of creators who are already selling with Flik.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              key={testimonial.author}
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    className="size-4 fill-amber-400 text-amber-400"
                    key={`${testimonial.author}-star-${i}`}
                  />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                  {testimonial.avatar}
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-foreground text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
