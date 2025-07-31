import { TVCard } from "./tv-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { TVShow } from "@/lib/types";

interface TVGridProps {
  tvShows: TVShow[];
  isLoading?: boolean;
  error?: any;
  className?: string;
  cardSize?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
  emptyMessage?: string;
}

function TVCardSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-32",
    md: "w-40",
    lg: "w-48",
  };

  return (
    <div className={cn("space-y-3", sizeClasses[size])}>
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function TVGrid({
  tvShows,
  isLoading = false,
  error,
  className,
  cardSize = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
  emptyMessage = "No TV shows found.",
}: TVGridProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-destructive mb-2">⚠️ Error loading TV shows</div>
        <p className="text-sm text-muted-foreground">
          {error?.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "grid gap-6",
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
          className,
        )}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <TVCardSkeleton key={index} size={cardSize} />
        ))}
      </div>
    );
  }

  if (!tvShows || tvShows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-lg font-medium mb-2">No TV Shows Found</h3>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className,
      )}
    >
      {tvShows.map((tvShow) => (
        <TVCard
          key={tvShow.id}
          tvShow={tvShow}
          size={cardSize}
          showYear={showYear}
          showRating={showRating}
          showOverview={showOverview}
        />
      ))}
    </div>
  );
}
