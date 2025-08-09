"use client";

import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  FilmIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useMovieDetails, useMovieWatchProviders } from "@/lib/hooks/api-hooks";
import { DetailsHero } from "@/components/ui/details-hero";
import { CastGrid } from "@/components/ui/cast-grid";
import { MovieGrid } from "@/components/movie/movie-grid";
import { PersonCard } from "@/components/ui/person-card";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  formatRuntime,
  formatVoteAverage,
  formatCurrency,
  getUSCertification,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { watchProviders } = useMovieWatchProviders(movieId);

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
            The movie you&apos;re looking for doesn&apos;t exist or has been
            removed.
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

  const rating = formatVoteAverage(movie.vote_average);
  const runtime = formatRuntime(movie.runtime);
  const releaseDate = formatDate(movie.release_date);
  const budget = formatCurrency(movie.budget);
  const revenue = formatCurrency(movie.revenue);

  // Get trailer video
  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  // Get main cast (first 10)
  const mainCast = movie.credits?.cast?.slice(0, 10) || [];

  // Get director
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director",
  );

  // Get US certification
  const usCertification = getUSCertification(movie.release_dates);

  // Get keywords
  const keywords = movie.keywords?.keywords?.slice(0, 10) || [];

  // Get key crew members with proper ordering
  const keyCrew =
    movie.credits?.crew
      ?.filter((person) =>
        [
          "Director",
          "Producer",
          "Executive Producer",
          "Writer",
          "Screenplay",
          "Story",
          "Cinematography",
          "Music",
          "Original Music Composer",
        ].includes(person.job),
      )
      .sort((a, b) => {
        // Priority order: Director first, then Writer/Screenplay, then others
        const jobPriority: Record<string, number> = {
          Director: 1,
          Writer: 2,
          Screenplay: 2,
          Story: 2,
          Producer: 3,
          "Executive Producer": 4,
          Cinematography: 5,
          Music: 6,
          "Original Music Composer": 6,
        };

        const priorityA = jobPriority[a.job] || 10;
        const priorityB = jobPriority[b.job] || 10;

        return priorityA - priorityB;
      })
      .slice(0, 8) || [];

  // Get recommendations
  const recommendations = movie.recommendations?.results?.slice(0, 12) || [];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <DetailsHero
        item={movie}
        mediaType="movie"
        trailer={trailer}
        watchProviders={watchProviders?.results?.US}
      />

      {/* Main Content */}
      <div className="relative container mx-auto px-4 pt-16 pb-12">
        <div className="space-y-8">
          {/* Movie Details - Full Width */}
          <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilmIcon className="h-5 w-5" />
                Movie Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {director && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Director
                    </h4>
                    <Link
                      href={`/person/${director.id}`}
                      className="text-base font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {director.name}
                    </Link>
                  </div>
                )}

                {movie.release_date && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      Release Date
                    </h4>
                    <p className="text-sm font-medium">{releaseDate}</p>
                  </div>
                )}

                {runtime && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      Runtime
                    </h4>
                    <p className="text-sm font-medium">{runtime}</p>
                  </div>
                )}

                {usCertification && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                      <ShieldCheckIcon className="h-3 w-3" />
                      Rating
                    </h4>
                    <div className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold border-2 border-primary/80 text-primary bg-background shadow-sm">
                      {usCertification}
                    </div>
                  </div>
                )}

                {movie.vote_average > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                      <StarSolidIcon className="h-3 w-3" />
                      TMDB Score
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / 10
                      </span>
                    </div>
                  </div>
                )}

                {movie.budget > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Budget
                    </h4>
                    <p className="text-sm font-medium">{budget}</p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Revenue
                    </h4>
                    <p className="text-sm font-medium text-green-600">
                      {revenue}
                    </p>
                  </div>
                )}

                {movie.production_companies.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Production
                    </h4>
                    <div className="space-y-1">
                      {movie.production_companies.slice(0, 2).map((company) => (
                        <p
                          key={company.id}
                          className="text-sm text-foreground/90"
                        >
                          {company.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Keywords - Full Width Row */}
              {keywords.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-border/50 mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <Badge key={keyword.id}>{keyword.name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cast - Full Width */}
          {mainCast.length > 0 && (
            <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
              <CardHeader>
                <CardTitle>Cast</CardTitle>
              </CardHeader>
              <CardContent>
                <CastGrid
                  cast={movie.credits?.cast || []}
                  initialDisplayCount={12}
                  mediaType="movie"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Key Crew - Full Width */}
        {keyCrew.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
              <CardHeader>
                <CardTitle>Key Crew</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {keyCrew.map((person) => (
                    <PersonCard
                      key={`${person.id}-${person.job}`}
                      person={person}
                      role={person.job}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations - Full Width */}
        {recommendations.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <Card className="bg-background/80 backdrop-blur-sm border-border/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl">You might also like</CardTitle>
              </CardHeader>
              <CardContent>
                <MovieGrid
                  movies={recommendations}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                  showOverview={false}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
