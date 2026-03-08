"use client";

import { useMutation, useQuery } from "convex/react";
import {
  MoreHorizontal,
  Shield,
  ShoppingBag,
  Sparkles,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InviteRoleDialog } from "@/components/admin/invite-role-dialog";
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
import { api } from "../../../../convex/_generated/api";

type Role = "user" | "staff" | "admin" | "super_admin";

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
  super_admin: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  staff: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
  },
} as const;

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  const [searchValue, setSearchValue] = useState("");
  const users = useQuery(api.profiles.getAllUsers) ?? [];
  const myRole = useQuery(api.profiles.getRole);
  const updateUserRole = useMutation(api.profiles.updateUserRole);
  const promoteSelfToSuperAdmin = useMutation(
    api.profiles.promoteSelfToSuperAdmin
  );

  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() ?? "").includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleRoleChange = async (userId: string, role: Role) => {
    try {
      await updateUserRole({ userId, role });
      toast.success(`Role updated to ${role.replace("_", " ")}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update role"
      );
    }
  };

  const handleBootstrapSuperAdmin = async () => {
    try {
      await promoteSelfToSuperAdmin({});
      toast.success("You are now a super admin");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to elevate role"
      );
    }
  };

  const userMetrics = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "All registered",
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Customers",
      value: users.filter((u) => u.role === "user").length.toString(),
      change: "Active buyers",
      changeType: "positive" as const,
      icon: ShoppingBag,
    },
    {
      title: "Staff Members",
      value: users.filter((u) => u.role === "staff").length.toString(),
      change: "Support team",
      changeType: "neutral" as const,
      icon: UserCog,
    },
    {
      title: "Admins",
      value: users
        .filter((u) => u.role === "admin" || u.role === "super_admin")
        .length.toString(),
      change: "Platform admins",
      changeType: "neutral" as const,
      icon: Shield,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl text-foreground">Users</h2>
          <p className="text-muted-foreground text-sm">
            Manage all users on the platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {myRole !== "super_admin" && (
            <Button onClick={handleBootstrapSuperAdmin} variant="outline">
              <Sparkles className="size-4" />
              Become Super Admin
            </Button>
          )}
          <InviteRoleDialog />
        </div>
      </div>

      <StatsGrid metrics={userMetrics} />

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
              <TableHead className="h-11 font-medium text-xs">Role</TableHead>
              <TableHead className="h-11 font-medium text-xs">Joined</TableHead>
              <TableHead className="h-11 w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  className="py-8 text-center text-muted-foreground"
                  colSpan={4}
                >
                  {users.length === 0 ? "No users found" : "No matching users"}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const role =
                  roleConfig[user.role as keyof typeof roleConfig] ??
                  roleConfig.user;
                return (
                  <TableRow
                    className="border-border/20 transition-colors hover:bg-muted/50"
                    key={user._id}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                          {(user.name ?? user.email).charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-medium text-foreground text-sm">
                            {user.name ?? "Unnamed User"}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {user.email}
                          </p>
                        </div>
                      </div>
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
                        {user.role.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-label="User actions"
                            className="size-8"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user._id, "user")}
                          >
                            Set as User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user._id, "staff")}
                          >
                            Set as Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user._id, "admin")}
                          >
                            Set as Admin
                          </DropdownMenuItem>
                          {myRole === "super_admin" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleRoleChange(user._id, "super_admin")
                              }
                            >
                              <Sparkles className="size-4" />
                              Set as Super Admin
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
