import { MovieCard } from "./movie-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Movie, FormattedMovie } from "@/lib/types";

interface MovieGridProps {
  movies: (Movie | FormattedMovie)[];
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  cardSize?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
  emptyMessage?: string;
}

function MovieCardSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-full max-w-36 sm:max-w-40",
    md: "w-full max-w-44 sm:max-w-52",
    lg: "w-full max-w-52 sm:max-w-60",
  };

  return (
    <div
      className={cn(
        "overflow-hidden bg-card border border-border/50 rounded-lg h-full flex flex-col transition-all duration-200",
        sizeClasses[size],
      )}
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

        {/* Movie Info Skeleton */}
        <div className="space-y-1 flex-1 flex flex-col">
          {/* Title - matches min-h-[2.5rem] */}
          <Skeleton className="h-10 w-full" />
          {/* Release Date */}
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}

export function MovieGrid({
  movies,
  isLoading = false,
  error,
  className,
  cardSize = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
  emptyMessage = "No movies found.",
}: MovieGridProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-destructive mb-2">⚠️ Error loading movies</div>
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
          "grid gap-4 sm:gap-5 lg:gap-6",
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
          className,
        )}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={index} size={cardSize} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-lg font-medium mb-2">No Movies Found</h3>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5 lg:gap-6",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className,
      )}
    >
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          size={cardSize}
          showYear={showYear}
          showRating={showRating}
          showOverview={showOverview}
          priority={index < 6}
        />
      ))}
    </div>
  );
}
