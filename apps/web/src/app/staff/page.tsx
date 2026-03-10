import { AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import {
  DashboardList,
  DashboardListItem,
} from "@/components/shared/dashboard-list";
import { StatsGrid } from "@/components/shared/stats-grid";
import { cn } from "@/lib/utils";

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

const PENDING_MODERATION = [
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
];

const priorityConfig = {
  high: "text-error-red",
  medium: "text-amber-600 dark:text-amber-400",
  low: "text-muted-foreground",
} as const;

const ticketStatusConfig = {
  open: {
    bg: "bg-primary-violet-50 dark:bg-primary-violet/10",
    text: "text-primary-violet dark:text-primary-violet",
    border: "border-primary-violet-200 dark:border-primary-violet/20",
  },
  pending: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  resolved: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
  },
} as const;

export default function StaffDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Staff Dashboard
        </h2>
        <p className="text-muted-foreground text-sm">
          Support queue and moderation overview.
        </p>
      </div>

      <StatsGrid metrics={STAFF_METRICS} />

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardList title="Recent Tickets" viewAllHref="/staff/tickets">
          {RECENT_TICKETS.map((ticket) => {
            const status =
              ticketStatusConfig[
                ticket.status as keyof typeof ticketStatusConfig
              ];
            const priority =
              priorityConfig[ticket.priority as keyof typeof priorityConfig];
            return (
              <DashboardListItem key={ticket.id}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-muted-foreground text-xs">
                      {ticket.id}
                    </span>
                    <span className={cn("font-medium text-xs", priority)}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="font-medium text-foreground text-sm">
                    {ticket.subject}
                  </p>
                  <p className="text-muted-foreground text-xs">{ticket.user}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 font-medium text-xs capitalize",
                    status.bg,
                    status.text,
                    status.border
                  )}
                >
                  {ticket.status}
                </span>
              </DashboardListItem>
            );
          })}
        </DashboardList>

        <DashboardList
          title="Pending Moderation"
          viewAllHref="/staff/moderation"
        >
          {PENDING_MODERATION.map((item) => (
            <DashboardListItem key={item.name}>
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-foreground text-sm">
                  {item.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  by {item.seller}
                </p>
              </div>
              <span className="font-medium text-muted-foreground text-xs">
                {item.type}
              </span>
            </DashboardListItem>
          ))}
        </DashboardList>
      </div>
    </div>
  );
}
