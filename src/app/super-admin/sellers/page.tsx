import { Card } from "@/components/ui/card";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../convex/_generated/api";

export default async function SuperAdminSellersPage() {
  const sellers = await fetchAuthQuery(api.platform.listSellerPerformance);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Seller Performance
        </h2>
        <p className="text-muted-foreground text-sm">
          Cross-platform seller and store performance visibility.
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr] border-border/30 border-b px-6 py-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
          <span>Store</span>
          <span>Owner</span>
          <span>Live</span>
          <span>Total</span>
        </div>
        {sellers.length === 0 ? (
          <div className="px-6 py-8 text-muted-foreground text-sm">
            No stores have been created yet.
          </div>
        ) : (
          sellers.map((seller) => (
            <div
              className="grid grid-cols-[2fr_2fr_1fr_1fr] border-border/20 border-b px-6 py-4 last:border-b-0"
              key={seller.slug}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground text-sm">
                  {seller.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  /store/{seller.slug}
                </span>
              </div>
              <span className="text-muted-foreground text-sm">
                {seller.ownerName}
              </span>
              <span className="font-medium text-foreground text-sm">
                {seller.activeProducts}
              </span>
              <span className="text-muted-foreground text-sm">
                {seller.totalProducts}
              </span>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
