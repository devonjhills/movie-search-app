"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MagnifyingGlassIcon,
  Cross2Icon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { useMultiSearch } from "@/lib/hooks/api-hooks";
import { debounce, cn } from "@/lib/utils";
import { SearchResults } from "./search-results";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BackNavigation } from "@/components/ui/back-navigation";

interface BrowsePageProps {
  initialQuery?: string;
}

type MediaTypeFilter = "all" | "movie" | "tv" | "person";
type SortOption = "relevance" | "popularity" | "rating" | "release_date";

interface SortOptionType {
  value: SortOption;
  label: string;
}

const mediaTypeOptions = [
  { value: "all" as MediaTypeFilter, label: "All Results" },
  { value: "movie" as MediaTypeFilter, label: "Movies" },
  { value: "tv" as MediaTypeFilter, label: "TV Shows" },
  { value: "person" as MediaTypeFilter, label: "People" },
];

const sortOptions: SortOptionType[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "release_date", label: "Newest First" },
];

export function BrowsePage({ initialQuery = "" }: BrowsePageProps) {
  // Search state
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Filter state
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOptionType>(sortOptions[0]);

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

  const handleClearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  const handleResetFilters = () => {
    setMediaTypeFilter("all");
    setSortBy(sortOptions[0]);
  };

  // API hooks
  const {
    results: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useMultiSearch(debouncedQuery);

  // Filter and sort results
  const filteredResults = searchResults
    ? {
        movieResults:
          mediaTypeFilter === "all" || mediaTypeFilter === "movie"
            ? searchResults.movieResults || []
            : [],
        tvResults:
          mediaTypeFilter === "all" || mediaTypeFilter === "tv"
            ? searchResults.tvResults || []
            : [],
        peopleResults:
          mediaTypeFilter === "all" || mediaTypeFilter === "person"
            ? searchResults.peopleResults || []
            : [],
      }
    : null;

  // Calculate totals
  const totalSearchResults = filteredResults
    ? (filteredResults.movieResults?.length || 0) +
      (filteredResults.tvResults?.length || 0) +
      (filteredResults.peopleResults?.length || 0)
    : 0;

  const hasActiveFilters =
    mediaTypeFilter !== "all" || sortBy.value !== "relevance";

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb items={[{ label: "Search", current: true }]} />
          <BackNavigation fallbackHref="/" />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            Search Movies, TV Shows & People
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover your next favorite entertainment from our comprehensive
            database
          </p>
        </div>

        {/* Search Input */}
        <Card className="bg-card/95 backdrop-blur-sm border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search Box */}
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
                />
                {query && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <Cross2Icon className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MixerHorizontalIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <h3 className="text-sm font-medium leading-none m-0 p-0">
                      Filters
                    </h3>
                  </div>
                  <div className="h-7 flex items-center">
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetFilters}
                        className="h-7 px-3 text-xs bg-background hover:bg-muted border-border text-foreground hover:text-foreground"
                      >
                        Reset Filters
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Media Type Filter */}
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Media Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {mediaTypeOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={
                            mediaTypeFilter === option.value
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setMediaTypeFilter(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Sort By
                    </label>
                    <Select
                      value={sortBy.value}
                      onValueChange={(value) => {
                        const option = sortOptions.find(
                          (o) => o.value === value,
                        );
                        if (option) setSortBy(option);
                      }}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {debouncedQuery && (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif font-semibold">
                Search Results for &quot;{debouncedQuery}&quot;
              </h2>
              {!searchLoading && (
                <Badge variant="secondary" className="px-2 py-1">
                  {totalSearchResults} result
                  {totalSearchResults !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            {/* Search Results */}
            {searchLoading ? (
              <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-12 text-center shadow-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Searching...</p>
              </div>
            ) : searchError ? (
              <div className="bg-destructive/20 backdrop-blur-sm border border-destructive/30 rounded-xl p-12 text-center shadow-sm">
                <div className="text-destructive mb-2 text-2xl">⚠️</div>
                <h3 className="text-lg font-semibold mb-2">Search Error</h3>
                <p className="text-muted-foreground">
                  Something went wrong while searching. Please try again.
                </p>
              </div>
            ) : totalSearchResults === 0 ? (
              <div className="bg-gradient-to-br from-muted/50 to-background/95 backdrop-blur-sm border border-border rounded-xl p-12 text-center shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  No Results Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search terms"
                    : "Try different keywords or check your spelling"}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={handleResetFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <SearchResults results={filteredResults} sortBy={sortBy.value} />
            )}
          </div>
        )}

        {/* Empty State */}
        {!debouncedQuery && (
          <div className="bg-gradient-to-br from-muted/50 to-background/95 backdrop-blur-sm border border-border rounded-xl p-12 text-center shadow-sm">
            <MagnifyingGlassIcon className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-semibold mb-3">
              Start Your Search
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Enter a movie title, TV show, or person&apos;s name to discover
              your next favorite entertainment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
