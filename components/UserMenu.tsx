"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export type SessionUser = {
  name: string;
  email: string;
  image: string | null;
} | null;

export default function UserMenu({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) {
    return (
      <nav className="flex items-center gap-2">
        <Link
          href="/signin"
          className="flex h-10 items-center rounded-lg px-4 text-sm font-semibold hover:bg-black/5"
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
    );
  }

  const signOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2 rounded-lg px-2 hover:bg-black/5"
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] text-sm font-bold text-white">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </span>
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name}
        </span>
        <span className="text-xs text-[var(--muted)]">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
          <div className="border-b border-[var(--border)] px-4 py-3">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="truncate text-xs text-[var(--muted)]">{user.email}</p>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm hover:bg-black/5"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            onClick={signOut}
            className="block w-full px-4 py-2.5 text-left text-sm text-[var(--price-down)] hover:bg-black/5"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
