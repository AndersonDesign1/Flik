"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownToLine, AlertCircle } from "lucide-react";

interface TransactionDetailProps {
  id: string; // Using ID to look up details (mocked)
}

export function TransactionDetail({ id }: TransactionDetailProps) {
  // Mock data derivation
  const amount = "$2,450.00";
  const date = "March 10, 2024";
  const status = "Completed";

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center pb-6 border-b border-border">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold">$</span>
        </div>
        <h3 className="text-3xl font-bold tracking-tight">{amount}</h3>
        <p className="text-sm text-muted-foreground mt-1">Payout to Bank Account</p>
        <div className="mt-4">
             <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                {status}
            </Badge>
        </div>
      </div>

      <div className="space-y-4">
         <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Transaction ID</span>
            <span className="text-sm font-mono">{id}</span>
         </div>
         <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm">{date}</span>
         </div>
         <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Bank Account</span>
            <span className="text-sm">**** 4242</span>
         </div>
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Reference</span>
            <span className="text-sm">PAY-883920</span>
         </div>
      </div>

      <div className="pt-4 space-y-3">
        <Button className="w-full">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Download Receipt
        </Button>
        <Button variant="ghost" className="w-full text-muted-foreground">
            <AlertCircle className="mr-2 h-4 w-4" />
            Report an Issue
        </Button>
      </div>
    </div>
  );
}
