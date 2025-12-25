import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border border-t bg-background py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg tracking-tight">property-dey</h3>
          <p className="text-muted-foreground text-sm">
            Crafted digital assets for the modern creator.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
            Product
          </h4>
          <ul className="space-y-2 text-foreground/80 text-sm">
            <li>
              <Link className="hover:text-foreground" href="/">
                All Products
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#">
                Featured
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
            Support
          </h4>
          <ul className="space-y-2 text-foreground/80 text-sm">
            <li>
              <Link className="hover:text-foreground" href="#">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#">
                License
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
            Social
          </h4>
          <ul className="space-y-2 text-foreground/80 text-sm">
            <li>
              <Link className="hover:text-foreground" href="#">
                Twitter
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
