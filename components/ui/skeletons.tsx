/** Placeholder shapes shown while a page or section is loading. */
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton rounded-xl ${className}`} />;
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <SkeletonBlock className="aspect-[4/5] rounded-card md:rounded-[32px]" />
          <SkeletonBlock className="mt-4 h-3 w-16" />
          <SkeletonBlock className="mt-3 h-4 w-3/4" />
          <SkeletonBlock className="mt-2 h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function PageHeadingSkeleton() {
  return (
    <div>
      <SkeletonBlock className="h-3 w-32" />
      <SkeletonBlock className="mt-6 h-12 w-3/4 max-w-xl md:h-16" />
      <SkeletonBlock className="mt-5 h-5 w-full max-w-2xl" />
      <SkeletonBlock className="mt-3 h-5 w-2/3 max-w-xl" />
    </div>
  );
}

export function ListRowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="border-t border-hairline" role="status" aria-busy="true">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid grid-cols-[96px_1fr] gap-4 border-b border-hairline py-6 md:grid-cols-[120px_1fr]">
          <SkeletonBlock className="aspect-square rounded-2xl" />
          <div>
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="mt-3 h-4 w-24" />
            <SkeletonBlock className="mt-5 h-10 w-28 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
