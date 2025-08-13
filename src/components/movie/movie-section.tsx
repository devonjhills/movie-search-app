"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { MovieGrid } from "./movie-grid";
import { Badge } from "@/components/ui/badge";
import { ViewAllButton } from "@/components/ui/view-all-button";
import { cn } from "@/lib/utils";
import type { Movie, FormattedMovie } from "@/lib/types";

interface MovieSectionProps {
  title: string;
  movies: (Movie | FormattedMovie)[];
  isLoading?: boolean;
  error?: Error | null;
  href?: string;
  className?: string;
  showViewAll?: boolean;
  limit?: number;
  showTrending?: boolean;
  badge?: string;
}

export function MovieSection({
  title,
  movies,
  isLoading = false,
  error,
  href,
  className,
  showViewAll = true,
  limit = 12,
  showTrending = false,
  badge,
}: MovieSectionProps) {
  const displayMovies = movies.slice(0, limit);

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
              🔥 Trending
            </Badge>
          )}
          {badge && (
            <Badge className="gap-1.5 text-sm">
              {badge}
            </Badge>
          )}
        </div>

        {/* View All Button */}
        {href && showViewAll && <ViewAllButton href={href} />}
      </div>

      {/* Movies Grid */}
      <MovieGrid
        movies={displayMovies}
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
