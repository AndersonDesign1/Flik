"use client";

import { useState } from "react";
import { Customer, columns } from "@/components/dashboard/customers/columns";
import { DataTable } from "@/components/dashboard/products/data-table";
import { CustomerDetail } from "@/components/dashboard/customers/customer-detail";
import { SplitView } from "@/components/ui/split-view";

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    spent: 1250.00,
    lastOrder: "2024-03-10",
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Bob Smith",
    email: "bob@example.com",
    spent: 450.00,
    lastOrder: "2024-03-08",
    status: "inactive",
  },
  {
    id: "CUST-003",
    name: "Charlie Davis",
    email: "charlie@example.com",
    spent: 3200.00,
    lastOrder: "2024-03-12",
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Diana Evans",
    email: "diana@example.com",
    spent: 89.00,
    lastOrder: "2024-02-28",
    status: "active",
  },
  {
    id: "CUST-005",
    name: "Evan Wright",
    email: "evan@example.com",
    spent: 0.00,
    lastOrder: "-",
    status: "inactive",
  },
  {
    id: "CUST-006",
    name: "Fiona Green",
    email: "fiona@example.com",
    spent: 560.00,
    lastOrder: "2024-03-01",
    status: "active",
  },
   {
    id: "CUST-007",
    name: "George Hall",
    email: "george@example.com",
    spent: 120.00,
    lastOrder: "2024-03-05",
    status: "active",
  },
  {
    id: "CUST-008",
    name: "Hannah Lee",
    email: "hannah@example.com",
    spent: 2300.00,
    lastOrder: "2024-03-11",
    status: "active",
  },
];

export default function CustomersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCustomer = MOCK_CUSTOMERS.find((c) => c.id === selectedId);

  return (
    <div className="flex-1 h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      <div className="h-full flex-1 overflow-hidden">
         <SplitView
            isOpen={!!selectedId}
            onClose={() => setSelectedId(null)}
            sidebar={selectedCustomer ? <CustomerDetail customer={selectedCustomer} /> : null}
         >
            <DataTable 
                data={MOCK_CUSTOMERS} 
                columns={columns}
                onRowClick={(row) => setSelectedId(row.id)}
                selectedId={selectedId || undefined} 
            />
         </SplitView>
      </div>
    </div>
  );
}
