"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) {
      toast.error(
        error.code === "USER_ALREADY_EXISTS"
          ? "এই ইমেইল দিয়ে অ্যাকাউন্ট আছে — সাইন ইন করুন"
          : "রেজিস্ট্রেশন সফল হয়নি, আবার চেষ্টা করুন",
      );
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি সফল! এবার সাইন ইন করুন");
    router.push("/signin");
  };

  const social = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) toast.error("সোশ্যাল লগইন এখন সচল নয়");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="mt-1 h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--primary)]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--primary)]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="mt-1 h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--primary)]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="আবার লিখুন"
            className="mt-1 h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--primary)]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-lg bg-[var(--primary)] font-semibold text-white transition-colors hover:bg-[var(--primary-active)] disabled:opacity-60"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="mt-5 flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--border)]" />
        অথবা
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          onClick={() => social("google")}
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm font-medium hover:bg-black/5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.72 12 .72 7.44.72 3.56 3.36 1.72 7.16l3.66 2.84C6.26 7.14 8.88 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.28 12.26c0-.8-.07-1.56-.2-2.26H12v4.52h6.34c-.28 1.48-1.1 2.74-2.34 3.58l3.62 2.8c2.12-1.96 3.66-4.84 3.66-8.64z" />
            <path fill="#FBBC05" d="M5.38 14.12a6.9 6.9 0 0 1 0-4.12L1.72 7.16a11.28 11.28 0 0 0 0 10.1l3.66-3.14z" />
            <path fill="#34A853" d="M12 23.28c3.04 0 5.6-1 7.46-2.72l-3.62-2.8c-1 .68-2.28 1.08-3.84 1.08-3.12 0-5.74-2.1-6.62-4.96l-3.66 3.14c1.84 3.8 5.72 6.26 10.28 6.26z" />
          </svg>
          Google
        </button>
        <button
          onClick={() => social("github")}
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm font-medium hover:bg-black/5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
          GitHub
        </button>
      </div>

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-[var(--primary)]">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}
