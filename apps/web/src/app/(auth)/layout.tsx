import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-violet-100/50 to-transparent blur-3xl dark:from-primary-violet-900/20" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[600px] rounded-full bg-gradient-to-t from-secondary-magenta-100/30 to-transparent blur-3xl dark:from-secondary-magenta-900/10" />
      </div>

      <Link className="mb-8 flex items-center gap-2.5" href="/">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary-violet text-white shadow-lg shadow-primary-violet/25">
          <span className="font-bold text-lg">F</span>
        </div>
        <span className="font-bold text-2xl text-foreground tracking-tight">
          Flik
        </span>
      </Link>

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg shadow-primary-violet/5">
          {children}
        </div>
      </div>

      <p className="mt-8 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Flik. All rights reserved.
      </p>
    </div>
  );
}
