import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthShell from "@/components/AuthShell";
import UpdateInfoForm from "./UpdateInfoForm";

export const metadata: Metadata = { title: "তথ্য আপডেট করুন" };

export default async function UpdateInfoPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=/update-info");

  return (
    <AuthShell
      title="তথ্য আপডেট করুন"
      subtitle="আপনার নাম পরিবর্তন করে তথ্য আপডেট করতে পারেন।"
    >
      <UpdateInfoForm currentName={session.user.name} />
    </AuthShell>
  );
}
