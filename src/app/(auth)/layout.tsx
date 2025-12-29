import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Logo */}
      <Link
        className="mb-8 flex items-center gap-2.5 font-semibold text-foreground"
        href="/"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-gray-50">
          <span className="font-bold text-sm">O</span>
        </div>
        <span className="font-semibold text-xl">Overlay</span>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-gray-500 text-sm">
        © 2024 Overlay. All rights reserved.
      </p>
    </div>
  );
}
