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
    <div className="space-y-7">
      {recentSalesData.map((sale) => (
        <div key={sale.email} className="flex items-center group justify-between">
          <div className="flex items-center gap-4">
             <Avatar className="h-9 w-9 border border-border/40 sm:h-9 sm:w-9">
                <AvatarImage alt={sale.name} src={sale.avatar} />
                <AvatarFallback className="text-[10px] text-muted-foreground bg-muted/30">{sale.initials}</AvatarFallback>
             </Avatar>
             <div className="space-y-1">
                <p className="font-medium text-sm leading-none text-foreground tracking-tight">{sale.name}</p>
                <p className="text-muted-foreground text-xs font-normal">
                {sale.email}
                </p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium tabular-nums text-foreground">{sale.amount}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100 ring-offset-background focus-visible:ring-1 focus-visible:ring-ring" variant="ghost">
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
