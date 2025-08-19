"use client";

import { MediaCard, type MediaItem } from "./media-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MediaGridProps {
  items: MediaItem[];
  mediaType: "movie" | "tv";
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  cardSize?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function MediaGrid({
  items,
  mediaType,
  isLoading = false,
  error,
  className,
  cardSize = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
  columns = { sm: 2, md: 3, lg: 4, xl: 5 },
}: MediaGridProps) {
  const cardSizeMap = {
    sm: "w-[160px]",
    md: "w-[185px]",
    lg: "w-[210px]",
  };

  const cardHeightMap = {
    sm: "h-[340px]",
    md: "h-[378px]",
    lg: "h-[415px]",
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid gap-6 justify-items-center",
          getGridClasses(columns),
          className,
        )}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col glass rounded-lg overflow-hidden",
              cardSizeMap[cardSize],
              cardHeightMap[cardSize],
            )}
          >
            <Skeleton className="aspect-[2/3] w-full flex-1" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3 glass p-6 rounded-lg">
          <p className="text-destructive card-title">Failed to load content</p>
          <p className="text-sm text-muted-foreground text-body">
            {error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!items.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3 glass p-6 rounded-lg">
          <p className="text-muted-foreground text-body">
            No {mediaType === "movie" ? "movies" : "TV shows"} found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 justify-items-center",
        getGridClasses(columns),
        className,
      )}
    >
      {items.map((item, index) => (
        <MediaCard
          key={item.id}
          item={item}
          mediaType={mediaType}
          size={cardSize}
          showYear={showYear}
          showRating={showRating}
          showOverview={showOverview}
          priority={index < 6} // Prioritize first 6 images
        />
      ))}
    </div>
  );
}

function getGridClasses(columns: MediaGridProps["columns"]) {
  // Adjusted for larger cards - fewer columns per breakpoint
  const smCols = columns?.sm || 2;
  const mdCols = columns?.md || 3;
  const lgCols = columns?.lg || 4;
  const xlCols = columns?.xl || 5;

  return cn([
    // Mobile: 1-2 columns
    smCols === 1 ? "grid-cols-1" : "grid-cols-2",
    // Small tablets: 2-3 columns
    mdCols === 2
      ? "sm:grid-cols-2"
      : mdCols === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2",
    // Medium screens: 3-4 columns
    lgCols === 3
      ? "md:grid-cols-3"
      : lgCols === 4
        ? "md:grid-cols-4"
        : "md:grid-cols-3",
    // Large screens: 4-5 columns
    xlCols === 4
      ? "lg:grid-cols-4"
      : xlCols === 5
        ? "lg:grid-cols-5"
        : "lg:grid-cols-4",
  ]);
}
