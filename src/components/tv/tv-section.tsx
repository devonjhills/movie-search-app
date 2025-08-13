"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { TVGrid } from "./tv-grid";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
            <Badge className="gap-1.5 text-sm">
              🔥 Hot
            </Badge>
          )}
          {badge && (
            <Badge className="text-xs font-serif shimmer text-champagne-glow">
              {badge}
            </Badge>
          )}
          {showEpisodeIndicator && (
            <Badge className="gap-1 text-xs">
              📺 New Episodes
            </Badge>
          )}
        </div>

        {/* View All Link */}
        {href && showViewAll && (
          <Link
            href={href}
            className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            <span>View All</span>
            <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
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
