"use client";

import React from "react";
import { MediaGrid } from "./media-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Film, Star, Pin, ArrowRight } from "lucide-react";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average: number;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
}

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  mediaType: "movie" | "tv";
  isLoading?: boolean;
  error?: Error | null;
  href?: string;
  className?: string;
  showViewAll?: boolean;
  limit?: number;
  showTrending?: boolean;
  badge?: string;
  cardSize?: "sm" | "md" | "lg";
  showYear?: boolean;
  showRating?: boolean;
  showOverview?: boolean;
}

const badgeIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "In Theaters": Film,
  "Playing Now": Film,
  "Critics' Choice": Star,
};

export function MediaSection({
  title,
  items,
  mediaType,
  isLoading = false,
  error,
  href,
  className,
  showViewAll = true,
  limit = 12,
  showTrending = false,
  badge,
  cardSize = "md",
  showYear = true,
  showRating = true,
  showOverview = false,
}: MediaSectionProps) {
  const displayItems = items.slice(0, limit);

  return (
    <section className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl sm:text-4xl text-noir-heading">{title}</h2>

          {/* Badges */}
          {showTrending && (
            <Badge variant="secondary" className="gap-1 glass-subtle">
              <Pin className="h-3 w-3 fill-current" />
              <span className="text-readable">Trending</span>
            </Badge>
          )}

          {badge && (
            <Badge variant="secondary" className="gap-1 glass-subtle">
              {badgeIcons[badge] &&
                React.createElement(badgeIcons[badge], {
                  className: "h-3 w-3",
                })}
              <span className="text-readable">{badge}</span>
            </Badge>
          )}
        </div>

        {/* View All Button */}
        {href && showViewAll && (
          <Button variant="outline" asChild>
            <Link href={href}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {/* Media Grid */}
      <MediaGrid
        items={displayItems}
        mediaType={mediaType}
        isLoading={isLoading}
        error={error}
        cardSize={cardSize}
        showYear={showYear}
        showRating={showRating}
        showOverview={showOverview}
      />
    </section>
  );
}
