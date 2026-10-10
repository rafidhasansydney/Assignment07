export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-8">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-[var(--background)]" />
          <div className="space-y-2">
            <div className="h-7 w-28 rounded bg-[var(--background)]" />
            <div className="h-4 w-48 rounded bg-[var(--background)]" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="h-9 w-44 rounded-lg bg-[var(--surface)] ring-1 ring-[var(--border)]" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-[var(--background)]" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-[var(--background)]" />
                <div className="h-3 w-16 rounded bg-[var(--background)]" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-3 w-14 rounded bg-[var(--background)]" />
                <div className="h-5 w-20 rounded bg-[var(--background)]" />
              </div>
              <div className="h-6 w-16 rounded-full bg-[var(--background)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
