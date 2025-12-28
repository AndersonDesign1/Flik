"use client";

import { Card } from "@/components/ui/card";

interface LeadStatus {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface LeadsByStatusCardProps {
  leads?: LeadStatus[];
  totalInPipeline?: number;
}

const DEFAULT_LEADS: LeadStatus[] = [
  { name: "New Leads", value: 134, percent: 63, color: "bg-blue-500" },
  { name: "Contacted", value: 121, percent: 57, color: "bg-amber-500" },
  { name: "Qualified", value: 81, percent: 38, color: "bg-emerald-500" },
  { name: "Converted", value: 47, percent: 22, color: "bg-indigo-500" },
];

export function LeadsByStatusCard({
  leads = DEFAULT_LEADS,
  totalInPipeline = 213,
}: LeadsByStatusCardProps) {
  return (
    <Card className="lg:col-span-2">
      <div className="mb-4">
        <h3 className="font-medium text-muted-foreground text-sm">
          Leads by Status
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-2xl text-foreground tabular-nums tracking-tight">
            {totalInPipeline}
          </span>
          <span className="text-muted-foreground text-sm">in pipeline</span>
        </div>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div className="flex items-center gap-4" key={lead.name}>
            <span className="w-24 text-muted-foreground text-sm">
              {lead.name}
            </span>
            <div className="flex-1">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`h-full rounded-full ${lead.color} transition-all`}
                  style={{ width: `${lead.percent}%` }}
                />
              </div>
            </div>
            <span className="w-12 text-right font-semibold text-foreground text-sm tabular-nums">
              {lead.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
