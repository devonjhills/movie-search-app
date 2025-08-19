import {
  HeroSectionSkeleton,
  MediaSectionSkeleton,
} from "@/components/ui/optimized-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen layout-stable">
      {/* Hero Section Skeleton - matches actual hero layout */}
      <HeroSectionSkeleton />

      {/* Content Sections - matches actual homepage layout */}
      <div className="container mx-auto px-4 space-y-10 md:space-y-16 pb-8 md:pb-12 relative">
        {/* Featured Section Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-48 bg-primary/10 rounded-md animate-pulse" />
              <div className="h-6 w-20 bg-primary/10 rounded-md animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-primary/10 rounded-md animate-pulse" />
          </div>

          {/* Featured grid - larger cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col space-y-4 p-4 border rounded-lg"
              >
                <div className="aspect-[16/9] w-full bg-primary/10 rounded-md animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-primary/10 rounded-md animate-pulse" />
                  <div className="h-3 w-1/2 bg-primary/10 rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Sections Skeletons */}
        <MediaSectionSkeleton cardCount={12} />
        <MediaSectionSkeleton cardCount={12} />
      </div>
    </div>
  );
}
