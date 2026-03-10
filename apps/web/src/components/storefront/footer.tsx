import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Examples", href: "/store/designstudio" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Guides", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-border border-t bg-muted py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4">
            <Link
              className="flex items-center gap-2 font-bold text-foreground text-lg"
              href="/"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary-violet text-white">
                <span className="font-bold text-sm">F</span>
              </div>
              Flik
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm">
              The creator-friendly platform for selling digital products,
              memberships, and services.
            </p>
            <div className="flex gap-4">
              <Link
                className="text-muted-foreground transition-colors hover:text-foreground"
                href="#"
              >
                <FaTwitter className="size-5" />
              </Link>
              <Link
                className="text-muted-foreground transition-colors hover:text-foreground"
                href="#"
              >
                <FaGithub className="size-5" />
              </Link>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div className="flex flex-col gap-4" key={category}>
              <h4 className="font-semibold text-foreground text-sm">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-border border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Flik. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-sm">
            Made with ❤️ for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
