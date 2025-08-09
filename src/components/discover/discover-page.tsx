"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDiscoverMovies, useDiscoverTVShows } from "@/lib/hooks/api-hooks";
import { MovieGrid } from "@/components/movie/movie-grid";
import { TVGrid } from "@/components/tv/tv-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOVIE_GENRES, TV_GENRES } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

export function DiscoverPage() {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [selectedGenre, setSelectedGenre] = useState<GenreOption>(
    movieGenres[0],
  );
  const [sortBy, setSortBy] = useState<SortOptionType>(sortOptions[0]);

  // Update genre when media type changes
  const handleMediaTypeChange = (newMediaType: MediaType) => {
    setMediaType(newMediaType);
    setSelectedGenre(newMediaType === "movie" ? movieGenres[0] : tvGenres[0]);
  };

  // Fetch discover results
  const {
    movies,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useDiscoverMovies({
    genre: selectedGenre.id || undefined,
    sortBy: sortBy.value,
  });

  const {
    tvShows,
    isLoading: tvLoading,
    isError: tvError,
  } = useDiscoverTVShows({
    genre: selectedGenre.id || undefined,
    sortBy: sortBy.value,
  });

  const currentGenres = mediaType === "movie" ? movieGenres : tvGenres;
  const isLoading = mediaType === "movie" ? moviesLoading : tvLoading;
  const error = mediaType === "movie" ? moviesError : tvError;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Discover</h1>
        <p className="text-muted-foreground">
          Explore movies and TV shows by genre and other filters
        </p>
      </div>

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
              <div className="flex rounded-lg border border-input p-1">
                <button
                  onClick={() => handleMediaTypeChange("movie")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    mediaType === "movie"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  Movies
                </button>
                <button
                  onClick={() => handleMediaTypeChange("tv")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    mediaType === "tv"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  TV Shows
                </button>
              </div>
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
                  const option = sortOptions.find((o) => o.value === value);
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

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {mediaType === "movie" ? "Movies" : "TV Shows"}
            {selectedGenre.id && ` - ${selectedGenre.name}`}
          </h2>
          <p className="text-sm text-muted-foreground">
            Sorted by {sortBy.label.toLowerCase()}
          </p>
        </div>

        {mediaType === "movie" ? (
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            error={error}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage="No movies found with the selected filters."
          />
        ) : (
          <TVGrid
            tvShows={tvShows}
            isLoading={isLoading}
            error={error}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage="No TV shows found with the selected filters."
          />
        )}
      </div>
    </div>
  );
}
