"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SplitView } from "@/components/ui/split-view";
import { TransactionDetail } from "@/components/dashboard/payouts/transaction-detail";
import { cn } from "@/lib/utils";

export default function PayoutsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const transactions = [1, 2, 3, 4, 5].map((i) => ({
      id: `TRX-${1000+i}`,
      date: `Mar ${10 - i}, 2024`,
      amount: "+$2,450.00"
  }));

  return (
    <div className="flex-1 h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
        <div className="flex items-center space-x-2">
            <Button>Request Payout</Button>
        </div>
      </div>
      
      <div className="h-full flex-1 overflow-hidden">
        <SplitView
            isOpen={!!selectedId}
            onClose={() => setSelectedId(null)}
            sidebar={selectedId ? <TransactionDetail id={selectedId} /> : null}
        >
             <div className="space-y-4 pr-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">$12,450.00</div>
                            <p className="text-xs text-muted-foreground mt-2">Available for immediate payout</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$3,200.00</div>
                            <p className="text-xs text-muted-foreground mt-1">Scheduled for tomorrow</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>Recent payouts to your bank account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {transactions.map((trx) => (
                                <div 
                                    className={cn(
                                        "flex items-center p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted",
                                        selectedId === trx.id ? "bg-muted ring-1 ring-ring" : ""
                                    )}
                                    key={trx.id}
                                    onClick={() => setSelectedId(trx.id)}
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Bank Transfer ****4242</p>
                                    <p className="text-sm text-muted-foreground">
                                        {trx.date}
                                    </p>
                                    </div>
                                    <div className="ml-auto font-medium flex items-center gap-4">
                                        {trx.amount}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedId(trx.id); }}>View details</DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Download receipt</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
             </div>
        </SplitView>
      </div>
    </div>
  );
}
