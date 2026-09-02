export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="k-container py-12 md:py-16">
        <div className="mb-10 space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-10 w-48 animate-pulse rounded bg-muted" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded bg-muted" />
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b border-border p-6 last:border-b-0">
              <div className="space-y-3">
                <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
