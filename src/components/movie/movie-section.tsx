"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { MovieGrid } from "./movie-grid";
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
  const displayMovies = movies.slice(0, limit);

  return (
    <section className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-semibold text-foreground">
          {title}
        </h2>

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
