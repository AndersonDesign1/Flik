import {
  Book,
  ExternalLink,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const HELP_CATEGORIES = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of setting up your store",
    articles: 12,
    href: "#",
  },
  {
    icon: FileText,
    title: "Orders & Fulfillment",
    description: "Managing orders, shipping, and returns",
    articles: 18,
    href: "#",
  },
  {
    icon: MessageCircle,
    title: "Customer Support",
    description: "Best practices for customer communication",
    articles: 8,
    href: "#",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    articles: 24,
    href: "#",
  },
];

const POPULAR_ARTICLES = [
  {
    title: "How to set up your first product",
    category: "Getting Started",
    href: "#",
  },
  {
    title: "Understanding payout schedules",
    category: "Payouts",
    href: "#",
  },
  {
    title: "Managing inventory levels",
    category: "Products",
    href: "#",
  },
  {
    title: "Setting up shipping zones",
    category: "Shipping",
    href: "#",
  },
  {
    title: "Customizing email notifications",
    category: "Settings",
    href: "#",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-semibold text-foreground text-lg">Help Center</h2>
        <p className="text-muted-foreground text-sm">
          Find answers and get support for Andy Commerce.
        </p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="mx-auto max-w-xl text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-semibold text-foreground text-lg">
            How can we help you?
          </h3>
          <div className="relative mt-4">
            <input
              className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Search for articles, guides, and more..."
              type="text"
            />
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div>
        <h3 className="mb-4 font-medium text-foreground text-sm">
          Browse by Category
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HELP_CATEGORIES.map((category) => (
            <Link href={category.href} key={category.title}>
              <Card className="h-full p-5 transition-all hover:border-border hover:shadow-md">
                <category.icon className="h-8 w-8 text-muted-foreground" />
                <h4 className="mt-3 font-semibold text-foreground text-sm">
                  {category.title}
                </h4>
                <p className="mt-1 text-muted-foreground text-xs">
                  {category.description}
                </p>
                <p className="mt-3 text-muted-foreground/60 text-xs">
                  {category.articles} articles
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <h3 className="mb-4 font-medium text-foreground text-sm">
          Popular Articles
        </h3>
        <Card>
          <div className="divide-y divide-border/40">
            {POPULAR_ARTICLES.map((article) => (
              <Link
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                href={article.href}
                key={article.title}
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {article.title}
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    {article.category}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50">
              <Mail className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">
                Need more help?
              </h4>
              <p className="text-muted-foreground text-xs">
                Contact our support team for personalized assistance.
              </p>
            </div>
          </div>
          <Link
            className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            href="mailto:support@andycommerce.com"
          >
            Contact Support
          </Link>
        </div>
      </Card>
    </div>
  );
}
