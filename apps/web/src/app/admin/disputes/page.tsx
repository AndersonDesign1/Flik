import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { DisputesRefundsCard } from "@/components/admin/disputes-refunds-card";
import { StatsGrid } from "@/components/shared/stats-grid";
import adminData from "@/data/admin-dashboard.json";

const DISPUTE_METRICS = [
  {
    title: "Total Disputes",
    value: adminData.disputesAndRefunds.totalDisputes.toLocaleString(),
    change: "Last 30 days",
    changeType: "neutral" as const,
    icon: AlertTriangle,
  },
  {
    title: "Dispute Rate",
    value: `${adminData.disputesAndRefunds.disputeRate}%`,
    change: "Below 2% threshold",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Avg Resolution Time",
    value: adminData.disputesAndRefunds.avgResolutionTime,
    change: "Target: 48h",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    title: "Disputes Won",
    value: `${adminData.disputesAndRefunds.disputesWon}%`,
    change: "Win rate",
    changeType: "positive" as const,
    icon: XCircle,
  },
];

export default function DisputesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Disputes & Refunds
        </h2>
        <p className="text-muted-foreground text-sm">
          Monitor and manage platform disputes, refunds, and flagged creators.
        </p>
      </div>

      <StatsGrid metrics={DISPUTE_METRICS} />

      <DisputesRefundsCard
        avgResolutionTime={adminData.disputesAndRefunds.avgResolutionTime}
        chargebackRate={adminData.disputesAndRefunds.chargebackRate}
        disputeRate={adminData.disputesAndRefunds.disputeRate}
        disputesWon={adminData.disputesAndRefunds.disputesWon}
        flaggedCreators={
          adminData.disputesAndRefunds.flaggedCreators as Array<{
            id: string;
            name: string;
            refundRate: number;
            disputes: number;
            status: "under_review" | "warning_issued" | "monitoring";
            reason: string;
          }>
        }
        refundRate={adminData.disputesAndRefunds.refundRate}
        showViewMore={false}
        totalDisputes={adminData.disputesAndRefunds.totalDisputes}
      />
    </div>
  );
}
