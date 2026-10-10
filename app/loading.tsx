function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
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
  );
}

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* hero skeleton */}
      <div className="my-6 flex flex-col items-center gap-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="h-7 w-48 rounded-full bg-[var(--surface)] ring-1 ring-[var(--border)]" />
          <div className="h-9 w-3/4 rounded bg-[var(--background)]" />
          <div className="h-5 w-2/3 rounded bg-[var(--background)]" />
          <div className="h-11 w-36 rounded-lg bg-[var(--background)]" />
        </div>
        <div className="h-52 w-72 rounded-xl bg-[var(--background)]" />
      </div>

      {/* section skeletons */}
      {[0, 1].map((s) => (
        <div key={s} className="mt-8">
          <div className="h-6 w-44 rounded bg-[var(--surface)] ring-1 ring-[var(--border)]" />
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
