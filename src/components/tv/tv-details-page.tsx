"use client";

import Image from "next/image";
import Link from "next/link";
import {
  StarIcon,
  CalendarIcon,
  PlayIcon,
  BookmarkIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useTVDetails, useTVWatchProviders, getImageUrl } from "@/lib/api";
import { WatchlistButton } from "@/components/ui/watchlist-button";
import { WatchProviders } from "@/components/ui/watch-providers";
import { ShareButton } from "@/components/ui/share-button";
import { DetailsHero } from "@/components/ui/details-hero";
import {
  formatDate,
  formatVoteAverage,
  getRatingColor,
  truncateText,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TVDetailsPageProps {
  tvId: number;
}

function TVDetailsSkeleton() {
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

export function TVDetailsPage({ tvId }: TVDetailsPageProps) {
  const { tvShow, isLoading, isError } = useTVDetails(tvId);
  const { watchProviders, isLoading: isWatchProvidersLoading } =
    useTVWatchProviders(tvId);

  if (isLoading) {
    return <TVDetailsSkeleton />;
  }

  if (isError || !tvShow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <TvIcon className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">TV Show Not Found</h1>
          <p className="text-muted-foreground">
            The TV show you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/tv"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to TV Shows
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(tvShow.backdrop_path, "backdrop", "original");
  const posterUrl = getImageUrl(tvShow.poster_path, "poster", "w500");
  const rating = formatVoteAverage(tvShow.vote_average);
  const ratingColor = getRatingColor(tvShow.vote_average);
  const firstAirDate = formatDate(tvShow.first_air_date);
  const lastAirDate = formatDate(tvShow.last_air_date);

  // Get trailer video
  const trailer = tvShow.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  // Get main cast (first 10)
  const mainCast = tvShow.credits?.cast?.slice(0, 10) || [];

  // Get creators
  const creators = tvShow.created_by || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DetailsHero 
        item={tvShow} 
        mediaType="tv" 
        trailer={trailer}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {tvShow.overview && (
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90 leading-relaxed">
                    {tvShow.overview}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Seasons */}
            {tvShow.seasons && tvShow.seasons.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Seasons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tvShow.seasons.map((season) => (
                      <div
                        key={season.id}
                        className="flex space-x-4 p-4 rounded-lg bg-muted/50"
                      >
                        <div className="relative w-16 h-24 flex-shrink-0">
                          {season.poster_path ? (
                            <Image
                              src={getImageUrl(
                                season.poster_path,
                                "poster",
                                "w185",
                              )}
                              alt={season.name}
                              fill
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted rounded">
                              <TvIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-medium">{season.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {season.episode_count} episode
                            {season.episode_count !== 1 ? "s" : ""}
                            {season.air_date &&
                              ` • ${formatDate(season.air_date)}`}
                          </p>
                          {season.overview && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {truncateText(season.overview, 150)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                    {mainCast.map((person) => (
                      <Link
                        key={person.id}
                        href={`/person/${person.id}`}
                        className="text-center space-y-2 hover:opacity-80 transition-opacity"
                      >
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
                          {person.profile_path ? (
                            <Image
                              src={getImageUrl(
                                person.profile_path,
                                "profile",
                                "w185",
                              )}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                No Photo
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{person.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {person.character}
                          </p>
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
            {/* TV Show Info */}
            <Card>
              <CardHeader>
                <CardTitle>TV Show Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creators.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Creator{creators.length > 1 ? "s" : ""}
                    </h4>
                    <div className="text-sm space-y-1">
                      {creators.map((creator) => (
                        <p key={creator.id}>{creator.name}</p>
                      ))}
                    </div>
                  </div>
                )}

                {tvShow.first_air_date && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      First Air Date
                    </h4>
                    <p className="text-sm">{firstAirDate}</p>
                  </div>
                )}

                {tvShow.last_air_date && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Last Air Date
                    </h4>
                    <p className="text-sm">{lastAirDate}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <p className="text-sm">{tvShow.status}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Type
                  </h4>
                  <p className="text-sm">{tvShow.type}</p>
                </div>

                {tvShow.networks.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Network
                    </h4>
                    <div className="text-sm space-y-1">
                      {tvShow.networks.slice(0, 3).map((network) => (
                        <p key={network.id}>{network.name}</p>
                      ))}
                    </div>
                  </div>
                )}

                {tvShow.production_companies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Production
                    </h4>
                    <div className="text-sm space-y-1">
                      {tvShow.production_companies
                        .slice(0, 3)
                        .map((company) => (
                          <p key={company.id}>{company.name}</p>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* External Links */}
            {tvShow.external_ids && (
              <Card>
                <CardHeader>
                  <CardTitle>External Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tvShow.external_ids.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${tvShow.external_ids.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      View on IMDB
                    </a>
                  )}
                  {tvShow.homepage && (
                    <a
                      href={tvShow.homepage}
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

            {/* Watch Providers */}
            {watchProviders?.results?.US && (
              <WatchProviders
                providers={watchProviders.results.US}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
