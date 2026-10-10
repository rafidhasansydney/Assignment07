export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-6">
      <div className="h-5 w-48 rounded bg-[var(--surface)] ring-1 ring-[var(--border)]" />

      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-[var(--background)]" />
            <div className="space-y-2">
              <div className="h-8 w-48 rounded bg-[var(--background)]" />
              <div className="h-4 w-32 rounded bg-[var(--background)]" />
              <div className="h-4 w-56 rounded bg-[var(--background)]" />
            </div>
          </div>
          <div className="h-32 w-40 rounded-xl bg-[var(--background)]" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="h-4 w-20 rounded bg-[var(--background)]" />
            <div className="mt-2 h-7 w-28 rounded bg-[var(--background)]" />
            <div className="mt-2 h-3 w-24 rounded bg-[var(--background)]" />
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-11 rounded-lg bg-[var(--surface)] ring-1 ring-[var(--border)]"
          />
        ))}
      </div>
    </div>
  );
}
