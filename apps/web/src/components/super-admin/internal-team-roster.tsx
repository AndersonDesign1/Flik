"use client";

import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal, ShieldCheck, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InviteRoleDialog } from "@/components/admin/invite-role-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Role } from "@/lib/roles";
import { api } from "../../../convex/_generated/api";

type InternalRole = Exclude<Role, "user">;

interface PendingRoleChange {
  nextRole: Role;
  userEmail: string;
  userId: string;
}

function formatDate(timestamp: number): string {
  if (timestamp <= 0) {
    return "Unknown";
  }

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string | undefined, email: string) {
  const label = name?.trim() || email;
  return label
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getRoleBadgeVariant(role: Role) {
  if (role === "super_admin") {
    return "default";
  }

  if (role === "staff") {
    return "accent";
  }

  return "secondary";
}

const INTERNAL_ROLES: Role[] = ["user", "staff", "super_admin"];

export function InternalTeamRoster() {
  const [searchValue, setSearchValue] = useState("");
  const [pendingRoleChange, setPendingRoleChange] =
    useState<PendingRoleChange | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const users = useQuery(api.profiles.getAllUsers) ?? [];
  const currentUser = useQuery(api.users.getCurrentUser);
  const updateUserRole = useMutation(api.profiles.updateUserRole);

  const internalUsers = useMemo(
    () =>
      users
        .filter(
          (user): user is typeof user & { role: InternalRole } =>
            user.role === "staff" || user.role === "super_admin"
        )
        .sort((left, right) => right.createdAt - left.createdAt),
    [users]
  );

  const filteredUsers = useMemo(
    () =>
      internalUsers.filter((user) => {
        const query = searchValue.toLowerCase();
        return (
          (user.name?.toLowerCase() ?? "").includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      }),
    [internalUsers, searchValue]
  );

  const metrics = useMemo(
    () => [
      {
        label: "Super Admins",
        value: internalUsers.filter((user) => user.role === "super_admin")
          .length,
      },
      {
        label: "Staff",
        value: internalUsers.filter((user) => user.role === "staff").length,
      },
      {
        label: "Total Internal",
        value: internalUsers.length,
      },
    ],
    [internalUsers]
  );

  const handleRoleChange = async () => {
    if (isSubmitting || !pendingRoleChange) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateUserRole({
        userId: pendingRoleChange.userId,
        role: pendingRoleChange.nextRole,
      });
      toast.success(
        `${pendingRoleChange.userEmail} is now ${pendingRoleChange.nextRole.replace("_", " ")}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update role"
      );
    } finally {
      setIsSubmitting(false);
      setPendingRoleChange(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl text-foreground">
            Internal Team
          </h2>
          <p className="text-muted-foreground text-sm">
            Monitor internal access and step in only when an override is needed.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex w-full max-w-sm items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            <Input
              className="h-10"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search internal team..."
              value={searchValue}
            />
          </div>
          <InviteRoleDialog />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card className="p-4" key={metric.label}>
            <p className="font-medium text-muted-foreground text-sm">
              {metric.label}
            </p>
            <p className="mt-2 font-semibold text-3xl text-foreground">
              {metric.value}
            </p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-border/30 border-b px-6 py-4">
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              Internal access roster
            </h3>
            <p className="text-muted-foreground text-xs">
              Super admin can review and override internal roles here without
              leaving governance.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-muted-foreground text-xs">
            <ShieldCheck className="size-3.5" />
            Owner oversight only
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/20 hover:bg-transparent">
              <TableHead className="h-11 px-6 text-xs">Team member</TableHead>
              <TableHead className="h-11 text-xs">Role</TableHead>
              <TableHead className="h-11 text-xs">Added</TableHead>
              <TableHead className="h-11 w-16 px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-6 py-10 text-center text-muted-foreground"
                  colSpan={4}
                >
                  {internalUsers.length === 0
                    ? "No internal team members yet."
                    : "No matching internal team members."}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const isCurrentUser = currentUser?._id === user._id;

                return (
                  <TableRow
                    className="border-border/20 hover:bg-muted/30"
                    key={user._id}
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-primary-violet/10 text-primary-violet">
                            {getInitials(user.name, user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground text-sm">
                              {user.name ?? "Unnamed User"}
                            </span>
                            {isCurrentUser && (
                              <Badge variant="outline">You</Badge>
                            )}
                          </div>
                          <span className="truncate text-muted-foreground text-xs">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground text-sm">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-label={`Manage ${user.email}`}
                            disabled={isCurrentUser}
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {INTERNAL_ROLES.map((role) => (
                            <DropdownMenuItem
                              disabled={role === user.role}
                              key={`${user._id}-${role}`}
                              onClick={() =>
                                setPendingRoleChange({
                                  nextRole: role,
                                  userEmail: user.email,
                                  userId: user._id,
                                })
                              }
                            >
                              Set as {role.replace("_", " ")}
                            </DropdownMenuItem>
                          ))}
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

      <AlertDialog
        onOpenChange={(open) => {
          if (!open) {
            setPendingRoleChange(null);
          }
        }}
        open={pendingRoleChange !== null}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Override internal role?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingRoleChange
                ? `This will change ${pendingRoleChange.userEmail} to ${pendingRoleChange.nextRole.replace("_", " ")}.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isSubmitting}
              onClick={handleRoleChange}
            >
              {isSubmitting ? "Saving..." : "Confirm override"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
