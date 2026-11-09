import { SkeletonBlock } from "@/components/ui/skeletons";

export default function ProductLoading() {
  return (
    <section className="container-x py-8 md:py-14" aria-busy="true">
      <SkeletonBlock className="mb-8 h-4 w-56" />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <SkeletonBlock className="aspect-square rounded-card md:aspect-[4/5] md:rounded-media" />
        <div className="lg:pt-6">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="mt-5 h-12 w-4/5" />
          <SkeletonBlock className="mt-3 h-12 w-1/2" />
          <SkeletonBlock className="mt-8 h-7 w-32" />
          <SkeletonBlock className="mt-8 h-4 w-full" />
          <SkeletonBlock className="mt-3 h-4 w-11/12" />
          <SkeletonBlock className="mt-3 h-4 w-3/4" />
          <SkeletonBlock className="mt-10 h-12 w-56 rounded-full" />
        </div>
      </div>
    </section>
  );
}
