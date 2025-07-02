'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  StarIcon, 
  CalendarIcon, 
  ClockIcon,
  FilmIcon,
  PlayIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useMovieDetails, getImageUrl } from '@/lib/api';
import { WatchlistButton } from '@/components/ui/watchlist-button';
import { 
  formatDate, 
  formatRuntime, 
  formatVoteAverage, 
  formatCurrency, 
  getRatingColor,
  truncateText 
} from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MovieDetailsPageProps {
  movieId: number;
}

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-96 bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <Skeleton className="aspect-[2/3] w-full max-w-xs" />
            </div>
            <div className="md:col-span-9 space-y-4">
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full max-w-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MovieDetailsPage({ movieId }: MovieDetailsPageProps) {
  const { movie, isLoading, isError } = useMovieDetails(movieId);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <FilmIcon className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Movie Not Found</h1>
          <p className="text-muted-foreground">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'poster', 'w500');
  const rating = formatVoteAverage(movie.vote_average);
  const ratingColor = getRatingColor(movie.vote_average);
  const runtime = formatRuntime(movie.runtime);
  const releaseDate = formatDate(movie.release_date);
  const budget = formatCurrency(movie.budget);
  const revenue = formatCurrency(movie.revenue);

  // Get trailer video
  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Get main cast (first 10)
  const mainCast = movie.credits?.cast?.slice(0, 10) || [];

  // Get director
  const director = movie.credits?.crew?.find(person => person.job === 'Director');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              {/* Poster */}
              <div className="md:col-span-3">
                <div className="relative aspect-[2/3] w-full max-w-xs">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-lg shadow-2xl"
                      sizes="(max-width: 768px) 300px, 400px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                      <FilmIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Title and Basic Info */}
              <div className="md:col-span-9 space-y-4 text-white">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-lg italic text-white/80">{movie.tagline}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                      <StarSolidIcon className="h-4 w-4" />
                      <span>{rating}</span>
                    </div>
                  )}
                  
                  {releaseDate && (
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{releaseDate}</span>
                    </div>
                  )}
                  
                  {runtime && (
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{runtime}</span>
                    </div>
                  )}

                  {movie.genres.map(genre => (
                    <span key={genre.id} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors"
                    >
                      <PlayIcon className="h-5 w-5" />
                      <span>Watch Trailer</span>
                    </a>
                  )}
                  
                  <WatchlistButton 
                    item={movie} 
                    mediaType="movie" 
                    variant="hero"
                  />
                  
                  <button className="inline-flex items-center space-x-2 px-6 py-3 border border-white/30 text-white bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {movie.overview && (
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90 leading-relaxed">{movie.overview}</p>
                </CardContent>
              </Card>
            )}

            {/* Cast */}
            {mainCast.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {mainCast.map(person => (
                      <Link
                        key={person.id}
                        href={`/person/${person.id}`}
                        className="text-center space-y-2 hover:opacity-80 transition-opacity"
                      >
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
                          {person.profile_path ? (
                            <Image
                              src={getImageUrl(person.profile_path, 'profile', 'w185')}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <span className="text-xs text-muted-foreground">No Photo</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.character}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Info */}
            <Card>
              <CardHeader>
                <CardTitle>Movie Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {director && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Director</h4>
                    <p className="text-sm">{director.name}</p>
                  </div>
                )}
                
                {movie.release_date && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Release Date</h4>
                    <p className="text-sm">{releaseDate}</p>
                  </div>
                )}
                
                {runtime && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Runtime</h4>
                    <p className="text-sm">{runtime}</p>
                  </div>
                )}
                
                {movie.budget > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                    <p className="text-sm">{budget}</p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Revenue</h4>
                    <p className="text-sm">{revenue}</p>
                  </div>
                )}

                {movie.production_companies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Production</h4>
                    <div className="text-sm space-y-1">
                      {movie.production_companies.slice(0, 3).map(company => (
                        <p key={company.id}>{company.name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* External Links */}
            {movie.external_ids && (
              <Card>
                <CardHeader>
                  <CardTitle>External Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {movie.external_ids.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      View on IMDB
                    </a>
                  )}
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      Official Website
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}