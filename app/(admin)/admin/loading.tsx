import { SkeletonBlock } from "@/components/ui/skeletons";

export default function AdminLoading() {
  return (
    <section className="px-5 py-10 md:px-16" aria-busy="true">
      <div className="mx-auto max-w-boutique">
        <SkeletonBlock className="h-5 w-80" />
        <SkeletonBlock className="mt-8 h-10 w-56" />
        <div className="mt-8 grid gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonBlock key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}
