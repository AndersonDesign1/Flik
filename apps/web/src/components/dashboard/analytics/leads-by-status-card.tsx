"use client";

import { Card } from "@/components/ui/card";

interface LeadStatus {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface LeadsByStatusCardProps {
  leads: LeadStatus[];
  totalInPipeline: number;
}

export function LeadsByStatusCard({
  leads,
  totalInPipeline,
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
          <span className="text-muted-foreground text-xs">in pipeline</span>
        </div>
      </div>

      <div className="space-y-4">
        {leads.length === 0 ? (
          <p className="text-muted-foreground text-sm">No leads data yet.</p>
        ) : (
          leads.map((lead) => (
            <div className="space-y-2" key={lead.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{lead.name}</span>
                <div className="flex items-center gap-1.5 tabular-nums">
                  <span className="text-muted-foreground">{lead.value}</span>
                  <span className="text-muted-foreground/60 text-xs">
                    ({lead.percent}%)
                  </span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`${lead.color} h-full rounded-full transition-all`}
                  style={{ width: `${lead.percent}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
