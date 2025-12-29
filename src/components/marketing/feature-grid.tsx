import {
  CreditCard,
  Download,
  Globe,
  LayoutDashboard,
  LineChart,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Payouts",
    description:
      "Get paid within 24 hours. No more waiting weeks for your money.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: LayoutDashboard,
    title: "Beautiful Dashboard",
    description:
      "Track sales, customers, and revenue with a dashboard designed for creators.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Globe,
    title: "Sell Globally",
    description:
      "Accept payments from 195+ countries with automatic currency conversion.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Download,
    title: "Digital Delivery",
    description:
      "Secure file hosting and instant delivery for all your digital products.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description:
      "Understand your audience with detailed insights on traffic, conversions, and revenue.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description:
      "Built-in fraud detection and chargeback protection for peace of mind.",
    className: "md:col-span-1 md:row-span-1",
  },
];

const _BENTO_FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Get personalized recommendations to grow your business faster.",
    highlight: true,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Methods",
    description: "Accept cards, Apple Pay, Google Pay, and regional methods.",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-medium text-gray-600 text-sm">
            Features
          </span>
          <h2 className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl">
            Everything you need to sell
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            From checkout to delivery, we handle the technical stuff so you can
            focus on creating.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Large featured card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white md:col-span-2">
            <div className="relative z-10">
              <div className="mb-4 inline-flex rounded-xl bg-white/10 p-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-2xl">
                AI-Powered Insights
              </h3>
              <p className="max-w-md text-gray-300">
                Get personalized recommendations to grow your business faster.
                Our AI analyzes your data and suggests the best strategies.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
          </div>

          {/* Small card */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg">
            <div className="mb-4 inline-flex rounded-xl bg-gray-100 p-3">
              <CreditCard className="h-5 w-5 text-gray-700" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 text-lg">
              Multiple Payment Methods
            </h3>
            <p className="text-gray-600 text-sm">
              Accept cards, Apple Pay, Google Pay, and regional payment methods.
            </p>
          </div>

          {/* Regular feature cards */}
          {FEATURES.map((feature) => (
            <div
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
              key={feature.title}
            >
              <div className="mb-4 inline-flex rounded-xl bg-gray-100 p-3">
                <feature.icon className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
