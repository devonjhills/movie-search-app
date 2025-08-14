"use client";

import { TVGrid } from "./tv-grid";
import { Badge } from "@/components/ui/badge";
import { ViewAllButton } from "@/components/ui/view-all-button";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  VideoIcon,
  StarFilledIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";
import type { TVShow } from "@/lib/types";

interface TVSectionProps {
  title: string;
  tvShows: TVShow[];
  isLoading?: boolean;
  error?: Error | null;
  href?: string;
  className?: string;
  showViewAll?: boolean;
  limit?: number;
  showTrending?: boolean;
  badge?: string;
  showEpisodeIndicator?: boolean;
}

export function TVSection({
  title,
  tvShows,
  isLoading = false,
  error,
  href,
  className,
  showViewAll = true,
  limit = 12,
  showTrending = false,
  badge,
  showEpisodeIndicator = false,
}: TVSectionProps) {
  const displayTVShows = tvShows.slice(0, limit);

  return (
    <section className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground text-glow">
            {title}
          </h2>
          {/* Enhanced badges */}
          {showTrending && (
            <Badge variant="secondary" className="gap-1.5 text-sm">
              <DrawingPinFilledIcon className="h-4 w-4" />
              Trending
            </Badge>
          )}
          {badge && (
            <Badge variant="secondary" className="gap-1.5 text-sm">
              {badge === "Playing Now" && <VideoIcon className="h-4 w-4" />}
              {badge === "Critics' Choice" && (
                <StarFilledIcon className="h-4 w-4" />
              )}
              {badge}
            </Badge>
          )}
          {showEpisodeIndicator && (
            <Badge variant="secondary" className="gap-1.5 text-sm">
              <VideoIcon className="h-4 w-4" />
              New Episodes
            </Badge>
          )}
        </div>

        {/* View All Button */}
        {href && showViewAll && <ViewAllButton href={href} />}
      </div>

      {/* TV Shows Grid */}
      <TVGrid
        tvShows={displayTVShows}
        isLoading={isLoading}
        error={error}
        cardSize="md"
        showYear={true}
        showRating={true}
        showOverview={false}
      />
    </section>
  );
}
