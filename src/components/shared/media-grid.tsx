"use client";

import { MediaCard, type MediaItem } from "./media-card";
import { MediaCardSkeleton } from "@/components/ui/optimized-skeleton";
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
  columns = { sm: 2, md: 4, lg: 5, xl: 6 },
}: MediaGridProps) {
  // Handle loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid gap-6 justify-items-center px-2 layout-stable",
          getGridClasses(columns),
          className,
        )}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <MediaCardSkeleton key={i} size={cardSize} />
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3 noir-card p-6 rounded-lg">
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
        <div className="text-center space-y-3 noir-card p-6 rounded-lg">
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
        "grid gap-6 justify-items-center px-2",
        getGridClasses(columns),
        className,
      )}
    >
      {items.slice(0, 18).map((item, index) => (
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
  // More columns per breakpoint to reduce empty space
  const smCols = columns?.sm || 2;
  const mdCols = columns?.md || 4;
  const lgCols = columns?.lg || 5;
  const xlCols = columns?.xl || 6;

  return cn([
    // Mobile: 2 columns
    smCols === 1 ? "grid-cols-1" : "grid-cols-2",
    // Small tablets: 3-4 columns
    mdCols === 2
      ? "sm:grid-cols-2"
      : mdCols === 3
        ? "sm:grid-cols-3"
        : mdCols === 4
          ? "sm:grid-cols-4"
          : "sm:grid-cols-3",
    // Medium screens: 4-5 columns
    lgCols === 3
      ? "md:grid-cols-3"
      : lgCols === 4
        ? "md:grid-cols-4"
        : lgCols === 5
          ? "md:grid-cols-5"
          : "md:grid-cols-4",
    // Large screens: 5-6 columns
    xlCols === 4
      ? "lg:grid-cols-4"
      : xlCols === 5
        ? "lg:grid-cols-5"
        : xlCols === 6
          ? "lg:grid-cols-6"
          : "lg:grid-cols-5",
  ]);
}
