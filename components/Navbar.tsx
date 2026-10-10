"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";
import { bnDate } from "@/lib/bn";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  // Read the clock only after mount — prerendering must not freeze a date
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(250,252,250,0.95)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-xl">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-xs text-[var(--muted)]">{date}</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/signin"
            className="flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-[var(--foreground)] hover:bg-black/5"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="flex h-10 items-center rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-active)]"
          >
            সাইন আপ
          </Link>
        </nav>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--surface)]">
        <nav className="mx-auto flex max-w-6xl items-center gap-1.5 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--primary-active)] text-white"
                    : "hover:bg-black/5"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
