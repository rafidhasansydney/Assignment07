import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <span className="text-6xl">🧺</span>
      <h1 className="mt-6 text-4xl font-bold">৪০৪</h1>
      <h2 className="mt-2 text-xl font-semibold">
        দুঃখিত, এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-2 max-w-md text-[var(--muted)]">
        আপনি যে পণ্য বা ক্যাটাগরির খোঁজে এসেছেন তা হয়তো নেই, অথবা ঠিকানাটি
        ভুল হতে পারে।
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-lg bg-[var(--primary)] px-6 font-semibold text-white transition-colors hover:bg-[var(--primary-active)]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
