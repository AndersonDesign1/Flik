"use client";

import { Building2, Search, ShieldCheck, Store, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Role } from "@/lib/roles";

type UserType = "buyer" | "seller" | "both" | undefined;

interface PersonRecord {
  _id: string;
  createdAt: number;
  email: string;
  name?: string;
  role: Role;
  storeName?: string;
  storeSlug?: string;
  userType?: UserType;
}

interface PeopleDirectoryProps {
  people: PersonRecord[];
  summary: {
    buyers: number;
    internalTeam: number;
    sellerEnabled: number;
    totalUsers: number;
  };
}

type SegmentFilter = "all" | "buyers" | "internal" | "seller_enabled";

const SEGMENT_FILTERS: Array<{
  description: string;
  id: SegmentFilter;
  label: string;
}> = [
  {
    id: "all",
    label: "All people",
    description: "Every registered account on the platform",
  },
  {
    id: "internal",
    label: "Internal team",
    description: "Super admins and staff",
  },
  {
    id: "buyers",
    label: "Buyers",
    description: "Buyer and buyer+sellers",
  },
  {
    id: "seller_enabled",
    label: "Seller-enabled",
    description: "Seller or buyer+seller profiles",
  },
];

function formatDate(timestamp: number): string {
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

function getUserTypeLabel(userType: UserType) {
  if (userType === "both") {
    return "Buyer + Seller";
  }

  if (userType === "seller") {
    return "Seller";
  }

  if (userType === "buyer") {
    return "Buyer";
  }

  return "Not set";
}

function getUserTypeBadgeVariant(userType: UserType) {
  if (userType === "both") {
    return "accent";
  }

  if (userType === "seller") {
    return "success";
  }

  return "secondary";
}

function matchesSegment(person: PersonRecord, segment: SegmentFilter) {
  if (segment === "all") {
    return true;
  }

  if (segment === "internal") {
    return person.role === "staff" || person.role === "super_admin";
  }

  if (segment === "buyers") {
    return person.userType === "buyer" || person.userType === "both";
  }

  return person.userType === "seller" || person.userType === "both";
}

export function PeopleDirectory({ people, summary }: PeopleDirectoryProps) {
  const [searchValue, setSearchValue] = useState("");
  const [segment, setSegment] = useState<SegmentFilter>("all");

  const filteredPeople = useMemo(() => {
    const query = searchValue.toLowerCase();

    return people.filter((person) => {
      if (!matchesSegment(person, segment)) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        (person.name?.toLowerCase() ?? "").includes(query) ||
        person.email.toLowerCase().includes(query)
      );
    });
  }, [people, searchValue, segment]);

  const metrics = [
    {
      title: "Total People",
      value: summary.totalUsers.toString(),
      change: "Accounts visible to owner oversight",
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Buyers",
      value: summary.buyers.toString(),
      change: "Buyer and buyer+seller accounts",
      changeType: "neutral" as const,
      icon: Building2,
    },
    {
      title: "Seller-enabled",
      value: summary.sellerEnabled.toString(),
      change: "Seller or dual-workspace profiles",
      changeType: "positive" as const,
      icon: Store,
    },
    {
      title: "Internal Team",
      value: summary.internalTeam.toString(),
      change: "Staff and super admins",
      changeType: "neutral" as const,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">People</h2>
        <p className="text-muted-foreground text-sm">
          Read-only governance visibility across everyone on the platform.
        </p>
      </div>

      <StatsGrid metrics={metrics} />

      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by name or email..."
              type="text"
              value={searchValue}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {SEGMENT_FILTERS.map((filter) => (
              <Button
                className="h-auto min-h-10 px-3 py-2 text-left"
                key={filter.id}
                onClick={() => setSegment(filter.id)}
                variant={segment === filter.id ? "default" : "outline"}
              >
                <span className="flex flex-col items-start">
                  <span>{filter.label}</span>
                  <span className="text-[11px] opacity-80">
                    {filter.description}
                  </span>
                </span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              Governance directory
            </h3>
            <p className="text-muted-foreground text-xs">
              Read-only context for people, roles, and workspace participation.
            </p>
          </div>
          <Badge variant="outline">{filteredPeople.length} visible</Badge>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/20 hover:bg-transparent">
              <TableHead className="px-5 text-xs">Person</TableHead>
              <TableHead className="text-xs">Role</TableHead>
              <TableHead className="text-xs">Workspace</TableHead>
              <TableHead className="text-xs">Store</TableHead>
              <TableHead className="text-xs">Joined</TableHead>
              <TableHead className="px-5 text-xs">Context</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPeople.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-5 py-10 text-center text-muted-foreground"
                  colSpan={6}
                >
                  No people match the current search or filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredPeople.map((person) => (
                <TableRow
                  className="border-border/20 hover:bg-muted/30"
                  key={person._id}
                >
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-primary-violet/10 text-primary-violet">
                          {getInitials(person.name, person.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground text-sm">
                          {person.name ?? "Unnamed User"}
                        </p>
                        <p className="truncate text-muted-foreground text-xs">
                          {person.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant={getRoleBadgeVariant(person.role)}>
                      {person.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant={getUserTypeBadgeVariant(person.userType)}>
                      {getUserTypeLabel(person.userType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    {person.storeSlug ? (
                      <Link
                        className="font-medium text-primary-violet text-sm hover:underline"
                        href={`/store/${person.storeSlug}`}
                        target="_blank"
                      >
                        {person.storeName ?? person.storeSlug}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No store
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground text-sm">
                    {formatDate(person.createdAt)}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {(person.role === "staff" ||
                        person.role === "super_admin") && (
                        <Link
                          className="font-medium text-primary-violet text-xs hover:underline"
                          href="/super-admin/admins"
                        >
                          Internal roster
                        </Link>
                      )}
                      {person.storeSlug && (
                        <Link
                          className="font-medium text-primary-violet text-xs hover:underline"
                          href="/super-admin/sellers"
                        >
                          Seller oversight
                        </Link>
                      )}
                      {person.role === "user" && !person.storeSlug && (
                        <span className="text-muted-foreground text-xs">
                          Overview only
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
