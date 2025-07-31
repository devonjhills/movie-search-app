import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Skeleton */}
      <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <Skeleton className="aspect-[2/3] w-full max-w-xs" />
            </div>
            <div className="md:col-span-9 space-y-4">
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full max-w-2xl" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <section key={sectionIndex} className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-24" />
            </div>

            {/* Grid of Cards */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, cardIndex) => (
                <div key={cardIndex} className="space-y-3">
                  <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
