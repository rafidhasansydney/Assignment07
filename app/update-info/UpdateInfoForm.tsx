"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateInfoForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) {
      toast.error("আপডেট সফল হয়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">নাম</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="mt-1 h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--primary)]"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="h-10 w-full rounded-lg bg-[var(--primary)] font-semibold text-white transition-colors hover:bg-[var(--primary-active)] disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}
