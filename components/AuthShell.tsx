import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        {children}
      </div>

      <div className="mt-5 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
