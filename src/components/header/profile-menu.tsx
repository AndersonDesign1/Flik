"use client";

import { CreditCard, HelpCircle, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileMenuProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
}

const DEFAULT_USER = {
  name: "John Anderson",
  email: "john@andycommerce.com",
  initials: "JA",
};

export function ProfileMenu({ user = DEFAULT_USER }: ProfileMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-semibold text-white text-xs ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          type="button"
        >
          {user.avatar ? (
            <Avatar className="h-8 w-8">
              <AvatarImage alt={user.name} src={user.avatar} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
          ) : (
            user.initials
          )}
          <span className="sr-only">Open user menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link href="/dashboard/profile">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link href="/dashboard/billing">
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link href="/dashboard/settings">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link href="/dashboard/help">
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive-600 focus:text-destructive-600 dark:text-destructive-500">
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
