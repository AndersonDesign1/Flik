import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
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
    <footer className="border-gray-200 border-t bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              className="flex items-center gap-2 font-bold text-gray-900 text-lg"
              href="/"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
                <span className="font-bold text-sm">O</span>
              </div>
              Overlay
            </Link>
            <p className="mt-4 max-w-xs text-gray-500 text-sm">
              The creator-friendly platform for selling digital products,
              memberships, and services.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                className="text-gray-400 transition-colors hover:text-gray-600"
                href="#"
              >
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link
                className="text-gray-400 transition-colors hover:text-gray-600"
                href="#"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold text-gray-900 text-sm">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-gray-500 text-sm transition-colors hover:text-gray-900"
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

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-gray-200 border-t pt-8 md:flex-row">
          <p className="text-gray-500 text-sm">
            © 2024 Overlay. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with ❤️ for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
