'use client';

import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useDiscoverMovies, useDiscoverTVShows } from '@/lib/api';
import { MovieGrid } from '@/components/movie/movie-grid';
import { TVGrid } from '@/components/tv/tv-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOVIE_GENRES, TV_GENRES } from '@/lib/constants';
import { cn } from '@/lib/utils';

type MediaType = 'movie' | 'tv';
type SortOption = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc' | 'release_date.desc' | 'release_date.asc';

interface GenreOption {
  id: number | null;
  name: string;
}

interface SortOptionType {
  value: SortOption;
  label: string;
}

const movieGenres: GenreOption[] = [
  { id: null, name: 'All Genres' },
  { id: MOVIE_GENRES.ACTION, name: 'Action' },
  { id: MOVIE_GENRES.ADVENTURE, name: 'Adventure' },
  { id: MOVIE_GENRES.ANIMATION, name: 'Animation' },
  { id: MOVIE_GENRES.COMEDY, name: 'Comedy' },
  { id: MOVIE_GENRES.CRIME, name: 'Crime' },
  { id: MOVIE_GENRES.DOCUMENTARY, name: 'Documentary' },
  { id: MOVIE_GENRES.DRAMA, name: 'Drama' },
  { id: MOVIE_GENRES.FAMILY, name: 'Family' },
  { id: MOVIE_GENRES.FANTASY, name: 'Fantasy' },
  { id: MOVIE_GENRES.HISTORY, name: 'History' },
  { id: MOVIE_GENRES.HORROR, name: 'Horror' },
  { id: MOVIE_GENRES.MUSIC, name: 'Music' },
  { id: MOVIE_GENRES.MYSTERY, name: 'Mystery' },
  { id: MOVIE_GENRES.ROMANCE, name: 'Romance' },
  { id: MOVIE_GENRES.SCIENCE_FICTION, name: 'Science Fiction' },
  { id: MOVIE_GENRES.THRILLER, name: 'Thriller' },
  { id: MOVIE_GENRES.WAR, name: 'War' },
  { id: MOVIE_GENRES.WESTERN, name: 'Western' },
];

const tvGenres: GenreOption[] = [
  { id: null, name: 'All Genres' },
  { id: TV_GENRES.ACTION_ADVENTURE, name: 'Action & Adventure' },
  { id: TV_GENRES.ANIMATION, name: 'Animation' },
  { id: TV_GENRES.COMEDY, name: 'Comedy' },
  { id: TV_GENRES.CRIME, name: 'Crime' },
  { id: TV_GENRES.DOCUMENTARY, name: 'Documentary' },
  { id: TV_GENRES.DRAMA, name: 'Drama' },
  { id: TV_GENRES.FAMILY, name: 'Family' },
  { id: TV_GENRES.KIDS, name: 'Kids' },
  { id: TV_GENRES.MYSTERY, name: 'Mystery' },
  { id: TV_GENRES.NEWS, name: 'News' },
  { id: TV_GENRES.REALITY, name: 'Reality' },
  { id: TV_GENRES.SCIENCE_FICTION, name: 'Sci-Fi & Fantasy' },
  { id: TV_GENRES.SOAP, name: 'Soap' },
  { id: TV_GENRES.TALK, name: 'Talk' },
  { id: TV_GENRES.WAR_POLITICS, name: 'War & Politics' },
  { id: TV_GENRES.WESTERN, name: 'Western' },
];

const sortOptions: SortOptionType[] = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'vote_average.asc', label: 'Lowest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
];

function Select<T>({ 
  value, 
  onChange, 
  options, 
  getLabel, 
  getValue, 
  placeholder = "Select option"
}: {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  placeholder?: string;
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-background border border-input py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-ring/20 sm:text-sm">
          <span className="block truncate">{getLabel(value)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background border border-input py-1 text-base shadow-lg focus:outline-none sm:text-sm">
          {options.map((option, optionIdx) => (
            <Listbox.Option
              key={getValue(option)}
              className={({ active }) =>
                cn(
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                  active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                )
              }
              value={option}
            >
              {({ selected }) => (
                <>
                  <span
                    className={cn(
                      'block truncate',
                      selected ? 'font-medium' : 'font-normal'
                    )}
                  >
                    {getLabel(option)}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export function DiscoverPage() {
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [selectedGenre, setSelectedGenre] = useState<GenreOption>(movieGenres[0]);
  const [sortBy, setSortBy] = useState<SortOptionType>(sortOptions[0]);

  // Update genre when media type changes
  const handleMediaTypeChange = (newMediaType: MediaType) => {
    setMediaType(newMediaType);
    setSelectedGenre(newMediaType === 'movie' ? movieGenres[0] : tvGenres[0]);
  };

  // Fetch discover results
  const { 
    movies, 
    isLoading: moviesLoading, 
    isError: moviesError 
  } = useDiscoverMovies({
    genre: selectedGenre.id || undefined,
    sortBy: sortBy.value,
  });

  const { 
    tvShows, 
    isLoading: tvLoading, 
    isError: tvError 
  } = useDiscoverTVShows({
    genre: selectedGenre.id || undefined,
    sortBy: sortBy.value,
  });

  const currentGenres = mediaType === 'movie' ? movieGenres : tvGenres;
  const isLoading = mediaType === 'movie' ? moviesLoading : tvLoading;
  const error = mediaType === 'movie' ? moviesError : tvError;

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
                  onClick={() => handleMediaTypeChange('movie')}
                  className={cn(
                    'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    mediaType === 'movie'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  Movies
                </button>
                <button
                  onClick={() => handleMediaTypeChange('tv')}
                  className={cn(
                    'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    mediaType === 'tv'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
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
                value={selectedGenre}
                onChange={setSelectedGenre}
                options={currentGenres}
                getLabel={(genre) => genre.name}
                getValue={(genre) => genre.id?.toString() || 'all'}
              />
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                getLabel={(option) => option.label}
                getValue={(option) => option.value}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {mediaType === 'movie' ? 'Movies' : 'TV Shows'}
            {selectedGenre.id && ` - ${selectedGenre.name}`}
          </h2>
          <p className="text-sm text-muted-foreground">
            Sorted by {sortBy.label.toLowerCase()}
          </p>
        </div>

        {mediaType === 'movie' ? (
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