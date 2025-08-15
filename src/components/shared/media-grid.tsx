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
  // Handle loading state
  if (isLoading) {
    return (
      <div className={cn("grid gap-4", getGridClasses(columns), className)}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[2/3] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">Failed to load content</p>
          <p className="text-sm text-muted-foreground">
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
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            No {mediaType === "movie" ? "movies" : "TV shows"} found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", getGridClasses(columns), className)}>
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
  return cn([
    `grid-cols-${columns?.sm || 2}`,
    `sm:grid-cols-${columns?.md || 3}`,
    `md:grid-cols-${columns?.lg || 4}`,
    `lg:grid-cols-${columns?.xl || 5}`,
  ]);
}
