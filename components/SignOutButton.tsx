"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={signOut}
      className="flex h-10 items-center rounded-lg border border-[var(--border)] px-4 text-sm font-semibold text-[var(--price-down)] hover:bg-red-50"
    >
      ↩ সাইন আউট
    </button>
  );
}
