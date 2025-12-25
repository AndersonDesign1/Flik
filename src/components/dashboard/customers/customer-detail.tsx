"use client";

import { Customer } from "@/components/dashboard/customers/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Calendar, DollarSign, Package } from "lucide-react";

interface CustomerDetailProps {
  customer: Customer;
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center pb-6 border-b border-border">
        <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={customer.image} />
            <AvatarFallback className="text-xl">{customer.name.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold">{customer.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{customer.email}</p>
        <Badge variant={customer.status === "active" ? "default" : "secondary"}>
            {customer.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <Card>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-3 w-3" /> LTV
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-lg font-bold">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(customer.spent)}
                </div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <Package className="h-3 w-3" /> Last Order
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-lg font-bold">{customer.lastOrder}</div>
            </CardContent>
         </Card>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
            <Label>Private Notes</Label>
            <Textarea 
                placeholder="Add notes about this customer..." 
                className="h-32"
            />
        </div>
        <div className="flex justify-end gap-2">
             <Button variant="outline" size="sm">Archive</Button>
             <Button size="sm">Save Notes</Button>
        </div>
      </div>
    </div>
  );
}
