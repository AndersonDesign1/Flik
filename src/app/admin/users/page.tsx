"use client";

import {
  MoreHorizontal,
  Shield,
  ShoppingBag,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    purchases: 12,
    spent: "$450",
    role: "user",
    joined: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    purchases: 34,
    spent: "$1,290",
    role: "user",
    joined: "Feb 3, 2024",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    purchases: 8,
    spent: "$320",
    role: "user",
    joined: "Mar 12, 2024",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@flik.xyz",
    purchases: 0,
    spent: "$0",
    role: "admin",
    joined: "Jan 1, 2024",
  },
  {
    id: "5",
    name: "Support Staff",
    email: "support@flik.xyz",
    purchases: 0,
    spent: "$0",
    role: "staff",
    joined: "Jan 5, 2024",
  },
];

const roleConfig = {
  user: {
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
  },
  admin: {
    bg: "bg-primary-violet-50 dark:bg-primary-violet/10",
    text: "text-primary-violet dark:text-primary-violet",
    border: "border-primary-violet-200 dark:border-primary-violet/20",
  },
  staff: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
  },
} as const;

const USER_METRICS = [
  {
    title: "Total Users",
    value: USERS.length.toString(),
    change: "All registered",
    changeType: "neutral" as const,
    icon: Users,
  },
  {
    title: "Customers",
    value: USERS.filter((u) => u.role === "user").length.toString(),
    change: "Active buyers",
    changeType: "positive" as const,
    icon: ShoppingBag,
  },
  {
    title: "Staff Members",
    value: USERS.filter((u) => u.role === "staff").length.toString(),
    change: "Support team",
    changeType: "neutral" as const,
    icon: UserCog,
  },
  {
    title: "Admins",
    value: USERS.filter((u) => u.role === "admin").length.toString(),
    change: "Platform admins",
    changeType: "neutral" as const,
    icon: Shield,
  },
];

export default function AdminUsersPage() {
  const [searchValue, setSearchValue] = useState("");

  const filteredUsers = USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl text-foreground">Users</h2>
          <p className="text-muted-foreground text-sm">
            Manage all users on the platform.
          </p>
        </div>
        <Button>Add User</Button>
      </div>

      <StatsGrid metrics={USER_METRICS} />

      <Card className="overflow-hidden p-0">
        <TableToolbar
          onSearchChange={setSearchValue}
          searchPlaceholder="Search users..."
          searchValue={searchValue}
          title="All Users"
        />

        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="h-11 font-medium text-xs">User</TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Purchases
              </TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Total Spent
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">Role</TableHead>
              <TableHead className="h-11 font-medium text-xs">Joined</TableHead>
              <TableHead className="h-11 w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const role = roleConfig[user.role as keyof typeof roleConfig];
              return (
                <TableRow
                  className="border-border/20 transition-colors hover:bg-muted/50"
                  key={user.id}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-foreground text-sm">
                          {user.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-right text-muted-foreground tabular-nums">
                    {user.purchases}
                  </TableCell>
                  <TableCell className="py-4 text-right font-semibold tabular-nums">
                    {user.spent}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs capitalize",
                        role.bg,
                        role.text,
                        role.border
                      )}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {user.joined}
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="size-8" size="icon" variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuItem className="text-error-red">
                          Suspend user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
