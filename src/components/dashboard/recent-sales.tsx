import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const recentSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "/avatars/01.png",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "/avatars/02.png",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "/avatars/03.png",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "/avatars/04.png",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "/avatars/05.png",
    initials: "SD",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-1">
      {recentSalesData.map((sale) => (
        <div
          className="group -mx-3 flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-surface-2"
          key={sale.email}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border/30">
              <AvatarImage alt={sale.name} src={sale.avatar} />
              <AvatarFallback className="bg-surface-2 font-medium text-muted-foreground text-xs">
                {sale.initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <p className="font-medium text-foreground text-sm leading-none">
                {sale.name}
              </p>
              <p className="text-muted-foreground text-xs">{sale.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-success-600 tabular-nums dark:text-success-500">
              {sale.amount}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                  variant="ghost"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>View customer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
