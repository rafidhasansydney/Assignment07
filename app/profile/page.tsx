import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=/profile");

  const { name, email, image } = session.user;
  const initial = (name || email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Account card */}
      <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] text-2xl font-bold text-white">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </span>
          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-sm text-[var(--muted)]">{email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      {/* Info card */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-bold">তথ্য</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold">ইমেইল</label>
            <input
              type="email"
              value={email}
              readOnly
              className="mt-1 h-10 w-full cursor-not-allowed rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--muted)]"
            />
          </div>
          <Link
            href="/update-info"
            className="flex h-10 w-full items-center justify-center rounded-lg bg-[var(--primary)] font-semibold text-white transition-colors hover:bg-[var(--primary-active)] sm:w-40"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}
