import type { Metadata } from "next";

export const metadata: Metadata = { title: "গোপনীয়তা নীতি" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">গোপনীয়তা নীতি (Privacy Policy)</h1>

      <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--foreground)]">
        <p>
          <strong>বাজার দর</strong> (BazarDor) একটি বাজারদর তথ্যভিত্তিক ওয়েব
          অ্যাপ্লিকেশন। সাইন আপ করার সময় আমরা শুধুমাত্র আপনার <strong>নাম</strong> ও{" "}
          <strong>ইমেইল</strong> সংরক্ষণ করি, যা অ্যাকাউন্ট তৈরি ও সাইন ইন
          ব্যবস্থাপনার জন্য ব্যবহৃত হয়।
        </p>
        <p>
          Google বা GitHub দিয়ে সোশ্যাল লগইন করলে সেই প্রোভাইডার আমাদের কাছে শুধু
          আপনার নাম, ইমেইল ও প্রোফাইল ছবি পাঠায়। আমরা কোনো সংবেদনশীল তথ্য
          সংগ্রহ করি না এবং কোনো তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রি বা শেয়ার
          করি না।
        </p>
        <p>
          পণ্যের দামের তথ্য সরবরাহকারী পাবলিক API থেকে আনা হয়। আপনি চাইলে
          যেকোনো সময় সাইন আউট করে অ্যাপটির ব্যবহার বন্ধ করতে পারেন।
        </p>
        <p className="text-[var(--muted)]">
          যেকোনো প্রশ্নে যোগাযোগ করুন: rafidhasansydney@gmail.com
        </p>
      </div>
    </div>
  );
}
