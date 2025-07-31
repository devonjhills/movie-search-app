"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { MovieGrid } from "./movie-grid";
import { cn } from "@/lib/utils";
import type { Movie, FormattedMovie } from "@/lib/types";

interface MovieSectionProps {
  title: string;
  movies: (Movie | FormattedMovie)[];
  isLoading?: boolean;
  error?: any;
  href?: string;
  className?: string;
  showViewAll?: boolean;
  limit?: number;
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
}: MovieSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const displayMovies = showAll ? movies : movies.slice(0, limit);

  return (
    <section className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        <div className="flex items-center space-x-4">
          {/* Show More/Less Toggle */}
          {movies.length > limit && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAll ? "Show Less" : `Show All (${movies.length})`}
            </button>
          )}

          {/* View All Link */}
          {href && showViewAll && (
            <Link
              href={href}
              className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span>View All</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
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
