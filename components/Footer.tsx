export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </span>
        <span className="text-[var(--muted)]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </span>
      </div>
    </footer>
  );
}
