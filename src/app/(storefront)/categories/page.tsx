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
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">
          Browse Categories
        </h1>
        <p className="mx-auto max-w-xl text-gray-600 text-lg">
          Discover thousands of digital products from talented creators around
          the world.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
            href={`/categories/${category.slug}`}
            key={category.slug}
          >
            <div aria-hidden="true" className="mb-4 text-4xl">{category.icon}</div>
            <h2 className="mb-1 font-semibold text-gray-900 text-lg group-hover:text-gray-700">
              {category.name}
            </h2>
            <p className="mb-4 text-gray-500 text-sm">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                {category.count} products
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
