import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    slug: "templates",
    name: "Templates",
    description: "Website and app templates",
    count: 234,
    icon: "📄",
  },
  {
    slug: "ui-kits",
    name: "UI Kits",
    description: "Design systems and component libraries",
    count: 156,
    icon: "🎨",
  },
  {
    slug: "icons",
    name: "Icons",
    description: "Icon packs and sets",
    count: 89,
    icon: "✨",
  },
  {
    slug: "fonts",
    name: "Fonts",
    description: "Typography and font families",
    count: 67,
    icon: "🔤",
  },
  {
    slug: "illustrations",
    name: "Illustrations",
    description: "Vector illustrations and graphics",
    count: 123,
    icon: "🖼️",
  },
  {
    slug: "photos",
    name: "Photos",
    description: "Stock photos and images",
    count: 456,
    icon: "📷",
  },
  {
    slug: "courses",
    name: "Courses",
    description: "Video courses and tutorials",
    count: 45,
    icon: "🎓",
  },
  {
    slug: "ebooks",
    name: "eBooks",
    description: "Digital books and guides",
    count: 78,
    icon: "📚",
  },
];

export default function CategoriesPage() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/40 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 font-medium text-muted-foreground text-sm">
            Explore Categories
          </span>
          <h1 className="mb-4 font-bold text-4xl text-foreground tracking-tight">
            Browse Categories
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Discover thousands of digital products from talented creators around
            the world.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <Link
              className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all hover:bg-primary-violet-50 dark:hover:bg-primary-violet-50/10 animate-in fade-in slide-in-from-bottom-4 duration-500"
              href={`/categories/${category.slug}`}
              key={category.slug}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
            >
              <div aria-hidden="true" className="mb-4 text-4xl">
                {category.icon}
              </div>
              <h2 className="mb-1 font-semibold text-foreground text-lg group-hover:text-primary-violet">
                {category.name}
              </h2>
              <p className="mb-4 text-muted-foreground text-sm">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {category.count} products
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary-violet" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
