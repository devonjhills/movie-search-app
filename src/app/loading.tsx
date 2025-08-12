import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[75vh] md:h-[85vh] bg-muted mb-12">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 container mx-auto px-4 flex items-end pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
            <div className="md:col-span-3">
              <Skeleton className="aspect-[2/3] w-full max-w-xs mx-auto md:mx-0" />
            </div>
            <div className="md:col-span-9 space-y-4">
              <Skeleton className="h-14 w-full max-w-2xl" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-20 w-full max-w-3xl" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-12">
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
                  <div
                    key={cardIndex}
                    className="overflow-hidden bg-card border border-border/50 rounded-lg h-full flex flex-col transition-all duration-200 w-48"
                  >
                    <div className="p-3 space-y-3 flex-1 flex flex-col">
                      {/* Poster Skeleton */}
                      <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
                        <Skeleton className="h-full w-full" />
                        {/* Rating Badge Skeleton */}
                        <div className="absolute top-2 right-2">
                          <Skeleton className="h-6 w-12 rounded-full" />
                        </div>
                      </div>

                      {/* Content Info Skeleton */}
                      <div className="space-y-1 flex-1 flex flex-col">
                        {/* Title - matches min-h-[2.5rem] */}
                        <Skeleton className="h-10 w-full" />
                        {/* Date */}
                        <Skeleton className="h-5 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
