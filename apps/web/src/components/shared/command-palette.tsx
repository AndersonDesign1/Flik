"use client";

import { Command } from "cmdk";
import {
  Box,
  CreditCard,
  Download,
  Heart,
  Search,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SearchCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  items: SearchItem[];
}

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  meta?: string;
}

// User search categories
const USER_CATEGORIES: SearchCategory[] = [
  {
    id: "products",
    label: "Products",
    icon: Box,
    items: [
      {
        id: "p1",
        title: "Ultimate Design System",
        subtitle: "Design Studio",
        href: "/products/1",
        meta: "$49",
      },
      {
        id: "p2",
        title: "Dashboard UI Kit",
        subtitle: "Creative Assets",
        href: "/products/2",
        meta: "$39",
      },
      {
        id: "p3",
        title: "Icon Pack Pro",
        subtitle: "Icon Foundry",
        href: "/products/3",
        meta: "$19",
      },
      {
        id: "p4",
        title: "Mobile App Templates",
        subtitle: "App Studio",
        href: "/products/4",
        meta: "$29",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
    items: [
      {
        id: "o1",
        title: "Order #1234",
        subtitle: "Dashboard UI Kit",
        href: "/account/purchases",
        meta: "Dec 15",
      },
      {
        id: "o2",
        title: "Order #1189",
        subtitle: "Icon Pack Pro",
        href: "/account/purchases",
        meta: "Dec 10",
      },
    ],
  },
  {
    id: "library",
    label: "Library",
    icon: Download,
    items: [
      {
        id: "l1",
        title: "Dashboard UI Kit",
        subtitle: "Downloaded",
        href: "/account/library",
      },
      {
        id: "l2",
        title: "Icon Pack Pro",
        subtitle: "Downloaded",
        href: "/account/library",
      },
    ],
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    items: [
      {
        id: "w1",
        title: "Glassmorphism Assets",
        subtitle: "Template Hub",
        href: "/account/wishlist",
        meta: "$59",
      },
    ],
  },
  {
    id: "stores",
    label: "Stores",
    icon: Store,
    items: [
      {
        id: "s1",
        title: "Design Studio",
        subtitle: "1.2k products",
        href: "/store/designstudio",
      },
      {
        id: "s2",
        title: "Creative Assets",
        subtitle: "890 products",
        href: "/store/creativeassets",
      },
    ],
  },
];

// Seller search categories
const SELLER_CATEGORIES: SearchCategory[] = [
  {
    id: "products",
    label: "My Products",
    icon: Box,
    items: [
      {
        id: "sp1",
        title: "Ultimate Design System",
        subtitle: "Active",
        href: "/dashboard/products/1",
        meta: "$49",
      },
      {
        id: "sp2",
        title: "Landing Page Kit",
        subtitle: "Draft",
        href: "/dashboard/products/2",
        meta: "$34",
      },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    items: [
      {
        id: "c1",
        title: "John Doe",
        subtitle: "john@example.com",
        href: "/dashboard/customers",
        meta: "3 orders",
      },
      {
        id: "c2",
        title: "Jane Smith",
        subtitle: "jane@example.com",
        href: "/dashboard/customers",
        meta: "5 orders",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
    items: [
      {
        id: "so1",
        title: "Order #5678",
        subtitle: "John Doe",
        href: "/dashboard",
        meta: "$49",
      },
    ],
  },
  {
    id: "payouts",
    label: "Payouts",
    icon: CreditCard,
    items: [
      {
        id: "pay1",
        title: "Payout #123",
        subtitle: "Completed",
        href: "/dashboard/payouts",
        meta: "$1,234",
      },
    ],
  },
];

// Staff search categories
const STAFF_CATEGORIES: SearchCategory[] = [
  {
    id: "workspace",
    label: "Operator Workspace",
    icon: Users,
    items: [
      {
        id: "sw1",
        title: "Staff Overview",
        subtitle: "Marketplace operations snapshot",
        href: "/staff",
      },
      {
        id: "sw2",
        title: "All Users",
        subtitle: "People and access management",
        href: "/staff/users",
      },
      {
        id: "sw3",
        title: "Sellers",
        subtitle: "Store oversight",
        href: "/staff/sellers",
      },
      {
        id: "sw4",
        title: "Products",
        subtitle: "Catalog oversight",
        href: "/staff/products",
      },
    ],
  },
];

const SUPER_ADMIN_CATEGORIES: SearchCategory[] = [
  ...STAFF_CATEGORIES,
  {
    id: "governance",
    label: "Governance",
    icon: Users,
    items: [
      {
        id: "sg1",
        title: "Internal Team",
        subtitle: "Manage internal access",
        href: "/super-admin/admins",
      },
      {
        id: "sg2",
        title: "Seller Performance",
        subtitle: "Cross-platform seller oversight",
        href: "/super-admin/sellers",
      },
    ],
  },
];

export type SearchRole = "user" | "seller" | "staff" | "super_admin";

interface CommandPaletteProps {
  searchRole: SearchRole;
}

const ROLE_CATEGORIES: Record<SearchRole, SearchCategory[]> = {
  user: USER_CATEGORIES,
  seller: SELLER_CATEGORIES,
  staff: STAFF_CATEGORIES,
  super_admin: SUPER_ADMIN_CATEGORIES,
};

export function CommandPalette({ searchRole }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const categories = ROLE_CATEGORIES[searchRole];

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <Button
        className="relative h-8 gap-2 border-border/50 bg-transparent text-muted-foreground text-sm shadow-none md:w-56 md:justify-start"
        onClick={() => setOpen(true)}
        variant="outline"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden md:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground md:block">
          ⌘K
        </kbd>
      </Button>

      {/* Command Dialog */}
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-[500px]">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type to search..."
              />
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
              <Command.Empty className="py-6 text-center text-muted-foreground text-sm">
                No results found.
              </Command.Empty>

              {categories.map((category) => (
                <Command.Group heading={category.label} key={category.id}>
                  {category.items.map((item) => (
                    <Command.Item
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-muted"
                      key={item.id}
                      onSelect={() => runCommand(() => router.push(item.href))}
                      value={`${item.title} ${item.subtitle || ""}`}
                    >
                      <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        {item.subtitle && (
                          <p className="text-muted-foreground text-xs">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                      {item.meta && (
                        <span className="text-muted-foreground text-xs">
                          {item.meta}
                        </span>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
