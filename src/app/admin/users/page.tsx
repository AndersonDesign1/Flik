"use client";

import { MoreHorizontal, Search } from "lucide-react";
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
    email: "admin@overlay.com",
    purchases: 0,
    spent: "$0",
    role: "admin",
    joined: "Jan 1, 2024",
  },
  {
    id: "5",
    name: "Support Staff",
    email: "support@overlay.com",
    purchases: 0,
    spent: "$0",
    role: "staff",
    joined: "Jan 5, 2024",
  },
];

const roleVariants = {
  user: "secondary",
  admin: "default",
  staff: "outline",
} as const;

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Users</h2>
          <p className="text-gray-500 text-sm">
            Manage all users on the platform.
          </p>
        </div>
        <Button>Add User</Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="h-9 pl-9" placeholder="Search users..." />
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-gray-100 border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Purchases
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {USERS.map((user) => (
                <tr
                  className="transition-colors hover:bg-gray-50"
                  key={user.id}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600 text-sm">
                    {user.purchases}
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-gray-900 text-sm">
                    {user.spent}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className="capitalize"
                      variant={
                        roleVariants[user.role as keyof typeof roleVariants]
                      }
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-gray-500 text-sm">
                    {user.joined}
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Suspend user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
