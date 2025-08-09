"use client";

import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMultiSearch } from "@/lib/hooks/api-hooks";
import { debounce } from "@/lib/utils";
import { SearchResults } from "./search-results";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SearchPageProps {
  initialQuery?: string;
}

export function SearchPage({ initialQuery = "" }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce search query
  const debouncedSearch = useCallback((searchQuery: string) => {
    const debouncedFn = debounce((query: string) => {
      setDebouncedQuery(query);
      // Update URL without triggering a navigation
      if (query) {
        const url = new URL(window.location.href);
        url.searchParams.set("q", query);
        window.history.replaceState({}, "", url.toString());
      } else {
        const url = new URL(window.location.href);
        url.searchParams.delete("q");
        window.history.replaceState({}, "", url.toString());
      }
    }, 500);
    debouncedFn(searchQuery);
  }, []);

  // Update debounced query when query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Fetch search results
  const { results, isLoading, isError } = useMultiSearch(debouncedQuery);

  const handleClearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  const totalResults =
    (results?.movieResults?.length || 0) +
    (results?.tvResults?.length || 0) +
    (results?.peopleResults?.length || 0);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Search</h1>
        <p className="text-muted-foreground">
          Discover movies, TV shows, and people
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for movies, TV shows, people..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-input bg-background pl-12 pr-12 py-4 text-lg",
                "placeholder:text-muted-foreground",
                "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                "transition-colors",
              )}
              autoFocus
            />
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search State Messages */}
      {!query && !debouncedQuery && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Start your search</h2>
          <p className="text-muted-foreground">
            Enter a movie title, TV show, or person&apos;s name to begin
          </p>
        </div>
      )}

      {isLoading && debouncedQuery && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching...</p>
        </div>
      )}

      {isError && debouncedQuery && (
        <div className="text-center py-12">
          <div className="text-destructive mb-2">⚠️ Search Error</div>
          <p className="text-muted-foreground">
            Something went wrong while searching. Please try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && debouncedQuery && totalResults === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && !isError && debouncedQuery && totalResults > 0 && (
        <div className="space-y-6">
          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Search Results for &quot;{debouncedQuery}&quot;
            </h2>
            <p className="text-sm text-muted-foreground">
              {totalResults} result{totalResults !== 1 ? "s" : ""} found
            </p>
          </div>

          <SearchResults results={results} />
        </div>
      )}
    </div>
  );
}
