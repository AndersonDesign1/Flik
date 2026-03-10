import { Footer } from "@/components/storefront/footer";
import { Navbar } from "@/components/storefront/navbar";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { CartProvider } from "@/contexts/cart-context";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col selection:bg-primary/10 selection:text-primary">
        <BackgroundGrid />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
