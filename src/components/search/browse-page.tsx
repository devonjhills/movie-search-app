"use client";

import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  useMultiSearch,
  useDiscoverMovies,
  useDiscoverTVShows,
  useTopRatedMovies,
  useTopRatedTVShows,
} from "@/lib/hooks/api-hooks";
import { debounce, cn } from "@/lib/utils";
import { SearchResults } from "./search-results";
import { MovieGrid } from "@/components/movie/movie-grid";
import { TVGrid } from "@/components/tv/tv-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOVIE_GENRES, TV_GENRES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BackNavigation } from "@/components/ui/back-navigation";

interface BrowsePageProps {
  initialQuery?: string;
}

type MediaType = "movie" | "tv";
type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "release_date.desc"
  | "release_date.asc";

interface GenreOption {
  id: number | null;
  name: string;
}

interface SortOptionType {
  value: SortOption;
  label: string;
}

const movieGenres: GenreOption[] = [
  { id: null, name: "All Genres" },
  { id: MOVIE_GENRES.ACTION, name: "Action" },
  { id: MOVIE_GENRES.ADVENTURE, name: "Adventure" },
  { id: MOVIE_GENRES.ANIMATION, name: "Animation" },
  { id: MOVIE_GENRES.COMEDY, name: "Comedy" },
  { id: MOVIE_GENRES.CRIME, name: "Crime" },
  { id: MOVIE_GENRES.DOCUMENTARY, name: "Documentary" },
  { id: MOVIE_GENRES.DRAMA, name: "Drama" },
  { id: MOVIE_GENRES.FAMILY, name: "Family" },
  { id: MOVIE_GENRES.FANTASY, name: "Fantasy" },
  { id: MOVIE_GENRES.HISTORY, name: "History" },
  { id: MOVIE_GENRES.HORROR, name: "Horror" },
  { id: MOVIE_GENRES.MUSIC, name: "Music" },
  { id: MOVIE_GENRES.MYSTERY, name: "Mystery" },
  { id: MOVIE_GENRES.ROMANCE, name: "Romance" },
  { id: MOVIE_GENRES.SCIENCE_FICTION, name: "Science Fiction" },
  { id: MOVIE_GENRES.THRILLER, name: "Thriller" },
  { id: MOVIE_GENRES.WAR, name: "War" },
  { id: MOVIE_GENRES.WESTERN, name: "Western" },
];

const tvGenres: GenreOption[] = [
  { id: null, name: "All Genres" },
  { id: TV_GENRES.ACTION_ADVENTURE, name: "Action & Adventure" },
  { id: TV_GENRES.ANIMATION, name: "Animation" },
  { id: TV_GENRES.COMEDY, name: "Comedy" },
  { id: TV_GENRES.CRIME, name: "Crime" },
  { id: TV_GENRES.DOCUMENTARY, name: "Documentary" },
  { id: TV_GENRES.DRAMA, name: "Drama" },
  { id: TV_GENRES.FAMILY, name: "Family" },
  { id: TV_GENRES.KIDS, name: "Kids" },
  { id: TV_GENRES.MYSTERY, name: "Mystery" },
  { id: TV_GENRES.NEWS, name: "News" },
  { id: TV_GENRES.REALITY, name: "Reality" },
  { id: TV_GENRES.SCIENCE_FICTION, name: "Sci-Fi & Fantasy" },
  { id: TV_GENRES.SOAP, name: "Soap" },
  { id: TV_GENRES.TALK, name: "Talk" },
  { id: TV_GENRES.WAR_POLITICS, name: "War & Politics" },
  { id: TV_GENRES.WESTERN, name: "Western" },
];

const sortOptions: SortOptionType[] = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "vote_average.asc", label: "Lowest Rated" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "release_date.asc", label: "Oldest First" },
];

export function BrowsePage({ initialQuery = "" }: BrowsePageProps) {
  // Search state
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Browse state
  const [activeTab, setActiveTab] = useState<
    "search" | "discover" | "toprated"
  >(initialQuery ? "search" : "discover");
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [selectedGenre, setSelectedGenre] = useState<GenreOption>(
    movieGenres[0],
  );
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
        // Switch to search tab when user searches
        setActiveTab("search");
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

  // Update genre when media type changes
  const handleMediaTypeChange = (newMediaType: MediaType) => {
    setMediaType(newMediaType);
    setSelectedGenre(newMediaType === "movie" ? movieGenres[0] : tvGenres[0]);
  };

  const handleClearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  // API hooks
  const {
    results: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useMultiSearch(debouncedQuery);

  const {
    movies: discoverMovies,
    isLoading: discoverMoviesLoading,
    isError: discoverMoviesError,
  } = useDiscoverMovies({
    genre: selectedGenre.id || undefined,
    sortBy: sortBy.value,
  });

  const {
    tvShows: discoverTVShows,
    isLoading: discoverTVLoading,
    isError: discoverTVError,
  } = useDiscoverTVShows({
    genre: selectedGenre.id || undefined,
    sortBy: sortBy.value,
  });

  const {
    movies: trendingMovies,
    isLoading: trendingMoviesLoading,
    isError: trendingMoviesError,
  } = useTopRatedMovies();
  const {
    tvShows: trendingTVShows,
    isLoading: trendingTVLoading,
    isError: trendingTVShowsError,
  } = useTopRatedTVShows();

  // Calculate totals
  const totalSearchResults =
    (searchResults?.movieResults?.length || 0) +
    (searchResults?.tvResults?.length || 0) +
    (searchResults?.peopleResults?.length || 0);

  const currentGenres = mediaType === "movie" ? movieGenres : tvGenres;
  const discoverLoading =
    mediaType === "movie" ? discoverMoviesLoading : discoverTVLoading;
  const discoverError =
    mediaType === "movie" ? discoverMoviesError : discoverTVError;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb items={[{ label: "Browse", current: true }]} />
          <BackNavigation fallbackHref="/" />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            Browse Movies & TV Shows
          </h1>
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
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "search" | "discover" | "toprated")
          }
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" disabled={!debouncedQuery}>
              Search Results
            </TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="toprated">Top Rated</TabsTrigger>
          </TabsList>

          {/* Search Results Tab */}
          <TabsContent value="search" className="space-y-6">
            {!debouncedQuery ? (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-serif font-semibold mb-2">
                  Start Your Search
                </h2>
                <p className="text-muted-foreground">
                  Enter a movie title, TV show, or person&apos;s name to begin
                </p>
              </div>
            ) : searchLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Searching...</p>
              </div>
            ) : searchError ? (
              <div className="text-center py-12">
                <div className="text-destructive mb-2">⚠️ Search Error</div>
                <p className="text-muted-foreground">
                  Something went wrong while searching. Please try again.
                </p>
              </div>
            ) : totalSearchResults === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-serif font-semibold mb-2">
                  No Results Found
                </h2>
                <p className="text-muted-foreground">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif font-semibold">
                    Search Results for &quot;{debouncedQuery}&quot;
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {totalSearchResults} result
                    {totalSearchResults !== 1 ? "s" : ""} found
                  </p>
                </div>
                <SearchResults results={searchResults} />
              </div>
            )}
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Media Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Media Type</label>
                    <Select
                      value={mediaType}
                      onValueChange={(value: MediaType) =>
                        handleMediaTypeChange(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="movie">Movies</SelectItem>
                        <SelectItem value="tv">TV Shows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Genre */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Genre</label>
                    <Select
                      value={selectedGenre.id?.toString() || "all"}
                      onValueChange={(value) => {
                        const genre = currentGenres.find(
                          (g) => (g.id?.toString() || "all") === value,
                        );
                        if (genre) setSelectedGenre(genre);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentGenres.map((genre) => (
                          <SelectItem
                            key={genre.id?.toString() || "all"}
                            value={genre.id?.toString() || "all"}
                          >
                            {genre.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select
                      value={sortBy.value}
                      onValueChange={(value) => {
                        const option = sortOptions.find(
                          (o) => o.value === value,
                        );
                        if (option) setSortBy(option);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sort option" />
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
              </CardContent>
            </Card>

            {/* Discover Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold">
                  {mediaType === "movie" ? "Movies" : "TV Shows"}
                  {selectedGenre.id && ` - ${selectedGenre.name}`}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sorted by {sortBy.label.toLowerCase()}
                </p>
              </div>

              {mediaType === "movie" ? (
                <MovieGrid
                  movies={discoverMovies}
                  isLoading={discoverLoading}
                  error={discoverError}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                  emptyMessage="No movies found with the selected filters."
                />
              ) : (
                <TVGrid
                  tvShows={discoverTVShows}
                  isLoading={discoverLoading}
                  error={discoverError}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                  emptyMessage="No TV shows found with the selected filters."
                />
              )}
            </div>
          </TabsContent>

          {/* Top Rated Tab */}
          <TabsContent value="toprated" className="space-y-6">
            <div className="space-y-8">
              {/* Top Rated Movies */}
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-semibold">
                  Top Rated Movies
                </h2>
                <MovieGrid
                  movies={trendingMovies}
                  isLoading={trendingMoviesLoading}
                  error={trendingMoviesError}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                  emptyMessage="No top rated movies available."
                />
              </div>

              {/* Top Rated TV Shows */}
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-semibold">
                  Top Rated TV Shows
                </h2>
                <TVGrid
                  tvShows={trendingTVShows}
                  isLoading={trendingTVLoading}
                  error={trendingTVShowsError}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                  emptyMessage="No top rated TV shows available."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
