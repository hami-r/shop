import { PageHeadingSkeleton, ProductGridSkeleton } from "@/components/ui/skeletons";

/** Shown instantly while a page is being prepared (e.g. a search or a new page of products). */
export default function Loading() {
  return (
    <section className="container-x py-12 md:py-20" aria-busy="true">
      <PageHeadingSkeleton />
      <div className="mt-14">
        <ProductGridSkeleton />
      </div>
    </section>
  );
}
