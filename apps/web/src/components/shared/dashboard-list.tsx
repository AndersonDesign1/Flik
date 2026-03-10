import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface DashboardListProps {
  title: string;
  viewAllHref?: string;
  children: ReactNode;
}

export function DashboardList({
  title,
  viewAllHref,
  children,
}: DashboardListProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        {viewAllHref && (
          <Link
            className="font-medium text-muted-foreground text-sm hover:text-foreground"
            href={viewAllHref}
          >
            View all →
          </Link>
        )}
      </div>
      <div className="divide-y divide-border/30">{children}</div>
    </Card>
  );
}

interface DashboardListItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export function DashboardListItem({
  children,
  onClick,
}: DashboardListItemProps) {
  const className =
    "flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-muted/50";

  if (onClick) {
    return (
      <button className={className} onClick={onClick} type="button">
        {children}
      </button>
    );
  }

  return <div className={className}>{children}</div>;
}
