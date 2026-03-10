import { AlertTriangle, CheckCircle, DollarSign, Receipt } from "lucide-react";
import { TaxVatCard } from "@/components/admin/tax-vat-card";
import { StatsGrid } from "@/components/shared/stats-grid";
import adminData from "@/data/admin-dashboard.json";

const alertCount = adminData.taxVatTracking.complianceAlerts.length;

const TAX_METRICS = [
  {
    title: "Total Collected",
    value: `$${(adminData.taxVatTracking.totalCollected / 1000).toFixed(0)}K`,
    change: "This quarter",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Total Remitted",
    value: `$${(adminData.taxVatTracking.totalRemitted / 1000).toFixed(0)}K`,
    change: "Paid to authorities",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Pending Remittance",
    value: `$${(adminData.taxVatTracking.pendingRemittance / 1000).toFixed(0)}K`,
    change: "Due this month",
    changeType: "neutral" as const,
    icon: Receipt,
  },
  {
    title: "Compliance Alerts",
    value: alertCount.toString(),
    change: alertCount > 0 ? "Requires attention" : "All clear",
    changeType: alertCount > 0 ? ("negative" as const) : ("positive" as const),
    icon: AlertTriangle,
  },
];

export default function TaxCompliancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Tax & Compliance
        </h2>
        <p className="text-muted-foreground text-sm">
          Track tax collection, VAT remittance, and compliance across regions.
        </p>
      </div>

      <StatsGrid metrics={TAX_METRICS} />

      <TaxVatCard
        complianceAlerts={
          adminData.taxVatTracking.complianceAlerts as Array<{
            country: string;
            message: string;
            dueDate: string;
            amount: number;
            priority: "high" | "medium" | "low";
          }>
        }
        countries={
          adminData.taxVatTracking.countries as Array<{
            code: string;
            name: string;
            flag: string;
            collected: number;
            remitted: number;
            pending: number;
            rate: string;
            status: "current" | "pending" | "overdue";
          }>
        }
        pendingRemittance={adminData.taxVatTracking.pendingRemittance}
        showViewMore={false}
        totalCollected={adminData.taxVatTracking.totalCollected}
        totalRemitted={adminData.taxVatTracking.totalRemitted}
      />
    </div>
  );
}
