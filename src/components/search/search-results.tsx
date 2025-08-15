"use client";

import { MovieGrid } from "@/components/movie/movie-grid";
import { TVGrid } from "@/components/tv/tv-grid";
import { PersonGrid } from "./person-grid";
import type { MultiSearchResult } from "@/lib/types";

interface SearchResultsProps {
  results: MultiSearchResult | null;
  sortBy?: string;
}

export function SearchResults({ results }: SearchResultsProps) {
  if (!results) return null;

  const { movieResults, tvResults, peopleResults } = results;
  const totalMovies = movieResults?.length || 0;
  const totalTV = tvResults?.length || 0;
  const totalPeople = peopleResults?.length || 0;

  // Apply sorting logic here if needed based on sortBy parameter
  // For now, we'll use the results as-is since TMDB API handles most sorting

  return (
    <div className="space-y-8">
      {/* Movies Section */}
      {totalMovies > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">Movies</h3>
            <span className="text-sm text-muted-foreground">
              ({totalMovies} result{totalMovies !== 1 ? "s" : ""})
            </span>
          </div>
          <MovieGrid
            movies={movieResults}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage="No movies found for this search."
          />
        </section>
      )}

      {/* TV Shows Section */}
      {totalTV > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">TV Shows</h3>
            <span className="text-sm text-muted-foreground">
              ({totalTV} result{totalTV !== 1 ? "s" : ""})
            </span>
          </div>
          <TVGrid
            tvShows={tvResults}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage="No TV shows found for this search."
          />
        </section>
      )}

      {/* People Section */}
      {totalPeople > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">People</h3>
            <span className="text-sm text-muted-foreground">
              ({totalPeople} result{totalPeople !== 1 ? "s" : ""})
            </span>
          </div>
          <PersonGrid
            people={peopleResults}
            emptyMessage="No people found for this search."
          />
        </section>
      )}
    </div>
  );
}
