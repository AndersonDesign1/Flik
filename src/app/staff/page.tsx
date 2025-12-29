import { AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const STAFF_METRICS = [
  {
    title: "Open Tickets",
    value: "24",
    change: "8 urgent",
    changeType: "negative" as const,
    icon: MessageSquare,
  },
  {
    title: "Pending Reviews",
    value: "12",
    change: "3 new today",
    changeType: "neutral" as const,
    icon: Clock,
  },
  {
    title: "Reports",
    value: "5",
    change: "2 unresolved",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
  {
    title: "Resolved Today",
    value: "18",
    change: "+5 from yesterday",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
];

const RECENT_TICKETS = [
  {
    id: "T-001",
    subject: "Payment not received",
    user: "john@example.com",
    status: "open",
    priority: "high",
  },
  {
    id: "T-002",
    subject: "Can't download product",
    user: "sarah@example.com",
    status: "open",
    priority: "medium",
  },
  {
    id: "T-003",
    subject: "Refund request",
    user: "mike@example.com",
    status: "pending",
    priority: "high",
  },
  {
    id: "T-004",
    subject: "Account access issue",
    user: "jane@example.com",
    status: "open",
    priority: "low",
  },
];

const priorityVariants = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const;

const statusVariants = {
  open: "default",
  pending: "secondary",
  resolved: "success",
} as const;

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-2xl text-gray-900">
          Staff Dashboard
        </h2>
        <p className="text-gray-500 text-sm">
          Support queue and moderation overview.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid metrics={STAFF_METRICS} />

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tickets */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Tickets</h3>
            <a
              className="font-medium text-gray-500 text-sm hover:text-gray-700"
              href="/staff/tickets"
            >
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {RECENT_TICKETS.map((ticket) => (
              <div
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                key={ticket.id}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-400 text-xs">
                      {ticket.id}
                    </span>
                    <Badge
                      className="capitalize"
                      variant={
                        priorityVariants[
                          ticket.priority as keyof typeof priorityVariants
                        ]
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 font-medium text-gray-900 text-sm">
                    {ticket.subject}
                  </p>
                  <p className="text-gray-500 text-xs">{ticket.user}</p>
                </div>
                <Badge
                  className="capitalize"
                  variant={
                    statusVariants[ticket.status as keyof typeof statusVariants]
                  }
                >
                  {ticket.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Moderation */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Pending Moderation</h3>
            <a
              className="font-medium text-gray-500 text-sm hover:text-gray-700"
              href="/staff/moderation"
            >
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {[
              {
                name: "Dark Theme UI Kit",
                seller: "UI Kit Pro",
                type: "New product",
              },
              { name: "Icon Pack v3", seller: "Icon Foundry", type: "Update" },
              {
                name: "Landing Templates",
                seller: "Template Hub",
                type: "New product",
              },
              {
                name: "Figma Components",
                seller: "Design Studio",
                type: "New product",
              },
            ].map((item) => (
              <div
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                key={item.name}
              >
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-xs">by {item.seller}</p>
                </div>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
