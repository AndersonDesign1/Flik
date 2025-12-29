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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-medium text-gray-600 text-sm">
            Testimonials
          </span>
          <h2 className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl">
            Loved by creators worldwide
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Join thousands of creators who are already selling with Overlay.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              className="rounded-2xl border border-gray-200 bg-white p-6"
              key={testimonial.author}
            >
              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    key={`${testimonial.author}-star-${i}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-gray-700 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-medium text-sm text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
